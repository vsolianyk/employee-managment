import React from 'react';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { WithStyles } from '@material-ui/core/styles/withStyles';

import ConfirmationDialogStyles from './ConfirmationDialogStyles';

export interface OwnProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onClose?: () => void;
}
type Props = OwnProps & WithStyles<typeof ConfirmationDialogStyles>;

const ConfirmationDialog: React.FunctionComponent<Props> = ({
  title,
  description,
  onConfirm,
  onClose = () => {},
}: Props) => {
  return (
    <React.Fragment>
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}

export default ConfirmationDialog;
