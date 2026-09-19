# Reconciling

Reconciling means checking that the balances hledger reports agree with the real world:
the cash in your wallet, the balance your bank shows, your credit card statement.
It catches missing or mistyped transactions, and occasionally the bank's own mistakes.
It gets quick with practice and frequency: done daily or weekly it takes a few minutes;
left for months it will mean spending a lot of time hunting for discrepancies.
(See also [hledger manual > Reconciling](hledger.md#reconciling).)

## A basic workflow

1. **Pick an account and a date**, and find its real-world balance on that date:
   count your cash, or read the balance from your bank's website or statement.

2. **Compare with hledger's balance** for that account on that date.
   The balance sheet report (`bs`) shows asset and liability balances:
   ```cli
   $ hledger bs assets:checking -e 2026-02-01
   ```
   If you mark reconciled transactions as cleared (`*`), compare just those, with `-C`:
   ```cli
   $ hledger bs assets:checking -C
   ```

3. **If they differ, find the cause.** The account's register, with running balance,
   is the tool for this; compare it line by line with the bank's transaction list:
   ```cli
   $ hledger aregister assets:checking -e 2026-02-01
   ```
   Or use hledger-ui, which shows a live-updating register while you edit the journal
   (in versions before 1.99.5, use the `--watch` flag):
   ```cli
   $ hledger-ui --register assets:checking
   ```
   Usually you will find a transaction that is missing, duplicated, or has a wrong amount or date.
   This is easier if you recorded transaction dates similar to the bank's clearing dates.

4. **If you can't find the cause**, record an adjustment transaction so the balances agree,
   and move on. Eg if your wallet has $105 but hledger says $107:
   ```journal
   2026-01-16 * adjust cash
       assets:cash    $-2 = $105
       expenses:misc
   ```

5. **Record the reconciled balance** as a [balance assertion](checking-for-errors.md#balance-assertions),
   so that hledger will report an error if anything later disturbs it.
   You can add `= BALANCE` to the last posting in that account on that date,
   or add a separate assertion-only transaction:
   ```journal
   2026-01-31 checking statement balance
       assets:checking    $0 = $1234.56
   ```

6. **Optionally, mark the reconciled transactions cleared**, by adding `*` after their dates.
   Then `-C` reports show only what you have reconciled, and `-U`/`-P` show what you haven't.

7. Repeat for your other asset and liability accounts.

If your journal is under version control, this is a natural point to commit.

## Tips

- Reconcile the accounts that matter most: your main bank accounts and credit cards. Cash can be approximate.
- Balance assertions from CSV: when importing from bank CSV, the [`balance` field](hledger.md#hledger-field-names)
  in your rules can generate an assertion from the bank's running balance on every transaction,
  reconciling automatically as you import.
- `hledger check recentassertions` reports any account with balance assertions that has no assertion
  within 7 days of its latest posting. Running it regularly (eg in `hledger check -s`, or a pre-commit hook)
  nudges you to keep reconciling.
- `-I`/`--ignore-assertions` temporarily disables assertion checking, useful while reorganising old entries.
