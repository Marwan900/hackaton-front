import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './Screen/Login';
import HomePage from './Screen/HomePage';
import NotificationPage from './Screen/Notification';
import SettingsScreen from './Screen/Settings';
import RegistrationPage from './Screen/RegistrationPage';
import AnnouncesPage from './Screen/AnnouncesPage';
import DemandsPage from './Screen/DemandsPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="Notification" component={NotificationPage} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'HomePage') {
            iconName = 'home-outline';
          } else if (route.name === 'Mes Annonces') {
            iconName = 'list-outline';
          } else if (route.name === 'Notification') {
            iconName = 'notifications-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          } else if (route.name === 'Mes Demandes') {
            iconName = 'clipboard-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#0d7377',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="HomePage" component={HomeStack} options={{ headerShown: false }}/>
      <Tab.Screen name="Mes Annonces" component={AnnouncesPage} options={{ headerShown: false }}/>
      <Tab.Screen name="Mes Demandes" component={DemandsPage} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Registration" component={RegistrationPage} />
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
