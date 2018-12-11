import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { mergeProps } from './util/hoc.util';
import { Button, ButtonEmphaze } from './button/button';
import { MorphWaa } from './util/morph-waa';
import { CtProductCreation, CtProductCreationProps } from './ct-product-creation';

interface CtNewProductProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
  onNewProduct: (product: any) => void;
}

const computeHostStyles = {
  className: css``,
};

interface CtNewProductState {
  isCreating: boolean;
}

class CtNewProductImpl extends React.PureComponent<CtNewProductProps> {
  state: CtNewProductState;
  constructor(props) {
    super(props);
    this.state = { isCreating: false };
  }

  render() {
    const { theme, ...defaultHostProps } = this.props;
    const hostProps = mergeProps(defaultHostProps, computeHostStyles);
    const fromProps = {
      label: 'New product',
      emphaze: ButtonEmphaze.Medium,
      onClick: () => {
        this.setState({ isCreating: true });
      },
    };
    const toProps: CtProductCreationProps = {
      onNewProduct: this.props.onNewProduct,
      onCancel: () => this.setState({ isCreating: false })
    };
    return (
      <MorphWaa
        FromElem={Button}
        ToElem={CtProductCreation}
        state={this.state.isCreating ? 'from' : 'to'}
        keepFrom={true}
        fromProps={fromProps}
        toProps={toProps}
        {...hostProps}
      />
    );
  }
}

export const CtNewProduct = withTheme(CtNewProductImpl);
