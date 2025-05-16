import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
  RefreshControl,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import WrapCode from '../Components/WrapCode';
import UserState from '../../state/UserState';
import Txt from '../Components/Txt';
import LinearGradient from 'react-native-linear-gradient';
import API_BaseUrl from '../Services/API/API_BaseUrl';
import API_SERVICES from '../Services/API_SERVICES';
import LoadingImage from '../Components/LoadingImage';
import Card from '../Components/Card';
import WeatherState from '../../state/WeatherState';
import ThemeConditions from '../Components/ThemeConditions';
import CardCuaca from '../Components/CardCuaca';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import { SendLocalNotification } from './../Components/SendLocalNotification';


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const {
    token,
    setToken,
    refreshToken,
    setRefreshToken,
    userProfile,
    setuserProfile,
    login,
    setLogin,
    setFullName,
    setEmail,
    setNickName,
    setAvatar,
    e_mail,
    full_Name,
    nick_Name,
    Avatar,
    setEditProfile,
    latitudeGPS,
    longitudeGPS,
    cityGPS,
    fetchUserProfile,
    // fcmToken,
  } = UserState();
  const {
    cuacaGPS,
    cuacaLocation,
    setCuacaGPS,
    setCuacaLocation,
    listCuacaSaved,
    setListCuacaSaved,
  } = WeatherState();
  // console.log('cuacaGPS', cuacaGPS?.current?.condition?.icon);

  console.log({latitudeGPS});
  console.log({longitudeGPS});
  // console.log(JSON.stringify(listCuacaSaved));

  // useEffect(() => {
  //   console.log('Latitude GPS:', latitudeGPS);
  //   console.log('Longitude GPS:', longitudeGPS);
  // }, [latitudeGPS, longitudeGPS]);

  // const sendNotification = async (title, body) => {
  //   const url = `${API_BaseUrl}/send-notification`;
  //   const notificationBody = {
  //     notification: {
  //       title: title,
  //       body: body,
  //     },
  //     token: fcmToken,
  //   };
  //   console.log({fcmToken});
  //   const result = await API_SERVICES({
  //     url: url,
  //     metode: 'POST',
  //     contentType: 'application/json',
  //     body: JSON.stringify(notificationBody),
  //     token: token,
  //   });
  //   console.log(result);
  // };

  const APIGetProfile = useCallback(async () => {
    setLoading(true);
    try {
      const url = `${API_BaseUrl}/getProfile`;
      const result = await API_SERVICES({
        url: url,
        metode: 'GET',
        contentType: 'application/json',
        token: token,
      });

      if (
        !userProfile ||
        JSON.stringify(userProfile) !== JSON.stringify(result?.user)
      ) {
        setuserProfile(result?.user);
        // SendLocalNotification('Cek Aja', 'Test');
      }
      // console.log(JSON.stringify(result?.user));
      // setuserProfile(result?.user);
      setLoading(false);
    } catch (error) {
      console.error(
        'There was a problem with the fetch operation APIGetProfil: ',
        error,
      );
    }
    setLoading(false);
  }, [token, setuserProfile, userProfile, setEditProfile]);

  const APILocationGPS = useCallback(async () => {
    setLoading(true);
    try {
      const url = `${API_BaseUrl}/user-loc?lat=${latitudeGPS}&lon=${longitudeGPS}`;
      const result = await API_SERVICES({
        url: url,
        method: 'GET', // Pastikan ini adalah 'method', bukan 'metode'
        contentType: 'application/json',
        token: token,
      });
      if (
        !cuacaGPS ||
        JSON.stringify(cuacaGPS) !== JSON.stringify(result.data)
      ) {
        setCuacaGPS(result.data);
      }
      setLoading(false);
    } catch (error) {
      console.error(
        'There was a problem with the fetch operation APILocationGPS: ',
        error,
      );
    }
    setLoading(false);
  }, [latitudeGPS, longitudeGPS, token]);

  const APIDetailCuacaGPS = useCallback(async () => {
    setLoading(true);
    try {
      const url = `${API_BaseUrl}/detail-cuaca-user?lat=${latitudeGPS}&lon=${longitudeGPS}`;
      const result = await API_SERVICES({
        url: url,
        method: 'GET', // Pastikan ini adalah 'method', bukan 'metode'
        contentType: 'application/json',
        token: token,
      });
      if (
        !cuacaLocation ||
        JSON.stringify(cuacaLocation) !== JSON.stringify(result.data)
      ) {
        setCuacaLocation(result.data);
      }
      setLoading(false);
    } catch (error) {
      console.error(
        'There was a problem with the fetch operation APILocationGPS: ',
        error,
      );
    }
    setLoading(false);
  }, [latitudeGPS, longitudeGPS, token]);
  const APIListSaved = useCallback(async () => {
    setLoading(true);
    try {
      const url = `${API_BaseUrl}/weather-saved-locations`;
      const result = await API_SERVICES({
        url: url,
        method: 'GET', // Pastikan ini adalah 'method', bukan 'metode'
        contentType: 'application/json',
        token: token,
      });
      if (
        !listCuacaSaved ||
        JSON.stringify(listCuacaSaved) !== JSON.stringify(result)
      ) {
        setListCuacaSaved(result);
      }
      // setListCuacaSaved(result?.weatherData);
      setLoading(false);
    } catch (error) {
      console.error(
        'There was a problem with the fetch operation APILocationGPS: ',
        error,
      );
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    APIGetProfile();
    APILocationGPS();
    APIListSaved();
    APIDetailCuacaGPS();
  }, [APIGetProfile, APILocationGPS, APIListSaved]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setLoading(true);
    await APIGetProfile();
    await APILocationGPS();
    await APIListSaved();
    setRefreshing(false);
    setLoading(false);
  }, [APIGetProfile, APILocationGPS, APIListSaved]);
  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        onRefresh();
      }, 1000); // Menunda eksekusi onRefresh selama 1 detik (1000 milidetik)

      return () => clearTimeout(timer); // Bersihkan timer saat komponen kehilangan fokus atau di-unmount
    }, [onRefresh]),
  );

  const checkRainForecast = forecast => {
    let isRainMessageShown = false;
    // Dapatkan waktu saat ini dalam epoch
    const currentTimeEpoch = Math.floor(Date.now() / 1000);
    forecast.forecast.forecastday.forEach(day => {
      day.hour.forEach(hour => {
        const timeEpoch = hour.time_epoch;
        const code = hour.condition.code;
        const timeDiff = timeEpoch - currentTimeEpoch;

        // Periksa jika ada prediksi hujan berdasarkan kode cuaca untuk hujan
        if (
          code === 1063 ||
          code === 1240 ||
          code === 1243 ||
          code === 1246 ||
          code === 1087 ||
          code === 1273 ||
          code === 1276
        ) {
          // Contoh kode untuk hujan
          // Periksa jika waktu hujan adalah 15 menit atau 1 menit dari sekarang
          if (timeDiff <= 0 && !isRainMessageShown) {
            SendLocalNotification(
              'Hujan akan tiba',
              'Hati-hati dalam berkendara jalanan licin Teman',
            );
            isRainMessageShown = true; // Tandai bahwa pesan hujan sudah ditampilkan
          } else if (timeDiff === 900) {
            // 15 menit = 900 detik
            SendLocalNotification(
              'Waduh Mau Ujan nih',
              'Berteduh atau bersiap dengan jas hujan atau payung mu ya Teman.',
            );
          } else if (timeDiff === 60) {
            // 1 menit = 60 detik
            SendLocalNotification(
              'Sepertinya akan ada hujan Teman',
              'Sebaiknya dirumah saja dan jika mau pergi jangan lupa bawa payung dan jas hujan ya.',
            );
          }
        }
      });
    });
  };

  useEffect(() => {
    if (cuacaLocation) {
      checkRainForecast(cuacaLocation);
    }
  }, [cuacaLocation]);

  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);

  const codeCuaca = cuacaGPS?.current?.condition?.code;
  const iconCuaca = cuacaGPS?.current?.condition?.icon;
  const temperatureCelcius = cuacaGPS?.current?.temp_c;
  const temperatureFarenhait = cuacaGPS?.current?.temp_f;
  const nameLocation = cuacaGPS?.location?.name;
  const nameCuaca = cuacaGPS?.current?.condition?.text;

  const renderListSaved = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('detailLoc', {
            itemData: item?.name,
            cuacaKode: item?.currentWeather?.current?.condition?.code,
            location: item?.currentWeather?.location?.name,
            icon: item?.currentWeather?.current?.condition?.icon,
            suhuCelcius: item?.currentWeather?.current?.temp_c,
            nameCuaca: item?.currentWeather?.current?.condition?.text,
          })
        }
        style={{
          width: '100%',
          paddingVertical: '2%',
          paddingHorizontal: '2%',
        }}>
        <CardCuaca
          cuacaKode={item?.currentWeather?.current?.condition?.code}
          location={item?.currentWeather?.location?.name}
          suhuCelcius={item?.currentWeather?.current?.temp_c}
          icon={item?.currentWeather?.current?.condition?.icon}
        />
      </TouchableOpacity>
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
        <View style={{flex: 1, alignItems: 'center', width: '100%'}}>
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
              onPress={() => navigation.navigate('detailGPS')}
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
                }}>
                <FlatList
                  data={listCuacaSaved?.weatherData || []}
                  renderItem={renderListSaved}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    width: '100%',
                    alignItems: 'center',
                  }}
                  ListEmptyComponent={() =>
                    loading ? (
                      <LoadingImage imageWidth={imageWidth} />
                    ) : (
                      <LoadingImage imageWidth={imageWidth} />
                    )
                  }
                />

                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    paddingVertical: '5%',
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('addWeather')}
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(255, 255, 255,0.5)',
                      width: imageWidth * 0.2,
                      height: imageHeight * 0.7,
                      borderRadius: imageWidth / 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../Assets/Images/Icons/add.png')}
                      style={{
                        width: imageWidth * 0.1,
                        height: imageHeight * 0.5,
                        backgroundColor: 'transparent',
                        alignSelf: 'center',
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ThemeConditions>
          </ScrollView>
        </View>
      )}
    </WrapCode>
  );
};

export default Home;
