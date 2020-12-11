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
      lineHeight: "1",
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
      color: '#000000',
      lineHeight: 'normal'
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
    background: 'linear-gradient(#F0F0FA, #F0F0FA)',
    height: "100vh",
    width: "100vw",
    position: 'relative'
  },
  header: {
    padding: theme.spacing(2),
    margin: theme.spacing(0),
    background: 'linear-gradient(#001C32, #001C32)',
    height: "70px",
    width: "100vw",
    position: 'absolute',
    top: '0'
  },
  subHeader: {
    padding: theme.spacing(2),
    margin: theme.spacing(0),
    textAlign: 'center',
    background: 'linear-gradient(#F0F0FA, #F0F0FA)',
    height: "70px",
    width: "100vw",
    position: 'absolute',
    top: '70px'
  },
  title: {
    padding: theme.spacing(1),
    margin: theme.spacing(0),
    position: 'absolute',
    bottom: '0'
  },
  subTitle: {
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    textAlign: 'center',
    background: 'linear-gradient(#ff671d, #ff671d)',
    fontStyle: 'italic'
  },
  content: {
    padding: theme.spacing(2),
    margin: theme.spacing(0),
    color: theme.palette.text.primary,
    background: 'linear-gradient(#FAFAFF, #FAFAFF)',
    overflow: 'auto',
    width: "100vw",
    position: 'absolute',
    bottom: '84px',
    top: '140px'
  },
  home: {
    padding: theme.spacing(1),
    margin: theme.spacing(0),
    color: theme.palette.text.primary,
  },
  caption: {
    padding: theme.spacing(1),
    margin: theme.spacing(0),
    textAlign: 'center',
  },
  footer: {
    padding: theme.spacing(2),
    margin: theme.spacing(0),
    textAlign: 'center',
    background: 'linear-gradient(#001C32, #001C32)',
    height: "84px",
    width: "100vw",
    position: 'absolute',
    bottom: '0'
  },
  footerLinks: {
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
    background: 'linear-gradient(#ff671d, #ff671d)',
  },
  spinner: {
     position: 'absolute',
     left: '50%',
     top: '50%',
     transform: 'translate(-50%, -50%)'
  },
  appIconContainer: {
    padding: theme.spacing(0),
    margin: theme.spacing(1),
    width: "96px",
    height: "80px",
    border: "2px",
    borderRadius: "50%",
    borderColor: "red",
    overflow: "hidden"
  },
  appIcon: {
    margin: 'auto',
    height: "80px",
    width: '100%'
  },
  hr: {
    borderTop: "1px",
    solid: "#ccc"
  }
})

export { fontLoader, theme, themeStyles }
