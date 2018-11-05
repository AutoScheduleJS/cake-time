import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { BaseLayoutProps } from './base-layout/base-layout';

class RootImpl extends React.PureComponent<{ theme?: any }> {
  render() {
    const { theme } = this.props;
    return <div {...BaseLayoutProps({ customTheme: theme })}>Cake Time!</div>;
  }
}

export const Root = withTheme(RootImpl);
