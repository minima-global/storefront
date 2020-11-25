import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import Markdown from 'react-markdown'

import Tooltip from '@material-ui/core/Tooltip'
//import FileReaderInput from 'react-file-reader-input'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { ApplicationState, AppDispatch, MiniDapps, Servers, MiniData } from '../../store'

import { AddDapp as AddDappConfig, Misc } from '../../config'

import { themeStyles } from '../../styles'

import { installDapp } from '../../store/app/blockchain/actions'

interface AddDappStateProps {
  serverData: Servers
  miniDappData: MiniDapps
}

interface AddDappDispatchProps {
  installDapp: () => void
}

type Props =  AddDappStateProps & AddDappDispatchProps

const dapp = (props: Props) => {

  const {index} = useParams()

  const classes = themeStyles()

  console.log("blah: ", props, index)

  const miniDapp: MiniData = props.miniDappData.miniDapps[index]

  const serverIndex = miniDapp.serverIndex
  const dappHome = props.serverData.servers[serverIndex].url
  const dir = miniDapp.dir
  const icon = miniDapp.icon
  const iconURL = dappHome + dir + "/" + icon
  const name = miniDapp.conf.name
  const description = miniDapp.conf.description
  const category = miniDapp.conf.category
  const miniDappURL = dappHome + dir + "/" + miniDapp.miniDapp

  return (
    <>
      <h2>{AddDappConfig.heading}</h2>
      <hr />
      <Paper className={classes.home} square={true}>
        <Grid container>
            <Grid>
              <Grid item xs={3}>
                &nbsp;
              </Grid>
              <Grid item justify="center" alignItems="center" xs={2}>
                <Paper className={classes.appIconContainer}>
                  <img
                    className={classes.appIcon}
                    src={iconURL}
                  />
                </Paper>
              </Grid>
              <Grid item justify="center" alignItems="center" xs={4}>
               <b>{name}</b> - {description}<br/>
               <i>{category}</i>
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
        </Grid>
      </Paper>
    </>
  )
}

const mapStateToProps = (state: ApplicationState): AddDappStateProps => {

  const servers = state.fileServers.data as Servers
  const miniDapps = state.miniDapps.data as MiniDapps
  return {
    serverData: servers,
    miniDappData: miniDapps
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
