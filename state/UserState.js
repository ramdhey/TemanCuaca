import {create} from 'zustand';
import API_BaseUrl from './../src/Services/API/API_BaseUrl';
import API_SERVICES from './../src/Services/API_SERVICES';

const UserState = create((set, get) => ({
  register: '',
  setRegister: register => set({register}),
  token: '',
  setToken: token => set({token}),
  full_Name: '',
  setFullName: full_Name => set({full_Name}),
  e_mail: '',
  setEmail: e_mail => set({e_mail}),
  nick_Name: '',
  setNickName: nick_Name => set({nick_Name}),
  Avatar: '',
  setAvatar: Avatar => set({Avatar}),
  refreshToken: '',
  setRefreshToken: refreshToken => set({refreshToken}),
  fcmToken: '',
  setFcmToken: fcmToken => set({fcmToken}),
  userProfile: '',
  setuserProfile: userProfile => set({userProfile}),
  loading: false,
  setLoading: loading => set({loading}),
  fetchUserProfile: async () => {
    set({loading: true});
    const token = get().token; // asumsikan token disimpan dalam state
    try {
      const url = `${API_BaseUrl}/getProfile`;
      const result = await API_SERVICES({
        url: url,
        method: 'GET', // Metode harus berupa 'method', bukan 'metode'
        contentType: 'application/json',
        token: token,
      });

      const userProfile = get().userProfile;
      if (
        !userProfile ||
        JSON.stringify(userProfile) !== JSON.stringify(result?.user)
      ) {
        set({userProfile: result?.user});
      }
    } catch (error) {
      console.error(
        'There was a problem with the fetch operation APIGetProfile: ',
        error,
      );
    }
    set({loading: false});
  },
  editProfile: '',
  setEditProfile: editProfile => set({editProfile}),
  latitudeGPS: '',
  setLatitudeGPS: latitudeGPS => set({latitudeGPS}),
  longitudeGPS: '',
  setLongitudeGPS: longitudeGPS => set({longitudeGPS}),
  saveLoc: '',
  setSaveLoc: saveLoc => set({saveLoc}),
  unSaveLoc: '',
  setUnSaveLoc: unSaveLoc => set({unSaveLoc}),
  cityGPS: '',
  setCityGPS: cityGPS => set({cityGPS}),
  login: '',
  setLogin: login => set({login}),
  setLogout: () =>
    set({
      register: '',
      token: '',
      full_Name: '',
      e_mail: '',
      nick_Name: '',
      Avatar: '',
      refreshToken: '',
      userProfile: '',
      login: '',
      editProfile: '',
    }),
}));

export default UserState;
