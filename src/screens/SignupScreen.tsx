import React, {useCallback, useContext, useMemo, useState} from 'react';
import Screen from '../components/Screen';
import validator from 'validator';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../modules/Colors';
import AuthContext from '../components/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [name, setName] = useState('');
  const {signup, prosessingSignup} = useContext(AuthContext); //14:47 인터넷 강의
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    section: {marginBottom: 20},
    title: {fontSize: 18, fontWeight: 'bold'},
    input: {
      marginTop: 10,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      borderColor: Colors.GREY,
      fontSize: 16,
    },
    errorText: {
      fontSize: 14,
      color: Colors.RED,
      marginTop: 4,
    },
    signupButton: {
      backgroundColor: Colors.BLACK,
      borderRadius: 10,
      alignItems: 'center',
      padding: 4,
    },
    signupButtonText: {
      margin: 10,
      color: Colors.WHITE,
      fontSize: 18,
      fontWeight: 'bold',
    },
    disableSignupButton: {
      backgroundColor: Colors.GREY,
    },
    signinButton: {
      marginTop: 5,
      alignItems: 'center',
      padding: 4,
    },
    signinButtonText: {
      color: Colors.BLACK,
      fontSize: 16,
    },
    signingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const emailErrorText = useMemo(() => {
    if (email.length === 0) {
      return '이메일을 입력해주세요.';
    }
    if (!validator.isEmail(email)) {
      return '올바른 이메일이 아닙니다';
    }
    return null;
  }, [email]);

  const nameErrorText = useMemo(() => {
    if (name.length === 0) {
      return '이름을 입력해주세요.';
    }
    return null;
  }, [name]);

  const passwordErrorText = useMemo(() => {
    if (password.length === 0) {
      return '비밀번호를 입력해주세요';
    }
    if (password !== confirmedPassword) {
      return '비밀번호를 확인해주세요';
    }
    return null;
  }, [password, confirmedPassword]); //dependeny 를 확인하는 것임 !! 두개 중에 하나 바뀌면 실행됨

  const signupButtonEnabled = useMemo(() => {
    return (
      emailErrorText == null &&
      passwordErrorText == null &&
      nameErrorText == null
    );
  }, [emailErrorText, passwordErrorText, nameErrorText]);

  const onChangeEmailText = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangePasswordText = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const onChangeConfirmedPasswordText = useCallback((text: string) => {
    setConfirmedPassword(text);
  }, []);

  const onChangeNameText = useCallback((text: string) => {
    setName(text);
  }, []);

  const signupButtonStyle = useMemo(() => {
    if (signupButtonEnabled) {
      return styles.signupButton;
    }
    return [styles.signupButton, styles.disableSignupButton]; // A + B 스타일 덮어 씌운다는 문법
    // return styles.signupButton;
  }, [signupButtonEnabled, styles.signupButton, styles.disableSignupButton]); //dependency 라는 뜻

  const onPressSignupButton = useCallback(async () => {
    try {
      await signup(email, password, name);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }, [signup, email, password, name]);
  const onPressSigninButton = useCallback(() => {
    navigate('Signin'); //Stack 에 등록된 이름을 입력한다
  }, [navigate]);

  return (
    <Screen title="회원가입">
      {prosessingSignup ? (
        <View style={styles.signingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.title}>Email Address</Text>
            <TextInput
              value={email}
              style={styles.input}
              onChangeText={onChangeEmailText}
            />
            {emailErrorText && (
              <Text style={styles.errorText}>{emailErrorText}</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Password</Text>
            <TextInput
              secureTextEntry
              value={password}
              style={styles.input}
              onChangeText={onChangePasswordText}
            />
            {emailErrorText && (
              <Text style={styles.errorText}>{passwordErrorText}</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Password Confirm</Text>
            <TextInput
              // secureTextEntry
              value={confirmedPassword}
              style={styles.input}
              onChangeText={onChangeConfirmedPasswordText}
            />
            {emailErrorText && (
              <Text style={styles.errorText}>{passwordErrorText}</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Name</Text>
            <TextInput
              value={name}
              style={styles.input}
              onChangeText={onChangeNameText}
            />
            {emailErrorText && (
              <Text style={styles.errorText}>{nameErrorText}</Text>
            )}
          </View>
          <View>
            <TouchableOpacity
              style={signupButtonStyle}
              onPress={onPressSignupButton}
              disabled={!signupButtonEnabled}>
              <Text style={styles.signupButtonText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signinButton}
              onPress={onPressSigninButton}>
              <Text style={styles.signinButtonText}>
                이미 계정이 있으신가요?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </Screen>
  );
};

export default SignupScreen;
