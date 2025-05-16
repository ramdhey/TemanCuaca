import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Txt from './Txt';
import WeatherTranslate from './MOD/WeatherTranslate';

const CardCuaca = ({icon, cuacaKode, location, suhuCelcius}) => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);
  const cuacaKaliIni = WeatherTranslate[cuacaKode];
  return (
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.6)', 'rgba(100, 100, 100, 0.6)']}
      style={{
        width: imageWidth * 1.05,
        justifyContent: 'center',
        paddingVertical: '0%',
        // paddingHorizontal: '2%',
        alignItems: 'center',
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          //   justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: '2%',
            width: '70%',
          }}>
          <Image
            source={require('../Assets/Images/Icons/locRed.png')}
            style={{
              width: imageWidth * 0.06,
              height: imageHeight * 0.5,
              backgroundColor: 'transparent',
              alignSelf: 'center',
            }}
            resizeMode="contain"
          />
          <Txt
            fontSize={18}
            style={{
              color: '#FFF',
              fontFamily: 'RethinkSans-SemiBold',
              textAlign: 'center',
              paddingVertical: '0%',
              width: 'auto',
              paddingHorizontal: '2%',
            }}>
            {location}
          </Txt>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: '2%',
            width: '30%',
          }}>
          <Txt
            fontSize={18}
            style={{
              color: '#FFF',
              fontFamily: 'RethinkSans-SemiBold',
              textAlign: 'center',
              paddingVertical: '0%',
              width: 'auto',
              paddingHorizontal: '2%',
            }}>
            {`${suhuCelcius}°C`}
          </Txt>
        </View>
      </View>
      <View
        style={{
          // flexDirection: 'row',
          width: '100%',
          // justifyContent: 'space-between',
            paddingHorizontal: '5%',
            alignItems:'center'
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: `https:${icon}`}}
            style={{
              width: imageWidth * 0.09,
              height: imageHeight * 0.5,
              backgroundColor: 'transparent',
              alignSelf: 'flex-start',
            }}
            resizeMode="contain"
          />
          <Txt
            fontSize={16}
            style={{
              color: '#FFF',
              fontFamily: 'RethinkSans-Regular',
              textAlign: 'left',
              paddingVertical: '0%',
              width: 'auto',
              paddingHorizontal: '2%',
            }}>
            {cuacaKaliIni}
          </Txt>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CardCuaca;
