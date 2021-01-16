import React, { useState, useEffect } from 'react'
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
import hrFirstMobile from '../../images/hrFirstMobile.svg'
import hrSecondMobile from '../../images/hrSecondMobile.svg'
import hrThirdMobile from '../../images/hrThirdMobile.svg'
import downloadIcon from '../../images/download.svg'
import sortIcon from '../../images/menuIcon.svg'

import { serverInfo, sortDapps } from '../../store/app/fileServer/actions'
import { setActivePage } from '../../store/app/appData/actions'

//import Markdown from 'react-markdown'
//import { SimpleArrayRenderer } from '../simpleRenderer'
import {
  AllDapps as AllDappsConfig,
  Misc,
  Local,
  AddDapp,
  Help,
  Sort } from '../../config'

import {
  themeStyles,
  themeStylesMobile,
  SortMenu,
  SortMenuItem } from '../../styles'

import {
  ApplicationState,
  AppDispatch,
  Servers,
  MiniDapps,
  MiniData,
  MiniDappSortTypes
} from '../../store'

// @ts-ignore
import { Minima } from '../../store/app/blockchain/minima'

interface AllDappsStateProps {
  serverData: Servers
  miniDappData: MiniDapps
}

interface AllDappsDispatchProps {
  setActivePage: () => void
  sortDapps: (sortType: MiniDappSortTypes) => void
}

type Props = AllDappsStateProps & AllDappsDispatchProps

const mobile = ( props: Props ) => {

  const [isLoading, setLoading] = useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const classes = themeStylesMobile()

  useEffect(() => {

    let spinnerTimeout: any

    if ( props.serverData.servers.length
    && ( props.serverData.servers.length == props.serverData.numAvailable ) ) {

      spinnerTimeout = setTimeout( () => {
        setLoading(false)
      }, Misc.spinnerDelay)
    }

    return () => {
      clearTimeout(spinnerTimeout)
    }

  }, [props.serverData])

  const menuClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const menuClose = () => {
    setAnchorEl(null)
  }

  const doSort = (sortType: MiniDappSortTypes) => {
    props.sortDapps(sortType)
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
                {AllDappsConfig.heading}
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
                    () => doSort(MiniDappSortTypes.ATOZ)}
                >
                  {Sort.atoZ}
                </SortMenuItem>
                <SortMenuItem
                  onClick={
                    () => doSort(MiniDappSortTypes.CATEGORY)}
                >
                  {Sort.category}
                </SortMenuItem>
                <SortMenuItem
                  onClick={
                    () => doSort(MiniDappSortTypes.STOREFRONT)}
                >
                  {Sort.storefront}
                </SortMenuItem>
              </SortMenu>
            </Grid>

            <Grid item container xs={12} alignItems="flex-start">
              <img src={hrFirstMobile} className={classes.hr}/>
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

                    <Grid container className={classes.details}>

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

                      <Grid item container xs={10} alignItems="center">
                        <img src={hrSecondMobile} className={classes.hr}/>
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
                        <Typography variant="h4">
                          {serverTitle}
                         </Typography>
                      </Grid>

                    </Grid>

                    <Grid item container xs={12} alignItems="center">
                      <img src={hrThirdMobile} className={classes.hr}/>
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

  useEffect(() => {

    let spinnerTimeout: any

    if ( props.serverData.servers.length
    && ( props.serverData.servers.length == props.serverData.numAvailable ) ) {

      spinnerTimeout = setTimeout( () => {
        setLoading(false)
      }, Misc.spinnerDelay)
    }

    return () => {
      clearTimeout(spinnerTimeout)
    }

  }, [props.serverData])

  const menuClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const menuClose = () => {
    setAnchorEl(null)
  }

  const doSort = (sortType: MiniDappSortTypes) => {
    props.sortDapps(sortType)
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
                {AllDappsConfig.heading}
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
                    () => doSort(MiniDappSortTypes.ATOZ)}
                >
                  {Sort.atoZ}
                </SortMenuItem>
                <SortMenuItem
                  onClick={
                    () => doSort(MiniDappSortTypes.CATEGORY)}
                >
                  {Sort.category}
                </SortMenuItem>
                <SortMenuItem
                  onClick={
                    () => doSort(MiniDappSortTypes.STOREFRONT)}
                >
                  {Sort.storefront}
                </SortMenuItem>
              </SortMenu>
            </Grid>

            <Grid item container xs={12} alignItems="flex-start">
              <img src={hrFirst} className={classes.hr}/>
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

                    <Grid container className={classes.details}>

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

                      <Grid item container xs={10} alignItems="center">
                        <img src={hrSecond} className={classes.hr}/>
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
                        <Typography variant="h4">
                          {serverTitle}
                         </Typography>
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

const mapStateToProps = (state: ApplicationState): AllDappsStateProps => {

  const servers = state.fileServers.data as Servers
  const miniDapps = state.miniDapps.data as MiniDapps
  return {
    serverData: servers,
    miniDappData: miniDapps
  }
}

const mapDispatchToProps = (dispatch: AppDispatch): AllDappsDispatchProps => {
 return {
   setActivePage: () => dispatch(setActivePage(Local.allDapps)),
   sortDapps: (sortType: MiniDappSortTypes) => dispatch(sortDapps(sortType))
 }
}

export const AllDapps = connect<AllDappsStateProps, AllDappsDispatchProps, {}, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(get)
