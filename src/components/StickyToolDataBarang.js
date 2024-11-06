import React, { Component } from "react";
import { connect } from 'react-redux';


import swal from 'sweetalert2';
import {
  Drawer,
  Button,
  Tabs,
  Modal,
  Input,
  Col,
  Form,
  notification,
  DatePicker,
  Radio,
  Row,
  message,
  Alert,
  Spin,
  Badge,
  Skeleton
} from 'antd';
import moment from 'moment';
import IdentitasPerusahaan from '../pages/pfpd/PfpdDataHeader/IdentitasPerusahaan'
import { API_CHECK_DISABLED, API_UPSERT_PROSES, API_PROSES_PARSER, API_RESPON_PARSER, API_PFPD_KEPUTUSAN, API_PROSES_PARSER_PUT, API_INSERT_DOKUMEN, API_COPY_TDDOKUMEN, API_RESPON_DETAIL, API_KESIMPULAN_PFPD, API_KESIMPULAN_PFPD_POST, API_GET_NPD , API_GET_CETAKAN_DOKUMEN, API_CEK_LARTAS, API_CEK_FTA, API_CEK_BMT, API_CEK_KUOTA_LARTAS, API_GESER_HS, API_REFERENSI_DOKUMEN} from "pages/pfpd/API"
import DataGrid, { Column, Editing, Paging, Lookup, Selection, Scrolling } from 'devextreme-react/data-grid';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import { Widget, toggleWidget } from 'react-chat-widget';
import _ from "lodash";
import 'react-chat-widget/lib/styles.css';
import logo from '../logo.svg';
import './style.css';
import Status from "../pages/pfpd/PfpdPencarian/Status";
import Respon from "../pages/pfpd/PfpdPencarian/Respon";
import { getUser } from "../utils/DataUser";

// import localStorage from "redux-persist/es/storage";

const { TabPane } = Tabs;
const { TextArea } = Input;


function callback(key) {
  console.log(key);
}



