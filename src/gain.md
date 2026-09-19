# Calculate unrealized gain

Last updated: 2021

This is a guide on calculating the unrealized capital gain/loss of investments,
using the `balance --gain` report.

This guide assumes you've read [the investments guide](investments.md) and that you're
using the "simple" version of recording investment transactions laid
out in that document, using @ or @@. We'll also be using a FIFO system
for sales. At the end we'll discuss how to adapt your strategy for
different systems.

## Buying

Let's say you start your year with $100:

```
2021-01-04 opening balances
    assets:cash                      $100.00
    equity:opening/closing balances
```

In february you decide to start investing in a stock you've been
monitoring:

```
P 2021-01-04 ABC $2
P 2021-01-11 ABC $3
P 2021-01-18 ABC $4

2021-01-19 buying stock
    assets:stocks:ABC:20210119   5 ABC @ $4.40
    assets:cash               $-22.00
```

Note that the stock was not bought at the exact market price we
recorded.

Looking at the gain report at this point tells us that we've lost $2:

```
$ hledger bal --gain

              $-2.00  assets:stocks:ABC:20210119
--------------------
              $-2.00
```

This is because if we sell at the last known market price, that is
what our loss will be. If we add `--infer-market-price` hledger will
insert a `P 2021-01-19 ABC $4.40` during processing, making the gain
$0.

## Price changes

Let's say the market price grows some more in the following weeks:

```
P 2021-01-25 ABC $5
P 2021-02-01 ABC $6
```

We now see a profit of $8:

```
$ hledger bal --gain

                  $8  assets:stocks:ABC:20210119
--------------------
                  $8
```

We can also track the gain over time:

```
$ hledger bal --gain -W

Incremental gain in 2021-01-04..2021-02-07, valued at period ends:

                            || 2021-01-04W01  2021-01-11W02  2021-01-18W03  2021-01-25W04  2021-02-01W05 
============================++===========================================================================
 assets:stocks:ABC:20210119 ||             0              0         $-2.00          $5.00          $5.00 
----------------------------++---------------------------------------------------------------------------
                            ||             0              0         $-2.00          $5.00          $5.00 
```

We start out with our gain of $-2 as before. Since the value of the
stock increases by $1 every week and we bought 5 shares, we see a $5
increment in the following weeks. To see the total gain over time add
the `-H` option.

At this point, you decide to buy some more shares:

```
2021-02-02 buying more stock
    assets:stocks:ABC:20210202   4 ABC @ $6.50
    assets:cash               $-26.00
```

Let's see what this does to our gain calculation:

```
$ heldger bal --gain
                  $8  assets:stocks:ABC:20210119
                 $-2  assets:stocks:ABC:20210202
--------------------
                  $6
```

We still see the same gain for the first lot. The new lot has a gain
of $-2, decreasing our total gain to $6.

Unfortunately, in the next week the market price of the stock
decreases:

```
P 2021-02-08 ABC $5
```

Our gain report over time now looks like this:

```
$ hledger bal --gain -W -b 2021-01-18

Incremental gain in 2021-01-04..2021-02-14, valued at period ends:

                            || 2021-01-18W03  2021-01-25W04  2021-02-01W05  2021-02-08W06 
============================++============================================================
 assets:stocks:ABC:20210119 ||        $-2.00          $5.00          $5.00         $-5.00 
 assets:stocks:ABC:20210202 ||             0              0         $-2.00         $-4.00 
----------------------------++------------------------------------------------------------
                            ||        $-2.00          $5.00          $3.00         $-9.00 
```

We'll add some more prices, and then start selling our stocks.

```
P 2021-02-15 ABC $6
P 2021-02-22 ABC $7
```

## Selling

We'll start of by selling some of our first lot:

```
2021-02-23 sell some stock
    assets:cash                $12.00
    assets:stocks:ABC:20210119  -2 ABC @ $4.40
    income:capital gains
```

This leaves us with the following gain report:

```
$ hledger bal -W --gain -b 2021-02-07

Incremental gain in 2021-02, valued at period ends:

                            || 2021-02-01W05  2021-02-08W06  2021-02-15W07  2021-02-22W08 
============================++============================================================
 assets:stocks:ABC:20210119 ||         $5.00         $-5.00          $5.00         $-0.20 
 assets:stocks:ABC:20210202 ||        $-2.00         $-4.00          $4.00          $4.00 
----------------------------++------------------------------------------------------------
                            ||         $3.00         $-9.00          $9.00          $3.80 
```

