import React from 'react';
import {View, TextInput, Image, StyleSheet, Dimensions} from 'react-native';

const InputText = ({
  onFocus,
  iconLeft,
  iconRight,
  iconStyle,
  placeholder,
  placeholderTextColor = '#272727',
  fontFamily,
  fontSize,
  color,
  borderColor = 'grey',
  width,
  iconWidthL = 0.09,
  iconHeightL = 0.255,
  max,
  value, // Menambahkan properti value
  onChangeText, // Menambahkan properti onChangeText
  onBlur, // Menambahkan properti onBlur
  keyboardType = 'default', // Menambahkan properti keyboardType
  //   KEYBOARD TYPE
  // default: Keyboard standar dengan huruf dan angka.
  // numeric: Keyboard numerik untuk memasukkan angka.
  // email-address: Keyboard khusus untuk memasukkan alamat email.
  // phone-pad: Keyboard khusus untuk memasukkan nomor telepon.
  // decimal-pad: Keyboard numerik dengan titik desimal (untuk memasukkan angka desimal).
  // visible-password: Keyboard dengan opsi untuk menyembunyikan atau menampilkan karakter sandi.
  // ascii-capable: Keyboard yang mampu menampilkan karakter ASCII khusus.
  // number-pad: Keyboard numerik dengan tombol khusus untuk memasukkan angka.
  // url: Keyboard khusus untuk memasukkan URL.
  ...props
}) => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: borderColor,
        borderRadius: 30,
        borderColor: borderColor,
        width: width,
        paddingHorizontal: '2%',
        backgroundColor: '#FFFFFF',
      }}>
      {iconLeft && (
        <Image
          source={iconLeft}
          style={{
            width: imageWidth * iconWidthL,
            height: imageHeight * iconHeightL,
          }}
          resizeMode="contain"
        />
      )}
      <TextInput
        onFocus={onFocus}
        style={[
          styles.textInput,
          {
            fontFamily,
            color,
            fontSize,
            backgroundColor: '#FFFFFF',
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value} // Menggunakan properti value
        onChangeText={onChangeText} // Menggunakan properti onChangeText
        onBlur={onBlur} // Menggunakan properti onBlur
        keyboardType={keyboardType}
        maxLength={max}
        {...props} // untuk properti lainnya seperti onChangeText, value, dll.
      />
      {iconRight && <Image source={iconRight} style={{}} />}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    padding: 10,
  },
});

export default InputText;
