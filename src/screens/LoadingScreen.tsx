import React from 'react';
import styles from '../modules/Styles';
import {ActivityIndicator, View} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator />
    </View>
  );
};

export default LoadingScreen;
