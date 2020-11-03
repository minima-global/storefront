# Minima Storefront

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](/docs/COPYING.txt)

This is a MiniDapp Storefront for [Minima](https://github.com/minima-global).

## Table of Contents

- [Built Using](#built-using)  
- [Install](#install)
  - [Dependencies](#dependencies)
- [Creating a Storefront](#creating-a-storefront)
- [Accessing a Storefront](#accessing-a-storefront)
- [Maintainer](#maintainer)
- [Contributing](#contributing)
- [License](#license)

## Built Using

- [Minima](https://github.com/minima-global/Minima)
- [Minima MiniDapps](https://github.com/minima-global/MiniDAPP)
- [node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [React](https://reactjs.org/)

## Install

The instructions below will install the Storefront as a [Minima MiniDapp](https://github.com/minima-global/MiniDAPP).

1. Clone this repo', then, from a command-line, change to the same directory as this README
 and type `npm install`. That will install everything listed in [package.json](/package.json), which are the components of the [React](https://reactjs.org/) frontend to this application
2. Build the app' by typing `npm run prod`. That will create the MiniDapp inside the [miniDapp/dist](./miniDapp/dist) directory.

Now run the [Minima blockchain](https://github.com/minima-global/Minima). That creates a MiniDapp Server, which is accessible via [http://localhost:9004](http://localhost:9004). So start a browser, and load [http://localhost:9004](http://localhost:9004). You should see the MiniDapp homepage.

Click on `Install`, then go find the `storefront.minidapp` in the [miniDapp/dist](./miniDapp/dist) directory, which was created in Step 2, above.

You should now be able to open the MiniDapp and use it to access a MiniDapp store. More details about how to [create a storefront](#creating-a-storefront) are described below.

### Dependencies

- [Minima](https://github.com/minima-global/Minima)
- [Minima MiniDapps](https://github.com/minima-global/MiniDAPP)
- [node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

## Creating a Storefront

The example below creates a MiniDapp store on a local machine, using [SeaweedFS](https://github.com/chrislusf/seaweedfs). However, the Storefront MiniDapp frontend takes advantage of the fact that [SeaweedFS](https://github.com/chrislusf/seaweedfs) supports file access via a HTTP RESTful API, so you _could_ host the MiniDapp store on any platform that supports such access. For example, a webserver should work, as should [GitHub](https://developer.github.com/v3/).

First, setup a [SeaweedFS](https://github.com/chrislusf/seaweedfs) file server for hosting the [Minima MiniDapps](https://github.com/minima-global/MiniDAPP):

1. Download a [SeaweedFS](https://github.com/chrislusf/seaweedfs) image for your system ([SeaweedFS releases](https://github.com/chrislusf/seaweedfs/releases))
2. Create a directory for the MiniDapps
3. Create a file called `filer.toml` in that directory, which contains the following:

```
[filer.options]
# with http DELETE, by default the filer would check whether a folder is empty.
# recursive_delete will delete all sub folders and files, similar to "rm -Rf"
recursive_delete = false
# directories under this folder will be automatically creating a separate bucket
buckets_folder = "/buckets"
buckets_fsync = [          # a list of buckets with all write requests fsync=true
	"important_bucket",
	"should_always_fsync",
]

####################################################
# The following are filer store options
####################################################

[leveldb2]
# local on disk, mostly for simple single-machine setup, fairly scalable
# faster than previous leveldb, recommended.
enabled = true
dir = "."					# directory to store level db files
```

4. Start the [SeaweedFS](https://github.com/chrislusf/seaweedfs) _filer_:

```
weed server -filer=true
```

5. Create a separate directory that contains a copy of the MiniDapps you want to serve via _filer_. Each MiniDapp _must be in a separate directory_, which contains the MiniDapp's _conf_ and _icon_ (which must be a _png_), and the MiniDapp itself. For example:

```
./0x62916EDC6334B2A7EE9AF139E3971189F2794B35
./0x62916EDC6334B2A7EE9AF139E3971189F2794B35/icon.png
./0x62916EDC6334B2A7EE9AF139E3971189F2794B35/minidapp.conf
./0x62916EDC6334B2A7EE9AF139E3971189F2794B35/provenator.minidapp
./0x4B247231307A4CCDA54A2C61B5924B184A1D4249
./0x4B247231307A4CCDA54A2C61B5924B184A1D4249/icon.png
./0x4B247231307A4CCDA54A2C61B5924B184A1D4249/minidapp.conf
./0x4B247231307A4CCDA54A2C61B5924B184A1D4249/coinflip.minidapp
./0x42C2FE1E9887E54CFE0ADBDD923F58602AE4D503
./0x42C2FE1E9887E54CFE0ADBDD923F58602AE4D503/icon.png
./0x42C2FE1E9887E54CFE0ADBDD923F58602AE4D503/minidapp.conf
./0x42C2FE1E9887E54CFE0ADBDD923F58602AE4D503/terminal.minidapp
```

6. Copy the MiniDapps from the directory above to [SeaweedFS](https://github.com/chrislusf/seaweedfs), thus:

```
weed filer.copy -include *.conf . http://localhost:8888/
weed filer.copy -include *.png . http://localhost:8888/
weed filer.copy -include *.minidapp . http://localhost:8888/
```

7. That _should_ have been enough for the Storefront to access the MiniDapps. Unfortunately, currently, _filer_ appears to throw a CORS error when it is accessed via javascript's [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (there is an [issue](https://github.com/chrislusf/seaweedfs/issues/1595) open for that).  To bypass the error, use [local cors proxy](https://github.com/garmeeh/local-cors-proxy) to create a proxy in front of _filer_ :

```
lcp --proxyUrl http://localhost:8888
```

That will create a proxy at `http://localhost:8010/proxy`, which you can use to access the MiniDapps.

8. Open [/miniDapp/config/defaultServer.json](/miniDapp/config/defaultServer.json), and make sure it says `"url": "http://localhost:8010/proxy/"` (the default shipped with this repo' should say that already).

## Accessing a Storefront

Having [installed](#install) the Storefront MiniDapp, open the [MiniDapp homepage](http://localhost:9004), and load the Storefront. The available MiniDapps should be displayed on the homepage - you can click on their icons, download them, then use the [MiniDapp homepage](http://localhost:9004) to install them.

A colleague could host their own store, using the steps above, and you could access that through the following steps.

1. Ask them to send you a _config.json_ that contains their server's details:

```
{
  "info": "An Awesome MiniDapp Storefront",
  "url": "http://their.server.url/"
}
```

2. Save that file
3. Click on `MiniDapp Server` in the bottom righthand corner of the Storefront home screen.
4. `Browse` for _alternative settings_, then load the file saved above.

Now, the Storefront's home screen should display the MiniDapps hosted by your colleague.

## Maintainer

[Steve Huckle](https://glowkeeper.github.io/).

## Contributing

Contributions welcome - please email [Steve Huckle](https://glowkeeper.github.io/).

## License

GNU General Public License v3.0.
