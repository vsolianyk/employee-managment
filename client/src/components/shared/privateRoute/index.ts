import { connect } from 'react-redux';
import { getUserProfile } from './../../../reducers/login/loginActions';
import { AccountActions } from './../../../reducers/login/types';
import { Dispatch } from 'redux';
import { PrivateRoute } from './PrivateRoute';
import { AppState } from './../../../reducers/';

const mapStateToProps = (state: AppState) => {
  return {
    isLoading: state.account.isLoading,
    isAuthenticated: state.account.isAuthenticated,
    profile: state.account.data,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AccountActions>) => ({
  getUserProfile: () => dispatch(getUserProfile()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateRoute);
