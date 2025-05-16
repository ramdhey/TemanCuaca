import React from 'react';
import {Text} from 'react-native';
import {ScaleFontSize} from './MOD/ScaleFontSize';

const TemanCuaca = ({
  fontFamily = 'Panton-BlackCaps',
  color = '#002133',
  fontSize = 26,
}) => {
  return (
    <Text
      style={{
        fontSize: ScaleFontSize(fontSize),
        color,
        fontFamily,
      }}>
      Teman Cuaca
    </Text>
  );
};

export default TemanCuaca;
