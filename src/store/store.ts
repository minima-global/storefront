import { combineReducers, Reducer, Store, createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import { ApplicationState, ActionProps } from './types'

import { reducer as infoReducer } from './app/reducers/info/reducer'
import { reducer as serversReducer } from './app/reducers/servers/reducer'
import { reducer as miniDappsReducer } from './app/reducers/miniDapps/reducer'

export const rootReducer: Reducer<ApplicationState, ActionProps> = combineReducers<ApplicationState, ActionProps>({
  info: infoReducer,
  fileServers: serversReducer,  
  miniDapps: miniDappsReducer
})

export function configureStore(
  initialState: ApplicationState
): Store<ApplicationState, ActionProps> {

  // create the redux-saga middleware
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(ReduxThunk)
  )

  return store
}
