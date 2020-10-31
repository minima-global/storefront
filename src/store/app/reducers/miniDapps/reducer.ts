import { ActionProps, MiniDappActionTypes, MiniDappProps } from '../../../types'

const initialState: MiniDappProps = {
  data: []
}

export const reducer = (state: MiniDappProps = initialState, action: ActionProps): MiniDappProps => {

  switch (action.type) {
    case MiniDappActionTypes.MINIDAPP_FAILURE: {
      const data = (action.payload as MiniDappProps)
      return data
    }
    case MiniDappActionTypes.MINIDAPP_SUCCESS: {
      const data = (action.payload as MiniDappProps)
      return {...state, ...data}
    }
    default:
      return state
  }
}
