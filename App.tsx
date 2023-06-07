/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import MetaMaskSDK from '@metamask/sdk';
import BackgroundTimer from 'react-native-background-timer';
import { NavigationContainer } from '@react-navigation/native';

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Linking,
  Button,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { BuilderProviders } from './src/context/utils';
import { MainStack } from './src/stack';
import { useMetamaskContext } from './src/context/MetamaskContext';
import { Buffer } from 'buffer';

const sdk = new MetaMaskSDK({
  openDeeplink: (link: string) => {
    Linking.openURL(link); // Use React Native Linking method or another way of opening deeplinks.
  },
  timer: BackgroundTimer, // To keep the dapp alive once it goes to background.
  dappMetadata: {
    name: 'Webmint', // The name of your dapp.
    url: 'https://app.webmint.io', // The URL of your website.
  },
});

const ethereum = sdk.getProvider();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const { dispatch } = useMetamaskContext();
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  useEffect(() => {
    if (ethereum && ethereum?.selectedAddress) {
      dispatch({
        type: 'metamask.update',
        payload: { ethereum, address: ethereum.selectedAddress },
      });
      onSignMetamask(ethereum.selectedAddress)
    } else {
      dispatch({ type: 'metamask.update', payload: { ethereum } });
    }
  }, []);


  const onSignMetamask = async (address: string) => {
    if (ethereum && address) {
      const message = `0x${Buffer.from('hello world').toString('hex')}`;
      const sign = await ethereum.request({
        method: 'personal_sign',
        params: [message, address, 'Sample Password'],
      });
      dispatch({
        type: 'metamask.update',
        payload: { signature: sign },
      });
      console.log('signature', sign);
    }
  };

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

export default App;
