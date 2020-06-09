import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';

import { AppState } from './../../../reducers';
import { UsersActions } from './../../../reducers/users/types';
import { SortablePageIn } from '../../../models/SortablePageIn';
import { openModal } from '../../../reducers/modals/modalsActions';
import { CONFIRMATION_MODAL, ModalsActions, USER_MODAL } from '../../../reducers/modals/types';
import { deleteUser, getUsers, setUsersQueryParamsUsers } from '../../../reducers/users/usersActions';
import { OwnProps as ConfirmationModalProps } from '../../modals/confirmationDialog/ConfirmationDialog';
import Users from './Users';
import UsersStyles from './UsersStyles';
import { OwnProps as UserModalProps } from './userModal/UserModal';

const mapStateToProps = (state: AppState) => {
  return {
    usersData: state.users.data,
    error: state.users.error,
    isLoading: state.users.isLoading,
    queryParams: state.users.params,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<UsersActions|ModalsActions>) => ({
  getUsers: () => dispatch(getUsers()),
  updateQueryParams: (query: SortablePageIn) => dispatch(setUsersQueryParamsUsers(query)),
  deleteUser: (id: string) => dispatch(deleteUser(id)),

  openUserModal: (modalProps: UserModalProps) => dispatch(openModal(USER_MODAL, modalProps)),
  openConfirmationModal: (modalProps: ConfirmationModalProps) => dispatch(openModal(CONFIRMATION_MODAL, modalProps)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(UsersStyles)(Users));
