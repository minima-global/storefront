import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'

import { init, poll } from '../store/app/actions'

import { ApplicationState, AppDispatch } from '../store/types'

interface InitDispatchProps {
  init: () => void
  poll: () => void
}

type Props = InitDispatchProps

const initialise = ( props: Props ) => {

  useEffect(() => {

    props.init()
    props.poll()

  },[])

  return null
}

const mapDispatchToProps = (dispatch: AppDispatch): InitDispatchProps => {
 return {
   init: () => dispatch(init()),
   poll: () => dispatch(poll())
 }
}

 export const AppInit = connect<{}, InitDispatchProps, {}, ApplicationState>(
   null,
   mapDispatchToProps
 )(initialise)
