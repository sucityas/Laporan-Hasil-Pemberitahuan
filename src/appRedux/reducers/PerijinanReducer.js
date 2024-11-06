import {
    DELETE_BARANG,
    GET_ALL_IJIN,
    STORE_BARANG,
    UPDATE_BARANG,
    START_EDITING,
    END_EDITING
} from "../actionTypes/PerijinanActionTypes";

const INIT_STATE = {
    listIjin: [
        {
            seqIzin: 'blabla',
            uraianIzin: "uraian",
            npwp15: "1231564532154",
        }
    ],

};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_IJIN: {
            return {
                ...state,
                listIjin: action.payload
            };
        }


        default:
            return state;
    }
};

