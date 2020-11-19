import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'

import { getMiniDapps } from '../../store/app/fileServer/actions'
import { init } from '../../store/app/actions'

import { ApplicationState, AppDispatch, ServerProps } from '../../store/types'

interface ServerInitStateProps {
  serverData: ServerProps
}

interface ServerInitDispatchProps {
  init: () => void
  getDapps: () => void
}

type Props =  ServerInitStateProps & ServerInitDispatchProps

const fileServers = ( props: Props ) => {

  let isFirstRun = useRef(true)

  useEffect(() => {

    if ( isFirstRun.current ) {

      isFirstRun.current = false
      props.init()

    } else {

      if ( props.serverData.data.numLoaded == props.serverData.data.numAvailable )  {

        props.getDapps()
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
   getDapps: () => dispatch(getMiniDapps())
 }
}

 export const ServerConfig = connect<ServerInitStateProps, ServerInitDispatchProps, {}, ApplicationState>(
   mapStateToProps,
   mapDispatchToProps
 )(fileServers)
