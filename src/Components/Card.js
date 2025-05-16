import React from 'react';
import {TouchableOpacity, Dimensions} from 'react-native';

const Card = ({
  children,
  width = '100%',
  paddingHorizontal = '2%',
  paddingVertical = '2%',
  bgColor = 'transparent',
  height = 5,
  borderTopLeftRadius = 10,
  borderTopRightRadius = 10,
  borderBottomLeftRadius = 10,
  borderBottomRightRadius = 10,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);
  return (
    <TouchableOpacity
      style={{
        width: width,
        height: imageHeight * height,
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
    </TouchableOpacity>
  );
};

export default Card;
