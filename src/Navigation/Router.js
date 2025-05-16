import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import SplashScreen from '../Screens/SplashScreen';
import Register from '../Screens/Register';
import Login from '../Screens/Login';
import NoInternet from '../Screens/NoInternet';
import SuccessRegistrasi from '../Screens/SuccessRegistrasi';
import UserState from '../../state/UserState';
import {BottomTabs} from './BottomTabs';
import ForgotPassword from '../Screens/ForgotPassword';
import ResetPassword from './../Screens/ResetPassword';
import EditProfile from '../Screens/EditProfile';
import UbahPassword from '../Screens/UbahPassword';
import AddSavedCuaca from '../Screens/AddSavedCuaca';
import DetailCuacaLoc from '../Screens/DetailCuacaLoc';
import DetailCuacaGPS from '../Screens/DetailCuacaGPS';

const Routeing = () => {
  const [isConnected, setIsConnected] = useState(true);
  const route = createNativeStackNavigator();
  const {token} = UserState();
  const isAuth = !!token;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected && state.isInternetReachable);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <route.Navigator initialRouteName={'SplashScreen'}>
        {isConnected ? (
          <>
            <route.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <route.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <route.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
            <route.Screen
              name="forgotPassword"
              component={ForgotPassword}
              options={{headerShown: false}}
            />
            <route.Screen
              name="resetPassword"
              component={ResetPassword}
              options={{headerShown: false}}
            />
            <route.Screen
              name="SuccessRegister"
              component={SuccessRegistrasi}
              options={{headerShown: false}}
            />
            <route.Screen
              name="menu"
              component={isAuth ? BottomTabs : Login}
              options={{headerShown: false}}
            />
            <route.Screen
              name="addWeather"
              component={isAuth ? AddSavedCuaca : Login}
              options={{headerShown: false}}
            />
            <route.Screen
              name="detailLoc"
              component={isAuth ? DetailCuacaLoc : Login}
              options={{headerShown: false}}
            />

            <route.Screen
              name="detailGPS"
              component={isAuth ? DetailCuacaGPS : Login}
              options={{headerShown: false}}
            />
            <route.Screen
              name="EditProfile"
              component={isAuth ? EditProfile : Login}
              options={{headerShown: false}}
            />
            <route.Screen
              name="UbahPassword"
              component={isAuth ? UbahPassword : Login}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <route.Screen
            name="internetHilang"
            component={NoInternet}
            options={{headerShown: false}}
          />
        )}
      </route.Navigator>
    </NavigationContainer>
  );
};

export default Routeing;
