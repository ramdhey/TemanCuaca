import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image} from 'react-native';
import UserState from '../../state/UserState';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TripPrediction from './../Screens/TripPrediction';
import Profile from './../Screens/Profile';

const Tab = createBottomTabNavigator();

export const BottomTabs = ({navigation}) => {
  const {token} = UserState();
  const isAuth = !!token;
  // const initialRouteName = isAuth ? 'menu' : 'login';

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2588C8',
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'RethinkSans-SemiBold',
        },

        style: {
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
        },
      }}>
      <Tab.Screen
        name="Trip"
        component={isAuth ? TripPrediction : Login}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../Assets/Images/Image/MapEnable.png')
                  : require('../Assets/Images/Image/MapDisable.png')
              }
              style={{
                width: '100%',
                height: '75%',
                resizeMode: 'contain',
                backgroundColor: 'transparent',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={isAuth ? Home : Login}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../Assets/Images/Image/HomeEneble.png')
                  : require('../Assets/Images/Image/HomeDisable.png')
              }
              style={{
                width: '100%',
                height: '75%',
                resizeMode: 'contain',
                backgroundColor: 'transparent',
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Akun"
        component={isAuth ? Profile : Login}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../Assets/Images/Image/ProfileEnable.png')
                  : //
                    require('../Assets/Images/Image/ProfileDisable.png')
              }
              style={{
                width: '100%',
                height: '75%',
                resizeMode: 'contain',
                backgroundColor: 'transparent',
              }}
            />
          ),
        }}
      />

      {/*  <Tab.Screen name="Notifikasi" component={Notif} options={{
                tabBarIcon:({color})=>(
                    <MaterialIcons name="notifications" size={30} color={color} style={{alignItems:'center'}} />
                )
                
            }} /> */}

      {/**{require('../../assets/images/bannerNopal.jpg')} */}

      {/* <Tab.Screen
        name="Profile"
        component={isAuth ? Profile : Login}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/images/images/profilfilicn.png')
                  : require('../assets/images/images/profileicn.png')
              }
              style={{
                width: '100%',
                height: '75%',
                resizeMode: 'contain',
                backgroundColor: 'transparent',
              }}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};
