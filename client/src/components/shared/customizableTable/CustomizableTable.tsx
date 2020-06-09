import React from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import CustomizableTableStyles from './CustomizableTableStyles';
import { PageInResponse } from '../../../models/PageInResponse';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { SortDirection } from '../../../models/SortDirection';
import { SortablePageIn } from '../../../models/SortablePageIn';

interface CustomizableTableProps<T> extends WithStyles<typeof CustomizableTableStyles> {
  data: PageInResponse<T>;
  config: CustomizableTableConfig<T>;
  params: SortablePageIn;
  className?: string | undefined;
  onChangePage: (page: number) => void;
  onChangeSort: (data: {sortBy: string, sortOrder: SortDirection}) => void;
}

export interface CustomizableTableConfig<T> {
  columns: (CustomizableTableColumn<T>)[] ;
  showPagination: boolean;
}

export interface CustomizableTableColumn<T> {
  title: string;
  field: string;
  sortable: boolean;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  render?: (item: T) => JSX.Element | string;
}

export class CustomizableTable<T> extends React.Component<CustomizableTableProps<T>> {
  static defaultProps = {
    className: '',
  };

  handlePageChange = (e: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    this.props.onChangePage(page);
  }

  createSortHandler = (columnName: string) => () => {
    const { sortBy, sortOrder } = this.props.params;
    const isDesc = columnName === sortBy && sortOrder === SortDirection.Desc;
    this.props.onChangeSort({ sortBy: columnName, sortOrder: isDesc ? SortDirection.Asc : SortDirection.Desc });
  }

  renderHeader() {
    const { params, config } = this.props;
    const { sortBy, sortOrder } = params;
    return (
      <TableHead>
        <TableRow>
          {config.columns.map(column => (
            <TableCell
              key={column.field as string}
              align={column.align}
              sortDirection={column.sortable && sortBy === column.field ? sortOrder : false}
            >
              {column.sortable
                ? <TableSortLabel
                  active={sortBy === column.field}
                  direction={sortOrder}
                  onClick={this.createSortHandler(column.field)}
                >
                  {column.title}
                </TableSortLabel>
                : column.title
              }
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  renderBody() {
    const { data, config } = this.props;
    return (
      <TableBody>
        {data.results.map((item: T) => (
          <TableRow key={item['_id'].toString()}>
            {config.columns.map((column: CustomizableTableColumn<T>) => (
              <TableCell key={column.field} align={column.align}>
                {column.render
                  ? column.render(item)
                  : item[column.field.toString()]
                }
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }

  renderFooter() {
    const { data, params } = this.props;
    const page = params.offset / params.limit;
    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[20]}
            colSpan={3}
            count={data.totalCount}
            rowsPerPage={data.limit}
            page={page}
            SelectProps={{
              inputProps: { 'aria-label': 'Rows per page' },
              native: true,
            }}
            onChangePage={this.handlePageChange}
          />
        </TableRow>
      </TableFooter>
    );
  }

  render() {
    const { classes, className, config } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={`${classes.table} ${className}`}>
          {this.renderHeader()}
          {this.renderBody()}
          {config.showPagination && this.renderFooter()}
        </Table>
      </Paper>
    );
  }
}
