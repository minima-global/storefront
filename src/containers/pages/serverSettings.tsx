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

import { ApplicationState, ServerProps } from '../../store'
import { get } from '../../utils/list'

interface InfoProps {
  serverData: ServerProps
}

const settings = (props: InfoProps) => {

  const [isLoading, setIsLoading] = useState(false)
  const [fileEnabled, setFileEnabled] = useState(true)

  const [fileName, setFileName] = useState("")
  const [info, setInfo] = useState("")

  const serverInfo = get(props.serverData.data)

  const getFile = (e: any) => {

    let files = e.target.files
    let reader = new FileReader()
    reader.readAsText(files[0])

    reader.onloadend = e => {
        if(e.target) {
                console.log(e.target.result)
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

const mapStateToProps = (state: ApplicationState): InfoProps => {

    const info = state.fileServer as ServerProps
    return {
      serverData: info
    }
}

export const ServerSettings = connect<InfoProps, {}, {}, ApplicationState>(
  mapStateToProps
)(settings)
