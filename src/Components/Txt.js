import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {ScaleFontSize} from './MOD/ScaleFontSize';

const Txt = ({children, fontSize = 14, style = {}}) => {
  return (
    <Text
      style={[
        styles.defaultStyle,
        {fontSize: ScaleFontSize(fontSize)},
        style, // Memungkinkan gaya tambahan dari komponen anak
      ]}>
      {children}
    </Text>
  );
};

// Gaya default untuk komponen CustomText
const styles = StyleSheet.create({
  defaultStyle: {
    color: '#000000',
    fontFamily: 'RethinkSans-ExtraBold',
    width: '100%',
  },
});

export default Txt;
