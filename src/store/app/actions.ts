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
  initCountMiniDapps
} from './fileServer/actions'

import { waitFor, wait } from '../../utils'

import { Misc } from '../../config'

let pollCount = 0

export const init = () => {
  return async (dispatch: AppDispatch) => {

    dispatch(initBlockchain())
    dispatch(initMiniDapps())
    dispatch(initServers())
    dispatch(getServers())
    //can't get minidapps until we have the servers
  }
}

//const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay))

export const poll = () => {
  return async (dispatch: AppDispatch, getState: Function) => {

    //console.log("in poll")

    // now get the miniDapps
    await dispatch(initMiniDapps())
    //dispatch(getMiniDapps())

    setTimeout( async () => {

      let state = getState()
      const serverData = state.fileServers.data as Servers
      //console.log("here: ", serverData, thisCount, CHECKCOUNT)

      if ( serverData.servers.length > 0
      && serverData.servers.length == serverData.numAvailable ) {

        const miniDappData = state.miniDapps.data as MiniDapps
        if ( miniDappData.miniDapps.length === 0 ) {

          //console.log("getting minidapps")
          dispatch(getMiniDapps())
        }
      } else {
        //console.log("In here?")
        dispatch(poll())
      }

    }, Misc.pollInterval)
  }
}
