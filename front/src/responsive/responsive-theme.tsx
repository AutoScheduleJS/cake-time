import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';

interface ResponsiveThemeProps {
  baseTheme: any;
  rules: Array<{ key: string; query: string }>;
  handleBreakpoint: (theme: any, keys: { [key: string]: boolean }) => any;
}

export class ResponsiveTheme extends React.Component<ResponsiveThemeProps> {
  state: { theme: any };
  enabledRules: any;

  private mqls: Array<{ key: string; mql: MediaQueryList }>;

  constructor(props: ResponsiveThemeProps) {
    super(props);
    if (!window.matchMedia) {
      this.state = { theme: props.baseTheme };
      return;
    }

    this.mqls = props.rules.map(rule => ({
      key: rule.key,
      mql: window.matchMedia(rule.query),
    }));
    this.enabledRules = this.mqls.reduce(
      (acc, cur) => ({ ...acc, [cur.key]: cur.mql.matches }),
      {}
    );
    const theme = props.handleBreakpoint(props.baseTheme, this.enabledRules);
    this.state = { theme };
    this.handleMatchChange = this.handleMatchChange.bind(this);
    this.mqls.forEach(mql => mql.mql.addListener(this.handleMatchChange as any));
  }

  render() {
    const { children } = this.props;
    const theme = this.state.theme;
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }

  componentWillUnmount() {
    this.mqls.forEach(mql => mql.mql.removeListener(this.handleMatchChange as any));
  }

  private handleMatchChange(e: MediaQueryList) {
    /**
     *  Warning: if browser aren't unified about e.media formatting, it will not work.
     *  The other way involves building a handleMatchChange function for each rule,
     *  wich is cumbersome if you want to keep function reference for later listener removing.
     *  Seriously, it would be way simpler to keep a subscription ID...
     */
    const rule = this.props.rules.find(rule => rule.query === e.media);
    if (!rule) {
      return;
    }
    this.enabledRules[rule.key] = e.matches;
    this.setState({
      theme: this.props.handleBreakpoint(this.state.theme, this.enabledRules),
    });
  }
}
