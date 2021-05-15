# Minima Storefront

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](/docs/COPYING.txt)

This is a MiniDapp Storefront for [Minima](https://github.com/minima-global).

## Table of Contents

- [Built Using](#built-using)  
- [Install](#install)
  - [Dependencies](#dependencies)
- [Creating a Minima Storefront](#creating-a-minima-storefront)
  - [Store Location](#store-location)
  - [Store Configuration](#store-configuration)
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

Now run the [Minima blockchain](https://github.com/minima-global/Minima). That creates a MiniDapp Server, which is accessible via [http://localhost:9004](http://localhost:9004). So start a browser, and load [http://localhost:9004](http://localhost:9004). You should see the MiniDapps homepage.

Click on `Install`, then go find the `storefront.minidapp` in the [miniDapp/dist](./miniDapp/dist) directory, which was created in Step 2, above.

You should now be able to open the MiniDapp and use it to access MiniDapp stores. There is more information about how to [create a storefront](#creating-a-minima-storefront) below.

### Dependencies

- [Minima](https://github.com/minima-global/Minima)
- [Minima MiniDapps](https://github.com/minima-global/MiniDAPP)
- [node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

## Creating a Minima Storefront

The Minima Storefront supports any platform that hosts content which is web-addressable. Hence, it will be able to retrieve MiniDapps from websites or any distributed filesystems that support  [URL](https://en.wikipedia.org/wiki/URL)-based schemas.

A [JSON](https://en.wikipedia.org/wiki/JSON) configuration file specifies the URL, icon and description of each storefront. The [store location](#store-location) section, below, describes that in greater detail.

The configuration of each store is described via another JSON file, called `dapps.json`. That specifies which MiniDapps are available - effectively, it is a directory listing; the [store configuration](#store-configuration) section, below, describes that.

The final piece in the jigsaw is the MiniDapps themselves - the [Minima MiniDapps repo'](https://github.com/minima-global/MiniDAPP) contains simple demos and examples of those.

### Store Location

The instructions below demonstrate how to host MiniDapps on a website.

1. Create a directory to host the storefront. That should contain `dapps.json` (described in [store configuration](#store-configuration)) and the storefront icon.
2. Now create a `json` file that points to the publicly available web address of the `dapps.json` above. For example, imagine the storefront is hosted at the web location _http://awesome.webserver.url/miniDapps/dapps.json_. The `json` configuration file, which we'll call `awesome.json`, would look like this:

```
{
  "Awesome Store Name": {
    "url": "http://awesome.webserver.url/miniDapps/",
    "description": "Awesome MiniDapps",
    "icon": "awesomeLogo.png"
  }
}
```

### Store Configuration

The storefront directory should contain separate directories for each MiniDapp it hosts. The `dapps.json` configuration file describes those MiniDapps; below is an example:

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
  }
}
```

There is a script, [storeBuilder.sh](./bin/storeBuilder.sh), which can build the correct MiniDapp directory structure and create `dapps.json` for you. To use it, simply copy the script and all your MiniDapps to a directory, then run:

```
storeBuilder.sh > dapps.json
```

Now you could send `awesome.json` to someone, who would then load it via the _plus_ icon in the Storefront app', giving them access to all your MiniDapps.

## Using the Minima Storefront

Open the [MiniDapp homepage](http://localhost:9004), and load the Storefront. The available MiniDapps should be displayed on the homepage - you can download them from there and then use the [MiniDapp homepage](http://localhost:9004) to install them.

## Maintainer

[Steve Huckle](https://glowkeeper.github.io/).

## Contributing

Contributions welcome - please email [Steve Huckle](https://glowkeeper.github.io/).

## License

GNU General Public License v3.0.
