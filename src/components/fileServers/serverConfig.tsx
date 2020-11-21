import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'

import { initMiniDapps } from '../../store/app/fileServer/actions'
import { init } from '../../store/app/actions'

import { ApplicationState, AppDispatch, ServerProps } from '../../store/types'

interface ServerInitDispatchProps {
  init: () => void
  initMiniDapps: () => void
}

type Props = ServerInitDispatchProps

const fileServers = ( props: Props ) => {

  useEffect(() => {

    props.init()
    props.initMiniDapps()

  },[])

  return null
}

const mapDispatchToProps = (dispatch: AppDispatch): ServerInitDispatchProps => {
 return {
   init: () => dispatch(init()),
   initMiniDapps: () => dispatch(initMiniDapps())
 }
}

 export const ServerConfig = connect<{}, ServerInitDispatchProps, {}, ApplicationState>(
   null,
   mapDispatchToProps
 )(fileServers)
