import React from 'react';
import CardPassive from './CardPassive';
import Txt from './Txt';
import {View, Image, Dimensions} from 'react-native';

const CardCondition = ({
  width = '100%',
  paddingHorizontal = '2%',
  paddingVertical = '5%',
  bgColor = 'rgba(150, 200, 255, 0.4)',
  height = 1.5,
  borderTopLeftRadius = 10,
  borderTopRightRadius = 10,
  borderBottomLeftRadius = 10,
  borderBottomRightRadius = 10,
  itemData,
  sourceImge = require('../Assets/Images/Image/UV.png'),
  title = '',
  imageH = 0.8,
  WidthIm = 0.2,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);
  return (
    <CardPassive
      width={width}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      bgColor={bgColor}
      heightPassv={height}
      borderTopLeftRadius={borderTopLeftRadius}
      borderTopRightRadius={borderTopRightRadius}
      borderBottomLeftRadius={borderBottomLeftRadius}
      borderBottomRightRadius={borderBottomRightRadius}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}>
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Txt
            fontSize={12}
            style={{
              color: '#FFF',
              fontFamily: 'RethinkSans-Regular',
              textAlign: 'left',
              paddingVertical: '2%',
              paddingHorizontal: '2%',
            }}>
            {title}
          </Txt>
          <Txt
            fontSize={13}
            style={{
              color: '#FFF',
              fontFamily: 'RethinkSans-SemiBold',
              textAlign: 'left',
              paddingVertical: '2%',
              paddingHorizontal: '2%',
            }}>
            {itemData}
          </Txt>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Image
            source={sourceImge}
            style={{
              width: imageWidth * WidthIm,
              height: imageHeight * imageH,
              backgroundColor: 'transparent',
              alignSelf: 'flex-end',
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    </CardPassive>
  );
};

export default CardCondition;
