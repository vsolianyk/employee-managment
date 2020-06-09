import React from 'react';
import { Redirect } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { styles } from './LoginStyles';
import GoogleLogin from './GoogleLoginButton/GoogleLoginButton';

interface Props extends WithStyles<typeof styles> {
  isAuthenticated: boolean;
  error: Error | null;
  location: any;
  history: any;
}
const Login: React.FunctionComponent<Props> = ({ classes, isAuthenticated, error, location }: Props) => {

  if (isAuthenticated && location.state === undefined) {
    return <Redirect to="/" />;
  }

  const onPlayEnd = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    (e.target as HTMLVideoElement).load();
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.container}>
        <Grid item xs={6} className={classes.videoWrapper}>
          <video autoPlay muted id="myVideo" className={classes.video} onEnded={onPlayEnd}>
            <source src="https://trinetix.net/video/compressed0.mp4" type="video/mp4" />
          </video>
        </Grid>
        <Grid item xs={6} className={classes.loginWrapper}>
          <Paper className={classes.paper} elevation={1}>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <div className={classes.googleLoginWrapper}>
              <GoogleLogin />
            </div>
            {error && <span>{error}</span>}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Login);
