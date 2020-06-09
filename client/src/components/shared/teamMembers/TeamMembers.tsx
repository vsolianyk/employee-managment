import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';

import { SimpleUser } from '../../../models/SimpleUser';
import { TeamDetails } from '../../../models/TeamDetails';

export interface OwnProps {
  team: TeamDetails;
  showRemove?: boolean;
  onRemove?: (id: string) => void;
  onUnassignFrom?: (id: string, role: 'manager' | 'teamLead') => void;
}

const TeamMembers: React.FunctionComponent<OwnProps> = ({
  team,
  showRemove,
  onRemove,
  onUnassignFrom,
}: OwnProps) => {
  if (!team || !team.users) {
    return null;
  }

  const handleDelete = (member: SimpleUser) => () => {
    onRemove(member._id);
  };

  const handleUnassign = (member: SimpleUser, role: 'manager' | 'teamLead') => () => {
    onUnassignFrom(member._id, role);
  };

  const renderMember = (member: SimpleUser, role?: 'manager' | 'teamLead') => (
    <ListItem disableGutters key={member && member._id}>
      <ListItemAvatar>
        <Avatar>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={member ? member.fullName : 'Not selected'}
      />
      {member && showRemove && !role && <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="Delete" onClick={handleDelete(member)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>}
      {member && showRemove && role && <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="Unassign" onClick={handleUnassign(member, role)}>
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>}
    </ListItem>
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="subtitle2">
          Manager
        </Typography>
        <div >
          <List dense>
            {renderMember(team.manager, 'manager')}
          </List>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2">
          Team leader
        </Typography>
        <div >
          <List dense>
            {renderMember(team.teamLead, 'teamLead')}
          </List>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2">
          Team members
        </Typography>
        <div >
          <List dense>
            {team.users.map(u => renderMember(u))}
          </List>
        </div>
      </Grid>
    </Grid>
  );
};

TeamMembers.defaultProps = {
  showRemove: false,
  onRemove: () => {},
};

export default TeamMembers;
