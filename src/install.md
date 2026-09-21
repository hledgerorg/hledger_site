# Install

The current stable hledger release is **1.52.4**. <!-- for setup command: "current hledger release" --> \
The current preview release is **1.99.4** (2.0 preview 4).

Both versions are suitable for daily use. hledger 1 is receiving only essential fixes;
the hledger 2 previews are strictly better, highly compatible,
and by using the latest you help make the final 2.0 release (coming later this year) better.
We also have some notes on AI usage.
See the full **[release notes](relnotes.md)** for all releases.

You can install hledger by any of these methods:

- Install [official binaries](#official-binaries) from Github (quick)
- Install [packaged binaries](#packaged-binaries) (quick; not always up to date)
- Install binaries you [build from source](#build-from-source) (takes longer)

and then, [check your setup](#check-your-setup).

<!-- [Your feedback](support.md) helps make this process smoother. -->

## Official binaries

Official release binaries for Linux, Mac, and Windows are provided in the hledger github repo.
You can click the badge below to install them manually,
or copy-paste the install command from [Get hledger installed](get-hledger-installed.md),
or use a download tool like [eget](https://github.com/zyedidia/eget?tab=readme-ov-file#how-to-get-eget):
<!-- ([![RSS](images/rss.png) RSS feed](https://github.com/hledgerorg/hledger/releases.atom)). -->

[![hledger release binaries](https://img.shields.io/badge/hledger_release_binaries-1.52.4-brightgreen.svg)][release binaries]
`eget hledgerorg/hledger --all`\
[![hledger preview binaries](https://img.shields.io/badge/hledger_release_binaries-1.99.4-brightgreen.svg)][release binaries]
`eget hledgerorg/hledger --all --pre-release`

[release binaries]:    https://github.com/hledgerorg/hledger/releases/tag/1.52.4
[prerelease binaries]: https://github.com/hledgerorg/hledger/releases/tag/nightly

## Packaged binaries

Homebrew (Mac, Linux) <!-- chenrui ? --> \
[![Homebrew](https://repology.org/badge/version-for-repo/homebrew/hledger.svg)](https://formulae.brew.sh/formula/hledger) `brew install hledger`

Windows \
[![Scoop](https://repology.org/badge/version-for-repo/scoop/hledger.svg)](https://scoop.sh/#/apps?q=hledger) `scoop install hledger` \
[![Winget](https://img.shields.io/badge/Winget_package-1.52.3-e05d44.svg)](https://github.com/microsoft/winget-pkgs/tree/master/manifests/s/hledgerorg/hledger) `winget install -e --id simonmichael.hledger` \
[![Chocolatey](https://repology.org/badge/version-for-repo/chocolatey/hledger.svg)](https://community.chocolatey.org/packages/hledger) `choco install hledger -y`
<!--
https://learn.microsoft.com/en-us/windows/package-manager/winget/#use-winget
https://github.com/microsoft/winget-cli/issues/210: Some users have reported isssues with the client not being on their PATH 
Installs to `C:\Users\Simon\AppData\Local\Microsoft\WinGet\Links\hledger.exe`.\
On ARM machines this runs via emulation (slower than normal).\
hledger-ui and hledger-web aren't available via winget yet.
-->

Docker (Linux, Mac, Windows) <!-- adept --> ([more](https://hub.docker.com/search?q=hledger&type=image&sort=updated_at&order=desc)) \
[![Docker](https://img.shields.io/badge/Docker_image-1.52.4-brightgreen.svg)](https://hub.docker.com/r/dastapov/hledger) `docker pull dastapov/hledger`

BSD \
[![freebsd ports](https://repology.org/badge/version-for-repo/freebsd/hledger.svg)](https://www.freshports.org/search.php?query=hledger) `pkg install hs-hledger hs-hledger-ui hs-hledger-web` \
![openbsd ports](https://repology.org/badge/version-for-repo/openbsd/hledger.svg) `pkg_add hledger`

Nix (Linux, Mac) <!-- maralorn, chvp --> 
([Troubleshooting](https://hledger.org/hledger.html#troubleshooting),
[#1030](https://github.com/hledgerorg/hledger/issues/1030),
[#1033](https://github.com/hledgerorg/hledger/issues/1033),
[#2089](https://github.com/hledgerorg/hledger/issues/2089)) \
[![Nix](https://repology.org/badge/version-for-repo/nix_unstable/hledger.svg)](https://search.nixos.org/packages?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=hledger)
`nix-shell -p hledger hledger-ui hledger-web` 

GNU/Linux

Alpine <!-- dhruvin --> \
[![Alpine edge](https://repology.org/badge/version-for-repo/alpine_edge/hledger.svg)](https://pkgs.alpinelinux.org/packages?name=hledger*&branch=edge) `doas apk add hledger hledger-ui hledger-web`\
[![Alpine 3.24](https://repology.org/badge/version-for-repo/alpine_3_24/hledger.svg)](https://pkgs.alpinelinux.org/packages?name=hledger*&branch=v3.24)\
[![Alpine 3.23](https://repology.org/badge/version-for-repo/alpine_3_23/hledger.svg)](https://pkgs.alpinelinux.org/packages?name=hledger*&branch=v3.23)\
[![Alpine 3.22](https://repology.org/badge/version-for-repo/alpine_3_22/hledger.svg)](https://pkgs.alpinelinux.org/packages?name=hledger*&branch=v3.22)\
[![Alpine 3.21](https://repology.org/badge/version-for-repo/alpine_3_21/hledger.svg)](https://pkgs.alpinelinux.org/packages?name=hledger*&branch=v3.21)
<!-- [![Alpine 3.20](https://repology.org/badge/version-for-repo/alpine_3_20/hledger.svg)](https://pkgs.alpinelinux.org/packages?name=hledger*&branch=v3.20)\ -->
<!-- [![Alpine 3.19](https://repology.org/badge/version-for-repo/alpine_3_19/hledger.svg)](https://pkgs.alpinelinux.org/packages?name=hledger*&branch=v3.19)\ -->
<!-- [![Alpine 3.18](https://repology.org/badge/version-for-repo/alpine_3_18/hledger.svg)](https://pkgs.alpinelinux.org/packages?name=hledger*&branch=v3.18)\ -->

Arch \
[![Arch](https://repology.org/badge/version-for-repo/arch/hledger.svg)](https://archlinux.org/packages/extra/x86_64/hledger/) `pacman -Sy hledger hledger-ui hledger-web`

Debian <!-- Clint --> ([more](https://packages.debian.org/search?searchon=names&keywords=hledger)): \
[![Debian unstable](https://repology.org/badge/version-for-repo/debian_unstable/hledger.svg)](https://packages.debian.org/unstable/hledger) `apt install hledger hledger-ui hledger-web`\
[![Debian testing](https://img.shields.io/badge/Debian_testing_package-1.52.1-e05d44.svg)](https://packages.debian.org/testing/hledger)\
[![Debian stable](https://img.shields.io/badge/Debian_stable_package-1.32.3-e05d44.svg)](https://packages.debian.org/stable/hledger)\
[![Debian oldstable](https://img.shields.io/badge/Debian_oldstable_package-1.25-e05d44.svg)](https://packages.debian.org/oldstable/hledger)

Fedora ([more](https://src.fedoraproject.org/rpms/hledger)) \
![Fedora_45](https://img.shields.io/badge/Fedora_45_package-1.43.2-e05d44.svg) `dnf install hledger`\
![Fedora_44](https://img.shields.io/badge/Fedora_44_package-1.43.2-e05d44.svg)\
![Fedora_43](https://img.shields.io/badge/Fedora_43_package-1.40-e05d44.svg)\
![Fedora_42](https://img.shields.io/badge/Fedora_42_package-1.32.3-e05d44.svg)
<!-- ![Fedora_41](https://img.shields.io/badge/Fedora_41_package-1.32.3-e05d44.svg) -->
<!-- ![Fedora_40](https://img.shields.io/badge/Fedora_40_package-1.30.1-e05d44.svg) -->
<!-- ![Fedora_39](https://img.shields.io/badge/Fedora_39_package-1.30.1-e05d44.svg)\ -->
<!-- ![Fedora_38](https://img.shields.io/badge/Fedora_38_package-1.27.1-e05d44.svg)\ -->

Gentoo <!-- ezzie --> \
[![Gentoo](https://img.shields.io/badge/Gentoo_package-1.52.1-e05d44.svg)](https://gentoo.zugaina.org/Search?search=hledger) `eselect repository enable haskell && emerge hledger hledger-ui hledger-web`

Raspberry Pi (unaudited) <!-- nobodyinperson --> \
![Raspberry Pi release binaries](https://img.shields.io/badge/Raspberry_Pi_release_binaries-1.22.1-e05d44.svg)
[hledger-linux-arm32v7.zip](https://github.com/hledgerorg/hledger/releases/tag/1.22.1) \
![Raspberry Pi contributed binaries](https://img.shields.io/badge/Raspberry_Pi_contributed_binaries-1.18.1-e05d44.svg)
[hledger-aarch64-manjaro.gz](https://github.com/hledgerorg/hledger/releases/tag/1.18.1) ,
[hledger-armhf32-debian.gz](https://github.com/hledgerorg/hledger/releases/tag/1.18)

Ubuntu ([more](https://packages.ubuntu.com/search?suite=all&searchon=names&keywords=hledger)) \
[![ubuntu_26_04](https://repology.org/badge/version-for-repo/ubuntu_26_04/hledger.svg)](https://packages.ubuntu.com/resolute/hledger) `apt install hledger hledger-ui hledger-web`\
[![ubuntu_25_10](https://repology.org/badge/version-for-repo/ubuntu_25_10/hledger.svg)](https://packages.ubuntu.com/questing/hledger) \
[![ubuntu_25_04](https://repology.org/badge/version-for-repo/ubuntu_25_04/hledger.svg)](https://packages.ubuntu.com/plucky/hledger) \
[![ubuntu_24_04](https://repology.org/badge/version-for-repo/ubuntu_24_04/hledger.svg)](https://packages.ubuntu.com/noble/hledger) 
<!-- [![ubuntu_22_04](https://repology.org/badge/version-for-repo/ubuntu_22_04/hledger.svg)](https://packages.ubuntu.com/jammy/hledger) -->
<!-- [![ubuntu_20_04](https://repology.org/badge/version-for-repo/ubuntu_20_04/hledger.svg)](https://packages.ubuntu.com/focal/hledger) -->
<!-- [![ubuntu_18_04](https://repology.org/badge/version-for-repo/ubuntu_18_04/hledger.svg)](https://packages.ubuntu.com/bionic/hledger)\ -->

Void \
[![Void Linux x86_64](https://repology.org/badge/version-for-repo/void_x86_64/hledger.svg)](https://voidlinux.org/packages/?q=hledger) `xbps-install -S hledger hledger-ui hledger-web`

Sandstorm (web) \
[![Sandstorm](https://img.shields.io/badge/Sandstorm_app-1.31-e05d44.svg)](https://apps.sandstorm.io/search?term=hledger)
[HLedger Web sandstorm app](https://apps.sandstorm.io/app/8x12h6p0x0nrzk73hfq6zh2jxtgyzzcty7qsatkg7jfg2mzw5n90)
<!-- jacob weisz -->



## Build from source

Building hledger requires the GHC compiler and either the stack or cabal build tool
which you can install with your package manager (brew, apt, winget..), with [ghcup], or with [stack] (simplest).
Or, you can use docker. All this may need perhaps 4G of RAM and 4G or more of disk space.

### Building outside the source tree

You can in theory use stack or cabal to build your own hledger binaries, 
without first getting a copy of the source with git, using commands like these:

    stack install hledger hledger-ui hledger-web

or (tested with ghc 9.14.1):

    cabal install hledger hledger-ui hledger-web --constraint 'ram<0' --allow-newer containers --overwrite-policy=always

But as of 2026-06 this method cannot be relied on, and should be avoided.
Instead, get a copy of the hledger source and build from there, as described below.
This will work around current ecosystem breakages and avoid some dependency-related bugs.

### On Mac

You will need the XCode Command Line Tools. Homebrew or macports will probably also be helpful.

Possible issues:
- [mac m1: ffitarget_arm64.h file not found](https://gitlab.haskell.org/ghc/ghc/-/issues/20592)


### On Unix/Linux

You will need 

1. Certain C libraries, to avoid build errors like "cannot find -ltinfo".
   The exact package names will be specific to your system, but here are some likely install commands:
   - Debian-based systems: `apt install libgmp-dev libncurses-dev zlib1g-dev`
   - Older Debian systems: `apt install libgmp3-dev libncurses5-dev zlib1g-dev`
   - Redhat-based systems: `dnf install gmp-devel ncurses-devel zlib-devel`
   - Arch: `pacman -S gmp ncurses zlib`
   - Alpine: `apk add gmp-dev ncurses-dev zlib-dev`
   - openSUSE: `zypper install gmp-devel ncurses-devel zlib-devel`
   - FreeBSD: `pkg install gmp ncurses`

2. A configured system locale that specifies a text encoding;
  otherwise you'll see text decoding errors when processing non-ascii characters.
  For example, on most unix systems `echo $LANG` should show something like `en_US.UTF-8` or `zh_CN.GB2312` or `C.UTF-8` - 
  it should not be just `C`, or unset.
  This is discussed more in [Text encoding](#text-encoding), below.

Get the [hledger source code](https://github.com/hledgerorg/hledger/commits/main) with [git](https://git-scm.com):

    git clone https://github.com/hledgerorg/hledger
    cd hledger
    git checkout 1.52.4   # switch to the latest release tag (optional)

Then build and install with stack:

    stack update; stack install

or with cabal:

    cabal update; cabal install all:exes

or with docker:

    cd docker; ./build.sh   # or build-dev.sh to keep build artifacts

Possible issues:
- [arch: haskell build advice from Arch wiki](https://wiki.archlinux.org/index.php/Haskell)
- [openbsd 6: exec: permission denied](https://deftly.net/posts/2017-10-12-using-cabal-on-openbsd.html)
- [openbsd: stack install tips](https://github.com/commercialhaskell/stack/issues/3313#issuecomment-570353913)

### On Windows

These notes are for Windows 11.
On Windows, stack is the easiest way to get the haskell tools.
(Though if you are on a Windows ARM machine, stack will install slow x86_64 versions of the tools, and build slow x86_64 hledger binaries.)

First, apply all windows updates (to get the latest TLS certificates for network requests).

Install [stack] - in a command or powershell window, run:

    winget install -e --id commercialhaskell.stack

Install [git]:

    winget install -e --id Git.Git

Get the hledger source:

    git clone https://github.com/hledgerorg/hledger
    cd hledger
    git checkout 1.52.4   # switch to the latest release tag (optional)

Build and install hledger:

    stack update
    stack install

On Windows, this may die repeatedly with a "... permission denied (Access is denied.)" error; 
we [don't know why](https://github.com/commercialhaskell/stack/issues/2426).
Just run it again to continue (press up arrow, enter).

On Windows, things work best if you build in the environment where you will use hledger.
Eg don't build it in a WSL or MINGW window if you plan to use it in CMD or Powershell.

Possible issues:
- [windows: cross-environment non-ascii display issues](https://github.com/hledgerorg/hledger/issues/961#issuecomment-471229644)

### On Nix

Possible issues:
- [nix: nix install on linux can fail with "cloning builder process: Operation not permitted"](https://github.com/hledgerorg/hledger/issues/1030)
- [nix: on Linux, nix-installed hledger won't handle non-ascii data](https://github.com/hledgerorg/hledger/issues/1033)

### On Android

Here's 
[how to build hledger on Android with Termux](https://libera.ems.host/_matrix/media/r0/download/libera.chat/51835530d2b9eed094096d8a2c79e03dda2c35fb),
if your phone has plenty of memory.

### Build tips

- Building the hledger tools and possibly all their dependencies could take anywhere from a minute to an hour.
- On machines with less than 4G of RAM, the build may use swap space and 
  take much longer (overnight), or die part-way through. 
  In such low memory situations, try adding `-j1` to the stack/cabal install command, 
  and retry a few times, or [ask](support.md) for more tips.
- You could build just the hledger CLI to use less time and space: instead of `stack install`, run `stack install hledger`
- It's ok to kill a build and rerun the command later; you won't lose progress.
- You can add `--dry-run` to the install command to see how much building remains.

## Check your setup

With modern hledger versions, you should now run:

    hledger setup

to check your installation. If this doesn't work, read on..

### PATH

After installing, try to run the hledger tools (hledger, hledger-ui, hledger-web) and look for the expected versions. Eg:

    $ hledger --version
    hledger 1.52.4-...-20260910, mac-aarch64

If this doesn't work, you may need to add the binaries' install directory to your shell's PATH.

stack or cabal show the install directory in their output, and warn you if it is not in PATH.
It could be, eg:
- `~/.local/bin` or `C:\Users\USER\AppData\Roaming\local\bin\` (stack) 
- `~/.cabal/bin` or `C:\Users\USER\AppData\Roaming\cabal\bin\` (cabal) 

On unix, these commands will add both bin directories to PATH permanently (probably):

    echo "export PATH=~/.local/bin:~/.cabal/bin:$PATH" >> ~/.profile
    source ~/.profile

On Windows, here's [how to set environment variables](https://www.devdungeon.com/content/set-environment-variables-windows).


<a name="locale"></a> <!-- required permalink, maybe used in some error messages -->
<a name="text-encoding"></a> <!-- newer required permalink, used elsewhere -->

### Text encoding

Data files containing non-ascii characters are saved with a text encoding - UTF-8, Latin-1, CP-437, or something else.
hledger uses the system's text encoding when reading data, and it expects data to use the same encoding.
So if no system encoding is configured, or if the data uses a different encoding,
hledger will give an error when reading it.

TLDR: run `hledger setup` to check this, and ensure your data files use the encoding it recommends.

Here's more detail:

How likely is this to affect you ?
It depends on your platform and the data you are working with:

- On Mac, the system encoding is always UTF-8.
  You may see this problem if you are working with files received from another system,
  eg from a Windows system.

- On Windows, the system encoding varies by region.
  You probably won't see this problem if you are working with your own data
  (perhaps depending how you create the data - see [Start a journal](start-a-journal.md)).
  If you are on Windows 11 and often need to share files with mac/unix systems,
  there is a setting for UTF-8 encoding which you might want to use (see below).

- On GNU/Linux and other unix systems, the system encoding varies, and sometimes is not configured at all.
  It may be controlled by the `LANG` environment variable, or in other ways.
  You should ensure that at least some encoding is configured. UTF-8 is usually a good choice.

If you hit this problem, you can solve it by

- converting the data files to your system's text encoding. Use `iconv` on unix/mac, powershell or notepad on Windows.
- configuring your system encoding to match your data files.
- or (for CSV/SSV/TSV files only), use the [`encoding`](hledger.md#encoding)  CSV rule.

Here's an example. Let's say you want to work with UTF-8 text on a GNU/Linux system,
but it's configured with the C locale, which can only handle ASCII text:

```cli
$ echo $LANG
C
```

So, first check that you have a UTF-8-capable locale installed (`locale -a`).
If not, install one (perhaps by using your package manager, 
perhaps by uncommenting it in `/etc/locale.gen` and running `locale-gen`).

Then change the system locale. 
Here's one common way to set it permanently for your shell.
Note exact punctuation and capitalisation of locale names is important on some systems.
```cli
$ echo "export LANG=C.utf8" >>~/.profile    # or en_US.UTF-8, fr_FR.utf8, etc.
# close the shell/terminal window and open a new one
$ echo $LANG
C.UTF-8
```

For Nix users, the procedure is [different](https://github.com/hledgerorg/hledger/issues/1033#issuecomment-1062506027),
eg you might need to set `LOCALE_ARCHIVE` instead.
Likewise for GUIX users.

Windows users who want to use UTF-8 encoding, eg to interoperate with unix systems,
might find the "Use Unicode UTF-8 for worldwide language support" setting helpful.
Here's where it is in Windows 11:
![windows 11 UTF-8 setting](images/win11-utf8-setting.png)
Though it might cause problems with some older applications, including some GUI programs.

Here's a way to select UTF-8 for Windows Terminal and PowerShell, without affecting the entire system: 
add this line to the PowerShell profile file:
```conf
$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding
```


### Shell completions

If you use the bash or zsh shells, you can set up context-sensitive auto-completions for hledger command lines.
(Here's how to [contribute other shells](https://github.com/hledgerorg/hledger/tree/main/hledger/shell-completion#completions-for-other-shells).)

#### bash

1. Ensure that [bash-completion](https://salsa.debian.org/debian/bash-completion) is installed and enabled:

    On a Mac, using homebrew:
    - `brew remove -f bash-completion`
    - `brew install bash-completion@2`
    - Add the suggested line to your ~/.bash_profile, if it's not already there
    - `source ~/.bash_profile` (or open a new bash shell)

    On GNU/Linux:
    - `apt install bash-completion`
    - `source ~/.bash_profile` (or open a new bash shell)

2. Install hledger with your system package manager (`brew install hledger`, `apt install hledger` or similar).

    Now completions may be working.

    If not, eg because your system's hledger package does not yet include the bash completions, or if they are not up to date, 
    or if you have installed hledger by other means, then install the 
    [latest hledger bash completions](https://raw.githubusercontent.com/hledgerorg/hledger/1.50-branch/hledger/shell-completion/hledger-completion.bash)
    yourself, under your XDG_DATA_HOME directory. Eg:

    ```
    curl https://raw.githubusercontent.com/hledgerorg/hledger/1.50-branch/hledger/shell-completion/hledger-completion.bash \
      -o ~/.local/share/bash-completion/completions/hledger --create-dirs
    ```

Here's what the bash completions should complete when you press TAB once or twice in a command line:

Before the command argument:
- the "hledger", "hledger-ui" and "hledger-web" executable names
- general flags and flag values
- hledger's command argument.
  Eg `hledger <TAB><TAB>` should list all hledger commands, and `hledger b<TAB><TAB>` should list the ones starting with b.

After the command argument:
- command-specific flags and flag values
- account names
- query prefixes, like `payee:` or `status:`
- valid query values after these query prefixes: `acct:`, `code:`, `cur:`, `desc:`, `note:`, `payee:`, `real:`, `status:`, `tag:`.
  Eg `hledger reg acct:<TAB><TAB>` should list your top-level account names.
- amount comparison operators after `amt:`.

When a completion includes special characters, backslashes will be inserted automatically; this does not work right in all cases.

#### zsh

1. Ensure that [zsh-completions](https://github.com/zsh-users/zsh-completions/tree/0adf2f053ece56262ad8a173678add97c8ca4042) is installed and enabled.
2. ? [discussion](https://www.reddit.com/r/plaintextaccounting/comments/1iqqpgg/hledger_shell_completions_for_zsh/)


## Next steps

Nicely done! Now see [Docs](doc.md), or come to the [#hledger chat](support.md)
where we'll gladly share tips or receive your feedback.


[ghc]:             https://www.haskell.org/ghc
[bash]:            https://en.wikipedia.org/wiki/Bash_%28Unix_shell%29
[make]:            https://www.gnu.org/software/make/
[ghcup]:           https://haskell.org/ghcup
[stack]:           https://docs.haskellstack.org/en/stable/
[cabal]:           https://cabal.readthedocs.io/en/stable/
[hledger-install]: https://github.com/hledgerorg/hledger/blob/main/hledger-install/hledger-install.sh
[WSL]:             https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux
[nix]:             https://nixos.org
[git]:             https://en.wikipedia.org/wiki/Git
