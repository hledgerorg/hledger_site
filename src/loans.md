# Borrowing and Lending

Last updated: 2020

## Lending, calculating interest manually

0.41% interest per month (roughly equivalent to 5% APR), calculated manually:

```journal
2020-01-01 opening balances
  assets:bank:checking   1000
  equity:opening/closing balances

2020-01-01 lend to Trusty Tara
  assets:bank:checking
  assets:receivable:tt    100
  
2020-02-01 charge 5% interest
  assets:receivable:tt      0.41   ; 100 x 0.41
  revenues:interest:tt

2020-02-15 Tara payment
  assets:receivable:tt    -50
  assets:bank:checking

2020-03-01 charge 5% interest
  assets:receivable:tt      0.21   ; 50.41 x 0.41, rounded
  revenues:interest:tt

2020-03-15 Tara payment
  assets:receivable:tt    -50
  assets:bank:checking

```

Monthly balance sheet:

```cli
$ hledger bs -M
Balance Sheet 2020-01-31,,2020-03-31

                      || 2020-01-31  2020-02-29  2020-03-31 
======================++====================================
 Assets               ||                                    
----------------------++------------------------------------
 assets:bank:checking ||     900.00      950.00     1000.00 
 assets:receivable:tt ||     100.00       50.41        0.62 
----------------------++------------------------------------
                      ||    1000.00     1000.41     1000.62 
======================++====================================
 Liabilities          ||                                    
----------------------++------------------------------------
----------------------++------------------------------------
                      ||                                    
======================++====================================
 Net:                 ||    1000.00     1000.41     1000.62 
```

## Lending, calculating interest with hledger-interest

Loan and payment transactions are in the main journal:

```journal
2020-01-01 opening balances
  assets:bank:checking   1000.00
  equity:opening/closing balances

2020-01-01 lend to Trusty Tara
  assets:bank:checking
  assets:receivable:tt    100 = 100
  
2020-02-15 Tara payment
  assets:receivable:tt    -50
  assets:bank:checking

2020-03-15 Tara payment
  assets:receivable:tt    -50
  assets:bank:checking
```

We use [hledger-interest] to add interest transactions, here 5% per year:

```cli
$ hledger-interest assets:receivable:tt --act --annual=0.05 -s revenues:interest:tt -t assets:receivable:tt 
2020-01-01 lend to Trusty Tara
    assets:bank:checking         -100.00
    assets:receivable:tt          100.00 = 100.00

2020-02-15 5% interest for 100.00 over 46 days
    assets:receivable:tt            0.63
    revenues:interest:tt           -0.63

2020-02-15 Tara payment
    assets:receivable:tt          -50.00
    assets:bank:checking           50.00

2020-03-15 5% interest for 50.63 over 29 days
    assets:receivable:tt            0.20
    revenues:interest:tt           -0.20

2020-03-15 Tara payment
    assets:receivable:tt          -50.00
    assets:bank:checking           50.00
```

It doesn't print the opening balance transaction for some reason.
So we'll print that too, then get a monthly balance sheet:

```cli
$ (hledger print desc:opening; hledger-interest assets:receivable:tt --act --annual=0.05 -s revenues:interest:tt -t assets:receivable:tt) | hledger -f- bs -M
Balance Sheet 2020-01-31,,2020-03-31

                      || 2020-01-31  2020-02-29  2020-03-31 
======================++====================================
 Assets               ||                                    
----------------------++------------------------------------
 assets:bank:checking ||     900.00      950.00     1000.00 
 assets:receivable:tt ||     100.00       50.63        0.83 
----------------------++------------------------------------
                      ||    1000.00     1000.63     1000.83 
======================++====================================
 Liabilities          ||                                    
----------------------++------------------------------------
----------------------++------------------------------------
                      ||                                    
======================++====================================
 Net:                 ||    1000.00     1000.63     1000.83 
```

[hledger-interest]: https://github.com/peti/hledger-interest
