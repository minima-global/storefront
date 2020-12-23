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
import { Storefronts as StorefrontsConfig, Misc, Local, Paths } from '../../config'

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
                const urlEncoded = encodeURIComponent(server.url)
                console.log("url: ", urlEncoded)
                const pathShowStore = `${Local.showStoreDapps}/${urlEncoded}`

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
