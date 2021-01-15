import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { isMobile } from "react-device-detect"

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { ApplicationState, AppDispatch, InfoProps, InfoTypes } from '../../store/types'

import hrFirst from '../../images/hrFirst.svg'

import { themeStyles, themeStylesMobile } from '../../styles'

import { Local } from '../../config'
import { About, Help, Contact } from '../../config/strings'

import { setActivePage } from '../../store/app/appData/actions'

interface StaticInfoProps {
  type: InfoTypes
}

interface DispatchProps {
  setActivePage: (page: string) => void
}

type Props = StaticInfoProps & DispatchProps

const appInfo = (props: Props) => {

    const [pageData, setPageData] = useState({title: About.heading,
    data: About.info})

    const classes = isMobile ? themeStylesMobile() : themeStyles()

    useEffect(() => {

      switch (props.type) {
        case InfoTypes.ABOUT:

          setPageData({ title: About.heading, data: About.info })
          props.setActivePage(Local.about)
          break

        case InfoTypes.HELP:

          setPageData({ title: Help.heading, data: Help.info })
          props.setActivePage(Local.help)
          break

        case InfoTypes.CONTACT:

          setPageData({ title: Contact.heading, data: Contact.info })
          props.setActivePage(Local.contact)
          break

        default:

          props.setActivePage(Local.home)
      }

    }, [props.type])

    return (
      <Grid container alignItems="flex-start">
        <Grid item container justify="flex-start" xs={12}>
          <Typography variant="h2">
            {pageData.title}
          </Typography>
        </Grid>
        <Grid item container xs={12} alignItems="flex-start">
          <img src={hrFirst} className={classes.hr}/>
        </Grid>
        <Grid item container justify="flex-start" xs={12}>
          <Typography variant="h5">
            {pageData.data}
          </Typography>
        </Grid>
      </Grid>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
 return {
   setActivePage: (page: string) => dispatch(setActivePage(page))
 }
}

export const Info = connect<DispatchProps, {}, {}, ApplicationState>(
  null,
  mapDispatchToProps
)(appInfo)
