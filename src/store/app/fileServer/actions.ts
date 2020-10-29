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

export const getServer = () => {
  return async (dispatch: AppDispatch) => {

    fetch(`${Config.serverConfig}`)
      .then(response => response.json())
      .then(data => {
        fetch(data.file)
          .then(response => response.json())
          .then(data => {
          	const serverData: Server = {
              name: data.name,
              server: data.server,
              port: data.port
            }

            dispatch(write({data: serverData})(ServerActionTypes.SERVER_SUCCESS))
        })
      })
  }
}
