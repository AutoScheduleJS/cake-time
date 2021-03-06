import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { CtAddFromBtn } from './ct-add-from-btn';
import { CtProduct } from './ct-product';
import { CtProductCreation } from './ct-product-creation';
import { LayoutMasonry } from './layout-masonry/layout-masonry';
import { TextInput } from './text-input/text-input';
import { Typography } from './typography/typography';
import { merge, mergeProps } from './util/hoc.util';

interface CtProductSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  onAddedSelection: (added: any) => void;
  onDeletedSelection: (deleted: any) => void;
  title: string;
  selected: any[];
  theme?: any;
}

interface CtProductSelectorTheme {
  productSelector: {
    itemWidth: string;
  };
}

const defaultTheme = (theme: any): CtProductSelectorTheme =>
  merge(
    {
      productSelector: {
        itemWidth: '100px',
      },
    } as CtProductSelectorTheme,
    theme
  );

const computeHostStyles = (_theme: CtProductSelectorTheme) => {
  return {
    className: css``,
  };
};

interface CtProductSelectorState {
  searchValue: string;
  result: any[];
}

class CtProductSelectorImpl extends React.PureComponent<CtProductSelectorProps> {
  state: CtProductSelectorState;

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      result: [],
    };
  }

  handleNewSearch = value => {
    this.setState({
      searchValue: value,
    });
  };

  render() {
    const {
      title,
      selected,
      onAddedSelection,
      onDeletedSelection,
      theme: incomingTheme,
      ...defaultHostProps
    } = this.props;
    const { searchValue, result } = this.state;
    const theme = defaultTheme(incomingTheme);
    const hostProps = mergeProps(defaultHostProps, computeHostStyles(theme));
    return (
      <div {...hostProps}>
        <Typography scale={'H3'}>{title}</Typography>
        <TextInput onNewVal={this.handleNewSearch} label={'Product name'} value={searchValue} />
        <div>{selected.map(mapProduct(onDeletedSelection))}</div>
        <LayoutMasonry itemWidth={theme.productSelector.itemWidth}>
          {[
            ...result.map(mapProduct(onAddedSelection)),
            <CtAddFromBtn
              btnLabel={'New product'}
              onAdded={onAddedSelection}
              toElem={CtProductCreation}
            />,
          ]}
        </LayoutMasonry>
      </div>
    );
  }
}

const mapProduct = (onClick: (product) => void) => (product: any) => (
  <CtProduct product={product} onClick={onClick} />
);

export const CtProductSelector = withTheme(CtProductSelectorImpl);
