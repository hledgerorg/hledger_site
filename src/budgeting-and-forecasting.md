# Budgeting and forecasting tutorial

Budgeting and forecasting help you keep track of your expenses and your future financial situation.
If you write down what you expect your income, expenses, investment yields, etc. to be, you can use those expectations to:

- check how far reality is from your expectations (budgeting)
- project your future account activity or balances (forecasting)

This tutorial uses `examples/bcexample.journal` from the hledger source repository,
and shows the goal-based budgeting supported by hledger's [budget report](hledger.md#budget-report).
For envelope budgeting and other approaches, see [Budgeting](budgeting.md).

## Goal-based budgeting

To start budgeting, you need to know what your typical expenses are, and hledger can help with that.
Usually you'll budget for the same interval as your paychecks, monthly or weekly.

Let's make a monthly (`-M`) report for 2013 onward (`-b 2013`) of all top-level expense categories (`--depth 2 Expenses`),
with an average column (`-A`), limited to USD transactions to save screen space (`cur:USD`).
The report is wide, so most of its columns are omitted here:

```cli
$ hledger balance -f bcexample.journal -MA -b 2013 --depth 2 Expenses cur:USD
Balance changes in 2013-01-01..2014-10-31:

                    ||     2013-01      2013-02      2013-03  ...      2014-08      2014-09      2014-10      Average 
====================++=======================================-----====================================================
 Expenses:Financial ||    4.00 USD    12.95 USD    39.80 USD  ...    21.90 USD    12.95 USD     4.00 USD    17.83 USD 
 Expenses:Food      ||  396.46 USD   481.48 USD   603.32 USD  ...   768.23 USD   466.72 USD    83.00 USD   562.10 USD 
 Expenses:Health    ||  290.70 USD   193.80 USD   193.80 USD  ...   193.80 USD   193.80 USD    96.90 USD   207.01 USD 
 Expenses:Home      || 2544.98 USD  2545.02 USD  2544.97 USD  ...  2545.01 USD  2545.10 USD            0  2429.33 USD 
 Expenses:Taxes     || 5976.60 USD  3984.40 USD  4901.83 USD  ...  3984.40 USD  3984.40 USD  1992.20 USD  4322.27 USD 
 Expenses:Transport ||  120.00 USD   120.00 USD   120.00 USD  ...   120.00 USD   120.00 USD   120.00 USD   109.09 USD 
--------------------++------------------------------------------------------------------------------------------------
                    || 9332.74 USD  7337.65 USD  8403.72 USD  ...  7633.34 USD  7322.97 USD  2296.10 USD  7647.64 USD 
```

The most interesting column is the last one, showing the average monthly expense in each category.
Food, Health, Home and Transport look roughly similar from month to month, so let's create a budget for them.

