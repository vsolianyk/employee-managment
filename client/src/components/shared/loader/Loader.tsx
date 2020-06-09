import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './LoaderStyles';

interface Props extends WithStyles<typeof styles> {
  title?: string;
}

const Loader: React.FunctionComponent<Props> = ({ classes, title }: Props) => (
  <div className={classes.root}>
    <p>{title || 'Loading!'}</p>
    <CircularProgress />
  </div>
);

export default withStyles(styles)(Loader);
