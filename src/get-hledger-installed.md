# Get hledger installed

Each new hledger version is better than the preceding ones, so using the latest is ideal.
And you'll want to have it installed somewhere in your system's PATH, so that you can just type "hledger" and it runs.

[Install](install.md) shows all the ways to get hledger installed on your computer.
But here's a quick way: install the official release binaries, 
by copy/pasting the appropriate command below into a [terminal] window.

[terminal]: https://itconnect.uw.edu/learn/workshops/online-tutorials/web-publishing/what-is-a-terminal/

On a Linux machine with an intel processor:
```
curl -sL https://github.com/hledgerorg/hledger/releases/latest/download/hledger-linux-x64.tar.gz | tar -xzv -f- -C/usr/local/bin hledger hledger-ui hledger-web
```

On a Linux machine with an ARM processor:
```
curl -sL https://github.com/hledgerorg/hledger/releases/latest/download/hledger-linux-arm64.tar.gz | tar -xzv -f- -C/usr/local/bin hledger hledger-ui hledger-web
```

On a modern mac with an ARM ("M") processor:
```
curl -sL https://github.com/hledgerorg/hledger/releases/latest/download/hledger-mac-arm64.tar.gz | tar -xzv -f- -C/usr/local/bin hledger hledger-ui hledger-web
```

On an older mac with an intel processor:
```
curl -sL https://github.com/hledgerorg/hledger/releases/latest/download/hledger-mac-x64.tar.gz | tar -xzv -f- -C/usr/local/bin hledger hledger-ui hledger-web
```

On a Windows machine with an intel or ARM processor:\
(To get a terminal window, type: Windows-R, powershell, Return)
```
cd ~
curl https://github.com/hledgerorg/hledger/releases/latest/download/hledger-windows-x64.zip -OutFile hledger-windows-x64.zip
Expand-Archive hledger-windows-x64.zip -Force -DestinationPath AppData\Roaming\local\bin
```

The end result should be that you can run `hledger --version` and see the current release version
(the one shown at the top of the [Install](install.md) page):
```
$ hledger --version
hledger 1.52.4 ...
```

The examples in this book assume you are using this latest hledger version.
(And if you're on Windows, that you are using powershell, not CMD.EXE.)

Press the right arrow key again (or click the right arrow button) to step to the next page.

<br>

(Part of [hledger by example](hbe.md).)
