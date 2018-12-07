import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { mergeProps } from './util/hoc.util';
import { Button, ButtonEmphaze } from './button/button';

interface CtProductCreationProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
  onNewProduct: (product: any) => void;
}

const computeHostStyles = {
  className: css``,
};

class CtProductCreationImpl extends React.PureComponent<CtProductCreationProps> {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  render() {
    const { theme, ...defaultHostProps } = this.props;
    const hostProps = mergeProps(defaultHostProps, computeHostStyles, {
      label: 'New product',
      emphaze: ButtonEmphaze.Medium
    });
    return <Button {...hostProps} />;
  }
}

export const CtProductCreation = withTheme(CtProductCreationImpl);
