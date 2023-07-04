import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screen/Login';
import HomePage from './Screen/HomePage';
import NotificationPage from './Screen/Notification';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Notification" component={NotificationPage}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
