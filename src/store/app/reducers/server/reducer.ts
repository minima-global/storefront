import { ActionProps, ServerActionTypes, ServerProps } from '../../../types'

const initialState: ServerProps = {
  data: {
    configFile: "",
    info: "",
    url: "",
    port: ""
  }
}

export const reducer = (state: ServerProps = initialState, action: ActionProps): ServerProps => {

  switch (action.type) {
    case ServerActionTypes.SERVER_FAILURE: {
      const data = (action.payload as ServerProps)
      return data
    }
    case ServerActionTypes.SERVER_SUCCESS: {
      const data = (action.payload as ServerProps)
      return {...state, ...data}
    }
    default:
      return state
  }
}
