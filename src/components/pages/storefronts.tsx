import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'

import { isMobile } from "react-device-detect"

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Spinner from 'react-spinner-material'

import { initMiniDapps, getMiniDapps } from '../../store/app/fileServer/actions'

//import Markdown from 'react-markdown'
import { SimpleArrayRenderer } from '../simpleRenderer'
import { Storefronts as StorefrontsConfig, Misc, Local } from '../../config'

import { themeStyles, themeStylesMobile } from '../../styles'

import {
  ApplicationState,
  AppDispatch,
  Servers,
  Server
} from '../../store'

// @ts-ignore
import { Minima } from '../../store/app/blockchain/minima'

interface StorefrontsStateProps {
  serverData: Servers
}

//type Props = StorefrontsStateProps & StorefrontsDispatchProps
type Props = StorefrontsStateProps

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
  }*/

  /*useEffect(() => {

    if ( props.serverData.servers.length
    && ( props.serverData.servers.length == props.serverData.numAvailable ) ) {

      console.log(props.serverData.servers)
    }

  }, [props.serverData])*/

  return (
    <>
      {isLoading ?
        <Grid container className={classes.spinner}>
          <Spinner radius={40} color={"#ff671d"} stroke={5} visible={isLoading} />
        </Grid> : (
          <Grid container>

            <Grid item xs={12}>
              <Typography variant="h2">
                {StorefrontsConfig.heading}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <hr className={classes.hr}/>
            </Grid>
            {
              props.serverData.servers.map( ( server: Server, i: number ) => {

                const iconURL = server.url + "/" + server.icon
                const title = server.title
                const description = server.description
                const isOnline = server.isOnline
                const pathShowStore = `${Local.showStoreDapps}/${i}`

                return (
                  <React.Fragment key={server.url}>

                    <Grid container>

                      <Grid item container justify="flex-start" xs>
                        <Paper
                          className={classes.appIconContainer}
                          elevation={0}
                        >
                          <input
                              type="image"
                              src={iconURL}
                              onClick={() => history.push(`${pathShowStore}`)}
                              alt="store icon"
                              aria-label="store icon"
                              role="button"
                              className={classes.appIcon}
                          />
                        </Paper>
                      </Grid>

                      <Grid className={classes.details} item xs={11}>
                        <Typography variant="h3">
                          {title}
                        </Typography>
                        <Typography variant="body1">
                          {description}
                        </Typography>
                      </Grid>

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

const mapStateToProps = (state: ApplicationState): StorefrontsStateProps => {

  const servers = state.fileServers.data as Servers
  return {
    serverData: servers
  }
}

export const Storefronts = connect<StorefrontsStateProps, {}, {}, ApplicationState>(
  mapStateToProps
)(get)
