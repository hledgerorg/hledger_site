# Overview of commands

To list hledger's commands, run `hledger help commands`.
(Running just `hledger` shows a quick reference card, including the most common commands.)
With the hledger-ui and hledger-web addons installed, the list looks like this:
```
$ hledger help commands
HLEDGER COMMANDS
USER INTERFACES
 help (h)                 show documentation and examples
 repl                     run multiple commands from an interactive prompt
 run                      run multiple commands from a file or command line
 ui                       run a terminal UI
 web                      run a web UI
ENTERING DATA
 add                      add transactions using terminal prompts
 get                      fetch transaction and price data for import
 import                   add new transactions from other files, eg CSV files
REPORTS
 accounts (acc)           account names
 activity                 transaction or posting counts, as a bar chart
 aregister (areg)         an account's transactions & running balance
 balance (bal)            balance changes, end balances, gains, budgets & more
 balancesheet (bs)        assets, liabilities and net worth
 balancesheetequity (bse) assets, liabilities and equity
 cashflow (cf)            changes in liquid assets
 codes                    transaction codes
 commodities (comm)       commodity/currency symbols
 descriptions (desc)      transaction descriptions
 files                    input files used
 holdings                 investment holdings and performance
 incomestatement (is)     revenues and expenses
 notes                    the note part of transaction descriptions
 payees                   the payee part of transaction descriptions
 prices                   market prices
 print                    transaction entries, or a whole exported journal
 register (reg)           matched postings & running total, across accounts
 roi                      return on investments
 stats                    journal statistics
 tags                     tag names
 transactions (tx)        transactions, in compact one-line format
MAINTENANCE
 setup                    check your hledger installation
 check                    check your journal data
 diff                     compare an account's transactions in two journals
GENERATING DATA
 close                    generate transactions to zero/restore/assert balances
 rewrite                  generate postings by rule, like print --auto
OTHER ADDONS
```

Most commands are reports. Here's a good order to learn them in:

1. **Whole transactions:** [print](print-.md) shows them as journal entries;
   [transactions](hledger.md#transactions) shows them one per line.
2. **Detailed changes:** [register](register.md) lists postings with a running total;
   [aregister](hledger.md#aregister) shows one account's transactions and its running balance.
3. **Financial statements:** [balancesheet](balancesheet.md) and [incomestatement](incomestatement.md);
   also [cashflow](hledger.md#cashflow) and [balancesheetequity](hledger.md#balancesheetequity).
4. **Flexible summaries:** [balance](balance.md) sums any accounts, over any periods;
   [activity](hledger.md#activity) charts how many transactions there were.
5. **Investments:** [holdings](hledger.md#holdings) and [roi](hledger.md#roi).
6. **Lists:** [accounts](hledger.md#accounts), [payees](hledger.md#payees), [tags](hledger.md#tags),
   [commodities](hledger.md#commodities), [stats](hledger.md#stats) and the rest,
   useful for exploring a journal or for scripting.

The other sections:
- **Entering data:** [add](add.md) was covered earlier; [import](import-new-transactions.md) comes later.
- **Maintenance:** [setup](check-your-setup.md) checks your installation, and [check](hledger.md#check) your data.
- **Generating data:** [close](hledger.md#close) and [rewrite](hledger.md#rewrite) are more advanced; you won't need them at first.

Next, we'll explore some reports.

<br>

(Part of [hledger by example](hbe.md).)
