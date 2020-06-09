import React, { useState } from 'react';

import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

import { User } from '../../../../models/User';
import { UserRoles } from '../../../../models/UserRoles';

export interface DispatchProps {
  onSave: (data: User) => void;
}

export interface OwnProps {
  user: User;
  onClose?: () => void;
}

type Props = DispatchProps & OwnProps;

const UserModal: React.FunctionComponent<Props> = ({
  user = new User(),
  onClose,
  onSave,
}: Props) => {
  const [userData, setUserData] = useState<User>(user);
  const isEdit = !!user._id;

  const handleChange = (key: string, value: string | boolean) => {
    userData[key] = value;
    setUserData(new User(userData));
  };

  const handleSave = () => {
    onSave(userData);
  };

  return (
    <React.Fragment>
      <DialogTitle >
        {isEdit ? 'Edit' : 'Add'} user
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          label="Email"
          value={userData.email}
          onChange={(e: React.ChangeEvent) => handleChange('email', (e.target as HTMLInputElement).value)}
          fullWidth
        />
        <TextField
          margin="normal"
          label="First name"
          value={userData.firstName}
          onChange={(e: React.ChangeEvent) => handleChange('firstName', (e.target as HTMLInputElement).value)}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Last name"
          value={userData.lastName}
          onChange={(e: React.ChangeEvent) => handleChange('lastName', (e.target as HTMLInputElement).value)}
          fullWidth
        />
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="role">Role</InputLabel>
          <Select
            value={userData.role}
            onChange={(e: React.ChangeEvent<any>) => handleChange('role', (e.target as HTMLInputElement).value)}
            inputProps={{
              name: 'role',
              id: 'role',
            }}
            autoWidth
          >
            {Object.keys(UserRoles).map(role => (
              <MenuItem key={role} value={role}>{role}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <FormLabel component="label">Status</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={userData.isActive}
                  onChange={(e: React.ChangeEvent<any>) => handleChange('isActive', (e.target as HTMLInputElement).value)}
                  color="primary"
                />
              }
              label={userData.isActive ? 'Active' : 'Inactive'}
            />
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default UserModal;
