import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const ScaleFontSize = fontSize => {
  const scale = width / 320; // 320 adalah lebar layar dasar
  return Math.round(fontSize * scale);
};
