import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
    },
    logoLink: {
      flex: '0 0 auto',
      marginRight: '5%',
    },
    mainMenu: {
      flex: '1 1 auto',
    },
    menuLink: {
      textDecoration: 'none',
      color: 'inherit',
    },
    userMenuButton: {
      flex: '0 0 auto',
    },
  });