At first glance, the negative value in the last column might seem
counterintuitive. Didn't we just make a profit on our sale? However,
our *unrealized* gain decreased by the sale. The *realized* gain is
recorded by the `income:capital gains` posting. Our income statement
tells us our *realized gain*:

```
$ hledger is

Income Statement 2021-01-04..2021-02-23

                      || 2021-01-04..2021-02-23 
======================++========================
 Revenues             ||                        
----------------------++------------------------
 income:capital gains ||                  $3.20 
----------------------++------------------------
                      ||                  $3.20 
======================++========================
 Expenses             ||                        
----------------------++------------------------
----------------------++------------------------
                      ||                        
======================++========================
 Net:                 ||                  $3.20 
```

The total value of the remaining 3 stocks we didn't sell increased by
$3 that week, leaving us the $-0.20 figure we see in the last column
of the gain report.

The next week, the price increases again, and we decide to sell all
our remaining stock:

```
P 2021-03-01 ABC $8

2021-03-02 sell remaining stock
    assets:cash                $54.00
    assets:stocks:ABC:20210119  -3 ABC @ $4.40
    assets:stocks:ABC:20210202  -4 ABC @ $6.50
    income:capital gains
```

This decreases our remaining unrealized gain down to 0:

```
$ hledger bal -W --gain -b 2021-02-07 -H

Historical gain in 2021-02-01..2021-03-07, valued at period ends:

                            || 2021-02-07  2021-02-14  2021-02-21  2021-02-28  2021-03-07 
============================++============================================================
 assets:stocks:ABC:20210119 ||      $8.00       $3.00       $8.00       $7.80           0 
 assets:stocks:ABC:20210202 ||     $-2.00      $-6.00      $-2.00       $2.00           0 
----------------------------++------------------------------------------------------------
                            ||      $6.00      $-3.00       $6.00       $9.80           0 
```

## Different cost base calculations

The transactions described above could easily be adapted for LIFO:
just use a different lot for the initial sale. 

ACB gets a bit more difficult. If we buy more stock, we essentially
have to change the cost basis of our previous lots as well. The
resulting journal might look a little like this:

```
2021-01-04 opening balances
    assets:cash                      $100.00
    equity:opening/closing balances

P 2021-01-04 ABC $2
P 2021-01-11 ABC $3
P 2021-01-18 ABC $4

2021-01-19 buying stock
    assets:stocks:ABC:20210119   5 ABC @ $4.40
    assets:cash               $-22.00

P 2021-01-25 ABC $5
P 2021-02-01 ABC $6

2021-02-02 buying more stock
    assets:stocks:ABC:20210119  -5 ABC @ $4.40
    assets:stocks:ABC:20210119   5 ABC @ $5.33
    assets:stocks:ABC:20210202   4 ABC @ $5.33
    assets:cash               $-26.00
    equity:rounding

P 2021-02-08 ABC $5
P 2021-02-15 ABC $6
P 2021-02-22 ABC $7

2021-02-23 sell some stock
    assets:cash                $12.00
    assets:stocks:ABC:20210119  -2 ABC @ $5.33
    income:capital gains

P 2021-03-01 ABC $8

2021-03-02 sell remaining stock
    assets:cash                $54.00
    assets:stocks:ABC:20210119  -3 ABC @ $5.33
    assets:stocks:ABC:20210202  -4 ABC @ $5.33
    income:capital gains
```

If and how you deal with rounding depends on if and how you need to
report your capital gains to your tax authority. You can avoid
rounding errors by always using the `@@` symbol, but this essentially
makes it impossible to sell only part of your shares (or you have to
deal with rounding at time of sale instead of time of purchase). A
journal might then look like this:

```
2021-01-04 opening balances
    assets:cash                      $100.00
    equity:opening/closing balances

P 2021-01-04 ABC $2
P 2021-01-11 ABC $3
P 2021-01-18 ABC $4

2021-01-19 buying stock
    assets:stocks:ABC   5 ABC @@ $22.00
    assets:cash      $-22.00

P 2021-01-25 ABC $5
P 2021-02-01 ABC $6

2021-02-02 buying more stock
    assets:stocks:ABC  -5 ABC @@ $22.00
    assets:stocks:ABC   9 ABC @@ $48.00
    assets:cash      $-26.00

P 2021-02-08 ABC $5
P 2021-02-15 ABC $6
P 2021-02-22 ABC $7
P 2021-03-01 ABC $8

2021-03-02 sell stock
    assets:cash                $70.00
    assets:stocks:ABC:20210119  -9 ABC @@ $48.00
    income:capital gains
```
