import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from './src/types';
import SignupScreen from './src/screens/SignupScreen';
import AuthProvider from './src/components/AuthProvider';
import SigninScreen from './src/screens/SigninScreen';

const App = () => {
  return (
    <AuthProvider>
      <Screens />
    </AuthProvider>
  );
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Screens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Signup" component={SignupScreen}></Stack.Screen>
        <Stack.Screen name="Signin" component={SigninScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
