import React from 'react';
import Autosuggest, { SuggestionsFetchRequestedParams, OnSuggestionSelected, RenderSuggestionParams } from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { InputProps } from '@material-ui/core/Input';
import { WithStyles } from '@material-ui/styles/withStyles';

import styles from './TypeaheadStyles';
import Typography from '@material-ui/core/Typography';

export interface Props<T> {
  options: T[];
  inputProps: InputProps | BaseTextFieldProps;
  onFetchRequested?: (query: string) => void;
  onClear?: () => void;
  onSelect?: (data: T) => void;
  mapItemValue: (data: T) => string;
  mapItemLabel: (data: T) => string;
}

type PropsWithStyles<T> = Props<T> & WithStyles<typeof styles>;

class Typeahead<T> extends React.PureComponent<PropsWithStyles<T>> {
  static defaultProps = {
    onFetchRequested: () => {},
    onClear: () => {},
    onSelect: () => {},
    inputProps: {},
  };

  renderInputComponent = (inputProps: any) => {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;
    return (
      <TextField
        fullWidth
        InputProps={{
          inputRef: (node) => {
            ref(node);
            inputRef(node);
          },
        }}
        variant="standard"
        {...other}
      />
    );
  }

  renderSuggestion = (suggestion: T, { query, isHighlighted }: RenderSuggestionParams) => {
    const { mapItemLabel } = this.props;
    const label = mapItemLabel(suggestion);
    const matches = match(label, query);
    const parts = parse(label, matches);
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map(part => (
            <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
              {part.text}
            </span>
          ))}
        </div>
      </MenuItem>
    );
  }

  onSuggestionsFetchRequested = (data: SuggestionsFetchRequestedParams) => {
    const { onFetchRequested } = this.props;
    onFetchRequested(data.value);
  }

  onSuggestionSelected: OnSuggestionSelected<T> = (event, data) => {
    const { onSelect } = this.props;
    onSelect(data.suggestion);
  }
  render () {
    const { renderInputComponent, renderSuggestion, onSuggestionsFetchRequested, onSuggestionSelected } = this;
    const { options, inputProps, mapItemValue, onClear, classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      renderSuggestion,
      onSuggestionsFetchRequested,
      onSuggestionSelected,
      inputProps: (inputProps as any),
      suggestions: options,
      onSuggestionsClearRequested: onClear,
      getSuggestionValue: mapItemValue,
    };

    return <Autosuggest
      {...autosuggestProps}
      theme={{
        container: classes.container,
        suggestionsContainer: classes.suggestionsContainer,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion,
      }}
      renderSuggestionsContainer={options => (
        <Paper {...options.containerProps} square>
          {options.query && !options.children &&
            <Typography variant="body1" align="center">
              No results found
            </Typography>
          }
          {options.children}
        </Paper>
      )}
    />;
  }
}

export default Typeahead;
