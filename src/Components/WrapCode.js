import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';

const WrapCode = ({
  backgroundColor = '#ffffff',
  barStyle = 'dark-content',
  translucent = false,
  children,
}) => {
  return (
    <>
      <StatusBar
        translucent={translucent}
        backgroundColor={backgroundColor}
        barStyle={barStyle}
      />
      <SafeAreaView style={{flex: 1, width: '100%', alignItems: 'center'}}>
        {children}
      </SafeAreaView>
    </>
  );
};

export default WrapCode;
