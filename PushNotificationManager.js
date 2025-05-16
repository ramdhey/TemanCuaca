import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

async function getFcmToken() {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log('Your Firebase Token is:', fcmToken);
  } else {
    console.log('Failed to get FCM token');
  }
}

function onMessageReceived() {
  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

    if (remoteMessage.notification) {
      // Tampilkan notifikasi menggunakan react-native-push-notification
      PushNotification.localNotification({
        channelId: 'ramaId', // Pastikan ini sesuai dengan channelId yang Anda buat
        title: remoteMessage.notification.title, // Judul notifikasi
        message: remoteMessage.notification.body, // Isi pesan notifikasi
        playSound: true, // Mainkan suara saat notifikasi ditampilkan
        soundName: 'default', // Nama file suara (harus ada di Android/app/src/main/res/raw)
        // Anda bisa menambahkan opsi lain sesuai kebutuhan
      });
    }
  });
}

export {requestUserPermission, getFcmToken, onMessageReceived};
