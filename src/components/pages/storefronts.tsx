import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Spinner from 'react-spinner-material'

import { initMiniDapps, getMiniDapps } from '../../store/app/fileServer/actions'

//import Markdown from 'react-markdown'
import { SimpleArrayRenderer } from '../simpleRenderer'
import { Storefronts as StorefrontsConfig, Misc, Local } from '../../config'

import { themeStyles } from '../../styles'

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
  }*/

  useEffect(() => {

    if ( props.serverData.servers.length
    && ( props.serverData.servers.length == props.serverData.numAvailable ) ) {

      console.log(props.serverData.servers)
    }

  }, [props.serverData])

  return (
    <>
      <h2>{StorefrontsConfig.heading}</h2>
      <hr />
      <p>
          {isLoading ?
            <div className={classes.spinner}>
              <Spinner radius={40} color={"#ff671d"} stroke={5} visible={isLoading} />
            </div> : (
              <Paper className={classes.home} square={true}>
                <Grid container>
                  {
                    props.serverData.servers.map( ( server: Server, i: number ) => {

                      const dappStorefront = server.url
                      const icon = server.icon
                      const iconURL = dappStorefront + "/" + icon
                      const title = server.title
                      //const description = server.description
                      const isOnline = server.isOnline
                      const pathShowStore = `${Local.showStoreDapps}/${i}`

                      return (
                        <>
                          <Grid item justify="center" alignItems="center" xs={12}  sm={4}>
                            <Paper className={classes.appIconContainer}>
                              <button onClick={() => history.push(`${pathShowStore}`)}>
                                <img
                                  className={classes.appIcon}
                                  src={iconURL}
                                />
                              </button>
                            </Paper>
                          </Grid>
                          <Grid item justify="center" alignItems="center" xs={12} sm={8}>
                           <b>{title}</b>
                          </Grid>
                        </>
                      )
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

const mapStateToProps = (state: ApplicationState): StorefrontsStateProps => {

  const servers = state.fileServers.data as Servers
  return {
    serverData: servers
  }
}

export const Storefronts = connect<StorefrontsStateProps, {}, {}, ApplicationState>(
  mapStateToProps
)(get)
