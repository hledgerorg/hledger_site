# Exporting from hledger

Last updated: 2025

A number of hledger reports support multiple output formats, such as plain text, HTML, JSON, beancount, or SQL.
There are also tabular formats such as CSV, TSV, and FODS.
See [hledger:&nbsp;Output&nbsp;format][output format] for full details.

Here are some common ways to export hledger data.



## Export journal entries with print

You can [print](hledger.md#print) whole journal entries.
This usually preserves the most information.
txt (AKA hledger journal), beancount, HTML or JSON output formats are good choices here.
CSV/TSV/FODS are also supported but there will be multiple records per transaction, which you may need to recombine later.

Examples:
```cli
$ hledger print date:2025 -o 2025.json
```

```cli
$ hledger print -o all.beancount
```

Check the output format docs for additional tips, 
eg [Beancount output](hledger.md#beancount-output) may need account aliases.

## Export account transactions with aregister

You can export a register (list of changes, plus running balance) with hledger's [register] command.
You should probably export the activity of just one account and one currency at a time.
Eg:
```cli
$ hledger -f examples/sample.journal reg -O csv checking cur:'\$'
"txnidx","date","code","description","account","amount","total"
"1","2008-01-01","","income","assets:bank:checking","$1","$1"
"2","2008-06-01","","gift","assets:bank:checking","$1","$2"
"3","2008-06-02","","save","assets:bank:checking","$-1","$1"
"5","2008-12-31","","pay off","assets:bank:checking","$-1","0"
```

But the [aregister] command may be better for this,
because it guarantees one record per transaction even with complex multi-posting transactions, 
and it shows the other account names (abbreviated), making categorisation easier later:

```cli
$ hledger -f examples/sample.journal areg checking -O csv cur:'\$'
"txnidx","date","code","description","otheraccounts","change","balance"
"1","2008-01-01","","income","in:salary","$1","$1"
"2","2008-06-01","","gift","in:gifts","$1","$2"
"3","2008-06-02","","save","as:ba:saving","$-1","$1"
"5","2008-12-31","","pay off","li:debts","$-1","0"
```

## Export report data

You can export the output of other reports, like a balance sheet or income statement.
Eg:
```cli
$ hledger bs -o bs.html
$ open bs.html
```

```cli
$ hledger is -o is.tsv
```

If you export as CSV or TSV, you can drag those files into a spreadsheet.

If your spreadsheet can read FODS format, use that instead, to preserve more formatting.

## Other

- [hledger2psql](https://github.com/edkedk99/hledger2psql) is a tool that exports a hledger journal to a postgres database.
- [Interfacing with real-life human accountants (hledger list, 2023)](https://groups.google.com/g/hledger/c/HS1Wd2iUSgA/m/oqVhSEf4AgAJ)



[register]: hledger.html#register
[aregister]: hledger.html#aregister
[output format]: hledger.html#output-format


