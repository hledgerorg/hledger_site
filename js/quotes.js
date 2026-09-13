// The index of the quote currently being shown.
let currentQuoteIndex = 0;

// The indices of quotes shown since page load, to avoid repeats until all seen.
let seenQuoteIndices = new Set();

// Get the quote at the given index.
function getQuoteAt(n) {
  const quote = quotes[n % quotes.length];
  const parts = quote.split(' --');
  return {
    text:   parts[0].trim(),
    author: parts[1] ? parts[1].trim() : ''
  };
}

// Get the index of the current hourly quote.
function getHourlyQuoteIndex() {
  return Math.floor(new Date().getTime() / (1000 * 60 * 60)) % quotes.length;
}

// Get the index of a random quote we haven't seen since page load, never the
// current or hourly quote. Once all have been seen, start over.
function getRandomQuoteIndex() {
  const hourly = getHourlyQuoteIndex();
  if (seenQuoteIndices.size >= quotes.length) {
    seenQuoteIndices = new Set([currentQuoteIndex, hourly]);
  }
  const avoid = new Set(seenQuoteIndices);
  avoid.add(hourly);
  if (quotes.length <= avoid.size) return currentQuoteIndex;
  let n;
  do { n = Math.floor(Math.random() * quotes.length); } while (avoid.has(n));
  return n;
}

// Render the quote at the given index in the quote element.
function showQuote(n) {
  const quotetextel   = document.querySelector('#quote-text');
  const quoteauthorel = document.querySelector('#quote-author');
  if (quotetextel && quoteauthorel) {
    const quote = getQuoteAt(n);
    currentQuoteIndex = n;
    seenQuoteIndices.add(n);
    quotetextel.textContent   = quote.text;
    quoteauthorel.textContent = quote.author ? '-- ' + quote.author : '';
  }
}

// Fade duration in ms for the hourly quote change; keep in sync with the
// .quote opacity transition in index.md.
const HOURLY_FADE_MS = 500;

// Show the current hourly quote instantly, and schedule an update on the next hour.
function updateQuote() {
  const quoteel = document.querySelector('#quote');
  if (quoteel) {
    showQuote(getHourlyQuoteIndex());
    quoteel.style.display = 'block';
    scheduleNextQuoteUpdate();
  }
}

// Fade to the current hourly quote, and schedule an update on the next hour.
function fadeToHourlyQuote() {
  const quoteel = document.querySelector('#quote');
  if (quoteel) {
    quoteel.style.opacity = '0';
    setTimeout(() => {
      showQuote(getHourlyQuoteIndex());
      quoteel.style.opacity = '1';
    }, HOURLY_FADE_MS);
    scheduleNextQuoteUpdate();
  }
}

