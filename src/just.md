# hledger and just

Last updated: 2024

<https://github.com/casey/just> is a cross platform task runner -
like [make](https://en.wikipedia.org/wiki/Make_(software)),
but easier and more suitable for running commands (and more cross platform).
It is a nice tool for creating (and remembering!) financial reports and scripts.

Define commands (AKA "recipes") in a `Justfile` in your finance directory.
Each recipe can be a single command line, a shell script, or any other kind of shebang script.
Here's [just's manual](https://just.systems/man/en).

We provide an example [Scripts > Justfile](scripts.md#justfile),
but of course you can customise this with your own reports
or start fresh with `just --init`.
Then you can

```cli
$ just -lu         # list your commands, with descriptions, in original order
$ just CMD [ARGS]  # run a command, optionally with extra arguments
$ just --choose    # pick a command interactively
$ alias j=just     # use an easier-to-type alias
```

Our justfile's commands pass any extra arguments to hledger,
but this does not work for arguments containing spaces, so avoid those:
```cli
$ just x food -p 'last month'   # bad
$ just x food -plastmonth       # good
```

## Interactive choosing

`just --choose` will let you choose a command interactively,
by default using `fzf` and showing a preview of the system command(s) that will be run.

You can configure a different chooser with --chooser or JUST_CHOOSER
([Just > Selecting Recipes to Run With an Interactive Chooser](https://just.systems/man/en/chapter_51.html)).
Eg on mac, this shows a GUI chooser:

```cli
$ brew install choose-gui
$ export JUST_CHOOSER=choose
$ just --choose
```

## Showing report output in the preview pane

This is great for selecting and viewing reports.
Careful - it will run every command you select! 
So be sure your commands are safe and reasonably quick to run (eg hledger reports).
Then:

```cli
$ export JUST_CHOOSER="fzf --preview='just {}'"
$ just --choose
```

With [bkt](https://github.com/dimo414/bkt),
you can cache these outputs, making slow reports display instantly
(here's more on [--ttl and --stale](https://github.com/dimo414/bkt#cache-lifespan) and [using bkt with fzf](https://github.com/dimo414/bkt/discussions/29)):

```cli
$ export JUST_CHOOSER="fzf --preview='bkt --ttl=15m --stale=15s -- just {}'"
$ just --choose
```

## just view

The example justfile has a `view` command with the above configuration built in.
It uses `fzf` and `bkt` (and ignores JUST_CHOOSER).
It takes one dummy argument, and optional additional fzf arguments:

```cli
$ just view -
$ just view - --black
```

There is also a `pick` command which does not run commands while selecting.
It uses JUST_CHOOSER, or `fzf` with the command source as preview.
`view` uses fzf's --reverse flag; you could make `pick` do the same like so:

```cli
$ export JUST_CHOOSER="fzf --preview='-- just --show {}' --reverse"
```

## Excluding commands from the chooser

If you want preview the output of some commands but not of others
(eg, because they have side effects),
you could move those commands to a separate just file.

Or, you can make sure they are declared with a required argument,
adding a dummy argument if necessary (as in the example file).
Commands with required arguments are always excluded from the chooser.
(Note this excludes them from the chooser entirely, not just from previewing,
but they can be run from the command line, writing `-` for the dummy argument.)

