# Start tracking lots

hledger 2 can track and check your investment lots.
hledger then works out each lot's cost basis, and picks the lots to sell using your chosen method (FIFO, LIFO, ...),
calculates realised gains (and checks any you have written),
reports holdings with unrealised and realised gains,
and catches mistakes such as selling more than you hold.
Compared to tracking lots by hand with subaccounts, this is much less work once set up, and more reliable.

This page has practical advice for turning on lot tracking in an existing journal.
(If you're moving from hledger 1, see also [Upgrading to hledger 2](upgrading.md).)

## Getting started

Usually you start by adding a `lots` tag to each investment commodity's declaration:
```journal
commodity AAPL  ; lots:
```
Then purchases of that commodity create lots, and sales take from them.
[Lots and capital gains](/1.99.6/hledger.html#lots-and-capital-gains) in the manual explains how to write lot entries.

## If you have a long investment history

If you haven't tracked lots before, be aware that recording that full history as lots can be a big job.
In lot accounting, later entries tend to depend on all previous entries;
so every purchase, sale, transfer, split and fee must have the right date, quantity and cost,
or hledger will report lot errors.
(If you have been tracking lots by hand, your entries already have most of the details needed;
see [below](#if-youve-been-tracking-investments-in-hledger-1).)
But fear not! Here are some ways to divide and conquer:

- **Draft in a separate file.** Copy your investment entries into a new file, eg `investments.journal`,
  add the `lots` tag there, and work on it with `hledger -f investments.journal check`
  and `hledger -f investments.journal holdings --lots`, while your main journal keeps working as before.
  When it's right, replace the original entries with the new ones (or with an [include](/1.99.6/hledger.html#include-directive)).
- **Start from a recent date.** Rather than reconstructing your whole history,
  start at the beginning of this year, with an opening entry that acquires the lots you held then,
  with their original acquisition dates and costs (your broker's cost basis records can provide these):
  ```journal
  2026-01-01 opening lots
      assets:stocks      10 AAPL {2024-03-15, $50}
      assets:stocks       5 AAPL {2025-06-02, $62}
      equity:opening/closing balances
  ```
  If you keep a file per year, these replace the stock postings in this year's opening balances entry.
  If you keep everything in one file, there's no such entry to replace,
  so either draft the full history, or first split off this year's entries with [close](/1.99.6/hledger.html#close).
- **Do one commodity or account at a time.** Add the `lots` tag to one commodity,
  and get it checking cleanly before moving to the next.
  Accounts where cost basis doesn't matter, like tax-sheltered retirement accounts,
  can be left out with a `lots: NONE` tag on the account declaration.
- **Compare with your broker.** `hledger holdings --lots` shows the lots hledger has worked out;
  check them against your broker's records, and add balance assertions to catch drift.
  Their figures may be rounded differently in different places;
  see [Reconciling](/1.99.6/hledger.html#reconciling) for tips.
- **Troubleshoot.** See [Troubleshooting lots](/1.99.6/hledger.html#troubleshooting-lots) in the manual.
  `hledger print -a` is the most useful tool, showing how hledger has read each entry.
- **Keep other reports working.** While lot records are incomplete, you can skip lot processing with `--ignore-lots`.

## If you've been tracking investments in hledger 1

Your hledger 1 investment entries can keep working the same way in hledger 2.
But once you turn on hledger 2's lot tracking for that commodity, something changes: the meaning of `@` in a sale.
In hledger 1, investment sales record the original cost with `@`:
```journal
2026-02-01 sell
    assets:stocks     -5 AAPL @ $50   ; bought at $50
    assets:cash      $350
    revenues:gain   $-100
```
In hledger 2's lot tracking, `@` records the selling price instead,
and the gain amount is not part of transaction balancing.
So the entry should be:
```journal
2026-02-01 sell
    assets:stocks     -5 AAPL @ $70   ; sold at $70
    assets:cash      $350
    revenues:gain   $-100
```
You can leave the gain posting, and hledger will check it.
Or you can remove it and let hledger infer it
(which keeps the entry readable by hledger 1).

If you have been [tracking lots with hledger 1](investments.md) using subaccounts,
like `assets:cc:ada:20200201`, converting to hledger 2's lot tracking
means less maintenance and more validation:

1. Add the `lots` tag to the commodity declaration.

2. Post purchases to the parent account.\
   hledger 1:
   ```journal
     assets:cc:ada:20230201    1000 ADA @ $0.40
   ```
   hledger 2:
   ```journal
     assets:cc:ada             1000 ADA @ $0.40
   ```

3. Post sales to the parent account,
   with a {} annotation to select the correct lot (or let it be selected automatically),
   and write the selling price, as above.\
   hledger 1:
   ```journal
     assets:cc:ada:20230201   -1000 ADA @ $0.40
   ```
   hledger 2:
   ```journal
     assets:cc:ada            -1000 ADA {2023-02-01} @ $0.20
   ```
   or:
   ```journal
     assets:cc:ada            -1000 ADA @ $0.20
   ```

4. If you have balance assertions on lot subaccounts, move them to the parent account, or drop them.

## Keeping lot entries readable by hledger 1

If you need to [keep your files working with hledger 1](upgrading.md#staying-compatible-with-hledger-1)
(or hledger 1-based addons) for a while, here is how hledger 1 reads hledger 2's lot entries:

- **Lot subaccounts.**
  hledger 2 requires account names ending in `{...}` to be valid lot subaccount names; generally, avoid these account names in hledger 1.
  hledger 2's `print --lots` output, and start-of-year opening balances entries, include names like `assets:stocks:{2026-01-01, $50}`;
  hledger 1 will read these as ordinary subaccounts.

- **Simple cost basis annotations.**
  hledger 1 reads `{$50}` and ignores it, so `10 AAA {$50}` is just `10 AAA` to it.
  For a balanced transaction you may need to write the transacted cost too, with the same amount: `10 AAA {$50} @ $50`.

- **Dated/labelled cost basis annotations.**
  hledger 1 can't read hledger 2's dated annotations like `{2024-03-15, $50}` or labelled annotations like `{"note", $50}`.
  But both versions read Ledger-style annotations like `[2024-03-15] {$50}` or `(note) {$50}`; hledger 2 respects them, and hledger 1 ignores them.
  So use that form in files shared with hledger 1.

- **Inferred cost basis annotations.**
  hledger 2's `print` shows amounts with their inferred cost basis annotations, including dates and/or labels (see above).
  This can be avoided by using `--ignore-lots`.

- **Selling price.**
  With the selling price written in lot disposals, as hledger 2 requires (`-5 AAA {$50} @ $70`),
  hledger 1 will reduce the holding's cost by the sale proceeds rather than the cost basis,
  so its cost reports (`-B`) will differ from hledger 2's.

- **Gain postings.**
  With the selling price written, an explicit gain posting with an amount makes the transaction unbalanced for hledger 1.
  So omit either the gain posting or its amount (hledger 2 will infer these; hledger 1 will infer a zero amount).
  Also, hledger 2's `print` normally shows inferred gain postings; `--ignore-lots` avoids this.
