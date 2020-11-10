import React from 'react'
import { connect } from 'react-redux'

import { initServers, getServers } from '../../store/app/fileServer/actions'
import { initBlockchain } from '../../store/app/blockchain/actions'

import { ApplicationState, AppDispatch, ServerProps } from '../../store/types'

interface ServerInitStateProps {
  serverData: ServerProps
}

interface ServerInitDispatchProps {
  initBlockchain: () => void
  initServers: () => void
  getConfig: () => void
}

type Props =  ServerInitStateProps & ServerInitDispatchProps

const fileServers = ( props: Props ) => {

  props.initBlockchain()
  props.initServers()
  props.getConfig()

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
   getConfig: () => dispatch(getServers())
 }
}

 export const ServerConfig = connect<ServerInitStateProps, ServerInitDispatchProps, {}, ApplicationState>(
   mapStateToProps,
   mapDispatchToProps
 )(fileServers)
