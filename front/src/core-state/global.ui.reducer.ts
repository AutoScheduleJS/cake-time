import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { ICoreState } from './core.state';
import { actionType } from './core.store';
import { recipeTabUiReducer$, TabId } from './recipe-tab.ui.reducer';
import { scrimUiReducer$ } from './scrim.ui.reducer';

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
  return false;
};

export class UpdateNextCake {
  constructor(public nextCakeId: number) {}
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
