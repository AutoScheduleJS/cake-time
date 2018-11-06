import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { ICoreState } from './core-state/core.state';
import { coreState$ } from './core-state/core.store';
import { CtCakeSelector } from './ct-cake-selector';
import { connect } from './util/connect';
import { merge, mergeProps } from './util/hoc.util';

interface CtLandingFromState {
  cakeId?: number;
}

interface CtLandingProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
}

interface CtLandingTheme {}

const defaultTheme = (theme: any): CtLandingTheme => merge({} as CtLandingTheme, theme);

const themeToHostStyles = (_: CtLandingTheme) => {
  return {
    className: css``,
  };
};

class CtLandingImpl extends React.PureComponent<CtLandingFromState & CtLandingProps> {
  componentWillMount() {
    const cakeId = localStorage.getItem('cake-id');
    if (cakeId) {
      //TODO: action to fill cake infos
    }
  }
  render() {
    const { cakeId, theme: incomingTheme, ...defaultHostProps } = this.props;
    const theme = defaultTheme(incomingTheme);
    const hostProps = mergeProps(defaultHostProps, themeToHostStyles(theme));
    /**
     * TODO: use MorphWaa to transform cake selector to details (shopping & directions)
     * - no need of MorphWaa: just use the same parent layout ala GDoc and apply an height transition
     */
    if (!cakeId) {
      return <CtCakeSelector />;
    }
    return <div {...hostProps}>Directions</div>;
  }
}

const selector = ({ ui }: ICoreState): CtLandingFromState => ({
  cakeId: ui.nextCake ? ui.nextCake.cakeId : undefined,
});
export const CtLanding = connect(
  selector,
  coreState$
)<{}, CtLandingFromState>(withTheme(CtLandingImpl));
