// @ts-ignore
import { Minima } from './blockchain/minima'

import { initBlockchain } from './blockchain/actions'
import { initServers, getServers, initMiniDapps } from './fileServer/actions'

import {  } from '../../store/app/fileServer/actions'

import {
  AppDispatch
} from '../types'

import { Config } from '../../config'

import { write } from '../actions'

export const init = () => {
  return async (dispatch: AppDispatch) => {

    dispatch(initBlockchain())
    dispatch(initMiniDapps())
    dispatch(initServers())
    dispatch(getServers())
  }
}
