import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';

import { AppState } from './../../reducers';
import { ModalsActions } from './../../reducers/modals/types';
import { closeModal } from '../../reducers/modals/modalsActions';
import ModalsContainer, { DispatchProps, StateProps } from './ModalsContainer';
import ModalsContainerStyles from './ModalsContainerStyles';

const mapStateToProps = (state: AppState): StateProps => {
  return {
    isOpen: state.modals.isOpen,
    modalType: state.modals.type,
    childProps: state.modals.childProps,
    modalProps: state.modals.modalProps,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ModalsActions>): DispatchProps => ({
  closeModal: () => dispatch(closeModal()),
});

export default connect<StateProps, DispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(ModalsContainerStyles)(ModalsContainer));
