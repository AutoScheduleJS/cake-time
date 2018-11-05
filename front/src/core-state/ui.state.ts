import { TabId } from './recipe-tab.ui.reducer';
import { ScrimUI } from './scrim.ui.reducer';

export interface NextCakeUI {
  cakeId: number;
  recipeTab: TabId;
}

export interface UIState {
  nextCake?: NextCakeUI;
  scrim: ScrimUI;
}
