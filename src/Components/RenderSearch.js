import React from 'react';
import {Image, TouchableOpacity, View, Dimensions} from 'react-native';
import Txt from './Txt';

const RenderSearch = ({handleSelectResult, item, index, ImageSource}) => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);

  return (
    <TouchableOpacity
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
              height:imageHeight*0.8
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
              flexDirection: 'row',
            }}>
            <Txt
              fontSize={9}
              style={{
                color: '#272727',
                fontFamily: 'PlusJakartaSans-SemiBold',
              }}>
              {item?.description}
            </Txt>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              paddingVertical: '2%',
            }}>
            <Txt
              fontSize={7}
              style={{
                color: '#999999',
                fontFamily: 'PlusJakartaSans-Reguler',
                width: 'auto',
                maxWidth: '100%',
              }}>
              {item?.structured_formatting?.main_text}
            </Txt>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderSearch;
