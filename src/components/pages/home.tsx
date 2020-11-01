import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'

import Markdown from 'react-markdown'
import { Home as HomeConfig } from '../../config'

import { ApplicationState, AppDispatch, ServerProps, MiniDappProps, MiniData } from '../../store'
import { getMiniDapps } from '../../store/app/fileServer/actions'

interface HomeStateProps {
  //serverData: ServerProps
  miniDapps: MiniDappProps
}

interface HomeDispatchProps {
  getDapps: () => void
}

type Props =  HomeStateProps & HomeDispatchProps

const get = (props: Props) => {

  let isFirstRun = useRef(true)
  const [dapps, setDapps] = useState([])
  //const themeClasses = themeStyles()

  useEffect(() => {

      /*if ((props.serverData.data.url) && (!dapps.length)) {

          console.log("getting dapps")
          props.getDapps()

      } else {*/

        console.log("minidapps!: ", props.miniDapps)

        let dappInfo: any[] = []

      //}

            /*for ( var i = 0; i < props.files.data.length; i++) {

                  const renderHTML = (
                      <React.Fragment key={props.files.data[i].hash}>
                      <p>
                          {Files.hash}: {props.files.data[i].hash}<br/>{Files.fileName}: {props.files.data[i].name}<br/>
                          {Files.block}: {props.files.data[i].block}
                      </p>
                      </React.Fragment>
                  )
                  fileInfo.push(renderHTML)
              }
              setHashes(fileInfo)*/

  //}, [props.serverData, props.miniDapps])
  }, [props.miniDapps])

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
