class Config {

  static readonly serverConfig = "/defaultServer.json"
}

class Local {

  static readonly home = '/'
  static readonly about = '/about'
  static readonly help = '/help'
  static readonly contact = '/contact'
  static readonly server = '/server'

  static readonly serverSettings = '/settings'
}

class Remote {

    static readonly secure = 'https://'
    static readonly insecure = 'http://'

    static readonly server = 'localhost'
    static readonly port = '9004'
}

export { Config, Local, Remote }
