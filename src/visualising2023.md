# Visualising discussion 2023

Last updated: 2023

Some notes excerpted from <https://www.reddit.com/r/plaintextaccounting/comments/121ka8m/how_do_you_visualize_drill_down_your_financial>.

### Allaman
...tracking my financial data on a very fine-grained level.
My only concern is, that I treat this only as a “data sink” and I do not reason over my rather sophisticated data I gathered over the years. One reason is, that I am missing an accessible approach to visualizing my data without much effort. Especially, I miss a method to drill down or compare certain categories / timeframes.

I am aware of subcommands like `reg` and `bal` or plotting with, but it always felt cumbersome for me to explore my data this way. And I say this as a “shell power user”.

Can you please share your approach to interactively visualizing, exploring and analyzing your data?

### gumnos
I tend to use `ledger csv` to export subsets of interest to a CSV file and then can import that into a spreadsheet (whether that's Excel, Libre Office, or Gnumeric or even `gnuplot`) to get a more visual representation.

I'm usually most interested in trend-lines of how much certain costs are growing. I just did one for our grocery-spend, confirming that our previously-fairly-consistent costs had gone up notably in the last year.

I've also occasionally done the `ledger csv` export and imported it into a `sqlite`database so I can run queries across it more easily. I do complex SQL as part of `$DAYJOB`so I tend to query with it naturally, unlike `ledger`/`hledger` command-line querying syntax which hurts my brain and I have to consult docs

### taviso
I just use a Makefile, `make spending` in my ledger directory generates pretty graphs and tables.

It works pretty well for me, there's just a one-time setup of customizing the report to your liking. If you use xterm, you can generate graphs with sixels and see them directly in the terminal (e.g. `set terminal sixel` in gnuplot).

### sm
I have exactly this problem (and I have been doing this since 2006!). Thanks for describing it so well. Hopefully I am paraphrasing it correctly: 

***How to achieve more big-picture clarity and actionable insight from our hledger(/PTA) data with less effort ?***

I would really love if we collectively can make some progress on this. 

Speaking for myself:

#### Things tried
- hledger-chart, bitrotted old charting prototype
- various third party charting tools on hledger CSV output
- a big org babel outline with many embedded reports, updatable/viewable in emacs or exportable as markdown/HTML (notebook  interface for reports, AKA "reporter's notebook")
- nightly/weekly reports generated and emailed by cron 

#### Things I currently do
- a flurry of incremental CLI reporting when I get motivated to find out specific things
- personalised scripts (mostly using bash) to memoise useful reports and reduce effort
- an always-running time tracking status report in a drop-down terminal
- use hledger-ui for fast browsing with drill-down and period stepping (SHIFT-DOWN/UP/LEFT/RIGHT)

#### Existing things that might help
- built in financial statements: bs, is
- hledger activity command: hledger CLI's only built in chart
- hledger-web's built-in account balance chart 
- hledger-plot addon <https://hledger.org/scripts.html#hledger-plot>
- hledger-vega scripts <https://hledger.org/charts.html#hledger-vega>
- other notes at <https://hledger.org/charts.html>
- exporting to CSV (with --layout=tidy, <https://hledger.org/dev/hledger.html?highlight=tidy#data-layout>) and using spreadsheet charts
- other software <https://hledger.org/cookbook.html#other-software>, such as>
  - exporting to Beancount and using Fava <https://hledger.org/beancount.html>
  - SQlite <https://hledger.org/sqlite.html>
  - Ultorg <https://hledger.org/ultorg.html>
  - Obsidian <https://hledger.org/obsidian.html>
  - Finances 2 <https://hochgatterer.me/finances>
  - Prudent <https://prudent.me>
  - mobile apps with reports/charts, <https://hledger.org/mobile.html>
  - Paisa! <https://hledger.org/paisa.html>
  - Jupyter or other general notebook interfaces

#### Other things that might help
- built in easy charts that display in the CLI, TUI, or WUI without extra setup
- more / more useful built in financial reports, beyond bs / is
- cloning the reports (at least) of Fava, Finances 2, or Prudent
- better docs, eg a complete practical reporting guide (hledger.org and/or PTA wiki)
- screencasts, videos, demos
- recurring news post / blogs highlighting contributed real examples/demos
- ruthless focus, pruning, creative destruction
- standardisation
- attracting more devs, writers, power users, accounting/finance know-how
- prioritisation, funding
- tabular reports in hledger-ui, hledger-web
- a more agile/rich GUI app built with flutter or some such

#### Some missing reports/charts
- income/expense bar chart
- asset/liability balance line chart
- conventional cashflow report
- built in lots report
- built in easy investment performance reports
- invoice aging report

#### Some obstacles
- tool discovery, installation, setup, learnability, usability, reliability
- generality - spanning enough needs, skill levels, platforms, data formats to attract a dev/userbase > 1
- technical debt
- bookkeeping debt
- information debt, docs debt
- complexity management, cognitive overload, maintaining working memory
- discipline, consistency, long term focus

### edk99
For text report, create a directory with multiple "args" file. Then a script to generate all the reports in 1 pdf file. You shouldn't ask for a specific report, let all be generated and see those you are interested. You set it once and just generate from time to time.

For charting, I use [superset](https://superset.apache.org/). It is a good solution if you have a server, but a bit difficult to install. You can use [hledger2psql](https://github.com/edkedk99/hledger2psql) to convert the journal to a database and you can use the docker-compose file included to install with one command.

If you don't have or don't like or don't want to have a server visualization platform installed as Superset, you can use hledger-plot from [hledger-utils](https://gitlab.com/nobodyinperson/hledger-utils). It is easier to install and you don't need a server, but a bit more complicated to create charts in my opinion.

### phblj
coming from the parallel universe of beancount...
Active analysis is a pain. You can get the data, but there aren't good built-in tools for exploration. That said, when I do have a particular question I'm trying to answer I try to spend the extra time to build it into a fava extension. After a few years I have a set of commonly-used analyses that are at least a jumping off point for whatever I'm interested in looking into next.

### ananthakumaran
I ended up building a web GUI on top of the ledger. I reduced the scope to a single country to better fit my personal usage.
<https://github.com/ananthakumaran/paisa>

\[[hledger and Paisa](paisa.md)]

### ydant
I use beancount, so Fava is my primary browsing interface, but it definitely has a lot of room for improvement. I think it's also good to have some canned reports you can quickly look at all at once, rather than having to navigate around a UI.

So the main thing I do is have a "family dashboard" Google Sheet for the key data-points my wife wants to see / that we regularly discuss.

It's really easy to write scripts to import data into a Google Sheet, and as long as you structure your formulas, pivot tables, and charts correctly (using open-ended ranges to account for more data being added by future imports of data), you can dump new data in, and have all of the summaries update automatically.

This approach is basically what [Tiller](https://www.tillerhq.com/) does, as a paid service, although I'm proposing just putting high level data into the Google Sheet (e.g. category expenses, daily/monthly/weekly snapshots, not individual transactions).

### Allaman
I wrote a [blog post](https://rootknecht.net/blog/accounting/#visualizing-and-analyzing2) describing my approach to this topic.

\[export to SQLite and build adhoc charts with Metabase]
