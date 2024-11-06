import update from 'immutability-helper'
import qs from 'qs'
import axios from 'axios'
import _ from 'lodash'
import * as moment from 'moment';

import $ from "jquery";
//perekaman
import daftar_detil from './dummy_lhp/daftar_detil'
import bap from './dummy_lhp/bap'
import memo_barang from './dummy_lhp/memo_barang'
import referensi_detail from './dummy_lhp/referensi_detail'
//perekaman intruksi_pemeriksaan 
import browse from './dummy_lhp/browse'
import memo_pemeriksaan from './dummy_lhp/memo_pemeriksaan'
import info_perintah_lorong from './dummy_lhp/info_perintah_lorong'
import kontainer_tambah from './dummy_lhp/kontainer_tambah'
import kontainer_periksa from './dummy_lhp/kontainer_periksa'
import submit_rekam_detail from './dummy_lhp/submit_rekam_detail'
import simpan_kontainer from './dummy_lhp/simpan_kontainer'
import delete_hdfs_foto_kontainer from './dummy_lhp/delete_hdfs_foto_kontainer'
import delete_hdfs_foto_pemeriksaan from './dummy_lhp/delete_hdfs_foto_pemeriksaan'
//pencarian
import submit_rekam_bap from './dummy_lhp/submit_rekam_bap'
import submit_hapus_lhp_perintah_lorong from './dummy_lhp/submit_hapus_lhp_perintah_lorong'
import submit_upload_foto_kontainer from './dummy_lhp/submit_upload_foto_kontainer'
import submit_upload_foto_hdfs from './dummy_lhp/submit_upload_foto_hdfs'
import submit_update_rekam_bap from './dummy_lhp/submit_update_rekam_bap'
import upload_foto_hdfs from './dummy_lhp/upload_foto_hdfs'
import submit_kirim_bap from './dummy_lhp/submit_kirim_bap'
//bap pencarian
import delete_hdfs_foto from './dummy_lhp/delete_hdfs_foto'
import browse_dokumen from './dummy_lhp/browse_dokumen'
import detail_kontainer_dokumen from './dummy_lhp/detail_kontainer_dokumen'
import header_dokumen from './dummy_lhp/header_dokumen'
import waktu_pemeriksaan from './dummy_lhp/waktu_pemeriksaan'
import submit_simpan_lhp_perintah_lorong from './dummy_lhp/submit_simpan_lhp_perintah_lorong'
import instruksi_pemeriksaan from './dummy_lhp/instruksi_pemeriksaan'

import view_lhp_bap from './dummy_lhp/view_lhp_bap'
import view_lhp_detail from './dummy_lhp/view_lhp_detail'

import { fetch_error } from './index';

const headers = {
  'Content-Type': 'application/json',
  'beacukai-api-key': 'aff43b81-bae4-4bc4-bbb8-8acb6475fa3d',
};

export function submitSimpanLhpPerintahLorongLHP(d = {}) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/simpan-lhp-perintah-lorong';

    var data = {};

    if (d.alasanTidakPerintahLorong) {
      data.alasanTidakPerintahLorong = d.alasanTidakPerintahLorong;
    } else {
      data.alasanTidakPerintahLorong = "";
    }

    if (d.idLhpPerintahLorong) {
      data.idLhpPerintahLorong = d.idLhpPerintahLorong;
    } else {
      data.idLhpPerintahLorong = "";
    }

    if (d.kodePerintahLorong) {
      data.kodePerintahLorong = d.kodePerintahLorong;
    } else {
      data.kodePerintahLorong = "";
    }

    if (d.pelaksanaanPerintahLorong) {
      data.pelaksanaanPerintahLorong = d.pelaksanaanPerintahLorong;
    } else {
      data.pelaksanaanPerintahLorong = "";
    }

    const options = {
      method: 'POST',
      url,
      headers,
      data
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_SUBMIT_SIMPAN_LHP_PERINTAH_LORONG_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_SUBMIT_SIMPAN_LHP_PERINTAH_LORONG_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function submitHapusLhpPerintahLorongLHP(idLhpPerintahLorong) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/hapus-lhp-perintah-lorong';

    var data = {};

    if (idLhpPerintahLorong) {
      data.idLhpPerintahLorong = idLhpPerintahLorong;
    } else {
      data.idLhpPerintahLorong = "";
    }

    const options = {
      method: 'POST',
      url,
      headers,
      data
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_SUBMIT_HAPUS_LHP_PERINTAH_LORONG_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_SUBMIT_HAPUS_LHP_PERINTAH_LORONG_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}


export function simpanKontainer (d) { // 20191104

  return (dispatch, store) => {

    var data = {};

    if(d.nomorKontainer){
      data.nomorKontainer = d.nomorKontainer;
    } else {
      data.nomorKontainer = "";
    }

    if(d.ukuranKontainer){
      data.ukuranKontainer = d.ukuranKontainer;
    } else {
      data.ukuranKontainer = "";
    }

    if(d.idHeader){
      data.idHeader = d.idHeader;
    }else {
      data.idHeader = "";
    }

    if(d.idKontainer){
      data.idKontainer = d.idKontainer;
    } else {
      data.idKontainer = "";
    }



var url = process.env.REACT_APP_LHP_API_URL+'/simpan-kontainer';

const options = {
  method: 'POST',
  url,
  headers,
  data
};

dispatch({
  type: 'SET_LOADING_LHP',
  payload: true
});

dispatch({  
  type: 'SET_VALIDATION',
  payload: []
})

if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_LHP',
          payload: false
        })
        dispatch({
          type: 'SET_SIMPAN_KONTAINER',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_LHP',
          payload: false
        })
      })

    } else{

var xhr = new XMLHttpRequest();

xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function(){

  if (this.readyState === 4) {

    if(this.status == 200 || this.status == 201){

      var response = JSON.parse(this.responseText);
      console.log(response);

      dispatch({
        type: 'SET_LOADING_LHP',
        payload: false
      })
      dispatch({
        type: 'SET_SIMPAN_KONTAINER',
        payload: response
      })

    } else {

      fetch_error(this.responseText, dispatch)

      dispatch({
        type: 'SET_LOADING_LHP',
        payload: false
      })

    }

  }

});

xhr.open(options.method, url);

Object.keys(options.headers).forEach(function(key) {
  xhr.setRequestHeader(key, options.headers[key]);
});

xhr.send(JSON.stringify(options.data));

}

}

}


