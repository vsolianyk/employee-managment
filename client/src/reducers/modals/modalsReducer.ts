import {
  ModalsState,
  ModalsActions,
  OPEN_MODAL,
  CLOSE_MODAL,
  OpenModal,
} from './types';

const initialState: ModalsState = {
  isOpen: false,
  type: null,
  childProps: {},
  modalProps: {},
};

export function modals(
  state = initialState,
  action: ModalsActions,
): ModalsState {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        ...((action as OpenModal).payload),
      };
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
}
