# Budgeting

Last updated: 2023

## All budgeting-related docs

- [hledger > balance > Budget report](hledger.md#budget-report), hledger's built-in periodic budget report

- [Budgeting and forecasting (2018)](budgeting-and-forecasting.md), a older introduction

- <https://github.com/hledgerorg/hledger/tree/main/examples/budgeting>, annotated examples of journals implementing budgets

- [plaintextaccounting.org: Budgeting](https://plaintextaccounting.org/Budgeting), more budgeting-related docs, for all PTA tools

- [Age Your Money](https://www.youneedabudget.com/guides/age-your-money), the YNAB (YouNeedABudget) way

- <https://github.com/zombor/hledger-envelope-budget>

- <https://github.com/Kickball/awesome-selfhosted#money-budgeting--management>, some other budgeting software for comparison

- [Time planning](time-planning.md#how-to-set-up-a-time-budget) -> How to set up a time budget

## Approaches

There are two main approaches, which can be combined:

- **Envelope budgeting** is like keeping cash for different purposes in different envelopes:
  you allocate money to each purpose up front, and spend from those allocations.
  The envelopes can be modelled as real-world accounts (eg extra savings accounts at your bank),
  as virtual subaccounts of a real account (eg of your checking account),
  or as separate virtual accounts (eg `budget:*`).
  The allocations can be recorded by hand, or generated with [auto posting rules](hledger.md#auto-postings).
  This sets limits on the source side; a pile of money approaching zero is very intuitive.
  It gives more control over cashflow, and needs more journal entries.

- **Goal budgeting** (or report-based budgeting) sets goals or limits per account per period,
  and then measures actual inflows/outflows against them.
  hledger's [budget report](hledger.md#budget-report) (`balance --budget`) does this,
  using [periodic transaction rules](hledger.md#periodic-transactions) to define the goals.
  This sets goals on the destination side, with less enforcement and less work.
  Some notes on it:

  - `--budget` requires a report interval; it has no effect on single-column reports.
  - `--budget INTERVAL` enables all periodic transaction rules with that interval; these can be date-limited.
  - `--budget` hides accounts which have no budget goals, unless you add `-E`.
  - `hledger balance --budget -E expenses` is roughly equivalent to `ledger budget --add-budget expenses`;
    both show budgeted and unbudgeted accounts.

In either approach, the numbers you pick can be goals (go at least this far) or limits (don't go beyond this).

"Budgeting" can cover a lot of things: setting earning and spending goals; reviewing performance against them;
controlling spending; allocating funds for short-term expenses or savings goals; updating and rebalancing allocations;
end of period actions (roll over or reset); forecasting cash balances and managing cashflow.
Be clear about which of these you need.

### --budget and subaccounts

You can add budgets to any account in your account hierarchy. If you have budgets on both parent account and some of its children, then budget(s)
of the child account(s) would be added to the budget of their parent, much like account balances behave.

In the most simple case this means that once you add a budget to any account, all its parents would have budget as well. 

To illustrate this, consider the following budget:
```
~ monthly from 2019/01
    expenses:personal             $1,000.00
    expenses:personal:electronics    $100.00
    liabilities
```

With this, monthly budget for electronics is defined to be \$100 and budget for personal expenses is an additional $1000, which implicitly means
that budget for both `expenses:personal` and `expenses` is \$1100.

Transactions in `expenses:personal:electronics` will be counted both towards its \$100 budget and \$1100 of `expenses:personal` , and transactions in any other subaccount of `expenses:personal` would be
counted towards only towards the budget of `expenses:personal`.

For example, let's consider these transactions:
```journal
~ monthly from 2019/01
    expenses:personal             $1,000.00
    expenses:personal:electronics    $100.00
    liabilities

2019/01/01 Google home hub
    expenses:personal:electronics          $90.00
    liabilities                           $-90.00

2019/01/02 Phone screen protector
    expenses:personal:electronics:upgrades          $10.00
    liabilities

2019/01/02 Weekly train ticket
    expenses:personal:train tickets       $153.00
    liabilities

2019/01/03 Flowers
    expenses:personal          $30.00
    liabilities
```

As you can see, we have transactions in `expenses:personal:electronics:upgrades` and `expenses:personal:train tickets`, and since both of these accounts are without explicitly defined budget,
these transactions would be counted towards budgets of `expenses:personal:electronics` and `expenses:personal` accordingly:

```cli
$ hledger balance --budget -M
Budget performance in 2019/01:

                               ||                           Jan 
===============================++===============================
 expenses                      ||  $283.00 [  26% of  $1100.00] 
 expenses:personal             ||  $283.00 [  26% of  $1100.00] 
 expenses:personal:electronics ||  $100.00 [ 100% of   $100.00] 
 liabilities                   || $-283.00 [  26% of $-1100.00] 
-------------------------------++-------------------------------
                               ||        0 [                 0] 
```

And with `--empty`, we can get a better picture of budget allocation and consumption:
```cli
$ hledger balance --budget -M --empty
Budget performance in 2019/01:

                                        ||                           Jan 
========================================++===============================
 expenses                               ||  $283.00 [  26% of  $1100.00] 
 expenses:personal                      ||  $283.00 [  26% of  $1100.00] 
 expenses:personal:electronics          ||  $100.00 [ 100% of   $100.00] 
 expenses:personal:electronics:upgrades ||   $10.00                      
 expenses:personal:train tickets        ||  $153.00                      
 liabilities                            || $-283.00 [  26% of $-1100.00] 
----------------------------------------++-------------------------------
                                        ||        0 [                 0] 
```

## Forecasting

Some ways to forecast with hledger:

- Enter future-dated transactions in your journal, commented out (with `;` or `comment`).
- Enter future transactions uncommented, and use a query to exclude them from reports when needed
  (`-e tomorrow` or `date:-tomorrow`; hledger-ui hides them by default).
- Enter future transactions in a separate `forecast.journal`, which you include when needed (eg with `-f forecast.journal`).
- Enter [periodic transaction rules](hledger.md#periodic-transactions) describing future recurring or one-off transactions,
  and generate them with [`--forecast`](hledger.md#forecasting).
  The same rules can define budget goals, as described in [Budgeting and forecasting (2018)](budgeting-and-forecasting.md).
