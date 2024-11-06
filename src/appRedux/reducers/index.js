import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import Barang from "./Barang";
import Menu from "./Menu";
import core from "./core";
import pfpd from "./pfpd";
import lhp from "./lhp";
import search from "./search";
import kantor from "./kantor";
import jenis_kendala_pemeriksaan from "./jenis_kendala_pemeriksaan";
import bidang_pendamping from "./bidang_pendamping";
import tarif_sub_komoditi_cukai from "./tarif_sub_komoditi_cukai";
import resume_keputusan from "./resume_keputusan";
import kemasan from "./kemasan";
import fasilitas_tarif from "./fasilitas_tarif";
import asal_barang from "./asal_barang";
import kategori_barang from "./kategori_barang";
import gudang_tps from "./gudang_tps";
import alasan_pkb from "./alasan_pkb";
import alasan_perintah_lorong from "./alasan_perintah_lorong";
import tingkat_ip from "./tingkat_ip";
import kondisi_barang from "./kondisi_barang";
import satuan_barang from "./satuan_barang";
import lartas from "./lartas";
import lartas_detil from "./lartas_detil";
import lartas_dok from "./lartas_dok";
import negara from "./negara";
import perintah_lorong from "./perintah_lorong";
import jenis_keputusan_lhp from "./jenis_keputusan_lhp";
import dokumen from "./dokumen";
import dokumen_grup from "./dokumen_grup";
import modelReducer from "./modelReducer";
import pageIndex from "./pageIndex";
import penyelesaian from "./penyelesaian";
import pencarianAp from "./pencarianAp";
import evaluasi from "./EvaluasiReducer"
import { store, persistor } from "../store";
import qs from "qs";
import perbaikan from "./perbaikan";
import targetting from "./targetting";
import Perijinan from "../reducers/PerijinanReducer.js";
import JenisPresentasi from "../reducers/JenisPresentasiReducer";
import HasilPresentasi from "../reducers/HasilPresentasiReducer";
import keycloak from './login'
import LoadingHeaderReducer from "./LoadingHeaderReducer";
import RegNppbkc from './regNppbkcReducer'

const auth = (state = {}) => {
  //MOHON UNTUK MENGGUNAKAN/MIGRASI KE getUser() import from utils>DataUser.js UNTUK MENGAMBIL DATA USER
  return state;
};
const reducers = combineReducers({
  routing: routerReducer,
  barang: Barang,
  menu: Menu,
  modelReducer: modelReducer,
  perijinan :Perijinan,
  jenisPresentasi : JenisPresentasi,
  hasilPresentasi : HasilPresentasi,
  core,
  dokumen_grup,
  dokumen,
  auth,
  pfpd,
  lhp,
  kantor,
  jenis_kendala_pemeriksaan,
  bidang_pendamping,
  penyelesaian,
  pencarianAp,
  pageIndex,
  perbaikan,
  resume_keputusan,
  kemasan,
  fasilitas_tarif,
  tarif_sub_komoditi_cukai,
  asal_barang,
  kategori_barang,
  gudang_tps,
  alasan_pkb,
  alasan_perintah_lorong,
  tingkat_ip,
  kondisi_barang,
  satuan_barang,
  lartas,
  lartas_detil,
  lartas_dok,
  negara,
  perintah_lorong,
  jenis_keputusan_lhp,
  search,
  targetting,
  evaluasi,
  rkc: keycloak,
  headerIsLoading: LoadingHeaderReducer,
  RegNppbkc
});

export function secure_data(data) {
  var d = {
    ...data,
    token: store.getState().auth.token
  };
  return qs.stringify(d);
}

export function fetch_error(error, dispatch) {
  if (error.response) {
    dispatch({
      type: "SET_VALIDATION",
      payload: error.response.data
    });
  } else if (error.request) {
    dispatch({
      type: "SET_MESSAGE",
      payload: "Tidak dapat terkoneksi dengan sistem"
    });
  }
}

export default reducers;
