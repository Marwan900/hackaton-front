import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screen/Login';
import HomeScreen from './Screen/HomePage';
import NotificationPage from './Screen/Notification';
import SettingsScreen from './Screen/Settings';
import MapComponent from './Screen/Map';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Notification" component={NotificationPage}></Stack.Screen>
        <Stack.Screen name="Settings" component={SettingsScreen}></Stack.Screen>
        <Stack.Screen name="Map" component={MapComponent}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
