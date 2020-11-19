import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

// Store stuff
export interface ApplicationState {
  info: InfoPageProps
  fileServers: ServerProps
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

// MiniDapp Servers
export interface MiniData {
  dir: string
  miniDapp: string
  conf: {
    name: string,
    description: string,
    category: string
  }
  icon: string
}

export interface Server {
  title: string
  url: string
  icon: string
  info: string
  isOnline: boolean
  dapps: Array<MiniData>
}

export interface Servers {
  numAvailable: number
  numLoaded: number
  servers: Array<Server>
}

export interface ServerProps extends PayloadProps {
  data: Servers
}

// Action types
export const enum ServerActionTypes {
  SERVER_INIT = '@@ServerActionTypes/SERVER_INIT',
  SERVER_SUCCESS = '@@ServerActionTypes/SERVER_SUCCESS',
  SERVER_FAILURE = '@@ServerActionTypes/SERVER_FAILURE',
  MINIDAPP_SUCCESS = '@@ServerActionTypes/MINIDAPP_SUCCESS',
  MINIDAPP_FAILURE = '@@ServerActionTypes/MINIDAPP_FAILURE'
}
