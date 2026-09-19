# Invoicing

Last updated: 2025

Freelancers and businesses send invoices to clients to request payment.

See [common journal entries](common-journal-entries.md) and
<https://plaintextaccounting.org/Invoicing>

## Reports

With invoices and payments recorded as above, you can track unpaid invoices:

```cli
$ hledger bal receivable:supercompany
```

or list all invoices and payments:

```cli
$ hledger areg receivable:supercompany
```

or just invoices:

```cli
$ hledger areg receivable:supercompany amt:'>0'
```

or just payments:

```cli
$ hledger areg receivable:supercompany amt:'<0'
```

## Creating Invoices

How to translate the data from your ledger into a professional-looking
invoice you can send to clients ?

You can create the invoice manually or semi-manually, eg using a tool
like Freshbooks, and copy-paste the numbers in.

Or you can automate this somehow. There are few ready-made tools for this,
because needs are so diverse.

But you'll find some useful starter scripts in hledger's 
[examples/invoicing](https://github.com/hledgerorg/hledger/tree/main/examples/invoicing)
directory.

## See also

- [examples/invoicing/](https://github.com/hledgerorg/hledger/tree/main/examples/invoicing)
- <https://github.com/kairosdotapp/kairos>
- <https://plaintextaccounting.org/Invoicing>
