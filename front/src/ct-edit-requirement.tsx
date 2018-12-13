import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { merge, mergeProps } from './util/hoc.util';
import { CtProductSelector } from './ct-product-selector';
import { Dialog } from './modal/dialog';
import { Button, ButtonEmphaze } from './button/button';
import { TextInput } from './text-input/text-input';

interface CtEditRequirementProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
  product?: any;
  forwardedRef?: React.Ref<HTMLDivElement>;
  onAdded: (product: any) => void;
  onCancel: () => void;
}

interface CtEditRequirementTheme {
  product: {};
}

const defaultTheme = (theme: any): CtEditRequirementTheme =>
  merge(
    {
      product: {},
    } as CtEditRequirementTheme,
    theme
  );

const computeHostStyles = (_theme: CtEditRequirementTheme) => {
  return {
    className: css``,
  };
};

interface CtEditRequirementState {
  selectedProduct?: any;
  quantity?: number;
}

class CtEditRequirementImpl extends React.PureComponent<CtEditRequirementProps> {
  state: CtEditRequirementState;

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
    const { product, onCancel, onAdded, theme: incomingTheme, forwardedRef, ...defaultHostProps } = this.props;
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
        ref={forwardedRef}
        scrim={false}
        actions={[<Button emphaze={ButtonEmphaze.High} label={'Add'} onClick={this.onValidate} />]}
      />
    );
  }
}

const CtEditRequirementWithTheme = withTheme(CtEditRequirementImpl);

export const CtEditRequirement = React.forwardRef<HTMLDivElement, CtEditRequirementProps>((props, ref) => (
  <CtEditRequirementWithTheme {...props} forwardedRef={ref} />
));
