import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Spinner from 'react-spinner-material'

//import Markdown from 'react-markdown'
import { SimpleArrayRenderer } from '../simpleRenderer'
import { Home as HomeConfig, Misc, Local } from '../../config'

import { themeStyles } from '../../styles'

import {
  ApplicationState,
  AppDispatch,
  Servers,
  MiniDappProps,
  MiniData
} from '../../store'

// @ts-ignore
import { Minima } from '../../store/app/blockchain/minima'

interface HomeStateProps {
  serverData: Servers
  miniDappData: MiniDappProps
}

/*interface HomeDispatchProps {
  getDapps: () => void
}*/

//type Props = HomeStateProps & HomeDispatchProps
type Props = HomeStateProps

const get = (props: Props) => {

  const classes = themeStyles()
  const [isLoading, setLoading] = useState(false)
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

    console.log("server stuff: ", props.miniDappData, props.serverData)
    setLoading(true)
    setTimeout(function(){ setLoading(false) }, Misc.homeSpinnerDelay)
    /*if ( props.miniDappData.data.length ) {

      const info = props.miniDappData.data.map( ( miniDapp: MiniData, i: number ) => (<div key={i}>{miniDapp.icon}</div>))
      setInfo(Array.of(info))
    }*/

    /*setLoading(true)
    //console.log("miniDapps: ", props.miniDapps.data)
    if ( props.serverData.servers.length ) {

      setDappInfo()

    } else {

      setLoading(false)
    }*/

  }, [props.miniDappData, props.serverData])

  return (
    <>
      <h2>{HomeConfig.heading}</h2>
      <hr />
      <p>
          {isLoading ?
            <div className={classes.spinner}>
              <Spinner radius={40} color={"#ff671d"} stroke={5} visible={isLoading} />
            </div> : (
              <Paper className={classes.home} square={true}>
                <Grid container>
                  {
                    props.miniDappData.data.map( ( miniDapp: MiniData, i: number ) => {

                      const serverIndex = miniDapp.serverIndex
                      const dappHome = props.serverData.servers[serverIndex].url
                      const dir = miniDapp.dir
                      const icon = miniDapp.icon
                      const iconURL = dappHome + dir + "/" + icon
                      const name = miniDapp.conf.name
                      const description = miniDapp.conf.description
                      const category = miniDapp.conf.category
                      const pathAddDapp = `${Local.addDapp}/${i}`

                      return (
                        <>
                          <Grid item justify="center" alignItems="center" xs={12}  sm={4}>
                            <Paper className={classes.appIconContainer}>
                              <button onClick={() => history.push(`${pathAddDapp}`)}>
                                <img
                                  className={classes.appIcon}
                                  src={iconURL}
                                />
                              </button>
                            </Paper>
                          </Grid>
                          <Grid item justify="center" alignItems="center" xs={12} sm={8}>
                           <b>{name}</b><br/>
                           <i>{category}</i>
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

const mapStateToProps = (state: ApplicationState): HomeStateProps => {

  const servers = state.fileServers.data as Servers
  const miniDapps = state.miniDapps as MiniDappProps
  return {
    serverData: servers,
    miniDappData: miniDapps
  }
}

export const Home = connect<HomeStateProps, {}, {}, ApplicationState>(
  mapStateToProps
)(get)
