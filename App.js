import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screen/Login';
import HomePage from './Screen/HomePage';
import NotificationPage from './Screen/Notification';
import SettingsScreen from './Screen/Settings';
import RegistrationPage from './Screen/RegistrationPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Registration" component={RegistrationPage} />
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }}/>
        <Stack.Screen name="Notification" component={NotificationPage}></Stack.Screen>
        <Stack.Screen name="Settings" component={SettingsScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
