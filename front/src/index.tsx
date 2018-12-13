import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { breakpoints, BreakpointsEnum } from './responsive/breakpoints';
import { ResponsiveTheme } from './responsive/responsive-theme';
import { Root } from './root';
import { merge } from './util/hoc.util';

const emotionTheme = {
  layout: {
    name: 'large',
    gutter: '24px',
    margin: '24px',
  },
  dialog: {
    fullscreen: false,
  },
  appBar: {
    backgroundColor: '#232321',
    elevation: 0,
    totalHeight: '150px',
  },
  effectRiple: {
    color: '#613154',
  },
  palette: {
    primary: {
      main: '#1a2873',
      lightVariant: '#757DE8',
      darkVariant: '#002984',
      on: '#613154',
    },
    secondary: {
      // Copy of primary
      main: '#1a2873',
      lightVariant: '#B6FFFF',
      darkVariant: '#4BA3C7',
      on: '#FFFFFF',
    },
    surface: {
      main: '#424242',
      background: '#232321',
      on: '#1a2873',
      highEmphase: 'DD',
      mediumEmphase: '99',
      disabled: '61',
    },
  },
};

const breakKeyToNewTheme = (oldTheme: any, key: string): any => {
  const widthKey = +key;
  if (Number.isNaN(widthKey)) {
    return;
  }
  if (widthKey < BreakpointsEnum.small2) {
    if (oldTheme.layout.name === 'small') {
      return;
    }
    return {
      layout: { name: 'small', gutter: '16px', margin: '16px' },
      dialog: { fullscreen: true },
    };
  }
  if (widthKey < BreakpointsEnum.medium1) {
    if (oldTheme.layout.name === 'small4') {
      return;
    }
    return { layout: { name: 'small4' }, dialog: { fullscreen: false } };
  }
  if (oldTheme.layout.name !== 'large') {
    return {
      layout: { name: 'large', gutter: '24px', margin: '24px' },
      dialog: { fullscreen: true },
    };
  }
};

const handleBreakpoints = (theme: any, keys: string[]) => {
  return keys.reduce((acc, key) => {
    return merge(acc, breakKeyToNewTheme(acc, key));
  }, theme);
};

const rules = Object.entries(breakpoints).map(([key, val], i, arr) => {
  const query = `(min-width: ${val}px)`;
  if (i === arr.length - 1) {
    return { key, query };
  }
  return { key, query: `(max-width: ${arr[i + 1][1] - 1}px) and ${query}` };
});

const app = (
  <ResponsiveTheme baseTheme={emotionTheme} rules={rules} handleBreakpoint={handleBreakpoints}>
    <Root />
  </ResponsiveTheme>
);

ReactDOM.render(app, document.getElementById('app'));
