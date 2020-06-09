import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import UiLink from '@material-ui/core/Link';
import AccountCircle from '@material-ui/icons/AccountCircle';
import config from '../../../config';
import { routes } from './../../routes';
import { styles } from './AppNavStyles';
import { hasRole } from './../../utils';
import { UserProfile } from './../../../reducers/login/types';
import { ReactComponent as Logo } from './logo.svg';

interface Props extends WithStyles<typeof styles> {
  logout: () => void;
  profile: UserProfile | null;
  isAuthenticated: boolean;
}

const AppNav: React.FunctionComponent<Props> = ({
  classes,
  logout,
  profile,
  isAuthenticated,
}: Props) => {

  const [anchorEl, setAnchorEl] = useState();

  const isMenuOpen = Boolean(anchorEl);

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleProfileMenuOpen(event: React.MouseEvent) {
    setAnchorEl(event.currentTarget);
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/profile" className={classes.menuLink}>Profile</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <UiLink
          href={`${config.baseUrl}/logout`}
          color="inherit"
          onClick={logout}
        >
          Logout
        </UiLink>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="static" color="primary">
      <Toolbar className={classes.toolbar}>
        <Link to="/" className={classes.logoLink}>
          <Logo />
        </Link>
        {isAuthenticated && profile && <div className={classes.mainMenu}>
            {routes
            .filter(r => r.isForNav)
            .map(
              route =>
                hasRole(profile.role, route.roles) && (
                  <Button
                    key={route.path}
                    color="inherit"
                  >
                    <Link to={route.path} className={classes.menuLink}>
                      {route.name}
                    </Link>
                  </Button>
                ),
            )}
        </div>}
        {isAuthenticated && profile && <IconButton
          aria-owns={isMenuOpen ? 'material-appbar' : undefined}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
          className={classes.userMenuButton}
        >
          <AccountCircle />
        </IconButton>}
      </Toolbar>
      {renderMenu}
    </AppBar>
  );
};

export default withStyles(styles)(AppNav);
