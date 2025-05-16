import React, {useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {ScaleFontSize} from './MOD/ScaleFontSize';

const LoadingImage = ({imageWidth}) => {
  const [loadingText, setLoadingText] = useState('Sedang Memuat');

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prev => (prev.length < 15 ? prev + '.' : 'Sedang Memuat'));
    }, 500); // Update setiap 0.5 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../Assets/Images/Image/cat-974.gif')}
        style={{
          width: imageWidth * 1.5,
          backgroundColor: 'transparent',
          alignSelf: 'center',
          height: '100%',
        }}
      />
      <Text style={styles.loadingText}>{loadingText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: 'white',
    position: 'absolute',
    bottom: 50,
    fontFamily: 'RethinkSans-ExtraBold',
    fontSize: ScaleFontSize(16),
  },
});

export default LoadingImage;
