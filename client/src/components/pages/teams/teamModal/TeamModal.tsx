import React, { useState } from 'react';

import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { SimpleUser } from '../../../../models/SimpleUser';
import { TeamDetails } from '../../../../models/TeamDetails';
import services from '../../../../services';
import TeamMembers from '../../../shared/teamMembers/TeamMembers';
import Typeahead from '../../../shared/typeahead';

export interface DispatchProps {
  onSave: (data: TeamDetails) => void;
}

export interface OwnProps {
  team: TeamDetails;
  onClose?: () => void;
}

type Props = DispatchProps & OwnProps;

class PeoplePicker extends Typeahead<SimpleUser> {}

const TeamDetailsModal: React.FunctionComponent<Props> = ({
  team = new TeamDetails(),
  onClose,
  onSave,
}: Props) => {
  const [teamData, setTeamData] = useState<TeamDetails>(team);
  const [membersPicker, setMembersPicker] = useState<string>('');
  const [managerPicker, setManagerPicker] = useState<string>('');
  const [leadPicker, setLeadPicker] = useState<string>('');
  const [peopleSuggestions, setPeopleSuggestions] = useState<SimpleUser[]>([]);
  const [membersSuggestions, setMembersSuggestions] = useState<SimpleUser[]>([]);
  const isEdit = !!team._id;

  const isDisabled = () => {
    return !teamData.name || !teamData.manager;
  };

  const handleInputChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    teamData[key] = e.target.value;
    setTeamData(new TeamDetails(teamData));
  };

  const handleFetchRequest = async (query: string) => {
    let people: SimpleUser[] = await services.employees.picker(query);
    people = people.filter(p => !teamData.users.find(u => u._id === p._id));
    setPeopleSuggestions(people);
  };

  const handleFakeFetchRequest = async (query: string) => {
    const people: SimpleUser[] = teamData.users.filter(u => {
      return u.fullName.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
    setMembersSuggestions(people);
  };

  const handlePickerChange = (set: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof e.target.value === 'string') {
      set(e.target.value);
    }
  };

  const handleMembersPickerSelect = (item: SimpleUser) => {
    setMembersPicker('');
    teamData.users = [...teamData.users, item];
    setTeamData(new TeamDetails(teamData));
    setPeopleSuggestions([]);
    setMembersSuggestions([]);
  };

  const handleManagerPickerSelect = (item: SimpleUser) => {
    setManagerPicker('');
    teamData.manager = item;
    setTeamData(new TeamDetails(teamData));
  };

  const handleLeadPickerSelect = (item: SimpleUser) => {
    setLeadPicker('');
    teamData.teamLead = item;
    setTeamData(new TeamDetails(teamData));
    setMembersSuggestions([]);
  };

  const handleRemove = (id: string) => {
    if (teamData.manager && teamData.manager._id === id) {
      teamData.manager = null;
    }
    if (teamData.teamLead && teamData.teamLead._id === id) {
      teamData.teamLead = null;
    }
    teamData.users = teamData.users.filter(u => u._id !== id);
    setTeamData(new TeamDetails(teamData));
  };

  const handleUnassign = (id: string, role: 'manager' | 'teamLead') => {
    teamData[role] = null;
    setTeamData(new TeamDetails(teamData));
  };

  const handleSave = () => {
    onSave(teamData);
  };

  return (
    <React.Fragment>
      <DialogTitle >
        {isEdit ? 'Edit' : 'Add'} team
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          label="Name"
          value={teamData.name}
          onChange={handleInputChange('name')}
          fullWidth
          required
        />
        <TextField
          margin="normal"
          label="Description"
          value={teamData.description}
          onChange={handleInputChange('description')}
          fullWidth
          multiline
        />
        <PeoplePicker
          options={peopleSuggestions}
          onFetchRequested={handleFetchRequest}
          onSelect={handleMembersPickerSelect}
          mapItemValue={(item: SimpleUser) => item._id}
          mapItemLabel={(item: SimpleUser) => item.fullName}
          inputProps={{
            margin: 'normal',
            label: 'Members picker',
            id: 'users',
            placeholder: 'Search for people',
            value: membersPicker,
            onChange: handlePickerChange(setMembersPicker),
            InputLabelProps: {
              shrink: true,
            },
          }}
        />

        <PeoplePicker
          options={membersSuggestions}
          onFetchRequested={handleFakeFetchRequest}
          onSelect={handleManagerPickerSelect}
          mapItemValue={(item: SimpleUser) => item._id}
          mapItemLabel={(item: SimpleUser) => item.fullName}
          inputProps={{
            margin: 'normal',
            label: 'Manager picker',
            id: 'manager',
            placeholder: 'Search for people in team members',
            value: managerPicker,
            onChange: handlePickerChange(setManagerPicker),
            InputLabelProps: {
              shrink: true,
            },
            required: true,
          }}
        />

        <PeoplePicker
          options={membersSuggestions}
          onFetchRequested={handleFakeFetchRequest}
          onSelect={handleLeadPickerSelect}
          mapItemValue={(item: SimpleUser) => item._id}
          mapItemLabel={(item: SimpleUser) => item.fullName}
          inputProps={{
            margin: 'normal',
            label: 'Lead picker',
            id: 'lead',
            placeholder: 'Search for people in team members',
            value: leadPicker,
            onChange: handlePickerChange(setLeadPicker),
            InputLabelProps: {
              shrink: true,
            },
          }}
        />
        <div style={{ marginTop: '20px' }}>
          <TeamMembers
            team={teamData}
            showRemove
            onRemove={handleRemove}
            onUnassignFrom={handleUnassign}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" disabled={isDisabled()}>
          Save
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default TeamDetailsModal;
