import {
  START_EDITING,
    GET_ALL_IJIN,
    GET_ALL_JENIS_NILAI_PRESENTASI,
} from "../actionTypes/PerijinanActionTypes";

let idCounter = 1;
// export const onGetAllViewListIjin = () => {
//         return dispatch => {
//             fetch("http://10.102.104.73:8383/v1/und_presentasi/getAllViewListIjin")
//                 .then(res => res.json())
//                 .then(res => {
//                     console.log(res.data);
//                     dispatch({
//                         type: GET_ALL_IJIN,
//                         payload: res.data
//                     });
//                 });
//         };
// };

// export const ongetAllTrJenisNilaiPresentasi = () => {
//     return dispatch => {
//         fetch("http://10.102.104.73:8383/v1/und_presentasi/getAllTrJenisNilaiPresentasi")
//             .then(res => res.json())
//             .then(res => {
//                 console.log(res.data);
//                 dispatch({
//                     type: GET_ALL_JENIS_NILAI_PRESENTASI,
//                     payload: res.data
//                 });
//             });
//     };
// };

export const editCallback = ijin => ({
  type: START_EDITING,
  payload: ijin
});


