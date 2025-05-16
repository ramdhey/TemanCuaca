import React, {useState} from 'react';
import {View, Dimensions, Image} from 'react-native';
import WrapCode from '../Components/WrapCode';
import Txt from '../Components/Txt';
import LinearGradient from 'react-native-linear-gradient';
import {Formik} from 'formik';
import * as yup from 'yup';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import SuccessToast from '../Components/SuccessToast';
import FailToast from '../Components/FailToast';
import BackBtn from '../Components/BackBtn';
import TemanCuaca from '../Components/TemanCuaca';
import TextInputCustom from '../Components/TextInput';
import Button from '../Components/Button';
import CountdownTimer from '../Components/CountDownTimer';
import {ScaleFontSize} from '../Components/MOD/ScaleFontSize';
import API_BaseUrl from '../Services/API/API_BaseUrl';
import API_SERVICES from '../Services/API_SERVICES';
import LoadingImage from '../Components/LoadingImage';

const resetPasswordSchema = yup.object({
  token: yup.string().required('Masukkan Kode Verifikasi dari Email mu!'),
  password: yup
    .string()
    .required('Password Baru Harus di Isi!')
    .min(6, 'Password Baru harus lebih dari 6 karakter'),
});

const initialResetPassword = {
  email: '',
  password: '',
};

const ResetPassword = () => {
  const navigation = useNavigation();
  const Success = SuccessToast({
    title: 'Berhasil Memperbarui Password',
    message: 'Silahkan Gunakan Password Baru mu untuk Login.',
  });

  // State

  const [loading, setLoading] = useState(false);
  const [showPaswword, setShowPassword] = useState(false);
  //END State

  const resetPasswordExcecute = async (values, onSubmitProps, navigation) => {
    setLoading(true);
    try {
      const url = `${API_BaseUrl}/reset-password`;
      const body = {
        token: values.token,
        newPassword: values.password,
      };
      const result = await API_SERVICES({
        url: url,
        metode: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(body),
      });
      console.log(result);
      Success.showToast();
      navigation.navigate('Login');
      setLoading(false);
    } catch (error) {
      const GagalLgn = FailToast({
        title: 'Gagal Memperbarui Password',
        message: `${error}`,
      });

      GagalLgn.showToast();
    }
    setLoading(false);
  };

  const handleSubmit = (values, onSubmitProps) => {
    resetPasswordExcecute(values, onSubmitProps, navigation);
  };

  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);
  return (
    <WrapCode
      backgroundColor="#222227"
      barStyle="light-content"
      translucent={false}>
      {loading && <LoadingImage imageWidth={imageWidth} />}
      <LinearGradient
        colors={['#FBFCFA', '#87C5D3']}
        style={{
          flex: 1,
          alignItems: 'center',
          width: '100%',
          paddingVertical: '0%',
        }}>
        <View
          style={{
            // flex: 1,
            width: '85%',
            paddingVertical: '5%',
            paddingHorizontal: '2%',
            backgroundColor: '#FFFF',
            alignSelf: 'center',
            borderRadius: 30,
            height: '80%',
            justifyContent: 'center',
            marginTop: '15%',
          }}>
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: '2%',
              paddingVertical: '2%',
            }}>
            <Txt
              fontSize={14}
              style={{
                color: '#058CEE',
                fontFamily: 'RethinkSans-Bold',
                textAlign: 'center',
                paddingVertical: '2%',
              }}>
              Reset Password
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
            <TemanCuaca />
            <Txt
              fontSize={9}
              style={{
                color: '#000',
                fontFamily: 'RethinkSans-Regular',
                textAlign: 'center',
                paddingVertical: '3%',
              }}>
              Kode Verifikasi Akan Kedaluwarsa dalam waktu :
            </Txt>

            <CountdownTimer
              duration={2 * 60} // Durasi dalam detik, contoh 1 jam
              style={{
                fontSize: ScaleFontSize(13),
                color: '#058CEE',
                fontFamily: 'RethinkSans-SemiBold',
                marginTop: '1%',
                textAlign: 'center',
              }}
            />

            <Formik
              initialValues={initialResetPassword}
              onSubmit={handleSubmit}
              validationSchema={resetPasswordSchema}>
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
                      fontSize={8}
                      style={{
                        color: '#000',
                        fontFamily: 'RethinkSans-Regular',
                        paddingVertical: '5%',
                        textAlign: 'left',
                        paddingHorizontal: '5%',
                      }}>
                      Kode Verifikasi
                    </Txt>
                    <TextInputCustom
                      placeholderTextColor="#C7C7C7"
                      value={values.token}
                      handleChange={handleChange('token')}
                      handleBlur={handleBlur('token')}
                      placeholder="Kode Verifikasi Reset Password"
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
                    {errors.token && touched.token ? (
                      <Txt
                        fontSize={8}
                        style={{
                          color: 'red',
                          fontFamily: 'RethinkSans-Regular',
                          textAlign: 'left',
                          paddingHorizontal: '5%',
                          paddingVertical: '2%',
                        }}>
                        {errors.token}
                      </Txt>
                    ) : null}
                  </View>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      // paddingHorizontal:'5%'
                    }}>
                    <Txt
                      fontSize={8}
                      style={{
                        color: '#000',
                        fontFamily: 'RethinkSans-Regular',
                        paddingVertical: '5%',
                        textAlign: 'left',
                        paddingHorizontal: '5%',
                      }}>
                      Password Baru
                    </Txt>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                      }}>
                      <TextInputCustom
                        placeholderTextColor="#C7C7C7"
                        value={values.password}
                        handleChange={handleChange('password')}
                        handleBlur={handleBlur('password')}
                        placeholder="Password Baru"
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
                          fontFamily: 'RethinkSans-Regular',
                          textAlign: 'left',
                          paddingHorizontal: '5%',
                          paddingVertical: '2%',
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
                      text="Kirim"
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
                </View>
              )}
            </Formik>
          </View>
        </View>
      </LinearGradient>
    </WrapCode>
  );
};

export default ResetPassword;
