import {View, Text, TouchableOpacity, FlatList, Alert} from 'react-native';
import React, {useLayoutEffect, useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {PlusIcon, TrashIcon} from 'react-native-heroicons/solid';
import CheckBox from 'react-native-check-box';
import {deleteTodo, getTodo, updateTodo} from '../Firebase/firebase';

export default function TodoList() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [isDeleted, setDeleted] = useState(false);

  const isFocused = useIsFocused();

  const fetchData = async () => {
    const res = await getTodo();
    setData(res);
    setLoaded(true);
  };

  const updateDetails = async (id, title, isCompleted) => {
    const res = await updateTodo(id, title, isCompleted);
    if (res) {
    } else {
    }
  };

  const deleteDetails = async id => {
    const res = await deleteTodo(id);
    if (res) {
      setDeleted(pre => !pre);
    } else {
      Alert.alert('Error', 'Unable to delete!', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Todo',
      headerRight: () => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('newTodo', {});
            }}>
            <PlusIcon color={'black'} />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    fetchData();
  }, [isFocused, isDeleted]);

  onDelete = item => {
    Alert.alert('Alert', 'Do you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteDetails(item.id);
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-slate-50 px-4 flex">
      {isLoaded ? (
        <FlatList
          contentContainerStyle={{paddingVertical: 20}}
          data={data}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('newTodo', {todo: item});
                }}
                activeOpacity={0.7}>
                <View className="px-4 py-3 mb-2 bg-blue-200 rounded-lg flex-row justify-between">
                  <View className="flex-row space-x-3 items-center">
                    <CheckBox
                      onClick={() => {
                        updateDetails(item.id, item.title, !item.isCompleted);
                        setData(pre => {
                          let array = [...pre];
                          array[index].isCompleted = !array[index].isCompleted;

                          return array;
                        });
                      }}
                      isChecked={item.isCompleted}
                    />
                    <Text
                      className={`text-blue-500 font-bold text-lg ${
                        item.isCompleted && 'line-through'
                      }`}>
                      {item.title.slice(0, 1).toUpperCase() +
                        item.title.slice(1)}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => onDelete(item)}>
                    <TrashIcon color={'black'} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-black">Loading..</Text>
        </View>
      )}
    </View>
  );
}
