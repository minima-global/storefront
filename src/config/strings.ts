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

  static readonly serverSettings = 'Minidapp Server'
}

class GeneralError {

    static readonly required = "Required"
}

class Transaction {

    static readonly pending = "Please wait - transaction is pending"
    static readonly success = "Added successfully"
    static readonly failure = 'Addition Failed'

    static readonly errorGettingData = "Error getting data"
}

class Home {

  static readonly heading = 'Home'

  static readonly info = `<h3>${App.appName}</h3>`
}

class About {

  static readonly heading = `About ${App.appName}`

  static readonly info = `**${App.appName}** version ${App.version}<br /><br />Created by _${App.author}_<br /><br />${App.copyright}`
}

class Help {

  static readonly heading = `${App.appName} Help`

  static readonly info = `Use **${App.appName}** to access ${App.title} MiniDapps.`

  static readonly helpTip = 'Help'
  static readonly contactTip = 'Contact'
  static readonly aboutTip = 'About'
  static readonly serverTip = 'Server'
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
  static readonly fileTip = "Load a server settings file"
  static readonly fileName = "Filename"
}

export {
  App,
  Paths,
  GeneralError,
  Transaction,
  Home,
  About,
  Faq,
  Help,
  Contact,
  Settings
}
