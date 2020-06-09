import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppState } from './../../../../reducers';
import { Employee } from '../../../../models/Employee';
import { updateEmployeeJobInfo } from '../../../../reducers/employees/employeesActions';
import { EmployeesActions } from '../../../../reducers/employees/types';
import EmployeeEditJobInfo from './EmployeeEditJobInfo';

const mapStateToProps = (state: AppState) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<EmployeesActions>) => ({
  onSave: (data: Employee) => dispatch(updateEmployeeJobInfo(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeEditJobInfo);
