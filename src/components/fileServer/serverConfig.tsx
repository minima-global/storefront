import React from 'react'
import { connect } from 'react-redux'

import { getServer } from '../../store/app/fileServer/actions'
import { init } from '../../store/app/blockchain/actions'

import { ApplicationState, AppDispatch } from '../../store/types'

interface ServerInitDispatchProps {
    init: () => void
    getConfig: () => void
}

const defaultProps: ServerInitDispatchProps = {
    init: () => {},
    getConfig: () => {}
}

const fileServer = ( props: ServerInitDispatchProps = defaultProps ) => {

    props.init()
    props.getConfig()

    return null
 }

 const mapDispatchToProps = (dispatch: AppDispatch): ServerInitDispatchProps => {
   return {
     init: () => dispatch(init()),
     getConfig: () => dispatch(getServer())
   }
 }

 export const ServerConfig = connect<{}, ServerInitDispatchProps, {}, ApplicationState>(
   null,
   mapDispatchToProps
 )(fileServer)
