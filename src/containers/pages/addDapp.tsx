import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import Markdown from 'react-markdown'

import Tooltip from '@material-ui/core/Tooltip'
//import FileReaderInput from 'react-file-reader-input'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { ApplicationState, AppDispatch, MiniDappProps } from '../../store'

import { SimpleArrayRenderer } from '../../components/simpleRenderer'
import { AddDapp as AddDappConfig, Misc } from '../../config'

import { themeStyles } from '../../styles'

import { installDapp } from '../../store/app/blockchain/actions'

interface AddDappStateProps {
  //serverData: ServerProps
  miniDapps: MiniDappProps
}

interface AddDappDispatchProps {
  installDapp: () => void
}

type Props =  AddDappStateProps & AddDappDispatchProps

const dapp = (props: Props) => {

  const [dapp, setDapp] = useState([] as any[])
  const {dir} = useParams()

  const classes = themeStyles()

  const setDappInfo = async () => {

    if (props.miniDapps.data.length > 0) {

      for ( var i = 0; i < props.miniDapps.data.length; i++) {

        const thisDir = props.miniDapps.data[i].dir
        
        if (dir == thisDir ) {

          let dappInfo: any[] = []

          const iconURL = props.miniDapps.data[i].icon
          const confURL = props.miniDapps.data[i].conf
          const miniDappURL = props.miniDapps.data[i].miniDapp

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
            <React.Fragment key={thisDir}>
              <Paper className={classes.home} square={true}>
                <Grid container>
                  <Grid item xs={3}>
                    &nbsp;
                  </Grid>
                  <Grid item justify="center" alignItems="center" xs={2}>
                    <img src={iconURL} width={Misc.homeIconSize} height={Misc.homeIconSize} />
                  </Grid>
                  <Grid item justify="center" alignItems="center" xs={4}>
                   <b>{confJson.name}</b> - {confJson.description}<br/>
                   <i>{confJson.category}</i>
                  </Grid>
                  <Grid item xs={3}>
                    &nbsp;
                  </Grid>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={5}>
                    &nbsp;
                  </Grid>
                  <Grid item justify="center" alignItems="center" xs={2}>
                    <form method="get" action={miniDappURL}>
                       <button type="submit">{AddDappConfig.download}</button>
                    </form>
                  </Grid>
                  <Grid item xs={5}>
                    &nbsp;
                  </Grid>
                </Grid>
              </Paper>
            </React.Fragment>
          )

          dappInfo.push(renderHTML)
          setDapp(dappInfo)

        }
      }
    }
  }

  useEffect(() => {

    if ( props.miniDapps.data ) {

        setDappInfo()
    }

  }, [props.miniDapps])

  return (
    <>
      <h2>{AddDappConfig.heading}</h2>
      <hr />
      <p>
        <SimpleArrayRenderer data={dapp} />
      </p>
    </>
  )
}

const mapStateToProps = (state: ApplicationState): AddDappStateProps => {

    const dapps = state.miniDapps as MiniDappProps
    return {
      miniDapps: dapps
    }
}

const mapDispatchToProps = (dispatch: AppDispatch): AddDappDispatchProps => {
 return {
   installDapp: () => dispatch(installDapp())
 }
}

export const AddDapp = connect<AddDappStateProps, AddDappDispatchProps, {}, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(dapp)
