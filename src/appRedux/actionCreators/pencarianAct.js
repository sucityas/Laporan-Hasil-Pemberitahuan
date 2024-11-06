import {
    PRESS_LINK,
    CURRENT_DATA,
    LOADING_PAGE,
    GET_TABLE_DATA_CARI,
    SET_CARI_AP_FAILED,
    SET_CARI_AP_SUCCESS,
    SET_CARI_AP_LOADING,
  } from "../actionTypes/modelActionTypes";
  import axios from 'axios';
  import { apiUrl6 } from '../../apis/ApiData';

  export const pressLink  = value => {
    console.log('PRESSED LINK : ', value)
        return {
            type: PRESS_LINK,
            payload:value
        }
  };
  
  export const loadingPage = (data) => dispatch => {
    dispatch({
        type: LOADING_PAGE,
        payload:data
    });
  };
  
  export const currentData  = (data) => dispatch => {
    dispatch({
       type: CURRENT_DATA,
       payload:data
    })
  };
  
  export const pressCari  = (value) => dispatch => {
    console.log('PRESSED LINK : ', value)
    dispatch({
        type: GET_TABLE_DATA_CARI,
        payload:value
    }) 
  
  };

  export const setCariApAction  = (kodeDokumen, idLartasHeader, page, size) => async dispatch => {
    dispatch({
        type: SET_CARI_AP_LOADING,
    })
    try {
      const result = await axios.get(`${apiUrl6}/daftar-barang-keputusan-ap/${idLartasHeader}?page=${page}&results=${size}&sortOrder=descend`);
      console.log(idLartasHeader,'idLartasHeader reduceer')
      dispatch({
        type: SET_CARI_AP_SUCCESS,
        result: result.data,
        kodeDokumen,
        idLartasHeader
      })
    } catch(e) {
        dispatch({
          type: SET_CARI_AP_FAILED,
          errMsg:e.response ? e.response.data : e 
        })
    }
  };