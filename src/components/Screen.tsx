import React, {useCallback} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../modules/Colors';
import {useNavigation} from '@react-navigation/native';

interface ScreenProps {
  title?: String;
  children?: React.ReactNode;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 48,
    flexDirection: 'row',
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  body: {
    flex: 1,
  },
  backButtonText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Screen = ({children, title}: ScreenProps) => {
  const {goBack, canGoBack} = useNavigation();
  const onPressBackButton = useCallback(() => {
    try {
      goBack();
    } catch (error: any) {
      Alert.alert('마지막 화면입니다.');
    }
  }, [goBack]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.left}>
          {canGoBack() && (
            <TouchableOpacity
              onPress={onPressBackButton}
              style={styles.backButtonText}>
              <Text> Back </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.center}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.right} />
      </View>

      <View style={styles.body}>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;
