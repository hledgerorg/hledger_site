# Foreign trip expenses

Last updated: 2019

From https://www.reddit.com/r/plaintextaccounting/comments/9r9cfj/beancount_price_and_cost :

> 1. Before going to vacation to Europe, I borrowed 350 EUR, cash.
> 2. I also took out of ATM 200 EUR, cash - now I know the price.
> 3. I spent 500 EUR in trip, and I have 50 left.
> 4. Now, after the trip, I exchanged some of my home currency to 300 EUR to give it back - and it's the different price from step two.
> So how do I write all this down?

My attempt follows. Notes:
- When transactions occur on such trips, I sometimes know the USD amount spent, and sometimes the EUR amount. I sometimes know the total converted amount, and sometimes the conversion rate. I record whichever of these is more convenient.
- After the trip, when reviewing expenses, I'll add a P market price directive covering the period of the trip, and use -V to see all expenses in home currency (USD).


```hledger
; a hledger example based on colindean's
; hledger doesn't currently support the {} syntax, just @ or @@

2018-10-25 * vacation loan
    Liabilities:Loans:Vacation
    Assets:Cash                             350 EUR

2018-10-26 * ATM withdrawal
    Assets:Cash                             200 EUR @@ 220 USD  ; conversion price written out for clarity; redundant due to -225 USD below
    Expenses:Fees:CurrencyConversion          5 USD
    Assets:Bank                            -225 USD

2018-10-27 * food
    Assets:Cash                            -190 EUR
    Expenses:Vacation:Food

2018-10-27 * hotel
    Assets:Cash                            -310 EUR = 50 EUR    ; assert that Cash's EUR balance is now 50
    Expenses:Vacation:Hotel

2018-10-28 * withdraw more euros to repay loan
    Assets:Cash                             300 EUR @@ 360 USD  ; conversion rate has gone up to 1.20
    Expenses:Fees:CurrencyConversion          5 USD
    Assets:Bank                            -365 USD

2018-10-28 * repay vacation loan
    Liabilities:Loans:Vacation              350 EUR = 0 EUR     ; assert that euro loan is repaid
    Assets:Cash

; Conversion rate to use in reports for the trip period.
; You could declare each time it changed, eg:
; P 2018-10-25 EUR 1.10 USD
; P 2018-10-28 EUR 1.20 USD
; but hledger currently picks just one,
; and for expense reporting a rough average price is usually fine:
P 2018-10-25  EUR  1.15 USD
```
Here are a few different reports, for comparison:

Simple balance change report for all accounts. --flat and -Y help ensure a readable tabular layout here.
```
$ hledger bal --flat -Y
Balance changes in 2018:

                                  ||                 2018 
==================================++======================
 Assets:Bank                      ||          -590.00 USD 
 Expenses:Fees:CurrencyConversion ||            10.00 USD 
 Expenses:Vacation:Food           ||              190 EUR 
 Expenses:Vacation:Hotel          ||              310 EUR 
----------------------------------++----------------------
                                  || 500 EUR, -580.00 USD 
```

Adding the -B/--cost flag converts transaction amounts to the other commodity in the transaction, using the conversion rate specified in the transaction if any. This typically helps collapse the grand total to one commodity, so we can see it is zero here (expected, since we're showing all accounts).
```
$ hledger bal --flat -Y -B
Balance changes in 2018:

                                  ||                 2018 
==================================++======================
 Assets:Bank                      ||          -590.00 USD 
 Assets:Cash                      || -500 EUR, 580.00 USD 
 Expenses:Fees:CurrencyConversion ||            10.00 USD 
 Expenses:Vacation:Food           ||              190 EUR 
 Expenses:Vacation:Hotel          ||              310 EUR 
----------------------------------++----------------------
                                  ||                    0 
```

Adding the -V/--value flag instead converts report amounts using the market price effective on the reporting date (hledger prices and date can help identify that). The grand total of -5 USD here corresponds to our capital loss due to change in exchange rate (the price of a euro went from $1.10 to $1.20 while we still owed some):
```
$ hledger prices 
P 2018-10-25 EUR 1.15 USD
$ date
Fri Oct 26 15:03:00 PDT 2018
$ hledger bal --flat -Y -V
Balance changes in 2018:

                                  ||        2018 
==================================++=============
 Assets:Bank                      || -590.00 USD 
 Expenses:Fees:CurrencyConversion ||   10.00 USD 
 Expenses:Vacation:Food           ||  218.50 USD 
 Expenses:Vacation:Hotel          ||  356.50 USD 
----------------------------------++-------------
                                  ||   -5.00 USD 
```

The "exp" account query is added to show just the expenses. Now we can see their total.
```
$ hledger bal --flat -Y -V exp
Balance changes in 2018:

                                  ||       2018 
==================================++============
 Expenses:Fees:CurrencyConversion ||  10.00 USD 
 Expenses:Vacation:Food           || 218.50 USD 
 Expenses:Vacation:Hotel          || 356.50 USD 
----------------------------------++------------
                                  || 585.00 USD 
```

Or you might use the is/incomestatement command which is specialised for income/expense reporting.
It's tabular and flat by default.
```
$ hledger is -V
Income Statement 2018/10/25-2018/10/28

                                  || 2018/10/25-2018/10/28 
==================================++=======================
 Revenues                         ||                       
----------------------------------++-----------------------
----------------------------------++-----------------------
                                  ||                       
==================================++=======================
 Expenses                         ||                       
----------------------------------++-----------------------
 Expenses:Fees:CurrencyConversion ||             10.00 USD 
 Expenses:Vacation:Food           ||            218.50 USD 
 Expenses:Vacation:Hotel          ||            356.50 USD 
----------------------------------++-----------------------
                                  ||            585.00 USD 
==================================++=======================
 Net:                             ||           -585.00 USD 
```
