import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxSaga from 'redux-saga';

import { composeWithDevTools } from 'redux-devtools-extension';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withRoot from '../withRoot';
import { reducer } from './../reducers/';
import saga from './../saga';
import PrivateRouteContainer from './shared/privateRoute';
import AppNav from './shared/appNav';
import Login from './pages/login';
import ErrorPage from './pages/error/Error';
import ModalsContainer from './modals';
import NotificationsContainer from './shared/notifications';

const sagaMiddleware = reduxSaga();

const enhancer = composeWithDevTools(
  applyMiddleware(sagaMiddleware),
);
export const store = createStore(reducer, enhancer);

sagaMiddleware.run(saga);

export const styles = (theme: Theme) =>
  createStyles({
    mainContainer: {},
  });

interface AppProps extends WithStyles<typeof styles> {}

const App = ({ classes }: AppProps): JSX.Element => (
  <Provider store={store}>
    <Router>
      <AppNav/>
      <ModalsContainer />
      <NotificationsContainer />
      <div className={classes.mainContainer}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/error/:type" component={ErrorPage} />
          <Route path="/" component={PrivateRouteContainer} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default withStyles(styles)(withRoot(App));
