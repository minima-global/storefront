// @ts-ignore
import { Minima } from './minima'

import {
  ApplicationState,
  ActionProps,
  PayloadProps,
  AppDispatch,
  Server,
  ServerActionTypes
} from '../../types'

// @ts-ignore
//import { Minima } from './minima'

import { Config } from '../../../config'

import { write } from '../../actions'

export const init = () => {
  return async (dispatch: AppDispatch, getState: Function) => {

      Minima.init()
      //Minima.logging = true
  }
}

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
              url: thisData.url,
              port: thisData.port
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
      url: serverInfo.url,
      port: serverInfo.port
    }
    const fileJSON = JSON.stringify(serverFile)
    const serverJSON = JSON.stringify(server)

    Minima.file.save(`${fileJSON}`, Config.serverConfig, function(resp: any) {

      if(!resp.success) {
        console.log(resp)
      } else {

        Minima.file.save(`${serverJSON}`, serverInfo.configFile, function(resp: any) {

          if(!resp.success) {
            console.log(resp)
          }

          dispatch(write({data: serverInfo})(ServerActionTypes.SERVER_SUCCESS))
        })
      }
    })
  }
}
