import { NotificationsActions, ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './types';
import { Notification } from '../../models/Notification';

export function addNotification(data: Notification): NotificationsActions {
  return {
    type: ADD_NOTIFICATION,
    payload: data,
  };
}

export function removeNotification(index: number): NotificationsActions {
  return {
    type: REMOVE_NOTIFICATION,
    payload: index,
  };
}
