import { TabId } from './recipe-tab.ui.reducer';
import { ScrimUI } from './scrim.ui.reducer';

export interface NextCakeUI {
  cakeId: string;
  recipeTab: TabId;
}

export interface RecipeCreation {

}

export interface UIState {
  nextCake?: NextCakeUI;
  recipeCreation?: RecipeCreation;
  scrim: ScrimUI;
}
