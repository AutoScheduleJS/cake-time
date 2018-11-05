import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ICoreState } from './core.state';
import { globalUiActionType, globalUiReducer$ } from './global.ui.reducer';
import { UIState } from './ui.state';

export type actionType = globalUiActionType;

export const actionTrigger$: Subject<actionType> = new Subject();

const stateFn = (
  initialState: ICoreState,
  actions$: Observable<actionType>
): Observable<ICoreState> => {
  const obs: Observable<ICoreState> = globalUiReducer$(initialState, actions$);

  const bs = new BehaviorSubject(initialState);
  obs.subscribe(v => bs.next(v));
  return bs;
};

const initialUIStateObj: UIState = {
  scrim: {
    displayScrim: false,
  },
};

const initialStateObj: ICoreState = {
  ui: initialUIStateObj,
};

export const coreState$ = stateFn(initialStateObj, actionTrigger$);
