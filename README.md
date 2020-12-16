# Minima Storefront

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](/docs/COPYING.txt)

This is a MiniDapp Storefront for [Minima](https://github.com/minima-global).

## Table of Contents

- [Built Using](#built-using)  
- [Install](#install)
  - [Dependencies](#dependencies)
- [Creating a Minima Storefront](#creating-a-minima-storefront)
  - [Web-based Hosting](#web-based-hosting)
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

You should now be able to open the MiniDapp and use it to access MiniDapp stores. There is more information about how to [create a storefront](#creating-a-minima-storefront) below.

### Dependencies

- [Minima](https://github.com/minima-global/Minima)
- [Minima MiniDapps](https://github.com/minima-global/MiniDAPP)
- [node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

## Creating a Minima Storefront

The Minima Storefront supports any platform that hosts content which is web-addressable. Hence, it will be able to retrieve MiniDapps from websites or any distributed filesystems that support  [URL](https://en.wikipedia.org/wiki/URL)-based schemas.

A [JSON](https://en.wikipedia.org/wiki/JSON) configuration file controls which stores the Storefront displays, and on each store, another JSON file, called `dapps.json`, which is effectively a directory listing that controls which MiniDapps are available.   

### Web-based Hosting

The instructions below demonstrate how to host MiniDapps on a website.

1. Create a directory that hosts separate directories for each MiniDapp. Those directories should contain the MiniDapp itself (e.g `storefront0.2.0.minidapp`), its configuration file (e.g. `minidapp.conf`) and its icon (e.g `storefrontIcon.png`.
2. The top-level directory should also contain a file called `dapps.json`, which describes all the MiniDapps that are available; `dapps.json` is effectively a directory listing of each of the MiniDapps.
3. Create another `json` configuration file that points to a publicly available web address hosting the MiniDapps. For example, imagine that `dapps.json` is hosted at the web location _http://awesome.webserver.url/miniDapps/dapps.json_. The `json` configuration file, which we'll call `awesome.json`, would look like this:

```
{
  "Awesome Store Name": {
    "url": "http://awesome.webserver.url/miniDapps/",
    "description": "Awesome MiniDapps",
    "icon": "awesomeLogo.png"
  }
}
```

Below is an example of a `dapps.json`:

```
{
  "cowsay": {
    "miniDapp": "cowsay1.0.0.minidapp",
    "icon": "images/cowsayIcon.png",
    "conf": "minidapp.conf"
  },
  "provenator": {
    "miniDapp": "provenator0.1.0.minidapp",
    "icon": "images/provenatorIcon.png",
    "conf": "minidapp.conf"
  },
  "storefront": {
    "miniDapp": "storefront0.2.0.minidapp",
    "icon": "images/storefrontIcon.png",
    "conf": "minidapp.conf"
  }
}
```

There is a script, [storeBuilder.sh](./bin/storeBuilder.sh), which can build the correct MiniDapp directory structure and create `dapps.json`. It will also take the version string in the `minidapp.conf` file and name the `.minidapp` file accordingly. To use it, simply copy the script and all your MiniDapps to a directory, then run:

```
storeBuilder.sh > dapps.json
```

Now you could send `awesome.json` to someone, who could then load it via the _plus_ icon in the Storefront app' and have access to all your MiniDapps.

## Using the Minima Storefront

Having [installed](#install) the Storefront MiniDapp, open the [MiniDapp homepage](http://localhost:9004), and load the Storefront. The available MiniDapps should be displayed on the homepage - you can click on their icons, download them, then use the [MiniDapp homepage](http://localhost:9004) to install them.

## Maintainer

[Steve Huckle](https://glowkeeper.github.io/).

## Contributing

Contributions welcome - please email [Steve Huckle](https://glowkeeper.github.io/).

## License

GNU General Public License v3.0.
