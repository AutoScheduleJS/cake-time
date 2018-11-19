import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { Button, ButtonEmphaze } from './button/button';
import { ICoreState } from './core-state/core.state';
import { coreState$ } from './core-state/core.store';
import { CtSubrecipeSelector } from './ct-subrecipe-selector';
import { Dialog, DialogProps } from './modal/dialog';
import { connect } from './util/connect';
import { stateHandler } from './util/hoc.util';

interface CtCakeTuneFromState {
  cakeId: string;
}

interface CtCakeTuneProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
  forwardedRef?: React.Ref<HTMLDivElement>;
}

interface CtCakeTuneState {
  subrecipeState: any;
}

class CtCakeTuneImpl extends React.PureComponent<CtCakeTuneFromState & CtCakeTuneProps> {
  state: CtCakeTuneState;

  constructor(props) {
    super(props);
    this.state = { subrecipeState: {} };
  }

  handleConfirmation = () => {};

  render() {
    const { style, cakeId, forwardedRef, theme: incomingTheme, ...defaultHostProps } = this.props;
    const {} = this.state;
    const dialogProps: DialogProps = {
      dialogTitle: 'Tune your cake',
      actions: [
        <Button // TODO: add a disable state - when no cake is selected
          emphaze={ButtonEmphaze.Medium}
          label={'confirm'}
          onClick={this.handleConfirmation}
        />,
      ],
      content: (
        <div>
          <CtSubrecipeSelector cakeCode={cakeId} subState={stateHandler(this, 'subrecipeState')} />
        </div>
      ),
      ...defaultHostProps,
    };
    return <Dialog style={style} ref={forwardedRef} {...dialogProps} />;
  }
}

const selector = ({ ui }: ICoreState): CtCakeTuneFromState => ({
  cakeId: ui.nextCake ? ui.nextCake.cakeId : '',
});
const CtCakeSelectorWithAll = connect(
  selector,
  coreState$
)<{}, CtCakeTuneFromState>(withTheme(CtCakeTuneImpl));

export const CtCakeSelector = React.forwardRef<HTMLDivElement, CtCakeTuneProps>(
  (props: any, ref) => <CtCakeSelectorWithAll {...props} forwardedRef={ref} />
);
