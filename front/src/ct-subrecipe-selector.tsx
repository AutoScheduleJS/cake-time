import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { CakeSuggestion } from './ct-suggestion';
import { IStateHandler } from './util/hoc.util';

interface CtSubrecipeSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  cakeCode: string;
  subState: IStateHandler;
  theme?: any;
  forwardedRef?: React.Ref<HTMLDivElement>;
}

class CtSubrecipeSelectorImpl extends React.PureComponent<CtSubrecipeSelectorProps> {
  constructor(props) {
    super(props);
  }

  handleNewCakeSelection = (suggest: CakeSuggestion) => {
    this.setState({ selected: suggest });
    fetch('/api/recipe-info', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: suggest.code }),
    })
      .then(res => res.json())
      .then(
        res => {
          console.log('response !', res);
        },
        err => {
          console.error('Error while fetching recipe info', err);
        }
      );
  };

  render() {
    const { cakeCode, forwardedRef, theme: incomingTheme, ...defaultHostProps } = this.props;
    return <div {...defaultHostProps} />;
  }
}

const CtSubrecipeSelectorWithTheme = withTheme(CtSubrecipeSelectorImpl);

export const CtSubrecipeSelector = React.forwardRef<HTMLDivElement, CtSubrecipeSelectorProps>(
  (props: any, ref) => <CtSubrecipeSelectorWithTheme {...props} forwardedRef={ref} />
);
