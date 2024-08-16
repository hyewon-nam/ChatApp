import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useCallback, useContext} from 'react';
import {RootStackParamList} from './src/types';
import SignupScreen from './src/screens/SignupScreen';
import AuthProvider from './src/components/AuthProvider';
import SigninScreen from './src/screens/SigninScreen';
import AuthContext from './src/components/AuthContext';
import HomeScreen from './src/screens/HomeScreen';
import LoadingScreen from './src/screens/LoadingScreen';

const App = () => {
  return (
    <AuthProvider>
      <Screens />
    </AuthProvider>
  );
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Screens = () => {
  const {user, processingSignin, processingSignup, initialized} =
    useContext(AuthContext);
  const renderRootStack = useCallback(() => {
    // if (!initialized) {
    if (false) {
      return <Stack.Screen name="Loading" component={LoadingScreen} />;
    } else if (user != null && !processingSignin && !processingSignup) {
      //완전한 로그인 상태 일때
      return <Stack.Screen name="Home" component={HomeScreen} />;
    } else {
      return (
        <>
          <Stack.Screen name="Signup" component={SignupScreen}></Stack.Screen>
          <Stack.Screen name="Signin" component={SigninScreen}></Stack.Screen>
        </>
      );
    }
  }, [user, processingSignin, processingSignup]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {renderRootStack()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
