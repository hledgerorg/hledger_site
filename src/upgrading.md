# Upgrading to hledger 2

hledger 2 (the 1.99.x previews, and 2.0 when released) is a major update,
whose biggest new feature is [lot tracking and capital gains reporting](/1.99.6/hledger.html#lots-and-capital-gains).
It reads hledger 1 data, and most hledger 1 users can switch to it with no changes.
This page helps you check that, and fix anything that needs it.
It covers the changes since hledger 1.52 that can affect existing setups;
the [release notes](relnotes.md) list all changes.

hledger 1 (1.52.x) continues to receive occasional fixes,
and both versions can be installed side by side.

## What's new

Some of the most useful new features in hledger 2:

- **Speed**: hledger 2 is [2-3x faster](PERFORMANCE.md) than hledger 1.52, and uses up to a third less memory.
- **Localisation**: report headings and hledger-ui/hledger-web's UI can be viewed in many [languages](/1.99.6/hledger.html#languages),
  (more languages are welcome, see [Translating hledger](TRANSLATING.md)).
- **Lot tracking**: hledger can track each purchase's cost basis, infer and validate lot movements,
  and calculate gains/losses when you sell,
  with several [cost basis methods](/1.99.6/hledger.html#cost-basis-methods) (FIFO, LIFO, HIFO, AVERAGE, ..).
  A new [holdings](/1.99.6/hledger.html#holdings) report shows your investments' performance.
- **Charts**: reports can show [charts](charts.md), in the terminal or as SVG/HTML, with `--chart`.
- **Simpler viewing**: `--view` opens a report in an appropriate viewer.
- **Custom commands**: define custom [command aliases](/1.99.6/hledger.html#command-aliases) and scripts in your config file
- **Simpler importing**: the new [get](/1.99.6/hledger.html#get) command fetches new transactions and market prices,
  and with a conventional `data/`, `rules/`, `prices/` layout, `hledger import` needs no arguments
  (see [Finding the data](/1.99.6/hledger.html#finding-the-data)).
- **More powerful CSV rules**: [merge](/1.99.6/hledger.html#merge) combines several CSV records into one transaction,
  [functions](/1.99.6/hledger.html#functions) transform field values,
  and CSV or rules files can be included in a journal.
- **Compact transactions report**: the new [transactions](/1.99.6/hledger.html#transactions) (tx) command prints transactions as one line each.
- **Find anywhere**: [`::TEXT`](/1.99.6/hledger.html#find-query) is an easy way to match on any field.
- **Commodity aliases**: [commodity aliases](/1.99.6/hledger.html#commodity-aliases) help unify a commodity's symbols/units.
- **Amount expressions**: a posting amount can be an [arithmetic expression](/1.99.6/hledger.html#amount-expressions), like `($50.20 + $16.54) * 1.05`.
- **hledger-ui** updates automatically when your files change, by default.
- **hledger-web** now has the main hledger reports, charts, report options, keyboard shortcuts, paging and a dark mode.

For all changes, see the [release notes](relnotes.md).

## Upgrade steps

Upgrading is essentially just: install a hledger 2 binary (or build it) and keep working.

But if you prefer, here's a more careful process:

1. [Install](install.md) hledger 2,
   keeping hledger 1 available under another name, eg by renaming its executable to `hledger1`.

   Both versions read the same config file. If you later use hledger 2 config file features,
   such as multi-line [command aliases](/1.99.6/hledger.html#command-aliases),
   hledger 1 will refuse to run, even for `--version`
   (see [Config files](/1.99.6/hledger.html#config-files) for the details).
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
   And update any scripts or config which use [changed commands](#changes-in-commands-and-output).

## Errors you might see

You probably won't see these, but here are a few things that hledger 2 might complain about:

**Invalid decimal marks**\
When a `decimal-mark` directive (or CSV rule) is in effect,
a number that's clearly using the other decimal mark (eg `1,000.00` when `decimal-mark ,` is declared),
or using the declared mark more than once (eg `1,2,34`),
is now reported as an error. Fix the number, or the directive.

**CSV rules lines beginning with `*`**\
In CSV rules files, comment lines may no longer begin with `*`; use `#` or `;` instead.

**Failing balance assertions or checks**\
Some [changes in file reading](#changes-in-file-reading) (see below)
could cause balance assertions or the `accounts` check to fail.

**Invalid lot entries**\
hledger 1 ignores basic cost basis annotations, like `{$50}`.
hledger 2 interprets and validates these, and may report the lot-related errors below.
(If you don't want to deal with these now, you can run with `--ignore-lots` or `-I`.
For more help, see [Start tracking lots](start-tracking-lots.md).)

**"This acquire posting's cost basis ... differs from its transacted cost"**\
  in a purchase like `10 AAPL {$50} @ $55`, the two costs must agree.
  If the difference is real (eg a gift with a carried-over cost basis),
  record it in another posting, as in this [gift example](investments.md#gift-received).

**"no FOO lots available for disposal"**\
  a sale (a negative amount with a `{...}` annotation) takes from a lot that the journal never acquires,
  often because the journal starts partway through your investment history.
  Add the missing purchases, or an opening entry which acquires the lots, giving each lot's original date and cost:
  ```journal
  2026-01-01 opening lots
      assets:stocks      10 AAPL {2024-03-15, $50}
      equity:opening/closing balances
  ```

**"This multi-commodity transaction is unbalanced"**\
  on a sale with a cost basis annotation and a gain posting, where `@` is the original cost (hledger 1-style lot tracking).
  hledger 2 expects `@` to be the selling price;
  see [If you've been tracking investments in hledger 1](start-tracking-lots.md#if-youve-been-tracking-investments-in-hledger-1).

**"A final account name part enclosed in { } must be a valid lot subaccount name"**\
  Account names ending in `:{...}` are reserved for [lot subaccounts](/1.99.6/hledger.html#lot-subaccounts),
  and are rejected unless the braces contain a valid lot name.
  Rename such accounts.

## Changes in file reading

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

- **Repeated commodity declarations.**
  When a commodity is declared more than once, the later declaration now adds to the earlier one,
  and replaces its display style only if it gives one.
  With several `-f` files, the last file's display style is now used (hledger 1 used the first's),
  and hledger warns if they differ.

- **Repeated CSV settings.**
  When a CSV setting like `date-format` or `separator` is written more than once,
  the last one now wins.
  If you wrote one before an `include` to override the included file's, move it after the `include`.

- **CSV data directory.**
  The `source` rule now looks for bare file names and relative paths in a `data/` directory next to the main journal,
  then in `~/Downloads`. (Paths beginning with `./` or `../` are still relative to the rules file.)
  The `archive` rule now saves files in `data/archive/` there,
  instead of in a `data/` directory next to the rules file.

## Changes in commands and output

These affect how you run hledger and what it shows.
If your scripts, aliases or config files depend on these, update them:

- `--tldr` is now `--examples`.
- `stats -1` is now `stats --oneline`.
- `--verbose-tags` is now an option of `print` and `rewrite` only.
- `hledger test` (which runs the built-in unit tests) is now `hledger --test`.
- The `demo` and `commands` commands have been removed.
  (`hledger help commands` lists the commands.)

- **print layout.**
  `print` now aligns amounts by their decimal mark. `--layout=hledger1` gives the old layout.

- **Decimal places.**
  Amounts which hledger infers no longer affect a commodity's display precision,
  so some reports show fewer decimal places.

- **activity.**
  This now shows a weekly chart counting transactions.
  `activity --postings -D -0` shows daily posting counts, as hledger 1's did.

- **any: and all: queries.**
  These now also work in posting reports like `register` and `balance`, not just in `print`.

- **accounts and payees.**
  Query terms which only match transactions, like `date:` or `desc:`, now exclude declared accounts or payees which aren't used.
  And `payees payee:REGEX` now matches declared payees.

- **commodities --used.**
  This now shows only commodities used in transactions; `--priced` shows those used in P directives.

- **hledger-ui auto-reload.**
  hledger-ui now watches your files and reloads automatically by default. `--no-watch` turns this off.

- **hledger-web remote access.**
  When listening on a non-local address (set with `--host`), hledger-web is now read-only by default.
  Add `--allow=edit` to allow editing.

- **hledger-web language.**
  hledger-web now shows its pages in your browser's preferred language, if a translation is available
  (see [Languages](/1.99.6/hledger.html#languages) for the current list). `--lang en` keeps it in English.

## Lot tracking

Once your data works with hledger 2, you can (if you want) start using its lot tracking feature.
If you have been tracking investments in hledger 1, with or without [lot subaccounts](investments.md),
those entries will still work in hledger 2; but converting them to hledger 2's lot tracking
will greatly reduce manual toil and potential for mistakes.
See [Start tracking lots](start-tracking-lots.md), which explains why and how,
with advice for long investment histories and for converting hledger 1 entries.

## Staying compatible with hledger 1

If you need to keep your files working with hledger 1,
or add-ons not yet updated for hledger 2 (such as hledger-interest or hledger-iadd),
avoid hledger 2's new syntax:
- amount expressions like `$50.20 + $16.54`
- new CSV rules like `merge`
- and dated or labelled cost basis annotations like `{2024-03-15, $50}` or `{"note", $50}`.

If you are using hledger 2's lot tracking, you should also:

- leave gains implicit, by omitting gain postings or their amounts
  (hledger 2 infers them, hledger 1 infers zero)
- and use Ledger-style cost basis annotations like `[2024-03-15] {$50}` or `(note) {$50}`,
  which both versions can read (hledger 1 ignores them). Or convert to those when needed, eg:
  ```cli
  $ hledger print --ignore-lots -O ledger | hledger1 -n -f- check
  ```

After edits, check your files with both versions, eg `hledger check` and `hledger1 check`.
For more about how hledger 1 reads hledger 2's lot entries,
see [Keeping files readable by hledger 1](start-tracking-lots.md#keeping-lot-entries-readable-by-hledger-1).
