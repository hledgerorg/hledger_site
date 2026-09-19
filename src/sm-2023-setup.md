# SM's 2023 setup

Last updated: 2025

A relatively simple, automated workflow using current hledger features. The Files layout will give you the gist of it. It is a journal first setup (journal files are primary, CSV files are disposable).

## Tools

`hledger` 1.30+ ,
`just`,
`git` (or other version control system),
...

## Files
Here are the main files, grouped for clarity. These are unix-style file paths; on Windows, they may be a little different. These filenames are reasonably good for typing, autocompleting, visual grouping, editor configuration, etc. But you might find better ones.

```
/home/USER/

 finance/                 home of finance files; wherever you wish

  .git/                   most files are tracked with git or other VCS
   hooks/
    pre-commit            runs hledger check -s ordereddates recentassertions

  bin/                    extra scripts/tools for finance work
   bashrc                 extra shell config
   gsheet-csv             get a Google sheet as CSV
   paypaljson             get recent Paypal transactions as JSON
   paypaljson2csv         convert Paypal JSON to CSV

  justfile                commands/scripts for common tasks

  2023.journal            main journal file for 2023 (current year)
  2023accounts.journal    account declarations, included by main journal
  2023prices.journal      market price declarations, included by main

  2022.journal            main journal file for 2022 (etc..)
  2022accounts.journal
  2022prices.journal

  forecast.journal        future transactions / periodic transaction rules

  bi-ichecking.csv.rules  CSV conversion rules for each bank account
  paypal.csv.rules
  wf-pchecking.csv.rules
  wf-bchecking.csv.rules
  wf.rules                common rules included for all wf accounts
  common.rules            common rules included by all

 Downloads/               hledger looks here for CSV files by default;
                          these file names are declared in *.csv.rules
  Checking1.csv           a bank account's recent transactions
  Checking1-1.csv         newer copies saved by web browser
  Checking1-2.csv         the newest; hledger will read this one
  Savings1.csv
  Transactions-2342.csv
```

## Scripts
`justfile` contains common reporting commands and task scripts, which can be listed and invoked by `just`[^1]. I alias `just` to `j`.

The `bin` directory is a place to keep additional scripts and tools; it should be added to your shell's PATH.

The scripts and an example justfile can be found at [Scripts and add-ons](scripts.md).

When you want to add a custom script, you have a choice:
- you can define it as a shell alias or function in `bashrc`
- you can define it as an executable file in `bin`
- you can define it as a script in `justfile` (or a `Makefile`, Shake file, or other build tool)

Over time, scripts can proliferate and become a maintenance and memory problem. I recommend using `justfile` where possible; it is the best combination of ease and power. I am increasingly using it as the starting point for all finance tasks.

## Main journal

The main journal file is `YEAR.journal`. The `LEDGER_FILE` environment variable should be set to this.

It contains these sections, one after another:

