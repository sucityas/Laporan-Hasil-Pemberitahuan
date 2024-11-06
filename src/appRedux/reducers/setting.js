import {
  GET_DATA_HANGGAR_LOADING,
  GET_DATA_HANGGAR_SUCCESS,
  GET_DATA_HANGGAR_FAILED,
  GET_DATA_HANGGAR,
  SET_DATA_PERUSAHAAN_SELECTED
} from "../actionTypes/modelActionTypes";

const initState = {
  dataHanggar: {
    result: [],
    loading: "initial",
    errMsg: "",
    dataPerusahaanSelected: "intial",
    kodeKantor: "",
    page: 1
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_DATA_HANGGAR_FAILED: {
      const { errMsg } = action;
      return {
        ...state,
        dataHanggar: {
          ...state.dataHanggar,
          loading: false,
          errMsg
        }
      };
      break;
    }
    case GET_DATA_HANGGAR_LOADING: {
      return {
        ...state,
        dataHanggar: {
          ...state.dataHanggar,
          loading: true
        }
      };
      break;
    }
    case GET_DATA_HANGGAR_SUCCESS: {
      const { result, kodeKantor, page } = action;
      return {
        ...state,
        dataHanggar: {
          ...state.dataHanggar,
          loading: false,
          result,
          kodeKantor,
          page
        }
      };
      break;
    }
    case SET_DATA_PERUSAHAAN_SELECTED: {
      // const { selected } = action
      return {
        ...state,
        ...action
      };
      break;
    }
    default:
      return state;
  }
};
