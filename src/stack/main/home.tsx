import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Buffer } from 'buffer';
import { useMetamaskContext } from '../../context/MetamaskContext';

export const HomeStack = () => {
  const { value, ethereum } = useMetamaskContext();


  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="bg-white h-full p-5"
      >
        <View>
          <Text>Address: {value?.address}</Text>
          <Text>Signature: {value?.signature}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
