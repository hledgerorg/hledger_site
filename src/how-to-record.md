# How to record journal entries

Last updated: 2023

There are many ways to create hledger journal entries.
Here are some options:

## Interactively

### With a text UI

- [hledger add](hledger.md#add) (or `a` in hledger-ui)
- [hledger-iadd](https://hackage.haskell.org/package/hledger-iadd) (or `A` in hledger-ui)

### With a web UI

- [hledger-web](https://hledger.org/hledger-web.html) add form or edit form
- [Paisa](https://paisa.fyi) edit form

### On a phone or tablet

- With one of the [mobile apps](mobile.md)

## In a text editor

### From scratch
- Write the entry in full, using [journal format](hledger.md#journal).
- As above, but also use [editor addons](editors.md) to assist
  (like Emacs ledger-mode's TAB account completion and M-q alignment).

### From templates
- In Emacs with [yasnippet](https://www.emacswiki.org/emacs/Yasnippet) configured (eg), enter the name of a snippet and complete with TAB

### From past entries
- Find, copy and modify a past entry in the journal
- Or in Emacs [ledger-mode](editors.md#ledger-mode), enter a date and partial description and complete with C-c TAB

### From future entries
- Move the entry from a separate file where you prepared it ahead of time (eg future.journal) 

## At the command line

### From scratch
- Write the entry using journal format, eg
  ```cli
  $ cat >>$LEDGER_FILE
  2023-01-01
      expenses:food   $10
      assets:cash
  
  <CTRL-D>
  ```
  or
  ```cli
  printf >>$LEDGER_FILE '2023-01-01\n  expenses:food  $10\n  assets:cash\n\n'
  ```

### From past entries
- Install Ledger and use [ledger xact DESC](https://ledger-cli.org/doc/ledger3.html#xact)

### From periodic transaction / auto posting rules
- Convert a [periodic transaction rule](hledger.md#periodic-transactions) (eg in future.journal) to an entry with `--forecast[=DATEORPERIOD]`
- As above, plus generate extra postings from [auto posting rules](hledger.md#auto-postings) with `--auto`

### From custom scripts
- If you have custom scripts to help with tasks, make them print or append journal entries when appropriate.
  Eg have your [invoicing script](https://github.com/hledgerorg/hledger/tree/main/examples/invoicing/invoice-script) add an invoice transaction to the journal.

## By converting data

### From bank CSV (or other character-separated values)
- [hledger import](hledger.md#import) plus [CSV conversion rules](hledger.md#csv) (and a pre-cleaning script if needed)
- Or keep the CSV files forever and read them with `-f`
- Or regenerate journals from them with [Full-fledged hledger](https://github.com/adept/full-fledged-hledger) or
  [hledger-flow](https://github.com/apauley/hledger-flow)

### From timeclock, timedot or other journal files
- Just read them directly with `-f`
- Or, hledger import them to main journal

### From other apps or data formats
- Look for conversion tools and tips at <https://hledger.org/cookbook.html#other-software>
- Or at <https://plaintextaccounting.org/#data-importconversion>
- Or write a conversion script that prints hledger journal entries (or other supported format)
- As above, but save the output to a file and `import` from that to get only new entries
