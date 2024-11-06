import {
    DELETE_BARANG,
    SET_JENIS_NILAI_PRESENTASI,
    GET_HASIL_NILAI_PRESENTASI,
    STORE_BARANG,
    UPDATE_BARANG,
} from "../actionTypes/JenisNilaiPresentasiActionTypes";
import {GET_ALL_IJIN} from "../actionTypes/PerijinanActionTypes";


const INIT_STATE = {
    listHasilPresentasi: [
        {



idBaPresentasi: "",
    nilai: "",
    uraian: "",
        }
    ],

};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_HASIL_NILAI_PRESENTASI: {
            return {
                ...state,
                listHasilPresentasi: action.payload
            };
        }


        default:
            return state;
    }
};

