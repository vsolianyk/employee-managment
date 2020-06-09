import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: 'calc(100vh - 64px)',
    },
    container: {
      height: '100%',
    },
    videoWrapper: {
      height: '100%',
      width: '100%',
      overflow: 'hidden',
    },
    video: {
      width: '100%',
    },
    loginWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '400px',
      height: '200px',
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    googleLoginWrapper: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
