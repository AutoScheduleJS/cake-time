import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { merge, mergeProps } from './util/hoc.util';

interface CtProductProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
  product: any;
}

interface CtProductTheme {
  product: {};
}

const defaultTheme = (theme: any): CtProductTheme =>
  merge(
    {
      product: {},
    } as CtProductTheme,
    theme
  );

const computeHostStyles = (_theme: CtProductTheme) => {
  return {
    className: css``,
  };
};

class CtProductImpl extends React.PureComponent<CtProductProps> {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  render() {
    const { product, theme: incomingTheme, ...defaultHostProps } = this.props;
    const theme = defaultTheme(incomingTheme);
    const hostProps = mergeProps(defaultHostProps, computeHostStyles(theme));
    return <div {...hostProps}>{product}</div>;
  }
}

export const CtProduct = withTheme(CtProductImpl);
