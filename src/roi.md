# Calculate return on investment

Last updated: 2023

A tutorial for the [roi](hledger.md#roi) (Return On Investment) command.

## Cash-only investments

Let's consider the easy case first, where your assets and your
investment is the same single commodity (in this case, USD), and
whenever value of your investment changes, you record the change
manually, balancing it against `equity:unrealized gains`.

Lets say that we found an investment in Snake Oil that is promising to give us 10% annually:
```hledger
2019-01-01 Investing in Snake Oil
  assets:cash  -$100
  investment:snake oil

2019-12-24 Recording the growth of Snake Oil
  investment:snake oil   = $110
  equity:unrealized gains
```

For now, basic computation of the rate of return, as well as IRR and TWR, gives us the expected 10%:

```
$ hledger roi -Y --inv investment --pnl "unrealized"
+---++------------+------------++---------------+----------+-------------+-----++--------++------------+----------+
|   ||      Begin |        End || Value (begin) | Cashflow | Value (end) | PnL ||    IRR || TWR/period | TWR/year |
+===++============+============++===============+==========+=============+=====++========++============+==========+
| 1 || 2019-01-01 | 2019-12-31 ||             0 |     $100 |        $110 | $10 || 10.00% ||     10.00% |   10.00% |
+---++------------+------------++---------------+----------+-------------+-----++--------++------------+----------+
```

However, lets say that shorty after investing in the Snake Oil we
started to have second thoughts, so we prompty withdrew $90, leaving
only $10 in. Before Christmas, though, we started to get the "fear of
missing out", so we put the $90 back in. So for most of the year, our
investment was just $10 dollars, and it gave us just $1 in return:

```hledger
2019-01-01 Investing in Snake Oil
  assets:cash  -$100
  investment:snake oil

2019-01-02 Buyers remorse
  assets:cash  $90
  investment:snake oil
       
2019-12-30 Fear of missing out
  assets:cash  -$90
  investment:snake oil

2019-12-31 Recording the growth of Snake Oil
  investment:snake oil   = $101
  equity:unrealized gains
```

Now IRR and TWR are drastically different:
```
$ hledger roi -Y --inv investment --pnl "unrealized"
+---++------------+------------++---------------+----------+-------------+-----++-------++------------+----------+
|   ||      Begin |        End || Value (begin) | Cashflow | Value (end) | PnL ||   IRR || TWR/period | TWR/year |
+===++============+============++===============+==========+=============+=====++=======++============+==========+
| 1 || 2019-01-01 | 2019-12-31 ||             0 |     $100 |        $101 |  $1 || 9.32% ||      1.00% |    1.00% |
+---++------------+------------++---------------+----------+-------------+-----++-------++------------+----------+
```

Here, IRR tells us that we made close to 10% on the $10 dollars that
we had in the account most of the time. And TWR is ... just 1%? Why?

Based on the transactions in our journal, TWR "thinks" that we are buying back $90 worth of Snake Oil
at the same price that it had at the beginning of the year, and then after that our $100 investment
gets $1 increase in value, or 1% of $100. Let's take a closer look at what is happening here by
asking for quarterly reports instead of annual:

```
$ hledger roi -Q --inv investment --pnl "unrealized"
+-------++------------+------------++---------------+----------+-------------+-----++--------++------------+----------+
|       ||      Begin |        End || Value (begin) | Cashflow | Value (end) | PnL ||    IRR || TWR/period | TWR/year |
+=======++============+============++===============+==========+=============+=====++========++============+==========+
|     1 || 2019-01-01 | 2019-03-31 ||             0 |      $10 |         $10 |   0 ||  0.00% ||      0.00% |    0.00% |
|     2 || 2019-04-01 | 2019-06-30 ||           $10 |        0 |         $10 |   0 ||  0.00% ||      0.00% |    0.00% |
|     3 || 2019-07-01 | 2019-09-30 ||           $10 |        0 |         $10 |   0 ||  0.00% ||      0.00% |    0.00% |
|     4 || 2019-10-01 | 2019-12-31 ||           $10 |      $90 |        $101 |  $1 || 37.80% ||      1.00% |    4.03% |
+-------++------------+------------++---------------+----------+-------------+-----++--------++------------+----------+
| Total || 2019-01-01 | 2019-12-31 ||             0 |     $100 |        $101 |  $1 ||  9.32% ||      1.00% |    1.00% |
+-------++------------+------------++---------------+----------+-------------+-----++--------++------------+----------+
```

Now both IRR and TWR are thrown off by the fact that all of the growth
for our investment happens in Q4 2019. Reported rates are annualized,
that is IRR computation is still yielding 9.32% and TWR is still 1%,
but these rates are computed over three month period instead of
twelve, so in order to get an annual rate they should be multiplied by
four!

Let's try to keep a better record of how Snake Oil grew in value:
```hledger
2019-01-01 Investing in Snake Oil
  assets:cash  -$100
  investment:snake oil

2019-01-02 Buyers remorse
  assets:cash  $90
  investment:snake oil

2019-02-28 Recording the growth of Snake Oil
  investment:snake oil  
  equity:unrealized gains  -$0.25

2019-06-30 Recording the growth of Snake Oil
  investment:snake oil  
  equity:unrealized gains  -$0.25

2019-09-30 Recording the growth of Snake Oil
  investment:snake oil  
  equity:unrealized gains  -$0.25

2019-12-30 Fear of missing out
  assets:cash  -$90
  investment:snake oil

2019-12-31 Recording the growth of Snake Oil
  investment:snake oil
  equity:unrealized gains  -$0.25
```

Would our quarterly report look better now? Almost:
```
$ hledger roi -Q --inv investment --pnl "unrealized"
+-------++------------+------------++---------------+----------+-------------+-------++--------++------------+----------+
|       ||      Begin |        End || Value (begin) | Cashflow | Value (end) |   PnL ||    IRR || TWR/period | TWR/year |
+=======++============+============++===============+==========+=============+=======++========++============+==========+
|     1 || 2019-01-01 | 2019-03-31 ||             0 |   $10.00 |      $10.25 | $0.25 ||  9.53% ||      2.50% |   10.53% |
|     2 || 2019-04-01 | 2019-06-30 ||        $10.25 |        0 |      $10.50 | $0.25 || 10.15% ||      2.44% |   10.15% |
|     3 || 2019-07-01 | 2019-09-30 ||        $10.50 |        0 |      $10.75 | $0.25 ||  9.79% ||      2.38% |    9.78% |
|     4 || 2019-10-01 | 2019-12-31 ||        $10.75 |   $90.00 |     $101.00 | $0.25 ||  8.05% ||      0.25% |    1.00% |
+-------++------------+------------++---------------+----------+-------------+-------++--------++------------+----------+
| Total || 2019-01-01 | 2019-12-31 ||             0 |  $100.00 |     $101.00 | $1.00 ||  9.32% ||      7.77% |    7.77% |
+-------++------------+------------++---------------+----------+-------------+-------++--------++------------+----------+
```

Something is still wrong with TWR computation for Q4, and if you have been paying attention you know
what it is already: big $90 buy-back is recorded prior to the only transaction that captures the
change of value of Snake Oil that happened in this time period. Lets combine transactions from 30th
and 31st of Dec into one:

```hledger
2019-12-30 Fear of missing out and growth of Snake Oil
  assets:cash  -$90
  investment:snake oil
  equity:unrealized gains  -$0.25
```

Now growth of investment properly affects its price at the time of buy-back:
```
$ hledger roi -Q --inv investment --pnl "unrealized"
+-------++------------+------------++---------------+----------+-------------+-------++--------++------------+----------+
|       ||      Begin |        End || Value (begin) | Cashflow | Value (end) |   PnL ||    IRR || TWR/period | TWR/year |
+=======++============+============++===============+==========+=============+=======++========++============+==========+
|     1 || 2019-01-01 | 2019-03-31 ||             0 |   $10.00 |      $10.25 | $0.25 ||  9.53% ||      2.50% |   10.53% |
|     2 || 2019-04-01 | 2019-06-30 ||        $10.25 |        0 |      $10.50 | $0.25 || 10.15% ||      2.44% |   10.15% |
|     3 || 2019-07-01 | 2019-09-30 ||        $10.50 |        0 |      $10.75 | $0.25 ||  9.79% ||      2.38% |    9.78% |
|     4 || 2019-10-01 | 2019-12-31 ||        $10.75 |   $90.00 |     $101.00 | $0.25 ||  8.05% ||      2.33% |    9.57% |
+-------++------------+------------++---------------+----------+-------------+-------++--------++------------+----------+
| Total || 2019-01-01 | 2019-12-31 ||             0 |  $100.00 |     $101.00 | $1.00 ||  9.32% ||     10.00% |   10.00% |
+-------++------------+------------++---------------+----------+-------------+-------++--------++------------+----------+
```

And for annual report, TWR now reports the exact profitability of our investment:
```
$ hledger roi -Y --inv investment --pnl "unrealized"
+---++------------+------------++---------------+----------+-------------+-------++-------++------------+----------+
|   ||      Begin |        End || Value (begin) | Cashflow | Value (end) |   PnL ||   IRR || TWR/period | TWR/year |
+===++============+============++===============+==========+=============+=======++=======++============+==========+
| 1 || 2019-01-01 | 2019-12-31 ||             0 |  $100.00 |     $101.00 | $1.00 || 9.32% ||     10.00% |   10.00% |
+---++------------+------------++---------------+----------+-------------+-------++-------++------------+----------+
```

## Using commodities and prices

Let's redo the same Snake Oil example, but creating a special commodity to track amount of Snake Oil we have.

We will use SNKOIL as a commodity name, and will assume that 1 SNKOIL = $1 at the beginning of 2019.

As before, we start with a simple example where we invest in SNKOIL, and by the end of 2019 our investment growth by 10%.

```hledger
2019-01-01 Investing in Snake Oil
  assets:cash
  investment:snake oil   100 SNKOIL @@ $100

; Recording the growth of Snake Oil
P 2019-12-24  SNKOIL $1.1
```

We need to tell `roi` that we are interested in the growth of value of
our investment with `--value=then` switch, which forces it to use
prices that were in effect at each moment in time that `roi` inspects
for its computations:

```
$ hledger roi -Y --inv investment --pnl "unrealized" --value=then
+---++------------+------------++---------------+----------+-------------+-------++--------++------------+----------+
|   ||      Begin |        End || Value (begin) | Cashflow | Value (end) |   PnL ||    IRR || TWR/period | TWR/year |
+===++============+============++===============+==========+=============+=======++========++============+==========+
| 1 || 2019-01-01 | 2019-12-31 ||             0 |   $100.0 |      $110.0 | $10.0 || 10.00% ||     10.00% |   10.00% |
+---++------------+------------++---------------+----------+-------------+-------++--------++------------+----------+
```

Following the story from the previous example, lets say that shorty
after investing in the Snake Oil we started to have second thoughts,
so we prompty withdrew $90, leaving only $10 in. Before Christmas,
though, we started to get the "fear of missing out", so we put the $90
back in. So for most of the year, our investment was just $10 dollars (or, rather 10 SNKOIL):

```hledger
2019-01-01 Investing in Snake Oil
  assets:cash
  investment:snake oil   100 SNKOIL @@ $100

2019-01-02 Buyers remorse
  assets:cash
  investment:snake oil   -90 SNKOIL @@ $90

2019-12-23 Fear of missing out
  assets:cash
  investment:snake oil  90 SNKOIL @@ $90

; Recording the growth of Snake Oil
P 2019-12-24  SNKOIL $1.1
```

These numbers do not look correct:
```
$ hledger roi -Y --inv investment --pnl "unrealized" --value=then
+---++------------+------------++---------------+----------+-------------+-------++--------++------------+----------+
|   ||      Begin |        End || Value (begin) | Cashflow | Value (end) |   PnL ||    IRR || TWR/period | TWR/year |
+===++============+============++===============+==========+=============+=======++========++============+==========+
| 1 || 2019-01-01 | 2019-12-31 ||             0 |   $100.0 |      $110.0 | $10.0 || 83.66% ||     10.00% |   10.00% |
+---++------------+------------++---------------+----------+-------------+-------++--------++------------+----------+
```

That is because the "Fear of missing out" buy-back transaction is
likely incorrect: based on the price in that transaction, it look like
we are buying back $90 worth of Snake Oil at the same price that it
had at the beginning of the year, and then after that our investment
gets sudden increase in value. This completely throws off IRR computations.

Let's say that we kept a better record of SNKOIL prices and we can compute a more precise amount of SNKOIL we bough back at the end of the year:
 ```hledger
2019-01-01 Investing in Snake Oil
  assets:cash
  investment:snake oil   100 SNKOIL @@ $100

2019-01-02 Buyers remorse
  assets:cash
  investment:snake oil   -90 SNKOIL @@ $90

; Recording the price of Snake Oil
P 2019-02-28 SNKOIL $1.025
P 2019-06-30 SNKOIL $1.05
P 2019-09-30 SNKOIL $1.075

2019-12-23 Fear of missing out
  assets:cash 
  investment:snake oil   83.72 SNKOIL @@ $90 ; $90/$1.075 = 83.72

; Recording the growth of Snake Oil
P 2019-12-24  SNKOIL $1.1
```

Now our IRR looks better:
```
$ hledger roi -Y --inv investment --pnl "unrealized" --value=then
+---++------------+------------++---------------+----------+-------------+--------++--------++------------+----------+
|   ||      Begin |        End || Value (begin) | Cashflow | Value (end) |    PnL ||    IRR || TWR/period | TWR/year |
+===++============+============++===============+==========+=============+========++========++============+==========+
| 1 || 2019-01-01 | 2019-12-31 ||             0 | $100.000 |    $103.092 | $3.092 || 25.22% ||      3.09% |    3.09% |
+---++------------+------------++---------------+----------+-------------+--------++--------++------------+----------+
```

Though from IRR perspective it looks like we only had about $10 worth
of SNKOIL for most of the year, and still managed to get a return of
$3, which looks like about a quarter of $10 invested - hence 25.22% of
return from IRR standpoint. Note that TWR gives us more sensive 3.09%
of return, which is closer to what you would expect, and shows that
TWR is indeed (way) less sensitive to the money movements.

## Investments that pay interest out (loans, bonds, dividends)

Let's say that you have given someone a loan or put money in a savings
account, or maybe bought bonds that pay out regular coupons, and now
you have monthly/quarterly/annual payouts. What is the best way to
record them so that we could compute ROI?

For the following example, we will assume that you put $100 into
savings account that pays out $1 quarterly (so your interest is not
added to your investment):

```hledger
2019-01-01 Investment
  assets:cash
  investment:saving  $100
```

We need to make sure that:

- Payout transactions are included in the analysis, so they must match
  the query given to `--inv`. This could be achieved if investment
  account is mentioned in our transaction.

- Payout transactions do not change the value of the investment

These two bullet points are naturally translated to this transaction:

```hledger
2019-03-31 Interest
  assets:cash         $1
  investment:saving   $0
```

This transaction is not balanced, though. We need to balance it with the "profit and loss" account:
```hledger
2019-03-31 Interest
  assets:cash         $1
  investment:saving   $0
  equity:profit and loss
```

So, at the end of the quarter your investment grew $1 in value and that $1 was immediately paid out to you, and this transaction lines with the description pretty well.

Let's complete the journal with one year of payouts:

```hledger
2019-01-01 Investment
  assets:cash
  investment:saving  $100

2019-03-31 Q1 Interest
  assets:cash         $1
  investment:saving   $0
  equity:profit and loss

2019-06-30 Q2 Interest
  assets:cash         $1
  investment:saving   $0
  equity:profit and loss

2019-09-30 Q3 Interest
  assets:cash         $1
  investment:saving   $0
  equity:profit and loss

2019-12-31 Q4 Interest
  assets:cash         $1
  investment:saving   $0
  equity:profit and loss
```

We can now compute ROI:
```
$ hledger roi -Y --inv investment --pnl "profit and loss"
+---++------------+------------++---------------+----------+-------------+-----++-------++------------+----------+
|   ||      Begin |        End || Value (begin) | Cashflow | Value (end) | PnL ||   IRR || TWR/period | TWR/year |
+===++============+============++===============+==========+=============+=====++=======++============+==========+
| 1 || 2019-01-01 | 2019-12-31 ||             0 |      $96 |        $100 |  $4 || 4.06% ||      4.06% |    4.06% |
+---++------------+------------++---------------+----------+-------------+-----++-------++------------+----------+
```

Cashflow is $100 paid in minus $4 of interest received back.