export function submitRekamDetailLHP (d) { // 20191104

  return (dispatch, store) => {

    var data = {};

    if (d.asalBarang) {
      data.asalBarang = d.asalBarang;
    } else {
      data.asalBarang = "";
    }

    if (d.asalNegaraBarang) {
      data.asalNegaraBarang = d.asalNegaraBarang;
    } else {
      data.asalNegaraBarang = "";
    }

    // if(d.catatan){
    //   data.catatan = d.catatan;
    // } else {
    //   data.catatan = "";
    // }

    // if(d.flagAmbil){
    //   data.flagAmbil = d.flagAmbil;
    // } else {
    //   data.flagAmbil = "";
    // }

    if (d.fotoLhpBarang) {
      data.fotoLhpBarang = d.fotoLhpBarang;
    } else {
      data.fotoLhpBarang = [
        {
          // idLhpDetail: "",
          // idLhpFoto: "",
          idLhpFoto: "",
        }
      ];
    }

    // if(d.idHeader){
    //   data.idHeader = d.idHeader;
    // } else {
    //   data.idHeader = "";
    // }

    // if(d.idLhpDetail){
    //   data.idLhpDetail = d.idLhpDetail;
    // } else {
    //   data.idLhpDetail = "";
    // }

    // if(d.idLhpDetailKemasan){
    //   data.idLhpDetailKemasan = d.idLhpDetailKemasan;
    // } else {
    //   data.idLhpDetailKemasan = "";
    // }

    // if(d.idLhpDetailSpesifikasi){
    //   data.idLhpDetailSpesifikasi = d.idLhpDetailSpesifikasi;
    // } else {
    //   data.idLhpDetailSpesifikasi = "";
    // }

    if (d.idLhpHeader) {
      data.idLhpHeader = d.idLhpHeader;
    } else {
      data.idLhpHeader = "";
    }

    // if(d.idProses){
    //   data.idProses = d.idProses;
    // } else {
    //   data.idProses = "";
    // }

    // if(d.idProsesStatus){
    //   data.idProsesStatus = d.idProsesStatus;
    // } else {
    //   data.idProsesStatus = "";
    // }

    if (d.jumlahKemasan) {
      data.jumlahKemasan = d.jumlahKemasan;
    } else {
      data.jumlahKemasan = "";
    }

    if (d.jumlahSatuan) {
      data.jumlahSatuan = d.jumlahSatuan;
    } else {
      data.jumlahSatuan = "";
    }

    if (d.keteranganTambahan) {
      data.keteranganTambahan = d.keteranganTambahan;
    } else {
      data.keteranganTambahan = "";
    }

    if (d.kodeJenisKemasan) {
      data.kodeJenisKemasan = d.kodeJenisKemasan;
    } else {
      data.kodeJenisKemasan = "";
    }

    if (d.kodeJenisSatuan) {
      data.kodeJenisSatuan = d.kodeJenisSatuan;
    } else {
      data.kodeJenisSatuan = "";
    }

    if (d.kondisiBarang) {
      data.kondisiBarang = d.kondisiBarang;
    } else {
      data.kondisiBarang = "";
    }

    // if(d.latitude){
    //   data.latitude = parseFloat(d.latitude);
    // } else {
    //   data.latitude = "";
    // }

    if (d.lebarKemasan) {
      data.lebarKemasan = d.lebarKemasan;
    } else {
      data.lebarKemasan = "";
    }

    // if(d.longitude){
    //   data.longitude = parseFloat(d.longitude);
    // } else {
    //   data.longitude = "";
    // }

    if (d.merk) {
      data.merk = d.merk;
    } else {
      data.merk = "";
    }

    if (d.model) {
      data.model = d.model;
    } else {
      data.model = "";
    }

    // if(d.nipMulai){
    //   data.nipMulai = d.nipMulai;
    // } else {
    //   data.nipMulai = "";
    // }

    // if(d.nipSelesai){
    //   data.nipSelesai = d.nipSelesai;
    // } else {
    //   data.nipSelesai = "";
    // }

    if (d.panjangKemasan) {
      data.panjangKemasan = d.panjangKemasan;
    } else {
      data.panjangKemasan = "";
    }

    if (d.seriBarang) {
      data.seriBarang = d.seriBarang;
    } else {
      data.seriBarang = "";
    }

    if (d.tinggiKemasan) {
      data.tinggiKemasan = d.tinggiKemasan;
    } else {
      data.tinggiKemasan = "";
    }

    if (d.type) {
      data.type = d.type;
    } else {
      data.type = "";
    }

    if (d.ukuranKemasan) {
      data.ukuranKemasan = d.ukuranKemasan;
    } else {
      data.ukuranKemasan = "";
    }

    if (d.uraianBarang) {
      data.uraianBarang = d.uraianBarang;
    } else {
      data.uraianBarang = "";
    }

    if (d.kodeKapasitas) {
      data.kodeKapasitas = d.kodeKapasitas;
    } else {
      data.kodeKapasitas = "";
    }

    if (d.kapasitas) {
      data.kapasitas = d.kapasitas;
    } else {
      data.kapasitas = "";
    }

    // if(d.waktuMulai){
    //   data.waktuMulai = moment(d.waktuMulai).format("DD-MM-YYYY");
    // } else {
    //   data.waktuMulai = moment().format("DD-MM-YYYY");
    // }

    // if(d.waktuRekamLhp){
    //   data.waktuRekamLhp = moment(d.waktuRekamLhp).format("DD-MM-YYYY");
    // } else {
    //   data.waktuRekamLhp = moment().format("DD-MM-YYYY");
    // }

    // if(d.waktuSelesai){
    //   data.waktuSelesai = moment(d.waktuSelesai).format("DD-MM-YYYY");
    // } else {
    //   data.waktuSelesai = moment().format("DD-MM-YYYY");
    // }

    var url = process.env.REACT_APP_LHP_API_URL + '/rekam-detail-lhp';

    const options = {
      method: 'POST',
      url,
      headers,
      data
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_SUBMIT_REKAM_DETAIL_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_SUBMIT_REKAM_DETAIL_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function submitDetailLhp(d) { // 20191104

  return (dispatch, store) => {

    var data = {};

    if (d.asalBarang) {
      data.asalBarang = d.asalBarang;
    } else {
      data.asalBarang = "";
    }

    if (d.asalNegaraBarang) {
      data.asalNegaraBarang = d.asalNegaraBarang;
    } else {
      data.asalNegaraBarang = "";
    }

    // if(d.catatan){
    //   data.catatan = d.catatan;
    // } else {
    //   data.catatan = "";
    // }

    // if(d.flagAmbil){
    //   data.flagAmbil = d.flagAmbil;
    // } else {
    //   data.flagAmbil = "";
    // }

    if (d.fotoLhpBarang) {
      data.fotoLhpBarang = d.fotoLhpBarang;
    } else {
      data.fotoLhpBarang = [
        {
          // idLhpDetail: "",
          // idLhpFoto: "",
          idLhpFoto: "",
        }
      ];
    }

    if (d.idHeader) {
      data.idHeader = d.idHeader;
    } else {
      data.idHeader = "";
    }

    // if(d.idLhpDetail){
    //   data.idLhpDetail = d.idLhpDetail;
    // } else {
    //   data.idLhpDetail = "";
    // }

    // if(d.idLhpDetailKemasan){
    //   data.idLhpDetailKemasan = d.idLhpDetailKemasan;
    // } else {
    //   data.idLhpDetailKemasan = "";
    // }

    // if(d.idLhpDetailSpesifikasi){
    //   data.idLhpDetailSpesifikasi = d.idLhpDetailSpesifikasi;
    // } else {
    //   data.idLhpDetailSpesifikasi = "";
    // }

    if (d.idLhpHeader) {
      data.idLhpHeader = d.idLhpHeader;
    } else {
      data.idLhpHeader = "";
    }

    // if(d.idProses){
    //   data.idProses = d.idProses;
    // } else {
    //   data.idProses = "";
    // }

    // if(d.idProsesStatus){
    //   data.idProsesStatus = d.idProsesStatus;
    // } else {
    //   data.idProsesStatus = "";
    // }

    if (d.jumlahKemasan) {
      data.jumlahKemasan = d.jumlahKemasan;
    } else {
      data.jumlahKemasan = "";
    }

    if (d.jumlahSatuan) {
      data.jumlahSatuan = d.jumlahSatuan;
    } else {
      data.jumlahSatuan = "";
    }

    if (d.keteranganTambahan) {
      data.keteranganTambahan = d.keteranganTambahan;
    } else {
      data.keteranganTambahan = "";
    }

    if (d.kodeJenisKemasan) {
      data.kodeJenisKemasan = d.kodeJenisKemasan;
    } else {
      data.kodeJenisKemasan = "";
    }

    if (d.kodeJenisSatuan) {
      data.kodeJenisSatuan = d.kodeJenisSatuan;
    } else {
      data.kodeJenisSatuan = "";
    }

    if (d.kondisiBarang) {
      data.kondisiBarang = d.kondisiBarang;
    } else {
      data.kondisiBarang = "";
    }

    // if(d.latitude){
    //   data.latitude = parseFloat(d.latitude);
    // } else {
    //   data.latitude = "";
    // }

    if (d.lebarKemasan) {
      data.lebarKemasan = d.lebarKemasan;
    } else {
      data.lebarKemasan = "";
    }

    // if(d.longitude){
    //   data.longitude = parseFloat(d.longitude);
    // } else {
    //   data.longitude = "";
    // }

    if (d.merk) {
      data.merk = d.merk;
    } else {
      data.merk = "";
    }

    if (d.model) {
      data.model = d.model;
    } else {
      data.model = "";
    }

    // if(d.nipMulai){
    //   data.nipMulai = d.nipMulai;
    // } else {
    //   data.nipMulai = "";
    // }

    // if(d.nipSelesai){
    //   data.nipSelesai = d.nipSelesai;
    // } else {
    //   data.nipSelesai = "";
    // }

    if (d.panjangKemasan) {
      data.panjangKemasan = d.panjangKemasan;
    } else {
      data.panjangKemasan = "";
    }

    if (d.seriBarang) {
      data.seriBarang = d.seriBarang;
    } else {
      data.seriBarang = "";
    }

    if (d.tinggiKemasan) {
      data.tinggiKemasan = d.tinggiKemasan;
    } else {
      data.tinggiKemasan = "";
    }

    if (d.type) {
      data.type = d.type;
    } else {
      data.type = "";
    }

    if (d.ukuranKemasan) {
      data.ukuranKemasan = d.ukuranKemasan;
    } else {
      data.ukuranKemasan = "";
    }

    if (d.uraianBarang) {
      data.uraianBarang = d.uraianBarang;
    } else {
      data.uraianBarang = "";
    }

    if (d.kodeKapasitas) {
      data.kodeKapasitas = d.kodeKapasitas;
    } else {
      data.kodeKapasitas = "";
    }

    if (d.kapasitas) {
      data.kapasitas = d.kapasitas;
    } else {
      data.kapasitas = "";
    }

    // if(d.waktuMulai){
    //   data.waktuMulai = moment(d.waktuMulai).format("DD-MM-YYYY");
    // } else {
    //   data.waktuMulai = moment().format("DD-MM-YYYY");
    // }

    // if(d.waktuRekamLhp){
    //   data.waktuRekamLhp = moment(d.waktuRekamLhp).format("DD-MM-YYYY");
    // } else {
    //   data.waktuRekamLhp = moment().format("DD-MM-YYYY");
    // }

    // if(d.waktuSelesai){
    //   data.waktuSelesai = moment(d.waktuSelesai).format("DD-MM-YYYY");
    // } else {
    //   data.waktuSelesai = moment().format("DD-MM-YYYY");
    // }

    var url = process.env.REACT_APP_LHP_API_URL + '/simpan-detail-lhp';

    const options = {
      method: 'POST',
      url,
      headers,
      data
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_SUBMIT_REKAM_DETAIL_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_SUBMIT_REKAM_DETAIL_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function submitKirimBapLHP(d) { // 20191104

  return (dispatch, store) => {

    var data = {};

    if (d.idLhpHeader) {
      data.idLhpHeader = d.idLhpHeader;
    } else {
      data.idLhpHeader = "";
    }

    // if(d.ajukanContohBarang){
    //   data.ajukanContohBarang = d.ajukanContohBarang;
    // } else {
    //   data.ajukanContohBarang = "";
    // }

    // if(d.ajukanFoto){
    //   data.ajukanFoto = d.ajukanFoto;
    // } else {
    //   data.ajukanFoto = "";
    // }

    // if(d.ajukanKatalogBarang){
    //   data.ajukanKatalogBarang = d.ajukanKatalogBarang;
    // } else {
    //   data.ajukanKatalogBarang = "";
    // }

    // if(d.ajukanLabelBarang){
    //   data.ajukanLabelBarang = d.ajukanLabelBarang;
    // } else {
    //   data.ajukanLabelBarang = "";
    // }

    // if(d.ajukanLabelKemasan){
    //   data.ajukanLabelKemasan = d.ajukanLabelKemasan;
    // } else {
    //   data.ajukanLabelKemasan = "";
    // }

    if (d.idAlasanPkb) {
      data.idAlasanPkb = d.idAlasanPkb;
    } else {
      data.idAlasanPkb = 0;
    }

    // if(d.catatan){
    //   data.catatan = d.catatan;
    // } else {
    //   data.catatan = "";
    // }

    if (d.catatanKesimpulan) {
      data.catatanKesimpulan = d.catatanKesimpulan;
    } else {
      data.catatanKesimpulan = "";
    }

    if (d.dimintaKembali) {
      data.dimintaKembali = d.dimintaKembali;
    } else {
      data.dimintaKembali = "";
    }

    // if(d.flagAmbil){
    //   data.flagAmbil = d.flagAmbil;
    // } else {
    //   data.flagAmbil = "";
    // }

    // if(d.flagBap){
    //   data.flagBap = d.flagBap;
    // } else {
    //   data.flagBap = "";
    // }

    // if(d.flagLhp){
    //   data.flagLhp = d.flagLhp;
    // } else {
    //   data.flagLhp = "";
    // }

    // if(d.flagMobile){
    //   data.flagMobile = d.flagMobile;
    // } else {
    //   data.flagMobile = "";
    // }

    if (d.fotoLhpKontainer) {
      data.fotoLhpKontainer = d.fotoLhpKontainer;
    } else {
      data.fotoLhpKontainer = [
        {
          idLhpFoto: "",
          idLhpFotoKontainer: "",
          idLhpHeader: "",
          idLhpKontainer: "",
        }
      ]
    }

    if (d.fotoLhpPemeriksaan) {
      data.fotoLhpPemeriksaan = d.fotoLhpPemeriksaan;
    } else {
      data.fotoLhpPemeriksaan = [
        {
          // idLhpFoto: "",
          idLhpFoto: "",
          // idLhpHeader: "",
        }
      ]
    }

    if (d.idHeader) {
      data.idHeader = d.idHeader;
    } else {
      data.idHeader = "";
    }

    // if(d.idLhpContohBarang){
    //   data.idLhpContohBarang = d.idLhpContohBarang;
    // } else {
    //   data.idLhpContohBarang = "";
    // }

    // if(d.idLhpHeader){
    //   data.idLhpHeader = d.idLhpHeader;
    // } else {
    //   data.idLhpHeader = "";
    // }

    // if(d.idLhpJumlahBarang){
    //   data.idLhpJumlahBarang = d.idLhpJumlahBarang;
    // } else {
    //   data.idLhpJumlahBarang = "";
    // }

    // if(d.idLhpKemasan){
    //   data.idLhpKemasan = d.idLhpKemasan;
    // } else {
    //   data.idLhpKemasan = "";
    // }

    // if(d.idLhpKesiapan){
    //   data.idLhpKesiapan = d.idLhpKesiapan;
    // } else {
    //   data.idLhpKesiapan = "";
    // }

    // if(d.idLhpMemoDokumen){
    //   data.idLhpMemoDokumen = d.idLhpMemoDokumen;
    // } else {
    //   data.idLhpMemoDokumen = "";
    // }

    // if(d.idProses){
    //   data.idProses = d.idProses;
    // } else {
    //   data.idProses = "";
    // }

    // if(d.idProsesStatus){
    //   data.idProsesStatus = d.idProsesStatus;
    // } else {
    //   data.idProsesStatus = "";
    // }

    if (d.prosesStatus) {
      data.prosesStatus = d.prosesStatus;
    } else {
      data.prosesStatus =
        [

          {
            kodeProses: "",
            waktuMulai: '',
            waktuSelesai: '',
          }
        ]
    }

    if (d.jenisContohBarang) {
      data.jenisContohBarang = d.jenisContohBarang;
    } else {
      data.jenisContohBarang = "";
    }

    if (d.jenisKendala) {
      data.jenisKendala = d.jenisKendala;
    } else {
      data.jenisKendala = "";
    }

    if (d.jumlahBarangDiperiksa) {
      data.jumlahBarangDiperiksa = d.jumlahBarangDiperiksa;
    } else {
      data.jumlahBarangDiperiksa = "";
    }

    if (d.jumlahJenisBarangDisegel) {
      data.jumlahJenisBarangDisegel = d.jumlahJenisBarangDisegel;
    } else {
      data.jumlahJenisBarangDisegel = "";
    }

    if (d.jumlahContohBarang) {
      data.jumlahContohBarang = d.jumlahContohBarang;
    } else {
      data.jumlahContohBarang = "";
    }

    if (d.jumlahJenisBarangDiperiksa) {
      data.jumlahJenisBarangDiperiksa = d.jumlahJenisBarangDiperiksa;
    } else {
      data.jumlahJenisBarangDiperiksa = "";
    }

    if (d.jumlahKemasan) {
      data.jumlahKemasan = d.jumlahKemasan;
    } else {
      data.jumlahKemasan = "";
    }

    if (d.jumlahPartaiBarang) {
      data.jumlahPartaiBarang = d.jumlahPartaiBarang;
    } else {
      data.jumlahPartaiBarang = "";
    }

    if (d.kesiapanPeriksa) {
      data.kesiapanPeriksa = d.kesiapanPeriksa;
    } else {
      data.kesiapanPeriksa = "";
    }

    if (d.kesimpulanPemeriksaan) {
      data.kesimpulanPemeriksaan = d.kesimpulanPemeriksaan;
    } else {
      data.kesimpulanPemeriksaan = "";
    }

    if (d.keteranganRealisasiMemo) {
      data.keteranganRealisasiMemo = d.keteranganRealisasiMemo;
    } else {
      data.keteranganRealisasiMemo = "";
    }

    if (d.kodeGudang) {
      data.kodeGudang = d.kodeGudang;
    } else {
      data.kodeGudang = "";
    }

    if (d.kodeJenisKemasan) {
      data.kodeJenisKemasan = d.kodeJenisKemasan;
    } else {
      data.kodeJenisKemasan = "";
    }

    if (d.kodeLokasi) {
      data.kodeLokasi = d.kodeLokasi;
    } else {
      data.kodeLokasi = "";
    }

    if (d.kodeProses) {
      data.kodeProses = d.kodeProses;
    } else {
      data.kodeProses = "";
    }

    if (d.kondisiSegel) {
      data.kondisiSegel = d.kondisiSegel;
    } else {
      data.kondisiSegel = "";
    }

    if (d.kontainer) {
      data.kontainer = d.kontainer;
    } else {
      data.kontainer = [
        {
          // idKontainer: "",
          idLhpKontainer: "",
          fotoLhpKontainer:
            [
              {
                idLhpFotoKontainer: "",
              }
            ],
          // nomorKontainer: "",
          // ukuranKontainer: "",
        }
      ]
    }

    // if(d.latitude){
    //   data.latitude = d.latitude;
    // } else {
    //   data.latitude = "";
    // }

    // if(d.lokasiPerekamanBap){
    //   data.lokasiPerekamanBap = d.lokasiPerekamanBap;
    // } else {
    //   data.lokasiPerekamanBap = "";
    // }

    // if(d.longitude){
    //   data.longitude = d.longitude;
    // } else {
    //   data.longitude = "";
    // }

    // if(d.memoHeader){
    //   data.memoHeader = d.memoHeader;
    // } else {
    //   data.memoHeader = "";
    // }

    // if(d.nipMulai){
    //   data.nipMulai = d.nipMulai;
    // } else {
    //   data.nipMulai = "";
    // }

    // if(d.nipPemeriksa){
    //   data.nipPemeriksa = d.nipPemeriksa;
    // } else {
    //   data.nipPemeriksa = "";
    // }

    // if(d.nipPfpd){
    //   data.nipPfpd = d.nipPfpd;
    // } else {
    //   data.nipPfpd = "";
    // }

    // if(d.nipSelesai){
    //   data.nipSelesai = d.nipSelesai;
    // } else {
    //   data.nipSelesai = "";
    // }

    if (d.nomorKemasan) {
      data.nomorKemasan = d.nomorKemasan;
    } else {
      data.nomorKemasan = "";
    }

    if (d.pendamping) {
      data.pendamping = d.pendamping;
    } else {
      data.pendamping = [
        {
          // idLhpHeader: "",
          // idLhpPendamping: "",
          namaPendamping: "",
          unitPendamping: "",
        }
      ]
    }

    if (d.perintahLorong) {
      data.perintahLorong = d.perintahLorong;
    } else {
      data.perintahLorong = [
        {
          idLhpPerintahLorong: "",
          pelaksanaanPerintahLorong: "",
          alasanTidakPerintah: "",
          waktuMulai: '',
          waktuSelesai: '',
          fotoLhpKontainer:
            [
              {
                idLhpFoto: "",
              }
            ],
        }
      ]
    }

    if (d.realisasiIp) {
      data.realisasiIp = d.realisasiIp;
    } else {
      data.realisasiIp = "";
    }

    if (d.realisasiMemo) {
      data.realisasiMemo = d.realisasiMemo;
    } else {
      data.realisasiMemo = "";
    }

    if (d.seriPeriksa) {
      data.seriPeriksa = d.seriPeriksa;
    } else {
      data.seriPeriksa = 0;
    }

    if (d.tempatPemeriksaan) {
      data.tempatPemeriksaan = d.tempatPemeriksaan;
    } else {
      data.tempatPemeriksaan = "";
    }

    if (d.uraianKendala) {
      data.uraianKendala = d.uraianKendala;
    } else {
      data.uraianKendala = "";
    }

    // if(d.urlImage){
    //   data.urlImage = d.urlImage;
    // } else {
    //   data.urlImage = "";
    // }

    // if(d.waktuMulai){
    //   data.waktuMulai = moment(d.waktuMulai).format("DD-MM-YYYY");
    // } else {
    //   data.waktuMulai = moment().format("DD-MM-YYYY");
    // }

    if (d.waktuRekamBap) {
      data.waktuRekamBap = moment(d.waktuRekamBap).format("DD-MM-YYYY");
    } else {
      data.waktuRekamBap = '';
    }

    // if(d.waktuRekamLhp){
    //   data.waktuRekamLhp = moment(d.waktuRekamLhp).format("DD-MM-YYYY");
    // } else {
    //   data.waktuRekamLhp = moment().format("DD-MM-YYYY");
    // }

    // if(d.waktuRekamMemo){
    //   data.waktuRekamMemo = moment(d.waktuRekamMemo).format("DD-MM-YYYY");
    // } else {
    //   data.waktuRekamMemo = moment().format("DD-MM-YYYY");
    // }

    // if(d.waktuSelesai){
    //   data.waktuSelesai = moment(d.waktuSelesai).format("DD-MM-YYYY");
    // } else {
    //   data.waktuSelesai = moment().format("DD-MM-YYYY");
    // }

    var url = process.env.REACT_APP_LHP_API_URL + '/kirim-bap';

    const options = {
      method: 'POST',
      url,
      headers,
      data
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_SUBMIT_KIRIM_BAP_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_SUBMIT_KIRIM_BAP_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}


export function submitUpdateRekamBapLHP(d = {}) { // 20191104

  return (dispatch, store) => {

    var data = {};


    // if(d.idLhpHeader){
    //   data.idLhpHeader = d.idLhpHeader;
    // } else {
    //   data.idLhpHeader = "";
    // }

    // if(d.ajukanContohBarang){
    //   data.ajukanContohBarang = d.ajukanContohBarang;
    // } else {
    //   data.ajukanContohBarang = "";
    // }

    // if(d.ajukanFoto){
    //   data.ajukanFoto = d.ajukanFoto;
    // } else {
    //   data.ajukanFoto = "";
    // }

    // if(d.ajukanKatalogBarang){
    //   data.ajukanKatalogBarang = d.ajukanKatalogBarang;
    // } else {
    //   data.ajukanKatalogBarang = "";
    // }

    // if(d.ajukanLabelBarang){
    //   data.ajukanLabelBarang = d.ajukanLabelBarang;
    // } else {
    //   data.ajukanLabelBarang = "";
    // }

    // if(d.ajukanLabelKemasan){
    //   data.ajukanLabelKemasan = d.ajukanLabelKemasan;
    // } else {
    //   data.ajukanLabelKemasan = "";
    // }

    // if(d.alasanPkb){
    //   data.alasanPkb = d.alasanPkb;
    // } else {
    //   data.alasanPkb = 0;
    // }

    // if(d.catatan){
    //   data.catatan = d.catatan;
    // } else {
    //   data.catatan = "";
    // }

    if (d.catatanKesimpulan) {
      data.catatanKesimpulan = d.catatanKesimpulan;
    } else {
      data.catatanKesimpulan = "";
    }

    if (d.dimintaKembali) {
      data.dimintaKembali = d.dimintaKembali;
    } else {
      data.dimintaKembali = "";
    }

    // if(d.flagAmbil){
    //   data.flagAmbil = d.flagAmbil;
    // } else {
    //   data.flagAmbil = "";
    // }

    if (d.flagBap) {
      data.flagBap = d.flagBap;
    } else {
      data.flagBap = "";
    }

    if (d.flagLhp) {
      data.flagLhp = d.flagLhp;
    } else {
      data.flagLhp = "";
    }

    if (d.flagMobile) {
      data.flagMobile = d.flagMobile;
    } else {
      data.flagMobile = "";
    }

    if (d.fotoLhpKontainer) {
      data.fotoLhpKontainer = d.fotoLhpKontainer;
    } else {
      data.fotoLhpKontainer = [
        {
          idLhpFoto: "",
          idLhpFotoKontainer: "",
          idLhpHeader: "",
          idLhpKontainer: "",
        }
      ]
    }

    if (d.fotoLhpPemeriksaan) {
      data.fotoLhpPemeriksaan = d.fotoLhpPemeriksaan;
    } else {
      data.fotoLhpPemeriksaan = [
        {
          // idLhpFoto: "",
          idLhpFoto: "",
          // idLhpHeader: "",
        }
      ]
    }

    if (d.idLhpFoto) {
      data.idLhpFoto = d.idLhpFoto;
    } else {
      data.idLhpFoto = "";
    }

    // if(d.idHeader){
    //   data.idHeader = d.idHeader;
    // } else {
    //   data.idHeader = "";
    // }

    // if(d.idLhpContohBarang){
    //   data.idLhpContohBarang = d.idLhpContohBarang;
    // } else {
    //   data.idLhpContohBarang = "";
    // }

    // if(d.idLhpHeader){
    //   data.idLhpHeader = d.idLhpHeader;
    // } else {
    //   data.idLhpHeader = "";
    // }

    // if(d.idLhpJumlahBarang){
    //   data.idLhpJumlahBarang = d.idLhpJumlahBarang;
    // } else {
    //   data.idLhpJumlahBarang = "";
    // }

    // if(d.idLhpKemasan){
    //   data.idLhpKemasan = d.idLhpKemasan;
    // } else {
    //   data.idLhpKemasan = "";
    // }

    // if(d.idLhpKesiapan){
    //   data.idLhpKesiapan = d.idLhpKesiapan;
    // } else {
    //   data.idLhpKesiapan = "";
    // }

    // if(d.idLhpMemoDokumen){
    //   data.idLhpMemoDokumen = d.idLhpMemoDokumen;
    // } else {
    //   data.idLhpMemoDokumen = "";
    // }

    // if(d.idProses){
    //   data.idProses = d.idProses;
    // } else {
    //   data.idProses = "";
    // }

    // if(d.idProsesStatus){
    //   data.idProsesStatus = d.idProsesStatus;
    // } else {
    //   data.idProsesStatus = "";
    // }

    if (d.prosesStatus) {
      data.prosesStatus = d.prosesStatus;
    } else {
      data.prosesStatus =
        [

          {
            kodeProses: "",
            waktuMulai: '',
            waktuSelesai: '',
          }
        ]
    }

    if (d.jenisContohBarang) {
      data.jenisContohBarang = d.jenisContohBarang;
    } else {
      data.jenisContohBarang = "";
    }

    if (d.jenisKendala) {
      data.jenisKendala = d.jenisKendala;
    } else {
      data.jenisKendala = "";
    }

    if (d.jumlahBarangDiperiksa) {
      data.jumlahBarangDiperiksa = d.jumlahBarangDiperiksa;
    } else {
      data.jumlahBarangDiperiksa = "";
    }

    if (d.jumlahJenisBarangDisegel) {
      data.jumlahJenisBarangDisegel = d.jumlahJenisBarangDisegel;
    } else {
      data.jumlahJenisBarangDisegel = "";
    }

    if (d.jumlahContohBarang) {
      data.jumlahContohBarang = d.jumlahContohBarang;
    } else {
      data.jumlahContohBarang = "";
    }

    if (d.jumlahJenisBarangDiperiksa) {
      data.jumlahJenisBarangDiperiksa = d.jumlahJenisBarangDiperiksa;
    } else {
      data.jumlahJenisBarangDiperiksa = "";
    }

    if (d.jumlahKemasan) {
      data.jumlahKemasan = d.jumlahKemasan;
    } else {
      data.jumlahKemasan = "";
    }

    if (d.jumlahPartaiBarang) {
      data.jumlahPartaiBarang = d.jumlahPartaiBarang;
    } else {
      data.jumlahPartaiBarang = "";
    }

    if (d.kesiapanPeriksa) {
      data.kesiapanPeriksa = d.kesiapanPeriksa;
    } else {
      data.kesiapanPeriksa = "";
    }

    if (d.kesimpulanPemeriksaan) {
      data.kesimpulanPemeriksaan = d.kesimpulanPemeriksaan;
    } else {
      data.kesimpulanPemeriksaan = "";
    }

    if (d.keteranganRealisasiMemo) {
      data.keteranganRealisasiMemo = d.keteranganRealisasiMemo;
    } else {
      data.keteranganRealisasiMemo = "";
    }

    if (d.kodeGudang) {
      data.kodeGudang = d.kodeGudang;
    } else {
      data.kodeGudang = "";
    }

    if (d.kodeJenisKemasan) {
      data.kodeJenisKemasan = d.kodeJenisKemasan;
    } else {
      data.kodeJenisKemasan = "";
    }

    if (d.kodeLokasi) {
      data.kodeLokasi = d.kodeLokasi;
    } else {
      data.kodeLokasi = "";
    }

    if (d.kodeProses) {
      data.kodeProses = d.kodeProses;
    } else {
      data.kodeProses = "";
    }

    if (d.kondisiSegel) {
      data.kondisiSegel = d.kondisiSegel;
    } else {
      data.kondisiSegel = "";
    }

    if (d.kontainer) {
      data.kontainer = d.kontainer;
    } else {
      data.kontainer = [
        {
          // idKontainer: "",
          idLhpKontainer: "",
          fotoLhpKontainer:
            [
              {
                idLhpFotoKontainer: "",
              }
            ],
          // nomorKontainer: "",
          // ukuranKontainer: "",
        }
      ]
    }

    // if(d.latitude){
    //   data.latitude = d.latitude;
    // } else {
    //   data.latitude = "";
    // }

    // if(d.lokasiPerekamanBap){
    //   data.lokasiPerekamanBap = d.lokasiPerekamanBap;
    // } else {
    //   data.lokasiPerekamanBap = "";
    // }

    // if(d.longitude){
    //   data.longitude = d.longitude;
    // } else {
    //   data.longitude = "";
    // }

    // if(d.memoHeader){
    //   data.memoHeader = d.memoHeader;
    // } else {
    //   data.memoHeader = "";
    // }

    // if(d.nipMulai){
    //   data.nipMulai = d.nipMulai;
    // } else {
    //   data.nipMulai = "";
    // }

    // if(d.nipPemeriksa){
    //   data.nipPemeriksa = d.nipPemeriksa;
    // } else {
    //   data.nipPemeriksa = "";
    // }

    // if(d.nipPfpd){
    //   data.nipPfpd = d.nipPfpd;
    // } else {
    //   data.nipPfpd = "";
    // }

    // if(d.nipSelesai){
    //   data.nipSelesai = d.nipSelesai;
    // } else {
    //   data.nipSelesai = "";
    // }

    if (d.nomorKemasan) {
      data.nomorKemasan = d.nomorKemasan;
    } else {
      data.nomorKemasan = "";
    }

    if (d.pendamping) {
      data.pendamping = d.pendamping;
    } else {
      data.pendamping = [
        {
          // idLhpHeader: "",
          // idLhpPendamping: "",
          namaPendamping: "",
          unitPendamping: "",
        }
      ]
    }

    if (d.perintahLorong) {
      data.perintahLorong = d.perintahLorong;
    } else {
      data.perintahLorong = [
        {
          idLhpPerintahLorong: "",
          pelaksanaanPerintahLorong: "",
          alasanTidakPerintah: "",
          waktuMulai: '',
          waktuSelesai: '',
        }
      ]
    }

    if (d.realisasiIp) {
      data.realisasiIp = d.realisasiIp;
    } else {
      data.realisasiIp = "";
    }

    if (d.realisasiMemo) {
      data.realisasiMemo = d.realisasiMemo;
    } else {
      data.realisasiMemo = "";
    }

    // if(d.seriPeriksa){
    //   data.seriPeriksa = d.seriPeriksa;
    // } else {
    //   data.seriPeriksa = 0;
    // }

    if (d.tempatPemeriksaan) {
      data.tempatPemeriksaan = d.tempatPemeriksaan;
    } else {
      data.tempatPemeriksaan = "";
    }

    if (d.uraianKendala) {
      data.uraianKendala = d.uraianKendala;
    } else {
      data.uraianKendala = "";
    }

    // if(d.urlImage){
    //   data.urlImage = d.urlImage;
    // } else {
    //   data.urlImage = "";
    // }

    // if(d.waktuMulai){
    //   data.waktuMulai = moment(d.waktuMulai).format("DD-MM-YYYY");
    // } else {
    //   data.waktuMulai = moment().format("DD-MM-YYYY");
    // }

    if (d.waktuRekamBap) {
      data.waktuRekamBap = moment(d.waktuRekamBap).format("DD-MM-YYYY");
    } else {
      data.waktuRekamBap = '';
    }

    // if(d.waktuRekamLhp){
    //   data.waktuRekamLhp = moment(d.waktuRekamLhp).format("DD-MM-YYYY");
    // } else {
    //   data.waktuRekamLhp = moment().format("DD-MM-YYYY");
    // }

    // if(d.waktuRekamMemo){
    //   data.waktuRekamMemo = moment(d.waktuRekamMemo).format("DD-MM-YYYY");
    // } else {
    //   data.waktuRekamMemo = moment().format("DD-MM-YYYY");
    // }

    // if(d.waktuSelesai){
    //   data.waktuSelesai = moment(d.waktuSelesai).format("DD-MM-YYYY");
    // } else {
    //   data.waktuSelesai = moment().format("DD-MM-YYYY");
    // }

    var url = process.env.REACT_APP_LHP_API_URL + '/update-rekam-bap/' + d.idHeader;

    const options = {
      method: 'PUT',
      url,
      headers,
      data
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_SUBMIT_UPDATE_REKAM_BAP_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_SUBMIT_UPDATE_REKAM_BAP_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function submitRekamBapLHP(d) { // 20191104

  return (dispatch, store) => {

    var data = {};


    if (d.idLhpHeader) {
      data.idLhpHeader = d.idLhpHeader;
    } else {
      data.idLhpHeader = "";
    }

    // if(d.ajukanContohBarang){
    //   data.ajukanContohBarang = d.ajukanContohBarang;
    // } else {
    //   data.ajukanContohBarang = "";
    // }

    // if(d.ajukanFoto){
    //   data.ajukanFoto = d.ajukanFoto;
    // } else {
    //   data.ajukanFoto = "";
    // }

    // if(d.ajukanKatalogBarang){
    //   data.ajukanKatalogBarang = d.ajukanKatalogBarang;
    // } else {
    //   data.ajukanKatalogBarang = "";
    // }

    // if(d.ajukanLabelBarang){
    //   data.ajukanLabelBarang = d.ajukanLabelBarang;
    // } else {
    //   data.ajukanLabelBarang = "";
    // }

    // if(d.ajukanLabelKemasan){
    //   data.ajukanLabelKemasan = d.ajukanLabelKemasan;
    // } else {
    //   data.ajukanLabelKemasan = "";
    // }

    if (d.idAlasanPkb) {
      data.idAlasanPkb = d.idAlasanPkb;
    } else {
      data.idAlasanPkb = 0;
    }

    // if(d.catatan){
    //   data.catatan = d.catatan;
    // } else {
    //   data.catatan = "";
    // }

    if (d.catatanKesimpulan) {
      data.catatanKesimpulan = d.catatanKesimpulan;
    } else {
      data.catatanKesimpulan = "";
    }

    if (d.dimintaKembali) {
      data.dimintaKembali = d.dimintaKembali;
    } else {
      data.dimintaKembali = "";
    }

    // if(d.flagAmbil){
    //   data.flagAmbil = d.flagAmbil;
    // } else {
    //   data.flagAmbil = "";
    // }

    // if(d.flagBap){
    //   data.flagBap = d.flagBap;
    // } else {
    //   data.flagBap = "";
    // }

    // if(d.flagLhp){
    //   data.flagLhp = d.flagLhp;
    // } else {
    //   data.flagLhp = "";
    // }

    // if(d.flagMobile){
    //   data.flagMobile = d.flagMobile;
    // } else {
    //   data.flagMobile = "";
    // }

    if (d.fotoLhpKontainer) {
      data.fotoLhpKontainer = d.fotoLhpKontainer;
    } else {
      data.fotoLhpKontainer = [
        {
          idLhpFoto: "",
          // idLhpFotoKontainer: "",
          idLhpHeader: "",
          idLhpKontainer: "",
        }
      ]
    }

    if (d.fotoLhpPemeriksaan) {
      data.fotoLhpPemeriksaan = d.fotoLhpPemeriksaan;
    } else {
      data.fotoLhpPemeriksaan = [
        {
          // idLhpFoto: "",
          idLhpFoto: "",
          // idLhpHeader: "",
        }
      ]
    }

    if (d.idHeader) {
      data.idHeader = d.idHeader;
    } else {
      data.idHeader = "";
    }

    if (d.idLhpFoto) {
      data.idLhpFoto = d.idLhpFoto;
    } else {
      data.idLhpFoto = "";
    }

    // if(d.idLhpContohBarang){
    //   data.idLhpContohBarang = d.idLhpContohBarang;
    // } else {
    //   data.idLhpContohBarang = "";
    // }

    // if(d.idLhpHeader){
    //   data.idLhpHeader = d.idLhpHeader;
    // } else {
    //   data.idLhpHeader = "";
    // }

    // if(d.idLhpJumlahBarang){
    //   data.idLhpJumlahBarang = d.idLhpJumlahBarang;
    // } else {
    //   data.idLhpJumlahBarang = "";
    // }

    // if(d.idLhpKemasan){
    //   data.idLhpKemasan = d.idLhpKemasan;
    // } else {
    //   data.idLhpKemasan = "";
    // }

    // if(d.idLhpKesiapan){
    //   data.idLhpKesiapan = d.idLhpKesiapan;
    // } else {
    //   data.idLhpKesiapan = "";
    // }

    // if(d.idLhpMemoDokumen){
    //   data.idLhpMemoDokumen = d.idLhpMemoDokumen;
    // } else {
    //   data.idLhpMemoDokumen = "";
    // }

    // if(d.idProses){
    //   data.idProses = d.idProses;
    // } else {
    //   data.idProses = "";
    // }

    // if(d.idProsesStatus){
    //   data.idProsesStatus = d.idProsesStatus;
    // } else {
    //   data.idProsesStatus = "";
    // }

    if (d.prosesStatus) {
      data.prosesStatus = d.prosesStatus;
    } else {
      data.prosesStatus = [
        {
          idProsesStatus: "",
          idProses: "",
          kodeProses: "",
          waktuMulai: '',
          waktuSelesai: '',
          penunjuk_pemeriksa: "",
          pemeriksaan_barang_mulai: "",
          pemeriksaan_barang: "",
          waktu_pkb: "",
        }
      ]
    }
    if (d.penunjukanPemeriksaan) {
      data.penunjukanPemeriksaan = d.penunjukanPemeriksaan;
    } else {
      data.penunjukanPemeriksaan = "";
    }

    if (d.pengeluaranKemasan) {
      data.pengeluaranKemasan = d.pengeluaranKemasan;
    } else {
      data.pengeluaranKemasan = "";
    }

    if (d.pemeriksaanBarang) {
      data.pemeriksaanBarang = d.pemeriksaanBarang;
    } else {
      data.pemeriksaanBarang = "";
    }

    if (d.perintahKesiapanBarang) {
      data.perintahKesiapanBarang = d.perintahKesiapanBarang;
    } else {
      data.perintahKesiapanBarang = "";
    }


    if (d.pemeriksaan_barang_mulai) {
      data.pemeriksaan_barang_mulai = d.pemeriksaan_barang_mulai;
    } else {
      data.pemeriksaan_barang_mulai = "";
    }

    if (d.waktu_pkb) {
      data.waktu_pkb = d.waktu_pkb;
    } else {
      data.waktu_pkb = "";
    }

    if (d.jenisContohBarang) {
      data.jenisContohBarang = d.jenisContohBarang;
    } else {
      data.jenisContohBarang = "";
    }

    if (d.jenisKendala) {
      data.jenisKendala = d.jenisKendala;
    } else {
      data.jenisKendala = "";
    }

    if (d.jumlahBarangDiperiksa) {
      data.jumlahBarangDiperiksa = d.jumlahBarangDiperiksa;
    } else {
      data.jumlahBarangDiperiksa = "";
    }

    if (d.jumlahJenisBarangDisegel) {
      data.jumlahJenisBarangDisegel = d.jumlahJenisBarangDisegel;
    } else {
      data.jumlahJenisBarangDisegel = "";
    }

    if (d.jumlahContohBarang) {
      data.jumlahContohBarang = d.jumlahContohBarang;
    } else {
      data.jumlahContohBarang = "";
    }

    if (d.jumlahJenisBarangDiperiksa) {
      data.jumlahJenisBarangDiperiksa = d.jumlahJenisBarangDiperiksa;
    } else {
      data.jumlahJenisBarangDiperiksa = "";
    }

    if (d.jumlahKemasan) {
      data.jumlahKemasan = d.jumlahKemasan;
    } else {
      data.jumlahKemasan = "";
    }

    if (d.jumlahPartaiBarang) {
      data.jumlahPartaiBarang = d.jumlahPartaiBarang;
    } else {
      data.jumlahPartaiBarang = "";
    }

    if (d.kapasitas) {
      data.kapasitas = d.kapasitas;
    } else {
      data.kapasitas = "";
    }

    if (d.kesiapanPeriksa) {
      data.kesiapanPeriksa = d.kesiapanPeriksa;
    } else {
      data.kesiapanPeriksa = "";
    }

    if (d.kesimpulanPemeriksaan) {
      data.kesimpulanPemeriksaan = d.kesimpulanPemeriksaan;
    } else {
      data.kesimpulanPemeriksaan = "";
    }

    if (d.keterangan) {
      data.keterangan = d.keterangan;
    } else {
      data.keterangan = "";
    }


    if (d.keteranganKontainer) {
      data.keteranganKontainer = d.keteranganKontainer;
    } else {
      data.keteranganKontainer = "";
    }

    if (d.keteranganRealisasiMemo) {
      data.keteranganRealisasiMemo = d.keteranganRealisasiMemo;
    } else {
      data.keteranganRealisasiMemo = "";
    }

    if (d.kodeGudang) {
      data.kodeGudang = d.kodeGudang;
    } else {
      data.kodeGudang = "";
    }

    if (d.kodeJenisKemasan) {
      data.kodeJenisKemasan = d.kodeJenisKemasan;
    } else {
      data.kodeJenisKemasan = "";
    }

    if (d.kodeKapasitas) {
      data.kodeKapasitas = d.kodeKapasitas;
    } else {
      data.kodeKapasitas = "";
    }

    if (d.kodeLokasi) {
      data.kodeLokasi = d.kodeLokasi;
    } else {
      data.kodeLokasi = "";
    }

    if (d.kodeProses) {
      data.kodeProses = d.kodeProses;
    } else {
      data.kodeProses = "";
    }

    if (d.kondisiSegel) {
      data.kondisiSegel = d.kondisiSegel;
    } else {
      data.kondisiSegel = "";
    }

    if (d.kontainer) {
      data.kontainer = d.kontainer;
    } else {
      data.kontainer = [
        {
          // idKontainer: "",
          idLhpKontainer: "",
          fotoLhpKontainer:
            [
              {
                idLhpFotoKontainer: "",
              }
            ],
          // nomorKontainer: "",
          // ukuranKontainer: "",
        }
      ]
    }

    // if(d.latitude){
    //   data.latitude = d.latitude;
    // } else {
    //   data.latitude = "";
    // }

    // if(d.lokasiPerekamanBap){
    //   data.lokasiPerekamanBap = d.lokasiPerekamanBap;
    // } else {
    //   data.lokasiPerekamanBap = "";
    // }

    // if(d.longitude){
    //   data.longitude = d.longitude;
    // } else {
    //   data.longitude = "";
    // }

    // if(d.memoHeader){
    //   data.memoHeader = d.memoHeader;
    // } else {
    //   data.memoHeader = "";
    // }

    // if(d.nipMulai){
    //   data.nipMulai = d.nipMulai;
    // } else {
    //   data.nipMulai = "";
    // }

    // if(d.nipPemeriksa){
    //   data.nipPemeriksa = d.nipPemeriksa;
    // } else {
    //   data.nipPemeriksa = "";
    // }

    // if(d.nipPfpd){
    //   data.nipPfpd = d.nipPfpd;
    // } else {
    //   data.nipPfpd = "";
    // }

    // if(d.nipSelesai){
    //   data.nipSelesai = d.nipSelesai;
    // } else {
    //   data.nipSelesai = "";
    // }

    if (d.nomorKemasan) {
      data.nomorKemasan = d.nomorKemasan;
    } else {
      data.nomorKemasan = "";
    }

    if (d.pendamping) {
      data.pendamping = d.pendamping;
    } else {
      data.pendamping = [
        {
          // idLhpHeader: "",
          // idLhpPendamping: "",
          namaPendamping: "",
          unitPendamping: "",
        }
      ]
    }

    if (d.perintahLorong) {
      console.log("[debug] ATAS : ", d.perintahLorong)
      data.perintahLorong = d.perintahLorong;
    } else {
      console.log("[debug] BAWAH : ", data.perintahLorong)
      data.perintahLorong = [
        {
          idLhpPerintahLorong: "",
          pelaksanaanPerintahLorong: "",
          alasanTidakPerintahLorong: "",
          waktuMulai: '',
          waktuSelesai: '',
          keteranganKontainer: '',
          fotoLhpKontainer:
            [
              {
                idLhpFoto: "",
              }
            ],
        }
      ]
    }

    if (d.foto) {
      data.foto = d.foto;
    } else {
      data.foto = "";
    }

    if (d.realisasiIp) {
      data.realisasiIp = d.realisasiIp;
    } else {
      data.realisasiIp = "";
    }

    if (d.realisasiMemo) {
      data.realisasiMemo = d.realisasiMemo;
    } else {
      data.realisasiMemo = "";
    }

    if (d.seriPeriksa) {
      data.seriPeriksa = d.seriPeriksa;
    } else {
      data.seriPeriksa = 0;
    }

    if (d.tempatPemeriksaan) {
      data.tempatPemeriksaan = d.tempatPemeriksaan;
    } else {
      data.tempatPemeriksaan = "";
    }

    if (d.tinggiKemasan) {
      data.tinggiKemasan = d.tinggiKemasan;
    } else {
      data.tinggiKemasan = "";
    }

    if (d.type) {
      data.type = d.type;
    } else {
      data.type = "";
    }

    if (d.ukuranKemasan) {
      data.ukuranKemasan = d.ukuranKemasan;
    } else {
      data.ukuranKemasan = "";
    }

    if (d.uraianBarang) {
      data.uraianBarang = d.uraianBarang;
    } else {
      data.uraianBarang = "";
    }

    if (d.uraianKendala) {
      data.uraianKendala = d.uraianKendala;
    } else {
      data.uraianKendala = "";
    }




    // if(d.urlImage){
    //   data.urlImage = d.urlImage;
    // } else {
    //   data.urlImage = "";
    // }

    // if(d.waktuMulai){
    //   data.waktuMulai = moment(d.waktuMulai).format("DD-MM-YYYY");
    // } else {
    //   data.waktuMulai = moment().format("DD-MM-YYYY");
    // }

    if (d.waktuRekamBap) {
      data.waktuRekamBap = moment(d.waktuRekamBap).format("DD-MM-YYYY");
    } else {
      data.waktuRekamBap = '';
    }

    // if(d.waktuRekamLhp){
    //   data.waktuRekamLhp = moment(d.waktuRekamLhp).format("DD-MM-YYYY");
    // } else {
    //   data.waktuRekamLhp = moment().format("DD-MM-YYYY");
    // }

    // if(d.waktuRekamMemo){
    //   data.waktuRekamMemo = moment(d.waktuRekamMemo).format("DD-MM-YYYY");
    // } else {
    //   data.waktuRekamMemo = moment().format("DD-MM-YYYY");
    // }

    // if(d.waktuSelesai){
    //   data.waktuSelesai = moment(d.waktuSelesai).format("DD-MM-YYYY");
    // } else {
    //   data.waktuSelesai = moment().format("DD-MM-YYYY");
    // }

    var url = process.env.REACT_APP_LHP_API_URL + '/rekam-bap';

    const options = {
      method: 'POST',
      url,
      headers,
      data
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_SUBMIT_REKAM_BAP_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_SUBMIT_REKAM_BAP_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function getBrowseDokumenLHP(
  kodeKantor,
  tanggalAkhir,
  tanggalAwal,
  nomorDokumen,
  kodeDokumen,
  offset = 0,
  limit = 10,
  nip
) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/browse-dokumen-lhp';

    var data = {};

    if (nip) {
      data.nip = nip;
    } else {
      data.nip = store().auth.user.nip;
    }

    if (kodeKantor) {
      data.kodeKantor = String(kodeKantor);
    } else {
      data.kodeKantor = "";
    }

    if (kodeDokumen) {
      data.kodeDokumen = String(kodeDokumen);
    } else {
      data.kodeDokumen = "";
    }

    if (tanggalAkhir) {
      data.tanggalAkhir = moment(tanggalAkhir).format("DD-MM-YYYY");
    } else {
      data.tanggalAkhir = moment().format("DD-MM-YYYY");
    }

    if (tanggalAwal) {
      data.tanggalAwal = moment(tanggalAwal).format("DD-MM-YYYY");
    } else {
      data.tanggalAwal = moment().subtract(7, 'days').format("DD-MM-YYYY");
    }

    if (nomorDokumen) {
      data.nomorDokumen = String(nomorDokumen);
    } else {
      data.nomorDokumen = "";
    }

    data.offset = offset;

    data.limit = limit;

    const options = {
      method: 'POST',
      url,
      headers,
      data,
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_BROWSE_DOKUMEN_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_BROWSE_DOKUMEN_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function submitUploadKontainer(
  file,
  // idLhpFoto,
  keterangan,
  lokasiRekamFoto,
  waktuRekamFoto,
) { //20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/upload-foto-hdfs';

    var data = {};

    if (file) {
      data.file = file;
    }

    // if(idLhpFoto){
    //   data.idLhpFoto = idLhpFoto;
    // }

    if (keterangan) {
      data.keterangan = keterangan;
    } else {
      data.keterangan = '';
    }

    // if(lokasiRekamFoto){
    //   data.lokasiRekamFoto = lokasiRekamFoto;
    // } else {
    //   data.lokasiRekamFoto = '';
    // }

    // if(waktuRekamFoto){
    //   data.waktuRekamFoto = moment(waktuRekamFoto).format("DD-MM-YYYY");
    // } else {
    //   data.waktuRekamFoto = moment().format("DD-MM-YYYY");
    // }

    var d = new FormData()

    Object.keys(data).forEach(function (key) {
      d.append(key, data[key]);
    });

    const options = {
      method: 'POST',
      url,
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      data: d
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_SUBMIT_UPLOAD_FOTO_KONTAINER',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_SUBMIT_UPLOAD_FOTO_KONTAINER',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(options.data);

    }

  }

}

export function submitUploadFotoHdfsLHP(
  file,
  // idLhpFoto,
  keterangan,
  lokasiRekamFoto,
  waktuRekamFoto,
) { //20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/upload-foto-hdfs';

    var data = {};

    if (file) {
      data.file = file;
    }

    // if(idLhpFoto){
    //   data.idLhpFoto = idLhpFoto;
    // }

    if (keterangan) {
      data.keterangan = keterangan;
    } else {
      data.keterangan = '';
    }

    if (lokasiRekamFoto) {
      data.lokasiRekamFoto = lokasiRekamFoto;
    } else {
      data.lokasiRekamFoto = '';
    }

    if (waktuRekamFoto) {
      data.waktuRekamFoto = moment(waktuRekamFoto).format("DD-MM-YYYY");
    } else {
      data.waktuRekamFoto = moment().format("DD-MM-YYYY");
    }

    var d = new FormData()

    Object.keys(data).forEach(function (key) {
      d.append(key, data[key]);
    });

    const options = {
      method: 'POST',
      url,
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      data: d
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_SUBMIT_UPLOAD_FOTO_HDFS_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_SUBMIT_UPLOAD_FOTO_HDFS_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(options.data);

    }

  }

}

export function deleteHdfsFotoLHP(
  idLhpFoto,
) { //20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/delete-hdfs-foto/' + idLhpFoto;

    var data = {};

    const options = {
      method: 'DELETE',
      url,
      headers,
      data
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_DELETE_HDFS_FOTO_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_DELETE_HDFS_FOTO_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function deleteFotoHdfsPemeriksaanLHP(
  idLhpFoto,
  idLhpFotoPemeriksaan
) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/delete-hdfs-foto-pemeriksaan/' + idLhpFoto + '/' + idLhpFotoPemeriksaan;

    var data = {};

    const options = {
      method: 'DELETE',
      url,
      headers,
      data
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_DELETE_HDFS_FOTO_PEMERIKSAAN_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_DELETE_HDFS_FOTO_PEMERIKSAAN_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function deleteFotoHdfsKontainerLHP(
  idLhpFoto,
  idLhpFotoKontainer
) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/delete-hdfs-foto-kontainer/' + idLhpFoto + '/' + idLhpFotoKontainer;

    var data = {};


    const options = {
      method: 'DELETE',
      url,
      headers,
      data
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_DELETE_HDFS_FOTO_KONTAINER_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_DELETE_HDFS_FOTO_KONTAINER_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function getBrowseLHP(
  kodeKantor,
  tanggalAkhir,
  tanggalAwal,
  nomorDokumen,
  kodeDokumen,
  offset = 0,
  limit = 10,
  nip
) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/browse-lhp';

    var data = {};

    if (nip) {
      data.nip = nip;
    } else {
      data.nip = store().auth.user.nip;
    }

    if (kodeKantor) {
      data.kodeKantor = String(kodeKantor);
    } else {
      data.kodeKantor = "";
    }

    if (kodeDokumen) {
      data.kodeDokumen = String(kodeDokumen);
    } else {
      data.kodeDokumen = "";
    }

    if (tanggalAkhir) {
      data.tanggalAkhir = moment(tanggalAkhir).format("DD-MM-YYYY");
    } else {
      data.tanggalAkhir = moment().format("DD-MM-YYYY");
    }

    if (tanggalAwal) {
      data.tanggalAwal = moment(tanggalAwal).format("DD-MM-YYYY");
    } else {
      data.tanggalAwal = moment().format("DD-MM-YYYY");
    }

    if (nomorDokumen) {
      data.nomorDokumen = String(nomorDokumen);
    } else {
      data.nomorDokumen = "";
    }

    data.offset = offset;

    data.limit = limit;

    const options = {
      method: 'POST',
      url,
      headers,
      data
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_BROWSE_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_BROWSE_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}


export function getKontainerTambahLHP (idHeader) { // 20191104
    
  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL+'/kontainer-tambah/'+ idHeader;

    const options = {
      method: 'GET',
      headers,
      url,
    }; 

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_LHP',
          payload: false
        })
        dispatch({
          type: 'SET_KONTAINER_TAMBAH_LHP',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_LHP',
          payload: false
        })
      })

    } else{

    var xhr = new XMLHttpRequest();

    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function(){

      if (this.readyState === 4) {

        if(this.status == 200 || this.status == 201){

          var response = JSON.parse(this.responseText);
          console.log(response);

          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_KONTAINER_TAMBAH_LHP',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })

        }

      }

    });

    xhr.open(options.method, url);

    Object.keys(options.headers).forEach(function(key) {
      xhr.setRequestHeader(key, options.headers[key]);
    });

    xhr.send(JSON.stringify(options.data));

  }

}

}

export function getKontainerPeriksaLHP (idHeader) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/kontainer-periksa/' + idHeader;

    const options = {
      method: 'GET',
      headers,
      url,
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_KONTAINER_PERIKSA_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_KONTAINER_PERIKSA_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function getHeaderDokumen(idHeader, kodeDokumen) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/header-dokumen/' + idHeader + '/' + kodeDokumen;

    const options = {
      method: 'GET',
      headers,
      url,
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_HEADER_DOKUMEN_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_HEADER_DOKUMEN_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function getMemoPemeriksaanLHP(idHeader) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/memo-pemeriksaan/' + idHeader;

    const options = {
      method: 'GET',
      headers,
      url,
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_MEMO_PEMERIKSAAN_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_MEMO_PEMERIKSAAN_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function getMemoBarangLHP(idHeader, page = 0, size = 10) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/memo-barang/' + idHeader + '/items';

    var data = {};

    if (page) {
      data.page = page;
    } else {
      data.page = 0;
    }

    if (size) {
      data.size = size;
    } else {
      data.size = 10;
    }

    url += "?" + qs.stringify(data);

    const options = {
      method: 'GET',
      headers,
      url,
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_MEMO_BARANG_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_MEMO_BARANG_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function getBapLHP(idLhpHeader) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/get-bap/' + idLhpHeader;

    const options = {
      method: 'GET',
      headers,
      url,
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_BAP_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_BAP_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function getDaftarDetilLHP(idLhpHeader) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/get-daftar-detil-lhp/' + idLhpHeader;

    const options = {
      method: 'GET',
      headers,
      url,
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_DAFTAR_DETIL_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_DAFTAR_DETIL_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function getInfoPerintahLorongLHP(idHeader) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/info-perintah-lorong/' + idHeader;

    const options = {
      method: 'GET',
      headers,
      url,
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_INFO_PERINTAH_LORONG_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_INFO_PERINTAH_LORONG_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function getInstruksiPemeriksaanLHP(idHeader) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/instruksi-pemeriksaan/' + idHeader;

    const options = {
      method: 'GET',
      headers,
      url,
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_INSTRUKSI_PEMERIKSAAN_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_INSTRUKSI_PEMERIKSAAN_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function getReferensiDetail(id_header) {

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/referensi-detail/' + id_header + '/items'

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    })

    const options = {
      headers,
      method: 'GET',
      url,
    }

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_REFERENSI_DETAIL',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_REFERENSI_DETAIL',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function getWaktuPemeriksaanLHP(idHeader) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/waktu-pemeriksaan/' + idHeader;

    const options = {
      method: 'GET',
      headers,
      url,
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_WAKTU_PEMERIKSAAN_LHP',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_WAKTU_PEMERIKSAAN_LHP',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function getDetailKemasanDokumen(idHeader) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/detail-kemasan-dokumen/' + idHeader;

    const options = {
      method: 'GET',
      headers,
      url,
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_DETAIL_KEMASAN_DOKUMEN',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_DETAIL_KEMASAN_DOKUMEN',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function getDetailKontainerDokumen(idHeader) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/detail-kontainer-dokumen/' + idHeader;

    const options = {
      method: 'GET',
      headers,
      url,
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_DETAIL_KONTAINER_DOKUMEN',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_DETAIL_KONTAINER_DOKUMEN',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function getDetailPerusahaanAsalDokumen(idHeader, kodeDokumen) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/detail-perusahaan-asal-dokumen/' + idHeader + '/' + kodeDokumen;

    const options = {
      method: 'GET',
      headers,
      url,
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_DETAIL_PERUSAHAAN_ASAL_DOKUMEN',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_DETAIL_PERUSAHAAN_ASAL_DOKUMEN',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export function getDetailPpjkDokumen(idHeader) { // 20191104

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP_API_URL + '/detail-ppjk-dokumen/' + idHeader;

    const options = {
      method: 'GET',
      headers,
      url,
    };

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if (process.env.REACT_APP_PUBLIC == 0) {

      axios(options)
        .then(function (response) {
          console.log(response.data)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_DETAIL_PPJK_DOKUMEN',
            payload: response.data
          })
        })
        .catch((error) => {
          fetch_error(error, dispatch)
          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
        })

    } else {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {

        if (this.readyState === 4) {

          if (this.status == 200 || this.status == 201) {

            var response = JSON.parse(this.responseText);
            console.log(response);

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })
            dispatch({
              type: 'SET_DETAIL_PPJK_DOKUMEN',
              payload: response
            })

          } else {

            fetch_error(this.responseText, dispatch)

            dispatch({
              type: 'SET_LOADING_LHP',
              payload: false
            })

          }

        }

      });

      xhr.open(options.method, url);

      Object.keys(options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });

      xhr.send(JSON.stringify(options.data));

    }

  }

}

export default function lhp(state = {
  dashboard: null,
  bap,
  delete_hdfs_foto,
  browse,
  browse_dokumen,
  detail_kontainer_dokumen,
  header_dokumen,
  delete_hdfs_foto_kontainer,
  delete_hdfs_foto_pemeriksaan,
  upload_foto_hdfs,
  submit_hapus_lhp_perintah_lorong,
  memo_pemeriksaan,
  waktu_pemeriksaan,
  kontainer_tambah,
  kontainer_periksa,
  info_perintah_lorong,
  submit_kirim_bap,
  submit_upload_foto_kontainer,
  submit_upload_foto_hdfs,
  submit_simpan_lhp_perintah_lorong,
  submit_update_rekam_bap,
  simpan_kontainer,
  daftar_detil,
  submit_rekam_detail,
  instruksi_pemeriksaan,
  view_lhp_bap,
  view_lhp_detail,
  memo_barang,
  submit_rekam_bap,
  referensi_detail,
  success: false,
  loading: false,
}, action) {
  switch (action.type) {
    case 'SET_UPLOAD_FOTO_HDFS_LHP':

      return update(state, {
        upload_foto_hdfs: {
          $set: action.payload
        },

      })

    case 'SET_SUBMIT_UPDATE_REKAM_BAP_LHP':

      return update(state, {
        submit_update_rekam_bap: {
          $set: action.payload
        },

      })

    case 'SET_SIMPAN_KONTAINER':

    return update(state, {
      simpan_kontainer: {
        $set: action.payload
      },
    })

    case 'SET_SUBMIT_REKAM_DETAIL_LHP':

      return update(state, {
        submit_rekam_detail: {
          $set: action.payload
        },

      })

    case 'SET_SUBMIT_UPLOAD_FOTO_HDFS_LHP':

      return update(state, {
        submit_upload_foto_hdfs: {
          $set: action.payload
        },

      })

    case 'SET_KONTAINER_TAMBAH_LHP':

      return update(state, {
        kontainer_tambah: {
          $set: action.payload
        },

      })

    case 'SET_KONTAINER_PERIKSA_LHP':

      return update(state, {
        kontainer_periksa: {
          $set: action.payload
        },

      })

    case 'SET_SUBMIT_REKAM_BAP_LHP':

      return update(state, {
        submit_rekam_bap: {
          $set: action.payload
        },

      })

    case 'SET_SUBMIT_KIRIM_BAP_LHP':

      return update(state, {
        submit_kirim_bap: {
          $set: action.payload
        },

      })

    case 'RESET_LHP':

      return update(state, {
        current_data: {
          $set: null
        },
        processed_data: {
          $set: null
        },

      })

    case 'SET_DELETE_HDFS_FOTO_LHP':

      return update(state, {
        delete_hdfs_foto: {
          $set: action.payload
        },

      })

    case 'SET_DELETE_HDFS_FOTO_KONTAINER_LHP':

      return update(state, {
        delete_hdfs_foto_kontainer: {
          $set: action.payload
        },

      })

    case 'SET_DELETE_HDFS_FOTO_PEMERIKSAAN_LHP':

      return update(state, {
        delete_hdfs_foto_pemeriksaan: {
          $set: action.payload
        },

      })

    case 'SET_INFO_PERINTAH_LORONG_LHP':

      return update(state, {
        info_perintah_lorong: {
          $set: action.payload
        },

      })

    case 'SET_BAP_LHP':

      return update(state, {
        bap: {
          $set: action.payload
        },

      })

    case 'SET_MEMO_BARANG_LHP':

      return update(state, {
        memo_barang: {
          $set: action.payload
        },

      })

    case 'SET_REFERENSI_DETAIL':

      return update(state, {
        referensi_detail: {
          $set: action.payload
        },

      })

    case 'SET_WAKTU_PEMERIKSAAN_LHP':

      return update(state, {
        waktu_pemeriksaan: {
          $set: action.payload
        },

      })

    case 'SET_DETAIL_KEMASAN_DOKUMEN':

      return update(state, {
        detail_kemasan_dokumen: {
          $set: action.payload
        },

      })

    case 'SET_DETAIL_KONTAINER_DOKUMEN':

      return update(state, {
        detail_kontainer_dokumen: {
          $set: action.payload
        },

      })

    case 'SET_DETAIL_PERUSAHAAN_ASAL_DOKUMEN':

      return update(state, {
        detail_perusahaan_asal_dokumen: {
          $set: action.payload
        },

      })

    case 'SET_DETAIL_PPJK_DOKUMEN':

      return update(state, {
        detail_ppjk_dokumen: {
          $set: action.payload
        },

      })

    case 'SET_MEMO_PEMERIKSAAN_LHP':

      return update(state, {
        memo_pemeriksaan: {
          $set: action.payload
        },

      })

    case 'SET_DAFTAR_DETIL_LHP':

      return update(state, {
        daftar_detil: {
          $set: action.payload
        },

      })

    case 'SET_BROWSE_DOKUMEN_LHP':

      return update(state, {
        browse_dokumen: {
          $set: action.payload
        },

      })

    case 'SET_HEADER_DOKUMEN_LHP':

      return update(state, {
        header_dokumen: {
          $set: action.payload
        },

      })

    case 'SET_INSTRUKSI_PEMERIKSAAN_LHP':

      return update(state, {
        instruksi_pemeriksaan: {
          $set: action.payload
        },

      })

    case 'SET_BROWSE_LHP':

      return update(state, {
        browse: {
          $set: action.payload
        },

      })

    case 'SET_SUBMIT_HAPUS_LHP_PERINTAH_LORONG_LHP':

      return update(state, {
        submit_hapus_lhp_perintah_lorong: {
          $set: action.payload
        },

      })

    case 'SET_SUBMIT_SIMPAN_LHP_PERINTAH_LORONG_LHP':

      return update(state, {
        submit_simpan_lhp_perintah_lorong: {
          $set: action.payload
        },

      })

    case 'SET_PROCESSED_LHP':

      return update(state, {
        processed_data: {
          $set: action.payload
        },

      })

    case 'SET_LOADING_LHP':

      return update(state, {
        loading: {
          $set: action.payload
        },

      })

    case 'SET_FORM_LHP':

      return update(state, {
        form: {
          $set: action.payload
        },

      })

    default:

      return state
  }
}
