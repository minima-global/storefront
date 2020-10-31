// @ts-ignore
import { Minima } from '../minima'

import {
  AppDispatch,
  Server,
  ServerActionTypes
} from '../../types'

import { Config, Remote } from '../../../config'

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

export const getMiniDapps = () => {
  return async (dispatch: AppDispatch, getState: Function) => {

    const state = getState()
    const fileServer = state.fileServer.data

    const url = fileServer.url + ":" + fileServer.port + "/"

    //mode: 'no-cors',
    fetch(url, {
      mode: 'same-origin',
      headers: {
        'Accept': 'application/json',
      },
    })
    .then(response => {
      console.log(response)
      if (!response.ok) {
         const statusText = response.statusText
         throw new Error(response.statusText)
      }
      return response.json()
    })
    .then(data => {

        console.log(data)
        //dispatch(write({data: serverInfo})(MiniDappActionTypes.MINIDAPP_SUCCESS))
    })
   .catch(error => {
      console.log(error)
      //console.log(`${Transaction.errorGettingData}: ${error.message} at ${dateText}`)
      //dispatch(write({data: serverInfo})(MiniDappActionTypes.MINIDAPP_FAILURE))
   })

      //dispatch(write({data: serverInfo})(MiniDappActionTypes.MINIDAPP_SUCCESS))
  }
}
