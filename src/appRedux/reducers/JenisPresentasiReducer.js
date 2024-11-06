import {
    DELETE_BARANG,
    GET_ALL_JENIS_NILAI_PRESENTASI,
    SET_JENIS_NILAI_PRESENTASI,
    GET_HASIL_NILAI_PRESENTASI,
    STORE_BARANG,
    UPDATE_BARANG,
} from "../actionTypes/modelActionTypes";
import {GET_ALL_IJIN} from "../actionTypes/PerijinanActionTypes";


const INIT_STATE = {
    listJenisPresentasi: [
        {

            idJenisNilaiPresentasi: "",
            jenisNilaiPresentasi: "",
            uraian: "",
        }
    ],

};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_JENIS_NILAI_PRESENTASI: {
            return {
                ...state,
                listJenisPresentasi: action.payload
            };
        }

        case SET_JENIS_NILAI_PRESENTASI:
            /**
             * Create a new array.
             */
            /**
             * Copy previous picture.
             */
            for (let y = 0; y < state.listJenisPresentasi.length; y++) {
                if (action.playload.id === state.listJenisPresentasi[y].idJenisNilaiPresentasi) {
                    state.listJenisPresentasi[y].value = action.playload.yesNo
                }
            }

            /**
             * Return new state.
             */
            return {
                ...state
            };

        default:
            return state;
    }
};

