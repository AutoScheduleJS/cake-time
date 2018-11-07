import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import { ICoreState } from './core-state/core.state';
import { actionTrigger$, coreState$ } from './core-state/core.store';
import { TabId, UpdateEditTab } from './core-state/recipe-tab.ui.reducer';
import { CtDirections } from './ct-directions';
import { CtShoppingList } from './ct-shopping-list';
import { TabsFixed, TabsFixedPlacement, TabsFixedProps } from './tabs-fixed/tabs-fixed';
import { connect } from './util/connect';

const selector = ({ ui }: ICoreState) => ({
  activeTab: `${ui.nextCake && ui.nextCake.recipeTab}`,
});

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type TabsWithoutIndex = Omit<TabsFixedProps, 'activeTab'>;

const TabsFixedInner = connect(
  selector,
  coreState$
)<TabsWithoutIndex, { activeTab: string }>(TabsFixed);

const handleNewTab = (tabId: string) => actionTrigger$.next(new UpdateEditTab(+tabId));

interface CtRecipeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  forwardedRef?: React.Ref<HTMLDivElement>;
}

const adjustedTheme = ancestorTheme => ({
  ...ancestorTheme,
  tabs: { ...ancestorTheme.tabs, backgroundColor: '' },
});

class CtRecipeImpl extends React.PureComponent<CtRecipeProps> {
  render() {
    const { forwardedRef, ...defaultHostProps } = this.props;
    const tabs = [
      { label: 'Shopping List', id: `${TabId.ShoppingList}` },
      {
        label: 'Directions',
        id: `${TabId.Directions}`,
      },
    ];
    return (
      <ThemeProvider theme={adjustedTheme}>
        <div ref={forwardedRef}>
          <TabsFixedInner
            placement={TabsFixedPlacement.Centered}
            onTabChange={handleNewTab}
            tabs={tabs}
            {...defaultHostProps}
          >
            <CtShoppingList />
            <CtDirections />
          </TabsFixedInner>
        </div>
      </ThemeProvider>
    );
  }
}

export const CtRecipe = React.forwardRef<HTMLDivElement, CtRecipeProps>((props: any, ref) => (
  <CtRecipeImpl {...props} forwardedRef={ref} />
));
