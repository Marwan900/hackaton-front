import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import LoginScreen from './Screen/Login';
import HomePage from './Screen/HomePage';
import NotificationPage from './Screen/Notification';
import SettingsScreen from './Screen/Settings';
import RegistrationPage from './Screen/RegistrationPage';
import SearchPage from './Screen/SearchPage';
import DemandsPage from './Screen/DemandsPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Registration" component={RegistrationPage} />
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false }}/>
      <Tab.Screen name="Search" component={SearchPage} options={{ headerShown: false }}/>
      <Tab.Screen name="Demands" component={DemandsPage} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

export default App;
