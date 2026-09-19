# Common journal entries

Last updated: 2022

Here are entries for some common transactions.
Check other pages, or https://wiki.plaintextaccounting.org for more detailed examples.
 
## Shopping

```journal
2017/1/26 market
  expenses:food    $10
  assets:cash
```

## Invoicing, accrual basis

```journal
2018-04-16 * (2018-001) SuperCompany invoice
    Revenue:Software Development                        $ -2420.00
    Assets:Receivable:SuperCompany                       $ 2420.00

2018-04-26 * (2018-001) SuperCompany payment
    Assets:Receivable:SuperCompany                      $ -2420.00 = $0
    Assets:Checking                                      $ 2420.00
```

## Invoicing, cash basis

```journal
; Invoices aren't tracked in cash basis, use unbalanced postings to track them anyway.

2018-04-16 * (2018-001) SuperCompany invoice
    (Assets:Receivable:SuperCompany)                      $2420

2018-04-26 * (2018-001) SuperCompany payment
    (Assets:Receivable:SuperCompany)                     $-2420 = $0
    Revenue:Software Development                         $-2420
    (Liabilities:Tax:2018)                                $-420
    Assets:Checking:Estimated Tax Savings:2018             $420
    Assets:Checking                                       $2000
```

The above plus postings to track and save estimated income tax:

```journal
2018-04-26 * (2018-001) SuperCompany payment
    (Assets:Receivable:SuperCompany)                     $-2420 = $0
    Revenue:Software Development                         $-2420
    (Liabilities:Tax:US:2018)                             $-420
    Assets:Checking:Tax:US:2018                            $420
    Assets:Checking                                       $2000
```

## Tracking a mortgage

```journal
2019/01/01 Buy House
    Assets:House                                      500,000.00
    Liabilities:Mortgage

2019/02/01 Mortgage Payment
    Liabilities:Mortgage                                1,000.00
    Expenses:Interest:Real Estate                         833.33
    Assets:Cash                                         -1833.33

2019/03/01 Mortgage Payment
    Liabilities:Mortgage                                1,002.00
    Expenses:Interest:Real Estate                         831.33
    Assets:Cash                                         -1833.33

2019/03/01 Zillow Price Estimate
    Assets:House                                                 = 505,000.00  ; assign new balance, generating a transaction
    Equity:Unrealized Gains
```

