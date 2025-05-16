import React, {useEffect, useRef, useState} from 'react';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {
  Text,
  Platform,
  View,
  Dimensions,
  SafeAreaView,
  Image,
  StatusBar,
  Animated,
  PermissionsAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TemanCuaca from '../Components/TemanCuaca';
import {useNavigation} from '@react-navigation/native';
import WrapCode from '../Components/WrapCode';
import UserState from '../../state/UserState';

const SplashScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth); // gunakan aspek rasio yang sama seperti gambar asli
  const navigation = useNavigation();
  const {
    setCityGPS,
    cityGPS,
    setLongitudeGPS,
    longitudeGPS,
    setLatitudeGPS,
    latitudeGPS,
  } = UserState();
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));

  let lastPosition = null;
  const watchIdRef = useRef(null); // useRef untuk menyimpan ID watchPosition

  const isSignificantChange = (newPosition, lastPosition) => {
    if (!lastPosition) return true;

    const distance = getDistance(newPosition, lastPosition); // Fungsi untuk menghitung jarak antara dua posisi
    return distance > minimumDistance;
  };

  const getDistance = (newPosition, lastPosition) => {
    const toRadian = angle => (Math.PI / 180) * angle;
    const distanceLat = toRadian(newPosition.latitude - lastPosition.latitude);
    const distanceLon = toRadian(
      newPosition.longitude - lastPosition.longitude,
    );

    const a =
      Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
      Math.cos(toRadian(lastPosition.latitude)) *
        Math.cos(toRadian(newPosition.latitude)) *
        Math.sin(distanceLon / 2) *
        Math.sin(distanceLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const R = 6371e3; // Radius Bumi dalam meter
    return R * c;
  };

  useEffect(() => {
    Geocoder.init('AIzaSyC_O0 - LKyAboQn0O5_clZnePHSpQQ5slQU', {
      language: 'en',
    }); // Pastikan untuk menggunakan API key Anda sendiri
      const requestPermissions = async () => {
        await checkPermissionAndGetLocation();
        await checkNotificationPermission();
      };

      requestPermissions();

    return () => {
      // Membersihkan watchPosition ketika komponen di-unmount
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const checkNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const status = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      if (status === RESULTS.GRANTED) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    }
  };

  const checkPermissionAndGetLocation = async () => {
    let fineLocationGranted = await check(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    if (fineLocationGranted !== RESULTS.GRANTED) {
      fineLocationGranted = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }

    // Untuk Android 10 ke atas, minta izin latar belakang secara terpisah
    // if (Platform.Version >= 29 && fineLocationGranted === RESULTS.GRANTED) {
    //   const backgroundLocationGranted = await check(
    //     PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
    //   );
    //   if (backgroundLocationGranted !== RESULTS.GRANTED) {
    //     await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
    //   }
    // }

    if (fineLocationGranted === RESULTS.GRANTED) {
      startLocationUpdates();
    } else if (granted === RESULTS.DENIED) {
      const newGrant = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (newGrant === RESULTS.GRANTED) {
        startLocationUpdates();
      }
    }
  };

  const startLocationUpdates = () => {
    watchIdRef.current = Geolocation.watchPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        if (isSignificantChange(position.coords, lastPosition)) {
          setLatitudeGPS(latitude);
          setLongitudeGPS(longitude);

          try {
            const json = await Geocoder.from(latitude, longitude);
            const response = json?.results[0];
            const cityComponent = response?.address_components?.find(
              component => component.types.includes('locality'),
            );
            if (cityComponent) {
              setCityGPS(cityComponent.long_name);
            }
          } catch (error) {
            console.log('Geocoding error: ', error);
          }

          lastPosition = position.coords; // Simpan posisi baru sebagai posisi terakhir
        }
      },
      error => {
        console.log('Geolocation error: ', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 100,
      },
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000, // Durasi animasi dalam milidetik
        useNativeDriver: true,
      }).start(() => navigation.navigate('menu'));
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <WrapCode
      backgroundColor="transparent"
      barStyle="light-content"
      translucent={true}>
      <LinearGradient
        colors={['#22B4F7', '#22B4F7']}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <View
          style={{
            width: imageWidth * 1.8, // imageWidth harus sama dengan imageHeight
            height: imageWidth * 1.8, // Menetapkan imageHeight sama dengan imageWidth untuk bentuk lingkaran
            borderRadius: imageWidth / 1, // Setengah dari width atau height
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 100,
          }}>
          <Image
            source={require('../Assets/Images/Logo/LogoSobatAngin.png')}
            style={{
              width: imageWidth * 1.3,
              //   height: imageHeight * 1,
              backgroundColor: 'transparent',
              alignSelf: 'center',
              flex: 1,
            }}
            resizeMode="contain"
          />
          <TemanCuaca />
        </View>
      </LinearGradient>
    </WrapCode>
  );
};

export default SplashScreen;
