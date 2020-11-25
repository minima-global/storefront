// @ts-ignore
import { Minima } from './blockchain/minima'

import {
  AppDispatch,
  Servers,
  MiniDapps
} from '../types'

import { initBlockchain } from './blockchain/actions'

import {
  initMiniDapps,
  initServers,
  getServers,
  getMiniDapps,
  countMiniDapps
} from './fileServer/actions'

import { waitFor, wait } from '../../utils'

import { Misc } from '../../config'

export const init = () => {
  return async (dispatch: AppDispatch) => {

    dispatch(initBlockchain())
    dispatch(initMiniDapps())
    dispatch(initServers())
    dispatch(getServers())
    //can't get minidapps until we have the servers
  }
}

export const poll = () => {
  return async (dispatch: AppDispatch, getState: Function) => {

    setTimeout( async () => {

      let state = getState()
      const serverData = state.fileServers.data as Servers
      console.log("here: ", serverData)

      if ( serverData.servers.length > 0
      && serverData.servers.length == serverData.numAvailable ) {

        const miniDappData = state.miniDapps.data as MiniDapps
        if ( miniDappData.miniDapps.length === 0 ) {

          console.log("getting minidapps")
          dispatch(getMiniDapps())
        } else {

          await dispatch(countMiniDapps(serverData))
          state = getState()
          const count = state.miniDapps.data.numAvailable
          console.log("minidapp count: ", count)
        }
      }      
      dispatch(poll())

    }, Misc.pollDelay)
  }
}
