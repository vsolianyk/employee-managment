import React, { Component } from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import EditInfoModalStyles from './EditInfoModalStyles';

export interface EditableItem {
  title: string;
  key: string;
  value: string | number | boolean;
  render?: (item: EditableItem) => JSX.Element;
}

interface EditInfoModalProps extends WithStyles<typeof EditInfoModalStyles> {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onSave: (data: any) => void;
  items: EditableItem[];
}

class EditInfoModal extends Component<EditInfoModalProps, {}> {
  renderItem = (item: EditableItem) => (
    item.render
    ? item.render(item)
    : <TextField
      margin="normal"
      label={item.title}
      value={item.value}
      key={item.key}
      fullWidth
    />
  )

  render(): JSX.Element {
    return (
      <Dialog open={this.props.isOpen}>
        <DialogTitle id="form-dialog-title">
          {this.props.title}
        </DialogTitle>
        <DialogContent>
          {this.props.items.map(item => this.renderItem(item))}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="secondary">
              Cancel
          </Button>
          <Button onClick={this.props.onSave} color="primary">
              Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default EditInfoModal;
