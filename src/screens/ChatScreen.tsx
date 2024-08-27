import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Screen from '../components/Screen';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import useChat from '../customHook/useChat';
import styles from '../modules/Styles';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../modules/Colors';
import AuthContext from '../components/AuthContext';
import Message from '../components/Message';

const ChatScreen = () => {
  const {user: me} = useContext(AuthContext);
  const {params} = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const {other, userIds} = params;
  const [textInput, setTextInput] = useState(''); //destructuring 이 아님
  const {chat, loadingChat, sendMessage, sending, messages, loadingMessages} =
    useChat(userIds);

  const flatListRef = useRef<FlatList>(null);

  // useEffect(() => {
  //   console.log('mounted!');
  //   setTimeout(() => {
  //     if (flatListRef.current) {
  //       // flatListRef.current?.scrollToEnd({animated: true});
  //       console.log('messages.length', messages.length);
  //       flatListRef.current?.scrollToOffset({
  //         offset: messages.length * 700, // 전체 콘텐츠 높이에서 입력 바의 높이를 뺀 값으로 스크롤합니다.
  //         animated: true,
  //       });
  //     }
  //   }, 3000);
  //   // scrollIntoView({animated: true});
  // }, []);

  useEffect(() => {
    console.log('message changed!');
    console.log('messages.length 1', messages.length);

    flatListRef.current?.scrollToEnd({animated: true});
    // flatListRef.current?.scrollToOffset({
    //   offset: messages.length * 600, // 전체 콘텐츠 높이에서 입력 바의 높이를 뺀 값으로 스크롤합니다.
    //   animated: true,
    // });

    setTimeout(() => {
      if (flatListRef.current) {
        // flatListRef.current?.scrollToEnd({animated: true});
        console.log('messages.lengthv2', messages.length);
        flatListRef.current?.scrollToOffset({
          offset: messages.length * 700, // 전체 콘텐츠 높이에서 입력 바의 높이를 뺀 값으로 스크롤합니다.
          animated: true,
        });
      }
    }, 3000);
    // flatListRef.current?.scrollToIndex({
    //   animated: true,
    //   index: messages.length - 1,
    // });
  }, [messages]);

  //useRoute 를 써야, 화면전환할 때 넘긴 파라미터를 가져올 수가 있음.
  const sendDisabled = useMemo(
    () => (textInput || '').length === 0,
    [textInput],
  ); //length 가 0 이면 true 를 반환, 아니면 false 를 반환.

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const disabledSendButtonStyle = [
    styles.chatSendButton,
    {backgroundColor: Colors.GREY},
  ];

  const onPressSendButton = useCallback(() => {
    if (me == null) {
      throw new Error('Not found user');
    }
    sendMessage(textInput, me);
    setTextInput('');
  }, [me, sendMessage, textInput]);

  const renderChat = useCallback(() => {
    if (chat == null) {
      return null;
    }
    return (
      <View style={styles.chatContainer}>
        <View style={styles.memberSection}>
          <Text style={styles.title}>대화상대</Text>
          <FlatList
            data={chat?.users}
            renderItem={({item: user}) => {
              return (
                <View style={styles.userProfile}>
                  <Text style={styles.userProfileText}>{user.name[0]}</Text>
                </View>
              );
            }}
            horizontal={true}
          />
        </View>

        <View style={styles.chatMessageList}>
          <FlatList
            ref={flatListRef} //이걸 이용하니까 갑자기 마지막으로 잘만감
            data={messages}
            renderItem={({item: messages}) => {
              return (
                <Message
                  name={messages.user.name}
                  text={messages.text}
                  createdAt={messages.createdAt}
                  isOtherMessage={
                    messages.user.userId !== me?.userId
                  }></Message>
                // <View>
                //   <Text>{messages.text}</Text>
                //   <Text>{messages.createdAt.toLocaleString()}</Text>
                //   <Text>{messages.user.name}</Text>
                // </View>
              );
            }}
            contentContainerStyle={{paddingBottom: 80}}
            ItemSeparatorComponent={() => {
              return <View style={styles.messageSeparator}></View>;
            }}
          />
        </View>
        <View style={styles.chatIputContainer}>
          <View style={styles.chatTextInputContainer}>
            <TextInput
              style={styles.chatTextInput}
              value={textInput}
              onChangeText={setTextInput}
              multiline
            />
          </View>
          <TouchableOpacity
            style={
              sendDisabled ? disabledSendButtonStyle : styles.chatSendButton
            }
            disabled={sendDisabled}
            onPress={onPressSendButton}>
            <Text style={styles.chatSendText}>Sendi</Text>
            {/* <Icon style={styles.chatSendIcon} name="send" /> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [
    chat,
    disabledSendButtonStyle,
    messages,
    onPressSendButton,
    sendDisabled,
    textInput,
    me,
  ]);

  return (
    <Screen title={other.name}>
      <View style={styles.chatContainer}>
        {loadingChat ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          renderChat()
        )}
      </View>
    </Screen>
  );
};

export default ChatScreen;
