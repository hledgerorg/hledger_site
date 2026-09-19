# Currency conversion

*I wrote two currency conversion explainers in 2021, now both combined on this page, showing different ways of recording conversions.
See [Cookbook > Multiple currencies](doc.md#multiple-currencies) for more.*

----

Here are various ways of recording a conversion from one currency or commodity to another.

## Implicit conversion rate

Let's say we are exchanging cash with a friend:

```journal
2021-07-27 give dollars, get euros
    assets:cash      USD -10.00
    assets:cash      EUR   8.50
```

hledger understands that 10 dollars were converted to 8.50 euros.
A conversion rate is inferred automatically so as to make the transaction balance.
(This can be seen with `hledger print -x`.)

<!--
```cli
$ hledger print -x
2021-07-27 give dollars, get euros
    assets:cash    USD -10.00 @@ EUR 8.50
    assets:cash                  EUR 8.50
```
-->

This is easy to write and to understand.
However it is not a fully correct double-entry-bookkeeping journal entry,
since USD has magically transformed into EUR "in flight".
It is also error prone, since a typo in either amount may not be detected.
For example, we might forget the decimal point and write `USD -1000`.
Also, it is easy to create such entries accidentally.
For example, in one posting within a transaction we might mistype or omit the currency symbol.
hledger accepts these implicit conversions by default, for convenience and compatibility.
But you can disallow them by using 
[strict mode](hledger.md#strict-mode) 
or by running the [check](hledger.md#check) command
(eg: `hledger check balancednoautoconversion`).

## Explicit conversion rate

We can record the conversion rate (cost of one currency in the other) explicitly.
This adds redundancy, allowing hledger to catch more errors,
and also makes the rate more explicit to human readers.
We can write the total amount with `@@` 
(convenient when entries are complex):

```journal
2021-07-27 give dollars, get euros
    assets:cash      USD -10.00 @@ EUR 8.50
    assets:cash      EUR   8.50
```

or the per-unit amount with `@` 
(makes the exchange rate, or an investment's cost basis, clearer):

```journal
2021-07-27 give dollars, get euros
    assets:cash      USD -10.00 @ EUR 0.85
    assets:cash      EUR   8.50
```

hledger calls these "[costs](hledger.md#costs)".
This is the most common way to record such transactions.

## Conversion using equity

A fully correct double-entry-bookkeeping journal entry 
avoids the PTA-specific `@`/`@@` notation,
and is balanced in each commodity, using equity. Eg:

```journal
2021-07-27 give dollars, get euros
    assets:cash        USD -10.00
    equity:conversion  USD  10.00
    assets:cash        EUR   8.50
    equity:conversion  EUR  -8.50
```

or, letting hledger infer the above:

```journal
2021-07-27 give dollars, get euros
    assets:cash        USD -10.00
    assets:cash        EUR   8.50
    equity:conversion
```

This is discussed more [here](investments.md#a-more-correct-entry).

## Two entries for one conversion

This comes up eg when [converting](import-csv.md) Paypal CSV, 
which provides two records for a currency conversion, one for each side.
For example, given some paypal CSV rules like:

```rules
account1 assets:paypal
...
if %type (T0200|General Currency Conversion)
 description %type for %referencetxnid %itemtitle
 account2 equity:conversion
```

we might see journal entries like:

```journal
2020-05-16 * Liberapay donation to simonmichael (team darcs-hub)
    assets:online:paypal                     C$24.56 =* C$24.56
    revenues:foss donations:darcshub        C$-26.00
    expenses:banking:paypal                   C$1.44

2020-05-16 * General Currency Conversion for 8Y4N723T948333034 Liberapay donation to simonmichael (team darcs-hub)
    assets:online:paypal                    C$-24.56 =* C$0.00
    equity:conversion                        C$24.56

2020-05-16 * General Currency Conversion for 8Y4N723T948333034 Liberapay donation to simonmichael (team darcs-hub)
    assets:online:paypal                      $16.88 =* $17.55
    equity:conversion                        $-16.88

```
Ie: some canadian dollars received, followed by two transactions converting that balance to US dollars.
This is equivalent to the "Fully balanced conversion" above, 
just with the conversion entry split into two.

## Balancing the accounting equation

If you are a fan of the accounting equation and like to check it by seeing
a zero total in the [`balancesheetequity`](hledger.md#balancesheetequity) report,
you will need to do something with these `equity:conversion` balances.
Such as, converting them to retained revenues/expenses in your local currency.
This can perhaps be done at transaction time,
or at the end of each accounting period,
or with report options.
Best practice is not yet clear, suggestions welcome.
<!-- 
Notes:

```cli
# Converting equity:conversion to revenue
$ hledger close equity:conversion --close -e 7/1 \
  --close-desc 'foreign exchange gains/losses' \
  --close-to='revenues:conversion'

2021-06-30 currency conversion expense/revenue
    equity:conversion        C$-24.56 = C$0.00
    equity:conversion          $16.88 = $0.00
    revenues:conversion

``` -->

## Converting with equity or with costs

Here's another look at the equity vs costs style of conversion entries,
somewhat repeating the content above.

In a currency conversion or a stock purchase/sale, one commodity is exchanged for another.
In plain text accounting, there are two ways to record such conversions:

### Equity method

Balance both commodities against an Equity account. Eg:

<!-- 1a.j -->
```journal
2021-01-01
  assets:usd                -1.20 USD
  equity:conversion          1.20 USD
  equity:conversion         -1.00 EUR
  assets:eur                 1.00 EUR
```

or, equivalently:

<!-- 1b.j -->
```journal
2021-01-01
  assets:usd                -1.20 USD
  assets:eur                 1.00 EUR
  equity:conversion
```

### Cost method

PTA tools provide the @ (or @@) notation for specifying a conversion cost
(essentially; Ledger/Beancount also provide an alternate {} notation):

<!-- 2a.j -->
```journal
2021-01-01
  assets:usd                -1.20 USD
  assets:eur                 1.00 EUR @ 1.20 USD
```

@-priced amounts (the 1.00 EUR above) will be converted to their price's commodity (USD)

- internally for checking transaction balancedness, always
- and visibly in reports, when the `-B/--cost` flag is used.

Note the redundancy in this entry; the two amounts and the @ price must agree. 
This provides some extra error checking, but you can also write it non-redundantly, 
by omitting an amount:

<!-- 2b.j -->
```journal
2021-01-01
  assets:usd                           ; the -1.20 USD amount is inferred
  assets:eur                 1.00 EUR @ 1.20 USD
```

or the conversion price:

<!-- 2c.j -->
```journal
2021-01-01
  assets:usd                -1.20 USD
  assets:eur                 1.00 EUR  ; the @ 1.20 USD price is inferred
```

### Which is better ?

It depends...
#### Cost reporting

The @ (conversion price) method allows "cost" reporting. By adding the
`-B/--cost` flag you can easily see what things cost (or were sold
for) in the other commodity. Eg:

```cli
$ hledger -f 2a.j bal --cost assets:eur
            1.20 USD  assets:eur
--------------------
            1.20 USD  
```


#### Capital gain/loss reporting

The equity method keeps a trace of all commodity exchanges in the equity account,
in effect properly recording the accumulated gain/loss from all commodity exchanges
(it can be seen by valuing the accumulated total of those equity balances in some commodity).

The @ method does not record the gain/loss from commodity exchanges
(at least, not so explicitly and not grouped by commodity pair.
We can still calculate it using hledger valuation features like -V, --valuechange, --gain.)

#### The accounting equation

The equity method keeps accounts and the accounting equation (A+L+E=0)
balanced. See how it keeps the balance report's total as zero:

```cli
$ hledger -f 1a.j bal
            1.00 EUR  assets:eur
           -1.20 USD  assets:usd
           -1.00 EUR
            1.20 USD  equity:conversion
--------------------
                   0  
```

The @ method causes unbalanced accounts and a non-zero total
(because of the "magical" transformation from one commodity to the other):

```cli
$ hledger -f 2a.j bal
            1.00 EUR  assets:eur
           -1.20 USD  assets:usd
--------------------
            1.00 EUR
           -1.20 USD  
```

The zero total can be seen only if all amounts are converted to cost:

```cli
$ hledger -f 2a.j bal --cost
            1.20 USD  assets:eur
           -1.20 USD  assets:usd
--------------------
                   0  
```

### Summary

The equity method: 

- doesn't support cost reporting.

The @ method:

- doesn't support easy gain/loss reporting by commodity pair.
- doesn't maintain balanced accounts

However, hledger nowadays can convert between these styles on the fly, using `--infer-equity` or (with some restrictions) `--infer-costs`. 
See the [hledger manual > Cost reporting](hledger.md#cost-reporting) for the latest on this.

## Four ways to record a conversion, compared

(From the former "Cost notation" page.)
To summarise, there are four ways to record a conversion of 100 EUR to 120 USD:

**With implicit cost:**
```journal
2021-01-01
    assets:cash    -100 EUR
    assets:cash     120 USD
```
hledger assumes the transaction is balanced and infers the rate, 1 EUR = 1.20 USD (`hledger print -x` shows it).
Concise, but with little error checking: typos in amounts or commodity symbols may go unnoticed,
the rate is not visible, and the accounting equation is disturbed unless you add `--infer-equity`.
`hledger check commodities` catches mistyped symbols; `hledger check balancednoautoconversion` (or `-s`) forbids implicit conversions entirely.

**With explicit cost:**
```journal
2021-01-01
    assets:cash        -100 EUR @ 1.20 USD
    assets:cash         120 USD
```
Still concise, the rate is visible, and hledger checks that 100 * 1.20 = 120.
The accounting equation is still disturbed unless you add `--infer-equity`.

**With equity postings:**
```journal
2021-01-01
    assets:cash        -100 EUR
    equity:conversion   100 EUR
    equity:conversion  -120 USD
    assets:cash         120 USD
```
Standard double entry bookkeeping: the equation balances, and conversions and related gains/losses are tracked in one place.
More verbose, the rate is not obvious, and cost reporting needs `--infer-costs`.

**With equity postings and explicit cost:**
```journal
2021-01-01
    assets:cash        -100 EUR @ 1.20 USD
    equity:conversion   100 EUR
    equity:conversion  -120 USD
    assets:cash         120 USD
```
The most complete: balanced, rate visible, most error checking. Also the most verbose, and not compatible with Ledger.
