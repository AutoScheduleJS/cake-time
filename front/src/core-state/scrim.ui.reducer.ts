import { ICoreState } from './core.state';
import { actionType } from './core.store';

export class UpdateScrim {
  constructor(public scrim: ScrimUI) {}
}

export interface ScrimUI {
  displayScrim: boolean;
  handleClick?: () => void;
}

export type scrimUiActionType = UpdateScrim;

export const scrimUiReducer$ = (state: ICoreState, action: actionType): ICoreState | false => {
  if (action instanceof UpdateScrim) {
    return handleUpdate(state, action);
  }
  return false;
};

const handleUpdate = (state: ICoreState, action: UpdateScrim): ICoreState => {
  return { ...state, ui: { ...state.ui, scrim: action.scrim } };
};
