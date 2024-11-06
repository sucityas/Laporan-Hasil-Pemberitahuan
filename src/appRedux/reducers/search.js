import update from "immutability-helper";
import qs from "qs";
import axios from "axios";
import _ from "lodash";

import barang from "./dummy_search/barang";
import dokumen from "./dummy_search/dokumen";
import kontainer from "./dummy_search/kontainer";
import orang from "./dummy_search/orang";
import pengangkut from "./dummy_search/pengangkut";

import { fetch_error } from "./index";

const headers = {
  "Content-Type": "application/json",
  "beacukai-api-key": process.env.REACT_APP_SECRET_KEY_CSEARCH,
};

export function searchData(t, f, s, q, p = {}) {
  return (dispatch, store) => {
    let url = process.env.REACT_APP_CSEARCH + "/" + t + "/search";

    var keylist = [];

    switch (t) {
      case "barang":
        var keylist = [
          "jenis_barang",
          "cara_angkut",
          "fl_larbts",
          "fta",
          "hs_code",
          "hs_code_pfpd",
          "id_barang",
          "id_nama",
          "id_no",
          "kantor",
          "nm_pemasok",
          "no_dok",
          "status_jalur",
          "ur_brg",
        ];

        break;

      case "orang":
        var keylist = [
          "alamat",
          "jabatan",
          "nama",
          "nama_perusahaan",
          "neg_asal",
          "nik",
          "npwp",
          "npwp_perusahaan",
          "paspor",
          "posisi",
          "sumber_data",
        ];

        break;

      case "pengangkut":
        var keylist = [
          "bendera",
          "kantor",
          "nama_sarkut",
          "nama_sarkut_imo",
          "no_bc11",
          "owner_sarkut",
        ];

        break;

      case "dokumen":
        var keylist = [
          "id_dok",
          "jenis",
          "kantor",
          "no_daftar",
          "nomor"
        ];

        break;

      case "kontainer":
        var keylist = [
          "dok_pabean",
          "gudang",
          "id_kontainer",
          "kantor",
          "no_dok_pabean",
          "nomor",
          "perusahaan_kontainer",
          "ukuran",
          "no_dok_pabean",
        ];

        break;

      case "pemasok":
        var keylist = [
          "alamat",
          "id_pemasok",
          "negara",
          "nama"
        ];          ;

        break;

      case "perusahaan":
        var keylist = [
          "alamat",
          "id_perusahaan",
          "jenis",
          "nama",
          "nib",
          "npwp9",
          "profil",
          "sumber_data",
        ];

        break;

      default:
        return;

        break;
    }

    let queries = q;

    for (let i = 0; i <= keylist.length - 1; i++) {
      const x = keylist[i];

      if (p[x]) {
        queries += " AND " + x + ":'" + p[x] + "' ";
      }
    }

    const data = {
      from: f ? f : 0,
      size: s ? s : 10,
      query: q ? queries : "",
    };

    url += "?" + qs.stringify(data);

    const options = {
      method: "GET",
      headers,
      url,
    };

    dispatch({
      type: "SET_LOADING_SEARCH",
      payload: true,
    });

    axios(options)
      .then(function (response) {
        dispatch({
          type: "SET_LOADING_SEARCH",
          payload: false,
        });

        dispatch({
          type: "SET_SEARCH_" + t.toUpperCase(),
          payload: response.data,
        });
      })
      .catch((error) => {
        fetch_error(error, dispatch);

        dispatch({
          type: "SET_LOADING_SEARCH",
          payload: false,
        });
      });
  };
}

export function tgl_barang(f, q, s, p = {}) {
  return (dispatch, store) => {
    const tab = "barang";
    const keylist = [
      "jenis_barang",
      "cara_angkut",
      "fl_larbts",
      "fta",
      "hs_code",
      "hs_code_pfpd",
      "id_barang",
      "id_nama",
      "id_no",
      "kantor",
      "nm_pemasok",
      "no_dok",
      "status_jalur",
      "ur_brg",
    ];
    let url = process.env.REACT_APP_CSEARCH + "/" + tab + "/search";
    let queries = s;

    for (let i = 0; i <= keylist.length - 1; i++) {
      let x = keylist[i];
      if (p[x]) {
        queries += " AND " + x + ":'" + p[x] + "' ";
        // queries =s;
      }
    }

    const data = {
      from: f ? f : 0,
      size: q ? q : 10,
      query: s ? queries : "",
      sort: "tgl_dok:desc,_score",
    };
    url += "?" + qs.stringify(data);
    const options = {
      method: "GET",
      headers,
      url,
    };
    dispatch({
      type: "SET_LOADING_SEARCH",
      payload: true,
    });

    axios(options)
      .then(function (response) {
        dispatch({
          type: "SET_LOADING_SEARCH",
          payload: false,
        });

        dispatch({
          type: "SET_SEARCH_" + tab.toUpperCase(),
          payload: response.data,
        });
      })
      .catch((error) => {
        fetch_error(error, dispatch);

        dispatch({
          type: "SET_LOADING_SEARCH",
          payload: false,
        });
      });
  };
}

