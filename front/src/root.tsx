import * as React from 'react';

class RootImpl extends React.PureComponent<{}> {
  render() {
    return (
      <React.Fragment>
        <div>Cake Time!</div>
      </React.Fragment>
    );
  }
}

export const Root = RootImpl;
