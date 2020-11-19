// @ts-ignore
import { Minima } from './blockchain/minima'

import { initServers, getServers } from './fileServer/actions'

import {
  AppDispatch
} from '../types'

import { Config } from '../../config'

import { write } from '../actions'

export const init = () => {
  return async (dispatch: AppDispatch) => {

    Minima.init( function( msg: any ) {

      if ( msg.event == "connected" ) {

        dispatch(initServers())
        dispatch(getServers())
      }
    })
  }
}
