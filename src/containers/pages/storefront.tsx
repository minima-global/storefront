import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Spinner from 'react-spinner-material'

import { initMiniDapps, getMiniDapps } from '../../store/app/fileServer/actions'

//import Markdown from 'react-markdown'
//import { SimpleArrayRenderer } from '../simpleRenderer'
import { Storefronts as StorefrontConfig, Misc, Local, AddDapp } from '../../config'

import { themeStyles } from '../../styles'

import {
  ApplicationState,
  AppDispatch,
  Servers,
  MiniDapps,
  MiniData
} from '../../store'

// @ts-ignore
import { Minima } from '../../store/app/blockchain/minima'

interface StorefrontStateProps {
  serverData: Servers
  miniDappData: MiniDapps
}

//type Props = StorefrontStateProps & StorefrontDispatchProps
type Props = StorefrontStateProps

const get = ( props: Props ) => {

  const [isLoading, setLoading] = useState(false)

  const {index} = useParams()

  const classes = themeStyles()
  let history = useHistory()

  return (
    <>
      <h2>{props.serverData.servers[index].title} - {StorefrontConfig.storefrontHeading}</h2>
      <hr />
      {props.serverData.servers[index].description}
      <hr />
      {props.serverData.servers[index].url}
      <hr />
      <p>
          {isLoading ?
            <div className={classes.spinner}>
              <Spinner radius={40} color={"#ff671d"} stroke={5} visible={isLoading} />
            </div> : (
              <Paper className={classes.home} square={true}>
                <Grid container>
                  {
                    props.miniDappData.miniDapps.map( ( miniDapp: MiniData, i: number ) => {

                      const serverIndex = miniDapp.serverIndex
                      //console.log("indexes: ", index, serverIndex)
                      if ( index == serverIndex ) {

                          //console.log("made it here")
                          const dappHome = props.serverData.servers[serverIndex].url
                          const dir = miniDapp.dir
                          const icon = miniDapp.icon
                          const iconURL = dappHome + dir + "/" + icon
                          const name = miniDapp.conf.name
                          const headline = miniDapp.conf.headline
                          const version = miniDapp.conf.version
                          const description = miniDapp.conf.description
                          const category = miniDapp.conf.category
                          const miniDappURL = dappHome + dir + "/" + miniDapp.miniDapp
                          //const pathAddDapp = `${Local.addDapp}/${i}`

                          return (
                            <>
                              <Grid item justify="center" alignItems="center" xs={12} sm={2}>
                                <Paper className={classes.appIconContainer}>
                                    <img
                                      className={classes.appIcon}
                                      src={iconURL}
                                    />
                                </Paper>
                              </Grid>
                              <Grid item justify="center" alignItems="center" xs={12} sm={8}>
                               <b>{name}</b><br/>
                               <i>{category}</i>
                              </Grid>
                              <Grid item justify="center" alignItems="center" xs={12} sm={2}>
                                <form method="get" action={miniDappURL}>
                                   <button type="submit">{AddDapp.download}</button>
                                </form>
                              </Grid>
                              <Grid item justify="center" alignItems="center" xs={12}>
                                <hr />
                                <p>{headline}<br/>
                                <b>{version}</b></p>
                              </Grid>
                            </>
                          )
                      }
                    })
                  }
                </Grid>
              </Paper>
            )
          }
      </p>
    </>
  )
}

const mapStateToProps = (state: ApplicationState): StorefrontStateProps => {

  const servers = state.fileServers.data as Servers
  const miniDapps = state.miniDapps.data as MiniDapps
  return {
    serverData: servers,
    miniDappData: miniDapps
  }
}

export const Storefront = connect<StorefrontStateProps, {}, {}, ApplicationState>(
  mapStateToProps
)(get)
