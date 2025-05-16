import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import WrapCode from '../Components/WrapCode';
import API_BaseUrl from '../Services/API/API_BaseUrl';
import API_SERVICES from '../Services/API_SERVICES';
import UserState from '../../state/UserState';
import Txt from '../Components/Txt';
import RenderAddCuaca from '../Components/RenderAddCuaca';
import TextInputSearch from '../Components/TextInputSearch';
import BackBtn from '../Components/BackBtn';
import {useNavigation} from '@react-navigation/native';

const AddSavedCuaca = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const {token} = UserState();
  const navigation = useNavigation();

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  };

  const searchLocations = useCallback(async () => {
    if (!searchText.trim()) return;

    setLoading(true);
    try {
      const url = `${API_BaseUrl}/search-loc?query=${encodeURIComponent(
        searchText,
      )}`;
      const result = await API_SERVICES({
        url: url,
        method: 'GET',
        contentType: 'application/json',
        token: token,
      });
      setSearchResults(result.data);
      setLoading(false);
    } catch (error) {
      console.error('Error during search operation: ', error);
      setLoading(false);
    }
  }, [searchText, token]);

  useEffect(() => {
    const debouncedSearch = debounce(searchLocations, 500);
    debouncedSearch();
  }, [searchText, searchLocations]);

  const handleUpdateFavorites = useCallback(
    updatedItem => {
      const updatedResults = searchResults.map(item => {
        if (item.name === updatedItem.name) {
          // Toggle isFavorite
          return {...item, isFavorite: !item.isFavorite};
        }
        return item;
      });
      setSearchResults(updatedResults);
    },
    [searchResults],
  );
  const renderItem = ({item}) => (
    <RenderAddCuaca item={item} handleUpdateFavorites={handleUpdateFavorites} />
  );
  console.log({searchResults});

  return (
    <WrapCode
      backgroundColor="transparent"
      barStyle="light-content"
      translucent={true}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          flex: 1,
          backgroundColor: '#FFFF',
          paddingVertical: '10%',
        }}>
        <View
          style={{
            alignItems: 'center',
            width: '100%',
            // paddingHorizontal: '2%',
            paddingVertical: '2%',
            // alignSelf: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              alignItems: 'center',
              width: '15%',
              // paddingHorizontal: '2%',
              paddingVertical: '2%',
              alignSelf: 'flex-start',
            }}>
            <BackBtn
              navigation={navigation}
              backgroundColor={'#87C5D3'}
              iconColor={'#FBFCFA'}
            />
          </View>
          <Txt
            fontSize={13}
            style={{
              color: '#87C5D3',
              fontFamily: 'RethinkSans-Bold',
              textAlign: 'center',
              paddingVertical: '2%',
              width: '70%',
            }}>
            Cari Lokasi Favorite
          </Txt>
        </View>

        <View
          style={{
            width: '90%',
            paddingVertical: '3%',
            alignItems: 'center',
          }}>
          <TextInputSearch
            handleSearch={setSearchText}
            value={searchText}
            placeHolder="Cari Lokasi"
            data={searchResults}
            renderItem={renderItem}
            loading={loading}
            isFlatListVisible={true}
            onchange={text => setSearchText(text)}
            iconLeft={require('../Assets/Images/Icons/find.png')}
            widthSize={0.9}
          />
        </View>
      </View>
    </WrapCode>
  );
};

export default AddSavedCuaca;
