import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import { WithStyles } from '@material-ui/core/styles/withStyles';

import { CONFIRMATION_MODAL, EMPLOYEE_JOB_INFO_MODAL, ModalType, TEAM_MODAL, USER_MODAL } from '../../reducers/modals/types';
import EmployeeEditJobInfoModal from '../pages/employees/employeeEditJobInfo';
import TeamModal from '../pages/teams/teamModal';
import UserModal from '../pages/users/userModal';
import ConfirmationDialog from './confirmationDialog';

export const ModalComponents = {
  [CONFIRMATION_MODAL]: ConfirmationDialog,
  [USER_MODAL]: UserModal,
  [TEAM_MODAL]: TeamModal,
  [EMPLOYEE_JOB_INFO_MODAL]: EmployeeEditJobInfoModal,
};

export interface StateProps {
  isOpen: boolean;
  modalType: ModalType;
  modalProps: any;
  childProps: any;
}

export interface DispatchProps {
  closeModal: () => void;
}

type Props = StateProps & DispatchProps & WithStyles;

const ModalsContainer = ({
    isOpen,
    modalType,
    modalProps = {},
    childProps = {},
    closeModal,
}: Props) => {

  const ModalComponent = ModalComponents[modalType] as any;

  if (!isOpen || !modalType || !ModalComponent) {
    return null;
  }

  const handleClose = () => {
    closeModal();
    childProps && childProps.onClose && childProps.onClose();
  };

  return (
    <Dialog {...modalProps} open={isOpen}>
      <ModalComponent {...childProps} onClose={handleClose}/>
    </Dialog>
  );
};

export default ModalsContainer;
