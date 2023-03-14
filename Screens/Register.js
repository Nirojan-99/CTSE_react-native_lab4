import {View, Text, Input, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import {register} from '../Firebase/firebase';
import {useNavigation} from '@react-navigation/native';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setError] = useState();

  const navigation = useNavigation();

  //submit handler
  const registerUser = async () => {
    setError('');
    if (!email?.trim() || !password?.trim()) {
      setError('Require valid values');
    } else {
      const res = await register(email, password);
      if (res) {
        navigation.reset({
          index: 0,
          routes: [{name: 'details'}],
        });
      } else {
        setError('Unable to register try again');
      }
    }
  };

  return (
    <View className="h-full w-full flex-1 flex-col items-center justify-center p-4">
      <View className="flex-row border-[#1C6758] border-2 rounded-lg p-2 items-center mb-5">
        <TextInput
          value={email}
          onChangeText={val => {
            setEmail(val);
          }}
          secureTextEntry={false}
          contextMenuHidden={true}
          placeholder={'Email'}
          placeholderTextColor={'#666'}
          className={`font-semibold ${'w-full'}  text-lg p-0 text-[#1C6758]  `}
          textAlignVertical={'top'}
        />
      </View>
      <View className="flex-row border-[#1C6758] border-2 rounded-lg p-2 items-center mb-8">
        <TextInput
          value={password}
          onChangeText={val => {
            setPassword(val);
          }}
          secureTextEntry={true}
          contextMenuHidden={true}
          placeholder={'Password'}
          placeholderTextColor={'#666'}
          className={`font-semibold ${'w-full'}  text-lg p-0 text-[#1C6758]  `}
          textAlignVertical={'top'}
        />
      </View>
      <TouchableOpacity
        onPress={registerUser}
        activeOpacity={0.7}
        className="w-full py-3 bg-blue-400 rounded-lg flex items-center">
        <View className="">
          <Text className="text-white font-bold text-xl">Register</Text>
        </View>
      </TouchableOpacity>
      <View>
        <Text className="text-red-500 font-bold text-lg text-start">
          {errorMessage}
        </Text>
      </View>
    </View>
  );
}
