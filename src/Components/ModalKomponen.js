// File CustomModal.js
import React from 'react';
import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import WrapCode from './WrapCode';

const ModalKomponen = ({isVisible, onClose, children}) => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);
  return (
    <WrapCode
      backgroundColor="#222227"
      barStyle="light-content"
      translucent={false}>
      <Modal
        isVisible={isVisible}
        onSwipeComplete={onClose}
        swipeDirection="down"
        style={{
          justifyContent: 'flex-start',
          margin: 0,
          marginTop: '15%',
          height: '100%',
        }}>
        <LinearGradient
          colors={['#22B4F7', '#FFFFFF']}
          style={{
            alignItems: 'center',
            padding: 16,
            borderRadius: 4,
            flex: 1,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <Image
                source={require('../Assets/Images/Icons/swipeDown.png')}
                style={{
                  width: imageWidth * 0.2,
                  backgroundColor: 'transparent',
                  height: imageHeight * 0.1,
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              style={{
                width: '100%',
                alignItems: 'flex-end',
              }}>
              <Image
                source={require('../Assets/Images/Icons/closeX.png')}
                style={{
                  width: imageWidth * 0.1,
                  backgroundColor: 'transparent',
                  height: imageHeight * 0.2,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {children}
        </LinearGradient>
      </Modal>
    </WrapCode>
  );
};

export default ModalKomponen;
