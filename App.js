import React, {useState, useEffect} from 'react';
import {View, Text, Platform} from 'react-native';
import Routeing from './src/Navigation/Router';
import EncryptedStorage from 'react-native-encrypted-storage';
import UserState from './state/UserState';
import messaging from '@react-native-firebase/messaging';
import {
  requestUserPermission,
  getFcmToken,
  onMessageReceived,
} from './PushNotificationManager';


const App = () => {
  const {
    token,
    setToken,
    refreshToken,
    setRefreshToken,
    // userProfile,
    // setuserProfile,
    login,
    setLogin,
    setFullName,
    setEmail,
    setNickName,
    setAvatar,
    e_mail,
    full_Name,
    nick_Name,
    Avatar,
    fcmToken,
    setFcmToken,
  } = UserState();

  useEffect(() => {
    // Inisialisasi aplikasi

    const initApp = async () => {
      const storedToken = await EncryptedStorage.getItem('authToken'); // Pastikan kunci ini sesuai
      if (storedToken) {
        setToken(storedToken);
      }
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });
      requestUserPermission();
      getFcmToken();
      onMessageReceived();
    };

    initApp(); // Memanggil fungsi initApp
  }, [setToken, setFullName, setEmail, setNickName, setAvatar]);
  return (
    <>
      <Routeing />
    </>
  );
};

export default App;
