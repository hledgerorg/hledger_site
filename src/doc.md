# Docs

<style>
h2 { margin-top:2em; }
h3 { margin-top:1.5em; }
</style>

hledger has lots of docs, covering different needs.
(If it seems like a lot, see [Tips for learning hledger](learn.md).)

**Start here:**

- **[hledger by example](hbe.md)** -
  a book introducing hledger gently, one step at a time.

**In a hurry ?**

- **[5 minute quick start](5-minute-quick-start.md)** -
  journal format, declarations and reports, on one page.

**The complete, authoritative reference:**

- **[hledger manual](hledger.md)**
- [hledger-ui manual](hledger-ui.md)
- [hledger-web manual](hledger-web.md)

**Other intros:**

- [A quick example](index.md#a-quick-example) (on the home page)
- [2 minute quick start](2-minute-quick-start.md) - a command line transcript
- [10 minute quick start](10-minute-quick-start.md) - an older, longer overview
- [hledger manual: Common tasks](hledger.md#common-tasks)
- [hledger manual: Journal cheatsheet](hledger.md#journal-cheatsheet)
- [Workflows](workflows.md)
- [Tutorial: Import CSV data](import-csv.md)
- [hledger and Ledger](ledger.md) (if you know Ledger)
- [hledger and Beancount](beancount.md) (if you know Beancount)

You also can read the manuals offline, using commands like
`hledger help`, 
`hledger help -l`, 
`hledger help -l print`, 
`hledger help print`, 
`hledger print -h`.

And you can see brief command examples by running
`hledger --tldr`, `hledger balance --tldr`, etc.
(Or in newer versions: `hledger help examples`, `hledger help examples balance`.)
If you install a [tldr viewer](https://github.com/tealdeer-rs/tealdeer) you'll get better output.
Or you can view these online:

- [hledger](https://tldr.inbrowser.app/pages/common/hledger), 
[hledger add](https://tldr.inbrowser.app/pages/common/hledger-add), 
[hledger accounts](https://tldr.inbrowser.app/pages/common/hledger-accounts), 
[hledger add](https://tldr.inbrowser.app/pages/common/hledger-add), 
[hledger aregister](https://tldr.inbrowser.app/pages/common/hledger-aregister), 
[hledger balance](https://tldr.inbrowser.app/pages/common/hledger-balance), 
[hledger balancesheet](https://tldr.inbrowser.app/pages/common/hledger-balancesheet), 
[hledger import](https://tldr.inbrowser.app/pages/common/hledger-import), 
[hledger incomestatement](https://tldr.inbrowser.app/pages/common/hledger-incomestatement), 
[hledger print](https://tldr.inbrowser.app/pages/common/hledger-print), 
[hledger-ui](https://tldr.inbrowser.app/pages/common/hledger-ui), 
[hledger-web](https://tldr.inbrowser.app/pages/common/hledger-web)

Here are some notable blog posts/articles:

- [Sumner Evans: Plain Text Accounting is Pretty Cool](https://sumnerevans.com/posts/money/plain-text-accounting/)
- [Amitai Burstein: Why We Chose Plain Text Accounting with Hledger](https://www.gizra.com/content/plain-text-accounting-hledger/)
- [Teo Si-Yan: Making sense of your finances with hledger reports](https://teosiyan.com/2025/07/09/hledger-commands)
- [Matt Maguire: Plain Text Accounting with Emacs](https://www.teachmaths.org/20250423-pta-emacs/) -
  [part 2](https://www.teachmaths.org/20250424-pta-emacs2/) -
  [part 3](https://www.teachmaths.org/20250530-pta-emacs3/)
<!-- - [Linux Magazine: Tracking your finances with plain text accounting](https://www.linux-magazine.com/Issues/2024/285/hledger) -->

Some other useful docs:

- **[Plain Text Accounting FAQ](https://plaintextaccounting.org/FAQ)**
- [Why hledger ?](why.md)
- **[hledger FAQ](faq.md)**
- [Release notes](relnotes.md)
- [Developer docs](dev.md)


## Videos

Short videos:

- [Coder Kaylee: Hledger in 10 Minutes: The Ultimate CLI Tool](https://www.youtube.com/watch?v=hshDr2Af2RU) (2025, 5m)
- [hledger fan: beginner lessons](https://youtube.com/channel/UCZLxXTjOqLzq4z5Jy0AyWSQ) (2019-2021, ~3m)
  - [The Basics: An hledger Transaction](https://www.youtube.com/watch?v=SSz09ThShrs)
  - [hledger Basics: 3 Must-Know Options for the Balance Command](https://www.youtube.com/watch?v=JZE5302SrtM)
  - [The Basics: The hledger Register Command](https://www.youtube.com/watch?v=C75nM7lQzJY)
  - [hledger Basics: Focus on Months](https://www.youtube.com/watch?v=U7XCbriMWGk)
  - [hledger basics: save keystrokes!](https://www.youtube.com/watch?v=Kg8u819XH4Y)
  - [hledger: looking under the hood](https://www.youtube.com/watch?v=2Gw_9faB18c)
  - [hledger: untie your data with "nots"](https://www.youtube.com/watch?v=nMt5VxZv-78)
  - [hledger: fun and profit with incomestatement](https://www.youtube.com/watch?v=U4An3AHtDkg)
  - [hledger: fast fancy formatting](https://www.youtube.com/watch?v=Hb-hK8Lc67s)
  - [hledger: who did you pay?](https://www.youtube.com/watch?v=DrMoawQBKHE)
  - [hledger: bring order to your expenses](https://www.youtube.com/watch?v=O7_--Jz0jeQ&t=2s)
  - [hledger: commands to help with reconciling](https://www.youtube.com/watch?v=gt4hm8pfMHk)
  - [hledger: shortcuts part 1](https://www.youtube.com/watch?v=ItnYCw8cgKc)
  - [hledger: shortcuts part 2](https://www.youtube.com/watch?v=0d-28UIFhlo)
  - [hledger: shortcuts part 3](https://www.youtube.com/watch?v=_3pHNICDgHc)
  - [hledger add](https://www.youtube.com/watch?v=oel7fBv1frI)
  - [hledger iadd](https://www.youtube.com/watch?v=ZuCT9EzryaI)
- nontproject intros
  - [You Need to Know Double-Entry Bookkeeping for Personal Finance, part 1](https://www.youtube.com/watch?v=L-JdL7cCiSQ) (2026, 8m, in bangla)
  - [You Need to Learn hledger for Personal Finance: Beginners Guide, part 2](https://www.youtube.com/watch?v=NERD28IGwRE) (2026, 20m, in bangla)
  - [Generate hledger Reports Like a Pro: Beginners Guide, part 3](https://www.youtube.com/watch?v=P3aPgROtkUc) (2026, 15m, in bangla)
- [TORGiren DevOpses: hledger part 1](https://www.youtube.com/watch?v=sq3E-TKufh0) (2026, 10m, in polish)

Longer talks:

- [O Clementino: Faça o Emacs olhar para o dinheiro usando o Embark](https://www.youtube.com/watch?v=4pvjwgvOtgA) (2026, 16m, in brazilian portuguese)
- [O Clementino: Gerencie suas finanças como um hacker](https://www.youtube.com/watch?v=YG2I2Z8nfoo) (2026, 23m, in brazilian portuguese)
- [Youngbin Han @ FOSS for All](https://docs.google.com/presentation/d/17kkPlLOFhpwfEIhHfT0hJ1PRmZ6-Tq7JIAdTAhjp24A/preview?pru=AAABmo3qmB4*fWFiJB8Z7cZwQbc72JsTjA&slide=id.g38f1acd61f5_0_19)
  (2025, slides, in korean and english) \
  Plain Text Accounting with hledger \
  with short videos of
  [add](https://www.youtube.com/watch?v=rh5EFnm0t_M) and
  [web](https://www.youtube.com/watch?v=zOjvSYCvXNc)
- [Glenn Ramsey @ Kiwi Pycon XI](https://youtube.com/watch?v=lazZwTmAEHs)  (2022, 30m)\
  Plain text accounting for fun and profit
- [Simon Michael @ HaskellerZ meetup](https://www.youtube.com/watch?v=6PKmZSHxu0c) (2021, 2h) <!-- apr 29 --> \
  Inside hledger: an architectural tour and how-to,
  [slides](https://rawcdn.githack.com/hledgerorg/hledger/4013a81af8dd2804c73ecac18fb3e7e4745a4275/doc/haskellerz/haskellerz.slidy.html)
- [Conversations in Code, Episode 3: Introduction to Plain Text Accounting](https://open.spotify.com/episode/2SmAVEXhh2LJP9saVLDqOy) (2020, 1h, audio only),
  [discussion](https://www.reddit.com/r/plaintextaccounting/comments/ivrbdu/announcing_a_new_podcast_fossopensource_related/)
- [Intproject Mi: Учет сделок с проводками в текстовом формате](https://www.youtube.com/watch?v=1qrFjSVav2Q) (2019, 34m)
- [Evolution of hledger (Gource visualization)](https://www.youtube.com/watch?v=WImjgQLCMuE) (2019, 38m)
- [Simon Michael @ Brainium meetup](https://www.youtube.com/watch?v=H_CdGzLbc7A) (2016, 2h) <!-- sep 2 --> \
  Hands-on with hledger
- [Chris Vollick @ DevHouse Waterloo meetup](https://www.youtube.com/watch?v=-WahFvxhCRc&t=895s) (2016, 40m) <!-- apr 16 --> \
  hledger, an open source accounting tool
- [FLOSS Weekly episode 375: hledger](https://twit.tv/shows/floss-weekly/episodes/375) (2016) <!-- feb 16 --> -
  [overview](https://www.youtube.com/watch?v=qS2UcDV_lbs) (3m),
  [full interview](https://www.youtube.com/watch?v=Xjl-wVJcYpE) (1h)
<!-- gone
- [hledger add](https://www.vincecima.com/2016/06/12/the-surprising-ease-of-plain-text-accounting.html) (2016, 30s) \
  in The Surprising Ease of Plain Text Accounting 
-->

See also:

- [Youtube: latest "hledger" videos](https://www.youtube.com/results?search_query=hledger+-heath+-joker+-letlive) (beware, there's a ton of AI slop videos - report them if bad)
- [PTA: Videos](https://plaintextaccounting.org/#videos)

## Cookbook

Additional docs, tips, and notes, grouped by topic.
(The same groups are in the sidebar.)

<!-- keep synced: sidebar groups in SUMMARY.md -->

### Getting started
- [Why hledger ?](why.md)
- [FAQ](faq.md)
- [Tips for learning hledger](learn.md)
- [2 minute quick start](2-minute-quick-start.md)
- [5 minute quick start](5-minute-quick-start.md)
- [10 minute quick start](10-minute-quick-start.md)

### Data entry
- [Create a journal](create-a-journal.md)
- [How to record journal entries](how-to-record.md)
- [How to figure out journal entries](how-to-figure-out.md)
- [Common journal entries](common-journal-entries.md)
- [Cost notation](cost-notation.md)
- [Getting prices](prices.md)
- [Tutorial: Import CSV data](import-csv.md)
- [examples/](https://github.com/hledgerorg/hledger/tree/main/examples) - examples and snippets, old and new
- [examples/csv/](https://github.com/hledgerorg/hledger/tree/main/examples/csv) - hledger CSV rules library

### Reporting
- [Report examples](report-examples.md)
- [Rewrite account names](rewrite-account-names.md)
- [Rewrite commodity symbols](rewrite-commodity-symbols.md)
- [Tags tutorial](tags-tutorial.md)
- [Charts and Graphs](charts.md)
- [Visualising discussion 2023](visualising2023.md)
- [Reporting version control stats](reporting-version-control-stats.md)
- [Making sense of your finances with hledger reports](https://teosiyan.com/2025/07/09/hledger-commands)

### Checking for errors
- [Checking for errors](checking-for-errors.md)
- [Reconciling](reconciling.md)
- [Balancing the accounting equation](balancing-the-accounting-equation.md)

### Customising
- [Editors](editors.md)
- [Change account name separator](change-account-name-separator.md)
- [Save frequently used options](save-frequently-used-options.md)

### Accounting
- [Accounting basics for PTA users](accounting-basics.md)
- [Accounting: further study](accounting.md)
- [Borrowing and lending](loans.md)
- [Foreign trip expenses](foreign-trip-expenses.md)
- [Tracking and selling inventory](inventory.md)
- [Invoicing](invoicing.md)
- [Project accounting](project-accounting.md)
- [Closing the year](closing-the-year.md)
- [A tax reporting setup](tax-reporting-setup.md)
- [Cryptocurrency tax reporting](cctax.md)
- [PTA: Choosing cash or accrual](https://plaintextaccounting.org/#choosing-cash-vs-accrual)
- [PTA: Eco accounting](https://plaintextaccounting.org/Eco-accounting)
- [PTA: Non profit accounting](https://plaintextaccounting.org/Non-profit-accounting)
- [PTA: Shared finances](https://plaintextaccounting.org/Shared-finances)
- [PTA wiki: Inventory](https://github.com/plaintextaccounting/plaintextaccounting/wiki/Inventory)
- [Youngbin Han: Plain Text Accounting with hledger](https://docs.google.com/presentation/d/17kkPlLOFhpwfEIhHfT0hJ1PRmZ6-Tq7JIAdTAhjp24A/preview?pru=AAABmo3qmB4*fWFiJB8Z7cZwQbc72JsTjA&slide=id.g38f1acd61f5_0_19) (slides, for FOSS projects)
<!-- ### Depreciation -->
<!-- [Depreciation](http://rantsideasstuff.com/posts/2018/07/08-depreciation-in-personal-finance-with-hledger) -->

### Budgeting and forecasting
- [Budgeting](budgeting.md)
- [Budgeting and forecasting (2018)](budgeting-and-forecasting.md)

### Multiple currencies
- [Currency conversion](currency-conversion.md)
- [Multicurrency tutorial (2018)](multicurrency-tutorial.md)
- [hledger manual: Cost reporting](hledger.md#cost-reporting)
- [hledger manual: Value reporting](hledger.md#value-reporting)

### Investing
- [Track investments (2020)](investments.md)
- [Track investments (2017)](track-investments.md)
- [Calculate unrealized gain](gain.md)
- [Calculate return on investment](roi.md)
- [hledger manual: Cost reporting](hledger.md#cost-reporting)
- [hledger manual: Value reporting](hledger.md#value-reporting)
- [hledger manual: Lot reporting](hledger.md#lot-reporting)
- [hledger manual: balance features](hledger.md#balance-features)
- [hledger-lots](scripts.md#hledger-lots)
- [PTA Cookbook: Investing and trading](https://plaintextaccounting.org/Investing-and-trading)
- [Average cost capital gains with hledger](https://curiousbicycle.com/post/hledger-capital-gains) 2023
- [Track foreign stock capital gains using hledger](https://curiousbicycle.com/post/hledger-foreign-stock) 2023
- [Full-fledged hledger: Manual lot tracking](https://github.com/adept/full-fledged-hledger/wiki/Manual-lot-tracking) 2024

### Time tracking
- [Converting time to money](time-to-money.md)
- [Time planning](time-planning.md)

### Scripts and add-ons
- **[Scripts and add-ons](scripts.md)**
- [Scripting hledger](scripting.md)

### User interfaces
- [User Interfaces](uis.md)
- [hledger-web tips](hledger-web-tips.md)
- [Mobile apps](mobile.md)
- [PTA: Software: UI, console](https://plaintextaccounting.org/#ui-console)

### Other software
- [Exporting from hledger](export.md)
- [hledger and Beancount](beancount.md)
- [hledger and dsq / DataStation](dsq.md)
- [hledger and GnuCash](gnucash.md)
- [hledger and just](just.md)
- [hledger and Ledger](ledger.md)
- [hledger and Obsidian](obsidian.md)
- [hledger and Paisa](paisa.md)
- [hledger and Postgres](postgres.md)
- [hledger and Quicken / Quickbooks](quicken.md)
- [hledger and SimpleFIN](simplefin.md)
- [hledger and SQLite](sqlite.md)
- [hledger and Ultorg](ultorg.md)
- [hledger and YNAB](ynab.md)

### Setups and workflows
- [Workflows](workflows.md)
- [SM's 2019 setup](sm-2019-setup.md)
- [SM's 2023 setup](sm-2023-setup.md)
- [SM's time & task dashboard](time-and-task-dashboard.md)
- [Track changes with version control](track-changes-with-version-control.md)
- [Backups](https://en.wikipedia.org/wiki/Backup), the 3-2-1 rule

## See also...

If you still haven't found what you're looking for, try these: 

- [Plain Text Accounting Cookbook](https://plaintextaccounting.org/Cookbook)
- [PTA forum: hledger tag](https://forum.plaintextaccounting.org/tag/hledger)
- [Reddit: plaintextaccounting: "hledger"](https://www.reddit.com/r/plaintextaccounting/search/?q=hledger&sort=new)
- **[Support](support.md)**
