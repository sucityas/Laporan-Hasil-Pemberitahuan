import url from "url";
import a from "axios";
import { getAccessHeader } from "./DataUser";

const ignore_token_for_path = ['referensi', 'cms']
const ignore_apikey_for_path = ['amws']

const additional_path='/v2' // dikarenakan pemanggilan API key menggunakan pathname awal maka yg /v2 harus dihilangkan
                            // karena kalau tidak yg ke ambil jadi v2 dan hasilnya keynya jadi undefined  

class HttpRequest {
  getPath(uri) {
    return url
      .parse(uri)
      .pathname.replace('-', '_').replace(additional_path, '')
      .split("/")[1]
      .toLowerCase();
  }

  getToken(url) {
    const path = this.getPath(url),
      {
        REACT_APP_SECRET_KEY_LHP,
        REACT_APP_SECRET_KEY_PARSER,
        REACT_APP_SECRET_KEY_AMWS,
        REACT_APP_SECRET_KEY_ESEAL,
        REACT_APP_SECRET_KEY_PERIJINAN,
        REACT_APP_SECRET_KEY_SCE_WS,
        REACT_APP_SECRET_KEY_RISK_ENGINE,
        REACT_APP_SECRET_KEY_CSEARCH,
        REACT_APP_SECRET_KEY_HDFS,
        REACT_APP_SECRET_KEY_SCE_GOLANG,
        REACT_APP_SECRET_KEY_PFPD,
        REACT_APP_SECRET_KEY_REFERENSI,
        REACT_APP_SECRET_KEY_PERBAIKAN,
        REACT_APP_SECRET_KEY_PEMBATALAN,
        REACT_APP_SECRET_KEY_SIMAUDI,
        REACT_APP_SECRET_KEY_BROWSE,
        REACT_APP_SECRET_KEY_SURAT_KUASA,
        REACT_APP_SECRET_KEY_AP,
        REACT_APP_SECRET_KEY_GATE,
        REACT_APP_SECRET_KEY_INTERCHANGE,
        REACT_APP_NOTIFIKASI_KEY,
        REACT_APP_SECRET_KEY_REPORT,
        REACT_APP_API_TPB_KEY
      } = process.env,
      token = {
        parser: REACT_APP_SECRET_KEY_PARSER,
        amws: REACT_APP_SECRET_KEY_AMWS,
        registrasi_pabean: REACT_APP_SECRET_KEY_PERIJINAN,
        hdfs: REACT_APP_SECRET_KEY_HDFS,
        sce: REACT_APP_SECRET_KEY_SCE_GOLANG,
        sce_ws: REACT_APP_SECRET_KEY_SCE_WS,
        referensi: REACT_APP_SECRET_KEY_REFERENSI,
        browse_service: REACT_APP_SECRET_KEY_BROWSE,
        suratkuasa: REACT_APP_SECRET_KEY_SURAT_KUASA,
        simaudi: REACT_APP_SECRET_KEY_SIMAUDI,
        perbaikan: REACT_APP_SECRET_KEY_PERBAIKAN,
        pembatalan: REACT_APP_SECRET_KEY_PEMBATALAN,
        pfpd: REACT_APP_SECRET_KEY_PFPD,
        csearch: REACT_APP_SECRET_KEY_CSEARCH,
        risk_engine: REACT_APP_SECRET_KEY_RISK_ENGINE,
        eseal: REACT_APP_SECRET_KEY_ESEAL,
        lhp: REACT_APP_SECRET_KEY_LHP,
        ap: REACT_APP_SECRET_KEY_AP,
        gate_beacukai: REACT_APP_SECRET_KEY_GATE,
        interchange : REACT_APP_SECRET_KEY_INTERCHANGE,
        notification_service: REACT_APP_NOTIFIKASI_KEY,
        report_service : REACT_APP_SECRET_KEY_REPORT,
        tpb_service : REACT_APP_API_TPB_KEY
      };
    if (ignore_apikey_for_path.includes(path)) return {headers: {}}
    return {
      headers: {
        "Customs-Api-Key": token[path],
      },
    };
  }

  mergeRecursive(obj1, obj2) {
    if (!obj1) return obj2;
    for (let p in obj2) {
      try {
        // Property in destination object set; update its value.
        if (obj2[p].constructor === Object) {
          obj1[p] = this.mergeRecursive(obj1[p], obj2[p]);
        } else {
          obj1[p] = obj2[p];
        }
      } catch (e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];
      }
    }
    return obj1;
  }

  async get(resourceHttpRequest) {
    const { url, config } = resourceHttpRequest,
      token = this.getToken(url),
      path = this.getPath(url)

    let accesstToken
    if (!ignore_token_for_path.includes(path)) {
      try {
        accesstToken = await getAccessHeader()
      } catch (e) {
        accesstToken = {headers: {}}
      }
    } else {
      accesstToken = {headers: {}}
    }
    // CreateLog.set(3, {urldata: url})
    return a.get(url, {
      ...this.mergeRecursive(this.mergeRecursive(config, token), accesstToken),
    });
  }

  async post(resourceHttpRequest) {
    const { url, config, data } = resourceHttpRequest,
      token = this.getToken(url),
      path = this.getPath(url)

    let accesstToken
    if (!ignore_token_for_path.includes(path)) {
      try {
        accesstToken = await getAccessHeader()
      } catch (e) {
        accesstToken = {headers: {}}
      }
    } else {
      accesstToken = {headers: {}}
    }
    // if (url !== 'https://api.beacukai.go.id/amws/v1/user-log/add') {
    //   CreateLog.set(2, {urldata: url})
    // }
    return a.post(url, data, {
      ...this.mergeRecursive(this.mergeRecursive(config, token), accesstToken),
    });
  }

  async put(resourceHttpRequest) {
    const { url, config, data } = resourceHttpRequest,
      token = this.getToken(url),
      path = this.getPath(url)

    let accesstToken
    if (!ignore_token_for_path.includes(path)) {
      try {
        accesstToken = await getAccessHeader()
      } catch (e) {
        accesstToken = {headers: {}}
      }
    } else {
      accesstToken = {headers: {}}
    }
    // CreateLog.set(4, {urldata: url})
    return a.put(url, data, {
      ...this.mergeRecursive(this.mergeRecursive(config, token), accesstToken),
    });
  }

  async delete(resourceHttpRequest) {
    const { url, config } = resourceHttpRequest,
      token = this.getToken(url),
      path = this.getPath(url)

    let accesstToken
    if (!ignore_token_for_path.includes(path)) {
      try {
        accesstToken = await getAccessHeader()
      } catch (e) {
        accesstToken = {headers: {}}
      }
    } else {
      accesstToken = {headers: {}}
    }
    // CreateLog.set(5, {urldata: url})
    return a.delete(url, {
      ...this.mergeRecursive(this.mergeRecursive(config, token), accesstToken),
    });
  }
}

export default new HttpRequest();
