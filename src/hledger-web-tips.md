# hledger-web tips

Last updated: 2019

## Edit, upload, download

hledger-web does allow you to edit, upload or download the whole journal file, but for some time it has been undocumented.
Use the --capabilities flag to add "manage" permission:
```
$ hledger-web --capabilities=view,add,manage
```
Then you'll see a new spanner button to the right of the search bar. Click this to edit, upload or download your main data file or included files.

The url for the editform looks like this:
```
http://127.0.0.1:5000/edit/%2Fabsolute%2Fpath%2Fno%2Fsymlinks%2Fto%2Fdesired.file
```

See also: <http://hledger.org/hledger-web.html#permissions>
