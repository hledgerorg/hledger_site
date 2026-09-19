# Converting time to money

Last updated: 2023

Perhaps you track billable hours with hledger,
and you'd like to see those hours as money.
The method depends on where you store time records:

## Journal files

If you might have a different rate for each job, 
and there aren't too many transactions per job:
you could record the rate as a cost (`2h @ $100`),
and run a [cost report](hledger.md#cost-reporting) with `-B/--cost`.

When the rate doesn't change much and there are many transactions,
it's more convenient to declare it with a P directive,
and run a [value report](hledger.md#value-reporting) with `-V`/`-X`.

## Timeclock files

You can't write P directives in timeclock format, 
but you can include the timeclock file(s) from a journal file,
and write the directives there. (See below.)

## Timedot files

Timedot files can't hold P directives, so [include](hledger.md#include-directive)
them from a journal file, which can.
Also timedot amounts normally have no commodity symbol, making them hard to price;
but you can give them one with the [`D` directive](hledger.md#default-commodity):

    # 2022-time.journal
    D 1.0 h
    P 2022-01-01 h $100
    include 2022.timedot

<!-- -->

    # 2022.timedot
    2022-01-01
    a   ....

<!-- -->

    $ hledger -f 2022-time.journal bal 
                   1.0 h  a
    --------------------
                   1.0 h  

    $ hledger -f 2022-time.journal bal -V
                    $100  a
    --------------------
                    $100  

If your rate changes, start a new timedot file:

    # 2022-time.journal
    D 1.0 h

    P 2022-01-01 h $100
    include 2022.timedot

    P 2022-03-01 h $120
    include 2022b.timedot

<!-- -->

    $ hledger -f 2022-time.journal bal -MVTA
    Balance changes in 2022Q1, valued at period ends:
    
       ||  Jan  Feb   Mar    Total  Average 
    ===++===================================
     a || $100    0  $120     $220      $73 
    ---++-----------------------------------
       || $100    0  $120     $220      $73 

