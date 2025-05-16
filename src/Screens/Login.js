import React, {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import WrapCode from '../Components/WrapCode';
import {ScaleFontSize} from '../Components/MOD/ScaleFontSize';
import LinearGradient from 'react-native-linear-gradient';
import {Formik} from 'formik';
import * as yup from 'yup';
import Button from '../Components/Button';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import TextInputCustom from '../Components/TextInput';
import {useNavigation} from '@react-navigation/native';
import UserState from '../../state/UserState';
import API_BaseUrl from '../Services/API/API_BaseUrl';
import SuccessToast from '../Components/SuccessToast';
import LoadingImage from '../Components/LoadingImage';
import FailToast from '../Components/FailToast';
import API_SERVICES from '../Services/API_SERVICES';
import Txt from '../Components/Txt';

const loginSchema = yup.object({
  identifier: yup.string().required('Email atau Nickname Harus di Isi!'),

  password: yup
    .string()
    .required('Password Harus di Isi!')
    .min(5, 'Password harus lebih dari 5 karakter'),

  // .matches( /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, 'Password must contain a number, a lowercase letter, an uppercase letter, and a special character.' )
});

const initialValuesLogin = {
  identifier: '',
  password: '',
};

const Login = () => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth); // gunakan aspek rasio yang sama seperti gambar asli
  const [loading, setLoading] = useState(false);
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
  } = UserState();
  console.log({userProfile});
  const navigation = useNavigation();
  const [showPaswword, setShowPassword] = useState(false);

  const Success = SuccessToast({
    title: 'Login Sukses',
    message: '',
  });
  const LoginFailed = FailToast({
    title: 'Tidak Dapat Login',
    message: `${login}`,
  });

  const loginExecute = async (values, onSubmitProps, navigation) => {
    setLoading(true);
    try {
      const url = `${API_BaseUrl}/login`;
      const body = {
        identifier: values.identifier,
        password: values.password,
      };
      const result = await API_SERVICES({
        url: url,
        metode: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(body),
      });

      setLogin(result);
      // Menyimpan token ke dalam EncryptedStorage
      await EncryptedStorage.setItem('authToken', result.authToken);
      await EncryptedStorage.setItem('refresh_token', result.refreshToken);

      // Mengambil token dari EncryptedStorage dan memperbarui state
      const authToken = await EncryptedStorage.getItem('authToken');
      const refresh_token = await EncryptedStorage.getItem('refresh_token');

      setToken(authToken);
      setRefreshToken(refresh_token);

      Success.showToast();
      navigation.navigate('menu');
    } catch (error) {
      const GagalLgn = FailToast({
        title: 'Register Gagal',
        message: `${error}`,
      });

      GagalLgn.showToast();
    }
    setLoading(false);
  };

  const handleSubmit = (values, onSubmitProps) => {
    loginExecute(values, onSubmitProps, navigation);
  };

  useEffect(() => {
    // Fungsi untuk memuat token yang tersimpan
    const loadStoredTokens = async () => {
      try {
        const accessToken = await EncryptedStorage.getItem('access_token');
        const refresh_token = await EncryptedStorage.getItem('refresh_token');

        if (accessToken && refreshToken) {
          // Perbarui state aplikasi dengan token ini
          setToken(accessToken);
          setRefreshToken(refresh_token);
        }
      } catch (error) {
        console.error('Error saat memuat token dari penyimpanan:', error);
      }
    };

    loadStoredTokens();
  }, [setToken, setRefreshToken]);

  return (
    <WrapCode
      backgroundColor="transparent"
      barStyle="light-content"
      translucent={true}>
      {loading && <LoadingImage imageWidth={imageWidth} />}
      <ScrollView
        style={{
          width: '100%',
        }}
        contentContainerStyle={{
          alignItems: 'center',
          flex: 1,
        }}>
        <LinearGradient
          colors={['#035D7E', '#87C5D3']}
          style={{
            flex: 1,
            alignItems: 'center',
            width: '100%',
            paddingVertical: '3%',
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: '3%',
            }}>
            <Image
              source={require('../Assets/Images/Image/awanmatahari.png')}
              style={{
                width: imageWidth * 1.1,
                height: imageHeight * 2,
                backgroundColor: 'transparent',
                alignSelf: 'center',
              }}
              resizeMode="cover"
            />
            <Txt
              fontSize={22}
              style={{
                color: '#FBFCFA',
                fontFamily: 'RethinkSans-ExtraBold',
                textAlign: 'center',
                paddingVertical: '2%',
              }}>
              LOGIN
            </Txt>

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
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: '2%',
              paddingVertical: '2%',
            }}>
            <Formik
              initialValues={initialValuesLogin}
              onSubmit={handleSubmit}
              validationSchema={loginSchema}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
                touched,
                isSubmitting,
              }) => (
                <View
                  style={{
                    flex: 1,
                    width: '80%',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      // paddingHorizontal:'5%'
                    }}>
                    <Txt
                      fontSize={9}
                      style={{
                        color: '#000',
                        fontFamily: 'RethinkSans-SemiBold',
                        alignSelf: 'flex-start',
                        paddingHorizontal: '5%',
                      }}>
                      Email atau Nickname
                    </Txt>

                    <TextInputCustom
                      placeholderTextColor="#C7C7C7"
                      value={values.identifier}
                      handleChange={handleChange('identifier')}
                      handleBlur={handleBlur('identifier')}
                      placeholder="Email atau Nickname"
                      keyboardType="email-address"
                      additionalStyles={{
                        width: '100%',
                        borderTopLeftRadius: 60,
                        borderTopRightRadius: 60,
                        borderBottomRightRadius: 60,
                        borderBottomLeftRadius: 60,
                        backgroundColor: '#FFFFFF',
                      }}
                    />
                    {errors.identifier && touched.identifier ? (
                      <Txt
                        fontSize={8}
                        style={{
                          color: 'red',
                          justifyContent: 'center',
                          alignSelf: 'baseline',
                          fontFamily: 'RethinkSans-SemiBold',
                          paddingHorizontal: 25,
                          marginTop: 5,
                        }}>
                        {errors.identifier}
                      </Txt>
                    ) : null}
                  </View>

                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      // paddingHorizontal:'5%'
                      marginTop: '3%',
                    }}>
                    <Txt
                      fontSize={9}
                      style={{
                        color: '#000',
                        fontFamily: 'RethinkSans-SemiBold',
                        alignSelf: 'flex-start',
                        paddingHorizontal: '5%',
                      }}>
                      Password
                    </Txt>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                      }}>
                      <TextInputCustom
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        placeholder="Password"
                        placeholderTextColor="#C7C7C7"
                        autoCapitalize="none"
                        secureTextEntry={showPaswword ? false : true}
                        additionalStyles={{
                          width: '100%',
                          borderTopLeftRadius: 60,
                          borderTopRightRadius: 60,
                          borderBottomRightRadius: 60,
                          borderBottomLeftRadius: 60,
                          backgroundColor: '#FFFFFF',
                        }}
                      />

                      <FontAwesome5
                        name={showPaswword ? 'eye' : 'eye-slash'}
                        size={24}
                        color="#1A83C6"
                        style={{
                          position: 'absolute',
                          right: 15, // Atur posisi dari sisi kanan
                          top: 13, // Atur posisi dari atas jika perlu
                        }}
                        onPress={() => setShowPassword(!showPaswword)}
                      />
                    </View>
                    {errors.password && touched.password ? (
                      <Txt
                        fontSize={8}
                        style={{
                          color: 'red',
                          justifyContent: 'center',
                          alignSelf: 'baseline',
                          fontFamily: 'RethinkSans-SemiBold',
                          paddingHorizontal: 25,
                          marginTop: 5,
                        }}>
                        {errors.password}
                      </Txt>
                    ) : null}
                  </View>

                  <View
                    style={{
                      width: '100%',
                      // alignItems:'center'
                    }}>
                    <Button
                      onPress={handleSubmit}
                      text="Sign In"
                      buttonStyle={{
                        marginTop: 20,
                        marginBottom: '3%',
                        height: 45,
                        width: '100%',
                        borderRadius: 60,
                        color: '#E6FFFF',
                      }}
                      textStyle={{
                        color: '#E6FFFF',
                      }}
                      gradientColors={['#05D4F3', '#05D4F3']}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('forgotPassword')}
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <Txt
                      fontSize={13}
                      style={{
                        color: '#FBFCFA',
                        fontFamily: 'RethinkSans-Regular',
                        textAlign: 'right',
                      }}>
                      Lupa Password ?
                    </Txt>
                  </TouchableOpacity>
                  <Txt
                    fontSize={16}
                    style={{
                      color: '#FBFCFA',
                      fontFamily: 'RethinkSans-Bold',
                      marginTop: '7%',
                      textAlign: 'center',
                    }}>
                    Atau
                  </Txt>

                  <View
                    style={{
                      width: '100%',
                      // alignItems:'center'
                    }}>
                    <Button
                      onPress={() => navigation.navigate('Register')}
                      text="Sign Up"
                      buttonStyle={{
                        marginTop: 20,
                        marginBottom: '3%',
                        height: 45,
                        width: '100%',
                        borderRadius: 60,
                        color: '#FFF',
                      }}
                      textStyle={{
                        color: '#FFF',
                      }}
                      gradientColors={['#004165', '#004165']}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </LinearGradient>
      </ScrollView>
    </WrapCode>
  );
};

export default Login;
