import { ModalType, OPEN_MODAL, CLOSE_MODAL, ModalsActions } from './types';

export function openModal(type: ModalType, childProps: any, modalProps?: any): ModalsActions {
  return {
    type: OPEN_MODAL,
    payload: {
      type,
      childProps,
      modalProps,
    },
  };
}

export function closeModal(): ModalsActions {
  return {
    type: CLOSE_MODAL,
  };
}
