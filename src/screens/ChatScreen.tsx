import React from 'react';
import Screen from '../components/Screen';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../types';

const ChatScreen = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const {other} = params;
  //useRoute 를 써야, 화면전환할 때 넘긴 파라미터를 가져올 수가 있음.
  return <Screen title={other.name}></Screen>;
};

export default ChatScreen;
