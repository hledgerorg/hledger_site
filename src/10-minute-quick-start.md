# 10 minute quick start

Last updated: 2025

[full website]:   https://hledger.org
[hledger]:        hledger.md
[hledger manual]: hledger.md
[hledger-ui]:     hledger-ui.md
[hledger-web]:    hledger-web.md
[journal]:        hledger.md#journal
[csv]:            hledger.md#csv
[timeclock]:      hledger.md#timeclock
[timedot]:        hledger.md#timedot


<a name="about"></a>
## What is it ?

hledger: free GPLv3+ accounting software for linux, mac, windows, web, etc. 

- reads transactions from a flexible, future-proof, version-controllable [plain text format][journal]
- or [CSV files][csv] from any financial institution
- produces precise [multiperiod] financial reports as [text/HTML/CSV/JSON/SQL][output-format]<br> 
  ([balance sheet], [income statement], [cashflow], [budget], [roi],
  [transactions], [time], [forecast]...)
- unlimited account hierarchy with [summarising], [aliasing], [pivoting]
- unlimited currencies/commodities, with cost/market [valuation]
- use via [CLI], [TUI], [WUI], [JSON API] or [Haskell library]
- easy to [script and extend]
- user-friendly, well documented, robust
- scales smoothly from simple, easy accounting needs to complex ones.

[output-format]:       hledger.md#output-format
[balance sheet]:       hledger.md#balancesheet
[income statement]:    hledger.md#incomestatement
[cashflow]:            hledger.md#cashflow
[budget]:              hledger.md#budget-report
[roi]:                 hledger.md#roi
[transactions]:        hledger.md#aregister
[time]:                hledger.md#timedot
[forecast]:            hledger.md#periodic-transactions
[multiperiod]:         hledger.md#multicolumn-balance-report
[multiple currencies]: hledger.md#commodities
[valuation]:           hledger.md#valuation
[summarising]:         hledger.md#depth-limiting
[aliasing]:            hledger.md#alias-directive
[pivoting]:            hledger.md#pivoting
[CLI]:                 hledger.md
[TUI]:                 ui.md
[WUI]:                 web.md
[JSON API]:            hledger-web.md#json-api
[Haskell library]:     https://hackage.haskell.org/package/hledger-lib
[script and extend]:   scripting.md


<a name="workflow"></a>
## How do I use it ?

<!-- Here's the most common getting started/work flow for hledger users: -->
At the start:

