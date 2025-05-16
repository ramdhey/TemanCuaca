/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/Components/backgroundHandler';
import PushNotification from 'react-native-push-notification';


PushNotification.createChannel(
  {
    channelId: 'ramaId',
    channelName: 'TemanCuaca',
    channelDescription: 'TestNotifikasi',
    soundName: 'default',
    importance: 4,
    vibrate: true,
  },
  created => console.log(`CreateChannel returned '${created}'`),
);
AppRegistry.registerComponent(appName, () => App);
