import React, { useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { PageInResponse } from '../../../models/PageInResponse';
import { ResponseError } from '../../../models/ResponseError';
import { SortDirection } from '../../../models/SortDirection';
import { SortablePageIn } from '../../../models/SortablePageIn';
import { Team } from '../../../models/Team';
import { OwnProps as ConfirmationModalProps } from '../../modals/confirmationDialog/ConfirmationDialog';
import { CustomizableTable, CustomizableTableConfig } from '../../shared/customizableTable/CustomizableTable';
import Loader from '../../shared/loader';
import { OwnProps as TeamModalProps } from './teamModal/TeamModal';
import { TeamDetails } from '../../../models/TeamDetails';

interface Props extends WithStyles {
  teamsData: PageInResponse<Team> | null;
  error: ResponseError | null;
  isLoading: boolean;
  queryParams: SortablePageIn;
  getTeams: () => void;
  updateQueryParams: (query: SortablePageIn) => void;
  deleteTeam: (id: string) => void;
  openCreateTeamModal: (modalProps: TeamModalProps, containerProps: any) => void;
  openEditTeamModal: (id: string, modalProps: Partial<TeamModalProps>, containerProps: any) => void;
  openConfirmationModal: (options: ConfirmationModalProps) => void;
}

class TeamsTable extends CustomizableTable<Team> {}

const Teams: React.FunctionComponent<Props> = ({
  classes,
  isLoading,
  teamsData,
  error,
  queryParams,

  getTeams,
  updateQueryParams,
  deleteTeam,
  openCreateTeamModal,
  openEditTeamModal,
  openConfirmationModal,
}: Props) => {
  useEffect(
    () => {
      getTeams();
    },
    [],
  );

  if (!teamsData && isLoading) {
    return <Loader/>;
  }

  if (!teamsData && error) {
    return (
      <Typography align="center" color="error">
        Something went wrong
      </Typography>
    );
  }

  const handleAdd = () => {
    openCreateTeamModal(
      {
        team: new TeamDetails(),
      },
      {
        maxWidth: 'lg',
      },
    );
  };

  const handleEdit = (team: Team) => {
    openEditTeamModal(
      team._id,
      {},
      {
        maxWidth: 'lg',
      },
    );
  };

  const handleDelete = (item: Team) => {
    openConfirmationModal({
      title: 'Delete team',
      description: `Are you sure you want to delete "${item.name}" team?`,
      onConfirm: () => deleteTeam(item._id),
    });
  };

  const handlePageChange = (page: number) => {
    const offset = page * queryParams.limit;
    updateQueryParams({ ...queryParams, offset });
  };

  const handleSortChange = (params: {sortBy: string, sortOrder: SortDirection}) => {
    updateQueryParams({ ...queryParams, ...params });
  };

  const tableConfig: CustomizableTableConfig<Team> = {
    columns: [
      {
        title: 'Name',
        field: 'name',
        sortable: true,
        align: 'left',
      },
      {
        title: 'Manager',
        field: 'managerFullName',
        sortable: false,
        align: 'left',
      },
      {
        title: 'Team Lead',
        field: 'teamLeadFullName',
        sortable: false,
        align: 'left',
      },
      {
        title: 'Team members',
        field: 'membersCount',
        sortable: true,
        align: 'right',
      },
      {
        title: '',
        field: 'edit',
        sortable: false,
        align: 'right',
        render: (item: Team) => (
          <Fab aria-label="Edit" size="small" color="primary" onClick={() => handleEdit(item)}>
            <EditIcon />
          </Fab>
        ),
      },
      {
        title: '',
        field: 'delete',
        sortable: false,
        align: 'right',
        render: (item: Team) => (
          <Fab aria-label="Delete" size="small" onClick={() => handleDelete(item)}>
            <DeleteIcon />
          </Fab>
        ),
      },
    ],
    showPagination: true,
  };

  return (
    <React.Fragment>
      <Container>
        <Grid container>
          <Grid item xs={8}>
            <h1>Teams</h1>
          </Grid>
          <Grid item xs={4} className={classes.headerRight}>
            <Button onClick={handleAdd} variant="contained" color="primary">
              Add team
            </Button>
          </Grid>
        </Grid>
        <TeamsTable
          className={classes.teamsTable}
          data={teamsData}
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

export default Teams;
