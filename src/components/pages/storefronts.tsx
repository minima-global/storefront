import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'

import { isMobile } from "react-device-detect"

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Spinner from 'react-spinner-material'

import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

import ReactTooltip from 'react-tooltip'

import hrFirst from '../../images/hrFirst.svg'
import hrSecond from '../../images/hrSecond.svg'
import hrThird from '../../images/hrThird.svg'
import background from '../../images/square100x100.png'
import sortIcon from '../../images/menuIcon.svg'

import { initMiniDapps, getMiniDapps, sortServers } from '../../store/app/fileServer/actions'
import { setActivePage } from '../../store/app/appData/actions'

//import Markdown from 'react-markdown'
import {
  Storefronts as StorefrontsConfig,
  Misc,
  Local,
  Paths,
  Help,
  Sort
} from '../../config'

import { themeStyles, themeStylesMobile, SortMenu, SortMenuItem } from '../../styles'

import {
  ApplicationState,
  AppDispatch,
  Servers,
  Server,
  ServerSortTypes
} from '../../store'

// @ts-ignore
import { Minima } from '../../store/app/blockchain/minima'

interface StorefrontsStateProps {
  serverData: Servers
}

interface StorefrontsDispatchProps {
  setActivePage: () => void
  sortStores: (sortType: ServerSortTypes) => void
}

type Props = StorefrontsStateProps & StorefrontsDispatchProps

