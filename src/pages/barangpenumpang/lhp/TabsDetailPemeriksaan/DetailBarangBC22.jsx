import React, { Component } from "react";
import { Row, Col, Card, Input, Form, Button, Icon, Select, Modal, Pagination, InputNumber, Table, Spin, Checkbox, DatePicker } from "antd";
import axios from 'axios'
import '../TabsBAP/bebas.css'
import Highlighter from 'react-highlight-words';
import Swal from "sweetalert2";
import GlobalVariable from "../../../../helpers/GlobalVariable";
import { Fragment } from "react";
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;
const {
  REACT_APP_REFERENSI,
  REACT_APP_SECRET_KEY_REFERENSI,
  REACT_APP_LHP,
  REACT_APP_SECRET_KEY_LHP,
  REACT_APP_API_BARANG_PENUMPANG,
  REACT_APP_API_BARANG_PENUMPANG_KEY

} = process.env;

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

class DetailBarang extends Component {
  constructor() {
    super();
    this.state = {
      uraianBarang: "",
      kodeSatuanBarang: "",
      jumlahSatuan: "",
      visible: false,
      page: 0,
      satuanBarangAll: [],
      searchText: '',
      hasil: [],
      dataDokumen: null,
      visibleBruto: false,
      visibleJumlahKemasan: false,
      visibleNilaiBarang: false,
      visibleHargaSatuan: false,
      showflagTidakBersamaan: false,
      firstIndexPage: 0,
      readOnly: false,
      idEdit: 0,
      idLhpDetail: null,
      barangList: null,
      clear: false,
      flagTidakBersamaan: 'N',
      dataReferensiKategori: [],
      dataReferensiKategoriPendek: null,
      validImei1: true,
      validImei2: true,
      valutaAll: false
    };
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.modal = this.modal.bind(this);
    this.KirimData = this.KirimData.bind(this);
    this.getKapasitas = this.getKapasitas.bind(this);
    this.kapasitasHandler = this.kapasitasHandler.bind(this);

  }

  async getKapasitas(e) {
    this.setState({ fetching: true });
    let pelData = await fetch(
      `https://apisdev-gw.beacukai.go.id/v2/Referensi/v1/satuan-barang/all/${e.toUpperCase()}`,
      {
        headers: {
          accept: "application/json",
          "beacukai-api-key": `2f1313cf-e4e6-4172-926b-6ee720182f7a`
        },
        "Access-Control-Allow-Origin": "*"
      }
    )
      .then(response => response.json())
      .then(body => body.data);
    return pelData;
  }

  kapasitasHandler(event) {
    this.setState({
      kodeSatuanBarang: event.kodeSatuanBarang,
      namaSatuanBarang: event.namaSatuanBarang
    });
    // console.log(this.state.kodeAsalBarang)
  }

  async KirimData() {
    let DetailBarang = {
      UraianBarang: this.state.uraianBarang,
      JumlahBarang: this.state.jumlahSatuan,
      kodeSatuanBarang: this.state.kodeSatuanBarang,
    };
    // console.log(DetailBarang);
  }

