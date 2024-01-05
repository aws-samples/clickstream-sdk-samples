/**
 * Created by Leon<silenceace@gmail.com> at 2022-02-25 15:45:37.
 * Last modified at 2022-09-25 16:13:58
 */

import {
  APP_NOTIFICATION_PULL,
  APP_LOGOUT,
  APP_NOTIFICATION_LATEST,
  APP_NOTIFICATION_REMOVE,
  Action,
  IState
} from '../types'
const INITIAL_STATE: IState.NotificationState = {
  refreshing: false,
  unread: 0
}
export default (state: IState.NotificationState = INITIAL_STATE, action: Action): IState.NotificationState => {
  switch (action.type) {
    case APP_NOTIFICATION_PULL:
      return { ...state, list: undefined, refreshing: true }
    case APP_NOTIFICATION_LATEST:
      return { ...state, list: action.payload, refreshing: false }
    case APP_NOTIFICATION_REMOVE:
      return { ...state, list: action.payload, refreshing: false }
    case APP_LOGOUT:
      return { ...INITIAL_STATE }
    default:
      return state
  }
}
