// @ts-ignore
import { Minima } from '../blockchain/minima'

import {
  AppDispatch,
  Servers,
  Server,
  MiniDappActionTypes,
  MiniDappProps,
  MiniData,
  ServerActionTypes
} from '../../types'

import { Config, Remote, GeneralError } from '../../../config'

import { write } from '../../actions'

/*Can't get Minima.net.GET to wait...
const checkServer = async (info: string, url: string): Promise<boolean | undefined> => {

  if (info && url) {

    const dappsListing = url + Config.miniDappsConfig
    await Minima.net.GET(dappsListing, function(resp: any) {

      if( !resp.result ) {

        console.error(resp.error)
        return false

      } else {

        return true
      }
    })
  } else {
    return false
  }
}
*/

const initServers = () => {
  return async (dispatch: AppDispatch, getState: Function) => {

    const servers: Servers = {
      hasLoaded: false,
      configFile: "",
      servers: []
    }
    dispatch(write({data: servers})(ServerActionTypes.SERVER_SUCCESS))
  }
}

export const getServers = () => {
  return async (dispatch: AppDispatch, getState: Function) => {

    const state = getState()

    fetch(`${Config.serverConfig}`)
      .then(response => response.json())
      .then(data => {
        fetch(data.file)
          .then(response => response.json())
          .then(thisData => {

            const servers = Object.entries(thisData)
            //dispatch(initServers())

            for ( let i = 0; i < servers.length; i++) {

              const info: string = servers[i][0]
              let thisServerData: Server = servers[i][1] as Server
              thisServerData.url += thisServerData.url.endsWith("/") ? "" : "/"

              if (info && thisServerData.url) {

                const dappsListing = thisServerData.url + Config.miniDappsConfig
                Minima.net.GET(dappsListing, function(resp: any) {

                  let loadedServers = state.fileServers.data
                  loadedServers.hasLoaded = i == (servers.length -1) ? true : false
                  loadedServers.configFile = data.file

                  if( !resp.result ) {

                    console.error(resp.error)

                  } else {

                    const thisServer: Server = {
                      info: info,
                      url: thisServerData.url
                    }
                    loadedServers.servers.push(thisServer)
                  }
                  dispatch(write({data: loadedServers})(ServerActionTypes.SERVER_SUCCESS))
                })

              } else {
                console.error(GeneralError.serverConfig)
              }
            }
        })
        .catch(error => {
          console.error(error)
        })
      })
      .catch(error => {
        console.error(error)
      })
  }
}

export const setServers = (file: any) => {
  return async (dispatch: AppDispatch) => {

    let reader = new FileReader()
    reader.readAsText(file)
    reader.onloadend = e => {
        if(e.target) {
            //console.log("file result :", e.target.result)
            const serverInfo: string = e.target.result as string

            const serverFile = {
              file: file.name
            }
            const fileJSON = JSON.stringify(serverFile)

            Minima.file.save(`${fileJSON}`, Config.serverConfig, function(resp: any) {

              //console.log("save success: ", resp)

              if(!resp.success) {

                console.error(resp.statusText)
                dispatch(write({data: []})(ServerActionTypes.SERVER_FAILURE))

              } else {

                Minima.file.save(serverInfo, file.name, function(resp: any) {

                  //console.log("second save success: ", resp)

                  if(!resp.success) {

                    console.error(GeneralError.serverConfig)
                    dispatch(write({data: []})(ServerActionTypes.SERVER_FAILURE))

                  }

                  dispatch(getServers())
                })
              }
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

    const state = getState()

    //console.log(state.fileServers.data)

    for ( let i = 0; i < data.length; i++) {

      const dir = data[i][0]
      const dappData: MiniData = data[i][1] as MiniData

      if ( checkDappConfig(dir, dappData) ) {

        const dappConfURL = serverInfo.url + dir + "/" + dappData.conf

        Minima.net.GET(dappConfURL, function(resp: any) {

          if( !resp.result ) {

            console.error(resp.error)

          } else {

            const plainResponse = decodeURIComponent(resp.result)
            const plusLess = plainResponse.replace(/\+/g,' ')
            const thisConfJSON = JSON.parse(plusLess)
            const miniDapps = state.miniDapps.data

            let newDappData: MiniData = {
                server: serverInfo,
                dir: dir,
                miniDapp: dappData.miniDapp,
                conf: {
                  name: thisConfJSON.name,
                  description: thisConfJSON.description,
                  category: thisConfJSON.category
                },
                icon: dappData.icon
            }

            miniDapps.push(newDappData)
            //console.log("this minidapps: ", miniDapps)
            dispatch(write({data: miniDapps})(MiniDappActionTypes.MINIDAPP_SUCCESS))
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

    dispatch(write({data: []})(MiniDappActionTypes.MINIDAPP_SUCCESS))
    const state = getState()
    const fileServers = state.fileServers.data

    for (let i = 0; i < fileServers.servers.length; i++) {

      //console.log("in here")

      const dappsListing = fileServers.servers[i].url + Config.miniDappsConfig

      Minima.net.GET(dappsListing, function(resp: any) {

        //console.log("but here? ", dappsListing, resp)

        if( !resp.result ) {

          console.error(resp.error)
          dispatch(write({data: []})(MiniDappActionTypes.MINIDAPP_FAILURE))

        } else {

          const plainResponse = decodeURIComponent(resp.result)
          const plusLess = plainResponse.replace(/\+/g,' ')
          const thisConfJSON = JSON.parse(plusLess)
          const dapps = Object.entries(thisConfJSON)

          if ( dapps.length ) {

            dispatch(getDapps(fileServers.servers[i], dapps))

          } else {

            console.error(`${GeneralError.miniDappsConfig}`)
            dispatch(write({data: []})(MiniDappActionTypes.MINIDAPP_FAILURE))
          }

        }
      })
    }
  }
}
