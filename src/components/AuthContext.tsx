import {createContext} from 'react';
import {User} from '../types';

export interface AuthContextProp {
  initialized: boolean;
  user: User | null;
  signup: (email: string, password: string, name: string) => Promise<void>; //함수 정의
  prosessingSignup: boolean;
}

const AuthContext = createContext<AuthContextProp>({
  initialized: false,
  user: null,
  signup: async () => {},
  prosessingSignup: false,
}); //초기 값이 없으면,, undefined 가 되어버려서 Type Script 에서 오류가 나기 때문에 초기화를 꼭 해주어야 함.

export default AuthContext;
