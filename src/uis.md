# User Interfaces

Here is an overview of the [user interfaces](https://plaintextaccounting.org/#ui-terminal) available for hledger.
The official UIs are marked in bold.
Last updated: 2026-04

<!-- alphabetic -->

[cashier]:            https://github.com/alensiljak/cashier
[dravik]:             https://github.com/Yaser-Amiri/dravik
[fruit-credits]:      https://codeberg.org/dz4k/fruit-credits
[hledger add]:        hledger.md#add
[hledger-edit]:       https://pypi.org/project/hledger-utils
[hledger-iadd]:       https://github.com/hpdeifel/hledger-iadd
[hledger-macos]:      https://github.com/thesmokinator/hledger-macos
[hledger-textual]:    https://github.com/thesmokinator/hledger-textual
[hledger-ui]:         hledger-ui.md
[hledger-web]:        hledger-web.md
[hledger-webuix]:     https://github.com/yga01/hledger-webuix
[hledger]:            hledger.md
[ldash]:              https://codeberg.org/md-weber/ldash
[ledgeraccounting]:   https://github.com/thecount2a/ledgeraccounting
[MoLe]:               https://fossdroid.com/a/mole.html
[muhasib-e-hledger]:  https://gitlab.com/shivjm/muhasib-e-hledger
[NanoLedger]:         https://f-droid.org/en/packages/be.chvp.nanoledger
[nextcloud-hledger]:  https://github.com/37Rb/nextcloud-hledger
[Paisa]:              https://paisa.fyi
[puffin]:             https://github.com/siddhantac/puffin
[Surebeans]:          https://surebeans.net

<!-- type, official first, alphabetic -->

**Terminal**

- **[hledger]** - the hledger command line tool
- **[hledger add]** - hledger's built-in prompting data entry UI
- **[hledger-ui]** - a simple TUI
- [dravik] TUI for hledger viewing (python, 2025)
- [hledger-edit] open any subset of transactions in your editor (python, 2023)
- [hledger-iadd] TUI for h/ledger transaction entry (haskell, 2015..)
- [hledger-textual] TUI for hledger viewing/entry/editing (python, 2026)
- [ldash] TUI for viewing portfolio, net worth and monthly budget (rust, 2026)
- [puffin] TUI for hledger viewing (go, 2023..)

**Graphical**

- [fruit-credits] data entry/reporting GUI for hledger (vala+gnome, 2024)
- [hledger-macos] mac app for viewing/editing (swift, 2026)
- [Surebeans] YNAB clone using hledger data format, providing data entry, budgeting, reports (closed source, cross platform, C#, 2026)

**Web**

- **[hledger-web]** - a simple web app.
- [hledger-webuix] one-page local web app for hledger viewing, adding, editing (html+js, 2026)
- [ledgeraccounting] web UI for hledger: data entry, basic reports and budgets (python+js, 2018)
- [muhasib-e-hledger] web UI for hledger reports (rust, 2024)
- [nextcloud-hledger] hledger UI on the Nextcloud file-sharing/web-app platform (php, 2021)
- [Paisa] web UI or desktop app for ledger, hledger and beancount ([go/js/ts](https://github.com/ananthakumaran/paisa), 2022.., [demo](https://demo.paisa.fyi))

**Android**

- [cashier] mobile or desktop client for ledger and hledger-web (Android/Desktop, [js](https://cashier.alensiljak.eu.org/#/home), 2019)
- [MoLe] mobile client for hledger-web ([java](https://git.ktnx.net/?p=mobile-ledger.git), 2020)
- [NanoLedger] data entry app for h/ledger (kotlin, 2023..)

See also: [Mobile apps](mobile.md)

## Test matrix

Here are some robustness [tests](#tests) for the main UIs.
High-scoring apps get higher position!
Help welcome, share updates in the chat room.

<!-- type, robustness -->

|                     | language | install | otherfiles | otheryears | sample | accounttypes | bcexample | synthetic | misc issues                            |
|---------------------|----------|---------|------------|------------|--------|--------------|-----------|-----------|----------------------------------------|
| **Terminal**        |          |         |            |            |        |              |           |           |                                        |
| **[hledger]**       | haskell  | Y       | Y          | Y          | Y      | Y            | Y         | Y         |                                        |
| **[hledger-ui]**    | haskell  | Y       | Y          | Y          | Y      | Y            | Y         | Y         |                                        |
| [hledger-iadd]      | haskell  | Y       | Y          | Y          | Y      | Y            | Y         | Y         |                                        |
| [puffin]            | go       | Y       | N          | N          | Y      | Y            | Y         | Y         |                                        |
| [ldash]             | rust     | Y       | N          | Y          | Y      | Y            | Y         | Y         | won't detect my accounts; requires assets:crypto
| [hledger-textual]   | python   | Y       | Y          | N          | Y      | Y            | Y         | Y         | writes directives to journal           |
| [dravik]            | python   | N       |            |            |        |              |           |           | failed to build pydantic-core==2.33.2  |
| **Graphical**       |          |         |            |            |        |              |           |           |                                        |
| [Surebeans]         | C#       | Y       | Y          | Y          | Y      | N            | Y         | Y         | adds directives to files opened        |
| [hledger-macos]     | swift    | Y       | N          | N          | Y      | Y            | Y         | Y         | (mac only)                             |
| [fruit-credits]     | vala     | N/A     |            |            |        |              |           |           | (linux+gnome only)                     |
| **Web**             |          |         |            |            |        |              |           |           |                                        |
| **[hledger-web]**   | haskell  | Y       | Y          | Y          | Y      | Y            | Y         | Y         |                                        |
| [hledger-webuix]    |          |         |            |            |        |              |           |           |                                        |
| [muhasib-e-hledger] |          |         |            |            |        |              |           |           |                                        |
| [ledgeraccounting]  |          |         |            |            |        |              |           |           |                                        |
| [nextcloud-hledger] |          |         |            |            |        |              |           |           |                                        |
| [Paisa]             |          |         |            |            |        |              |           |           |                                        |
| **Android**         |          |         |            |            |        |              |           |           |                                        |
| [NanoLedger]        |          |         |            |            |        |              |           |           |                                        |
| [cashier]           |          |         |            |            |        |              |           |           |                                        |
| [MoLe]              |          |         |            |            |        |              |           |           |                                        |

### Tests

**install** - did SM's latest install attempt succeed ?

**otherfiles** - easy to view data in other files ?

**otheryears** - easy to view data outside the current year ?

**sample** - does it read [sample2.journal](https://raw.githubusercontent.com/hledgerorg/hledger/refs/heads/main/examples/sample2.journal),
a small journal with a few transactions, conventional english account names (lower case), and balance assertions.

**accounttypes** - does it work with non-english/non-conventional account names, [using account types](https://raw.githubusercontent.com/hledgerorg/hledger/refs/heads/main/examples/accounttypes.journal).

**bcexample** - does it read [bcexample.journal](https://raw.githubusercontent.com/hledgerorg/hledger/refs/heads/main/examples/bcexample.journal),
a medium sized journal with 1000 transactions, conventional english account names (capitalised), and multiple commodities.

**synthetic** - does it read [1ktxns-100accts.journal](https://raw.githubusercontent.com/hledgerorg/hledger/refs/heads/main/examples/1ktxns-100accts.journal),
a synthetic journal with 1000 transactions, unconventional account names, and transacted prices and market prices.

