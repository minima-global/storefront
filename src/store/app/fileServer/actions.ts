import shortid from 'shortid'

// @ts-ignore
import { Minima } from '../blockchain/minima'

import {
  AppDispatch,
  Servers,
  Server,
  ServerActionTypes,
  MiniDappActionTypes,
  MiniDapps,
  MiniData
} from '../../types'

import { Config, Remote, GeneralError } from '../../../config'

import { write } from '../../actions'

export const initServers = () => {
  return async (dispatch: AppDispatch) => {

    //console.log("Initialising servers")
    await dispatch(write({data: []})(ServerActionTypes.SERVER_INIT))
  }
}

const uniqueServers = (elements: any[]): any[] => {

  //console.log("unique first: ", elements)

  const uniqElements = elements.reduce((element: any[], current: any) => {

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

  return uniqElements
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
          thisConfig.info = thisConfig.hasOwnProperty('info') ? thisConfig.info : ""
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

    const serverList: any[] = await serverEntries()
    //console.log("server list: ", serverList)

    const servers = uniqueServers(serverList)

    let serverData: Servers = {
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
          index: i,
          title: thisServerData.title,
          url: thisServerData.url,
          info: thisServerData.info,
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
  return async (dispatch: AppDispatch, getState: Function) => {

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

export const getMiniDapps = () => {
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

                    plainResponse = decodeURIComponent(resp.result)
                    plusLess = plainResponse.replace(/\+/g,' ')
                    thisConfJSON = JSON.parse(plusLess)
                    //const miniDapps = state.miniDapps.data

                    let newDappData: MiniData = {
                      serverIndex: fileServers.servers[i].index,
                      dir: dir,
                      miniDapp: dappData.miniDapp,
                      conf: {
                        name: thisConfJSON.name,
                        description: thisConfJSON.description,
                        category: thisConfJSON.category
                      },
                      icon: dappData.icon
                    }

                    dispatch(write({data: newDappData})(MiniDappActionTypes.MINIDAPP_SUCCESS))
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

export const countMiniDapps = () => {
  return async (dispatch: AppDispatch, getState: Function) => {

    const state = getState()
    const fileServers = state.fileServers.data

    for (let i = 0; i < fileServers.servers.length; i++) {

      if ( fileServers.servers[i].isOnline ) {

        const dappsListing = fileServers.servers[i].url + Config.miniDappsConfig

        Minima.net.GET(dappsListing, function(resp: any) {

          //console.log("but here? ", dappsListing, resp)
          if( !resp.result ) {

            console.error(resp.error)
            //dispatch(write({data: []})(ServerActionTypes.SERVER_FAILURE))

          } else {

            const plainResponse = decodeURIComponent(resp.result)
            const plusLess = plainResponse.replace(/\+/g,' ')
            const thisConfJSON = JSON.parse(plusLess)
            const data = Object.entries(thisConfJSON)

            for ( let j = 0; j < data.length; j++) {

              const dir = data[j][0]
              const dappData: MiniData = data[j][1] as MiniData

              if ( checkDappConfig(dir, dappData) ) {

                const dappConfURL = fileServers.servers[i].url + dir + "/" + dappData.conf

                Minima.net.GET(dappConfURL, function(resp: any) {

                  if( !resp.result ) {

                    console.error(resp.error)

                  } else {

                    // don't really care about the data - the reducer simply adds 1 to the number
                    dispatch(write({data: []})(MiniDappActionTypes.MINIDAPP_COUNT))
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
