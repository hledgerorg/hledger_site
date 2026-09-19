# Time planning

Last updated: 2023

Some notes relating to time tracking and budgeting.

## See also

- [hledger manual > Timedot format](hledger.md#timedot-format)
- [hledger manual > Timeclock format](hledger.md#timeclock-format)
- <https://github.com/linuxcaffe/task-timelog-hook> - use hledger for time reporting with Taskwarrior's task start/stop times.

## A time budgeting workflow

A [summary](https://news.ycombinator.com/item?id=19203521) of Simon's 2018-2019 time budgeting workflow:

I keep a hledger [timedot](hledger.md#timedot-format) file open in a text-mode Emacs
in a drop-down [iTerm hotkey window](https://iterm2.com/features.html#hotkey-window). 

Each 15-minute chunk is logged with a dot. 
I group the dots into hours for quick visual scanning.
I use comments as temporary reminders, if needed.
Sometimes I use `M-x align-regexp`, ` [.;]` to line up the dots (or comments)


    2019-01-08
    fos.hledger.sup          .
    adm.email                ..
    adm.finance              .... .... ..
    fos.hledger.issues.941   .... .
    fos.plaintextaccounting  ; 1045
    biz.dev                  ; do such and such

I've trained myself to update this often while at the computer, and before walking away. 
If I forget, retroactive logging is also pretty easy. These help:

- work in quarter/half/whole hour chunks, preferably synced with the clock
- have a script or updating terminal pane showing today's sleep/wake/timelog-saved times, to jog the memory.

Not every day is the same; this system has been quick and flexible enough to suit a range of conditions. 

## How to set up a time budget

I can set daily/weekly/monthly time [budgets](budgeting.md) if I want:

* create a `time.journal` which includes your (timedot or timeclock) time log file (assuming you're not tracking time in journal format)
    ```journal
    # time.journal
    include time.timedot
    ```
* choose a budget interval, eg daily, weekly or monthly
* if you have some historical timelog data, review average spending on that interval to get a baseline
    ```cli
    $ hledger -f time.journal date:thisyear bal -WA
    ```
* in time.journal add a periodic transaction rule to allocate budget amounts, similar to baseline, on that interval
    ```journal
    ~ weekly
        (adm:time)       1h
        (ser:some:proj)  4h
    ```
* run a budget report, using the same interval:
    ```cli
    $ hledger -f time.journal bal --budget -W
    Balance changes in 2017/11/27w48:

                ||     2017/11/27w48 
    ===============++===================
    adm:time      || 0.25h [25% of 1h] 
    ser:some:proj || 0.75h [19% of 4h] 
    ---------------++-------------------
                ||             1.00h 
    ```               

## Simon's hledger time dashboard (2018)

Here's how I have been logging time for a few years. I have four files:

1. time-2018.timedot is the current year's time log. It contains daily entries in [timedot](hledger.md#timedot)-ish format, like:

       2018/5/7
       adm.email             20m
       inc.client1.enh.1342  .... .
       inc.client1.enh.1188  .
       inc.client1.enh.1335  ..
       fos.hledger.support
    
2. time.journal is in [journal](hledger.md) format so it can [include](hledger.md#include-directive) multiple timedot file(s) and provide an [account alias](hledger.md#account-aliases) allowing period instead of colon in account names:

       ; allow . as subaccount separator in timedot files
       alias /\./=:
       
       ;include time-2016.timedot
       ;include time-2017.timedot
       include time-2018.timedot

3. time-daily.budget defines some daily goals, optionally date-bounded, using [periodic transaction(s)](hledger.md#periodic-transactions):

       ~ daily  ; [from Y/M/D] [to Y/M/D]
           (adm)    1  ; your goals here
           (inc)    1
           (fos)    1
  
4. time-weekly.budget defines some weekly goals. I like to set these independently of the above, which in current hledger means they must be in a separate file:

       ~ weekly  ; [from Y/M/D] [to Y/M/D]
           (adm)    1
           (biz)    1
           (inc)    1
           (fos)    1
  
The monthly budget reuses the weekly goals.

I have an iTerm2 Hotkey Window (a terminal that drops down on ALT-space) with six panes:

1. a bash script showing latest laptop wake/sleep and timelog save times, as a memory aid for time logging:

       tlogwatch

    (Here's that script, useful only to mac users; please show me something better!):

        # record timelog update times
        export TIMELOG=$HOME/time-2018.timedot
        alias timelogsaved="ls -lT $TIMELOG | cut -d' ' -f8-11"
        alias timelogaccessed="ls -lTu $TIMELOG | cut -d' ' -f8-11"
        alias timelogcreated="ls -lTU $TIMELOG | cut -d' ' -f8-11"
        
        # show mac sleep/wake & display on/off  events
        alias wakelog="pmset -g log | egrep -E '((Sleep|Wake) +\t|Display is)' | sed -E \
              -e 's/(Notification|Sleep|Wake) *	//' \
              -e 's/is turned //' \
              -e 's/Entering Sleep state/Sleep/' \
              "
        
        # show recent wakeup/timelog save times to help with time logging, clipped to screen width
        # The width clipping is to help watch display this in dashboard.
        function tlog()
        {
          LINES=${1:-20}
          ( wakelog | tail -$LINES
            printf " \n"
            printf "$(timelogcreated) timelog created\n"
            printf "$(timelogsaved) timelog saved\n"
            printf "$(timelogaccessed) timelog accessed\n"
          ) | cut -c-$(expr $COLUMNS - 1)
        }
        
        # run a brief tlog report periodically, passing any args to watch
        function tlogwatch()
        {
          LINES=${1:-20}
          shift
          watch -t -n60 $@ "bash -ic 'tlog '$LINES"
        }
        # TODO why does "tlogwatch 10" give "sh: 10: command not found" ?


2. a text-mode emacs for updating the time log:

       emacs -nw time-2018.timedot

3. -5: updating (using [entr](https://eradman.com/entrproject/)) time [budget reports](hledger.md#budget-report) for the current day/week/month, using [hledger 1.9.1+](install.md):

    ```
    ls time.journal time-2018.timedot time-daily.budget  | entr sh -c 'clear; hledger -f time.journal -f time-daily.budget  bal --budget -1 -D date:today-tomorrow'
    ```
    ```
    ls time.journal time-2018.timedot time-weekly.budget | entr sh -c 'clear; hledger -f time.journal -f time-weekly.budget bal --budget -1 -W date:thisweek-nextweek'
    ```
    ```
    ls time.journal time-2018.timedot time-weekly.budget | entr sh -c 'clear; hledger -f time.journal -f time-weekly.budget bal --budget -1 -M date:thismonth-nextmonth'
    ```

6. an updating [hledger-ui](hledger-ui.md) for exploring time usage (shift-up/down to resize period, shift-left/right to step through time, t to return to today):

       hledger-ui --watch --change date:today -f time.journal

