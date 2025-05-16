import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Alert,
  Image,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import WrapCode from '../Components/WrapCode';
import Txt from '../Components/Txt';
import UserState from '../../state/UserState';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Button from '../Components/Button';
import LinearGradient from 'react-native-linear-gradient';
import ModalKomponen from '../Components/ModalKomponen';
import DeviceInfo from 'react-native-device-info';
import TemanCuaca from '../Components/TemanCuaca';
import SkeletonListItem from '../Components/SkeletonListItem';
import messaging from '@react-native-firebase/messaging';

import LoadingImage from '../Components/LoadingImage';

const Profile = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const {
    token,
    setToken,
    refreshToken,
    setRefreshToken,
    userProfile,
    // setuserProfile,
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
    setLogout,
    fetchUserProfile,
    setLoading,
    loading,
  } = UserState();
  // console.log({Avatar});

  const apatar = userProfile?.avatarUser;
  console.log(apatar);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserProfile(); // Tunggu fetchUserProfile selesai
    setRefreshing(false);
  }, [fetchUserProfile]);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        onRefresh();
      }, 1000);
      return () => {
        clearTimeout(timer);
        setLoading(false); // Pastikan loading di-set ke false ketika komponen unmount
      };
    }, [onRefresh, setLoading]),
  );

  const avatars = [
    {
      id: 'Raja-Hot',
      name: 'Raja Hot',
      source: require('../Assets/Images/Image/rajahot.png'),
    },
    {
      id: 'Raja-Cold',
      name: 'Raja CoolBet',
      source: require('../Assets/Images/Image/rajadingin.png'),
    },
    {
      id: 'Ratu-Hot',
      name: 'Ratu Hot',
      source: require('../Assets/Images/Image/ratuhot.png'),
    },
    {
      id: 'Ratu-Cold',
      name: 'Ratu Coolbet',
      source: require('../Assets/Images/Image/ratudingin.png'),
    },
  ];

  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);

  const logoutExecute = useCallback(
    async navigation => {
      try {
        await EncryptedStorage.removeItem('access_token');
        await EncryptedStorage.removeItem('authToken');
        await EncryptedStorage.removeItem('refresh_token');

        setLogout(); // Reset Zustand state
        navigation.navigate('Login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
    [setLogout],
  );

  const handleLogout = () => {
    Alert.alert(
      'Keluar',
      'Apakah Anda Yakin Untuk Keluar Dari Aplikasi ?',
      [
        {
          text: 'Batal',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Keluar', onPress: () => logoutExecute(navigation)},
      ],
      {cancelable: false},
    );
  };
  const [modalVisible, setModalVisible] = useState(false);

  const aboutUs = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <WrapCode
      backgroundColor="transparent"
      barStyle="light-content"
      translucent={true}>
      {loading === true ? (
        <LoadingImage imageWidth={imageWidth} />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            alignItems: 'center',

            flex: 1,
          }}
          style={{
            backgroundColor: '#035D7E',
            // flex: 1,
            width: '100%',
            paddingVertical: '5%',
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flex: 1,
            }}>
            <LinearGradient
              colors={['#21B5F7', '#88CCEB']}
              style={{
                alignItems: 'center',
                width: '90%',
                paddingVertical: '5%',
                paddingHorizontal: '2%',
                borderRadius: 30,
                marginTop: '2%',
              }}>
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                }}>
                {userProfile?.avatarUser ? (
                  <Image
                    source={
                      avatars.find(
                        avatar => avatar.id === userProfile?.avatarUser,
                      )?.source
                    }
                    style={{
                      width: imageWidth * 0.3,
                      height: imageHeight * 1.1,
                      alignItems: 'center',
                      borderRadius: imageWidth * 0.5,
                      alignSelf: 'center',
                    }}
                  />
                ) : (
                  <Image
                    source={require('../Assets/Images/Image/avatar.png')}
                    style={{
                      width: imageWidth * 0.3,
                      height: imageHeight * 1.1,
                      alignItems: 'center',
                      borderRadius: imageWidth * 0.5,
                      alignSelf: 'center',
                    }}
                    resizeMode="contain"
                  />
                )}
              </View>

              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}>
                <Txt
                  fontSize={14}
                  style={{
                    color: '#012132',
                    fontFamily: 'RethinkSans-Bold',
                    textAlign: 'center',
                    paddingVertical: '2%',
                  }}>
                  {userProfile?.fullName}
                </Txt>
              </View>

              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: '20%',
                    alignItems: 'center',
                  }}>
                  <Txt
                    fontSize={9}
                    style={{
                      color: '#012132',
                      fontFamily: 'RethinkSans-Regular',
                      textAlign: 'center',
                      paddingVertical: '2%',
                    }}>
                    Nickname :
                  </Txt>
                </View>
                <View
                  View
                  style={{
                    width: '50%',
                    alignItems: 'center',
                  }}>
                  <Txt
                    fontSize={10}
                    style={{
                      color: '#012132',
                      fontFamily: 'RethinkSans-SemiBold',
                      // textAlign: 'center',
                      paddingVertical: '0%',
                    }}>
                    {userProfile?.nickName}
                  </Txt>
                </View>
              </View>

              <View
                style={{
                  width: '53%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: '50%',
                    alignItems: 'center',
                  }}>
                  <Txt
                    fontSize={9}
                    style={{
                      color: '#012132',
                      fontFamily: 'RethinkSans-Regular',
                      textAlign: 'center',
                      paddingVertical: '2%',
                    }}>
                    Email :
                  </Txt>
                </View>
                <View
                  View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <Txt
                    fontSize={10}
                    style={{
                      color: '#012132',
                      fontFamily: 'RethinkSans-SemiBold',
                      // textAlign: 'center',
                      paddingVertical: '0%',
                    }}>
                    {userProfile?.email}
                  </Txt>
                </View>
              </View>
            </LinearGradient>
            <View
              style={{
                width: '90%',
                alignItems: 'center',
                paddingVertical: '5%',
                paddingHorizontal: '2%',
              }}>
              <Button
                onPress={() => navigation.navigate('EditProfile')}
                text="Edit Profile"
                buttonStyle={{
                  marginTop: 0,
                  marginBottom: '3%',
                  height: imageHeight * 0.45,
                  width: imageWidth,
                  borderRadius: 10,
                  color: '#02202F',
                  paddingVertical: '3%',
                }}
                textStyle={{
                  color: '#02202F',
                }}
                gradientColors={['#F4FFFF', '#F4FFFF']}
              />
              {/* <Button
                onPress={() => navigation.navigate('UbahPassword')}
                text="Ubah Password"
                buttonStyle={{
                  marginTop: 0,
                  marginBottom: '3%',
                  height: imageHeight * 0.45,
                  width: imageWidth,
                  borderRadius: 10,
                  color: '#02202F',
                }}
                textStyle={{
                  color: '#02202F',
                }}
                gradientColors={['#F4FFFF', '#F4FFFF']}
              /> */}
              <Button
                onPress={aboutUs}
                text="About Us"
                buttonStyle={{
                  marginTop: 0,
                  marginBottom: '3%',
                  height: imageHeight * 0.45,
                  width: imageWidth,
                  borderRadius: 10,
                  color: '#02202F',
                }}
                textStyle={{
                  color: '#02202F',
                }}
                gradientColors={['#F4FFFF', '#F4FFFF']}
              />
              <ModalKomponen isVisible={modalVisible} onClose={aboutUs}>
                <View
                  style={{
                    width: '90%',
                    paddingVertical: '2%',
                    paddingHorizontal: '1%',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../Assets/Images/Logo/LogoSobatAngin.png')}
                    style={{
                      width: imageWidth * 1.3,
                      height: imageHeight * 1,
                      backgroundColor: 'transparent',
                      alignSelf: 'center',
                      //   flex: 1,
                    }}
                    resizeMode="contain"
                  />
                  <TemanCuaca />

                  <View
                    style={{
                      width: '90%',
                      alignItems: 'center',
                      backgroundColor: '#FFD976',
                      paddingVertical: '2%',
                      paddingHorizontal: '2%',
                      borderRadius: 10,
                    }}>
                    <Txt
                      fontSize={11}
                      style={{
                        color: '#012132',
                        fontFamily: 'RethinkSans-Regular',
                        // textAlign: 'center',
                        paddingVertical: '0%',
                      }}>
                      Terimakasih telah mendownload Aplikasi Teman Cuaca.
                      Aplikasi Teman Cuaca di peruntukan untuk kamu yang butuh
                      teman Informasi Cuaca yang selalu update untuk cuaca mu
                      dan selalu ada untukmu.
                    </Txt>
                    <Txt
                      fontSize={11}
                      style={{
                        color: '#012132',
                        fontFamily: 'RethinkSans-Regular',
                        // textAlign: 'center',
                        paddingVertical: '2%',
                      }}>
                      Selalu Nyalakan Lokasi mu untuk mendapatkan update
                      Informasi Cuaca yang akurat dan terbarukan.
                    </Txt>

                    <Txt
                      fontSize={11}
                      style={{
                        color: '#012132',
                        fontFamily: 'RethinkSans-Regular',
                        // textAlign: 'center',
                        paddingVertical: '2%',
                      }}>
                      Aplikasi ini menggunakan React Native sebagai Tools Front
                      End Mobile yang di gunakan,serta untuk BackEnd nya
                      menggunakan Node JS Express, serta menggunakan basis data
                      Mongo DB untuk menunjang Realtime update data dari User.
                    </Txt>

                    <Txt
                      fontSize={10}
                      style={{
                        color: '#012132',
                        fontFamily: 'RethinkSans-SemiBold',
                        textAlign: 'right',
                        paddingVertical: '6%',
                      }}>
                      Salam Hangat,
                    </Txt>
                    <Txt
                      fontSize={10}
                      style={{
                        color: '#012132',
                        fontFamily: 'RethinkSans-SemiBold',
                        textAlign: 'right',
                        paddingVertical: '2%',
                      }}>
                      Rama Dhea Yudhistira
                    </Txt>
                  </View>
                </View>
              </ModalKomponen>
            </View>
          </View>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
            }}>
            <Button
              onPress={handleLogout}
              text="Logout"
              buttonStyle={{
                marginTop: 20,
                marginBottom: '3%',
                height: imageHeight * 0.45,
                width: imageWidth * 0.6,
                borderRadius: 10,
                color: '#E6FFFF',
              }}
              textStyle={{
                color: '#E6FFFF',
              }}
              gradientColors={['#EE370F', '#EE370F']}
            />
            <Txt
              fontSize={9}
              style={{
                color: '#E6FFFF',
                fontFamily: 'RethinkSans-SemiBold',
                textAlign: 'center',
                paddingVertical: '2%',
              }}>
              {`${DeviceInfo.getApplicationName()}`}
            </Txt>
            <Txt
              fontSize={9}
              style={{
                color: '#E6FFFF',
                fontFamily: 'RethinkSans-SemiBold',
                textAlign: 'center',
                paddingVertical: '2%',
              }}>
              {`Version: ${DeviceInfo.getVersion()}`}
            </Txt>
          </View>
        </ScrollView>
      )}
    </WrapCode>
  );
};

export default Profile;
