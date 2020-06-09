import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const styles = (theme: Theme) =>
  createStyles({
    profile: {
      backgroundColor: '#f8f8f8',
    },
    avatar: {
      width: '60px',
      height: '60px',
      border: '2px solid white',
    },
  });

export default styles;
