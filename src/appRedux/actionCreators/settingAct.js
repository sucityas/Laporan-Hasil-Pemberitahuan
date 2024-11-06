import {
  GET_DATA_HANGGAR_LOADING,
  GET_DATA_HANGGAR_SUCCESS,
  GET_DATA_HANGGAR_FAILED,
  GET_DATA_HANGGAR
} from "../actionTypes/modelActionTypes";

import axios from "axios";
import { settingUrl } from "../../apis/ApiData";

export const getDataHanggar = (
  idHanggar,
  kodeKantor,
  page
) => async dispatch => {
  dispatch({
    type: GET_DATA_HANGGAR_LOADING
  });
  try {
    // http://10.161.4.89:8080/setting/v1/get-hanggar?size=10&page=1&kodeKantor=020400
    const result = await axios.get(
      `${settingUrl}/get-hanggar?size=10${
        kodeKantor === "" || kodeKantor === undefined || kodeKantor === null
          ? ``
          : `&kodeKantor=${kodeKantor}`
      }&page=${page}`
    );
    dispatch({
      type: GET_DATA_HANGGAR_SUCCESS,
      result: result.data,
      kodeKantor: kodeKantor,
      page: page
    });
  } catch (e) {
    dispatch({
      type: GET_DATA_HANGGAR_FAILED,
      errMsg: e.message
    });
  }
};
