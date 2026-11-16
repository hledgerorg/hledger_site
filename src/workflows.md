# Workflows

There are lots of ways to use hledger; here is an overview.
Of course you can mix and match these.
Also remember always to back up your files regularly to safeguard your data.

## Basic workflows
### Command line

At a terminal prompt, run `hledger add` and follow the interactive prompts to enter transactions.
It will store data in its default location.
Run `hledger` to list commands to try.
Eg, run
`hledger bs` to see your account balances (a [balance sheet]), and
`hledger is` to see your income and expenses (an [income statement]).

[Tutorial: hledger add](add.md) describes this process, and hledger's basic concepts and file format, step by step.
You might want to skim through this one even if you don't plan to use `hledger add`.

### Web UI

This is the easiest hledger workflow, if it works for you:

Download and run `hledger-web`, eg by double-clicking on it.
It should open in your web browser.
Use the add form to add transactions.
It will store data in its default location.
(So you'll see your transactions next time you run it.)

[Tutorial: hledger-web](web.md) describes this in more detail.

### Terminal UI

Use `hledger add` once to create a journal file with an opening balances transaction.
Now run `hledger-ui` to view account balances.
Use the onscreen help to get around and discover the controls.
Eg, press `a` to add new transactions.

[Tutorial: hledger-ui](ui.md) describes this setup in more detail.

### Text editor

Open your preferred text editor and create a journal file, either `.hledger.journal` in your home directory,
or somewhere else like `~/finance/2023.journal` (and [set the `LEDGER_FILE` environment variable](hledger.md#setting-ledger_file)).
Create transactions by hand using [journal file](hledger.md) format.
Once you have a few, you can copy/paste them to make more.
When you want more assistance, set up an [editor mode](editors.md).
Here's an example:

```journal
; $HOME/.hledger.journal

2020-01-01 opening balances
    assets:checking         $1234
    equity

2020-03-15 client payment
    assets:checking         $2000
    income:consulting

2020-03-20 Sprouts
    expenses:food:groceries  $100
    assets:cash               $40
    assets:checking
```

Run `hledger` in a terminal to see reports, as in the Command line workflow. Eg:

```cli
$ hledger bs
Balance Sheet 2020-03-20

             || 2020-03-20 
=============++============
 Assets      ||            
-------------++------------
 assets      ||      $3134 
   cash      ||        $40 
   checking  ||      $3094 
-------------++------------
             ||      $3134 
=============++============
 Liabilities ||            
-------------++------------
-------------++------------
             ||            
=============++============
 Net:        ||      $3134 

$ hledger is -M
Income Statement 2020-01-01-2020-03-20

                         || Jan  Feb    Mar 
=========================++=================
 Revenues                ||                 
-------------------------++-----------------
 income:consulting       ||   0    0  $2000 
-------------------------++-----------------
                         ||   0    0  $2000 
=========================++=================
 Expenses                ||                 
-------------------------++-----------------
 expenses:food:groceries ||   0    0   $100 
-------------------------++-----------------
                         ||   0    0   $100 
=========================++=================
 Net:                    ||   0    0  $1900 
```

### CSV import

Download CSV files from banks and financial institutions, manually or
using tools/services that automate this (ledger_autosync, Plaid, plaid2qif, Tiller etc.)
Use hledger's import command to convert and import the new transactions,
and use any of the hledger UIs to see reports.

[Tutorial: Import CSV data](import-csv.md) is a quick tutorial on the importing from CSV part.
Some downloading helpers can be found at
<https://plaintextaccounting.org/#data-importconversion> (search for "download").


## Comparing CSV workflows

hledger's [import] command, hledger [reading CSV files directly][convert],
[hledger-flow](https://github.com/apauley/hledger-flow) and [Full-fledged hledger](https://github.com/adept/full-fledged-hledger)
are four ways to get bank data into hledger. The main difference: 
- With hledger import, your journal is the main record, and new transactions are appended to it. CSV files can overlap, and can be downloaded often (eg daily).
- With the other three, your CSV files are the main record and transactions are regenerated from them, so improving the rules also reclassifies old transactions. CSV files must be disjoint.

|                                  | hledger import                                                                                                                                            | hledger, reading CSV directly                                                                          | hledger-flow                                                                                     | Full-fledged hledger                                                                                                                   |
|----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| **What it is**                   | A built-in command                                                                                                                                        | A built-in feature: `-f FILE.csv`, or (since 1.99.5) [include]-ing a CSV or rules file in your journal | A separate program that you install                                                              | A tutorial, template and build script that you copy and adapt                                                                          |
| **Platforms**                    | All                                                                                                                                                       | All                                                                                                    | Linux, Mac, Windows                                                                              | Unix-like systems (Linux, Mac, WSL); others via Docker                                                                                 |
| **Requires**                     | hledger                                                                                                                                                   | hledger                                                                                                | hledger, hledger-flow                                                                            | hledger, stack (Haskell), bash and Unix tools, optionally pricehist; or the Docker image                                               |
| **Transactions from CSV**        | Appended to your main journal; you can edit them                                                                                                          | Converted in-memory on every run; not editable                                                         | Converted when needed, and saved; not editable                                                   | Converted when needed, and saved; not editable                                                                                         |
| **Transactions entered by hand** | Also in the main journal                                                                                                                                  | In a journal file                                                                                      | In separate `_manual_` files                                                                     | In yearly journal files                                                                                                                |
| **File layout**                  | Your choice; optional `rules`, `data`, `prices` folders for convenience                                                                                   | Your choice                                                                                            | Folders per owner, bank, account and year                                                        | One folder per source, one journal per year                                                                                            |
| **Price downloading**            | Optional: `--get` (since 1.99.3) runs your `getprices` script; fetches daily prices for each commodity from first use to today; preserves existing prices | Likewise, via [get]                                                                                    | Not supported; you supply yearly price files                                                     | Optional, using pricehist; fetches prices on transaction dates, for commodities and years you configure; regenerates (can drop prices) |
| **Transaction downloading**      | Optional: `--get` runs your `getdata` script; or [source] runs a fetching command                                                                         | Likewise, via [get] or [source]                                                                        | Not supported; you supply transaction CSV files                                                  | Not supported; you supply transaction CSV files                                                                                        |
| **Overlapping downloads**        | Supported; only new transactions are added                                                                                                                | Not supported; needs disjoint CSV files                                                                | Not supported; needs disjoint CSV files                                                          | Not supported; needs disjoint CSV files                                                                                                |
| **Keeping CSV files**            | Optional ([archive] rule)                                                                                                                                 | Required; they are the data                                                                            | Required; they are the data                                                                      | Required; they are the data                                                                                                            |
| **CSV conversion**               | CSV rules, optional cleaning command ([source] rule)                                                                                                      | CSV rules, optional cleaning command ([source] rule)                                                   | CSV rules, optional preprocess and construct scripts                                             | Per-source cleaning and conversion scripts, plus CSV rules                                                                             |
| **Journal regeneration**         | Not needed                                                                                                                                                | Not needed; CSV data is reconverted on every run                                                       | `hledger-flow import`                                                                            | A build script that you maintain                                                                                                       |
| **After changing rules**         | Only later imports are affected                                                                                                                           | All transactions in later reports are affected                                                         | All regenerated journals are affected                                                            | All regenerated journals are affected                                                                                                  |
| **Loading a subset of years**    | Your choice; see [close]                                                                                                                                  | Your choice; see [close]                                                                               | Possible by adding closing/opening entries, eg with [close]; normally all years are loaded       | Supported; closing/opening transactions are generated                                                                                  |
| **Reports**                      | No special support, run as needed                                                                                                                         | No special support, run as needed                                                                      | A standard set per owner and year, generated by `hledger-flow report`                            | A standard set per year, plus your own, regenerated with the journals                                                                  |
| **Other topics covered**         | See the [manual](dev/hledger.md)                                                                                                                          | See the [manual](dev/hledger.md)                                                                       | Transfers, opening and closing balances                                                          | Investments, mortgages, foreign currency, tax returns, lots, prices                                                                    |
| **Good for**                     | Updating the journal often; easy overlapping downloads; editing imported transactions                                                                     | A smallish set of disjoint CSV files; reclassifying old transactions; no special import step           | Many, disjoint CSV files; reclassifying old transactions; reviewing changes; a ready-to-run tool | Many, disjoint CSV files; reclassifying old transactions; reviewing changes; customising every step                                    |


## Version control

It's optional, but keeping your journal files in a version control system
is a very useful way to track changes, undo mistakes, and keep backups. Eg with git:

```cli
$ git init                                     # start tracking changes in this directory
$ git add main.journal                         # start tracking this file
$ git commit -m 'first commit' main.journal    # save a snapshot
$ git status; git diff                         # see uncommitted changes
$ git commit -m 'updates' main.journal         # save another snapshot
$ git log                                      # see past commits
```

Other tools such as darcs or jj work just as well.
Committing after each reconciliation or import is a good habit;
and you can commit report output too, to detect changes (see [Checking for errors](checking-for-errors.md#compare-report-output)).

## Custom workflows

### SM
- [Export Lots workflow](https://github.com/hledgerorg/hledger/tree/main/examples/investing/export-lots-workflow)
- [hledger workflow 2025](https://joyful.com/hledger+workflow+2025)
- [SM's 2023 setup](sm-2023-setup.md)
- [SM's 2019 setup](sm-2019-setup.md)
- [SM's time & task dashboard](time-and-task-dashboard.md)

### hledger YouTube Business Template

- Kaylee Beyene's [hledger-youtube-business](https://github.com/KayleeBeyene/hledger-youtube-business), a beginner-friendly hledger starter kit for YouTubers and Canadians.

### phobo3s Excel
- phobo3s's [Excel-based setup](https://forum.plaintextaccounting.org/t/using-hledger-together-with-excel/697), which calculates FIFO cost basis & gains

### Full-fledged hledger
- Dmitry Astapov's [Full-fledged Hledger](https://github.com/adept/full-fledged-hledger), a CSV-first workflow tutorial

### hledger-flow
- Andreas Pauley's [hledger-flow](https://github.com/apauley/hledger-flow), a tool implementing a variant of the above

### rtrLEDGER
- rotorkunstkultur's [hledger system for chaotic German freelancers](https://github.com/rotorkunstkultur/rtrledger), using SKR04 accounts

### barrucadu
- Michael Walker's [personal finance setup](https://memo.barrucadu.co.uk/personal-finance.html), with Grafana dashboard


[convert]:           dev/hledger.md#csv
[import]:            dev/hledger.md#import
[source]:            dev/hledger.md#source
[get]:               dev/hledger.md#get
[archive]:           dev/hledger.md#archive
[include]:           dev/hledger.md#include-directive
[close]:             dev/hledger.md#close
[balance sheet]:     https://en.wikipedia.org/wiki/Balance_sheet#Personal
[income statement]:  https://en.wikipedia.org/wiki/Income_statement

