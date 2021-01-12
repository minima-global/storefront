import React from 'react'

import { createMuiTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles'

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
      lineHeight: "2.4",
      fontSize:  "2.2em",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32',
    },
    h2: {
      lineHeight: "2",
      fontSize: "1.6em",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32'
    },
    h3: {
      lineHeight: '1.2',
      fontSize: "1em",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32'
    },
    h4: {
      lineHeight: '1.2',
      fontSize: "1em",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#317aff'
    },
    h5: {
      lineHeight: "1.2",
      fontSize: "1em",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32'
    },
    h6: {
      lineHeight: "1.2",
      fontSize: "1em",
      fontWeight: 700,
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
      lineHeight: '1',
      fontSize: "1",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32',
    },
    body2: {
      lineHeight: '1',
      fontSize: "1",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32',
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
      default: '#edefef',
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
"0"

const themeStyles = makeStyles({
  root: {
    marginTop: "5vh",
    marginBottom: "5vh",
    marginLeft: "auto",
    marginRight: "auto",
    height: "90vh",
    width: "50%",
    position: 'relative'
  },
  header: {
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    paddingTop: "30px",
    margin: "0",
    background: 'linear-gradient(#001C32, #001C32)',
    height: "90px",
    width: "100%",
    position: 'absolute',
    top: '0'
  },
  subHeader: {
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    margin: "0",
    textAlign: 'center',
    background: 'linear-gradient(#F0F0FA, #F0F0FA)',
    height: "60px",
    width: "100%",
    position: 'absolute',
    top: '90px'
  },
  content: {
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    margin: "0",
    background: 'linear-gradient(#FAFAFF, #FAFAFF)',
    overflow: 'auto',
    width: "100%",
    position: 'absolute',
    bottom: '100px',
    top: '150px'
  },
  footer: {
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    paddingTop: "10px",
    margin: "0",
    background: 'linear-gradient(#001C32, #001C32)',
    height: "100px",
    width: "100%",
    position: 'absolute',
    bottom: '0'
  },
  storeTitle: {
    padding: "0",
    margin: "0"
  },
  storeDescription: {
    padding: "0",
    margin: "0"
  },
  caption: {
    padding: theme.spacing(1),
    margin: "0"
  },
  details: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    margin: "0",
  },
  footerLinks: {
    fontWeight: 400,
    fontFamily: "\"Lato\", \"Arial\", \"sans-serif\", \"Roboto\"",
  },
  menu: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    background: 'linear-gradient(#ff671d, #ff671d)',
  },
  spinner: {
     position: 'relative',
     top: "50%",
     bottom: "50%"
  },
  appIcon: {
    height: "50px",
    width: '50px'
  },
  downloadIcon: {
    height: "25px",
    width: '20px'
  },
  subHeaderIcon: {
    height: "40px",
    width: '40px'
  },
  footerIcon: {
    height: "35px",
    width: '35px'
  },
  headerIcon: {
    height: "50px",
    width: '50px'
  },
  appNameIconContainer: {
    position: "relative",
    top: "0",
    left: "0",
    height: "50px",
    width: '208px'
  },
  appNameIcon: {
    position: "absolute",
    bottom: "0",
    left: "0",
    height: "25px",
    width: '168px'
  },
  storeIconParent: {
    marginTop: theme.spacing(1),
    position: "relative",
    top: "0",
    left: "0",
  },
  storeIconContainer: {
    position: "relative",
    top: "0",
    left: "0",
    borderRadius: "50%",
    width: "40px",
    height: "40px"
  },
  storeIcon: {
    position: "absolute",
    top: "0",
    left: "0",
    margin: '10px',
    width: "20px",
    height: "20px",
  },
  storesIconParent: {
    position: "relative",
    top: "0",
    left: "0",
  },
  storesIconContainer: {
    position: "relative",
    top: "0",
    left: "0",
    borderRadius: "50%",
    width: "40px",
    height: "40px"
  },
  storesIcon: {
    position: "absolute",
    top: "0",
    left: "0",
    margin: '10px',
    width: "20px",
    height: "20px",
  },
  link: {
    textDecoration: 'none'
  },
  activeLink: {
    filter: "brightness(0) saturate(100%) invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%)"
  },
  linkIcon: {
    margin: 'auto',
    height: "30px",
    width: '30px'
  },
  hr: {
    height: "1px",
    width: "100%"
  }
})

export { theme, themeStyles }
