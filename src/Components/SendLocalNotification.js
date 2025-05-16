import PushNotification from 'react-native-push-notification';

export const SendLocalNotification = (title, message) => {
  PushNotification.localNotification({
    channelId: 'ramaId',
    title: title,
    message: message,
    playSound: true,
    soundName: 'default',
  });
};
