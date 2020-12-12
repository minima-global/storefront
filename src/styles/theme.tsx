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
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    h1: {
      lineHeight: '3vh',
      fontSize:  "3vh",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32',
    },
    h2: {
      lineHeight: '2.7vh',
      fontSize: "2.7vh",
      fontWeight: 600,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32'
    },
    h3: {
      lineHeight: '2.5vh',
      fontSize: "2.5vh",
      fontWeight: 500,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32'
    },
    h4: {
      lineHeight: '2.4vh',
      fontSize: "2.4vh",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32'
    },
    h5: {
      lineHeight: '2.3vh',
      fontSize: "2.3vh",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32'
    },
    h6: {
      lineHeight: '2.2vh',
      fontSize: "2.2vh",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32'
    },
    subtitle1: {
      lineHeight: '2.1vh',
      fontSize: "2.1vh",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32'
    },
    subtitle2: {
      lineHeight: '2.1vh',
      fontSize: "2.1vh",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32'
    },
    body1: {
      lineHeight: '2vh',
      fontSize: "2vh",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32',
    },
    body2: {
      lineHeight: '2vh',
      fontSize: "2vh",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: '#001C32'
    },
    caption: {
      lineHeight: '1.9vh',
      fontSize: "1.9vh",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Arial\", \"sans-serif\", \"Roboto\"",
      color: orange[900]
    },
    button: {
      lineHeight: '2vh',
      fontSize: "2vh",
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
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    margin: theme.spacing(0),
    background: 'linear-gradient(#001C32, #001C32)',
    height: "70px",
    width: "100vw",
    position: 'absolute',
    top: '0'
  },
  subHeader: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    margin: theme.spacing(0),
    textAlign: 'center',
    background: 'linear-gradient(#F0F0FA, #F0F0FA)',
    height: "55px",
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
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    margin: theme.spacing(0),
    background: 'linear-gradient(#FAFAFF, #FAFAFF)',
    overflow: 'auto',
    width: "100vw",
    position: 'absolute',
    bottom: '50px',
    top: '125px'
  },
  home: {
    padding: theme.spacing(1),
    margin: theme.spacing(0),
  },
  caption: {
    padding: theme.spacing(1),
    margin: theme.spacing(0),
    textAlign: 'center',
  },
  footer: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    margin: theme.spacing(0),
    textAlign: 'center',
    background: 'linear-gradient(#001C32, #001C32)',
    height: "50px",
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
