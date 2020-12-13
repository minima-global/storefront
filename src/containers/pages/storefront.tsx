import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Spinner from 'react-spinner-material'

import IconButton from '@material-ui/core/IconButton'

import Tooltip from '@material-ui/core/Tooltip'

import downloadIcon from '../../images/downloadLarge.png'
import linkIcon from '../../images/linkLarge.png'

import { initMiniDapps, getMiniDapps } from '../../store/app/fileServer/actions'

//import Markdown from 'react-markdown'
//import { SimpleArrayRenderer } from '../simpleRenderer'
import { Storefronts as StorefrontConfig, Misc, Local, AddDapp, Help } from '../../config'

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

  const storeURL = props.serverData.servers[index].url
  const storeTitle = props.serverData.servers[index].title
  const storeDescription = props.serverData.servers[index].description
  const storeIcon = props.serverData.servers[index].icon
  const storeIconURL = storeURL + "/" + storeIcon

  return (
    <Grid container alignItems="flex-start">
        {isLoading ?
          <Grid container className={classes.spinner}>
            <Spinner radius={40} color={"#ff671d"} stroke={5} visible={isLoading} />
          </Grid> : (
            <Grid container>
              <Grid item xs={12}>
                <h2>{storeTitle} - {StorefrontConfig.storefrontHeading}</h2>
                <h3>Store Description</h3>
                <p>{storeDescription}</p>
                <hr className={classes.hr}/>
                <p><img src={linkIcon}/> {storeURL}</p>
                <hr className={classes.hr}/>
              </Grid>
              {
                props.miniDappData.miniDapps.map( ( miniDapp: MiniData, i: number ) => {

                  const serverIndex = miniDapp.serverIndex
                  //console.log("indexes: ", index, serverIndex)
                  if ( index == serverIndex ) {

                      //console.log("made it here")
                      const dir = miniDapp.dir
                      const icon = miniDapp.icon
                      const iconURL = storeURL + dir + "/" + icon
                      const name = miniDapp.conf.name
                      const headline = miniDapp.conf.headline
                      const version = miniDapp.conf.version
                      const description = miniDapp.conf.description
                      const category = miniDapp.conf.category
                      const miniDappURL = storeURL + dir + "/" + miniDapp.miniDapp
                      //const pathAddDapp = `${Local.addDapp}/${i}`

                      return (
                        <React.Fragment key={miniDappURL}>
                          <Grid item container justify="flex-start" xs={12} sm={2}>
                            <Paper className={classes.appIconContainer}>
                                <img
                                  className={classes.appIcon}
                                  src={iconURL}
                                />
                            </Paper>
                          </Grid>
                          <Grid item container justify="flex-start" xs={12} sm={8}>
                            <div className={classes.details}>
                               <b>{name}</b><br/>
                               {category}
                            </div>
                          </Grid>
                          <Grid item container justify="flex-end" xs={12} sm={2}>
                            <form method="get" action={miniDappURL}>
                              <Tooltip title={Help.downloadTip}>
                                <label htmlFor={miniDappURL}>
                                  <IconButton
                                    color="primary"
                                    aria-label={Help.downloadTip}
                                    component="span">
                                    <img src={downloadIcon}/>
                                  </IconButton>
                                </label>
                              </Tooltip>
                              <input
                                id={miniDappURL}
                                type="submit"
                                style={{ visibility: 'hidden'}}
                              />
                            </form>
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            &nbsp;
                          </Grid>
                          <Grid item container justify="flex-start" xs={12}  sm={10}>
                            <hr className={classes.hr}/>
                          </Grid>
                          <Grid item xs={12}>
                            <hr/>
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            &nbsp;
                          </Grid>
                          <Grid item container justify="flex-start" xs={12}  sm={10}>
                            <div className={classes.details}>
                               {headline}<br/>
                               <b>{version}</b>
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <hr/>
                          </Grid>
                        </React.Fragment>
                      )
                  }
                })
              }
            </Grid>
          )
        }
    </Grid>
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
