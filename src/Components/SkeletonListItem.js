import React from 'react';
import {View} from 'react-native';
import SkeletonCard from './SkeletonCard';

// Komponen SkeletonCard
const SkeletonListItem = ({width = 1.1, height = 1, marginVertical = 5}) => {
  return (
    <View
      style={{
        width: '100%',
        marginTop: '1%',
        alignItems: 'center',
      }}>
      <SkeletonCard w={width} h={height} marginVer={marginVertical} />
      <SkeletonCard w={width} h={height} marginVer={marginVertical} />
      <SkeletonCard w={width} h={height} marginVer={marginVertical} />
      <SkeletonCard w={width} h={height} marginVer={marginVertical} />
      <SkeletonCard w={width} h={height} marginVer={marginVertical} />
      <SkeletonCard w={width} h={height} marginVer={marginVertical} />
      <SkeletonCard w={width} h={height} marginVer={marginVertical} />
      <SkeletonCard w={width} h={height} marginVer={marginVertical} />
      <SkeletonCard w={width} h={height} marginVer={marginVertical} />
      <SkeletonCard w={width} h={height} marginVer={marginVertical} />
      <SkeletonCard w={width} h={height} marginVer={marginVertical} />
      <SkeletonCard w={width} h={height} marginVer={marginVertical} />
    </View>
  );
};

export default SkeletonListItem;
