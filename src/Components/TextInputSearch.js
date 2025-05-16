import React from 'react';

import {Dimensions, FlatList, Text, View} from 'react-native';
import TextInputCustom from './TextInput';
import SkeletonCard from './SkeletonCard';
import InputText from './InputText';

const TextInputSearch = ({
  handleSearch,
  value,
  placeHolder,
  iconLeft,
  placeholderTextColor,
  colorText = '#6231C9',
  borderColor = '#6231C9',
  widthSize = 0.75,
  borderRadiusSize = 30,
  font = 'PlusJakartaSans-Regular',
  data,
  renderItem,
  loading,
  isFlatListVisible,
  iconWidthL = 0.09,
  iconHeightL = 0.255,
  onchange = text => handleSearch(text),
}) => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);

  const ITEM_HEIGHT = 60;
  const ITEM_MARGIN = 4;
  const MAX_ITEMS_VISIBLE = 5;

  return (
    <>
      <InputText
        iconLeft={iconLeft} // Opsi ikon kiri
        // iconRight={require('./path-to-right-icon.png')} // Opsi ikon kanan
        placeholder={placeHolder}
        placeholderTextColor={'#05D4F3'}
        fontFamily={'RethinkSans-Regular'}
        fontSize={16}
        color={'#05D4F3'}
        borderColor={'#05D4F3'}
        style={{
          width: imageWidth * widthSize,
          borderRadius: borderRadiusSize,
        }}
        onChangeText={onchange}
        value={value}
        iconWidthL={iconWidthL}
        iconHeightL={iconHeightL}

        // tambahkan properti lain seperti onChangeText, value, dll.
      />

      <View
        style={{position: 'relative', width: '100%', paddingVertical: '0%'}}>
        {isFlatListVisible && (
          <View
            style={{
              position: 'absolute',
              top: '100%', // Atur posisi ini agar muncul tepat di bawah InputText
              left: 0,
              right: 0,
              zIndex: 1, // Pastikan zIndex cukup tinggi agar elemen ini muncul di atas yang lainnya
              backgroundColor: '#FFFFFF',
            }}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item?.id}
              style={{
                maxHeight: MAX_ITEMS_VISIBLE * (ITEM_HEIGHT + ITEM_MARGIN),
                backgroundColor: '#FFFFFF',
                elevation: 0,
              }}
              keyboardShouldPersistTaps="handled" // Agar keyboard tidak menutup saat FlatList diklik
              contentContainerStyle={{
                alignItems: 'center',
              }}
              ListEmptyComponent={() =>
                loading ? (
                  <View
                    style={{
                      width: '100%',
                      marginTop: '2%',
                    }}>
                    <SkeletonCard w={1} h={0.7} marginVer={5} />
                    <SkeletonCard w={1} h={0.7} marginVer={5} />
                    <SkeletonCard w={1} h={0.7} marginVer={5} />
                    <SkeletonCard w={1} h={0.7} marginVer={5} />
                    <SkeletonCard w={1} h={0.7} marginVer={5} />
                    <SkeletonCard w={1} h={0.7} marginVer={5} />
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      marginTop: '2%',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'PlusJakartaSans-Bold',
                        color: '#000',
                      }}></Text>
                  </View>
                )
              }
            />
          </View>
        )}
      </View>
    </>
  );
};

export default TextInputSearch;
