# Frequently Asked Questions

Quick table of contents:

- [ACCOUNTING](#accounting)
- [THE HLEDGER PROJECT](#the-hledger-project)
- [HLEDGER AND PLAIN TEXT ACCOUNTING](#hledger-and-plain-text-accounting)
- [HLEDGER AND OTHER SOFTWARE](#hledger-and-other-software)
- [GETTING STARTED](#getting-started)
- [JOURNALS](#journals)
- [CSV](#csv)
- [REPORTING](#reporting)
- [CUSTOMISING](#customising)
- [SCRIPTING](#scripting)
- [HLEDGER-UI](#hledger-ui)

The full TOC is in the site sidebar to the left; to open it, click the three-line button above.

<!--
Here are a few VFAQs:

- [How does hledger relate to Ledger ?](faq.md#how-does-hledger-relate-to-ledger-)
- [Isn't plain text hard to work with ?](faq.md#isnt-plain-text-hard-to-work-with-)
- [Isn't importing from banks a pain ?](faq.md#isnt-importing-from-banks-a-pain-)
- [In Emacs, do I have to use hledger-mode ? Is ledger-mode only for Ledger ?](faq.md#in-emacs-do-i-have-to-use-hledger-mode--is-ledger-mode-only-for-ledger-)
- [Where can I find hledger CSV rules for my financial institutions ?](faq.md#where-can-i-find-hledger-csv-rules-for-my-financial-institutions-)
-->


<!-- FAQ answers should be useful and brief, linking to more detail if needed. -->

## ACCOUNTING

### What's accounting ?

[Accounting](https://en.wikipedia.org/wiki/Accounting) means keeping track of the flow and whereabouts of things you value, 
such as money or time, and using this information for insight, planning and decision-making.
Here's our [Accounting basics](accounting-basics.md)
and [Accounting: further study](accounting.md#accounting-links) pages.

### Why might I want to do accounting ?

For clarity, control, planning, accountability, compliance, tax reporting, tax audits. 
It clarifies activity, priorities, obligations, opportunities.

### What's double-entry accounting ?

[Double-entry bookkeeping](https://en.wikipedia.org/wiki/Double-entry_bookkeeping) is the traditional method for keeping accounting records reliably. 
For every movement of value (a transaction), both the source and destination are recorded.
These are labelled "Credit" and "Debit", to minimise working with negative numbers.
Simple arithmetic invariants help prevent errors.

### What's plain text accounting ?

You can read more about Plain Text Accounting (PTA) at <https://plaintextaccounting.org>.
In short, it is a way of doing Double Entry Bookkeeping (DEB) and accounting on a computer,
using simple text files and small flexible tools, rather than databases and big applications.
Minus and plus signs are usually used instead of Credit and Debit notation, making it easier to learn than traditional DEB.
The text files are human-readable and easy to convert or to manage with [version-control](https://en.wikipedia.org/wiki/Version_control) tools.

### Is there another plain text accounting FAQ ?

Why yes there is: you may want to also check the general <https://plaintextaccounting.org/FAQ>.

## THE HLEDGER PROJECT

### What's hledger ?

One of the best tools for doing Plain Text Accounting.
It's free and you can read all about it at the <https://hledger.org> home page.

### Why was hledger created ?

I needed to make working on finances (and financial tools) more fun for myself.
Ledger was incomplete and stalled,
using/supporting/community-building around it was frustrating,
and I wanted to work with Haskell not C++.
My goals included:

- Provide a more usable, robust, documented, cross-platform-installable version of Ledger.
- Provide a more maintainable and hackable version of Ledger for developers.
- Provide a useful library and toolbox for finance-minded Haskell programmers.
- Explore the suitability of Haskell for such applications.
- Attempt to build a successful, solvent, self-supporting project in a thriving ecosystem of financial software projects.

A 2025 [comment](https://news.ycombinator.com/item?id=45140901):

> > HN> When Gnucash did something, I was never sure what actually happened. And sometimes it would crash. Was all my data safe? Hard to tell.
>
> You express it exactly, I felt the same way with Gnucash, Quicken, and all the other non-plain-text accounting apps I tried.
> Finance was stressful enough without also worrying about messed-up data.
> That was perhaps the biggest motivation to switch to Ledger, when I found it.
>
> Later, I often could not figure out how to make Ledger do something I knew it could do,
> and I often was surprised by a crash or wrong behaviour when it saw some new combination of features and data that hadn't been tested or implemented yet.
> This was a big motivation to write hledger.

See also: [hledger and Ledger: History](ledger.md#history).

### What is the hledger project's current mission and plans ?

1. Help make plain text accounting more usable and useful for all.
2. Bring relief to people experiencing financial and financial technology stress,
   by providing dependable, empowering accounting tools, learning materials, and community.
3. Help people and communities in all countries increase their financial mastery and freedom.
4. Help grow a shared global culture of accountability and sustainability.
5. Starting with this project and ourselves.
<!-- see also: sponsor.md, ROADMAP.md -->

Here is the [ROADMAP](ROADMAP.md).

## HLEDGER AND PLAIN TEXT ACCOUNTING

### We use another system, we don't need this ?

Every tool has strengths and weaknesses. 
hledger is lightweight, flexible and relatively easy to glue into other systems; 
it might be worth exploring as a complementary tool.

### How do you collaborate with accountants and the non-PTA world ?

Depending on their needs, you send them a few standard reports (balance sheet, income statement, itemized account registers or a full transaction journal)

- as plain text (optionally spruced up with your own templates)
- or as HTML
- or as PDF
- or as CSV they can import into Excel and elsewhere

### Must I enter data in a text editor ?

No. A good text editor can be a very efficient way to work on your data, but there are other ways:

- use a terminal-based data entry tool like hledger add or hledger-iadd
- use a web-based data entry tool like hledger-web
- use a phone-based data entry app like MoLe
- import CSV data, avoiding manual data entry.

### What is a good set of account names to start with ?

The chart of accounts (list or tree of account names) will vary according to your language and your accounting situation,
and will usually evolve as your needs change.
Currently hledger does not have any built-in default chart of accounts.
You can start small: name just the accounts you need, as you need them.
Or, copy a chart of accounts that seems suitable, from other accounting software or from the web.
Some examples can be found at <https://plaintextaccounting.org/Choosing-accounts>.

### What can hledger do for me ?

See [Why hledger ?](why.md) for capabilities and use cases.

### How could that help me ?

- More clarity, transparency and accountability, for yourself or others
- Know what you owe, or who owes you
- Know where the money went; steer your spending
- Know how you spent your time; easy client invoicing
- More foresight and ability to plan; avoid overdrafts, late fees, cashflow crunches
- Know all the numbers you need for tax reporting; know how much to save for estimated taxes
- Less stress, fear or overwhelm
- More satisfaction, empowerment, and prosperity!

### Isn't manual data entry a pain ?

- Not if you spend a few minutes every day.
- Not if the benefits are worth it to you.
- Not if you use a comfortable editor and copy/paste a lot.
- Not if you use tools to help (editor modes, hledger add, hledger-iadd, hledger-web..)
- Not if you use rules to generate your recurring transactions.

### Isn't importing from banks a pain ?

Not once you have set up a manual or automated routine for it.
The possibilities for automation vary by bank and country, 
but the following semi-manual workflow is almost always possible and quick:

1. Manually download recent CSVs from your bank's website
2. `hledger import ACCT1.csv ACCT2.csv ...`
3. review/clean up the new entries in your journal.

### Isn't plain text hard to work with ?

No way, it's great, honest.
We love it.
You'll love it.
It's fast.
It's cheap.
It's non-distracting.
It keeps you focussed on the content.
It's copy-pasteable.
It's accessible to screen readers.
It's resizable.
You can pick the font and colours.
You do not need "Plaintext Reader, Trial Version" to read it.
you do not need "Plaintext Studio Pro" to write it.
You can use your favorite editor and skills you already have. 
You can search in it! 
You can version control it. 
It works well over remote/slow connections.
It's future-proof.
It will be just as usable in 15 or 50 years.
You can still read it even without the right software or (if you print it) a working computer.
*"Accounting data is valuable; we want to know that it will be
accessible for ever - even without software. We want to know when it
changes, and revision-control it. We want to search and manipulate it
efficiently. So, we store it as human-readable plain text."*

### Isn't this too weird for my family, business partners, tax accountant to use ?

Maybe. You can ask them to enter data via hledger-web, 
or import from their mobile expenses app or a shared spreadsheet.
You can show them the hledger-web UI, or HTML reports, or give them CSV to open in a spreadsheet.

## HLEDGER AND OTHER SOFTWARE

### How does hledger relate to Ledger ?

hledger (begun in 2006) is inspired by, and a friendly coopetitor of, John Wiegley's [Ledger](https://ledger-cli.org) (begun in 2003).
Ledger is the pioneer whose brilliant design and data formats defined this new software genre.

hledger is an attempt to recreate Ledger in a more expressive programming language
and take it to a higher level of usability and practicality.
hledger provides high Ledger compatibility and it's possible to keep your data files readable by both.
See [hledger and Ledger](ledger.md).

### How does hledger relate to Beancount ?

Beancount (begun in 2008) is the other "big 3" PTA app.
Written in the popular Python programming language, it's notable for
best-in-class capital gains tracking (as of 2025)
and an excellent web app (Fava).

Beancount's file format is different from h/Ledger's.
Beancount can export to hledger format, with some manual fixups required.
hledger can export to Beancount format, allowing hledger data to be viewed in Fava.
See [hledger and Beancount](beancount.md).

<!--
### What is/was ledger4 ?

hledger has its own parser for a file format close to Ledger's.
In 2012 John Wiegley prototyped a more exact conversion of Ledger 3's parser to Haskell,
calling it [ledger4](https://github.com/ledger/ledger4). 
For a while I integrated this as an alternate file format within hledger,
hoping to improve our ability to read original Ledger files,
but the parser needed lots more work to become useful, so later I removed it again.
-->

### How is hledger different from / interoperable with... ?

See [Cookbook > Other software](doc.md#other-software) for notes on 
Ledger, Beancount, GnuCash, Quickbooks, etc.
Also:

- [PTA apps](https://plaintextaccounting.org/#pta-apps), showing project stats
- [Syntax Quick Reference for the Ledger-Likes](https://plaintextaccounting.org/quickref), showing several file formats
- [PTA app comparisons](https://plaintextaccounting.org/#pta-app-comparisons), though mostly very out of date

### How could I import/migrate from...

- Look for a relevant page at [Cookbook > Other software](doc.md#other-software)
- Otherwise, try to export CSV representing transactions - one record per transaction - and then use [hledger's CSV reader](import-csv.md).
  Also look for [pre-existing CSV rules](https://github.com/hledgerorg/hledger/tree/main/examples/csv) you can use.
- Or, make a custom script or workflow to convert the old data to hledger's simple [journal format](hledger.md#journal-format).

### How could I export/migrate to...

- Look for a relevant page at [Cookbook > Other software](doc.md#other-software)
- See also [Exporting from hledger](export.md).

## GETTING STARTED

<!-- ## FILE MANAGEMENT -->

### There are so many docs, where do I even..

You're right. You can skip them: just run `hledger` for help.

When you'd like a bit more guidance, use the [Docs](doc.md) page,
and/or the [chat room](support.md).

If you want the most complete reference, use the [hledger manual](hledger.md).
If you read this and nothing else, you'll be a hledger expert.
But it is rather large; so maybe read the table of contents, the first sections, 
and just skim the rest so you know where to find out more.

You can jump to topics in the manual with a url like [`hledger.org/hledger#time-periods`](https://hledger.org/hledger#time-periods).
(This makes a good web browser keyword;
eg in your browser, define `hm TOPIC` as a shortcut for `https://hledger.org/hledger#TOPIC`.)
The website also has a search feature.
To read a local copy of the manual, see `hledger help -h`.

### Where can I find non-english docs ?

Unfortunately, I know of very few non-english docs for hledger.
There must be some I don't know about, please contribute any good links.

Could you help translate some docs ? Please get in touch.

Otherwise, you could try Google Translate or similar.

There are  couple of non-english videos at
[PTA: Videos](https://plaintextaccounting.org/#videos)
and [Docs: Videos](doc.md#videos).

### How do I set the default file to something other than ~/.hledger.journal ?

See [hledger manual: Setting LEDGER_FILE](hledger.md#setting-ledger_file).

### I'm on Windows, how do I keep my files in AppData\\Roaming ?

You could set the LEDGER_FILE environment variable (see the link in the answer above).

Or, you can create a file at the default location, that includes the rest.
You can use relative include paths, like this
(the first file must be named `.hledger.journal`, the other file names can be anything):

```
# \Users\USER\.hledger.journal

include AppData\Roaming\hledger.journal
```

```
# \Users\USER\AppData\Roaming\main.journal

include other.journal

# ...
```

```
# \Users\USER\AppData\Roaming\other.journal

# ...
```

### Why do I get an error with non-ascii text ?

hledger uses the system's text encoding when reading non-ascii text.
If no system encoding is configured, or if the data's encoding is different, hledger will give an error.
Run `hledger setup` to check this, and use the text encoding it recommends.
Or see [Install: Text encoding](install.md#text-encoding) for more detail.

### How should I organise files ?

See [PTA FAQ: How should I organise files ?](https://plaintextaccounting.org/FAQ#how-should-i-organise-files).

### What account names should I use ?

See [PTA FAQ: How should I choose account names ?](https://plaintextaccounting.org/FAQ#how-should-i-choose-account-names).

### Why are my revenue (income), liability, and equity balances negative ?

It's normal; it's because hledger and most other plain text accounting tools
use negative and positive numbers instead of credit and debit terminology.
Certain hledger reports (`balancesheet`, `incomestatement`, `cashflow`)
and flags (`--invert`) can show them as positive when needed.
See: 
- [Accounting basics for PTA users](accounting-basics.md)
- [PTA FAQ: Where are debits and credits ?](https://plaintextaccounting.org/FAQ#where-are-debits-and-credits)
- [PTA FAQ: Why do some balances look negative ?](https://plaintextaccounting.org/FAQ#why-do-some-balances-look-negative)

## JOURNALS

### What helpers are available for my text editor or IDE ?

See [Editors](editors.md).

### In Emacs, do I have to use hledger-mode ? Is ledger-mode only for Ledger ?

No and no. hledger-mode is not very actively maintained.
ledger-mode is more popular, more mature, and works very well with hledger and hledger journals,
except for a few non-essential features, and is what hledger's maintainer uses.
See [Editors](editors.md) for configuration tips.

### How can I tidy a journal file ?

Method 1: use Emacs's ledger-mode.
This is the least destructive way, but it requires Emacs and ledger-mode.
Select the whole journal, or a region, or move the cursor to a specific transaction, and press `M-q`.

Method 2: use hledger's `print` command.
You might need to work around some current limitations:

- Only transactions are printed, not directives or inter-transaction comments.
  Workaround: group directives at the start of the file, and copy them to the new output,
  and don't use inter-transaction comments.
  
- Transactions will be printed in date order.
  Workaround if you don't want to sort them all by date:
  tidy just a subset of transactions at a time (using `-I` if needed).
  Eg in Emacs: select region, `C-u M-S-| hledger -If- print`.

- If you have `include` directives, the included files' transactions will also be printed.
  Workaround: tidy one file at a time, temporarily commenting out include directives.

- Amounts will be right-aligned, within each transaction but not across all transactions.
  Workaround if you want whole-file alignment and more alignment options, like aligning on decimal mark: use ledger-mode.

The `print` method has some inconveniences, but also extra power, 
eg to select a subset of transactions with a query,
or to transform the data with `--explicit`, `--infer-costs`, `--alias`, `--commodity-style`, `--pivot`, etc.

Note, any time you do mass edits to valuable data, it's wise to keep a backup and check your changes.
Eg by comparing reports before and after,
by running your usual `hledger check`s,
or by using a version control system.

Here are some examples using `print`:

```cli
cp $LEDGER_FILE $LEDGER_FILE.bak
hledger print > $LEDGER_FILE.new && mv $LEDGER_FILE.new $LEDGER_FILE
```

Or using the `sponge` helper for updating a file in place:
```cli
hledger print | sponge $LEDGER_FILE
```

A one-liner that preserves directives and inter-transaction comments (though not their positions):
```cli
(grep -E '^([#;]|[[:alpha:]])' $LEDGER_FILE; hledger print) > $LEDGER_FILE.new
```

### Why did hledger rename Ledger's "effective dates" to "secondary dates" ?

To avoid confusions like:
Which is the effective date ?
Which should be the later date ?
What does effective mean ?
If there are more than two dates of interest, what to call the others ?

### Are secondary dates and posting dates the same ? Which should I use ?

These are independent features, which can be used separately or together.
Both can be applied to a similar use case
(transactions which have more than one date of interest).
Secondary dates are best avoided IMHO, and they are deprecated in hledger.

More detail:

Here's a secondary transaction date (<https://hledger.org/hledger.html#secondary-dates>):

```journal
2025-08-30=2025-08-27 * pay credit card
    liabilities:credit-card              $10
    assets:checking
```

or:

```journal
2025-08-30 * pay credit card   ; date2:2025-08-27
    liabilities:credit-card              $10
    assets:checking
```

Here's a posting date (<https://hledger.org/hledger.html#posting-dates>):

```journal
2025-08-30 * pay credit card
    liabilities:credit-card              $10  ; date:2025-08-27
    assets:checking
```

or:

```journal
2025-08-30 * pay credit card
    liabilities:credit-card              $10  ; [2025-08-27]
    assets:checking
```

Here's a secondary posting date:

```journal
2025-08-30 * pay credit card
    liabilities:credit-card              $10  ; date2:2025-08-27
    assets:checking
```

or:

```journal
2025-08-30 * pay credit card
    liabilities:credit-card              $10  ; [=2025-08-27]
    assets:checking
```

Here's primary and secondary dates for the transaction and each posting, all used at once:

```journal
2025-09-01 * pay credit card                  ;                  date2:2025-09-02
    liabilities:credit-card              $10  ; date:2025-09-03, date2:2025-09-04
    assets:checking                           ; date:2025-09-05, date2:2025-09-06
```
or:
```journal
2025-09-01=2025-09-02 * pay credit card
    liabilities:credit-card              $10  ; [2025-09-03=2025-09-04]
    assets:checking                           ; [2025-09-05=2025-09-06]
```
and their effect:
```
$ hledger print date:2025/9/1
2025-09-01=2025-09-02 * pay credit card
    liabilities:credit-card             $10  ; [2025-09-03=2025-09-04]
    assets:checking                          ; [2025-09-05=2025-09-06]

$ hledger print date2:2025/9/2
2025-09-01=2025-09-02 * pay credit card
    liabilities:credit-card             $10  ; [2025-09-03=2025-09-04]
    assets:checking                          ; [2025-09-05=2025-09-06]

$ hledger reg
2025-09-03 pay credit c..  li:credit-card            $10           $10
2025-09-05                 assets:checking          $-10             0

$ hledger reg --date2
2025-09-04 pay credit c..  li:credit-card            $10           $10
2025-09-06                 assets:checking          $-10             0
```

Both features are non-standard tool-specific notations added to standard Double Entry Bookkeeping.
They make money "disappear" temporarily, unbalancing the accounting equation during the period between the two dates.
But for most people this doesn't matter, and being able to represent multiple dates precisely with one journal entry
(the alternative is multiple entries updating a settlement account) is convenient.

But the docs linked above explain why I think you should avoid secondary dates.
In particular, they require you to choose between reporting modes, 
and they tend to break balance assertions (because balances depend on the dates of postings).
Posting dates don't have this problem.

### Why does this entry give a "no amount" error even though I wrote an amount ?

```journal
2019-01-01
  a $1
  b
```
Because there's only a single space between `a` and `1`,
so this is parsed as an account named <span style="white-space:nowrap;">"a 1"</span>, with no amount.
There must be at least two spaces between account name and amount.

### Why does this journal fail strict account checking even though I declared all accounts ?

```journal
account assets:bank:checking ; my bank account
account equity               ; equity

2023-01-01
    equity
    assets:bank:checking   $1000
```

Because there's only a single space between `assets:bank:checking` and the `;` comment,
so the comment is parsed as part of the account name. (`hledger accounts` shows this.)
There must be at least two spaces between an account name and anything that follows it.

### Why do some directives not affect other files ? Why can't I include account aliases from a sub file ?

Directives vary in their scope, ie which journal entries and which input files they affect. The differences are partly due to historical accident, and partly by design, so that reordering files, or adding another file, does not change their meaning. See [journal format > Directives and multiple files](hledger.md#directives-and-multiple-files).
Related discussion:
[#217](https://github.com/hledgerorg/hledger/issues/217),
[#510](https://github.com/hledgerorg/hledger/issues/510),
[#1007](https://github.com/hledgerorg/hledger/issues/1007).

### Can I use arithmetic expressions in journal entries ?

Eg, [Ledger-style amount expressions](https://ledger-cli.org/doc/ledger3.html#Expression-amounts) ?
Generally no, hledger doesn't allow this.
(If you want it, you could revive PR [#934](https://github.com/hledgerorg/hledger/pull/934).)

In some cases, you can emulate it with [auto postings](https://hledger.org/hledger.html#auto-postings),
which can multiple amounts by a constant. Eg to (effectively) divide all food expenses by 2,
you could add this rule, and enable it with `--auto`:

```journal
; Add a posting subtracting half from every food expense (good enough for expense reports)
= revenues
    (expenses:food)  *-.5
```
Related: [50% of the balance?](https://forum.plaintextaccounting.org/t/50-of-the-balance/461)

### How could I record call/put stock options ?

Here's a [suggestion](https://groups.google.com/g/beancount/c/iJirO6GOMgU/m/8VDgUQxyIQAJ) from the beancount mail list
([reddit](https://www.reddit.com/r/plaintextaccounting/comments/1i0ul0y/callput_stock_options_and_hledger/)).


## CSV

### Where can I find hledger CSV rules for my financial institutions ?

Look for a suitable rules file in the [examples/csv/](https://github.com/hledgerorg/hledger/tree/main/examples/csv) directory on github.
Or you can [get the hledger source](install.md#build-from-source) and look in examples/csv/.

If your financial institution is not there yet, please use these for inspiration,
ask in the chat for help, and perhaps send a pull request contributing your new rules.

### How do I make new hledger CSV rules ?

See the [Importing CSV](csv.md) tutorial and the [hledger manual > CSV format](hledger.md#csv-format).
(After checking for a pre-existing rules file in examples/csv/ in the hledger repo.)
If possible, add your new rules file to that directory and send a pull request.

### When importing CSV from two bank accounts, and there's a transfer between them, how do I avoid duplicate entries ?

You can have one of the rules files skip that transaction.
Eg if you have checking and savings CSVs, in savings.csv.rules you might have a rule like
```rules
; already imported from checking
if TRANSFER FROM .*CHECKING
 skip
```

Other options: you could remove one of the entries manually.
Or you could import both entries, but have them transfer to and from an imaginary third account
(but this creates extra noise in your journal and reports).

### Can I do arithmetic calculations in CSV rules ?

Eg, dividing the amount by 2 ? No; currently the best thing is to preprocess the CSV,
adding the calculated values as a new field, before converting it with hledger.

### Where can I find more help with CSV conversion ?

Study the whole [CSV](hledger.md#csv) section in the manual carefully.
[Working with CSV](hledger.md#working-with-csv) has useful tips, eg for [setting amounts](hledger.md#setting-amounts).
And of course, make use of the [chat](#support).

## REPORTING

### Why am I seeing some amounts without an account name in reports ?

When an account has a multi-commodity balance, hledger's default `balance`, `print`, and `register` reports, like Ledger's, will show the balance on multiple lines, with each commodity on its own line, but with the account name appearing only once (either top- or bottom-aligned, depending on report). For a clearer report, try `balancesheet`, `incomestatement` or `cashflow`, and/or `--layout=bare`, or restrict the report to a single currency with `cur:SYMBOL`.

Another reason you might see amounts without an account name: dropping too many account name parts with [`--drop`](hledger.md#balance).


### How do I control the number of decimal places displayed ?

To set that temporarily, use the `-c/--commodity-style` option (one for each commodity, as needed).
Eg, this shows dollars with two decimal places, ADA with six, and EUR with none:
```cli
hledger -c '$1000.00' -c '1000.000000 ADA' -c 'EUR 1000.' bal
```

To make it permanent, use [commodity directives](hledger.md#commodity-directive).

### How do I display a decimal mark different from the one in the input file ?

Use `-c/--commodity-style` options (one for each commodity) to override the display style(s).
Eg `hledger bal -c '$1,00'` displays dollar amounts with comma decimal marks,
even if they use period decimal marks in the journal.

### How do I report by financial year, not calendar year ?

Just specify the desired start date, eg `hledger is -Y -b 2020/4/15` or `hledger is -p 'yearly from 2020/4/15'`.
(With hledger <1.29, you can approximate this with `-p 'every 12 months from 2020/4`.
or `-p 'every 365 days from 2020/4/15'`.)

### How can I report (or generate transactions) on every Nth ... of ..., etc. ?

Use a [period expression](hledger.md#period-expressions) with one of the [more complex report intervals](hledger.md#more-complex-report-intervals).

### How can I report (or generate transactions) on the last day of each month ?

Use "every 31st day". Eg:
```cli
hledger balancesheet -p 'every 31st day'
```

### How do I show just deposits, or just withdrawals, in an account ?

Use `amt:` to match on amount sign. Usually you'll want to add an account query as well:
```cli
hledger register cash 'amt:>0'   # cash inflows
hledger register cash 'amt:<0'   # cash outflows
```

If you use `aregister`, it's like this (because of aregister's special first argument):

```cli
hledger aregister cash cash 'amt:<0'
```

### How do I show the full entries for an account's deposits/withdrawals ?

Since hledger 1.43, you can use [any:](https://hledger.org/dev/hledger.html#any-query):
```cli
hledger print any:'cash amt:>0'
```

With older hledger versions:

Show transactions where a cash account was increased:
```cli
hledger print -x cash | awk '/:cash.*?  [^-=]*[0-9]/' RS="\n\n" ORS="\n\n"
```
or decreased:
```cli
hledger print -x cash | awk '/:cash.*?  [^=]*-/' RS="\n\n" ORS="\n\n"
```

You can also do this kind of filtering in Emacs ledger-mode, with `C-c C-f` and a regular expression.



### How do I show transactions involving two particular accounts ?

Use `aregister ACCT1 ACCT2`:
```cli
hledger aregister checking expenses:tax
```

To filter by direction, add `'amt:>0'` or  `'amt:<0'`:
```cli
hledger aregister checking expenses:tax 'amt:>0'
```

To see transactions in full:

Use `print` with an `expr:` query (requires hledger >=1.30):
```cli
hledger print expr:'checking AND expenses:tax'
```

Or, you can emulate that with `not:not:`:
```cli
hledger print checking not:not:expenses:tax
```

### How do I show balance changes from transactions involving two particular accounts ?

The balance commands see individual postings, not whole transactions, so using `expr:` as above won't work.
Instead do a first pass with print, selecting transactions to use in the second report:

```cli
hledger print checking | hledger -f- -I register expenses:tax
```

```cli
hledger print checking | hledger -f- -I balance expenses:tax
```

```cli
hledger print liabilities:mastercard | hledger -f- -I incomestatement
```

Complex multi-account transactions could muddle these reports a little;
if that's a problem you might need to exclude those transactions or split them up.

Or, with hledger main you can use `any:`.
This shows all tax transactions paid from a "checking" account:

```cli
hledger balance expr:'checking AND any:expenses:tax'
```

or more simply:
```cli
hledger balance checking any:expenses:tax
```


### What are some gotchas with piping `hledger print` into another hledger command ?

`hledger print` reproduces transactions, but not directives.
The output will normally be a valid journal, but it can have a different meaning or even be unparseable due to:

1. Loss of `decimal-mark` directives, which could disrupt number parsing.
3. Loss of `account` directives declaring accounts' types, which could alter reports.
3. Balance assertions which break because you have excluded transactions they depend on.
4. (In hledger <1.50:) Loss of `commodity` directives declaring display precisions, which could disrupt transaction balancing.

Workarounds:

- Whenever you use `-f -` to read `hledger print` output, also add `-I` to ignore balance assertions.
  And write these flags separately (`-If-` [does not work](https://github.com/hledgerorg/hledger/issues/2059)). So:
  ```cli
  $ hledger print ... | hledger -f- -I ...
  ```

- Also recreate any required directives in the input stream. This is often not needed, but it depends on your data.
  If needed:
  
  - Keep those directives in their own file if possible
    (if [directive scope rules](hledger.md#directives-and-multiple-files) allow it),
    which you can use as a second input file:
    ```cli
    $ hledger print ... | hledger -I -f - -f 2023-declarations.journal ...
    ```

  - Or find another way to pass the required directives along. Eg:
    ```cli
    $ { hledger print ...; grep '^[acd]' $LEDGER_FILE; } | hledger -I f- ...
    $ { hledger print ...; grep '^[acd]' `hledger files` --no-filename; } | hledger -f- -I ...
    ```



## CUSTOMISING

### How can I save and reuse common options/arguments ?

Save them in a text file, with one option or argument per line,
then include `@FILE` in your hledger command line.
See [argument files](#argument-files).
This is superseded by...

### Is there a config file ?

Yes, since hledger-1.40. See [Config files](https://hledger.org/dev/hledger.html#config-files).

### How can I automatically use a journal file in the current directory ?

Perhaps you have journals in multiple project directories.
If you use a standard filename, such as `default.journal`,
you can run hledger with the `-f default.journal` option or set `LEDGER_FILE` to `default.journal`, perhaps in a script.

You can also use [file glob patterns](https://en.wikipedia.org/wiki/Glob_(programming)), like `*.journal`, in -f or LEDGER_FILE.

For more flexibility, you could use [direnv](https://direnv.net) to customise LEDGER_FILE per directory.

hledger will not search parent directories for a journal file,
though there's probably a tool that will.

Related: [#2194](https://github.com/hledgerorg/hledger/issues/2194)

With the new config file support, you could add `-f FILE` to a `hledger.conf` file in or above this directory.


## SCRIPTING

### How do I install more hledger scripts and add-on commands ?

git clone the hledger repo, and add the bin/ directory to your shell's PATH.
See [Scripts and add-ons](scripts.md).

### How do I make new hledger scripts ?

Install the example [Scripts and add-ons](scripts.md) and find a suitable one to copy and modify.
Also see [Scripting](scripting.md).
If your new script can be useful to others, consider contributing it with a pull request.

### What's a good way to manage hledger scripts ?

Once you start defining handy scripts, they tend to proliferate and become hard to remember.

One solution is to gather scripts into a [Makefile](https://www.gnu.org/software/make),
and run them with `make SCRIPT`.
This is very traditional and very common, but it has downsides.
Listing scripts, handling arguments, portability, and dealing with make's special syntax are all a hassle.

As someone who has used make for a few decades, I urge, nay *beg*, you to install and use [just](https://github.com/casey/just) instead.
It is much better for this job and complements hledger and PTA very well.
See the example [Justfile](scripts.md#justfile) and [hledger and just](just.md).

## HLEDGER-UI

### With hledger-ui in iTerm2 on mac, why does Shift-Up/Shift-Down move the selection instead of adjusting the report period ?

iTerm2 by default doesn't recognise SHIFT-UP/SHIFT-DOWN keys correctly. (If this has changed in recent releases, please let us know.)
Here's one way to fix it: iTerm2 > CMD-i > Keys > Key Mappings > Presets -> select "xterm Defaults" (not "Terminal.app Compatibility").