Budgets are described with [periodic transaction rules](hledger.md#periodic-transactions):
these look like transactions, but with `~` instead of a date, and a period expression instead of a description.
Here we want a monthly budget starting from January 2013, with an income of 10700 USD
partly spent on Food, Health, Home and Transport, and the rest going to our assets:

```journal
~ monthly from 2013-01
  Expenses:Food    500 USD
  Expenses:Health  200 USD
  Expenses:Home    2545 USD
  Expenses:Transport   120 USD
  Income:US        -10700 USD ;; Taken as monthly average of Income account group
  Assets:US
```

This rule can be kept in a separate file (`budget.journal`, say) or in the main journal.
Normally hledger ignores it; it affects only the reports where you ask for it.

To put it into action, add the `--budget` flag to a balance report.
Now you can see how your past expenses compared with the budget.
Let's look at the first quarter of 2013:

```cli
$ hledger balance -f bcexample.journal -f budget.journal -M -b 2013-01 -e 2013-04 --budget cur:USD
Budget performance in 2013Q1:

                    ||                                   Jan                                    Feb                                    Mar 
====================++=====================================================================================================================
 Assets:US          ||   1893.32 USD [ 26% of   7335.00 USD]    2929.77 USD [ 40% of   7335.00 USD]   -3898.89 USD [-53% of   7335.00 USD] 
 Income:US          || -15119.10 USD [141% of -10700.00 USD]  -10331.21 USD [ 97% of -10700.00 USD]  -11079.40 USD [104% of -10700.00 USD] 
 Expenses           ||   9332.74 USD [277% of   3365.00 USD]    7337.65 USD [218% of   3365.00 USD]    8403.72 USD [250% of   3365.00 USD] 
 Expenses:Food      ||    396.46 USD [ 79% of    500.00 USD]     481.48 USD [ 96% of    500.00 USD]     603.32 USD [121% of    500.00 USD] 
 Expenses:Health    ||    290.70 USD [145% of    200.00 USD]     193.80 USD [ 97% of    200.00 USD]     193.80 USD [ 97% of    200.00 USD] 
 Expenses:Home      ||   2544.98 USD [100% of   2545.00 USD]    2545.02 USD [100% of   2545.00 USD]    2544.97 USD [100% of   2545.00 USD] 
 Expenses:Transport ||    120.00 USD [100% of    120.00 USD]     120.00 USD [100% of    120.00 USD]     120.00 USD [100% of    120.00 USD] 
 <unbudgeted>       ||    293.09 USD                            -147.51 USD                             -66.01 USD                         
--------------------++---------------------------------------------------------------------------------------------------------------------
                    ||  -3599.95 USD [                    0]    -211.30 USD [                    0]   -6640.58 USD [                    0] 
```

The numbers in square brackets show the budget goal and the percentage of it used by the actual amount.
Below 100% means some budget is left, over 100% means you went over budget.

Some things to notice:

- Only accounts mentioned in the budget are shown (plus their parents, like `Expenses`, whose goal is the sum of its children's).
  When checking a budget you probably don't want unbudgeted accounts in the way.
- Budget goals apply to the whole subtree: the journal has subaccounts under `Expenses:Food`,
  and their amounts are rolled up into the nearest parent with a goal.
- Accounts with no budgeted parent are summarised in the `<unbudgeted>` row.
- `Assets:US` is well below its goal of 7335 USD. Why? The `Expenses` row is the answer:
  actual expenses are around 250% of the budgeted ones, so we are missing some big expenses from the budget.

To see the details, add `-E/--empty`, which shows the unbudgeted accounts and subaccounts too.
Let's look at January only:

```cli
$ hledger balance -f bcexample.journal -f budget.journal -M -b 2013-01 -e 2013-02 --budget cur:USD -E
Budget performance in 2013-01:

                                         ||                                   Jan 
=========================================++=======================================
 Assets:US                               ||   1893.32 USD [ 26% of   7335.00 USD] 
 Assets:US:BofA:Checking                 ||    693.27 USD                         
 Assets:US:Vanguard:Cash                 ||   1200.05 USD                         
 Income:US                               || -15119.10 USD [141% of -10700.00 USD] 
 Income:US:Hoogle:GroupTermLife          ||    -72.96 USD                         
 Income:US:Hoogle:Match401k              ||  -1200.00 USD                         
 Income:US:Hoogle:Salary                 || -13846.14 USD                         
 Expenses:Financial:Fees                 ||      4.00 USD                         
 Expenses:Food                           ||    396.46 USD [ 79% of    500.00 USD] 
 Expenses:Food:Groceries                 ||     97.47 USD                         
 Expenses:Food:Restaurant                ||    298.99 USD                         
 Expenses:Health                         ||    290.70 USD [145% of    200.00 USD] 
 Expenses:Health:Dental:Insurance        ||      8.70 USD                         
 Expenses:Health:Life:GroupTermLife      ||     72.96 USD                         
 Expenses:Health:Medical:Insurance       ||     82.14 USD                         
 Expenses:Health:Vision:Insurance        ||    126.90 USD                         
 Expenses:Home                           ||   2544.98 USD [100% of   2545.00 USD] 
 Expenses:Home:Electricity               ||     65.00 USD                         
 Expenses:Home:Internet                  ||     79.98 USD                         
 Expenses:Home:Rent                      ||   2400.00 USD                         
 Expenses:Taxes:Y2013:US:CityNYC         ||    524.76 USD                         
 Expenses:Taxes:Y2013:US:Federal         ||   3188.76 USD                         
 Expenses:Taxes:Y2013:US:Medicare        ||    319.86 USD                         
 Expenses:Taxes:Y2013:US:SDI             ||      3.36 USD                         
 Expenses:Taxes:Y2013:US:SocSec          ||    844.62 USD                         
 Expenses:Taxes:Y2013:US:State           ||   1095.24 USD                         
 Expenses:Transport                      ||    120.00 USD [100% of    120.00 USD] 
 Expenses:Transport:Tram                 ||    120.00 USD                         
 <unbudgeted>:Liabilities:US:Chase:Slate ||    293.09 USD                         
-----------------------------------------++---------------------------------------
                                         ||  -3599.95 USD [                    0] 
```

Now it's easy to see: we forgot taxes. Let's add them to the budget:

```journal
~ monthly from 2013-01
  Expenses:Food    500 USD
  Expenses:Health  200 USD
  Expenses:Home    2545 USD
  Expenses:Transport   120 USD
  Expenses:Taxes   4300 USD ;; Taken from the monthly average report
  Income:US        -10700 USD
  Assets:US
```

And try again:

```cli
$ hledger balance -f bcexample.journal -f budget.journal -M -b 2013-01 -e 2013-04 --budget cur:USD
Budget performance in 2013Q1:

                    ||                                   Jan                                    Feb                                     Mar 
====================++======================================================================================================================
 Assets:US          ||   1893.32 USD [ 62% of   3035.00 USD]    2929.77 USD [ 97% of   3035.00 USD]   -3898.89 USD [-128% of   3035.00 USD] 
 Income:US          || -15119.10 USD [141% of -10700.00 USD]  -10331.21 USD [ 97% of -10700.00 USD]  -11079.40 USD [ 104% of -10700.00 USD] 
 Expenses           ||   9332.74 USD [122% of   7665.00 USD]    7337.65 USD [ 96% of   7665.00 USD]    8403.72 USD [ 110% of   7665.00 USD] 
 Expenses:Food      ||    396.46 USD [ 79% of    500.00 USD]     481.48 USD [ 96% of    500.00 USD]     603.32 USD [ 121% of    500.00 USD] 
 Expenses:Health    ||    290.70 USD [145% of    200.00 USD]     193.80 USD [ 97% of    200.00 USD]     193.80 USD [  97% of    200.00 USD] 
 Expenses:Home      ||   2544.98 USD [100% of   2545.00 USD]    2545.02 USD [100% of   2545.00 USD]    2544.97 USD [ 100% of   2545.00 USD] 
 Expenses:Taxes     ||   5976.60 USD [139% of   4300.00 USD]    3984.40 USD [ 93% of   4300.00 USD]    4901.83 USD [ 114% of   4300.00 USD] 
 Expenses:Transport ||    120.00 USD [100% of    120.00 USD]     120.00 USD [100% of    120.00 USD]     120.00 USD [ 100% of    120.00 USD] 
 <unbudgeted>       ||    293.09 USD                            -147.51 USD                             -66.01 USD                          
--------------------++----------------------------------------------------------------------------------------------------------------------
                    ||  -3599.95 USD [                    0]    -211.30 USD [                    0]   -6640.58 USD [                     0] 
```

Now the unbudgeted amounts are small, and the budget is close to the real numbers,
which makes sense since we took them from the averages.

The budget report so far assumes that any unused budget in one month does not carry over to the next.
The popular "envelope" strategy assumes instead that you put a certain amount into an envelope each month,
and anything unused stays there for future expenses.
You can simulate this by adding `--cumulative`:

```cli
$ hledger balance -f bcexample.journal -f budget.journal -M -b 2013-01 -e 2013-04 --cumulative --budget cur:USD
Budget performance in 2013Q1:

                    ||                            2013-01-31                             2013-02-28                             2013-03-31 
====================++=====================================================================================================================
 Assets:US          ||   1893.32 USD [ 62% of   3035.00 USD]    4823.09 USD [ 79% of   6070.00 USD]     924.20 USD [ 10% of   9105.00 USD] 
 Income:US          || -15119.10 USD [141% of -10700.00 USD]  -25450.31 USD [119% of -21400.00 USD]  -36529.71 USD [114% of -32100.00 USD] 
 Expenses           ||   9332.74 USD [122% of   7665.00 USD]   16670.39 USD [109% of  15330.00 USD]   25074.11 USD [109% of  22995.00 USD] 
 Expenses:Food      ||    396.46 USD [ 79% of    500.00 USD]     877.94 USD [ 88% of   1000.00 USD]    1481.26 USD [ 99% of   1500.00 USD] 
 Expenses:Health    ||    290.70 USD [145% of    200.00 USD]     484.50 USD [121% of    400.00 USD]     678.30 USD [113% of    600.00 USD] 
 Expenses:Home      ||   2544.98 USD [100% of   2545.00 USD]    5090.00 USD [100% of   5090.00 USD]    7634.97 USD [100% of   7635.00 USD] 
 Expenses:Taxes     ||   5976.60 USD [139% of   4300.00 USD]    9961.00 USD [116% of   8600.00 USD]   14862.83 USD [115% of  12900.00 USD] 
 Expenses:Transport ||    120.00 USD [100% of    120.00 USD]     240.00 USD [100% of    240.00 USD]     360.00 USD [100% of    360.00 USD] 
 <unbudgeted>       ||    293.09 USD                             145.58 USD                              79.57 USD                         
--------------------++---------------------------------------------------------------------------------------------------------------------
                    ||  -3599.95 USD [                    0]   -3811.25 USD [                    0]  -10451.83 USD [                    0] 
```

Look at `Expenses:Food`: each month the budget grows by 500 USD, so by March the total budgeted is 1500 USD,
of which 1481.26 USD was spent.
The monthly report above said March's food expenses were 121% of budget,
but with January's and February's unspent budget carried over, we are within the plan.

## Envelope budgeting

Real envelope budgeting means actually setting money aside for each category, and spending only from there.
With physical envelopes, there are actual envelopes of cash.
With hledger, the envelopes are subaccounts, into which you transfer money and from which you spend it.

With this style of budgeting you don't use periodic transaction rules or the `--budget` report,
just regular transfers and regular balance reports.
At the end of each period you can remove or reallocate any surplus, or let it roll over.

A good place for the envelope accounts is under your regular checking or cash account,
eg `assets:checking:rent`, `assets:checking:food`, since that keeps the overall balance correct.
Some people use virtual (imaginary) accounts instead.

The advantage of envelope budgeting is that it models your available funds precisely,
which matters when cashflow is tight.
hledger doesn't prevent overspending from an envelope; you should watch their balances and keep them from going negative
(the [hledger-check-fancyassertions](scripts.md#hledger-check-fancyassertions) script could help).
The downside is more bookkeeping work. Some people use [auto posting rules](hledger.md#auto-postings) to reduce it, at the cost of some complexity.

For more about envelope budgeting, see [plaintextaccounting.org/budgeting](https://plaintextaccounting.org/Budgeting).

## Forecasting

The same periodic rules can predict our future financial situation.
Add the [`--forecast`](hledger.md#forecasting) flag and hledger generates the transactions the rules describe,
which then appear in any report as if they were really recorded.
Since our rule says `from 2013-01`, it would generate forecast transactions from 2013 onward, overlapping the real data;
so we give `--forecast` a period, starting after the journal's last transaction in October 2014.
Let's look at the last quarter of 2014, limiting the depth to keep the report short:

```cli
$ hledger balance -f bcexample.journal -f budget.journal -M -b 2014-10 -e 2015 --forecast=2014-11.. cur:USD --depth 2
Balance changes in 2014Q4:

                    ||          Oct            Nov            Dec 
====================++============================================
 Assets:US          ||  2546.60 USD    3035.00 USD    3035.00 USD 
 Liabilities:US     ||  -203.00 USD              0              0 
 Income:US          || -4639.70 USD  -10700.00 USD  -10700.00 USD 
 Expenses:Financial ||     4.00 USD              0              0 
 Expenses:Food      ||    83.00 USD     500.00 USD     500.00 USD 
 Expenses:Health    ||    96.90 USD     200.00 USD     200.00 USD 
 Expenses:Home      ||            0    2545.00 USD    2545.00 USD 
 Expenses:Taxes     ||  1992.20 USD    4300.00 USD    4300.00 USD 
 Expenses:Transport ||   120.00 USD     120.00 USD     120.00 USD 
--------------------++--------------------------------------------
                    ||            0              0              0 
```

October shows real transactions; November and December show the forecast ones.
Note that unlike `--budget`, which works only with the balance command, `--forecast` works with any report.

We should expect 3035 USD to be added to `Assets:US` each month.
It's easy to see how the total will change over time with `--cumulative`:

```cli
$ hledger balance -f bcexample.journal -f budget.journal -M -b 2014-10 -e 2015 --forecast=2014-11.. cur:USD --depth 2 --cumulative
Ending balances (cumulative) in 2014Q4:

                    ||   2014-10-31     2014-11-30     2014-12-31 
====================++============================================
 Assets:US          ||  2546.60 USD    5581.60 USD    8616.60 USD 
 Liabilities:US     ||  -203.00 USD    -203.00 USD    -203.00 USD 
 Income:US          || -4639.70 USD  -15339.70 USD  -26039.70 USD 
 Expenses:Financial ||     4.00 USD       4.00 USD       4.00 USD 
 Expenses:Food      ||    83.00 USD     583.00 USD    1083.00 USD 
 Expenses:Health    ||    96.90 USD     296.90 USD     496.90 USD 
 Expenses:Home      ||            0    2545.00 USD    5090.00 USD 
 Expenses:Taxes     ||  1992.20 USD    6292.20 USD   10592.20 USD 
 Expenses:Transport ||   120.00 USD     240.00 USD     360.00 USD 
--------------------++--------------------------------------------
                    ||            0              0              0 
```

According to this, assets should grow to 8600+ USD by the end of 2014.
But the forecast doesn't yet include two big one-off expenses.
Every year from 2014 we plan to buy a prize turkey for Christmas, spending up to 500 USD.
And on 17 November 2014 we'll celebrate a significant other's birthday, spending up to 6000 USD in a fancy restaurant:

```journal
~ every 20th Dec from 2014
  Expenses:Food   500 USD ; Prize turkey, the biggest of the big
  Assets:US

~ 2014-11-17
  Assets:US
  Expenses:Food   6000 USD ; Birthday, lots of guests
```

Note the turkey rule is not written as `yearly from 2014-12-20`:
yearly, quarterly, monthly and weekly rules always generate entries on the first day of the year, quarter, month or week.
`monthly from 2014-12` would give 2014-12-01, 2015-01-01, ..., whereas `every 20th of month from 2014-12` gives 2014-12-20, 2015-01-20, etc.
(See [period expressions](hledger.md#period-expressions).)

With these additions the forecast looks like this:

```cli
$ hledger balance -f bcexample.journal -f budget.journal -M -b 2014-10 -e 2015 --forecast=2014-11.. cur:USD --depth 2 --cumulative
Ending balances (cumulative) in 2014Q4:

                    ||   2014-10-31     2014-11-30     2014-12-31 
====================++============================================
 Assets:US          ||  2546.60 USD    -418.40 USD    2116.60 USD 
 Liabilities:US     ||  -203.00 USD    -203.00 USD    -203.00 USD 
 Income:US          || -4639.70 USD  -15339.70 USD  -26039.70 USD 
 Expenses:Financial ||     4.00 USD       4.00 USD       4.00 USD 
 Expenses:Food      ||    83.00 USD    6583.00 USD    7583.00 USD 
 Expenses:Health    ||    96.90 USD     296.90 USD     496.90 USD 
 Expenses:Home      ||            0    2545.00 USD    5090.00 USD 
 Expenses:Taxes     ||  1992.20 USD    6292.20 USD   10592.20 USD 
 Expenses:Transport ||   120.00 USD     240.00 USD     360.00 USD 
--------------------++--------------------------------------------
                    ||            0              0              0 
```

Assets go negative in November 2014. A register report shows when and why:

```cli
$ hledger register -f bcexample.journal -f budget.journal -b 2014-10 -e 2014-12 --forecast=2014-11.. cur:USD Assets
2014-10-04 BANK FEES | Month..  As:US:BofA:Checking      -4.00 USD     -4.00 USD
2014-10-09 Hoogle | Payroll     As:US:BofA:Checking    2550.60 USD   2546.60 USD
2014-10-10 Transfering accum..  As:US:BofA:Checking   -5000.00 USD  -2453.40 USD
                                As:US:ETrade:Cash      5000.00 USD   2546.60 USD
2014-11-01                      Assets:US              3035.00 USD   5581.60 USD
2014-11-17                      Assets:US             -6000.00 USD   -418.40 USD
```

It's the 6000 USD birthday. Something will have to be done about the birthday plans.
