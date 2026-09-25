# Editors

If you edit your journals (and other hledger data files) with a [text
editor](https://en.wikipedia.org/wiki/Text_editor), you want that
frequent task to be as pleasant and non-tedious as possible. So it's
worth using a powerful text editor - one with comfortable copy/paste, search
& replace, and perhaps more advanced features like macros.

For the popular text editors there are helper modes/extensions which can make editing
hledger journal files much more convenient. These provide things like
syntactic highlighting, auto indentation, and tab completion of
account names.  You can find a list of these extensions at \
<https://plaintextaccounting.org/#editor-plugins>.\
The ones with "hledger" in their name are designed specifically for working with hledger journals, while the ones with "ledger" in their name are not, but can often work well with hledger as well (eg: ledger-mode).

Here are more details and tips.

## Emacs

See [hledger and Emacs](emacs.md) for details and configuration tips. In brief:

- <a id="ledger-mode"></a>[ledger-mode](emacs.md#ledger-mode) is the most used and maintained Emacs mode for Ledger and hledger files, and works well with hledger when configured for it.
- <a id="hledger-mode"></a>[hledger-mode](emacs.md#hledger-mode) is an alternative written specifically for hledger; less actively maintained.
- <a id="flycheck-hledger"></a><a id="flymake-hledger"></a>[flycheck-hledger](emacs.md#flycheck-hledger) and [flymake-hledger](emacs.md#flymake-hledger) show problems in your journal as you edit it.
- <a id="org-babel"></a><a id="calc"></a>[org babel](emacs.md#org-babel) can embed hledger reports in org files, and [calc](emacs.md#calc) can help with arithmetic during data entry.

## Vim

- <https://github.com/ptimoney/hledger-nvim>
- <https://github.com/ledger/vim-ledger>
- <https://github.com/anekos/hledger-vim>
- <https://github.com/linuxcaffe/timedot-vim>
- <https://github.com/nvim-treesitter/nvim-treesitter>

## VS Code

Extensions for working with hledger journal files -
as of 2026Q3 I think they rank in features and activity roughly like so:

- <https://github.com/juev/hledger-vscode>
- <https://github.com/ptimoney/hledger-lsp>
- <https://github.com/iiAtlas/hledger-formatter>
- <https://github.com/mhansen/hledger-vscode>

Extensions for working with hledger CSV rules files:

- <https://github.com/EthanOlpin/hledger-rules-vscode>

All VS Code extensions mentioning "hledger":

- [VS Code marketplace: \*hledger\*](https://marketplace.visualstudio.com/search?term=hledger&target=VSCode&category=All%20categories&sortBy=Relevance)



## Miscellaneous

- <https://github.com/mondeja/hledger-fmt> a hledger journal formatter; can integrate with VS Code or other editors

From the mail list, a trick for aligning transaction amounts: 
"Space-indent the account, tab-indent the amount, set a large tab stop."

