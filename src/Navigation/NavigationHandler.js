import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Login from '../Screens/Login';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../Screens/Signup';
import Home from '../Screens/Home';
import Splash from '../Screens/Splash';

const Stack = createStackNavigator();

const NavigationHandler = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationHandler;