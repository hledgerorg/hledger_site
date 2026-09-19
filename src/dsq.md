# hledger and dsq/DataStation

Last updated: 2023

<https://github.com/multiprocessio/datastation> GUI for reporting on CSV and other tabular file formats \
<https://github.com/multiprocessio/dsq> command line spinoff 

`dsq` makes CSV and some other things queryable with SQL, as if it was an sqlite database. (It is powered by sqlite, with additional functions from the go sqlite lib). So combined with CSV output from `hledger print` or `hledger register` it's an instant new sqlite-like query language. Some examples with dsq 0.20.1:

A quick one-line query on postings:
```cli
hledger print -O csv | dsq -s csv -n -p  "select * from {} where date>'2022-06-15' and abs(amount) > 500"
```
-n interprets numeric fields more accurately as numbers.
-p shows pretty text output (otherwise it shows json and runs faster).

If reading one file, you can enable caching with -C, giving a speedup when the file has not changed:
```cli
hledger print -o 2022.csv
time dsq 2022.csv -C -n -p "select count(*) from {}"
time dsq 2022.csv -C -n -p "select count(*) from {}"
```

-i gives an interactive REPL, avoiding reparsing files between commands, for another speedup:
```cli
$ dsq 2022.csv -C -n -p -i
dsq> select count(distinct date) from {}
+----------------------+
| count(distinct date) |
+----------------------+
|                  130 |
+----------------------+
(1 row)
dsq> select description,amount from {} order by date desc limit 1
+--------+-------------+
| amount | description |
+--------+-------------+
|    3.5 | chipper     |
+--------+-------------+
(1 row)
dsq>
```

Fields are sorted alphabetically, for now.

The CLI has a few issues you might run into - combining flags, multiple files, cache initialisation, crashing on empty results...

With no query, dsq outputs JSON (and piping through jq will prettify it).
So here's a way to export transactions as human-readable JSON
that is simpler than hledger's `-O json` output:
```cli
$ hledger print -O csv | dsq -s csv -n | jq -S
[
  {
    "date2": "",
    "amount": -1,
    "txnidx": 1,
    "credit": 1,
    "description": "income",
    "status": "",
    "code": "",
    "account": "income:salary",
    "date": "2008-01-01",
    "commodity": "$",
    "debit": "",
    "posting-status": "",
    "posting-comment": "",
    "comment": ""
  },
...
```
