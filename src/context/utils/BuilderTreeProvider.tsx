import React from 'react';
import { MetamaskContextProvider } from '../MetamaskContext';

const BuildProviderTree = (providers: Array<any>): any => {
  if (providers.length === 1) {
    return providers[0];
  }
  const A = providers.shift();
  const B = providers.shift();
  return BuildProviderTree([
    ({ children }: { children: any }) => (
      <A>
        <B>{children}</B>
      </A>
    ),
    ...providers,
  ]);
};

export const BuilderProviders = BuildProviderTree([MetamaskContextProvider]);
