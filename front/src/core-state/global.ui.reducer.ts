import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { ICoreState } from './core.state';
import { actionType } from './core.store';
import { recipeTabUiReducer$, TabId } from './recipe-tab.ui.reducer';
import { scrimUiReducer$ } from './scrim.ui.reducer';
import { RecipeCreation } from './ui.state';

export type globalUiActionType = any;

export const globalUiReducer$ = (
  init: ICoreState,
  action$: Observable<actionType>
): Observable<ICoreState> => {
  return action$.pipe(
    scan((state: ICoreState, action: actionType) => {
      const reducers = [recipeTabUiReducer$, scrimUiReducer$, globalReducer];
      let res: false | ICoreState = false;
      while (!res) {
        const reducer = reducers.pop();
        if (!reducer) {
          return state;
        }
        res = reducer(state, action);
      }
      return res;
    }, init)
  );
};

const globalReducer = (state: ICoreState, action: actionType): ICoreState | false => {
  if (action instanceof UpdateNextCake) {
    return handleUpdateNextCake(state, action);
  }
  if (action instanceof UpdateRecipeCreation) {
    return handleUpdateRecipeCreation(state, action);
  }
  return false;
};

export class UpdateRecipeCreation {
  constructor(public recipeCreation: RecipeCreation) {}
}
const handleUpdateRecipeCreation = (state: ICoreState, action: UpdateRecipeCreation): ICoreState => {
  return {
    ...state,
    ui: {
      ...state.ui,
      recipeCreation: action.recipeCreation
    }
  }
}

export class UpdateNextCake {
  constructor(public nextCakeId: string) {}
}
const handleUpdateNextCake = (state: ICoreState, action: UpdateNextCake): ICoreState => {
  return {
    ...state,
    ui: {
      ...state.ui,
      nextCake: {
        ...state.ui.nextCake,
        cakeId: action.nextCakeId,
        recipeTab: TabId.ShoppingList,
      },
    },
  };
};
