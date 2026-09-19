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

## Notes

```
 <sm> two commands that are roughly equivalent: ledger budget --add-budget expenses, hledger balance --budget -E expenses
 <sm> they show both budgeted and unbudgeted accounts            
```

```
--budget has no effect on single-column reports, it requires a reporting interval
--budget INTERVAL enables all periodic transactions with that interval; these can be date-limited
--budget hides all non-budgeted subaccounts; can be depth-limited more
```

```
<sm> there's different ways to do budgeting                     [16:46]
<sm> let me try to count them                                   [16:50]
<sm> "envelope budgeting" is analogous to having a set of envelopes containing cash for different purposes. 
You can model the "envelopes" with 
a. real-world accounts (eg your bank lets you create arbitrary savings accounts), 
b. virtual (imaginary) subaccounts of a real-world account (eg your checking account), 
c. virtual accounts "off to the side" (budget:*)
<sm> also you can do the transfers to and from these manually, or generate them with automated posting rules
<sm> "goal budgeting" (best name I can come up with) involves setting some inflow/outflow goals per account per period, 
and then measuring how the actual flows compare with the goals. balance --budget provides this report
<sm> I think that's 7 ways
```

From <https://www.reddit.com/r/plaintextaccounting/comments/doq9p5/new_to_ledger_budgeting_question>:

> Also search for budgeting links at http://plaintextaccounting.org . You'll see two main approaches discussed:
> 
> 1. "envelope budgeting" - sounds more like what you've been doing. Based around explicitly allocating money for each purpose. Good for managing > cashflow. Requires more journal entries. Can be done entirely manually (1a) but many docs advise using automatic posting rules to assist (1b). Many > different ways to handle the details. Requires more thinking.
> 
> 2. the other kind ("report-based budgeting" ?). Based around a special budget report provided by Ledger/hledger, which uses periodic transaction > rules to set budget goals. Automatic posting rules might be useful here too, I'm not sure. Provides less enforcement, requires less work. Fewer ways > to do it, perhaps provides simpler/clearer reports.
> 
> I often find "budgeting" covers/touches on quite a lot of topics: 
> - setting earning/spending goals, 
> - reviewing performance against those goals, 
> - controlling earning/spending based on the goals, 
> - allocating funds for short term expenses, 
> - allocating funds towards savings goals, 
> - updating allocated funds as transactions occur, 
> - reallocating funds/balancing the budget, 
> - end of period actions (roll over ? reset ?), 
> - forecasting cash balances and managing cashflow, 
> - forecasting income/expenses... 


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


Envelope budgeting sets the limits on the source side, and a pile of money approaching zero is very intuitive.

Goal budgeting sets the goals (or limits) on the destination side. 
And we don't usually enforce not going over.

In either system, the numbers we pick can be goals (go at least this far) or limits (don't go beyond this).

You can also mix them: envelope/source limits for some categories, goal/destination thresholds for others.
-->
