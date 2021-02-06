# Minima Storefront

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](/docs/COPYING.txt)

This is a MiniDapp Storefront for [Minima](https://github.com/minima-global).

## Table of Contents

- [Built Using](#built-using)  
- [Install](#install)
  - [Dependencies](#dependencies)
- [Creating a Minima Storefront](#creating-a-minima-storefront)
- [Using the Storefront](#using-the-minima-storefront)
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

You should now be able to open the MiniDapp and use it to access a MiniDapp store. More details about how to [create a storefront](#creating-a-minima-storefront) are described below.

### Dependencies

- [Minima](https://github.com/minima-global/Minima)
- [Minima MiniDapps](https://github.com/minima-global/MiniDAPP)
- [node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

## Creating a Minima Storefront

The Minima Storefront supports any platform that hosts content which is web-addressable. Hence, it will be able to retrieve MiniDapps from websites or any distributed filesystems that support  [URL](https://en.wikipedia.org/wiki/URL)-based schemas.

A [JSON](https://en.wikipedia.org/wiki/JSON) configuration file controls which stores the Storefront displays, and on each store, another JSON file controls which MiniDapps are available.   

### Web-based Hosting

The instructions below demonstrate how to host MiniDapps on a website.

1. In a publicly-available webserver directory, create a separate directory for each MiniDapp.
2. That directory should contain a file called `dapps.json`, which describes all the MiniDapps that are available.
3. That directory must also contain a unique directory for each MiniDapp. Those directories should contain the MiniDapp itself (e.g `storefront.minidapp`), it's configuration file (e.g. `storefront.conf`) and its icon (e.g `storeFrontIcon.png` (currently, the icon must be a _png_)).

For example, imagine a MiniDapp store with the directory layout shown in Figure 1, below.

![](/images/miniDappListing.png)

_Figure 1: A MiniDapp web-directory listing_

The store's `dapps.json` would look like this:

```
{
  "0x62916EDC6334B2A7EE9AF139E3971189F2794B35": {
    "miniDapp": "provenator.minidapp",
    "icon": "provenatorIcon.png",
    "conf": "minidapp.conf"
  },
  "0x555D39602F9047B4D26F8381ACB84476D7DBDAF7": {
    "miniDapp": "cowsay.minidapp",
    "icon": "cowsayIcon.png",
    "conf": "minidapp.conf"
  },
  "0x0D180BF6A4FD51C24C2640D511086760E4B5D6DB": {
    "miniDapp": "storefront.minidapp",
    "icon": "storefrontIcon.png",
    "conf": "minidapp.conf"
  }
}
```

Now imagine that `dapps.json` is hosted at the web location _your.webserver.url/miniDapps/dapps.json_ - the Storefront's `json` configuration file might look like this:

```
{
  "Your Awesome Store Name": {
    "url": "http://your.webserver.url/miniDapps/"
  }
}
```

Furthermore, a configuration file can point at multiple stores; that shown below is a live example that you could _copy and paste_ into a file on your local machine and upload to your Storefront via the Settings link in the application's footer:

```
{
  "Doctor's Dapper Dapps": {
    "url": "http://www.reportaid.org/miniDapps/"
  },
  "Minima Head Office": {
    "url": "http://web.default.glowkeeper.uk0.bigv.io:8888/"
  },
  "Baz's Bazaar": {
    "url": "https://raw.githubusercontent.com/eurobuddha/BazsBazaar/main/miniDapps/"
  }
}
```

If you used the config' file described above, your Storefront's homepage should display MiniDapps for three stores. Furthermore, a colleague could host their own store, using the steps above, and send you its details. Then you could add that to the stores your Storefront displays:

```
{
  "Doctor's Dapper Dapps": {
    "url": "http://www.reportaid.org/miniDapps/"
  },
  "Minima Head Office": {
    "url": "http://web.default.glowkeeper.uk0.bigv.io:8888/"
  },
  "Baz's Bazaar": {
    "url": "https://raw.githubusercontent.com/eurobuddha/BazsBazaar/main/miniDapps/"
  },
  "A Colleague's Awesome MiniDapp Storefront": {
    "url": "http://their.server.url/"
  }
}
```

### SeaweedFS   

The example below creates a MiniDapp store on a server using [SeaweedFS](https://github.com/chrislusf/seaweedfs).

First, setup a SeaweedFS file server:

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
dir = "/Users/you/yourMiniDappsDir"					# directory to store level db files
```

4. Start the SeaweedFS _filer_, which runs on port _8888_:

```
weed server -dir="/Users/you/yourMiniDappsDir" -filer=true
```

5. As above, create a `dapps.json` file that points at separate directories that contain copies of the MiniDapps you want to serve via _filer_.
6. Copy the MiniDapps from those directories to _filer_:

```
weed filer.copy -include *.conf . http://localhost:8888/
weed filer.copy -include *.png . http://localhost:8888/
weed filer.copy -include *.minidapp . http://localhost:8888/
```

7. Also copy `dapps.json`:

```
weed filer.copy -include dapps.json . http://localhost:8888/
```

Now imagine the SeaweedFS installation is available at  _your.seaweedserver.url_ - the Storefront's `json` configuration file might look like this:

```
{
  "Your Other Awesome Store Name": {
    "url": "http://your.seaweedserver.url:8888/"
  }
}
```

fyi: "Minima Head Office", described in the json above, is running on SeaweedFS.

## Using the Minima Storefront

Having [installed](#install) the Storefront MiniDapp, open the [MiniDapp homepage](http://localhost:9004), and load the Storefront. The available MiniDapps should be displayed on the homepage - you can click on their icons, download them, then use the [MiniDapp homepage](http://localhost:9004) to install them.

## Maintainer

[Steve Huckle](https://glowkeeper.github.io/).

## Contributing

Contributions welcome - please email [Steve Huckle](https://glowkeeper.github.io/).

## License

GNU General Public License v3.0.
