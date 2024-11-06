import error_notif from "./error_notif";
import { getUser } from "../../utils/DataUser";

const {
  REACT_APP_PERIJINAN,
  REACT_APP_SECRET_KEY_PERIJINAN,
  REACT_APP_NPPBKC,
  REACT_APP_NPPBKC_KEY,
} = process.env;
export function getInfo(e) {
  return async (dispatch) => {
    return await fetch(
      `${REACT_APP_PERIJINAN}/v1/perusahaan-nppbkc?npwp15=${e}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "Beacukai-Api-Key": `${REACT_APP_SECRET_KEY_PERIJINAN}`,
        }),
      }
    )
      .then((body) => body.json())
      .then((body) => {
        console.log(getUser().identitas, "inigetUser");
        // console.log(body, 'inibodynanya')
        dispatch(getPerusahaan(body.data[0]));
      })
      .catch((error) => {
        return error_notif.openNotificationWithIcon("error");
      });
  };
}

export function getPerusahaan(dataperusahaan) {
  return {
    type: "GET_INFO_PERUSAHAAN",
    dataperusahaan: dataperusahaan,
  };
}
//option jenis lampiran
export function getJnslampiran() {
  return async (dispatch) => {
    return await fetch(`${REACT_APP_PERIJINAN}/v1/ref-lampiran`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Beacukai-Api-Key": `${REACT_APP_SECRET_KEY_PERIJINAN}`,
      }),
    })
      .then((body) => body.json())
      .then((body) => {
        console.log(getUser(), "inigetuser");
        dispatch(getJenisLampiran(body.data));
      })
      .catch((error) => {
        return error_notif.openNotificationWithIcon("error");
      });
  };
}
export function getTablePerpajakan() {
  return async (dispatch) => {
    return await fetch(`${REACT_APP_PERIJINAN}/v1/reg-nppbkc-jenis-akun`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Beacukai-Api-Key": `${REACT_APP_SECRET_KEY_PERIJINAN}`,
      }),
    })
      .then((body) => body.json())
      .then((body) => {
        dispatch(gettblPajak(body.data));
      })
      .catch((error) => {
        return error_notif.openNotificationWithIcon("error");
      });
  };
}
export function gettblPajak(datatabelpajak) {
  return {
    type: "GET_TABEL_PAJAK",
    datatabelpajak: datatabelpajak,
  };
}
export function getJenisLampiran(datajenislampiran) {
  return {
    type: "GET_JENIS_LAMPIRAN",
    datajenislampiran: datajenislampiran,
  };
}
export function getOptionsBadanHukum() {
  return async (dispatch) => {
    return await fetch(`${REACT_APP_PERIJINAN}/v1/ref-nppbkc-badan-hukum`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Beacukai-Api-Key": `${REACT_APP_SECRET_KEY_PERIJINAN}`,
      }),
    })
      .then((body) => body.json())
      .then((body) => {
        dispatch(getBadanHukum(body.data));
      })
      .catch((error) => {
        return error_notif.openNotificationWithIcon("error");
      });
  };
}
export function getBadanHukum(dataBadanhukum) {
  return {
    type: "GET_OPTION_BADANHUKUM",
    dataBadanhukum: dataBadanhukum,
  };
}
export function getOptionsJenisDok() {
  return async (dispatch) => {
    return await fetch(`${REACT_APP_PERIJINAN}/v1/ref-nppbkc-jenis-dokumen`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Beacukai-Api-Key": `${REACT_APP_SECRET_KEY_PERIJINAN}`,
      }),
    })
      .then((body) => body.json())
      .then((body) => {
        dispatch(getJenisDok(body.data));
      })
      .catch((error) => {
        return error_notif.openNotificationWithIcon("error");
      });
  };
}
export function getJenisDok(dataJenisdok) {
  return {
    type: "GET_OPTION_JENISDOK",
    dataJenisdok: dataJenisdok,
  };
}
export function getOptionsRekening() {
  return async (dispatch) => {
    return await fetch(`${REACT_APP_PERIJINAN}/v1/ref-nppbkc-jenis-rekening`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Beacukai-Api-Key": `${REACT_APP_SECRET_KEY_PERIJINAN}`,
        "Access-Control-Allow-Origin": "*",
      }),
    })
      .then((body) => body.json())
      .then((body) => {
        dispatch(getJenisRekening(body.data));
      })
      .catch((error) => {
        return error_notif.openNotificationWithIcon("error");
      });
  };
}
export function getJenisRekening(dataJenisrekening) {
  return {
    type: "GET_OPTION_JENISREKENING",
    dataJenisrekening: dataJenisrekening,
  };
}

export function getOptionsValuta() {
  return async (dispatch) => {
    return await fetch(`${REACT_APP_PERIJINAN}/v1/ref-nppbkc-jenis-valuta`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Beacukai-Api-Key": `${REACT_APP_SECRET_KEY_PERIJINAN}`,
        "Access-Control-Allow-Origin": "*",
      }),
    })
      .then((body) => body.json())
      .then((body) => {
        dispatch(getJenisValuta(body.data));
      })
      .catch((error) => {
        return error_notif.openNotificationWithIcon("error");
      });
  };
}
export function getJenisValuta(dataJenisvaluta) {
  return {
    type: "GET_OPTION_JENISVALUTA",
    dataJenisvaluta: dataJenisvaluta,
  };
}
export function getOptionsAppAkuntan() {
  return async (dispatch) => {
    return await fetch(`${REACT_APP_PERIJINAN}/v1/reg-nppbkc-app-akuntansi`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Beacukai-Api-Key": `${REACT_APP_SECRET_KEY_PERIJINAN}`,
      }),
    })
      .then((body) => body.json())
      .then((body) => {
        dispatch(getJenisAppAkunan(body.data));
      })
      .catch((error) => {
        return error_notif.openNotificationWithIcon("error");
      });
  };
}
export function getJenisAppAkunan(dataJenisappakuntan) {
  return {
    type: "GET_OPTION_APPAKUNTAN",
    dataJenisappakuntan: dataJenisappakuntan,
  };
}
export function getOptionsPeriodeLaporan() {
  return async (dispatch) => {
    return await fetch(`${REACT_APP_PERIJINAN}/v1/reg-nppbkc-periode-laporan`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Beacukai-Api-Key": `${REACT_APP_SECRET_KEY_PERIJINAN}`,
      }),
    })
      .then((body) => body.json())
      .then((body) => {
        dispatch(getJenisPeriodeLaporan(body.data));
      })
      .catch((error) => {
        return error_notif.openNotificationWithIcon("error");
      });
  };
}
export function getJenisPeriodeLaporan(dataJenisperiodelaporan) {
  return {
    type: "GET_OPTION_PERIODELAPORAN",
    dataJenisperiodelaporan: dataJenisperiodelaporan,
  };
}
export function getCheckboxJenisUsaha() {
  return async (dispatch) => {
    return await fetch(`${REACT_APP_NPPBKC}/v1/ref-jenis_usaha_cukai/options`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Beacukai-Api-Key": `${REACT_APP_NPPBKC_KEY}`,
      }),
    })
      .then((body) => body.json())
      .then((body) => {
        dispatch(getdatajenisusaha(body.data));
      })
      .catch((error) => {
        return error_notif.openNotificationWithIcon("error");
      });
  };
}
export function getdatajenisusaha(dataJenisusaha) {
  return {
    type: "GET_CHECKBOX_JENISUSAHA",
    dataJenisusaha: dataJenisusaha,
  };
}
export function getCheckboxJenisBkc() {
  return async (dispatch) => {
    return await fetch(`${REACT_APP_NPPBKC}/v1/ref-jenis_bkc/options`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Beacukai-Api-Key": `${REACT_APP_NPPBKC_KEY}`,
      }),
    })
      .then((body) => body.json())
      .then((body) => {
        dispatch(getdatajenisbkc(body.data));
      })
      .catch((error) => {
        return error_notif.openNotificationWithIcon("error");
      });
  };
}
export function getdatajenisbkc(dataJenisbkc) {
  return {
    type: "GET_CHECKBOX_JENISBKC",
    dataJenisbkc: dataJenisbkc,
  };
}
