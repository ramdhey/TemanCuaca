import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Toast from 'react-native-root-toast';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScaleFontSize} from './MOD/ScaleFontSize';

const SuccessToast = ({
  title,
  message,
  duration = Toast.durations.SHORT,
  position = Toast.positions.BOTTOM,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth); // gunakan aspek rasio yang sama seperti gambar asli

  const showToast = () => {
    Toast.show(
      <View
        style={{
          width: imageWidth * 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome5 name="check-circle" size={24} color="#fff" />
          <Text
            style={{
              color: '#fff',
              fontFamily: 'RethinkSans-ExtraBold',
              fontSize: ScaleFontSize(12),
              textAlign: 'center',
            }}>
            {title}
          </Text>
        </View>

        <View
          style={{
            width: '90%',

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'RethinkSans-SemiBold',
              fontSize: ScaleFontSize(12),
              textAlign: 'center',
            }}>
            {message}
          </Text>
        </View>
      </View>,

      {
        duration,
        position,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: '#90E808',
        textColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 0},
      },
    );
  };

  return {showToast};
};

export default SuccessToast;
