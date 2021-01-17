import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'

import { isMobile } from "react-device-detect"

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
import background from '../../images/square100x100.png'
import sortIcon from '../../images/menuIcon.svg'
import deleteIcon from '../../images/crossIcon.svg'
import yesIcon from '../../images/tickIcon.svg'

import {
  initMiniDapps,
  getMiniDapps,
  sortServers,
  deleteServer
} from '../../store/app/fileServer/actions'

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

import {
  themeStyles,
  themeStylesMobile,
  SortMenu,
  SortMenuItem
} from '../../styles'

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
  deleteStore: (serverURL: string) => void
}

type Props = StorefrontsStateProps & StorefrontsDispatchProps

const mobile = ( props: Props ) => {

  const [isLoading, setLoading] = useState(true)
  const [isDelete, setDelete] = useState(false)
  const [deleteTitle, setDeleteTitle] = useState("")
  const [deleteURL, setDeleteURL] = useState("")
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const classes = themeStylesMobile()
  let history = useHistory()

  useEffect(() => {

    if ( props.serverData.servers.length
    && ( props.serverData.servers.length == props.serverData.numAvailable ) ) {

      setLoading(false)
    } else {
      setLoading(true)
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

  const deleteOpen = (title: string, url: string) => {
    setDeleteTitle(title)
    setDeleteURL(url)
    setDelete(true)
  }

  const deleteClose = () => {
    setDelete(false)
  }

  const doDelete = (serverURL: string) => {
    setDelete(false)
    props.deleteStore(serverURL)
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
              <img src={hrFirstMobile} className={classes.hr}/>
            </Grid>
            {
              props.serverData.servers.map( ( server: Server, i: number ) => {

                const iconURL = server.icon
                const title = server.title
                const description = server.description
                const isOnline = server.isOnline
                const urlEncoded = encodeURIComponent(server.url)
                const pathShowStore = `${Local.showStoreDapps}/${urlEncoded}`

                return (
                  <React.Fragment key={server.url}>

                    <Grid container className={classes.details}>

                      <Grid item container justify="flex-start" xs={2}>
                        <input
                          type="image"
                          src={iconURL}
                          onClick={() => history.push(`${pathShowStore}`)}
                          alt="store icon"
                          aria-label="store icon"
                          role="button"
                          className={classes.storesIcon}
                        />
                      </Grid>

                      <Grid item xs={9}>
                        <div onClick={() => history.push(`${pathShowStore}`)}>
                          <Typography variant="h3">
                            {title}
                          </Typography>
                          <Typography variant="h5">
                            {description}
                          </Typography>
                        </div>
                      </Grid>

                      <Grid item container alignItems="flex-start" justify="flex-end" xs={1}>
                        <IconButton
                          onClick={() => deleteOpen(title, server.url)}
                          color="primary"
                          aria-label={Help.deleteTip}
                          component="span"
                          size="small">
                          <img
                            data-for='delete'
                            data-tip
                            src={deleteIcon}
                            className={classes.deleteIcon}
                          />
                        </IconButton>
                        <ReactTooltip
                          id='delete'
                          place="top"
                          effect="solid"
                        >
                          {Help.deleteTip}
                        </ReactTooltip>
                      </Grid>

                    </Grid>

                    <Grid item container xs={12} alignItems="flex-start">
                      <img src={hrThirdMobile} className={classes.hr}/>
                    </Grid>

                  </React.Fragment>
                )
              })
            }

            <Modal
              aria-labelledby={Help.deleteSure}
              aria-describedby={Help.deleteSure}
              className={classes.deleteModal}
              open={isDelete}
              onClose={deleteClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={isDelete}>
                <div className={classes.deleteModalSub}>
                  <Typography variant="h3">
                    {Help.deleteSure} {deleteTitle}?
                  </Typography>
                  <br/>
                  <div className={classes.deleteModalSubIcons}>
                    <IconButton
                      onClick={deleteClose}
                      color="primary"
                      aria-label={Help.deleteTip}
                      component="span"
                      size="small">
                      <img
                        data-for='delete'
                        data-tip
                        src={deleteIcon}
                        className={classes.deleteIcon}
                      />
                    </IconButton>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <IconButton
                      onClick={() => doDelete(deleteURL)}
                      color="primary"
                      aria-label={Help.deleteTip}
                      component="span"
                      size="small">
                      <img
                        data-for='delete'
                        data-tip
                        src={yesIcon}
                        className={classes.tickIcon}
                      />
                    </IconButton>
                  </div>
                </div>
              </Fade>
            </Modal>

          </Grid>
        )
      }
    </>
  )
}

const desktop = ( props: Props ) => {

  const [isLoading, setLoading] = useState(true)
  const [isDelete, setDelete] = useState(false)
  const [deleteTitle, setDeleteTitle] = useState("")
  const [deleteURL, setDeleteURL] = useState("")
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const classes = themeStyles()
  let history = useHistory()

  useEffect(() => {

    if ( props.serverData.servers.length
    && ( props.serverData.servers.length == props.serverData.numAvailable ) ) {

      setLoading(false)
    } else {
      setLoading(true)
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

  const deleteOpen = (title: string, url: string) => {
    setDeleteTitle(title)
    setDeleteURL(url)
    setDelete(true)
  }

  const deleteClose = () => {
    setDelete(false)
  }

  const doDelete = (serverURL: string) => {
    setDelete(false)
    props.deleteStore(serverURL)
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

                const iconURL = server.icon
                const title = server.title
                const description = server.description
                const isOnline = server.isOnline
                const urlEncoded = encodeURIComponent(server.url)
                const pathShowStore = `${Local.showStoreDapps}/${urlEncoded}`

                return (
                  <React.Fragment key={server.url}>

                    <Grid container className={classes.details}>

                      <Grid item container justify="flex-start" xs={1}>
                        <input
                          type="image"
                          src={iconURL}
                          onClick={() => history.push(`${pathShowStore}`)}
                          alt="store icon"
                          aria-label="store icon"
                          role="button"
                          className={classes.storesIcon}
                        />
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

                      <Grid item container alignItems="flex-start" justify="flex-end" xs={1}>
                        <IconButton
                          onClick={() => deleteOpen(title, server.url)}
                          color="primary"
                          aria-label={Help.deleteTip}
                          component="span"
                          size="small">
                          <img
                            data-for='delete'
                            data-tip
                            src={deleteIcon}
                            className={classes.deleteIcon}
                          />
                        </IconButton>
                        <ReactTooltip
                          id='delete'
                          place="top"
                          effect="solid"
                        >
                          {Help.deleteTip}
                        </ReactTooltip>
                      </Grid>

                    </Grid>

                    <Grid item container xs={12} alignItems="flex-start">
                      <img src={hrThird} className={classes.hr}/>
                    </Grid>

                  </React.Fragment>
                )
              })
            }

            <Modal
              aria-labelledby={Help.deleteSure}
              aria-describedby={Help.deleteSure}
              className={classes.deleteModal}
              open={isDelete}
              onClose={deleteClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={isDelete}>
                <div className={classes.deleteModalSub}>
                  <Typography variant="h3">
                    {Help.deleteSure} {deleteTitle}?
                  </Typography>

                  <br/>
                  <div className={classes.deleteModalSubIcons}>
                    <IconButton
                      onClick={deleteClose}
                      color="primary"
                      aria-label={Help.deleteTip}
                      component="span"
                      size="small">
                      <img
                        data-for='delete'
                        data-tip
                        src={deleteIcon}
                        className={classes.deleteIcon}
                      />
                    </IconButton>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <IconButton
                      onClick={() => doDelete(deleteURL)}
                      color="primary"
                      aria-label={Help.deleteTip}
                      component="span"
                      size="small">
                      <img
                        data-for='delete'
                        data-tip
                        src={yesIcon}
                        className={classes.tickIcon}
                      />
                    </IconButton>
                  </div>
                </div>
              </Fade>
            </Modal>

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
   sortStores: (sortType: ServerSortTypes) => dispatch(sortServers(sortType)),
   deleteStore: (serverURL: string) => dispatch(deleteServer(serverURL))
 }
}

export const Storefronts = connect<StorefrontsStateProps, StorefrontsDispatchProps, {}, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(get)
