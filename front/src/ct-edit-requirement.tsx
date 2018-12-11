import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { merge, mergeProps } from './util/hoc.util';
import { CtProductSelector } from './ct-product-selector';
import { Dialog } from './modal/dialog';
import { Button, ButtonEmphaze } from './button/button';
import { TextInput } from './text-input/text-input';

interface CtAddRequirementProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
  product?: any;
  onAdded: (product: any) => void;
  onCancel: () => void;
}

interface CtAddRequirementTheme {
  product: {};
}

const defaultTheme = (theme: any): CtAddRequirementTheme =>
  merge(
    {
      product: {},
    } as CtAddRequirementTheme,
    theme
  );

const computeHostStyles = (_theme: CtAddRequirementTheme) => {
  return {
    className: css``,
  };
};

interface CtAddRequirementState {
  selectedProduct?: any;
  quantity?: number;
}

class CtAddRequirementImpl extends React.PureComponent<CtAddRequirementProps> {
  state: CtAddRequirementState;

  constructor(props) {
    super(props);
    this.state = { selectedProduct: this.props.product };
  }

  onAddedSelection = product => {
    this.setState({
      product: [product],
    });
  };

  onValidate = () => {
    this.props.onAdded({
      ...this.state,
    });
  };

  render() {
    const { product, onCancel, onAdded, theme: incomingTheme, ...defaultHostProps } = this.props;
    const theme = defaultTheme(incomingTheme);
    const hostProps = mergeProps(defaultHostProps, computeHostStyles(theme));
    const { selectedProduct, quantity } = this.state;
    const content = (
      <div {...hostProps}>
        <CtProductSelector
          selected={selectedProduct ? [selectedProduct] : []}
          title={'Product selection'}
          onDeletedSelection={() => {}}
          onAddedSelection={this.onAddedSelection}
        />
        <TextInput
          value={'' + quantity}
          label={'Quantity'}
          onNewVal={val => this.setState({ quantity: +val })}
        />
      </div>
    );
    return (
      <Dialog
        content={content}
        onCancel={onCancel}
        scrim={false}
        actions={[<Button emphaze={ButtonEmphaze.High} label={'Add'} onClick={this.onValidate} />]}
      />
    );
  }
}

export const CtEditRequirement = withTheme(CtAddRequirementImpl);
