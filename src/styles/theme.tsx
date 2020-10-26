import React from 'react'

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Form } from 'formik'

import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/blue'
import indigo from '@material-ui/core/colors/indigo'
import orange from '@material-ui/core/colors/orange'
import yellow from '@material-ui/core/colors/yellow'

import GoogleFontLoader from 'react-google-font-loader'

//load this first
const fontLoader = () =>
    <GoogleFontLoader
      fonts={[
        {
          font: 'Barlow',
          weights: [400, '400i'],
        },
        {
          font: 'Lato',
          weights: [400, 500],
        },
      ]}
      subsets={['cyrillic-ext', 'greek']}
    />

let theme = createMuiTheme ({
  spacing: 8,
  typography: {
    fontFamily: [
      'Barlow',
      'Lato',
      'sans-serif',
      'Arial',
      'Roboto',
      '-apple-system',
    ].join(','),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    h1: {
      fontSize:  "30px",
      fontWeight: 700,
      fontFamily: "\"Barlow\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#000000',
    },
    h2: {
      fontSize: "2.7vh",
      fontWeight: 600,
      fontFamily: "\"Barlow\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#000000'
    },
    h3: {
      fontSize: "2.5vh",
      fontWeight: 500,
      fontFamily: "\"Barlow\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#000000'
    },
    h4: {
      fontSize: "2.4vh",
      fontWeight: 400,
      fontFamily: "\"Barlow\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#000000'
    },
    h5: {
      fontSize: "2.3vh",
      fontWeight: 400,
      fontFamily: "\"Barlow\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#000000'
    },
    h6: {
      fontSize: "2.2vh",
      fontWeight: 400,
      fontFamily: "\"Barlow\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#000000'
    },
    subtitle1: {
      fontSize: "2.1vh",
      fontWeight: 400,
      fontFamily: "\"Barlow\", \"Arial\", \"sans-serif\", \"Roboto\"",
      lineHeight: "1.5em",
      color: '#000000'
    },
    subtitle2: {
      fontSize: "2.1vh",
      fontWeight: 400,
      fontFamily: "\"Barlow\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#000000'
    },
    body1: {
      fontSize: "2vh",
      fontWeight: 400,
      fontFamily: "\"Lato\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#000000'
    },
    body2: {
      fontSize: "2vh",
      fontWeight: 400,
      fontFamily: "\"Lato\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#000000'
    },
    caption: {
      fontSize: "1.9vh",
      fontWeight: 400,
      fontFamily: "\"Lato\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: orange[900]
    },
    button: {
      fontSize: "2vh",
      textTransform: "uppercase",
      fontWeight: 500,
      fontFamily: "\"Lato\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#000000'
    }
  },
  palette: {
    type: 'dark',
    background: {
      default: '#FFFFFF',
    },
    text: {
      primary: "#000000",
      secondary: "#000000"
    },
    primary: {
      main: '#929396'
    },
    secondary: {
      main: '#ff671e'
    },
    error: red,
    warning: orange,
    info: yellow,
    success: green,
  }
})

theme = responsiveFontSizes(theme)
theme.spacing(4)

const themeStyles = makeStyles({
  root: {
    background: 'linear-gradient(#FFFFFF, #FFFFFF)',
    color: theme.palette.text.primary,
    height: "100vh",
    width: "100vw",
    position: 'relative'
  },
  logo: {
    padding: theme.spacing(1),
    margin: theme.spacing(0)
  },
  header: {
    padding: theme.spacing(1),
    margin: theme.spacing(0),
    textAlign: 'left',
    background: 'linear-gradient(#27737e, #27737e)',
    height: "75px",
    width: "100vw",
    position: 'absolute',
    top: '0'
  },
  title: {
    padding: theme.spacing(1),
    margin: theme.spacing(0),
    textAlign: 'left',
    background: 'linear-gradient(#27737e, #27737e)'
  },
  subTitle: {
    padding: theme.spacing(1),
    margin: theme.spacing(0),
    textAlign: 'left',
    background: 'linear-gradient(#27737e, #27737e)'
  },
  content: {
    padding: theme.spacing(1),
    margin: theme.spacing(0),
    color: theme.palette.text.primary,
    background: 'linear-gradient(#FFFFFF, #FFFFFF)',
    overflow: 'auto',
    width: "100vw",
    position: 'absolute',
    bottom: '120px',
    top: '75px'
  },
  caption: {
    padding: theme.spacing(1),
    margin: theme.spacing(0),
    textAlign: 'center',
    background: 'linear-gradient(#27737e, #27737e)'
  },
  footer: {
    padding: theme.spacing(1),
    margin: theme.spacing(0),
    textAlign: 'center',
    background: 'linear-gradient(#27737e, #27737e)',
    height: "120px",
    width: "100vw",
    position: 'absolute',
    bottom: '0'
  },
  footerLinks: {
    background: 'linear-gradient(#27737e, #27737e)',
    textAlign: 'center',
    fontSize: "2vh",
    fontWeight: 400,
    fontFamily: "\"Lato\", \"Arial\", \"sans-serif\", \"Roboto\"",
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    fontSize: "2vh",
    fontWeight: 400,
    fontFamily: "\"Lato\", \"Arial\", \"sans-serif\", \"Roboto\"",
  },
  menu: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    background: 'linear-gradient(#27737e, #27737e)',
  },
  spinner: {
     position: 'absolute',
     left: '50%',
     top: '50%',
     transform: 'translate(-50%, -50%)'
  }
})

export { fontLoader, theme, themeStyles }
