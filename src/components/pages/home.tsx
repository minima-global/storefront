import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { isMobile } from "react-device-detect"

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Spinner from 'react-spinner-material'

import IconButton from '@material-ui/core/IconButton'

import ReactTooltip from 'react-tooltip'

import downloadDesktop from '../../images/downloadLarge.png'
import downloadMobile from '../../images/download.png'

import { serverInfo } from '../../store/app/fileServer/actions'

//import Markdown from 'react-markdown'
//import { SimpleArrayRenderer } from '../simpleRenderer'
import { Home as HomeConfig, Misc, Local, AddDapp, Help } from '../../config'

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

interface HomeStateProps {
  serverData: Servers
  miniDappData: MiniDapps
}

/*interface HomeDispatchProps {
  initMiniDapps: () => void
  getMiniDapps: () => void
}*/

//type Props = HomeStateProps & HomeDispatchProps
type Props = HomeStateProps

const mobile = ( props: Props ) => {

  const [isLoading, setLoading] = useState(false)

  const classes = themeStylesMobile()

  return (
    <>
      {isLoading ?
        <Grid container>
          <Grid className={classes.spinner}>
            <Spinner radius={40} color={"#ff671d"} stroke={5} visible={isLoading} />
          </Grid>
        </Grid> : (
          <Grid container>

            <Grid item xs={12}>
              <Typography variant="h2">
                {HomeConfig.heading}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <hr className={classes.hrFirst}/>
            </Grid>
            {
              props.miniDappData.miniDapps.map( ( miniDapp: MiniData ) => {

                const dappHome = miniDapp.serverURL
                const server = serverInfo(dappHome, props.serverData)
                const serverTitle = server.title
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
                  <React.Fragment key={miniDappURL}>

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
                            <img data-for='download' data-tip src={downloadMobile}/>
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
                        <Typography variant="h3">
                          Version {version}
                        </Typography>
                        <Typography variant="h4">
                          {serverTitle}
                         </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <hr className={classes.hrFirst}/>
                      </Grid>

                  </React.Fragment>
                )
              })
            }
          </Grid>
        )
      }
    </>
  )
}

const desktop = ( props: Props ) => {

  const [isLoading, setLoading] = useState(false)

  const classes = themeStyles()

  return (
    <>
      {isLoading ?
        <Grid container>
          <Grid container className={classes.spinner}>
            <Spinner radius={40} color={"#ff671d"} stroke={5} visible={isLoading} />
          </Grid>
        </Grid> : (
          <Grid container>

            <Grid item xs={12}>
              <Typography variant="h2">
                {HomeConfig.heading}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <hr className={classes.hrFirst}/>
            </Grid>
            {
              props.miniDappData.miniDapps.map( ( miniDapp: MiniData ) => {

                const dappHome = miniDapp.serverURL
                const server = serverInfo(dappHome, props.serverData)
                const serverTitle = server.title
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
                  <React.Fragment key={miniDappURL}>

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
                            <img data-for='download' data-tip src={downloadDesktop}/>
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
                        <Typography variant="h3">
                          Version {version}
                        </Typography>
                        <Typography variant="h4">
                          {serverTitle}
                         </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <hr className={classes.hrFirst}/>
                      </Grid>

                  </React.Fragment>
                )
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

const mapStateToProps = (state: ApplicationState): HomeStateProps => {

  const servers = state.fileServers.data as Servers
  const miniDapps = state.miniDapps.data as MiniDapps
  return {
    serverData: servers,
    miniDappData: miniDapps
  }
}

export const Home = connect<HomeStateProps, {}, {}, ApplicationState>(
  mapStateToProps
)(get)
