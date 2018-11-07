import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { BaseLayoutProps } from './layout/base-layout';
import { CtAppbar } from './ct-appbar';
import { CtLanding } from './ct-landing';
import { Scrim } from './modal/scrim';

class RootImpl extends React.PureComponent<{ theme?: any }> {
  render() {
    const { theme } = this.props;
    return (
      <div {...BaseLayoutProps({ customTheme: theme })}>
        <CtAppbar />
        <CtLanding />
        <Scrim />
      </div>
    );
  }
}

export const Root = withTheme(RootImpl);
