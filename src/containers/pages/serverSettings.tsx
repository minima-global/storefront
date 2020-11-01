import React, { useState } from 'react'
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
import { setServer } from '../../store/app/fileServer/actions'

import { get } from '../../utils/list'

interface ServerStateProps {
  serverData: ServerProps
}

interface ServerDispatchProps {
  setConfig: (values: any) => void
}

type Props =  ServerStateProps & ServerDispatchProps

const settings = (props: Props) => {

  const [isLoading, setIsLoading] = useState(false)
  const [fileEnabled, setFileEnabled] = useState(true)

  const [fileName, setFileName] = useState("")
  const [info, setInfo] = useState("")

  const serverInfo = get(props.serverData.data)

  const checkFile = (fileText: string): boolean => {
    let contains = /"info":/.test(fileText)
    if (contains) {
      contains = /"url":/.test(fileText)
      if (contains) {
        contains = /"port":/.test(fileText)
      }
    }

    return contains
  }

  const getFile = (e: any) => {

    let files = e.target.files
    let reader = new FileReader()

    //console.log(files[0].name)
    reader.readAsText(files[0])
    reader.onloadend = e => {
        if(e.target) {
            //console.log(e.target.result)
            const serverInfo: string = e.target.result as string
            if(checkFile(serverInfo)) {
              const serverJSON = JSON.parse(serverInfo)
              const thisServerJson: Server = {
                configFile: files[0].name,
                info: serverJSON.info,
                url: serverJSON.url
              }
              props.setConfig(thisServerJson)
            } else {
                console.log("Incorrect server file format!")
            }
        }
    }

      /*const [load, file] = results[0]
      setFileName(file.name)*/
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
              onChange={getFile}
          />
        </Tooltip>
    </>
  )
}

const mapStateToProps = (state: ApplicationState): ServerStateProps => {

    const info = state.fileServer as ServerProps
    return {
      serverData: info
    }
}

const mapDispatchToProps = (dispatch: AppDispatch): ServerDispatchProps => {
 return {
   setConfig: (values: any) => dispatch(setServer(values))
 }
}

export const ServerSettings = connect<ServerStateProps, ServerDispatchProps, {}, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(settings)
