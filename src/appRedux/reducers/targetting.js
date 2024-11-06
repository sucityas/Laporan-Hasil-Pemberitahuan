import update from 'immutability-helper';
import qs from 'qs';
import axios from 'axios';
import ref_all from './targetting/ref_all';
import details from './targetting/details';

import {fetch_error} from './index';
// import {
//     GET_RULESET,
//     SET_RULESET,
//     SET_RULESET_DETAIL,
// } from "../actionTypes/modelActionTypes";


export function getAllRulesetTargetting () { //done

    return (dispatch, store) => {



    }

}




export function getAllRulesetElemen(kdAplikasi) {
    return (dispatch, store) => {
        var url = '';
        var data = {};

        if(kdAplikasi){
            data.kdAplikasi = kdAplikasi;
        }

        url += "?"+qs.stringify(data);

        const options = {
            method: 'GET',
            url,
            //data
        };

        dispatch({
            type: 'SET_LOADING_ELEMEN',
            payload: true
        });

        axios(options)
            .then(function (response) {

                console.log(response.data);

                dispatch({
                    type: 'SET_LOADING_ELEMEN',
                    payload: false
                });

                dispatch({
                    type: 'SET_JENIS_ELEMEN',
                    payload: response.data
                });

            })
            .catch((error)=>{

            fetch_error(error,dispatch);

        dispatch({
            type: 'SET_LOADING_ELEMEN',
            payload: false
        });

    });
    }

}

export function getAllJenisKegiatan() {
    return (dispatch, store) => {
        var url = '';
        var data = {};
        const options = {
            method: 'GET',
            url,
            //data
        };

        dispatch({
            type: 'SET_LOADING_RULESET',
            payload: true
        });

        axios(options)
            .then(function (response) {

                console.log(response.data);

                dispatch({
                    type: 'SET_LOADING_RULESET',
                    payload: false
                });

                dispatch({
                    type: 'SET_JENIS_KEGIATAN',
                    payload: response.data
                });

            })
            .catch((error)=>{

            fetch_error(error,dispatch);

        dispatch({
            type: 'SET_LOADING_RULESET',
            payload: false
        });

    });
    }
}

export function getReferensiElemen(service, rulesetName){
    return (dispatch, store) => {
        var url = '';
        var data = {};
        const options = {
            method: 'GET',
            url,
            //data
        };

        dispatch({
            type: 'SET_LOADING_RULESET',
            payload: true
        });

        axios(options)
            .then(function (response) {

                console.log(response.data);

                dispatch({
                    type: 'SET_LOADING_RULESET',
                    payload: false
                });

                dispatch({
                    type: 'SET_JENIS_KEGIATAN',
                    payload: response.data
                });

            })
            .catch((error)=>{

            fetch_error(error,dispatch);

        dispatch({
            type: 'SET_LOADING_RULESET',
            payload: false
        });

    });
    }
}

export function setDetilRuleset(ruleset) {
    return (dispatch, store) => {
        //console.log('ini reducer'+ruleset.toString());
        dispatch({
            type: 'SET_DETIL_RULESET',
            payload: ruleset
        });
    }
}

export function setReferensi(referensi) {
    return (dispatch, store) => {
        //console.log('ini setReferensi'+referensi.toString());
        dispatch({
            type: 'SET_REFERENSI',
            payload: referensi
        });
    }
}


export function  setJnsKegiatan(jenis_kegiatan) {
    return (dispatch, store) => {
        //console.log('ini header'+header.toString());
        dispatch({
            type: 'SET_JNS_KEGIATAN',
            payload: jenis_kegiatan
        });
    }
}

export function setDokumenDasar(dokumen) {
    return (dispatch, store) => {
        //console.log('ini setReferensi'+referensi.toString());
        dispatch({
            type: 'SET_DOKUMEN_DASAR',
            payload: dokumen
        });
    }
}

export function  setSelectJnsKegiatan(selectJenisKegiatan) {
    return (dispatch, store) => {
        //console.log('ini header'+header.toString());
        dispatch({
            type: 'SET_SELECT_JNS_KEGIATAN',
            payload: selectJenisKegiatan
        });
    }
}

export function  setKdAplikasi(kdAplikasi) {
    return (dispatch, store) => {
        dispatch({
            type: 'SET_KD_APLIKASI',
            payload: kdAplikasi
        });
    }
}

export function  setTglBerlakuAwal(tglBerlakuAwal) {
    return (dispatch, store) => {
        dispatch({
            type: 'SET_TGL_AWAL',
            payload: tglBerlakuAwal
        });
    }
}

export function  setTglBerlakuAkhir(tglBerlakuAkhir) {
    return (dispatch, store) => {
        dispatch({
            type: 'SET_TGL_AKHIR',
            payload: tglBerlakuAkhir
        });
    }
}

export function  setJudulRuleset(judulRuleset) {
    return (dispatch, store) => {
        dispatch({
            type: 'SET_JUDUL_RULESET',
            payload: judulRuleset
        });
    }
}

export function  setKeterangan(keterangan) {
    return (dispatch, store) => {
        dispatch({
            type: 'SET_KETERANGAN',
            payload: keterangan
        });
    }
}

export function  setStatus(status) {
    return (dispatch, store) => {
        dispatch({
            type: 'SET_STATUS',
            payload: status
        });
    }
}

