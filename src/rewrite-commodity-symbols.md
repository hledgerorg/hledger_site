# Rewrite commodity symbols

Last updated: 2022

Three ways to temporarily change a commodity symbol, eg to show "$" as "USD" in a report:

## Postprocess

Simplest. 
Here, we use `sed` to replace all `$` with `USD` in the output:

```cli
$ hledger bal | sed 's/\$/USD /g'
```

## Preprocess

Most powerful. 
We rewrite the journal file before hledger processes it. You can merge multiple symbols into one this way, eg if inconsistent symbols have been used for a currency:

```cli
$ cat $LEDGER_FILE | sed 's/\$/USD /g' | hledger -f- bal
```

## Value conversion

Most portable, requires only hledger.
We create a dummy one-to-one [market price](hledger.md#market-prices) between the old and new commodity symbols,
and use [market value reports](hledger.md#v-value) to convert.
This assumes your other market prices, if any, don't interfere.

You can add the market price in the main journal:
```cli
$ echo 'P 2000-01-01 $ 1 USD' >> $LEDGER_FILE  # once
$ hledger bal -V
```

Or in a separate file that you include only when needed:
```cli
$ echo 'P 2000-01-01 $ 1 USD' >> rewrite-symbols.j  # once
$ hledger bal -V -f $LEDGER_FILE -f rewrite-symbols.j
```
