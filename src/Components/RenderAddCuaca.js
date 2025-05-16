import React, {useCallback, useState} from 'react';
import {Image, TouchableOpacity, View, Dimensions} from 'react-native';
import Txt from './Txt';
import API_BaseUrl from '../Services/API/API_BaseUrl';
import API_SERVICES from '../Services/API_SERVICES';
import UserState from '../../state/UserState';
import FailToast from './FailToast';
import SkeletonCard from './SkeletonCard';

const RenderAddCuaca = ({handleUpdateFavorites, item, index, ImageSource}) => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);
  const {token, saveLoc, setSaveLoc, unSaveLoc, setUnSaveLoc} = UserState();
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(item?.isFavorite);

  const APISaveLoc = useCallback(async () => {
    setLoading(true);
    try {
      const url = `${API_BaseUrl}/save-location`;
      const body = {
        name: item?.name,
        lat: item?.latitude,
        lon: item?.longitude,
      };
      const result = await API_SERVICES({
        url: url,
        metode: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(body),
        token: token,
      });
      setIsFavorite(!isFavorite); // Toggle status
      handleUpdateFavorites(item);
      setLoading(false);
    } catch (error) {
      const GagalLgn = FailToast({
        title: 'Tidak Dapat Menyimpan',
        message: `${error}`,
      });

      GagalLgn.showToast();
      console.error(
        'There was a problem with the fetch operation APISave: ',
        error,
      );
    }
    setLoading(false);
  }, [item, isFavorite, token, handleUpdateFavorites]);

  const APIUnsaveLoc = useCallback(async () => {
    setLoading(true);
    try {
      const url = `${API_BaseUrl}/removeSavedLocation`;
      const body = {
        name: item?.name,
        lat: item?.latitude,
        lon: item?.longitude,
      };
      const result = await API_SERVICES({
        url: url,
        metode: 'DELETE',
        contentType: 'application/json',
        body: JSON.stringify(body),
        token: token,
      });
      setIsFavorite(!isFavorite);
      handleUpdateFavorites(item);
      setLoading(false);
    } catch (error) {
      const GagalLgn = FailToast({
        title: 'Tidak Dapat Menyimpan',
        message: `${error}`,
      });

      GagalLgn.showToast();
      console.error(
        'There was a problem with the fetch operation APIUnsave: ',
        error,
      );
    }
    setLoading(false);
  }, [item, isFavorite, token, handleUpdateFavorites]);

  return (
    <>
      {loading === true ? (
        <SkeletonCard w={1.3} h={1} />
      ) : (
        <View
          onPress={() => handleSelectResult(item)}
          key={index}
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',

            // paddingVertical: '1%',
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                width: '25%',
                paddingHorizontal: '0%',
                // paddingVertical: '2%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../Assets/Images/Image/point-5271.gif')}
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  alignSelf: 'center',
                  height: imageHeight * 0.8,
                }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                width: '75%',
                paddingHorizontal: '0%',
                paddingVertical: '2%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  paddingVertical: '2%',
                  flexDirection: 'row',
                }}>
                <Txt
                  fontSize={9}
                  style={{
                    color: '#272727',
                    fontFamily: 'PlusJakartaSans-SemiBold',
                    width: 'auto',
                  }}>
                  {item?.name}, {item?.region}, {item?.country}
                </Txt>
                <TouchableOpacity
                  onPress={
                    item?.isFavorite === true ? APIUnsaveLoc : APISaveLoc
                  }
                  style={{
                    width: '50%',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={
                      item?.isFavorite === true
                        ? require('../Assets/Images/Icons/saveEnable.png')
                        : require('../Assets/Images/Icons/saveDisable.png')
                    }
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      alignSelf: 'center',
                      height: imageHeight * 0.4,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingVertical: '2%',
                }}>
                <Txt
                  fontSize={10}
                  style={{
                    color: '#000',
                    fontFamily: 'PlusJakartaSans-Reguler',
                    width: 'auto',
                    maxWidth: '100%',
                  }}>
                  {item?.isFavorite}
                </Txt>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default RenderAddCuaca;
