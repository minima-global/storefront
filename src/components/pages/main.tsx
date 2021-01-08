import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom"

import GoogleFontLoader from 'react-google-font-loader'

import { isMobile } from "react-device-detect"

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'

import { Content } from '../content'
import { AppInit } from '../appInit'
import { App } from '../../config/strings'

import { ApplicationState, AppDispatch } from '../../store'

import IconButton from '@material-ui/core/IconButton'

import ReactTooltip from 'react-tooltip'

import { initServers, initMiniDapps, setServers } from '../../store/app/fileServer/actions'

import helpIcon from '../../images/help.svg'
import infoIcon from '../../images/info.svg'
import contactIcon from '../../images/contact.svg'

import allDappsIcon from '../../images/allMiniDapps.svg'
import storesIcon from '../../images/storefronts.svg'
import settingsIcon from '../../images/addStorefront.svg'

import logoIcon from '../../images/storefrontLogo.svg'
import appNameIcon from '../../images/storefront.svg'
import minimaIcon from '../../images/minimaIcon.svg'

import { themeStyles, themeStylesMobile } from '../../styles'

import { Paths, Local, Help, Settings } from '../../config'

interface MainDispatchProps {
  initServers: () => void
  initMiniDapps: () => void
  setServers: (file: any) => void
}

type Props =  MainDispatchProps

const mobile = (props: Props) => {

  const classes = themeStylesMobile()

  const getFile = (e: any) => {

    props.initMiniDapps()
    props.initServers()
    const files = e.target.files
    props.setServers(files[0])
  }

  return (
    <Grid className={classes.root}>

      <GoogleFontLoader
        fonts={[
          {
            font: 'Manrope',
            weights: [300, 400, 500, 600, 700],
          },
          {
            font: 'Roboto',
            weights: [300, 400, 500, 600, 700],
          }
        ]}
      />

      <Grid item container className={classes.header} xs={12}>

        <Grid item container justify="flex-start" xs={4}>
          <img className={classes.headerIcon} src={logoIcon}/>
        </Grid>

        <Grid item container justify="center" xs={4}>
          <div className={classes.appNameIconContainer}>
            <img className={classes.appNameIcon} src={appNameIcon}/>
          </div>
        </Grid>

        <Grid item container justify="flex-end" xs={4}>
          <img className={classes.headerIcon} src={minimaIcon}/>
        </Grid>

      </Grid>

      <Grid item container className={classes.subHeader} xs={12}>

        <Grid item xs={6}>
          &nbsp;
        </Grid>

        <Grid item container justify="flex-end" xs={6}>

          <Grid item container justify="flex-end" xs={4}>
            <NavLink to={Local.help} className={classes.link}>
                <IconButton
                  color="primary"
                  aria-label="Help"
                  component="span"
                  size="small">
                  <img
                    data-for={helpIcon}
                    data-tip
                    src={helpIcon}
                    className={classes.subHeaderIcon}
                  />
                </IconButton>
                <ReactTooltip
                  id={helpIcon}
                  place="bottom"
                  effect="solid"
                >
                  {Help.helpTip}
                </ReactTooltip>
            </NavLink>
          </Grid>

          <Grid item container justify="flex-end" xs={4}>
            <NavLink to={Local.about} className={classes.link}>
              <IconButton
                color="primary"
                aria-label="Info"
                component="span"
                size="small">
                <img
                  data-for={infoIcon}
                  data-tip
                  src={infoIcon}
                  className={classes.subHeaderIcon}
                />
              </IconButton>
              <ReactTooltip
                id={infoIcon}
                place="bottom"
                effect="solid"
              >
                {Help.aboutTip}
              </ReactTooltip>
            </NavLink>
          </Grid>

          <Grid item container justify="flex-end" xs={4}>
            <NavLink to={Local.contact} className={classes.link}>
              <IconButton
                color="primary"
                aria-label="Contact"
                component="span"
                size="small">
                <img
                  data-for={contactIcon}
                  data-tip
                  src={contactIcon}
                  className={classes.subHeaderIcon}
                />
              </IconButton>
              <ReactTooltip
                id={contactIcon}
                place="bottom"
                effect="solid"
              >
                {Help.contactTip}
              </ReactTooltip>
            </NavLink>
          </Grid>

        </Grid>

      </Grid>

    <Grid className={classes.content} alignItems="flex-start" item container xs={12}>
      <Content />
    </Grid>

    <Grid item container className={classes.footer} xs={12}>

      <Grid item container justify="flex-start" xs={4}>

         <NavLink to={Local.home}>
            <IconButton
             color="primary"
             aria-label={Help.homeTip}
             component="span"
             size="small">
             <img
              data-for={allDappsIcon}
              data-tip
              src={allDappsIcon}
              className={classes.footerIcon}
            />
            </IconButton>
            <ReactTooltip
              id={allDappsIcon}
              place="top"
              effect="solid"
            >
              {Help.homeTip}
            </ReactTooltip>
         </NavLink>

        </Grid>

        <Grid item container justify="center" xs={4}>

           <NavLink to={Local.showStoreDapps}>
             <IconButton
               color="primary"
               aria-label={Help.storeTip}
               component="span"
               size="small">
               <img
                data-for={storesIcon}
                data-tip
                src={storesIcon}
                className={classes.footerIcon}
              />
              </IconButton>
              <ReactTooltip
                id={storesIcon}
                place="top"
                effect="solid"
              >
                {Help.storeTip}
              </ReactTooltip>
           </NavLink>

        </Grid>

        <Grid item container justify="flex-end" xs={4}>

          <label htmlFor="getFile">
            <IconButton
              color="primary"
              aria-label={Help.fileTip}
              component="span"
              size="small">
              <img
                data-for={settingsIcon}
                data-tip
                src={settingsIcon}
                className={classes.footerIcon}
              />
            </IconButton>
            <ReactTooltip
              id={settingsIcon}
              place="top"
              effect="solid"
            >
              {Help.fileTip}
            </ReactTooltip>
          </label>

        </Grid>

      </Grid>

      //hide stuff we need but don't display here
      <Grid>
        <div>
          <input
            id="getFile"
            type="file"
            accept='.json'
            onChange={getFile}
            style={{ visibility: 'hidden'}}
          />
          <AppInit />
        </div>
      </Grid>

    </Grid>
  )
}

