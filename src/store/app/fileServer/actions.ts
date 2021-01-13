import { Minima } from 'minima'

import shortid from 'shortid'

import {
  AppDispatch,
  Servers,
  Server,
  ServerActionTypes,
  MiniDappActionTypes,
  MiniDapps,
  MiniData,
  MiniDappSortTypes,
  ServerSortTypes
} from '../../types'

import { Config, Remote, GeneralError } from '../../../config'

import { write } from '../../actions'

export const initServers = () => {
  return async (dispatch: AppDispatch) => {

    //console.log("Initialising servers")
    await dispatch(write({data: []})(ServerActionTypes.SERVER_INIT))
  }
}

export const serverInfo = (url: string, servers: Servers): Server => {

  let server: Server = {
    title: "",
    url: "",
    icon: "",
    description: "",
    isOnline: false
  }

  for (let i = 0; i < servers.servers.length; i++) {

    if ( url === servers.servers[i].url ) {
      server = servers.servers[i]
      break
    }
  }

  return server
}

const compareDappsByName = (a: MiniData, b: MiniData) => {

  if (a.conf.name < b.conf.name) {
    return -1;
  }
  if (a.conf.name > b.conf.name) {
    return 1;
  }
  // a must be equal to b
  return 0;

}

const compareDappsByCategory = (a: MiniData, b: MiniData) => {

  if (a.conf.category < b.conf.category) {
    return -1
  }
  if (a.conf.category > b.conf.category) {
    return 1
  }
  // a must be equal to b
  return 0

}

const compareDappsByStorefront = (a: MiniData, b: MiniData) => {

  if (a.serverURL < b.serverURL) {
    return -1;
  }
  if (a.serverURL > b.serverURL) {
    return 1;
  }
  // a must be equal to b
  return 0;

}

export const sortDapps = ( sortType: MiniDappSortTypes ) => {
  return async (dispatch: AppDispatch, getState: Function) => {

    let state = getState()
    let dappData = state.miniDapps.data

    if ( sortType === MiniDappSortTypes.ATOZ ) {

      dappData.miniDapps.sort(compareDappsByName)
      dispatch(write({data: dappData})(MiniDappActionTypes.MINIDAPP_SORT))

    } else if ( sortType === MiniDappSortTypes.CATEGORY ) {

      dappData.miniDapps.sort(compareDappsByCategory)
      dispatch(write({data: dappData})(MiniDappActionTypes.MINIDAPP_SORT))

    } else if ( sortType === MiniDappSortTypes.STOREFRONT ) {

      dappData.miniDapps.sort(compareDappsByStorefront)
      dispatch(write({data: dappData})(MiniDappActionTypes.MINIDAPP_SORT))
    }

  }
}

