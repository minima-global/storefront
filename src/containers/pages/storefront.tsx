import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'

import { isMobile } from "react-device-detect"

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Spinner from 'react-spinner-material'

import IconButton from '@material-ui/core/IconButton'

import ReactTooltip from 'react-tooltip'

import downloadIcon from '../../images/downloadLarge.png'
import linkIcon from '../../images/linkLarge.png'

import { initMiniDapps, getMiniDapps } from '../../store/app/fileServer/actions'

//import Markdown from 'react-markdown'
//import { SimpleArrayRenderer } from '../simpleRenderer'
import { Storefronts as StorefrontConfig, Misc, Local, AddDapp, Help } from '../../config'

import { themeStyles, themeStylesMobile } from '../../styles'

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

  const classes = isMobile ? themeStylesMobile() : themeStyles()
  let history = useHistory()
  let heading = false

  //console.log("store icon url", storeIconURL)

  return (
    <>
      {isLoading ?
        <Grid container className={classes.spinner}>
          <Spinner radius={40} color={"#ff671d"} stroke={5} visible={isLoading} />
        </Grid> : (
          <Grid container>
            {
                props.miniDappData.miniDapps.map( ( miniDapp: MiniData, i: number ) => {

                  const serverIndex = miniDapp.serverIndex
                  //console.log("indexes: ", index, serverIndex)
                  if ( index == serverIndex ) {

                    const storeURL = props.serverData.servers[index].url
                    let storeHeading

                    if( !heading ) {

                      const splitter = '//'
                      const indexOf = storeURL.indexOf(splitter)
                      const displayURL = storeURL.slice(indexOf+splitter.length)

                      const storeTitle = props.serverData.servers[index].title
                      const storeDescription = props.serverData.servers[index].description
                      const storeIcon = props.serverData.servers[index].icon
                      const storeIconURL = storeURL + storeIcon

                      storeHeading = (
                        <>
                          <Grid container>

                            <Grid item xs>
                              <Paper
                                className={classes.storeIconContainer}
                                elevation={0}
                              >
                                <img
                                  className={classes.storeIcon}
                                  src={storeIconURL}
                                />
                              </Paper>
                            </Grid>

                            <Grid className={classes.storeTitle} item xs={11}>
                              <Typography variant="h2">
                                {storeTitle}
                              </Typography>
                            </Grid>

                          </Grid>

                          <Grid item xs={12}>
                            <hr className={classes.hr}/>
                          </Grid>

                          <Grid className={classes.storeDescription} item xs={12}>
                            <Typography variant="body1">
                              {storeDescription}
                            </Typography>
                          </Grid>

                          <Grid item xs={12}>
                            <hr className={classes.hr}/>
                          </Grid>

                          <Grid container>

                            <Grid item xs={1}>
                              <Paper
                                className={classes.linkIconContainer}
                                elevation={0}
                              >
                                <img
                                  className={classes.linkIcon}
                                  src={linkIcon}
                                />
                              </Paper>
                            </Grid>

                            <Grid item xs={11}>
                              <Typography variant="body1">
                                {displayURL}
                              </Typography>
                            </Grid>
                          </Grid>

                          <Grid item xs={12}>
                            <hr className={classes.hr}/>
                          </Grid>
                        </>
                      )

                      heading = true
                    }

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

                        {storeHeading}

                        <Grid container>

                          <Grid item xs>
                            <Paper
                              className={classes.appIconContainer}
                              elevation={0}
                            >
                              <img
                                className={classes.appIcon}
                                src={iconURL}
                              />
                            </Paper>
                          </Grid>

                          <Grid className={classes.details} item container xs={11}>

                            <Grid item xs={11}>
                              <Typography variant="h3">
                                {name}
                              </Typography>
                              <Typography variant="body1">
                                {category}
                              </Typography>
                            </Grid>

                            <Grid item container justify="flex-end" xs>
                                <a href={miniDappURL}>
                                  <IconButton
                                    color="primary"
                                    aria-label={Help.downloadTip}
                                    component="span"
                                    size="small">
                                    <img data-for='download' data-tip src={downloadIcon}/>
                                  </IconButton>
                                  <ReactTooltip
                                    id='download'
                                    place="top"
                                    effect="solid"
                                  >
                                    {Help.downloadTip}
                                  </ReactTooltip>
                                </a>
                            </Grid>

                            <Grid item xs={12}>
                              <hr className={classes.hr}/>
                            </Grid>

                          </Grid>

                        </Grid>

                        <Grid container>

                          <Grid item xs>
                            &nbsp;
                          </Grid>

                          <Grid className={classes.details} item xs={11}>
                            <Typography variant="body1">
                             {headline}
                            </Typography>
                            <Typography variant="h3">
                             Version {version}
                            </Typography>
                          </Grid>

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
