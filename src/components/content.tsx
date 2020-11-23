import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { InfoTypes } from '../store/types'

import { Home, Info, Storefronts } from '../components/pages'
import { ServerSettings, AddDapp } from '../containers/pages'

import { Paths, Local } from '../config'

export const Content = () => {

    return (

      <Switch>

        <Route name={Paths.help} exact path={Local.help} render={() => <Info type={InfoTypes.HELP}/>} />
        <Route name={Paths.contact} exact path={Local.contact} render={() => <Info type={InfoTypes.CONTACT}/>} />
        <Route name={Paths.about} exact path={Local.about} render={() => <Info type={InfoTypes.ABOUT}/>} />

        <Route name={Paths.serverSettings} path={Local.serverSettings} render= {() => <ServerSettings />} />
        <Route name={Paths.addDappIndex} exact path={Local.addDappIndex} render= {() => <AddDapp />} />
        <Route name={Paths.showStoreDapps} exact path={Local.showStoreDapps} render= {() => <Storefronts />} />

        <Route name={Paths.home} path={Local.home} render= {() => <Home />} />

      </Switch>
    )
}
