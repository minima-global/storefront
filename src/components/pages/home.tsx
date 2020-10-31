import React from 'react'
import { connect } from 'react-redux'

import Markdown from 'react-markdown'
import { Home as HomeConfig } from '../../config'

import { ApplicationState, AppDispatch, MiniDappProps, MiniData } from '../../store'
import { getMiniDapps } from '../../store/app/fileServer/actions'

interface HomeStateProps {
  miniDapps: MiniDappProps
}

interface HomeDispatchProps {
  getDapps: () => void
}

type Props =  HomeStateProps & HomeDispatchProps

const get = (props: Props) => {

  props.getDapps()

  return (
    <>
        <Markdown escapeHtml={false} source={HomeConfig.info} />
    </>
  )
}

const mapStateToProps = (state: ApplicationState): HomeStateProps => {

    const dapps = state.miniDapps as MiniDappProps
    return {
      miniDapps: dapps
    }
}

const mapDispatchToProps = (dispatch: AppDispatch): HomeDispatchProps => {
 return {
   getDapps: () => dispatch(getMiniDapps())
 }
}

export const Home = connect<HomeStateProps, HomeDispatchProps, {}, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(get)
