# hledger and GnuCash

Last updated: 2025

Tips for co-using/converting/switching GnuCash and hledger.

Conversion tools.
gnucash-xml, gnucash-sql, gnucash-sqlite indicate which GnuCash storage back ends are supported:
XML, general SQL (sqlite/mysql/postgres), or sqlite only:

- [WolfgangFahl/pynomina](https://github.com/WolfgangFahl/pynomina) (updated 2025) converts between many formats, including gnucash-xml and beancount
- [piecash/scripts/ledger.py](https://github.com/sdementen/piecash/blob/master/piecash/scripts/ledger.py) (updated 2024) gnucash-sql to ledger
- [lodenrogue/gnucash2ledger](https://github.com/lodenrogue/gnucash2ledger) (2023) gnucash-xml to ledger
- [tfree87/gnucash2ledger](https://github.com/tfree87/gnucash2ledger) (2021) gnucash-xml to *ledger
- [gnucash-xml-to-ledger-dat](https://github.com/icyflame/gnucash-xml-to-ledger-dat) (2020) gnucash-xml to ledger
- [gnucash-to-beancount](https://github.com/henriquebastos/gnucash-to-beancount/) (2017) gnucash-sqlite to beancount
- [cookthebooks](https://github.com/colemannugent/cookthebooks) (2017) gnucash-xml to ledger
- [pygnucash/gnucash2ledger.py](https://github.com/MatzeB/pygnucash/blob/master/gnucash2ledger.py) (2014) gnucash-sqlite to ledger
<!-- sync: https://plaintextaccounting.org/#gnucash -->

Some related discussion:

- [Import gnucash Files #332](https://github.com/hledgerorg/hledger/issues/332)
- [reddit: command line vs GUI](https://www.reddit.com/r/plaintextaccounting/comments/16xhjm5/command_line_vs_gui) (2023) how to export from hledger to gnucash
- [HN: GnuCash Tutorial and Concepts Guide](https://news.ycombinator.com/item?id=37954925) (2023) someone using gnucash and hledger together
- [reddit: Current working gnucash exporter?](https://www.reddit.com/r/plaintextaccounting/comments/r64oye/current_working_gnucash_exporter/) (2021)
- [reddit: GnuCash and ledger combination](https://www.reddit.com/r/plaintextaccounting/comments/m721d7/gnucash_and_ledger_combination) (2021)
- [HN: Simple Personal Finance Tracking with GnuCash](https://news.ycombinator.com/item?id=23238489) (2020) gnucash vs ledger
- [Converting GNUCash's XML file to Ledger's DAT format](https://blog.siddharthkannan.in/2020/04/05/gnucash-ledger-conversion/) (2020)
- [Scripting with APL: Convert GNUCash XML format to Ledger CLI](https://www.sacrideo.us/scripting-with-apl-convert-gnucash-xml-format-to-ledger-cli/) (2016) (apl)
