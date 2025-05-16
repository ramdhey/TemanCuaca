import React from 'react';
import {TouchableOpacity, Dimensions, View} from 'react-native';

const CardPassive = ({
  children,
  width = '100%',
  paddingHorizontal = '2%',
  paddingVertical = '2%',
  bgColor = 'rgba(255, 255, 255, 0.6)',
  heightPassv = 1,
  borderTopLeftRadius = 10,
  borderTopRightRadius = 10,
  borderBottomLeftRadius = 10,
  borderBottomRightRadius = 10,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);
  return (
    <View
      style={{
        width: width,
        height: imageHeight * heightPassv,
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        alignItems: 'center',
        backgroundColor: bgColor,
        borderTopLeftRadius: borderTopLeftRadius,
        borderTopRightRadius: borderTopRightRadius,
        borderBottomLeftRadius: borderBottomLeftRadius,
        borderBottomRightRadius: borderBottomRightRadius,
      }}>
      {children}
    </View>
  );
};

export default CardPassive;