export function tgl_kontainer(f, q, s, p = {}) {
  return (dispatch, store) => {
    const tab = "kontainer";
    const keylist = [
      "dok_pabean",
      "gudang",
      "id_kontainer",
      "kantor",
      "no_dok_pabean",
      "nomor",
      "perusahaan_kontainer",
      "ukuran",
      "no_dok_pabean",
    ];
    let url = process.env.REACT_APP_CSEARCH + "/" + tab + "/search";
    const queries = s;

    for (const i = 0; i <= keylist.length - 1; i++) {
      const x = keylist[i];
      if (p[x]) {
        queries += " AND " + x + ":'" + p[x] + "' ";
      }
    }

    let data = {
      from: f ? f : 0,
      size: q ? q : 10,
      query: s ? queries : "",
      sort: "tgl_dok_pabean:desc,_score",
    };
    url += "?" + qs.stringify(data);
    const options = {
      method: "GET",
      headers,
      url,
    };
    dispatch({
      type: "SET_LOADING_SEARCH",
      payload: true,
    });

    axios(options)
      .then(function (response) {
        dispatch({
          type: "SET_LOADING_SEARCH",
          payload: false,
        });

        dispatch({
          type: "SET_SEARCH_" + tab.toUpperCase(),
          payload: response.data,
        });
      })
      .catch((error) => {
        fetch_error(error, dispatch);

        dispatch({
          type: "SET_LOADING_SEARCH",
          payload: false,
        });
      });
  };
}

export function tgl_dokumen(f, q, s, p = {}) {
  return (dispatch, store) => {
    const tab = "dokumen";
    const keylist = ["id_dok", "jenis", "kantor", "no_daftar", "nomor"];
    let url = process.env.REACT_APP_CSEARCH + "/" + tab + "/search";
    let queries = s;

    for (let i = 0; i <= keylist.length - 1; i++) {
      let x = keylist[i];
      if (p[x]) {
        queries += " AND " + x + ":'" + p[x] + "' ";
      }
    }

    const data = {
      from: f ? f : 0,
      size: q ? q : 10,
      query: s ? queries : "",
      sort: "tgl_daftar:desc,_score",
    };
    url += "?" + qs.stringify(data);
    const options = {
      method: "GET",
      headers,
      url,
    };
    dispatch({
      type: "SET_LOADING_SEARCH",
      payload: true,
    });

    axios(options)
      .then(function (response) {
        dispatch({
          type: "SET_LOADING_SEARCH",
          payload: false,
        });

        dispatch({
          type: "SET_SEARCH_" + tab.toUpperCase(),
          payload: response.data,
        });
      })
      .catch((error) => {
        fetch_error(error, dispatch);

        dispatch({
          type: "SET_LOADING_SEARCH",
          payload: false,
        });
      });
  };
}

export function tgl_pengangkut(f, q, s, p = {}) {
  return (dispatch, store) => {
    const tab = "pengangkut";
    const keylist = [
      "bendera",
      "kantor",
      "nama_sarkut",
      "nama_sarkut_imo",
      "no_bc11",
      "owner_sarkut",
      "tgl_bc11",
    ];
    let url = process.env.REACT_APP_CSEARCH + "/" + tab + "/search";
    const queries = s;

    for (let i = 0; i <= keylist.length - 1; i++) {
      let x = keylist[i];
      if (p[x]) {
        queries += " AND " + x + ":'" + p[x] + "' ";
      }
    }

    let data = {
      from: f ? f : 0,
      size: q ? q : 10,
      query: s ? queries : "",
      sort: "_score:asc",
    };
    url += "?" + qs.stringify(data);
    const options = {
      method: "GET",
      headers,
      url,
    };
    dispatch({
      type: "SET_LOADING_SEARCH",
      payload: true,
    });

    axios(options)
      .then(function (response) {
        dispatch({
          type: "SET_LOADING_SEARCH",
          payload: false,
        });

        dispatch({
          type: "SET_SEARCH_" + tab.toUpperCase(),
          payload: response.data,
        });
      })
      .catch((error) => {
        fetch_error(error, dispatch);

        dispatch({
          type: "SET_LOADING_SEARCH",
          payload: false,
        });
      });
  };
}

export function getDataNik(nik) {
  return (dispatch, store) => {
    const links = process.env.REACT_APP_SCE_WS;
    const url =
      links + "/dukcapil/get-foto?kodeAplikasi=31&nik=" + nik + "&nip=null";

    const options = {
      method: "GET",
      headers,
      url,
    };

    dispatch({
      type: "SET_CURRENT_SEARCH",
      payload: null,
    });

    dispatch({
      type: "SET_LOADING_SEARCH",
      payload: true,
    });

    const data = {
      status: "succes",
      message: "Berhasil",
    };

    axios(options)
      .then((response) => {
        data.item = response.data[0];
        dispatch({
          type: "SET_LOADING_SEARCH",
          payload: false,
        });

        dispatch({
          type: "SET_CURRENT_SEARCH",
          payload: data,
        });
      })
      .catch((error) => {
        console.log("error");
        fetch_error(error, dispatch);

        dispatch({
          type: "SET_LOADING_SEARCH",
          payload: false,
        });
      });
  };
}

