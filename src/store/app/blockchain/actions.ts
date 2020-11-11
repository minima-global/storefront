// @ts-ignore
import { Minima } from './minima'

import {
  AppDispatch
} from '../../types'

import { Config } from '../../../config'

import { write } from '../../actions'

export const initBlockchain = () => {
  return async (dispatch: AppDispatch, getState: Function) => {

      console.log("In init")
      Minima.init()
      //Minima.logging = true
  }
}

export const installDapp = () => {
  return async (dispatch: AppDispatch) => {

    console.log("install!")
  }
}
