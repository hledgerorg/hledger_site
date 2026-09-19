# Account types

In accounting there are some important [types of accounts](https://en.wikipedia.org/wiki/Chart_of_accounts#Types_of_accounts).
Essentially, these are:

|                 |                                          |
|-----------------|------------------------------------------|
| **Assets**      | things you own                           |
| **Liabilities** | things you owe                           |
| **Equity**      | owners' investment and some other things |

And also:

|              |                                   |
|--------------|-----------------------------------|
| **Revenues** | inflows  (also known as `Income`) |
| **Expenses** | outflows                          |

Revenues and Expenses are actually part of Equity, but usually reported separately.

Certain hledger reports make use of these account types.
They include `balancesheet`, `incomestatement` and `cashflow`.

If you have been using the english account names shown here,
the account types will be detected automatically, and those reports will show the correct accounts.

But this is only a convenience, and currently limited to the english account names.
If you named your accounts differently, eg in another language, their types won't be identified automatically.

So there's a more robust way: declare your top level account types.
(Subaccounts will inherit the type of their parent.)

To do this, add some `account` directives to the journal, eg at the top,
each with a `type:` tag giving one of hledger's type names or their one-letter abbreviations:

| hledger name | short name | description                                      |
|--------------|------------|--------------------------------------------------|
| `Asset`      | `A`        | things you own                                   |
| `Cash`       | `C`        | liquid assets (part of Assets)                   |
| `Liability`  | `L`        | things you owe                                   |
| `Equity`     | `E`        | owners' investment and some other things         |
| `Revenue`    | `R`        | inflows (also known as `Income`; part of Equity) |
| `Expense`    | `X`        | outflows (part of Equity)                        |
| `Conversion` | `V`        | currency conversions (part of Equity)            |

Here is a typical set of declarations:

```journal
account assets                     ; type:A
account assets:bank                ; type:C
account assets:cash                ; type:C
account liabilities                ; type:L
account equity                     ; type:E
account equity:conversion          ; type:V
account income                     ; type:R
account expenses                   ; type:X
```

This is recommended even if you use the english account names, as it brings other benefits,
such as customising the [account display order](_account-display-order.md).

You can list accounts and their types with `hledger accounts --types`.
For the full rules, see [hledger manual > Account types](hledger.md#account-types).

## Accounting equation

These accounts combine in an interesting [equation](https://en.wikipedia.org/wiki/Accounting_equation),
which most hledger users don't need to care about.
See [Balancing the accounting equation](balancing-the-accounting-equation.md) if you're curious.

<br>

(Part of [hledger by example](hbe.md).)
