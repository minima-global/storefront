// @ts-ignore
import { Minima } from './minima'

import {
  AppDispatch
} from '../../types'

import { Config } from '../../../config'

import { write } from '../../actions'

export const init = () => {
  return async (dispatch: AppDispatch, getState: Function) => {

      Minima.init()
      //Minima.logging = true
  }
}

export const installDapp = () => {
  return async (dispatch: AppDispatch) => {

    console.log("install!")
  }
}
