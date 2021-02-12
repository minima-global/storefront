import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'

import { isMobile } from "react-device-detect"

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

import { ApplicationState, AppDispatch } from '../../store/types'

import { themeStyles, themeStylesMobile } from '../../styles'

import { Local } from '../../config'
import { Home as HomeConfig, App } from '../../config/strings'

import logoIcon from '../../images/storefrontLogo.svg'
import appNameIcon from '../../images/storefront.svg'
//import minimaIcon from '../../images/minimaIcon.svg'

import { setActivePage } from '../../store/app/appData/actions'

interface HomeDispatchProps {
  setActivePage: (page: string) => void
}

type Props = HomeDispatchProps

const landing = (props: Props) => {

  const [loadLogo, setLoadLogo] = useState(true)
  const [loadAppName, setLoadAppName] = useState(false)
  const [exit, setExit] = useState(false)

  let history = useHistory()

  const classes = isMobile ? themeStylesMobile() : themeStyles()

  useEffect(() => {

    let appTimeout = setTimeout(() => {
      setLoadAppName(true)
    }, 1000)

    let exitTimeout = setTimeout(() => {
      setExit(true)
    }, 3000)

    let pageTimeout = setTimeout(() => {
      props.setActivePage(Local.showStoreDapps)
      history.push(Local.showStoreDapps)
    }, 3500)

    return () => {
      clearTimeout(appTimeout)
      clearTimeout(exitTimeout)
      clearTimeout(pageTimeout)
    }

  }, [])

  return (
    <>
      {exit ?

          <Grid container className={classes.landingExit}>

            <Grid item container className={classes.landingDisplay}>

              <div>

                <Grid item container justify="center" xs={12}>
                  <img className={classes.landingLogoIcon} src={logoIcon}/>
                </Grid>
                <br/>
                <br/>
                <Grid item container justify="center" xs={12}>
                  <img className={classes.landingAppNameIcon} src={appNameIcon}/>
                </Grid>

              </div>

            </Grid>

          </Grid> : (

          <Grid container className={classes.landing}>

            <Grid item container className={classes.landingDisplay}>

              <div>
                <Fade in={loadLogo} timeout={1000}>
                  <div>
                    <Grid item container justify="center" xs={12}>
                      <img className={classes.landingLogoIcon} src={logoIcon}/>
                    </Grid>
                    <br/>
                    <br/>
                    <Fade in={loadAppName} timeout={1000}>
                      <Grid item container justify="center" xs={12}>
                        <img className={classes.landingAppNameIcon} src={appNameIcon}/>
                      </Grid>
                    </Fade>
                  </div>
                </Fade>

              </div>

            </Grid>

          </Grid>
        )
      }
    </>
  )
}

const mapDispatchToProps = (dispatch: AppDispatch): HomeDispatchProps => {
 return {
   setActivePage: (page: string) => dispatch(setActivePage(page))
 }
}

export const Home = connect<HomeDispatchProps, {}, {}, ApplicationState>(
  null,
  mapDispatchToProps
)(landing)
