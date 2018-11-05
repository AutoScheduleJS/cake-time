import { css } from 'emotion';
import { merge, mergeProps } from '../util/hoc.util';

interface BaseLayoutTheme {
  layout: {
    backgroundColor: string;
    color: string;
  };
}

const defaultTheme = (theme: any = { layout: {} }): BaseLayoutTheme =>
  merge(
    {
      layout: {
        backgroundColor: theme.palette.surface.background,
        color: theme.palette.surface.on,
      },
    } as BaseLayoutTheme,
    theme
  );

const themeToClassname = (theme: BaseLayoutTheme) => ({
  className: css`
    background-color: ${theme.layout.backgroundColor};
    color: ${theme.layout.color};
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  `,
});

export const BaseLayoutProps = (options: { customTheme?: any }) => {
  const { customTheme } = options;
  const theme = defaultTheme(customTheme);
  return mergeProps(themeToClassname(theme));
};
