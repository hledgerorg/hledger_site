# Cost notation

Last updated: 2023

Here is a little more background on cost notations, 
moved here from [hledger manual > Cost reporting](https://hledger.org/dev/hledger.html#cost-reporting).

Essentially there are four ways to record a commodity conversion in hledger (as of 2023):

### Conversion with implicit cost

Let's assume 100 EUR is converted to 120 USD.  You can just record the
outflow (100 EUR) and inflow (120 USD) in the appropriate asset
account:

```journal
2021-01-01
    assets:cash    -100 EUR
    assets:cash     120 USD
```

hledger will assume this transaction is balanced, inferring that the
conversion rate must be 1 EUR = 1.20 USD. You can see the inferred
rate by using `hledger print -x`.

Pro: 

- Concise, easy

Con: 

- Less error checking - typos in amounts or commodity symbols may not be detected
- Conversion rate is not clear
- Disturbs the accounting equation, unless you add the --infer-equity flag

You can prevent accidental implicit conversions due to a mistyped
commodity symbol, by using `hledger check commodities`.

You can prevent implicit conversions entirely, by using `hledger check
balancednoautoconversion`, or `-s/--strict`.

### Conversion with explicit cost

You can add the conversion rate using @ notation:

```journal
2021-01-01
    assets:cash        -100 EUR @ 1.20 USD
    assets:cash         120 USD
```

Now hledger will check that 100 * 1.20 = 120, and would report an error otherwise.

Pro: 

- Still concise
- Makes the conversion rate clear
- Provides more error checking

Con: 

- Disturbs the accounting equation, unless you add the --infer-equity flag

### Conversion with equity postings

In strict double entry bookkeeping, the above transaction is not
balanced in EUR or in USD, since some EUR disappears, and some USD
appears. This violates the accounting equation (A+L+E=0), and prevents
reports like `balancesheetequity` from showing a zero total.

The proper way to make it balance is to add a balancing posting for
each commodity, using an equity account:

```journal
2021-01-01
    assets:cash        -100 EUR
    equity:conversion   100 EUR
    equity:conversion  -120 USD
    assets:cash         120 USD
```

Pro: 

- Preserves the accounting equation
- Keeps track of conversions and related gains/losses in one place
- Standard, works in any double entry accounting system

Con: 

- More verbose
- Conversion rate is not obvious
- Cost reporting requires adding the --infer-costs flag

### Conversion with equity postings and explicit cost

Here both equity postings and @ notation are used together.

```journal
2021-01-01
    assets:cash        -100 EUR @ 1.20 USD
    equity:conversion   100 EUR
    equity:conversion  -120 USD
    assets:cash         120 USD
```

Pro: 

- Preserves the accounting equation
- Keeps track of conversions and related gains/losses in one place
- Makes the conversion rate clear
- Provides more error checking

Con: 

- Most verbose
- Not compatible with ledger
