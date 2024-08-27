import React, {useCallback} from 'react';
import {Image, Text, View} from 'react-native';
import styles from '../modules/Styles';
import moment from 'moment';

interface MessageProps {
  name: string;
  text: string;
  createdAt: Date;
  isOtherMessage: boolean;
  profileImageUrl: string;
}

const Message = ({
  name,
  text,
  createdAt,
  isOtherMessage,
  profileImageUrl,
}: MessageProps) => {
  // console.log('createdAt', createdAt);
  // console.log('createdAt', moment(createdAt).format('yyyyMMDD HH:mm:ss'));
  const renderMessageBox = useCallback(() => {
    if (isOtherMessage == true) {
      return (
        <>
          <View style={{}}>
            <Image
              source={{uri: profileImageUrl}}
              style={{height: 48, width: 48, borderRadius: 28}}
            />
          </View>
          <View key="message" style={styles.messageOtherBubble}>
            <Text style={styles.messageOtherText}>{text}</Text>
          </View>
          <Text key="timeText" style={styles.messageTimeText}>
            {moment(createdAt).format('HH:mm')}
          </Text>
        </>
      );
    }
    return (
      <>
        <Text key="timeText" style={styles.messageTimeText}>
          {moment(createdAt).format('HH:mm')}
        </Text>
        <View key="message" style={styles.messageBubble}>
          <Text style={styles.messageText}>{text}</Text>
        </View>
      </>
    );
  }, [createdAt, isOtherMessage, profileImageUrl, text]);
  return (
    <View
      style={
        isOtherMessage === true
          ? styles.messageOtherContainer
          : styles.messageContainer
      }>
      <Text style={styles.messsageNameText}>{name}</Text>
      <View style={styles.messageBox}>{renderMessageBox()}</View>
    </View>
  );
};

export default Message;
