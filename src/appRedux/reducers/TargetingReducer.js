import {
    GET_RULE_SET,
    SET_RULE_SET,
    SET_RULE_SET_DETAIL
} from "../actionTypes/modelActionTypes";

const INIT_STATE = {
    jenisKegiatan: '',
    tglBerlakuAwal: '',
    tglBerlakuAkhir: '',
    judulRuleset: '',
    keterangan: '',
    status: '',
    details: [
        {
            kd_elemen: '',
            nilai_elemen: '',
            jenis_ruleset: '',
        }
    ]
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_RULE_SET: {
            return {
                ...state,
                ruleSet: action.payload
            };
        }
        case SET_RULE_SET:
            return {
                ...state,
                jenisKegiatan: state.jenisKegiatan,
                tglBerlakuAwal: state.tglBerlakuAwal,
                tglBerlakuAkhir: state.tglBerlakuAkhir,
                judulRuleset: state.judulRuleset,
                keterangan: state.keterangan,
                status: state.jenisKegiatan,
                ruleSet: state.barangList.map(barang =>
                    barang.seqPib === action.payload.seqPib ? action.payload : barang
                )
            };

        case SET_RULE_SET_DETAIL:
            return {
                ...state,
                barangList: state["barangList"].filter(
                    barang => barang.seqPib !== action.payload
                ),
            };

        case STORE_BARANG:
            return {
                ...state,
                barangList: state["barangList"].concat([action.payload]),
                barang: []
            };

        case START_EDITING:
            return {
                ...state,
                editing: true,
                barang: action.payload
            };
        case END_EDITING:
            return {
                ...state,
                editing: false
            };

        default:
            return state;
    }
};
