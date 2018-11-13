import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { merge, mergeProps } from './util/hoc.util';

export interface CakeSuggestion {
  name: string;
  code: string;
}

interface CtSuggestionProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
  suggestion: CakeSuggestion;
  selected?: boolean;
}

interface CtSuggestionTheme {
  suggestion: {
    borderColor: string;
    size: string;
  };
}

const defaultTheme = (theme: any): CtSuggestionTheme =>
  merge(
    {
      suggestion: {
        borderColor: theme.palette.primary.main,
        size: '50px',
      },
    } as CtSuggestionTheme,
    theme
  );

const computeHostStyles = (theme: CtSuggestionTheme, isSelected: boolean) => {
  const sugThm = theme.suggestion;
  const borderThick = isSelected ? 6 : 2;
  return {
    className: css`
      border: ${borderThick}px solid ${sugThm.borderColor};
      border-radius: 50%;
      width: ${sugThm.size};
      height: ${sugThm.size};
    `,
  };
};

class CtSuggestionImpl extends React.PureComponent<CtSuggestionProps> {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  render() {
    const { selected, suggestion, theme: incomingTheme, ...defaultHostProps } = this.props;
    const theme = defaultTheme(incomingTheme);
    const hostProps = mergeProps(defaultHostProps, computeHostStyles(theme, !!selected));
    return <div {...hostProps}>{suggestion.name}</div>;
  }
}

export const CtSuggestion = withTheme(CtSuggestionImpl);
