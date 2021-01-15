import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'

import { isMobile } from "react-device-detect"

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { ApplicationState, AppDispatch } from '../../store/types'

import { themeStyles, themeStylesMobile } from '../../styles'

import { Local } from '../../config'
import { Home as HomeConfig, App } from '../../config/strings'

import hrFirst from '../../images/hrFirst.svg'

import { setActivePage } from '../../store/app/appData/actions'

interface HomeDispatchProps {
  setActivePage: (page: string) => void
}

type Props = HomeDispatchProps

const landing = (props: Props) => {

    let history = useHistory()

    const classes = isMobile ? themeStylesMobile() : themeStyles()

    useEffect(() => {

      setTimeout(() => {
        props.setActivePage(Local.allDapps)
        history.push(Local.allDapps)
      }, 2000)

    }, [])

    return (
      <Grid container alignItems="flex-start">
        <Grid item container justify="flex-start" xs={12}>
          <Typography variant="h2">
            blah
          </Typography>
        </Grid>
        <Grid item container xs={12} alignItems="flex-start">
          <img src={hrFirst} className={classes.hr}/>
        </Grid>
        <Grid item container justify="flex-start" xs={12}>
          <Typography variant="h5">
            blah blah blah
          </Typography>
        </Grid>
      </Grid>
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
