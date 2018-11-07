import * as React from 'react';
import { AppBarContentLarge } from './app-bar-content/app-bar-content-large';
import { AppBar } from './app-bar/app-bar';

export class CtAppbar extends React.PureComponent<{}> {
  render() {
    return (
      <AppBar>
        <AppBarContentLarge title="Cake Time!" />
      </AppBar>
    );
  }
}
