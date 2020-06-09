import React, { useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import EditIcon from '@material-ui/icons/Edit';

import { Employee } from '../../../models/Employee';
import { PageInResponse } from '../../../models/PageInResponse';
import { ResponseError } from '../../../models/ResponseError';
import { SortDirection } from '../../../models/SortDirection';
import { SortablePageIn } from '../../../models/SortablePageIn';
import { CustomizableTable, CustomizableTableConfig } from '../../shared/customizableTable/CustomizableTable';
import Loader from '../../shared/loader';
import { OwnProps as EmployeeJobInfoModalProps } from './employeeEditJobInfo/EmployeeEditJobInfo';

interface Props extends WithStyles {
  isLoading: boolean;
  employeesData: PageInResponse<Employee> | null;
  error: ResponseError;
  queryParams: SortablePageIn;
  updateQueryParams: (query: SortablePageIn) => void;
  getEmployees: () => void;
  openEmployeeJobInfoModal: (props: EmployeeJobInfoModalProps) => void;
}

class EmployeesTable extends CustomizableTable<Employee> {}

const Employees: React.FunctionComponent<Props> = ({
  classes,
  isLoading,
  employeesData,
  error,
  queryParams,
  getEmployees,
  updateQueryParams,
  openEmployeeJobInfoModal,
}: Props) => {
  useEffect(
    () => {
      getEmployees();
    },
    [],
  );

  if (!employeesData && isLoading) {
    return <Loader/>;
  }

  if (!employeesData && error) {
    return (
      <Typography align="center" color="error">
        Something went wrong
      </Typography>
    );
  }

  const handleEdit = (employee: Employee) => {
    openEmployeeJobInfoModal({
      employee,
    });
  };

  const handlePageChange = (page: number) => {
    const offset = page * queryParams.limit;
    updateQueryParams({ ...queryParams, offset });
  };

  const handleSortChange = (params: {sortBy: string, sortOrder: SortDirection}) => {
    updateQueryParams({ ...queryParams, ...params });
  };

  const tableConfig: CustomizableTableConfig<Employee> = {
    columns: [
      {
        title: 'Email',
        field: 'email',
        sortable: true,
        align: 'left',
        render: (item: Employee) => <Link component={RouterLink} to={`/employees/${item.userId}`}>{item.email}</Link>,
      },
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
        title: 'Job title',
        field: 'title',
        sortable: false,
        align: 'left',
      },
      {
        title: 'Office',
        field: 'office',
        sortable: false,
        align: 'left',
      },
      {
        title: 'Hire date',
        field: 'hireDate',
        sortable: true,
        align: 'left',
        render: (item: Employee) => item.hireDate && item.hireDate.toLocaleString(),
      },
      {
        title: '',
        field: 'edit',
        sortable: false,
        align: 'right',
        render: (item: Employee) => (
          <Fab color="primary" aria-label="Edit" size="small" onClick={() => handleEdit(item)}>
            <EditIcon />
          </Fab>
        ),
      },
    ],
    showPagination: true,
  };

  return (
    <React.Fragment>
      <Container>
        <h1>Employees</h1>
        <EmployeesTable
          className={classes.employeesTable}
          data={employeesData}
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

export default Employees;
