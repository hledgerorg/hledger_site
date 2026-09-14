# hledger and Ledger
hledger was inspired by the app that pioneered plain text accounting: Ledger (<https://ledger-cli.org>).
This page describes differences between them, and a little [history](#history).

If you are a Ledger user trying to use your data with hledger, or vice-versa,
please [let me know](support.md) your experience so I can make this smoother.
[Interoperating tips](#interoperating-tips) has specific tips.

See also: 

- [Which PTA app should I choose ? (PTA FAQ)](https://plaintextaccounting.org/Getting-started-FAQ#which-pta-app-should-i-choose)
- [ledger vs hledger (reddit, 2022)](https://www.reddit.com/r/plaintextaccounting/comments/ztdk0o/ledger_vs_hledger/)
- [easy Ledger file reading (#1962)](https://github.com/hledgerorg/hledger/issues/1962)

## Differences

hledger focusses strongly on UX, reliability, and real-world practicality.
It aims to be somewhat useful to non-techies and accounting beginners, as well as experts.
It is written in Haskell, which helps with correctness and maintainability.
It tries to reimplement Ledger's best parts in more depth, with more consistency and robustness.

Compared to Ledger, hledger has

- more active maintenance and support (since 2008). There's a new release every quarter.
- a complete and accurate manual
- more built in reports, including standard financial reports 
- multi-period reports
- easier query syntax 
- better depth limiting
- a battle-tested CSV/SSV/TSV import system
- multiple officially-supported user interfaces: CLI, TUI, web, HTTP-JSON
- timedot time logging format
- fully documented future-proof declarative data formats
- a Haskell API.

Compared to hledger, Ledger has

- more speed with large files
- support for embedded code in journals (value expressions, python expressions..)
- a C++ API.

hledger can read Ledger's files, and vice versa, if you avoid using tool-specific syntax.

### Feature differences

Over time, features have propagated both ways.
These features are common to both hledger and Ledger:

- command line interface
- journal, timeclock, csv input formats
- csv conversion rules
- text, csv output formats
- multiple commodities
- costs and cost reporting
- market prices and value reporting
- virtual/unbalanced postings
- automated postings
- periodic transactions
- budget reporting
- unrealised capital gains reporting
- lot tracking and realised capital gains calculation
- report filtering with flags and query arguments
- basic output format customisation
- commands: accounts, balance, commodities, payees, prices, print, register, stats, tags

For differences, see the detailed [PTA Feature Matrix](https://plaintextaccounting.org/#feature-matrix).

The [Why hledger ?](why.md) page introduces hledger's features for new users.

### Performance differences

Ledger was traditionally faster than hledger with large files, eg above 5k transactions.
(Many people record about 1-2k transactions per year.)
Ledger's speed came partly from providing fewer guarantees, eg Ledger's balance assertions/assignments are not date-aware.

Since about 2021 the performance gap seems to me to have closed or reversed,
at least on my mac, where hledger often runs faster and in less memory than Ledger,
especially with very large files.

In 2022, hledger ~1.25 compiled natively on a macbook air m1 processed 25k transactions per second:
```cli
$ hledger --version
hledger 1.24.99.2-gba5b0e93f-20220205, mac-aarch64
$ make throughput
date: Tue Feb 8 11:03:50 HST 2022
system: Darwin slate.local 21.3.0 Darwin Kernel Version 21.3.0: Wed Jan 5 21:37:58 PST 2022; root:xnu-8019.80.24~20/RELEASE_ARM64_T8101 arm64
executable: hledger
version: hledger 1.24.99.2-gba5b0e93f-20220205, mac-aarch64
  1000 txns: Run time (throughput)    : 0.07s (15308 txns/s)
  2000 txns: Run time (throughput)    : 0.09s (21121 txns/s)
  3000 txns: Run time (throughput)    : 0.13s (23648 txns/s)
  4000 txns: Run time (throughput)    : 0.17s (23226 txns/s)
  5000 txns: Run time (throughput)    : 0.21s (23647 txns/s)
  6000 txns: Run time (throughput)    : 0.24s (24784 txns/s)
  7000 txns: Run time (throughput)    : 0.29s (24166 txns/s)
  8000 txns: Run time (throughput)    : 0.33s (24450 txns/s)
  9000 txns: Run time (throughput)    : 0.35s (25516 txns/s)
 10000 txns: Run time (throughput)    : 0.41s (24226 txns/s)
100000 txns: Run time (throughput)    : 4.32s (23158 txns/s)
Tue Feb  8 11:03:57 HST 2022
```

Newer hledger versions are slower than this.
hledger 1.29-1.32.2 have a performance bug which can be seen with large files,
[#2153](https://github.com/hledgerorg/hledger/issues/2153)
(see eg [2153#issuecomment-1912942305](https://github.com/hledgerorg/hledger/issues/2153#issuecomment-1912942305) benchmarks).

2024's hledger 1.40 on macbook air m1 runs at roughly 16k txns/s for me:

```cli
$ hledger -f examples/100ktxns-1kaccts.journal stats
Main file           : .../100ktxns-1kaccts.journal
Included files      : 0
Txns span           : 2000-01-01 to 2273-10-16 (100000 days)
Last txn            : 2273-10-15 (90965 days from now)
Txns                : 100000 (1.0 per day)
Txns last 30 days   : 31 (1.0 per day)
Txns last 7 days    : 8 (1.1 per day)
Payees/descriptions : 100000
Accounts            : 1000 (depth 10)
Commodities         : 26
Market prices       : 100000
Runtime stats       : 6.23 s elapsed, 16051 txns/s, 258 MB live, 773 MB alloc
```

More independent benchmarking is needed, help welcome.

### Command line differences

- hledger does not require a space between command-line flags and their values,
  eg `-fFILE` works as well as `-f FILE`

- hledger uses `--ignore-assertions`/`-I` to disable balance assertions. 
  Ledger uses `--permissive` for that, and uses `-I` as the short form of `--prices`.

- hledger's `-x`/`--explicit` flag makes print show all amounts;
  Ledger's `--explicit` flag does something else.

- hledger's and Ledger's `-H`/`--historical` flags are unrelated.
  hledger's `-H` makes register and balance-like commands include
  balances from before the report start date, instead of starting at
  zero:

      hledger register --help:
      -H --historical           show historical running total/balance
                                (includes postings before report start date)

      hledger balance --help:
      -H --historical           show historical ending balance in each period
                                (includes postings before report start date)

  Whereas Ledger's `-H` changes the valuation date used by `-V`/`-X`:

      ledger --help:
      --historical (-H)
                                Value commodities at the time of their acquisition.

- hledger's [query language](hledger.md#queries) is a little less
  powerful than Ledger's, simpler, and easier to remember.
  It uses google-like prefixes, such as `desc:`, `payee:`, `amt:`, and `not:`.
  Multiple query terms are combined using fixed AND/OR rules.
  More complex query combinations with AND/OR/NOT can be expressed with `expr:"BOOLEANEXPR"`.
  Some complex queries can also be achieved by using two invocations of hledger in a pipe, eg:
  `hledger print QUERY1 | hledger -f- -I reg QUERY2`

- hledger provides more short flags (`-b`, `-e`, `-p`, `-D`, `-W`, `-M`, `-Q`, `-Y`) and the `date:` query argument for setting report period and interval, and all of these combine nicely.

- hledger handles the transaction/posting status mark more precisely,
  fixing a [recurring source of confusion](https://github.com/hledgerorg/hledger/issues/564):
  It calls the three statuses "unmarked", "pending", "cleared",
  and provides corresponding `--unmarked`/`-U`, `--pending`/`-P`, and `--cleared`/`-C` flags, which can be combined.
  Ledger's `-U`, which matches things not cleared, is `-UP` in hledger.
  hledger's `-U` matches things with no status mark, which can't easily be done in Ledger.

### Journal format differences

hledger's journal format mimics (a subset of) Ledger's quite closely.
You can maintain a journal file that works with both hledger and Ledger simultaneously,
if you restrict yourself to compatible features,
perhaps keeping non-compatible features in separate files.

A typical gnarly old Ledger file will not work with hledger as-is.
Here are some of the roadbumps to expect (see also: [#1752](https://github.com/hledgerorg/hledger/issues/1752)):

- Some features are supported only by one or the other (Ledger's `(AMOUNTEXPR)`, `((VALUEEXPR))`.. , hledger's `==`, `=*`, `==*`..)
- Some will be accepted but ignored, perhaps causing transactions not to balance (`{LOTCOST}`, `{=LOTFIXEDCOST}`, `[LOTDATE]`, `(LOTNOTE)`..)
- Some may be interpreted differently (balance assertions, balance assignments..)
- Some may have different restrictions (dates, comments..)

You'll find lots of tips for how to handle these and other differences, below.

But first, an overview of Ledger's (extensive) journal format.
Here are its features, from the [Ledger manual](https://www.ledger-cli.org/3.0/doc/ledger3.html) (2022-12),
and their supportedness in hledger (1.52, 2026):
Y (supported), Ignored (accepted but ignored), or N (not accepted).

| Supported&nbsp;in&nbsp;hledger&nbsp;?                                                                                                                 | 1.52    | hledger name, notes <!-- goal ? -->
|-------------------------------------------------------------------------------------------------------------------------------------------------------|---------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| **TRANSACTIONS SYNTAX**                                                                                                                               |         |
| [5.1 Basic format](https://www.ledger-cli.org/3.0/doc/ledger3.html#Basic-format)                                                                      | Y       |
| [5.2 Eliding amounts](https://www.ledger-cli.org/3.0/doc/ledger3.html#Eliding-amounts)                                                                | Y       | "Inferred / implicit amounts"
| [5.3 Auxiliary dates](https://www.ledger-cli.org/3.0/doc/ledger3.html#Auxiliary-dates)                                                                | Y       | "Secondary dates". A misfeature, best avoided.
| [5.4 Codes](https://www.ledger-cli.org/3.0/doc/ledger3.html#Codes)                                                                                    | Y       |
| [5.5 Transaction state](https://www.ledger-cli.org/3.0/doc/ledger3.html#Transaction-state)                                                            | Y       | "Transaction status"
| [5.6 Transaction notes](https://www.ledger-cli.org/3.0/doc/ledger3.html#Transaction-notes)                                                            | Y       | "Transaction description (and/or payee)"
| [5.7 Metadata](https://www.ledger-cli.org/3.0/doc/ledger3.html#Metadata)                                                                              | Y       | "Tags"
| [5.7.1 Metadata tags](https://www.ledger-cli.org/3.0/doc/ledger3.html#Metadata-tags)                                                                  | Y       | "Tag names". Format is `TAG1:, TAG2:` not `:TAG1:TAG2:`.
| [5.7.1.1 Payee metadata tag](https://www.ledger-cli.org/3.0/doc/ledger3.html#Payee-metadata-tag)                                                      | N       |
| [5.7.2 Metadata values](https://www.ledger-cli.org/3.0/doc/ledger3.html#Metadata-values)                                                              | Y       | "Tag values". They are terminated by a comma or newline.
| [5.7.3 Typed metadata](https://www.ledger-cli.org/3.0/doc/ledger3.html#Typed-metadata)                                                                | N       | Values of the `date:`/`date2:` tags are checked as dates; all others are strings.
| [5.8 Virtual postings](https://www.ledger-cli.org/3.0/doc/ledger3.html#Virtual-postings)                                                              | Y       | "Virtual postings" AKA "unbalanced postings", and "balanced virtual postings"
| [5.9 Expression amounts](https://www.ledger-cli.org/3.0/doc/ledger3.html#Expression-amounts)                                                          | N       | 
| [4.5.4 Value expressions](https://www.ledger-cli.org/3.0/doc/ledger3.html#Complete-control-over-commodity-pricing)                                    | N       | 
| [5.10 Balance verification](https://www.ledger-cli.org/3.0/doc/ledger3.html#Balance-verification)                                                     | Y       |
| [5.10.1 Balance assertions](https://www.ledger-cli.org/3.0/doc/ledger3.html#Balance-assertions)                                                       | Y       |
| [5.10.1.1 Special assertion value 0](https://www.ledger-cli.org/3.0/doc/ledger3.html#Special-assertion-value-0)                                       | N       |
| [5.10.2 Balance assignments](https://www.ledger-cli.org/3.0/doc/ledger3.html#Balance-assignments)                                                     | Y       |
| [5.10.3 Resetting a balance](https://www.ledger-cli.org/3.0/doc/ledger3.html#Resetting-a-balance)                                                     | Y       |
| [5.10.4 Balancing transactions](https://www.ledger-cli.org/3.0/doc/ledger3.html#Balancing-transactions)                                               | Y       |
| [5.11 Posting cost](https://www.ledger-cli.org/3.0/doc/ledger3.html#Posting-cost)                                                                     | Y       | "Inferred cost"
| [5.12 Explicit posting costs](https://www.ledger-cli.org/3.0/doc/ledger3.html#Explicit-posting-costs)                                                 | Y       | "(Explicit) unit cost"
| [5.12.1 Primary and secondary commodities](https://www.ledger-cli.org/3.0/doc/ledger3.html#Primary-and-secondary-commodities)                         | Y       | Essentially yes - in certain cases, order of postings determines which commodity is converted to.
| [5.13 Posting cost expressions](https://www.ledger-cli.org/3.0/doc/ledger3.html#Posting-cost-expressions)                                             | N       |
| [5.14 Total posting costs](https://www.ledger-cli.org/3.0/doc/ledger3.html#Total-posting-costs)                                                       | Y       | "(Explicit) total cost"
| [5.15 Virtual posting costs](https://www.ledger-cli.org/3.0/doc/ledger3.html#Virtual-posting-costs)                                                   | Ignored | The parentheses are ignored (it's treated like a regular cost).
| [5.16 Commodity prices](https://www.ledger-cli.org/3.0/doc/ledger3.html#Commodity-prices)                                                             | Ignored | Lot cost basis annotations are preserved but otherwise ignored. Ledger entries with these probably won't balance. (In hledger 2.0pre1, cost basis is fully supported.)
| [5.16.1 Total commodity prices](https://www.ledger-cli.org/3.0/doc/ledger3.html#Total-commodity-prices)                                               | Ignored | Preserved in 1.52, fully supported in 2.0pre1.
| [5.17 Prices versus costs](https://www.ledger-cli.org/3.0/doc/ledger3.html#Prices-versus-costs)                                                       | N       | If attached to a posting amount we call it "transacted cost", if declared ambiently with a P directive we call it "price" or "market price". `{AMT}` is ignored.
| [5.18 Fixated prices and costs](https://www.ledger-cli.org/3.0/doc/ledger3.html#Fixated-prices-and-costs)                                             | Ignored | `{=AMT}` is ignored.
| [5.19 Lot dates](https://www.ledger-cli.org/3.0/doc/ledger3.html#Lot-dates)                                                                           | Ignored | Preserved in 1.52, fully supported in 2.0pre1.
| [5.20 Lot notes](https://www.ledger-cli.org/3.0/doc/ledger3.html#Lot-notes)                                                                           | Ignored | Preserved in 1.52, fully supported in 2.0pre1.
| [5.21 Lot value expressions](https://www.ledger-cli.org/3.0/doc/ledger3.html#Lot-value-expressions)                                                   | N       |
| [5.22 Automated Transactions](https://www.ledger-cli.org/3.0/doc/ledger3.html#Automated-Transactions)                                                 | Y       | "Auto postings"
| [5.22.1 Amount multipliers](https://www.ledger-cli.org/3.0/doc/ledger3.html#Amount-multipliers)                                                       | Y       | We use a different syntax (`*NUM` or `*AMT`).
| [5.22.2 Accessing the matching posting’s amount](https://www.ledger-cli.org/3.0/doc/ledger3.html#Accessing-the-matching-posting_0027s-amount)         | N       |
| [5.22.3 Referring to the matching posting’s account](https://www.ledger-cli.org/3.0/doc/ledger3.html#Referring-to-the-matching-posting_0027s-account) | Y       | We use `%account`, not `$account`.
| [5.22.4 Applying metadata to every matched posting](https://www.ledger-cli.org/3.0/doc/ledger3.html#Applying-metadata-to-every-matched-posting)       | Ignored | Tags attached to an auto posting rule's "transaction line" are ignored.
| [5.22.5 Applying metadata to the generated posting](https://www.ledger-cli.org/3.0/doc/ledger3.html#Applying-metadata-to-the-generated-posting)       | Y       | Tags attached to an auto posting rule's postings affect the generated postings.
| [5.22.6 State flags](https://www.ledger-cli.org/3.0/doc/ledger3.html#State-flags)                                                                     | Y       | "Posting status" of auto posting rule's postings affect the generated postings.
| [5.22.7 Effective Dates](https://www.ledger-cli.org/3.0/doc/ledger3.html#Effective-Dates)                                                             | Y       | "Secondary dates", see above.
| [5.22.8 Periodic Transactions](https://www.ledger-cli.org/3.0/doc/ledger3.html#Periodic-Transactions)                                                 | Y       |
| **DIRECTIVES** [doc](https://www.ledger-cli.org/3.0/doc/ledger3.html#Command-Directives)                                                              |         |
| `P` historical (market) prices                                                                                                                        | Y       | "Market price", "price"
| `=` An automated transaction.                                                                                                                         | Y       | "Auto posting rule"
| `~` A periodic transaction.                                                                                                                           | Y       | "Periodic transaction rule"
| `;` `#` `%` `*` &#124; comment lines                                                                                                                  | Y       | "Comment line". `%` and &#124; are not supported.
| `!` or `@` as a directive prefix                                                                                                                      | Y       | Legacy syntax, best avoided.
| `account` pre-declare account names                                                                                                                   | Y       |
| `account` subdirectives                                                                                                                               | Ignored | <!-- Y? -->
| `apply account` set a default parent account                                                                                                          | Y       |
| `apply fixed` set fixated prices                                                                                                                      | Ignored |
| `apply tag` assign a tag to transactions                                                                                                              | Ignored |
| `alias` rewrite account names                                                                                                                         | Y       | "Account alias" (basic or regular expression)
| `assert` error if a value expression fails                                                                                                            | Ignored | Use `hledger check assertions` or `hledger-check-fancyassertions` instead.
| `bucket`/`A` set a default balancing account                                                                                                          | Ignored |
| `capture` replace accounts matched by regex with another                                                                                              | Ignored | Can be emulated with a regular expression account alias.
| `check` warn if a value expression fails                                                                                                              | Ignored | Use `hledger check assertions` or `hledger-check-fancyassertions`.
| `comment` start multi-line comments                                                                                                                   | Y       | "Multi-line comment", "Comment block"
| `commodity` pre-declare commodities                                                                                                                   | Y       |
| `commodity` subdirectives                                                                                                                             | Y       | `format` is supported, other subdirectives are ignored.
| `define` define value expressions for future use                                                                                                      | Ignored |
| `end`/`end apply` shorthand for ending most recent apply block                                                                                        | N       | <!-- Y? -->
| `end apply account`                                                                                                                                   | Y       |
| `end apply fixed`                                                                                                                                     | Ignored |
| `end apply tag`                                                                                                                                       | Ignored |
| `end apply year`                                                                                                                                      | Ignored | <!-- Y? -->
| `end tag`                                                                                                                                             | Ignored |
| `eval`/`expr` evaluate a value expression                                                                                                             | Ignored |
| `include` include another file                                                                                                                        | Y       |
| `payee` pre-declare payee names                                                                                                                       | Y       |
| `payee` subdirectives                                                                                                                                 | Ignored |
| `python` embed python in journal                                                                                                                      | Ignored |
| `tag` pre-declare tag names                                                                                                                           | Y       |
| `tag` subdirectives                                                                                                                                   | Ignored |
| `test`, a synonym for `comment`                                                                                                                       | N       |
| `value EXPR` set a default valuation function for all commodities                                                                                     | Ignored |
| `Y`/`year`/`apply year` set the year for year-less dates                                                                                              | Y       |
| `N COMM` ignore pricing information for a commodity                                                                                                   | Ignored |
| `D AMT` set a default commodity and its format                                                                                                        | Y       | A decimal mark is required (followed by 0 or more zeroes).
| `C AMT1 = AMT2` declare a commodity equivalency                                                                                                       | Ignored | <!-- Y? -->
| `I, i, O, o, b, h` timeclock entries in journal                                                                                                       | N       | Timeclock data must be in a separate timeclock file. (A journal file can `include` that if needed.)
| `--command-line-flags` in journal                                                                                                                     | Ignored |

### Decoding errors

hledger reports an error if it sees non-ascii data
which can't be decoded using the system locale's text encoding.
To avoid this, see [Install: Text encoding](install.md#text-encoding).

### Tabs and spaces

In places which normally require two or more spaces (or tabs), eg between account name and amount,
ledger will accept a single tab character.
hledger 2.x also accepts a single tab, for compatibility.

### Decimal mark

Ledger parses `1,000` as 1000, but hledger parses it as 1, by default
(see [hledger > Decimal marks](hledger.md#decimal-marks)).

To prevent any undetected disagreements, 
use [commodity directives](#commodity-directives) or [decimal-mark directives](hledger.md#decimal-mark-directive)
to disambiguate the decimal mark character during parsing.

### Balancing precision

Ledger and hledger <1.50 could occasionally disagree on whether a
transaction's journal entry is balanced, such as in this case:

```journal
2022-01-01 txn1
    expenses                                 AAA 989.02 @ $1.123456  ; $1111.12045312
    checking                                  $-1111.12

2022-01-02 txn2
    expenses                                      $0.1234
    checking
```

Ledger checks txn1's $ balance with the entry's local $ precision, 2 decimal places; so its $-0.00045312 imbalance is accepted.
hledger <1.50 checked it with the journal's global $ precision, 4 decimal places; so that imbalance was rejected,
requiring a `-c '\$0.00'` option or `commodity $0.00` directive to make things work.

To avoid this problem, use hledger 1.50+, which balances transactions as Ledger does.

### Balance assertions / assignments

Ledger calculates balance assignments and checks balance assertions simply in the order they were parsed.
hledger calculates balance assignments and checks balance assertions in date order
and then (for postings on the same date) parse order.
This ensures correct, reliable behaviour independent of the ordering of journal entries and files. 

hledger correctly handles multiple balance assignments/assertions within a single transaction.

Ledger rejects the following balance assertion, as if `(a)` and `a` were different accounts; hledger does not.
```journal
2023-01-01
  (a)  1

2023-01-02
  a    1 = 2
  b
```

In addition to `=`, hledger supports several other kinds of balance assertion, with syntax `==`, `=*` and `==*`. Ledger rejects these.

hledger allows `@`/`@@` cost notation in balance assertion/assignment amounts,
ie to the right of the equals sign; Ledger does not.

hledger adds a restriction on balance assignments:
it does not allow balance assignments on accounts affected by auto posting rules
(since in general this can make balancing the journal impossible).

### Directive scope

The region affected by directives, and their behaviour with included files or sibling files,
is sometimes different in hledger. This is to ensure robust, predictable behaviour.
Here are hledger's [Directive effects](dev/hledger.html#directive-effects) and 
[Directives and multiple files](hledger.md#directives-and-multiple-files) behaviour.
You might need to move directives and/or rearrange your files.

### Commodity directives

hledger allows `commodity` directives with a `format` subdirective to be written as one line,
eg these are equivalent:

```journal
commodity JPY
  format 1.00 JPY

commodity 1.00 JPY
```

hledger's commodity directive currently ignores other subdirectives (eg `alias`).

hledger's commodity directive always requires a decimal mark in the amount.
To display no decimal digits, write the decimal mark at the end:

```journal
commodity 1000. JPY
```

And as [mentioned above](#decimal-mark), hledger assumes a single period or comma is a decimal mark,
so when specifying digit group marks, write a decimal mark as well:
Eg:

```journal
commodity 1,000. JPY
```

See also: [hledger > `commodity` directive](hledger.md#commodity-directive).

### Periodic transactions

hledger understands most Ledger periodic transactions,
but if you find some variants that are not supported, please report.

When you do specify a custom start date, hledger will start the transactions on that date.
Ledger seems to always generate them on the period boundaries.

### Amount expressions

hledger does not support value expressions, Ledger's embedded programming language.
In particular, parenthesised amount expressions like `($10 / 3)` are not supported;
these must be converted to explicit amounts. Here are the known ways:

- Convert each expression manually, eg replace `($10 / 3)` with `$3.333`.

- Convert each expression with ledger.
  Eg in emacs, select the parenthesised expression and enter `C-u M-| xargs ledger eval` (and remove the newline).
  This might not work in all cases.

- Convert all expressions with beancount.
  This is a lossy conversion, but it might be good enough.
  After installing 
  ledger2beancount,
  beancount,
  and beancount2ledger (see #[33](https://github.com/beancount/beancount2ledger/issues/33)),
  try:
  ```cli
  $ ledger2beancount file.ledger > file.beancount
  $ beancount2ledger file.beancount > file.journal
  ```

### Cost basis

hledger 1.52 preserves cost basis annotations, so that they can be exported to Ledger or Beancount for gain calculations.
But it otherwise ignores them. So Ledger entries using cost basis annotations might be reported as unbalanced, or might have wrong capital gain inferred.
(If you need to calculate capital gains in hledger 1, record the cost basis with `@` in both acquires and disposals, and track lots manually with subaccounts.
See eg [Track investments (2020)](https://hledger.org/investments.html).)

hledger 2.0pre1 uses cost basis annotations to calculate lots and capital gains automatically.
It normally uses a syntax similar to Beancount's, but it can also read most of Ledger's cost basis annotations
(`{=FIXEDLOTUNITCOST}` and `{{=FIXEDLOTTOTALCOST}}` annotations are ignored),
and will print them when printing in the `ledger` output format.
See [hledger manual: Cost basis](../dev/hledger.md#cost-basis),
[hledger manual: Lot reporting](../dev/hledger.md#lot-reporting).

### Other differences

- hledger's input data formats (journal, timeclock, timedot, ...) are separate;
  you can't mix timeclock entries and journal entries in one file as in Ledger.
  (Though a journal file can `include` a timeclock or timedot file.)
  This helps implement more useful error messages.
  
- hledger supports international number formats, auto-detecting the
  decimal mark (comma or period), digit group mark (period, comma, or
  space) and digit group sizes to use for each commodity. Or, these can
  be declared explicitly with commodity directives.

- hledger's default commodity directive (D) sets the commodity to be
  used for subsequent commodityless amounts, and also sets that
  commodity's display settings if such an amount is the first
  seen. Ledger uses D only for commodity display settings and for the
  entry command.

- hledger [auto postings](hledger.md#auto-postings) allow only
  minimal customisation of the amount (just multiplying the matched
  amount by a constant) - plus interpolation of matched text - 
  but not a full embedded expression language like Ledger.
  (And we call them "auto" to avoid the spelling confusion of "automatic" vs "automated".)

- In multi-period reports, hledger expands the report start/end dates
  to span whole periods.

- hledger's print command always shows both the primary transaction date and any secondary date, in their usual positions.
  Ledger's print command with `--aux-date` replaces the primary date with any secondary date.

- hledger always shows time balances (from timeclock or timedot data) in hours.

- hledger always splits multi-day time sessions at midnight, to show the per-day amounts.
  Ledger does this only with the `--day-break` flag.

- hledger's [CSV/TSV/SSV-reading](hledger.md#csv-format) and [import](hledger.md#import) system is more mature and flexible than Ledger's [`convert` command](https://www.ledger-cli.org/3.0/doc/ledger3.html#The-convert-command).

- Ledger can report multiple errors at once; hledger reports only one error at a time.

- Ledger can also output warnings. hledger does not print warnings; it either succeeds or fails.

- hledger will complain if transaction or posting comments contain `date:` or `date2:`
  not followed by a valid [date tag value](/hledger.html#posting-dates).

## Interoperating tips

The core of hledger's and Ledger's journal formats is the same, so you
can use both tools on the same files, if you are careful to avoid
tool-specific features.

When you can't avoid tool-specific syntax, you can put it in separate tool-specific files,
and have both of these [include](hledger.md#include-directive) a shared common file.
(Eg 2023.ledger and 2023.hledger, both including 2023.journal).

A third approach is to do a one-way conversion to a new file,
using whatever edits and transformations are necessary,
and automate it as much as possible (with sed, perl, Emacs macros, or similar),
so you can redo the conversion when needed, perhaps incrementally.

### Ledger to hledger

Most Ledger users will have at least some Ledger-specific syntax,
so the quickest way  to tap into hledger reports may be:

```
$ ledger print | hledger -f- -I CMD
```

The print command omits directives.
`-I` disables checking of balance assertions (if needed).
(ledger's `--raw` flag used to help hledger's transaction balancing but probably isn't needed since hledger 1.50.)

If this works you can do quick reporting like so:

```cli
$ ledger print | hledger -f- check       # check for problems
$ ledger print | hledger -f- stats       # show journal statistics
$ ledger print | hledger -f- is -MAS -2  # summarise monthly revenues/expenses
$ ledger print | hledger -f- web         # view journal in hledger-web WUI
$ hledger-ui -f <(ledger print --raw)          # view journal in hledger-ui TUI (works in bash)
```

Some common problems:

- hledger does not support Ledger's amount expressions, like `($10 / 3)`.
  If you have those, see [Amount expressions](#amount-expressions) above.

- hledger 1 preserves but otherwise ignores Ledger's cost basis annotations.
  So transactions using those might be reported as unbalanced, or might have wrong capital gain inferred.
  hledger 2.0pre1 handles such entries better.
  See [Cost basis](#cost-basis) above.

See also the other [Differences](#) mentioned above.

### hledger to Ledger

`print`'s standard `txt` output format is usually close enough to Ledger's journal format:

```cli
$ hledger print | ledger --permissive -f - CMD
```
Ledger requires a space between `-f` and `-`.
`--permissive` disables checking of balance assertions (if needed).

Since hledger 2.0 preview 1 there is also a `ledger` output format
(see [print > print output format](hledger.md#print-output-format)),
which is the same as `txt` except that amounts' cost basis annotations
are rendered with Ledger's lot syntax (`[DATE] (LABEL) {COST}`)
rather than hledger's (`{DATE, "LABEL", COST}`).
Use it if your journal has lot annotations:

```cli
$ hledger print -O ledger | ledger --permissive -f - CMD
```

Some common problems:

- hledger's extended balance assertions (`=*`, `==`, `==*`) are not supported
  by Ledger and must be avoided or commented out (eg with `sed -E -e 's/(==|=\*)/; \1/'`).

- hledger <1.50 sometimes rejected transactions which Ledger considers balanced, requiring additional configuration
  (see [Balancing precision](#balancing-precision)).
  Use hledger 1.50+ instead.

- hledger print will add a trailing decimal mark to amounts with digit
  group marks and no decimal digits, to disambiguate them (since
  1.31), but Ledger
  [currently](https://github.com/ledger/ledger/issues/2301) does not
  parse such numbers.  You can avoid them by suppressing digit group
  marks (eg with `-c`) or by ensuring some decimal digits (eg with
  `--round`); see [hledger > Trailing decimal marks](hledger.md#trailing-decimal-marks).

See also the other [Differences](#) mentioned above.

## History

I (Simon) discovered John Wiegley's [Ledger](http://ledger-cli.org) in 2006,
and was very happy to find this efficient command-line reporting tool with a transparent data format. Initially, I used it to generate time reports for my job. Before long I wanted some improvements - splitting sessions at day boundaries, reporting in hours, etc.

Meanwhile, John was now busy elsewhere. For a long time the Ledger project remained stalled, with unfixed functionality/documentation bugs and an ever-looming v3 release making life hard for new users and creating friction for community growth.
I did what I could to help - reporting bugs, providing support, contributing a [domain and website](https://ledger-cli.org) - but I didn't want to invest in learning C++.

I was learning and investing time in [Haskell](https://haskell.org), and I felt Ledger could be perhaps implemented well, and perhaps more effectively in the long run, in this language.
I urgently needed a rock solid, hassle-free and enjoyable accounting tool.
Also, I wanted a more active project and some way to make progress on the roadbumps and confusion facing other newcomers.

Of course I tried a little shiny-tech salesmanship on John, but couldn't expect him to start over. (At that time he was deeply in the C++ world; nowadays he is a Haskell expert!)

So in 2007 I began experimenting.
I built a toy parser in a few different languages, and it was easiest in Haskell.
I kept tinkering.
Goals included:

1. to get better at Haskell by building something useful to me
2. to implement at least the basic core of Ledger, adapted for my needs
3. to learn how well Haskell could work for real-world applications

And later:

4. to provide a new highly-compatible implementation of at least the basics of Ledger, useful to others, with a greater focus on ease of use, reliability, documentation and web presence
5. to experiment with new user interfaces, APIs, etc.

Before too long I had a tool that was useful to me. With Ledger still installed,
and by maintaining high compatibility, I now had two implementations which could be compared at times of confusion about functionality or suspected bugs/bookkeeping errors, which was quite valuable.

Later, John returned for a while and finished Ledger version 3, the Ledger project attracted new contributors and maintainers, and incremental improvements resumed. I continued sharing discoveries and design discussions, and we have seen many ideas propagating in both directions. I think having independent but compatible implementations has been
quite helpful for troubleshooting, exploring the design space, and growing the community.
For a while I ran [LedgerTips](http://twitter.com/LedgerTips) on twitter.

hledger shared #ledger's IRC channel until 2014, when I created 
the [#hledger](http://irc.hledger.org) channel (now accessible on Libera IRC and Matrix).

In 2016 I set up <https://plaintextaccounting.org> as a common entry point and information hub.

The further adventures in hledger's development are not yet told, other than in the commit log, issue tracker and mail list, but other contributors joined the project and [CREDITS](CREDITS.md) notes some of their work.

See also:

- [FAQ: Why was hledger created ?](faq.md#why-was-hledger-created-)
