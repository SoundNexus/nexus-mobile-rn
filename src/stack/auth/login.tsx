import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { useMetamaskContext } from '../../context/MetamaskContext';
import { useMemo } from 'react';
import { Buffer } from 'buffer';

export const LoginStack = () => {
  const { value, dispatch, ethereum } = useMetamaskContext();

  const onClickMetamask = async () => {
    if (ethereum) {
      if (ethereum.selectedAddress) {
        dispatch({
          type: 'metamask.update',
          payload: { address: ethereum.selectedAddress },
        });
        await onSignMetamask(ethereum.selectedAddress);
      } else {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        if (accounts?.length > 0) {
          dispatch({
            type: 'metamask.update',
            payload: { address: accounts[0] },
          });
          await onSignMetamask(accounts[0]);
        }
      }
    }
  };

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
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="bg-white h-full p-5"
      >
        <View className="h-[200px] bg-[#eaeaea] rounded-[16px] p-4">
          <Text className="text-[24px] font-bold text-center mb-4">
            Webmint
          </Text>
          <TouchableHighlight
            className="flex items-center justify-center m-1 rounded-full p-4 bg-[#B6B6B6]"
            activeOpacity={1}
            underlayColor={'#737373'}
            onPress={() => onClickMetamask()}
          >
            <Text className="text-white">Metamask</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
