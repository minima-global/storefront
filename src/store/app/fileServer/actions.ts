// @ts-ignore
import { Minima } from '../minima'

import {
  AppDispatch,
  Server,
  ServerDappsData,
  ServerDappData,
  MiniDappActionTypes,
  MiniDappProps,
  MiniData,
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

export const getDapps = (data: []) => {
  return async (dispatch: AppDispatch, getState: Function) => {

    //console.log("here with data: ", serverURL, data)
    const state = getState()
    const fileServer = state.fileServer.data

    let dappInfo: MiniData[] = []

    for ( let i = 0; i < data.length; i++) {

      const dappData = data[i] as ServerDappsData
      if ( ( dappData.FullPath ) && (/0x/.test(dappData.FullPath))) {

        const url = fileServer.url + dappData.FullPath
        //console.log("getting dapp: ", url)

        fetch(url, {
          headers: {
            'Accept': 'application/json',
          },
        })
        .then(response => {
          //console.log("this response: ", response)
          if (!response.ok) {
             const statusText = response.statusText
             throw new Error(response.statusText)
          }
          return response.json()
        })
        .then(data => {

            const thisDappData: ServerDappData = data as ServerDappData

            if (thisDappData.Entries) {

              let newDappData: MiniData = {
                dir: url,
                miniDapp: "",
                conf: "",
                icon: ""
              }

              for ( let j = 0; j < thisDappData.Entries.length; j++) {

                const thisData = thisDappData.Entries[j] as ServerDappsData

                if (/conf$/.test(thisData.FullPath)) {
                  newDappData.conf = fileServer.url + thisData.FullPath
                } else if (/png$/.test(thisData.FullPath)) {
                  newDappData.icon = fileServer.url + thisData.FullPath
                } else if (/minidapp$/.test(thisData.FullPath)) {
                  newDappData.miniDapp = fileServer.url + thisData.FullPath
                } else {
                  throw new Error("Unknown entry " + thisData.FullPath)
                }
              }

              dappInfo.push(newDappData)
              //console.log("This dapp: ", newDappData)
            }

            //console.log("dapps: ", dappInfo)
            dispatch(write({data: dappInfo})(MiniDappActionTypes.MINIDAPP_SUCCESS))

        })
       .catch(error => {
          console.log(error)
          dispatch(write({data: []})(MiniDappActionTypes.MINIDAPP_SUCCESS))
       })
      }

    }

  }
}

export const getMiniDapps = () => {
  return async (dispatch: AppDispatch, getState: Function) => {

    const state = getState()
    const fileServer = state.fileServer.data

    //console.log("fileServer: ", fileServer.url)

    //mode: 'no-cors',
    fetch(fileServer.url, {
      headers: {
        'Accept': 'application/json',
      },
    })
    .then(response => {
      //console.log("this response: ", response)
      if (!response.ok) {
         const statusText = response.statusText
         throw new Error(response.statusText)
      }
      return response.json()
    })
    .then(data => {

        if (data.Entries) {

          dispatch(getDapps(data.Entries))
        }
        //dispatch(write({data: serverInfo})(MiniDappActionTypes.MINIDAPP_SUCCESS))
    })
   .catch(error => {
      console.log(error)
      //console.log(`${Transaction.errorGettingData}: ${error.message} at ${dateText}`)
      //dispatch(write({data: serverInfo})(MiniDappActionTypes.MINIDAPP_FAILURE))
   })
  }
}
