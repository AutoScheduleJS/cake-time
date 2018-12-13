import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { ICoreState } from './core-state/core.state';
import { coreState$ } from './core-state/core.store';
import { connect } from './util/connect';
import { merge, mergeProps } from './util/hoc.util';

interface CtDirectionsFromState {
  cakeId?: string;
}

interface CtDirectionsProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
}

interface CtDirectionsTheme {}

interface DirectionItem {
  name: string;
}

interface DirectionsState {
  items: DirectionItem[];
}

const defaultTheme = (theme: any): CtDirectionsTheme => merge({} as CtDirectionsTheme, theme);

const themeToHostStyles = (_: CtDirectionsTheme) => {
  return {
    className: css``,
  };
};

class CtDirectionsImpl extends React.PureComponent<
  CtDirectionsFromState & CtDirectionsProps
> {
  state: DirectionsState;
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    fetch('/api/directions', {
      method: 'POST',
      body: JSON.stringify({ cakeId: this.props.cakeId }),
    })
      .then(res => res.json())
      .then(
        res => {
          this.setState({
            items: res,
          });
        },
        err => {
          console.error('Error while fetching my directions', err);
        }
      );
  }

  render() {
    const { cakeId, theme: incomingTheme, ...defaultHostProps } = this.props;
    const theme = defaultTheme(incomingTheme);
    const hostProps = mergeProps(defaultHostProps, themeToHostStyles(theme));
    const { items } = this.state;
    return (
      <div {...hostProps}>
        Directions:
        {items.map(item => (
          <span>{item.name}</span>
        ))}
      </div>
    );
  }
}

const selector = ({ ui }: ICoreState): CtDirectionsFromState => ({
  cakeId: ui.nextCake ? ui.nextCake.cakeId : undefined,
});
export const CtDirections = connect(
  selector,
  coreState$
)<{}, CtDirectionsFromState>(withTheme(CtDirectionsImpl));
