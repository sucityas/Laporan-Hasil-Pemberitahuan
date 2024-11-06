import update from 'immutability-helper'
import {
    SET_HISTORI_EVALUASI,
    SET_PERIODE_PENILAIAN_KANTOR,
    SET_ID_PERUSAHAAN_SKEP_FASILITAS_KANTOR_PENILAIAN,
    SET_NO_SURAT_TUGAS,
    SET_TGL_SURAT_TUGAS,
    SET_NO_BERITA_ACARA,
    SET_TGL_BERITA_ACARA,
    SET_DETAIL_SKOR_FASILITAS, SET_LOADING_HISTORI, SET_LOADING_FORM
} from '../actionTypes/EvaluasiActionType'
import axios from "axios";
import { Redirect } from 'react-router-dom'
import {fetch_error} from ".";

export function getHistoriEvaluasi (id) {
    return (dispatch, store) => {
        var url = process.env.REACT_APP_SCE_WS + '/penilaian/histori-penilaian?id='+id;
        const options = {
            method: 'GET',
            url,
            headers: {
                'customs-api-key': process.env.REACT_APP_SECRET_KEY_SCE_WS
            }
            //data
        };
        dispatch({
            type: SET_LOADING_HISTORI,
            payload: true
        });
        axios(options)
            .then(function (response) {
                dispatch({
                    type: SET_LOADING_HISTORI,
                    payload: false
                });
                console.log(response.data.toString()!=="");
                if (response.data.toString()==="") {
                    dispatch({
                        type: SET_HISTORI_EVALUASI,
                        payload: null
                    });
                } else {
                    dispatch({
                        type: SET_HISTORI_EVALUASI,
                        payload: response.data
                    });
                }
            })
            .catch((error)=>{

                fetch_error(error,dispatch);

                dispatch({
                    type: SET_LOADING_HISTORI,
                    payload: false
                });

            });
    }
}

export function setNoSuratTugas (d) {
    return (dispatch, store) => {
        dispatch({
            type: SET_NO_SURAT_TUGAS,
            payload: d
        });
    }
}

export function setTglSuratTugas (d) {
    return (dispatch, store) => {
        dispatch({
            type: SET_TGL_SURAT_TUGAS,
            payload: d
        });
    }
}

export function setNoBeritaAcara (d) {
    return (dispatch, store) => {
        dispatch({
            type: SET_NO_BERITA_ACARA,
            payload: d
        });
    }
}

export function setTglBeritaAcara (d) {
    return (dispatch, store) => {
        dispatch({
            type: SET_TGL_BERITA_ACARA,
            payload: d
        });
    }
}

export function setSkorFasilitasDetail (detailSkorFasilitas) {
    return (dispatch, store) => {
        dispatch({
            type: SET_DETAIL_SKOR_FASILITAS,
            payload: detailSkorFasilitas
        });
    }
}

export function setLoadingForm (loading) {
    return (dispatch, store) => {
        dispatch({
            type: SET_LOADING_FORM,
            payload: loading
        });
    }
}

export function getKomponenSkorFasilitas (id) {
    return (dispatch, store) => {
        var url = process.env.REACT_APP_SCE_WS + '/penilaian/penilaian-berlangsung?id='+id;
        const options = {
            method: 'GET',
            url,
            headers: {
                'customs-api-key': process.env.REACT_APP_SECRET_KEY_SCE_WS
            }
            //data
        };
        dispatch({
            type: SET_LOADING_FORM,
            payload: true
        });
        dispatch({
            type: SET_DETAIL_SKOR_FASILITAS,
            payload: null
        });
        axios(options)
            .then(function (response) {

                console.log(response.data);

                dispatch({
                    type: SET_LOADING_FORM,
                    payload: false
                });

                dispatch({
                    type: SET_PERIODE_PENILAIAN_KANTOR,
                    payload: response.data.periodePenilaianKantor
                });

                dispatch({
                    type: SET_DETAIL_SKOR_FASILITAS,
                    payload: response.data.listDetailSkorFasilitas
                });

                dispatch({
                    type: SET_ID_PERUSAHAAN_SKEP_FASILITAS_KANTOR_PENILAIAN,
                    payload: response.data.skepFasilitasKantorPenilaian.idPerusahaanSkepFasilitasKantorPenilaian
                });
                dispatch({
                    type: SET_NO_SURAT_TUGAS,
                    payload: response.data.skepFasilitasKantorPenilaian.nomorSuratTugas
                });
                dispatch({
                    type: SET_TGL_SURAT_TUGAS,
                    payload: response.data.skepFasilitasKantorPenilaian.tanggalSuratTugas
                });
                dispatch({
                    type: SET_NO_BERITA_ACARA,
                    payload: response.data.skepFasilitasKantorPenilaian.nomorBeritaAcara
                });
                dispatch({
                    type: SET_TGL_BERITA_ACARA,
                    payload: response.data.skepFasilitasKantorPenilaian.tanggalBeritaAcara
                });
            })
            .catch((error)=>{

                fetch_error(error,dispatch);

                dispatch({
                    type: SET_LOADING_FORM,
                    payload: false
                });

            });
    }
}

