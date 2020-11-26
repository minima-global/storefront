import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Markdown from 'react-markdown'

import Tooltip from '@material-ui/core/Tooltip'
//import FileReaderInput from 'react-file-reader-input'

import Grid from '@material-ui/core/Grid'
import RightCircleOutlined from '@ant-design/icons/lib/icons/RightCircleOutlined'
//import { Okay } from '../../styles'

import Input from '@material-ui/core/Input'

import { Settings as SettingsConfig } from '../../config'

import { ApplicationState, AppDispatch, ServerProps, Server } from '../../store'
import { initServers, initMiniDapps, setServers } from '../../store/app/fileServer/actions'

import { get } from '../../utils/list'

interface ServerStateProps {
  serverData: ServerProps
}

interface ServerDispatchProps {
  initServers: () => void
  initMiniDapps: () => void
  setServers: (file: any) => void
}

type Props =  ServerStateProps & ServerDispatchProps

const settings = (props: Props) => {

  const [serverInfo, setServerInfo] = useState("")

  useEffect(() => {

    if ( props.serverData.data.servers.length == props.serverData.data.numAvailable ) {

      //console.log(props.serverData.data)
      let xs = ""
      const serverInfo = props.serverData.data.servers
      for (let i = 0; i < serverInfo.length; i++) {
        xs += `<h3>${SettingsConfig.server}</h3>`
        xs += `<p>${SettingsConfig.serverInfo}: ${serverInfo[i].description}<br/>`
        xs += `${SettingsConfig.serverURL}: ${serverInfo[i].url}<br/>`
        xs += `${SettingsConfig.serverOnline}: ${serverInfo[i].isOnline}<br/>`
      }
      //console.log("Serverinfo: ", serverInfo)
      setServerInfo(xs)
    }

  }, [props.serverData])

  const getFile = (e: any) => {

    props.initMiniDapps()
    props.initServers()
    const files = e.target.files
    props.setServers(files[0])
  }

  return (
    <>
        <h2>{SettingsConfig.heading}</h2>
        <hr />
        <h3>{SettingsConfig.currentSettings}</h3>
        <Markdown escapeHtml={false} source={serverInfo} />
        <hr />
        <h3><label htmlFor="getFile">{SettingsConfig.getFile}:<br/></label></h3>
        <Tooltip title={SettingsConfig.fileTip}>
          <Input
              name="getFile"
              type="file"
              inputProps={{ accept: '.json' }}
              onChange={getFile}
          />
        </Tooltip>
    </>
  )
}

const mapStateToProps = (state: ApplicationState): ServerStateProps => {

    const info = state.fileServers as ServerProps
    return {
      serverData: info
    }
}

const mapDispatchToProps = (dispatch: AppDispatch): ServerDispatchProps => {
 return {
   initServers: () => dispatch(initServers()),
   initMiniDapps: () => dispatch(initMiniDapps()),
   setServers: (file: any) => dispatch(setServers(file))
 }
}

export const ServerSettings = connect<ServerStateProps, ServerDispatchProps, {}, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(settings)