export function  setNipRekam(nipRekam) {
    return (dispatch, store) => {
        dispatch({
            type: 'SET_NIP_REKAM',
            payload: nipRekam
        });
    }
}

export function  setKdProses(kdProses) {
    return (dispatch, store) => {
        dispatch({
            type: 'SET_KD_PROSES',
            payload: kdProses
        });
    }
}

export function  setKdKantorRekam(kdKantorRekam) {
    return (dispatch, store) => {
        dispatch({
            type: 'SET_KD_KANTOR_REKAM',
            payload: kdKantorRekam
        });
    }
}

export function saveRulesetData (dataRuleset) {
    return (dispatch, store) => {
        var url = 'http://10.102.104.170:8188/sce/targetting/saveRuleset';
        const options = {
            method: 'POST',
            url: url,
            data: dataRuleset
        };
        axios(options)
            .then(function (response) {
                dispatch({
                    type: 'SET_DETIL_RULESET',
                    payload: []
                });

                alert(" save data");

            })
            .catch((error)=>{
            fetch_error(error,dispatch);
        alert("Gagal save data");
        // dispatch({
        //     type: SET_LOADING_FORM,
        //     payload: false
        // });
    });
    }
}

export default function targetting (state = {
    form_ruleset:null,
    //header_ruleset: header_ruleset,
    jenis_kegiatan : "",
    selectJenisKegiatan: false,
    kdAplikasi : "",
    tglBerlakuAwal: "",
    tglBerlakuAkhir: "",
    judulRuleset: "",
    keterangan: "",
    status: "",
    nipRekam :"",
    kdProses : "",
    kdKantorRekam : "",
    dokumenDasar : "",
    detil_ruleset: [],
    ref_all : ref_all,
    targetting_data : null,
    //current_data : details,
    ruleset_elemen : null,
    referensi : [],
    response:null,
    success: false,
    loading: false,
}, action) {
    switch (action.type) {
        case 'SET_JNS_KEGIATAN' : {
            return {
                ...state,
                jenis_kegiatan : action.payload
        }
        }

        case 'SET_SELECT_JNS_KEGIATAN' : {
            return {
                ...state,
                selectJenisKegiatan : action.payload
        }
        }

        case 'SET_KD_APLIKASI' : {
            return {
                ...state,
                kdAplikasi : action.payload
        }
        }

        case 'SET_DOKUMEN_DASAR' : {
            return {
                ...state,
                dokumenDasar : action.payload
        }
        }

        case 'SET_TGL_AWAL' : {
            return {
                ...state,
                tglBerlakuAwal : action.payload
        }
        }

        case 'SET_TGL_AKHIR' : {
            return {
                ...state,
                tglBerlakuAkhir : action.payload
        }
        }

        case 'SET_JUDUL_RULESET' : {
            return {
                ...state,
                judulRuleset : action.payload
        }
        }

        case 'SET_KETERANGAN' : {
            return {
                ...state,
                keterangan : action.payload
        }
        }

        case 'SET_STATUS' : {
            return {
                ...state,
                status : action.payload
        }
        }

        case 'SET_NIP_REKAM' : {
            return {
                ...state,
                nipRekam : action.payload
        }
        }

        case 'SET_KD_PROSES' : {
            return {
                ...state,
                kdProses : action.payload
        }
        }

        case 'SET_KD_KANTOR_REKAM' : {
            return {
                ...state,
                kdKantorRekam : action.payload
        }
        }

        case 'SET_REFERENSI' : {
            return {
                ...state,
                referensi : action.payload
        }
        }

        case 'SET_DETIL_RULESET' : {
            return {
                ...state,
                detil_ruleset : action.payload
        }
        }

        case 'UPDATE_DETIL_RULESET' : {
            // return {
            //     ...state,
            //     detil_ruleset : action.payload
            // }
            return state.map((item, index) => {
                // Find the item with the matching id
                if(item.id_elemen === action.payload.id_elemen) {
                // Return a new object
                return {
                    ...item,  // copy the existing item
                    kd_elemen: action.payload.newKdElemen  // replace the email addr
            }
            }

            // Leave every other item unchanged
            return item;
        });
        }


        // case SET_RULESET_DETAIL:
        //     return {
        //         ...state,
        //         header_ruleset: state["detil"].filter(
        //             details => details.kd_elemen !== action.payload
        //         ),
        //     };

        // case 'GET_RULESET_INPUT':
        //     return update(state, {
        //         detil_ruleset: {
        //             $set: action.payload
        //         },
        //
        //     })
        //     })

        case 'GET_JENIS_KEGIATAN':

            return update(state, {
                jenis_kegiatan: {
                    $set: action.payload
                },

            })

        case 'SET_DETAIL_RULESET':
            return {
                ...state,
                details: state.details
    };

    // case 'UPDATE_RULESET':
    //     return {
    //         ...state,
    //         barangList: state.barangList.map(barang =>
    //             barang.seqPib === action.payload.seqPib ? action.payload : barang
    //         ),
    //         barang: []
    //     };
    //
    // case 'DELETE_RULESET':
    //     return {
    //         ...state,
    //         barangList: state["barangList"].filter(
    //             barang => barang.seqPib !== action.payload
    //         ),
    //     };
    //
    // case 'STORE_RULESET':
    //     return {
    //         ...state,
    //         barangList: state["barangList"].concat([action.payload]),
    //         barang: []
    //     };

default:
    return state;
}
};
