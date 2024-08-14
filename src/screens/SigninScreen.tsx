import React, {useCallback, useContext, useMemo, useState} from 'react';
import Screen from '../components/Screen';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from '../modules/Styles';
import AuthProvider from '../components/AuthProvider';
import AuthContext from '../components/AuthContext';

const SigninScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signupButtonStyle = useMemo(() => {
    if (email.length > 0 && password.length > 0) {
      return styles.signupButton;
    }
    return [styles.signupButton, styles.disableSignupButton]; // A + B 스타일 덮어 씌운다는 문법
    // return styles.signupButton;
  }, [email.length, password.length]); //dependency 라는 뜻

  const {signin} = useContext(AuthContext);

  const onPressSigninButton = useCallback(async () => {
    await signin(email, password);
  }, [signin, email, password]);

  return (
    <Screen title="로그인">
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.title}>Email Address</Text>
          <TextInput
            value={email}
            style={styles.input}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Password</Text>
          <TextInput
            secureTextEntry
            value={password}
            style={styles.input}
            onChangeText={setPassword}
          />
        </View>
        <View>
          <TouchableOpacity
            style={signupButtonStyle}
            onPress={onPressSigninButton}
            // disabled={!signupButtonEnabled}
          >
            <Text style={styles.signupButtonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

export default SigninScreen;
