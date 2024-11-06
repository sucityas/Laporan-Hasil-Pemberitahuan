import {
    START_EDITING,
    GET_ALL_JENIS_NILAI_PRESENTASI,
    SET_JENIS_NILAI_PRESENTASI,
    GET_HASIL_NILAI_PRESENTASI
} from "../actionTypes/modelActionTypes";

let idCounter = 1;
let seqIzin = window.localStorage.getItem('seqIzin');


export const ongetAllTrJenisNilaiPresentasi = () => {
    return dispatch => {
        fetch(`http://10.102.104.163:8383/v1/izinFasilitas/` + seqIzin, {
            mode: 'cors',
            header: {'accept': 'application/json', 'Access-Control-Allow-Origin': '*'},
        })
            .then(response => response.json())
            .then(body => {

                // if (body.data != null) {
                    // if (body.data.kodeJenisDetilFasilitas==null) {
                        console.log('data kode jenis fasilitas : ', body.data.kodeJenisFasilitas)
                        fetch("http://10.102.104.163:8383/v1/und_presentasi/getAllTrJenisNilaiPresentasi/" + body.data.kodeJenisFasilitas)
                            .then(res => res.json())
                            .then(res => {
                                dispatch({
                                    type: GET_ALL_JENIS_NILAI_PRESENTASI,
                                    payload: res.data
                                });
                            });
                    // }
                    // else {
                    //     console.log('data kode jenis detil fasilitas: ', body.data.kodeJenisDetilFasilitas)
                    //     fetch("http://10.102.104.163:8383/v1/und_presentasi/getAllTrJenisNilaiPresentasi/" + body.data.kodeJenisDetilFasilitas)
                    //         .then(res => res.json())
                    //         .then(res => {
                    //             dispatch({
                    //                 type: GET_ALL_JENIS_NILAI_PRESENTASI,
                    //                 payload: res.data
                    //             });
                    //         });
                    // }
                // }
            });


    };
};


export const onGetHasilNilaiPresentasi = () => {
    return dispatch => {
        fetch("http://10.102.104.163:8383/v1/und_presentasi/getHasilNilaiPresentasi")
            .then(res => res.json())
            .then(res => {
                dispatch({
                    type: GET_HASIL_NILAI_PRESENTASI,
                    payload: res.data
                });
            });
    };
};
export const setValueJenisNilaiPresentasi = (data) => ({
    type: SET_JENIS_NILAI_PRESENTASI,
    playload: data
});

export const editCallback = ijin => ({
    type: START_EDITING,
    payload: ijin
});


