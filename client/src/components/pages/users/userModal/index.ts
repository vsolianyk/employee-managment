import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { User } from '../../../../models/User';
import { AppState } from './../../../../reducers';
import { UsersActions } from './../../../../reducers/users/types';
import { ModalsActions } from '../../../../reducers/modals/types';
import { addUser, updateUser } from '../../../../reducers/users/usersActions';
import UserModal, { OwnProps } from './UserModal';

const mapStateToProps = (state: AppState) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<UsersActions|ModalsActions>, ownProps: OwnProps) => ({
  onSave: (data: User) => dispatch(ownProps.user._id ? updateUser(data) : addUser(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserModal);
