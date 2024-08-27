import React from 'react';
import {Image, StyleProp, TouchableOpacity, View} from 'react-native';

//Props 정의
interface ProfileProps {
  size?: number;
  style?: StyleProp;
  onPress?: () => void;
  imageUrl?: string;
}

const Profile = ({size, style, onPress, imageUrl}: ProfileProps) => {
  return (
    <TouchableOpacity disabled={onPress == null} onPress={onPress}>
      <View>{imageUrl && <Image />}</View>
    </TouchableOpacity>
  );
};

export default Profile;
