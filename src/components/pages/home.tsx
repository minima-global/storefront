import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'

//import Markdown from 'react-markdown'
import { SimpleArrayRenderer } from '../simpleRenderer'
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
  const [dapps, setDapps] = useState([] as any[])
  //const themeClasses = themeStyles()

  useEffect(() => {

    //console.log("minidapps!: ", props.miniDapps)

    if ( props.miniDapps.data ) {

        if (props.miniDapps.data.length > 0) {

          let dappInfo: any[] = []

          //console.log("got how many?: ", props.miniDapps.data.length)

          for ( var i = 0; i < props.miniDapps.data.length; i++) {

            console.log("icon: ", props.miniDapps.data[i].icon)

            const iconURL = props.miniDapps.data[i].icon
            const dirURL = props.miniDapps.data[i].dir

            fetch(iconURL, {
              method: 'GET'
            })
            .then( response => response.blob() )
            .then( blob => {

               var reader = new FileReader();
               reader.readAsDataURL(blob);
               reader.onloadend = function() {
                   const base64data: string = reader.result as string
                   //console.log(base64data)
                   const renderHTML = (
                     <React.Fragment key={dirURL}>
                     <p>
                      <a href={base64data}></a>
                     </p>
                     </React.Fragment>
                   )
                   dappInfo.push(renderHTML)
               }
              })
          }

          //console.log(dappInfo)
          setDapps(dappInfo)
        }
    }

  }, [props.miniDapps])

  return (
    <>
      <h2>{HomeConfig.heading}</h2>
      <hr />
      <p>
        <SimpleArrayRenderer data={dapps} />
      </p>
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
