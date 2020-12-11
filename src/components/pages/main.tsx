import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom"

import Markdown from 'react-markdown'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'

import { Content } from '../content'
import { AppInit } from '../appInit'
import { App } from '../../config/strings'

import { ApplicationState, AppDispatch } from '../../store'

import { initServers, initMiniDapps, setServers } from '../../store/app/fileServer/actions'

import IconButton from '@material-ui/core/IconButton'

import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone'
import HomeIcon from '@material-ui/icons/Home'
import InfoIcon from '@material-ui/icons/Info'
import HelpIcon from '@material-ui/icons/Help'
import ContactMailIcon from '@material-ui/icons/ContactMail'
import SettingsApplicationsTwoToneIcon from '@material-ui/icons/SettingsApplicationsTwoTone'
import StorefrontTwoToneIcon from '@material-ui/icons/StorefrontTwoTone';

import Tooltip from '@material-ui/core/Tooltip'

import logo from '../../images/storefrontLogoLarge.png'
import appName from '../../images/storefrontLarge.png'
import minimaIcon from '../../images/minimaIconlarge.png'

import { themeStyles } from '../../styles'

import { Paths, Local, Help, Settings } from '../../config'

interface MainDispatchProps {
  initServers: () => void
  initMiniDapps: () => void
  setServers: (file: any) => void
}

type Props =  MainDispatchProps

const mainNav = (props: Props) => {

  let path = window.location.href
  const indexOf = path.indexOf("index")
  if (indexOf > -1) {
      const redirect = path.substr(0, indexOf)
      window.location.href = redirect
  }

  const classes = themeStyles()
  const tagLine = `${App.catchLine}`

  const getFile = (e: any) => {

    props.initMiniDapps()
    props.initServers()
    const files = e.target.files
    props.setServers(files[0])
  }

  return (
    <Grid container className={classes.root}>

        <Grid container justify="center" className={classes.header}  xs={12}>

          <Grid item xs={4}>
            <img className={classes.title} src={logo}/>
            <AppInit />
          </Grid>

          <Grid item xs={4}>
            <img className={classes.title} src={appName}/>
          </Grid>

          <Grid item xs={4}>
            <img className={classes.companyLogo} src={minimaIcon}/>
          </Grid>

        </Grid>

        <Grid container className={classes.subHeader} xs={12}>

          <Grid item xs={4}>
            <NavLink to={Local.help} className={classes.link}>
                <Tooltip title={Help.helpTip}>
                  <IconButton
                    color="primary"
                    aria-label="Help"
                    component="span">
                    <HelpIcon fontSize={'large'}/>
                  </IconButton>
                </Tooltip>
            </NavLink>
          </Grid>

          <Grid item xs={4}>
            <NavLink to={Local.contact} className={classes.link}>
                <Tooltip title={Help.contactTip}>
                  <IconButton
                    color="primary"
                    aria-label="Contact"
                    component="span">
                    <ContactMailIcon fontSize={'large'}/>
                  </IconButton>
                </Tooltip>
            </NavLink>
          </Grid>

          <Grid item xs={4}>
            <NavLink to={Local.about} className={classes.link}>
                <Tooltip title={Help.aboutTip}>
                  <IconButton
                    color="primary"
                    aria-label="Info"
                    component="span">
                    <InfoIcon fontSize={'large'}/>
                  </IconButton>
                </Tooltip>
            </NavLink>
          </Grid>

        </Grid>

      <Grid item container className={classes.content} xs={12}>
        <Content />
      </Grid>

      <Grid item container className={classes.footer} xs={12}>

        <Grid item xs={4}>

           <NavLink to={Local.home}>
             <IconButton
               color="primary"
               aria-label="upload server config file"
               component="span">
               <HomeTwoToneIcon fontSize={'large'}/>
              </IconButton>
           </NavLink>

          </Grid>

          <Grid item xs={4}>

             <NavLink to={Local.showStoreDapps}>
             <IconButton
               color="primary"
               aria-label="upload server config file"
               component="span">
               <StorefrontTwoToneIcon fontSize={'large'}/>
              </IconButton>
             </NavLink>

          </Grid>

          <Grid item xs={4}>

            <Tooltip title={Settings.fileTip}>
              <label htmlFor="getFile">
                <IconButton
                  color="primary"
                  aria-label="upload server config file"
                  component="span">
                  <SettingsApplicationsTwoToneIcon fontSize={'large'}/>
                </IconButton>
              </label>
            </Tooltip>

          </Grid>

      </Grid>

      <Grid item container xs={12}>

        <Grid item>
          <input
          id="getFile"
          type="file"
          accept='.json'
          onChange={getFile}
          style={{ visibility: 'hidden'}}
          />
        </Grid>
      </Grid>

    </Grid>
  )
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
