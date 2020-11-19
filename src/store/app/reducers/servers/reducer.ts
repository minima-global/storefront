import { ActionProps, ServerActionTypes, ServerProps, Servers, Server } from '../../../types'

const initialState: ServerProps = {
  data: {
    numAvailable: 0,
    numLoaded: 0,
    servers: []
  }
}

export const reducer = (state: ServerProps = initialState, action: ActionProps): ServerProps => {

  switch (action.type) {
    case ServerActionTypes.SERVER_INIT: {
      return initialState
    }
    case ServerActionTypes.SERVER_FAILURE: {
      return state
    }
    case ServerActionTypes.SERVER_SUCCESS: {
      const data = (action.payload as ServerProps)
      return {...state, ...data}
    }
    case ServerActionTypes.SERVER_TOTAL: {
      const serverData = (action.payload.data as Servers)
      const total = serverData.numAvailable
      return {
        ...state,
        data: {
          ...state.data,
          numAvailable: total
        }
      }
    }
    case ServerActionTypes.SERVER_LOADED: {
      const serverData = (action.payload.data as Servers)
      const loaded = serverData.numLoaded
      return {
        ...state,
        data: {
          ...state.data,
          numLoaded: loaded
        }
      }
    }
    case ServerActionTypes.SERVER_DAPPSUCCESS: {
      const server = (action.payload.data as Server)
      return {
        ...state,
        data: {
          ...state.data,
          servers: [ ...state.data.servers, server ]
        }
      }
    }
    default:
      return state
  }
}
