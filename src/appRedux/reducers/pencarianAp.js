import {
  GET_TABLE_DATA_CARI,
  SET_CARI_AP_FAILED,
  SET_CARI_AP_SUCCESS,
  SET_CARI_AP_LOADING
} from "../actionTypes/modelActionTypes";

const INIT_STATE = {
  loading: "",
  Dokumen: {
    loading: "",
    kodeKantor: "",
    namaKantor: "",
    jenisDokumen: "",
    tanggalStart: "",
    tanggalEnd: "",
    listKode: "",
    listKantor: "",
    listDokumen: "",
    dataDokumen: [],
    statusAp: ""
  },
  dataPencarian: [],
  cariAp: {
    result: [],
    loading: "",
    kodeDokumen: "",
    idLartasHeader: ""
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TABLE_DATA_CARI: {
      const {
        kodeKantor,
        namaKantor,
        loading,
        taggalStart,
        taggalEnd,
        jenisDokumen,
        namaDokumen,
        npwp,
        noAju
      } = action;
      return {
        ...state,
        ...action
      };
      break;
    }
    case SET_CARI_AP_FAILED: {
      const { errMsg } = action;
      return {
        ...state,
        cariAp: {
          ...state.cariAp,
          loading: false,
          errMsg
        }
      };
      break;
    }
    case SET_CARI_AP_LOADING: {
      // console.log(state, 'INI PAS LAGI LOADING')
      return {
        ...state,
        cariAp: {
          ...state.cariAp,
          loading: true
        }
      };
      break;
    }
    case SET_CARI_AP_SUCCESS: {
      const { result, kodeDokumen, idLartasHeader } = action;
      // console.log(state, 'INI PAS LAGI SUKSES')
      return {
        ...state,
        cariAp: {
          ...state.cariAp,
          loading: false,
          result,
          kodeDokumen,
          idLartasHeader
        }
      };
      break;
    }
    default:
      return state;
  }
};
