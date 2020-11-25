import {
    ActionProps,
    MiniDappActionTypes,
    MiniDappProps,
    MiniDapps,
    MiniData
} from '../../../types'

const initialState: MiniDappProps = {
    data: {
      numListed: 0,
      numAvailable: 0,
      miniDapps: []
    }
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
        data: {
            numListed: state.data.numListed + 1,
            numAvailable: state.data.numAvailable,
            miniDapps: [...state.data.miniDapps, miniDappData]
        }
      }
    }
    case MiniDappActionTypes.MINIDAPP_TOTAL: {
      const dappsData = (action.payload.data as MiniDapps)
      const total = dappsData.numAvailable
      return {
        ...state,
        data: {
          ...state.data,
          numAvailable: total
        }
      }
    }
    case MiniDappActionTypes.MINIDAPP_COUNT: {
      return {
        ...state,
        data: {
          ...state.data,
          numAvailable: state.data.numAvailable + 1
        }
      }
    }
    default:
      return state
  }
}
