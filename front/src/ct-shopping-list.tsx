import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { ICoreState } from './core-state/core.state';
import { coreState$ } from './core-state/core.store';
import { connect } from './util/connect';
import { merge, mergeProps } from './util/hoc.util';

interface CtShoppingListFromState {
  cakeId?: number;
}

interface CtShoppingListProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
}

interface CtShoppingListTheme {}

interface ShoppingItem {
  name: string;
}

interface ShoppingListState {
  items: ShoppingItem[];
}

const defaultTheme = (theme: any): CtShoppingListTheme => merge({} as CtShoppingListTheme, theme);

const themeToHostStyles = (_: CtShoppingListTheme) => {
  return {
    className: css``,
  };
};

class CtShoppingListImpl extends React.PureComponent<
  CtShoppingListFromState & CtShoppingListProps
> {
  state: ShoppingListState;
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    fetch('/api/shopping-list', {
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
          console.error('Error while fetching my shopping list', err);
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
        Shopping List:
        {items.map(item => (
          <span>{item.name}</span>
        ))}
      </div>
    );
  }
}

const selector = ({ ui }: ICoreState): CtShoppingListFromState => ({
  cakeId: ui.nextCake ? ui.nextCake.cakeId : undefined,
});
export const CtShoppingList = connect(
  selector,
  coreState$
)<{}, CtShoppingListFromState>(withTheme(CtShoppingListImpl));
