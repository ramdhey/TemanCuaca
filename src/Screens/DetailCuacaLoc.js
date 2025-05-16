import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  RefreshControl,
  FlatList,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import UserState from '../../state/UserState';
import WeatherState from '../../state/WeatherState';
import API_SERVICES from '../Services/API_SERVICES';
import API_BaseUrl from '../Services/API/API_BaseUrl';
import WrapCode from '../Components/WrapCode';
import LoadingImage from '../Components/LoadingImage';
import ThemeConditions from '../Components/ThemeConditions';
import Txt from '../Components/Txt';
import {FormatDateDisplay} from '../Components/MOD/FormatDateDisplay';
import {TranslateWeatherCondition} from '../Components/MOD/TranslateWeatherCondition ';
import CardCondition from '../Components/CardCondition';
import {LevelUv} from '../Components/MOD/LevelUv';
import {Convert24Jam} from '../Components/MOD/Convert24Jam';

const DetailCuacaLoc = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {itemData, cuacaKode, location, icon, suhuCelcius, nameCuaca} =
    route.params;
  const {token} = UserState();
  const {
    cuacaGPS,
    cuacaLocation,
    setCuacaGPS,
    setCuacaLocation,
    listCuacaSaved,
    setListCuacaSaved,
    setDetailListCuacaSaved,
    detailListCuacaSaved,
  } = WeatherState();
  console.log({detailListCuacaSaved});
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);
  const now = new Date();
  const currentHour = now.getHours(); // Jam saat ini
  const currentDate = now.toISOString().split('T')[0];

  const APIDetailLoc = useCallback(async () => {
    setLoading(true);
    try {
      const url = `${API_BaseUrl}/detail-cuaca-loc?city=${itemData}`;
      const result = await API_SERVICES({
        url: url,
        method: 'GET', // Pastikan ini adalah 'method', bukan 'metode'
        contentType: 'application/json',
        token: token,
      });
      if (
        !detailListCuacaSaved ||
        JSON.stringify(detailListCuacaSaved) !== JSON.stringify(result.data)
      ) {
        setDetailListCuacaSaved(result.data);
      }
      setLoading(false);
    } catch (error) {
      console.error(
        'There was a problem with the fetch operation APILocationGPS: ',
        error,
      );
    }
    setLoading(false);
  }, [itemData, token]);

  useEffect(() => {
    APIDetailLoc();
  }, [APIDetailLoc]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setLoading(true);
    await APIDetailLoc();
    setRefreshing(false);
    setLoading(false);
  }, [APIDetailLoc]);

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
          style={{width: '100%'}}
          contentContainerStyle={{
            alignItems: 'center',
            // flex: 1,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <ThemeConditions
            detailGPS={true}
            // onPress={() => navigation.navigate('detailGPS')}
            cuacaKode={cuacaKode}
            location={location}
            suhuCelcius={suhuCelcius}
            iconCuaca={icon}
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
                  data={detailListCuacaSaved?.forecast?.forecastday || []}
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
                      itemData={LevelUv(detailListCuacaSaved?.current?.uv)}
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
                      itemData={`${detailListCuacaSaved?.current?.humidity}%`}
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
                      itemData={`${detailListCuacaSaved?.forecast?.forecastday[0]?.day?.mintemp_c}°C`}
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
                      itemData={`${detailListCuacaSaved?.forecast?.forecastday[0]?.day?.maxtemp_c}°C`}
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
                        detailListCuacaSaved?.forecast?.forecastday[0]?.astro
                          ?.sunrise,
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
                        detailListCuacaSaved?.forecast?.forecastday[0]?.astro
                          ?.sunset,
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

export default DetailCuacaLoc;
