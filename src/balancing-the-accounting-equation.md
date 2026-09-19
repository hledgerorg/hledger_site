# Balancing the accounting equation

Last updated: 2025

The [Accounting Equation](https://en.wikipedia.org/wiki/Accounting_equation) 
states that Assets and Liabilities always match Equity. Eg: `A - L = E`. 

This suggests that a balance report showing all Asset,
Liability and Equity account balances should show a zero grand
total. With hledger you can check this with a `balance` report like:

```cli
$ hledger balance ^assets ^liabilities ^equity
```

or more easily with the `balancesheetequity` command, which is designed for this:

```cli
$ hledger bse
```

Note, checking the accounting equation is different from checking a
[trial balance](https://en.wikipedia.org/wiki/Trial_balance).
A trial balance just checks that the total inflows and outflows over all accounts are equal,
which can be seen by a zero grand total for `hledger balance`.
Normally this is ensured by hledger's requirement that each individual transaction is balanced,
but some of the same problems noted below apply to this also.

## Common problems
In practice, you will find quite a number of things in real-life
journals can disrupt the accounting equation and cause a non-zero
total. Note, this does not interfere with most day-to-day reporting,
and many PTA users won't notice it as a problem. But, seeing the
correct zero total gives added confidence in your bookkeeping, for
yourself and others you might be sharing reports with.  

Here are some things that disturb the accounting equation, and their solutions:

### 1. Unclosed revenue/expenses
Revenues (income) and expenses are technically part of
equity. In traditional accounting, they should be transferred to an account like
`equity:retained earnings` at the end of each reporting period. 

You could record such transfers in your journal, either manually or
[using close --retain](hledger.md#example-retain-earnings>).
Most PTA users don't bother with this.

More conveniently, you can use an account alias to convert revenue/expense accounts to equity temporarily. 
Eg:\
`--alias '/^(revenues|income|expenses)\b/=equity'`

However, that doesn't work if you have declared your account types with `type:` tags.
Alternatively, you could try including `close --retain`'s output on the fly (which is probably what the bse command should have built in).
Eg if you are using bash:

`hledger -f $LEDGER_FILE -f <(hledger close --retain) bse`

### 2. Unbalanced conversions with cost notation (@/@@)
Currency/commodity conversions using @/@@ notation and no
[equity conversion postings](hledger.md#equity-conversion-postings) are unbalanced.
You can rewrite them in balanced form, eg
[combining costs and equity conversion postings](hledger.md#combining-costs-and-equity-conversion-postings).

Or, use `--infer-equity` to do this temporarily at report time. 

Or, converting amounts to cost may be another solution - try adding `-B`.

### 3. Rounding error with unit costs (@) and --infer-equity
`--infer-equity` is convenient but it tends to expose inaccuracies in
the recorded @ prices, causing small non-zero values in the total. You
can ignore this, or try to fix it by making @ prices more accurate, or
replace your uses of @ with @@ (?) or equity postings.

### 4. Posting dates
Postings dates different from their transaction's date (`; date:DATE`
or `; [DATE]` notation) cause an imbalance in the accounting equation
between the transaction date and posting date. Usually these unbalanced
periods are short and do not cross a file boundary, so you can just
avoid them when testing the accounting equation.

If they do cross a file boundary, or are inconveniently long, 
you can fix that by splitting the transaction into two transactions 
which use a pending account, as in
[close and balance assertions](hledger.md#close-and-balance-assertions).

### 5. Unbalanced postings
Unbalanced virtual postings (with parenthesised account names)
create an imbalance by definition; just exclude them from the report with
`-R/--real`. This also excludes balanced virtual postings (with
bracketed account names), but that will probably be harmless.

### 6. Partial reports
Many kinds of report [query](#queries) exclude some data, which can disturb the accounting equation.
So, it's best to avoid queries when checking the accounting equation. 
If you specify a report start date, be sure to include
balances from previous transactions by adding `-H/--historical`.
(Or use the `bse` command, which does this automatically.)

### 7. Disrupted balance assertions
Some combination of the above may cause balance assertions to fail, in which case you can disable those with `-I`.

## An improved accounting equation report
So combining these workarounds, 
here are some commands more likely to accurately check the accounting equation,
for the moment.
A zero final total indicates the accounting equation is balanced.

### Merging RX with aliases

```cli
$ hledger bse -R --infer-equity --alias '/^(revenues|income|expenses)\b/=equity' not:desc:'closing balances' --layout tall
```

- `-R` - (--real) excludes any unbalanced virtual postings
- `--infer-equity` - adds equity postings where needed to balance transactions using @/@@ cost notation
- `--alias ...` - recategorises all revenues/expenses as equity
- `not:desc:...` - excludes any final closing balance transactions that would hide ending balances (suitable for checking a single journal file)
- `--layout tall` - improves readability when there are many commodities
- `-f ...` - optional, specifies a file other than the default $LEDGER_FILE.

### Merging RX with close

```cli
$ hledger bse -R --infer-equity -f $LEDGER_FILE -f <(hledger close --retain) -I not:desc:'closing balances' --layout tall
```
- `<(...)` - bash syntax, puts the command's output in a temporary file
- `hledger close --retain` - generates transactions transferring revenues & expenses to equity
- `-I` - ignores any failing balance assertions

### Trial balance report

You could also just use the balance command to show a full [trial balance report](https://en.wikipedia.org/wiki/Trial_balance) involving all accounts,
which may be simpler. 

```cli
$ hledger bal type:ALERX -R --infer-equity not:desc:'closing balances' --layout tall
```

- `type:ALERX` - consider only asset/liability/equity/revenue/expense accounts, not any non-standard accounts you might be using
