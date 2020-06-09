import React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Button from '@material-ui/core/Button';

import config from '../../../../config';

import { GoogleIcon } from './googleIcon';

export const styles = (theme: Theme) =>
  createStyles({
    btnText: {
      paddingLeft: '5px',
      color: theme.palette.primary.dark,
    },
  });

interface GProps extends WithStyles<typeof styles> {}

class GoogleLoginButton extends React.Component<GProps, {}> {
  render() {
    const { classes } = this.props;

    return (
      <Button
        variant="outlined"
        color="secondary"
        href={`${config.baseUrl}/auth`}
      >
        <GoogleIcon />
        <span className={classes.btnText}>Google Login</span>
      </Button>
    );
  }
}

export default withStyles(styles)(GoogleLoginButton);
