import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Loader from '../loader/Loader';
import { hasRole } from './../../utils';
import { arrayOfRoles, routes } from './../../routes';
import { UserProfile } from './../../../reducers/login/types';

interface Props {
  component: React.ReactType;
  isAuthenticated: boolean;
  path?: string;
  getUserProfile: () => void;
  profile: UserProfile | null;
  isLoading: boolean;
}

export class PrivateRoute extends React.Component<Props> {
  componentDidMount() {
    this.props.getUserProfile();
  }

  render() {
    const {
      component: Component,
      isAuthenticated,
      isLoading,
      profile,
      ...rest
    } = this.props;

    if (isLoading) {
      return <Loader />;
    }

    return (
      <Route
        {...rest}
        exact
        render={props =>
          isAuthenticated && (profile && hasRole(profile.role, arrayOfRoles)) ? (
            <Switch>
              {routes.map((route) => {
                if (hasRole(profile.role, route.roles)) {
                  return (
                    <Route
                      {...route}
                      key={route.path}
                      path={`${route.path}`}
                      component={route.component}
                    />
                  );
                }
              })}
            </Switch>
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
}
