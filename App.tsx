/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/lib/integration/react';

import TodoList from './src/todo_list';
import AddTodo from './src/add_todo';
import EditTodo from './src/edit_todo';
import rootReducer from './src/redux/reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2 // Xem thêm tại mục "Quá trình merge".
 };

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer);
const persistor = persistStore(store);

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="TodoList" component={TodoList} options={{ title: 'Danh sách công việc' }} />
              <Stack.Screen name="AddTodo" component={AddTodo} options={{ title: 'Thêm mới' }} />
              <Stack.Screen name="EditTodo" component={EditTodo} options={{ title: 'Sửa thông tin' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
