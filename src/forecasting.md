# Forecasting

Last updated: 2021

Some ways:

- Enter future-dated transactions in your journal, commented out
  (with `;` or `comment`)

- Enter future transactions uncommented; use a query to exclude
  them from reports when needed (`-e tomorrow` or `date:-tomorrow`. 
  hledger-ui hides them by default.)

- Enter future transactions in a separate `forecast.journal`,
  which you can include when needed (eg, add `-f forecast.journal`).

- Enter periodic transaction rules describing future transactions 
  (recurring or non-recurring), and activate the forecast with `--auto`.

- [Budgeting and forecasting (2018) > Forecasting](budgeting-and-forecasting.md) -
  reusing a budget's periodic transactions to generate a forecast.
