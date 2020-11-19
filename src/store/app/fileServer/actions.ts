import shortid from 'shortid'

// @ts-ignore
import { Minima } from '../blockchain/minima'

import {
  AppDispatch,
  Servers,
  Server,
  MiniData,
  ServerActionTypes
} from '../../types'

import { Config, Remote, GeneralError } from '../../../config'

import { write } from '../../actions'

export const initServers = () => {
  return async (dispatch: AppDispatch, getState: Function) => {

    dispatch(write({data: []})(ServerActionTypes.SERVER_INIT))
  }
}

const uniqueServers = (elements: any[]): any[] => {

  const uniqElements = elements.reduce((element: any[], current: any) => {

    if ( current.length == 3 ) {

      if ( current[1].hasOwnProperty('url') ) {

        const x = element.find( (item: any) => {
          if( item[1].hasOwnProperty('url') ) {
            return ( item[0] === current[0] && item[1].url === current[1].url )
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
        if ( thisConfig.hasOwnProperty('url') ) {

          thisConfig.url += thisConfig.url.endsWith("/") ? "" : "/"
          //console.log(thisURL)
          thisConfig.info = thisConfig.info.hasOwnProperty('info') ? thisConfig.info : ""
          thisConfig.icon = thisConfig.icon.hasOwnProperty('icon') ? thisConfig.icon : ""
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
  return async (dispatch: AppDispatch, getState: Function) => {

    const state = getState()

    const serverList: any[] = await serverEntries()
    //console.log(serverList)
    const servers = uniqueServers(serverList)
    //console.log(servers)

    // Are they online?
    for ( let i = 0; i < servers.length; i++) {

      const thisServerData: Server = servers[i] as Server
      const dappsListing = thisServerData.url + Config.miniDappsConfig

      //console.log(info, thisServerData.url, dappsListing)
      Minima.net.GET(dappsListing, function(resp: any) {

        let loadedServers = state.fileServers.data
        loadedServers.numAvailable = servers.length
        loadedServers.numLoaded += 1

        let thisServer: Server = {
          title: thisServerData.title,
          url: thisServerData.url,
          info: thisServerData.info,
          icon: thisServerData.icon,
          isOnline: true,
          dapps: []
        }

        if( !resp.result ) {

          console.error(resp.error)
          thisServer.isOnline = false

        }

        loadedServers.servers.push(thisServer)
        //console.log("servers: ", loadedServers)
        dispatch(write({data: loadedServers})(ServerActionTypes.SERVER_SUCCESS))
      })
    }
  }
}

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

const getDapps = (serverInfo: Server, data: [string, any][]) => {
  return async (dispatch: AppDispatch, getState: Function) => {

    //const state = getState()

    //console.log(state.fileServers.data)

    for ( let i = 0; i < data.length; i++) {

      const dir = data[i][0]
      const dappData: MiniData = data[i][1] as MiniData

      if ( checkDappConfig(dir, dappData) ) {

        const dappConfURL = serverInfo.url + dir + "/" + dappData.conf

        Minima.net.GET(dappConfURL, function(resp: any) {

          //console.log(dappConfURL, resp)

          if( !resp.result ) {

            console.error(resp.error)

          } else {

            const plainResponse = decodeURIComponent(resp.result)
            const plusLess = plainResponse.replace(/\+/g,' ')
            const thisConfJSON = JSON.parse(plusLess)
            //const miniDapps = state.miniDapps.data

            let newDappData: MiniData = {
                dir: dir,
                miniDapp: dappData.miniDapp,
                conf: {
                  name: thisConfJSON.name,
                  description: thisConfJSON.description,
                  category: thisConfJSON.category
                },
                icon: dappData.icon
            }
            //console.log("this minidapps: ", miniDapps)
            dispatch(write({data: Array.of(newDappData)})(ServerActionTypes.MINIDAPP_SUCCESS))
          }

        })

      } else {
        console.error(`${GeneralError.miniDappsConfig}`)
      }
    }
  }
}

export const getMiniDapps = () => {
  return async (dispatch: AppDispatch, getState: Function) => {

    //dispatch(write({data: []})(MiniDappActionTypes.MINIDAPP_SUCCESS))
    const state = getState()
    const fileServers = state.fileServers.data
    //console.log("servers: ", fileServers)

    for (let i = 0; i < fileServers.servers.length; i++) {

      //console.log("in here")
      if ( fileServers.servers[i].isOnline ) {

        const dappsListing = fileServers.servers[i].url + Config.miniDappsConfig

        Minima.net.GET(dappsListing, function(resp: any) {

          //console.log("but here? ", dappsListing, resp)
          if( !resp.result ) {

            console.error(resp.error)
            dispatch(write({data: []})(ServerActionTypes.MINIDAPP_FAILURE))

          } else {

            const plainResponse = decodeURIComponent(resp.result)
            const plusLess = plainResponse.replace(/\+/g,' ')
            const thisConfJSON = JSON.parse(plusLess)
            const dapps = Object.entries(thisConfJSON)

            if ( dapps.length ) {

              dispatch(getDapps(fileServers.servers[i], dapps))

            } else {

              console.error(`${GeneralError.miniDappsConfig}`)
              dispatch(write({data: []})(ServerActionTypes.MINIDAPP_FAILURE))
            }

          }
        })
      }
    }
  }
}
