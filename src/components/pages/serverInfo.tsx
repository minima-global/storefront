import * as React from 'react'
import { connect } from 'react-redux'
import Markdown from 'react-markdown'

import { ApplicationState, ServerProps } from '../../store'
import { get } from '../../utils/list'

import { Server } from '../../config/strings'

interface InfoProps {
  serverData: ServerProps
}

const info = (props: InfoProps) => {

  const serverInfo = get(props.serverData.data)

  return (
      <div>
        <h2>{Server.heading}</h2>
        <Markdown escapeHtml={false} source={serverInfo} />
      </div>
  )
}

const mapStateToProps = (state: ApplicationState): InfoProps => {

    const info = state.fileServer as ServerProps
    return {
      serverData: info
    }
}

export const ServerInfo = connect<InfoProps, {}, {}, ApplicationState>(
  mapStateToProps
)(info)
