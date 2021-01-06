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

import helpDesktop from '../../images/helpLarge.png'
import helpMobile from '../../images/help.png'
import infoDesktop from '../../images/infolarge.png'
import infoMobile from '../../images/info.png'
import contactDesktop from '../../images/contactLarge.png'
import contactMobile from '../../images/contact.png'
import allDappsDesktop from '../../images/allMiniDappsLarge.png'
import allDappsMobile from '../../images/allMiniDapps.png'
import storesDesktop from '../../images/storefrontsLarge.png'
import storesMobile from '../../images/storefronts.png'
import settingsDesktop from '../../images/addStorefrontLarge.png'
import settingsMobile from '../../images/addStorefront.png'

import logoDesktop from '../../images/storefrontLogoLarge.png'
import logoMobile from '../../images/storefrontLogo.png'
import appNameDesktop from '../../images/storefrontLarge.png'
import appNameMobile from '../../images/storefront.png'
import minimaDesktop from '../../images/minimaIconlarge.png'
import minimaMobile from '../../images/minimaIcon.png'

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
          <img className={classes.title} src={logoMobile}/>
        </Grid>

        <Grid item container justify="center" xs={4}>
          <img className={classes.title} src={appNameMobile}/>
        </Grid>

        <Grid item container justify="flex-end" xs={4}>
          <img className={classes.title} src={minimaMobile}/>
        </Grid>

      </Grid>

      <Grid item container className={classes.subHeader} xs={12}>

        <Grid item xs={6}>
          &nbsp;
        </Grid>

        <Grid item container className={classes.subTitle} justify="flex-end" xs={6}>

          <Grid item container justify="flex-end" xs={4}>
            <NavLink to={Local.help} className={classes.link}>
                <IconButton
                  color="primary"
                  aria-label="Help"
                  component="span"
                  size="small">
                  <img data-for={helpMobile} data-tip src={helpMobile}/>
                </IconButton>
                <ReactTooltip
                  id={helpMobile}
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
                <img data-for={infoMobile} data-tip src={infoMobile}/>
              </IconButton>
              <ReactTooltip
                id={infoMobile}
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
                <img data-for={contactMobile} data-tip src={contactMobile}/>
              </IconButton>
              <ReactTooltip
                id={contactMobile}
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
             <img data-for={allDappsMobile} data-tip src={allDappsMobile}/>
            </IconButton>
            <ReactTooltip
              id={allDappsMobile}
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
               <img data-for={storesMobile} data-tip src={storesMobile}/>
              </IconButton>
              <ReactTooltip
                id={storesMobile}
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
              <img data-for={settingsMobile} data-tip src={settingsMobile}/>
            </IconButton>
            <ReactTooltip
              id={settingsMobile}
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
          <img className={classes.title} src={logoDesktop}/>
        </Grid>

        <Grid item container justify="center" xs={4}>
          <img className={classes.title} src={appNameDesktop}/>
        </Grid>

        <Grid item container justify="flex-end" xs={4}>
          <img className={classes.title} src={minimaDesktop}/>
        </Grid>

      </Grid>

      <Grid item container className={classes.subHeader} xs={12}>

        <Grid item xs={6}>
          &nbsp;
        </Grid>

        <Grid item container className={classes.subTitle} justify="flex-end" xs={6}>

          <Grid item container justify="flex-end" xs={4}>
            <NavLink to={Local.help} className={classes.link}>
                <IconButton
                  color="primary"
                  aria-label="Help"
                  component="span"
                  size="small">
                  <img data-for={helpDesktop} data-tip src={helpDesktop}/>
                </IconButton>
                <ReactTooltip
                  id={helpDesktop}
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
                <img data-for={infoDesktop} data-tip src={infoDesktop}/>
              </IconButton>
              <ReactTooltip
                id={infoDesktop}
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
                <img data-for={contactDesktop} data-tip src={contactDesktop}/>
              </IconButton>
              <ReactTooltip
                id={contactDesktop}
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
             <img data-for={allDappsDesktop} data-tip src={allDappsDesktop}/>
            </IconButton>
            <ReactTooltip
              id={allDappsDesktop}
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
               <img data-for={storesDesktop} data-tip src={storesDesktop}/>
              </IconButton>
              <ReactTooltip
                id={storesDesktop}
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
              <img data-for={settingsDesktop} data-tip src={settingsDesktop}/>
            </IconButton>
            <ReactTooltip
              id={settingsDesktop}
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
