# Account display order

hledger displays accounts in alphabetic order by default.
That's not always the conventional or preferred order, so here's how to customise it:
add some `account` directives to the journal, eg at the top, in the desired order.

For example, these top-level account names would display in alphabetic order by default:

```cli
$ hledger accounts
assets
equity
expenses
income
liabilities
```

Declaring them in the conventional order:

```journal
account assets
account liabilities
account equity
account income
account expenses
```

makes hledger display them in that order:

```cli
$ hledger accounts
assets
liabilities
equity
income
expenses
```

Any undeclared accounts are displayed last, in alphabetic order.
Ordering is applied among sibling accounts at each level of the account tree,
so a declaration like `account expenses:rent` positions `rent` among the other `expenses` subaccounts.

These same directives can also declare [account types](_account-types.md),
so it's common to do both at once.
For more, see [hledger manual > Account display order](hledger.md#account-display-order).

<br>

(Part of [hledger by example](hbe.md).)
