import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'

import { initMiniDapps, getMiniDapps } from '../../store/app/fileServer/actions'
import { init } from '../../store/app/actions'

import { ApplicationState, AppDispatch, ServerProps } from '../../store/types'

interface ServerInitStateProps {
  serverData: ServerProps
}

interface ServerInitDispatchProps {
  init: () => void
  initMiniDapps: () => void
  getMiniDapps: () => void
}

type Props =  ServerInitStateProps & ServerInitDispatchProps

const fileServers = ( props: Props ) => {

  let isFirstRun = useRef(true)

  useEffect(() => {

    console.log("why am I here? ")

    if ( isFirstRun.current ) {

      console.log("here? ")
      isFirstRun.current = false
      props.init()

    } else {

      //console.log("made it here? ", props.serverData)

      if ( props.serverData.data.servers.length == props.serverData.data.numAvailable ) {

        console.log("or here? ")
        props.initMiniDapps()
        props.getMiniDapps()
      }
    }

  },[props.serverData])

  return null
}

const mapStateToProps = (state: ApplicationState): ServerInitStateProps => {

   const info = state.fileServers as ServerProps
   return {
     serverData: info
   }
}

const mapDispatchToProps = (dispatch: AppDispatch): ServerInitDispatchProps => {
 return {
   init: () => dispatch(init()),
   initMiniDapps: () => dispatch(initMiniDapps()),
   getMiniDapps: () => dispatch(getMiniDapps())
 }
}

 export const ServerConfig = connect<ServerInitStateProps, ServerInitDispatchProps, {}, ApplicationState>(
   mapStateToProps,
   mapDispatchToProps
 )(fileServers)
