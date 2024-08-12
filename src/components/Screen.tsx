import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../modules/Colors';

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
});

const Screen = ({children, title}: ScreenProps) => {
  //   return null;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.left} />
        <View style={styles.center}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.right} />
      </View>

      {/* <View style={styles.body}>{children}</View> */}
    </SafeAreaView>
  );
};

export default Screen;
