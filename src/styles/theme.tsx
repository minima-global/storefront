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
          font: 'Manrope',
          weights: [400, '400i'],
        },
      ]}
      subsets={['cyrillic-ext', 'greek']}
    />

let theme = createMuiTheme ({
  spacing: 8,
  typography: {
    fontFamily: [
      'Manrope',
      'Lato',
      'sans-serif',
      'Arial',
      'Roboto',
      '-apple-system',
    ].join(','),
    fontSize: 1,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    h1: {
      fontSize:  "2em",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32',
    },
    h2: {
      fontSize: "1.7em",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32'
    },
    h3: {
      fontSize: "1.5em",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32'
    },
    h4: {
      fontSize: "1.4em",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32'
    },
    h5: {
      fontSize: "1.3em",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32'
    },
    h6: {
      fontSize: "1.2em",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32'
    },
    subtitle1: {
      fontSize: "1.1em",
      fontWeight: 500,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32'
    },
    subtitle2: {
      fontSize: "1.1em",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32'
    },
    body1: {
      lineHeight: '1.6',
      fontSize: "1.3em",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32',
    },
    body2: {
      lineHeight: '1.6',
      fontSize: "1.3em",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32'
    },
    caption: {
      fontSize: "1em",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: orange[900]
    },
    button: {
      fontSize: "1.8em",
      textTransform: "uppercase",
      fontWeight: 500,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32'
    }
  },
  palette: {
    type: 'dark',
    background: {
      default: '#FFFFFF',
    },
    text: {
      primary: "#001C32",
      secondary: "#001C32"
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
    paddingRight: theme.spacing(8),
    paddingLeft: theme.spacing(8),
    margin: theme.spacing(0),
    background: 'linear-gradient(#001C32, #001C32)',
    height: "110px",
    width: "100vw",
    position: 'absolute',
    top: '0'
  },
  subHeader: {
    paddingRight: theme.spacing(8),
    paddingLeft: theme.spacing(8),
    margin: theme.spacing(0),
    textAlign: 'center',
    background: 'linear-gradient(#F0F0FA, #F0F0FA)',
    height: "90px",
    width: "100vw",
    position: 'absolute',
    top: '110px'
  },
  title: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    margin: theme.spacing(0),
    position: 'absolute',
    bottom: '0'
  },
  subTitle: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  content: {
    paddingRight: theme.spacing(8),
    paddingLeft: theme.spacing(8),
    margin: theme.spacing(0),
    background: 'linear-gradient(#FAFAFF, #FAFAFF)',
    overflow: 'auto',
    width: "100vw",
    position: 'absolute',
    bottom: '120px',
    top: '200px'
  },
  caption: {
    padding: theme.spacing(1),
    margin: theme.spacing(0),
    textAlign: 'center',
  },
  details: {
    paddingLeft: theme.spacing(1),
    margin: theme.spacing(0)
  },
  footer: {
    paddingRight: theme.spacing(8),
    paddingLeft: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    margin: theme.spacing(0),
    textAlign: 'center',
    background: 'linear-gradient(#001C32, #001C32)',
    height: "120px",
    width: "100vw",
    position: 'absolute',
    bottom: '0'
  },
  footerLinks: {
    fontWeight: 400,
    fontFamily: "\"Lato\", \"Arial\", \"sans-serif\", \"Roboto\"",
  },
  link: {
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
    margin: theme.spacing(0),
    background: 'linear-gradient(#FAFAFF, #FAFAFF)',
    width: "96px",
    height: "80px",
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
