# Import new transactions

The [import](hledger.md#import) command detects just the new transactions in some input files,
and adds them to the main journal.

This works with any of hledger's input formats.
But it's especially useful with downloaded bank CSV files, which may contain records already seen in previous downloads.
It means you don't have to be careful about downloading exact date ranges.

Using bank.csv from the previous step: the first time we run import, it detects the two transactions:

```cli
$ hledger import bank.csv
imported 2 new transactions from bank.csv
```

And if we run it again on the same file, those transactions are not re-imported:

```cli
$ hledger import bank.csv
no new transactions found in bank.csv
```

```cli
$ hledger aregister checking
2023-01-01 opening balances     as:ba:savings, as:..      $1000.00      $1000.00
2023-02-01 GOODWORKS CORP       in:salary                 $1000.00      $2000.00
2023-02-22 DEPOSIT              in:unknown                  $50.00      $2050.00
2023-02-23 TRANSFER TO SAVINGS  as:ba:savings              $-10.00      $2040.00
```

(It uses a hidden file, `.latest.bank.csv`, to remember which dates have been processed.)

For more detail, see: [Tutorial: Import CSV data](import-csv.md)

Importing like this, and reading CSV directly as in [Read CSV files](read-csv-files.md), are two of several CSV workflows;
to choose one, see [Comparing CSV workflows](workflows.md#comparing-csv-workflows).

<br>

(Part of [hledger by example](hbe.md).)
