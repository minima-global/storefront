class App {

  static readonly title = 'Minima'
  static readonly appName = 'Storefront'
  static readonly catchLine = `Powered by ${App.title}`
  static readonly tagline = ''
  static readonly copyright = '© Copyright 2020 Minima GmbH'
  static readonly author = '[Steve Huckle](https://glowkeeper.github.io/)'
  static readonly email = 'steve dot huckle at minima dot global'
  static readonly version = '0.1.0'
}

class Paths {

  // AppBar
  static readonly home = 'Home'
  static readonly about = 'About'
  static readonly help = 'Help'
  static readonly contact = 'Contact'

  static readonly serverSettings = 'Settings'
  static readonly addDapp = 'Get MiniDapp'
  static readonly addDappIndex = Paths.addDapp
  static readonly showStoreDapps = 'My Storefronts'
  static readonly showStoreDappsIndex = Paths.showStoreDapps
}

class GeneralError {

    static readonly required = "Required"
    static readonly serverConfig = "Server config file error"
    static readonly miniDappsConfig = "MiniDapps config file error"
}

class Transaction {

    static readonly pending = "Please wait - transaction is pending"
    static readonly success = "Added successfully"
    static readonly failure = 'Addition Failed'

    static readonly errorGettingData = "Error getting data"
}

class Home {

  static readonly heading = 'All MiniDapps'

  static readonly address = 'Store Address'
  static readonly noServers = `Trying to find ${App.appName} MiniDapp Servers`
  static readonly servers = 'Servers Loaded'
  static readonly info = `<h3>${App.appName}</h3>`
}

class AddDapp {

  static readonly heading = 'Install MiniDapp'

  static readonly download = 'Download'
  static readonly install = 'Install'
}

class Storefronts {

  static readonly heading = 'Storefronts'
  static readonly storefrontHeading = 'MiniDapps'
}

class About {

  static readonly heading = `About ${App.appName}`

  static readonly info = `Created by _${App.author}_<br /><br />${App.copyright}`
}

class Help {

  static readonly heading = `${App.appName} Help`

  static readonly info = `Use **${App.appName}** to access the fantastic ${App.title} MiniDapps.`

  static readonly downloadTip = 'Download MiniDapp'
  static readonly homeTip = 'All MiniDapps'
  static readonly storeTip = 'Store MiniDapps'
  static readonly helpTip = 'Help'
  static readonly contactTip = 'Contact'
  static readonly aboutTip = 'About'
  static readonly serverTip = 'Server'
  static readonly fileTip = "Load a Server Settings File"
}

class Faq {

  static readonly heading = 'FAQ'

  static readonly info = `Coming soon`
}

class Contact {

  static readonly heading = 'Contact'

  static readonly info = `${App.email}`
}

class Settings {

  static readonly heading = 'Server Settings'
  static readonly currentSettings = 'Current Settings'

  static readonly info = `Storefront settings`
  static readonly getFile = "Load alternative settings"
  static readonly fileName = "Filename"

  static readonly server = "Server"
  static readonly serverInfo = "Name"
  static readonly serverURL = "URL"
  static readonly serverOnline = "Online"
}

export {
  App,
  Paths,
  GeneralError,
  Transaction,
  Home,
  AddDapp,
  Storefronts,
  About,
  Faq,
  Help,
  Contact,
  Settings
}