const desktop = (props: Props) => {

  const classes = themeStyles()

  const getFile = (e: any) => {

    props.initMiniDapps()
    props.initServers()
    const files = e.target.files
    props.setServers(files[0])
  }

  return (
    <Grid className={classes.root}>

      <GoogleFontLoader
        fonts={[
          {
            font: 'Manrope',
            weights: [300, 400, 500, 600, 700],
          },
          {
            font: 'Roboto',
            weights: [300, 400, 500, 600, 700],
          }
        ]}
      />

      <Grid item container className={classes.header} xs={12}>

        <Grid item container justify="flex-start" xs={4}>
          <img className={classes.headerIcon} src={logoIcon}/>
        </Grid>

        <Grid item container justify="center" xs={4}>
          <div className={classes.appNameIconContainer}>
            <img className={classes.appNameIcon} src={appNameIcon}/>
          </div>
        </Grid>

        <Grid item container justify="flex-end" xs={4}>
          <img className={classes.headerIcon} src={minimaIcon}/>
        </Grid>

      </Grid>

      <Grid item container className={classes.subHeader} xs={12}>

        <Grid item xs={6}>
          &nbsp;
        </Grid>

        <Grid item container justify="flex-end" xs={6}>

          <Grid item container justify="flex-end" xs={4}>
            <NavLink to={Local.help} className={classes.link}>
                <IconButton
                  color="primary"
                  aria-label="Help"
                  component="span"
                  size="small">
                  <img
                    data-for={helpIcon}
                    data-tip
                    src={helpIcon}
                    className={classes.subHeaderIcon}
                  />
                </IconButton>
                <ReactTooltip
                  id={helpIcon}
                  place="bottom"
                  effect="solid"
                >
                  {Help.helpTip}
                </ReactTooltip>
            </NavLink>
          </Grid>

          <Grid item container justify="flex-end" xs={4}>
            <NavLink to={Local.about} className={classes.link}>
              <IconButton
                color="primary"
                aria-label="Info"
                component="span"
                size="small">
                <img
                  data-for={infoIcon}
                  data-tip
                  src={infoIcon}
                  className={classes.subHeaderIcon}
                />
              </IconButton>
              <ReactTooltip
                id={infoIcon}
                place="bottom"
                effect="solid"
              >
                {Help.aboutTip}
              </ReactTooltip>
            </NavLink>
          </Grid>

          <Grid item container justify="flex-end" xs={4}>
            <NavLink to={Local.contact} className={classes.link}>
              <IconButton
                color="primary"
                aria-label="Contact"
                component="span"
                size="small">
                <img
                  data-for={contactIcon}
                  data-tip
                  src={contactIcon}
                  className={classes.subHeaderIcon}
                />
              </IconButton>
              <ReactTooltip
                id={contactIcon}
                place="bottom"
                effect="solid"
              >
                {Help.contactTip}
              </ReactTooltip>
            </NavLink>
          </Grid>

        </Grid>

      </Grid>

    <Grid className={classes.content} item container alignItems="flex-start" xs={12}>
      <Content />
    </Grid>

    <Grid item container className={classes.footer} xs={12}>

      <Grid item container justify="flex-start" xs={4}>

         <NavLink to={Local.home}>
            <IconButton
             color="primary"
             aria-label={Help.homeTip}
             component="span"
             size="small">
             <img
              data-for={allDappsIcon}
              data-tip
              src={allDappsIcon}
              className={classes.footerIcon}
            />
            </IconButton>
            <ReactTooltip
              id={allDappsIcon}
              place="top"
              effect="solid"
            >
              {Help.homeTip}
            </ReactTooltip>
         </NavLink>

        </Grid>

        <Grid item container justify="center" xs={4}>

           <NavLink to={Local.showStoreDapps}>
             <IconButton
               color="primary"
               aria-label={Help.storeTip}
               component="span"
               size="small">
               <img
                data-for={storesIcon}
                data-tip
                src={storesIcon}
                className={classes.footerIcon}
               />
              </IconButton>
              <ReactTooltip
                id={storesIcon}
                place="top"
                effect="solid"
              >
                {Help.storeTip}
              </ReactTooltip>
           </NavLink>

        </Grid>

        <Grid item container justify="flex-end" xs={4}>

          <label htmlFor="getFile">
            <IconButton
              color="primary"
              aria-label={Help.fileTip}
              component="span"
              size="small">
              <img
                data-for={settingsIcon}
                data-tip
                src={settingsIcon}
                className={classes.footerIcon}
              />
            </IconButton>
            <ReactTooltip
              id={settingsIcon}
              place="top"
              effect="solid"
            >
              {Help.fileTip}
            </ReactTooltip>
          </label>

        </Grid>

      </Grid>

      //hide stuff we need but don't display here
      <Grid>
        <div>
          <input
            id="getFile"
            type="file"
            accept='.json'
            onChange={getFile}
            style={{ visibility: 'hidden'}}
          />
          <AppInit />
        </div>
      </Grid>

    </Grid>
  )
}

const mainNav = (props: Props) => {

  let path = window.location.href
  const indexOf = path.indexOf("index")
  if (indexOf > -1) {
      const redirect = path.substr(0, indexOf)
      window.location.href = redirect
  }

  if (isMobile) {
    return mobile(props)
  } else {
    return desktop(props)
  }
}

const mapDispatchToProps = (dispatch: AppDispatch): MainDispatchProps => {
 return {
   initServers: () => dispatch(initServers()),
   initMiniDapps: () => dispatch(initMiniDapps()),
   setServers: (file: any) => dispatch(setServers(file))
 }
}

export const Main = connect<{}, MainDispatchProps, {}, ApplicationState>(
  null,
  mapDispatchToProps
)(mainNav)