1. [Install](#install) one or more of the hledger tools
2. [Set up a journal](#setup), and maybe version control

On a regular basis (eg daily, can be <5m):

3. [Enter transactions](#transactions) manually and/or
4. [Import transactions](#import) from banks' CSV
5. [Reconcile](#reconcile) to catch mistakes

Whenever you like:

6. [Run reports](#reports) to answer questions and gain insight
7. Refine account names, CSV rules etc. to improve your reports and efficiency.

Knowing some [double entry accounting] will help you get the most from hledger,
but you can do fine just by following the examples below. You'll find your
bookkeeping/accounting skills improve naturally (and [help] is available).

[double entry accounting]: accounting.md#accounting-links
[help]: support.md


<a name="install"></a>
## Install

Quickly: [install hledger binaries](install.md), using your system package manager or our Github binaries.

Or slowly: [build hledger from source](install.md#building-from-source), using hledger-install.sh or stack or cabal.

<a name="setup"></a>
## Set up a journal

The [journal file](hledger.md#input) is a plain text file where transactions are
recorded. By default it is ~/.hledger.journal, and the add command or web add
form described below will create it automatically, so actually you don't need
to do anything here.

But here are some common changes people make sooner or later, so why not now:

- A dedicated folder, to consolidate financial files and make version control
  and backups easier:

  ```cli
  $ mkdir ~/finance
  $ cd ~/finance
  ```

- A separate journal file for each year, for performance and data
  compartmentalisation:

  ```cli
  $ touch 2023.journal
  ```

- A [LEDGER_FILE](hledger.md#setting-ledger_file) environment variable, so you won't
  have to type "-f ~/finance/2023.journal" with every command:

  ```cli
  $ echo "export LEDGER_FILE=~/finance/2023.journal" >> ~/.bashrc
  $ source ~/.bashrc
  ```
  Or if environment variables annoy you, symbolic-link the file to ~/.hledger.journal:
  ```cli
  $ ln -s ~/finance/2023.journal ~/.hledger.journal
  ```

- Some optional [directives](hledger.md#directives), useful especially with
  non-english account names:

  ```cli
  $ cat > 2023.journal

  ; Declare the five top level accounts in your preferred language/capitalisation;
  ; their types (to make reports like bs and is work); and their display order.
  ; Write at least 2 spaces before the ; comments.
  account assets       ; type:A, money you own. 2+ spaces are required before the ;.
  account liabilities  ; type:L, money you owe to others
  account equity       ; type:E, equal to A - L (not used much in personal finance)
  account revenues     ; type:R, revenue/income categories
  account expenses     ; type:X, expense categories

  ; Declare commodities/currencies and their decimal mark, digit grouping,
  ; number of decimal places..
  commodity $1000.00
  commodity 1.000,00 EUR
  
  <CTRL-D> (paste the command & text above into the terminal, then press control-d)
  ```

- Version control, for tracking changes:

  ```cli
  $ git init
  $ git add 2023.journal
  $ git commit 2023.journal -m 'start 2023 journal'
  ```

- Remember to also keep *backups*.


<a name="transactions"></a>
## Enter transactions

Recording transactions manually may sound tedious, but with a good text editor
or other data entry tool it can be fast. It also provides greatest financial
awareness. Some people enter everything by hand for this reason.

Run the add command for assisted data entry in the terminal ([tutorial](add.md)):

```cli
$ hledger add
...
Date [2023-03-10]: ...
```

Or run hledger-web and when the web browser opens, press a to add
([tutorial](web.md)):

```cli
$ hledger-web
...
Opening web browser...
```

Or using a [text editor](editors.md), add transactions to
[your journal file](hledger.md#input) like so:

```journal
2023-01-01 opening balances on january 1st
    assets:checking         $1000  ; a posting, increasing assets:checking's balance by $1000
    assets:cash              $100  ; write at least 2 spaces between account name and amount
    liabilities                $0
    equity                 $-1100  ; each transaction must sum to zero

2023-03-05 client payment
    assets:checking         $2000
    revenues:consulting    $-2000  ; revenues/liabilities/equity normally appear negative

2023-03-20 Sprouts
    expenses:food:groceries  $100
    assets:cash               $40
    assets:checking                ; a missing amount will be inferred ($-140 here)
```

As shown above, make the first transaction a dummy one that sets the opening
balances of your asset & liability accounts on some start date. hledger will
show accurate real-world account balances from this date onward, as long as
you record the subsequent transactions.

To make things easy on yourself, you can pick a very recent start date, like
today or last monday. Prioritise recording the transactions that happen after
this date. (Tip: the more often you do this, the easier it is.)

Then, as your time and financial records and desire for historical reports
allow, you can add older transactions. As you do, you'll need to adjust the
opening balances transaction, moving it back in time. Perhaps focus on one
account at a time, each with its own opening balances transaction if
necessary.


<a name="import"></a>
## Import transactions

Import means 1. convert transaction data from some other format (usually a
downloaded CSV file) and 2. save any new transactions to the main journal
file. It is often possible to automate this, perhaps to the point of a nightly
cron job and no manual data entry at all. This is convenient but costs some
financial awareness.

Download one or more CSV files containing transaction info, then create a 
[csv rules file](hledger.md#csv) for each. Eg if SomeBank.csv looks
like:

```csv
"Date","Note","Amount"
"2023/3/22","DEPOSIT","50.00"
"2023/3/23","ATM WITHDRAWAL","-10.00"
```

Create SomeBank.csv.rules containing rules like:

```rules
skip 1
fields date, description, amount
currency $
account1 assets:checking
account2 expenses:misc
if DEPOSIT
 account2 revenues:misc
if ATM WITHDRAWAL
 account2 assets:cash
```

Check the csv conversion looks ok:

```cli
$ hledger -f SomeBank.csv print
2023-03-22 DEPOSIT
    assets:checking          $50.00
    revenues:misc           $-50.00

2023-03-23 ATM WITHDRAWAL
    assets:checking         $-10.00
    assets:cash              $10.00
```

You can run reports directly from the csv, but I like to import the new
transactions into the main journal, keeping things in one place. The import
command ignores csv records it has seen before, saving the latest dates in
.latest.SomeBank.csv. This works for most csv files - you can try a dry run
first:

```cli
$ hledger import *.csv --dry-run
; would import 2 new transactions from SomeBank.csv:

2023-03-22 DEPOSIT
    assets:checking          $50.00
    revenues:misc           $-50.00

2023-03-23 ATM WITHDRAWAL
    assets:checking         $-10.00
    assets:cash              $10.00

$ hledger import *.csv 
imported 2 new transactions from SomeBank.csv
$ hledger import *.csv
no new transactions found in SomeBank.csv
```

Now to commit the new rules file and changed journal file:

```cli
$ git add SomeBank.csv.rules
$ git commit -m 'SomeBank csv rules' SomeBank.csv.rules
$ git commit -m 'txns' 2023.journal
```

In the above workflow, the journal file is permanent and downloaded csv files
are temporary. Some folks ([Full-fledged hledger], [hledger-flow]) prefer to
instead commit all csv files and regenerate the journal file.

[Full-fledged hledger]: https://github.com/adept/full-fledged-hledger
[hledger-flow]: https://github.com/apauley/hledger-flow


<a name="reconcile"></a>
## Reconcile

After entering or importing transactions, it's important to check for mistakes
(yours or others'), by comparing your reports with reality - your wallet,
statements, online balances etc.
See [Reconciling](hledger.md#reconciling).

<a name="reports"></a>
## Run reports

```cli
$ hledger accounts   # account names declared and used, as a list
assets
assets:cash
assets:checking
liabilities
equity
revenues
revenues:consulting
expenses
expenses:food:groceries

$ hledger accounts --tree   # accounts are actually a hierarchy
assets
  cash
  checking
equity
expenses
  food
    groceries
liabilities
revenues
  consulting

$ hledger balancesheet    # what do I own and owe ?
$ hledger bs              # short form
Balance Sheet 2023-03-20

                 || 2023-03-20 
=================++============
 Assets          ||            
-----------------++------------
 assets:cash     ||       $140 
 assets:checking ||      $2860 
-----------------++------------
                 ||      $3000 
=================++============
 Liabilities     ||            
-----------------++------------
-----------------++------------
                 ||            
=================++============
 Net:            ||      $3000 

$ hledger aregister --forecast checking   # or: hledger register checking
Transactions in assets:checking and subaccounts:
2023-01-01 opening balances ..  as:cash, liabiliti..         $1000         $1000
2023-03-05 client payment       re:consulting                $2000         $3000
2023-03-20 Sprouts              ex:fo:groceries, a..         $-140         $2860

$ hledger incomestatement --monthly --depth 2    # where is it coming from and going to ?
$ hledger is -M -2                               # short form
Income Statement 2023Q1

                     || Jan  Feb    Mar 
=====================++=================
 Revenues            ||                 
---------------------++-----------------
 revenues:consulting ||   0    0  $2000 
---------------------++-----------------
                     ||   0    0  $2000 
=====================++=================
 Expenses            ||                 
---------------------++-----------------
 expenses:food       ||   0    0   $100 
---------------------++-----------------
                     ||   0    0   $100 
=====================++=================
 Net:                ||   0    0  $1900 

$ hledger                         # show commands

$ hledger --help                  # show general options

$ hledger --man                   # show hledger's man page

$ hledger --info                  # show hledger's Info manual

$ hledger is --help               # show incomestatement's options and docs

$ hledger is --man                # show incomestatement in man page

$ hledger is --info               # show incomestatement's Info page

$ hledger help                    # show hledger docs in best available viewer

$ hledger help incomestatement    # show incomestatement docs in best available viewer

$ hledger-ui                      # start TUI

$ hledger-web                     # start WUI in default browser

```

For more detail, see:

- [hledger manual], web version

- [hledger.org website][full website], including tutorials and cookbook docs
