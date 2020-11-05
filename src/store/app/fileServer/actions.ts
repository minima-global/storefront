// @ts-ignore
import { Minima } from '../blockchain/minima'

import {
  AppDispatch,
  Server,
  MiniDappActionTypes,
  MiniDappProps,
  MiniData,
  ServerActionTypes
} from '../../types'

import { Config, Remote, GeneralError } from '../../../config'

import { write } from '../../actions'

export const getServer = () => {
  return async (dispatch: AppDispatch) => {

    fetch(`${Config.serverConfig}`)
      .then(response => response.json())
      .then(data => {
        fetch(data.file)
          .then(response => response.json())
          .then(thisData => {
          	const serverData: Server = {
              configFile: data.file,
              info: thisData.info,
              url: thisData.url
            }

            dispatch(write({data: serverData})(ServerActionTypes.SERVER_SUCCESS))
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

export const setServer = (serverInfo: Server) => {
  return async (dispatch: AppDispatch) => {

    //console.log("Setting server: ", serverInfo)
    const serverFile = {
      file: serverInfo.configFile
    }
    const server = {
      info: serverInfo.info,
      url: serverInfo.url
    }
    const fileJSON = JSON.stringify(serverFile)
    const serverJSON = JSON.stringify(server)

    Minima.file.save(`${fileJSON}`, Config.serverConfig, function(resp: any) {

      if(!resp.success) {
        console.error(resp.statusText)
        dispatch(write({data: []})(ServerActionTypes.SERVER_FAILURE))
      } else {

        Minima.file.save(`${serverJSON}`, serverInfo.configFile, function(resp: any) {

          if(!resp.success) {
            throw new Error(resp.statusText)
          }

          dispatch(write({data: serverInfo})(ServerActionTypes.SERVER_SUCCESS))
        })
      }
    })
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

const getDapps = (data: [string, any][]) => {
  return async (dispatch: AppDispatch, getState: Function) => {

    const state = getState()
    const fileServer = state.fileServer.data
    const miniDapps: MiniData[] = state.miniDapps.data

    for ( let i = 0; i < data.length; i++) {

      const dir = data[i][0]
      const dappData: MiniData = data[i][1] as MiniData

      if ( checkDappConfig(dir, dappData) ) {

        const dappConfURL = fileServer.url + dir + "/" + dappData.conf

        Minima.net.GET(dappConfURL, function(resp: any) {

          if( !resp.result ) {

            console.error(resp.error)

          } else {

            const miniDapps: MiniData[] = state.miniDapps.data
            const plainResponse = decodeURIComponent(resp.result)
            const plusLess = plainResponse.replace(/\+/g,' ')
            const thisConfJSON = JSON.parse(plusLess)

            let newDappData: MiniData = {
                dir: dir,
                miniDapp: fileServer.url + dir + "/" + dappData.miniDapp,
                conf: {
                  name: thisConfJSON.name,
                  description: thisConfJSON.description,
                  category: thisConfJSON.category
                },
                icon: fileServer.url + dir + "/" + dappData.icon
            }

            miniDapps.push(newDappData)
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

    const state = getState()
    const fileServer = state.fileServer.data
    const dappsListing = fileServer.url + Config.miniDappsConfig

    Minima.net.GET(dappsListing, function(resp: any) {

      if( !resp.result ) {

        console.error(resp.error)
        dispatch(write({data: []})(MiniDappActionTypes.MINIDAPP_FAILURE))

      } else {

        const plainResponse = decodeURIComponent(resp.result)
        const plusLess = plainResponse.replace(/\+/g,' ')
        const thisConfJSON = JSON.parse(plusLess)
        const dapps = Object.entries(thisConfJSON)

        if ( dapps.length ) {

          dispatch(getDapps(dapps))

        } else {

          console.error(`${GeneralError.miniDappsConfig}`)
          dispatch(write({data: []})(MiniDappActionTypes.MINIDAPP_FAILURE))
        }

      }
    })
  }
}
