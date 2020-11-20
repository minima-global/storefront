import { ActionProps, ServerActionTypes, ServerProps, Servers, Server } from '../../../types'

const initialState: ServerProps = {
  data: {
    numAvailable: 0,
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
      const serverData = (action.payload.data as Server)
      return {
        ...state,
        data: {
          ...state.data,
          servers: [...state.data.servers, serverData]
        }
      }
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
    default:
      return state
  }
}
