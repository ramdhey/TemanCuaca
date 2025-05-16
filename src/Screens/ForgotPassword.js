import React, {useState} from 'react';
import {View, Dimensions, Image} from 'react-native';
import WrapCode from '../Components/WrapCode';
import Txt from '../Components/Txt';
import LinearGradient from 'react-native-linear-gradient';
import {Formik} from 'formik';
import * as yup from 'yup';
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

const forgotSchema = yup.object({
  email: yup
    .string()
    .required('Masukkan Email yang telah terverifikasi!')
    .email('Email is invalid'),
});

const inititalForgot = {
  email: '',
};
const ForgotPassword = () => {
  const navigation = useNavigation();
  const Success = SuccessToast({
    title: 'Berhasil Kirim Kode Verifikasi',
    message: 'Periksa alamat email terdaftar untuk verfikasi Lupa Password',
  });

  // State
  const [response, setResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  //END State

  const forgotExcecute = async (values, onSubmitProps, navigation) => {
    setLoading(true);
    try {
      const url = `${API_BaseUrl}/forgot-password`;
      const body = {
        email: values.email,
      };
      const result = await API_SERVICES({
        url: url,
        metode: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(body),
      });
      console.log(result);
      Success.showToast();
      navigation.navigate('resetPassword');
      setLoading(false);
    } catch (error) {
      const GagalLgn = FailToast({
        title: 'Gagal Kirim Kode Verifikasi',
        message: `${error}`,
      });

      GagalLgn.showToast();
    }
    setLoading(false);
  };

  const handleSubmit = (values, onSubmitProps) => {
    forgotExcecute(values, onSubmitProps, navigation)
      .then(() => {
        onSubmitProps.resetForm(); // Reset the form after successful submission
      })
      .catch(error => {
        // Handle error
      });
  };

  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth); // gunakan aspek rasio yang sama seperti gambar asli
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
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              width: '20%',
              paddingHorizontal: '2%',
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
              width: '60%',
              alignItems: 'center',
            }}>
            <Txt
              fontSize={14}
              style={{
                color: '#058CEE',
                fontFamily: 'RethinkSans-Bold',
                textAlign: 'center',
              }}>
              Lupa Password
            </Txt>
          </View>
        </View>

        <View
          style={{
            // flex: 1,
            width: '85%',
            paddingVertical: '5%',
            paddingHorizontal: '2%',
            backgroundColor: '#FFFF',
            alignSelf: 'center',
            borderRadius: 30,
            height: '60%',
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
              fontSize={12}
              style={{
                color: '#058CEE',
                fontFamily: 'RethinkSans-SemiBold',
                textAlign: 'center',
                paddingVertical: '8%',
              }}>
              Masukkan Email yang telah terverifikasi.
            </Txt>
            <Formik
              initialValues={inititalForgot}
              onSubmit={handleSubmit}
              validationSchema={forgotSchema}>
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
                      Email
                    </Txt>
                    <TextInputCustom
                      placeholderTextColor="#C7C7C7"
                      value={values.email}
                      handleChange={handleChange('email')}
                      handleBlur={handleBlur('email')}
                      placeholder="Email"
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
                          fontFamily: 'RethinkSans-Regular',
                          textAlign: 'left',
                          paddingHorizontal: '5%',
                          paddingVertical: '2%',
                        }}>
                        {errors.email}
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

export default ForgotPassword;
