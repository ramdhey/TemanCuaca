import {create} from 'zustand';

const WeatherState = create(set => ({
  cuacaGPS: '',
  setCuacaGPS: cuacaGPS => set({cuacaGPS}),
  cuacaLocation: '',
  setCuacaLocation: cuacaLocation => set({cuacaLocation}),
  listCuacaSaved: '',
  setListCuacaSaved: listCuacaSaved => set({listCuacaSaved}),
  detailListCuacaSaved: '',
  setDetailListCuacaSaved: detailListCuacaSaved => set({detailListCuacaSaved}),
}));

export default WeatherState;
