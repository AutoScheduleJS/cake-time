import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { ICoreState } from './core-state/core.state';
import { coreState$ } from './core-state/core.store';
import { CtCakeSelector } from './ct-cake-selector';
import { CtRecipe } from './ct-recipe';
import { connect } from './util/connect';
import { merge, mergeProps } from './util/hoc.util';
import { MorphWaa } from './util/morph-waa';
import { RecipeCreation } from './core-state/ui.state';
import { CtRecipeCreation } from './ct-recipe-creation';

interface CtLandingFromState {
  cakeId?: string;
  recipeCreation?: RecipeCreation;
}

interface CtLandingProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
}

interface CtLandingTheme {}

const defaultTheme = (theme: any): CtLandingTheme => merge({} as CtLandingTheme, theme);

const themeToHostStyles = (_: CtLandingTheme) => {
  return {
    className: css`
      display: flex;
      justify-content: center;
    `,
  };
};

class CtLandingImpl extends React.PureComponent<CtLandingFromState & CtLandingProps> {
  componentWillMount() {
    const cakeId = localStorage.getItem('cake-id');
    if (cakeId) {
      //TODO: action to fill cake infos
    }
  }
  render() {
    const { cakeId, recipeCreation, theme: incomingTheme, ...defaultHostProps } = this.props;
    const theme = defaultTheme(incomingTheme);
    const hostProps = mergeProps(defaultHostProps, themeToHostStyles(theme));
    return (
      <div {...hostProps}>
        {
          recipeCreation ? <CtRecipeCreation creation={recipeCreation}/> :

        <MorphWaa
          FromElem={CtCakeSelector}
          ToElem={CtRecipe}
          state={cakeId ? 'to' : 'from'}
          keepFrom={true} //TODO: fix when keepFrom=false
        />
      }
      </div>
    );
  }
}

const selector = ({ ui }: ICoreState): CtLandingFromState => ({
  cakeId: ui.nextCake ? ui.nextCake.cakeId : undefined,
  recipeCreation: ui.recipeCreation
});
export const CtLanding = connect(
  selector,
  coreState$
)<{}, CtLandingFromState>(withTheme(CtLandingImpl));
