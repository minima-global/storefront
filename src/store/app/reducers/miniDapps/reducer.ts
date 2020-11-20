import { ActionProps, MiniDappActionTypes, MiniDappProps, MiniData } from '../../../types'

const initialState: MiniDappProps = {
  data: []
}

export const reducer = (state: MiniDappProps = initialState, action: ActionProps): MiniDappProps => {

  //console.log("here with: ", action)
  switch (action.type) {
    case MiniDappActionTypes.MINIDAPP_INIT: {
      return initialState
    }
    case MiniDappActionTypes.MINIDAPP_FAILURE: {
      return state
    }
    case MiniDappActionTypes.MINIDAPP_SUCCESS: {
      const miniDappData = (action.payload.data as MiniData)
      return {
        ...state,
        data: [...state.data, miniDappData]
      }
    }
    default:
      return state
  }
}
