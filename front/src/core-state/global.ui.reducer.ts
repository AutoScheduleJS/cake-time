import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { ICoreState } from './core.state';
import { actionType } from './core.store';
import { recipeTabUiReducer$ } from './recipe-tab.ui.reducer';
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
  return false;
};
