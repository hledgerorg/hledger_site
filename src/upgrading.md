# Upgrading to hledger 2

hledger 2 (the 1.99.x previews, and 2.0 when released) is a major update,
whose biggest new feature is [lot tracking and capital gains reporting](/dev/hledger.html#lots-and-capital-gains).
It reads hledger 1 data, and most hledger 1 users can switch to it with no changes.
This page helps you check that, and fix anything that needs it.
It covers the changes since hledger 1.52 that can affect existing setups;
the [release notes](relnotes.md) list all changes.

hledger 1 (1.52.x) continues to receive occasional fixes,
and both versions can be installed side by side.

## Upgrade steps

1. Install hledger 2 (see [Install](install.md)),
   keeping hledger 1 available under another name, eg by renaming its executable to `hledger1`.

   Both versions read the same config file. If you later use hledger 2 config file features,
   such as multi-line [command aliases](/dev/hledger.html#command-aliases),
   hledger 1 will refuse to run, even for `--version`
   (see [Config files](/dev/hledger.html#config-files) for the details).
   Run it as `hledger1 -n` then, or give it its own config file with `--conf`.
   And if hledger reports an unexpected config file error, check that an old hledger isn't running instead (eg one found earlier in your PATH).

2. Make sure your data files are backed up, or committed to version control.

3. Check your data with hledger 2:
   ```cli
   $ hledger check
   ```
   (Add any extra checks you normally use, eg `hledger check -s`.)

4. If you import CSV files, run your usual import command with `--dry-run` added,
   which shows what would be imported without changing anything. Eg:
   ```cli
   $ hledger import --dry-run *.rules
   ```

5. Compare your usual reports with hledger 1's. Eg:
   ```cli
   $ diff <(hledger1 accounts) <(hledger accounts)
   $ diff <(hledger1 bs) <(hledger bs)
   $ diff <(hledger1 is) <(hledger is)
   ```
   (This works in bash or zsh. Elsewhere, save each report to a file and compare the files.)

6. Fix anything found, using the sections below.
   And update any scripts or config which use [changed commands](#changes-in-commands-and-their-output).

## Errors you might see

These are errors in hledger 2, but weren't in hledger 1. You probably won't see these.

**Decimal marks.**
When a `decimal-mark` directive (or CSV rule) is in effect,
a number that's clearly using the other decimal mark (eg `1,000.00` when `decimal-mark ,` is declared),
or using the declared mark more than once (eg `1,2,34`),
is now an error. Fix the number, or the directive.

**CSV rules comments.**
In CSV rules files, a line beginning with `*` is no longer a comment, and is reported as an error.
Use `#` or `;` to begin comment lines.

**Lot errors.**
hledger 1 accepted cost basis annotations like `{$50}` but ignored them.
hledger 2 uses them to track lots, and checks them:

- *"This acquire posting's cost basis ($50) differs from its transacted cost ($55)"*:
  in a purchase like `10 AAPL {$50} @ $55`, the two costs must agree.
  If the difference is real (eg a gift with a carried-over cost basis),
  record it in another posting, as in this [gift example](investments.md#gift-received).

- *"no ... lots available for disposal"*:
  a sale (a negative amount with a `{...}` annotation) takes from a lot that the journal never acquires,
  often because the journal starts partway through your investment history.
  Add the missing purchases, or an opening entry which acquires the lots, giving each lot's original date and cost:
  ```journal
  2026-01-01 opening lots
      assets:stocks      10 AAPL {2024-03-15, $50}
      equity:opening/closing balances
  ```
  (A dated annotation like this needs hledger 2; hledger 1 can't read it.)

- *"This multi-commodity transaction is unbalanced"*,
  on a sale with a cost basis annotation and a gain posting, where `@` is the original cost (a common hledger 1 style),
  like `-5 AAPL {$50} @ $50` with `revenues:gain  $-100`:
  hledger 2 reads `@` as the selling price. Write the selling price instead: `-5 AAPL {$50} @ $70`.

- *"A final account name part enclosed in { } must be a valid lot subaccount name."*
  Account names ending in `:{...}` are reserved for [lot subaccounts](/dev/hledger.html#lot-subaccounts),
  and are rejected unless the braces contain a valid lot name.
  Rename such accounts.

If you don't want to deal with these now, you can run hledger with `--ignore-lots` or `-I`.
This skips lot processing, giving results close to hledger 1's. (`-I` also skips balance assertions.)
For more help with lot errors, see [Start tracking lots](start-tracking-lots.md).

**Balance assertions and account checks.**
A balance assertion or account check that fails only in hledger 2 may be caused by one of the
[changes in how your files are read](#changes-in-how-your-files-are-read) below, such as aliases with `apply account`.

## Changes in how your files are read

These change how your journal, CSV rules or config files are interpreted.
Comparing reports from both versions, as in the upgrade steps above, will show their effects, if any.

- **Config file default command.**
  A config file can no longer choose the command to run.
  A bare word at the top of its general section, which hledger 1 used as the default command,
  is now read as a query argument, which quietly filters every report.
  Remove it, and give the command on the command line.

- **Inferred gains.**
  If your journal has sales with cost basis annotations but no gain posting, like `-5 AAPL {$50} @ $70`,
  hledger 2 infers the realised gain and posts it to a gain account (`revenues:gain` by default).
  This will appear on your income statement, which is usually what you want; `-I` gives hledger 1's results.

- **Aliases and `apply account`.**
  When `alias` directives and `apply account` affect the same entries,
  the aliases now apply first, to account names as written, and the parent account is added afterward (as in Ledger).
  hledger 1 did it the other way round.
  So aliases written with the parent account (`alias business:checking = ...`) no longer match,
  and aliases written without it (`alias checking = ...`) now do.
  This can make balance assertions or account checks fail.
  Update the aliases if you need to. (`--alias` options are unaffected; they still apply last.)

- **Repeated CSV settings.**
  When a CSV setting like `date-format` or `separator` is written more than once,
  the last one now wins.
  If you wrote one before an `include` to override the included file's, move it after the `include`.

- **CSV data directory.**
  The `source` rule now looks for bare file names and relative paths in a `data/` directory next to the main journal,
  then in `~/Downloads`. (Paths beginning with `./` or `../` are still relative to the rules file.)
  The `archive` rule now saves files in `data/archive/` there,
  instead of in a `data/` directory next to the rules file.

## Changes in commands and their output

These affect how you run hledger and what it shows.
If your scripts, aliases or config files depend on these, update them:

- `--tldr` is now `--examples`.
- `stats -1` is now `stats --oneline`.
- `--verbose-tags` is now an option of `print` and `rewrite` only.
- The `demo` and `commands` commands have been removed.
  (`hledger help commands` lists the commands.)

- **print layout.**
  `print` now aligns amounts by their decimal mark. `--layout=hledger1` gives the old layout.

- **Decimal places.**
  Amounts which hledger infers no longer affect a commodity's display precision,
  so some reports show fewer decimal places.

- **any: and all: queries.**
  These now also work in posting reports like `register` and `balance`, not just in `print`.

- **accounts and payees.**
  Query terms which only match transactions, like `date:` or `desc:`, now exclude declared accounts or payees which aren't used.
  And `payees payee:REGEX` now matches declared payees.

- **commodities --used.**
  This now shows only commodities used in transactions; `--priced` shows those used in P directives.

- hledger-ui now watches your files and reloads automatically by default.
  `--no-watch` turns this off.
- hledger-web, when listening on a non-local address (set with `--host`), is now read-only by default.
  Add `--allow=edit` to allow editing.
- hledger-web now shows its pages in your browser's preferred language, if a translation is available
  (currently Chinese, German and Spanish). `--lang en` keeps it in English.

## What's new

Some of the most useful new features in hledger 2:

- **Speed**: hledger 2 is [2-3x faster](PERFORMANCE.md) than hledger 1.52, and uses up to a third less memory.
- **Localisation**: report headings and hledger-ui/hledger-web's UI can be shown in other [languages](/dev/hledger.html#languages), with `--lang`
  (currently en, es, de, zh).
- **Lot tracking and capital gains**: a commodity can track each purchase's cost basis and calculate gains when you sell,
  with several [cost basis methods](/dev/hledger.html#cost-basis-methods) (FIFO, LIFO, HIFO, AVERAGE, ..),
  and the new [holdings](/dev/hledger.html#holdings) report shows your investments and their performance.
- **Custom commands**: define custom [command aliases](/dev/hledger.html#command-aliases) and scripts in your config file
- **Simpler importing**: the new [get](/dev/hledger.html#get) command fetches new transactions and market prices,
  and with a conventional `data/`, `rules/`, `prices/` layout, `hledger import` needs no arguments
  (see [Finding the data](/dev/hledger.html#finding-the-data)).
- **CSV rules**: [merge](/dev/hledger.html#merge) combines several CSV records into one transaction,
  [functions](/dev/hledger.html#functions) transform field values,
  and CSV or rules files can be included in a journal.
- **Commodity aliases**: [commodity aliases](/dev/hledger.html#commodity-aliases) help unify a commodity's symbols/units
- **Find anywhere**: [`::TEXT`](/dev/hledger.html#find-query) matches text in any field, as you'd see it in `print` output.
- **Compact transactions list**: the new [transactions](/dev/hledger.html#transactions) (tx) command lists transactions one per line.
- **hledger-ui** updates automatically when your files change, by default.
- **hledger-web** gains balance reports, paging and a dark mode.

For all changes, see the [release notes](relnotes.md).

## Turning on lot tracking

Once your data works with hledger 2, you can (if you want) let it track and check your investment lots.
[Start tracking lots](start-tracking-lots.md) explains why and how, with advice for long investment histories.
Usually you start by adding a `lots` tag to each investment commodity's declaration:
```journal
commodity AAPL  ; lots:
```
With hledger 1 data, there are two more things to know.

### Sales recorded at original cost

In hledger 1 a sale is often recorded at its original cost, using `@`:
```journal
2026-02-01 sell
    assets:stocks     -5 AAPL @ $50   ; bought at $50
    assets:cash      $350
    revenues:gain   $-100
```
In hledger 2 with lot tracking enabled, `@` records the selling price instead, and the gain amount is not part of transaction balancing.
So the entry should be:
```journal
2026-02-01 sell
    assets:stocks     -5 AAPL @ $70   ; sold at $70
    assets:cash      $350
    revenues:gain   $-100
```
You can leave the gain posting, and hledger will check it; or remove it, and it will be inferred.

### If you've been tracking lots by hand

If you have been tracking lots in hledger 1 with subaccounts, as [Tracking lots with hledger 1](investments.md) suggested
(eg `assets:cc:ada:20200201`), those entries keep working in hledger 2 unchanged.
If you want to convert them to hledger 2's lot tracking:

- Add the `lots` tag to the commodity, as above.
- Post purchases to the parent account (remove the `:20200201` subaccount).
- In sales, post to the parent account, select the lot by its date,
  and write the selling price instead of the original cost, as above.
  Eg `assets:cc:ada:20200201  -1000 ADA @ $0.03` becomes `assets:cc:ada  -1000 ADA {2020-02-01} @ $0.04`.
- If you have balance assertions on lot subaccounts, move them to the parent account, or drop them.

## Switching back, or using both

hledger 1 can read most journals written for hledger 2.
To switch back, or to keep the same files working in both versions, watch out for these:

- **Cost basis annotations.** hledger 1 ignores them: `10 AAA {$50}` means just `10 AAA`.
  So write the transacted cost too, with the same amount: `10 AAA {$50} @ $50`.
- **Gain postings.** hledger 1 doesn't infer them, and balances a sale differently, as shown above.
  So leave out the gain posting, or its amount; hledger 2 will infer it, and hledger 1 will record no gain.
- **New syntax.** hledger 1 can't read dated annotations like `{2024-03-15, $50}`,
  `type: U` account declarations, or new CSV rules like `merge`. Avoid these.
- **Lot subaccounts.** hledger 2's `print --lots` output includes names like `assets:stocks:{2026-01-01, $50}`,
  which hledger 1 reads as ordinary subaccounts. Generally, avoid account names ending in `{...}`.
- **The `lots` tag** is an ordinary tag in hledger 1, and has no effect.

After changes, check your files with both versions, eg `hledger check` and `hledger1 check`.
