import { ActionProps, ServerActionTypes, ServerProps, Server } from '../../../types'

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
    default:
      return state
  }
}
