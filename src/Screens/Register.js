import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import WrapCode from '../Components/WrapCode';
import {Formik} from 'formik';
import {ScaleFontSize} from '../Components/MOD/ScaleFontSize';
import LinearGradient from 'react-native-linear-gradient';
import * as yup from 'yup';
import Button from '../Components/Button';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import TextInputCustom from '../Components/TextInput';
import AvatarUser from '../Components/AvatarUser';
import API_SERVICES from '../Services/API_SERVICES';
import API_BaseUrl from '../Services/API/API_BaseUrl';
import UserState from '../../state/UserState';
import {useNavigation} from '@react-navigation/native';
import FailToast from '../Components/FailToast';
import SuccessToast from '../Components/SuccessToast';
import Toast from 'react-native-root-toast';
import LoadingImage from '../Components/LoadingImage';
import Txt from '../Components/Txt';

const registerSchema = yup.object({
  // avatarUser: yup.string().required('Email Harus di Isi!'),
  fullName: yup.string().required('Email Harus di Isi!').min(3),
  nickName: yup.string().required('Email Harus di Isi!').min(6).max(8),
  email: yup.string().required('Email Harus di Isi!').email('Email is invalid'),
  password: yup
    .string()
    .required('Password Harus di Isi!')
    .min(5, 'Password harus lebih dari 5 karakter'),

  // .matches( /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, 'Password must contain a number, a lowercase letter, an uppercase letter, and a special character.' )
});

const initialValuesRegister = {
  avatarUser: '',
  fullName: '',
  nickName: '',
  email: '',
  password: '',
};

const Register = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {register, setRegister, fcmToken} = UserState();
  // console.log(register);
  const [showPaswword, setShowPassword] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth); // gunakan aspek rasio yang sama seperti gambar asli
  const [selectedAvatar, setSelectedAvatar] = useState('');
  // console.log('Av', selectedAvatar);
 
  const Success = SuccessToast({
    title: 'Register Sukses',
    message: 'Silahkan Cek Email, Untuk Validasi Akun.',
    duration: Toast.durations.LONG,
  });



  const registerExecute = async (values, onSubmitProps, navigation) => {
    setLoading(true);
    let errorMessage = '';
    try {
      const url = `${API_BaseUrl}/register`;
      const body = {
        fullName: values.fullName,
        nickName: values.nickName,
        email: values.email,
        password: values.password,
        avatarUser: values.avatarUser,
        
      };
      const result = await API_SERVICES({
        url: url,
        metode: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(body),
      });
      setRegister(result);
   
      errorMessage = result;
      navigation.navigate('SuccessRegister');
      // Success.showToast();
    } catch (error) {
      errorMessage = errorMessage || error.toString();
      const GagalLgn = FailToast({
        title: 'Register Gagal',
        message: `${error}`,
      });

      GagalLgn.showToast();
      console.log(error);
    }
    setLoading(false);
  };

  const handleSubmit = (values, onSubmitProps) => {
    registerExecute(values, onSubmitProps, navigation);
  };

  return (
    <WrapCode
      backgroundColor="#222227"
      barStyle="dark-content"
      translucent={false}>
      {loading && <LoadingImage imageWidth={imageWidth} />}
      <ScrollView
        style={{
          width: '100%',
        }}
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <LinearGradient
          colors={['#035D7E', '#87C5D3']}
          style={{
            flex: 1,
            alignItems: 'center',
            width: '100%',
            paddingVertical: '6%',
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
              }}>
              Sign Up
            </Txt>
          </View>

          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: '2%',
              paddingVertical: '2%',
            }}>
            <AvatarUser
              setSelectedAvatar={setSelectedAvatar}
              selectedAvatar={selectedAvatar}
            />
            <Txt
              fontSize={10}
              style={{
                color: '#000',
                fontFamily: 'RethinkSans-SemiBold',
                textAlign: 'center',
              }}>
              Pilih Avatar Favorit
            </Txt>

            <Formik
              initialValues={initialValuesRegister}
              onSubmit={handleSubmit}
              validationSchema={registerSchema}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
                isValid,
                isSubmitting,
              }) => {
                useEffect(() => {
                  if (selectedAvatar) {
                    setFieldValue('avatarUser', selectedAvatar);
                  }
                }, [selectedAvatar, setFieldValue]);
                return (
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
                        paddingVertical: '2%',
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
                        Full Name
                      </Txt>

                      <TextInputCustom
                        placeholderTextColor="#C7C7C7"
                        value={values.fullName}
                        handleChange={handleChange('fullName')}
                        handleBlur={handleBlur('fullName')}
                        placeholder="FullName"
                        keyboardType="default"
                        additionalStyles={{
                          width: '100%',
                          borderTopLeftRadius: 60,
                          borderTopRightRadius: 60,
                          borderBottomRightRadius: 60,
                          borderBottomLeftRadius: 60,
                          backgroundColor: '#FFFFFF',
                        }}
                      />
                      {errors.fullName && touched.fullName ? (
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
                          {errors.fullName}
                        </Txt>
                      ) : null}
                    </View>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        paddingVertical: '2%',
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
                        Nickname
                      </Txt>

                      <TextInputCustom
                        placeholderTextColor="#C7C7C7"
                        value={values.nickName}
                        handleChange={handleChange('nickName')}
                        handleBlur={handleBlur('nickName')}
                        placeholder="Nickname"
                        keyboardType="default"
                        additionalStyles={{
                          width: '100%',
                          borderTopLeftRadius: 60,
                          borderTopRightRadius: 60,
                          borderBottomRightRadius: 60,
                          borderBottomLeftRadius: 60,
                          backgroundColor: '#FFFFFF',
                        }}
                      />
                      {errors.nickName && touched.nickName ? (
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
                          {errors.nickName}
                        </Txt>
                      ) : null}
                    </View>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        paddingVertical: '2%',
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
                        Email
                      </Txt>

                      <TextInputCustom
                        placeholderTextColor="#C7C7C7"
                        value={values.email}
                        handleChange={handleChange('email')}
                        handleBlur={handleBlur('email')}
                        placeholder="Email Address"
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
                      {errors.email && touched.email ? (
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
                          {errors.email}
                        </Txt>
                      ) : null}
                    </View>

                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        // paddingHorizontal:'5%'
                        paddingVertical: '2%',
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
                        text="Sign Up"
                        buttonStyle={{
                          marginTop: 20,
                          marginBottom: '3%',
                          height: imageHeight * 0.45,
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
                        onPress={() => navigation.navigate('Login')}
                        text="Sign In"
                        buttonStyle={{
                          marginTop: 20,
                          marginBottom: '3%',
                          height: imageHeight * 0.45,
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
                );
              }}
            </Formik>
          </View>
        </LinearGradient>
      </ScrollView>
    </WrapCode>
  );
};

export default Register;
