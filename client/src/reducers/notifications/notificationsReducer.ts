import { Notification } from '../../models/Notification';
import {
  NotificationsActions,
  NotificationsState,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from './types';

const initialState: NotificationsState = [];

export function notifications(
  state = initialState,
  action: NotificationsActions,
): NotificationsState {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action.payload];
    case REMOVE_NOTIFICATION:
      return [...state.slice(0, action.payload), ...state.slice(action.payload + 1)];
    default:
      return state;
  }
}
