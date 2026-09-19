# SM's 2019 setup

Last updated: 2025

Some notes on my setup circa 2019 and later.

- Author:       Simon Michael
- Tested with:  mac mojave, hledger 1.14

## Tools

hledger, hledger-ui, ledger-mode, GNU make, ...

## Files

```
$ tree ~/notes
/Users/simon/notes
├── 2019.journal
├── 2019.prices
├── all.journal
├── current.journal -> 2019.journal
├── forecast.journal
...
```

Files are in `~/notes`.
There's one YEAR.journal file per year containing all transactions in date order.
It `include`s two sub files:

- YEAR.prices containing P records for the year
- forecast.journal containing periodic transaction rules

all.journal `include`s all the year journals.
It provides all historical data, but is slow, and my old journals are inconsistent/broken, so it's currently rarely used.

current.journal is a symlink for scripts which don't know the year.
Symbolic links are a mixed blessing, causing file path confusion in emacs, eg.

## Scripts

I have convenience aliases for hledger commands and reports in `~/notes/bashrc`,
which is automatically sourced by my bash profile.

Data fetching and report scripts are defined in `~/notes/Makefile`.

## Version control

Journal file, included files, makefile and scripts are tracked in git,
with a mixture of manual and cron-based automatic committing.

## Environment

The `LEDGER_FILE` environment variable is set to `/Users/simon/notes/CURRENTYEAR.journal`.
This is done in some super secret way that I'll have to track down, or more likely several ways,
to ensure that it is consistent for:

- programs started from command line in iTerm/Terminal windows
- programs started from emacs shell buffers
- emacs modes such as ledger-mode
- for both text-mode and graphical emacs, whether started from command line or mac GUI (Dock/Finder/Spotlight)
- etc.

## Accounts

I track both sole proprietor business accounts, with `JS:` prefix,
and personal accounts, with `sm:` prefix, in one journal for convenience.
These declarations ensure hledger knows the account types:

```journal
account JS:assets               ; type:A
account JS:liabilities          ; type:L
account JS:equity               ; type:E
account JS:revenues             ; type:R
account JS:expenses             ; type:X

account sm:assets               ; type:A
account sm:liabilities          ; type:L
account sm:equity               ; type:E
account sm:revenues             ; type:R, taxable personal revenues
account sm:income               ; type:R, already-taxed "salary" from JS, non-taxable income
account sm:expenses             ; type:X
```

## Getting data

Most journal entries are generated from downloaded CSV:

- ~~I fetch OFX from one bank with ledger-autosync (discontinued due to high fees)~~

- ~~Transactions from three banks are aggregated and cleaned in a Google sheet by Tiller ($5/mo).
  I download this as CSV with a `gsheet-csv` script (via cron ?). (discontinued for security)~~

- ~~Transactions are downloaded from banks by Plaid (free developer account). (discontinued for security)~~

- ~~Paypal CSV is downloaded manually, then moved into place by a make rule.
  I use Paypal's CSV because Tiller doesn't handle multiple currencies and Paypal's extra metadata fields.~~

- I download CSV manually from each bank, weeklyish.

- I fetch CSV from Paypal's API using `paypaljson` and `paypaljson2csv` scripts.

CSV rules are never entirely finished; they get one or two small tweaks most
times I import.  They don't cover 100% of my possible entries; a few
that are too hard to generate just get generated partially, with a ';
TODO:` tag for me to fix them up manually. There aren't many of those
at this point

I fetch currency prices with barrucadu's market-prices.py script
([details](https://gist.github.com/simonmichael/9ca4d74b30567dcc3b93763ffe88abf9)).

## Data entry (2021)

For transactions downloaded from banks:

- In an iterm3 tab titled FINANCE, I have a TUI emacs with two side-by-side windows.
- dIn the first window is 2021.journal, with ledger-mode and auto-revert-mode enabled.
- In the second window I switch to a shell and run make Import to download and import latest transactions.
- These show up in the journal right away. I switch focus there, select all the new entries and hit M-q to realign them with ledger-mode (which is better at that than hledger print).
- I process them one at a time from the top, marking each one cleared (C-c C-e) when it looks good.
- When there's an unknown posting, I:
  - replace the unknown account with the appropriate account (assuming I know it)
  - switch to common.rules in the second window, and search for that account or its parent (assuming it's in the rules somewhere)
  - add some portion of the new entry's description as a new pattern for this account. Or tweak the existing patterns so it will be matched next time (or to avoid over-matching by the wrong rule).
- when all new entries are marked cleared, I git commit the journal and any updated rules file(s). Or if I don't, it will be auto-committed by a nightly cron job (in theory).
- I do this daily-ish, so it's a small number of new txns each time.

For transactions which don't appear in downloaded data (cash transactions, etc.):

- Note it somewhere, anywhere, as quickly possible, or it will be forgotten
  (and I'll have to add an unexplained cash adjustment transaction later).
- If the laptop is out of reach, that will usually be a brief note on
  today's page in a phone notes app (Obsidian, currently) or a paper notebook.
  Later that gets copied to the laptop.
- On the laptop, my usual routine is:
  - get to the place of data entry
    - iterm3 app (or start it if not running),
    - FINANCE tab where a TUI emacs (client) is running (or create that tab/start that emacs client),
    - emacs window showing the journal (or `C-j l` if not showing),
    - end of buffer (`M->`).
  - add the journal entry: either
    - if short of time: just a commented line, or date and description (and expand it later)
    - if a familiar transaction: search back for a similar one, copy, jump to the end again, paste, adjust as needed (especially the date)
    - otherwise type it in, starting with the date, using ledger-mode's completion (`TAB`),
      or hippie-expand's completion (`M-/`) if they help.
      (ledger-mode required careful configuration for best behaviour with account names,
      the main thing I recall is turn on `ledger-complete-in-steps`.)
    - when the journal entry is finalised, mark it cleared (`C-c C-e`).

## More error checking (2023)

I run `make Import` (equivalent to: `make csv` which fetches latest bank & paypal csvs, plus `make import` which essentially runs `hledger import *.csv`).

Then I review in emacs+ledger-mode+flycheck-mode. All the imported transactions are uncleared, showing up red. Flycheck also highlights problems like "expenses:unknown" or failing assertions or out of order dates. I clear each one, fixing (and maybe tweaking CSV rules) where needed.

The recentassertions check may force me to add a transaction with newer balance assertions for the main accounts; I describe that "reconcile", I fill in the balances hledger expects, and at the same time I check they match the real-world balances.

Finally when all the red is gone and all checks are passing - enforced by adding this command to `.git/hooks/precommit`:
```
#!/bin/sh
...
# check main hledger journal
hledger check -s ordereddates recentassertions
```
...I commit the changes to git.

I have a nightly cron job which would do this automatically,
but by habit and for clean commits I usually do them manually, with separate "txns", "rules" and "scripts" commits.
(If you try using cron like this, note failing checks can reveal account names and balances in the error message and cron might email those in plain text over the internet.)

For troubleshooting: when downloading a CSV the previous copy is saved as FILE.csv.old.

Cash transactions are entered in emacs, using ledger-mode.
Mostly by copying and pasting similar past transactions.

When rewriting account names, I use either
ledger-mode completion (`TAB`) or dabbrev-expand completion (`M-/`),
which have different strengths.
