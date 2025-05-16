import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Txt from './Txt';
import LinearGradient from 'react-native-linear-gradient';
import WeatherTranslate from './MOD/WeatherTranslate';
import BackBtn from './BackBtn';
import {useNavigation} from '@react-navigation/native';

const ThemeConditions = ({
  cuacaKode,
  location,
  suhuCelcius,
  nameCuaca,
  iconCuaca,
  children,
  onPress,
  detailGPS = false,
  // testHour = 22
}) => {
  const navigation = useNavigation();
  // console.log({suhuCelcius});
  const weatherConditions = {
    1000: {
      description: 'Sunny/Clear',
      textColor: '#FEFDF5',
      textColor2: '#FEFDF5',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/Sunny.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/ClearNight.png'),
    },
    1003: {
      description: 'Partly Cloudy',
      textColor: '#FEFDF5',
      textColor2: '#FEFDF5',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/PartlyCloudlyDay.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/PartlyCloudlyNight.png'),
    },
    1006: {
      description: 'Cloudy',
      textColor: '#1E1E1E',
      textColor2: '#FEFDF5',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/CloudlyDay.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/CloudlyNight.png'),
    },
    1009: {
      description: 'Overcast',
      textColor: '#1E1E1E',
      textColor2: '#FEFDF5',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/OvercastDay.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/OvercastNight.png'),
    },
    1087: {
      description: 'Overcast',
      textColor: '#1E1E1E',
      textColor2: '#FEFDF5',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/OvercastDay.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/OvercastNight.png'),
    },
    1030: {
      description: 'Mist',
      textColor: '#1E1E1E',
      textColor2: '#1E1E1E',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/MistDay.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/MistNight.png'),
    },
    1135: {
      description: 'Mist',
      textColor: '#1E1E1E',
      textColor2: '#FEFDF5',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/MistDay.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/MistNight.png'),
    },

    1063: {
      description: 'Thundery outbreaks possible',
      textColor: '#FEFDF5',
      textColor2: '#FEFDF5',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/HujanRintikDay.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/HujanRintikNight.png'),
    },
    1180: {
      description: 'Thundery outbreaks possible',
      textColor: '#FEFDF5',
      textColor2: '#FEFDF5',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/HujanRintikDay.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/HujanRintikNight.png'),
    },
    1183: {
      description: 'Thundery outbreaks possible',
      textColor: '#FEFDF5',
      textColor2: '#FEFDF5',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/HujanRintikDay.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/HujanRintikNight.png'),
    },
    1240: {
      description: 'Thundery outbreaks possible',
      textColor: '#FEFDF5',
      textColor2: '#FEFDF5',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/HujanRintikDay.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/HujanRintikNight.png'),
    },
    1186: {
      description: 'Thundery outbreaks possible',
      textColor: '#1E1E1E',
      textColor2: '#1E1E1E',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/HujanDerasDay.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/HujanDerasNight.png'),
    },
    1189: {
      description: 'Thundery outbreaks possible',
      textColor: '#1E1E1E',
      textColor2: '#1E1E1E',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/HujanDerasDay.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/HujanDerasNight.png'),
    },
    1243: {
      description: 'Thundery outbreaks possible',
      textColor: '#1E1E1E',
      textColor2: '#1E1E1E',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/HujanDerasDay.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/HujanDerasNight.png'),
    },
    1192: {
      description: 'Thundery outbreaks possible',
      textColor: '#1E1E1E',
      textColor2: '#1E1E1E',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/HujanDerasDay.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/HujanDerasNight.png'),
    },
    1246: {
      description: 'Thundery outbreaks possible',
      textColor: '#1E1E1E',
      textColor2: '#1E1E1E',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/HujanDerasDay.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/HujanDerasNight.png'),
    },
    1195: {
      description: 'Thundery outbreaks possible',
      textColor: '#1E1E1E',
      textColor2: '#1E1E1E',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/HujanDerasDay.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/HujanDerasNight.png'),
    },
    1273: {
      description: 'Thundery outbreaks possible',
      textColor: '#1E1E1E',
      textColor2: '#1E1E1E',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/HujanDerasDay.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/HujanDerasNight.png'),
    },
    1276: {
      description: 'Thundery outbreaks possible',
      textColor: '#1E1E1E',
      textColor2: '#1E1E1E',
      backgroundImageDay: require('../Assets/Images/Image/BgCuaca/HujanDerasDay.png'),
      backgroundImageNight: require('../Assets/Images/Image/BgCuaca/HujanDerasNight.png'),
    },
  };

  const cuacaKaliIni = WeatherTranslate[cuacaKode];
  const getThemeAttributes = theme => {
    return weatherConditions[cuacaKode] || weatherConditions[1000]; // Kembali ke tema ungu jika tema tidak dikenali
  };

  const themeAttributes = getThemeAttributes(cuacaKode);

  //  Yang Benar INI
  const isDayTime = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18;
  };
  const backgroundImage = isDayTime()
    ? themeAttributes?.backgroundImageDay
    : themeAttributes?.backgroundImageNight;

  const textColor = isDayTime()
    ? themeAttributes?.textColor
    : themeAttributes?.textColor2;

  // END Yang Benar INI

  // INI TEST
  // const isDayTime = hour => {
  //   const currentHour = hour !== undefined ? hour : new Date().getHours();
  //   return currentHour >= 6 && currentHour < 18;
  // };

  // const backgroundImage = isDayTime(testHour)
  //   ? themeAttributes?.backgroundImageDay
  //   : themeAttributes?.backgroundImageNight;

  // const textColor = isDayTime(testHour)
  //   ? themeAttributes?.textColor
  //   : themeAttributes?.textColor2;
  // INI TEST

  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);
  const {height: screenHeight} = Dimensions.get('window');

  return (
    <ImageBackground
      source={backgroundImage}
      style={{
        width: '100%',
        minHeight: screenHeight,
        backgroundColor: 'transparent',
        alignSelf: 'center',

        borderRadius: 10,
        flex: 1,
      }}
      resizeMode="cover">
      <View
        style={{
          paddingHorizontal: '0.6%',
          paddingVertical: '10%',
          alignItems: 'center',
        }}>
        {detailGPS === true ? (
          <View
            style={{
              width: '88%',
              alignItems: 'center',
              // flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View
              style={{
                alignItems: 'center',
                width: '3%',
                // paddingHorizontal: '2%',
                paddingVertical: '2%',
                alignSelf: 'flex-start',
              }}>
              <BackBtn
                navigation={navigation}
                backgroundColor={'#87C5D3'}
                iconColor={'#FBFCFA'}
              />
            </View>
            <View
              style={{
                width: '97%',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                borderRadius: 10,
                // marginLeft:'5%'
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: '2%',
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
                    color: textColor,
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
                  // width: '100%',
                  flexDirection: 'row',
                  paddingHorizontal: '2%',
                  paddingVertical: '0%',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: `https:${iconCuaca}`}}
                  style={{
                    width: imageWidth * 0.15,
                    height: imageHeight * 0.4,
                    backgroundColor: 'transparent',
                    alignSelf: 'center',
                  }}
                  resizeMode="contain"
                />
                <Txt
                  fontSize={42}
                  style={{
                    color: textColor,
                    fontFamily: 'RethinkSans-Regular',
                    textAlign: 'center',
                    paddingVertical: '2%',
                    width: 'auto',
                    paddingHorizontal: '2%',
                  }}>
                  {`${suhuCelcius}°C`}
                </Txt>
              </View>
              <View
                style={{
                  // width: '100%',
                  flexDirection: 'row',
                  paddingHorizontal: '2%',
                  paddingVertical: '0%',
                  alignItems: 'center',
                }}>
                <Txt
                  fontSize={18}
                  style={{
                    color: textColor,
                    fontFamily: 'RethinkSans-Regular',
                    textAlign: 'center',
                    paddingVertical: '2%',
                    width: 'auto',
                    paddingHorizontal: '2%',
                  }}>
                  {cuacaKaliIni}
                </Txt>
              </View>
            </View>
          </View>
        ) : (
          <LinearGradient
            colors={['rgba(255, 255, 255,0.5)', 'rgba(255, 255, 255, 0.6)']}
            style={{
              width: '88%',
              justifyContent: 'center',
              paddingVertical: '5%',
              paddingHorizontal: '2%',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <TouchableOpacity
              onPress={onPress}
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: '2%',
                }}>
                <Image
                  source={require('../Assets/Images/Icons/loc.png')}
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
                    color: textColor,
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
                  // width: '100%',
                  flexDirection: 'row',
                  paddingHorizontal: '2%',
                  paddingVertical: '0%',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: `https:${iconCuaca}`}}
                  style={{
                    width: imageWidth * 0.15,
                    height: imageHeight * 0.4,
                    backgroundColor: 'transparent',
                    alignSelf: 'center',
                  }}
                  resizeMode="contain"
                />
                <Txt
                  fontSize={24}
                  style={{
                    color: textColor,
                    fontFamily: 'RethinkSans-Regular',
                    textAlign: 'center',
                    paddingVertical: '2%',
                    width: 'auto',
                    paddingHorizontal: '2%',
                  }}>
                  {`${suhuCelcius}°C`}
                </Txt>
              </View>
              <View
                style={{
                  // width: '100%',
                  flexDirection: 'row',
                  paddingHorizontal: '2%',
                  paddingVertical: '0%',
                  alignItems: 'center',
                }}>
                <Txt
                  fontSize={12}
                  style={{
                    color: textColor,
                    fontFamily: 'RethinkSans-Regular',
                    textAlign: 'center',
                    paddingVertical: '2%',
                    width: 'auto',
                    paddingHorizontal: '2%',
                  }}>
                  {cuacaKaliIni}
                </Txt>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        )}

        {children}
      </View>
    </ImageBackground>
  );
};

export default ThemeConditions;