- commodity declarations - for error checking and to set display styles/precision - recommended
- tag declarations - if you use tags, for error checking
- [`include`](hledger.md#include-directive) directives - to include other files. I try to keep files to a minimum, to reduce headaches, but certain things are convenient to keep in separate files, like `YEARaccounts.journal` and `YEARprices.journal`.
- (account aliases - I avoid permanently defined aliases, since they add complexity. But if you need them, define them here so they can affect everything.)
- transactions - from all accounts, in date order. New transactions can simply be appended at the end.

## Accounts
[Account declarations](hledger.md#account-directive) are kept in a separate `YEARaccounts.journal`, included by the main journal, for more convenient reviewing and updating. These provide error checking and declare account types, account display order, account tags and/or comments. New account declarations can be inserted in the correct place, or appended at the end.

Eg:
```journal
account assets                   ; type:A
account liabilities              ; type:L
account equity                   ; type:E
account revenues                 ; type:R
account expenses                 ; type:X

account assets:bank              ; type:C
account assets:cash              ; type:C
account equity:conversion        ; type:V

account assets:bank:checking
account assets:bank:savings
# etc...
```

### Business accounts
As a sole proprietor, I like to track my business and my personal life as two separate entities. 
Legally we are one entity, and there are frequent transactions between them, so it's convenient to keep them in the same journal. 
But I use a top-level entity prefix to keep the accounts clearly separated.
I use two letters for these (less typing, less visual noise and keeps them aligned in reports).
So my account declarations look like this:

```journal
; business 1
account JS:assets               ; type:A
account JS:liabilities          ; type:L
account JS:equity               ; type:E
account JS:revenues             ; type:R
account JS:expenses             ; type:X
account JS:assets:bank          ; type:C
account JS:assets:cash          ; type:C
account JS:equity:conversion    ; type:V
account JS:assets:bank:checking
account JS:assets:bank:savings
# etc...

; personal
account sm:assets               ; type:A
account sm:liabilities          ; type:L
account sm:equity               ; type:E
account sm:revenues             ; type:R, taxable personal revenues
account sm:income               ; type:R, already-taxed "salary" from JS, non-taxable income
account sm:expenses             ; type:X
account sm:assets:bank          ; type:C
account sm:assets:cash          ; type:C
account sm:equity:conversion    ; type:V
account sm:assets:bank:checking
account sm:assets:bank:savings
# etc...
```
## Prices
[Market price declarations](#p-directive) are also kept in a separate, included file, `YEARprices.journal`, in date order. New prices can be appended at the end. Eg:
```journal
# ...
P 2023-06-08 00:00:00 £ $1.25161
P 2023-06-08 00:00:00 ¥ $0.00719
P 2023-06-08 00:00:00 € $1.07676
P 2023-06-09 00:00:00 £ $1.25777
P 2023-06-09 00:00:00 ¥ $0.00717
P 2023-06-09 00:00:00 € $1.07713
P 2023-09-04 00:00:00 € $1.08021
# ...
```
## forecast journal
`forecast.journal` is a place to note expected future transactions, one-time or recurring. 
I `include` it in the main journal, and I put only periodic transaction rules (and a few auto posting rules) in it. 
This means it has no effect until I run reports with the `--forecast` option.

Or you could put ordinary transaction entries here; in that case you may want to not include it, to keep future events out of reports by default.

## CSV rules
Each CSV (or TSV, SSV, ...) data source has a [CSV rules file](hledger.md#csv) declaring how to convert it to meaningful journal entries. Each rules file declares its corresponding data file's name, so that (eg) `hledger import wf-pchecking.csv.rules` will automatically look for the latest-numbered `Checking1*.csv` file in the `~/Downloads` folder.

Some rules files are common rules included by the others, eg `wf.rules` and `common.rules`.

## Downloads

`~/Downloads` is where my mac web browsers save downloaded CSV files, and it's where the [`source`](hledger.md#source)  rule looks for data files by default. If you don't have this folder on your system, you can make it, or use a symbolic link; or you can specify a different folder in your `source` rules.

When downloading bank CSV files, you don't need to care much about which dates you download; hledger's [`import`](hledger.md#import) system will usually do the right thing. Just make sure to download enough data to cover the period since your last import (eg the last 30 days, last year, or all transactions).

You also don't need to care much about managing downloaded CSV files; your browser will give them unique filenames, and hledger will automatically choose the latest ones. After successful import you can either delete the CSV files, keep them around for a while for troubleshooting, or archive them permanently.

## Workflow
In the justfile I have a `foo-import` script for each data source foo, and the `import` script runs all of them. So it's

- download one or more CSVs manually in web browser
- `j import --dry`
- `j import`
- load journal in emacs + ledger-mode + flycheck-hledger
- select new transactions, `M-q` to align them
- for each new transaction: review, refine and mark it cleared when appropriate.
- open flycheck's error list with `C-c ! l`, jump to and resolve each issue in turn. These will be things like typos, uncategorised postings, mis-ordered dates etc.
- I also run the `recentassertions` check, which periodically forces me to add more recent balance assertions for my main accounts. I do this by adding a "reconcile" transaction (using `yasnippet`, by typing "reconcile" and TAB); filling in the balances hledger expects, to make the errors go away
- When the journal is again error-free, I check each account's real-world balance against the "reconcile" transaction's asserted balance (or in a balance report or hledger-ui accounts screen), and resolve any disagreements.
- Finally I commit the changes to journal, rules and scripts. Git's `pre-commit` hook runs my checks one more time, catching any last-minute errors.


---
[^1]:  [`just`](just.md) is Like `make`, but better for this purpose. I recommend trying it, even though it doesn't come with your OS; I say this after years of costly battle with make, shell, and other scripting setups.
