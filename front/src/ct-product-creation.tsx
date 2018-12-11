import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { mergeProps } from './util/hoc.util';
import { Typography } from './typography/typography';
import { TextInput } from './text-input/text-input';
import { CtProductSelector } from './ct-product-selector';

interface CtProductCreationProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
  onNewProduct: (product: any) => void;
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

  render() {
    const { theme, ...defaultHostProps } = this.props;
    const hostProps = mergeProps(defaultHostProps, computeHostStyles);
    const { newProduct } = this.state;
    return (
      <div {...hostProps}>
        <Typography scale="H3">Product information</Typography>
        <TextInput label={name} value={newProduct.name || ''} onNewVal={this.handleNewName} />
        <CtProductSelector title={'Belongs to'} />
        <CtProductSelector title={'Children'} />
      </div>
    );
  }
}

export const CtProductCreation = withTheme(CtProductCreationImpl);
