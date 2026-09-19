# Create a journal

Last updated: 2023

See also:
[Input](hledger.md#input) and
[Setting LEDGER_FILE](hledger.md#setting-ledger_file) and
[Starting a journal file](hledger.md#starting-a-journal-file)
in the hledger manual.

There are lots of ways to start and update a journal file:

## with touch

The simplest possible journal is just an empty file:

```cli
$ touch 2023.journal
```

The name doesn't matter much and can be changed later. 
One file per year is common, 
and so is a `.journal` or `.hledger` extension.

## with cat

```cli
$ cat >>2023.journal
2023-01-26
    expenses:food     $10
    assets:cash
<CTRL-D>
```

[Account names](hledger.md#account-names) can be anything 
and you can change them later by search and replace. 
If you don't know what to [choose](http://plaintextaccounting.org/#choosing-accounts), 
start with these five:\
`expenses`, `income`, `assets`, `liabilities`, and `equity`,\
perhaps with one extra subcategory as above.

## with a text editor

Write transactions in a text editor, optionally using an
[editor mode](editors.md), 
and save the file.

## with hledger add

Use the interactive [add](hledger.md#add) command and follow the prompts:

```cli
$ hledger add
```

## with hledger-iadd

- ensure $LEDGER_FILE exists
- `hledger iadd`
- enter one or more transactions

## with hledger-web

- ensure $LEDGER_FILE exists
- `hledger web`
- wait for web browser to open
- click "add transaction" or press "a"
- enter a transaction, click ok or press enter
