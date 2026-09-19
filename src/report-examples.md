# Report examples

There are some [example reports on the home page](index.md#a-quick-example).

Here are some more example reports using the [bcexample journal][bcexample] from beancount:

[bcexample]: https://raw.githubusercontent.com/hledgerorg/hledger/main/examples/bcexample.journal

A yearly income statement, summarised to depth 3, sorted by amount:

```cli
$ hledger -f examples/bcexample.journal is -Y -3 -S
Income Statement 2012-01-01..2014-10-11

                                ||                                     2012                                      2013                                      2014 
================================++==============================================================================================================================
 Revenues                       ||                                                                                                                              
--------------------------------++------------------------------------------------------------------------------------------------------------------------------
 Income:US:Federal              ||                          17000.00 IRAUSD                           17500.00 IRAUSD                           17500.00 IRAUSD 
 Income:US:Hoogle               ||              129132.20 USD, 120.12 VACHR               129382.20 USD, 120.12 VACHR                106183.70 USD, 97.02 VACHR 
 Income:US:ETrade               ||                                        0                                114.42 USD                                258.92 USD 
--------------------------------++------------------------------------------------------------------------------------------------------------------------------
                                || 17000.00 IRAUSD, 129132.20 USD, 1 more..  17500.00 IRAUSD, 129496.62 USD, 1 more..  17500.00 IRAUSD, 106442.62 USD, 1 more.. 
================================++==============================================================================================================================
 Expenses                       ||                                                                                                                              
--------------------------------++------------------------------------------------------------------------------------------------------------------------------
 Expenses:Home:Rent             ||                             28800.00 USD                              28800.00 USD                              21600.00 USD 
 Expenses:Food:Restaurant       ||                              4517.54 USD                               4286.23 USD                               4164.76 USD 
 Expenses:Food:Groceries        ||                              2188.90 USD                               2222.97 USD                               1602.51 USD 
 Expenses:Transport:Tram        ||                              1320.00 USD                               1320.00 USD                               1080.00 USD 
 Expenses:Health:Vision         ||                              1099.80 USD                               1099.80 USD                                888.30 USD 
 Expenses:Home:Internet         ||                               960.48 USD                                959.82 USD                                720.50 USD 
 Expenses:Home:Electricity      ||                               780.00 USD                                780.00 USD                                585.00 USD 
 Expenses:Health:Medical        ||                               711.88 USD                                711.88 USD                                574.98 USD 
 Expenses:Health:Life           ||                               632.32 USD                                632.32 USD                                510.72 USD 
 Expenses:Financial:Commissions ||                                35.80 USD                                214.80 USD                                 89.50 USD 
 Expenses:Health:Dental         ||                                75.40 USD                                 75.40 USD                                 60.90 USD 
 Expenses:Financial:Fees        ||                                48.00 USD                                 48.00 USD                                 40.00 USD 
 Expenses:Food:Coffee           ||                                16.28 USD                                 19.79 USD                                 47.65 USD 
 Expenses:Food:Alcohol          ||                                        0                                 22.35 USD                                         0 
 Expenses:Taxes:Y2013           ||                                        0             17500.00 IRAUSD, 51477.20 USD                                859.09 USD 
 Expenses:Taxes:Y2014           ||                                        0                                         0             17500.00 IRAUSD, 41836.20 USD 
 Expenses:Taxes:Y2012           ||            17000.00 IRAUSD, 51477.20 USD                                917.43 USD                                         0 
--------------------------------++------------------------------------------------------------------------------------------------------------------------------
                                ||            17000.00 IRAUSD, 92663.60 USD             17500.00 IRAUSD, 93587.99 USD             17500.00 IRAUSD, 74660.11 USD 
================================++==============================================================================================================================
 Net:                           ||               36468.60 USD, 120.12 VACHR                35908.63 USD, 120.12 VACHR                 31782.51 USD, 97.02 VACHR 
```

Yearly balance sheets, with commodities converted to their year-end
value in USD where possible:

```cli
$ hledger -f examples/bcexample.journal bs -Y -V --infer-value
Balance Sheet 2012-12-31..2014-12-31, valued at period ends

                            ||                 2012-12-31                  2013-12-31                   2014-12-31 
============================++=====================================================================================
 Assets                     ||                                                                                     
----------------------------++-------------------------------------------------------------------------------------
 Assets:US:BofA:Checking    ||                7448.62 USD                 7247.12 USD                   596.05 USD 
 Assets:US:ETrade:Cash      ||                 337.18 USD                  239.06 USD                  5120.50 USD 
 Assets:US:ETrade:GLD       ||                          0                 6213.90 USD                  6592.60 USD 
 Assets:US:ETrade:ITOT      ||                1364.90 USD                 4021.92 USD                  2648.26 USD 
 Assets:US:ETrade:VEA       ||                1411.56 USD                 2414.28 USD                  4290.84 USD 
 Assets:US:ETrade:VHT       ||                4695.80 USD                 5456.00 USD                 14782.32 USD 
 Assets:US:Hoogle:Vacation  ||               120.12 VACHR                240.24 VACHR                 337.26 VACHR 
 Assets:US:Vanguard:Cash    ||                  -0.04 USD                           0                    -0.02 USD 
 Assets:US:Vanguard:RGAGX   ||               15595.79 USD                28532.66 USD                 41391.57 USD 
 Assets:US:Vanguard:VBMPX   ||               10037.03 USD                22449.53 USD                 33769.05 USD 
----------------------------++-------------------------------------------------------------------------------------
                            || 40890.84 USD, 120.12 VACHR  76574.46 USD, 240.24 VACHR  109191.17 USD, 337.26 VACHR 
============================++=====================================================================================
 Liabilities                ||                                                                                     
----------------------------++-------------------------------------------------------------------------------------
 Liabilities:US:Chase:Slate ||                1366.52 USD                 1906.01 USD                  2891.85 USD 
----------------------------++-------------------------------------------------------------------------------------
                            ||                1366.52 USD                 1906.01 USD                  2891.85 USD 
============================++=====================================================================================
 Net:                       || 39524.32 USD, 120.12 VACHR  74668.45 USD, 240.24 VACHR  106299.32 USD, 337.26 VACHR 
```

The same reports as HTML:

```cli
$ hledger -f examples/bcexample.journal is -Y -3 -S -o is.html
$ hledger -f examples/bcexample.journal bs -Y -V --infer-value -o bs.html
$ open is.html bs.html
```

<style>
td { padding:0 0.5em; }
td:nth-child(1) { white-space:nowrap; }
tr:nth-child(even) td { background-color:#eee; }
</style><link href="hledger.css" rel="stylesheet"><table><tr><th style="text-align:left" colspan="4"><h2>Income Statement 2012-01-01..2014-10-11</h2></th></tr><tr><th></th><th>2012</th><th>2013</th><th>2014</th></tr><tr><td colspan="4">&nbsp;</td></tr><tr><th style="text-align:left" colspan="4">Revenues</th></tr><tr><td style="text-align:left" class="account">Income:US:Federal</td><td style="text-align:right" class="amount">17000.00 IRAUSD</td><td style="text-align:right" class="amount">17500.00 IRAUSD</td><td style="text-align:right" class="amount">17500.00 IRAUSD</td></tr><tr><td style="text-align:left" class="account">Income:US:Hoogle</td><td style="text-align:right" class="amount">129132.20 USD, 120.12 VACHR</td><td style="text-align:right" class="amount">129382.20 USD, 120.12 VACHR</td><td style="text-align:right" class="amount">106183.70 USD, 97.02 VACHR</td></tr><tr><td style="text-align:left" class="account">Income:US:ETrade</td><td style="text-align:right" class="amount">0</td><td style="text-align:right" class="amount">114.42 USD</td><td style="text-align:right" class="amount">258.92 USD</td></tr><tr><th style="text-align:left">Total:</th><th style="text-align:right" class="amount coltotal">17000.00 IRAUSD, 129132.20 USD, 120.12 VACHR</th><th style="text-align:right" class="amount coltotal">17500.00 IRAUSD, 129496.62 USD, 120.12 VACHR</th><th style="text-align:right" class="amount coltotal">17500.00 IRAUSD, 106442.62 USD, 97.02 VACHR</th></tr><tr><td colspan="4">&nbsp;</td></tr><tr><th style="text-align:left" colspan="4">Expenses</th></tr><tr><td style="text-align:left" class="account">Expenses:Home:Rent</td><td style="text-align:right" class="amount">28800.00 USD</td><td style="text-align:right" class="amount">28800.00 USD</td><td style="text-align:right" class="amount">21600.00 USD</td></tr><tr><td style="text-align:left" class="account">Expenses:Food:Restaurant</td><td style="text-align:right" class="amount">4517.54 USD</td><td style="text-align:right" class="amount">4286.23 USD</td><td style="text-align:right" class="amount">4164.76 USD</td></tr><tr><td style="text-align:left" class="account">Expenses:Food:Groceries</td><td style="text-align:right" class="amount">2188.90 USD</td><td style="text-align:right" class="amount">2222.97 USD</td><td style="text-align:right" class="amount">1602.51 USD</td></tr><tr><td style="text-align:left" class="account">Expenses:Transport:Tram</td><td style="text-align:right" class="amount">1320.00 USD</td><td style="text-align:right" class="amount">1320.00 USD</td><td style="text-align:right" class="amount">1080.00 USD</td></tr><tr><td style="text-align:left" class="account">Expenses:Health:Vision</td><td style="text-align:right" class="amount">1099.80 USD</td><td style="text-align:right" class="amount">1099.80 USD</td><td style="text-align:right" class="amount">888.30 USD</td></tr><tr><td style="text-align:left" class="account">Expenses:Home:Internet</td><td style="text-align:right" class="amount">960.48 USD</td><td style="text-align:right" class="amount">959.82 USD</td><td style="text-align:right" class="amount">720.50 USD</td></tr><tr><td style="text-align:left" class="account">Expenses:Home:Electricity</td><td style="text-align:right" class="amount">780.00 USD</td><td style="text-align:right" class="amount">780.00 USD</td><td style="text-align:right" class="amount">585.00 USD</td></tr><tr><td style="text-align:left" class="account">Expenses:Health:Medical</td><td style="text-align:right" class="amount">711.88 USD</td><td style="text-align:right" class="amount">711.88 USD</td><td style="text-align:right" class="amount">574.98 USD</td></tr><tr><td style="text-align:left" class="account">Expenses:Health:Life</td><td style="text-align:right" class="amount">632.32 USD</td><td style="text-align:right" class="amount">632.32 USD</td><td style="text-align:right" class="amount">510.72 USD</td></tr><tr><td style="text-align:left" class="account">Expenses:Financial:Commissions</td><td style="text-align:right" class="amount">35.80 USD</td><td style="text-align:right" class="amount">214.80 USD</td><td style="text-align:right" class="amount">89.50 USD</td></tr><tr><td style="text-align:left" class="account">Expenses:Health:Dental</td><td style="text-align:right" class="amount">75.40 USD</td><td style="text-align:right" class="amount">75.40 USD</td><td style="text-align:right" class="amount">60.90 USD</td></tr><tr><td style="text-align:left" class="account">Expenses:Financial:Fees</td><td style="text-align:right" class="amount">48.00 USD</td><td style="text-align:right" class="amount">48.00 USD</td><td style="text-align:right" class="amount">40.00 USD</td></tr><tr><td style="text-align:left" class="account">Expenses:Food:Coffee</td><td style="text-align:right" class="amount">16.28 USD</td><td style="text-align:right" class="amount">19.79 USD</td><td style="text-align:right" class="amount">47.65 USD</td></tr><tr><td style="text-align:left" class="account">Expenses:Food:Alcohol</td><td style="text-align:right" class="amount">0</td><td style="text-align:right" class="amount">22.35 USD</td><td style="text-align:right" class="amount">0</td></tr><tr><td style="text-align:left" class="account">Expenses:Taxes:Y2013</td><td style="text-align:right" class="amount">0</td><td style="text-align:right" class="amount">17500.00 IRAUSD, 51477.20 USD</td><td style="text-align:right" class="amount">859.09 USD</td></tr><tr><td style="text-align:left" class="account">Expenses:Taxes:Y2014</td><td style="text-align:right" class="amount">0</td><td style="text-align:right" class="amount">0</td><td style="text-align:right" class="amount">17500.00 IRAUSD, 41836.20 USD</td></tr><tr><td style="text-align:left" class="account">Expenses:Taxes:Y2012</td><td style="text-align:right" class="amount">17000.00 IRAUSD, 51477.20 USD</td><td style="text-align:right" class="amount">917.43 USD</td><td style="text-align:right" class="amount">0</td></tr><tr><th style="text-align:left">Total:</th><th style="text-align:right" class="amount coltotal">17000.00 IRAUSD, 92663.60 USD</th><th style="text-align:right" class="amount coltotal">17500.00 IRAUSD, 93587.99 USD</th><th style="text-align:right" class="amount coltotal">17500.00 IRAUSD, 74660.11 USD</th></tr><tr><td colspan="4">&nbsp;</td></tr><tr><th style="text-align:left" class>Net:</th><th style="text-align:right" class="amount coltotal">36468.60 USD, 120.12 VACHR</th><th style="text-align:right" class="amount coltotal">35908.63 USD, 120.12 VACHR</th><th style="text-align:right" class="amount coltotal">31782.51 USD, 97.02 VACHR</th></tr></table>

<br>
<br>

<style>
td { padding:0 0.5em; }
td:nth-child(1) { white-space:nowrap; }
tr:nth-child(even) td { background-color:#eee; }
</style><link href="hledger.css" rel="stylesheet"><table><tr><th style="text-align:left" colspan="4"><h2>Balance Sheet 2012-12-31..2014-12-31, valued at period ends</h2></th></tr><tr><th></th><th>2012</th><th>2013</th><th>2014</th></tr><tr><td colspan="4">&nbsp;</td></tr><tr><th style="text-align:left" colspan="4">Assets</th></tr><tr><td style="text-align:left" class="account">Assets:US:BofA:Checking</td><td style="text-align:right" class="amount">7448.62 USD</td><td style="text-align:right" class="amount">7247.12 USD</td><td style="text-align:right" class="amount">596.05 USD</td></tr><tr><td style="text-align:left" class="account">Assets:US:ETrade:Cash</td><td style="text-align:right" class="amount">337.18 USD</td><td style="text-align:right" class="amount">239.06 USD</td><td style="text-align:right" class="amount">5120.50 USD</td></tr><tr><td style="text-align:left" class="account">Assets:US:ETrade:GLD</td><td style="text-align:right" class="amount">0</td><td style="text-align:right" class="amount">6213.90 USD</td><td style="text-align:right" class="amount">6592.60 USD</td></tr><tr><td style="text-align:left" class="account">Assets:US:ETrade:ITOT</td><td style="text-align:right" class="amount">1364.90 USD</td><td style="text-align:right" class="amount">4021.92 USD</td><td style="text-align:right" class="amount">2648.26 USD</td></tr><tr><td style="text-align:left" class="account">Assets:US:ETrade:VEA</td><td style="text-align:right" class="amount">1411.56 USD</td><td style="text-align:right" class="amount">2414.28 USD</td><td style="text-align:right" class="amount">4290.84 USD</td></tr><tr><td style="text-align:left" class="account">Assets:US:ETrade:VHT</td><td style="text-align:right" class="amount">4695.80 USD</td><td style="text-align:right" class="amount">5456.00 USD</td><td style="text-align:right" class="amount">14782.32 USD</td></tr><tr><td style="text-align:left" class="account">Assets:US:Hoogle:Vacation</td><td style="text-align:right" class="amount">120.12 VACHR</td><td style="text-align:right" class="amount">240.24 VACHR</td><td style="text-align:right" class="amount">337.26 VACHR</td></tr><tr><td style="text-align:left" class="account">Assets:US:Vanguard:Cash</td><td style="text-align:right" class="amount">-0.04 USD</td><td style="text-align:right" class="amount">0</td><td style="text-align:right" class="amount">-0.02 USD</td></tr><tr><td style="text-align:left" class="account">Assets:US:Vanguard:RGAGX</td><td style="text-align:right" class="amount">15595.79 USD</td><td style="text-align:right" class="amount">28532.66 USD</td><td style="text-align:right" class="amount">41391.57 USD</td></tr><tr><td style="text-align:left" class="account">Assets:US:Vanguard:VBMPX</td><td style="text-align:right" class="amount">10037.03 USD</td><td style="text-align:right" class="amount">22449.53 USD</td><td style="text-align:right" class="amount">33769.05 USD</td></tr><tr><th style="text-align:left">Total:</th><th style="text-align:right" class="amount coltotal">40890.84 USD, 120.12 VACHR</th><th style="text-align:right" class="amount coltotal">76574.46 USD, 240.24 VACHR</th><th style="text-align:right" class="amount coltotal">109191.17 USD, 337.26 VACHR</th></tr><tr><td colspan="4">&nbsp;</td></tr><tr><th style="text-align:left" colspan="4">Liabilities</th></tr><tr><td style="text-align:left" class="account">Liabilities:US:Chase:Slate</td><td style="text-align:right" class="amount">1366.52 USD</td><td style="text-align:right" class="amount">1906.01 USD</td><td style="text-align:right" class="amount">2891.85 USD</td></tr><tr><th style="text-align:left">Total:</th><th style="text-align:right" class="amount coltotal">1366.52 USD</th><th style="text-align:right" class="amount coltotal">1906.01 USD</th><th style="text-align:right" class="amount coltotal">2891.85 USD</th></tr><tr><td colspan="4">&nbsp;</td></tr><tr><th style="text-align:left" class>Net:</th><th style="text-align:right" class="amount coltotal">39524.32 USD, 120.12 VACHR</th><th style="text-align:right" class="amount coltotal">74668.45 USD, 240.24 VACHR</th><th style="text-align:right" class="amount coltotal">106299.32 USD, 337.26 VACHR</th></tr></table>
