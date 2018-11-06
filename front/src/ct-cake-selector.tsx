import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { ICoreState } from './core-state/core.state';
import { coreState$, actionTrigger$ } from './core-state/core.store';
import { connect } from './util/connect';
import { merge, mergeProps } from './util/hoc.util';
import { UpdateNextCake } from './core-state/global.ui.reducer';

interface CtCakeSelectorFromState {
  cakeId?: number;
}

interface CtCakeSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
}

interface CtCakeSelectorTheme {}

interface CakeSuggestion {
  name: string;
  id: any;
}

interface CtCakeState {
  suggestions: CakeSuggestion[];
}

const defaultTheme = (theme: any): CtCakeSelectorTheme => merge({} as CtCakeSelectorTheme, theme);

const themeToHostStyles = (_: CtCakeSelectorTheme) => {
  return {
    className: css``,
  };
};

class CtCakeSelectorImpl extends React.PureComponent<
  CtCakeSelectorFromState & CtCakeSelectorProps
> {
  state: CtCakeState;

  constructor(props) {
    super(props);
    this.state = { suggestions: [] };
  }

  componentDidMount() {
    fetch('/api/my-suggestions', { method: 'POST' })
      .then(res => res.json())
      .then(
        res => {
          this.setState({
            suggestions: res,
          });
        },
        err => {
          console.error('Error while fetching my suggestions', err);
        }
      );
  }

  handleSuggestion = (suggest: CakeSuggestion) => {
    actionTrigger$.next(new UpdateNextCake(suggest.id));
  };

  render() {
    const { cakeId, theme: incomingTheme, ...defaultHostProps } = this.props;
    const { suggestions } = this.state;
    const theme = defaultTheme(incomingTheme);
    const hostProps = mergeProps(defaultHostProps, themeToHostStyles(theme));
    return (
      <div {...hostProps}>
        Suggestions:
        {suggestions.map(suggest => (
          <span onClick={_ => this.handleSuggestion(suggest)}>{suggest.name}</span>
        ))}
      </div>
    );
  }
}

const selector = ({ ui }: ICoreState): CtCakeSelectorFromState => ({
  cakeId: ui.nextCake ? ui.nextCake.cakeId : undefined,
});
export const CtCakeSelector = connect(
  selector,
  coreState$
)<{}, CtCakeSelectorFromState>(withTheme(CtCakeSelectorImpl));
