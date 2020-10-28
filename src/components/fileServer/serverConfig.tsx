import React from 'react'
import { connect } from 'react-redux'

import { getServer } from '../../store/app/fileServer/actions'

import { ApplicationState, AppDispatch } from '../../store/types'

interface ServerInitDispatchProps {
    getConfig: () => void
}

const defaultProps: ServerInitDispatchProps = {
    getConfig: () => {}
}

const fileServer = ( props: ServerInitDispatchProps = defaultProps ) => {

    props.getConfig()

    return null
 }

 const mapDispatchToProps = (dispatch: AppDispatch): ServerInitDispatchProps => {
   return {
     getConfig: () => dispatch(getServer())
   }
 }

 export const ServerConfig = connect<{}, ServerInitDispatchProps, {}, ApplicationState>(
   null,
   mapDispatchToProps
 )(fileServer)