const mobile = ( props: Props ) => {

  const [isLoading, setLoading] = useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const classes = themeStylesMobile()
  let history = useHistory()

  useEffect(() => {

    if ( props.serverData.servers.length
    && ( props.serverData.servers.length == props.serverData.numAvailable ) ) {

      setTimeout(async () => {
        setLoading(false)
      }, Misc.spinnerDelay)
    }

  }, [props.serverData])

  const menuClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const menuClose = () => {
    setAnchorEl(null)
  }

  const doSort = (sortType: ServerSortTypes) => {
    props.sortStores(sortType)
    setAnchorEl(null)
  }

  return (
    <>
      {isLoading ?
        <Grid className={classes.spinner} item container justify="center">
          <Spinner radius={40} color={"#ff671d"} stroke={5} visible={isLoading} />
        </Grid> : (
          <Grid container>

            <Grid item xs={11}>
              <Typography variant="h2">
                {StorefrontsConfig.heading}
              </Typography>
            </Grid>

            <Grid item container justify="flex-end" xs={1}>
              <IconButton
                onClick={menuClick}
                color="primary"
                aria-label={Help.sortTip}
                component="span"
                size="small">
                <img
                  data-for='sort'
                  data-tip
                  src={sortIcon}
                  className={classes.sortIcon}
                />
              </IconButton>
              <ReactTooltip
                id='sort'
                place="top"
                effect="solid"
              >
                {Help.sortTip}
              </ReactTooltip>
              <SortMenu
                id="sortMenu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={menuClose}
              >
                <SortMenuItem disabled={true}>
                  {Sort.heading}
                </SortMenuItem>
                <SortMenuItem
                  onClick={
                    () => doSort(ServerSortTypes.ATOZ)}
                >
                  {Sort.atoZ}
                </SortMenuItem>
              </SortMenu>
            </Grid>

            <Grid item container xs={12} alignItems="flex-start">
              <img src={hrFirst} className={classes.hr}/>
            </Grid>
            {
              props.serverData.servers.map( ( server: Server, i: number ) => {

                const iconURL = server.url + "/" + server.icon
                const title = server.title
                const description = server.description
                const isOnline = server.isOnline
                const urlEncoded = encodeURIComponent(server.url)
                const pathShowStore = `${Local.showStoreDapps}/${urlEncoded}`

                return (
                  <React.Fragment key={server.url}>

                    <Grid container className={classes.details}>

                      <Grid item container justify="flex-start" xs={2}>
                        <div className={classes.storesIconParent}>
                          <img
                            className={classes.storesIconContainer}
                            src={background}
                          />
                          <input
                            type="image"
                            src={iconURL}
                            onClick={() => history.push(`${pathShowStore}`)}
                            alt="store icon"
                            aria-label="store icon"
                            role="button"
                            className={classes.storesIcon}
                          />
                        </div>
                      </Grid>

                      <Grid item xs={10}>
                        <div onClick={() => history.push(`${pathShowStore}`)}>
                          <Typography variant="h3">
                            {title}
                          </Typography>
                          <Typography variant="h5">
                            {description}
                          </Typography>
                        </div>
                      </Grid>

                    </Grid>

                    <Grid item container xs={12} alignItems="flex-start">
                      <img src={hrThird} className={classes.hr}/>
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

  const [isLoading, setLoading] = useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const classes = themeStyles()
  let history = useHistory()

  useEffect(() => {

    if ( props.serverData.servers.length
    && ( props.serverData.servers.length == props.serverData.numAvailable ) ) {

      setTimeout(async () => {
        setLoading(false)
      }, Misc.spinnerDelay)
    }

  }, [props.serverData])

  const menuClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const menuClose = () => {
    setAnchorEl(null)
  }

  const doSort = (sortType: ServerSortTypes) => {
    props.sortStores(sortType)
    setAnchorEl(null)
  }

  return (
    <>
      {isLoading ?
        <Grid className={classes.spinner} item container justify="center">
          <Spinner radius={40} color={"#ff671d"} stroke={5} visible={isLoading} />
        </Grid> : (
          <Grid container>

            <Grid item xs={11}>
              <Typography variant="h2">
                {StorefrontsConfig.heading}
              </Typography>
            </Grid>

            <Grid item container justify="flex-end" xs={1}>
              <IconButton
                onClick={menuClick}
                color="primary"
                aria-label={Help.sortTip}
                component="span"
                size="small">
                <img
                  data-for='sort'
                  data-tip
                  src={sortIcon}
                  className={classes.sortIcon}
                />
              </IconButton>
              <ReactTooltip
                id='sort'
                place="top"
                effect="solid"
              >
                {Help.sortTip}
              </ReactTooltip>
              <SortMenu
                id="sortMenu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={menuClose}
              >
                <SortMenuItem disabled={true}>
                  {Sort.heading}
                </SortMenuItem>
                <SortMenuItem
                  onClick={
                    () => doSort(ServerSortTypes.ATOZ)}
                >
                  {Sort.atoZ}
                </SortMenuItem>
              </SortMenu>
            </Grid>

            <Grid item container xs={12} alignItems="flex-start">
              <img src={hrFirst} className={classes.hr}/>
            </Grid>
            {
              props.serverData.servers.map( ( server: Server, i: number ) => {

                const iconURL = server.url + "/" + server.icon
                const title = server.title
                const description = server.description
                const isOnline = server.isOnline
                const urlEncoded = encodeURIComponent(server.url)
                const pathShowStore = `${Local.showStoreDapps}/${urlEncoded}`

                return (
                  <React.Fragment key={server.url}>

                    <Grid container className={classes.details}>

                      <Grid item container justify="flex-start" xs={1}>
                        <div className={classes.storesIconParent}>
                          <img
                            className={classes.storesIconContainer}
                            src={background}
                          />
                          <input
                            type="image"
                            src={iconURL}
                            onClick={() => history.push(`${pathShowStore}`)}
                            alt="store icon"
                            aria-label="store icon"
                            role="button"
                            className={classes.storesIcon}
                          />
                        </div>
                      </Grid>

                      <Grid item xs={11}>
                        <div onClick={() => history.push(`${pathShowStore}`)}>
                          <Typography variant="h3">
                            {title}
                          </Typography>
                          <Typography variant="h5">
                            {description}
                          </Typography>
                        </div>
                      </Grid>

                    </Grid>

                    <Grid item container xs={12} alignItems="flex-start">
                      <img src={hrThird} className={classes.hr}/>
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

  useEffect(() => {

    props.setActivePage()

  }, [])

  if (isMobile) {
    return mobile(props)
  } else {
    return desktop(props)
  }
}

const mapStateToProps = (state: ApplicationState): StorefrontsStateProps => {

  const servers = state.fileServers.data as Servers
  return {
    serverData: servers
  }
}


const mapDispatchToProps = (dispatch: AppDispatch): StorefrontsDispatchProps => {
 return {
   setActivePage: () => dispatch(setActivePage(Local.showStoreDapps)),
   sortStores: (sortType: ServerSortTypes) => dispatch(sortServers(sortType))
 }
}

export const Storefronts = connect<StorefrontsStateProps, StorefrontsDispatchProps, {}, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(get)
