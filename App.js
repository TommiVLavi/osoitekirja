import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput ,FlatList } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ListScreen from './List'
import MapScreen from './Map'

const Stack = createNativeStackNavigator();

export default function App() {

  
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Lista' component={ListScreen} />
          <Stack.Screen name='Kartta' component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};
