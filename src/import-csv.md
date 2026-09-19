# Tutorial: Import CSV data

Last updated: 2025

hledger has a powerful CSV converter built in. After saving a few
declarations in a "CSV rules file", it can read transactions from
almost any CSV file. This is described in detail in the [hledger manual][csv format],
but here are some quick examples.

Say you have downloaded this `checking.csv` file from a bank for the first time:
```csv
"Date","Note","Amount"
"2012/3/22","DEPOSIT","50.00"
"2012/3/23","TRANSFER TO SAVINGS","-10.00"
```

Create a rules file named `checking.csv.rules` in the same directory.
This tells hledger how to read this CSV file. Eg:
```rules
# skip the headings line:
skip 1

# use the first three CSV fields for hledger's transaction date, description and amount:
fields date, description, amount

# specify the date field's format - not needed here since date is Y/M/D
# date-format %-d/%-m/%Y
# date-format %-m/%-d/%Y
# date-format %Y-%h-%d

# since the CSV amounts have no currency symbol, add one:
currency $

# set the base account that this CSV file corresponds to
account1 assets:bank:checking

# the other account will default to expenses:unknown or income:unknown;
# we can optionally refine it by matching patterns in the CSV record:
if (TO|FROM) SAVINGS
  account2 assets:bank:savings

if WHOLE FOODS
  account2 expenses:food
```

You can [print] the resulting transactions in any of hledger's [output formats]:
```cli
$ hledger -f checking.csv print
2012-03-22 DEPOSIT
    assets:bank:checking          $50.00
    income:unknown               $-50.00

2012-03-23 TRANSFER TO SAVINGS
    assets:bank:checking         $-10.00
    assets:bank:savings           $10.00

```

Or run reports directly from the CSV:
```cli
$ hledger -f checking.csv bal
              $40.00  assets:bank:checking
              $10.00  assets:bank:savings
             $-50.00  income:unknown
--------------------
                   0
```

Or [import] any new transactions, saving them into your main journal:

```cli
$ hledger import checking.csv --dry-run 
; would import 2 new transactions from checking.csv:

2012-03-22 DEPOSIT
    assets:bank:checking          $50.00
    income:unknown               $-50.00

2012-03-23 TRANSFER TO SAVINGS
    assets:bank:checking         $-10.00
    assets:bank:savings           $10.00

$ hledger import checking.csv
imported 2 new transactions from checking.csv
```

hledger import ignores transactions it has seen before, so it's safe
to run it repeatedly. (It creates a hidden `.latest.checking.csv` file
in the same directory. If you need to forget the state and start over,
delete this.)

## Customize the default "unknown" accounts

When converting CSV, hledger uses the account names `income:unknown`
and `expenses:unknown` as defaults. Normally when you see these, you
will want to add CSV rules to set a more specific account name.
But you may want to change these defaults, eg into your language.

Method 1:
You can add rules something like these, as the first account2 rules:

```rules
# set account2 to this:
account2 Revenues:Misc

# change it to Expenses:Misc if the csv "amount" field contains a minus sign:
if %amount -
 account2 Expenses:Misc

# override it with more specific rules below...
```

Method 2:
You can use --alias options to rewrite those account names.
With hledger 1.20+:

```cli
$ hledger -f checking.csv --alias income:unknown=Income:Misc --alias expenses:unknown=Expenses:Misc print
2012-03-22 DEPOSIT
    assets:bank:checking          $50.00
    Income:Misc                  $-50.00

2012-03-23 TRANSFER TO SAVINGS
    assets:bank:checking         $-10.00
    assets:bank:savings           $10.00

```


## See also

Full documentation of CSV conversion, and more rules examples, can be
found in the [hledger manual][csv format].

A collection of CSV rules can be found in [examples/csv/] in the main hledger repository.
There is also a [Makefile](https://github.com/hledgerorg/hledger/blob/main/examples/csv/Makefile)
to help manage and import multiple CSV files. I keep journals, csv files and csv rules in one finance directory;
the makefile moves downloaded csv files there and imports them. The procedure could be:

- In browser: download one or more CSVs manually
- In terminal: `make -C ~/finance Import`

There are many other CSV conversion tools (nine CSV->*ledger tools at last count), linked at
[plaintextaccounting.org -> data import/conversion](https://plaintextaccounting.org/#data-importconversion).


[output formats]: hledger.html#output-format
[csv format]: hledger.html#csv-format
[print]: hledger.html#print
[import]: hledger.html#import
[examples/csv/]: https://github.com/hledgerorg/hledger/tree/main/examples/csv
