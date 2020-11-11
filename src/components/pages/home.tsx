import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Spinner from 'react-spinner-material'

//import Markdown from 'react-markdown'
import { SimpleArrayRenderer } from '../simpleRenderer'
import { Home as HomeConfig, Misc, Local } from '../../config'

import { themeStyles } from '../../styles'

import {
  ApplicationState,
  AppDispatch,
  ServerProps,
  MiniDappProps,
  MiniData
} from '../../store'

// @ts-ignore
import { Minima } from '../../store/app/blockchain/minima'

//import { getMiniDapps } from '../../store/app/fileServer/actions'

interface HomeStateProps {
  miniDapps: MiniDappProps
}

/*interface HomeDispatchProps {
  getDapps: () => void
}*/

//type Props = HomeStateProps & HomeDispatchProps
type Props = HomeStateProps

const get = (props: Props) => {

  const classes = themeStyles()
  const noServers = (
    <>
      <Paper className={classes.home} square={true}>
        <Grid container>
          {HomeConfig.noServers}
        </Grid>
      </Paper>
    </>
  )

  let isFirstRun = useRef(true)
  const [info, setInfo] = useState([noServers] as any[])
  const [isLoading, setLoading] = useState(false)

  let history = useHistory()

  const compare = (a: MiniData, b: MiniData) => {

    const thisA = a.server.url
    const thisB = b.server.url
    if (thisA < thisB) {
      return -1;
    }
    if (thisA > thisB) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  const unique = (elements: MiniData[]): MiniData[] => {

    const uniqElements = elements.reduce((element: MiniData[], current: MiniData) => {

      const x = element.find( (item: MiniData) => {
        return ( item.dir === current.dir &&  item.conf.name === current.conf.name )
      })

      if (!x) {
        return element.concat([current])
      } else {
        return element
      }
    }, [])

    return uniqElements
  }

  const setDappInfo = async () => {

    //console.log("here with stuff: ", props.miniDapps)
    // Sort the dapps so store items appear under their store headings
    props.miniDapps.data.sort(compare)
    // Ensure no duplicates
    const elements = unique(props.miniDapps.data)
    //console.log("and with uniq stuff: ", elements)

    let dappInfo: any[] = []
    let content: any[] = []
    let storeName = ""

    for ( var i = 0; i < elements.length; i++) {

      const thisStoreName = elements[i].server.info
      const thisStoreURL = elements[i].server.url
      if( thisStoreName != storeName) {
        const title = (
          <>
            <Grid item justify="center" alignItems="center" xs={12}>
              <Grid>
                <h3>
                  {thisStoreName}
                </h3>
                <h4>
                  {HomeConfig.address}: {thisStoreURL}
                </h4>
              </Grid>
            </Grid>
          </>
        )
        content.push(title)
        storeName = thisStoreName
      }

      const dir = elements[i].dir
      const iconURL = elements[i].server.url + dir + "/" + elements[i].icon
      const pathAddDapp = `${Local.addDapp}/${dir}`

      const confJson = {
        name: elements[i].conf.name,
        description: elements[i].conf.description,
        category: elements[i].conf.category
      }

      const dappHTML = (
        <React.Fragment key={dir}>
          <Grid item justify="center" alignItems="center" xs={6} sm={2}>
            <button onClick={() => history.push(`${pathAddDapp}`)}>
              <img src={iconURL} width={Misc.homeIconSize} height={Misc.homeIconSize} />
             </button>
          </Grid>
          <Grid item justify="center" alignItems="center" xs={6} sm={4}>
           <b>{confJson.name}</b> - {confJson.description}<br/>
           <i>{confJson.category}</i>
          </Grid>
        </React.Fragment>
      )
      content.push(dappHTML)
    }

    const dapps = (
      <>
        <Paper className={classes.home} square={true}>
          <Grid container>
            {content}
          </Grid>
        </Paper>
      </>
    )

    dappInfo.push(dapps)
    setInfo(dappInfo)
    setTimeout(function(){ setLoading(false) }, Misc.homeSpinnerDelay)

  }

  useEffect(() => {

    setLoading(true)
    //console.log("miniDapps: ", props.miniDapps.data)
    if ( props.miniDapps.data.length ) {

      setDappInfo()

    } else {

      setLoading(false)
    }

  }, [props.miniDapps])

  return (
    <>
      <h2>{HomeConfig.heading}</h2>
      <hr />
      <p>
          {isLoading ?
          <div className={classes.spinner}>
            <Spinner radius={40} color={"#ff671d"} stroke={5} visible={isLoading} />
          </div> : <SimpleArrayRenderer data={info} /> }
      </p>
    </>
  )
}

const mapStateToProps = (state: ApplicationState): HomeStateProps => {

    const dapps = state.miniDapps as MiniDappProps
    return {
      miniDapps: dapps
    }
}

/*
const mapDispatchToProps = (dispatch: AppDispatch): HomeDispatchProps => {
 return {
   getDapps: () => dispatch(getMiniDapps())
 }
}
*/

export const Home = connect<HomeStateProps, {}, {}, ApplicationState>(
  mapStateToProps
)(get)
