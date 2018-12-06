import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { RecipeCreation } from './core-state/ui.state';
import { merge, mergeProps } from './util/hoc.util';

interface CtRecipeCreationProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
  creation: RecipeCreation;
}

interface CtRecipeCreationTheme {
  recipeCreation: {};
}

const defaultTheme = (theme: any): CtRecipeCreationTheme =>
  merge(
    {
      recipeCreation: {},
    } as CtRecipeCreationTheme,
    theme
  );

const computeHostStyles = (_theme: CtRecipeCreationTheme) => {
  return {
    className: css``,
  };
};

class CtRecipeCreationImpl extends React.PureComponent<CtRecipeCreationProps> {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  render() {
    const { creation, theme: incomingTheme, ...defaultHostProps } = this.props;
    const theme = defaultTheme(incomingTheme);
    const hostProps = mergeProps(defaultHostProps, computeHostStyles(theme));
    return (
      <div {...hostProps}>
      </div>
    );
  }
}

export const CtRecipeCreation = withTheme(CtRecipeCreationImpl);
