import React, { Component } from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import InfoSegment from '../../shared/infoSegment';
import Grid from '@material-ui/core/Grid';

import PersonalStyles from './PersonalStyles';
import { InfoBlockItem } from '../../shared/infoSegment/InfoSegment';

interface InfoSegmentData {
  header: string;
  items: InfoBlockItem[];
}

interface PersonalProps extends WithStyles<typeof PersonalStyles> {
  data: InfoSegmentData[];
}

class Personal extends Component<PersonalProps, {}> {
  renderSegment = (segment: InfoSegmentData) => (
        <Grid item xs={12} md={6} key={segment.header}>
            <InfoSegment header={segment.header} items={segment.items}/>
        </Grid>
    )

  renderSegments = () => {
    return this.props.data.map(
            segment => this.renderSegment(segment),
        );
  }

  render(): JSX.Element {
    return (
            <div className={this.props.classes.profile}>
                <Grid container spacing={6}>
                    {this.renderSegments()}
                </Grid>
            </div>
    );
  }
}

export default Personal;
