import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const styles = (theme: Theme) =>
  createStyles({
    profile: {
      paddingTop: theme.spacing(3),
    },
    tabContainer: {
      padding: '20px 20px',
    },
  });

export default styles;
