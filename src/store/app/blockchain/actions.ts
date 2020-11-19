// @ts-ignore
import { Minima } from './minima'

import {
  AppDispatch
} from '../../types'

import { Config } from '../../../config'

import { write } from '../../actions'

export const installDapp = () => {
  return async (dispatch: AppDispatch) => {

    console.log("install!")
  }
}
