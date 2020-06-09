import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import AppNav from './AppNav';
import { logout } from './../../../reducers/login/loginActions';
import { AccountActions } from './../../../reducers/login/types';
import { AppState } from './../../../reducers/';

const mapStateToProps = (state: AppState) => {
  return {
    isAuthenticated: state.account.isAuthenticated,
    profile: state.account.data,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AccountActions>) => ({
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppNav);
