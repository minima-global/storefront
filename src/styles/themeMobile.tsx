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

let themeMobile = createMuiTheme ({
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
      lineHeight: "2.2",
      fontSize: "2em",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32'
    },
    h3: {
      lineHeight: '1.6',
      fontSize: "1.5em",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32'
    },
    h4: {
      lineHeight: '1.6',
      fontSize: "1.5em",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#317aff'
    },
    h5: {
      lineHeight: "1",
      fontSize: "1.4em",
      fontWeight: 500,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32'
    },
    h6: {
      lineHeight: "1",
      fontSize: "1.1em",
      fontWeight: 500,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32'
    },
    subtitle1: {
      lineHeight: "1",
      fontSize: "1.3em",
      fontWeight: 600,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32'
    },
    subtitle2: {
      lineHeight: "1",
      fontSize: "1.3em",
      fontWeight: 500,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32'
    },
    body1: {
      lineHeight: '1.6',
      fontSize: "1.5em",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32',
    },
    body2: {
      lineHeight: '1.6',
      fontSize: "1.5em",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32'
    },
    caption: {
      fontSize: "1.3em",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
    },
    button: {
      lineHeight: "1",
      fontSize: "1.5em",
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

themeMobile = responsiveFontSizes(themeMobile)
themeMobile.spacing(0)

const themeStylesMobile = makeStyles({
  root: {
    background: 'linear-gradient(#F0F0FA, #F0F0FA)',
    height: "100vh",
    width: "100%",
    position: 'relative'
  },
  header: {
    paddingRight: themeMobile.spacing(4),
    paddingLeft: themeMobile.spacing(4),
    margin: themeMobile.spacing(0),
    background: 'linear-gradient(#001C32, #001C32)',
    height: "80px",
    width: "100%",
    position: 'absolute',
    top: '0'
  },
  subHeader: {
    paddingRight: themeMobile.spacing(4),
    paddingLeft: themeMobile.spacing(4),
    margin: themeMobile.spacing(0),
    textAlign: 'center',
    background: 'linear-gradient(#F0F0FA, #F0F0FA)',
    height: "60px",
    width: "100%",
    position: 'absolute',
    top: '80px'
  },
  title: {
    paddingBottom: themeMobile.spacing(2),
    margin: themeMobile.spacing(0),
    position: 'absolute',
    bottom: '0'
  },
  subTitle: {
    paddingTop: themeMobile.spacing(1),
    paddingBottom: themeMobile.spacing(1)
  },
  content: {
    paddingRight: themeMobile.spacing(4),
    paddingLeft: themeMobile.spacing(4),
    margin: themeMobile.spacing(0),
    background: 'linear-gradient(#FAFAFF, #FAFAFF)',
    overflow: 'auto',
    width: "100%",
    position: 'absolute',
    bottom: '80px',
    top: '140px'
  },
  storeTitle: {
    padding: themeMobile.spacing(0),
    margin: themeMobile.spacing(0)
  },
  storeDescription: {
    padding: themeMobile.spacing(0),
    margin: themeMobile.spacing(0)
  },
  caption: {
    padding: themeMobile.spacing(1),
    margin: themeMobile.spacing(0),
    textAlign: 'center',
  },
  details: {
    paddingLeft: themeMobile.spacing(3),
    margin: themeMobile.spacing(0)
  },
  footer: {
    paddingRight: themeMobile.spacing(4),
    paddingLeft: themeMobile.spacing(4),
    paddingTop: themeMobile.spacing(1),
    margin: themeMobile.spacing(0),
    textAlign: 'center',
    background: 'linear-gradient(#001C32, #001C32)',
    height: "80px",
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
    padding: themeMobile.spacing(1),
    margin: themeMobile.spacing(1),
    background: 'linear-gradient(#ff671d, #ff671d)',
  },
  spinner: {
     position: 'absolute',
     left: '50%',
     top: '50%',
     transform: 'translate(-50%, -50%)'
  },
  appIconContainer: {
    padding: themeMobile.spacing(0),
    marginTop: themeMobile.spacing(1),
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
    padding: themeMobile.spacing(0),
    marginTop: themeMobile.spacing(1),
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
    padding: themeMobile.spacing(0),
    marginTop: themeMobile.spacing(0),
    background: 'linear-gradient(#FAFAFF, #FAFAFF)',
    width: "20px",
    height: "30px",
    overflow: "hidden"
  },
  linkIcon: {
    margin: 'auto',
    height: "30px",
    width: '100%'
  },
  hr: {
    borderTop: "1px",
    solid: "#F0F0FA"
  }
})

export { themeMobile, themeStylesMobile }
