import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

// Store stuff
export interface ApplicationState {
  info: InfoPageProps
  fileServer: ServerProps
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

// Server props
export interface Server {
  configFile: string
  info: string
  url: string
}

export interface ServerProps extends PayloadProps {
  data: Server
}

// MiniDapp stuff
export interface MiniData {
  dir: string
  miniDapp: string
  conf: string
  icon: string
}

export interface MiniDappProps extends PayloadProps {
    data: Array<MiniData>
}

// Action types
export const enum ServerActionTypes {
  SERVER_SUCCESS = '@@ServerActionTypes/SERVER_SUCCESS',
  SERVER_FAILURE = '@@ServerActionTypes/SERVER_FAILURE'
}

export const enum MiniDappActionTypes {
  MINIDAPP_SUCCESS = '@@MiniDappActionTypes/MINIDAPP_SUCCESS',
  MINIDAPP_FAILURE = '@@MiniDappActionTypes/MINIDAPP_FAILURE'
}
