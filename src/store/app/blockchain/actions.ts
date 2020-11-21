// @ts-ignore
import { Minima } from './minima'

import {
  AppDispatch
} from '../../types'

import { Config } from '../../../config'

import { write } from '../../actions'

export const initBlockchain = () => {
  return async (dispatch: AppDispatch) => {

    Minima.init()
    /*Minima.init( function( msg: any ) {

      if ( msg.event == "connected" ) {
      }
    })*/
  }
}

export const installDapp = () => {
  return async (dispatch: AppDispatch) => {

    console.log("install!")
  }
}
