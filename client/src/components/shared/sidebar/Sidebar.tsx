import React, { Component } from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import SidebarStyles from './SidebarStyles';

const info = {
  phone: '+3809314737720',
  email: 'dinozavr@gmail.com',
  linkedinUrl: 'https://google.com',
  startDate: '18 March 2019',
  workingDuration: '19 days',
  title: 'Front-End Developer',
  office: 'Silver Breeze',
  teamName: 'Dinozavrs',
  manager: 'Unknown person',
};

interface SidebarProps extends WithStyles<typeof SidebarStyles> {}

class Sidebar extends Component<SidebarProps, {}> {
  render(): JSX.Element {
    return (
            <div className={this.props.classes.sidebar}>
                <Avatar
                    src="https://t2.ftcdn.net/jpg/02/44/42/87/400_F_244428705_UnPnDLgb8HFoxniuEZz5uaiGp0oQFOXZ.jpg"
                    className={this.props.classes.avatar}
                />

                <div className={this.props.classes.segment}>
                    <Typography className={this.props.classes.segmentHeader}>Contact info</Typography>
                    <Typography>{`Phone: ${info.phone}`}</Typography>
                    <Typography>{`Email: ${info.email}`}</Typography>
                    <Typography>{`Linked-in url: ${info.linkedinUrl}`}</Typography>
                </div>

                <div className={this.props.classes.segment}>
                    <Typography className={this.props.classes.segmentHeader}>Hire date</Typography>
                    <Typography>{`startDate: ${info.startDate}`}</Typography>
                    <Typography>{`working duration: ${info.workingDuration}`}</Typography>
                </div>

                <div className={this.props.classes.segment}>
                    <Typography className={this.props.classes.segmentHeader}>Job info</Typography>
                    <Typography>{`Title: ${info.title}`}</Typography>
                    <Typography>{`Office: ${info.office}`}</Typography>
                    <Typography>{`Team name: ${info.teamName}`}</Typography>
                    <Typography>{`Manager: ${info.manager}`}</Typography>
                </div>
            </div>
    );
  }
}

export default Sidebar;