const compareServersByTitle = (a: Server, b: Server) => {

  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

export const sortServers = ( sortType: ServerSortTypes ) => {
  return async (dispatch: AppDispatch, getState: Function) => {

    let state = getState()
    let serverData = state.fileServers.data

    if ( sortType === ServerSortTypes.ATOZ ) {

      serverData.servers.sort(compareServersByTitle)
      dispatch(write({data: serverData})(ServerActionTypes.SERVER_SORT))

    }
  }
}

const uniqueServers = (elements: any[]): any[] => {

  //console.log("unique first: ", elements)

  const uniqueElements = elements.reduce((element: Server[], current: Server) => {

    //console.log("unique: ", element, current)

    if ( current.hasOwnProperty('url') && current.hasOwnProperty('title') ) {

      const x = element.find( (item: any) => {
        if( item.hasOwnProperty('url') && item.hasOwnProperty('title') ) {
          return ( item.title === current.title && item.url === current.url )
        } else {
          return false
        }
      })

      if (!x) {
        return element.concat([current])
      } else {
        return element
      }
    } else {

      return element

    }
  }, [])

  return uniqueElements
}

const serverEntries = async (): Promise<Server[]> => {

  let servers: any[] = []

  try {

    const response = await fetch(`${Config.serverConfig}`)
    const serverFiles = await response.json()
    let configFiles: any[] = serverFiles.files as any[]

    for (let i = 0; i < configFiles.length; i++) {

      const file = await fetch(configFiles[i])
      const thisFile = await file.json()

      for (let [title, config] of Object.entries(thisFile)) {

        let thisConfig: Server = config as Server
        thisConfig.title = title

        //console.log("this config: ", thisConfig)
        if ( thisConfig.hasOwnProperty('url') ) {

          //console.log("here: ", thisConfig)

          thisConfig.url += thisConfig.url.endsWith("/") ? "" : "/"
          //console.log(thisURL)
          thisConfig.description = thisConfig.hasOwnProperty('description') ? thisConfig.description : ""
          thisConfig.icon = thisConfig.hasOwnProperty('icon') ? thisConfig.icon : ""
          servers.push(thisConfig)
        } else {

          console.error(GeneralError.serverConfig)
        }
      }
    }

  } catch (error) {
    console.error(error)
  }

  return servers
}

export const getServers = () => {
  return async (dispatch: AppDispatch) => {

    const serverList: Server[] = await serverEntries()
    //console.log("server list: ", serverList)

    let servers = uniqueServers(serverList)
    servers.sort(compareServersByTitle)

    const serverData: Servers = {
      numAvailable: servers.length,
      servers: []
    }
    dispatch(write({data: serverData})(ServerActionTypes.SERVER_TOTAL))
    //console.log("servers: ", servers)

    for ( let i = 0; i < servers.length; i++) {

      const thisServerData: Server = servers[i] as Server
      const dappsListing = thisServerData.url + Config.miniDappsConfig

      //console.log("server info: ", thisServerData, dappsListing)
      // Are they online?
      Minima.net.GET(dappsListing, function(resp: any) {

        let thisServer: Server = {
          title: thisServerData.title,
          url: thisServerData.url,
          description: thisServerData.description,
          icon: thisServerData.icon,
          isOnline: true
        }

        if( !resp.result ) {

          console.error(resp.error)
          thisServer.isOnline = false

        }

        dispatch(write({data: thisServer})(ServerActionTypes.SERVER_SUCCESS))
      })
    }
  }
}

// This is called if a user uploads a new server file
export const setServers = (file: any) => {
  return async (dispatch: AppDispatch) => {

    let reader = new FileReader()
    reader.readAsText(file)
    reader.onloadend = e => {
      if(e.target) {

        const serverInfo: string = e.target.result as string

        fetch(`${Config.serverConfig}`)
          .then(response => response.json())
          .then(data => {

            //console.log("serverfile: ", data)
            // ensure the filename is unique
            const fileKey = shortid.generate()
            const fileName = fileKey + ".json"

            let thisServers: any[] = data.files as any[]
            thisServers.push(fileName)

            const serversJSON = {
              files: thisServers
            }
            const fileJSON = JSON.stringify(serversJSON)

            Minima.file.save(`${fileJSON}`, Config.serverConfig, function(resp: any) {

              //console.log("save success: ", resp)

              if(!resp.success) {

                console.error(resp.statusText)
                dispatch(write({data: []})(ServerActionTypes.SERVER_FAILURE))

              } else {

                  Minima.file.save(serverInfo, fileName, function(resp: any) {

                  //console.log("second save success: ", resp)

                  if(!resp.success) {

                    console.error(GeneralError.serverConfig)
                    dispatch(write({data: []})(ServerActionTypes.SERVER_FAILURE))

                  }

                  dispatch(getServers())
                })
              }
            })
          })
          .catch(error => {
            console.error(error)
          })
      } else {

        console.error(GeneralError.serverConfig)
        dispatch(write({data: []})(ServerActionTypes.SERVER_FAILURE))

      }
    }
  }
}

export const initMiniDapps = () => {
  return async (dispatch: AppDispatch) => {

    //console.log("init dapps")
    dispatch(write({data: []})(MiniDappActionTypes.MINIDAPP_INIT))
  }
}

const checkDappConfig = (dir: string, dappData: MiniData): boolean => {

  if ( ( dir )
  && ( dappData.hasOwnProperty("miniDapp") )
  && ( dappData.hasOwnProperty("conf") )
  && ( dappData.hasOwnProperty("icon") ) ) {

    if ( (dappData.miniDapp) && (dappData.conf) && (dappData.icon) ) {
      return true
    } else {
      return false
    }

  } else {
    return false
  }
}

export const getMiniDapps = (isCountOnly: boolean = false) => {
  return async (dispatch: AppDispatch, getState: Function) => {

    //console.log("I'm in here")

    //dispatch(write({data: []})(MiniDappActionTypes.MINIDAPP_SUCCESS))
    const state = getState()
    const fileServers = state.fileServers.data
    //console.log("servers: ", fileServers)

    for (let i = 0; i < fileServers.servers.length; i++) {

      //console.log("in here: ", i, fileServers.servers[i])
      if ( fileServers.servers[i].isOnline ) {

        const dappsListing = fileServers.servers[i].url + Config.miniDappsConfig

        Minima.net.GET(dappsListing, function(resp: any) {

          //console.log("but here? ", dappsListing, resp)
          if( !resp.result ) {

            console.error(resp.error)
            dispatch(write({data: []})(ServerActionTypes.SERVER_FAILURE))

          } else {

            let plainResponse = decodeURIComponent(resp.result)
            let plusLess = plainResponse.replace(/\+/g,' ')
            let thisConfJSON = JSON.parse(plusLess)
            const data = Object.entries(thisConfJSON)

            for ( let j = 0; j < data.length; j++) {

              const dir = data[j][0]
              const dappData: MiniData = data[j][1] as MiniData

              if ( checkDappConfig(dir, dappData) ) {

                const dappConfURL = fileServers.servers[i].url + dir + "/" + dappData.conf

                Minima.net.GET(dappConfURL, function(resp: any) {

                  //console.log(dappConfURL, resp)

                  if( !resp.result ) {

                    console.error(resp.error)

                  } else {

                    if (isCountOnly) {

                        // don't really care about the data - the reducer simply adds 1 to the number
                        dispatch(write({data: []})(MiniDappActionTypes.MINIDAPP_COUNT))

                    } else {

                        // loading up minidapp data
                        plainResponse = decodeURIComponent(resp.result)
                        plusLess = plainResponse.replace(/\+/g,' ')
                        thisConfJSON = JSON.parse(plusLess)
                        //const miniDapps = state.miniDapps.data

                        let newDappData: MiniData = {
                          serverURL: fileServers.servers[i].url,
                          dir: dir,
                          miniDapp: dappData.miniDapp,
                          conf: {
                            name: thisConfJSON.name,
                            version: thisConfJSON.version,
                            headline: thisConfJSON.headline,
                            description: thisConfJSON.description,
                            category: thisConfJSON.category
                          },
                          icon: dappData.icon,
                          isOnline: true
                        }

                        dispatch(write({data: newDappData})(MiniDappActionTypes.MINIDAPP_SUCCESS))
                    }
                  }

                })

              } else {
                console.error(`${GeneralError.miniDappsConfig}`)
              }
            }
          }
        })
      }
    }
  }
}

export const initCountMiniDapps = () => {
  return async (dispatch: AppDispatch, getState: Function) => {

    const state = getState()
    const fileServers = state.fileServers.data
    const miniDapps = state.miniDapps.data

    let miniData: MiniDapps = {
      numListed: miniDapps.numListed,
      numAvailable: 0,
      miniDapps: miniDapps.miniDapps
    }

    dispatch(write({data: miniData})(MiniDappActionTypes.MINIDAPP_TOTAL))
  }
}
