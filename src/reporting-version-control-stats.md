# Reporting version control stats

Last updated: 2023

You can export version control history as a journal, for analysis with hledger.
Here's an example: comparing the big 3 PTA apps' git commit counts.

Start a journal with some account declarations; this is just to set the projects' display order:
```cli
printf "account ledger\naccount hledger\naccount beancount\n" >project-commits.j
```

Export each git commit as a transaction. git log makes this easy; we include the commit date, short hash, and summary:
```cli
for P in ledger hledger beancount; do
  git -C ../$P log --reverse --format="%cd (%h) %s%n  ($P)  1%n" --date=short
done >> project-commits.j 
```

The resulting journal looks like:
```journal
account ledger
account hledger
account beancount

2003-09-29 (e95ea133) Initial revision
  (ledger)  1

2003-09-29 (faaed980) *** empty log message ***
  (ledger)  1
...
```

Now we can run reports:
```cli
$ hledger -f project-commits.j  stats
Main file                : /Users/simon/src/PTA/hledger/project-commits.j
Included files           : 
Transactions span        : 2003-09-29 to 2023-12-02 (7369 days)
Last transaction         : 2023-12-01 (0 days ago)
Transactions             : 24966 (3.4 per day)
Transactions last 30 days: 76 (2.5 per day)
Transactions last 7 days : 15 (2.1 per day)
Payees/descriptions      : 19997
Accounts                 : 3 (depth 1)
Commodities              : 1 ()
Market prices            : 0 ()

Run time (throughput)    : 0.70s (35759 txns/s)
```

```cli
$ hledger -f project-commits.j bal -YTN --transpose
Balance changes in 2003-01-01..2023-12-31:

         || ledger  hledger  beancount 
=========++============================
 2003    ||     50        0          0 
 2004    ||    327        0          0 
 2005    ||      0        0          0 
 2006    ||      0        0          0 
 2007    ||      0      150          0 
 2008    ||   1248      407        190 
 2009    ||   1462      610         86 
 2010    ||    437      606         15 
 2011    ||    153      529         25 
 2012    ||    706      350         18 
 2013    ||    708      365        433 
 2014    ||    578      567       1484 
 2015    ||    367      542       1160 
 2016    ||    115      732        686 
 2017    ||     55      892        240 
 2018    ||     78     1155        393 
 2019    ||    130     1089        189 
 2020    ||     90     1313        773 
 2021    ||     42     1131        299 
 2022    ||     55      832        112 
 2023    ||    162      773         57 
   Total ||   6763    12043       6160 
```

```cli
$ for P in ledger hledger beancount; do hledger -f project-commits.j reg -w80 ^$P | head -1; done
2003-09-29 Initial revision     (ledger)                         1             1
2007-01-27 start                (hledger)                        1             1
2008-04-23 Initial import.      (beancount)                      1             1
```

```cli
$ for P in ledger hledger beancount; do hledger -f project-commits.j print ^$P | hledger -f- bal -YATN --summary | tail -4; done

        ||   Total  Average 
========++==================
 ledger ||    6763      322 

         ||   Total  Average 
=========++==================
 hledger ||   12043      708 

           ||   Total  Average 
===========++==================
 beancount ||    6160      385 
```
