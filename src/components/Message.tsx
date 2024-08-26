import React, {useCallback} from 'react';
import {Text, View} from 'react-native';
import styles from '../modules/Styles';
import moment from 'moment';

interface MessageProps {
  name: string;
  text: string;
  createdAt: Date;
  isOtherMessage: boolean;
}

const Message = ({name, text, createdAt, isOtherMessage}: MessageProps) => {
  // console.log('createdAt', createdAt);
  // console.log('createdAt', moment(createdAt).format('yyyyMMDD HH:mm:ss'));
  const renderMessageBox = useCallback(() => {
    if (isOtherMessage == true) {
      return (
        <>
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
  }, [createdAt, isOtherMessage, text]);
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