  getReferensi(e) {
    let idHeader = localStorage.getItem("idHeader");
    // console.log("GET REFERENSI")

    axios.get(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/table/detail/list/${idHeader}`, {
      headers: {
        'beacukai-API-Key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
      }
    })
      .then(res => {
        // console.log("Get Data Referensi : ", res)
        // console.log("BarangList : ", this.state.barangList)
        let barang = this.state.barangList
        let referensi = res.data

        if (!(barang === null || barang === undefined || barang.length === 0)) {
          for (let i = 0; i < barang.length; i++) {
            referensi = referensi.filter(item => item.idDetail !== barang[i].tdLhpDetail.idDetail);
          }
        }

        this.setState({
          loading: false,
          hasil: referensi,
          totalDataReferensi: referensi.length
        }, () => {
          // console.log(this.state.hasil)
        });


      })
      .catch((err) => {
        swalWithBootstrapButtons.fire(
          "Oops!",
          `Gagal mengambil data referensi barang`,
          "error"
        );
        this.setState({ loading: false });
        GlobalVariable.openNotificationWithIcon("error");
      });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log("requiredDetail : ", this.props.requiredDetail)
    if (prevProps.requiredDetail !== this.props.requiredDetail) {
      this.setState({
        requiredDetail: this.props.requiredDetail
      })
    }
    if (prevProps.viewData !== this.props.viewData || prevProps.editData !== this.props.editData) {
      // this.setState({
      //     uraianBarang: this.props.uraian,
      //     jumlahSatuan: this.props.jumlahSatuan,
      //     kodeSatuanBarang: this.props.kodeSatuanBarang

      // })
      // console.log("Detail Barang Updates: ", this.props)
      if (!(this.props.data === null || this.props.data === undefined)) {
        this.setState({
          // hasil: this.props.data.barang,
          dataDokumen: this.props.data,
          // totalDataReferensi: this.props.data.barang.length,
          showflagTidakBersamaan: this.props.data.header.kodeDokumen === '22' ? true : false,
          barangList: this.props.barangList
        })
      }
      if (!(this.props.viewData === null)) {
        // console.log("Detail Barang View: ", this.props.viewData)
        this.setState({
          uraian: this.props.viewData.uraian,
          merk: this.props.viewData.merk,
          tipe: this.props.viewData.tipe,
          spesifikasiLain: this.props.viewData.spesifikasiLain,
          ram: this.props.viewData.ram,
          kapasitas: this.props.viewData.kapasitas,
          imei1: this.props.viewData.imei1,
          imei2: this.props.viewData.imei2,
          warna: this.props.viewData.warna,
          npwp: this.props.viewData.npwp,
          idEntitas: this.props.viewData.idEntitas,
          nomorDokumenIzin: this.props.viewData.nomorDokumenIzin,
          tanggalDokumenIzin: this.props.viewData.tanggalDokumenIzin,
          kodeBarang: this.props.viewData.kodeBarang,
          kodeKondisiBarang: this.props.viewData.kodeKondisiBarang,
          kodeMataUang: this.props.viewData.kodeMataUang,
          jumlahKemasan: this.props.viewData.jumlahKemasan,
          jumlahSatuan: this.props.viewData.jumlahSatuan,
          jumlahHarga: this.props.viewData.jumlahHarga,
          kodeJenisKemasan: this.props.viewData.kodeJenisKemasan,
          hargaSatuan: this.props.viewData.hargaSatuan,
          bruto: this.props.viewData.bruto,
          ukuran: this.props.viewData.ukuran,
          kodeSatuanBarang: this.props.viewData.kodeSatuanBarang,
          idDetail: this.props.viewData.idDetail,
          keterangan: this.props.viewData.keterangan,
          idLhpDetail: this.props.viewData.idLhpDetail,
          idNewBarang: this.props.viewData.idNewBarang,
          pernyataanLartas: this.props.viewData.pernyataanLartas,
          posTarif: this.props.viewData.posTarif,
          flagTidakBersamaan: this.props.viewData.flagTidakBersamaan,
          kodeKategoriBarang: this.props.viewData.kodeKategoriBarang,
          valutaAll: (this.props.viewData.kodeKategoriBarang === '3' || this.props.viewData.kodeKategoriBarang === '4') ? true : false,
          kategoriKarantina: this.props.viewData.kategoriKarantina,
          flagLostAndFound: this.props.viewData.flagLostAndFound,
          flagManifes: this.props.viewData.flagManifes,
          idHeader: this.props.viewData.idHeader,
          idLhp: this.props.viewData.idLhp,
          readOnly: true
        })
      } else if (!(this.props.editData === null)) {
        // console.log("Detail Barang Edit: ", this.props.editData)
        this.setState({
          uraian: this.props.editData.uraian,
          merk: this.props.editData.merk,
          tipe: this.props.editData.tipe,
          spesifikasiLain: this.props.editData.spesifikasiLain,
          ram: this.props.editData.ram,
          kapasitas: this.props.editData.kapasitas,
          imei1: this.props.editData.imei1,
          imei2: this.props.editData.imei2,
          warna: this.props.editData.warna,
          npwp: this.props.editData.npwp,
          idEntitas: this.props.editData.idEntitas,
          nomorDokumenIzin: this.props.editData.nomorDokumenIzin,
          tanggalDokumenIzin: this.props.editData.tanggalDokumenIzin,
          kodeBarang: this.props.editData.kodeBarang,
          kodeKondisiBarang: this.props.editData.kodeKondisiBarang,
          kodeMataUang: this.props.editData.kodeMataUang,
          jumlahKemasan: this.props.editData.jumlahKemasan,
          jumlahSatuan: this.props.editData.jumlahSatuan,
          jumlahHarga: this.props.editData.jumlahHarga,
          kodeJenisKemasan: this.props.editData.kodeJenisKemasan,
          hargaSatuan: this.props.editData.hargaSatuan,
          bruto: this.props.editData.bruto,
          ukuran: this.props.editData.ukuran,
          kodeSatuanBarang: this.props.editData.kodeSatuanBarang,
          idDetail: this.props.editData.idDetail,
          keterangan: this.props.editData.keterangan,
          idNewBarang: this.props.editData.idNewBarang,
          idEdit: this.props.editData.idEdit !== null && this.props.editData.idLhpDetail === undefined ? this.state.idEdit + 1 : this.props.editData.idEdit,
          idLhpDetail: this.props.editData.idLhpDetail,
          pernyataanLartas: this.props.editData.pernyataanLartas,
          posTarif: this.props.editData.posTarif,
          flagTidakBersamaan: this.props.editData.flagTidakBersamaan,
          kodeKategoriBarang: this.props.editData.kodeKategoriBarang,
          valutaAll: (this.props.editData.kodeKategoriBarang === '3' || this.props.editData.kodeKategoriBarang === '4') ? true : false,
          kategoriKarantina: this.props.editData.kategoriKarantina,
          flagLostAndFound: this.props.editData.flagLostAndFound,
          flagManifes: this.props.editData.flagManifes,
          readOnly: false
        })
      } else {
        this.setState({
          action: 'add',
          uraian: null,
          merk: null,
          tipe: null,
          spesifikasiLain: null,
          ram: null,
          kapasitas: null,
          imei1: null,
          imei2: null,
          warna: null,
          npwp: null,
          idEntitas: null,
          nomorDokumenIzin: null,
          tanggalDokumenIzin: null,
          kodeBarang: null,
          kodeKondisiBarang: null,
          kodeMataUang: null,
          jumlahKemasan: null,
          jumlahSatuan: null,
          jumlahHarga: null,
          kodeJenisKemasan: null,
          hargaSatuan: null,
          bruto: null,
          ukuran: null,
          kodeSatuanBarang: null,
          idDetail: null,
          keterangan: null,
          idEdit: null,
          idLhpDetail: null,
          readOnly: false,
          pernyataanLartas: null,
          posTarif: null,
          flagTidakBersamaan: null,
          kodeKategoriBarang: null,
          kategoriKarantina: null,
          flagLostAndFound: null,
          valutaAll: false,
          flagManifes: null,
          idNewBarang: null
        })
      }
    }
  }

  componentDidMount() {
    // console.log("Detail Barang Mounts: ", this.props)
    if (!(this.props.data === null || this.props.data === undefined)) {
      this.setState({
        // hasil: this.props.data.barang,
        dataDokumen: this.props.data,
        // totalDataReferensi: this.props.data.barang.length,
        showflagTidakBersamaan: this.props.data.header.kodeDokumen === '22' ? true : false,
        barangList: this.props.barangList
      })
    }

    if (!(this.props.viewData === null)) {
      // console.log("Detail Barang View: ", this.props.viewData)
      this.setState({
        uraian: this.props.viewData.uraian,
        merk: this.props.viewData.merk,
        tipe: this.props.viewData.tipe,
        spesifikasiLain: this.props.viewData.spesifikasiLain,
        ram: this.props.viewData.ram,
        kapasitas: this.props.viewData.kapasitas,
        imei1: this.props.viewData.imei1,
        imei2: this.props.viewData.imei2,
        warna: this.props.viewData.warna,
        npwp: this.props.viewData.npwp,
        idEntitas: this.props.viewData.idEntitas,
        nomorDokumenIzin: this.props.viewData.nomorDokumenIzin,
        tanggalDokumenIzin: this.props.viewData.tanggalDokumenIzin,
        kodeBarang: this.props.viewData.kodeBarang,
        kodeKondisiBarang: this.props.viewData.kodeKondisiBarang,
        kodeMataUang: this.props.viewData.kodeMataUang,
        jumlahKemasan: this.props.viewData.jumlahKemasan,
        jumlahSatuan: this.props.viewData.jumlahSatuan,
        jumlahHarga: this.props.viewData.jumlahHarga,
        kodeJenisKemasan: this.props.viewData.kodeJenisKemasan,
        hargaSatuan: this.props.viewData.hargaSatuan,
        bruto: this.props.viewData.bruto,
        ukuran: this.props.viewData.ukuran,
        kodeSatuanBarang: this.props.viewData.kodeSatuanBarang,
        idDetail: this.props.viewData.idDetail,
        keterangan: this.props.viewData.keterangan,
        idLhpDetail: this.props.viewData.idLhpDetail,
        idNewBarang: this.props.viewData.idNewBarang,
        pernyataanLartas: this.props.viewData.pernyataanLartas,
        posTarif: this.props.viewData.posTarif,
        flagTidakBersamaan: this.props.viewData.flagTidakBersamaan,
        kodeKategoriBarang: this.props.viewData.kodeKategoriBarang,
        valutaAll: (this.props.viewData.kodeKategoriBarang === '3' || this.props.viewData.kodeKategoriBarang === '4') ? true : false,
        kategoriKarantina: this.props.viewData.kategoriKarantina,
        flagLostAndFound: this.props.viewData.flagLostAndFound,
        flagManifes: this.props.viewData.flagManifes,
        readOnly: true,
        action: 'view'
      })
    } else if (!(this.props.editData === null)) {
      // console.log("Detail Barang Edit: ", this.props.editData)
      this.setState({
        uraian: this.props.editData.uraian,
        merk: this.props.editData.merk,
        tipe: this.props.editData.tipe,
        spesifikasiLain: this.props.editData.spesifikasiLain,
        ram: this.props.editData.ram,
        kapasitas: this.props.editData.kapasitas,
        imei1: this.props.editData.imei1,
        imei2: this.props.editData.imei2,
        warna: this.props.editData.warna,
        npwp: this.props.editData.npwp,
        idEntitas: this.props.editData.idEntitas,
        nomorDokumenIzin: this.props.editData.nomorDokumenIzin,
        tanggalDokumenIzin: this.props.editData.tanggalDokumenIzin,
        kodeBarang: this.props.editData.kodeBarang,
        kodeKondisiBarang: this.props.editData.kodeKondisiBarang,
        kodeMataUang: this.props.editData.kodeMataUang,
        jumlahKemasan: this.props.editData.jumlahKemasan,
        jumlahSatuan: this.props.editData.jumlahSatuan,
        jumlahHarga: this.props.editData.jumlahHarga,
        kodeJenisKemasan: this.props.editData.kodeJenisKemasan,
        hargaSatuan: this.props.editData.hargaSatuan,
        bruto: this.props.editData.bruto,
        ukuran: this.props.editData.ukuran,
        kodeSatuanBarang: this.props.editData.kodeSatuanBarang,
        idDetail: this.props.editData.idDetail,
        keterangan: this.props.editData.keterangan,
        idNewBarang: this.props.editData.idNewBarang,
        idEdit: this.props.editData.idEdit !== null && this.props.editData.idLhpDetail === undefined ? this.state.idEdit + 1 : this.props.editData.idEdit,
        idLhpDetail: this.props.editData.idLhpDetail,
        pernyataanLartas: this.props.editData.pernyataanLartas,
        posTarif: this.props.editData.posTarif,
        flagTidakBersamaan: this.props.editData.flagTidakBersamaan,
        kodeKategoriBarang: this.props.editData.kodeKategoriBarang,
        valutaAll: (this.props.editData.kodeKategoriBarang === '3' || this.props.editData.kodeKategoriBarang === '4') ? true : false,
        kategoriKarantina: this.props.editData.kategoriKarantina,
        flagLostAndFound: this.props.editData.flagLostAndFound,
        flagManifes: this.props.editData.flagManifes,
        readOnly: false,
        action: 'edit'
      })
    } else {
      this.setState({
        action: 'add',
        uraian: null,
        merk: null,
        tipe: null,
        spesifikasiLain: null,
        ram: null,
        kapasitas: null,
        imei1: null,
        imei2: null,
        warna: null,
        npwp: null,
        idEntitas: null,
        nomorDokumenIzin: null,
        tanggalDokumenIzin: null,
        kodeBarang: null,
        kodeKondisiBarang: null,
        kodeMataUang: null,
        jumlahKemasan: null,
        jumlahSatuan: null,
        jumlahHarga: null,
        kodeJenisKemasan: null,
        hargaSatuan: null,
        bruto: null,
        ukuran: null,
        kodeSatuanBarang: null,
        idDetail: null,
        keterangan: null,
        idEdit: null,
        idLhpDetail: null,
        readOnly: false,
        pernyataanLartas: null,
        posTarif: null,
        flagTidakBersamaan: null,
        kodeKategoriBarang: null,
        kategoriKarantina: null,
        flagLostAndFound: null,
        flagManifes: null,
        valutaAll: false,
        idNewBarang: null
      })
    }
    this.getReferensi()
    this.fetchReferensiKemasan()
    this.fetchReferensiValuta()
    this.fetchReferensiValuta2()
    this.fetchReferensiSatuan()
    this.fetchReferensiKategori()
    this.fetchReferensiPemilik()
  }

  fetchReferensiKemasan = () => {
    // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
    const isLocalhost =
      window.location.host == "ceisa40.customs.go.id-prod";
    const res = axios.get(
      `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/kemasan/list`,
      {
        headers: {
          [!isLocalhost
            ? "beacukai-api-key"
            : "customs-api-key"]: `2f1313cf-e4e6-4172-926b-6ee720182f7a`,

        }
      }
    )
      .then(res => {
        // console.log('kode jenis pungutan:', res.data.data);
        const result = res.data.map(data => ({
          text: `${data.kodeKemasan} - ${data.namaKemasan}`,
          value: data.kodeKemasan,
        }));
        this.setState({ dataReferensiKemasan: result, fetchingReferensiKemasan: false });
      })
      .catch(error => {
        console.log(error)
      });
  };

  fetchReferensiPemilik = () => {
    // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
    let idHeader = localStorage.getItem("idHeader");
    const isLocalhost =
      window.location.host == "ceisa40.customs.go.id-prod";
    const res = axios.get(
      `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/table/entitas/keluarga/${idHeader}`,
      {
        headers: {
          [!isLocalhost
            ? "beacukai-api-key"
            : "customs-api-key"]: `2f1313cf-e4e6-4172-926b-6ee720182f7a`,

        }
      }
    )
      .then(res => {
        // console.log('kode jenis pungutan:', res.data.data);
        const result = res.data.map(data => ({
          text: `${data.nama}`,
          value: data.idEntitas,
        }));
        if (this.state.dataDokumen !== null) {
          const add = {
            text: this.state.dataDokumen.header.nama,
            value: null
          }
          result.push(add)
        }
        this.setState({ dataReferensiPemilik: result, fetchingReferensiPemilik: false });
      })
      .catch(error => {
        console.log(error)
      });
  };

  fetchReferensiKategori = () => {
    // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
    const isLocalhost =
      window.location.host == "ceisa40.customs.go.id-prod";
    const res = axios.get(
      `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/cd/pernyataan-barang/list`,
      {
        headers: {
          [!isLocalhost
            ? "beacukai-api-key"
            : "customs-api-key"]: `2f1313cf-e4e6-4172-926b-6ee720182f7a`,

        }
      }
    )
      .then(res => {
        // console.log('kode jenis pungutan:', res.data.data);
        const result = res.data.data.map(data => ({
          text: `${data.uraian}`,
          value: data.kodePernyataan,
        }));
        const resultPendek = res.data.data.map(data => ({
          text: `${data.uraianPendek}`,
          value: data.kodePernyataan,
        }));
        this.setState({ dataReferensiKategori: result, dataReferensiKategoriPendek: resultPendek, fetchingReferensiKategori: false });
      })
      .catch(error => {
        console.log(error)
      });
  };

  fetchReferensiSatuan = () => {
    // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
    const isLocalhost =
      window.location.host == "ceisa40.customs.go.id-prod";
    const res = axios.get(
      `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/satuanbarang/list`,
      {
        headers: {
          [!isLocalhost
            ? "beacukai-api-key"
            : "customs-api-key"]: `2f1313cf-e4e6-4172-926b-6ee720182f7a`,

        }
      }
    )
      .then(res => {
        // console.log('kode jenis pungutan:', res.data.data);
        const result = res.data.map(data => ({
          text: `${data.kodeSatuanBarang} - ${data.namaSatuanBarang}`,
          value: data.kodeSatuanBarang,
        }));
        this.setState({ dataReferensiSatuan: result, fetchingReferensiSatuan: false });
      })
      .catch(error => {
        console.log(error)
      });
  };

  fetchReferensiValuta = () => {
    // const isLocalhost =
    //   window.location.host == "ceisa40.customs.go.id-prod";
    // const res = axios.get(
    //   `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/valuta/list`,
    //   {
    //     headers: {
    //       [!isLocalhost
    //         ? "beacukai-api-key"
    //         : "customs-api-key"]: `2f1313cf-e4e6-4172-926b-6ee720182f7a`,

    //     }
    //   }
    // )
    //   .then(res => {
    //     const result = res.data.map(data => ({
    //       text: `${data.kodeValuta} - ${data.namaValuta}`,
    //       value: data.kodeValuta,
    //     }));
    //     this.setState({ dataReferensiValuta: result, fetchingReferensiValuta: false });
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   });

    var valutaBarang = [{ "kodeValuta": "IDR", "namaValuta": "Rupiah" }, { "kodeValuta": "USD", "namaValuta": "US Dollar" }, { "kodeValuta": "AUD", "namaValuta": "Australian Dollar" }, { "kodeValuta": "CAD", "namaValuta": "Canadian Dollar" }, { "kodeValuta": "DKK", "namaValuta": "Danish Krone" }, { "kodeValuta": "HKD", "namaValuta": "Hong Kong Dollar" }, { "kodeValuta": "MYR", "namaValuta": "Malaysian Ringgit" }, { "kodeValuta": "NZD", "namaValuta": "New Zealand Dollar" }, { "kodeValuta": "NOK", "namaValuta": "Norwegian Krone" }, { "kodeValuta": "GBP", "namaValuta": "Pound Sterling" }, { "kodeValuta": "SGD", "namaValuta": "Singapore Dollar" }, { "kodeValuta": "SEK", "namaValuta": "Swedish Krone" }, { "kodeValuta": "CHF", "namaValuta": "Swiss Franc" }, { "kodeValuta": "JPY", "namaValuta": "Yen" }, { "kodeValuta": "MMK", "namaValuta": "Kyat" }, { "kodeValuta": "INR", "namaValuta": "Indian Rupee" }, { "kodeValuta": "KWD", "namaValuta": "Kuwauti Dinar" }, { "kodeValuta": "PKR", "namaValuta": "Pakistan Rupee" }, { "kodeValuta": "PHP", "namaValuta": "Philippines Peso" }, { "kodeValuta": "SAR", "namaValuta": "Saudi Riyal" }, { "kodeValuta": "LKR", "namaValuta": "Sri Langka Rupee" }, { "kodeValuta": "THB", "namaValuta": "Baht" }, { "kodeValuta": "BND", "namaValuta": "Brunei Dollar" }, { "kodeValuta": "EUR", "namaValuta": "Euro" }, { "kodeValuta": "CNY", "namaValuta": "Yuan Renminbi" }, { "kodeValuta": "KRW", "namaValuta": "Won" }];
    const result = valutaBarang.map(data => ({
      text: `${data.kodeValuta} - ${data.namaValuta}`,
      value: data.kodeValuta,
    }));
    this.setState({ dataReferensiValuta: result, fetchingReferensiValuta: false });
  };

  fetchReferensiValuta2 = () => {
    const isLocalhost =
      window.location.host == "ceisa40.customs.go.id-prod";
    const res = axios.get(
      `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/valuta/list`,
      {
        headers: {
          [!isLocalhost
            ? "beacukai-api-key"
            : "customs-api-key"]: `2f1313cf-e4e6-4172-926b-6ee720182f7a`,

        }
      }
    )
      .then(res => {
        const result = res.data.map(data => ({
          text: `${data.kodeValuta} - ${data.namaValuta}`,
          value: data.kodeValuta,
        }));
        this.setState({ dataReferensiValuta2: result, fetchingReferensiValuta2: false });
      })
      .catch(error => {
        console.log(error)
      });

    // var valutaBarang = [{ "kodeValuta": "IDR", "namaValuta": "Rupiah" }, { "kodeValuta": "USD", "namaValuta": "US Dollar" }, { "kodeValuta": "AUD", "namaValuta": "Australian Dollar" }, { "kodeValuta": "CAD", "namaValuta": "Canadian Dollar" }, { "kodeValuta": "DKK", "namaValuta": "Danish Krone" }, { "kodeValuta": "HKD", "namaValuta": "Hong Kong Dollar" }, { "kodeValuta": "MYR", "namaValuta": "Malaysian Ringgit" }, { "kodeValuta": "NZD", "namaValuta": "New Zealand Dollar" }, { "kodeValuta": "NOK", "namaValuta": "Norwegian Krone" }, { "kodeValuta": "GBP", "namaValuta": "Pound Sterling" }, { "kodeValuta": "SGD", "namaValuta": "Singapore Dollar" }, { "kodeValuta": "SEK", "namaValuta": "Swedish Krone" }, { "kodeValuta": "CHF", "namaValuta": "Swiss Franc" }, { "kodeValuta": "JPY", "namaValuta": "Yen" }, { "kodeValuta": "MMK", "namaValuta": "Kyat" }, { "kodeValuta": "INR", "namaValuta": "Indian Rupee" }, { "kodeValuta": "KWD", "namaValuta": "Kuwauti Dinar" }, { "kodeValuta": "PKR", "namaValuta": "Pakistan Rupee" }, { "kodeValuta": "PHP", "namaValuta": "Philippines Peso" }, { "kodeValuta": "SAR", "namaValuta": "Saudi Riyal" }, { "kodeValuta": "LKR", "namaValuta": "Sri Langka Rupee" }, { "kodeValuta": "THB", "namaValuta": "Baht" }, { "kodeValuta": "BND", "namaValuta": "Brunei Dollar" }, { "kodeValuta": "EUR", "namaValuta": "Euro" }, { "kodeValuta": "CNY", "namaValuta": "Yuan Renminbi" }, { "kodeValuta": "KRW", "namaValuta": "Won" }];
    // const result = valutaBarang.map(data => ({
    //   text: `${data.kodeValuta} - ${data.namaValuta}`,
    //   value: data.kodeValuta,
    // }));
    // this.setState({ dataReferensiValuta: result, fetchingReferensiValuta: false });
  };

  onSelectionChanged(data) {
    // console.log("Selected Barang : ", data)
    this.setState({
      uraian: data.uraian,
      merk: data.merk,
      tipe: data.tipe,
      spesifikasiLain: data.spesifikasiLain,
      ram: data.ram,
      kapasitas: data.kapasitas,
      imei1: data.imei1,
      imei2: data.imei2,
      warna: data.warna,
      npwp: data.npwp,
      kodeBarang: data.kodeBarang,
      kodeKondisiBarang: data.kodeKondisiBarang,
      kodeMataUang: data.kodeMataUang,
      jumlahKemasan: data.jumlahKemasan,
      jumlahSatuan: data.jumlahSatuan,
      jumlahHarga: data.jumlahHarga,
      kodeJenisKemasan: data.kodeJenisKemasan,
      hargaSatuan: data.hargaSatuan,
      bruto: data.bruto,
      ukuran: data.ukuran,
      kodeSatuanBarang: data.kodeSatuanBarang,
      kodeKategoriBarang: data.kodeKategoriBarang,
      kategoriKarantina: data.kategoriKarantina,
      idDetail: data.idDetail,
      keterangan: data.keterangan,
      flagTidakBersamaan: data.flagTidakBersamaan,
      flagLostAndFound: data.flagLostAndFound,
      flagManifes: data.flagManifes,
      showModal: false,
      clear: true
    });
    this.props.handleClear(data);
  }

  modal() {
    this.setState({
      showModal: true,
      open: true,
    });
    this.getReferensi()
  }

  handleOk = (e) => {
    // console.log(e);
    this.setState({
      showModal: false,
    });
  };

  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      showModal: false,
    });
  };

  onChangeData = (event, e) => {
    this.setState(
      {
        jumlahSatuan: event
      },
      () => {
        this.checkNumber(this.state.jumlahSatuan);
      }
    );
  };

  checkNumber = (e) => {
    if (typeof e !== "number") {
      this.setState({ visible: true })
    } else {
      this.setState({ visible: false })
    }
  };

  onChangeDataNilaiBarang = (event, e) => {
    this.setState(
      {
        jumlahHarga: event,
      },
      () => {
        this.checkNumberNilaiBarang(this.state.jumlahHarga);
      }
    );
  };

  checkNumberNilaiBarang = (e) => {
    if (typeof e !== "number") {
      this.setState({ visibleNilaiBarang: true })
    } else {
      this.setState({ visibleNilaiBarang: false })
    }
  };

  onChangeImei1 = (event, e) => {
    let validImei = this.cekImei(event);
    this.setState({ imei1: event, validImei1: validImei });
  };

  onChangeKategori = (event, e) => {
    let valutaAll = (event === '3' || event === '4') ? true : false
    this.setState({ kodeKategoriBarang: event, valutaAll: valutaAll, kodeMataUang: null });
  };

  onChangeImei2 = (event, e) => {
    let validImei = this.cekImei(event);
    this.setState({ imei2: event, validImei2: validImei });
  };

  cekImei(input) {
    let valid = false;
    input = input.toString();
    if (input.length > 14) {
      let computedCheckDigit = this.getCheckDigit(input.substring(0, 14));
      let checkDigitInSource = parseInt(input.substring(14));
      if (computedCheckDigit === checkDigitInSource) {
        valid = true;
      }
    }
    return valid;
  };

  getCheckDigit(imeiPrefix) {
    let sum = 0;
    for (let i = 13; i >= 0; i--) {
      let sDigit = imeiPrefix.substring(i, i + 1);
      let digit = parseInt(sDigit);
      if (i % 2 === 0) {
        sum = sum + digit;
      } else {
        sum = sum + this.sumOfDigits(digit * 2);
      }
    }
    sum = sum * 9;
    return sum % 10;
  };

  sumOfDigits(number) {
    let sum = 0;
    while (number > 0) {
      sum += number % 10;
      number = parseInt(number / 10);
    }
    return sum;
  };

  onChangeDataHargaSatuan = (event, e) => {
    this.setState(
      {
        hargaSatuan: event,
      },
      () => {
        this.checkNumberHargaSatuan(this.state.hargaSatuan);
        this.onChangeDataJumlahHarga()
      }
    );
    // if (!(this.state.jumlahSatuan === null || this.state.jumlahSatuan === undefined) && !(this.state.hargaSatuan === null || this.state.hargaSatuan === undefined)) {
    //     this.setState({ jumlahHarga: this.state.jumlahSatuan * this.state.hargaSatuan })
    // } else {
    //     this.setState({ jumlahHarga: this.state.jumlahHarga })
    // }
  };

  onChangeDataJumlahHarga = (e) => {
    if (!(this.state.jumlahSatuan === null || this.state.jumlahSatuan === undefined) && !(this.state.hargaSatuan === null || this.state.hargaSatuan === undefined)) {
      this.setState({ jumlahHarga: this.state.jumlahSatuan * this.state.hargaSatuan })
    } else {
      this.setState({ jumlahHarga: this.state.jumlahHarga })
    }
  };

  checkNumberHargaSatuan = (e) => {
    if (typeof e !== "number") {
      this.setState({ visibleHargaSatuan: true })
    } else {
      this.setState({ visibleHargaSatuan: false })
    }
  };

  onChangeDataBruto = (event, e) => {
    this.setState(
      {
        bruto: event
      },
      () => {
        this.checkNumberBruto(this.state.bruto);
      }
    );
  };

  checkNumberBruto = (e) => {
    if (typeof e !== "number") {
      this.setState({ visibleBruto: true })
    } else {
      this.setState({ visibleBruto: false })
    }
  };

  onChangeDataJumlahKemasan = (event, e) => {
    this.setState(
      {
        jumlahKemasan: event
      },
      () => {
        this.checkNumberJumlahKemasan(this.state.jumlahKemasan);
      }
    );
  };

  checkNumberJumlahKemasan = (e) => {
    if (typeof e !== "number") {
      this.setState({ visibleJumlahKemasan: true })
    } else {
      this.setState({ visibleJumlahKemasan: false })
    }
  };

  handlePageChange = (page) => {
    this.setState({
      page: page - 1
    }, () => this.getReferensi())

  }

  fetchJenisSatuan = value => {
    // console.log('fetching user', value);
    const isLocalhost =
      window.location.host == "ceisa40.customs.go.id";
    this.setState({ dataJenisSatuan: [], fetching: true });
    if (value.length >= 2) {
      axios.get(`https://apisdev-gw.beacukai.go.id/v2/Referensi/v1/satuan-barang/kata/` + value.toUpperCase(), {
        headers: {
          [!isLocalhost
            ? "beacukai-api-key"
            : "customs-api-key"]: `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
        }
      })
        .then(res => {
          // console.log('jenis satuan:', res.data.data);
          const result = res.data.data.map(data => ({
            text: `${data.kodeSatuanBarang} - ${data.namaSatuanBarang}`,
            value: data.kodeSatuanBarang,
          }));
          this.setState({ dataJenisSatuan: result, fetching: false });
        })
        .catch(error => {
          console.log(error)
        });
    }
  };


  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    }, () => {
      this.getReferensi()
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' }, () => {
      this.getReferensi()
    });
  };

  getSatuanBarang = (e) => {
    if (e.length > 1) {
      this.setState({ fetchingSatuan: true });
      axios.get(`https://apisdev-gw.beacukai.go.id/v2/Referensi/v1/satuan-barang/kata/${e.toUpperCase()}`, {
        headers: {
          accept: "application/json",
          "beacukai-api-key": `2f1313cf-e4e6-4172-926b-6ee720182f7a`
        },
      }).then(body => {
        // console.log('datasatuan', body.data.data)
        if (body.data.data) {
          if (body.data.data.length > 0) {
            this.setState({
              satuanBarangAll: body.data.data,
              fetchingSatuan: false
            })
          } else {
            this.setState({
              fetchingSatuan: false
            })
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Data tidak tersedia!',
            })
          }
        }
      }).catch(err => {
        if (err) {
          this.setState({
            fetchingSatuan: false
          })
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Data tidak tersedia!',
          })
        }
      })
    }

  }

  getValueSatuanBarang = (e) => {
    this.setState({
      kodeSatuanBarang: e
    })
  }

  onChange(e) {
    this.setState({ flagTidakBersamaan: e.target.checked ? 'Y' : 'N' });
  }

  onChangeLostAndFound(e) {
    this.setState({ flagLostAndFound: e.target.checked ? 'Y' : 'N' });
  }

  onChangemanifes(e) {
    this.setState({ flagManifes: e.target.checked ? 'Y' : 'N' });
  }

  handleKategori = (value, e) => {
    const kategori = value;

    if (!(kategori === null || kategori === undefined)) {
      this.setState({ showFormBiasa: false, kodeKategoriBarang: value });
      if (kategori === '1') {
        this.setState({ showKategoriKarantina: true });
      } else {
        this.setState({ showKategoriKarantina: false, kategoriKarantina: null });
      }
      if (kategori === '1' || kategori === '2' || kategori === '5' || kategori === '6' || kategori === '7') {
        this.setState({ showFormBiasa: true });
      }
    }
  };

  onChangeTglIzin = (date, dateString) => {
    const tanggal = moment(dateString, 'DD-MM-YYYY HH:mm:ss')
    this.setState({
      tanggalDokumenIzin: tanggal.format("YYYY-MM-DD HH:mm:ss"),
    });
  };

  render() {
    const { hasil, loadingReferensi, totalDataReferensi, firstIndexPage, page } = this.state;
    let numb = page + 1;
    const column = [
      {
        title: 'No.',
        dataIndex: ++this.count,
        render: () => numb++,
      },
      // {
      //     title: "idDetail",
      //     dataIndex: "idDetail",
      //     key: 5,
      // },

      {
        title: "Kategori",
        dataIndex: "kodeKategoriBarang",
        key: 2,
        render: (value, item, index) => {
          let kode = this.state.dataReferensiKategoriPendek !== null ? this.state.dataReferensiKategoriPendek.filter(item => item.value === value) : null;
          return (<span>{kode !== null && kode.length !== 0 ? kode[0].text : null}</span>)
        },
        // render: (key, record, e) => {
        //     // console.log(record, e);
        //     return (
        //         <div>
        //             {/* <Link
        //                 to={"/barang-penumpang/bap-perekaman"}
        //                 type="primary"
        //                 onClick={(evt) => this.getidheader(record, evt)}
        //             >
        //                 &nbsp;
        //                 <button type="button" className="btn btn-bold btn-sm btn-label-primary">
        //                     <span className="kt-hidden-mobile">BAP</span>
        //                 </button>
        //             </Link>
        //             &nbsp; */}
        //             <Link
        //                 to={"/barang-penumpang/lhp-perekaman"}
        //                 type="primary"
        //                 onClick={(evt) => this.getidheader(record, evt)}
        //             >
        //                 &nbsp;
        //                 <button type="button" className="btn btn-bold btn-sm btn-label-success">
        //                     <span className="kt-hidden-mobile">Rekam</span>
        //                 </button>
        //                 {/* <i className="fas fa-paper-plane"></i>
        //                 &nbsp; LHP */}
        //             </Link>
        //         </div>
        //     );
        // },
      },
      {
        title: "Uraian",
        dataIndex: "uraian",
        key: 3,
        ...this.getColumnSearchProps('uraian'),
      },
      {
        title: "Jumlah",
        dataIndex: "jumlahSatuan",
        key: 4,
      },
      {
        title: "Satuan",
        dataIndex: "kodeSatuanBarang",
        key: 5,
      },
      {
        title: "Tidak Datang Bersamaan",
        dataIndex: "flagTidakBersamaan",
        key: 6,
      }
    ]
    return (
      <div id={this.props.requiredDetail === true ? "error" : ""}
      >

        {this.state.dataDokumen !== null ? (this.state.dataDokumen.header.kodeDokumen === "22" ? (
          <Card
            size="small"
            title="Detail Barang"
            extra={
              !this.state.readOnly && this.props.editData === null ? (
                // <Button type="primary" onClick={this.modal}>
                //     <Icon type="plus-square" />
                //     Referensi Barang
                // </Button>
                <button className="btn btn-primary" onClick={this.modal}>
                  Referensi Barang
                </button>
              ) : null
            }
          >
            <Form>
              <Row gutter={8}>
                <Col span={4}>
                  <p>Kategori Barang <span style={{ color: 'red' }}>*</span></p>
                </Col>
                <Col span={20}>
                  <Select
                    placeholder="Pilih Kategori"
                    showArrow={true}
                    notFoundContent={this.state.fetchingReferensiKategori ? <Spin size="small" /> : null}
                    showSearch
                    style={{ width: "100%", marginTop: -40 }}
                    optionFilterProp="children"
                    readOnly={this.state.readOnly}
                    disabled={this.state.readOnly}
                    // onChange={this.handleKategori}
                    onChange={e => { this.onChangeKategori(e) }}
                    // onChange={e => { this.setState({ kodeKategoriBarang: e }); }}
                    value={this.state.kodeKategoriBarang}
                    // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {this.state.dataReferensiKategori !== undefined ? this.state.dataReferensiKategori.map(d => (
                      <Option key={d.value}>{d.text}</Option>
                    )) : ""}
                  </Select>
                </Col>
              </Row>
              {this.state.kodeKategoriBarang === "1" ?
                <Row gutter={8}>
                  <Col span={4}>
                    <p>Kategori Karantina <span style={{ color: 'red' }}>*</span></p>
                  </Col>
                  <Col span={20}>
                    <Select
                      onChange={e => {
                        this.setState({
                          kategoriKarantina: e
                        })
                      }}
                      readOnly={this.state.readOnly}
                      disabled={this.state.readOnly}
                      value={this.state.kategoriKarantina}
                      placeholder="Pilih Kategori"
                      allowClear
                    >
                      <Option value="HEWAN">HEWAN</Option>
                      <Option value="TUMBUHAN">TUMBUHAN</Option>
                      <Option value="IKAN">IKAN</Option>
                      {/* <Option value="ASP">Awak Sarana Pengangkut</Option> */}
                    </Select>
                  </Col>
                </Row>
                : null}
              <Row gutter={8}>
                <Col span={4}>
                  <p>Uraian Barang <span style={{ color: 'red' }}>*</span></p>
                </Col>
                <Col span={20}>
                  <TextArea
                    rows={4}
                    name="uraian"
                    value={this.state.uraian}
                    onChange={(e) =>
                      this.setState({ uraian: e.target.value })
                    }
                    readOnly={this.state.readOnly}
                  />
                </Col>
              </Row>
              {this.state.kodeKategoriBarang === '9' ? (
                <Fragment>
                  <Row gutter={8}>
                    <Col span={4}>
                      <p>Merk <span style={{ color: 'red' }}>*</span></p>
                    </Col>
                    <Col span={8}>
                      <Input
                        onChange={e => { this.setState({ merk: e.target.value }); }}
                        value={
                          this.state.merk === null
                            ? null
                            : this.state.merk
                        }
                        readOnly={this.state.readOnly}
                      />
                    </Col>
                    <Col span={4}>
                      <p>Tipe <span style={{ color: 'red' }}>*</span></p>
                    </Col>
                    <Col span={8}>
                      <Input
                        onChange={e => { this.setState({ tipe: e.target.value }); }}
                        value={
                          this.state.tipe === null
                            ? null
                            : this.state.tipe
                        }
                        readOnly={this.state.readOnly}
                      />
                    </Col>
                  </Row>
                  <Row gutter={8}>
                    <Col span={4}>
                      <p>RAM</p>
                    </Col>
                    <Col span={8}>
                      <Input
                        onChange={e => { this.setState({ ram: e.target.value }); }}
                        value={
                          this.state.ram === null
                            ? null
                            : this.state.ram
                        }
                        readOnly={this.state.readOnly}
                      />
                    </Col>
                    <Col span={4}>
                      <p>Kapasitas</p>
                    </Col>
                    <Col span={8}>
                      <Input
                        onChange={e => { this.setState({ kapasitas: e.target.value }); }}
                        value={
                          this.state.kapasitas === null
                            ? null
                            : this.state.kapasitas
                        }
                        readOnly={this.state.readOnly}
                      />
                    </Col>
                  </Row>
                  <Row gutter={8}>
                    <Col span={4}>
                      <p>Warna</p>
                    </Col>
                    <Col span={8}>
                      <Input
                        onChange={e => { this.setState({ warna: e.target.value }); }}
                        value={
                          this.state.warna === null
                            ? null
                            : this.state.warna
                        }
                        readOnly={this.state.readOnly}
                      />
                    </Col>
                    {/* <Col span={4}>
                                            <p>Pemilik <span style={{ color: 'red' }}>*</span></p>
                                        </Col>
                                        <Col span={8}>
                                            <Select
                                                placeholder="Pilih Pemilik"
                                                showArrow={true}
                                                notFoundContent={this.state.fetchingReferensiPemilik ? <Spin size="small" /> : null}
                                                showSearch
                                                style={{ width: "100%" }}
                                                optionFilterProp="children"
                                                readOnly={this.state.readOnly}
                                                disabled={this.state.readOnly}
                                                // onChange={this.handleKategori}
                                                onChange={e => { this.setState({ idPemilik: e }); }}
                                                value={this.state.idPemilik}
                                                // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                                                filterOption={(input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {this.state.dataReferensiPemilik !== undefined ? this.state.dataReferensiPemilik.map(d => (
                                                    <Option key={d.value}>{d.text}</Option>
                                                )) : ""}
                                            </Select>
                                        </Col> */}
                  </Row>
                  <Row gutter={8}>
                    <Col span={4}>
                      <p>IMEI 1 <span style={{ color: 'red' }}>*</span></p>
                    </Col>
                    <Col span={8}>
                      <Input
                        // onChange={e => { this.setState({ imei1: e.target.value }); }}
                        onChange={e => { this.onChangeImei1(e.target.value) }}
                        value={
                          this.state.imei1 === null
                            ? null
                            : this.state.imei1
                        }
                        readOnly={this.state.readOnly}
                        style={this.state.validImei1 ? null : { borderColor: "red" }}
                      />
                    </Col>
                    <Col span={4}>
                      <p>IMEI 2</p>
                    </Col>
                    <Col span={8}>
                      <Input
                        // onChange={e => { this.setState({ imei2: e.target.value }); }}
                        onChange={e => { this.onChangeImei2(e.target.value) }}
                        value={
                          this.state.imei2 === null
                            ? null
                            : this.state.imei2
                        }
                        readOnly={this.state.readOnly}
                        style={this.state.validImei2 ? null : ((this.state.imei2 === "" || this.state.imei2 === null || this.state.imei2 === undefined) ? null : { borderColor: "red" })}
                      />
                    </Col>
                  </Row>
                  {/* <Row gutter={8}>
                                        <Col span={4}>
                                            <p>NPWP <span style={{ color: 'red' }}>*</span></p>
                                        </Col>
                                        <Col span={8}>
                                            <Input
                                                onChange={e => { this.setState({ npwp: e.target.value }); }}
                                                value={
                                                    this.state.npwp === null
                                                        ? null
                                                        : this.state.npwp
                                                }
                                                readOnly={this.state.readOnly}
                                            />
                                        </Col>
                                    </Row> */}
                </Fragment>) : null}
              {this.state.kodeKategoriBarang !== 'COBA' ? (
                <Row gutter={8}>
                  <Col span={4}>
                    <p>Jumlah Satuan <span style={{ color: 'red' }}>*</span></p>
                  </Col>
                  <Col span={4}>
                    <InputNumber
                      pattern="[0-9]+[.0-9]*"
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      value={this.state.jumlahSatuan}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      style={{ width: '100%' }}
                      placeholder={"0.000"}
                      readOnly={this.state.readOnly}
                      onChange={e => {
                        if (typeof e !== "number") {
                          this.setState({ visible: true });
                        } else {
                          this.setState({ jumlahSatuan: e }, () => {
                            if (!(this.state.jumlahSatuan === null || this.state.jumlahSatuan === undefined) && !(this.state.hargaSatuan === null || this.state.hargaSatuan === undefined)) {
                              this.setState({ jumlahHarga: this.state.jumlahSatuan * this.state.hargaSatuan })
                            } else {
                              this.setState({ jumlahHarga: this.state.jumlahHarga })
                            }
                          });
                        }
                      }}
                    />
                    {this.state.visible ?
                      <div style={{ color: 'red' }}><span>*</span><span>Harap memasukan angka saja!</span>
                      </div> : null}

                  </Col>
                  <Col span={12}>
                    <Select
                      placeholder="Pilih Jenis Satuan"
                      showArrow={true}
                      notFoundContent={this.state.fetchingReferensiSatuan ? <Spin size="small" /> : null}
                      showSearch
                      style={{ width: "100%" }}
                      optionFilterProp="children"
                      readOnly={this.state.readOnly}
                      disabled={this.state.readOnly}
                      value={this.state.kodeSatuanBarang}
                      onChange={e => { this.setState({ kodeSatuanBarang: e }); }}
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.state.dataReferensiSatuan !== undefined ? this.state.dataReferensiSatuan.map(d => (
                        <Option key={d.value}>{d.text}</Option>
                      )) : ""}
                    </Select>
                  </Col>
                </Row>) : null}
              {/* {this.state.kodeKategoriBarang === null || this.state.kodeKategoriBarang === undefined ? */}
              <Fragment>
                <Row gutter={8}>
                  <Col span={4}>
                    <p>Kode Valuta</p>
                  </Col>
                  <Col span={8}>
                    <Select
                      placeholder="Pilih Jenis Valuta"
                      showArrow={true}
                      notFoundContent={this.state.fetchingReferensiValuta ? <Spin size="small" /> : null}
                      showSearch
                      style={{ width: "100%" }}
                      optionFilterProp="children"
                      readOnly={this.state.readOnly}
                      disabled={this.state.readOnly}
                      value={this.state.kodeMataUang}
                      onChange={e => { this.setState({ kodeMataUang: e }); }}
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.state.valutaAll ? (this.state.dataReferensiValuta2 !== undefined ? this.state.dataReferensiValuta2.map(d => (
                        <Option key={d.value}>{d.text}</Option>
                      )) : "") :
                        (this.state.dataReferensiValuta !== undefined ? this.state.dataReferensiValuta.map(d => (
                          <Option key={d.value}>{d.text}</Option>
                        )) : "")}
                    </Select>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={4}>
                    <p>Harga Satuan</p>
                  </Col>
                  <Col span={8}>
                    <InputNumber
                      pattern="[0-9]+[.0-9]*"
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      value={this.state.hargaSatuan}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      style={{ width: '100%' }}
                      placeholder={"0.000"}
                      onChange={this.onChangeDataHargaSatuan}
                      readOnly={this.state.readOnly}
                    />
                    {this.state.visibleHargaSatuan ?
                      <div style={{ color: 'red' }}><span>*</span><span>Harap memasukan angka saja!</span>
                      </div> : null}
                  </Col>
                  <Col span={4}>
                    <p>Jumlah Harga</p>
                  </Col>
                  <Col span={8}>
                    <InputNumber
                      pattern="[0-9]+[.0-9]*"
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      // value={this.state.jumlahHarga === null || this.state.jumlahHarga === undefined ? (
                      //     !(this.state.jumlahSatuan === null || this.state.jumlahSatuan === undefined) && !(this.state.hargaSatuan === null || this.state.hargaSatuan === undefined) ?
                      //         (this.state.jumlahSatuan * this.state.hargaSatuan) : this.state.jumlahHarga) : this.state.jumlahHarga}
                      value={this.state.jumlahHarga}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      style={{ width: '100%' }}
                      placeholder={"0.000"}
                      readOnly
                      onChange={e => {
                        this.setState({
                          jumlahHarga: e
                        });
                      }
                      }
                    />
                    {this.state.visibleJumlah ?
                      <div style={{ color: 'red' }}><span>*</span><span>Harap memasukan angka saja!</span>
                      </div> : null}
                  </Col>
                </Row>
              </Fragment>
              {/* : null} */}
              {this.state.kodeKategoriBarang === '8' ? (
                <Row gutter={8}>
                  <Col span={4}>
                    <p>Nomor Dokumen BC 3.4 <span style={{ color: 'red' }}>*</span></p>
                  </Col>
                  <Col span={8}>
                    <Input
                      onChange={e => { this.setState({ nomorDokumenIzin: e.target.value }); }}
                      value={
                        this.state.nomorDokumenIzin === null
                          ? null
                          : this.state.nomorDokumenIzin
                      }
                      readOnly={this.state.readOnly}
                    />
                  </Col>
                  <Col span={4}>
                    <p>Tanggal Dokumen BC 3.4 <span style={{ color: 'red' }}>*</span></p>
                  </Col>
                  <Col span={8}>
                    <DatePicker
                      size={"medium"}
                      placeholder="Pilih Tanggal"
                      style={{ width: "100%" }}
                      onChange={this.onChangeTglIzin}
                      format="DD-MM-YYYY"
                      // value={this.state.tanggalDokumenIzin}
                      value={this.state.tanggalDokumenIzin === null || this.state.tanggalDokumenIzin === undefined ?
                        null : moment(this.state.tanggalDokumenIzin, "YYYY-MM-DD HH:mm:ss")}
                    />
                  </Col>
                </Row>
              ) : null}
              <Row gutter={8}>
                <Col span={4}>
                  <p>Flag Lartas</p>
                </Col>
                <Col span={8}>
                  <Select
                    placeholder="Pilih Flag Lartas"
                    allowClear
                    onChange={e => { this.setState({ pernyataanLartas: e }); }}
                    value={this.state.pernyataanLartas}
                    readOnly={this.state.readOnly}
                    disabled={this.state.readOnly}
                  >
                    <Option value="Y">Ya</Option>
                    <Option value="N">Tidak</Option>
                    {/* <Option value="ASP">Awak Sarana Pengangkut</Option> */}
                  </Select>
                </Col>
                <Col span={4}>
                  <p>Kode HS</p>
                </Col>
                <Col span={8}>
                  <Input
                    onChange={e => { this.setState({ posTarif: e.target.value }); }}
                    value={
                      this.state.posTarif === null
                        ? null
                        : this.state.posTarif
                    }
                    readOnly={this.state.readOnly}
                  />
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={4}>
                  <p>Keterangan</p>
                </Col>
                <Col span={20}>
                  <TextArea
                    rows={4}
                    name="keterangan"
                    value={this.state.keterangan}
                    readOnly={this.state.readOnly}
                    onChange={(e) =>
                      this.setState({ keterangan: e.target.value })
                    }
                  />
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col span={24}>
                  <Checkbox
                    checked={this.state.flagTidakBersamaan === 'Y' ? true : false}
                    disabled={this.state.readOnly}
                    onChange={this.onChange.bind(this)}
                    readOnly={this.state.readOnly}
                  >
                    Tidak Datang Bersamaan
                  </Checkbox>
                  &nbsp;
                  <Checkbox
                    checked={this.state.flagLostAndFound === 'Y' ? true : false}
                    disabled={this.state.readOnly}
                    onChange={this.onChangeLostAndFound.bind(this)}
                    readOnly={this.state.readOnly}
                  >
                    Lost and Found
                  </Checkbox>
                  &nbsp;
                  <Checkbox
                    checked={this.state.flagManifes === 'Y' ? true : false}
                    disabled={this.state.readOnly}
                    onChange={this.onChangemanifes.bind(this)}
                    readOnly={this.state.readOnly}
                  >
                    Terdaftar di Manifes
                  </Checkbox>
                </Col>
              </Row>
            </Form>
            {/*<Button onClick={this.KirimData}></Button>*/}
          </Card>
        ) : null) : null}
        {this.props.requiredDetail === true ? (
          <p className={'text-red'} style={{ fontSize: '12px' }}>&nbsp; Silahkan isi data yang mandatory terlebih
            dahulu!</p>) : null}
        <Modal
          visible={this.state.showModal}
          title="Pilih Referensi Barang"
          width={"60%"}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {/* <div> */}
          <Table
            dataSource={hasil}
            pagination={{
              defaultPageSize: 5,
              total: hasil.length,
              current: this.state.current,
              onChange: (page, pageSize) => {
                // console.log("pageSize : ", pageSize)
                this.setState({
                  current: page,
                  page: (page - 1) * 5,
                })
              }
            }} columns={column} loading={loadingReferensi}
            onRowClick={(e) => this.onSelectionChanged(e)} />

        </Modal>
      </div>
    );
  }
}

export default DetailBarang;
