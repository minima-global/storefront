import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

// Store stuff
export interface ApplicationState {
  info: InfoPageProps
  fileServers: ServerProps
  miniDapps: MiniDappProps
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

// Servers
export interface Server {
  index: number
  title: string
  url: string
  icon: string
  info: string
  isOnline: boolean
}

export interface Servers {
  numAvailable: number
  servers: Array<Server>
}

export interface ServerProps extends PayloadProps {
  data: Servers
}

// MiniDapps
export interface MiniData {
  serverIndex: number
  dir: string
  miniDapp: string
  conf: {
    name: string,
    description: string,
    category: string
  }
  icon: string
}

export interface MiniDapps {
  numListed: number
  numAvailable: number
  miniDapps: Array<MiniData>
}

export interface MiniDappProps extends PayloadProps {
  data: MiniDapps
}

// Action types
export const enum ServerActionTypes {
  SERVER_INIT = '@@ServerActionTypes/SERVER_INIT',
  SERVER_SUCCESS = '@@ServerActionTypes/SERVER_SUCCESS',
  SERVER_FAILURE = '@@ServerActionTypes/SERVER_FAILURE',
  SERVER_TOTAL = '@@ServerActionTypes/SERVER_TOTAL'
}

export const enum MiniDappActionTypes {
  MINIDAPP_INIT = '@@MiniDappActionTypes/MINIDAPP_INIT',
  MINIDAPP_SUCCESS = '@@MiniDappActionTypes/MINIDAPP_SUCCESS',
  MINIDAPP_FAILURE = '@@MiniDappActionTypes/MINIDAPP_FAILURE',
  MINIDAPP_ADDAVAILABLE = '@@MiniDappActionTypes/MINIDAPP_ADDAVAILABLE'
}
