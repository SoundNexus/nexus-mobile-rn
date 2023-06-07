/**
 * @format
 */
import 'react-native-get-random-values';
import './shim';
import '@ethersproject/shims';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { BuilderProviders } from './src/context/utils';

const AppWrapper = () => {
  return (
    <BuilderProviders>
      <App />
    </BuilderProviders>
  );
};

AppRegistry.registerComponent(appName, () => AppWrapper);
