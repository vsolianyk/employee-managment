import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';

import { AppState } from './../../../reducers';
import { TeamsActions } from './../../../reducers/teams/types';
import { SortablePageIn } from '../../../models/SortablePageIn';
import { openModal } from '../../../reducers/modals/modalsActions';
import { CONFIRMATION_MODAL, ModalsActions, TEAM_MODAL } from '../../../reducers/modals/types';
import { deleteTeam, getTeams, setTeamsQyeryParams, openEditTeamModal } from '../../../reducers/teams/teamsActions';
import { OwnProps as ConfirmationModalProps } from '../../modals/confirmationDialog/ConfirmationDialog';
import Teams from './Teams';
import TeamsStyles from './TeamsStyles';
import { OwnProps as TeamModalProps } from './teamModal/TeamModal';

const mapStateToProps = (state: AppState) => {
  return {
    teamsData: state.teams.data,
    error: state.teams.error,
    isLoading: state.teams.isLoading,
    queryParams: state.teams.params,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<TeamsActions|ModalsActions>) => ({
  getTeams: () => dispatch(getTeams()),
  updateQueryParams: (query: SortablePageIn) => dispatch(setTeamsQyeryParams(query)),
  deleteTeam: (id: string) => dispatch(deleteTeam(id)),

  openCreateTeamModal: (modalProps: TeamModalProps, containerProps: any) => dispatch(openModal(TEAM_MODAL, modalProps, containerProps)),
  openEditTeamModal: (id: string, modalProps: Partial<TeamModalProps>, containerProps: any) => dispatch(openEditTeamModal(id, modalProps, containerProps)),
  openConfirmationModal: (modalProps: ConfirmationModalProps) => dispatch(openModal(CONFIRMATION_MODAL, modalProps)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(TeamsStyles)(Teams));
