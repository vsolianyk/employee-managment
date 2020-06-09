import React, { useState } from 'react';

import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Employee } from '../../../../models/Employee';

export interface DispatchProps {
  onSave: (data: Employee) => void;
}

export interface OwnProps {
  employee: Employee;
  onClose?: () => void;
}

type Props = DispatchProps & OwnProps;

const EmployeeEditJobInfoModal: React.FunctionComponent<Props> = ({
  employee = new Employee(),
  onClose,
  onSave,
}: Props) => {
  const [employeeData, setEmployeeData] = useState<Employee>(employee);

  const handleChange = (key: string, value: string | boolean) => {
    employeeData[key] = value;
    setEmployeeData(new Employee(employeeData));
  };

  const handleSave = () => {
    onSave(employeeData);
  };

  const fromDateFormatter = (date: Date | null): string => {
    if (!date) return '';
    const result = date.toISOString();
    return result.split('T')[0];
  };

  return (
    <React.Fragment>
      <DialogTitle >
        Edit Employee Job Info
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          label="Email"
          defaultValue={employeeData.email}
          InputProps={{
            readOnly: true,
            disabled: true,
          }}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Full name"
          defaultValue={employeeData.fullName}
          InputProps={{
            readOnly: true,
            disabled: true,
          }}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Job title"
          defaultValue={employeeData.title}
          onChange={(e: React.ChangeEvent) => handleChange('title', (e.target as HTMLInputElement).value)}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Hire date"
          type="date"
          defaultValue={fromDateFormatter(employeeData.hireDate)}
          onChange={(e: React.ChangeEvent) => handleChange('hireDate', (e.target as HTMLInputElement).value)}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Office"
          defaultValue={employeeData.office}
          onChange={(e: React.ChangeEvent) => handleChange('office', (e.target as HTMLInputElement).value)}
          fullWidth
        />
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

export default EmployeeEditJobInfoModal;
