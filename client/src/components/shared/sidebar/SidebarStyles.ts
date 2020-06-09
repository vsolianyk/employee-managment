import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const styles = (theme: Theme) =>
  createStyles({
    sidebar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      padding: '20px 20px',
    },
    avatar: {
      width: '80px',
      height: '80px',
      border: '2px solid #aaa',
    },
    segment: {
      alignSelf: 'flex-start',
      display: 'flex',
      flexDirection: 'column',
      margin: '10px 0',
    },
    segmentHeader: {
      fontWeight: 'bold',
    },
  });

export default styles;
