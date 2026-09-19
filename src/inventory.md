# Inventory accounting

Last updated: 2022

## Fundraiser

This example demonstrates accounting for a fundraiser where members sold
meat-sticks and chocolate bars. The local organization would check out
inventory, sell it, and then pay the regional organization back for the
fundraising goods they sold.

In this particular example chocolate bars are sold for $2 and meat-sticks
are sold for $1. The local organization gets to keep 30% of the proceeds.

The role of the first three accounts are fairly straight-forward.
`assets:cash` tracks money in the cash box. `assets:inventory` tracks 
the unsold meat and chocolate stock. `liabilities:supplier` tracks
the money owed to the supplier.

The interesting account is `income:fundraiser`. This account summarizes
the effect of the fundraiser on the organization. In our example the
initial effect on the organization is that it acquired $61.60 of debt,
24 meat-sticks, and 32 chocolate bars. As the fundraiser progresses, this
account will hold only the $26.40 of income.

In the real use-case, the members of the organization would check out
product to sell. Additional transactions can be used to transfer stock
from the organization's inventory accounts to member-specific accounts.

```journal
account assets:cash           ; cash
account assets:inventory      ; product inventory
account liabilities:supplier  ; money owed to supplier
account income:fundraiser     ; income attributed to the fundraiser

commodity MEAT  ; meat-sticks
commodity CHOC  ; chocolate bars
commodity USD   ; US dollars

; Price of the fundraiser goods at the supplier's price
P 1-1 MEAT 0.70 USD
P 1-1 CHOC 1.40 USD

1-1 * Supplier | Pick up inventory
    assets:inventory              24 MEAT
    assets:inventory              32 CHOC
    liabilities:supplier      -61.60 USD
    income:fundraiser

1-2 * Alice | Sold some goods
    assets:inventory             -20 MEAT
    assets:inventory             -12 CHOC
    assets:cash                   44 USD
    income:fundraiser

1-3 * Bob | Sold more things
    assets:inventory              -4 MEAT
    assets:inventory             -20 CHOC
    assets:cash                   44 USD
    income:fundraiser

1-4 * Supplier | Pay balance
    liabilities:supplier       61.60 USD
    assets:cash               -61.60 USD
```

With a daily balance change and historical balance reports we can see the
effect of each transaction. Over time we'll be converting inventory into
profits.

```
$ hledger bal -D --pretty
Balance changes in 2021-01-01..2021-01-04:

                      ║                    2021-01-01                    2021-01-02                   2021-01-03  2021-01-04
══════════════════════╬══════════════════════════════════════════════════════════════════════════════════════════════════════
 assets:cash          ║                             0                     44.00 USD                    44.00 USD  -61.60 USD
 assets:inventory     ║              32 CHOC, 24 MEAT            -12 CHOC, -20 MEAT            -20 CHOC, -4 MEAT           0
 income:fundraiser    ║ -32 CHOC, -24 MEAT, 61.60 USD  12 CHOC, 20 MEAT, -44.00 USD  20 CHOC, 4 MEAT, -44.00 USD           0
 liabilities:supplier ║                    -61.60 USD                             0                            0   61.60 USD
──────────────────────╫──────────────────────────────────────────────────────────────────────────────────────────────────────
                      ║                             0                             0                            0           0

hledger bal -DH --pretty
Ending balances (historical) in 2021-01-01..2021-01-04:

                      ║                    2021-01-01                    2021-01-02  2021-01-03  2021-01-04
══════════════════════╬═════════════════════════════════════════════════════════════════════════════════════
 assets:cash          ║                             0                     44.00 USD   88.00 USD   26.40 USD
 assets:inventory     ║              32 CHOC, 24 MEAT               20 CHOC, 4 MEAT           0           0
 income:fundraiser    ║ -32 CHOC, -24 MEAT, 61.60 USD  -20 CHOC, -4 MEAT, 17.60 USD  -26.40 USD  -26.40 USD
 liabilities:supplier ║                    -61.60 USD                    -61.60 USD  -61.60 USD           0
──────────────────────╫─────────────────────────────────────────────────────────────────────────────────────
                      ║                             0                             0           0           0                  
```

To see the same information in terms of the cash-value of the inventory
that we're holding we can use the `-V` flag.  From this view we can see the
income realized by the fundraiser as it progresses, and the cash value
of our current inventory.

```cli
hledger bal -DV --pretty
Balance changes in 2021-01-01..2021-01-04, valued at period ends:

                      ║ 2021-01-01  2021-01-02  2021-01-03  2021-01-04
══════════════════════╬════════════════════════════════════════════════
 assets:cash          ║          0   44.00 USD   44.00 USD  -61.60 USD
 assets:inventory     ║  61.60 USD  -30.80 USD  -30.80 USD           0
 income:fundraiser    ║          0  -13.20 USD  -13.20 USD           0
 liabilities:supplier ║ -61.60 USD           0           0   61.60 USD
──────────────────────╫────────────────────────────────────────────────
                      ║          0           0           0           0

$ hledger bal -DHV --pretty
Ending balances (historical) in 2021-01-01..2021-01-04, valued at period ends:

                      ║ 2021-01-01  2021-01-02  2021-01-03  2021-01-04
══════════════════════╬════════════════════════════════════════════════
 assets:cash          ║          0   44.00 USD   88.00 USD   26.40 USD
 assets:inventory     ║  61.60 USD   30.80 USD           0           0
 income:fundraiser    ║          0  -13.20 USD  -26.40 USD  -26.40 USD
 liabilities:supplier ║ -61.60 USD  -61.60 USD  -61.60 USD           0
──────────────────────╫────────────────────────────────────────────────
                      ║          0           0           0           0
```

For our fundraiser the members got credit for their contribution to the
fundraiser. By pivoting by payee we can see the gross revenue and inventory
sold by each member. The row for the supplier shows the total inventory
acquired and cost paid.

```cli
hledger bal income:fundraiser --pivot=payee --pretty -Y
Balance changes in 2021:

          ║                          2021
══════════╬═══════════════════════════════
 Alice    ║  12 CHOC, 20 MEAT, -44.00 USD
 Bob      ║   20 CHOC, 4 MEAT, -44.00 USD
 Supplier ║ -32 CHOC, -24 MEAT, 61.60 USD
──────────╫───────────────────────────────
          ║                    -26.40 USD
```

To see the net revenue attributed to each member, we can generate the same
report valued by the cost of the goods.

```cli
hledger bal income:fundraiser --pivot=payee --pretty -YV
Balance changes in 2021, valued at period ends:

       ║       2021
═══════╬════════════
 Alice ║ -13.20 USD
 Bob   ║ -13.20 USD
───────╫────────────
       ║ -26.40 USD
```
