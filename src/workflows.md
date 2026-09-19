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


[convert]:           hledger.md#csv
[import]:            hledger.md#import
[balance sheet]:     https://en.wikipedia.org/wiki/Balance_sheet#Personal
[income statement]:  https://en.wikipedia.org/wiki/Income_statement

