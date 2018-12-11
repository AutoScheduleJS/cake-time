import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { Button, ButtonEmphaze } from './button/button';
import { CtProductSelector } from './ct-product-selector';
import { TextInput } from './text-input/text-input';
import { Typography } from './typography/typography';
import { mergeProps } from './util/hoc.util';
import { Dialog } from './modal/dialog';

interface CtProductCreationProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
  forwardedRef?: React.Ref<HTMLDivElement>;
  onAdded: (product: any) => void;
  onCancel: () => void;
}

const computeHostStyles = {
  className: css``,
};

interface CtProductCreationState {
  newProduct: {
    name?: string;
    belongs: any[];
    children: any[];
  };
}

class CtProductCreationImpl extends React.PureComponent<CtProductCreationProps> {
  state: CtProductCreationState;

  constructor(props) {
    super(props);
    this.state = { newProduct: { belongs: [], children: [] } };
  }

  handleNewName = name => {
    this.setState({
      newProduct: {
        ...this.state.newProduct,
        name,
      },
    });
  };

  handleProductSelector = (key: 'belongs' | 'children') => {
    return {
      selected: this.state.newProduct[key],
      onAddedSelection: product => {
        this.setState({
          newProduct: {
            ...this.state.newProduct,
            [key]: [...this.state.newProduct[key], product],
          },
        } as CtProductCreationState);
      },
      onDeletedSelection: product => {
        const i = this.state.newProduct[key].findIndex(p => p === product);
        const newArr = [...this.state.newProduct[key]];
        newArr.splice(i, 1);
        this.setState({
          newProduct: {
            ...this.state.newProduct,
            [key]: newArr,
          },
        } as CtProductCreationState);
      },
    };
  };

  handleCreation = () => {
    this.props.onAdded({
      ...this.state.newProduct,
    });
  };

  render() {
    const { style, forwardedRef, theme, ...defaultHostProps } = this.props;
    const hostProps = mergeProps(defaultHostProps, computeHostStyles);
    const { newProduct } = this.state;
    const content = (
      <div>
        <Typography scale="H3">Product information</Typography>
        <TextInput label={name} value={newProduct.name || ''} onNewVal={this.handleNewName} />
        <CtProductSelector title={'Belongs to'} {...this.handleProductSelector('belongs')} />
        <CtProductSelector title={'Children'} {...this.handleProductSelector('children')} />
      </div>
    );
    const dialogProps = {
      actions: [
        <Button emphaze={ButtonEmphaze.High} label={'Create'} onClick={this.handleCreation} />,
      ],
      content,
      onCancel: this.props.onCancel,
      hostProps,
    };
    return <Dialog style={style} ref={forwardedRef} {...dialogProps} scrim={true} />;
  }
}

const CtProductCreationWithTheme = withTheme(CtProductCreationImpl);

export const CtProductCreation = React.forwardRef<HTMLDivElement, CtProductCreationProps>(
  (props: any, ref) => <CtProductCreationWithTheme {...props} forwardedRef={ref} />
);
