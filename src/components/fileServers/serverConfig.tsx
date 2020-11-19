import React from 'react'
import { connect } from 'react-redux'

import { init } from '../../store/app/actions'

import { ApplicationState, AppDispatch, ServerProps } from '../../store/types'

interface ServerInitDispatchProps {
  init: () => void
}

type Props =  ServerInitDispatchProps

const fileServers = ( props: Props ) => {

  props.init()
  return null
}

const mapDispatchToProps = (dispatch: AppDispatch): ServerInitDispatchProps => {
 return {
   init: () => dispatch(init())
 }
}

 export const ServerConfig = connect<{}, ServerInitDispatchProps, {}, ApplicationState>(
   null,
   mapDispatchToProps
 )(fileServers)
