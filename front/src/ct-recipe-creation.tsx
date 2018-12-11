import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { RecipeCreation } from './core-state/ui.state';
import { CtAddFromBtn } from './ct-add-from-btn';
import { CtProduct } from './ct-product';
import { CtProductSelector } from './ct-product-selector';
import { LayoutMasonry } from './layout-masonry/layout-masonry';
import { Typography } from './typography/typography';
import { merge, mergeProps } from './util/hoc.util';
import { CtEditRequirement } from './ct-edit-requirement';

interface CtRecipeCreationProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
  creation: RecipeCreation;
}

interface CtRecipeCreationTheme {
  recipeCreation: {
    productWidth: string;
  };
}

const defaultTheme = (theme: any): CtRecipeCreationTheme =>
  merge(
    {
      recipeCreation: {
        productWidth: '100px',
      },
    } as CtRecipeCreationTheme,
    theme
  );

const computeHostStyles = (_theme: CtRecipeCreationTheme) => {
  return {
    className: css``,
  };
};

interface CtRecipeCreationState {
  requiredProducts: any[];
  belongsTo: any[];
}

class CtRecipeCreationImpl extends React.PureComponent<CtRecipeCreationProps> {
  state: CtRecipeCreationState;
  constructor(props) {
    super(props);
    this.state = { requiredProducts: [], belongsTo: [] };
  }

  onAddedSelection = (key: 'requiredProducts' | 'belongsTo') => product => {
    this.setState({
      [key]: [...this.state[key], product],
    });
  };

  onDeletedSelection = (key: 'requiredProducts' | 'belongsTo') => product => {
    const newArr = this.state[key];
    const i = newArr.findIndex(prd => prd === product);
    newArr.splice(i, 1);
    this.setState({
      [key]: newArr,
    });
  };

  handleEditProduct = () => {};

  render() {
    const { creation, theme: incomingTheme, ...defaultHostProps } = this.props;
    const theme = defaultTheme(incomingTheme);
    const hostProps = mergeProps(defaultHostProps, computeHostStyles(theme));
    const { requiredProducts, belongsTo } = this.state;
    return (
      <div {...hostProps}>
        <Typography scale={'H3'}>What it needs</Typography>
        <LayoutMasonry itemWidth={theme.recipeCreation.productWidth}>
          {[
            ...requiredProducts.map(mapProduct(this.handleEditProduct)),
            <CtAddFromBtn
              btnLabel={'Add product'}
              toElem={CtEditRequirement}
              onAdded={this.onAddedSelection('requiredProducts')}
            />,
          ]}
        </LayoutMasonry>
        <CtProductSelector
          title={'Belongs to'}
          selected={belongsTo}
          onDeletedSelection={this.onDeletedSelection('belongsTo')}
          onAddedSelection={this.onAddedSelection('belongsTo')}
        />
      </div>
    );
  }
}

const mapProduct = (onClick: (product) => void) => (product: any) => (
  <CtProduct product={product} onClick={onClick} /> //MorphWaa from product to edit product
);

export const CtRecipeCreation = withTheme(CtRecipeCreationImpl);
