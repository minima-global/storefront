// @ts-ignore
import { Minima } from './blockchain/minima'

import {
  AppDispatch,
  Servers
} from '../types'

import { initBlockchain } from './blockchain/actions'

import {
  initMiniDapps,
  initServers,
  getServers,
  getMiniDapps
} from './fileServer/actions'

import { waitFor, wait } from '../../utils'

import { Misc } from '../../config'

export const init = () => {
  return async (dispatch: AppDispatch) => {

    dispatch(initBlockchain())
    dispatch(initServers())
    dispatch(getServers())
  }
}

export const poll = () => {
  return async (dispatch: AppDispatch, getState: Function) => {

    setTimeout( async () => {

      const state = getState()
      const serverData = state.fileServers.data as Servers

      console.log("here: ", serverData)

      if ( serverData.servers.length > 0
      && serverData.servers.length == serverData.numAvailable ) {
        await dispatch(initMiniDapps())
        dispatch(getMiniDapps())
      }
      dispatch(poll())

    }, Misc.pollDelay)
  }
}
