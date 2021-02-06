import React from 'react'
import { render } from "react-dom"

// @ts-ignore
import * as serviceWorker from './serviceWorker'

import { configureStore } from '../store'
import Root from './root'

const initialState = (window as any).initialReduxState
const store = configureStore(initialState)

render(<Root store={store}/>, document.getElementById('root'))
