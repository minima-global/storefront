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

import powered from '../../images/powered.png'
import appName from '../../images/appName.png'

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
      <div className={classes.root}>
        <Grid container>

          <Paper className={classes.header} square={true}>
            <Grid item container xs={12}>

                <Grid item xs={1}>
                  <img className={classes.title} src={powered}/>
                  <AppInit />
                </Grid>

                <Grid item xs={5}>
                  <img className={classes.title} src={appName}/>
                </Grid>

                <Grid item container justify="flex-end" xs={6}>

                    <Grid item xs={2}>
                      <NavLink to={Local.help} className={classes.link}>
                          <Tooltip title={Help.helpTip}>
                            <HelpIcon />
                          </Tooltip>
                      </NavLink>
                    </Grid>

                    <Grid item xs={2}>
                      <NavLink to={Local.contact} className={classes.link}>
                          <Tooltip title={Help.contactTip}>
                            <ContactMailIcon />
                          </Tooltip>
                      </NavLink>
                    </Grid>

                    <Grid item xs={2}>
                      <NavLink to={Local.about} className={classes.link}>
                          <Tooltip title={Help.aboutTip}>
                            <InfoIcon />
                          </Tooltip>
                      </NavLink>
                    </Grid>

                </Grid>

            </Grid>
          </Paper>

          <Paper className={classes.content} square={true}>
            <Grid item container xs={12}>
               <Grid item xs={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={10}>
                    <Content />
                </Grid>
                <Grid item xs={1}>
                    &nbsp;
                </Grid>
            </Grid>
          </Paper>

          <Paper className={classes.footer} square={true}>
            <Grid item container xs={12}>

              <Grid item xs={4}>

                   <NavLink to={Local.home}>
                       <Grid item>
                          <Paper className={classes.footerLinks} elevation={0} square={true}>
                            <HomeTwoToneIcon fontSize={'large'}/>
                          </Paper>
                       </Grid>
                   </NavLink>

                </Grid>

                <Grid item xs={4}>

                   <NavLink to={Local.showStoreDapps}>
                       <Grid item>
                          <Paper className={classes.footerLinks} elevation={0} square={true}>
                            <StorefrontTwoToneIcon fontSize={'large'}/>
                          </Paper>
                       </Grid>
                   </NavLink>

                </Grid>

                <Grid item xs={4}>

                  <input
                      id="getFile"
                      type="file"
                      accept='.json'
                      onChange={getFile}
                      style={{ visibility: 'hidden'}}
                  />
                    <Tooltip title={Settings.fileTip}>
                      <label htmlFor="getFile">
                        <IconButton color="primary" aria-label="upload server config file" component="span">
                            <Paper className={classes.footerLinks} elevation={0} square={true}>
                              <SettingsApplicationsTwoToneIcon fontSize={'large'}/>
                            </Paper>
                        </IconButton>
                      </label>
                    </Tooltip>

                </Grid>

            </Grid>
          </Paper>

        </Grid>
      </div>
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
