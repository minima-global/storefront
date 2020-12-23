import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

// Store stuff
export interface ApplicationState {
  info: InfoPageProps
  fileServers: ServerProps
  miniDapps: MiniDappProps
  installedDapps: InstalledDappProps
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
  title: string
  url: string
  icon: string
  description: string
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
export interface InstalledDapp {
  uid: string
  services: Array<string>
}

export interface InstalledDapps {
  num: number
  installedDapps: Array<InstalledDapp>
}

export interface InstalledDappProps extends PayloadProps {
  data: InstalledDapps
}

// to be installed
export interface MiniData {
  serverURL: string
  dir: string
  miniDapp: string
  conf: {
    name: string,
  	version: string,
  	headline: string,
    description: string,
    category: string
  }
  icon: string
  isOnline: boolean
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
  MINIDAPP_TOTAL = '@@MiniDappActionTypes/MINIDAPP_TOTAL',
  MINIDAPP_COUNT = '@@MiniDappActionTypes/MINIDAPP_COUNT'
}

export const enum InstalledActionTypes {
  INSTALLED_INIT = '@@InstalledActionTypes/INSTALLED_INIT',
  INSTALLED_SUCCESS = '@@InstalledActionTypes/INSTALLED_SUCCESS',
  INSTALLED_FAILURE = '@@InstalledActionTypes/INSTALLED_FAILURE',
  INSTALLED_TOTAL = '@@InstalledActionTypes/INSTALLED_TOTAL'
}
