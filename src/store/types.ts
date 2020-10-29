import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

// Store stuff
export interface ApplicationState {
  info: InfoPageProps
  fileServer: ServerProps
  tx: TransactionProps
  data: GetProps
}

export interface PayloadProps {
  data: object
}

export interface ActionProps extends Action {
  type: string
  payload: PayloadProps
}

export type AppDispatch = ThunkDispatch<ApplicationState, any, ActionProps>

// Info (about etc.) stuff
export const enum InfoTypes {
  HOME = "home",
  ABOUT = "about",
  HELP = "help",
  FAQ = "faq",
  CONTACT = "contact"
}

export interface InfoPageProps extends PayloadProps {
  data: InfoData
}

export interface InfoProps {
  title: string
  data: string
}

export interface InfoData {
  home: InfoProps
  about: InfoProps
  help: InfoProps
  faq: InfoProps
  contact: InfoProps
}

// Server props
export interface Server {
  configFile: string
  info: string
  url: string
  port: string
}

export interface ServerProps extends PayloadProps {
  data: Server
}

// Get stuff
export interface Data {
  info: string
}

export interface GetProps extends PayloadProps {
    data: Array<Data>
}

//Tx stuff
export interface TxData {
  txId: string
  summary: string
  time: string
}

export interface TransactionProps extends PayloadProps {
  data: TxData
}

// Action types
export const enum ServerActionTypes {
  SERVER_SUCCESS = '@@ServerActionTypes/SERVER_SUCCESS',
  SERVER_FAILURE = '@@ServerActionTypes/SERVER_FAILURE'
}

export const enum TransactionActionTypes {
  TRANSACTION_INIT = '@@TransactionActionTypes/TRANSACTION_INIT',
  TRANSACTION_PENDING = '@@TransactionActionTypes/TRANSACTION_PENDING',
  TRANSACTION_SUCCESS = '@@TransactionActionTypes/TRANSACTION_SUCCESS',
  TRANSACTION_FAILURE = '@@TransactionActionTypes/TRANSACTION_FAILURE'
}

export const enum GetActionTypes {
  GET_INIT = '@@GetActionTypes/GET_INIT',
  GET_SUCCESS = '@@GetActionTypes/GET_SUCCESS',
  GET_FAILURE = '@@GetActionTypes/GET_FAILURE'
}
