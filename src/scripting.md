# Scripting hledger

Last updated: 2024

As a command line program, with plain text data formats, hledger is
easy to extend and customise with scripts and add-on commands.
This page describes some different kinds of scripting you can do around hledger.

For an overview of ready-made scripts you can install, see [Scripts](scripts.md).

Scripts are programs which call other programs to get things done.
They are often (though not always):
- small
- ready to run immediately with no compilation step
- quick to write and modify
- written by you to make your particular tasks easier.

They could be as simple a shell alias remembering the options for a
common report, or a small program automating a more complex operation
such as invoicing.

## Shell aliases

Shell aliases are the simplest type of script.
Their most common use is to save typing, as in the examples below.
(These and most shell examples in these docs are for the popular Bash shell;
translate appropriately if you use a different shell.)

```cli
# ~/finance/bashrc
alias acc='hledger accounts'
alias act='hledger activity'
alias add='hledger add'
alias areg='hledger aregister'
alias bal='hledger balance'
alias close='hledger close'
alias print='hledger print'
alias reg='hledger register'
alias stats='hledger stats'
alias tags='hledger tags'
alias bs='hledger bs'
alias bse='hledger bse'
alias is='hledger is'
alias cf='hledger cashflow'
alias 2020='hledger -f ~/finance/2020.journal'
alias 2019='hledger -f ~/finance/2019.journal'
alias 2018='hledger -f ~/finance/2018.journal'
# ...
alias 2y='hledger -f ~/finance/2year.journal'
alias 3y='hledger -f ~/finance/3year.journal'
alias 4y='hledger -f ~/finance/4year.journal'
alias 5y='hledger -f ~/finance/5year.journal'
alias all='hledger -f ~/finance/all.journal'
```

or to customise hledger's commands:

```cli
alias iadd='hledger-iadd --date-format %Y/%m/%d'
alias ui='hledger-ui --watch'
alias uir='hledger-ui --watch --register'
```

or to remember useful reports:

```cli
alias allone="all --alias '/^([^:]+)(:personal|:business)\b/ = \1' --alias '/^revenues:consulting/=revenues' --alias '/\bwells fargo\b/=wf'"
alias budget='hledger bal --budget'
alias forecast='hledger reg -H date:today- --forecast'
alias tripactivity='hledger act tag:trip -W'
```

## Shell functions

When aliases are too limiting, you can use functions instead:

```cli
alias bassets='bal -H ^assets:business'
alias bdebts='bal -H ^liabilities:business'
alias brevenues='bal ^revenues:business'
alias bexpenses='bal ^expenses:business'

function bsnapshot () { # business balance sheet + year-to-date income statement
 echo Business financial snapshot `date` #+%Y/%m/%d
 echo
 echo Assets today:
 bassets --flat --drop 2 --depth 4 $@
 echo
 echo Debts today:
 bdebts --flat --drop 2 --depth 4 $@
 echo
 echo Revenues this year:
 brevenues --flat --drop 2 --depth 3 $@
 echo
 echo Expenses this year:
 bexpenses --flat --drop 2 --depth 3 $@
 echo
}
```

## Shell scripts

When aliases and functions are too limiting, you can use a shell script file:

```cli
#!/bin/sh
# ~/finance/bin/reports
date
export PATH=/Users/simon/.local/bin:$PATH
export LEDGER_FILE=/Users/simon/finance/2018.journal
/usr/bin/make -s -C /Users/simon/finance reports | /usr/bin/mail -s 'reports' simon
```

## Make

