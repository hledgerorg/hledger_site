# News

Share your hledger/PTA user notes, dev news, achievements or experiences in the [hledger matrix chat](support.md),
every Friday morning or any time, tagged with `TWIH:`.

See also: [Release notes](relnotes.md), [Recent discussion](https://hledger.org/support.html).

---

## This Week In Hledger 2024-08-09

**sm**
Offline for a while, not much to show in last three weeks.
Improved bad regexp error message; bin/ updates;
timeclock, cookbook, mobile doc updates.
Writing a new course or book on time tracking.

**Quotes**

*it is very satisfying to get a report of my last 10 years swiftly over the weekend. Thanks for the software :) -- droidoneone*

---

## This Week In Hledger 2024-07-19

**sm**
- bs,cf,is: show interval in report title
- check recentassertions: improve message
- cli parsing, config file: fixes, new example config
- ui menu screen: consistent control/display of narrowed period
- web: guess a more robust base url when --base-url is not used
- web: require a http[s] scheme in --base-url
- docs: Date adjustments, FAQ: How to tidy a journal
- daily support

**Misc**
Michael Rees posted a PR implementing flexible register sorting (#2211).
Adolf Szabo released placc, a free PTA app built with nim, not yet open source.

**Quotes**
*I just moved my whole financial life over to hledger and oh my goodness I’m so much happier (I dumped both QuickBooks and Quicken, which I’d been using previously).*

---

## This Week In Hledger 2024-07-12

**sm**
Command line parsing testing & fixes; hledger-ui menu screen keys; example shell scripts updates; doc updates (add, config files, hledger-ui).

**Quotes**

- *It's hugely valuable to have all of your financial data in one, human-readable place. Not only to you, but to whomever might be executing your will ;)*

- *I have it running on my laptop at all times (a window in my tmux config displays various reports on my accounts like current balance, uncleared balance, uncleared transactions, etc.). I find it helps me to be mindful of my money if it's only a couple keypresses away.*

---

## This Week In Hledger 2024-07-05

**sm**
Testing/refinement of CLI, config file support; Tiller csv rules example; explain shebang commands better in hledger-script-example.

**Quotes**

*+1 for plain text accounting. I'm using hledger to track my finances. I do use the web UI to submit information but I edit the plain text store extensively.*

*Now I use hledger, which has been fantastic. I back up the file to a shared drive that's sync'ed to my phone, so every time I get a message from the bank or pay with cash, I can immediately note it down (this would have been much less workable before I found the "cone" app) and track my spending across dozens of accounts.*

---

## This Week In Hledger 2024-06-28

**sm** Worked on CLI and config file support.

**Quotes**

- *Every time I think hledger is missing something I always find either the exact feature I was looking for or two things that coupled together accomplish what I need it to do. --vm*

- *It just keeps getting better --glguy*

---

## This Week In Hledger 2024-06-21

**sm**
Updated the hledger-register-max script, fixed a problem with just ghci* scripts, refactored the main procedure and command line processing, worked on config file support.

**Misc**
recent discussions: <https://hledger.org/support.html>

**Quotes**

- *I liked that hledger had a few reports that ledger didn't have, like real balance sheets and income statements. Both integrate well with emacs, but their journal files differ in slightly incompatible ways, so they're not drop-in replacements. Both are very fast.*

- *My primary consumption method is hledger-ui, a nice curses-based UI. It's got a `watch` mode so will update in real-time as you make edits to the source database, which is nice.*

<https://hledger.org/news.html#this-week-in-hledger-2024-06-21>


---

## This Week In Hledger 2024-06-14

**sm**

I fixed an old bug with account type declarations in multiple files, and an incompatibility of --tldr with tealdeer. I automated the updating of option docs in manuals, and worked on code cleanups, refactoring, and removing tech debt. And I worked on various improvements:
- tabular balance reports now show an outer table border and inter-column borders with --pretty, and they have better layout and headings in text and html output.
- better/clearer command line processing
- a config file system for next release

Doc updates: box-drawing characters, --pretty, --tldr.



**Misc**
The docker image for hledger 1.34 is out. And for recent discussions see: <https://hledger.org/support.html>

**Quotes**

- *I switched away from Quickbooks, years ago, to plain text accounting. Couldn't be happier. I can do everything better using hledger/ledger, git, vim and make.*

- *I've switched all my accounting over to hledger (a Haskell-based and slightly more feature-filled version of the original) and I'm SUPER happy with it so far.*

<https://hledger.org/news.html#this-week-in-hledger-2024-06-14>


---

## This Week In Hledger 2024-06-07

**sm**
Released hledger 1.34, fixed some CI issues. Improved docs:
- cli, ui, web: synopsis, options cleanup/consistency
- command flags are now included in manuals (and Shake cmddocs updates them)
- diff, prices: improve help layout
- environment: correction, NO_COLOR does not override --color=yes
- Generating data: rewrite
- ghrelnotes: fix mac, linux install commands
- ghrelnotes: link to the Build from source doc
- secondary dates: officially deprecate secondary dates and --date2
- web JSON API, cli JSON output: link to OpenAPI spec

**Misc**
recent discussions: <https://hledger.org/support.html>

**Quotes**

- *Ledger and Hledger are some of my favourite tools.*

- *Thank you for creating such an awesome tool. I absolutely love hledger. I've been using it for more than a year, and I've become more responsible with my finances as a result. Before I started using hledger, I knew nothing about accounting. In fact, I was oblivious of my personal finances. Now, I've not only started keeping track of my finances, but I've also started investing and keeping a budget. --aaditmshah*

<https://hledger.org/news.html#this-week-in-hledger-2024-06-07>


---

## This Week In Hledger 2024-05-31

**sm**
- integrate tldr pages as --tldr
- make help -m, --man jump to TOPIC properly
- --color now also accepts y or n, like --pretty
- CLI commands list and options cleanups
- make checkembeddedfiles more robust
- tools: just twih date fixes
- release prep

Doc updates:
- Unicode characters: mention UTF-8 on windows
- update/simplify general options list
- sync command descriptions with tldr docs
- tldr contributing docs
- website: properly redirect old /FAQ path; tagline tweak
- PTA website: add first sponsor logo; mention `hledger-sankey`

**Misc**: for recent discussions, see <https://hledger.org/support.html>

**Quotes**

- *I've switched all my accounting over to hledger (a Haskell-based and slightly more feature-filled version of the original) and I'm SUPER happy with it so far.*

- *A little daily-ish data-entry-and-reconciling ritual, with a pleasant tool setup, can be quite satisfying! I actually look forward to it. (That right there is part of my PTA success story. I used to suffer a lot of stress around all things finance.)*

---

## This Week In Hledger 2024-05-24

**sm**
Actually this fortnight, since I missed a post.
Last week I finished getting hledger back into stackage nightly,
fixed build errors with GHC 8.10,
and updated github workflows.
This week I worked on release automation,
flattened and simplified page tables-of-contents on hledger.org,
updated/added more hledger docs in the tldr project,
and fixed breakage in the hledger-install.sh script on non-windows platforms.

**Misc**

- [hledger-Excel](https://github.com/phobo3s/hledger-Excel) exports from excel to journal format.
- For recent discussions, see <https://hledger.org/support.html>.

**Quotes**

*After coming from hledger, I did try firefly, but, stuck with hledger due to how amazingly powerful it is with nothing but a text input.*

*Switched to beancount ... I really didn’t lose any of my reporting flows that I had with (h)ledger... I just made scripts that convert the beancount journal on the fly, run whatever I was used to with hledger, and then delete the temporary file.*

---

## This Week In Hledger 2024-05-10

**sm**

- imp: `-I` can now be overridden by `-s` or `check`
- imp: commands list updates
- doc updates: commands list, report start & end date, smart dates, balance command
- site updates: install, FAQ reorg

**Misc**

- Docker image for 1.33.1 is available
- For recent discussions, see <https://hledger.org/support>

**Quotes**

*I use hledger for my solo-company. It is really great, and very easy to understand what is going on. Highly recommend. --koeng*

*Just start with hledger-ui and like the article said: mess it up a bunch and keep fixing it or starting over. Pick one particular "zone" of finances (eg: monthly bills) and track only that part of it for a while. You'll figure it out! --ramses0*

---



## This Week In Hledger 2024-05-03

**sm**

- fix: show trailing decimal mark on cost amounts too, when needed
- imp: Revert problematic process-1.6.19.0 bound, it seems not strictly needed [#2149]
- Released hledger 1.33.1
- dev script updates
- fix: journal: parse include directives with trailing whitespace
- imp: support ghc-debug for analysing memory/profile info
- imp: cli: commands list reorg, cleanups
- imp: check: check ordereddates before balance assertions, when both are enabled
- imp: web: provide a basic openapi specification of the current HTTP-JSON API
- doc updates: github release windows install instructions, check command, Contributor Quick Start, Developer FAQ, misc site tweaks
- examples: custom paypal csv rules

[#2149]: https://github.com/hledgerorg/hledger/issues/2149

**Misc**

- <https://kairosdotapp.github.io/kairos> invoice generator, timedot compatible

You can see recent discussions via the links at <https://hledger.org/support.html>.

**Quotes**

*It's been a while since I've been in this room, but I've been using hledger all the while. It continues to be incredible. --daveakre*

---


## This Week In Hledger 2024-04-26

**sm**
- imp: run checks in a well-defined order, and tweak that order
- imp!: check ordereddates: drop --date2 support; check primary dates only
- fix: balcmds: show digit groups marks in html output again [#2196]
- imp: web: support base64 >=1.0
- tools: retire the main Makefile
- tools: relnotes.hs: generate/update release notes from changelogs
- tools: md-issue-refs.el: manage issue links in markdown
- examples: vanguard, fidelity csv rules updates
- doc updates: import, csv amount decimal places, charts, dev docs, install page.

You can see recent discussions via the links at <https://hledger.org/support.html>.

**Quotes**

*Trust me, if you need to run some complicated analysis, (h)ledger has your back and you can find how to do it in the docs. --lvass*

*Thank you for this remarkably beautiful and useful tool. --yse*

---


## This Week In Hledger 2024-04-19

**sm**
Worked on release process, github workflows, platform build issues,
mac arm release binaries, CLI commands list, a hledger add ANSI bug,
misc doc updates, and released hledger 1.33.

**Misc**

You can see recent discussions at:
<https://matrix.hledger.org>
<https://list.hledger.org>
<https://forum.plaintextaccounting.org/latest>
<https://www.reddit.com/r/plaintextaccounting/new>
<https://fosstodon.org/search> #hledger

**Quotes**

*Been using ledger and hledger for about four years, love them
dearly. I find ledger + Emacs ledger-mode the most convenient for
daily use. Hledger has a somewhat nicer way of formatting reports on
the CLI, making it useful for creating ad-hoc reports and digging into
your data. --compns8-ng*

*I've been using hledger ... [it] has more features like balance sheet,
income statement generation with a plain text file for the last 3
years and it's been working out great. --rwbt*

---

## This Week In Hledger 2024-04-12

**sm**
Investigated/refactored/discussed a problem with boolean query expressions; disallowed date: in OR expressions [#2178].
Required process >=1.6.19.0 for HSEC-2024-0003.
Updated docs: balance assertions, balancesheetequity.

plaintextaccounting.org updates:
FAQ,
Borrowing and lending,
Investing and trading,
Shared expenses,
project ledger.

**Misc**
- [Hacker News: Double-entry bookkeeping as a directed graph](https://news.ycombinator.com/item?id=39988993)

You can see recent discussions at:
<https://matrix.hledger.org>,
<https://list.hledger.org>,
<https://forum.plaintextaccounting.org/latest>,
<https://www.reddit.com/r/plaintextaccounting/new>,
<https://fosstodon.org/search> -> #hledger.
Feel free to share interesting links (they don't have to be new) at the PTA forum.

**Quotes**

*There are few things better than doing my taxes every year and being able to confirm every number on every form with simple #hledger queries (which lets me double check both my records and the forms themselves). --Michael Rees*

*I combine hledger csv output with Jupyter to generate the specific reports and charts I need. I.e business specific versus combined for taxes. --abhiyerra*

[#2178]: https://github.com/hledgerorg/hledger/issues/2178

---


## This Week In Hledger 2024-04-05

**sm**
Doc updates ([#2189], [#2191], 
[Cookbook#investing](https://hledger.org/cookbook.html#investing-and-trading),
[A tax reporting setup](https://hledger.org/tax-reporting-setup.html)).
Added Brian Victor's [hledger-txnsbycat.hs] to the Scripts page.

On plaintextaccounting.org
I started a project [finance/donations page and public ledger](https://plaintextaccounting.org/finance);
moved blog links off the front page in favour of the PTA forum;
added a new video in Tamil language;
updated
[Investing and trading](https://plaintextaccounting.org/Investing-and-trading),
[FAQ](https://plaintextaccounting.org/FAQ).

**Misc**

Dmitry Astapov fixed the roi command's handling of --value ([#2190]).

Ellane W raised [thoughtful questions](https://fosstodon.org/@ellane@pkm.social/112200307570801031) about when to use PTA vs simpler tools like paper.

lil5 [announced](https://fosstodon.org/@lil5/112216112363013745) a Go language client API for hledger-web.

You can see the recent discussion at eg
<https://matrix.hledger.org>,
<https://list.hledger.org>,
<https://forum.plaintextaccounting.org/latest>,
<https://www.reddit.com/r/plaintextaccounting/new>,
<https://fosstodon.org/search> -> #hledger.
Feel free to share interesting links (they don't have to be new) at the PTA forum.

**Quotes**

*Having hledger have all my accounts, personal and business and being able to filter out appropriate reports has been great for seeing things like is the business a money pit or am I actually growing wealth over time. --abhiyerra*

*I use hledger and I love it. It has a learning curve (especially if you're new to double entry accounting) but it's rewarding.*

[hledger-txnsbycat.hs]: https://hledger.org/scripts.html#hledger-txnsbycaths
[#2191]: https://github.com/hledgerorg/hledger/issues/2191
[#2190]: https://github.com/hledgerorg/hledger/issues/2190
[#2189]: https://github.com/hledgerorg/hledger/issues/2189

---


## This Week In Hledger 2024-03-29

**sm**
Doc rewrites, error message improvements.

**Misc**
- More [discussion](https://forum.plaintextaccounting.org/t/hledger-how-to-calculate-interest-with-rate-changing-in-the-middle-of-the-year/208) of hledger-interest, a call for improvements,
  and a [pull request](https://github.com/peti/hledger-interest/pull/23) by Dmitry Astapov.
- Some [discussion](https://forum.plaintextaccounting.org/t/excel/219) of exporting to Excel/spreadsheets.
- How much attention to bookkeeping is just right ? [blog post](https://forum.plaintextaccounting.org/t/a-possible-to-overlook-benefit-to-using-plain-text-accounting/220)

Feel free to share your experience reports or interesting links (they don't have to be new) on the [PTA forum](https://forum.plaintextaccounting.org).

**Quotes**

- *The initial setup of the books is pretty time consuming especially if you have a lot of accounts. I recommend starting your most important accounts and adding as you go along. --abhiyerra*

---

## This Week In Hledger 2024-03-22

**sm**

I tried getting hledger-sankey (generates Sankey diagrams of cash flows) working on my real world ledger, and contributed a patch.

**Misc**

Ilya Konovalov made multi-section balance reports always show a section total even when empty, fixing their CSV output. [#2186]

You can see recent discussions at:

<https://matrix.hledger.org>
<https://list.hledger.org>
<https://forum.plaintextaccounting.org/latest>
<https://www.reddit.com/r/plaintextaccounting/new>
<https://fosstodon.org/search> #hledger

Feel free to share interesting blog posts (they don't have to be new) at the PTA forum.

**Quotes**

*A key advantage of hledger, and why I migrated from ledger, is that hledger internally orders transactions chronologically, whereas ledger inexplicably orders them in the order they appear in the file, irrespective of the date attached to them.--chromatin*

*hledger can validate date order, that seems to eliminate copy-paste-fail-to-update-date for me. --yencabulator*

*The reason I have hledger installed is for check ordereddates. --lvass*

---


## This Week In Hledger 2024-03-15

**sm**
No hledger dev work this week. The new PTA forum continues to work well.

**Misc**
docker-finance, a new cryptocurrency-supporting workflow system using hledger-flow,
and the older workflows Full-fledged hledger, hledger-flow and rtrledger,
have been added at <https://plaintextaccounting.org/#workflows>.

To save time, I won't summarise discussions this week; you can see them at:

<https://matrix.hledger.org>
<https://list.hledger.org>
<https://forum.plaintextaccounting.org/latest>
<https://www.reddit.com/r/plaintextaccounting/new>
<https://fosstodon.org/search> #hledger

Feel free to share interesting blog posts (they don't have to be new) at the PTA forum.

**Quotes**

- *Way less painful than QuickBooks if you're also a programmer or adjacent. --dmoy*

- *My favorite part of the (extensive) Haskell API is `Hledger.Cli.Script`. It re-exports all the most commonly used functions and data types, meaning you're just one import away from everything you need to get started.--wbadart*

---


## This Week In Hledger 2024-03-08

**sm**
I fixed some doc issues on hledger.org: code blocks can now be scrolled normally, and are cheerily color-coded instead of drab grey.
The 1.33 release is still pending. Another gnarly release blocker remains to fix,
and I was burned out on those.
Instead, got deeply involved in setting up a new site for PTA discussions, <https://forum.plaintextaccounting.org>.

**Robert Nielsen**
On the hledger fan website, I look at a planning mistake that's easy to make in hledger or any planning. See it at <https://hledgerfan.com/dont-make-this-planning-mistake-with-hledger>.

**Misc**
Jonathan Dowland fixed match group references in csv rules [#2158].


**[Matrix chat](https://matrix.hledger.org)**
Haskell software for Canadian tax prep, aregister print order, reporting prices effective on a date, filtering by balance size, migration issues, mint.com closure, discourse for PTA discussions, combining CSV records, CSV conversion issues, CSV rule if tables, bookkeeping success stories, downloading prices for a date range..


**[Mail list](https://list.hledger.org)**
- ANN: forum.plaintextaccounting.org
- CSV rules: if tables, do you use them ? want them ?

**[Reddit](https://www.reddit.com/r/plaintextaccounting/new/)**
- [hledger] Auto posting that excludes previously matched postings
- Question: Hledger csv first account names in csv files?
- Discourse for Plain Text Accounting discussions ?

**[Mastodon](https://fosstodon.org/search)**
- online content platforms lock-in
- PTA forum

**Quotes**

- *Journal's greenyellow really makes it pop and I think it will make us rich!* --sm

- *I started setting up hledger this year and I’m with you for a small business it is absolutely great. --abhiyerra*

- *In summary for me: hledger has better csv importing system and ledger has support for lots. I use both. --faustlast*

---


## This Week In Hledger 2024-03-01

**sm**
A lot of work this week: bugfixing, updating for GHC 9.8, and improving docs. We weren't ready to release 1.33 on March 1st, but it's near.

- web: show zero amounts with their commodity symbol [#2140]
- fix expr:'s OR-ing of open-ended dates [#2177]
- made stats output more private by default, added memory stats
- in unbalanced transaction error messages, show small imbalances more precisely
- fixed all ghc 9.8 partial head/tail warnings
- resolved remaining ghc 9.8-related issues in our dependencies
- updated all stack configs, switched to nightly/ghc 9.8 for dev builds
- added support for other unicode space characters in numbers
- added --round option to close, like print's
- fixed potential display of ambiguous balance assertion/assignment amounts [#2176]
- refactored the budget report and fixed wrong omitting of parent accounts [#2071]
- made budget report's CSV/TSV output show zero instead of empty cells
- worked on a bugs dashboard
- doc: fix description of commodity directive's scope [#2135]
- doc: explain hledger's transaction balancing
- doc: discuss debits, credits, and sign
- doc: hledger manual cleanups, fixes, flow improvement
- doc: FAQ: update why was hledger created
- doc: hledger and ledger: update performance notes
- plaintextaccounting.org: link <https://lemmy.world/c/plaintextaccounting>, a reddit alternative

**Robert Nielsen**
On the hledger fan website, I take a look at needs, strategies, and spending. Also taxes and revisiting lowercasing. <https://hledgerfan.com/needs-strategies-and-spending>

**Misc**

**[Matrix chat](https://matrix.hledger.org)**
wikipedia page, CSV rules, "Personal accounting in Ledger" book, unicode spaces in numbers, rvgp, loan bookkeeping, Open Collective, hledger manual size, file naming, emacs, visual studio code, aggregate shares bookkeeping..

**[Mail list](https://list.hledger.org)**
- Forex Accounts Receivable, timing difference between invoice and payment
- Unexpected behavior using 'expr:'

**[Reddit](https://www.reddit.com/r/plaintextaccounting/new/)**
- Examples on hledger's web page manual are cut off
- rvgp: an open-source PTA tool, that brings a proper build chain, to your accounting. Automates your Reconciliation, Validation and financial Graphing, in ruby.
- [Beancount] CLI tool to import Wise multi-currency transactions
- How to install Ledger CLI for Windows?
- [beancount] Stock Purchase Plan Qualifying Disposition
- Design patterns or idioms?
- hledger register query only on Tuesdays

**[Mastodon](https://fosstodon.org/search)**
hledger manual size, switching from gnucash, more on the reddit IPO..

**[Hacker News](https://hn.algolia.com/?query=hledger&type=comment&sort=byDate)**
- [Ledger](https://news.ycombinator.com/item?id=39492924)

**Quotes**

*Quite happy with my switch from GnuCash to hledger: already automated importing the (broken) CSV my bank provides, and getting an overview of average monthly expenses is a one-liner. --rigrig*

*The other nice part of `hledger` is the web UI (`hledger-web`), which is handy for checking out your transactions. --peterhajas*

---


## This Week In Hledger 2024-02-23

**sm**
Miscellaneous updates:
- use a symbolic link's target's directory for relative include paths
- interpret glob patterns in $LEDGER_FILE
- implicitly declare the date/date2/type tags
- add close --assertion-type option
- tweak close --assert's default description
- stack:9.8: can now build all packages
- doc: add Text encoding section
- doc: clarify description/payee/note
- doc: improve the tags doc
- doc: clarify combining csv matchers
- plaintextaccounting.org: Choosing accounts tips

**Robert Nielsen**
Inspired by a recent podcast, I look at the theme of getting the most good from limited resources. Oh, and I don't forget to mention hledger. 🙂
<https://hledgerfan.com/creating-a-positive-impact>

**Misc**
Jonathan Dowland added a `dark` theme to hledger-ui.

**[Mail list](https://list.hledger.org)**
- Forex Accounts Receivable, timing difference between invoice and payment
- Balancing "equity:conversion" split across postings.

**[Reddit](https://www.reddit.com/r/plaintextaccounting/new/)**
- How do you all handle grouping your transactions? (business)
- hledger: csv rule to match amount higher or equal to 200
- hledger periodic transaction every month except two
- Mass edit journal entries based on a filter 

**[Mastodon](https://fosstodon.org/search)**
Fund accounting, PTA sign convention, unspaced account names, reddit monetisation..

**[Matrix chat](https://matrix.hledger.org)**
Tools for investment tracking, description/payee/note semantics, tag checking, 
arithmetic amount expressions, Money Manager EX, CSV conversion situations,
categorising tools, utf-8 encoding, timedot budgets, tax preparation, if tables,
payee cleanup..

**Quotes**

- *Thank you for writing hledger (and -ui and -web), it's wonderful work. --Michael Iles*

- *Use physical order to create mental order.*

---


## This Week In Hledger 2024-02-16

**sm**
Not much time for hledger hacking this week;
support and doc tweaks, and an updated example CSV rules file for Daedalus (Cardano wallet software).

**Robert Nielsen**
On this week's hledgerfan post, I show how the "include" statement solved a problem for running an hledger command over several data files: <https://hledgerfan.com/include-was-the-key>

**Misc**


**[Matrix chat](https://matrix.hledger.org)**
Accounts vs tags, --serve-api and -X, balance assertion order, hledger.org tls cert, a visualisation of hledger compile times, stateful CSV conversion, chatGPT..

**[Mail list](https://list.hledger.org)**
- Balancing "equity:conversion" split across postings.
- How to set the opening balance in a foreign currency account?

**[Reddit](https://www.reddit.com/r/plaintextaccounting/new/)**
- Treasury Direct t-bills 
- Can hledger import use account mappings from previous transactions?
- Is it possible to sort sub-accounts in hledger reports?
- Multicurrency cash journal
- Necessity of importing history
- Open Source Software Supply Chain

**[Mastodon](https://fosstodon.org/search)**
- A `:hledger:` icon is now available on fosstodon.org thanks to @nobodyinperson and @mike.


**Quotes**

*I just discovered hledger about a month ago after being fed up with YNAB's costs and issues. I love hledger. It's amazing. Thank you for all your hard work! --megagram*

*Work smoothly and steadily. Don't rush.*

---


## This Week In Hledger 2024-02-08

**sm**
I worked on refactoring and debugging the budget report for <https://github.com/hledgerorg/hledger/issues/2071>.
Also, tweaked `close` tags, docs, and added to the PTA FAQ: <https://plaintextaccounting.org/FAQ#where-are-debits-and-credits-why-are-some-balances-negative>.
I shared this time report that I like:

```cli (just)
# what happened (this week by default ?) Show simplified time categories, largest first, grouping some similar subaccounts together.
@twhat *ARGS:
    hledger -f "$TIMELOG" bal -b thisweek -e tomorrow -WATS -2 --alias '/.*:(res|adm|it)\b/=_:\1' "$@"
```

**Robert Nielsen**
In this week's post, I share my R program for generating random ledger/hledger transactions. Useful if you want to have some dummy transactions for showing how some feature of hledger works without having to use real data.  <https://hledgerfan.com/the-code-to-generate-random-hledger-transactions>

**[Matrix chat](https://matrix.hledger.org)**
CSV conversion, bookkeeping situations, mixing balances and changes in a report, include vs -f, tracking saving goals, amazon prime fees, paisa..

**[Mail list](https://list.hledger.org)**
Foreign currency accounting, adding custom tags with `close`, multiple postings vs multiple transactions..

**[Reddit](https://www.reddit.com/r/plaintextaccounting/new/)**
- Need help with tracking a goal
- Exporting Paisa interactive visualizations
- [hledger] How do I get a specific tag column in register report
- Do you guys enter every transaction manually
- Thoughts on Beancount and PTA
- Is it possible to track mileage/mpg with ledger?
- Can I use ledger for time tracking and conversion from hours to USD?

**[Mastodon](https://fosstodon.org/search)**
..crickets..

**Misc**

Zegnat fixed line breaks in error messages displayed in hledger-web, making them much clearer:
<https://github.com/hledgerorg/hledger/pull/2163>

reesmichael1 made `ssv:` and `tsv:` work as file path prefixes, like `csv:`:
<https://github.com/hledgerorg/hledger/pull/2165>

jmtd made a dark theme for hledger-ui, testers welcome:
<https://github.com/hledgerorg/hledger/pull/2167>

brplot is a fast plotting tool for command line or wasm: 
<https://news.ycombinator.com/item?id=39319191>

**Quotes**

*If you know how to get your transactions downloaded from your bank and don't ever want to leave the command line, hledger is great for you -- I've been using hledger since 2019 and love every minute of it.*

---


## This Week In Hledger 2024-02-02

**sm**
I cleaned up issue labels, updated the ISSUES page, refined the user pain score,
worked on an issues dashboard prototype,
tweaked the tags on `close`'s new --assert/--retain modes,
and shipped [hledger 1.32.3](https://hledger.org/release-notes.html#2024-01-28-hledger-1323).

**Robert Nielsen**
[Working program to generate fake hledger transactions](https://hledgerfan.com/working-program-to-generate-fake-hledger-transactions/)

**[Matrix chat](https://matrix.hledger.org) topics**
CSV rules, --pivot, queries, -f and glob patterns, QA and bug stats, close, 1.32.3 release, forecasting, rewriting account names, decimal correctness, VAT, mixing changes and balances in a report, tracking subscribers

**[Mail list](https://list.hledger.org)**
1.32.3 release, foreign currency accounting

**[Reddit](https://www.reddit.com/r/plaintextaccounting/new/)**
- Technical Debt
- Is this possible with hledger: tracking ACB of RSUs in foreign currency and deemed dispositions when transferring to registered investment accounts?
- Correct way to track divorce / partner withdrawal in PTA
- Hledger amount comparison

**Quotes**

- SM: *too.. many.. bugs..*

- Aankhen: *I’m not encountering hledger bugs. It’s just one of the most solid things I’ve ever used.*

---


## This Week In Hledger 2024-01-26

**sm:**
Heavy work on 

- 2151 `close` design/docs/features
- 2150 a balance assertions regression
- 2153 a performance regression that has been with us since 1.29

And benchmarking generally. You can read some interesting new performance findings
and help to verify or correct them at https://github.com/hledgerorg/hledger/issues/2153.

**Robert Nielsen**
[Creating phony hledger transactions](https://hledgerfan.com/creating-phony-hledger-transactions/)

**[Matrix chat](https://matrix.hledger.org) topics:**
All the usual support topics (csv rules! reporting! journal entries!) and packaging - close - files layout - equity - Haskell learning resources - performance

**[Mail list](https://list.hledger.org):**
Breaking changes in hledger's Haskell API and JSON API/output, coming in 1.33.

**[Reddit](https://www.reddit.com/r/plaintextaccounting/new/):**
Nothing hledgerish this week, but check out:
- Gainstrack - a more accessible plaintextaccounting for personal networth tracking.

**[Mastodon](https://fosstodon.org/search):**
Crickets.

**Quotes**

- *hledger has a decent front-end web UI, it runs as a local server on your machine by default.  The filter and searching on this view is quite good, and visualization is decent.*

- *With version control and deterministic reports, you can be late, slow, make mistakes, but still keep moving incrementally towards accuracy and clarity.*

---


## This Week In Hledger 2024-01-19

**sm**
I updated issue tracker labels and ISSUES and REGRESSIONS pages. On plaintextaccounting.org, I added tables of contents on all pages, tightened bullet lists, ran a link checker and fixed broken links, consolidated to a single more prominent PTA FAQ, and wrote a new "How to organise files" answer.

**Robert Nielsen**
After much procrastination, I finally do the actual changes I had planned for my hledger data. Sed was the tool of choice, and you can read about it at <https://hledgerfan.com/first-step-in-closing-out-2023>.

**[Matrix chat](https://matrix.hledger.org)**
docs, csv rules, reports, nix, flycheck-hledger error regions, lot tracking, paycheck entries, annextimelog, tags, paypal, invoicing entries, matrix clients, balance assertions, pivoting, file organisation, receivables, account types

**[Mastodon](https://fosstodon.org/search)**
4-year regressions stats

**[Reddit](https://www.reddit.com/r/plaintextaccounting/new/)**
- Tracking an asset like stocks and their growth
- Protecting financial data with PTA
- hledger-flow year specific rules file
- hledger: import from source with different decimal marks
- Any scripts/documented methods for importing nYNAB (web) data into PTA?

**Misc**
hamess has annotated the new features in version 1.32's manuals.

**Quotes**

*Whoa this is amazing. And really easy!*

*I love hledger and have a few scripts to convert downloaded CSVs from various institutions into the appropriate format and dedupe any overlap if necessary. Once a month I download a bunch of statements, run a script and have all of the data available to me.*

---

## This Week In Hledger 2024-01-12

**sm:**
This week I worked mostly on support and thinking/writing about improvements to `close` and the new file/periodic files workflow.
I introduced some new terminology to distinguish *starting/ending files* vs *opening/closing accounts*, which are unrelated events.
I added new `--assert` and `--assign` modes to `close` and clarified a problem with using balance assignments for starting balances.
I reviewed status and proposed some changes at [Better UX around starting and ending files ? #2151](https://github.com/hledgerorg/hledger/issues/2151) -
please take a look and give your thoughts if you're interested in this.

Over on <https://plaintextaccounting.org> I checked and fixed the remaining broken links;
and surveyed and linked all the hledger and PTA [videos](https://plaintextaccounting.org/#videos) visible on youtube (they're fun, check them out).

**nobodyinperson:**
TWIH: I published annextimelog v0.10.1 and it's now in a state I would cautiously call useable for something practical as one can now record, delete and also edit logged time periods.
It's a cli git-annex based time tracker focusing on conflict-free syncing between devices and flexible tagging. 
It has timeclock output so can be piped into hledger, e.g.
```
atl ls -a project=hledger -O timeclock | hledger -f timeclock:- bal -D
```
<https://pypi.org/project/annextimelog>

**Robert Nielsen:**
[Getting ledger-mode to work again!](https://hledgerfan.com/why-i-installed-ledger/)

**[Matrix chat](https://matrix.hledger.org) topics:**
  CSV rules
, Downloading, workflows
, MCC codes
, PTA videos
, PTA site link checking
, nix
, just
, cost basis
, emacs & VS code
, annextimelog
, reporting
, SM's time and tasks dashboard

**[Mail list](https://list.hledger.org):**
- how far in advance should I put anticipated expenses in liabilities:accountspayable ?
- Better UX around starting and ending files ?
- a single, cumulative journal, or annual journal files ?

**[Reddit](https://www.reddit.com/r/plaintextaccounting/new/):**
- [hledger] Year Closing
- How to handle currency exchange via different accounts?
- Regexp in rules file

**[Mastodon](https://fosstodon.org/search):**
- Shared expenses bookkeeping
- just
- flycheck-hledger
- importing from your forecast

**Open Source Collective**, our fiscal host for project funds on Open Collective, may reduce transaction fees:
*between 15th January and 15th April, you'll see a platform tip request on every new contribution on projects hosted by Open Source Collective.
If the trial is a success Open Source Collective will lower our fee on contributions through opencollective.com, making donations more cost-effective for our Collectives.*

**Quotes**

- *each time I get the TWIH ping I get reminded to use hledger again :D But it only shows me how bad I am at managing my money 🙈😬😅*

- *hledger is so awesome. I just had to do my entire accounting for the last 1½yrs (because I'm a lazy slob) and thanks to hledger's rule files, it took just one evening.*

---


## This Week In Hledger 2024-01-05

**sm:** 
I released [hledger 1.32.2](relnotes.md#hledger-1322), which fixes bugs and adds hledger-ui on Windows.

In master I worked on
- fix check tags to ignore modified, _modified tags automatically [#2148]
- fix add,import,web: really avoid filenames ending with . on Windows [#1056]
- improve GHC 9.8 support
- add --assert and --assign modes to `close`, eg to help try alternate file migration workflows.

In docs:
- RELEASING: process updates; changelogs are now updated only in release branch
- REGRESSIONS: split the bounty between finder and fixer
- sponsors: improve Open Collective tiers, fee info, avatar display
- add: clarify that `add` does not add a default commodity symbol [#815]
- auto postings: clarify
- examples, examples/invoicing: expand READMEs, clarify status

Forgot to mention last week: 
- Did some cleanup on <https://plaintextaccounting.org>, structure and links should be a little clearer.
- Spotted a new PTA app: <https://github.com/zhang-accounting/zhang>

**Robert Nielsen:**
TWIH: Because I use Emacs, better Emacs = better hledger. See how Emacs guru Prot helped me:
<https://hledgerfan.com/better-emacs-better-hledger/>


**Misc**

- <https://hub.darcs.net/thielema/nedit/browse/hledger.nedit> A configuration for minimal syntax highlighting of HLedger journals in NEdit and XNEdit

- <https://blog.emacsen.net/profit-first-plain-text-accounting.html>

- <https://blog.emacsen.net/profit-first-constraints-plain-text-accounting.html>

- <https://www.reddit.com/r/plaintextaccounting/comments/18vvvbk/data_is_wider_than_the_terminal/>

- <https://www.reddit.com/r/plaintextaccounting/comments/18x0t0m/how_to_map_goals_with_investments/>

- <https://www.reddit.com/r/plaintextaccounting/comments/18x5izp/accessing_both_sides_of_an_entry_in_an_automated/>

- <https://www.reddit.com/r/plaintextaccounting/comments/18zgwjo/hledgerui_for_windows_where/>

- <https://www.reddit.com/r/plaintextaccounting/comments/18zxlbn/hledger_year_closing/>

- [Etymological observations on some accounting terms](https://egrove.olemiss.edu/cgi/viewcontent.cgi?article=1225&context=aah_journal)


**Quotes**

- *Plain-text accounting is great. I choose hledger for the accounts of a small side business that doesn't warrant hiring an accountant.*

- *I love hledger and have a few scripts to convert downloaded CSVs from various institutions into the appropriate format and dedupe any overlap if necessary.
Once a month I download a bunch of statements, run a script and have all of the data available to me.*



[#2148]: https://github.com/hledgerorg/hledger/issues/2148
[#1056]: https://github.com/hledgerorg/hledger/issues/1056
[#815]: https://github.com/hledgerorg/hledger/issues/815

---


## This Week In Hledger 2023-12-29

**sm:**
Fixed a tricky csv rule parsing regression [#2134](https://github.com/hledgerorg/hledger/issues/2134) and a debug logging bug.

Improved the project Justfile, improved docs.
I also improved and "described" my time and task tracking dashboard;
see <https://hledger.org/time-and-task-dashboard.html>.
(Please accept Mr. Goldberg's excellent diagram until I have time to make my own.)

And the usual support and online chatter.

**Robert Nielsen:**
How -U helped me after making an error after mistakenly entering the wrong transactions:
<https://hledgerfan.com/fixing-my-mistake-after-accidentally-adding-pending-transactions>


**Misc:**
Lots of reddit posts this week, including some hledger-related ones:

- [Is there any plain text accounting software which uses standard debits and credits?](https://www.reddit.com/r/plaintextaccounting/comments/18sbmsx/is_there_any_plain_text_accounting_software_which/)
- [Is it possible to exclude certain accounts from a report?](https://www.reddit.com/r/plaintextaccounting/comments/18ry6tr/is_it_possible_to_exclude_certain_accounts_from_a/)
- [Finding an accountant](https://www.reddit.com/r/plaintextaccounting/comments/18qzag2/finding_an_accountant/)
- [Modelling](https://www.reddit.com/r/plaintextaccounting/comments/18ok68n/modelling/)
- [Hledger rules file: Multiple postings for Revolut fees](https://www.reddit.com/r/plaintextaccounting/comments/18ju9ji/hledger_rules_file_multiple_postings_for_revolut/)
- [Help migrating my personal budget system](https://www.reddit.com/r/plaintextaccounting/comments/18g4lmz/help_migrating_my_personal_budget_system/)

And also some lively discussion on the [mail list](https://list.hledger.org),
including this [proposal](https://groups.google.com/g/hledger/c/aZXoDSQW1xk/m/vV2T_HGDAgAJ) to simplify file opening and closing balances.

**Quotes:**
*The main thing that made me switch to hledger was the ease of autogenerating transactions into a plain-text format. ...
GNUCash made recurring transactions easy but made it a lot harder to generate split transactions according to fixed splits that I regularly engage with my friends/family in.
With hledger I have a system of taking CSVs, classifying transactions using a stack of Python scripts and using them to generate hledger importable files. 
I go by hand and annotate transactions that my scripts couldn't classify/split, and then I import it into my main hledger file. 
I store all my inputs and intermediate imports in a git repository along with my main ledger file for auditability and to look at annotations. 
The ease of automation just can't be beat with PTA but it's definitely harder to use if you don't have a preference for TUI work.
Ease of writing importers was a huge driving factor when I switched to hledger from GNUCash.*

---

## This Week In Hledger 2023-12-22

**sm:**
This week I worked more on consolidating project scripts, porting make rules to just.
Also participated in timeclock discussions, did some research and brainstormed next steps.

**nobodyinperson:**
I published annextimelog v0.3.1, a git-annex based time tracker (alpha quality, bare minimum functionality),
which can export its data to hledger-readable timeclock.

<https://pypi.org/project/annextimelog>

**Robert Nielsen:**
On the hledger fan website I look at using desc as a timesaver, and why this matters: <https://hledgerfan.com/a-better-description>

**Misc:**
ShrykeWindgrace's PR upgrading hledger-ui to the new brick and vty libs has landed;
hledger-ui now runs natively on Microsoft Windows.

**Quotes of the week:**
*I’ve been using hledger for a few years. ... Every service lets you download historical data as CSV, 
which can be imported by hledger and turned into journal files and then into visual reports. ...
It’s a bespoke setup and super nerdy and is a bit of a pain, but it’s literally the only solution that works for us.*

---

## This Week In Hledger 2023-12-15
*Share your hledger/PTA user notes, dev news, achievements or experiences in the hledger matrix chat, every Friday morning (or any time, tagged with "TWIH").*

**sm:**
Bugfixing
- Issue triage, ISSUES > Prioritising doc, dashboard, new issue template updates
- hledger-web: fix --base-url, drop --file-url, better startup messages, improve tests, code cleanups, manual cleanups, code docs.

**Robert Nielsen:**
Discussion of the holiday season and hledger on the hledger fan website: 
<https://hledgerfan.com/the-holiday-season-and-hledger> 

**Misc:**
[budget-cli](https://github.com/joshcanhelp/budget-cli) - 
budget-focussed, CSV-centric, typescript PTA app
with a good [write-up](https://www.joshcanhelp.com/budget-cli)

**Quotes of the week:**
*I switched, blissfully, away from Quicken/Quickbook/Xero/all that
heavy crap to very simple and elegant textfile-based accounting
(ledger/hledger) and it's been the best and most flexible accounting
experience I've ever had. I finally feel completely in control of my
companies' books.*

---

## This Week In Hledger 2023-12-08

*Share your hledger/PTA user notes, dev news, achievements or experiences in the hledger matrix chat, every Friday morning (or any time, tagged with "TWIH").*

**sm:**
Fixed a number of issues with 1.32 and released 1.32.1.

Rewrote the hledger manual's "Budget report" section, and moved some
content to the website's Budgeting page.

Tried converting the `bake` bash scripts to `just` scripts.

Refactoring, issues, support.

**Robert Nielsen:**
On the hledger fan website, this I discuss one of the most useful ledger mode commands for Emacs. 
Also, a book recommendation for graphic design that you need to know about:
<https://hledgerfan.com/upgrading-to-hledger-1-32-a-book-on-graphic-design-and-ledger-mode-clean-buffer>

**Quotes of the week:**
*I’ve been researching the history of double entry bookkeeping
alongside learning the basics of accounting (which is how all this
started) and I think hledger and the whole universe of plain text
accounting software is super cool. Just a lovely evolution of the
method. Thanks for making it so welcoming and accessible*


---

## This Week In Hledger 2023-12-01

*Share your hledger/PTA user notes, dev news, achievements or experiences in the hledger matrix chat, every Friday morning (or any time, tagged with "TWIH").*

**sm:**

Dev:

Added easy tagged time logging to timedot format, using letters instead of dots.

Ops:

Update the stars.hledger.org redirect (we have reached the top 30 Haskell projects by github stars 🌟 🎉).

Docs:

Use `cli` class instead of `shell` for all command-line examples in hledger docs.

hledger: Amount formatting, parseability

Ledger: interoperating tips updates, more about commodity directives and balance assertions.

Videos: reorder hledger fan videos.

REGRESSIONS: cleanups, discuss real names.

Other:

Prepared change notes and released hledger 1.32 with the last quarter's changes.

I did a big cleanup on plaintextaccounting.org, which has absorbed the
wiki and now supports Obsidian-style wiki links and clickable headings.

**Robert Nielsen:**
Two things in this week's hledger fan blog. First, for beginners, some notes on reducing errors when reconciling accounts. Second, for the more advanced, a recommendation for an Awk programming book. See the details at [https://hledgerfan.com/fewer-errors-in-reconciling/](https://hledgerfan.com/fewer-errors-in-reconciling/).

**Quotes of the week:**

*It's the basis of my entire personal finance system.*

*once again, I was deeply impressed by how _useful_ hledger is, and how thoughtful it is.*


---

## This Week In Hledger 2023-11-24
*Share your hledger/PTA user notes, dev news, achievements or experiences 
in the hledger matrix chat, every Friday morning (or any time, tagged with "TWIH").*

**sm:**

Dev:

Fixes:

- Non-print-like reports no longer add trailing decimal marks (a regression in 1.31).
  Clarified the policy on number formatting adjustments made in certain reports/output formats. (#2115)
- `tag:` queries now work when reading CSV files. (#2114)
- `-o`/`--outputfile` with a .json or .sql extension now properly selects those formats.

Improvements/features:

- The `print` command has a new `beancount` output format for exporting to Beancount.
- Timedot format supports a new letters syntax for easier tagged time logging. (#2116)
- Journal format now accepts lot costs with spaces after `{`, improving Ledger compatibility.

Docs:

hledger: added "Amount formatting, parseability",
updated "Decimal marks, digit group marks", "commodity directive", "CSV > if table", "Timedot".

Ledger: added more notes on commodity directives, from chat.

Checking for errors: added tips on enforcing account lifetimes, from reddit,
and on minimising diffs in reports, from mail list.

Cookbook: added "Reporting version control stats".

Over at <https://plaintextaccounting.org/#articles-blog-posts> I started
adding blog links for 2021-2023, including ~~10~~ 33 hledger-related posts
from Robert Nielsen, Jonathan Dowland, Arsen Arsenović, and Zoran Zaric.

Misc:

Updated project finance scripts, regenerated the project ledger with
consistent precisions in assertions, updated it with the last few
months of data from Open Collective.

**Robert Nielsen:**
On the theme of the recent Thanksgiving Day, here are three ways you
can use hledger to be thankful:
<https://hledgerfan.com/using-hledger-for-thanksgiving/>.

**Quotes of the week:**
*Have been taking care of my (new) records for almost two years now
and this data is really valuable for me. Gives me very nice overview
over everything and confidence that everything is alright and so on.
Just looking at some graphs can make you feel really good - in terms
of "I know whats happening", not necessarily in "all is well",
depending on those actual numbers! 😆* --someone using Beancount

---

## This Week In Hledger 2023-11-17

Every Friday morning (or any time, tagged with "TWIH"):
share your hledger/plain text accounting user notes, dev news,
achievements or experiences in the hledger matrix chat.

**sm:**

Dev

A new hledger user pointed out in chat out that -s/--strict mode
didn't work with the import command. This exposed a bug (#2113) and
led to some reworking of the API in Hledger.Read. Until now, when
reading multiple files, -s/--strict checks were performed for each
individual file, causing spurious failures, with import and other
commands.  Now strict checks are done only once, for the overall
journal.  Also, the import command now only updates .latest files at
the end of a successful run (after successfully passing strict checks
and after updating the journal file).

Post-"Precisiongeddon" followup: updating hledger-ui and hledger-web
to show amounts with correct display precision.

Ops

Fixed a problem with cloudflare authentication that was preventing
automatic TLS certificate renewal on hledger.org.

Clarified and documented my cloudflare tokens, and moved them to env
vars so the latest caddy config could be committed.

Fixed the hledger.org webhook that was not updating the site on git push.

Enabled https for "code.hledger.org" and "site.hledger.org" short urls.

Fixed some caddy warnings, formatted the config file, added some
caddy/webhook management scripts to the site makefile.

Docs

Spent some time drafting alternate hledger manual structures and
thinking about adding a user guide.

Misc

Time breakdown this week: 52% enhancement, 35% cleanup, 13% support.

**Robert Nielsen:**
On the hledger fan website, I discuss using the aregister and print
commands to get narrow and wider views of your data:
<https://hledgerfan.com/zooming-out-and-in>

**Quotes of the week:**

*Great software btw, I appreciate your work! Been poking around with
PTA and hledger since I was laid off, and it's been incredible for
managing/extending my runway 😁 I was a Mint/Personal Capital power
user before, but this takes it to the next level. Got a new job and
I've already forecasted out the whole next year, very handy and
something I could never do before"*

*I spent some time trying to set up hledger so that I’d actually use
it.  With multiple accounts it really got tedious but I loved the
actual double entry accounting and level of detail.  My wife was blown
away by the year end summary I made with it. You can see early how
much went to taxes, fica etc etc.*

*I'm really happy how my hledger edit addon helps me quickly reconcile
transactions. After CSV-importing from all different sources (phone
notes, bank websites, etc.), I pile up the ridiculous amount of
invoices and receipts next to me, grab one after the other and execute
hledger edit amt:35.11 or hledger edit Checking desc:ALDI for example
to find and edit the transaction in my $EDITOR, no matter where that
txn was located originally.  The other way round (going through the
journal, then finding the physical invoice/receipt) turned out to be
much slower.*

*I learned one thing: `if %FIELDNAME REGEX` matches against FIELDNAME
in the CSV. I didn't know that! I always match against the whole line
and am annoyed if the order of columns makes this weird*



---

## This Week In Hledger 2023-11-10

It's time for This Week In Hledger!
Every Friday morning (or any time, tagged with "TWIH"), share your hledger/PTA user notes, 
dev news, achievements or experiences in the hledger matrix chat.

**sm:**

Dev

This week I completed the months-long yak shave that became Precisiongeddon, and it has landed in master;
see <https://github.com/hledgerorg/hledger/pull/2111> for details.
Heads up: this can change default precisions shown especially by cost and value reports - 
all for the better hopefully, but any pre-release testing is welcome. 
There's a linux binary at <https://github.com/hledgerorg/hledger/actions/runs/6804488282>.

CI (continuous integration) workflows on github have been optimised a bit:
- Scheduled weekly builds have been disabled, as they were propagating
  to forks and running wastefully there in some cases.
- Some repeated rebuilding of the hledger-lib and hledger packages
  that seems unnecessary has been stopped.
- hledger-ui no longer builds its modules twice.
- Haddock testing has been moved to the release workflows to save time.

Fixed:
- amounts in value reports can sometimes be shown unstyled / with zero decimal digits,
  <https://github.com/hledgerorg/hledger/issues/2105>
- auto postings break redundant equity/cost detection and transaction balancing,
  <https://github.com/hledgerorg/hledger/issues/2110>
  
My time log for the week shows 69% enhancement, 27% cleanup, 5% support.

Docs

As part of Precisiongeddon, I started expanding hledger's "code docs", in the Hledger module's haddock.
I spent time learning how to navigate Haddock and producing a fast-feedback authoring workflow (`make haddock-watch`).
And documented a bunch of "jargon" terms, and how we handle precision and display styles.

The "Regular expressions" manual section has been rewritten and now has examples:
<https://hledger.org/dev/hledger.html#regular-expressions>.

Unmentioned last week: I added a News page on hledger.org as a stable home
for This Week In Hledger and other news updates.

Misc

Some notable commits:
- feat: cli: Add tsv output (#869) (Peter Sagerson)
- feat: import: interpolate regex matches in field templates (#2009) (Jonathan Dowland)

There's new interest and design discussion for referencing the matched account name
in auto postings, and I have added to lukasbestle's $20 bounty to make it $100:
<https://github.com/hledgerorg/hledger/issues/1975>

**Robert Nielsen:**
For more advanced hledger aficionados, here is a diagram showing just
about every possible part of an hledger transaction:
<https://hledgerfan.com/almost-everything-you-wanted-to-know-about-hledger-transactions>.

**Quotes of the week:**

*Overall very happy with hledger so far btw!*

*And thanks for the amazing tool. Migrating to hledger has been one of the most satisfying bits of digital homesteading I’ve done.*



---

## This Week In Hledger 2023-11-03

**sm:**

Dev
- tests: add outshine headings for folding/readability (in Emacs),
  readme updates, include .test files in TAGS, clean up ledger-compat tests
- tools: bake dbgstrs - print a bunch of hledger debug messages for review
- tools: ghci :rmain - like :main, but reloads first, useful eg when changing --debug level
- WIP: imp: prices: fixes, clarify/improve semantics
- WIP: precisiongeddon: precision/rounding cleanups/fixes/tests/docs, too intricate to describe

Continuing heavy work on consistent and optimal precision handling,
and all the related yaks which keep showing up.

Seen
- https://www.chvp.be/blog/nanoledger/ nice blog post introducing nanoledger android app

**Robert Nielsen:**
Beginner's corner: What are the parts of a basic hledger transaction? Two resources for learners:
  <https://hledgerfan.com/beginners-corner-a-basic-hledger-transaction>


---

## This Week In Hledger 2023-10-27

**sm:**

Dev

- demo: avoid a bug in asciinema 2.3.0, and improve the error message when asciinema fails (#2094)
- web: fix broken "File format help" link in the edit form (#2103)
- web: access control UX cleanups: replace --capabilities and --capabilities-header with --allow, and validate it before starting the app (#834)
- web: refactor permission checking
- web: sandstorm web app cleanups; rename/reorder roles & permissions
- WIP: testing and improving amount style and precision handling in cost/value reports

Ops

- Set up a self-hosted Sandstorm server and learned how to configure it.
- Set up a public hledger-web instance in it: sandbox.hledger.org.
  Unlike <https://demo.hledger.org>, and until the spammers find it,
  sandbox is fully writable - use it as a pastebin for examples, eg.

Docs

- Contemplating: merging cookbook and examples/*; something more custom to replace mdbook

Examples

- hledger-report1: a custom compound report script, haskell and bash versions

Misc

- exploring latest Paisa, and how to use it with existing setups

Seen

- <https://www.reddit.com/r/plaintextaccounting/comments/17g0026/average_cost_capital_gains_with_hledger>
  very clear tutorial posts on (one way of) tracking investments

- *The primary reason Ledger was created was because it maintains the
  double-entry accounting equation for you: all accounts must
  balance. GUI tools never did this aggressively enough, all of them
  having some kind of feature like "check accounts" that would end up
  finding unaccountable pennies here or there.* --John Wiegley,
  <https://www.reddit.com/r/plaintextaccounting/comments/17fg4oi/why_plain_text_accounting_over_tools_like_excel/>


**chvp:**
A new Android app, NanoLedger,  was added to F-droid to facilitate adding transactions on the fly. 
  Payees, notes and accounts can all be autocompleted. 
  Give it a try at <https://f-droid.org/en/packages/be.chvp.nanoledger/>


**Robert Nielsen:**
Why I created the hledger fan YouTube channel:
  <https://hledgerfan.com/why-i-created-the-hledger-fan-youtube-channel>



---

## This Week In Hledger 2023-10-20

G'day @room. It's time for This Week In Hledger ! 
Every Friday morning, if you have any user or dev news or experiences you'd like to share, post them in the hledger matrix chat  (<https://matrix.to/#/#hledger:matrix.org>) as a message prefixed by "TWIH:". Markdown formatting and edits are welcome. On Saturday I'll publish on the hledger mail list and on mastodon.
  
**sm:**
Changes merged this week include:

Dev

- print: add --round option for more control of precisions (#2085)
- balance-assigned amounts affect commodity styles again (#2091, regression in 1.30)
- timedot: parse unitful quantities more accurately (#2096)
- Jacob Weisz has updated the hledger-web app on Sandstorm 
  (The amazing [https://sandstorm.io](https://sandstorm.io/) cloud app platform that lets you set up free private hledger-web instances with a few clicks, check it out!)

Ops

- renamed main CI workflow and branch to "ci"
- updated and committed hledger.org's caddy config and short urls (redirects)
- there's now an easy short url for trying out the hledger-web app on Sandstorm: <https://sandstorm.hledger.org>.

Docs

- moved regression bounty info to <https://hledger.org/REGRESSIONS.html>
- hledger manual > Journal > Commodity display style: rewritten
- hledger manual > aregister, hledger-ui manual > Register screen: note how separately-dated postings get combined

Examples
- justfile: forecast-import: show but don't consume future-dated forecast transactions

**Robert Nielsen:**
<https://hledgerfan.com/a-not-so-capital-idea-for-saving-time/> describes a timesaving tip for command line users. Specifically, when typing one of your account names, hledger "forgives" you if you don't match the capitalization of an account name.


---

## This Week In Hledger 2023-10-13

[hey there @room - I'd like to get a regular This Week In Hledger started, along the lines of This Week in Matrix (TWIM) ... Having a regular news heartbeat like this, even a small one, will help build our community and momentum.]

Welcome to This Week In Hledger ! Every Friday morning, if you have
any user or dev news or experiences you'd like to share, post them in
the hledger matrix chat room as a message prefixed by
"TWIH:". Markdown formatting welcome, edits welcome. On Saturday I'll
publish on the hledger mail list and on mastodon. (Inspired by This
Week In Matrix).

**sm:**

Merged

- [feat: balance: Add only-summary flag (#1012) #2086](https://github.com/hledgerorg/hledger/pull/2086) (Stephen Morgan)
- [feat: CSV rule negation #2088](https://github.com/hledgerorg/hledger/pull/2088) (bobobo1618)
- [imp: web: include account declaration info in accounts JSON #2097](https://github.com/hledgerorg/hledger/pull/2097) (S. Zeid)

WIP

- more control of display precision with `print`
- more consistent precision handling in general
- displaying zeros with consistent commodity symbol, precision etc. when possible
- bug wrangling

Docs

- [How to record journal entries](https://hledger.org/how-to-record.html#how-to-record-journal-entries)
- [hledgermatic](https://hledger.org/hledgermatic.html#hledgermatic) , a simple up-to-date workflow
- Cleanups: Common workflows, Simon's old setup

**danielchappell:**

What I like about the data format
- Double Entry accounting in human readable files, the journal files.
- Balance assignments (to check in on my cash-wallet occasionally)
- Virtual transactions (to track funds)

What I like about HLedger specifically
- static analysis cf. [https://hledger.org/hledgermatic.html](https://hledger.org/hledgermatic.html)

What I need to do my homework on
- The limitations of balance assertions in HLedger
- study haskell

What makes me cry about HLedger
- A lack of amount expressions - github issue #183, [https://hledger.org/ledger.html?highlight=expression#amount-expressions](https://hledger.org/ledger.html?highlight=expression#amount-expressions)
