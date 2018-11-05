import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { ICoreState } from './core-state/core.state';
import { coreState$ } from './core-state/core.store';
import { connect } from './util/connect';
import { merge, mergeProps } from './util/hoc.util';

interface CtCakeSelectorFromState {
  cakeId?: number;
}

interface CtCakeSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
}

interface CtCakeSelectorTheme {}

const defaultTheme = (theme: any): CtCakeSelectorTheme => merge({} as CtCakeSelectorTheme, theme);

const themeToHostStyles = (_: CtCakeSelectorTheme) => {
  return {
    className: css``,
  };
};

class CtCakeSelectorImpl extends React.PureComponent<CtCakeSelectorFromState & CtCakeSelectorProps> {
  componentDidMount() {
    fetch('/my-suggestions')
      .then(res => res.json())
      .then(res => {
        this.setState({
          suggestions: res
        });
      }, err => {
        console.error('Error while fetching my suggestions', err);
      })
  }

  render() {
    const { theme: incomingTheme, ...defaultHostProps } = this.props;
    const theme = defaultTheme(incomingTheme);
    const hostProps = mergeProps(defaultHostProps, themeToHostStyles(theme));
    return <div {...hostProps} />;
  }
}

const selector = ({ ui }: ICoreState): CtCakeSelectorFromState => ({
  cakeId: ui.nextCake ? ui.nextCake.cakeId : undefined,
});
export const CtLanding = connect(
  selector,
  coreState$
)<{}, CtCakeSelectorFromState>(withTheme(CtCakeSelectorImpl));
