import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';

import { AppState } from './../../../reducers/';
import { removeNotification } from '../../../reducers/notifications/notificationsActions';
import { NotificationsActions } from '../../../reducers/notifications/types';
import Notifications, { DispatchProps, StateProps } from './Notifications';
import NotificationsStyles from './NotificationsStyles';

const mapStateToProps = (state: AppState): StateProps => {
  return {
    notifications: state.notifications,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<NotificationsActions>): DispatchProps => ({
  onClose: (index: number) => dispatch(removeNotification(index)),
});

export default connect<StateProps, DispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(NotificationsStyles)(Notifications));
