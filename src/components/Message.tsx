import React, {useCallback} from 'react';
import {Text, View} from 'react-native';
import styles from '../modules/Styles';

interface MessageProps {
  name: string;
  text: string;
  createdAt: string;
  isOtherMessage: boolean;
}

const Message = ({name, text, createdAt, isOtherMessage}: MessageProps) => {
  const renderMessageBox = useCallback(() => {
    return <View></View>;
  }, []);
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.messsageNameText}>{name}</Text>
      <View style={styles.messageBox}>{renderMessageBox()}</View>
    </View>
  );
};

export default Message;
