import React, { useMemo } from 'react';
import {createContext, useContext, useReducer} from 'react';
import update from 'immutability-helper';
import {PayloadAction} from './utils';

export interface MetamaskContextState {
  address?: string;
  signature?: string;
  ethereum?: any;
}

export type MetamaskContextAction = 'metamask.update' | 'metamask.reset';

export interface MetamaskContextType {
  value: MetamaskContextState;
  dispatch: (
    payload: Partial<
      PayloadAction<Partial<MetamaskContextState>, MetamaskContextAction>
    >,
  ) => void;
  ethereum?: any;
  isAuthorized?: boolean;
}

const initialState: MetamaskContextState = {
  address: undefined,
  signature: undefined,
  ethereum: undefined,
};

const reducer = (
  state: MetamaskContextState,
  payload: Partial<
    PayloadAction<Partial<MetamaskContextState>, MetamaskContextAction>
  >,
) => {
  switch (payload.type) {
    case 'metamask.update':
      if (payload.payload) {
        return update(state, {
          $merge: payload.payload,
        });
      }
      return;
    case 'metamask.reset':
      return update(state, {
        $merge: initialState,
      });
    default:
      return state;
  }
};

const MetamaskContext = createContext<MetamaskContextType>({
  value: initialState,
  dispatch: () => {},
});

export const useMetamaskContext = () => {
  const context = useContext<MetamaskContextType>(MetamaskContext);
  if (!context) {
    throw new Error(
      'useMetamaskContext must be used within a MetamaskContextProvider',
    );
  }
  return context;
};

export const MetamaskContextProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [value, dispatch] = useReducer(
    reducer,
    initialState,
    initialize => initialize,
  );

  const ethereum = useMemo(() => value?.ethereum, [value]);
    const isAuthorized = useMemo(() => value?.address && value?.signature, [value])

  return (
    <MetamaskContext.Provider
      value={{
        value,
        dispatch,
        ethereum,
        isAuthorized,
      }}>
      {children}
    </MetamaskContext.Provider>
  );
};
