import { connect } from 'react-redux';
import Login from './Login';
import { AppState } from './../../../reducers/';

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.account.isAuthenticated,
  error: state.account.error,
});

export default connect(
  mapStateToProps,
)(Login);
