import React, {useRef, useEffect, useMemo, useState, useCallback} from 'react';
import {
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import WrapCode from '../Components/WrapCode';
import Txt from '../Components/Txt';
import UserState from '../../state/UserState';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import WeatherState from '../../state/WeatherState';
import WeatherTranslate from '../Components/MOD/WeatherTranslate';
import FastImage from 'react-native-fast-image';
import TextInputSearch from '../Components/TextInputSearch';
import RenderSearch from '../Components/RenderSearch';
import Button from '../Components/Button';
import API_BaseUrl from '../Services/API/API_BaseUrl';
import API_SERVICES from '../Services/API_SERVICES';

const TripPrediction = () => {
  const [nameLoc, setNameLoc] = useState(null);
  const {token, latitudeGPS, longitudeGPS, cityGPS} = UserState();
  const [destination, setDestination] = useState(null);
  const [isFlatListVisible, setIsFlatListVisible] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const markerRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [routeInfo, setRouteInfo] = useState({
    distance: null, // dalam kilometer
    duration: null, // dalam menit
    arrivalTime: null, // waktu perkiraan sampai
  });
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.showCallout();
    }
  }, []);

  const fetchSuggestions = useCallback(async input => {
    // Implementasikan logika untuk memanggil API pencarian tempat dan memperbarui state suggestions
    // Misalnya, menggunakan Google Places API Autocomplete
    setIsFlatListVisible(true);
    setLoading(true);

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input,
      )}&key=AIzaSyC_O0 - LKyAboQn0O5_clZnePHSpQQ5slQU&language=id`, // Ganti YOUR_API_KEY dengan kunci API Anda
    );
    const data = await response.json();
    if (data.status === 'OK') {
      setSuggestions(data.predictions);
      setLoading(false);
    } else {
      setSuggestions([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (destination?.length > 2) {
      fetchSuggestions(destination);
    } else {
      setSuggestions([]);
    }
  }, [destination]);

  useEffect(() => {
    if (selectedDestination) {
      setIsFlatListVisible(false);
      // Fetch destination coords or other necessary actions here
    }
  }, [selectedDestination]);

  const destinationQueryParams = useMemo(() => {
    if (!destinationCoords) return null;
    return {
      destLat: destinationCoords.latitude,
      destLon: destinationCoords.longitude,
    };
  }, [destinationCoords]);

  const selectSuggestion = async item => {
    setIsFlatListVisible(false);

    setSelectedDestination(item);
    setDestination(item.description);
    setSuggestions([]);
    // await fetchDestinationCoords(item.description);
  };

  const fetchDestinationCoords = async address => {
    // Gantikan dengan implementasi geocoding Anda
    // Contoh menggunakan fetch API untuk Google Maps Geocoding API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address,
      )}&key=AIzaSyC_O0 - LKyAboQn0O5_clZnePHSpQQ5slQU`,
    );
    const data = await response.json();
    if (data.results.length > 0) {
      const {lat, lng} = data.results[0].geometry.location;
      setDestinationCoords({latitude: lat, longitude: lng});
    }
  };

  const handleSetDestination = async () => {
    if (selectedDestination) {
      Keyboard.dismiss();
      // Gunakan selectedDestination untuk mengambil koordinat
      // Misalnya, menggunakan Google Place Details API dengan place_id dari selectedDestination
      setIsFlatListVisible(false);
      setLoading(true);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${selectedDestination.place_id}&key=AIzaSyC_O0 - LKyAboQn0O5_clZnePHSpQQ5slQU`,
      );
      const data = await response.json();
      if (
        data.result &&
        data.result.geometry &&
        data.result.geometry.location
      ) {
        const {lat, lng} = data.result.geometry.location;
        setDestinationCoords({latitude: lat, longitude: lng});
        setLoading(false);
        const parts = selectedDestination?.description?.split(',');
        const locationName = parts[0]; // Ambil bagian nama lokasi
        setNameLoc(locationName); // Simpan nama lokasi ke state

        // Memanggil fungsi untuk mendapatkan data cuaca setelah koordinat tujuan berhasil diperoleh
        await fetchWeatherAtStart(); // Memanggil cuaca di titik awal (menggunakan posisi GPS saat ini)
        await fetchWeatherAtDestination(); // Memanggil cuaca di titik tujuan
      }
    }
  };
  const {
    cuacaGPS,
    cuacaLocation,
    setCuacaGPS,
    setCuacaLocation,
    listCuacaSaved,
    setListCuacaSaved,
  } = WeatherState();
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);
  const markerSize = screenWidth * 0.05;
  const codeCuaca = cuacaGPS?.current?.condition?.code;
  const iconCuaca = cuacaGPS?.current?.condition?.icon;
  const temperatureCelcius = cuacaGPS?.current?.temp_c;
  const nameLocation = cuacaGPS?.location?.name;
  const nameCuaca = cuacaGPS?.current?.condition?.text;
  const iconCuacaImage = `https:${iconCuaca}`;
  // console.log(JSON.stringify({suggestions}));
  const [weatherAtStart, setWeatherAtStart] = useState(null);
  const [weatherAtDestination, setWeatherAtDestination] = useState(null);

  const fetchWeatherAtStart = useCallback(async () => {
    setLoading(true);
    try {
      const url = `${API_BaseUrl}/weather/start?startLat=${latitudeGPS}&startLon=${longitudeGPS}`;
      const result = await API_SERVICES({
        url: url,
        method: 'GET', // Pastikan ini adalah 'method', bukan 'metode'
        contentType: 'application/json',
        token: token,
      });
      if (
        !weatherAtStart ||
        JSON.stringify(weatherAtStart) !== JSON.stringify(result)
      ) {
        setWeatherAtStart(result.data);
      }
      // setListCuacaSaved(result?.weatherData);
      setLoading(false);
    } catch (error) {
      console.error(
        'There was a problem with the fetch operation fetchWeatherAtStart: ',
        error,
      );
    }
    setLoading(false);
  }, [token, setWeatherAtStart]);

  const fetchWeatherAtDestination = useCallback(async () => {
    if (!destinationCoords) return; // Pastikan koordinat tujuan sudah ada

    setLoading(true);
    try {
      const url = `${API_BaseUrl}/weather/destination?destLat=${destinationQueryParams.destLat}&destLon=${destinationQueryParams.destLon}`;

      const result = await API_SERVICES({
        url: url,
        method: 'GET',
        contentType: 'application/json',
        token: token,
      });
      setWeatherAtDestination(result.data);
    } catch (error) {
      console.error(
        'There was a problem with the fetch operation fetchWeatherAtDestination:',
        error,
      );
      alert(
        'Terjadi kesalahan saat mengambil data cuaca di titik tujuan. Silakan coba lagi.',
      ); // Beri tahu pengguna ada kesalahan
    } finally {
      setLoading(false);
    }
  }, [token, destinationCoords]);

  useEffect(() => {
    fetchWeatherAtStart();
  }, [latitudeGPS, longitudeGPS]);

  useEffect(() => {
    fetchWeatherAtDestination();
  }, [destinationCoords]);
  // console.log(JSON.stringify(selectedDestination?.description));

  // console.log({weatherAtDestination});
  // const nameLocationTujuan = selectedDestination?.description;
  // const parts = nameLocationTujuan?.split(',');
  // const nameLoc = selectedDestination === null ? null : parts[0];
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.showCallout();
    }
  }, []);

  const renderItem = ({item}) => (
    <RenderSearch
      handleSelectResult={() => selectSuggestion(item)}
      item={item}
    />
  );

  const convertDuration = minutes => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return `${hours > 0 ? `${hours} Jam ` : ''}${mins} Menit`;
  };

  return (
    <WrapCode
      backgroundColor="transparent"
      barStyle="dark-content"
      translucent={true}>
      <View
        style={{
          width: '100%',
          flex: 1,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: '10%',
            paddingHorizontal: '3%',
            justifyContent: 'center',
            paddingVertical: '3%',
            // backgroundColor: '#FFFFFF',
          }}>
          <View style={{width: '80%', alignItems: 'center', paddingLeft: '2%'}}>
            <TextInputSearch
              iconLeft={require('../Assets/Images/Icons/locRed.png')}
              handleSearch={setDestination}
              value={destination}
              placeHolder="Mau ke mana?"
              placeholderTextColor="#000"
              loading={loading}
              data={suggestions}
              renderItem={renderItem}
              isFlatListVisible={isFlatListVisible}
            />
          </View>
          <View style={{width: '20%', alignItems: 'center', paddingLeft: '4%'}}>
            <Button
              onPress={handleSetDestination}
              text="Cari"
              buttonStyle={{
                marginTop: 0,
                marginBottom: '0%',
                height: 45,
                width: imageWidth * 0.15,
                borderRadius: 10,
                color: '#E6FFFF',
              }}
              textStyle={{
                color: '#E6FFFF',
              }}
              gradientColors={['#05D4F3', '#05D4F3']}
            />
          </View>
        </View>

        <View style={{flex: 1}}>
          <MapView
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}
            initialRegion={{
              latitude: latitudeGPS,
              longitude: longitudeGPS,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{latitude: latitudeGPS, longitude: longitudeGPS}}
              anchor={{x: 0.5, y: 1}}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 5,
                    borderRadius: 5,
                    borderColor: '#ccc',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 5,
                  }}>
                  {weatherAtStart && (
                    <>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          // justifyContent: 'center',
                          width: '100%',
                          alignSelf: 'center',
                        }}>
                        <Image
                          source={{
                            uri: `https:${weatherAtStart.current.condition?.icon}`,
                          }}
                          style={{
                            width: imageWidth * 0.12,
                            height: imageHeight * 0.4,
                            backgroundColor: 'transparent',
                            alignSelf: 'center',
                          }}
                          resizeMode="contain"
                        />
                        <Txt
                          fontSize={13}
                          style={{
                            color: '#000',
                            fontFamily: 'RethinkSans-SemiBold',
                            textAlign: 'center',
                            paddingVertical: '2%',
                            width: 'auto',
                            paddingHorizontal: '2%',
                          }}>
                          {weatherAtStart.current.temp_c}°C
                        </Txt>
                      </View>

                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          paddingVertical: '2%',
                        }}>
                        <Txt
                          fontSize={10}
                          style={{
                            color: '#000',
                            fontFamily: 'RethinkSans-Regular',
                            textAlign: 'center',
                            paddingVertical: '3%',
                            width: 'auto',
                            paddingHorizontal: '2%',
                          }}>
                          {
                            WeatherTranslate[
                              weatherAtStart.current.condition?.code
                            ]
                          }
                        </Txt>
                        <View
                          style={{
                            wdith: '100%',
                            alignItems: 'center',
                          }}>
                          <Txt
                            fontSize={10}
                            style={{
                              color: '#000',
                              fontFamily: 'RethinkSans-Regular',
                              textAlign: 'center',
                              paddingTop: '1%',
                              width: 'auto',
                              paddingHorizontal: '2%',
                            }}>
                            Lokasi saat ini:
                          </Txt>
                          <Txt
                            fontSize={12}
                            style={{
                              color: '#000',
                              fontFamily: 'RethinkSans-Bold',
                              textAlign: 'center',
                              paddingVertical: '0%',
                              width: '100%',
                              paddingHorizontal: '2%',
                            }}>
                            {weatherAtStart.location.name}
                          </Txt>
                        </View>
                      </View>
                    </>
                  )}
                </View>
                <Image
                  source={require('../Assets/Images/Icons/locaMy.png')}
                  style={{
                    width: 30, // Sesuaikan ukuran
                    height: 30, // Sesuaikan ukuran
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </Marker>

            {destinationCoords && (
              <>
                <Marker coordinate={destinationCoords} anchor={{x: 0.5, y: 1}}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                    }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {weatherAtDestination && (
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              // justifyContent: 'center',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Image
                              source={{
                                uri: `https:${weatherAtDestination.current.condition?.icon}`,
                              }}
                              style={{
                                width: imageWidth * 0.12,
                                height: imageHeight * 0.4,
                                backgroundColor: 'transparent',
                                alignSelf: 'center',
                              }}
                              resizeMode="contain"
                            />
                            <Txt
                              fontSize={13}
                              style={{
                                color: '#000',
                                fontFamily: 'RethinkSans-SemiBold',
                                textAlign: 'center',
                                paddingVertical: '2%',
                                width: 'auto',
                                paddingHorizontal: '2%',
                              }}>
                              {weatherAtDestination.current.temp_c}°C
                            </Txt>
                          </View>

                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '100%',
                              paddingVertical: '2%',
                            }}>
                            <Txt
                              fontSize={10}
                              style={{
                                color: '#000',
                                fontFamily: 'RethinkSans-Regular',
                                textAlign: 'center',
                                paddingVertical: '3%',
                                width: 'auto',
                                paddingHorizontal: '2%',
                              }}>
                              {
                                WeatherTranslate[
                                  weatherAtDestination.current.condition?.code
                                ]
                              }
                            </Txt>
                            <View
                              style={{
                                wdith: '100%',
                                alignItems: 'center',
                              }}>
                              <Txt
                                fontSize={10}
                                style={{
                                  color: '#000',
                                  fontFamily: 'RethinkSans-Regular',
                                  textAlign: 'center',
                                  paddingTop: '2%',
                                  width: '100%',
                                  paddingHorizontal: '2%',
                                }}>
                                Tujuan:
                              </Txt>
                              <Txt
                                fontSize={12}
                                style={{
                                  color: '#000',
                                  fontFamily: 'RethinkSans-Bold',
                                  textAlign: 'center',
                                  paddingVertical: '0%',
                                  width: '100%',
                                  paddingHorizontal: '2%',
                                }}>
                                {nameLoc}
                              </Txt>
                            </View>
                          </View>
                        </>
                      )}
                    </View>
                    <Image
                      source={require('../Assets/Images/Icons/locationTujuan.png')}
                      style={{
                        width: 30, // Sesuaikan ukuran
                        height: 30, // Sesuaikan ukuran
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                </Marker>
                <MapViewDirections
                  origin={{latitude: latitudeGPS, longitude: longitudeGPS}}
                  destination={destinationCoords}
                  apikey="AIzaSyC_O0 - LKyAboQn0O5_clZnePHSpQQ5slQU"
                  strokeWidth={3}
                  strokeColor="#0929D4"
                  onReady={result => {
                    setRouteInfo({
                      distance: result.distance,
                      duration: result.duration,
                      arrivalTime: new Date(
                        Date.now() + result.duration * 60000,
                      ), // Menambahkan durasi ke waktu saat ini
                    });
                  }}
                />
              </>
            )}
          </MapView>
        </View>
        {routeInfo?.distance && (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              paddingHorizontal: '2%',
              paddingVertical: '2%',
              flexDirection: 'row',
            }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'column',
                width: '90%',
                justifyContent: 'center',
                // paddingHorizontal: '10%',
              }}>
              {routeInfo?.distance && (
                <Txt
                  fontSize={18}
                  style={{
                    color: '#35BBF8',
                    fontFamily: 'RethinkSans-Bold',
                    textAlign: 'center',
                    paddingVertical: '0%',
                    width: 'auto',
                  }}>
                  {convertDuration(routeInfo.duration)}
                </Txt>
              )}
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <Txt
                  fontSize={11}
                  style={{
                    color: '#000',
                    fontFamily: 'RethinkSans-Regular',
                    textAlign: 'center',
                    paddingVertical: '0%',
                    width: 'auto',
                    paddingHorizontal: '2%',
                  }}>
                  Perkiraan tiba :
                </Txt>
                {routeInfo?.arrivalTime && (
                  <Txt
                    fontSize={14}
                    style={{
                      color: '#000',
                      fontFamily: 'RethinkSans-SemiBold',
                      textAlign: 'center',
                      paddingVertical: '0%',
                      width: 'auto',
                      paddingHorizontal: '2%',
                    }}>
                    {routeInfo?.arrivalTime?.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Txt>
                )}
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'column',
                width: '10%',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  // Reset state untuk kembali ke kondisi awal
                  setDestination(null);
                  setSelectedDestination(null);
                  setDestinationCoords(null);
                  setRouteInfo({
                    distance: null,
                    duration: null,
                    arrivalTime: null,
                  });
                }}
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../Assets/Images/Image/closeXTMP.png')}
                  style={{
                    width: '100%', // Sesuaikan ukuran
                    height: imageHeight * 0.5, // Sesuaikan ukuran
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </WrapCode>
  );
};

export default TripPrediction;