[Makefiles](https://www.gnu.org/software/make/) can work well for
collections of simple scripts, especially if they are local to a
particular directory.

```make
# ~/finance/Makefile

# regular reports, mailed by cron
reports: \
	is \
	time-report \
	todo \

is:
	@echo 'Monthly Income Statement'
	hledger is -M cur:.
	@echo

YEAR:=$(shell date +%Y)
TIMEJOURNAL=time-$(YEAR).journal
HLEDGER=hledger
TIME=$(HLEDGER) --alias "/\./=:" -f $(TIMEJOURNAL)

time-report:
	@echo 'Monthly Time Report'
	$(TIME) bal -MAT -1
	@echo

todo:
	@echo "TODOs in this year's journals"
	@grep TODO $(YEAR)*
	@grep TODO $(YEAR)* | wc -l
	@echo
```

If you are not comfortable with Make's syntax, or when scripts get more complex,
dedicated or multi-function shell scripts will be less hassle.

## Just

`just` is a more modern alternative to make. I prefer it and recommend it for many use cases.
See [hledger and just](just.md) for more details.


## Add-on commands

If you name scripts hledger-something and make them executable in PATH,
they'll be recognised as [add-on commands](hledger.md#add-on-commands).

Eg here's a simple script which adds `estimatedtax` as a hledger command.
This one is in haskell, but it could be written in any language:

```hs
#!/usr/bin/env runhaskell
-- hledger-estimatedtax.hs
-- Given a gross income amount, estimate the corresponding federal and
-- state taxes based on historical tax per gross income.  These
-- amounts can be posted to your tax liability account, to estimate
-- taxes due from this year's income so far.

import System.Environment
import Text.Printf

-- | How much of taxable income to save for federal & state estimated tax payments,
-- these are usually about right for me
fedrate       = 0.28
staterate     = 0.04

main = do
  taxableincome <- fmap (read . head) getArgs :: IO Int
  let fedtax        = round $ fromIntegral taxableincome * fedrate
      statetax      = round $ fromIntegral taxableincome * staterate
      totaltax      = fedtax + statetax
      posttaxincome = taxableincome - totaltax
  printf (
    "Taxable income:  %5d\n" ++
    "US tax:          %5d\n" ++
    "CA tax:          %5d\n" ++
    "Total tax:       %5d\n" ++
    "Post-tax income: %5d\n")
    taxableincome fedtax statetax totaltax posttaxincome
```

## hledger-lib scripts

These are scripts written in haskell, which use the same
[hledger-lib](https://hackage.haskell.org/package/hledger-lib) and
[hledger](https://hackage.haskell.org/package/hledger) APIs that hledger uses.
They can be simple interpreted scripts, or can grow as large and powerful as you need,
and can be optionally compiled for more speed and durability.
Example scripts and more tips can be found at
<https://github.com/hledgerorg/hledger/tree/main/bin/>.

hledger-lib scripts installed as add-ons (`hledger-newcmd.hs` in PATH) 
are a good way to prototype new commands, perhaps to become builtin commands later.
(Though, converting a haskell script command to a builtin command currently requires
rearranging its code; we'd like to improve this.)

## Haskell scripting tips

If you want others, or future-you, to be able to run your haskell scripts reliably,
make them [stack scripts] or [cabal scripts].
stack scripts are usually best for reliability, performance, and sharing with others, because:

- they require only the `stack` executable to be installed on your system
- they ensure the required GHC version is installed, installing it automatically if needed
- they ensure the required haskell packages are installed, installing them automatically if needed
- they specify all package versions and use known-compatible packages for more reliable builds
- they automatically recompile themselves when changed, only when needed.

[stack scripts]: https://docs.haskellstack.org/en/stable/GUIDE/#writing-independent-and-reliable-scripts
[cabal scripts]: https://cabal.readthedocs.io/en/latest/cabal-commands.html#cabal-v2-run

## Plugins

In general we would like for hledger users to be able to quickly customise
its behaviour and features with small code "plugins",
without having to change and recompile hledger itself.
Haskell is not a very "dynamically pluggable" language,
so currently the best way to build "plugins" is with pre-processing scripts, post-processing scripts, or hledger-lib-using haskell scripts.

We identify several desirable plugin types:

| Plugin&nbsp;type | Purpose                                                                       |
|------------------|:------------------------------------------------------------------------------|
| *reader*         | Parse/ingest from some data format/source to hledger journal data.            |
| *processor*      | Process/transform journal data, after parsing (ideally) and before reporting. |
| *report*         | Calculate some kind of report data from processed journal data.               |
| *renderer*       | Render report data in some output format.                                     |
| *command*        | Provide new CLI subcommands implementing new reports/formats/actions.         |
| *writer*         | Write/export complete journal data to some data format/destination.           |

Here are examples of each type of plugin, and the best approach for making your own.
(More examples can be found at <https://hledger.org/scripts.html> or <https://plaintextaccounting.org/#data-importconversion>.)

### reader

- the builtin journal, csv, timeclock, timedot readers
- beancount2ledger, pricehist, reckon, qb2ledger, ynab-to-ledger

A new reader can be made by generating journal or csv format for hledger to read, or with a hledger-lib script that builds hledger's journal data structure.

### processor

- the builtin amount/cost/equity inferring; amount style normalisation; auto postings; periodic transactions; default/strict checks..
- `hledger-print-location`, `hledger-swap-dates`

Custom processing of hledger's journal data structure, after parsing, is currently not well supported; it is somewhat possible in a hledger-lib script.
As an alternative, you can transform the journal or csv textually before hledger reads it.

### report

- the builtin reports: PostingsReport, AccountTransactionsReport, MultiBalanceReport, BudgetReport..
- `hledger-combine-balances`
- multi-report tools: `hledger-plot`, `hledger-vega`, hreports, r-ledger

A *report* also needs a *command* to invoke it and a *renderer* to show it.
An add-on script can provide all three of these.

### renderer

- the report commands' builtin output formats (usually txt, csv, json,.md..)

This can be done with an add-on script, or by transforming the report's txt/csv/json/html output.

### command

- `hledger-ui`, `hledger-web`, `hledger-iadd`, `hledger-git`, `hledger-move`, `hledger-edit`, `hledger-check-fancyassertions`

A new subcommand can be invoked by `hledger COMMAND ...` and will appear in the `hledger` commands list.
It can be made with an add-on script or program (`hledger-foo` in PATH).

### writer

- the `print` command's builtin output formats (txt, csv, json, sql)
- ledger2beancount

A new writer can be made as a hledger-lib script, 
or (losing the original journal's directives and top-level comments) by transforming print's txt/csv/json/sql output.
