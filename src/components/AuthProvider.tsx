import React from 'react';
import auth from '@react-native-firebase/auth';
import {getFirestore} from '@react-native-firebase/firestore';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Collections, User} from '../types';
import AuthContext from './AuthContext';
import {Text, View} from 'react-native';

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [initialized, setInitialized] = useState(false); // useState<boolean>(false) 이렇게 써도 됨. Type Inferance 라서, 당연히 여기서 boolean 이잖아 그래서 묵시
  const [user, setUser] = useState<User | null>(null); //null 만 넣어놓으면 나중에 User type 넘길때 오류가 나겠지 그래서 명시
  const [processingSignup, setprocessingSignup] = useState<boolean>(false);
  const [processingSignin, setprocessingSignin] = useState<boolean>(false);

  useEffect(() => {
    //렌더링 될 때 실행되는 함수!!! 여기 안에서 cleanUp/return 함수를 정의해 놓으면 언마운트 될때 실행됨 :>
    const unsubscribe = auth().onUserChanged(async firebaseUser => {
      console.log(firebaseUser);
      if (firebaseUser != null) {
        setUser({
          userId: firebaseUser.uid,
          email: firebaseUser.email ?? '',
          name: firebaseUser.displayName ?? '',
        });
        //login 처리
      } else {
        setUser(null);
        //logout 처리
      }
      setInitialized(true); //일단 실행이 되었다는 건 실행이 한번은 되었다는 거니까!!
    }); // 콜백 함수를 여기에 async 로 등록해 놓은 것. 결과 user 값을 받으면 여기로 들어가니까 변수명은 상관이 없음!
    return () => {
      unsubscribe(); //언마운트 될 때 실행
    };
  }, []);

  const signup = useCallback(
    async (email: string, password: string, name: string) => {
      setprocessingSignup(true); //지금 시작했다 사인업~
      try {
        const {user: currentUser} = await auth().createUserWithEmailAndPassword(
          email,
          password,
        ); //내장 메소드 사용. user 라는 변수 이름을 currentUser 로 재명명 하는 문법임.
        await currentUser.updateProfile({displayName: name});
        await getFirestore()
          .collection(Collections.USERS)
          .doc(currentUser.uid)
          .set({
            userId: currentUser.uid,
            email,
            name,
          });
      } finally {
        setprocessingSignup(false);
      }
    },
    [],
  );

  const signin = useCallback(async (email: string, password: string) => {
    try {
      setprocessingSignin(true);
      await auth().signInWithEmailAndPassword(email, password);
      console.log(email);
      console.log(password);
    } finally {
      setprocessingSignin(false);
    }
  }, []);

  const value = useMemo(() => {
    return {
      initialized,
      user,
      signup,
      signin,
      processingSignup,
      processingSignin,
    };
  }, [initialized, user, signup, signin, processingSignup, processingSignin]);

  return (
    <AuthContext.Provider value={value}>
      {children}
      <View>
        <Text>asdddddd</Text>
      </View>
    </AuthContext.Provider>
  );
}; //De-structuring 문법 :)
//그냥 자식 컴포넌트에 Props 들을 전달하는 역할만 하게 할 것임..!! 이 도대체 무슨말인지 모르겠네..
export default AuthProvider;
