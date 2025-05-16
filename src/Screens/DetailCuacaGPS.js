import React, {useState} from 'react';
import {View, Dimensions, ScrollView, FlatList, Image} from 'react-native';
import WrapCode from '../Components/WrapCode';
import UserState from '../../state/UserState';
import WeatherState from '../../state/WeatherState';
import BackBtn from '../Components/BackBtn';
import {useNavigation} from '@react-navigation/native';
import ThemeConditions from '../Components/ThemeConditions';
import LoadingImage from '../Components/LoadingImage';
import Txt from '../Components/Txt';
import {FormatDateDisplay} from '../Components/MOD/FormatDateDisplay';
import {TranslateWeatherCondition} from './../Components/MOD/TranslateWeatherCondition ';
import {LevelUv} from './../Components/MOD/LevelUv';
import {Convert24Jam} from '../Components/MOD/Convert24Jam';
import CardCondition from '../Components/CardCondition';

const DetailCuacaGPS = () => {
  const navigation = useNavigation();
  const {token} = UserState();
  const {cuacaGPS, cuacaLocation} = WeatherState();
  const [loading, setLoading] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);

  const codeCuaca = cuacaGPS?.current?.condition?.code;
  const iconCuaca = cuacaGPS?.current?.condition?.icon;
  const temperatureCelcius = cuacaGPS?.current?.temp_c;
  const temperatureFarenhait = cuacaGPS?.current?.temp_f;
  const nameLocation = cuacaGPS?.location?.name;
  const nameCuaca = cuacaGPS?.current?.condition?.text;
  const now = new Date();
  const currentHour = now.getHours(); // Jam saat ini
  const currentDate = now.toISOString().split('T')[0]; // Tanggal saat ini dalam format YYYY-MM-DD
  console.log({cuacaGPS});
  // Data cuaca untuk hari ini, mulai dari jam saat ini
  const todayData =
    cuacaLocation?.forecast?.forecastday
      .find(day => day.date === currentDate)
      ?.hour.filter(
        hour =>
          parseInt(hour.time.split(' ')[1].split(':')[0], 10) >= currentHour,
      ) || [];

  // Hitung berapa banyak jam yang dibutuhkan dari hari berikutnya
  const hoursNeededFromNextDay = 24 - todayData.length;

  // Data cuaca untuk awal hari berikutnya, jika diperlukan
  const nextDayData =
    hoursNeededFromNextDay > 0
      ? cuacaLocation?.forecast?.forecastday[1]?.hour.slice(
          0,
          hoursNeededFromNextDay,
        )
      : [];
  const combinedData = [...todayData, ...nextDayData];
  const renderHourlyForecast = ({item}) => {
    const iconCuaca = `https:${item.condition.icon}`;
    return (
      <View
        style={{
          width: imageWidth * 0.25,
          alignItems: 'center',
          marginHorizontal: 5,
          backgroundColor: 'rgba(150, 200, 255, 0.4)',
          paddingVertical: '2%',
          height: 'auto',
          borderRadius: 10,
        }}>
        <Txt
          fontSize={11}
          style={{
            color: '#FFFF',
            fontFamily: 'RethinkSans-ExtraBold',
            textAlign: 'center',
            paddingVertical: '2%',
          }}>
          {`${item.temp_c}°C`}
        </Txt>

        <Image
          source={{uri: iconCuaca}}
          style={{
            width: imageWidth * 0.5,
            height: imageHeight * 0.5,
            backgroundColor: 'transparent',
          }}
          resizeMode="contain"
        />
        <Txt
          fontSize={11}
          style={{
            color: '#000',
            fontFamily: 'RethinkSans-Regular',
            textAlign: 'center',
            paddingVertical: '2%',
          }}>
          {item.time.split(' ')[1]}
        </Txt>
        <Txt
          fontSize={10}
          style={{
            color: '#000',
            fontFamily: 'RethinkSans-Regular',
            textAlign: 'center',
            paddingVertical: '2%',
          }}>
          {`${item.wind_kph}km/j`}
        </Txt>
      </View>
    );
  };

  const renderDailyForecast = ({item}) => {
    const iconCuaca = `https:${item?.day?.condition?.icon}`;
    return (
      <View
        style={{
          width: imageWidth * 1,
          alignItems: 'center',
          marginHorizontal: 5,
          backgroundColor: 'transparent',
          paddingVertical: '2%',
          height: 'auto',
          borderRadius: 10,
          paddingHorizontal: '2%',
          marginVertical: '2%',
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '3%',
          }}>
          <View
            style={{
              width: '25%',
              alignItems: 'center',
            }}>
            <Txt
              fontSize={14}
              style={{
                color: '#000',
                fontFamily: 'RethinkSans-SemiBold',
                textAlign: 'center',
                paddingVertical: '2%',
              }}>
              {FormatDateDisplay(item.date)}
            </Txt>
          </View>
          <View
            style={{
              width: '10%',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: iconCuaca}}
              style={{
                width: imageWidth * 0.2,
                height: imageHeight * 0.5,
                backgroundColor: 'transparent',
              }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              width: '50%',
              alignItems: 'center',
            }}>
            <Txt
              fontSize={11}
              style={{
                color: '#000',
                fontFamily: 'RethinkSans-SemiBold',
                textAlign: 'center',
                paddingVertical: '2%',
              }}>
              {TranslateWeatherCondition(item.day.condition.text)}
            </Txt>
          </View>
        </View>

        {/* Tampilkan gambar cuaca menggunakan icon URL dari item.day.condition.icon */}
      </View>
    );
  };

  return (
    <WrapCode
      backgroundColor="transparent"
      barStyle="light-content"
      translucent={true}>
      {loading ? (
        <LoadingImage imageWidth={imageWidth} />
      ) : (
        <ScrollView
          contentContainerStyle={{alignItems: 'center'}}
          style={{width: '100%'}}>
          <ThemeConditions
            detailGPS={true}
            // onPress={() => navigation.navigate('detailGPS')}
            cuacaKode={codeCuaca}
            location={nameLocation}
            suhuCelcius={temperatureCelcius}
            iconCuaca={iconCuaca}
            nameCuaca={nameCuaca}>
            <View
              style={{
                backgroundColor: 'transparent',
                width: '100%',
                alignItems: 'center',
                paddingVertical: '10%',
                flex: 1,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '88%',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Txt
                    fontSize={22}
                    style={{
                      color: '#FFF',
                      fontFamily: 'RethinkSans-SemiBold',
                      textAlign: 'left',
                      paddingVertical: '2%',
                      paddingHorizontal: '2%',
                    }}>
                    Prediksi 24 Jam
                  </Txt>
                  <FlatList
                    horizontal
                    data={combinedData}
                    renderItem={renderHourlyForecast}
                    keyExtractor={(item, index) => `${item.time}_${index}`}
                    showsHorizontalScrollIndicator={false}
                    style={{
                      backgroundColor: 'transparent',
                      width: '100%',
                      paddingHorizontal: '3%',
                      paddingVertical: '2%',
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  width: '88%',
                  backgroundColor: 'rgba(150, 200, 255, 0.4)',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginVertical: '5%',
                }}>
                <Txt
                  fontSize={22}
                  style={{
                    color: '#FFF',
                    fontFamily: 'RethinkSans-SemiBold',
                    textAlign: 'left',
                    paddingVertical: '2%',
                    paddingHorizontal: '2%',
                  }}>
                  Prediksi 3 Hari
                </Txt>

                <FlatList
                  data={cuacaLocation?.forecast?.forecastday || []}
                  renderItem={renderDailyForecast}
                  keyExtractor={item => item.date}
                  style={{
                    backgroundColor: 'transparent',
                    width: '100%',
                    paddingHorizontal: '3%',
                    paddingVertical: '2%',
                  }}
                />
              </View>

              {/* card */}
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '100%',
                    flexWrap: 'wrap', // Ini memungkinkan item untuk "wrap" ke baris atau kolom berikutnya
                    flexDirection: 'row', // Mengatur item dalam arah baris
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      paddingHorizontal: '2%',
                      paddingVertical: '2%',
                    }}>
                    <CardCondition
                      itemData={LevelUv(cuacaLocation?.current?.uv)}
                      title="UV"
                    />
                  </View>
                  <View
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      paddingHorizontal: '2%',
                      paddingVertical: '2%',
                    }}>
                    <CardCondition
                      title="kelembapan"
                      itemData={`${cuacaLocation?.current?.humidity}%`}
                      sourceImge={require('../Assets/Images/Image/kelembapan.png')}
                    />
                  </View>
                  <View
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      paddingHorizontal: '2%',
                      paddingVertical: '2%',
                    }}>
                    <CardCondition
                      itemData={`${cuacaLocation?.forecast?.forecastday[0]?.day?.mintemp_c}°C`}
                      title="Terdingin"
                      sourceImge={require('../Assets/Images/Image/suhuMin.png')}
                    />
                  </View>
                  <View
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      paddingHorizontal: '2%',
                      paddingVertical: '2%',
                    }}>
                    <CardCondition
                      title="Terpanas"
                      itemData={`${cuacaLocation?.forecast?.forecastday[0]?.day?.maxtemp_c}°C`}
                      sourceImge={require('../Assets/Images/Image/suhuMax.png')}
                    />
                  </View>
                  <View
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      paddingHorizontal: '2%',
                      paddingVertical: '2%',
                    }}>
                    <CardCondition
                      itemData={Convert24Jam(
                        cuacaLocation?.forecast?.forecastday[0]?.astro?.sunrise,
                      )}
                      title="Fajar"
                      sourceImge={require('../Assets/Images/Image/sunrise.png')}
                      imageH={1}
                      WidthIm={0.3}
                    />
                  </View>
                  <View
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      paddingHorizontal: '2%',
                      paddingVertical: '2%',
                    }}>
                    <CardCondition
                      title="Senja"
                      itemData={Convert24Jam(
                        cuacaLocation?.forecast?.forecastday[0]?.astro?.sunset,
                      )}
                      sourceImge={require('../Assets/Images/Image/sunset.png')}
                    />
                  </View>
                </View>
              </View>
              {/* end Card */}
            </View>
          </ThemeConditions>
        </ScrollView>
      )}
    </WrapCode>
  );
};

export default DetailCuacaGPS;
