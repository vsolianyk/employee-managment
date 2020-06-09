export const CONFIRMATION_MODAL = 'CONFIRMATION_MODAL';
export const USER_MODAL = 'USER_MODAL';
export const TEAM_MODAL = 'TEAM_MODAL';
export const EMPLOYEE_JOB_INFO_MODAL = 'EMPLOYEE_JOB_INFO_MODAL';

export type CONFIRMATION_MODAL = typeof CONFIRMATION_MODAL;
export type USER_MODAL = typeof USER_MODAL;
export type TEAM_MODAL = typeof TEAM_MODAL;
export type EMPLOYEE_JOB_INFO_MODAL = typeof EMPLOYEE_JOB_INFO_MODAL;

export type ModalType =
  CONFIRMATION_MODAL |
  USER_MODAL |
  TEAM_MODAL |
  EMPLOYEE_JOB_INFO_MODAL;

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export type OPEN_MODAL = typeof OPEN_MODAL;
export type CLOSE_MODAL = typeof CLOSE_MODAL;

export interface OpenModal {
  type: OPEN_MODAL;
  payload: {
    type: ModalType;
    childProps: any;
    modalProps?: any;
  };
}

export interface CloseModal {
  type: CLOSE_MODAL;
}

export type ModalsActions =
  | OpenModal
  | CloseModal;

export interface ModalsState {
  isOpen: boolean;
  type: ModalType;
  childProps: any;
  modalProps?: any;
}
