import React, {useState, useEffect} from 'react';
import {View, Image, Dimensions} from 'react-native';
import WrapCode from '../Components/WrapCode';
import LinearGradient from 'react-native-linear-gradient';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import SuccessToast from '../Components/SuccessToast';
import TemanCuaca from '../Components/TemanCuaca';
import BackBtn from '../Components/BackBtn';
import Txt from '../Components/Txt';
import TextInputCustom from '../Components/TextInput';
import Button from '../Components/Button';
import UserState from '../../state/UserState';
import AvatarUser from '../Components/AvatarUser';
import LoadingImage from '../Components/LoadingImage';
import FailToast from '../Components/FailToast';
import API_BaseUrl from '../Services/API/API_BaseUrl';
import API_SERVICES from '../Services/API_SERVICES';

const EditProfile = () => {
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
  } = UserState();
  console.log({token});
  const [selectedAvatar, setSelectedAvatar] = useState(
    userProfile?.avatarUser || '',
  );

  const editProfileSchema = yup.object({
    fullName: yup.string().required('Masukkan FullName').min(3),
    nickName: yup.string().required('Masukkan NickName').min(6).max(8),
    avatarUser: yup.string().required('Pilih Avatar'),
  });

  const inititalEditProfile = {
    email: userProfile?.email || '',
    fullName: userProfile?.fullName || '',
    nickName: userProfile?.nickName || '',
    avatarUser: userProfile?.avatarUser || '',
  };
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const Success = SuccessToast({
    title: 'Berhasil Edit Profil',
    message: '',
  });

  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth); // gunakan aspek rasio yang sama seperti gambar asli

  const EditProfileExcecute = async (values, onSubmitProps, navigation) => {
    setLoading(true);
    try {
      const url = `${API_BaseUrl}/profile`;
      const body = {
        fullName: values.fullName,
        nickName: values.nickName,
        avatarUser: values.avatarUser,
      };
      const result = await API_SERVICES({
        url: url,
        metode: 'PUT',
        contentType: 'application/json',
        body: JSON.stringify(body),
        token: token,
      });
      console.log(result);
      Success.showToast();
      navigation.navigate('Akun');
      setEditProfile(result);
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
    EditProfileExcecute(values, onSubmitProps, navigation);
  };

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
              Edit Profile
            </Txt>
          </View>
        </View>

        <View
          style={{
            // flex: 1,
            width: '85%',
            paddingVertical: '5%',
            paddingHorizontal: '6%',
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
            <TemanCuaca />

            <Formik
              initialValues={inititalEditProfile}
              onSubmit={handleSubmit}
              validationSchema={editProfileSchema}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                isValid,
                touched,
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
                        Email
                      </Txt>
                      <TextInputCustom
                        placeholderTextColor="#C7C7C7"
                        editable={false}
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
                        FullName
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
                            fontFamily: 'RethinkSans-Regular',
                            textAlign: 'left',
                            paddingHorizontal: '5%',
                            paddingVertical: '2%',
                          }}>
                          {errors.fullName}
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
                        NickName
                      </Txt>
                      <TextInputCustom
                        placeholderTextColor="#C7C7C7"
                        value={values.nickName}
                        handleChange={handleChange('nickName')}
                        handleBlur={handleBlur('nickName')}
                        placeholder="NickName"
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
                            fontFamily: 'RethinkSans-Regular',
                            textAlign: 'left',
                            paddingHorizontal: '5%',
                            paddingVertical: '2%',
                          }}>
                          {errors.nickName}
                        </Txt>
                      ) : null}
                    </View>

                    <View
                      style={{
                        width: '100%',
                        // alignItems:'center'
                        marginBottom: '5%',
                      }}>
                      <Button
                        onPress={handleSubmit}
                        text="Simpan"
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
                );
              }}
            </Formik>
          </View>
        </View>
      </LinearGradient>
    </WrapCode>
  );
};

export default EditProfile;
