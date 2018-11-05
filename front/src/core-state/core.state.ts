import { UIState } from './ui.state';

export enum StepOption {
  every,
  last,
}

export interface ICoreState {
  readonly ui: UIState;
}
