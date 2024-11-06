import {
  GET_TABLE_DATA,
  SET_AP_FAILED,
  SET_AP_SUCCESS,
  SET_AP_LOADING,
  SET_CATATAN_LIST,
  SET_CURRENT_PROSES,
  SET_DAFTAR_IZIN_LARTAS_FAILED,
  SET_DAFTAR_IZIN_LARTAS_LOADING,
  SET_DAFTAR_IZIN_LARTAS_SUCCESS,
  SET_HISTORY_KEPUTUSAN_FAILED,
  SET_HISTORY_KEPUTUSAN_LOADING,
  SET_HISTORY_KEPUTUSAN_SUCCESS,
  SET_DETAIL_DOKUMEN
} from "../actionTypes/modelActionTypes";

const INIT_STATE = {
  loading:'initial',
  kodeKantor:'',
  namaKantor:'',
  // npwp:'initial', 
  noAju:'initial',
  jenisDokumen:'initial',
  namaDokumen:'initial',
  taggalStart:'',
  listKode: [],
  listKantor: [],
  listDokumen: [],
  flagKuota: 'initial',
  // daftar dokumen
  daftardok: {
    idLartasHeader: 'initial',
    kodeDokumen: 'initial',
    noAju: 'initial',
    npwp: 'initial',
    namaPerusahaan: 'initial',
    waktuMulai: 'initial',
    namaDokumen: 'initial',
    namaEntitas: 'initial',
    idHeader: 'initial',
    npwpPemasok: 'initial',
    namaPemasok: 'initial',
    //dsa
    kodeNegaraPemasok: 'initial',
    namaNegaraPemasok: 'initial',
    nomorBc11: 'initial',
    namaKantorPanjang: 'initial',
    namaKantorPendek: 'initial',
    // baru lagiii
    nipAp: 'initial',
    kodeResult: 'initial',
    resultBy: 'initial',
    resultIp: 'initial',
    alamatPerusahaan: 'initial'
  },
  // ap
  ap:{
    errMsg:'',
    result:[],
    loading:'initial',
    kodeDokumen:'initial',
    // 
    //
    catatanList:[],
    currentProses:{},
    idLartasHeader:'initial',
    // saya tambahin
  }, 
  detailDokumen: {
    data: []
  },
  kuota: {
    loading: false,
    dataKuota: []
  },
  historiKuota: {
    data: []
  },
  dataDokumenAp: {
    userAp:'initial',
    waktuMulai:'initial',
    uraianBarang:'initial',
    uraianBarangLartas:'initial',
    kodeHs: 'initial',
    kdGa: 'initial',
    kodeIjin: 'initial',
    petugas: 'initial',
    referensiSkep: 'initial',
    approve: 'initial',
    approveBy: 'initial',
    idLartasDetail: 'initial',
    namaKementrianLembaga: 'initial',
    flagKuota: 'initial'
  },
  taggalEnd:'',
  daftarIzinLartas: {
    result: [],
    npwp: 'initial',
    loading: 'initial',
    kodeIjin: 'initial',
  },
  idIjin: {
    id: 'initial'
  },
  noIjin: 'initial',
  setIdIjin: false,
  historyKeputusan: {
    result: [],
    kodeHs: 'initial',
    kodeIjin: 'initial',
    npwp: 'initial',
    loading: 'initial',
  },
  rowSelection: [],
  dokumenLampiranList: {
    data: []
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TABLE_DATA: {
      const { kodeKantor, namaKantor,loading, taggalStart, taggalEnd,jenisDokumen, namaDokumen, npwp, noAju } = action
      return {
        ...state,
        ...action
      };
      break;
    }
    case SET_AP_FAILED: {
      const { errMsg } = action
      return {
        ...state,
        ap:{
          ...state.ap,
          loading:false,
          errMsg
        },
      };
      break;
    }
    case SET_AP_LOADING: {
      return {
        ...state,
        ap:{
          ...state.ap,
          loading:true,
        },
      };
      break;
    }
    case SET_AP_SUCCESS: {
      const { result, kodeDokumen, idLartasHeader } = action
      return {
        ...state,
        ap:{
          ...state.ap,
          loading:false,
          result,
          kodeDokumen,
          idLartasHeader
        },
      };
      break;
    }
    case SET_CATATAN_LIST: {
      const { catatanList } = action
      return {
        ...state,
        ap:{
          ...state.ap,
          catatanList
        },
      };
      break;
    }
    case SET_DETAIL_DOKUMEN: {
      const { data } = action
      return {
        ...state,
        detailDokumen:{
          ...state.ap,
          data
        },
      };
      break;
    }
    case SET_CURRENT_PROSES: {
      const { currentProses } = action
      return {
        ...state,
        ap:{
          ...state.ap,
          currentProses
        },
      };
      break;
    }
    case SET_DAFTAR_IZIN_LARTAS_FAILED: {
      const { errMsg } = action
      return {
        ...state,
        daftarIzinLartas: {
          ...state.daftarIzinLartas,
          loading: false,
          errMsg
        },
      };
      break;
    }
    case SET_DAFTAR_IZIN_LARTAS_LOADING: {
      const { errMsg } = action
      return {
        ...state,
        daftarIzinLartas: {
          ...state.daftarIzinLartas,
          loading: true
        },
      };
      break;
    }
    case SET_DAFTAR_IZIN_LARTAS_SUCCESS: {
      const { result, npwp, kodeIjin } = action
      return {
        ...state,
        daftarIzinLartas: {
          ...state.daftarIzinLartas,
          loading: false,
          result,
          npwp,
          kodeIjin
        },
      };
      break;
    }
    case SET_HISTORY_KEPUTUSAN_FAILED: {
      const { errMsg } = action
      return {
        ...state,
        historyKeputusan: {
          ...state.historyKeputusan,
          loading: false,
          errMsg
        },
      };
      break;
    }
    case SET_HISTORY_KEPUTUSAN_LOADING: {
      const { errMsg } = action
      return {
        ...state,
        historyKeputusan: {
          ...state.historyKeputusan,
          loading: true
        },
      };
      break;
    }
    case SET_HISTORY_KEPUTUSAN_SUCCESS: {
      const { result, kodeHs, kodeIjin, npwp } = action
      return {
        ...state,
        historyKeputusan: {
          ...state.historyKeputusan,
          loading: false,
          result,
          kodeHs,
          kodeIjin,
          npwp
        },
      };
      break;
    }
    default:
      return state;
  }
};