// Schedule a quote update on the next hour.
function scheduleNextQuoteUpdate() {
  // Calculate milliseconds until next hour
  const now = new Date();
  const msUntilNextHour = (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000 - now.getMilliseconds();
  // Set initial timeout to sync with the hour
  setTimeout(() => {
    fadeToHourlyQuote();
    // Then update every hour
    setInterval(fadeToHourlyQuote, 60 * 60 * 1000);
  }, msUntilNextHour);
}

// On page load, show the current hourly quote, and start an hourly updater.
// Clicking the quote shows a random one.
document.addEventListener('DOMContentLoaded', () => {
  const quoteel = document.querySelector('#quote');
  if (quoteel) {
    updateQuote();
    quoteel.addEventListener('click', () => showQuote(getRandomQuoteIndex()));
  }
});

// Quotes in markdown format. Each is one paragraph, ideally followed by "-- AUTHOR".
// They are ordered roughly chronologically, though sometimes grouped by author.
const quotesmd = `

The primary reason Ledger was created was because it maintains the
double-entry accounting equation for you: all accounts must
balance. GUI tools never did this aggressively enough, all of them
having some kind of feature like "check accounts" that would end up
finding unaccountable pennies here or there. --John Wiegley

And thanks for the amazing tool. Migrating to hledger has been one of the most satisfying bits of digital homesteading I’ve done.

Overall very happy with hledger so far btw!

I learned one thing: if %FIELDNAME REGEX matches against FIELDNAME
in the CSV. I didn't know that! I always match against the whole line
and am annoyed if the order of columns makes this weird

I'm really happy how my hledger edit addon helps me quickly reconcile
transactions. After CSV-importing from all different sources (phone
notes, bank websites, etc.), I pile up the ridiculous amount of
invoices and receipts next to me, grab one after the other and execute
hledger edit amt:35.11 or hledger edit Checking desc:ALDI for example
to find and edit the transaction in my $EDITOR, no matter where that
txn was located originally.  The other way round (going through the
journal, then finding the physical invoice/receipt) turned out to be
much slower.
--Yann Büchau

I spent some time trying to set up hledger so that I’d actually use
it.  With multiple accounts it really got tedious but I loved the
actual double entry accounting and level of detail.  My wife was blown
away by the year end summary I made with it. You can see early how
much went to taxes, fica etc etc.

Great software btw, I appreciate your work! Been poking around with
PTA and hledger since I was laid off, and it's been incredible for
managing/extending my runway 😁 I was a Mint/Personal Capital power
user before, but this takes it to the next level. Got a new job and
I've already forecasted out the whole next year, very handy and
something I could never do before

once again, I was deeply impressed by how *useful* hledger is, and how thoughtful it is.

It's the basis of my entire personal finance system.

I’ve been researching the history of double entry bookkeeping
alongside learning the basics of accounting (which is how all this started)
and I think hledger and the whole universe of plain text accounting software is super cool.
Just a lovely evolution of the method. Thanks for making it so welcoming and accessible.

I switched, blissfully, away from Quicken/Quickbook/Xero/all that heavy crap
to very simple and elegant textfile-based accounting (ledger/hledger)
and it's been the best and most flexible accounting experience I've ever had.
I finally feel completely in control of my companies' books.
--wolverine876

I’ve been using hledger for a few years. ... Every service lets you download historical data as CSV,
which can be imported by hledger and turned into journal files and then into visual reports. ...
It’s a bespoke setup and super nerdy and is a bit of a pain, but it’s literally the only solution that works for us.
--statico

The main thing that made me switch to hledger was the ease of autogenerating transactions into a plain-text format. ...
GNUCash made recurring transactions easy but made it a lot harder to generate split transactions according to fixed splits that I regularly engage with my friends/family in.
With hledger I have a system of taking CSVs, classifying transactions using a stack of Python scripts and using them to generate hledger importable files. 
I go by hand and annotate transactions that my scripts couldn't classify/split, and then I import it into my main hledger file. 
I store all my inputs and intermediate imports in a git repository along with my main ledger file for auditability and to look at annotations. 
The ease of automation just can't be beat with PTA but it's definitely harder to use if you don't have a preference for TUI work.
Ease of writing importers was a huge driving factor when I switched to hledger from GNUCash.
--Karrot_Kream

Plain-text accounting is great. I choose hledger for the accounts of a small side business that doesn't warrant hiring an accountant.
--bogle

hledger is so awesome. I just had to do my entire accounting for the last 1½yrs (because I'm a lazy slob) and thanks to hledger's rule files, it took just one evening.

each time I get the TWIH ping I get reminded to use hledger again :D But it only shows me how bad I am at managing my money 🙈😬😅

I love hledger and have a few scripts to convert downloaded CSVs from various institutions into the appropriate format and dedupe any overlap if necessary. Once a month I download a bunch of statements, run a script and have all of the data available to me.

Whoa this is amazing. And really easy!

With version control and deterministic reports, you can be late, slow, make mistakes, but still keep moving incrementally towards accuracy and clarity.
--sm

hledger has a decent front-end web UI, it runs as a local server on your machine by default.  The filter and searching on this view is quite good, and visualization is decent.

I’m not encountering hledger bugs. It’s just one of the most solid things I’ve ever used. --Aankhen

If you know how to get your transactions downloaded from your bank and don't ever want to leave the command line, hledger is great for you -- I've been using hledger since 2019 and love every minute of it.

Work smoothly and steadily. Don't rush.

I just discovered hledger about a month ago after being fed up with YNAB's costs and issues. I love hledger. It's amazing. Thank you for all your hard work! --megagram

Use physical order to create mental order.
--sm

Thank you for writing hledger (and -ui and -web), it's wonderful work. --Michael Iles

The other nice part of hledger is the web UI (hledger-web), which is handy for checking out your transactions. --peterhajas

Quite happy with my switch from GnuCash to hledger: already automated importing the (broken) CSV my bank provides, and getting an overview of average monthly expenses is a one-liner. --rigrig

I've been using hledger for two years now, and I don't use any exported data from my banks. Here's my workflow:
Everytime I make a transaction, I put a note on my phone. The note is a simplified version of hledger file format. ...
each block is started with the date, and each line corresponds to a journal entry. 
In each entry, the first item is the dollar amount, the 2nd item is the credited account, the 3rd item is the debited account, and the rest will be taken as the entry description.
Every week end, I will parse this note with a Python script that I wrote, and put the output in the actual journal file. 
The shorthand account names in the note will be converted into actual account name (e.g. 'bank1' to 'assets:bank:bank1'), based on a dictionary file.
I'd then proceed to manually check that all ending balances in hledger match with the actual amount in the real world. (It's pretty satisfying to see the numbers match.)
After I've finished processing the note from my phone, that note will be archvied and I will start with a new note.
--abfar

In summary for me: hledger has better csv importing system and ledger has support for lots. I use both. --faustlast

I started setting up hledger this year and I’m with you for a small business it is absolutely great.
Some notes:
- The initial setup of the books is pretty time consuming especially if you have a lot of accounts. I recommend starting your most important accounts and adding as you go along.
- Mass changing categories is just a search and replace so I have been getting pretty fine grained with the categories as I go along.
- Being a small business the separation from business and personal is needed from a legal standpoint, but from a practical standpoint I live off an owner’s draw and a put cash into the LLC when investing in its growth. Having hledger have all my accounts, personal and business and being able to filter out appropriate reports has been great for seeing things like is the business a money pit or am I actually growing wealth over time.
- I combine hledger csv output with Jupyter to generate the specific reports and charts I need. I.e business specific versus combined for taxes. This filtering also has me thinking of other ideas like figuring out which credit cards to apply for based on my expenses.
Overall more fine tuned than what I have been able to achieve with Quickbooks over 8 years.
--abhiyerra

journal's greenyellow really makes it pop and I think it will make us rich!
--sm

My favorite part of the (extensive) Haskell API is Hledger.Cli.Script. It re-exports all the most commonly used functions and data types, meaning you're just one import away from everything you need to get started. --wbadart

I generally despise having to do double entry bookkeeping in the first place, but when I do (in some situations you have to), I use ledger (or hledger). Way less painful than QuickBooks if you're also a programmer or adjacent. --dmoy

The reason I have hledger installed is for check ordereddates. --lvass

hledger can validate date order, that seems to eliminate copy-paste-fail-to-update-date for me. --yencabulator

A key advantage of hledger, and why I migrated from ledger, is that hledger internally orders transactions chronologically, whereas ledger inexplicably orders them in the order they appear in the file, irrespective of the date attached to them.--chromatin

I use hledger and I love it. It has a learning curve (especially if you're new to double entry accounting) but it's rewarding.
--prsy

Having hledger have all my accounts, personal and business and being able to filter out appropriate reports has been great for seeing things like is the business a money pit or am I actually growing wealth over time. --abhiyerra

There are few things better than doing my taxes every year and being able to confirm every number on every form with simple hledger queries (which lets me double check both my records and the forms themselves). --Michael Rees

I've been using hledger ... has more features like balance sheet,
income statement generation with a plain text file for the last 3 years
and it's been working out great. --rwbt

Been using ledger and hledger for about four years, love them dearly.
I find ledger + Emacs ledger-mode the most convenient for daily use.
hledger has a somewhat nicer way of formatting reports on the CLI,
making it useful for creating ad-hoc reports and digging into your data. --compns8-ng

Thank you for this remarkably beautiful and useful tool. --yse

Trust me, if you need to run some complicated analysis, (h)ledger has your back and you can find how to do it in the docs. --lvass

It's been a while since I've been in this room, but I've been using hledger all the while. It continues to be incredible. --daveakre

Just start with hledger-ui and like the article said: mess it up a bunch and keep fixing it or starting over. Pick one particular "zone" of finances (eg: monthly bills) and track only that part of it for a while. You'll figure it out! --ramses0

I use hledger for my solo-company. It is really great, and very easy to understand what is going on. Highly recommend. --koeng

Switched to beancount ... I really didn’t lose any of my reporting flows that I had with (h)ledger... I just made scripts that convert the beancount journal on the fly, run whatever I was used to with hledger, and then delete the temporary file.

After coming from hledger, I did try firefly, but, stuck with hledger due to how amazingly powerful it is with nothing but a text input.

A little daily-ish data-entry-and-reconciling ritual, with a pleasant tool setup, can be quite satisfying! I actually look forward to it. (That right there is part of my PTA success story. I used to suffer a lot of stress around all things finance.)
--sm

Thank you for creating such an awesome tool. I absolutely love hledger. I've been using it for more than a year, and I've become more responsible with my finances as a result. Before I started using hledger, I knew nothing about accounting. In fact, I was oblivious of my personal finances. Now, I've not only started keeping track of my finances, but I've also started investing and keeping a budget. --aaditmshah

Ledger and Hledger are some of my favourite tools.

I've switched all my accounting over to hledger (a Haskell-based and slightly more feature-filled version of the original) and I'm SUPER happy with it so far.
--nlh

My primary consumption method is hledger-ui, a nice curses-based UI. It's got a watch mode so will update in real-time as you make edits to the source database, which is nice.
--nlh

I switched away from Quickbooks, years ago, to plain text accounting. Couldn't be happier. I can do everything better using hledger/ledger, git, vim and make.
--_td9r

I liked that hledger had a few reports that ledger didn't have, like real balance sheets and income statements. Both integrate well with emacs, but their journal files differ in slightly incompatible ways, so they're not drop-in replacements. Both are very fast.
--projektfu

It just keeps getting better --glguy

Every time I think hledger is missing something I always find either the exact feature I was looking for or two things that coupled together accomplish what I need it to do. --vm

Now I use hledger, which has been fantastic. I back up the file to a shared drive that's sync'ed to my phone, so every time I get a message from the bank or pay with cash, I can immediately note it down (this would have been much less workable before I found the "cone" app) and track my spending across dozens of accounts.

+1 for plain text accounting. I'm using hledger to track my finances. I do use the web UI to submit information but I edit the plain text store extensively.

I have it running on my laptop at all times (a window in my tmux config displays various reports on my accounts like current balance, uncleared balance, uncleared transactions, etc.). I find it helps me to be mindful of my money if it's only a couple keypresses away.

It's hugely valuable to have all of your financial data in one, human-readable place. Not only to you, but to whomever might be executing your will ;) --jibcage

I just moved my whole financial life over to hledger and oh my goodness I’m so much happier (I dumped both QuickBooks and Quicken, which I’d been using previously).

It is very satisfying to get a report of my last 10 years swiftly over the weekend. Thanks for the software :) -- droidoneone

I took the plunge into PTA with hledger to draft my company's books in 2023 and to escape the torture of QuickBooks in a multiple-currency world. I am pleased to report that I have succeeded in completing my fiscal year 2023 recordkeeping and my accountants have not fired me. Moreover, I feel like I will actually have a head-start on 2024 and will be able to do *gasp* tax planning, rather than feeling like I'm always playing catch-up.
Many thanks for the help I've received to get me to this point! I'm a believer. --jbrains

I periodically download bank csv and convert it to the hledger/ledger format, auto-assigning categories (accounts) based on a rules file that I update as needed (typically one or two new rules per month). At tax reporting time I use hledger to total up each income/expense account for the reporting period, and I plug those numbers into my accountant's tax form generating app. After a few iterations, my chart of accounts has clarified and the process has become pretty routine. --sm

I was not very happy with YNAB recently (for various reasons), and by coincidence I came across an article on Hacker News where PTA was mentioned. So I ended up with hledger and I have to say: so far no regrets! Thanks a million for the great software! --kokomuck

I use hledger for the nice web ui: demo.hledger.org --philips

Also, just wanted to take a moment to express my gratitude for this amazing tool, and the whole PTA ecosystem as well! Just saving my poor programmer brain from having to muddle through spreadsheets is already a huge bonus! --avrahamappel

I can second that hledger is great. As a bonus, hledger-web makes it possible to also modify data, making it usable alternative to command line tools. --markokocic

Feels great to be able to track things in such details for free. And actually own all of the data. Great piece of software --maximrichter

Just use hledger, which offers hledger-web, put it online behind a nginx and you are done.
It uses ledger compatible transaction files which can you edit and inspect manually if needed, offers a bunch of additional functionality, and is a joy to use, both the web and command line version. --levosmetalo

The ledger didn’t work out for the first time - the manuals and HOWTOs were overcomplicated with examples of processing credit accounts, stock accounts, debts and so on. I’m almost never used all of these in my life (I’m living in one of CIS countires and usually we do not have enough money to use credits or stocks like financial instruments here).
Also, all of the guides assumed that I was budgeting on a rolling basis - without two-week periods, like I do.
--Eugene Andrienko

Maybe it's about the tools? I could never bother myself tracking my expenses in any application I tried until I started using plain old ledger (actually hledger) from the command line. Only then it started to feel almost effortless. --levosmetalo

I use hledger and hledger-web. It's mostly compatible with ledger with some nice features on top and a web interface. --levosmetalo

I'm loving what hledger can do with my data --ellane

The nicest thing about hledger and the original is the extremely simple file format. It allows you to write your own pretty easily (especially if you stick to the very simple format of a bunch of transactions). I wrote one for my use. --howeyc

Thank you for hledger. After front-loading the cli learning curve, I am recognizing it to be, for small business purposes, more practical than commercial products such as Quicken. That is saying a lot, considering the true development cost behind a program like Quicken with long-term corporate investment. --czerny2018

The other really big win [of Ledger] is that you can put your accounting in source control. I can not express to you the amount of ass-saving this has brought me. ...  I can find out what the ledger said at any given date. And I have incredibly readable diffs. This last point is so incredibly important that I could not ever possibly think of using GnuCash again. --mikekchar

One nice feature of hledger is its csv rules system, which is very flexible. -- faustiast

I'm an on-again, off-again contributor to GnuCash but I really like ledger too, and especially hledger because just knowing it's Haskell puts my mind at ease about several things. --yawaramin

Just going on record to say that plain text accounting is everything I hoped it would be. I'm keeping up to date with data entry, and finally seeing patterns that are helping me plan ahead. --ellane

Wow, hledger looks impressive. I think I'll use it as an example for when people ask for a "real world haskell program" as it has a web interface, gui (I think I saw one), is cross platform, and only requires downloading the executable. --codygman

I really like how I can complicate things at my own pace: import rules messing up some transactions but no spoons to fix it now? Just add them manually, and the journal is still fine. --rigrig

I just started using hledger for personal double-entry bookkeeping. So far it is pretty awesome. Some of the things I like over, say, Mint:
- I can keep arbitrary asset, liability, and expense categories in a tree-like structure.
- I can split up transactions between different accounts. This is useful because I can split a dinner bill between my credit card and cash. It is also useful because I can split items from a large Amazon order into their respective categories.
- The ledger file is a very simple text file, so I can keep it in version control.
- I haven't taken advantage of the report features yet, but they look very flexible. You can add up any accounts you want based on regular expressions.
- You can have "virtual" accounts that can be used for budgets. For example, you can set aside arbitrary chunks of your savings account for different purposes and keep track of them separately, even though they all actually reside in your savings account at your bank.
--jdreaver

I have massively enjoyed using hledger and am incredibly impressed with how active the development and support for it are! --Pixelized

I really enjoy the ease of plaintext accounting. (h)ledger rules! --linuxlover2

Hledger is not a "silver bullet" that automatically calculates all the necessary things for you. It is like a small database, that allows you to SELECT data from financial transactions, filter them by account name or by date. And with a nice ability to convert from one currency to another "on the fly". --Eugene Andrienko

I've been using hledger for almost 9 months now and I must say that it's been incredible. Never before have I been able to track and manage my personal finance this efficiently. --shradha408

New convert here. I’m a software developer with a cursory understanding of double-entry bookkeeping (and basically nothing else about accounting) from school, way back when. I’ve wanted more detailed tracking of my finances for a while now, found the whole PTA community about a week ago, and started using hledger a few days ago. It took some effort to enter the current state of my finances (and will require a lot more to fill in past years), but I’d really like to thank Simon Michael and everyone else involved with hledger, its forebears and inspirations, and the community at large. I always believed this sort of deep understanding of my finances was out of my reach without training and opaque software. Instead, you’ve made this vastly complicated subject accessible even to someone like me. --Shiv J. M.

As a programmer, I find ledger/hledger/beancount to be the most convenient way to do things. My text editor is already an extension of my hands. I can use any version control I want. I can write my own reports using any language I want. I can write code to automate transactions and I can do it in any language I like. --mikekchar

hledger focuses on testing and correctness alongside comprehensive documentation, giving me a much better picture of its capabilities. I dove in and spent a week entering a year and a half of data, which was enough to convince me. hledger is truly an amazing tool. I can’t count how many times I’ve thought wouldn’t it be nice if… only to realize it can already do that, or how many times I’ve been disappointed at an apparent bug only to realize I was the one at fault. I don’t know how much is unique to hledger and how much comes from its precursors or contemporaries, but I’m also struck by all the thoughtful touches, like having both aregister and register, or having all of =, ==, =*, and ==* for balance assertions. The attention to detail is marvelous. I have to assume that, whatever the provenance, this flexible competence is born of real use and familiarity. I couldn’t help overflowing with praise in the very friendly Matrix room --Shiv J. M.

What you'll like about hledger and ledger CLI is a) the undo function of your favourite text editor and b) separate files that you can include into a master c) awesome reports on the terminal. --TomK32

This week, I used hledger to help an overwhelmed relative decipher their bank activity. ... Even though there were a significant number of transactions we simply could not interpret thanks to the poor quality of the data itself, this was enough for register, aregister, and balance to answer any questions. I was able to account for almost every penny with a high degree of confidence, categorize expenses, and make projections for the future based on the patterns I saw. It took less than an hour from when I started entering the data to turn the terrifying unknown into the mundane, comprehensible known, and I can never put a price on the peace of mind it gave us all. --Shiv J. M.

With auto sync and hledger, I've gone from my budget taking 1 - 2 hours a week to 10 - 20mins. No more hunting for that one typo that meant my budget didn't balance with my bank balance.
hledger has also been fantastic as far as help. I've jumped on IRC a few times for help and bug reports. The lead dev has been amazing. Fixing bugs the same day and offering help on using hledger. --xupybd

Adopting hledger for plain text accounting has paid dividends in more ways than I can count. It’s brought order to my somewhat chaotic finances and allowed me to track details I was barely aware of, freeing me from the vague sense of unease that used to occasionally creep into my mind when I wondered, for instance, how much I was spending on food. --Shiv J. M.

My partner and I have been tracking all our spending for the last five years with hledger (ledger reimplemented in haskell) and some custom import and management scripts inspired by "Full-fledged hledger" [1]. More recently we added Plaid [2] for auto-importing from financial accounts. I love having a plain-text history and being able to ask complex queries.
One unexpectedly-sweet benefit is that your spending is a high-granularity record of where you have been and what you have been doing, encoding some signals you might not have thought to write in a diary. Things like "that was when we were saving for our down payment" or "I was going to coffee shops every day trying to finish my dissertation" or "that was when we had a pandemic." I enjoy looking back through our ledger the same way I enjoy going way back in my gmail history. --cproctor

I've been using hledger for managing my personal finances for a few years now, and I'm really happy with it! --guivho

+1 for full-fledged hledger! I just got it set up last week, and putting together the small scripts for parsing all of the CSVs was (to me) a fun programming exercise that reaped huge visibility into how I spend my money :) --jibcage

Thanx for all time and effort you put in this and the whole hledger project, kudos to you all! --guivho

also highly recommend its tui (hledger-ui) --karlicoss

I'm glad I found this community and a eco system of PTA. I'm learning so much about this everyday as I'm in a process of learning accounting and also hledger. -- rickx34

I finally ditched QuickBooks / Quicken / all that crap and moved everything personally & for my consulting company over to hledger (which is just a slightly fancy version of ledger).
Turns out, everything I hated about QuickBooks for all these years centered around its inability to bulk-edit transactions or categorize/recategorize things en masse, leading to countless hours wasted clicking or, worse, those bulk journal entires to move things from one place to another (which forces you to follow a breadcrumb path of asset movements, which is a nightmare).
But when everything is just a list of things in a text file, you get the power of every great text editor on earth (vi, emacs, or whatever) and can make mass changes trivially. Life's much much much much better this way. --nlh

I landed on hledger when researched open source and plain text options. It does everything we need it to:  journal entries and quarterly reports like balance sheet, income and expense reports. You do need to be somewhat comfortable with interfaces like your command line terminal and Emacs but the instructions and documentation for it are clear for beginners from my experience.
For day to day journal entries I use hledger-web. It’s pretty much perfect in terms of elegant simplicity and functionality. It’s well documented and the hledger community is active, generous, and kind. --bitsonchips

I started using hledger because of:
- tracking irregular payments from a bunch of sources, often outstanding for a while;
- tracking how much somebody owes me / i owe them;
- being pretty much cash-only for a long while (long story). with cash, if you don't track the expenses manually, you wake up at the end of the month with a whole bunch of money gone and no idea what happened to it;
- not knowing how much money i actually have available because it's spread across my wallet / bank account / paypal / piggy bank.
hledger really helped me not go crazy with all of this!
PS. another unexpected benefit - tracking expenses can also help with ambient worries like "ugh i spend too much on takeout food". 
like, if you track it, at the end of the month you can look at how much you spent on it and conclude that it's actually reasonable (within your budget) and stop feeling guilty about it!
--uryga

I discovered hledger last week and I hope it's not too early to describe it as life-changing. thank you for building this software --gnidan

hledger is another open-source CLI tool for accounting that works amazingly well for me. You can add transactions editing in plain text too and there is a basic web UI on top of it. --diibv

can confirm after 3 months: so far hledger usage appears to be life changing --gnidan

I used hledger for years it was great. --xupybd

over the past year I've become a daily user of hledger, my workflow has gotten quite sophisticated and I can get 99% of what I need. It's amazing, thanks so much for anyone/everyone involved. -- Peter Linsley

Many thanks to Simon Michael for not only that wonderful program but also being so responsive. --chromatin

I originally had a question I wanted to ask but then I read through part of the manual and got most of it and a different angle I hadn't quite considered answered; so I'm just stopping by to say thanks for the effort of documenting this in so much detail. --j416

Simon is an amazing project owner. He and his documentation are the reasons I like hledger over the alternatives. --xupybd

Thank you for maintaining the compendium. I love hledger docs. --Aaron Fiore

Emacs users should look into Flycheck integration, eg flycheck-hledger. Real time indication of parse and balance errors as you edit is nice! --sm

I use hledger only for the things I want reports of (taxes, utilities etc split with spouse, money spent on specific hobbies, etc; not restaurants etc).
Entering everything into ledger is mind-numbingly boring.
Outside of automatic git hooks for validation, I really only run hledger when reconciling balance with spouse or when reporting taxes. --yencabulator

I used to keep track of everything in a spreadsheet that had all expected paycheck deposits and bill expenses plotted out for the year. It was great being able to see at a glance if the checking account was in danger of going in the red. Ultimately I moved to a double-entry system using hledger. It's a little less convenient for seeing future balances, but a whole lot more flexible. --twilight00

I use it for many things ...
- Tracking pending payment from clients
- Keeping track of my expenses in various sectors, food (groceries, eatout), books, magazine subscriptions, etc
- Keeping track of my current balance accounts across various currency deposits
- Loans I give to people, and gifts I give to people
- Creating virtual envelopes to segregate my savings account money for my goals like travelling, buying gifts for someone, investment goals, etc
This has helped me tremendously
- for reducing my eatout habits and eating more at home by realising just how much I was wasting money by eating out daily, and inputting the saved amount into compound interest calculator to realize potential lost income and wealth from putting those into an index fund account
- to keep track of pending payments from clients and calculating my real cashflow against cashflow based on expected income
- reduce my impulsive spending, by tracking my savings account money with virtual envelopes aka 40% for investment goals, 1% for gifts, etc, it helps me to not just see a big balance on my account and start spending it away seeing that money as segregated chunks in my mind helps me stay in my lane.
- I have a program that generates all sorts of charts to track my wealth growth over time, expense growth and decline across categories, which I then dump into a webpage with my notes on how the changes were a net positive or negative outcome on my life, I do it annually to decide what I’ll do next
- I also have a python script that takes my ledger file and converts it into an excel sheet to send it to my chartered accountant to file my annual taxes
I also maintain a separate ledger file for my business (I dont maintain that one manually, I just export the data from accountant’s software, to do my own calculations at home)
- I use it to calculate cashflow projections to predict how my expenses might potentially grow with rise in revenue
- Track categories of spending to spot anomalies in spend across departments
- Calculate whether I should hire more or raise marketing spend, calculate metrics like ROIC (Return on Invested Capital)
The double entry helps me catch discrepancies in accounting if any, by importing bank statements and generating a ledger from that, I have accounts separated by usecase (discretionary spends, employee perks, business inputs) , with each one getting deposit from main account weekly. I use that to calculate if somethings odd and books are all cool.
I have had trouble before with an accountant running pseudo expenses on my books without telling me, just to impress me by showing a high taxes saved, without being transparent, landed me in court once, with a huge fine with late penalties.
Now I dont trust accountants and make sure I double check no matter what.
Plus I have a lot of automation scripts and stuff, imports from stripe account, imports from bank statements, accountant’s own ledger, etc
I match them all with python scripts and try to look for discrepancies.
I love plain text accounting, as a programmer it works for me, I automated a ton of it, and I have tons of my own macros and shortcuts in my code editor(vim) to make things very easy and simple,
I love it overall, I built out my own system on top of hledger across the years.
--teitoklien

Plain Text Accounting has become significantly easier to do for me on a regular basis, thanks to LLMs. Specifically: importing bank statements into hledger and avoiding manual entry.
I use a JSON file to map bank entries to my hledger accounts. For new transactions without mappings, I run a Python script that generates a prompt for Claude. It lists my hledger accounts and asks for mappings for the new entries.
Claude returns hledger journal entries based on these mappings, which I can quickly review.
Then another script prints out hledger journal entries for that month's bank transactions, all cleanly mapped. It takes me just a few minutes to tweak and finalize.
I can also specify these mapping instructions in plain-language which would've otherwise been a fragile hodgepodge of regexps and conditionals.
--jasim

I’m a huge ledger fan (hledger specifically) and have used it to run my entire accounting life for the past 8 years or so.
A few tips:
- Resist the urge to break up your various accounts into too many separate files. I tried that and went back to one file per account per year (aka “venmo-2024.hledger”). Also helps with below…
- GitHub CoPilot is remarkably and shockingly good at working with ledger files. It will do the balance addition/subtraction on following lines almost perfectly. 
  Also, if you need to manually enter a new line, you can often just enter a shortcut one-line comment and it’ll fill the entire entry
--nlh

This is the big advantage of hledger. It has two ways of translating csv into journal form - one simple and one more complicated, but very flexible.
I find it best to have a separate journal for each downloaded account. I just include them into a master journal (along with a manual entry journal) and generate reports from that.
I also use git so I can roll back the latest import, if something goes wrong - but that hasn’t happened yet. --wrycoder

Hledger is AWESOME --teitoklien

finally settled on hledger. Like GnuCash, I own and control my data, but with hledger I have an ability to go in and correct or change something (and not in a "accounting-appropriate" way) in bulk just by editing it in Sublime Text. --mszcz

The deal breaker for me was the underlying XML or SQLite formats of GnuCash. These are not terribly amenable to scripting, either for ingesting raw data or reporting. Whereas this is basically the point of plain-text tools like Beancount or hledger. GnuCash feels too much like a walled-garden compared to plain-text tools.
The plain-text format requires more work at first, but after you get the hang of it (and provided you have some background in scripting software) it is awesome.
--GlibMonkeyDeath

One nice feature of hledger is its csv rules system, which is very flexible. I extended it with simple python scripts to add extra information for registering capital gains. So, end of the day the raw input data is just some csv files with records and the output is financial reports with various levels of detail. --mszcz

Has anyone else gone on the following journey:
1. Use excel
2. See ledger/hledger. Think this must be 'the way'. Go all in.
3. Constantly wrestle with ledger/hledger because you only do your accounting once per month/quarter which is not enough frequency to really grok it.
4. Use excel with a new sense of calm that you're not missing out on something better
--davidhunter

I'm now in my 5th year of tracking every penny in and out of my life with hledger, with a mostly manual approach. Some benefits:
- as noted by a spreadsheet user, it adds friction to spending money, which has curbed frivolous/ unplanned expenses for me (and double entry accounting makes it impossible for money to "disappear")
- if you subscribe to Files over Apps, hledger and its ilk (beancounter, gnu cash) are hands down your most mature, stable options
- I've learned a great deal about accounting and how money works in general
- the reports I can generate from my ledger give me a decent starting point at tax time
Happy accounting! --wbadart

I have been using hledger for a while now and have a pretty automated process for importing exported CSVs. I would love a little more automation in terms of pulling down the data, but on the bright side the manual process provides a good touch point to keep up on accounting regularly in small doses. This is great for just keeping an eye on things on a monthly basis. --zefhous

I have a very similar setup but with hledger. 
A "do-nothing" script helps me download statements by opening bank websites, waits for manual import and finally checks balances. 
That makes it a lot less repetitive and error prone. Or at least, I catch the errors faster.
I've found hledger and Shake to be fast enough to process almost a decade of finances. 
Dmitry Astapov has an extremely well produced tutorial workflow. --chrislloyd

I remember that when I used hledger for tracking my expenses over 3 years, 
I had to "close books" once a year and consolidate all the transactions for the past year 
into 1 entry in a new ledger file to keep entry/query operations fast. --asadjb

Thanks @simonmic for hledger, such a fantastic tool! 🥳 --Yann Büchau

I also use ledger/hledger to process a decade of finances. I reconcile once a year when doing taxes. 
I have multiple python scripts orchestrated with org-mode to generate reports/plots. 
I run them in separate processes since they are independent, which makes it fast enough (seconds). --faustlast

Thanks for producing such a great tool - I'm learning a lot, and am finding it really helpful. --Matt Maguire

I completed my first year of bookkeeping for both business and personal expenses with hledger last year.
I can honestly say that I observed zero bugs with the software. It has worked seamlessly. --csgagnon

I have found [hledger] to be completely free of output error throughout an entire year of bookkeeping for my small business. --Christopher Gagnon

hledger focuses on testing and correctness alongside comprehensive documentation, giving me a much better picture of its capabilities. I dove in and spent a week entering a year and a half of data, which was enough to convince me. hledger is truly an amazing tool. I can’t count how many times I’ve thought wouldn’t it be nice if… only to realize it can already do that, or how many times I’ve been disappointed at an apparent bug only to realize I was the one at fault. I don’t know how much is unique to hledger and how much comes from its precursors or contemporaries, but I’m also struck by all the thoughtful touches, like having both aregister and register, or having all of =, ==, =*, and ==* for balance assertions. The attention to detail is marvelous. I have to assume that, whatever the provenance, this flexible competence is born of real use and familiarity. I couldn’t help overflowing with praise in the very friendly Matrix room --Shiv J. M.

hledger can do everything but make my red numbers green. --nenion

I just closed out my household's 2024 books and completed my first full year of plain text accounting with hledger ...
Plain text accounting with hledger has been a profound experience and transformed our household's relationship to our finances and financial planning. 
 --bitsonchips

I got interested in accounting through my research background in the history of mathematics and science. This led me to Luca Pacioli and this fun little book by Jane Gleeson-White: Double Entry: How the Merchants of Venice Created Modern Finance.
 --bitsonchips

I am far from a "power user" or any kind of coder. I'm a mom with a basic understanding of terminal commands. ...
I am eternally grateful to everyone who has contributed to and maintains hledger's documentation and made it accessible for a user like me.
 --bitsonchips

I prefer hledger-web which is a beautiful way to look at our books. I have been able to keep up with journal entries and produce quarterly and now end-of-year reports and hledger has made it all honestly quite joyful. This in turn has transformed how I feel about handling our finances generally and more importantly how I feel about them going forward. Amazing!
 --bitsonchips

It's so great to see others enjoying hledger as much as I do. --HowlOfTheSun

I have been using it for past few years. Its flawless and to the core. It takes some time to adjust it as per our requirements but i would say that after about an year of usage, it starts making a lot of sense and gives what we wants. --jeetu77

I have gained so much benefit from hledger and PTA, I am grateful for all your (and others) work on it. --HowlOfTheSun

PTA changed my life this year. --igbanam

Keep up the good work. We love it. --igbanam

[I'm] using a Google form that I can access via my mobile to log journal entries while I am traveling away from home. Importing the spreadsheet into hledger saves a ton of time.

My main lesson learned is to aim to minimize categories to what is actually useful information for us. --bitsonchips

For me the main goal was, and still is, conscious awareness of my finances. Therefore I manually enter everything: this adds a little friction to every transaction, which has at times been enough to discourage something. --barrucadu

I get receipts for everything and enter transactions generally on the day they happen, and also check my bank and card statements every weekend. It's basically automatic now, to the point that I start to feel antsy if I have some transactions building up that I've not recorded yet. --barrucadu

At the start of the year ... I start a new journal file and enter future-dated transactions for all my income and expenses. It's necessarily an estimate (e.g. I'm not going to spend exactly my entire food budget every month) but it's handy to see how things are trending, and helps me plan how to save for big expenses. --barrucadu

There seem to be two major schools — one relies primarily on imports from external sources, the other relies on (semi-)manual transaction entry. --gumnos

I’m just about to close off my 2024 journal in hledger. First full year for me as well. Love it! --megagram

I think hledger was the Occam’s Razor for my family’s needs and my level of ability. I was up for the challenge of plain text accounting and I think I got lucky with hledger. The onramp was steep enough to be interesting and short enough to get use-benefit fairly quickly. I also just find it really elegant imho. --bitsonchips

I aim to manually enter our household’s cash/checking journal entries at least weekly. It takes less than an hour. Often less than 30 minutes. Even less if I manage it every 3-4 days. It’s a habit now and I look forward to completing it. --bitsonchips

I have thought about importing from electronic bank statements but it’s a level of engagement and data translation that doesn’t excite me. The routine mindful maintenance practice (I know it as “soji”) of journaling expenses and revenues has been a healthy friction that brings awareness to our spending as well as our earning. --bitsonchips

I also pay my kid to occasionally do entries with me. This is also an accounting expense. And fun times familiarizing them with financial literacy. --bitsonchips

What really drew me in from the beginning is how well hledger preserves the simplicity and elegance and double entry. It is so delightfully uncluttered. Precious few things convey this elegance and everyday utility. --bitsonchips

I just discovered PTA and hledger today, a few hours ago, and have with 
much ease imported CSV dumps from my banks etc, and am currently getting 
an overview of my life I've never had before.
Thank you so much for developing this amazing utility! You changed my life 
for the better today, and I will use this for ever :-)
--Martin Josefsson

I had a wonderful time setting up a static site for viewing my hledger data.
I wanted something more accessible on mobile than command-line reports, ... 
I’m very happy with everything and it was so easy with all the tools we have now.
--TheRealDaMuffin

I just started using hledger myself and I love it.
--Shivalicious

I love that you include hledger! It's amazing piece of software, even if a little obscure for people unfamiliar with plaintext accounting!
--virgoerns

I wanted to thank you. I quietly use hledger every day. I don't use it for financial transactions (though I am interested in the envelope budgeting possibilities), I just use it to record my hours. I've done this for years. It goes along with Org mode and some Bash/Perl scripts to help extract and process my notes files that include my hours.
--Steven Shaw

Thanks for your work on plaintextaccounting and hledger. Was a HUGE help, I am finally doing some bookkeeping, for over a year now :)
--vNyo

It’s the only tool that stuck with me, and I love it.
--olexsmir

The community is lovely. If you have questions, “what is the way to do it?”, you will get plenty of help if you ask on reddit/forum
--olexsmir

I switched to hledger because of the excellent and simple import framework for CSVs and the excellent built in CLI reports.
--bagobok

hledger, however, has support for adding 'posting dates' as specially formatted comments. What's really clever is how it automatically chooses which date to sort the reports by depending on the query!
--seabass-labrax

It is a lot of work, especially if you're just starting out and there are gazillion things you own (lucky you). But it's worth it. You are always informed and it has changed my perspective on personal finance completely.
--zipping1549

I use 0.1% of hledger and that's enough for me. Thank you to the author for providing this powerful tool for free.
--laurent_du

Thank you so much for hledger 🙏! Both my wife and I enjoy using it and we find it extremely useful
--alex-sparus

I’ve written a bunch of Python scripts to do my books using hledger. The nice thing is I no longer pay the $75/month for Quickbooks.
--abhiyerra

hledger suits me because of the relatively simple csv import process, reports that are nicely formatted, and the excellent documentation.
--musings-26

simonmic is pretty good about having a steady cadence of features/fixes rolling out with hledger without it breaking things.
--gumnos

I really like hledger, since the CLI tool makes it extremely easy to get started. Documention is also really nice with lots of examples.
--PerryStyle

hledger-web has worked so well for me. Going on nearly two years now. It is elegant, and reliable, with excellent documentation, generous community, and a quick, straightforward onramp. It is a perfect, free, and open-source remedy in a subscription-based, data-sucking, privacy destroying dystopia. It’s completely transformed my relationship to my finances for the better.
--bitsonchips

I’m not trying to spend all my time coding or fussing about under the hood ... I enter transactions manually as part of a routine. Checking-weekly, Savings-monthly, Investments-quarterly. I run quarterly reports and year-end closing statements and enjoy every moment of it.
--bitsonchips

I enter transactions manually as part of a routine. Checking-weekly, Savings-monthly, Investments-quarterly. I run quarterly reports and year-end closing statements and enjoy every moment of it.
--bitsonchips

I've been using hledger for a few years to run my personal and company accounts and I think it is superb.
--livmackintosh

Watch your pennies and the dollars will take care of themselves.

#plaintextaccounting isn't the best solution for all situations; nothing is!
I'm guessing your friend will be too busy, disorganised, and non-software-oriented to deal with learning and managing backups, versions, double entry bookkeeping, plain text accounting, text editors, terminals, sharing access, etc. A google sheet makes most of those problems go away.
--sm

I just completely read the ledger vs. hledger thing and what you linked now. That page is really a wealth of information and completely fair afaik which I really appreciate.
--AppropriateCover7972

Low IQ: "just model the real world".
Average IQ: "i need a complex system to super accurately describe what i would be like as a fortune 500 company".
High IQ: "just model the real world".
--veeque

Also great for "eyeball auditing". When Gnucash did something, I was never sure what actually happened. And sometimes it would crash. Was all my data safe? Hard to tell.
With ledger/hledger, I've never felt unsure about the change I'm making, and if something wipes out records I'll notice it before committing.
--yencabulator

"never sure what actually happened" - I felt the same way with Gnucash, Quicken, and all the other non-plain-text accounting apps I tried. Finance was stressful enough without also worrying about messed-up data. That was perhaps the biggest motivation to switch to Ledger, when I found it.
Later, I often could not figure out how to make Ledger do something I knew it could do, and I often was surprised by a crash or wrong behaviour when it saw some new combination of features and data that hadn't been tested or implemented yet. This was a big motivation to write hledger.
--sm

I'm new to hledger, and finding it useful, and overall a joy to work with!
--h_ahsatan

Before anything else let me thank you for your work on hledger. Using it and learning about double-entry accounting has been truly transformative for my personal finances and even made accounting interesting to me!
--athal124

Splendid, I got all my accounts correct now. Very well. I am officially on hledger now :) I did a complete year rebuild with 1100 transactions within 10 seconds. I am happy with that result, its like 50-100 times faster than [previous conversion scripts] :D --TheAnachron

I've been an hledger user for 5 years now and am very happy with it. I have a background in software development but I've not chosen to hack into hledger and I don't think that it requires one to be a developer or is aimed at highly technical users. Of course, the very nature of plain text accounting requires some modest skills but you can go a lo-ong way with half a dozen hledger commands (accounts, print, is, register, stats, bs) and the command line. The add command is not great but usable. I suspect that using it at a command line is faster than any other front-end and it fits my tastes well.
--rajandatta

I think the best option for non-tech-savvy users is hledger-web. Minimalistic UI, the basic functionality is there, available on all platforms, rendered in browser.
--ShrykeWindgrace

Having worked with hledger for some time now, I believe that the “better way” was in fact already implemented, and it immediately made my life better. It’s easier for me to edit my data. It’s easier for me to keep track of what was changed. And it’s easier for me to answer questions I always used a bit of gut feeling to answer, instead of hard data.
--amitaibu

hledger has proven itself to allow us to get data quicker than before. 
--amitaibu

I’m happy I’ve decided to stick around beyond my first reaction of not having a “proper” UI. While hledger does in fact have a Web version, I found the hledger-ui more robust.
--amitaibu

In the end, it took me only a couple of days, of having worked on both spreadsheets and hledger in parallel, before having full confidence that hledger is the solution we were seeking for. I’m not missing our spreadsheets at all.
--amitaibu

thanks for making hledger awesome. you're saving me from buying at least two software licenses for tax year 2025 and I am off-ramping funds to donate with that in mind
--gnidan

it's like every day brings new excitement. last night I got the balancing the account equation user doc to work with my multi-commodity setup, so now I can see predicted retained earnings before actually closing my books
--gnidan

my accounting equation actually balances!!! this makes me giddy (my mom's half of the family is all bookkeepers/accountants and I think it might be genetic)
--gnidan

I just donated to Simon Michael because hledger literally keeps me financially sane.
--Davide Aversa

After two weeks of using #PlainTextAccounting (double-entry bookkeeping) w/ hledger, I couldn't be happier. So many things I couldn't record and evaluate with my old single-entry (income-expense) system are now a piece of cake! Best of all, multiple open source apps (hledger, etc.) exist & reports can be exported in many formats.

Fwiw the flexibility of how technical the tool can be has been a big feature for me ...
point being, I could learn along the way. The level of precision/sophistication is really flexible.
--kjb4

i started using hledger and it's really, really good wow --sekun

I started a freelance business this year and hledger has really helped me get some peace of mind with regards to my financials. --Benedikt Ritter

I've been using hledger from @simonmic for a few years, and it's been better than any other personal finance tool I've tried --Luca Bello

I have just closed the books on 2025 and remain a wholehearted champion of hledger. I enjoy my accounting routines. I look forward to my accounting routines. And I am endlessly surprised that this is the case. --bitsonchips

In a increasingly complex world, I appreciate the fact that having, earning, spending, saving, borrowing are simply transactions and hledger helps me keep my balance and keep an eye on the results of my family's efforts to live within our means and plan for the future. --bitsonchips

Learning is a joy! Every once in a while I pick up a new command or some insight into finance and this feels powerful. --bitsonchips

The problems of capitalism can be violent, pernicious, and sneaky af. My little routines with hledger keep those problems in perspective and help me feel like my family is building sufficient shelter in the storm. --bitsonchips

It is elegant, reliable, useful, and important. --bitsonchips

I can’t forget the joy it brought when I first fully ported my finances to hledger --teddpole

Every time I use hledger during tax filing season: "WOW, hledger is so useful!" --SK

csv import is God-sent --ivbaklan

Thanks for showing one way of simplifying a task the software service vendors want us to think is impossible without their expensive costs and unpredictable terms and conditions. --RT-mn2pb

As someone who's worked as an accountant since 1985, I'm going to have to play with this. --dingokidneys

I've been using hledger + Plaid + OpenClaw to manage my finances and honestly it's replaced every budgeting app I've tried. --Kenrick Beckett

The other task was getting an overview over company finances. [Openclaw] set up a hledger, added some amounts, and keeps track of burn! Won’t replace an accountant, but super convenient to have everything accessible via one chat instead of across multiple apps.

I use hledger for personal book-keeping. It used to take the better part of a day every month to enter my bank and CC transactions, but with LLMs, I've been able to classify entries into my chart-of-accounts in literal minutes. JSON specifically because scripting them is robust and easy. --Jasim

I've been learning #plaintextaccounting for weeks; and just hit a eureka.
Following the numbers, owning a car is almost always the wrong decision in a city with dependable public transport.
The speed with which you get into debt may be quicker than the speed of the car itself.
--Yāsky

It does it all in plain text, which really blew my mind. Entire expense reports, generated in an instant! It's super fast. Mind-bogglingly so. --Mike Key

おお、hledgerなんとエレガントなソフト --noji

thank you SO much for making hledger! It's an amazing piece of software and a pleasure to work with. I've been a happy user for about 3 years --Juliano Solanho

Just want to thank you again for hledger and all the docs you have written over time. They are pretty much the only reason I properly started book keeping und was able to stick with it for the last couple years. The flexibility is fantastic and most importantly its fun --goldledger

F*ck man, #codex with hledger fixed my accounting with weird taxdoo / amazon fba bookings down to cent accuracy - every accounting firm wanted 20.000eur + for doing it.
--Gerald Ha

I haven't noticed any bugs that affect me in years of using it. --JuniperMesos

now have a stockholm-syndrome love affair with hledger, which it took a lot of claude help for me to set up…but it's so pure --Lucre Snooker

thank you for creating hledger! After more than ten years I switched from Gnucash to hledger and it made me much more productive. --Retujo

one of the few useful haskell app that is not a whitepaper --Goreng

I wasn't aware this FLOSS tool was serenely floating in the 'verse. --arxaaron

The thing I love about this software so far is there is also a separate application with a web interface and a tui so there are multiple ways to access and edit the journal file. This is convenient because I love using cli and tui but my hubby would prefer a gui since he is not a techie. Loving this software so far! --llpolluxll

It is a joy to use it (for many years now) and great to see it being continuously developed. --Clindbergh

Your docs are amazing. Slightly overwhelming, but when I was finally ready to read it top to bottom, it definitely did the job and guiding me to where I needed to. Didn't take long to properly learn hledger with all the goodies --Lyz

Here's an hledger appreciation tweet. It's absolutely the best software for plaintext accounting needs, and I'd even argue for many people's personal finance/accounting needs!  I've been using it for 9 years now, and it's both powerful and easy-to-use. --Pranesh Prakash

hledger is pretty cool and the more i dig into the built in help and the flags and switches, it just keeps me surprising me in the most joyful way. --dpreacher

I just started playing with hledger 3 nights ago and I'm already seeing the possibilities and simplicity that this approach brings. --omniscient

Settled on hledger for budgeting/accounting, with nanoledger on phone to add transactions, and a simple text editor to make tweaks. 
I also have a termux shortcut to make a balance sheet report with a single button!
It's working great, no fear of data corruption, all open source --Flat Bartender

I actually really really like it. I tried ynab, I tried money manager ex, I tried gnucash, I tried pen and paper
but hledger has like. that pen and paper simplicity with plain text files, and the convenience of a digital system, 
and doesn't lock you into a specific method like ynab --Flat Bartender

Hledger came in super handy yet again. We are exploring life insurance policies now that we have a little one, and the broker was asking all about net worth, what we have and all that to help determine how much life insurance is needed, and I had all those numbers ready to go. He was impressed someone my age actually knew those numbers.
--nenion

I’ve been using hledger to manage my finances for the past week, and I find it to be a spectacular tool for this purpose. --Sufyaan

Another reason I love hledger is that it works flawlessly on my phone using Termux. It’s identical to how it works on my desktop, which eliminates the need for a separate application. --Sufyaan

I’m very happy with hledger. It has made me more conscious of my spending and fits my workflow perfectly. I highly recommend trying it out!
--Sufyaan

hledger comes with a CSV parser one can use to import and classify recurring transactions automagically.
Having a proper DSL for this makes all the difference: I can easily add new rules and understand the old ones.
In the end, I get a very consistent result, something my old bash scripts weren't great at.
--Louis-Philippe Véronneau

Migrating to hledger, I've cut down the time I spend on accounting from 1 hour per month to about 10 minutes, all while making my workflow much cleaner.
--Louis-Philippe Véronneau

 I've discovered Hledger in strict mode makes things easier.
--Gemma Black

Entering correct information the first time is far easier than trying to fix things after the fact.
Thankfully with strict mode, we can't have little accidents like this.
--Gemma Black

I made myself a warm cup of tea, leaned back and started to read the website and related blogs until I knew enough to get started.
And then I did it!
--Marcel Kapfer

Through the book-keeping, I get a clear overview of two things that I could not check easily before:
How much money did I spend this month? Or: How much of my income is still left?
How much money did I spend on what?
--Marcel Kapfer

I'm really satisfied with hledger! Even if it doesn't save me money directly (which was never really my goal)
it makes me understand my transactions better and therefore maybe save me some bucks indirectly.
But also just the insight I get is worth the few minutes that I need every day for maintaining the system.
--Marcel Kapfer

I’ve been using it for almost 2 years now and it works great.
--Bill

The reports I get with hledger are better than any tool I’ve ever used.
--Bill

out of any tool I’ve used I feel like hledger puts me in control of my finances.
--Bill

After using hledger for a month, I have noticed that it’s much faster to get information “out” compared to YNAB: 
the information density of hledger’s output is higher, 
fuzzy searching of accounts and transactions makes it review easier and, 
I feel that by using hledger I have more tools available at my disposal.
--Arto Jonsson

Finally got my budget back into Hledger, and I’ve got to say: for power users, it’s the GOAT budgeting tool.
--DanielW_Kiwi

We are going to be applying for a mortgage soon and it's so easy to extract all the reports I need from Hledger.
--DanielW_Kiwi

I've found Hledger so much better than anything visual that I've used. 
I've tried paid solutions and always end up back at Hledgers. It's too powerful and quick.
You have to understand what is going on more but that is part of the power.
--DanielW_Kiwi

Plain text accounting with hledger is the way to go. 
Dark mode, easy to read journal files, easy to find mistakes, easy to fix mistakes repeatable commands for reports and account registers.
--ScottCDunn

I'm a gamer. I don't play Halo, or Bejeweled. I play hledger. 
In this game, I look at every account, every transaction, and enter them into the ledger. 
At the end, I check the balance on the ledger vs the account. If they match, I win!
--ScottCDunn

I've never looked forward to accounting like this.
--ScottCDunn

just recently I found the way to prepare for my business tax declaration with hledger by streamlining the tax form fields and (h)leder account names.
Really love plaintext accounting. Am curious how it turns out.
--mro

I get so much joy from reading posts like this, where people find PTA for the first time.
It totally revolutionized how I deal with money when I discovered it ~5 years ago and I'm glad it's still doing the same to people even today.
--lalitm

hledger is genuinely my favorite tool, and it's the only accounting software that stuck with me
--olex

hledger lover here. I use it for fairly basic bookkeeping, so i havent used the fancier features. Love the reporting tools.
I made a very simple syntax file for vim too, so i catch things like not having two spaces between an account and an amount.
--rondahlgren

I do all my accounting with hledger too. 3 years and counting now!
I have a cron job which periodically uses the hledger-output-to-beancount builtin command to write a beancount journal
(plus some tweaking to make it right), and a fava server using that file.
... Long story short, if I visit ledger.localhost on my machine I see fava up to date with my hledger finances.
--romes

hledger powers the accounting for my company. It's fantastic software and I recommend it highly.
--jtobin

having the accounting data in plain text files and using a tool like hledger to process them is really very convenient.
All the usual CLI tools like grep, sed, awk, ... work like a charm.
And you might think that it would be slow to parse all files each and every time hledger is invoked but it is actually quite okay:
In my case, 8915 transactions spread over 72 files containing data from the last 13 years are parsed and processed in about a second!
--gettalong

If you use hledger to it's full extent you can see how much you really pay in taxes (down to the pennies if you choose) including payroll taxes, and what your real tax rate is. Great for personal finance nerds.
--pragmatic

Downloaded a CSV file from my bank, imported it into hledger, and I was good to go. 
The wiki is also super detailed and user friendly, and everything is actively maintained (active commits in repository, updated wiki pages, etc). 
--njha

I’ve found the perfect balance with csv imports, specifically using the hledger csv importer.
It provides tons of power to pre-categorize transactions, and human error of entering the wrong amount/date are completely eliminated!
--benj

I'm a complete idiot for not properly checking out hledger before last week.
--Râu Cao

Just doing a tax return with hledger. With LLMs it's incredible!
--Gemma Black

One piece of software that is really great is hledger
--Mihai Maruseac

I've been using hledger for a little over six months now. It's really transformed my personal and business finances, putting me in a much better position to make informed decisions.
--Arthur Cinader

hledgerはとにかくレポートが見やすく機能も豊富で、「ledgerのhaskell実装」の枠はとっくに大きく越えている。
(hledger is, in any case, easy to read in its reports and packed with features, having long since outgrown the mere framework of "Haskell implementation of ledger".)
--どっぴい

`; const quotes = quotesmd.trim().split('\n\n').map(q => q.replace(/^\*|\*$/g, '').trim());
