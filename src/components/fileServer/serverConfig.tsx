import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'

import { getServer, getMiniDapps } from '../../store/app/fileServer/actions'
import { init } from '../../store/app/blockchain/actions'

import { ApplicationState, AppDispatch, ServerProps } from '../../store/types'

interface ServerInitStateProps {
  serverData: ServerProps
}

interface ServerInitDispatchProps {
    init: () => void
    getConfig: () => void
    getDapps: () => void
}

/*const defaultProps: ServerInitDispatchProps = {
    init: () => {},
    getConfig: () => {},
    getDapps: () => {}
}*/

type Props =  ServerInitStateProps & ServerInitDispatchProps

const fileServer = ( props: Props ) => {

  let isFirstRun = useRef(true)

  useEffect(() => {

      if ( isFirstRun.current ) {

        isFirstRun.current = false
        props.init()
        props.getConfig()

      } else {

        //only call this once we have server info from above
        //console.log("server info: ", props.serverData)
        props.getDapps()
      }

  }, [props.serverData])

  return null
}

const mapStateToProps = (state: ApplicationState): ServerInitStateProps => {

   const info = state.fileServer as ServerProps
   return {
     serverData: info
   }
}

const mapDispatchToProps = (dispatch: AppDispatch): ServerInitDispatchProps => {
 return {
   init: () => dispatch(init()),
   getConfig: () => dispatch(getServer()),
   getDapps: () => dispatch(getMiniDapps())
 }
}

 export const ServerConfig = connect<ServerInitStateProps, ServerInitDispatchProps, {}, ApplicationState>(
   mapStateToProps,
   mapDispatchToProps
 )(fileServer)