export function setPenilaianKepalaKantor (response) {
    return (dispatch, store) => {
        dispatch({
            type: SET_LOADING_FORM,
            payload: false
        });

        dispatch({
            type: SET_PERIODE_PENILAIAN_KANTOR,
            payload: response.data.periodePenilaianKantor
        });

        dispatch({
            type: SET_DETAIL_SKOR_FASILITAS,
            payload: response.data.listDetailSkorFasilitas
        });

        dispatch({
            type: SET_ID_PERUSAHAAN_SKEP_FASILITAS_KANTOR_PENILAIAN,
            payload: response.data.skepFasilitasKantorPenilaian.idPerusahaanSkepFasilitasKantorPenilaian
        });
        dispatch({
            type: SET_NO_SURAT_TUGAS,
            payload: response.data.skepFasilitasKantorPenilaian.nomorSuratTugas
        });
        dispatch({
            type: SET_TGL_SURAT_TUGAS,
            payload: response.data.skepFasilitasKantorPenilaian.tanggalSuratTugas
        });
        dispatch({
            type: SET_NO_BERITA_ACARA,
            payload: response.data.skepFasilitasKantorPenilaian.nomorBeritaAcara
        });
        dispatch({
            type: SET_TGL_BERITA_ACARA,
            payload: response.data.skepFasilitasKantorPenilaian.tanggalBeritaAcara
        });
    }
}

export function savePenilaianKepalaKantor (dataPenilaian) {
    return (dispatch, store) => {
        var url = process.env.REACT_APP_SCE_WS + '/penilaian/save-penilaian';
        const options = {
            method: 'POST',
            url: url,
            data: dataPenilaian,
            headers: {
                'customs-api-key': process.env.REACT_APP_SECRET_KEY_SCE_WS
            }
        };
        dispatch({
            type: SET_LOADING_FORM,
            payload: true
        });
        axios(options)
            .then(function (response) {

                dispatch({
                    type: SET_LOADING_FORM,
                    payload: false
                });

                dispatch({
                    type: SET_PERIODE_PENILAIAN_KANTOR,
                    payload: response.data.periodePenilaianKantor
                });

                dispatch({
                    type: SET_DETAIL_SKOR_FASILITAS,
                    payload: response.data.listDetailSkorFasilitas
                });

                dispatch({
                    type: SET_ID_PERUSAHAAN_SKEP_FASILITAS_KANTOR_PENILAIAN,
                    payload: response.data.skepFasilitasKantorPenilaian.idPerusahaanSkepFasilitasKantorPenilaian
                });
                dispatch({
                    type: SET_NO_SURAT_TUGAS,
                    payload: response.data.skepFasilitasKantorPenilaian.nomorSuratTugas
                });
                dispatch({
                    type: SET_TGL_SURAT_TUGAS,
                    payload: response.data.skepFasilitasKantorPenilaian.tanggalSuratTugas
                });
                dispatch({
                    type: SET_NO_BERITA_ACARA,
                    payload: response.data.skepFasilitasKantorPenilaian.nomorBeritaAcara
                });
                dispatch({
                    type: SET_TGL_BERITA_ACARA,
                    payload: response.data.skepFasilitasKantorPenilaian.tanggalBeritaAcara
                });

            })
            .catch((error)=>{
                fetch_error(error,dispatch);
                dispatch({
                    type: SET_LOADING_FORM,
                    payload: false
                });

            });
    }
}

export function setIdPerusahaanSkepFasilitasKantorPenilaian (id) {
    return (dispatch, store) => {
        dispatch({
            type: SET_ID_PERUSAHAAN_SKEP_FASILITAS_KANTOR_PENILAIAN,
            payload: id
        });
    }
}

export default function evaluasi (state = {
    historiEvaluasi:null,
    periodePenilaianKantor:null,
    idPerusahaanSkepFasilitasKantorPenilaian:null,
    noSuratTugas: null,
    tglSuratTugas: null,
    noBeritaAcara: null,
    tglBeritaAcara: null,
    detailSkorFasilitas: [],
    loadingHistori: false,
    loadingForm: false
}, action) {
    switch (action.type) {
        case SET_HISTORI_EVALUASI:
            return update(state, {
                historiEvaluasi: {
                    $set: action.payload
                },
            });

        case SET_PERIODE_PENILAIAN_KANTOR:
            return update(state, {
                periodePenilaianKantor: {
                    $set: action.payload
                },
            });

        case SET_NO_SURAT_TUGAS:
            return update(state, {
                noSuratTugas: {
                    $set: action.payload
                },
            });

        case SET_ID_PERUSAHAAN_SKEP_FASILITAS_KANTOR_PENILAIAN:
            return update(state, {
                idPerusahaanSkepFasilitasKantorPenilaian: {
                    $set: action.payload
                },
            });

        case SET_TGL_SURAT_TUGAS:
            return update(state, {
                tglSuratTugas: {
                    $set: action.payload
                },
            });

        case SET_NO_BERITA_ACARA:
            return update(state, {
                noBeritaAcara: {
                    $set: action.payload
                },
            });

        case SET_TGL_BERITA_ACARA:
            return update(state, {
                tglBeritaAcara: {
                    $set: action.payload
                },
            });

        case SET_DETAIL_SKOR_FASILITAS:
            return update(state, {
                detailSkorFasilitas: {
                    $set: action.payload
                },
            });
        case SET_LOADING_HISTORI:
            return update(state, {
                loadingHistori: {
                    $set: action.payload
                },
            });
        case SET_LOADING_FORM:
            return update(state, {
                loadingForm: {
                    $set: action.payload
                },
            });
        default:
            return state
    }
}
