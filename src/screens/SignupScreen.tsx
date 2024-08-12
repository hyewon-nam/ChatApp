import React, {useMemo, useState} from 'react';
import Screen from '../components/Screen';
import validator from 'validator';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [name, setName] = useState('');

  const emailErrorText = useMemo(() => {
    if (email.length === 0) {
      return '이메일을 입력해주세요.';
    }
    if (!validator.isEmail(email)) {
      return '올바른 이메일이 아닙니다';
    }
    return null;
  }, [email]);

  const passwordErrorText = useMemo(() => {
    if (password.length === 0) {
      return '비밀번호를 입력해주세요';
    }
    if (password !== confirmedPassword) {
      return '비밀번호를 확인해주세요';
    }
    return null;
  }, [password, confirmedPassword]); //dependeny 를 확인하는 것임 !!

  return <Screen title="회원가입"> </Screen>;
};

export default SignupScreen;
