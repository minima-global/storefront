import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { InfoTypes } from '../store/types'

import { Home, Info } from '../components/pages'
import { ServerSettings, AddDapp } from '../containers/pages'

import { Paths, Local } from '../config'

export const Content = () => {

    return (

      <Switch>

        <Route name={Paths.help} exact path={Local.help} render={() => <Info type={InfoTypes.HELP}/>} />
        <Route name={Paths.contact} exact path={Local.contact} render={() => <Info type={InfoTypes.CONTACT}/>} />
        <Route name={Paths.about} exact path={Local.about} render={() => <Info type={InfoTypes.ABOUT}/>} />

        <Route name={Paths.serverSettings} path={Local.serverSettings} render= {() => <ServerSettings />} />
        <Route name={Paths.addDappDir} exact path={Local.addDappDir} render= {() => <AddDapp />} />

        <Route name={Paths.home} path={Local.home} render= {() => <Home />} />

      </Switch>
    )
}
