import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { TeamDetails } from '../../../../models/TeamDetails';
import { AppState } from './../../../../reducers';
import { TeamsActions } from './../../../../reducers/teams/types';
import { ModalsActions } from '../../../../reducers/modals/types';
import { updateTeam, createTeam } from '../../../../reducers/teams/teamsActions';
import TeamDetailsModal, { OwnProps } from './TeamModal';

const mapStateToProps = (state: AppState) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<TeamsActions|ModalsActions>, ownProps: OwnProps) => ({
  onSave: (data: TeamDetails) => dispatch(data._id ? updateTeam(data) : createTeam(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamDetailsModal);
