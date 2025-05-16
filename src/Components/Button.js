import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ScaleFontSize} from './MOD/ScaleFontSize';

const Button = ({
  onPress,
  text = '',
  textStyle = {},
  children, // ini akan digunakan untuk ikon atau komponen lain
  iconPosition = 'left', // posisi ikon default adalah 'left'
  buttonStyle = {},
  gradientColors = ['#3A66B9', '#3A66B9'],
  widthTouchable = 'auto',
  ...restProps
}) => {
  // Menentukan style container berdasarkan posisi ikon
  const contentContainerStyle = [
    styles.contentContainer,
    {flexDirection: iconPosition === 'left' ? 'row' : 'row-reverse'}, // Mengubah arah flexDirection berdasarkan posisi ikon
  ];

  return (
    <TouchableOpacity
      style={{
        width: widthTouchable,
      }}
      onPress={onPress}
      {...restProps}>
      <LinearGradient
        colors={gradientColors}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={[styles.linearGradient, buttonStyle]}>
        <View style={contentContainerStyle}>
          {children}
          <Text style={[styles.text, textStyle]}>{text}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: '90%',
    height: 'auto',
    borderRadius: 6,
    alignSelf: 'center',
    elevation: 3,
    paddingHorizontal: '2%',
    paddingVertical: '2%',
  },
  contentContainer: {
    flex: 1, // memastikan kontainer mengisi seluruh ruang di dalam LinearGradient
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  text: {
    fontSize: ScaleFontSize(11),
    color: '#fff',
    fontFamily: 'RethinkSans-Bold',
    marginHorizontal: 10, // jarak horizontal dari ikon
  },
});

export default Button;
