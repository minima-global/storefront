// @ts-ignore
import { Minima } from './minima'

import {
  AppDispatch,
  InstalledActionTypes,
  InstalledDapps,
  InstalledDapp
} from '../../types'

import { Config } from '../../../config'

import { write } from '../../actions'

export const initBlockchain = () => {
  return async (dispatch: AppDispatch) => {

    //Minima.init()
    Minima.init( function( msg: any ) {

      //console.log(msg)

      if ( msg.event == "connected" ) {

        Minima.minidapps.list( function( listMsg: any ) {

    			const myDapps = listMsg.response.minidapps

          //console.log("MyDapps: ", myDapps)
          const installedData: InstalledDapps = {
            num: myDapps.length,
            installedDapps: []
          }
          dispatch(write({data: installedData})(InstalledActionTypes.INSTALLED_TOTAL))

          for ( let i = 0; i < myDapps.length; i++ ) {

              Minima.minidapps.send( myDapps[i].uid, "/services", function ( msg: any ) {

                //console.log("services msg: ", msg)

                if( msg.response.hasOwnProperty('reply') ) {

                  if ( msg.response.reply.startsWith("/") ) {

                    const thisInstalled: InstalledDapp = {
                      uid: myDapps[i].uid,
                      services: msg.response.reply.split(" ")
                    }

                    //console.log("services! ", thisInstalled)
                    dispatch(write({data: thisInstalled})(InstalledActionTypes.INSTALLED_SUCCESS))

                  } else {

                    console.log("no services!", msg)
                  }

                } else {

                  console.log("no services!", msg)
                }
              })
            }
      	})
      }
    })
  }
}

export const installDapp = () => {
  return async (dispatch: AppDispatch) => {

    console.log("install!")
  }
}
