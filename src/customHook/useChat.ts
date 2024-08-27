import {useCallback, useEffect, useState} from 'react';
import {
  collection,
  getFirestore,
  onSnapshot,
} from '@react-native-firebase/firestore';
import {Chat, Collections, FirestoreMessageData, Message, User} from '../types';
import _ from 'lodash';

const getChatKey = (userIds: string[]) => {
  console.log('userIds', userIds);
  return _.orderBy(userIds, userId => userId, 'asc');
};

const loadUsers = async (userIds: string[]) => {
  const userSnapShot = await getFirestore()
    .collection(Collections.USERS)
    .where('userId', 'in', userIds)
    .get();

  const users = userSnapShot.docs.map<User>(doc => doc.data() as User);
  return users;
};

const useChat = (userIds: string[]) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [loadingChat, setLoadingChat] = useState(false);
  const [messages, setMessage] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const addNewMessages = useCallback((newMessage: Message[]) => {
    setMessage(prevMessages => {
      return _.uniq(prevMessages.concat(newMessage));
    });
  }, []);

  const loadChat = useCallback(async () => {
    try {
      setLoadingChat(true);
      const chatSnapShot = await getFirestore()
        .collection(Collections.CHATS)
        .where('userIds', '==', getChatKey(userIds))
        .get();

      // console.log('chatSnapShot', chatSnapShot);

      if (chatSnapShot.docs.length > 0) {
        // console.log('옛날꺼 가져옴');

        const chatMessageSnapshot = await getFirestore()
          .collection(Collections.CHATS)
          .doc(chatSnapShot.docs[0].id)
          .collection(Collections.MESSAGES)
          .get(); //sub-collection 에 접근해서 document add

        const chatMessage = chatMessageSnapshot.docs.map(doc => {
          // console.log('doc', doc);
          return {...(doc.data() as Message)};
        });

        setMessage(chatMessage);

        const users = await loadUsers(userIds);
        const chat = chatSnapShot.docs[0];

        setChat({
          id: chat.id,
          userIds: chat.data().userIds as string[],
          users: users as User[],
        });
      } else {
        // const userSnapshot = await getFirestore()
        //   .collection('users')
        //   .where('userId', 'in', userIds)
        //   .get();

        // const userIds = userSnapshot.docs.map(doc => doc.data() as User);
        const users = loadUsers(userIds);
        const data = {
          userIds: getChatKey(userIds),
          users,
        };
        const chat = await getFirestore()
          .collection(Collections.CHATS)
          .add(data);
        setChat({id: chat.id, ...data});
      }
    } finally {
      setLoadingChat(false);
    }
  }, [userIds]);

  useEffect(() => {
    loadChat();
  }, [loadChat, userIds]);

  useEffect(() => {
    if (chat?.id == null) {
      return;
    }
    setLoadingMessages(true);

    const unsubscribe = getFirestore()
      .collection(Collections.CHATS)
      .doc(chat?.id)
      .collection(Collections.MESSAGES)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        //쿼리에 어떤 업데이트가 있을 때 마다, 이 부분이 실행됨!
        const newMessages = snapshot
          .docChanges()
          .filter(({type}) => type === 'added')
          .map(newMessageChanged => {
            const docData = newMessageChanged.doc.data();
            const newMessage: Message = {
              id: docData.id,
              text: docData.text,
              user: docData.user,
              createdAt: docData.createdAt,
            }; //이렇게 하나하나 넣어줘야 함! 익숙해 집시당 :)

            return newMessage;
          });
        addNewMessages(newMessages);
        setLoadingMessages(false);
      });

    return () => {
      unsubscribe(); //unmound 될 때 unsubscribe 됨 !
    };
  }, [addNewMessages, chat?.id]);

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

        await getFirestore()
          .collection(Collections.CHATS)
          .doc(chat.id)
          .collection(Collections.MESSAGES) //sub-collection 에 접근해서 document add
          .add(data);

        // setMessage(
        //   prevMessages => prevMessages.concat([{id: chatMessage.id, ...data}]), //배열이라 concat 이 가능한 것임
        // );
      } finally {
        setSending(false);
      }
    },
    [chat?.id],
  );

  // const loadMessages = useCallback(async (chatId: string) => {
  //   try {
  //     setLoadingMessages(true);
  //     console.log('chatId', chatId);

  //     const messagesSnapshot = await getFirestore()
  //       .collection(Collections.CHATS)
  //       .doc(chatId) //doc 은 문서 하나
  //       .collection(Collections.MESSAGES) //그냥 collection 하면 해당하는 것 전부
  //       .orderBy('createdAt', 'asc')
  //       .get();

  //     const msg = messagesSnapshot.docs.map<Message>(doc => {
  //       const data = doc.data();
  //       return {
  //         id: doc.id,
  //         user: data.user,
  //         text: data.text,
  //         createdAt: data.createdAt.toDate(),
  //       };
  //     });

  //     // console.log('msg', msg);

  //     setMessage(msg);
  //   } finally {
  //     setLoadingMessages(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (chat?.id != null) {
  //     console.log('2');
  //     loadMessages(chat.id);
  //   }
  // }, [chat?.id, loadMessages]);

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
