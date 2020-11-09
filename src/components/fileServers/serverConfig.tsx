import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'

import { initServers, getServers, getMiniDapps } from '../../store/app/fileServer/actions'
import { initBlockchain } from '../../store/app/blockchain/actions'

import { ApplicationState, AppDispatch, ServerProps } from '../../store/types'

interface ServerInitStateProps {
  serverData: ServerProps
}

interface ServerInitDispatchProps {
    initBlockchain: () => void
    initServers: () => void
    getConfig: () => void
    getDapps: () => void
}

type Props =  ServerInitStateProps & ServerInitDispatchProps

const fileServers = ( props: Props ) => {

  let isFirstRun = useRef(true)

  useEffect(() => {

      if ( isFirstRun.current ) {

        isFirstRun.current = false
        props.initBlockchain()
        props.initServers()
        props.getConfig()

      } else {

        //only call this once we have server info from above
        if(props.serverData.data.hasLoaded) {
          props.getDapps()
        }
      }

  }, [props.serverData])

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
   initBlockchain: () => dispatch(initBlockchain()),
   initServers: () => dispatch(initServers()),
   getConfig: () => dispatch(getServers()),
   getDapps: () => dispatch(getMiniDapps())
 }
}

 export const ServerConfig = connect<ServerInitStateProps, ServerInitDispatchProps, {}, ApplicationState>(
   mapStateToProps,
   mapDispatchToProps
 )(fileServers)
