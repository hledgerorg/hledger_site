# Checking for errors

Last updated: 2024

hledger can check your data in various ways.

## Built in checks

In hledger 1.21+,
see [strict mode](https://hledger.org/hledger.html#strict-mode)
and the [check](https://hledger.org/hledger.html#check) command.

## Old way to check accounts

Here's another way to check for undeclared accounts, that works with older hledger versions,
showing some diff tricks:
```cli
$ diff -U0 --label "Unused Accounts" --label "Undeclared Accounts" <(hledger accounts --declared) <(hledger accounts --used)
```

## Compare report output

Save the output of a report, and later use `diff` to compare the
output of the same report, revealing any changes.

```cli
$ hledger COMMAND > report.txt
$ hledger COMMAND > report2.txt
$ diff report.txt report2.txt
```

Or, periodically commit a report's output into your version control system,
then use the VCS to detect any changes since the last commit.

```cli
$ hledger COMMAND > report.txt; git add report.txt; git commit -m 'report' report.txt
$ hledger COMMAND > report.txt; git diff -- report.txt
```

Sometimes new data can cause noisy diffs, especially in tabular reports.
To minimise diffs, here are some things to try:

When comparing [balancesheetequity] diffs, do any of these help:

- --layout wide,MAXWIDTH, --layout bare, --layout tidy

- not using tree mode if you're using that

- not showing multiple periods if you're using that

- overriding commodity styles with -c, eg limiting precision

- limiting --depth

- -MA --summary

- excluding particular problem accounts/commodities

- generating one report per commodity with cur: ?

- generating csv/tsv/json output ?

- using the balance command instead, and eg --transpose, or a single --period and --format

- using the [a]register command

## A pre-commit hook

Version control systems often support a "pre-commit hook", a script which
is required to succeed before each commit. Eg:

```cli
#!/bin/bash
set -e
hledger check -s
```

## Flycheck mode

If you use Emacs, you can configure flycheck to run your preferred checks when you edit a journal file.
This integration is currently quite basic, but it still gives very useful real-time feedback.
Setup tips:

- in Emacs, install the `flycheck-hledger` package and customise the `flycheck-checkers` variable, adding `hledger` to the list
- customise the `flycheck-hledger-strict` and `flycheck-hledger-checks` variables

## Todo / maybe

Here are some checks we don't support, but could:

- **accountsactive** - for each account used, if there is posting with an `open:` [tag](hledger.md#tags),
  it must have a corresponding posting with a `close:` tag, and all other postings
  must be chronologically between (and if on the same date, textually between)
  open and close postings. ("Accounts are posted to only within their declared active period.")
- **explicitamounts** - all transaction amounts have been recorded explicitly

## Preventing postings to closed accounts

Some options (from <https://www.reddit.com/r/plaintextaccounting/comments/180a11b/how_to_represent_closure_of_an_account_using>):

1. Add a balance assertion when the account is closed, and then use
  `hledger check recentassertions` (<https://hledger.org/1.31/hledger.html#other-checks>).
  After a week has passed, new postings to it (without a new, correct, balance assertion) will raise an error.

2. Add a zero balance assertion in the far future. Eg:

      12000-01-01 * This balance shall remain zero for ten thousand years
          assets:foo2022      0 ==* 0

3. (If yearly granularity is ok:) Use a new journal file and new account declarations, and drop the obsolete accounts, each year.
   Strict mode or `hledger check accounts` will warn of any new references to the old account.

4. (If you are comfortable with unix tools:) Make a custom check script, eg grep the output of `hledger reg OLDACCT` for inappropriate dates.

5. <https://hledger.org/scripts.html#hledger-check-fancyassertions> might help.

6. [support account lifetimes ? #1389](https://github.com/hledgerorg/hledger/issues/1389) is the place to work on better support for this.
