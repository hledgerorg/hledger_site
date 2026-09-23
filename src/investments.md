# Track investments (2020)

Last updated: 2020

Here's a tutorial on tracking "investments" - stocks, cryptocurrencies, and similar - in hledger.
Since then, hledger 2.x (preview) has gained built-in [lot tracking](hledger.md#lot-reporting),
which automates much of what is done by hand below; the manual methods here still work.
I hope to teach you a little basic investment accounting, 
or a little about doing it with hledger (and other PTA tools), 
or a little of both.
Notably, you'll see three different ways to record lots and capital gains: 

1. using {} notation (works in Ledger, Beancount)

 2. using just @ notation (works in hledger, Ledger, Beancount..)

3. using just standard postings (works in any double-entry accounting system).


## A stock purchase

We'll use a cryptocurrency and fictitious prices here, but these examples apply equally well to stocks.
Let's say we start the year with $1000 for investment:
```journal
2020-01-01 opening balances
    assets:bank:checking             $1000
    equity:opening/closing balances
```

In february we see ADA is priced at $0.02, and decide to buy a little. 
We'll spend $40, which at 2 cents per ADA buys 2000 ADA.
Here's the most straightforward journal entry:

```journal
2020-02-01 buy ada
    assets:cc:ada          2000 ADA
    assets:bank:checking   -$40
```

We paid $40 (from one asset) and received 2000 ADA in exchange (another asset).
The exact account names don't matter; here we've used a `cc` subaccount to group all cryptocurrencies,
and an additional `ada` subaccount to distinguish ADA holdings from other cryptocurrencies
(this can be helpful in some reports.)

In real life there'll probably be another posting or two, for
transaction expenses. We'll omit those for now.

There are a few more things to say about this entry...

## How does that balance ?

As you may know, in hledger and other PTA tools the primary rule is:

- *"Each transaction must balance - its amounts must add up to zero"*.

Well, in hledger (and Ledger), there's another rule:

- *"When a transaction's unbalanced amounts involve exactly two
  commodities, assume one is converted to the other with a conversion
  rate that makes the transaction balance."*

We can use `hledger print -x` (x for explicit) to show the above with
all amounts and the inferred conversion price:

```cli
$ hledger print -x
2020-02-01
    assets:cc:ada           2000 ADA @@ $40
    assets:bank:checking    $-40
```

This @ notation has two forms: `@@ TOTALPRICE` or `@ UNITPRICE`. In
hledger we call it "[cost]" (generically for both purchases and sales);
it records the price/conversion rate that was used in this specific transaction.

Note this more explicit journal entry has some redundancy, but that's
no harm - it makes things clearer to the human reader, it provides an
extra test of the tool's rounding and precision, and it helps guard
against typos. So we'll use this one.

But here are two more ways of writing the above, just for completeness:

```journal
2020-02-01
    assets:cc:ada          2000 ADA @@ $40
    assets:bank:checking                   ; $-40 inferred here
```

```journal
2020-02-01
    assets:cc:ada          2000 ADA @ $0.02
    assets:bank:checking                    ; -(2000 x $0.02) = $-40 inferred here
```

## A more correct entry

Do you find this still wrong ? 
Some amount of dollars seems to disappear, and some amount of ADA appears.
Doesn't this violate the [accounting equation], the foundation of
double entry bookkeeping, which essentially says "money is not created
out of thin air" ?
[#1177] agrees with you; in summary, it seems the correct entry for
this transaction is more like:

```journal
2020-02-01
    assets:cc:ada          2000 ADA
    equity:conversion     -2000 ADA
    equity:conversion       $40
    assets:bank:checking   -$40
```

This entry might look a little strange to you, but it does show more
clearly that the transaction is balanced; it gathers commodity
conversions into a single "conversion" account which can provide
useful information; and it preserves the [accounting equation].
The "conversion" account name isn't special, but it's an equity account.
Another way to write it, relying on automatic transaction balancing, is:

```journal
2020-02-01
    assets:cc:ada          2000 ADA
    assets:bank:checking   -$40
    equity:conversion                 ; -2000 ADA, +$40 inferred here
```

There's a problem, however: hledger (and other PTA tools) do not
recognise these more general forms as a commodity conversion, so will
not be able to show cost reports (with `-B`, at least..).
For this reason, 
and considering that the unbalanced accounting equation often does not affect your everyday reports,
you might prefer to stick with the @ notation.
<!-- and typos aren't a problem, because any kind of reconciliation quickly leads to finding and fixing the error. -->

Or, use both equity postings and @ notation together,
which might give the best of both worlds.

## What about lots ?

If you know a little about investing, or have read Ledger or Beancount docs,
you'll know that it's important to track the date and cost of each stock purchase,
or *lot*. This information is needed:

- While holding investments, to calculate *unrealised [capital gains][investopedia:gain]/losses*,
  ie the change in their value "on paper" as market prices fluctuate.
  
- When selling an investment, so that:

  1. We can select the right lots to sell. Tax law may require, eg,
     selling the oldest lots first (the FIFO strategy - First In, First Out).

  2. We can calculate the *realised capital gain/loss* from this sale,
     by comparing the selling price with the original cost (AKA *cost
     basis*) of those lots.
  
Ledger and Beancount provide a special syntax and some builtin reports for tracking lots and calculating capital gains,
and so does hledger 2: see [Lot reporting](hledger.md#lot-reporting) in the manual.
The rest of this page shows a manual approach, which also works in hledger 1.

We can use the obvious categorisation feature: accounts.
We'll give every lot its own uniquely-named subaccount.
Since we already have an account just for ADA, 
we'll just name the lot subaccounts by the lots' purchase dates.
If doing multiple ADA purchases per day, we could add a sequence number.
We could also include the cost in the name, if we want extra clarity.

So, let's amend the above journal entry, adding the `20200201` subaccount to represent this first lot:

```journal
2020-02-01
    assets:cc:ada:20200201    2000 ADA @@ $40
    assets:bank:checking      $-40
```

## Review

So far, what have we got ? The journal is <!-- (after aligning with ledger-mode's M-q) -->:

```journal
2020-01-01 opening balances
    assets:bank:checking                       $1000
    equity:opening/closing balances

2020-02-01
    assets:cc:ada:20200201                      2000 ADA @@ $40
    assets:bank:checking                        $-40
```

The balance sheet (truncated for brevity) shows assets are $960 and 2000 ADA:
```cli
$ hledger bs --flat | head -10
Balance Sheet 2020-02-01

                        ||     2020-02-01 
========================++================
 Assets                 ||                
------------------------++----------------
 assets:bank:checking   ||           $960 
 assets:cc:ada:20200201 ||       2000 ADA 
------------------------++----------------
                        || $960, 2000 ADA 
```

(`| head -10` is used here just to hide the empty Liabilities section.
You can omit it if it doesn't work on your system.)


And with `-B/--cost` (B for cost basis) we see costs so far are:

```cli
$ hledger bs --flat -B |head -10
Balance Sheet 2020-02-01, valued at cost

                        || 2020-02-01 
========================++============
 Assets                 ||            
------------------------++------------
 assets:bank:checking   ||       $960 
 assets:cc:ada:20200201 ||        $40 
------------------------++------------
                        ||      $1000 
```

## Market prices

We'll also start recording the prevailing [market price] that was in
effect at each point in time. This will allow us to report on the
market value of our investments.

We don't need to know it every day or every hour; for this example,
we'll just record it at the start of each month. hledger will assume
that market price through the month, until the next one is declared.

Here's the P (market Price) directive declaring that the market price
of ADA, in dollars, on 2020-02-01, was $0.02:

```journal
P 2020-02-01 ADA $0.02
```

And let's say that ADA's price has doubled by march 1st; we'll record that too:
```journal
P 2020-03-01 ADA $0.04
```

We'll add these to the main journal for simplicity.
Or if you prefer you can keep them in a separate file, eg
`2020.prices`, adding `include 2020.prices` to the main journal.

Note that the initial $0.02 market price, and the $0.02 transaction
price we recorded above, are the same in this example. 
In real life they may not be exactly the same, but normally they will be quite similar.

## Value reports; some gotchas

Now we have enough data to do a little value reporting. 
This can be a little confusing at first, so here are a few examples.

Our journal so far is:

```journal
2020-01-01 opening balances
    assets:bank:checking                       $1000
    equity:opening/closing balances

2020-02-01
    assets:cc:ada:20200201                      2000 ADA @@ $40
    assets:bank:checking                        $-40

P 2020-02-01 ADA $0.02
P 2020-03-01 ADA $0.04
```

Let's check the current market value (AKA *mark to market*) of our holdings.
`-V` is a simple form of [the `--value` flag][valuation]:
```cli
$ hledger bs --flat -V |head -10
Balance Sheet 2020-02-01, current value

                        || 2020-02-01 
========================++============
 Assets                 ||            
------------------------++------------
 assets:bank:checking   ||    $960.00 
 assets:cc:ada:20200201 ||     $80.00 
------------------------++------------
                        ||   $1040.00 
```
But the ADA market value looks wrong - on 2020-02-01 it was $40, not $80.
So it's wise to check [the manual][valuation]. In particular, note:
*"For single period reports, the valuation date is today (equivalent to --value=now)"*.
So even though the report's end date is 2020-02-01 (the date of the last transaction),
hledger picked "now" as the valuation date, and therefore 
used our latest 2020-03-01 P directive. 

We can fix this by specifying an explicit report end date,
which also sets the valuation date. 
We'll use `-e` to specify 2020-02-01:

```cli
$ hledger bs --flat -V -e 2020-02-01 |head -10
Balance Sheet 2020-01-31, current value

                      || 2020-01-31 
======================++============
 Assets               ||            
----------------------++------------
 assets:bank:checking ||   $1000.00 
----------------------++------------
                      ||   $1000.00 
======================++============
```

Now there's no ADA balance at all - what gives ?
Remember that [end dates] are exclusive, 
so the ADA purchase on 2020-02-01 is excluded.
With a later end date, eg 2020-02-02, we see it:

```cli
$ hledger bs --flat -V -e 2020-02-02 |head -10
Balance Sheet 2020-02-01, current value

                        || 2020-02-01 
========================++============
 Assets                 ||            
------------------------++------------
 assets:bank:checking   ||    $960.00 
 assets:cc:ada:20200201 ||     $40.00 
------------------------++------------
                        ||   $1000.00 
```

And if we specify an end date after the second price directive,
we'll see the value at that date:

```cli
$ hledger bs --flat -V -e 2020-03-02 |head -10
Balance Sheet 2020-03-01, current value

                        || 2020-03-01 
========================++============
 Assets                 ||            
------------------------++------------
 assets:bank:checking   ||    $960.00 
 assets:cc:ada:20200201 ||     $80.00 
------------------------++------------
                        ||   $1040.00 
```

Often, a multiperiod, eg monthly, report makes things clearer.
For this case [the manual][valuation] says:
*"valuation date ... for multiperiod reports, it is the last day of each subperiod"*.
For this example we still need to specify the end date though, 
otherwise the report will stop at the end of the month containing
the last transaction (ie, 2020-02-29). 
This time we'll say `-e apr` (or `-e 202004`), which is less typing 
and includes all of march:

```cli
$ hledger bs --flat -M -V -e apr | head -10
Balance Sheet 2020-01-31,,2020-03-31, valued at period ends

                        || 2020-01-31  2020-02-29  2020-03-31 
========================++====================================
 Assets                 ||                                    
------------------------++------------------------------------
 assets:bank:checking   ||   $1000.00     $960.00     $960.00 
 assets:cc:ada:20200201 ||          0      $40.00      $80.00 
------------------------++------------------------------------
                        ||   $1000.00    $1000.00    $1040.00 
```

Finally, we can clearly see the value of our holdings over time. 
No ADA, just dollars, in january; ADA worth $40 when purchased, in february;
and worth $80, thanks to the increase in market price, in march.

Just for comparison, here's the same report but showing cost instead
of value. Of course cost is not affected by market prices:

```cli
$ hledger bs --flat -M -B -e apr | head -10
Balance Sheet 2020-01-31,,2020-03-31, valued at cost

                        || 2020-01-31  2020-02-29  2020-03-31 
========================++====================================
 Assets                 ||                                    
------------------------++------------------------------------
 assets:bank:checking   ||   $1000.00     $960.00     $960.00 
 assets:cc:ada:20200201 ||          0      $40.00      $40.00 
------------------------++------------------------------------
                        ||   $1000.00    $1000.00    $1000.00 
```

## Unrealised capital gain

The difference between the $40 purchase cost of the ADA, and its $80
value in march, is an unrealised capital gain. 
"Unrealised" (and therefore not yet taxable, typically) because we
haven't yet sold the ADA and captured the gain in our base currency.

<!--
In the value report above, it's easy enough to see that our capital
gain, as of end of march, is $40. In more complex real-world reports,
it will be helpful to show the changes in each period rather than end
balances. We can add `--change` to see that... Or can we ?

```cli
$ hledger bs --flat -M -V -e apr --change | head -10
Balance Sheet 2020q1 (Balance Changes), valued at period ends

                        ||      Jan      Feb  Mar 
========================++========================
 Assets                 ||                        
------------------------++------------------------
 assets:bank:checking   || $1000.00  $-40.00    0 
 assets:cc:ada:20200201 ||        0   $40.00    0 
------------------------++------------------------
                        || $1000.00        0    0 
```
-->

## A sale

The next day, we decide to sell all the ADA, just to test the process
and capture a little profit.
Assuming that this will look much like the purchase transaction in reverse,
using the @ notation again, we come up with this:

```journal
2020-03-02 sell all ada
    assets:cc:ada:20200201  -2000 ADA @ $0.04
    assets:bank:checking      $80
```

For a little extra error checking, this time we used the `@ UNITPRICE`
form, so we can visually check that the per-unit cost looks correct
(at or close to the market price). 
<!-- Also we've used a [balance assertion] (`= 0 ADA`) to show (and automatically check) the balance remaining in that account. -->

Here's the new balance sheet, with `-E` (empty) to make it show the
now empty ada account:

```cli
$ hledger bs --flat -e apr -E | head -10
Balance Sheet 2020-03-31

                        || 2020-03-31 
========================++============
 Assets                 ||            
------------------------++------------
 assets:bank:checking   ||   $1040.00 
 assets:cc:ada:20200201 ||          0 
------------------------++------------
                        ||   $1040.00 
```

## Realised capital gain

Our dollar balance has increased, from $1000 to $1040, but somewhat
magically - there seems to be no transaction causing it.
This seems like a bad sign.
And indeed a full balance sheet including equity shows a non-zero
total, confirming that the Accounting Equation has been disturbed:

```cli
$ hledger bse --flat
Balance Sheet With Equity 2020-03-02

                                 || 2020-03-02 
=================================++============
 Assets                          ||            
---------------------------------++------------
 assets:bank:checking            ||   $1040.00 
---------------------------------++------------
                                 ||   $1040.00 
=================================++============
 Liabilities                     ||            
---------------------------------++------------
---------------------------------++------------
                                 ||            
=================================++============
 Equity                          ||            
---------------------------------++------------
 equity:opening/closing balances ||   $1000.00 
---------------------------------++------------
                                 ||   $1000.00 
=================================++============
 Net:                            ||     $40.00 
```

$40 has appeared from somewhere. This increase is the realised capital
gain, which is considered a revenue. If we had sold at a lower price
than we paid, this number would be negative, representing a capital
loss, which is an expense.

We want this gain/loss to be recorded in the journal, to satisfy the
accounting equation and keep accurate records, and also because it is
typically a taxable event; we'll need to know all of these
revenues/expenses when filing taxes.

## Recording capital gain

The sale transaction above is balanced, with no room for an extra
revenue posting. If we try, hledger complains:

```journal
2020-03-02 sell all ada
    assets:cc:ada:20200201                     -2000 ADA @ $0.04 = 0 ADA
    assets:bank:checking                         $80
    revenues:capital gain                       $-40
```
```cli
$ hledger print
...
could not balance this transaction (real postings are off by $-40.00)
...
```

Ledger (and Beancount) will accept an entry like this, if you add a
special `{}` notation identifying the lot's original cost. Below, note
the extra `{$0.02}`, which says "this is a lot, and was purchased at
$0.02 each". Ledger will calculate the expected capital gain of $40
and will consider this transaction to be balanced:

```journal
2020-03-02
    assets:cc:ada:20200201                     -2000 ADA {$0.02} @ $0.04 = 0 ADA
    assets:bank:checking                         $80
    revenues:capital gain                       $-40
```

But hledger doesn't know about lots or capital gains, as mentioned.
(hledger 1.17.99+ will parse the {} notation, but ignores it.)
So how can we model a stock sale in hledger ? In general, we should:

1. convert back to cash using the lot's *cost price*
2. manually calculate the capital gain (difference of cost and selling price) and record it as a revenue/expense

If we used the @ notation for the purchase, we should use it here too. The sale looks like this:

```journal
2020-03-02 sell ada
    assets:cc:ada:20200201                     -2000 ADA @ $0.02  ; the original cost
    revenues:capital gain                       $-40              ; the capital gain, 2000 x ($0.04-$0.02)
    assets:bank:checking                         $80              
```

Or if we used the [more correct entry](#a-more-correct-entry) for the purchase,
ie just standard double entry bookkeeping postings, the sale looks like this:

```journal
2020-03-02 sell ada
    assets:cc:ada:20200201                     -2000 ADA
    equity:conversion                           2000 ADA
    equity:conversion                           $-40       ; the original cost
    revenues:capital gain                       $-40       ; the capital gain
    assets:bank:checking                         $80              
```

If we check the `bse` report now, we'll still see a $40 total, but
this is expected because a revenue has been recorded and not yet
merged into equity by "closing the books". If we were to do that
temporarily:

```journal
2020-03-02 close the books, just for testing
    revenues:capital gain                        $40 = $0
    equity:retained earnings                    -$40
```

We would see the proper zero total:

```cli
$ hledger bse --flat 
Balance Sheet With Equity 2020-03-02

                                 || 2020-03-02 
=================================++============
 Assets                          ||            
---------------------------------++------------
 assets:bank:checking            ||   $1040.00 
---------------------------------++------------
                                 ||   $1040.00 
=================================++============
 Liabilities                     ||            
---------------------------------++------------
---------------------------------++------------
                                 ||            
=================================++============
 Equity                          ||            
---------------------------------++------------
 equity:opening/closing balances ||   $1000.00 
 equity:retained earnings        ||     $40.00 
---------------------------------++------------
                                 ||   $1040.00 
=================================++============
 Net:                            ||          0 
```

A variation:
[some discussions](https://money.stackexchange.com/a/22266/1127) on the web
suggest transferring directly from equity, bypassing revenues. In that
case we would need to remember to include it in our tax reports, eg we
would need to look at `hledger bal revenue expenses 'capital gain'`
instead of just `hledger is`.






<br><br><br><br>





## Other lot events (hledger 2)

hledger 2's automated [lot tracking](hledger.md#lot-reporting) understands three lot movements:
acquire, transfer and dispose.
Other real-world events can be recorded as combinations of these; here are some examples.
The right treatment varies by jurisdiction, so check your local tax rules.
Unlike the rest of this page, these entries need hledger 2:
hledger 1 ignores cost basis annotations (so no basis or gain is tracked),
and rejects the date-only annotations used in the stock split example.

### Gift received

An acquisition's cost basis can differ from the commodity's current market
price. Eg with GOLD currently priced at $5000, you receive a gift carrying
its original ("carryover") cost basis of $3000/oz:
```
P 2026-05-01 GOLD $5000

2026-05-01 gift received, with carryover basis of $3000
    income:gifts         $-6000
    assets:stock              2 GOLD {$3000}
```
The transacted cost is $3000 (same as the basis), not $5000.
And the recorded gift income is $6000 (the gift's current market value is $10000, but remember when you dispose you'll have to declare $2000/oz more capital gain, $4000 more in total).

### Bonus shares

Extra shares granted for free (a bonus issue or stock dividend) can be recorded as a zero-cost acquisition. 
Such an entry balances by itself:

```journal
2026-06-01 bonus shares
    assets:stock    5 AAPL @@ $0
```

Or you can add an equity posting for more explicit double entry
(note that account will then keep an offsetting negative AAPL balance):

```journal
2026-06-01 bonus shares
    assets:stock          5 AAPL @@ $0
    equity:bonus-shares  -5 AAPL @@ $0
```

A zero cost basis means the full sale proceeds will be counted as capital
gain at disposal. This matches the tax treatment of bonus shares in some
jurisdictions - eg India, where their acquisition cost is nil, or the UK,
where they enter the pool at nil cost, diluting the average cost.
Other treatments exist, so check your local rules. 
Eg for US nontaxable stock dividends, 
the original shares' cost basis is instead spread proportionally 
across the old and new shares, which can be recorded like a stock split. 
Or, free shares which are taxable income when received (eg a brokerage promotion)
would typically be acquired at their market value, balanced by an income posting.

### Stock splits

A stock split (eg 2:1, doubling the share count and halving the share
price) can be recorded as a disposal and re-acquisition, preserving the
original acquisition date and total cost basis. Eg, for 10 AAPL bought
on 2026-01-01 with cost basis $100/share:

```journal
2026-06-01 AAPL splits 2:1
    assets:broker   -10 AAPL {2026-01-01} @@ $1000
    assets:broker    20 AAPL {2026-01-01} @@ $1000
```

The old lot is disposed at its cost basis, so there is no gain; the new
lot keeps the old acquisition date, with the per-unit basis inferred
from the unchanged total ($1000 / 20 = $50). (Since two acquisitions now
share the same basis date, hledger will add sequence-number labels to keep their
[lot ids](hledger.md#lot-ids) distinct.)

### Capitalising an in-kind transfer fee

hledger does not automatically capitalise fees into cost basis.
For a purchase fee, fold it into the acquisition cost (`10 AAPL @@ $510`), as described under
[Capitalising fees](hledger.md#capitalising-fees) in the manual.
Capitalising an in-kind transfer fee - keeping the remaining units' total basis unchanged -
requires disposing of the position at its basis price (producing no gain)
and re-acquiring the remainder with the combined basis, eg:

```journal
; earlier: bought 5 ABC for $20 ($4 each); now 0.1 ABC is deducted in transit:
2020-04-05 transfer with 0.1 ABC fee, capitalised
    assets:broker1     -5 ABC {} @ $4
    assets:broker2      4.9 ABC {$4.08163265} @@ $20
```

Note this re-acquisition starts a new lot, with a new date unless you write
the original date in its basis annotation; usually fees are simply expensed instead.

## Related

- [Trading With Ledger-cli And Lots](https://www.d10.dev/blog/ledger-cli-trade) and [lotter](https://src.d10.dev/lotter/doc/tip/README.md) and [gader](https://github.com/leb4r/gader)
- [Beancount: Command-line Accounting Cookbook][beancount_cookbook]: Account naming, basic trading transactions
  [Beancount: Trading with Beancount][beancount_trading]: More complicated trading transactions, discussion on tricky cost basis adjustments
- [Issue #624 Tracking investments in hledger](https://github.com/hledgerorg/hledger/issues/624)
- [Discussion on investment modeling from the mailing list](https://groups.google.com/forum/#!topic/hledger/e8Ss7ZL4ADI)
<!-- - ["Unconfirmed" podcast episode on cryptocurrency taxes](https://unchainedpodcast.com/the-irs-is-cracking-down-on-crypto-taxes-what-you-need-to-know/) -->


[cost]:                  hledger.html#costs
[market price]:          hledger.html#p-directive
[valuation]:             hledger.html#valuation
[end dates]:             hledger.html#report-start--end-date
[balance assertion]:     hledger.html#balance-assertions
[unbalanced posting]:    hledger.html#virtual-postings

[#1177]:                 https://github.com/hledgerorg/hledger/issues/1177
[accounting equation]:   https://en.wikipedia.org/wiki/Accounting_equation
[beancount_cookbook]:    http://furius.ca/beancount/doc/cookbook
[beancount_trading]:     http://furius.ca/beancount/doc/trading
[investopedia:gain]:     https://www.investopedia.com/terms/c/capitalgain.asp
[SO: gain entry]:        https://money.stackexchange.com/a/22266/1127
