import React, {useCallback, useContext, useEffect, useState} from 'react';
import Screen from '../components/Screen';
import AuthContext from '../components/AuthContext';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import styles from '../modules/Styles';
import auth from '@react-native-firebase/auth';
import {getFirestore} from '@react-native-firebase/firestore';
import {User} from '../types';

const HomeScreen = () => {
  const {user: me} = useContext(AuthContext);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const onPressLogout = useCallback(() => {
    auth().signOut(); //하 signOut 이렇게 하면 안먹고 signOut(); 이렇게 해야 먹음!
    console.log('Log OuT');
  }, []);

  const loadUsers = useCallback(async () => {
    try {
      setLoadingUsers(true);
      const snapshot = await getFirestore().collection('users').get();
      setUsers(
        snapshot.docs
          .map(doc => {
            return doc.data() as User;
          })
          .filter(u => u.userId !== me?.userId),
      ); //다른 것만 가져온다는 뜻 !
      console.log('users', users);
    } finally {
      setLoadingUsers(false);
    }
  }, [me?.userId]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]); //ConnectedCallback 같은 것임! 근데 여기에 의존성 이렇게 추가하면 ㅋㅋㅋ 이게 변경될 때마다 실행되니까 무한루프 돌 수 있지. 그냥 빈 어레이 넣어 아니면 메소드 넣거나

  if (me == null) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const renderLoading = useCallback(() => {
    return (
      <>
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      </>
    );
  }, []);

  return (
    <Screen title="HOME">
      <View style={styles.homeContainer}>
        <View>
          <Text style={styles.homeSectionTitle}>나의 정보</Text>
          <View style={styles.homeMyProfile}>
            <Text style={styles.homeMyNameText}>{me?.name}</Text>
            <Text style={styles.homeMyNameText}>{me?.email}</Text>

            <TouchableOpacity onPress={onPressLogout}>
              <Text style={styles.homeLogoutText}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.homeUserListSection}>
          {loadingUsers ? renderLoading() : <Text>a</Text>}
        </View>
      </View>
    </Screen>
  );
};

export default HomeScreen;
