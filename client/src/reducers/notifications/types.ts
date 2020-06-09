import { Notification } from '../../models/Notification';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export type ADD_NOTIFICATION = typeof ADD_NOTIFICATION;
export type REMOVE_NOTIFICATION = typeof REMOVE_NOTIFICATION;

export interface AddNotification {
  type: ADD_NOTIFICATION;
  payload: Notification;
}

export interface RemoveNotification {
  type: REMOVE_NOTIFICATION;
  payload: number;
}

export type NotificationsActions =
  | AddNotification
  | RemoveNotification;

export type NotificationsState = Notification[];