let nipPfpd = getUser().nip
localStorage.setItem('listHsCode', null)
class StickyToolDataBarang extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.toggle = this.toggle.bind(this)
    this.dataGrid = null;
    this.selectionChangedBySelectBox = false;

    this.state = {
      modalLartas: false,
      loadingTools: false,
      kesimpulanPfpd: null,
      reloadDokap: 0,
      showNotif: true,
      pathState: null,
      npdData: [],
      formData: {
        flagAmbil: "",
        flagAmbilPlb: "",
        idHeader: JSON.parse(localStorage.getItem('idHeader')),
        idRespon: "",
        kodeRespon: "",
        // kodeKantor: this.props.kodeKantor,
        kodeKantor: "040300",
        nomorRespon: "",
        tanggalRespon: "",
        uraian: "",
        waktuAmbil: "",
        waktuAmbilPlb: "",
        waktuRespon: ""
      },
      formData1: {
        catatan: "",
        flagAmbil: "",
        idProses: JSON.parse(localStorage.getItem('idHeader')),
        idProsesStatus: "",
        kodeProses: "",
        latitude: "",
        longitude: "",
        // nipMulai: this.props.nip,
        nipMulai: nipPfpd,
        // nipSelesai: this.props.nip,
        nipSelesai: nipPfpd,
        urlImage: "",
        waktuMulai: "",
        waktuSelesai: ""
      },
      formData2: {
        catatan: "",
        flagAmbil: "",
        idProses: JSON.parse(localStorage.getItem('idHeader')),
        idProsesStatus: "",
        kodeProses: "",
        latitude: "",
        longitude: "",
        // nipMulai: this.props.nip,
        nipMulai: nipPfpd,
        // nipSelesai: this.props.nip,
        nipSelesai: nipPfpd,
        urlImage: "",
        waktuMulai: "",
        waktuSelesai: ""
      },
      formPfpd: {
        alasanArsip: "",
        alasanDnp: "",
        alasanTidakSesuai: "",
        flagDenda: "",
        flagDendaNol: "",
        flagKonsultasi: "",
        flagMerahSesuai: "",
        flagSebagian: "",
        hasilKonsultasi: "",
        idHeader: JSON.parse(localStorage.getItem('idHeader')),
        idPfpdKeputusan: "",
        keputusanDnp: "",
        kesimpulanKonsultasi: "",
        kesimpulanPfpd: "",
        nipRekam: nipPfpd,
        nipUpdate: nipPfpd,
        nomorBaknp: "",
        nomorDnp: "",
        nomorLppnp: "",
        nomorLppt: "",
        nomorPenetapan: "",
        tanggalBaknp: "",
        tanggalDnp: "",
        tanggalLppnp: "",
        tanggalLppt: "",
        tanggalPenetapan: "",
        uraianAudit: "",
        waktuRekam: "",
        waktuTerimaDnp: "",
        waktuUpdate: "",
        catatanSpbl: ""
      },
      responDetail: {
        idHeader: JSON.parse(localStorage.getItem('idHeader')),
        idRespon: null,
        idResponDetail: '',
        responDetail: '',
        seriResponDetail: '',
        tdDokumenList: []
      },
      listDokumen : [],
      triggerNotif: null,
      npd: [],
      lartasList: [],
      ftaList: [],
      kuotaLartasList: [],
      bmtList: [],
      startDate: moment(),
      events: [],
      dataNpd: { dokumen: [] },
      prefix: '',
      selectedEmployeeNames: 'Nobody has been selected',
      selectedRowKeys: [],
      flagSudahDipenuhi: false,
      alertHs: false,
      loadingINP: false,
      loadingDNP: false,
      buttonINP: [],
      buttonDNP: false,
      loadINP: false,
      buttonUndangan: false,
      buttonKonsultasi: false,
      loadKonsultasi: false,
      buttonNPD: false,
      buttonLab: false,
      buttonArsip: false,
      buttonQa: false,
      loadNPD: false,
      buttonLartas: false,
      buttonAudit: false,
      buttonKonfitmasi: [],
      loadKonfirmasi: false,
      loadingAudit: false,
      seriBarang: [],
      modalKeputusan: false,
      loadingKesimpulan: false,
      namaKantorPanjang : ""
    }
    this.logEvent = this.logEvent.bind(this);
    this.onEditingStart = this.logEvent.bind(this, 'EditingStart');
    this.onInitNewRow = this.logEvent.bind(this, 'InitNewRow');
    // this.onRowInserting = this.onRowInserting.bind(this);
    this.onRowInserted = this.logEvent.bind(this, 'RowInsertrd');
    this.onChangeNPD = this.onChangeNPD.bind(this)
    // this.onClearButtonClicked = this.onClearButtonClicked.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    // this.onSelectionFilterChanged = this.onSelectionFilterChanged.bind(this);

  }
  state = {
    text: '',
    visible: false,
    placement: 'right',
    childrenDrawer: false,
    modal_informasi: false,
    modal_dnp: false,
    modal_undangan: false,
    modal_hasil: false,
    modal_npd: false,
    modal_kub: false,
    modal_lab: false,
    modal_arsip: false,
    modal_dokumen_pabean: false,
    modal_atensi_larangan: false,
    modal_atensi_audit: false,
    messageList: [],
    open: false,
    allMode: 'allPages',
    checkBoxesMode: 'onClick',
    selectedRowKeys: [],
    countData: null,

  };
  logEvent(eventName) {
    console.log("event", eventName)
    this.setState((state) => {
      console.log("states", state)
      return { events: [eventName].concat(state.events) };
    });
  }

  countNotif = async () => {
    const tempCount = []
    this.state.lartasList.map(e => {
      tempCount.push(e.seriBarang)
    })
    this.setState({
      countData: tempCount.length
    })
    const countLodash = await _.uniq(tempCount)
    console.log("Berapa jumlah notf", countLodash.length)
  }
  getApiLartas = async (hsCode, seriBarang) => {
    const objPosTarif = [{ 'seriBarang': seriBarang, 'posTarif': hsCode }]
    console.log("objPosTarif", objPosTarif)
    const tanggalDaftar = JSON.parse(localStorage.getItem('tanggalDaftar'))
    const hide = message.loading(`Cek lartas HS ${hsCode} seri barang ${seriBarang}...`, 0);

    try{
      const {data : response} = await API_CEK_LARTAS(hsCode, tanggalDaftar)
      console.log("apilartas",response)
      if (response) {
        const data = []
        objPosTarif.forEach(e => {
          e.alert = 'true'
          data.push(e)
        })
        this.oopenAlertLartas('true', hsCode, seriBarang)
        data.forEach(itemIncoming => {
          if (this.state.lartasList.filter(itemInitial => itemInitial.seriBarang === itemIncoming.seriBarang).length == 0) {
            this.state.lartasList.push(itemIncoming)
            this.countNotif()
          }
        })
      } else {
        const data = []
        objPosTarif.forEach(e => {
          e.alert = 'false'
          data.push(e)
        })
        data.forEach(itemIncoming => {
          if (this.state.lartasList.filter(itemInitial => itemInitial.seriBarang === itemIncoming.seriBarang).length == 0) {
            this.state.lartasList.push(itemIncoming)
            this.countNotif()
          }
        })
        this.oopenAlertLartas('false', hsCode, seriBarang)
      }
    }catch(e){  
      message.error('Gagal melakukan pengecekan lartas.');
    }
    finally{
      setTimeout(hide, 100)
    
    }
  }
  //kuota Lartas
  getApiKuotaLartas = async (hsCode, seriBarang) => {
    const objPosTarif = [{ 'seriBarang': seriBarang, 'posTarif': hsCode }]
    console.log("objPosTarif", objPosTarif)
    const tanggalDaftar = JSON.parse(localStorage.getItem('tanggalDaftar'))
    const hide = message.loading(`Cek Kuota lartas HS ${hsCode} seri barang ${seriBarang}...`, 0);
    try{
      const {data : response} = await API_CEK_KUOTA_LARTAS(hsCode, tanggalDaftar)
      if (response) {
        const data = []
        objPosTarif.forEach(e => {
          e.alert = 'true'
          data.push(e)
        })
        this.openAlertKuotaLartas('true', hsCode, seriBarang)
        data.forEach(itemIncoming => {
          if (this.state.kuotaLartasList.filter(itemInitial => itemInitial.seriBarang === itemIncoming.seriBarang).length == 0) {
            this.state.kuotaLartasList.push(itemIncoming)
          }
        })
      } else {
        const data = []
        objPosTarif.forEach(e => {
          e.alert = 'false'
          data.push(e)
        })
        data.forEach(itemIncoming => {
          if (this.state.kuotaLartasList.filter(itemInitial => itemInitial.seriBarang === itemIncoming.seriBarang).length == 0) {
            this.state.kuotaLartasList.push(itemIncoming)
          }
        })
        this.openAlertKuotaLartas('false', hsCode, seriBarang)
      }
    }catch(e){
      message.error('Gagal melakukan pengecekan kuota lartas.');
    }
    finally{
    setTimeout(hide, 100)

    }
  }

  //NNegara FTA
  getAPiCekFTA = async (id, seriBarang, hsCode) => {
    const objPosTarif = [{ 'seriBarang': seriBarang, 'posTarif': hsCode }]
    console.log("objPosTarif", objPosTarif)
    const hide = message.loading(`Cek Negata FTA ${hsCode} Seri barang ${seriBarang}...`, 0);
    try{
      const {data : response} = await API_CEK_FTA(id)
      if (!response) {
        this.openAlertFta('true', hsCode, seriBarang)
        const data = []
        objPosTarif.forEach(e => {
          e.alert = 'false'
          data.push(e)
        })
        data.forEach(itemIncoming => {
          if (this.state.ftaList.filter(itemInitial => itemInitial.seriBarang === itemIncoming.seriBarang).length == 0) {
            this.state.ftaList.push(itemIncoming)
          }
        })
      } else {
        const data = []
        objPosTarif.forEach(e => {
          e.alert = 'true'
          data.push(e)
        })
        data.forEach(itemIncoming => {
          if (this.state.ftaList.filter(itemInitial => itemInitial.seriBarang === itemIncoming.seriBarang).length == 0) {
            this.state.ftaList.push(itemIncoming)
          }
        })
        this.openAlertFta('false', hsCode, seriBarang)
      }
    }catch(e){
      message.error('Gagal melakukan pengecekan negara fta.');
    }
    finally{
      setTimeout(hide, 100);
    }
  }

  getApiCekBmt = async (hsCode, seriBarang) => {
    const objPosTarif = [{ 'seriBarang': seriBarang, 'posTarif': hsCode }]
    console.log("objPosTarif", objPosTarif)
    const tanggalDaftar = JSON.parse(localStorage.getItem('tanggalDaftar'))
 
    const hide = message.loading(`Cek Bea Masuk Tambahan HS ${hsCode} seri barang ${seriBarang}...`, 0);

    try{
      const {data : response} = await API_CEK_BMT(hsCode, tanggalDaftar)
      if (response.length > 0) {
        const data = []
        objPosTarif.forEach(e => {
          e.alert = 'true'
          data.push(e)
        })
        this.openBmt('true', hsCode, seriBarang)
        data.forEach(itemIncoming => {
          if (this.state.bmtList.filter(itemInitial => itemInitial.seriBarang === itemIncoming.seriBarang).length == 0) {
            this.state.bmtList.push(itemIncoming)
          }
        })
      } else {
        const data = []
        objPosTarif.forEach(e => {
          e.alert = 'false'
          data.push(e)
        })
        data.forEach(itemIncoming => {
          if (this.state.bmtList.filter(itemInitial => itemInitial.seriBarang === itemIncoming.seriBarang).length == 0) {
            this.state.bmtList.push(itemIncoming)
          }
        })
        this.openBmt('false', hsCode, seriBarang)
      }

    }catch(e){
      message.error('Gagal melakukan pengecekan bea masuk tambahan.');
    }
    finally{
      setTimeout(hide, 100);
    }
  }



  oopenAlertLartas = (check, hs, seriBarang) => {
    if (check == "true") {
      notification.error({
        message: `INDIKASI LARTAS HS CODE ${hs} SERI BARANG ${seriBarang} `,
        top: 20
      })
    } else {
      notification.success({
        message: `Tidak ada terindikasi lartas ${hs} seri barang ${seriBarang}`,
        top: 20
      })
    }
  };
  openAlertFta = (check, hs, seriBarang) => {
    if (check == "true") {
      notification.error({
        message: `INDIKASI NEGARA ASAL TIDAK SESUAI SKEMA FTA  ${hs} SERI BARANG ${seriBarang}`,
        top: 20
      })
    } else {
      notification.success({
        message: `NEGARA ASAL SESUAI SKEMA FTA  ${hs} SERI BARANG ${seriBarang}`,
        top: 20
      })
    }
  };
  openAlertKuotaLartas = (check, hs, seriBarang) => {
    if (check == "true") {
      notification.error({
        message: `SERI BARANG ${seriBarang} HS  ${hs} ADA KETENTUAN KUOTA LARTAS `,
        top: 20
      })
    } else {
      notification.success({
        message: `SERI BARANG ${seriBarang} HS  ${hs} TIDAK ADA KETENTUAN KUOTA LARTAS `,
        top: 20
      })
    }
  }
  openBmt = (check, hs, seriBarang) => {
    if (check == "true") {
      notification.error({
        message: `SERI BARANG ${seriBarang} HS ${hs} TERINDIKASI BEA MASUK TAMBAHAN `,
        top: 20
      })
    } else {
      notification.success({
        message: `SERI BARANG ${seriBarang} HS ${hs} TIDAK TERINDIKASI BEA MASUK TAMBAHAN `,
        top: 20
      })
    }
  }
  // End Fta 

  doFunctionAlert = async () => {

    let hsCodeData = JSON.parse(localStorage.getItem('posTarif'))
    console.log("funcionalert",typeof hsCodeData)
    let hsCode = typeof hsCodeData === "undefined" ? null : hsCodeData
    let seriBarangData = JSON.parse(localStorage.getItem('seriBarang'))
    let seriBarang = typeof seriBarangData === "undefined" ? null : seriBarangData
    let idBarangData = JSON.parse(localStorage.getItem('idBarang'))
    let idBarang = typeof idBarangData === "undefined" ? null : idBarangData

    const objPosTarif = [seriBarang]
    // this.setState({showNotif : true})



    console.log("objPosTarif", objPosTarif)
    objPosTarif.forEach(itemIncoming => {
      if (this.state.seriBarang.filter(itemInitial => itemInitial === itemIncoming).length == 0) {
        if (objPosTarif[0] !== null) {
          this.state.seriBarang.push(itemIncoming)
          this.getApiLartas(hsCode, seriBarang);
          this.getAPiCekFTA(idBarang, seriBarang, hsCode)
          this.getApiKuotaLartas(hsCode, seriBarang)
          this.getApiCekBmt(hsCode, seriBarang)
        } else {
          console.log('no reload')
        }
      }
    })


  }
  //Hide Icon 

  // notification alert pemberitahuan end
  componentDidUpdate(prevState, prevProps) {
    let alertPembertiahauan = this.props.onCheckAlert
    let path = JSON.parse(localStorage.getItem('pathPfpd'))
    if (alertPembertiahauan !== this.state.triggerNotif) {
      if (path == 4) {
        this.setState({
          triggerNotif: alertPembertiahauan
        }, () => {
          this.doFunctionAlert()
        })
      }
    }
  }

  onRowInserting = () => {

    // this.setState({ npd: dummy });
  }

  handleSelect = () => {
    console.log('oke2')
  }

  customizeColumns(columns) {
    columns[0].width = 70;
  }
  clearEvents() {
    this.setState({ events: [] });
  }

  toggle() {
    toggleWidget()
    this.setState({ open: !this.state.open })
  }

  handleChange(value) {
    this.setState({ text: value })
  }
  rowSelection = () => {

  }
  showModalInformasi = () => {
    this.setState({
      modal_informasi: true
    });
  };

  showModalDNP = () => {
    this.setState({
      modal_dnp: true
    });
  };
  showModalArsip = () => {
    this.setState({
      modal_arsip: true
    })
  }


  showModalUndangan = () => {
    const namaKantorPanjang = JSON.parse(localStorage.getItem("dataHeader")).namaKantorPanjang 
    this.setState({
      modal_undangan: true,
      namaKantorPanjang
    });
  };

  showModalHasil = () => {
    this.setState({
      modal_hasil: true
    });
  };
  selectedKeys = (e) => {
    console.log('klik', e)
  }

  showModalNPD = () => {
    this.setState({
      modal_npd: true
    });
  };

  showModalKUB = () => {
    this.setState({
      modal_kub: true
    });
  };

  showModalLab = () => {
    alert("debug:93")
    this.setState({
      modal_lab: true
    });
  };

  showModalDokumenPabean = () => {
    this.setState({
      modal_dokumen_pabean: true
    });
  };

  showModalAtensiLarangan = () => {
    alert("debug:91")
    this.setState({
      modal_atensi_larangan: true
    });
  };

  showModalAtensiAudit = () => {
    this.setState({
      modal_atensi_audit: true
    });
  };


  handleOk = e => {
    console.log(e);
    message.success('Berhasil menambahkan data!');
    message.error('Gagal menambahkan data!');
    this.setState({
      modal_informasi: false,
      modal_dnp: false,
      modal_undangan: false,
      modal_hasil: false,
      modal_npd: false,
      modal_kub: false,
      modal_lab: false,
      modal_dokumen_pabean: false,
      modal_atensi_larangan: false,
      modal_atensi_audit: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      modalLartas: false,
      modal_informasi: false,
      modal_dnp: false,
      modal_undangan: false,
      modal_hasil: false,
      modal_npd: false,
      modal_kub: false,
      modal_lab: false,
      modal_dokumen_pabean: false,
      modal_atensi_larangan: false,
      modal_atensi_audit: false,
      modal_arsip: false,
      alertHs: false,
      modalKeputusan: false
    });
  };

  componentDidMount() {
    let id = JSON.parse(localStorage.getItem('idHeader'))
    console.log("idHedernya", id)
    this.getDataNpd(id)
    this.checkTombolTools()
    this.getDataReferensi()
    localStorage.setItem('uraianBarang', JSON.stringify(null))
    localStorage.setItem('seriBarang', JSON.stringify(null))
    localStorage.setItem('posTarif', JSON.stringify(null))
    localStorage.setItem('idBarang', JSON.stringify(null))
    localStorage.setItem('listHsCode', null)
  }
  getDataReferensi = async () => {
    try{
      const {data : {data}} = await API_REFERENSI_DOKUMEN()
      this.setState({listDokumen : data})
    }catch(e){}
  }
  checkTombolTools = async () => {
    const idHeader = JSON.parse(localStorage.getItem('idHeader'))
    this.setState({ loadingTools: true })
    try {
      const { data: buttonNPD } = await API_CHECK_DISABLED(idHeader, "NPD")
      this.setState({ buttonNPD: buttonNPD.data })
      const { data: buttonINP } = await API_CHECK_DISABLED(idHeader, "INP")
      this.setState({ buttonINP: buttonINP.data })
      const { data: buttonDNP } = await API_CHECK_DISABLED(idHeader, "DNP")
      this.setState({ buttonDNP: buttonDNP.data })
      const { data: buttonUndangan } = await API_CHECK_DISABLED(idHeader, "UND")
      this.setState({ buttonUndangan: buttonUndangan.data })
      const { data: buttonKonsultasi } = await API_CHECK_DISABLED(idHeader, "HKNP")
      this.setState({ buttonKonsultasi: buttonKonsultasi.data })
      const { data: buttonLab } = await API_CHECK_DISABLED(idHeader, "LAB")
      this.setState({ buttonLab: buttonLab.data })
      const { data: buttonQa } = await API_CHECK_DISABLED(idHeader, "QA")
      this.setState({ buttonQa: buttonQa.data })
      const { data: buttonArsip } = await API_CHECK_DISABLED(idHeader, "ARSIP")
      this.setState({ buttonArsip: buttonArsip.data })
      const { data: buttonLartas } = await API_CHECK_DISABLED(idHeader, "LARTAS")
      this.setState({ buttonLartas: buttonLartas.data })
      const { data: buttonAudit } = await API_CHECK_DISABLED(idHeader, "AUDIT")
      this.setState({ buttonAudit: buttonAudit.data })
    } catch (e) {
      message.error("Terjadi Kesalahaan saat pengecekan tombol tools.")
    }
    finally {
      this.setState({ loadingTools: false })
    }
  }
  handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  }
  //!Function Integrasi
 
 
  insertsStatusLartas = async () => {
    let idHeader = JSON.parse(localStorage.getItem('idHeader'))
    let sendApi = {
      idProses: idHeader,
      idProsesStatus: null,
      kodeProses: '421',
      nipMulai: nipPfpd,
      waktuMulai: null,
    }
    let jsonBody = {
      idProses: idHeader,
      flagAtensiLartas: 'Y'
    }
    try {
      const { data: dataProses } = await API_PROSES_PARSER(sendApi)
      console.log(dataProses)
      const { data: dataUpdateFlag } = await API_UPSERT_PROSES(jsonBody)
      console.log(dataUpdateFlag)
      swal.fire("Berhasil! Menambahkan data", "", "success");
      this.handleCancel()
      this.checkTombolTools()
    } catch (e) {
      swal.fire("Gagal! Menambahkan data", "", "error");
    }
  }
  insertsStatusQA = async () => {
    let idHeader = JSON.parse(localStorage.getItem('idHeader'))
    let sendApi = {
      idProses: idHeader,
      idProsesStatus: null,
      kodeProses: '412',
      nipMulai: nipPfpd,
      waktuMulai: null,
    }
    try {
      const { data } = await API_PROSES_PARSER(sendApi)
      swal.fire("Berhasil! Mengajukan Data Ke Tim QA", "", "success");
      this.handleCancel()
      this.checkTombolTools()
    } catch (e) {
      swal.fire("Gagal! Menambahkan data", "", "error");
    }
  }



  ajukanQA = () => {
    swal.fire({
      icon: "warning",
      title: "Konfirmasi!",
      html: '<p style="color : #65696A">Apakah Anda Yakin Akan Mengirim Data Ke Tim QA?</p>',
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Tidak",
    }).then((res) => {
      if (res.dismiss === swal.DismissReason.cancel) {
        console.log('no fetch')
      } else {
        this.insertsStatusQA()
      }
    });
  }
  modalAtensiLarangan = () => {
    swal.fire({
      icon: "warning",
      title: "Konfirmasi!",
      html: '<p style="color : #65696A">Apakah Anda Yakin atas Dokumen Pabean ini akan DIATENSI LARTAS untuk P2?</p>',
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Tidak",
    }).then((res) => {
      if (res.dismiss === swal.DismissReason.cancel) {
        console.log('no fetch')
      } else {

        this.insertsStatusLartas()
      }
    });
  }

  ujiLab = () => {
    let idHeader = JSON.parse(localStorage.getItem('idHeader'))
    let myWindow;
    myWindow = window.open(window.location.origin + '/uji-lab/pfpd/' + idHeader, 'myWindowUjiLab', 'width=800, height=600');

  }


  handleSubmitINP = async () => {
    let jsonBody = {
      idProses: JSON.parse(localStorage.getItem('idHeader')),
      flagInp: 'Y'
    }
    this.setState({ loadingINP: true })
    try {
      const { data: dataRespon } = await API_RESPON_PARSER("INP", this.state.formData)
      console.log("[2]", dataRespon)
      const { data: dataProses } = await API_PROSES_PARSER(this.state.formData1)
      console.log("[2.]", dataProses)
      const { data: dataUpdateFlag } = await API_UPSERT_PROSES(jsonBody)
      console.log("[2..]", dataUpdateFlag)
      swal.fire({
        position: 'center',
        icon: 'success',
        title: `Data INP Berhasil disimpan`,
        showConfirmButton: false,
        timer: 1500
      })
      this.handleCancel();
      this.checkTombolTools();
    } catch (e) {
      swal.fire("Gagal! INP Gagal ditambahkan", "", "error");
    }
    finally {
      this.setState({ loadingINP: false })
    }
  }

  handleINPChange = (event) => {
    let dataForm = { ...this.state.formData };
    let dataForm1 = { ...this.state.formData1 };
    dataForm1.kodeProses = "410"
    dataForm[event.target.name] = event.target.value;
    dataForm1[event.target.name] = event.target.value;
    this.setState(
      {
        formData: dataForm,
        formData1: dataForm1
      },
      () => {
        console.log('respon', this.state.formData);
        console.log('status', this.state.formData1);
      }
    );
  }
  onChangeDNP = (event) => {
    let dataForm = { ...this.state.formPfpd };
    let dataForm1 = { ...this.state.formData1 };
    let dataForm2 = { ...this.state.formData2 };
    dataForm1.kodeProses = "411";
    dataForm2.kodeProses = "410";
    dataForm[event.target.name] = event.target.value;
    dataForm1[event.target.name] = event.target.value;
    dataForm2[event.target.name] = event.target.value;
    this.setState(
      {
        formPfpd: dataForm,
        formData1: dataForm1,
        formData2: dataForm2
      },
      () => {
        console.log('pfpd', JSON.stringify(this.state.formPfpd, null, 3));
        console.log('post status', this.state.formData1);
        console.log('put status', this.state.formData2)
      }
    );
  }
  onChangetglDNP = (event) => {
    console.log('hoi', event)
    const testFormat = moment(event).format('DD-MM-YYYY');
    let dataForm = { ...this.state.formPfpd };
    dataForm.tanggalDnp = testFormat
    this.setState({ formPfpd: dataForm })
  }

  handleSubmitDNP = async () => {
    this.setState({ loadingDNP: true })
    try {
      const { data: dataProses } = await API_PROSES_PARSER(this.state.formData1)
      console.log("[3]", dataProses)
      const { data: dataProsesPut } = await API_PROSES_PARSER_PUT(this.state.formData2)
      console.log("[3]", dataProsesPut)
      const { data: dataPfpdKeputusan } = await API_PFPD_KEPUTUSAN(this.state.formPfpd)
      console.log("[3]", dataPfpdKeputusan)
      swal.fire({
        position: 'center',
        icon: 'success',
        title: `Data DNP Berhasil disimpan`,
        showConfirmButton: false,
        timer: 1500
      })
      this.checkTombolTools()
      this.handleCancel()
    } catch (e) {
      swal.fire("Gagal! DNP Gagal ditambahkan", "", "error");
    }
    finally {
      this.setState({ loadingDNP: false })
    }
  }

  handleUndanganChange = (event) => {
    let dataForm1 = { ...this.state.formData1 };
    let dataForm = { ...this.state.formData }
    dataForm1.kodeProses = "414"
    dataForm[event.target.name] = event.target.value;
    dataForm1[event.target.name] = event.target.value;
    this.setState(
      {
        formData: dataForm,
        formData1: dataForm1
      },
      () => {
        console.log('respon', this.state.formData);
        console.log('status', this.state.formData1);
      }
    );
  }
  handleSubmitUndangan = async () => {
    let jsonBody = {
      idProses: JSON.parse(localStorage.getItem('idHeader')),
      flagUndangan: 'Y'
    }
    this.setState({ loadingDNP: true })
    try {
      const { data: dataRespon } = await API_RESPON_PARSER("KONSULTASI", this.state.formData)
      console.log("[2.]", dataRespon)
      const { data: dataProses } = await API_PROSES_PARSER(this.state.formData1)
      console.log("[2.]", dataProses)
      const { data: dataUpsertProses } = await API_UPSERT_PROSES(jsonBody)
      console.log("[2.]", dataUpsertProses)
      swal.fire({
        position: 'center',
        icon: 'success',
        title: `Berhasil! Undangan Konsultasi Berhasil ditambahkan`,
        showConfirmButton: false,
        timer: 1500
      })
      this.checkTombolTools()
      this.handleCancel()
    } catch (e) {
      swal.fire("Gagal! Undangan Konsultasi Gagal ditambahkan", "", "error");
    }
    finally {
      this.setState({ loadingDNP: false })
    }
  }
  //!Baknp
  onChangetglBaknp = (event) => {
    const testFormat = moment(event).format('DD-MM-YYYY');
    console.log('hoi', testFormat)
    let dataForm = { ...this.state.formPfpd };
    dataForm.tanggalBaknp = testFormat
    this.setState({ formPfpd: dataForm })
  }
  onChangeBaknp = (event) => {
    let data = { ...this.state.formPfpd }
    let data1 = { ...this.state.formData2 }
    data1.kodeProses = "414"
    data[event.target.name] = event.target.value;
    data1[event.target.name] = event.target.value;
    this.setState(
      {
        formPfpd: data,
        formData2: data1
      },
      () => {
        console.log('put status', this.state.formData2);
        console.log('pfpd', JSON.stringify(this.state.formPfpd, null, 3));
      }
    );

  }

  handleSubmitKonsultasi = async () => {
    this.setState({ loadingDNP: true })
    try {
      const { data: dataResponPut } = await API_PROSES_PARSER_PUT(this.state.formData2)
      console.log("[2]", dataResponPut)
      const { data: dataPfpdKeputusan } = await API_PFPD_KEPUTUSAN(this.state.formPfpd)
      console.log("[2]", dataPfpdKeputusan)
      swal.fire({
        position: 'center',
        icon: 'success',
        title: `Data Hasil Konsultasi Nilai Pabean Berhasil disimpan`,
        showConfirmButton: false,
        timer: 1500
      })
      this.handleCancel()
      this.checkTombolTools()
    } catch (e) {
      swal.fire("Gagal!", "Data Gagal Dikirim", "error");
    }
    finally {
      this.setState({ loadingDNP: false })
    }
  }
  //! handle KUB
  onChangeKUB = (event) => {
    let dataForm = { ...this.state.formData };
    let dataForm1 = { ...this.state.formData1 };
    // let dataForm2 = {...this.state.formData}
    dataForm1.kodeProses = "419"
    dataForm.uraian = event.target.value

    dataForm[event.target.name] = event.target.value;
    dataForm1[event.target.name] = event.target.value;

    this.setState(
      {
        formData: dataForm,
        formData1: dataForm1
      },
      () => {
        console.log('status', JSON.stringify(this.state.formData1, null, 1));
        console.log('proses respon', JSON.stringify(this.state.formData, null, 1));
      }
    );
    // this.setState({formData1 : dataForm1})
  }
 

  //! Itegrasi NPD
  onChangeNPD = (event) => {
    console.log(event)
    let dataForm1 = { ...this.state.formData1 };
    dataForm1.kodeProses = "417"


    dataForm1[event.target.name] = event.target.value;

    this.setState(
      {
        formData1: dataForm1
      },
      () => {
        console.log('status', JSON.stringify(this.state.formData1, null, 1));

      }
    );
  }
  ///Integrasi DNP


  copyTDtoTT = async () => {
    this.setState({ loadingDNP: true })
    const idHeader = JSON.parse(localStorage.getItem("idHeader"))
    try {
      const { data: dataCopyTd } = await API_COPY_TDDOKUMEN(idHeader)
      console.log(dataCopyTd)
      const { data: dataRespon } = await API_RESPON_PARSER("NPD", this.state.formData)
      console.log(dataRespon)
      const { data: dataResponDetail } = await API_RESPON_DETAIL(this.state.responDetail)
      console.log(dataResponDetail)
      const { data: dataInsertRespon } = await API_INSERT_DOKUMEN(this.state.dataNpd)
      console.log(dataInsertRespon)
      const { data: dataProses } = await API_PROSES_PARSER(this.state.formData1)
      console.log(dataProses)
      swal.fire({
        position: 'center',
        icon: 'success',
        title: `Data NPD Berhasil disimpan`,
        showConfirmButton: false,
        timer: 1500
      })
      this.setState({
        reloadDokap: this.state.reloadDokap + 1
      }, () => {
        this.checkTombolTools()
        this.reloadDokap(this.state.reloadDokap)
        this.handleCancel()
      })
    } catch (e) {
      swal.fire('Gagal!', 'Gagal Menambahkan NPD', 'error')
    }
    finally {
      this.setState({ loadingDNP: false })
    }
  }
  reloadDokap = (val) => {
    this.props.reloadDokap(val)
  }


  //!End Of DNP
  //!integrasi Arsip
  onChangeArsip = (event) => {
    let data = { ...this.state.formData1 }
    let data1 = { ...this.state.formPfpd }
    data1.alasanArsip = event.target.value
    data.kodeProses = "990"
    data1[event.target.name] = [event.target.value]
    data[event.target.name] = [event.target.value]
    this.setState({
      formData1: data,
      formPfpd: data1
    },
      () => {
        console.log('kode proses', this.state.formData1)
        console.log('alassann', this.state.formPfpd)
      }

    )

  }
  handleAlertHS = () => {
    this.setState({
      alertHs: true
    })
  }
  handleArsip = async () => {
    try {
      const { data: dataProses } = await API_PROSES_PARSER(this.state.formData1)
      console.log(dataProses)
      const { data: dataKeputusan } = await API_PFPD_KEPUTUSAN(this.state.formPfpd)
      console.log(dataKeputusan)
      swal.fire('Sukses', 'Data Arsip Berhasil ditambahkan', 'success')
      this.handleCancel();
      this.checkTombolTools()
    } catch (e) {
      swal.fire('Gagal', 'gagal menambahkan data', 'error')
    }

  }

  //! Integrasi Audit
  onChangeAudit = (event) => {
    let data = { ...this.state.formData1 }
    let dataPfpd = { ... this.state.formPfpd }
    data.kodeProses = "420"
    dataPfpd.uraianAudit = event.target.value
    data[event.target.name] = [event.target.value]
    dataPfpd[event.target.name] = [event.target.value]
    this.setState({
      formData1: data,
      formPfpd: dataPfpd
    },
      () => {
        console.log('post status', this.state.formData1)
        console.log('pfpd', this.state.formPfpd)
      }
    )
  }
  handleAudit = async () => {
    let jsonBody = {
      idProses: JSON.parse(localStorage.getItem('idHeader')),
      flagAtensiAudit: 'Y'
    }
    this.setState({ loadingAudit: true })
    try {
      const { data: dataProses } = await API_PROSES_PARSER(this.state.formData1)
      console.log(dataProses)
      const { data: dataKeputusan } = await API_PFPD_KEPUTUSAN(this.state.formPfpd)
      console.log(dataKeputusan)
      const { data: dataFlag } = await API_UPSERT_PROSES(jsonBody)
      console.log(dataFlag)
      swal.fire({
        title: "Sukses!",
        text: "Data Berhasil Tersimpan",
        icon: "success",
        timer: 2000
      })
      this.handleCancel()
      this.checkTombolTools()
    } catch (e) {
      swal.fire({
        title: "Failed!",
        text: "Data Gagal Tersimpan",
        icon: "error",
        timer: 3000
      })
    }
    finally {
      this.setState({ loadingAudit: false })
    }
  }


  //*Integrasi URL 
  handleCeisa = () => {
    let myWindow;
    myWindow = window.open(window.location.origin + '/search', 'myWindow1', 'width=800, height=600');
  }
  handleProfiles = (a) => {
    // alert(a)
    let myWindow;
    // sce/profil-komoditi/browse-hscode/{hsCode}

    myWindow = window.open(window.location.origin + '/sce/profil-komoditi/browse-hscode/' + a, 'myWindow2', 'width=800, height=600');
  }
  openWindowLartas = (hs) => {
    let myWindow;
    // sce/profil-komoditi/browse-hscode/{hsCode}

    myWindow = window.open('https://intr.insw.go.id/mod/tbl/tbl-lartas.php?src_by=hs&src_txt=' + hs);
  }
  handelegeserHs = async () => {
    let posTarif = JSON.parse(localStorage.getItem('posTarif'))
    // let posTarif = 73066990
    console.log('kode hs?', posTarif)
    if (posTarif != null || posTarif != undefined) {
      try{
          const {data : result} = await API_GESER_HS(posTarif)
          if(result !== ""){
            let kodeHs = result.split("dan")
            Modal.info({
              title: 'HS CODE ' + posTarif + ' Pemberitahuan Kemungkinan Bergeser Ke',
              content: (
                <div style={{ display: 'flex' }}>
                  <h5 onClick={() => this.handleProfiles(`${kodeHs[0]}`)} style={{ color: '#5D78FF', cursor: 'pointer' }}>{kodeHs[0]}</h5>
                  <h5 className="mr-1 ml-1"> Dan </h5>
                  <h5 onClick={() => this.handleProfiles(`${kodeHs[1]}`)} style={{ color: '#5D78FF', cursor: 'pointer' }}>{kodeHs[1]}</h5>
                </div>
              ),
              onOk() { },
            });
          }else{
            Modal.success({
              title: 'Tidak Ditemukan Kemungkinan Pergeseran HS Code ' + posTarif,
              content: (
                <div style={{ display: 'flex' }}>

                </div>
              ),
              onOk() { },
            });
          }
      }catch(e){}
      finally{

      }
    } else {
      swal.fire('Gagal', 'Anda harus memilih barang dahulu', 'warning')
    }
  }
  handleProfilKomuditi = () => {
    let a = JSON.parse(localStorage.getItem('posTarif'))
    console.log('kode hs?', a)
    if (a != null || a != undefined) {
      let myWindow;
      // sce/profil-komoditi/browse-hscode/{hsCode}

      myWindow = window.open(window.location.origin + '/sce/profil-komoditi/browse-hscode/' + a, 'myWindow2', 'width=800, height=600');
    } else {
      swal.fire('Gagal', 'Anda harus memilih barang dahulu', 'warning')
    }

  }
  handleRekomendasiHS = () => {
    let a = JSON.parse(localStorage.getItem('uraianBarang'))
    // console.log(a)
    if (a === null) {
      swal.fire('Gagal', 'Anda harus memilih barang dahulu', 'warning')
    } else {
      let myWindow;
      myWindow = window.open(window.location.origin + '/sce/profil-komoditi/hscode-suggestion/' + a, 'myWindow3', 'width=800, height=600');

    }

  }
  handleRekomendasiHarga = () => {
    let a = JSON.parse(localStorage.getItem('posTarif'))
    console.log(a)
    let myWindow;
    myWindow = window.open(window.location.origin + '/sce/profil-komoditi/browse-barang', 'myWindow4', 'width=800, height=600');

  }
  handleDBNP = () => {
    let myWindow;
    myWindow = window.open(window.location.origin + '/sce/profil-komoditi/browse-dbnp/', 'myWindow5', 'width=800, height=600');

  }
  //*Last Line URL
  showDrawerA = () => {
    this.setState({
      visible: true,
    });
  };


  showChildrenDrawer = () => {
    // alert("debug:86")
    this.setState({
      childrenDrawer: true,
    });
  };

  onChildrenDrawerClose = () => {
    // alert("debug:85")
    this.setState({
      childrenDrawer: false,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
      alertHs: false
    });
  };
  cetakanDokumen = async () => {
    const hide = message.loading('Sedang Mengambil Cetakan..', 0);
    // Dismiss manually and asynchronously
    let kodeDokumen = JSON.parse(localStorage.getItem('kodeDokumen'))
    let idHeader = JSON.parse(localStorage.getItem('idHeader'))
    try{
      const {data} = await API_GET_CETAKAN_DOKUMEN(kodeDokumen, idHeader)
      const fileTemp = new Blob([data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(fileTemp);
      window.open(fileURL)
    }catch(e){}
    finally{
      setTimeout(hide, 1500);
    }
  }

  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };

  // getCustomLauncher = handleToggle => (
  //   // The return will be your own Launcher component
  //     <Launcher
  //       handleToggle={<a>a</a>}
  //     />
  //  );
  onSelectionChanged({ selectedRowKeys, selectedRowsData }) {
    console.log("[debug] selectedRowKeys?", selectedRowKeys);
    console.log("[debug] selectedRowsData?", selectedRowsData);

    this.selectionChangedBySelectBox = false;
    let formDatas = { ...this.state.formData }
    let dataForm1 = { ...this.state.formData1 }
    let idHeader = JSON.parse(localStorage.getItem('idHeader'))
    dataForm1.kodeProses = "417"
    formDatas.uraian = ""
    this.setState({
      prefix: null,
      selectedRowKeys,
      dataNpd: { idHeader: idHeader, dokumen: selectedRowsData },
      responDetail: { idHeader: idHeader, tdDokumenList: selectedRowsData },
      formData1: dataForm1,
      formData: formDatas
    }, () => {
      console.log('respon', this.state.formData)
      console.log('post status', this.state.formData1)
      console.log('datnpd', this.state.dataNpd)
      console.log('respondetail', this.state.responDetail)
    })

  }

  onClearButtonClicked() {
    this.dataGrid.instance.clearSelection();
  }
  openModalLartas = () => {
    this.setState({
      modalLartas: true
    })
  }
  getDataNpd = async e => {
    try {
      const {data : {data}} = await API_GET_NPD(e)
      this.setState({
        npdData: data,
      })
    } catch (e) {
      console.log('error pada ', e)
    }
  }
  getKesimpulan = async () => {
    this.setState({ loadingKesimpulan: true })
    const idHeader = JSON.parse(localStorage.getItem('idHeader'))
    try {
      const { data : {data} } = await API_KESIMPULAN_PFPD(idHeader)
      this.setState({
        kesimpulanPfpd: data
      })
    } catch (e) { 
      message.error("Gagal Mengambil Data") 
    }
    finally {
      this.setState({ loadingKesimpulan: false })
    }
  }
  keputusanPfpd = () => {
    this.getKesimpulan()
    this.setState({ modalKeputusan: true })
  }
  kirimKesimpulan = async () => {
    this.setState({ loadingKesimpulan: true })
    let body = {
      kesimpulanPfpd: this.state.kesimpulanPfpd,
      idHeader: JSON.parse(localStorage.getItem("idHeader"))
    }
    try {
      await API_KESIMPULAN_PFPD_POST(body)
      swal.fire("Sukses!", "Berhasil Merekam Kesimpulan", "success")
      this.setState({
        kesimpulanPfpd: ""
      }, () => {
        this.handleCancel()
      })
    } catch (e) {
      message.error("Gagal Mengirim Kesimpulan")
    }
    finally {
      this.setState({ loadingKesimpulan: false })
    }
  }

  render() {
    let statusDokumen = JSON.parse(localStorage.getItem('statusDokumen'))
    const { loadingTools } = this.state

  
    //Count Number Alert


    //End COunting




    console.log("ListLartas", this.state.lartasList)
    let posTarifBmt = null
    try {
      posTarifBmt = JSON.parse(localStorage.getItem('posTarif'))

    } catch (e) { }

    let hsCodeList = null
    try {
      hsCodeList = JSON.parse(localStorage.getItem('listHsCode'))

    } catch (e) {

    }
    console.log("Hs from Sticky", hsCodeList)
    // console.log('[debug] NDP', this.state.npd);

    const { selectedRowKeys } = this.state;
    let tanggalDaftar = JSON.parse(localStorage.getItem('tanggalDaftar'))
    let namaDokumen = JSON.parse(localStorage.getItem('namaDokumen'))
    let nomorAju = JSON.parse(localStorage.getItem('nomorAju'))
    let nomorDaftar = JSON.parse(localStorage.getItem('nomorDaftar'))

    return (
      <>
        <ul class="kt-sticky-toolbar ulStyle">
          <li class="kt-sticky-toolbar__item kt-sticky-toolbar__item--brand" id="kt_demo_panel_toggle" data-toggle="kt-tooltip" title="Tools PFPD" data-placement="right" data-original-title="Tools PFPD">
            <a onClick={this.showDrawerA} class="klikButtons"><i class="flaticon2-gear"></i></a>
          </li>
          <li class="kt-sticky-toolbar__item kt-sticky-toolbar__item--brand" id="kt_quick_panel_toggler_btn" data-toggle="kt-tooltip" title="Lihat Informasi Terkait" data-placement="right" data-original-title="Lihat Informasi Terkait">
            <a onClick={this.showChildrenDrawer} class=""><i class="flaticon-information"></i></a>
          </li>

          <li class="kt-sticky-toolbar__item kt-sticky-toolbar__item--brand" id="btnLihatHeader" data-toggle="kt-tooltip" title="Lihat Cetakan Dokumen Pemberitahuan Pabean" data-placement="right" data-original-title="Lihat Cetakan Dokumen Pemberitahuan Pabean">
            <a onClick={this.cetakanDokumen} target="Cetakan Dokumen Pemberitahuan Pabean" class=""><i class="fa fa-file-pdf"></i></a>
          </li>
          {/* <li class="kt-sticky-toolbar__item kt-sticky-toolbar__item--danger" id="kt_sticky_toolbar_chat_toggler" Edata-toggle="kt-tooltip" title="Kirim Pesan ke Pemeriksa Barang" data-placement="left" data-original-title="Kirim Pesan ke Pemeriksa Barang">
            <a target="Kirim Pesan ke Pemeriksa Barang" class="" onClick={this.toggle}><i class="flaticon2-chat-1"></i></a>
          </li> */}
          {this.state.showNotif ?
            <li class="kt-sticky-toolbar__item kt-sticky-toolbar__item--warning kt-pulse kt-pulse--brand" id="btnLihatHeader" data-toggle="kt-tooltip" title="Lihat Catatan Indikasi Beda Tarif dan atau Barang Larangan/Pembatasan" data-placement="right" data-original-title="Lihat Cetakan Dokumen Pemberitahuan Pabean">
              <a onClick={this.handleAlertHS} href="#" target="" class="">
                <Badge count={this.state.countData}>
                  <span class="kt-badge kt-badge--danger"><i class="fa fa-bell" aria-hidden="true" style={{ color: 'white' }}></i>
                  </span></Badge></a>
            </li>

            : null}

        </ul>

        <div className={"collapse" + (this.state.open ? ' in' : '')}>

          <Widget
            handleNewUserMessage={this.handleNewUserMessage}
            profileAvatar={logo}
            title="Kirim Pesan"
            subtitle="ke Pemeriksa Barang "
            launcher={() => {
              return null
            }
            }
            showCloseButton={true}
          // customLauncher={handleToggle => this.getCustomLauncher(handleToggle)}
          />
        </div>

        <Drawer
          title=""
          placement={this.state.placement}
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
          width={365}
        >
          <div class="kt-align-center" style={{ overflow: "hidden" }}>
            {statusDokumen === "2" ?
              <>
                <h3 class="kt-demo-panel__title" style={{ margin: "0px auto" }}>
                  <strong>Flag / Tanda</strong><br />
                  <small>Pemeriksaan Dokumen</small>
                </h3>
                <br />
                <div class="kt-demo-panel__item kt-demo-panel__item--active">
                  <div class="kt-demo-panel__item-title">
                  </div>
                  <div class="kt-demo-panel__item-preview" style={{ border: "none" }}>
                    <Skeleton loading={loadingTools} paragraph={{ rows: 33 }}>
                      <Spin spinning={this.state.loadINP}>
                        <Button type="default" style={{ width: '95%', marginBottom: 10 }} disabled={this.state.buttonINP ? false : true} onClick={this.showModalInformasi} ><i class=""></i> Informasi Nilai Pabean (INP)</Button></Spin>
                      <Button class="btn btn-block btn-outline-secondary" disabled={this.state.buttonDNP ? false : true} onClick={this.showModalDNP} style={{ width: '95%', marginBottom: 10 }} >Terima Deklarasi Nilai Pabean (DNP)</Button>
                      <Button class="btn btn-block btn-outline-secondary" disabled={this.state.buttonUndangan ? false : true} onClick={this.showModalUndangan} style={{ width: '95%', height: '120', marginBottom: 10 }}>Undangan Konsultasi Nilai Pabean</Button>
                      <Button class="btn btn-block btn-outline-secondary" disabled={this.state.buttonKonsultasi ? false : true} onClick={this.showModalHasil} style={{ width: '95%', marginBottom: 10 }}><i class="" ></i> Hasil Konsultasi Nilai Pabean</Button>
                      <Spin spinning={this.state.loadNPD}>
                        <Button class="btn btn-block btn-outline-secondary" disabled={this.state.buttonNPD ? false : true} onClick={this.showModalNPD} style={{ width: '95%', marginBottom: 10 }}><i class=""></i> Nota Permintaan Dokumen (NPD)</Button>
                      </Spin>
                      <Spin spinning={this.state.loadKonfirmasi}>
                        {/* <Button class="btn btn-block btn-outline-secondary" onClick={this.showModalKUB}  style={{width : '95%', marginBottom : 10}}><i class=""></i> Konfirmasi Uraian Barang (KUB)</Button> */}

                      </Spin>

                      <Button class="btn btn-block btn-outline-secondary" disabled={this.state.buttonLab ? false : true} onClick={this.ujiLab} style={{ width: '95%', marginBottom: 10 }}><i class=""></i> Uji Laboratorium</Button>
                      <Button class="btn btn-block btn-outline-secondary" disabled={this.state.buttonQa ? false : true} onClick={this.ajukanQA} style={{ width: '95%', marginBottom: 10 }}><i class=""></i> Ajukan Ke Tim QA</Button>

                      <Button class="btn btn-block btn-outline-secondary" onClick={this.keputusanPfpd} style={{ width: '95%', marginBottom: 10 }}><i class=""></i> Kesimpulan </Button>


                      {/* <a class="btn btn-block btn-outline-secondary" onClick={modalUjiLab}><i class=""></i> Uji Laboratorium</a> */}
                      <div class="kt-separator kt-separator--border-dashed kt-separator--space-sm kt-separator--portlet-fit"></div>
                      <button class="btn btn-block btn-outline-dark btn-hover-brand" disabled={this.state.buttonArsip ? false : true} onClick={this.showModalArsip}><i class=""></i> Arsip Dokumen Pabean</button>
                      <button class="btn btn-block btn-outline-dark btn-hover-danger" disabled={this.state.buttonLartas ? false : true} onClick={this.modalAtensiLarangan} id="btnAlertLartas"><i class=""></i> Atensi Larangan / Pembatasan</button>
                      <a class="btn btn-block btn-outline-dark btn-hover-danger" disabled={this.state.buttonAudit ? false : true} onClick={this.showModalAtensiAudit} id="btnAlertAudit"><i class=""></i> Atensi Audit</a>
                      {/* <a class="btn btn-block btn-outline-danger btn-hover-danger kt-font-danger"  id="btnAlertAudit"><i class=""></i> Periksa Ulang Fisik Barang</a> */}
                    </Skeleton>
                  </div>
                </div>
              </>
              : null

            }

            <br />
            <div class="kt-divider" style={{ marginBottom: "20px" }}>
              <span></span>
              <span>| |</span>
              <span></span>
            </div>
            <h3 class="kt-demo-panel__title" style={{ margin: "0px auto" }}>
              <strong>Alat Bantu</strong><br />
              <small>Pemeriksaan Dokumen</small>
            </h3>
            <br />
            <div class="kt-demo-panel__item kt-demo-panel__item--active">
              <div class="kt-demo-panel__item-title">
              </div>
              <div class="kt-demo-panel__item-preview" style={{ border: "none" }}>
                <div>

                  <Button class="btn btn-block btn-secondary btn-width" href="javascript:;" onClick={this.handleProfilKomuditi} style={{ width: '95%', marginBottom: 10 }}>
                    <i class=""></i>Profil Komoditi
              </Button>

                </div>
                <div>

                </div>
                <Button class="btn btn-block btn-secondary btn-width" onClick={this.handelegeserHs} style={{ width: '95%', marginBottom: 10 }}><i class=""></i>Geser HS</Button>
                <Button class="btn btn-block btn-secondary btn-width" onClick={this.handleRekomendasiHarga} style={{ width: '95%', marginBottom: 10 }}><i class=""></i>Browse Barang</Button>
                <Button class="btn btn-block btn-secondary btn-width" onClick={this.handleRekomendasiHS} style={{ width: '95%', marginBottom: 10 }}><i class=""></i>History HS Code</Button>
                <Button class="btn btn-block btn-secondary btn-width" onClick={this.handleDBNP} style={{ width: '95%', marginBottom: 10 }}><i class=""></i>Browse DBNP</Button>

                {/* <a class="btn btn-block btn-secondary btn-width" href="javascript:;"><i class=""></i> Penetapan Klasifikasi Sebelum Impor (PKSI)</a>
            <a class="btn btn-block btn-secondary btn-width" href="javascript:;"><i class=""></i> Keputusan PFPD lain</a> */}
                {/* <a class="btn btn-block btn-secondary btn-width" href=""><i class=""></i> Hasil Keberatan dan atau Banding</a> */}
                <Button class="btn btn-block btn-secondary btn-width" onClick={this.handleCeisa} style={{ width: '95%', marginBottom: 10 }}><i class=""></i> CEISA Search</Button>
                {/* <Button class="btn btn-block btn-secondary btn-width" href="javascript:;" style={{width : '95%', marginBottom : 10}}><i class=""></i> Peraturan</Button> */}
              </div>
            </div>
            <div class="ps__rail-x" style={{ left: "0px", bottom: "0px" }}>
              <div class="ps__thumb-x" tabindex="0" style={{ left: "0px", width: "0px" }}></div>
            </div>
            <div class="ps__rail-y" style={{ top: 0, height: "602px", right: "0px" }}>
              <div class="ps__thumb-y" tabindex="0" style={{ top: 0, height: "300px" }}>
              </div>
            </div>
          </div>

        </Drawer>
        <Drawer
          title=""
          width={400}
          closable={true}
          onClose={this.onChildrenDrawerClose}
          visible={this.state.childrenDrawer}
        >
          <Tabs defaultActiveKey="1" onChange={callback}>
            {/* Tab Pertama */}
            <TabPane tab="Header" key="1">
              <IdentitasPerusahaan />
              {/* <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="Pengirim" key="11">
            <DummyTab/>
            </TabPane>
            <TabPane tab="Penerima" key="22">
            <DummyTab/>
            </TabPane>
            <TabPane tab="Penjual" key="33">
            <DummyTab/>
            </TabPane>
            <TabPane tab="Pembeli" key="44">
            <DummyTab/>
            </TabPane>
            <TabPane tab="PPJK" key="55">
            <DummyTab/>
            </TabPane>
            </Tabs> */}
            </TabPane>

            {/* Tab dalem Tab anjg */}
            <TabPane tab="Status & Respon" key="2">
              <Tabs type="card">
                <TabPane tab="Status" key="66">
                  <Status />
                </TabPane>
                <TabPane tab="Respon" key="77">
                  <Respon />
                </TabPane>
              </Tabs>
            </TabPane>

          </Tabs>,
            </Drawer>
        {/* ----------- Modal INP ----------  */}
        <Modal
          title="Informasi Nilai Pabean (INP)"
          visible={this.state.modal_informasi}
          onCancel={this.handleCancel}
          width={"60%"}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Batal
                </Button>,
            <Button key="submit" type="primary" onClick={this.handleSubmitINP}>
              Kirim
                </Button>,
          ]}
        >
          <Spin spinning={this.state.loadingINP} tip="Send Data INP">
            <Row><label class="my-0">Seri Barang perlu Informasi Nilai Pabean</label></Row>
            <Col>
              <TextArea
                type="area"
                placeholder="seri barang"
                class="form-control"
                id="txtSeriBarangINP"
                name="uraian"
                onChange={this.handleINPChange}
                maxlength="50"
              /></Col>
          </Spin>

        </Modal>

        {/* ----------- Modal DNP ----------  */}
        <Modal
          md={'3'}
          title="Rekam Penerimaan Deklarasi Nilai Pabean (DNP)"
          visible={this.state.modal_dnp}
          onCancel={this.handleCancel}
          width={"60%"}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Batal
                </Button>,
            <Button key="submit" type="primary" onClick={this.handleSubmitDNP}>
              Kirim
                </Button>,
          ]}
        >
          <Form>
            <Spin spinning={this.state.loadingDNP} tip="Send Data DNP..">
              <Row>
                <Col span={17}>
                  <p>Nomor</p>
                  <Input
                    type="textarea"
                    name="nomorDnp"
                    onChange={this.onChangeDNP}
                    md={'3'} />
                </Col>
                <Col span={1}>
                </Col>
                <Col span={6}>
                  <p>Tanggal</p>
                  <DatePicker
                    format={'DD-MM-YYYY'}
                    onChange={this.onChangetglDNP}
                    defaultValue=""
                  />
                </Col>
              </Row>
              <Row>
                <p>Alasan</p>
                <Input
                  type="textarea" name="alasanDnp" onChange={this.onChangeDNP}
                />
              </Row>
              <Col>
                <label>Penerimaan DNP</label>
              </Col>
              <Col>
                <Radio.Group name="keputusanDnp" defaultValue={'Y'} onChange={this.onChangeDNP}>
                  <Radio value={'Y'}>Diterima</Radio>
                  <Radio value={'N'}>Tidak Diterima</Radio>
                </Radio.Group>
              </Col>
            </Spin>
          </Form>
        </Modal>

        <Modal
          title="Undangan Konsultasi Nilai Pabean"
          visible={this.state.modal_undangan}
          width={"60%"}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Batal
                </Button>,
            <Button key="submit" type="primary" onClick={this.handleSubmitUndangan}>
              Kirim
                </Button>,
          ]}
        >
          <Form>
            <Row>
              <p>Saudara diharapkan hadir di Kantor {this.state.namaKantorPanjang} Selambat-lambatnya 2 Hari sejak tanggal respon /pemberitahuan untuk melakukan konsultasi tentang nilai transaksi yang saudara beritahukan dalam     {namaDokumen} nomor {nomorDaftar} Tanggal {tanggalDaftar}  Aju {nomorAju}.
                    Apabila Saudara tidak hadir dalam jangka waktu tersebut,
                    nilai pabean ditentukan berdasarkan nilai identik sampai dengan metode pengulangan sesuai hirerki penggunanya.
                    untuk keperluan konsultasi diatas.
                    Diminta saudara agar membawa data dan atau informasi tambahan berupa
                    </p>
              <Spin spinning={this.state.loadingDNP} tip="Send Data Undangan Konsultasi...">
                <Input
                  type="textarea" name="uraian" onChange={this.handleUndanganChange}
                  placeholder="data dan/atau data tambahan" />
              </Spin>
            </Row>
          </Form>
        </Modal>
        <Modal
          title="Hasil Konsultasi Nilai Pabean"
          visible={this.state.modal_hasil}
          onCancel={this.handleCancel}
          width={"60%"}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Batal
                </Button>,
            <Button key="submit" type="primary" onClick={this.handleSubmitKonsultasi}>
              Kirim
                </Button>,
          ]}
        >
          <Form>
            <Spin spinning={this.state.loadingDNP} tip="Send Data.. KOnsultasi Pabean">
              <Row>
                <Col span={17}>
                  <p>Nomor BAKNP</p>
                  <Input
                    type="textarea"
                    name="nomorBaknp"
                    onChange={this.onChangeBaknp}
                    md={'3'} />
                </Col>
                <Col span={1}>
                </Col>
                <Col span={6}>
                  <p>Tanggal</p>
                  <DatePicker
                    format={"DD-MM-YYYY"}
                    onChange={this.onChangetglBaknp} />
                </Col>
              </Row>
              <Col>
              </Col>
              <Col>
                <Radio.Group name="kesimpulanKonsultasi" defaultValue={'Y'} onChange={this.onChangeBaknp}>
                  <label className="mb-2">kesimpulan Konsultasi</label>
                  <br />
                  <Radio value={'Y'}>Dapat Diyakini</Radio>
                  <Radio value={'N'}>Tidak Dapat Diyakini</Radio>
                </Radio.Group>
                <br />
              </Col>
              <Row class="mt-3">
                <TextArea
                  rows={2}
                  name="hasilKonsultasi"
                  onChange={this.onChangeBaknp}
                  placeholder="Rekam Hasil Konsultasi Nilai Pabean"
                />
                {/* <Input
                type="textarea" name="alasanDnp" onChange={this.onChangeDNP}
              /> */}
              </Row>
            </Spin>
          </Form>
        </Modal>

        {/* MODAL HS */}
        <Modal
          title="Modal Lartas"
          visible={this.state.modalLartas}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Tidak
                </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Yakin
                </Button>,
          ]}
        >

        </Modal>
        <Drawer
          title="Lihat Catatan Indikasi Beda Tarif dan atau Barang Larangan/Pembatasan"
          placement={this.state.placement}
          closable={true}
          onClose={this.onClose}
          visible={this.state.alertHs}
          width={420}

        >

          {/* <Divider>Selesai Pengecekan</Divider> */}
          {this.state.lartasList.length > 0 ?
            <div>
              {this.state.lartasList.map((value) => {
                return (
                  <div onClick={() => value.alert == "true" ? this.openWindowLartas(value.posTarif) : null} style={{ cursor: 'pointer' }}>
                    <Alert type={value.alert == "true" ? 'error' : 'success'} message={value.alert == "true" ? `Indikasi lartas HS ${value.posTarif} seri barang  ${value.seriBarang}` : `Tidak ada indikasi lartas HS ${value.posTarif} seri barang  ${value.seriBarang}`} banner style={{ marginBottom: 3 }} />
                  </div>
                )
              }
              )}
            </div>
            :
            null
          }

          {this.state.ftaList.map((value) => {

            return (
              <>
                <div onClick={() => this.openWindowLartas(value.posTarif)} style={{ cursor: 'pointer' }}>
                  <Alert type={value.alert == "true" ? 'success' : 'error'} message={value.alert == "true" ?
                    `Tidak ada indikasi skema FTA berbeda dengan negara asal seri barang ${value.seriBarang} HS  ${value.posTarif}` :
                    `Indikasi skema FTA berbeda dengan negara asal seri barang ${value.seriBarang} HS  ${value.posTarif}`
                  } banner style={{ marginBottom: 3 }} />
                </div>
              </>
            )
          }
          )}
          {this.state.kuotaLartasList.map((value) => {
            return (
              <div onClick={() => this.openWindowLartas(value.posTarif)} style={{ cursor: 'pointer' }}>
                <Alert type={value.alert == "true" ? 'error' : 'success'} message={value.alert == "true" ?
                  `Ada ketentuan kuota lartas HS ${value.posTarif} seri barang  ${value.seriBarang}  `
                  :
                  `Tidak ada ketentuan kuota lartas HS ${value.posTarif} seri barang  ${value.seriBarang} `
                } banner style={{ marginBottom: 3 }} />
              </div>
            )
          }
          )}

          {this.state.bmtList.map((value) => {
            return (
              <div onClick={() => this.openWindowLartas(value.posTarif)} style={{ cursor: 'pointer' }}>
                <Alert type={value.alert == "true" ? 'error' : 'success'} message={value.alert == "true" ?
                  `Terindikasi Bea Masuk Tambahan  HS ${value.posTarif} seri barang  ${value.seriBarang}`
                  :
                  `Tidak Terindikasi Bea Masuk Tambahan  HS ${value.posTarif} seri barang  ${value.seriBarang}`
                } banner style={{ marginBottom: 3 }} />
              </div>
            )
          }
          )}



        </Drawer>

        {/*---------NOTA PERMINTAAN DOKUMEN----------- */}
        <Modal
          title="Nota Permintaan Dokumen (NPD)"
          visible={this.state.modal_npd}
          onCancel={this.handleCancel}
          width={"80%"}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Batal
            </Button>,
            <Button key="submit" type="primary" onClick={this.copyTDtoTT}>
              Kirim
            </Button>,
          ]}
        >


          <Spin spinning={this.state.loadingDNP}>
            <div className="tableNpdPfpd">
              <DataGrid
                id="gridContainer"
                dataSource={this.state.npdData}
                // keyExpr="ID"
                customizeColumns={this.customizeColumns}
                allowColumnReordering={true}
                allowColumnResizing={true}
                rowAlternationEnabled={true}
                hoverStateEnabled={true}
                showBorders={true}
                onSelectionChanged={this.onSelectionChanged}
                selectedRowKeys={selectedRowKeys}
                onEditingStart={this.onEditingStart}
                onInitNewRow={this.onInitNewRow}
                onRowInserted={this.onRowInserted}
                onChange={this.onChangeNPD}
              >

                <Paging enabled={true} />
                <Scrolling mode="virtual" rowRenderingMode="virtual" />
                <Editing
                  mode="row"
                  // allowUpdating={true}
                  // allowDeleting={true}
                  allowAdding={true} />
                <Selection mode="multiple" />
                <Column dataField="kodeDokumen" caption="Nama Dokumen"
                  minWidth={500}>

                  <Lookup
                    dataSource={this.state.listDokumen}
                    valueExpr="kodeDokumen"
                    displayExpr="namaDokumen"
                    style={{ whiteSpace: 'pre-wrap', }}
                  />
                </Column>
                <Column dataField="nomorDokumen" caption="Nomor Dokumen" />
                <Column dataField="tanggalDokumen" caption="Tanggal Dokumen" dataType="date" format={"dd-MM-yyyy"} />
                <Column dataField="flagTerima" caption="Status" />
                <Column dataField="flagSudahDipenuhi" defaultVisible={true} />


              </DataGrid>
            </div>
          </Spin>




        </Modal>

        {/* KEPUTUSAN PFPD */}
        <Modal
          title="Form Kesimpulan"
          visible={this.state.modalKeputusan}
          onOk={this.handleKirimKeputusan}
          onCancel={this.handleCancel}
          width={"80%"}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Batal
            </Button>,
            <Button key="submit" type="primary" onClick={this.kirimKesimpulan}>
              Kirim
            </Button>,
          ]}
        >
          <Spin spinning={this.state.loadingKesimpulan} size="large">
            <TextArea
              name="uraian"
              value={this.state.kesimpulanPfpd}
              onChange={(e) => { this.setState({ kesimpulanPfpd: e.target.value }) }}
              rows={5}
            />
          </Spin>
        </Modal>

        {/* ----------- Modal Dokumen Pabean --------- */}

        <Modal
          title="Arsip Dokumen Pabean"
          visible={this.state.modal_arsip}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Batal
                </Button>,
            <Button key="submit" type="primary" onClick={this.handleArsip}>
              Rekam
                </Button>,
          ]}
        >
          <Col><label>Alasan Penyelesaian Dokumen Pabean</label></Col>
          <Col>
            <TextArea
              name="uraian"
              onChange={this.onChangeArsip}
              rows={4}
            /></Col>
          <Col><label className={""} style={{ color: "red", padding: "0px 12px 12px 0", fontSize: "10px" }} >*Dengan keputusan ini, pemeriksaan/penelitian Dokumen Pabean dianggap selesai (tidak akan terbit SPPB/SPTNP)
</label></Col>

        </Modal>
        {/* Autensi Audit */}
        <Modal
          title="Atensi Audit Dokumen Pabean
            "
          visible={this.state.modal_atensi_audit}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Batal
                </Button>,
            <Button key="submit" type="primary" onClick={this.handleAudit}>
              Rekam
                </Button>,
          ]}
        >
          <Col><label>Uraian Atensi Audit Dokumen Pabean</label></Col>
          <Col>
            <Spin spinning={this.state.loadingAudit} tip="Send Data Atensi Audit">
              <TextArea
                name="uraian"
                onChange={this.onChangeAudit}
                rows={4}
              />
            </Spin>
          </Col>
          <Col>
          </Col>
        </Modal>
      </>

    )
  }

}

export default StickyToolDataBarang;