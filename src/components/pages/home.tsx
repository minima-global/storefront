import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'

import { isMobile } from "react-device-detect"

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

import Spinner from 'react-spinner-material'

import IconButton from '@material-ui/core/IconButton'

import ReactTooltip from 'react-tooltip'

import downloadIcon from '../../images/downloadLarge.png'

//import { initMiniDapps, getMiniDapps } from '../../store/app/fileServer/actions'

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

const get = ( props: Props ) => {

  const [isLoading, setLoading] = useState(false)

  const classes = isMobile ? themeStylesMobile() : themeStyles()
  let history = useHistory()

  /*const compare = (a: MiniData, b: MiniData) => {

    const thisA = a.server.url
    const thisB = b.server.url
    if (thisA < thisB) {
      return -1;
    }
    if (thisA > thisB) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  const unique = (elements: MiniData[]): MiniData[] => {

    const uniqElements = elements.reduce((element: MiniData[], current: MiniData) => {

      const x = element.find( (item: MiniData) => {
        return ( item.dir === current.dir &&  item.conf.name === current.conf.name )
      })

      if (!x) {
        return element.concat([current])
      } else {
        return element
      }
    }, [])

    return uniqElements
  }

  useEffect(() => {

    if ( props.serverData.servers.length
    && ( props.serverData.servers.length == props.serverData.numAvailable ) ) {

      props.initMiniDapps()
      setLoading(true)
      setTimeout(function(){ setLoading(false) }, Misc.homeSpinnerDelay)
      props.getMiniDapps()
    }

  }, [props.serverData])*/

  return (
    <>
      {isLoading ?
        <Grid className={classes.spinner}>
          <Spinner radius={40} color={"#ff671d"} stroke={5} visible={isLoading} />
        </Grid> : (
          <Grid container justify="flex-start">

            <Grid item xs={12}>
              <h2>{HomeConfig.heading}</h2>
            </Grid>

            <Grid item xs={12}>
              <hr className={classes.hr}/>
            </Grid>
            {
              props.miniDappData.miniDapps.map( ( miniDapp: MiniData, i: number ) => {

                const serverIndex = miniDapp.serverIndex
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
                  <React.Fragment key={miniDappURL}>

                    <Grid item xs={1}>
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

                    <Grid className={classes.details} item container justify="flex-end" xs={11}>

                      <Grid item xs={11}>
                        <Box m={0}>
                           <b>{name}</b><br/>
                           {category}
                        </Box>
                      </Grid>

                      <Grid item container justify="flex-end" xs={1}>
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

                    <Grid item xs={1}>
                      <Box m={0}>&nbsp;</Box>
                    </Grid>

                    <Grid className={classes.details} item xs={11}>
                      <Box m={0}>
                         {headline}<br/>
                         <b>Version {version}</b><br/>
                         <b>{props.serverData.servers[serverIndex].title}</b>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <hr/>
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

const mapStateToProps = (state: ApplicationState): HomeStateProps => {

  const servers = state.fileServers.data as Servers
  const miniDapps = state.miniDapps.data as MiniDapps
  return {
    serverData: servers,
    miniDappData: miniDapps
  }
}

/*
const mapDispatchToProps = (dispatch: AppDispatch): HomeDispatchProps => {
 return {
   initMiniDapps: () => dispatch(initMiniDapps()),
   getMiniDapps: () => dispatch(getMiniDapps())
 }
}*/

export const Home = connect<HomeStateProps, {}, {}, ApplicationState>(
  mapStateToProps
)(get)
