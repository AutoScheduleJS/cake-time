import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { Typography } from '../typography/typography';
import { merge, mergeProps } from '../util/hoc.util';
import { PaddingProps } from '../responsive/padding';

interface CustomableProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
}

interface AppBarContentProps extends CustomableProps {
  title?: string;
}

interface AppBarContentTheme {
  appBar: {
    totalHeight: string;
    backgroundColor: string;
    color: string;
  };
}

const defaultTheme = (theme: any): AppBarContentTheme =>
  merge(
    {
      appBar: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.on,
      },
    } as AppBarContentTheme,
    theme
  );

const AppBarContentRootStyles = (theme: AppBarContentTheme) => {
  const appBar = theme.appBar;
  return {
    className: css`
      position: relative;
      display: flex;
      justify-content: center;
      height: ${appBar.totalHeight};
      background-color: ${appBar.backgroundColor};
      color: ${appBar.color};
    `,
  };
};

class AppBarContentLargeImpl extends React.PureComponent<AppBarContentProps> {
  render() {
    const {
      theme: incomingTheme,
      title = '',
      ...defaultHostProps
    } = this.props;
    const theme = defaultTheme(incomingTheme);
    const hostProps = mergeProps(
      PaddingProps(theme),
      AppBarContentRootStyles(theme),
      defaultHostProps
    );
    return (
      <div {...hostProps}>
        <Typography scale={'H1'}>
          {title}
        </Typography>
      </div>
    );
  }
}

/**
 * Follow https://material.io/design/components/app-bars-top.html#specs guide
 *
 * navigation icon (optional)
 *
 * title (optional)
 *
 * action button <- specify if it can / have to / can't overflow
 *
 * all default specs are in theme and can be customised by user
 *
 */
export const AppBarContentLarge = withTheme(AppBarContentLargeImpl);
