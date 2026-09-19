# Closing the year

At the end of a year (or any accounting period), you may want to start a new journal file.
This keeps each file a manageable size, keeps old transactions from slowing down or cluttering reports,
and freezes the old year's history so it can't be disturbed by later edits.
It's optional: many people keep everything in one file, or keep a file per year and
[include](hledger.md#include-directive) them all from a main file, without closing anything.

If you do close the year, hledger's [close command](hledger.md#close) generates the entries you need.

## Steps

1. **Finish the old year**: record its remaining transactions and [reconcile](reconciling.md) the main accounts,
   so the year-end balances are right.

2. **Generate closing and opening transactions** for the asset and liability accounts:
   ```cli
   $ hledger close --clopen -f 2025.journal -p 2025
   ```
   This prints two transactions: one dated 2025-12-31 that zeroes out the balances into an equity account,
   and one dated 2026-01-01 that restores them.
   Copy the closing transaction to the end of `2025.journal`,
   and the opening transaction to the start of the new `2026.journal`.
   (You can also append them with `>>`; see the close docs.)

3. **If you track lots** (investments recorded with [lot tracking](hledger.md#lot-reporting)),
   add `--lots` so the closing and opening transactions carry each lot, with its acquisition date and cost basis,
   into the new file rather than collapsing them into one balance:
   ```cli
   $ hledger close --clopen --lots -f 2025.journal -p 2025
   ```
   Without this, the new file would start with plain balances and the lot history, needed for capital gains,
   would be lost. (Only the displayed digits of each cost survive the transfer;
   see [Cost basis precision](hledger.md#cost-basis-precision).)

4. **Optionally, retain earnings**: transfer the old year's revenues and expenses into equity,
   so the new year's income statement starts from zero:
   ```cli
   $ hledger close --retain -f 2025.journal -p 2025 >> 2025.journal
   ```

5. **Point hledger at the new file**, eg by updating `LEDGER_FILE`
   (see [hledger manual > Setting LEDGER_FILE](hledger.md#setting-ledger_file)),
   and copy over any account, commodity or other declarations the new file needs.
   If using version control, remember to `git add` the new file.

## Reporting across years

Old-year reports now include the closing transaction, which zeroes the balances.
To see the year-end balances, exclude it:
```cli
$ hledger -f 2025.journal bs not:desc:'closing balances'
```

To report on several years at once, read all the files, and exclude every opening/closing transaction
except the earliest opening one. Tagging them (eg `clopen:2025`) makes this a simple query:
```cli
$ hledger bs -Y -f 2024.journal -f 2025.journal -f 2026.journal expr:'tag:clopen=2024 or not tag:clopen'
```

See [hledger manual > close](hledger.md#close) for the details and more variations,
and [examples/multi-year](https://github.com/hledgerorg/hledger/tree/main/examples/multi-year/)
for a worked multi-year setup.
