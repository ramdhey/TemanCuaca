import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const SkeletonCard = ({
  w = 1,
  h = 1,
  marginHor = 5,
  marginVer = 0,
  borderRadius = 10,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        width={imageWidth * w}
        height={imageHeight * h}
        borderRadius={borderRadius}
        marginHorizontal={marginHor}
        marginVertical={marginVer}
        backgroundColor={'#000'}
      />
    </SkeletonPlaceholder>
  );
};

export default SkeletonCard;
