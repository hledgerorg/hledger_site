# 5 minute quick start

### 1. Record transactions

hledger reads transactions from a [journal file](hledger.md#input) -
usually `~/.hledger.journal`, or `C:\Users\USER\.hledger.journal`, or whatever you've set LEDGER_FILE to.
<!-- It uses [journal format](hledger.md#journal). -->

Transactions are recorded like this:

```journal
2025-04-10 MyGas
  Expenses:Automotive              $20
  Liabilities:Acme Credit Card
```

A date and description, followed by several indented account postings, 
with two or more spaces between each account name and its amount.
Colons indicate subaccounts.
Here are the parts in more detail:

[![a hledger transaction entry, showing names of parts](https://raw.githubusercontent.com/RobertNielsen1/hledger/master/hledger%20basic%20transaction%20--%20terms.png)](https://github.com/RobertNielsen1/hledger/blob/master/hledger%20basic%20transaction%20--%20terms.png)

A transaction is a movement of money between accounts.
So the amounts in a transaction must add up to zero.
If you leave one amount blank, it will be calculated automatically ($-20 in this case).

A positive amount means "added to this account", a negative amount means "removed from this account" ([debit and credit](https://plaintextaccounting.org/FAQ#where-are-debits-and-credits)).

Here's the start of a journal, with comments.
To follow along with these examples, save this as your journal file.
You can use a text editor; or you could run [hledger add](hledger.md#add) or [hledger web](hledger.md#web)
and enter these transactions interactively (no need to enter the comments).

```journal

2023-01-01 opening balances            ; <- First transaction sets starting balances.
    assets:bank:checking        $1000  ; <- Account names can be anything.
    assets:bank:savings         $2000  ; <- Colons indicate subaccounts.
    assets:cash                  $100  ; <- 2+ spaces are required before the amount.
    liabilities:credit card      $-50  ; <- A debt; these are negative.
    equity:opening/closing     $-3050  ; <- Starting balances come from equity.
                                       ;    Equity is also usually negative.
                                       ;    (Reports can show as positive when needed.)

2023-02-01 GOODWORKS CORP              ; <- Date order is recommended but optional.
    assets:bank:checking       $1000
    income:salary                      ; <- $-1000 is inferred here to balance the txn.
                                       ;    Income amounts are negative.

2023-02-15 market
    expenses:food             $50
    assets:cash                        ; <- $-50 is inferred here.
```
<!--
(It it looks verbose, note we often use auto-completion, or generate entries automatically from bank data.
You can also use shorter account names or aliases.)
-->

Some people record all transactions by hand in this way.
But you can also import them from bank data, as we'll see below.


### 2. Add declarations

Transaction entries like the above are all you need to get started, so feel free to skip this step till later.
But we usually add some declarations at the top of the file to enable more error checking.

First, declare your currencies/commodities, and their display style. In this case there's only one, `$`:

```journal

commodity $1000.00
```

or it could be:

```journal

commodity $ 1.000,00
```

Now, you can check that all amounts have a valid commodity symbol:
```cli
$ hledger check commodities
$
```

Next, declare your top level accounts and their [type](hledger.md#account-types),
eg like this
(or in other languages:
[ar](https://github.com/hledgerorg/hledger/blob/main/examples/i18n/ar.journal)
[da](https://github.com/hledgerorg/hledger/blob/main/examples/i18n/da.journal)
[de](https://github.com/hledgerorg/hledger/blob/main/examples/i18n/de.journal)
[en](https://github.com/hledgerorg/hledger/blob/main/examples/i18n/en.journal)
[es](https://github.com/hledgerorg/hledger/blob/main/examples/i18n/es.journal)
[fr](https://github.com/hledgerorg/hledger/blob/main/examples/i18n/fr.journal)
[ja](https://github.com/hledgerorg/hledger/blob/main/examples/i18n/ja.journal)
[ko](https://github.com/hledgerorg/hledger/blob/main/examples/i18n/ko.journal)
[no](https://github.com/hledgerorg/hledger/blob/main/examples/i18n/no.journal)
[pt](https://github.com/hledgerorg/hledger/blob/main/examples/i18n/pt.journal)
[se](https://github.com/hledgerorg/hledger/blob/main/examples/i18n/se.journal)
[zh](https://github.com/hledgerorg/hledger/blob/main/examples/i18n/zh.journal)
...):

```journal

account assets                   ; type:A
account liabilities              ; type:L
account equity                   ; type:E
account income                   ; type:R
account expenses                 ; type:X

account assets:bank              ; type:C
account assets:cash              ; type:C

account equity:conversion        ; type:V
```

This helps reports show the right accounts. 
It also sets their preferred [display order](hledger.md#account-display-order).

If you'd like more error checking, declare all account names, not just the top-level ones:

```journal

account assets                   ; type:A
account assets:bank              ; type:C
account assets:bank:checking
account assets:bank:savings
account assets:cash              ; type:C

account liabilities              ; type:L
account liabilities:credit card

account equity                   ; type:E
account equity:conversion        ; type:V
account equity:opening/closing

account income                   ; type:R
account income:salary
account income:gifts

account expenses                 ; type:X
account expenses:rent
account expenses:food
account expenses:gifts
```

Then you can check that all transactions use valid account names:
```cli
$ hledger check accounts
$
```

You can also use [strict mode](hledger.md#strict-mode),
which enables both of these checks, 
by adding `-s` to any command (or to your [config file](hledger.md#config-files)).

Here's the [above journal](https://raw.githubusercontent.com/hledgerorg/hledger/refs/heads/main/examples/quickstart.journal) in full.

<!-- [quickstart.journa]: https://github.com/hledgerorg/hledger/blob/main/examples/quickstart.journal -->

### 3. Run reports

<!-- NB Home links here -->

Now you can see reports, such as...

A list of accounts, showing the hierarchy and types detected:
```cli
$ hledger accounts --tree --types
assets               ; type: A
  bank               ; type: C
    checking         ; type: C
    savings          ; type: C
  cash               ; type: C
liabilities          ; type: L
  credit card        ; type: L
equity               ; type: E
  conversion         ; type: V
  opening/closing    ; type: E
income               ; type: R
  salary             ; type: R
  gifts              ; type: R
expenses             ; type: X
  rent               ; type: X
  food               ; type: X
  gifts              ; type: X
```

A balance sheet, showing what you own and owe:
```cli
$ hledger bs
Balance Sheet 2023-02-15

                         || 2023-02-15 
=========================++============
 Assets                  ||            
-------------------------++------------
 assets:bank:checking    ||      $2000 
 assets:bank:savings     ||      $2000 
 assets:cash             ||        $50 
-------------------------++------------
                         ||      $4050 
=========================++============
 Liabilities             ||            
-------------------------++------------
 liabilities:credit card ||        $50 
-------------------------++------------
                         ||        $50 
=========================++============
 Net:                    ||      $4000 
```

An income statement (AKA profit and loss report), showing what you received and spent:
```cli
$ hledger is -MTA
Income Statement 2023-01-01..2023-02-28

               || Jan    Feb    Total  Average 
===============++==============================
 Revenues      ||                              
---------------++------------------------------
 income:salary ||   0  $1000    $1000     $500 
---------------++------------------------------
               ||   0  $1000    $1000     $500 
===============++==============================
 Expenses      ||                              
---------------++------------------------------
 expenses:food ||   0    $50      $50      $25 
---------------++------------------------------
               ||   0    $50      $50      $25 
===============++==============================
 Net:          ||   0   $950     $950     $475 
```

An account register, showing the transactions and running balance in a particular account:
```cli
$ hledger aregister checking
Transactions in assets:bank:checking and subaccounts:
2023-01-01 opening balances     as:ba:savings, as:..         $1000         $1000
2023-02-01 GOODWORKS CORP       in:salary                    $1000         $2000
```

Congratulations, you can now begin to track your daily finances with hledger!

[Docs](doc.md) has more detailed help.

## As a terminal session

Here are the same steps and more, as a sequence of commands you could run in a terminal.
(From the former "2 minute quick start".)

```cli
$ brew install hledger    # or apt, choco, but check Install for freshness
```
```cli
$ cat >main.journal    # record a transaction manually from command line
2022-01-01 opening balances as of this date
    assets:bank:checking           $1000  ; This is a comment.
    assets:bank:savings            $2000  ; 2+ spaces are required before each amount.
    assets:cash                     $100
    liabilities:creditcard          $-50
    equity:opening/closing balances
^D
```
```cli
$ export LEDGER_FILE=main.journal    # use this file by default
$ echo 'export LEDGER_FILE=main.journal' >>~/.profile    # and in future sessions
```
```cli
$ hledger add    # record a transaction interactively
Adding transactions to journal file main.journal
Any command line arguments will be used as defaults.
Use tab key to complete, readline keys to edit, enter to accept defaults.
An optional (CODE) may follow transaction dates.
An optional ; COMMENT may follow descriptions or amounts.
If you make a mistake, enter < at any prompt to go one step backward.
To end a transaction, enter . when prompted.
To quit, enter . at a date prompt or press control-d or control-c.
Date [2022-02-08]: 2/15
Description: market
Account 1: expenses:food
Amount  1: $50
Account 2: assets:cash
Amount  2 [$-50]: 
Account 3 (or . or enter to finish this transaction): 
2022-02-15 market
    expenses:food             $50
    assets:cash              $-50

Save this transaction to the journal ? [y]: 
Saved.
Starting the next transaction (. or ctrl-D/ctrl-C to quit)
Date [2022-02-15]: 
```
```cli
$ hledger bal --monthly    # show account balance changes each month
Balance changes in 2022-01-01..2022-02-28:

                                 ||    Jan   Feb 
=================================++==============
 assets:bank:checking            ||  $1000     0 
 assets:bank:savings             ||  $2000     0 
 assets:cash                     ||   $100  $-50 
 equity:opening/closing balances || $-3050     0 
 expenses:food                   ||      0   $50 
 liabilities:creditcard          ||   $-50     0 
---------------------------------++--------------
                                 ||      0     0 
```
```cli
$ cat >checking.csv    # make some CSV data, as if downloaded from a bank
"Date","Note","Amount"
"2022/2/01","GOODWORKS CORP","-1000.00"
"2022/2/22","PROPERTY MGMT CO","500.00"
"2022/2/23","ATM WITHDRAWAL","-100.00"
^D
```
```cli
$ cat >checking.csv.rules    # and a rules file to help hledger read it
skip 1
fields date, description, amount
account1 assets:bank:checking
currency $
amount   -%amount

if GOODWORKS
 account2 income:salary

if PROPERTY
 account2 expenses:rent

if ATM WITHDRAWAL
 account2 assets:cash
^D
```
```cli
$ hledger import checking.csv    # import CSV records as new journal entries
imported 2 new transactions from checking.csv
$ hledger import checking.csv    # records already seen are ignored; cf --dry-run
no new transactions found in checking.csv
```
```cli
$ hledger print date:202202   # show transactions in february
2022-02-01 GOODWORKS CORP
    assets:bank:checking           $1000
    income:salary                 $-1000

2022-02-15 market
    expenses:food             $50
    assets:cash              $-50

2022-02-22 PROPERTY MGMT CO
    assets:bank:checking           $-500
    expenses:rent                   $500

2022-02-23 ATM WITHDRAWAL
    assets:bank:checking           $-100
    assets:cash                     $100

```
```cli
$ hledger is -M    # show a monthly income statement (profit & loss report)
Income Statement 2022-01-01..2022-02-28

               || Jan    Feb 
===============++============
 Revenues      ||            
---------------++------------
 income:salary ||   0  $1000 
---------------++------------
               ||   0  $1000 
===============++============
 Expenses      ||            
---------------++------------
 expenses:food ||   0    $50 
 expenses:rent ||   0   $500 
---------------++------------
               ||   0   $550 
===============++============
 Net:          ||   0   $450 
```
```cli
$ hledger bs -M --tree    # show monthly asset and liability balances
Balance Sheet 2022-01-31..2022-02-28

                        || 2022-01-31  2022-02-28 
========================++========================
 Assets                 ||                        
------------------------++------------------------
 assets                 ||      $3100       $3550 
   bank                 ||      $3000       $3400 
     checking           ||      $1000       $1400 
     savings            ||      $2000       $2000 
   cash                 ||       $100        $150 
------------------------++------------------------
                        ||      $3100       $3550 
========================++========================
 Liabilities            ||                        
------------------------++------------------------
 liabilities:creditcard ||        $50         $50 
------------------------++------------------------
                        ||        $50         $50 
========================++========================
 Net:                   ||      $3050       $3500 
```
```cli
$ hledger areg checking    # show checking's transactions and running balance
Transactions in assets:bank:checking and subaccounts:
2022-01-01 opening balances    as:ba:savings, as..         $1000         $1000
2022-02-01 GOODWORKS CORP      in:salary                   $1000         $2000
2022-02-22 PROPERTY MGMT CO    ex:rent                     $-500         $1500
2022-02-23 ATM WITHDRAWAL      as:cash                     $-100         $1400
```
```cli
$ hledger-ui --forecast   # start the terminal UI (except on Windows)
```
![](images/home-ui-1.png)
![](images/home-ui-2.png)

```cli
$ hledger-ui --tree -f examples/bcexample.journal   # a multicurrency journal
```
![](images/home-ui-3.png)

```cli
$ hledger-web    # start the web UI
```
![](images/home-web-1.png)
![](images/home-web-2.png)

```cli
$ hledger-web -f examples/bcexample.journal    # from data by Martin Blais
```
![](images/home-web-3.png)
