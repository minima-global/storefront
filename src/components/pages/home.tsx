import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Spinner from 'react-spinner-material'

import IconButton from '@material-ui/core/IconButton'

import Tooltip from '@material-ui/core/Tooltip'

import downloadIcon from '../../images/downloadLarge.png'

//import { initMiniDapps, getMiniDapps } from '../../store/app/fileServer/actions'

//import Markdown from 'react-markdown'
//import { SimpleArrayRenderer } from '../simpleRenderer'
import { Home as HomeConfig, Misc, Local, AddDapp, Help } from '../../config'

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

  const classes = themeStyles()
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
    <Grid container alignItems="flex-start">
      {isLoading ?
        <Grid container className={classes.spinner}>
          <Spinner radius={40} color={"#ff671d"} stroke={5} visible={isLoading} />
        </Grid> : (
          <Grid container alignItems="flex-start">
            <Grid item xs={12}>
              <h2>{HomeConfig.heading}</h2>
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
                    <Grid item container justify="flex-start" xs={12} sm={2}>
                      <Paper className={classes.appIconContainer}>
                          <img
                            className={classes.appIcon}
                            src={iconURL}
                          />
                      </Paper>
                    </Grid>
                    <Grid item container justify="flex-start" xs={12} sm={9}>
                      <div className={classes.details}>
                         <b>{name}</b><br/>
                         {category}
                      </div>
                    </Grid>
                    <Grid item container justify="flex-end" xs={12} sm={1}>
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
                    <Grid item xs={12}  sm={10}>
                      <hr className={classes.hr}/>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      &nbsp;
                    </Grid>
                    <Grid item container justify="flex-start" xs={12}  sm={10}>
                      <div className={classes.details}>
                         <p>{headline}<br/>
                         <b>Version {version}</b><br/>
                         <b>{props.serverData.servers[serverIndex].title}</b></p>
                      </div>
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
    </Grid>
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
