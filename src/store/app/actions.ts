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
  initCountMiniDapps,
  countMiniDapps
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

export const poll = () => {
  return async (dispatch: AppDispatch, getState: Function) => {

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
        } else {

          if ( pollCount == 0 ) {

              await dispatch(initCountMiniDapps())
              dispatch(countMiniDapps())
              pollCount = 1

          // We don't need to check dapps available each pollDelay
          // In fact - doing so probably wont work because it may take a considerable
          // amount of time to check online resources...
          } else if ( pollCount == Misc.dappCheckInterval ) {

              state = getState()
              const count = state.miniDapps.data.numAvailable
              const listed = state.miniDapps.data.numListed
              //console.log("minidapp count: ", count, listed)
              if ( count != listed ) {

                  // refresh what dapps we display
                  // console.log("Getting minidapps")
                  await dispatch(initMiniDapps())
                  dispatch(getMiniDapps())
              }
              pollCount = 0

          } else {

              pollCount += 1
          }
        }
      }
      dispatch(poll())

    }, Misc.pollInterval)
  }
}
