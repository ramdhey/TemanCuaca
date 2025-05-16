import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ModalKomponen from './ModalKomponen';
import {ScaleFontSize} from './MOD/ScaleFontSize';

const AvatarUser = ({setSelectedAvatar, selectedAvatar}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const avatars = [
    {
      id: 'Raja-Hot',
      name: 'Raja Hot',
      source: require('../Assets/Images/Image/rajahot.png'),
    },
    {
      id: 'Raja-Cold',
      name: 'Raja CoolBet',
      source: require('../Assets/Images/Image/rajadingin.png'),
    },
    {
      id: 'Ratu-Hot',
      name: 'Ratu Hot',
      source: require('../Assets/Images/Image/ratuhot.png'),
    },
    {
      id: 'Ratu-Cold',
      name: 'Ratu Coolbet',
      source: require('../Assets/Images/Image/ratudingin.png'),
    },
  ];

  const handleSelectAvatar = avatarId => {
    setSelectedAvatar(avatarId);
    setModalVisible(false);
  };

  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          width: '100%',
          alignItems: 'center',
          paddingVertical: '2%',
        }}>
        {selectedAvatar ? (
          <Image
            source={
              avatars.find(avatar => avatar.id === selectedAvatar)?.source
            }
            style={{
              width: imageWidth * 0.3,
              height: imageHeight * 1.1,
              alignItems: 'center',
              borderRadius: imageWidth * 0.5,
            }}
          />
        ) : (
          <Image
            source={require('../Assets/Images/Image/avatar.png')}
            style={{
              width: imageWidth * 0.3,
              height: imageHeight * 1.1,
              alignItems: 'center',
              borderRadius: imageWidth * 0.5,
            }}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>

      <ModalKomponen
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            // justifyContent: 'center',
            alignItems: 'center',
            marginTop: '2%',
          }}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: '2%',
              paddingVertical: '2%',
            }}>
            <Text
              style={{
                fontSize: ScaleFontSize(16),
                color: '#000',
                fontFamily: 'RethinkSans-Bold',
                // marginTop: '7%',
              }}>
              Pilih Avatar Profile mu
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              justifyContent: 'center', // Center the grid on the screen
              width: '100%',
              marginTop: '2%',
            }}>
            {avatars.map(avatar => (
              <TouchableOpacity
                key={avatar.id}
                onPress={() => handleSelectAvatar(avatar.id)}
                style={{
                  margin: 5,
                  width: '45%', // Each avatar takes up 40% of the grid width
                  aspectRatio: 1, // Keep the aspect ratio of the avatars to 1:1
                  justifyContent: 'center', // Center the avatar image inside the touchable
                  //   borderRadius: 50,
                  overflow: 'hidden',
                }}>
                <Image
                  source={avatar.source}
                  style={{
                    width: '100%', // Make the image fill the touchable area
                    height: imageHeight * 1.1, // Make the image fill the touchable area
                    // borderRadius: 50,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: ScaleFontSize(16),
                    color: '#000',
                    fontFamily: 'RethinkSans-SemiBold',
                    marginTop: '7%',
                    height: '35%',
                    textAlign: 'center',
                  }}>
                  {avatar.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ModalKomponen>
    </>
  );
};

export default AvatarUser;
