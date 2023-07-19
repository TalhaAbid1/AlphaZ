import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Login from '../Screens/Login';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../Screens/Signup';
import Home from '../Screens/Home';
import Splash from '../Screens/Splash';
import Chat from '../Screens/Chat';

const Stack = createStackNavigator();

const NavigationHandler = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationHandler;