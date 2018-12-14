import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { Button, ButtonEmphaze } from './button/button';
import { mergeProps } from './util/hoc.util';
import { MorphWaa } from './util/morph-waa';

interface CtAddFromBtnProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
  btnLabel: string;
  onAdded: (product: any) => void;
  toElem: React.ComponentType<any>;
}

const computeHostStyles = {
  className: css``,
};

interface CtAddFromBtnState {
  isCreating: boolean;
}

class CtAddFromBtnImpl extends React.PureComponent<CtAddFromBtnProps> {
  state: CtAddFromBtnState;
  constructor(props) {
    super(props);
    this.state = { isCreating: false };
  }

  render() {
    const { theme, btnLabel, toElem, ...defaultHostProps } = this.props;
    const hostProps = mergeProps(defaultHostProps, computeHostStyles);
    const fromProps = {
      label: btnLabel,
      emphaze: ButtonEmphaze.Medium,
      onClick: () => {
        this.setState({ isCreating: true });
      },
    };
    const toProps = {
      onAdded: this.props.onAdded,
      onCancel: () => this.setState({ isCreating: false }),
    };
    return (
      <MorphWaa
        FromElem={Button}
        ToElem={toElem}
        state={this.state.isCreating ? 'to' : 'from'}
        keepFrom={true}
        fromProps={fromProps}
        toProps={toProps}
        {...hostProps}
      />
    );
  }
}

export const CtAddFromBtn = withTheme(CtAddFromBtnImpl);
