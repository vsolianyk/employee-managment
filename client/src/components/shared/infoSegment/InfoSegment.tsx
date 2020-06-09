import React, { Component } from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditInfoModal from '../../modals/editInfoModal';

import InfoSegmentStyles from './InfoSegmentStyles';

export interface InfoBlockItem {
  title: string;
  key: string;
  value: string;
}

interface InfoBlockProps extends WithStyles<typeof InfoSegmentStyles> {
  header: string;
  items: InfoBlockItem[];
}

class InfoBlock extends Component<InfoBlockProps, {}> {
  state = {
    isEdit: false,
  };

  handleEditConfirm = () => this.setState({ isEdit: true });
  handleEditCancel = () => this.setState({ isEdit: false });
  handleEditStart = () => this.setState({ isEdit: true });

  render(): JSX.Element {
    return (
      <div className={this.props.classes.infoBlock}>
        <div className={this.props.classes.header}>
          <Typography variant="h4" className={this.props.classes.label}>
            {this.props.header}
          </Typography>
          <Button onClick={this.handleEditStart}>
            <Typography>
              Edit
            </Typography>
          </Button>
        </div>
        <Paper>
          <Table>
            <TableBody>
              {this.props.items.map((item: InfoBlockItem, i: number) => (
                <TableRow key={item.key}>
                  <TableCell>
                    <Typography>
                      {item.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {item.value}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <EditInfoModal
          isOpen={this.state.isEdit}
          onClose={this.handleEditCancel}
          onSave={this.handleEditConfirm}
          title={`Edit ${this.props.header}`}
          items={this.props.items}
        />
      </div>
    );
  }
}

export default InfoBlock;
