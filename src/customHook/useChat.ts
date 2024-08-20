import {useCallback, useEffect, useState} from 'react';
import {getFirestore} from '@react-native-firebase/firestore';
import {Chat, Collections, User} from '../types';
import _ from 'lodash';

const getChatKey = (userIds: string[]) => {
  return _.orderBy(userIds, userId => userId, 'asc');
};

const useChat = (userIds: string[]) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [loadingChat, setLoadingChat] = useState(false);
  const loadChat = useCallback(async () => {
    try {
      setLoadingChat(true);
      const chatSnapShot = await getFirestore()
        .collection(Collections.CHATS)
        .where('userIds', '==', getChatKey(userIds))
        .get();
      if (chatSnapShot.docs.length > 0) {
        const chat = chatSnapShot.docs[0];
        setChat({
          id: chat.id,
          userIds: chat.data().userIds as string[],
          users: chat.data().users as User[],
        });
      }
      const userSnapshot = await getFirestore()
        .collection('users')
        .where('userId', 'in', userIds)
        .get();

      const users = userSnapshot.docs.map(doc => doc.data() as User);
      const data = {
        userIds: getChatKey(userIds),
        users,
      };
      const chat = await getFirestore().collection(Collections.CHATS).add(data);
      setChat({id: chat.id, ...data});
    } finally {
      setLoadingChat(false);
    }
  }, [userIds]);

  useEffect(() => {
    loadChat();
  }, [loadChat]);

  return {
    chat,
    loadingChat,
  };
};

export default useChat;
