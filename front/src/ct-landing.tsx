import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { ICoreState } from './core-state/core.state';
import { coreState$ } from './core-state/core.store';
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
  render() {
    const { theme: incomingTheme, ...defaultHostProps } = this.props;
    /**
     * TODO: retrieve nextCake info from localStorage;
     */
    const theme = defaultTheme(incomingTheme);
    const hostProps = mergeProps(defaultHostProps, themeToHostStyles(theme));
    /**
     * TODO: use MorphWaa to transform cake selector to details (shopping & directions)
     */
    return <div {...hostProps} />;
  }
}

const selector = ({ ui }: ICoreState): CtLandingFromState => ({
  cakeId: ui.nextCake ? ui.nextCake.cakeId : undefined,
});
export const CtLanding = connect(
  selector,
  coreState$
)<{}, CtLandingFromState>(withTheme(CtLandingImpl));
