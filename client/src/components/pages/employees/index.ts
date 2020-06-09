import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';

import { AppState } from './../../../reducers';
import { EmployeesActions } from './../../../reducers/employees/types';
import { SortablePageIn } from '../../../models/SortablePageIn';
import { getEmployees, setEmployeesQyeryParams } from '../../../reducers/employees/employeesActions';
import { openModal } from '../../../reducers/modals/modalsActions';
import { EMPLOYEE_JOB_INFO_MODAL, ModalsActions } from '../../../reducers/modals/types';
import Employees from './Employees';
import EmployeesStyles from './EmployeesStyles';
import { OwnProps as EmployeeJobInfoModalProps } from './employeeEditJobInfo/EmployeeEditJobInfo';

const mapStateToProps = (state: AppState) => {
  return {
    employeesData: state.employees.data,
    isLoading: state.employees.isLoading,
    error: state.employees.error,
    queryParams: state.employees.params,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<EmployeesActions|ModalsActions>) => ({
  getEmployees: () => dispatch(getEmployees()),
  updateQueryParams: (query: SortablePageIn) => dispatch(setEmployeesQyeryParams(query)),

  openEmployeeJobInfoModal: (modalProps: EmployeeJobInfoModalProps) => dispatch(openModal(EMPLOYEE_JOB_INFO_MODAL, modalProps)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(EmployeesStyles)(Employees));
