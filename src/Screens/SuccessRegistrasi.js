import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import WrapCode from '../Components/WrapCode';
import UserState from '../../state/UserState';
import LinearGradient from 'react-native-linear-gradient';
import {ScaleFontSize} from '../Components/MOD/ScaleFontSize';
import Button from '../Components/Button';
import {useNavigation} from '@react-navigation/native';
import CountdownTimer from './../Components/CountDownTimer';
import Txt from '../Components/Txt';

const SuccessRegistrasi = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth); // gunakan aspek rasio yang sama seperti gambar asli
  const {register, setRegister} = UserState();
  console.log(register);
  return (
    <WrapCode
      backgroundColor="#222227"
      barStyle="light-content"
      translucent={false}>
      <LinearGradient
        colors={['#FBFCFA', '#87C5D3']}
        style={{
          flex: 1,
          alignItems: 'center',
          width: '100%',
          paddingVertical: '0%',
        }}>
        <Image
          source={require('../Assets/Images/Image/Vek.png')}
          style={{
            width: imageWidth * 1.18,
            height: imageHeight * 2.4,
            backgroundColor: 'transparent',
            alignSelf: 'center',
          }}
          resizeMode="cover"
        />

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: '2%',
          }}>
          <Txt
            fontSize={14}
            style={{
              color: '#FFF',
              fontFamily: 'RethinkSans-Bold',
              marginTop: '7%',
              textAlign: 'center',
              width: '90%',
            }}>
            {register}
          </Txt>

          <Image
            source={require('../Assets/Images/Image/check.gif')}
            style={{
              width: imageWidth * 1.18,
              height: imageHeight * 2.4,
              backgroundColor: 'transparent',
              alignSelf: 'center',
            }}
            resizeMode="contain"
          />
          <Txt
            fontSize={14}
            style={{
              color: '#FFF',
              fontFamily: 'RethinkSans-Bold',
              marginTop: '7%',
              textAlign: 'center',
              width: '90%',
            }}>
            Kode Verifikasi Akan Kedaluwarsa dalam waktu :
          </Txt>

          <CountdownTimer
            duration={60 * 60} // Durasi dalam detik, contoh 1 jam
            style={{
              fontSize: ScaleFontSize(13),
              color: '#FFF',
              fontFamily: 'RethinkSans-SemiBold',
              marginTop: '3%',
              textAlign: 'center',
            }}
          />
        </View>
        <Button
          onPress={() => navigation.navigate('Login')}
          text="Lanjutkan"
          buttonStyle={{
            height: imageHeight * 0.45,
            width: imageWidth,
            borderRadius: 60,
            color: '#FFF',
            marginTop: '5%',
          }}
          textStyle={{
            color: '#000',
          }}
          gradientColors={['#FFC500', '#FFC500']}
        />
      </LinearGradient>
    </WrapCode>
  );
};

export default SuccessRegistrasi;
