import React from 'react'

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/blue'
import indigo from '@material-ui/core/colors/indigo'
import orange from '@material-ui/core/colors/orange'
import yellow from '@material-ui/core/colors/yellow'

let theme = createMuiTheme ({
  spacing: 8,
  typography: {
    fontFamily: [
      'Manrope',
      'Roboto',
      'Arial',
      'sans-serif',
      '-apple-system',
    ].join(','),
    fontSize: 1,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    h1: {
      lineHeight: "1",
      fontSize:  "1.5em",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32',
    },
    h2: {
      lineHeight: "1",
      fontSize: "1.4em",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32'
    },
    h3: {
      lineHeight: "1",
      fontSize: "1.3em",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32'
    },
    h4: {
      lineHeight: "1",
      fontSize: "1.2em",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32'
    },
    h5: {
      lineHeight: "1",
      fontSize: "1.1em",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32'
    },
    h6: {
      lineHeight: "1",
      fontSize: "1em",
      fontWeight: 500,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32'
    },
    subtitle1: {
      lineHeight: "1",
      fontSize: "0.9em",
      fontWeight: 600,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32'
    },
    subtitle2: {
      lineHeight: "1",
      fontSize: "0.9em",
      fontWeight: 500,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32'
    },
    body1: {
      lineHeight: '1.5',
      fontSize: "1.3em",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32',
    },
    body2: {
      lineHeight: '1.5',
      fontSize: "1.3em",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32'
    },
    caption: {
      fontSize: "0.9em",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
    },
    button: {
      fontSize: "1.8em",
      textTransform: "uppercase",
      fontWeight: 500,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
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
theme.spacing(1)

const themeStyles = makeStyles({
  root: {
    background: 'linear-gradient(#F0F0FA, #F0F0FA)',
    height: "100vh",
    width: "70%",
    margin: 'auto',
    position: 'relative'
  },
  header: {
    paddingRight: theme.spacing(8),
    paddingLeft: theme.spacing(8),
    margin: theme.spacing(0),
    background: 'linear-gradient(#001C32, #001C32)',
    height: "110px",
    width: "100%",
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
    width: "100%",
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
    width: "100%",
    position: 'absolute',
    bottom: '120px',
    top: '200px'
  },
  storeTitle: {
    padding: theme.spacing(0),
    margin: theme.spacing(0)
  },
  storeDescription: {
    padding: theme.spacing(0),
    margin: theme.spacing(0)
  },
  caption: {
    padding: theme.spacing(1),
    margin: theme.spacing(0),
    textAlign: 'center',
  },
  details: {
    paddingLeft: theme.spacing(3),
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
    width: "100%",
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
    marginTop: theme.spacing(1),
    background: 'linear-gradient(#FAFAFF, #FAFAFF)',
    width: "45px",
    height: "45px",
    overflow: "hidden"
  },
  appIcon: {
    margin: 'auto',
    height: "45px",
    width: '100%'
  },
  storeIconContainer: {
    padding: theme.spacing(0),
    marginTop: theme.spacing(3),
    background: 'linear-gradient(#FAFAFF, #FAFAFF)',
    width: "45px",
    height: "45px",
    overflow: "hidden"
  },
  storeIcon: {
    margin: 'auto',
    height: "45px",
    width: '100%'
  },
  linkIconContainer: {
    padding: theme.spacing(0),
    marginTop: theme.spacing(0),
    background: 'linear-gradient(#FAFAFF, #FAFAFF)',
    width: "30px",
    height: "40px",
    overflow: "hidden"
  },
  linkIcon: {
    margin: 'auto',
    height: "40px",
    width: '100%'
  },
  hr: {
    borderTop: "1px",
    solid: "#F0F0FA"
  }
})

export { theme, themeStyles }
