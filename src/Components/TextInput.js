import React from 'react';
import {TextInput} from 'react-native-paper';

const TextInputCustom = ({
  value,
  handleChange,
  handleBlur,
  keyboardType = 'default',
  placeholder = '',
  placeholderTextColor = placeholderTextColor || '#B0B0B1',
  additionalStyles = {},
  wTI = '90%',
  borderColor = '#BAE2FC',
  paddingLeft = '0%',
  ...restProps
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={handleChange}
      onBlur={handleBlur}
      style={{
        height: 48,
        width: wTI,
        backgroundColor: 'transparent',
        borderColor: borderColor,
        borderWidth: 1,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
        fontFamily: 'RethinkSans-Regular',
        fontSize: 14,
        paddingLeft: paddingLeft,
        ...additionalStyles, // tambahan styling
      }}
      placeholder={placeholder}
      isActiveBorderBottom={false}
      underlineColor="transparent"
      activeUnderlineColor="transparent"
      activeUnderline={false}
      selectionColor="#000"
      placeholderTextColor={placeholderTextColor}
      keyboardType={keyboardType}
      {...restProps} // Ini akan memungkinkan Anda untuk meneruskan semua prop lain yang mungkin Anda butuhkan
    />
  );
};

export default TextInputCustom;
