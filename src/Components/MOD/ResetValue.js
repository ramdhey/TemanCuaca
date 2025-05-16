import React, {useEffect, useContext} from 'react';
import {NavigationContext} from '@react-navigation/native';

const ResetValue = ({resetFunctions}) => {
  const navigation = useContext(NavigationContext);

  useEffect(() => {
    const resetValues = () => {
      resetFunctions.forEach(func => func());
    };

    const unsubscribe = navigation.addListener('focus', resetValues);

    return unsubscribe;
  }, [navigation, ...resetFunctions]); // Memastikan useEffect tergantung pada fungsi reset yang diberikan

  return null; // Komponen ini tidak menghasilkan output visual apa pun
};

export default ResetValue;
