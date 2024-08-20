import React, {useCallback} from 'react';
import Screen from '../components/Screen';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import useChat from '../customHook/useChat';
import styles from '../modules/Styles';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

const ChatScreen = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const {other, userIds} = params;
  //useRoute 를 써야, 화면전환할 때 넘긴 파라미터를 가져올 수가 있음.

  const {chat, loadingChat} = useChat(userIds);
  const renderChat = useCallback(() => {
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
      </View>
    );
  }, [chat]);

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
