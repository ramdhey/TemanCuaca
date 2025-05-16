import React from 'react';
import {TouchableOpacity, Dimensions} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const screenWidth = Dimensions.get('window').width;
const imageWidth = screenWidth * 0.85;
const imageHeight = imageWidth;

const BackBtn = ({
  backgroundColor = '#FFFFFF',
  iconName = 'arrow-left',
  iconColor = '#058CEE',
  navigation,
}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        backgroundColor: backgroundColor,
        width: imageWidth * 0.1,
        height: imageHeight * 0.1,
        borderRadius: imageWidth / 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '2%',
        paddingVertical: '2%',
      }}>
      <FontAwesome5 name={iconName} size={25} color={iconColor} />
    </TouchableOpacity>
  );
};

export default BackBtn;
