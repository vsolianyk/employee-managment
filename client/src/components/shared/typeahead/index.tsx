import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typeahead, { Props } from './Typeahead';
import styles from './TypeaheadStyles';

export default class<T> extends React.PureComponent<Props<T>> {

  private readonly C = this.wrapperFunc();

  render() {
    const Component = this.C;
    return <Component {...this.props} />;
  }

  private wrapperFunc() {
    type Typed = new() => Typeahead<T>;
    return withStyles(styles)(Typeahead as unknown as Typed);
  }
}
