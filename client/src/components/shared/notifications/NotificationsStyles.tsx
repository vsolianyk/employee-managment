import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

import { green } from '@material-ui/core/colors';

const styles = (theme: Theme) =>
  createStyles({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.dark,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      fontSize: '20px',
      opacity: 0.9,
      marginRight: theme.spacing(1),
    }
  });

export default styles;
