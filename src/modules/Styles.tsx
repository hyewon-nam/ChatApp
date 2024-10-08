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
    flexDirection: 'row',
    backgroundColor: Colors.BLACK,
    padding: 20,
    borderRadius: 20,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.LIGHTGREY,
  },
  homeMyNameText: {
    color: Colors.WHITE,
    fontSize: 16,
    marginVertical: 2,
    alignItems: 'center',
    // backgroundColor: 'red',
    flex: 1,
  },
  homeLogoutText: {
    color: Colors.WHITE,
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 'bold',
    // backgroundColor: 'green',
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
  chatContainer: {
    flex: 1,
    padding: 5,
  },
  memberSection: {},
  userProfile: {
    margin: 3,
    width: 34,
    height: 34,
    backgroundColor: Colors.GREY,
    // flexDirection: 'row',
    borderRadius: 34 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  userProfileText: {
    color: Colors.WHITE,
  },
  chatMessageList: {
    flex: 1,
  },
  chatIputContainer: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  chatTextInputContainer: {
    width: '90%',
    minHeight: '5%',
    // backgroundColor: 'red',
    borderColor: Colors.GREY,
    borderWidth: 1,
    marginRight: 5,
    padding: 12,
    borderRadius: 20,
  },
  chatTextInput: {
    padding: 0,
  },
  chatSendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BLACK,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  chatSendText: {
    color: Colors.WHITE,
  },
  messageContainer: {
    marginVertical: 6,
    alignItems: 'flex-end',
  },
  messageOtherContainer: {
    marginVertical: 6,
    alignItems: 'flex-start',
  },
  messsageNameText: {
    fontSize: 12,
    color: Colors.GREY,
    marginBottom: 4,
  },
  messageBox: {
    flexDirection: 'row',
    alignItems: 'flex-end', //이게 시간을 밑으로 보내는 역할을 해줌!
  },
  messageTimeText: {fontSize: 12, color: Colors.GREY},
  messageBubble: {
    backgroundColor: Colors.BLACK,
    borderRadius: 22,
    padding: 12,
    flexShrink: 1, //넘치지 않게!
  },
  messageOtherBubble: {
    backgroundColor: Colors.LIGHTGREY,
    borderRadius: 22,
    padding: 12,
    flexShrink: 1, //넘치지 않게!
  },
  messageText: {color: Colors.WHITE, fontSize: 16},
  messageOtherText: {color: Colors.BLACK, fontSize: 16},
  messageSeparator: {height: 8},
  profileContainer: {
    backgroundColor: Colors.LIGHTGREY,
    overflow: 'hidden', //부모 컨테이너가 원형일 때, 자식 컨테이너가 원형을 넘칠 수 없게 함.
  },
});

export default styles;
