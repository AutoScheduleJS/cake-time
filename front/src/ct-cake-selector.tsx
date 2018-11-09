import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { Button, ButtonEmphaze } from './button/button';
import { ICoreState } from './core-state/core.state';
import { actionTrigger$, coreState$ } from './core-state/core.store';
import { UpdateNextCake } from './core-state/global.ui.reducer';
import { CakeSuggestion, CtSuggestion } from './ct-suggestion';
import { Dialog, DialogProps } from './modal/dialog';
import { connect } from './util/connect';

interface CtCakeSelectorFromState {
  cakeId?: number;
}

interface CtCakeSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
  forwardedRef?: React.Ref<HTMLDivElement>;
}

interface CtCakeState {
  suggestions: CakeSuggestion[];
  selected: CakeSuggestion | undefined;
}

const suggestionsClassname = css`
  display: flex;
  justify-content: space-around;
`;
class CtCakeSelectorImpl extends React.PureComponent<
  CtCakeSelectorFromState & CtCakeSelectorProps
> {
  state: CtCakeState;

  constructor(props) {
    super(props);
    this.state = { suggestions: [], selected: undefined };
  }

  componentDidMount() {
    fetch('/api/my-suggestions', { method: 'POST' })
      .then(res => res.json())
      .then(
        res => {
          this.setState({
            suggestions: res,
          });
        },
        err => {
          console.error('Error while fetching my suggestions', err);
        }
      );
  }

  handleNewCakeSelection = (suggest: CakeSuggestion) => {
    this.setState({ selected: suggest });
  };

  handleConfirmation = () => {
    if (!this.state.selected) {
      return;
    }
    actionTrigger$.next(new UpdateNextCake(this.state.selected.id));
  };

  render() {
    const { style, cakeId, forwardedRef, theme: incomingTheme, ...defaultHostProps } = this.props;
    const { suggestions, selected } = this.state;
    const dialogProps: DialogProps = {
      dialogTitle: 'Your next cake',
      actions: [
        <Button // TODO: add a disable state - when no cake is selected
          emphaze={ButtonEmphaze.Medium}
          label={'confirm'}
          onClick={this.handleConfirmation}
        />,
      ],
      content: (
        <div>
          <div className={suggestionsClassname}>
            {suggestions.map(suggest => (
              <CtSuggestion
                suggestion={suggest}
                selected={suggest === selected}
                onClick={_ => this.handleNewCakeSelection(suggest)}
              />
            ))}
          </div>
        </div>
      ),
      ...defaultHostProps,
    };
    return <Dialog style={style} ref={forwardedRef} {...dialogProps} />;
  }
}

const selector = ({ ui }: ICoreState): CtCakeSelectorFromState => ({
  cakeId: ui.nextCake ? ui.nextCake.cakeId : undefined,
});
const CtCakeSelectorWithAll = connect(
  selector,
  coreState$
)<{}, CtCakeSelectorFromState>(withTheme(CtCakeSelectorImpl));

export const CtCakeSelector = React.forwardRef<HTMLDivElement, CtCakeSelectorProps>(
  (props: any, ref) => <CtCakeSelectorWithAll {...props} forwardedRef={ref} />
);
