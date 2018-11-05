import { ICoreState } from './core.state';
import { actionType } from './core.store';

export class UpdateEditTab {
  constructor(public id: TabId) {}
}

export enum TabId {
  ShoppingList,
  Directions,
}

export type recipeTabUiActionType = UpdateEditTab;

export const recipeTabUiReducer$ = (state: ICoreState, action: actionType): ICoreState | false => {
  if (action instanceof UpdateEditTab) {
    return handleUpdate(state, action);
  }
  return false;
};

const handleUpdate = (state: ICoreState, action: UpdateEditTab): ICoreState => {
  if (!state.ui.nextCake) {
    console.warn('cannot update tab before selectiong next cake');
    return state;
  }
  return {
    ...state,
    ui: {
      ...state.ui,
      nextCake: {
        ...state.ui.nextCake,
        recipeTab: action.id
      }
    }
  };
};
