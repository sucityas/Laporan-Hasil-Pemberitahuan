import {
  START_EDITING,
  GET_ALL_BARANG,
  DELETE_BARANG,
  STORE_BARANG,
  UPDATE_BARANG
} from "../actionTypes/modelActionTypes";
// import axios from "axios";
// axios
//   .get("10.102.104.198:13001/barang/1/10")
//   .then(json => console.log(json));

//use axios or not?
//if dev express use :http://10.102.104.191:8034/usulan/1/10
//if table row use : 10.102.104.198:13001/barang/1/10
let idCounter = 1;
export const onGetAllBarang = () => {
  return dispatch => {
    fetch("http://10.102.104.198:13001/barang/1/15")
      .then(res => res.json())
      .then(res => {
        console.log(res.data);
        dispatch({
          type: GET_ALL_BARANG,
          payload: res.data
        });
      });
  };
};

export const editCallback = barang => ({
  type: START_EDITING,
  payload: barang
});

export const saveBarang = barang => {
  return createSaveEvent(barang);
};

export const createSaveEvent = barang => {
  if (!barang.seqPib) {
    return {
      type: STORE_BARANG,
      payload: { ...barang, seqPib: idCounter++ }
    };
  } else {
    return {
      type: UPDATE_BARANG,
      payload: barang
    };
  }
};
export const deleteBarang = barang => ({
  type: DELETE_BARANG,
  payload: barang.seqPib
});