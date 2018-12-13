import * as React from 'react';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { mergeProps } from './hoc.util';

export const connect = <T, U>(selector: (s: T) => U, state$: Observable<T>) => {
  return <C, U>(WrappedComponent: React.ComponentType<C & U & { children?: React.ReactNode }>) => {
    return class Connect extends React.Component<C> {
      private subscription;
      public componentWillMount() {
        this.subscription = state$.pipe(map(selector)).subscribe(res => this.setState(res));
      }

      public componentWillUnmount() {
        this.subscription.unsubscribe();
      }

      public render() {
        const hostProps = mergeProps(this.state, this.props);
        return <WrappedComponent {...hostProps} />;
      }
    };
  };
};
