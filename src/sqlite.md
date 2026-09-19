# hledger and SQLite

Last updated: 2023

With SQLite you can do full relational queries on your hledger data.

Here we export all transactions to a database and run some queries:
```cli
$ hledger -f examples/bcexample.journal print -O sql | sqlite3 bcexample.db
$ sqlite3 bcexample.db -column -header
SQLite version 3.37.0 2021-12-09 01:34:53
Enter ".help" for usage hints.
sqlite> .tables
postings
sqlite> .schema
CREATE TABLE postings(id serial,txnidx int,date1 date,date2 date,status text,code text,description text,comment text,account text,amount numeric,commodity text,credit numeric,debit numeric,posting_status text,posting_comment text);
sqlite> select count(*) from postings;
count(*)
--------
3203
sqlite> select distinct txnidx,description,abs(amount) from postings order by abs(amount) desc limit 5;
txnidx  description                                       abs(amount)
------  ------------------------------------------------  -----------
1031    Allowed contributions for one year                17500
1035    Allowed contributions for one year                17500
1027    Allowed contributions for one year                17000
142     Transfering accumulated savings to other account  5000
954     Hoogle | Payroll                                  4615.38
sqlite> sqlite> select * from postings where txnidx=954;
id  txnidx  date1       date2  status  code  description       comment  account                                     amount    commodity  credit   debit    posting_status  posting_comment
--  ------  ----------  -----  ------  ----  ----------------  -------  ------------------------------------------  --------  ---------  -------  -------  --------------  ---------------
    954     2012-01-05         *             Hoogle | Payroll           Assets:US:BofA:Checking                     1350.6    USD                 1350.6
    954     2012-01-05         *             Hoogle | Payroll           Assets:US:Vanguard:Cash                     1200      USD                 1200
    954     2012-01-05         *             Hoogle | Payroll           Assets:US:Federal:PreTax401k                -1200     IRAUSD     1200
    954     2012-01-05         *             Hoogle | Payroll           Expenses:Taxes:Y2012:US:Federal:PreTax401k  1200      IRAUSD              1200
    954     2012-01-05         *             Hoogle | Payroll           Income:US:Hoogle:Salary                     -4615.38  USD        4615.38
    954     2012-01-05         *             Hoogle | Payroll           Income:US:Hoogle:GroupTermLife              -24.32    USD        24.32
    954     2012-01-05         *             Hoogle | Payroll           Expenses:Health:Life:GroupTermLife          24.32     USD                 24.32
    954     2012-01-05         *             Hoogle | Payroll           Expenses:Health:Dental:Insurance            2.9       USD                 2.9
    954     2012-01-05         *             Hoogle | Payroll           Expenses:Health:Medical:Insurance           27.38     USD                 27.38
    954     2012-01-05         *             Hoogle | Payroll           Expenses:Health:Vision:Insurance            42.3      USD                 42.3
    954     2012-01-05         *             Hoogle | Payroll           Expenses:Taxes:Y2012:US:Medicare            106.62    USD                 106.62
    954     2012-01-05         *             Hoogle | Payroll           Expenses:Taxes:Y2012:US:Federal             1062.92   USD                 1062.92
    954     2012-01-05         *             Hoogle | Payroll           Expenses:Taxes:Y2012:US:State               365.08    USD                 365.08
    954     2012-01-05         *             Hoogle | Payroll           Expenses:Taxes:Y2012:US:CityNYC             174.92    USD                 174.92
    954     2012-01-05         *             Hoogle | Payroll           Expenses:Taxes:Y2012:US:SDI                 1.12      USD                 1.12
    954     2012-01-05         *             Hoogle | Payroll           Expenses:Taxes:Y2012:US:SocSec              281.54    USD                 281.54
    954     2012-01-05         *             Hoogle | Payroll           Assets:US:Hoogle:Vacation                   4.62      VACHR               4.62
    954     2012-01-05         *             Hoogle | Payroll           Income:US:Hoogle:Vacation                   -4.62     VACHR      4.62
sqlite>
```

You can avoid creating a .db file, always querying the latest journal file instead:
```cli
$ (hledger print -O sql; echo "select * from postings where account like 'liabilities%' and amount > 0") | sqlite3 -column -header
```

Here's a shell function to make that convenient:
```cli
$ hq() { (hledger print -O sql; echo "$1") | sqlite3 -column -header; }
```
Example queries:
```cli
$ hq "select distinct(account) from postings order by account"
$ hq "select * from postings where account like '%savings%' and amount > 0"
```

The `txnidx` field connects postings belonging to the same transaction.
Using this, we can query transactions, and in more complex ways than hledger can.
Here's an example where we want to see just the transfers from Checking to Liabilities.
This is hard to do accurately with hledger's CLI(1):
```cli
$ echo; hq "select * from postings where txnidx in \
  (select txnidx from postings where account regexp 'Liabilities' and amount > 0 and txnidx in \
    (select txnidx from postings where account regexp 'Checking' and amount < 0))"
> > 
id  txnidx  date1       date2  status  code  description                           comment  account                      amount   commodity  credit  debit   posting_status  posting_comment
--  ------  ----------  -----  ------  ----  ------------------------------------  -------  ---------------------------  -------  ---------  ------  ------  --------------  ---------------
    147     2012-01-08         *             Chase:Slate | Paying off credit card           Liabilities:US:Chase:Slate   140.36   USD                140.36                                 
    147     2012-01-08         *             Chase:Slate | Paying off credit card           Assets:US:BofA:Checking      -140.36  USD        140.36                                         
    163     2012-02-11         *             Chase:Slate | Paying off credit card           Liabilities:US:Chase:Slate   725.96   USD                725.96                                 
    163     2012-02-11         *             Chase:Slate | Paying off credit card           Assets:US:BofA:Checking      -725.96  USD        725.96                                         
    177     2012-03-09         *             Chase:Slate | Paying off credit card           Liabilities:US:Chase:Slate   580      USD                580                                    
    177     2012-03-09         *             Chase:Slate | Paying off credit card           Assets:US:BofA:Checking      -580     USD        580                                            
...
```

(1. Well.. it's not *that* hard to get a decent result given typical data patterns:
```cli
$ hledger -f examples/bcexample.journal print Checking | hledger -f- areg -w80 Liabilities amt:'>0'
Transactions in Liabilities and subaccounts:
2012-01-08 Chase:Slate | Pay..  Li:US:Ch:Slate          140.36 USD    140.36 USD
2012-02-11 Chase:Slate | Pay..  Li:US:Ch:Slate          725.96 USD    866.32 USD
2012-03-09 Chase:Slate | Pay..  Li:US:Ch:Slate          580.00 USD   1446.32 USD
...
```
but in general, this is not as robust as the relational query.)


Only hledger's `print` command outputs SQL. 
But many hledger reports can produce CSV, and you can also run SQLite on that:

- <https://til.simonwillison.net/sqlite/one-line-csv-operations>

or on hledger's JSON output:

- <https://stackoverflow.com/a/41406852/84401>

See also [hledger and dsq / DataStation](dsq.md).

And [Michael Peter: My plain text accounting workflow with hledger](https://rootknecht.net/blog/accounting/#visualizing-and-analyzing2). This recommends the following export command to create a useful primary key:

```cli
hledger print -O sql | sed 's/id serial/id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL/g' | sqlite3 ledger.db
```

([#2017](https://github.com/hledgerorg/hledger/issues/2017))
