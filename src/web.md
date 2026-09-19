# Use the web UI

[hledger-web](hledger-web.md) is hledger's official web browser-based UI.
It's simple but robust, and probably the easiest way to get started with hledger.
Eg on windows, you can download and unpack hledger.zip and double click on hledger-web.exe.

You can see screenshots below, or there's a live demo (in read-only mode) at
<https://demo.hledger.org>.

## Check your installation

Open a
[terminal](https://itconnect.uw.edu/learn/workshops/online-tutorials/web-publishing/what-is-a-terminal/)
or command prompt
and check your hledger-web version.
It should be reasonably [up to date](relnotes.md). 
This doc was last tested with:
```cli
$ hledger-web --version
hledger-web 1.17.1
```

If this fails, check [Installing](install.md) for install and setup tips.

<!--
## Check usage

```cli
$ hledger-web --help
hledger-web [OPTIONS] [PATTERNS]
  start serving the hledger web interface

Flags:
     --serve --server                  serve and log requests, don't browse
                                       or auto-exit
     --serve-api                       like --serve, but serve only the JSON
                                       web API, without the server-side web UI
     --cors=ORIGIN                     allow cross-origin requests from the
                                       specified origin; setting ORIGIN to "*"
                                       allows requests from any origin
     --socket=SOCKET                   use the given socket instead of the
                                       given IP and port (implies --serve)
     --host=IPADDR                     listen on this IP address (default:
                                       127.0.0.1)
     --port=PORT                       listen on this TCP port (default:
                                       5000)
     --base-url=BASEURL                set the base url (default:
                                       http://IPADDR:PORT)
     --file-url=FILEURL                set the static files url (default:
                                       BASEURL/static)
     --capabilities=CAP[,CAP..]        enable the view, add, and/or manage
                                       capabilities (default: view,add)
     --capabilities-header=HTTPHEADER  read capabilities to enable from a
                                       HTTP header, like
                                       X-Sandstorm-Permissions (default:
                                       disabled)

General flags:
...
```
We can see hledger-web has a number of special flags,
as well as all the general flags common to all hledger tools.
For normal local use, we can ignore them all.
-->

## Start hledger-web

Normally, you start hledger-web by running `hledger-web` in a
terminal, with no arguments. Browsing to the executable file and
double-clicking on it can also work.
Normally, this will start the web app, making it accessible only from your local machine.

For this tutorial, to follow the steps/screenshots below and avoid disturbing any
existing data, we'll start hledger-web with a new temporary journal file:
```cli
$ mkdir tmp
$ echo > tmp/.hledger.journal
$ hledger-web -f tmp/.hledger.journal
```

It will print a startup message and keep running, logging any web requests received:
```cli
22/Mar/2020:17:34:19 -0700 [Info#yesod-core] Application launched @(yesod-core-1.6.17.2-1LbNd7zV6uz551mHDWJO3b:Yesod.Core.Dispatch src/Yesod/Core/Dispatch.hs:163:11)
Serving web UI and API on 127.0.0.1:5000 with base url http://127.0.0.1:5000
This server will exit after 2m with no browser windows open (or press ctrl-c)
Opening web browser...
127.0.0.1 - - [22/Mar/2020:17:34:21 -0700] "GET / HTTP/1.1" 303 0 "" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:74.0) Gecko/20100101 Firefox/74.0"
127.0.0.1 - - [22/Mar/2020:17:34:21 -0700] "GET /journal HTTP/1.1" 200 - "" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:74.0) Gecko/20100101 Firefox/74.0"
127.0.0.1 - - [22/Mar/2020:17:34:23 -0700] "GET /static/js/typeahead.bundle.min.js HTTP/1.1" 200 - "http://127.0.0.1:5000/journal" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:74.0) Gecko/20100101 Firefox/74.0"
...
```

You can leave this terminal in the background, or minimised, but don't
quit it (unless you want the web app to quit).

And, your web browser should open, showing the UI.
If not, open it yourself and browse to the url shown,
ie http://127.0.0.1:5000 (and [let us know](support.md)).

## A quick tour

<!-- highslide zooming:
<a href="/images/hledger-web/Screen%20Shot%202020-03-22%20at%206.10.29%20PM.png" class="highslide" onclick="return hs.expand(this)"><img src="/images/hledger-web/Screen%20Shot%202020-03-22%20at%206.10.29%20PM.png" /></a>
-->

Here's the "home" screen, showing the empty default journal.
Or if your journal already contained transactions, you'll see them listed.
"[General Journal](http://en.wikipedia.org/wiki/General_journal)" means the list of transactions, basically.

[![](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.10.29%20PM.png)](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.10.29%20PM.png)

Let's hide the sidebar, for a simpler UI. Pressing the `s` key should do it
(if not, try again after clicking somewhere on the page, and [let us know](support.md)):
[![](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.11.52%20PM.png)](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.11.52%20PM.png)

Let's record some transactions. Press the `a` key, or click "Add a transaction", to bring up the add form.
You may need to click or press `TAB` to focus the Date field:
[![](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.12.04%20PM.png)](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.12.04%20PM.png)

<!-- For dates, you can click the date picker or type the [date](hledger.md#smart-dates). -->
We'll copy the sample transactions from the [5-minute quick start](5-minute-quick-start.md).
Press `TAB` to advance to each next field. 
Amount2 can be left blank, or you can fill in `$-1234` if you prefer:
[![](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.17.53%20PM.png)](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.17.53%20PM.png)

Press `RETURN` or click the add button to save the transaction:
[![](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.18.01%20PM.png)](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.18.01%20PM.png)

Press `a` again to add the next transaction.
As you type "assets:checking", you'll see there's some autocompletion available, since we have used that account before:
[![](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.19.08%20PM.png)](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.19.08%20PM.png)

Finish the transaction, and press `RETURN`:
[![](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.19.26%20PM.png)](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.19.26%20PM.png)

Press `a` and enter the final transaction.
This one has three postings (we spent $100 on groceries and also withdrew $40 as cash). 
As before, you can optionally leave one of the amounts blank:
[![](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.20.17%20PM.png)](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.20.17%20PM.png)

After pressing `RETURN`. The journal now shows three transactions, with the most recent at the top:
[![](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.22.14%20PM.png)](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.22.14%20PM.png)

Now, press `s` to show the sidebar again.
We can see it shows the account hierarchy, and each account's balance, based on the transactions entered so far:
[![](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.22.29%20PM.png)](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.22.29%20PM.png)

Clicking on, eg, `checking` shows the Register for that account - 
a list of the transactions affecting this account, and their running total,
and a chart of that total over time:
[![](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.22.40%20PM.png)](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.22.40%20PM.png)

Press `j`, or click `Journal`, to return to the General Journal page showing everything:
[![](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.22.53%20PM.png)](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.22.53%20PM.png)

Let's try filtering these transactions with a [query](hledger.md#queries).
Type `food` in the search field and press `RETURN`. 
Now we see just the transaction involving a `food` account:
[![](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.24.19%20PM.png)](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.24.19%20PM.png)

Click the `x` button or click `Journal` or press `j` to see all data again.

You can see quick help by pressing `?`, or clicking the `?` button near the search field.
More help is available in the [hledger-web](hledger-web.md) and other manuals, of course:
[![](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.23.44%20PM.png)](images/hledger-web/Screen%20Shot%202020-03-22%20at%206.23.44%20PM.png)

That's mostly it!
Although there are basically just two screens, 
with hledger's full [query language](hledger.md#queries) available
(and with the [general flags](hledger.md#general-options) available on the command line),
you can do a surprising amount with hledger-web.
You can also change
[permissions](hledger-web.md#permissions) to enable
[edit/upload/download access](hledger-web.md#editing-uploading-downloading).


<br>

(Part of [hledger by example](hbe.md).)
