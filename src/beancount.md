# hledger and Beancount

Tips for co-using or converting between [Beancount](https://beancount.github.io) and hledger.
If you are a Beancount user trying to use your data with hledger, or vice-versa,
please [let me know](support.md) your experience so I can make this smoother.

See also:

- [Which PTA app should I choose ? (PTA FAQ)](https://plaintextaccounting.org/Getting-started-FAQ#which-pta-app-should-i-choose)
- [hledger and Ledger](ledger.md)
- [Beancount documentation](https://beancount.github.io/docs)

## Differences

hledger focusses strongly on user experience, reliability, and real-world practicality.
It aims to be useful to accounting beginners and non-techies, as well as being a power tool for experts.

Compared to hledger, Beancount

- has a better web app (Fava)
- is customisable by easier-to-write plugins
- and is written in Python, which is easier for contributors than Haskell.

Also, compared to hledger 1, Beancount has more support for tracking investments and capital gains.
As of the hledger 2 prereleases, it's the other way around.

Compared to Beancount, hledger has

- more installability: a clear best version, simple binaries, easy install on Windows
- more speed
- more built-in features: data entry, CSV import, time logging, REPL, TUI, WUI, JSON server..
- more ease of use: standard financial reports, multi-period reports, query syntax..
- always-up-to-date docs
- a single reference manual, viewable offline
- fully documented data formats
- more beginner resources
- more active chat rooms
- more maintenance and support
- more frequent releases
- and is written in Haskell, which helps with correctness and maintainability.


[Beancount's journal syntax](https://beancount.github.io/docs/beancount_language_syntax.html) is similar to 
[hledger's](hledger.md#journal),
but different enough that neither can read the other's files directly.
Beancount can export most data to hledger format,
and hledger can export all data to Beancount format.

See also: the [PTA apps](https://plaintextaccounting.org/#pta-apps) overview
and [Feature matrix](https://plaintextaccounting.org/#pta-apps-feature-matrix).


## hledger to Beancount

The best way to export from hledger to Beancount is with hledger's [print](hledger.md#print) command, which supports [Beancount output](hledger.md#beancount-output).

This can be useful for viewing hledger data in [Fava](https://beancount.github.io/fava/), eg.
In simple cases it can be:
```
$ uv tool install fava
$ hledger print -o tmp.beancount
$ fava tmp.beancount
```

Note if you are planning to do this, 
it'll definitely be helpful to pick Beancount-compatible account and commodity and tag names,
otherwise they'll be encoded and will look strange on the Beancount side.
See <https://hledger.org/dev/hledger.html#beancount-output>.


## Beancount to hledger

The most reliable way to export Beancount data is with 
Beancount 2's [bean-report](https://beancount.github.io/docs/running_beancount_and_generating_reports.html#bean-report) tool.
It's not available with Beancount 3, you'll need to install Beancount 2:
```
$ uv tool install 'beancount<3'
```

Then you can do
```
$ bean-report example.beancount hledger > example.hledger
```

This is a good start, but not yet robust. 
Here are some things you may need to fix manually, as of 2.3.6.

### Total costs

bean-report converts `@@` total costs to `@` unit costs.
`@` costs are more standard and often more useful, eg when selling part of a lot.
But this conversion tends to create imprecise entries, causing hledger to complain that transactions are unbalanced.
You may need to manually adjust the decimals in such entries.
(Or add an amountless expenses:rounding posting.)

### Double @

bean-report converts the combination of `{}` and `@` to invalid syntax with two `@`'s.
Eg:

```beancount
2013-10-21 * "Sell shares of ITOT"
  Assets:US:ETrade:ITOT                   -8 ITOT {101.20 USD} @ 105.75 USD
  Assets:US:ETrade:Cash               837.05 USD
  Expenses:Financial:Commissions        8.95 USD
  Income:US:ETrade:Gains              -36.40 USD
```

becomes

```journal
2013-10-21 * Sell shares of ITOT
  Assets:US:ETrade:ITOT                -8 ITOT @ 101.20 USD    @ 105.75 USD
  Assets:US:ETrade:Cash               837.05 USD
  Expenses:Financial:Commissions        8.95 USD
  Income:US:ETrade:Gains              -36.40 USD
```

Quick fix: comment out the second @ price:
```journal
  Assets:US:ETrade:ITOT                -8 ITOT @ 101.20 USD    ;@ 105.75 USD
```


### Queries

Custom query definitions are not properly commented out:

```beancount
2015-01-01 query "home" "
  SELECT LAST(date) as latest, account, SUM(position) as total
  WHERE account ~ ':Home:'
  GROUP BY account
"
```

becomes

```journal
;; Query: 2015-01-01 "home" "
  SELECT LAST(date) as latest, account, SUM(position) as total
  WHERE account ~ ':Home:'
  GROUP BY account
"
```

Quick fix: fully comment out any query definitions:
```journal
;; Query: 2015-01-01 "home" "
;  SELECT LAST(date) as latest, account, SUM(position) as total
;  WHERE account ~ ':Home:'
;  GROUP BY account
;"
```

So, something like this (applies the quick fixes above) might work better for you:
```
$ bean-report example.beancount hledger | perl -pe 's/(@.*?)@/\1;@/' | perl -p0e 's/^(;; Query.*?^")/comment\n\1\nend comment/smg' > example.hledger
```
or just run a single report without saving:
```
$ bean-report example.beancount hledger | perl -pe 's/(@.*?)@/\1;@/' | perl -p0e 's/^(;; Query.*?^")/comment\n\1\nend comment/smg' | hledger -f- stats
```

