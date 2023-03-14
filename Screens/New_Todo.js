import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {XCircleIcon} from 'react-native-heroicons/solid';
import {addTodo, updateTodo} from '../Firebase/firebase';

export default function New_Todo() {
  const route = useRoute();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: todo ? todo?.title : 'Add todo',
      headerRight: () => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('details');
            }}>
            <XCircleIcon color={'black'} />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation]);

  const {todo} = route?.params;

  const [title, setTitle] = useState(todo ? todo?.title : '');
  const [errorMessage, setError] = useState();

  const addTodoDetails = async () => {
    setError('');
    const res = await addTodo(title, false);
    if (res) {
      navigation.navigate('details');
    } else {
      setError('Unable to add data');
    }
  };
  const updateDetails = async () => {
    setError('');
    const res = await updateTodo(todo.id, title, todo.isCompleted);
    if (res) {
      navigation.navigate('details');
    } else {
      setError('Unable to update data');
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <View className="flex-row border-blue-400 border-2 rounded-lg p-2 items-center mb-5">
        <TextInput
          value={title}
          onChangeText={val => {
            setTitle(val);
          }}
          secureTextEntry={false}
          contextMenuHidden={true}
          placeholder={'Todo'}
          placeholderTextColor={'#666'}
          className={`font-semibold w-full  text-lg p-0 text-blue-400  `}
          textAlignVertical={'top'}
        />
      </View>
      <View className="flex-row w-full">
        <TouchableOpacity
          onPress={todo ? updateDetails : addTodoDetails}
          activeOpacity={0.7}
          className="w-full py-2 bg-blue-400 rounded-lg flex items-center">
          <View className="">
            <Text className="text-white font-bold text-xl">
              {todo ? 'Update' : 'Add Todo'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="mt-2 flex-row justify-end items-end">
        <Text className="text-red-600 font-semibold ">{errorMessage}</Text>
      </View>
    </View>
  );
}
