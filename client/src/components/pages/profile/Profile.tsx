import React, { Component } from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonalTab from '../../tabs/personal';
import Sidebar from '../../shared/sidebar';

import ProfileStyles from './ProfileStyles';

const BASIC_INFORMATION = [
    { title: 'First name', key: 'firstName', value: 'Viktor' },
    { title: 'Last name', key: 'lastName', value: 'Martyniuk' },
    { title: 'Birthdate', key: 'birthDate', value: '26.10.1991' },
    { title: 'Gender', key: 'gender', value: 'Male' },
    { title: 'Marital status', key: 'isMerried', value: 'married' },
];

const ADDRESS = [
    { title: 'Country', key: 'country', value: 'Ukraine' },
    { title: 'Province', key: 'state', value: 'Kyiv' },
    { title: 'City', key: 'city', value: 'Kyiv' },
    { title: 'Street', key: 'street', value: 'Dragomanova' },
    { title: 'Zip', key: 'zip', value: '02383' },
];

const CONTACT = [
    { title: 'Phone', key: 'phone', value: '+3809314737720' },
    { title: 'Skype', key: 'skype', value: 'dinozavr' },
];

const SEGMENTS = [
    { header: 'Basic information', items: BASIC_INFORMATION },
    { header: 'Adress', items: ADDRESS },
    { header: 'Contact', items: CONTACT },
];

type State = {
  tab: number;
};

interface ProfileProps extends WithStyles<typeof ProfileStyles> {

}

class Profile extends Component<ProfileProps, State> {
  state = {
    tab: 0,
  };

  handleChangeTab = (event: any, value: number) => {
    this.setState({ tab: value });
  }

  renderTab = () => {
    let Tab = null;

    switch (this.state.tab) {
      case 0:
        Tab = <PersonalTab data={SEGMENTS} />;
        break;
      default:
        Tab = <PersonalTab data={SEGMENTS} />;
    }

    return (
            <div className={this.props.classes.tabContainer}>
                {Tab}
            </div>
    );
  }

  render(): JSX.Element {
    return (
            <div className={this.props.classes.profile}>
                <Grid container spacing={6}>
                    <Grid item xs={2}>
                        <Sidebar />
                    </Grid>
                    <Grid item xs={10}>
                        <Tabs
                            value={this.state.tab}
                            onChange={this.handleChangeTab}
                            indicatorColor="secondary"
                        >
                            <Tab label="Personal" />
                            <Tab label="Other" />
                        </Tabs>
                        {this.renderTab()}
                    </Grid>
                </Grid>
            </div>
    );
  }
}

export default Profile;
