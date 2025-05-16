import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import WrapCode from '../Components/WrapCode';
import {ScaleFontSize} from '../Components/MOD/ScaleFontSize';

const NoInternet = () => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth); // gunakan aspek rasio yang sama seperti gambar asli
  return (
    <WrapCode
      backgroundColor="#222227"
      barStyle="light-content"
      translucent={false}>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F4FFFF',
        }}>
        <Image
          source={require('../Assets/Images/Image/lostCOn.png')}
          style={{
            width: imageWidth * 1.1,
            height: imageHeight * 2.8,
            backgroundColor: 'transparent',
            alignSelf: 'center',
            marginBottom: '6%',
          }}
        />
        <Text
          style={{
            fontSize: ScaleFontSize(22),
            color: '#000',
            fontFamily: 'RethinkSans-ExtraBold',
            paddingHorizontal: '2%',
            paddingVertical: '2%',
            height: '7%',
          }}>
          Koneksi Internet Hilang.
        </Text>
        <Text
          style={{
            fontSize: ScaleFontSize(13),
            color: '#000',
            fontFamily: 'RethinkSans-SemiBold',
            height: '5%',
          }}>
          Silahkan Sambungkan Ulang Koneksi Mu
        </Text>
      </View>
    </WrapCode>
  );
};

export default NoInternet;