export function getDataPaspor(paspor) {
  return (dispatch, store) => {
    const linkps = process.env.REACT_APP_SCE_WS;
    const url =
      linkps +
      "/imigrasi/get-passpor-by-no?pasporNumber=" +
      paspor +
      "&nationalityId=IDN";
    const options = {
      method: "GET",
      headers,
      url,
    };

    dispatch({
      type: "SET_CURRENT_SEARCH",
      payload: null,
    });

    dispatch({
      type: "SET_LOADING_SEARCH",
      payload: true,
    });

    const data = {
      status: "succes",
      message: "Berhasil",
    };

    axios(options)
      .then((response) => {
        const res = response.data;

        if (res.length != 0) {
          data.item = response.data;
        }
        dispatch({
          type: "SET_LOADING_SEARCH",
          payload: false,
        });

        dispatch({
          type: "SET_CURRENT_SEARCH",
          payload: data,
        });
      })
      .catch((error) => {
        console.log("error");
        fetch_error(error, dispatch);

        dispatch({
          type: "SET_LOADING_SEARCH",
          payload: false,
        });
      });
  };
}

export function  getData(t, id) {
  return (dispatch, store) => {
    const url = process.env.REACT_APP_CSEARCH + "/" + t + "/" + id;

    const options = {
      method: "GET",
      headers,
      url,
    };

    dispatch({
      type: "SET_LOADING_SEARCH",
      payload: true,
    });

    axios(options)
      .then(function (response) {
        dispatch({
          type: "SET_LOADING_SEARCH",
          payload: false,
        });

        dispatch({
          type: "SET_CURRENT_SEARCH",
          payload: response.data,
        });
      })
      .catch((error) => {
        fetch_error(error, dispatch);

        dispatch({
          type: "SET_LOADING_SEARCH",
          payload: false,
        });
      });
  };
}

export function getAllData(t, f, s) {
  return (dispatch, store) => {
    let url = process.env.REACT_APP_CSEARCH + "/" + t;

    const data = {
      from: f ? f : 0,
      size: s ? s : 6,
    };

    url += "?" + qs.stringify(data);

    const options = {
      method: "GET",
      headers,
      url,
    };

    dispatch({
      type: "SET_LOADING_SEARCH",
      payload: true,
    });

    axios(options)
      .then(function (response) {
        dispatch({
          type: "SET_LOADING_SEARCH",
          payload: false,
        });

        dispatch({
          type: "SET_SEARCH_" + t.toUpperCase(),
          payload: response.data,
        });
      })
      .catch((error) => {
        fetch_error(error, dispatch);

        dispatch({
          type: "SET_LOADING_SEARCH",
          payload: false,
        });
      });
  };
}

export default function search(
  state = {
    kontainer,
    dokumen,
    barang,
    orang,
    pengangkut,
    pemasok: {},
    perusahaan: {},

    processed_data: null,
    current_data: null,
    success: false,
    loading: false,
  },
  action
) {
  switch (action.type) {
    case "SET_SEARCH":
      return update(state, {
        response: {
          $set: action.payload,
        },
        processed_data: {
          $set: null,
        },
      });

    case "RESET_SEARCH":
      return update(state, {
        current_data: {
          $set: null,
        },
        processed_data: {
          $set: null,
        },
      });

    case "SET_CURRENT_SEARCH":
      return update(state, {
        current_data: {
          $set: action.payload,
        },
      });

    case "SET_PROCESSED_SEARCH":
      return update(state, {
        processed_data: {
          $set: action.payload,
        },
      });

    case "SET_SEARCH_BARANG":
      return update(state, {
        barang: {
          $set: action.payload,
        },
      });

    case "SET_SEARCH_ORANG":
      return update(state, {
        orang: {
          $set: action.payload,
        },
      });

    case "SET_SEARCH_KONTAINER":
      return update(state, {
        kontainer: {
          $set: action.payload,
        },
      });

    case "SET_SEARCH_PENGANGKUT":
      return update(state, {
        pengangkut: {
          $set: action.payload,
        },
      });

    case "SET_SEARCH_DOKUMEN":
      return update(state, {
        dokumen: {
          $set: action.payload,
        },
      });

    case "SET_SEARCH_PERUSAHAAN":
      return update(state, {
        perusahaan: {
          $set: action.payload,
        },
      });

    case "SET_SEARCH_PEMASOK":
      return update(state, {
        pemasok: {
          $set: action.payload,
        },
      });

    case "SET_LOADING_SEARCH":
      return update(state, {
        loading: {
          $set: action.payload,
        },
      });

    case "SET_FORM_SEARCH":
      return update(state, {
        form: {
          $set: action.payload,
        },
      });

    default:
      return state;
  }
}
