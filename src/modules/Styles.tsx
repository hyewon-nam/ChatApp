import React from 'react';
import {StyleSheet} from 'react-native';
import Colors from './Colors';

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  section: {marginBottom: 20},
  title: {fontSize: 18, fontWeight: 'bold'},
  input: {
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.GREY,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    color: Colors.RED,
    marginTop: 4,
  },
  signupButton: {
    backgroundColor: Colors.BLACK,
    borderRadius: 10,
    alignItems: 'center',
    padding: 4,
  },
  signupButtonText: {
    margin: 10,
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  disableSignupButton: {
    backgroundColor: Colors.GREY,
  },
  signinButton: {
    marginTop: 5,
    alignItems: 'center',
    padding: 4,
  },
  signinButtonText: {
    color: Colors.BLACK,
    fontSize: 16,
  },
  signingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
