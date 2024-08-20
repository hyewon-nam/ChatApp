import React, {useCallback, useState} from 'react';
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

const ChatScreen = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const {other, userIds} = params;
  const {textInput, setTextInput} = useState('');
  //useRoute 를 써야, 화면전환할 때 넘긴 파라미터를 가져올 수가 있음.

  // const onChangeTextInput = useCallback(
  //   (newString: string) => {
  //     setTextInput(newString);
  //   },
  //   [setTextInput],
  // );

  const {chat, loadingChat} = useChat(userIds);
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

        <View style={styles.chatMessageList}></View>
        <View style={styles.chatIputContainer}>
          <View style={styles.chatTextInputContainer}>
            <TextInput
              style={styles.chatTextInput}
              value={textInput}
              onChangeText={setTextInput}
              multiline
            />
          </View>
          <TouchableOpacity style={styles.chatSendButton}>
            <Text style={styles.chatSendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [chat, textInput]);

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
