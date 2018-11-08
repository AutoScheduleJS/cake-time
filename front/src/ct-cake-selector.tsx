import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { CardProps } from './card/card';
import { ICoreState } from './core-state/core.state';
import { actionTrigger$, coreState$ } from './core-state/core.store';
import { UpdateNextCake } from './core-state/global.ui.reducer';
import { Dialog, DialogProps } from './modal/dialog';
import { connect } from './util/connect';
import { merge, mergeProps } from './util/hoc.util';
import { Button, ButtonEmphaze } from './button/button';

interface CtCakeSelectorFromState {
  cakeId?: number;
}

interface CtCakeSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
  forwardedRef?: React.Ref<HTMLDivElement>;
}

interface CtCakeSelectorTheme {}

interface CakeSuggestion {
  name: string;
  id: any;
}

interface CtCakeState {
  suggestions: CakeSuggestion[];
}

const defaultTheme = (theme: any): CtCakeSelectorTheme => merge({} as CtCakeSelectorTheme, theme);

const themeToHostStyles = (_: CtCakeSelectorTheme) => {
  return {
    className: css`
      height: 120px;
    `,
  };
};

class CtCakeSelectorImpl extends React.PureComponent<
  CtCakeSelectorFromState & CtCakeSelectorProps
> {
  state: CtCakeState;

  constructor(props) {
    super(props);
    this.state = { suggestions: [] };
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

  handleSuggestion = (suggest: CakeSuggestion) => {
    actionTrigger$.next(new UpdateNextCake(suggest.id));
  };

  render() {
    const { style, cakeId, forwardedRef, theme: incomingTheme, ...defaultHostProps } = this.props;
    const { suggestions } = this.state;
    const theme = defaultTheme(incomingTheme);
    const hostProps = mergeProps(defaultHostProps, CardProps({}), themeToHostStyles(theme));
    const dialogProps: DialogProps = {
      dialogTitle: 'Your next cake',
      actions: [
        <Button emphaze={ButtonEmphaze.Medium} label={'confirm'} />
      ],
      content: (
        <div>
          {suggestions.map(suggest => (
            <span onClick={_ => this.handleSuggestion(suggest)}>{suggest.name}</span>
          ))}
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
