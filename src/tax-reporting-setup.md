# A tax reporting setup

Last updated: 2024

Tax prep is done in a subdirectory of the year.:

    finance/
     2023/
      taxes/
       Health_Insurance_Form1095a_2023.pdf
       (1099s, etc..)
       next.journal -> ../../2024/2024.journal
       prev.journal -> ../../2022/2022.journal
       tax-reports.org.gpg

`tax-reports.org` (optionally encrypted with gpg) is the main thing;
it is an emacs org outline shaped like the tax forms or tax
preparation software (freetaxusa.com in my case). 

For each form item/field, there's an outline heading, and under it one
or more hledger reports designed to show (and explain) the required
information. Here's an excerpt:

```org
* tax preparation for 2023    -*- org-confirm-babel-evaluate:nil; -*-
...
** Income
*** overview
#+begin_src hledger :cmdline -f ../2???.journal -p 2023 bal -Y type:r cur:. -4 --invert
#+end_src

#+RESULTS:
#+begin_example
Balance changes in 2023:
...
#+end_example

*** Common Income
**** Interest Income
#+begin_src hledger :cmdline -f ../2???.journal -p 2023 bal -Y type:r interest --invert
#+end_src

#+RESULTS:
: Balance changes in 2023:
...
```

The reports are embedded as org source blocks.  With cursor on the
command line, `C-c C-c` runs the command and updates the RESULTS.
(The two RESULTS above have different markup, because of output size - 
`(setq org-babel-min-lines-for-block-output ...)` to control this.)

The commands reference `../2???.journal` (2023.journal in this case),
and some of them use `prev.journal` or `next.journal` as well.

I used to define tax-specific account aliases renaming my usual
account names to match the names used in tax forms/tax software, 
but that's work and another layer of confusion, so currently I don't
bother with that.

I have used this setup for a number of years now and for me it gives a
good combination of manageability, tweakability, repeatability, and
persistence/memory across years.

For example, when starting tax prep for a year, I start with a copy of
the previous year's outline, which includes all of last year's reports.
As I press `C-c C-c` in each report, it updates to this year. This is
useful for comparison and sanity checking.  Each year, the process
becomes easier.

([Discussion](https://forum.plaintextaccounting.org/t/taxes/224))
