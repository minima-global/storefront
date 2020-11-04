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

const checkDappConfig = (data: MiniData): boolean => {

  if ( (data.hasOwnProperty("dir") )
  && (data.hasOwnProperty("miniDapp") )
  && (data.hasOwnProperty("conf") )
  && (data.hasOwnProperty("icon") ) ) {

    if ( (data.dir) && (data.miniDapp) && (data.conf) && (data.icon) ) {
      return true
    } else {
      return false
    }

  } else {
    return false
  }
}

const getDapps = (data: []) => {
  return async (dispatch: AppDispatch, getState: Function) => {

    const state = getState()
    const fileServer = state.fileServer.data

    let dappInfo: MiniData[] = []

    for ( let i = 0; i < data.length; i++) {

      const dappData = data[i] as MiniData

      if ( checkDappConfig(dappData) ) {

        let newDappData: MiniData = {
            dir: dappData.dir,
            miniDapp: fileServer.url + dappData.dir + "/" + dappData.miniDapp,
            conf: fileServer.url + dappData.dir + "/" + dappData.conf,
            icon: fileServer.url + dappData.dir + "/" + dappData.icon
        }

        dappInfo.push(newDappData)

      } else {
        console.error(`${GeneralError.miniDappsConfig}`)
      }
    }

    console.log("dapps: ", dappInfo)
    dispatch(write({data: dappInfo})(MiniDappActionTypes.MINIDAPP_SUCCESS))
  }
}

export const getMiniDapps = () => {
  return async (dispatch: AppDispatch, getState: Function) => {

    const state = getState()
    const fileServer = state.fileServer.data
    const dappsListing = fileServer.url + Config.miniDappsConfig

    Minima.net.GET(dappsListing, function(resp: any) {

      const plainResponse = decodeURIComponent(resp.result)
      const plusLess = plainResponse.replace(/\+/g,' ')
      const thisConfJSON = JSON.parse(plusLess)

      if ( thisConfJSON.hasOwnProperty("dapps") ) {

        dispatch(getDapps(thisConfJSON.dapps))

      } else {

        console.error(`${GeneralError.miniDappsConfig}`)
        dispatch(write({data: []})(MiniDappActionTypes.MINIDAPP_FAILURE))
      }
    })
  }
}
