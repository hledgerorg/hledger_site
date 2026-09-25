# hledger and Emacs

[Emacs](https://www.gnu.org/software/emacs/) works well for editing hledger journals.
Here are the main Emacs packages for hledger, and some tips.
(For other editors, see [Editors](editors.md).)

## Quick start

1. Install [ledger-mode](#ledger-mode), and configure it to run hledger as shown below.
   (Or try [hledger-mode](#hledger-mode), an alternative written for hledger.)
2. Install [flycheck-hledger or flymake-hledger](#error-checking),
   to see problems in your journal as you edit it.
3. Optionally, use [org babel](#org-babel) to keep hledger reports in org files,
   and [calc](#calc) (eg `C-x * q`) for arithmetic during data entry.

## Ledger-mode

<https://github.com/ledger/ledger-mode>
is the most used and maintained Emacs mode for Ledger and hledger files.
Its manual is included (`C-h i m Ledger Mode RET`).

It is designed for Ledger, and some of its features run Ledger-specific commands or options,
so they don't work with hledger (see [below](#what-doesnt-work)).
Its editing features, and most of its reports, work well.

### Configuration

``` elisp
(setq ledger-binary-path "hledger"
      ledger-mode-should-check-version nil
      ledger-report-auto-width nil
      ledger-report-links-in-register nil
      ledger-report-native-highlighting-arguments '("--color=always"))
(add-to-list 'auto-mode-alist '("\\.\\(journal\\|hledger\\)\\'" . ledger-mode))
```

Or, using use-package:

``` elisp
(use-package ledger-mode
  :custom
  ((ledger-binary-path "hledger")
   (ledger-mode-should-check-version nil)
   (ledger-report-auto-width nil)
   (ledger-report-links-in-register nil)
   (ledger-report-native-highlighting-arguments '("--color=always")))
  :mode ("\\.journal\\'" "\\.hledger\\'" "\\.ledger\\'"))
```

This makes ledger-mode run hledger, skips its check of Ledger's version,
turns off two report features which need Ledger-only options,
and shows hledger's colours in reports.

ledger-mode's default reports include a payee report which uses Ledger syntax.
To make it work with hledger, you can customise `ledger-reports` like this (and add your own reports):

``` elisp
(setq ledger-reports
      '(("bal"     "%(binary) -f %(ledger-file) bal")
        ("reg"     "%(binary) -f %(ledger-file) reg")
        ("payee"   "%(binary) -f %(ledger-file) reg payee:%(payee)")
        ("account" "%(binary) -f %(ledger-file) reg %(account)")))
```

### What doesn't work

As of ledger-mode 2026-07:

- **Quick balance display** (`C-c C-p`), **statistics** (`C-c C-l`) and **add transaction** (`C-c C-a`)
  fail, because ledger-mode passes a `--date-format` option, which hledger doesn't have.
  The [compatibility script](#compatibility-script) below fixes these.
- **Reconciling** (`C-c C-r`) fails, because it uses Ledger's `emacs` command.
- **Links from register report entries to transactions**, and **automatic report width**,
  need Ledger's `--prepend-format` and `--columns` options;
  the configuration above turns them off.
- **ledger-mode's own error checking** (`ledger-flymake`, `M-x ledger-check-buffer`) expects Ledger's error messages;
  use flycheck-hledger or flymake-hledger instead.
- **Scheduled transactions** (`ledger-schedule`) are a Ledger-style workflow;
  with hledger you can use [periodic transactions](hledger.md#periodic-transactions) and `--forecast` instead.

### Compatibility script

This script makes quick balance display, statistics and add transaction work,
by converting ledger-mode's Ledger-specific arguments to hledger's.
Save it as an executable file named `ledger-mode-hledger`, somewhere in your PATH,
and configure ledger-mode to run it:

``` elisp
(setq ledger-binary-path "ledger-mode-hledger")
```

(Its name ends with "hledger", which flycheck-hledger and flymake-hledger need, to recognise a ledger-mode buffer as an hledger one.)

<details>
<summary>ledger-mode-hledger</summary>

``` shell
#!/usr/bin/env bash
# ledger-mode-hledger - run hledger for Emacs ledger-mode,
# converting some Ledger-specific arguments.
# Kudos to acarrico for the original script.

iargs=("$@")
oargs=()
date=
for ((i=0; i<${#iargs[@]}; i++)); do
    case ${iargs[i]} in
        --date-format)
            # drop --date-format and its argument
            i=$((i+1))
            ;;
        cleared)
            # for ledger-display-balance-at-point:
            # convert "cleared" to "balance -N -C"
            oargs+=(balance -N -C)
            ;;
        xact)
            # for ledger-add-transaction:
            # convert "xact DATE DESC..." to "print --match DESC...", remembering DATE
            oargs+=(print --match)
            i=$((i+1))
            date=${iargs[i]}
            ;;
        *)
            oargs+=("${iargs[i]}")
            ;;
    esac
done

if [ -n "$date" ]; then
    # show the most similar transaction, with the given date
    hledger "${oargs[@]}" | sed "1s|....-..-..|$date|"
else
    hledger "${oargs[@]}"
fi
```

</details>

More tips: [#367 ledger-mode setup for hledger needs documenting](https://github.com/hledgerorg/hledger/issues/367),
[ledger-mode's hledger-related issues](https://github.com/ledger/ledger-mode/issues?q=label:hledger).

## hledger-mode

<https://github.com/narendraj9/hledger-mode>\
An alternative to ledger-mode, written specifically for hledger, with some different features.

## Error checking

Two packages show problems in your journal as you edit it, by running `hledger check`:
flycheck-hledger and flymake-hledger.
They work in a similar way, with hledger-mode, or ledger-mode configured to run hledger (as above);
the difference is the Emacs checking framework they use.
If you already use [Flycheck](https://www.flycheck.org) (a separate package), choose flycheck-hledger;
otherwise flymake-hledger uses [Flymake](https://www.gnu.org/software/emacs/manual/html_node/emacs/Flymake.html), which is built into Emacs.

To enable extra checks in a particular journal file, you can add a line like this near the top
(using `flycheck-hledger-checks` or `flymake-hledger-checks`):
```elisp
; -*- eval: (setq-local flymake-hledger-checks (append flymake-hledger-checks '("tags"))) -*-
```

### flycheck-hledger

<https://github.com/DamienCassou/flycheck-hledger> shows journal problems using Flycheck.
Use flycheck-hledger 1.1.0 or newer (from MELPA or MELPA Stable),
which supports hledger 1.40 and newer, including hledger 2 (and partially supports hledger 1.26+).

``C-c ! n`` and ``C-c ! p`` step to the next and previous problem in the current file,
and `M-x flycheck-first-error` goes back to the first one.
(Emacs's general ``C-x ` `` (`next-error`) also steps through problems, and ``C-u C-x ` `` restarts from the first one.
But when several files are open, these jump back to the file where you first used them.)

Sample config:
```elisp
(use-package flycheck-hledger
  :after (flycheck ledger-mode)  ; or hledger-mode
  :ensure t
  :demand t
  :custom
  (flycheck-hledger-strict t)
  (flycheck-hledger-checks '("ordereddates" "recentassertions"))   ; extra checks from https://hledger.org/hledger.html#check: ordereddates, uniqueleafnames, payees, recentassertions, tags..
  ;(flycheck-hledger-executable "hledger")
  )
```

Currently flycheck-hledger always runs hledger with the `--auto` flag,
so be aware that any auto posting rules will be active.

### flymake-hledger

<https://github.com/DamienCassou/flymake-hledger> shows journal problems using Flymake.
Use the latest version (from MELPA).
Updated support for hledger 1.40 and newer, including hledger 2, is in progress
([#8](https://github.com/DamienCassou/flymake-hledger/pull/8));
until it is released, some error messages are shown incompletely.

Flymake doesn't bind keys for navigating problems by default; the sample config below binds the same keys as flycheck.
``C-c ! n`` and ``C-c ! p`` step to the next and previous problem, and ``C-c ! l`` lists them.

Sample config:
```elisp
(use-package flymake
  :bind (:map flymake-mode-map
         ("C-c ! n" . flymake-goto-next-error)
         ("C-c ! p" . flymake-goto-prev-error)
         ("C-c ! l" . flymake-show-buffer-diagnostics)))

(use-package flymake-hledger
  :ensure t
  :hook (ledger-mode . flymake-hledger-enable)  ; or hledger-mode
  :custom
  (flymake-hledger-checks '("accounts" "commodities" "balanced" "ordereddates" "recentassertions"))   ; checks from https://hledger.org/hledger.html#check
  ;(flymake-hledger-command '("hledger"))
  ;(flymake-show-diagnostics-at-end-of-line t)  ; Emacs 30+
  )
```

flymake-hledger doesn't add the `--auto` flag, so auto posting rules are active only if
your [hledger config file](hledger.md#config-files) or `flymake-hledger-command` includes it.

## org babel

org babel (ob) is the system for evaluating code blocks embedded in org outlines.
ob-hledger.el adds hledger support, so that
hledger reports can be embedded within an org outline, 
and easily evaluated inline or exported in various formats.
If you have many reports, this can be a nice way to save and organise and interactively update them.

In 2021 a number of org addons including ob-hledger.el were moved from org to the separate org-contrib package. 
As of 2025 the primary hosting for this seems to be <https://git.sr.ht/~bzg/org-contrib>.
Here are the [ob-hledger.el changes](https://git.sr.ht/~bzg/org-contrib/log/master/item/lisp/ob-hledger.el).

To enable org-contrib in emacs:

- `M-x list-packages`, install org-contrib
- In your emacs config, add: `(require 'ob-hledger)`\
  (and evaluate it with `C-M-x`, or a restart)
- In any org file, add hledger commands like this:

    ```
    #+begin_src hledger :cmdline -f ~/finance/2022.journal balance
    #+end_src
    ```
- To evaluate the command inline, press `C-c C-c` with point (cursor) inside the above line
- To update all such reports in the file, press `C-c C-v b`
- To export all reports:
  - as html, and open in browser:   `C-c C-e h o`
  - as html:                        `C-c C-e h h`
  - as UTF-8 text:                  `C-c C-e t U` 
  - as markdown (if configured):    `C-c C-e m o`
  - etc.
- To export only the reports in the current subtree:
  - configure it at top of org file: `# -*- org-export-initial-scope:subtree; -*-`
  - put point in the desired subtree before exporting as above

See also
[Using Ledger for Accounting in Org-mode with Babel](https://orgmode.org/worg/org-contrib/babel/languages/ob-doc-ledger.html)

## calc

Calc can help perform arithmetic on amounts in the buffer during data entry.
Position the cursor anywhere in the number, then use `C-x * w` to enter embedded Calc mode, and `q` to exit.

Eg to halve an amount: put the cursor at the number, then `C-x * w 2 / q`

Note Calc rewrites decimal numbers to a standard format, hiding trailing zeros by default, which you may not want.
To preserve trailing zeros, you must force a fixed number of decimal digits. 
In calc mode (eg before pressing q above) do:
- `d f 2 return`   to force two digits (eg shows .00)
- `d f 3 return`   to force three digits (eg shows .005 when there's a half cent)
- `d n`            to choose normal mode (shows all digits except trailing zeros)

And to ensure that such config changes are saved in (and reloaded from) ~/.emacs.d/calc.el rather than the current buffer, add this to your emacs config:
```lisp
(setq calc-mode-save-mode 'save)
```


## Misc

To list the TODO notes in the current journal, use `M-x occur RET TODO: RET`.
To search several files, use `M-x lgrep` or `M-x rgrep`.
