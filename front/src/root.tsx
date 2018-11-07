import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { BaseLayoutProps } from './base-layout/base-layout';
import { CtAppbar } from './ct-appbar';
import { CtLanding } from './ct-landing';

class RootImpl extends React.PureComponent<{ theme?: any }> {
  render() {
    const { theme } = this.props;
    return (
      <div {...BaseLayoutProps({ customTheme: theme })}>
        <CtAppbar />
        <CtLanding />
      </div>
    );
  }
}

export const Root = withTheme(RootImpl);
