import React from 'react';

import { WithStyles } from '@material-ui/core/styles/withStyles';

import { Notification } from '../../../models/Notification';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Clear';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import { SnackbarContent } from '@material-ui/core';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

export interface StateProps {
  notifications: Notification[];
}

export interface DispatchProps {
  onClose: (index: number) => void;
}

type Props = StateProps & DispatchProps & WithStyles;

const Notifications: React.FunctionComponent<Props> = ({
  notifications,
  onClose,
  classes,
}: Props) => {
  console.log(notifications);

  const handleClose = (index: number) => {
    onClose(index);
  };

  return (
    <div>
      {notifications.map((item, index) => {
        const Icon = variantIcon[item.type];
        return (
          <Snackbar
            key={`notification-${index}`}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open
            onClose={() => handleClose(index)}
          >
            <SnackbarContent
              className={classes[item.type]}
              message={
                <span id="client-snackbar" className={classes.message}>
                  <Icon className={classes.icon}/>
                  {item.message}
                </span>
              }
              aria-describedby="message-id"
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={() => handleClose(index)}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
          </Snackbar>
        );
      })}
    </div>
  );
};

export default Notifications;
