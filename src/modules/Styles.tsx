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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeContainer: {flex: 1, padding: 20},
  homeSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.BLACK,
    flexDirection: 'row',
  },
  homeMyProfile: {
    // flexDirection: 'row',
    backgroundColor: Colors.BLACK,
    padding: 20,
    borderRadius: 20,
  },
  homeMyNameText: {
    color: Colors.WHITE,
    fontSize: 16,
    marginVertical: 2,
  },
  homeLogoutText: {
    color: Colors.WHITE,
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 'bold',
  },
  homeUserListSection: {
    marginTop: '10%',
    flex: 1,
  },
  homeSectionTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  homeUserList: {},
  homeUserListItem: {
    backgroundColor: 'lightgrey',
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  otherNameText: {
    color: Colors.BLACK,
    fontSize: 16,
    marginVertical: 2,
  },
  userSeperator: {padding: 0},
});

export default styles;
