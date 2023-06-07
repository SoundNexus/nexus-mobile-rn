import { createStackNavigator } from '@react-navigation/stack';
import { useMetamaskContext } from '../context/MetamaskContext';
import { LoginStack } from './auth/login';
import { HomeStack } from './main/home';

const Stack = createStackNavigator();

export const MainStack = () => {
  const { isAuthorized } = useMetamaskContext();

  if (isAuthorized) {
    return (
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="home" component={HomeStack} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="login" component={LoginStack} />
    </Stack.Navigator>
  );
};
