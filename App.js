import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';
import Login from './Screens/Login';
import New_Todo from './Screens/New_Todo';
import Register from './Screens/Register';
import TodoList from './Screens/Todo_List';

function App() {
  const Stack = createNativeStackNavigator();
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name="details" component={TodoList} />
          <Stack.Screen name="newTodo" component={New_Todo} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
