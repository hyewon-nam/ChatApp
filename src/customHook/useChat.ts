import {useCallback, useEffect, useState} from 'react';
import {collection, getFirestore} from '@react-native-firebase/firestore';
import {Chat, Collections, FirestoreMessageData, Message, User} from '../types';
import _ from 'lodash';

const getChatKey = (userIds: string[]) => {
  console.log('userIds', userIds);
  return _.orderBy(userIds, userId => userId, 'asc');
};

const useChat = (userIds: string[]) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [loadingChat, setLoadingChat] = useState(false);
  const [messages, setMessage] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const loadChat = useCallback(async () => {
    try {
      setLoadingChat(true);
      const chatSnapShot = await getFirestore()
        .collection(Collections.CHATS)
        .where('userIds', '==', getChatKey(userIds))
        .get();

      console.log('chatSnapShot', chatSnapShot);

      if (chatSnapShot.docs.length > 0) {
        console.log('옛날꺼 가져옴');
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
  }, [loadChat, userIds]);

  const sendMessage = useCallback(
    async (text: string, user: User) => {
      if (chat?.id == null) {
        throw new Error('Chat is not loaded');
      }

      try {
        setSending(true);
        const data: FirestoreMessageData = {
          text: text,
          user: user,
          createdAt: new Date(),
        };

        const chatMessage = await getFirestore()
          .collection(Collections.CHATS)
          .doc(chat.id)
          .collection(Collections.MESSAGES) //sub-collection 에 접근해서 document add
          .add(data);

        setMessage(
          prevMessages => prevMessages.concat([{id: chatMessage.id, ...data}]), //배열이라 concat 이 가능한 것임
        );
      } finally {
        setSending(false);
      }
    },
    [chat?.id],
  );

  const loadMessages = useCallback(async (chatId: string) => {
    try {
      setLoadingMessages(true);
      const messagesSnapshot = await getFirestore()
        .collection(Collections.CHATS)
        .doc(chatId) //doc 은 문서 하나
        .collection(Collections.MESSAGES) //그냥 collection 하면 해당하는 것 전부
        .orderBy('createdAt', 'asc')
        .get();

      const msg = messagesSnapshot.docs.map<Message>(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          user: data.user,
          text: data.text,
          createdAt: data.createdAt.toDate(),
        };
      });

      setMessage(msg);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    if (chat?.id != null) {
      loadMessages(chat.id);
    }
  }, [chat?.id, loadMessages]);

  return {
    chat,
    loadingChat,
    messages,
    sendMessage,
    sending,
    loadingMessages,
  };
};

export default useChat;
