class App {

  static readonly title = 'Minima'
  static readonly appName = 'Storefront'
  static readonly catchLine = `Powered by ${App.title}`
  static readonly tagline = ''
  static readonly copyright = '© Copyright 2020 Minima GmbH'
  static readonly author = 'Steve Huckle'
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

  static readonly info = `${App.appName}`
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

  static readonly info = `Created by ${App.author}`
}

class Help {

  static readonly heading = `${App.appName} Help`

  static readonly info = `Use ${App.appName} to access the fantastic ${App.title} MiniDapps`

  static readonly downloadTip = 'Download'
  static readonly homeTip = 'All MiniDapps'
  static readonly storeTip = 'Storefronts'
  static readonly helpTip = 'Help'
  static readonly contactTip = 'Contact'
  static readonly aboutTip = 'About'
  static readonly serverTip = 'Server'
  static readonly fileTip = "Load Storefronts"
  static readonly sortTip = "Sort"
  static readonly deleteTip = "Delete"

  static readonly deleteSure = "Are you sure you want to delete"
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

class Sort {

  static readonly heading = `Sort by`

  static readonly atoZ = "A to Z"
  static readonly category = "Category"
  static readonly storefront = "Storefront"
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
  Settings,
  Sort
}
