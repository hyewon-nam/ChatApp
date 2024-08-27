import React, {useMemo} from 'react';
import {
  Image,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import styles from '../modules/Styles';

//Props 정의
interface ProfileProps {
  size?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  imageUrl?: string;
}

const Profile = ({size, style: styleProp, onPress, imageUrl}: ProfileProps) => {
  const containerStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return [
      styles.profileContainer,
      {width: size, height: size, borderRadius: (size ?? 0) / 2},
      styleProp,
    ];
  }, [size, styleProp]);
  return (
    <TouchableOpacity disabled={onPress == null} onPress={onPress}>
      <View style={containerStyle}>
        {imageUrl && (
          <Image
            style={{width: size, height: size, borderRadius: (size ?? 0) / 2}}
            source={{uri: imageUrl}}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Profile;
