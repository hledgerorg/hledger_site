# Getting prices

Here are some ways to download current or historical market prices for your commodities.

## pricehist

[pricehist](https://pypi.org/project/pricehist) is a standalone tool
for fetching currency, cryptocurrency and stock prices.
It can print h/ledger or beancount-style price directives directly.

[`hledger-pricehist`](https://github.com/hledgerorg/hledger/blob/main/bin/hledger-pricehist)
is an optional small script to make it show up in the hledger commands list.

Install:
```cli
pipx install pricehist
```

List providers:

```cli
$ pricehist sources
alphavantage     Alpha Vantage
bankofcanada     Bank of Canada
coinbasepro      Coinbase Pro
coindeskbpi      CoinDesk Bitcoin Price Index
coinmarketcap    CoinMarketCap
ecb              European Central Bank
yahoo            Yahoo! Finance
```

Show details about a provider's data:

```cli
$ pricehist source yahoo
```

Fetch prices.
The format of the symbol argument varies by provider and commodity.

```cli
$ pricehist fetch -o ledger -s 2025-12-19 -e 2025-12-19 ecb EUR/USD
P 2025-12-19 00:00:00 EUR 1.1712 USD
```

```cli
$ pricehist fetch -o ledger -s 2025-12-19 -e 2025-12-19 yahoo TSLA
P 2025-12-19 00:00:00 TSLA 478.975006103515625 USD
```

```cli
$ pricehist fetch -o ledger -s 2025-12-19 -e 2025-12-19 yahoo ADA-USD
P 2025-12-19 00:00:00 ADA-USD 0.37601006031036376953125 USD
```

You can omit the start or end options to fetch a range of dates.
Some commodities will not have prices available on weekends.
Some providers (eg alphavantage) may require signup and an API key to get certain data.


## bittytax_price

[bittytax_price](https://github.com/BittyTax/BittyTax/?tab=readme-ov-file#price-tool),
from the [BittyTax](https://github.com/BittyTax/BittyTax) project,
can fetch currency and cryptocurrency prices (but not stock prices).
It's quite easy to use, trying multiple providers automatically.

Install:

UK version:
```cli
git clone https://github.com/BittyTax/BittyTax.git
cd BittyTax && pip install .
```

or US version:
```cli
git clone https://github.com/BittyTax/BittyTax.git -b features/usa-tax-rules
cd BittyTax && pip install .
```

Run it once to set up a config file (`~/.bittytax/bittytax.conf`):

```cli
$ bittytax_price --version
```

Configure your preferred base currency in the config file:

```conf
local_currency: 'USD'
```

Fetch prices:

```cli
$ bittytax_price latest EUR
1 EUR=1.1712 USD via BittyTaxAPI (Euro)
1 EUR=$1.17 USD
```
```cli
$ bittytax_price latest BTC
1 BTC=87,953.36 USD via CryptoCompare (Bitcoin)
1 BTC=$87,953.36 USD
```

If you get Too Many Requests errors from Coingecko,
you can remove them from `data_source_crypto` in the config file,
or [buy an API key](https://www.coingecko.com/en/api),
or specify a source with the `-ds` command line option.

