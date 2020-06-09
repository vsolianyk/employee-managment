import React, { useEffect, useState } from 'react';

import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';

import { PageInResponse } from '../../../models/PageInResponse';
import { ResponseError } from '../../../models/ResponseError';
import { SortDirection } from '../../../models/SortDirection';
import { SortablePageIn } from '../../../models/SortablePageIn';
import { User } from '../../../models/User';
import { OwnProps as ConfirmationModalProps } from '../../modals/confirmationDialog/ConfirmationDialog';
import { CustomizableTable, CustomizableTableColumn } from '../../shared/customizableTable/CustomizableTable';
import Loader from '../../shared/loader';
import { OwnProps as UserModalProps } from './userModal/UserModal';

interface Props extends WithStyles {
  usersData: PageInResponse<User> | null;
  error: ResponseError | null;
  isLoading: boolean;
  queryParams: SortablePageIn;
  getUsers: () => void;
  updateQueryParams: (query: SortablePageIn) => void;
  deleteUser: (id: string) => void;
  openUserModal: (options: UserModalProps) => void;
  openConfirmationModal: (options: ConfirmationModalProps) => void;
}

class UsersTable extends CustomizableTable<User> {}

const Users: React.FunctionComponent<Props> = ({
  classes,
  isLoading,
  usersData,
  error,
  queryParams,

  updateQueryParams,
  getUsers,
  deleteUser,
  openUserModal,
  openConfirmationModal,
}: Props) => {
  useEffect(
    () => {
      getUsers();
    },
    [],
  );

  if (!usersData && isLoading) {
    return <Loader/>;
  }

  if (!usersData && error) {
    return (
      <Typography align="center" color="error">
        Something went wrong
      </Typography>
    );
  }

  const handleAdd = () => {
    openUserModal({
      user: new User(),
    });
  };

  const handleEdit = (user: User) => {
    openUserModal({
      user,
    });
  };

  const handleDelete = (item: User) => {
    openConfirmationModal({
      title: 'Delete user',
      description: `Are you sure you want to delete ${item.fullName} user?`,
      onConfirm: () => deleteUser(item._id),
    });
  };

  const handlePageChange = (page: number) => {
    const offset = page * queryParams.limit;
    updateQueryParams({ ...queryParams, offset });
  };

  const handleSortChange = (params: {sortBy: string, sortOrder: SortDirection}) => {
    updateQueryParams({ ...queryParams, ...params });
  };

  const tableConfig = {
    columns: [
      {
        title: 'First name',
        field: 'firstName',
        sortable: true,
        align: 'left',
      },
      {
        title: 'Last name',
        field: 'lastName',
        sortable: true,
        align: 'left',
      },
      {
        title: 'Email',
        field: 'email',
        sortable: true,
        align: 'left',
        render: (item: User) => <a href={`mailto:${item.email}`}>{item.email}</a>,
      },
      {
        title: 'Role',
        field: 'role',
        sortable: false,
        align: 'left',
      },
      {
        title: 'Status',
        field: 'isActive',
        sortable: false,
        align: 'left',
        render: (item: User) => !item.isActive ? <ClearIcon color="error"/> : <DoneIcon color="primary"/>,
      },
      {
        title: '',
        field: 'edit',
        sortable: false,
        align: 'right',
        render: (item: User) => (
          <Fab color="primary" aria-label="Edit" size="small" onClick={() => handleEdit(item)}>
            <EditIcon />
          </Fab>
        ),
      },
      {
        title: '',
        field: 'delete',
        sortable: false,
        align: 'right',
        render: (item: User) => (
          <Fab aria-label="Delete" size="small" onClick={() => handleDelete(item)}>
            <DeleteIcon />
          </Fab>
        ),
      },
    ] as CustomizableTableColumn<User>[],
    showPagination: false,
  };

  return (
    <React.Fragment>
      <Container>
        <Grid container>
          <Grid item xs={8}>
            <h1>Users management</h1>
          </Grid>
          <Grid item xs={4} className={classes.headerRight}>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Add user
          </Button>
          </Grid>
        </Grid>
        <UsersTable
          className={classes.usersTable}
          data={usersData}
          config={tableConfig}
          params={queryParams}
          classes={{} as any}
          onChangePage={handlePageChange}
          onChangeSort={handleSortChange}
        />
      </Container>
    </React.Fragment>
  );
};

export default Users;
