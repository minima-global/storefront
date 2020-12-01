import {
    ActionProps,
    InstalledActionTypes,
    InstalledDappProps,
    InstalledDapps,
    InstalledDapp
} from '../../../types'

const initialState: InstalledDappProps = {
    data: {
      num: 0,
      installedDapps: []
    }
}

export const reducer = (state: InstalledDappProps = initialState, action: ActionProps): InstalledDappProps => {

  //console.log("here with: ", action)
  switch (action.type) {
    case InstalledActionTypes.INSTALLED_INIT: {
      return initialState
    }
    case InstalledActionTypes.INSTALLED_FAILURE: {
      return state
    }
    case InstalledActionTypes.INSTALLED_SUCCESS: {
      const installedDappData = (action.payload.data as InstalledDapp)
      return {
        ...state,
        data: {
            num: state.data.num + 1,
            installedDapps: [...state.data.installedDapps, installedDappData]
        }
      }
    }
    case InstalledActionTypes.INSTALLED_TOTAL: {
      const dappsData = (action.payload.data as InstalledDapps)
      const total = dappsData.num
      return {
        ...state,
        data: {
          ...state.data,
          num: total
        }
      }
    }
    default:
      return state
  }
}
