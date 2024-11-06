import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Row,
  Col,
  Card,
  Input,
  Button,
  Spin,
  Select,
  Modal,
  Checkbox,
  Radio
} from 'antd';
import './scanImei.css';
import Axios from "axios";
import { getUser, getUserAccessToken, getAccessHeader } from "./utils/DataUser";
import Swal from "sweetalert2";
import QRCode from 'qrcode.react';
import moment from "moment";

const { Option } = Select;

const {
  REACT_APP_API_BARANG_PENUMPANG,
  REACT_APP_API_BARANG_PENUMPANG_QRCODE,
  REACT_APP_API_REGIS_IMEI_BARANG_PENUMPANG,
  REACT_APP_API_BARANG_PENUMPANG_REFTAC,
  REACT_APP_API_REGIS_IMEI_PENETAPAN,

  REACT_APP_API_BARANG_PENUMPANG_KEY,
  REACT_APP_API_BARANG_PENUMPANG_QRCODE_KEY,
  REACT_APP_API_REGIS_IMEI_BARANG_PENUMPANG_KEY,
  REACT_APP_API_BARANG_PENUMPANG_REFTAC_KEY,
  REACT_APP_API_REGIS_IMEI_PENETAPAN_KEY,
} = process.env;

function ScanImei({ form }) {
  const {
    getFieldDecorator,
    setFieldsValue,
    getFieldValue,
    validateFields,
    resetFields,
    getFieldsValue,
    getFieldError,
    getFieldInstance,
  } = form;

  const [accessToken, setAccessToken] = useState("");
  const [dataKirim, setDataKirim] = useState({});
  const [tacLoading, setTacLoading] = useState(false);
  const [modalQrVisible, setModalQrVisible] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [namaKantor, setNamaKantor] = useState("");
  const [nipLogin, setNipLogin] = useState("");
  const [kantorLogin, setKantorLogin] = useState("");
  const [waktuRekam, setWaktuRekam] = useState("");
  const [submitLoading, setSubmitLoading] = useState("");
  const [dev1_harga, setDev1_harga] = useState(null);
  const [dev2_harga, setDev2_harga] = useState(null);
  const [pembebasanColor, setPembebasanColor] = useState("#FF0000");
  const [qrPembebasan, setQrPembebasan] = useState(["", ""]);
  const [ecdLoading, setEcdLoading] = useState(false);
  const [isDetailHidden, setIsDetailHidden] = useState(true);
  const [ecdDev1Imei1, setEcdDev1Imei1] = useState("");
  const [ecdDev1Imei2, setEcdDev1Imei2] = useState("");
  const [ecdDev2Imei1, setEcdDev2Imei1] = useState("");
  const [ecdDev2Imei2, setEcdDev2Imei2] = useState("");
  const [ecdDev1Merk1, setEcdDev1Merk1] = useState("");
  const [ecdDev2Merk1, setEcdDev2Merk1] = useState("");
  const [ecdDev1Tipe1, setEcdDev1Tipe1] = useState("");
  const [ecdDev2Tipe1, setEcdDev2Tipe1] = useState("");
  const [isImeiEcd, setIsImeiEcd] = useState(false);
  const [dataEcd, setDataEcd] = useState(null);
  const [isLocalQr, setIsLocalQr] = useState(false);
  const [visibleModalImeiKeluarga, setVisibleModalImeiKeluarga] = useState(false);
  const [dataImeiKeluarga, setDataImeiKeluarga] = useState({});
  const [ecdHeader, setEcdHeader] = useState([]);
  const [namaPemilik, setNamaPemilik] = useState("");
  const [isData1Found, setIsData1Found] = useState(false);
  const [isData2Found, setIsData2Found] = useState(false);
  const [isHarga1Found, setIsHarga1Found] = useState(false);
  const [isHarga2Found, setIsHarga2Found] = useState(false);
  const [dev1_kondisi, setDev1_kondisi] = useState(2);
  const [dev2_kondisi, setDev2_kondisi] = useState(2);

  const qrCodeInput = useRef(null);
  const dev1Imei1Input = useRef(null);
  const dev1Imei2Input = useRef(null);
  const dev2Imei1Input = useRef(null);
  const dev2Imei2Input = useRef(null);



  // repeat function every 900 seconds


  const headers = {
    "beacukai-api-key": `${REACT_APP_API_BARANG_PENUMPANG_KEY}`,
  };
  const headersToken = {
    "beacukai-api-key": `${REACT_APP_API_BARANG_PENUMPANG_KEY}`,
    "Authorization": `Bearer ${accessToken}`,
  };
  const headersTokenPenetapan = {
    "beacukai-api-key": `${REACT_APP_API_REGIS_IMEI_PENETAPAN_KEY}`,
    "Authorization": `Bearer ${accessToken}`,
  };
  const headersRegisImei = {
    "beacukai-api-key": `${REACT_APP_API_REGIS_IMEI_BARANG_PENUMPANG_KEY}`,
    "Authorization": `Bearer ${accessToken}`,
  };
  const headersRefTac = {
    "beacukai-api-key": `${REACT_APP_API_BARANG_PENUMPANG_REFTAC_KEY}`,
  };


  const getToken = () => {
    getUserAccessToken().then((res) => {
      setAccessToken(res);
      console.log('getToken : ', res)
    });
  };

  useEffect(() => {
    setNipLogin(getUser().nip);
    setKantorLogin(getUser().kodeKantor);
    qrCodeInput.current.focus();

    getToken();
    setInterval(getToken, 900000);

    Axios.get(
      `${REACT_APP_API_BARANG_PENUMPANG}/referensi/kantor/list`, { headers: headers }
    ).then(res => {
      const kantor = res.data;
      kantor.find((item) => {
        if (item.kodeKantor === kantorLogin) {
          setNamaKantor(item.namaKantorPendek);
        }
      });
    })
      .catch(error => {
        console.log(error)
      });
  }, []);

  useEffect(() => {
    if (qrValue) {
      localStorage.setItem("namaKantor", namaKantor);
      localStorage.setItem("waktuRekam", waktuRekam);
      localStorage.setItem("qrValue", qrValue);
      localStorage.setItem("pembebasanColor", pembebasanColor);
      localStorage.setItem("qrPembebasan", JSON.stringify(qrPembebasan));
    }
  }, [qrValue]);

  const handleReset = () => {
    resetFields();
    setDev1_harga(null);
    setDev2_harga(null);
    setQrPembebasan(["", ""]);
    setPembebasanColor("#FF0000");
    setEcdDev1Imei1("");
    setEcdDev1Imei2("");
    setEcdDev2Imei1("");
    setEcdDev2Imei2("");
    setEcdDev1Merk1("");
    setEcdDev2Merk1("");
    setEcdDev1Tipe1("");
    setEcdDev2Tipe1("");
    setIsImeiEcd(false);
    setDataEcd(null);
    setIsDetailHidden(true);
    setNamaPemilik("");
    setDev1_kondisi(2);
    setDev2_kondisi(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const values = getFieldsValue();
    let hasError = false;
    for (const field in values) {
      const errors = getFieldError(field);
      if (errors) {
        hasError = true;
        break;
      }
    }
    if (!values.noPaspor || !values.dev1_imei1 || !values.dev1_merk || !values.dev1_tipe) {
      hasError = true;
    }
    if (values.dev2_imei1 && (!values.dev2_merk || !values.dev2_tipe)) {
      hasError = true;
    }
    if (hasError) {
      Swal.fire({
        title: "Error!",
        text: "Pastikan semua field terisi dengan benar",
        icon: "error",
      });
      setSubmitLoading(false);
    } else {
      // validasi regis imei
      Axios.get(
        `${REACT_APP_API_REGIS_IMEI_BARANG_PENUMPANG}/table/get-list-registrasi-imei-by-params?paspor=${values.noPaspor}`,
        { headers: headersRegisImei }
      ).then(res => {
        if (res.data.dataRegis.length > 0) {
          const dataRegis = res.data.dataRegis;
          const todayOrYesterday = dataRegis.filter(({ waktuRekam }) =>
            moment(waktuRekam).isSame(moment(), 'day') || moment(waktuRekam).isSame(moment().subtract(1, 'day'), 'day'))
            .map(({ waktuRekam, qrCode }) => {
              return { waktuRekam, qrCode };
            });
          let todayOrYesterdayText = todayOrYesterday.map((item) => moment(item.waktuRekam).format("DD-MM-YYYY")).join(", ");
          let qrCodeText = todayOrYesterday.map((item) => item.qrCode).join(", ");
          if (todayOrYesterday.length > 0) {
            Swal.fire({
              title: "Error!",
              text: `Paspor ${values.noPaspor} pernah mendaftarkan IMEI pada tanggal\n ${todayOrYesterdayText} dengan QR Code ${qrCodeText}`,
              icon: "error",
            });
            setSubmitLoading(false);
            return false;
          }
        } else {
          Axios.get(`${REACT_APP_API_REGIS_IMEI_PENETAPAN}/table/imei/list?imei1=${values.dev1_imei1}&imei2=${values.dev1_imei2}&imei3=${values.dev2_imei1}&imei4=${values.dev2_imei2}`, { headers: headersTokenPenetapan })
            // Axios.get(`http://10.102.104.191:8591/referensi-imei/table/imei/list?imei1=${values.dev1_imei1}&imei2=${values.dev1_imei2}&imei3=${values.dev2_imei1}&imei4=${values.dev2_imei2}`, { headers: headersTokenPenetapan })
            .then(res => {
              const imei = [res.data.data.imei1, res.data.data.imei2, res.data.data.imei3, res.data.data.imei4];
              if (imei.every((item) => item === null)) {
                setSubmitLoading(true);
                let tmpDataKirim = {};
                // hitung harga bekas
                let harga1 = dev1_harga;
                let harga2 = dev2_harga;
                let totalHarga = parseFloat(harga1 || 0) + parseFloat(harga2 || 0);

                const bebas = () => {
                  if (dev1_kondisi === 1 || dev2_kondisi === 1) {
                    return false;
                  }
                  if ((!isHarga1Found || (harga2 > 0 && !isHarga2Found)) && totalHarga <= 500) {
                    return true;
                  }
                  if (totalHarga <= 500) {
                    if (parseFloat(harga1 || 0) > 0 && parseFloat(harga2 || 0) > 0) {
                      return true;
                    } else if (parseFloat(harga1 || 0) > 0 && !values.dev2_imei1) {
                      return true;
                    }
                    return false;
                  } else {
                    return false;
                  }
                }
                const finalBebas = bebas();
                console.log("bebas", finalBebas)

                let dataImei = [
                  {
                    "hargaBarang": harga1 > 0 ? harga1 : 0,
                    "hargaPenetapan": finalBebas && harga1 > 0 ? harga1 : null,
                    "hargaUsd": harga1 > 0 ? harga1 : 0,
                    "imei1": values.dev1_imei1,
                    "imei2": values.dev1_imei2 || null,
                    "kodeValuta": "USD",
                    "merk": values.dev1_merk.toUpperCase(),
                    "tipe": values.dev1_tipe.toUpperCase(),
                    "nipRekam": nipLogin,
                    "flBekas": dev1_kondisi === 2 ? "Y" : "N",
                  }
                ]
                if (values.dev2_imei1) {
                  dataImei.push({
                    "hargaBarang": harga2 > 0 ? harga2 : 0,
                    "hargaPenetapan": finalBebas && harga2 > 0 ? harga2 : null,
                    "hargaUsd": harga2 > 0 ? harga2 : 0,
                    "imei1": values.dev2_imei1,
                    "imei2": values.dev2_imei2 || null,
                    "kodeValuta": "USD",
                    "merk": values.dev2_merk.toUpperCase(),
                    "tipe": values.dev2_tipe.toUpperCase(),
                    "nipRekam": nipLogin,
                    "flBekas": dev2_kondisi === 2 ? "Y" : "N",
                  })
                }

                tmpDataKirim = {
                  "tdDetailImei": dataImei,
                  "tdRegistrasiImei": {
                    "idHeaderEcd": dataEcd ? dataEcd.idHeader : null,
                    "jumlahPembebasan": totalHarga <= 500 ? totalHarga : 500,
                    "jumlahSisaPembebasan": totalHarga > 500 ? 0 : 500 - totalHarga,
                    "nama": dataEcd ? dataEcd.nama : null,
                    "nipRekam": nipLogin,
                    "nomorPengangkut": dataEcd ? dataEcd.nomorPengangkut : null,
                    "paspor": values.noPaspor,
                    "qrCodeEcd": dataEcd ? dataEcd.qrCode : null,
                    "waktuKedatangan": dataEcd ? moment(dataEcd.tanggalTiba).format("YYYY-MM-DD HH:mm:ss") : null,
                    "kodeStatus": finalBebas ? "PEMBEBASAN" : "PEMBAYARAN",
                    "kodeKantor": kantorLogin,
                    "flBypass": (!isHarga1Found || !isHarga2Found) && totalHarga <= 500 ? "Y" : "N",
                  }
                };
                let potensi = "";
                let tmpColor = "";

                // console.log("barang1, harga1, barang2, harga2")
                const tempData = {
                  "barang1": values.dev1_imei1,
                  "harga1": parseFloat(harga1 || 0),
                  "barang2": values.dev2_imei1,
                  "harga2": parseFloat(harga2 || 0),
                  "totalHarga": totalHarga,
                }


                if (finalBebas) {
                  potensi = [
                    "SELESAI",
                    "Jika perangkat belum aktif dalam 2x24 jam hubungi Bravo Beacukai 1500225"
                  ]
                  tmpColor = "#00FF00";
                  setPembebasanColor("#00FF00");
                  setQrPembebasan(potensi);
                } else {
                  const tanggalMax = isLocalQr ? moment(localStorage.getItem("waktuRekam"), 'YYYY-MM-DD').add(4, 'days').format('DD-MM-YYYY') : moment().add(4, 'days').format("DD-MM-YYYY");
                  potensi = [
                    "PENELITIAN LEBIH LANJUT",
                    "Silahkan ke petugas atau ke kantor bea dan cukai terdekat\npaling lambat tanggal " + tanggalMax
                  ]
                  tmpColor = "#FF0000";
                  setPembebasanColor("#FF0000");
                  setQrPembebasan(potensi);
                }

                function generateRandomString() {
                  const timestamp = new Date().getTime().toString();
                  let result = '';
                  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
                  const charactersLength = characters.length;
                  for (let i = 0; i < 21; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                  }
                  const timestampArray = timestamp.split('');
                  let output = '';
                  for (let i = 0; i < 21; i++) {
                    if (i % 2 === 0) {
                      output += result.charAt(i);
                    } else {
                      output += timestampArray.shift();
                    }
                  }
                  output += timestampArray.join('');
                  return output;
                }
                setDataKirim(tmpDataKirim);

                let tmpImei1 = () => {
                  let tmp = [];
                  [values.dev1_imei1, values.dev1_imei2].forEach((item) => {
                    if (item) {
                      tmp.push({
                        "imei": item,
                        "nipRekam": nipLogin,
                        "flRegis": "",
                        "idBarang": "",
                        "nipUpdate": null,
                        "wkRekam": null,
                        "wkUpdate": null
                      })
                    }
                  })
                  return tmp;
                }
                let tmpImei2 = () => {
                  let tmp = [];
                  [values.dev2_imei1, values.dev2_imei2].forEach((item) => {
                    if (item) {
                      tmp.push({
                        "imei": item,
                        "nipRekam": nipLogin,
                        "flRegis": "",
                        "idBarang": "",
                        "nipUpdate": null,
                        "wkRekam": null,
                        "wkUpdate": null
                      })
                    }
                  })
                  return tmp;
                }

                const html = `
              <div className="swal-custom">
                <div className="swal-custom__header">
                  <h3 className="swal-custom__title" style="color:${tmpColor}">${potensi[0]}</h3>
                </div>
              </div>`;

                // swal confirm with custom element
                Swal.fire({
                  title: "Pastikan data sudah benar.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Lanjutkan",
                  cancelButtonText: "Batal",
                  // html: html,
                }).then((result) => {
                  if (result.value) {
                    // setWaktuRekam(moment().format("DD-MM-YYYY HH:mm:ss"));
                    // call axios kirim data
                    let dataKirimFinal = tmpDataKirim;
                    dataKirimFinal.tdRegistrasiImei.waktuRekam = moment().format("YYYY-MM-DD HH:mm:ss");
                    dataKirimFinal.tdDetailImei.waktuRekam = moment().format("YYYY-MM-DD HH:mm:ss");
                    setWaktuRekam(moment().format("YYYY-MM-DD HH:mm:ss"));
                    let tmpHeaderPool = {
                      "header": {
                        "flProses": "",
                        "idHeader": "",
                        "idRekam": nipLogin,
                        "jmlBarang": "1",
                        "jnsIdentitas": "",
                        "kdAplikasi": "05",
                        "nipApprove": nipLogin,
                        "noIdentitas": values.noPaspor,
                        "status": window.location.href.includes("ceisa40.customs.go.id") ? "30" : "80",
                        "tglDok": moment().format("YYYY-MM-DD"),
                        "nama": dataEcd ? dataEcd.nama : null,
                      },
                      "tdHktBarang": {
                        "idBarang": "",
                        "idHeader": "",
                        "nipRekam": nipLogin,
                        "nipUpdate": "",
                        "wkRekam": null,
                        "wkUpdate": null
                      },
                    };

                    let tmpDataPool = [];
                    if (values.dev1_imei1) {
                      tmpDataPool.push({
                        ...tmpHeaderPool,
                        "tdHktImeiList": tmpImei1(),
                      })
                      tmpDataPool[0].tdHktBarang.merk = values.dev1_merk;
                      tmpDataPool[0].tdHktBarang.tipe = values.dev1_tipe;
                    }
                    if (values.dev2_imei1) {
                      tmpDataPool.push({
                        ...tmpHeaderPool,
                        "tdHktImeiList": tmpImei2(),
                      })
                      tmpDataPool[1].tdHktBarang.merk = values.dev2_merk;
                      tmpDataPool[1].tdHktBarang.tipe = values.dev2_tipe;
                    }
                    Axios.post(
                      `${REACT_APP_API_REGIS_IMEI_BARANG_PENUMPANG}/table/insert-regis-imei/insert`,
                      // `http://10.102.104.140:8591/table/insert-regis-imei/insert`,
                      // `https://apisdev-gw.beacukai.go.id/v3/registrasi-imei-barang-penumpang/table/insert-regis-imei/insert`,
                      // `http://dev-registrasi-imei-barangpenumpangservice.apps.dev.customs.go.id/registrasi-imei/table/insert-regis-imei/insert`,
                      dataKirimFinal,
                      { headers: headersRegisImei }
                    )
                      .then((res) => {
                        if (res.data.status === true) {
                          const qrCode = res.data.data.qrCode;
                          if (finalBebas) {
                            async function postData() {
                              for (const data of tmpDataPool) {
                                try {
                                  const res = await Axios.post(
                                    `${REACT_APP_API_REGIS_IMEI_PENETAPAN}/table/imei`,
                                    // `http://10.102.104.191:8591/referensi-imei/table/imei`,
                                    data,
                                    { headers: headersTokenPenetapan }
                                  );
                                  if (res.data.status) {
                                    qrCodeInput.current.focus();
                                    setQrValue(qrCode);
                                    setSubmitLoading(false);
                                    setIsLocalQr(false);
                                    setModalQrVisible(true);
                                  }
                                } catch (err) {
                                  Swal.fire({
                                    title: "Gagal kirim data pool",
                                    text: err,
                                    icon: "error",
                                  });
                                  setSubmitLoading(false);
                                  // break the loop if an error occurs
                                  break;
                                }
                              }
                            }

                            // call the function
                            postData();

                          } else {
                            qrCodeInput.current.focus();
                            setQrValue(qrCode)
                            setSubmitLoading(false);
                            setIsLocalQr(false);
                            setModalQrVisible(true);
                          }
                        }
                      })
                      .catch((err) => {
                        console.log("err", err);
                        setSubmitLoading(false);
                        Swal.fire({
                          title: "Gagal",
                          text: "Gagal mengirim data.",
                          icon: "error",
                        });
                      });
                  } else {
                    setSubmitLoading(false);
                  }
                });
              } else {
                const notNull = imei.map((_, i) => i + 1).filter(i => imei[i - 1] !== null);
                const messages = notNull.map(i => {
                  const deviceNumber = Math.ceil(i / 2);
                  const imeiNumber = i % 2 === 0 ? 2 : 1;
                  return `Perangkat ${deviceNumber} IMEI ${imeiNumber}`;
                });
                let text = messages.join(", ") + " sudah pernah didaftarkan.";

                Swal.fire({
                  title: "Gagal",
                  text: text,
                  icon: "error",
                });
                setSubmitLoading(false);
              }
            })
            .catch((err) => {
              console.log("err", err);
              setSubmitLoading(false);
              Swal.fire({
                title: "Gagal",
                text: "Gagal mengirim data.",
                icon: "error",
              });
            });
        }
      })
        .catch((err) => {
          console.log("err", err);
          setSubmitLoading(false);
          Swal.fire({
            title: "Gagal",
            text: err,
            icon: "error",
          });
        });
    }

  };

  const cekImei = (imei, device) => {
    if (imei.length >= 15) {
      if (validateImei(imei) === false) {
        return;
      }
      else {
        setTacLoading(true);
        // imei = imei.substring(0, 8);
        // const url = `http://10.102.104.140:8590/table/list-data-tac?imeiNumber=${imei}`
        // const url = `http://10.162.73.73:8590/referensi-tac/table/list-data-tac?imeiNumber=${imei}`
        // const url = `https://apis-gw.beacukai.go.id/referensi-tac/table/list-data-tac?imeiNumber=${imei}`
        const url = `${REACT_APP_API_BARANG_PENUMPANG_REFTAC}/table/list-data-tac?imeiNumber=${imei}`
        Axios.get(url, { headers: headersRefTac })
          .then((res) => {
            if (res.data.status === true) {
              const dataTac = res.data.dataTac;
              if (device === "d1") {
                setIsData1Found(true);
                dev1Imei2Input.current.focus();
                setFieldsValue({
                  dev1_merk: dataTac[0].merkTipe.split(" ")[0],
                  dev1_tipe: dataTac[0].merkTipe,
                });
                // get highest price
                let hargaMax = Math.max(...dataTac.map(obj => {
                  let harga = parseFloat(obj.harga);
                  if (isNaN(harga)) {
                    harga = 0;
                    setIsHarga1Found(false);
                  } else {
                    setIsHarga1Found(true);
                  }
                  return harga;
                }));
                setDev1_harga(hargaMax);
              } else {
                setIsData2Found(true);
                dev2Imei2Input.current.focus();
                setFieldsValue({
                  dev2_merk: dataTac[0].merkTipe.split(" ")[0],
                  dev2_tipe: dataTac[0].merkTipe,
                });
                // get highest price
                let hargaMax = Math.max(...dataTac.map(obj => {
                  let harga = parseFloat(obj.harga);
                  if (isNaN(harga)) {
                    harga = 0;
                    setIsHarga2Found(false);
                  } else {
                    setIsHarga2Found(true);
                  }
                  return harga;
                }));
                setDev2_harga(hargaMax)
              }
            } else {
              setIsData1Found(false);
              setIsData2Found(false);
              setIsHarga1Found(false);
              setIsHarga2Found(false);
              if (device === "d1") {
                setFieldsValue({
                  dev1_merk: "",
                  dev1_tipe: "",
                });
                setDev1_harga(null)
              } else {
                setFieldsValue({
                  dev2_merk: "",
                  dev2_tipe: "",
                });
                setDev2_harga(null)
              }
            }
            setTacLoading(false);
          })
          .catch((err) => {
            Swal.fire({
              title: "Gagal",
              text: "Gagal mengambil data TAC.",
              icon: "error",
            });
            console.log(err);
            setTacLoading(false);
          });
      }
    }
  };
  // sample 865957047421594
  function validatePassport(passport) {
    if (passport.length < 5) {
      return false;
    }
    const allSame = /^(\w)\1*$/.test(passport); // regex to check for all-same characters
    const sequential = /01234|12345|23456|34567|45678|56789|67890|asdfg|sdfgh|dfghj|fghjk|ghjkl|hjklm|jklmn|klmno|zxcvb|xcvbn|cvbnm|qwert|werty|ertyu|rtyui|tyuio|yuiop|ghijk|hijkl|ijklm|jklmn|klmno|pqrst|qrstuv|rstuv|stuvw|tuvwx|uvwxy|vwxyz/.test(passport.toLowerCase());
    const hasSpecialChars = /[^a-zA-Z0-9]/.test(passport); // regex to check for non-alphanumeric characters
    return !(allSame || sequential || hasSpecialChars);
  }


  // validate imei return message
  const validateImei = (input, data = null) => {
    // valid => 2, imei1=imei2 => 1, invalid => 0
    let status = 0;
    input = input.toString();
    let label = data ? Object.keys(data)[0] : null;
    if (label === "dev1_imei2") {
      const imei1 = getFieldValue("dev1_imei1");
      if (imei1 === data[label]) {
        status = 1;
        return status;
      }
    }
    if (label === "dev2_imei2") {
      const imei1 = getFieldValue("dev2_imei1");
      if (imei1 === data[label]) {
        status = 1;
        return status;
      }
    }
    if (input.length > 14) {
      let computedCheckDigit = getCheckDigit(input.substring(0, 14));
      let checkDigitInSource = parseInt(input.substring(14));
      if (computedCheckDigit === checkDigitInSource) {
        status = 2;
      }
      if (input.length > 15) {
        status = 0;
      }
    }
    return status;
  }

  const getCheckDigit = (imeiPrefix) => {
    let sum = 0;
    for (let i = 13; i >= 0; i--) {
      let sDigit = imeiPrefix.substring(i, i + 1);
      let digit = parseInt(sDigit);
      if (i % 2 === 0) {
        sum = sum + digit;
      } else {
        sum = sum + sumOfDigits(digit * 2);
      }
    }
    sum = sum * 9;
    return sum % 10;
  }

  const sumOfDigits = (number) => {
    let sum = 0;
    while (number > 0) {
      sum += number % 10;
      number = parseInt(number / 10);
    }
    return sum;
  }
  const validateNip = (nip) => {
    if (nip.length !== 18) {
      return false;
    }
    const year = parseInt(nip.substring(0, 4));
    const month = parseInt(nip.substring(4, 6));
    const day = parseInt(nip.substring(6, 8));
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return false;
    }
    const ym = nip.substring(8, 14);
    if (!/^\d{6}$/.test(ym)) {
      return false;
    }
    const y = parseInt(ym.substring(0, 4));
    const m = parseInt(ym.substring(4, 6));
    if (y < 1900 || y > new Date().getFullYear() || m < 1 || m > 12) {
      return false;
    }
    if (nip[14] !== '1' && nip[14] !== '2') {
      return false;
    }
    if (!/^\d{3}$/.test(nip.substring(15, 18))) {
      return false;
    }
    return true;
  }

  const handleQrEcd = (data) => {
    //if data length >=6 call api
    if (data.length >= 6) {
      // http://dev-qrcodebarangpenumpang.apps.dev.customs.go.id/barang-penumpang-qrcode/swagger-ui.html#/table-controller/getDataQrCodeTacUsingGET
      const url = `${REACT_APP_API_BARANG_PENUMPANG_QRCODE}/table/header/getDataQrCodeTac?kodeKantorTiba=${kantorLogin}&nipUpdate=${nipLogin}&qrCode=${data}`;
      // const url = `http://dev-qrcodebarangpenumpang.apps.dev.customs.go.id/barang-penumpang-qrcode/table/header/getDataQrCodeTac?kodeKantorTiba=${kantorLogin}&nipUpdate=${nipLogin}&qrCode=${data}`;
      // jika belum dipindai
      // const url = `https://run.mocky.io/v3/5c241c5e-80b2-47af-a58c-6db96acfb050`
      // jika declare barang lain
      // const url = `https://run.mocky.io/v3/dccc7aa1-03ad-4dc6-b89e-4964b6661bf0`
      // jika imei lebih dari 2
      // const url = `https://run.mocky.io/v3/ccf9d1ea-2b70-46e5-97f9-51106c1672ea`
      // jika sudah dipindai dan ada 2 hkt
      // const url = `https://run.mocky.io/v3/70dd99b8-277d-453c-93c3-9e8c1c453d31`

      setEcdLoading(true);
      Axios
        .get(url, { headers })
        .then((res) => {
          if (res.data.status === "true") {
            if (res.data.dataHeader.waktuPindai) {
              dev1Imei1Input.current.focus();
              setEcdLoading(false);
              setFieldsValue({ qrEcd: "" });
              const dataDetail = res.data.dataDetail.filter(item => Boolean(item.imei1));
              const adaBarangLain = res.data.dataDetail.some(item => !item.imei1);
              const text = adaBarangLain ? "Terdapat deklarasi barang lain selain HKT" : "";
              let imeiKeluarga = {};
              if (dataDetail.length > 2) {
                imeiKeluarga = dataDetail.reduce((acc, curr) => {
                  const key = curr.namaTercantum;
                  // delete curr.namaTercantum; // remove the 'namaTercantum' property from the object
                  if (!acc[key]) {
                    acc[key] = [];
                  }
                  acc[key].push(curr);
                  return acc;
                }, {});
              }
              if (Object.entries(imeiKeluarga).length > 1) {
                setVisibleModalImeiKeluarga(true);
                setDataImeiKeluarga(imeiKeluarga);
                setEcdHeader(res.data.dataHeader);
              } else {
                if (!adaBarangLain) {
                  setDataEcd(res.data.dataHeader, dataDetail);
                  setDataImei(res.data.dataHeader, dataDetail);
                } else if (adaBarangLain) {
                  Swal.fire({
                    title: "Error",
                    text: text,
                    icon: "error",
                  });
                  setEcdLoading(false);
                  setFieldsValue({ qrEcd: "" });
                  setDataEcd(null);
                  setDataImei();
                }
              }
            } else {
              Swal.fire({
                title: "Error",
                text: "ECD belum dipindai",
                icon: "error",
              });
              setEcdLoading(false);
              setFieldsValue({ qrEcd: "" });
              setDataEcd(null);
              setDataImei();
            }
          } else {
            Swal.fire({
              title: "Error",
              text: "ECD tidak ditemukan",
              icon: "error",
            });
            setEcdLoading(false);
            setFieldsValue({ qrEcd: "" });
            setDataEcd(null);
            setDataImei();
          }
        })
        .catch((err) => {
          Swal.fire({
            title: "Error",
            text: err,
            icon: "error",
          });
          console.log(err);
          setEcdLoading(false);
          setFieldsValue({ qrEcd: "" });
          setDataEcd(null);
          setDataImei();
        });
    }
  }
  const setDataImei = (dataHeader = null, dataDetail = null) => {
    if (dataHeader) {
      setFieldsValue({
        noPaspor: dataHeader.paspor,
      });
    }
    if (dataDetail) {
      // setFieldsValue({
      //   dev1_imei1: dataDetail[0].imei1 || "",
      //   dev1_imei2: dataDetail[0].imei2 || "",
      //   dev2_imei1: dataDetail[1].imei1 || "",
      //   dev2_imei2: dataDetail[1].imei2 || "",
      // });
      // cekImei(dataDetail[0].imei1, "d1");
      // cekImei(dataDetail[1].imei1, "d2");
      setEcdDev1Imei1(dataDetail[0] ? dataDetail[0].imei1 : "");
      setEcdDev1Imei2(dataDetail[0] ? dataDetail[0].imei2 : "");
      setEcdDev2Imei1(dataDetail[1] ? dataDetail[1].imei1 : "");
      setEcdDev2Imei2(dataDetail[1] ? dataDetail[1].imei2 : "");
      setEcdDev1Merk1(dataDetail[0] ? dataDetail[0].merk : "");
      setEcdDev2Merk1(dataDetail[1] ? dataDetail[1].merk : "");
      setEcdDev1Tipe1(dataDetail[0] ? dataDetail[0].tipe : "");
      setEcdDev2Tipe1(dataDetail[1] ? dataDetail[1].tipe : "");
      setIsImeiEcd(true);
      setIsDetailHidden(false);
    }
  }
  const ecdStyle = { lineHeight: "1", fontSize: "12px", fontWeight: "bold", color: "#0a2c4a", float: "right" };


  const passportValidator = (rule, value, callback) => {
    if (validatePassport(value) === false) {
      callback("Paspor tidak valid.");
    } else {
      callback();
    }
  };
  const imeiValidator = (rule, value, callback) => {
    if (value.length === 15) {
      if (validateImei(value) === 0) {
        callback("IMEI tidak valid.");
      } else {
        callback();
      }
    } else if (value.length > 1) {
      callback("IMEI tidak valid.");
    } else {
      callback();
    }
  }

  const sameImeiValidator = (rule, value, callback) => {
    const imei1 = getFieldValue("dev1_imei1");
    const imei2 = getFieldValue("dev1_imei2");
    const imei3 = getFieldValue("dev2_imei1");
    const imei4 = getFieldValue("dev2_imei2");

    if (rule.field === "dev1_imei2") {
      if (value.length >= 15) {
        dev2Imei1Input.current.focus();
      }
    }

    // count the number of defined and non-empty fields
    const definedFields = [imei1, imei2, imei3, imei4].filter((imei) => imei !== undefined && imei !== "");

    // validate if at least 2 defined fields have the same value
    if (definedFields.length >= 2 && (new Set(definedFields).size !== definedFields.length)) {
      callback("IMEI tidak boleh sama.");
    } else {
      callback();
    }
  };

  const dataEcdValidator = (rule, value, callback) => {
    const fieldKey = rule.field;
    if (isImeiEcd) {
      const dataEcd = {
        dev1_imei1: ecdDev1Imei1,
        dev1_imei2: ecdDev1Imei2,
        dev1_merk: ecdDev1Merk1,
        dev1_tipe: ecdDev1Tipe1,
        dev2_imei1: ecdDev2Imei1,
        dev2_imei2: ecdDev2Imei2,
        dev2_merk: ecdDev2Merk1,
        dev2_tipe: ecdDev2Tipe1,
      }
      if (dataEcd[fieldKey] !== value) {
        callback("Data tidak sesuai dengan ECD.");
      } else {
        callback();
      }
    } else {
      callback();
    }
  }


  return (
    <>
      <Row id="scan-imei">
        <Card
          title="Registrasi IMEI"
          bordered={false}
          style={{ width: "100%" }}
        >
          <Spin
            spinning={submitLoading || ecdLoading}
          >
            <Form>
              <Row gutter={16}>
                <Col span={12}>
                  <Card
                    bordered={false}
                    style={{ width: "100%" }}
                  >
                    <Form.Item label="No Paspor">
                      <div hidden={!Boolean(Object.entries(dataImeiKeluarga).length > 1)} style={ecdStyle}>{namaPemilik}</div>
                      {getFieldDecorator("noPaspor", {
                        rules: [
                          {
                            required: true,
                            message: "No Paspor harus diisi.",
                          },
                          {
                            validator: passportValidator
                          }
                        ],
                      })(<Input
                        maxLength={12}
                        allowClear
                        onInput={e => e.target.value = e.target.value.toUpperCase()}
                      />)}
                    </Form.Item>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    bordered={false}
                    style={{ width: "100%" }}
                  >
                    {/* <Form.Item label="No Penerbangan">
                      {getFieldDecorator("noPenerbangan", {
                        rules: [
                          {
                            required: true,
                            message: "No Penerbangan harus diisi",
                          },
                        ],
                      })(
                        <Select
                          allowClear
                          showSearch
                          placeholder="Pilih No Penerbangan"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {
                            flightNumber[kantorLogin].map((item, index) => {
                              return (
                                <Option key={index} value={item}>{item}</Option>
                              )
                            })
                          }
                        </Select>,
                      )}
                    </Form.Item> */}
                    <Form.Item label="QR ECD">
                      {getFieldDecorator("qrEcd")(
                        <Input
                          onChange={(e) => { handleQrEcd(e.target.value) }}
                          maxLength={6}
                          ref={qrCodeInput}
                          allowClear
                        />
                      )}
                    </Form.Item>
                  </Card>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Card
                    title="Perangkat 1"
                    bordered={false}
                    style={{ width: "100%" }}
                  >
                    <Form.Item label="IMEI 1">
                      <div hidden={isDetailHidden} style={ecdStyle}>{ecdDev1Imei1}</div>
                      {getFieldDecorator("dev1_imei1", {
                        rules: [
                          {
                            required: true,
                            message: "IMEI 1 harus diisi",
                          },
                          {
                            validator: imeiValidator
                          },
                          {
                            validator: sameImeiValidator
                          },
                          {
                            validator: dataEcdValidator
                          }
                        ],
                      })(<Input
                        onInput={(e) => { cekImei(e.target.value, "d1") }}
                        maxLength={15}
                        ref={dev1Imei1Input}
                        allowClear
                      />)}
                    </Form.Item>
                    <Form.Item label="IMEI 2">
                      <div hidden={isDetailHidden} style={ecdStyle}>{ecdDev1Imei2}</div>
                      {getFieldDecorator("dev1_imei2", {
                        rules: [
                          {
                            validator: imeiValidator
                          },
                          {
                            validator: sameImeiValidator
                          },
                          {
                            validator: dataEcdValidator
                          }
                        ],
                      })(<Input
                        maxLength={15}
                        ref={dev1Imei2Input}
                        allowClear
                      />)}
                    </Form.Item>
                    <Spin spinning={tacLoading}>
                      <Form.Item label="Merk">
                        <div hidden={isDetailHidden} style={ecdStyle}>{ecdDev1Merk1}</div>
                        {getFieldDecorator("dev1_merk", {
                          rules: [
                            {
                              required: true,
                              message: "Merk harus diisi"
                            }
                          ]
                        })(<Input readOnly={isData1Found} />)}
                      </Form.Item>
                      <Form.Item label="Tipe">
                        <div hidden={isDetailHidden} style={ecdStyle}>{ecdDev1Tipe1}</div>
                        {getFieldDecorator("dev1_tipe", {
                          rules: [
                            {
                              required: true,
                              message: "Tipe harus diisi"
                            }
                          ]
                        })(<Input readOnly={isData1Found} />)}
                      </Form.Item>
                    </Spin>
                    <Checkbox onChange={e => setDev1_kondisi(e.target.checked ? 1 : 2)} checked={dev1_kondisi === 1}>
                      Baru
                    </Checkbox>
                    {/* <Radio.Group onChange={e => setDev1_kondisi(e.target.value)} value={dev1_kondisi}>
                      <Radio value={1}>
                        Baru
                      </Radio>
                      <Radio value={2}>
                        Bekas
                      </Radio>
                    </Radio.Group> */}
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    title="Perangkat 2"
                    bordered={false}
                    style={{ width: "100%" }}
                  >
                    <Form.Item label="IMEI 1">
                      <div hidden={isDetailHidden} style={ecdStyle}>{ecdDev2Imei1}</div>
                      {getFieldDecorator("dev2_imei1", {
                        rules: [
                          {
                            validator: imeiValidator
                          },
                          {
                            validator: sameImeiValidator
                          },
                          {
                            validator: dataEcdValidator
                          }
                        ]
                      })(<Input
                        onInput={(e) => { cekImei(e.target.value, "d2") }}
                        maxLength={15}
                        ref={dev2Imei1Input}
                        allowClear
                      />)}
                    </Form.Item>
                    <Form.Item label="IMEI 2">
                      <div hidden={isDetailHidden} style={ecdStyle}>{ecdDev2Imei2}</div>
                      {getFieldDecorator("dev2_imei2", {
                        rules: [
                          {
                            validator: imeiValidator
                          },
                          {
                            validator: sameImeiValidator
                          },
                          {
                            validator: dataEcdValidator
                          }
                        ]
                      })(<Input
                        maxLength={15}
                        ref={dev2Imei2Input}
                        allowClear
                      />)}
                    </Form.Item>
                    <Spin spinning={tacLoading}>
                      <Form.Item label="Merk">
                        <div hidden={isDetailHidden} style={ecdStyle}>{ecdDev2Merk1}</div>
                        {getFieldDecorator("dev2_merk", {
                          rules: [
                            {
                              required: getFieldValue("dev2_imei1") ? true : false,
                              message: "Merk harus diisi"
                            }
                          ]
                        })(<Input readOnly={isData2Found} />)}
                      </Form.Item>
                      <Form.Item label="Tipe">
                        <div hidden={isDetailHidden} style={ecdStyle}>{ecdDev2Tipe1}</div>
                        {getFieldDecorator("dev2_tipe", {
                          rules: [
                            {
                              required: getFieldValue("dev2_imei1") ? true : false,
                              message: "Tipe harus diisi"
                            }
                          ]
                        })(<Input readOnly={isData2Found} />)}
                      </Form.Item>
                    </Spin>
                    <Checkbox onChange={e => setDev2_kondisi(e.target.checked ? 1 : 2)} checked={dev2_kondisi === 1}>
                      Baru
                    </Checkbox>
                    {/* <Radio.Group onChange={e => setDev2_kondisi(e.target.value)} value={dev2_kondisi}>
                      <Radio value={1}>
                        Baru
                      </Radio>
                      <Radio value={2}>
                        Bekas
                      </Radio>
                    </Radio.Group> */}
                    <div style={{ float: "right", marginTop: "28px" }}>
                      <Button
                        type="primary"
                        icon="qrcode"
                        onClick={e => { setIsLocalQr(true); setModalQrVisible(true) }}
                      >
                        QR Tersimpan
                      </Button>
                      <Button
                        type="danger"
                        onClick={handleReset}
                        style={{ marginLeft: "12px" }}
                      >
                        Reset
                      </Button>
                      <Button
                        type="primary"
                        onClick={handleSubmit}
                        style={{ marginLeft: "12px" }}
                      >
                        Submit
                      </Button>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
      </Row>
      <Modal
        title="Pendaftaran IMEI"
        visible={modalQrVisible}
        centered
        width={1280}
        onCancel={() => {
          setModalQrVisible(false);
          handleReset();
        }}
        destroyOnClose={true}
        footer={null}
      >
        {localStorage.getItem("qrValue") ?
          <Row
            style={{ textAlign: "center" }}
          >
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>{isLocalQr ? localStorage.getItem("namaKantor") : namaKantor}</div>
            <div style={{ fontSize: "24px", marginBottom: "16px" }}>{isLocalQr ? moment(localStorage.getItem("waktuRekam"), "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY HH:mm:ss") : moment(waktuRekam, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY HH:mm:ss")}</div>
            <QRCode
              value={isLocalQr ? localStorage.getItem("qrValue") : qrValue}
              size={256}
              level={"H"}
            />
            <div style={{ fontSize: "32px", fontWeight: "bold" }}>
              {isLocalQr ? localStorage.getItem("qrValue") : qrValue}
            </div>
            <div style={{
              position: "relative",
              border: `10px solid ${isLocalQr ? localStorage.getItem("pembebasanColor") : pembebasanColor}`,
              width: "fit-content",
              padding: "4px 12px",
              margin: "auto",
            }}>
              <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                {isLocalQr ? JSON.parse(localStorage.getItem("qrPembebasan"))[0].toUpperCase() : qrPembebasan[0].toUpperCase()}
              </div>
            </div>
            <div style={{ paddingTop: "22px", fontSize: "22px", width: "400px", margin: "auto" }}>
              {isLocalQr ? JSON.parse(localStorage.getItem("qrPembebasan"))[1] : qrPembebasan[1]}
            </div>
          </Row>
          :
          <Row
            style={{ textAlign: "center" }}
          >
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>Belum ada QR Tersimpan</div>
          </Row>
        }
      </Modal>
      <Modal
        title="Pendaftaran IMEI"
        visible={visibleModalImeiKeluarga}
        centered
        width={600}
        onCancel={() => {
          setVisibleModalImeiKeluarga(false);
        }}
        destroyOnClose={true}
        footer={null}
      >
        <Row
          style={{ marginBottom: "12px" }}
        >
          Terdapat lebih dari 1 anggota keluarga, silahkan pilih salah satu.
        </Row>
        <Row>
          {
            Object.entries(dataImeiKeluarga).map(([key, value]) => {
              return (
                <Button
                  key={key}
                  type="primary"
                  onClick={() => {
                    setDataImei(ecdHeader, value);
                    setDataEcd(ecdHeader, value);
                    setVisibleModalImeiKeluarga(false);
                    setNamaPemilik(key);
                    if (key !== ecdHeader.nama) {
                      setFieldsValue({
                        "noPaspor": null,
                      })
                    }
                  }}
                  style={{ marginRight: "12px" }}
                >
                  {key}
                </Button>
              )
            })
          }
        </Row>
      </Modal>
    </>
  );
}

export default Form.create()(ScanImei);
