import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import { isMobile } from "react-device-detect"

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Spinner from 'react-spinner-material'

import IconButton from '@material-ui/core/IconButton'

import ReactTooltip from 'react-tooltip'

import downloadIcon from '../../images/download.svg'
/*import linkDesktop from '../../images/linkLarge.png'
import linkMobile from '../../images/link.png'*/
import background from '../../images/square100x100.png'

import { initMiniDapps, getMiniDapps, serverInfo } from '../../store/app/fileServer/actions'

//import Markdown from 'react-markdown'
//import { SimpleArrayRenderer } from '../simpleRenderer'
import { Storefronts as StorefrontConfig, Misc, Local, AddDapp, Help, Paths } from '../../config'

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

const mobile = ( props: Props ) => {

  let [isLoading, setLoading] = useState(true)

  const { url } = useParams<{ url: string }>()
  const serverUrl = decodeURIComponent(url)

  const classes = isMobile ? themeStylesMobile() : themeStyles()
  const history = useHistory()
  let setHeading = true

  //console.log("store icon url", storeIconURL)
  useEffect(() => {

    if ( props.serverData.servers.length
    && ( props.serverData.servers.length == props.serverData.numAvailable ) ) {

      setTimeout(async () => {
        setLoading(false)
      }, Misc.spinnerDelay)
    }

  }, [props.serverData])

  return (
    <>
      {isLoading ?
        <Grid className={classes.spinner} item container justify="center">
          <Spinner radius={40} color={"#ff671d"} stroke={10} visible={isLoading} />
        </Grid> : (
          <Grid container>
            {
                props.miniDappData.miniDapps.map( ( miniDapp: MiniData, i: number ) => {

                  if ( serverUrl == miniDapp.serverURL ) {

                    let storeHeading

                    if( setHeading ) {

                      const server = serverInfo(serverUrl, props.serverData)
                      const storeTitle = server.title
                      const storeDescription = server.description
                      const storeIcon = server.icon
                      const storeIconURL = serverUrl + storeIcon

                      storeHeading = (
                        <>

                          <Grid item xs={2}>
                            <div className={classes.storeIconParent}>
                              <img
                                className={classes.storeIconContainer}
                                src={background}
                              />
                              <img
                                className={classes.storeIcon}
                                src={storeIconURL}
                              />
                            </div>
                          </Grid>

                          <Grid className={classes.storeTitle} item xs={9}>
                            <Typography variant="h2">
                              {storeTitle}
                            </Typography>
                          </Grid>

                          <Grid item xs={12}>
                            <hr className={classes.hrFirst}/>
                          </Grid>

                          <Grid className={classes.storeDescription} item xs={12}>
                            <Typography variant="h5">
                              {storeDescription}
                            </Typography>
                          </Grid>

                          <Grid item xs={12}>
                            <hr className={classes.hrSecond}/>
                          </Grid>
                        </>
                      )

                      setHeading = false
                    }

                    //console.log("made it here")
                    const dir = miniDapp.dir
                    const icon = miniDapp.icon
                    const iconURL = serverUrl + dir + "/" + icon
                    const name = miniDapp.conf.name
                    const headline = miniDapp.conf.headline
                    const version = miniDapp.conf.version
                    const description = miniDapp.conf.description
                    const category = miniDapp.conf.category
                    const miniDappURL = serverUrl + dir + "/" + miniDapp.miniDapp
                    //const pathAddDapp = `${Local.addDapp}/${i}`

                    return (
                      <React.Fragment key={miniDappURL}>

                        {storeHeading}

                        <Grid item xs={3}>
                          <img
                            className={classes.appIcon}
                            src={iconURL}
                          />
                        </Grid>

                        <Grid item xs={8}>
                          <Typography variant="h3">
                            {name}
                          </Typography>
                          <Typography variant="h5">
                            {category}
                          </Typography>
                        </Grid>

                        <Grid item container justify="flex-end" xs={1}>
                            <a href={miniDappURL}>
                              <IconButton
                                color="primary"
                                aria-label={Help.downloadTip}
                                component="span"
                                size="small">
                                <img
                                  data-for='download'
                                  data-tip
                                  src={downloadIcon}
                                  className={classes.downloadIcon}
                                />
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

                        <Grid item xs={3}>
                          &nbsp;
                        </Grid>

                        <Grid item xs={9}>
                          <hr className={classes.hrSecond}/>
                        </Grid>

                        <Grid item xs={3}>
                          &nbsp;
                        </Grid>

                        <Grid item xs={9}>
                          <Typography variant="h5">
                           {headline}
                          </Typography>
                          <Typography variant="h6">
                           Version {version}
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <hr className={classes.hrThird}/>
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

const desktop = ( props: Props ) => {

  let [isLoading, setLoading] = useState(true)

  const { url } = useParams<{ url: string }>()
  const serverUrl = decodeURIComponent(url)

  const classes = isMobile ? themeStylesMobile() : themeStyles()
  const history = useHistory()
  let setHeading = true

  //console.log("store icon url", storeIconURL)
  useEffect(() => {

    if ( props.serverData.servers.length
    && ( props.serverData.servers.length == props.serverData.numAvailable ) ) {

      setTimeout(async () => {
        setLoading(false)
      }, Misc.spinnerDelay)

    }

  }, [props.serverData])

  return (
    <>
      {isLoading ?
        <Grid className={classes.spinner} item container justify="center">
          <Spinner radius={40} color={"#ff671d"} stroke={10} visible={isLoading} />
        </Grid> : (
          <Grid container>
            {
                props.miniDappData.miniDapps.map( ( miniDapp: MiniData, i: number ) => {

                  if ( serverUrl == miniDapp.serverURL ) {

                    let storeHeading

                    if( setHeading ) {

                      const server = serverInfo(serverUrl, props.serverData)
                      const storeTitle = server.title
                      const storeDescription = server.description
                      const storeIcon = server.icon
                      const storeIconURL = serverUrl + storeIcon

                      storeHeading = (
                        <>
                          <Grid item xs={2}>
                            <div className={classes.storeIconParent}>
                              <img
                                className={classes.storeIconContainer}
                                src={background}
                              />
                              <img
                                className={classes.storeIcon}
                                src={storeIconURL}
                              />
                            </div>
                          </Grid>

                          <Grid className={classes.storeTitle} item xs={9}>
                            <Typography variant="h2">
                              {storeTitle}
                            </Typography>
                          </Grid>

                          <Grid item xs={12}>
                            <hr className={classes.hrFirst}/>
                          </Grid>

                          <Grid className={classes.storeDescription} item xs={12}>
                            <Typography variant="h5">
                              {storeDescription}
                            </Typography>
                          </Grid>

                          <Grid item xs={12}>
                            <hr className={classes.hrSecond}/>
                          </Grid>
                        </>
                      )

                      setHeading = false
                    }

                    //console.log("made it here")
                    const dir = miniDapp.dir
                    const icon = miniDapp.icon
                    const iconURL = serverUrl + dir + "/" + icon
                    const name = miniDapp.conf.name
                    const headline = miniDapp.conf.headline
                    const version = miniDapp.conf.version
                    const description = miniDapp.conf.description
                    const category = miniDapp.conf.category
                    const miniDappURL = serverUrl + dir + "/" + miniDapp.miniDapp
                    //const pathAddDapp = `${Local.addDapp}/${i}`

                    return (
                      <React.Fragment key={miniDappURL}>

                        {storeHeading}

                        <Grid item xs={2}>
                          <img
                            className={classes.appIcon}
                            src={iconURL}
                          />
                        </Grid>

                        <Grid item xs={9}>
                          <Typography variant="h3">
                            {name}
                          </Typography>
                          <Typography variant="h5">
                            {category}
                          </Typography>
                        </Grid>

                        <Grid item container justify="flex-end" xs={1}>
                            <a href={miniDappURL}>
                              <IconButton
                                color="primary"
                                aria-label={Help.downloadTip}
                                component="span"
                                size="small">
                                <img
                                  data-for='download'
                                  data-tip
                                  src={downloadIcon}
                                  className={classes.downloadIcon}
                                />
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

                        <Grid item xs={2}>
                          &nbsp;
                        </Grid>

                        <Grid item xs={10}>
                          <hr className={classes.hrSecond}/>
                        </Grid>

                        <Grid item xs={2}>
                          &nbsp;
                        </Grid>

                        <Grid item xs={10}>
                          <Typography variant="h5">
                           {headline}
                          </Typography>
                          <Typography variant="h6">
                           Version {version}
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <hr className={classes.hrThird}/>
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

const get = ( props: Props ) => {

  if (isMobile) {
    return mobile(props)
  } else {
    return desktop(props)
  }
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
