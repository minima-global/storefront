import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

//import Markdown from 'react-markdown'
import { SimpleArrayRenderer } from '../simpleRenderer'
import { Home as HomeConfig, Misc, Local } from '../../config'

import { themeStyles } from '../../styles'

import {
  ApplicationState,
  AppDispatch,
  ServerProps,
  MiniDappProps,
  MiniData
} from '../../store'

import { getMiniDapps } from '../../store/app/fileServer/actions'

interface HomeStateProps {
  miniDapps: MiniDappProps
}

/*
interface HomeDispatchProps {
  getDapps: () => void
}*/

type Props = HomeStateProps

const get = (props: Props) => {

  const [dapps, setDapps] = useState([] as any[])

  const classes = themeStyles()

  let history = useHistory()

  const setDappInfo = async () => {

    if (props.miniDapps.data.length > 0) {

      let dappInfo: any[] = []
      let content: any[] = []

      for ( var i = 0; i < props.miniDapps.data.length; i++) {

        //console.log("icon: ", props.miniDapps.data[i].icon)

        const iconURL = props.miniDapps.data[i].icon
        const dirURL = props.miniDapps.data[i].dir
        const confURL = props.miniDapps.data[i].conf

        const indexOf = dirURL.indexOf("/0x")
        const key = dirURL.substr(indexOf + 1)

        const pathAddDapp = `${Local.addDapp}/${key}`

        const response = await fetch(confURL)
        const text = await response.text()
        const thisConfJSON = JSON.parse(text)
        //console.log("JSON: ", thisConfJSON)
        const confJson = {
          name: thisConfJSON.name,
          description: thisConfJSON.description,
          category: thisConfJSON.category
        }

        const renderHTML = (
          <React.Fragment key={key}>
            <Grid item justify="center" alignItems="center" xs={6} sm={2}>
              <button onClick={() => history.push(`${pathAddDapp}`)}>
                <img src={iconURL} width={Misc.homeIconSize} height={Misc.homeIconSize} />
               </button>
            </Grid>
            <Grid item justify="center" alignItems="center" xs={6} sm={4}>
             <b>{confJson.name}</b> - {confJson.description}<br/>
             <i>{confJson.category}</i>
            </Grid>
          </React.Fragment>
        )
        content.push(renderHTML)
      }

      const dapps = (
        <>
          <Paper className={classes.home} square={true}>
            <Grid container>
              {content}
            </Grid>
          </Paper>
        </>
      )

      dappInfo.push(dapps)
      setDapps(dappInfo)
    }
  }

  useEffect(() => {

    if ( props.miniDapps.data ) {

        setDappInfo()
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

/*
const mapDispatchToProps = (dispatch: AppDispatch): HomeDispatchProps => {
 return {
   getDapps: () => dispatch(getMiniDapps())
 }
}*/

export const Home = connect<HomeStateProps, {}, {}, ApplicationState>(
  mapStateToProps
)(get)
