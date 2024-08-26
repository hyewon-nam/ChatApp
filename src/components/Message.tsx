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
  const renderMessageBox = useCallback(() => {
    return (
      <>
        <Text style={styles.messageTimeText}>
          {moment(createdAt).format('MM-DD HH:mm')}
        </Text>
        <View style={styles.messageBubble}>
          <Text style={styles.messageText}>{text}</Text>
        </View>
      </>
    );
  }, [createdAt, text]);
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.messsageNameText}>{name}</Text>
      <View style={styles.messageBox}>{renderMessageBox()}</View>
    </View>
  );
};

export default Message;
