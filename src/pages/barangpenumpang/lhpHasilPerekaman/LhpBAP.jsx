import React, { Component, Fragment } from "react";
import {
    Button,
    Col,
    Row,
    Icon,
    Modal,
    Card,
    message,
    Table,
    Form,
    Upload,
    Input, Pagination,
    DatePicker,
    TimePicker,
    Select,
    InputNumber,
    Spin,
    Radio
} from "antd";
import moment from 'moment';
import DetailBarang from "./TabsDetailPemeriksaan/DetailBarang";
import Kemasan from "./TabsDetailPemeriksaan/Kemasan";
import UnsurBarang from "./TabsDetailPemeriksaan/UnsurBarang";
import Spesifikasi from "./TabsDetailPemeriksaan/Spesifikasi";
import Kapasitas from "./TabsDetailPemeriksaan/Kapasitas";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import axios from "axios";
import Notification from "./Component/Notifikasi";
import Swal from "sweetalert2";
import HasilPemeriksaanPerBarang from "./TabsDetailPemeriksaan/HasilPemeriksaanPerBarang";
import SweetAlert from "sweetalert2";
import GlobalVariable from "../../../helpers/GlobalVariable";
import DetailBarangPemeriksaan from './TabsDetailPemeriksaan/detailBarangPemeriksaan'
import './Component/style.css'
import { getUser } from "../../../utils/DataUser";
import Iframe from 'react-iframe';
// import PDFViewer from "../Component/pdfViewer.comp";

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
});
const { Option } = Select;
const {

    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP,
    REACT_APP_HDFS,
   REACT_APP_SECRET_KEY_HDFS,
    REACT_APP_API_BARANG_PENUMPANG,
    REACT_APP_API_BARANG_PENUMPANG_KEY,
    REACT_APP_API_BARANG_PENUMPANG_REPORT,
    REACT_APP_API_BARANG_PENUMPANG_REPORT_KEY
} = process.env;

const { Column, ColumnGroup } = Table;
const { blue, green } = require("@material-ui/core/colors");
const { TextArea } = Input;
let dataFotoBAPUtama = [];

class LhpBap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidetambahbarang: false,
            modalIsOpen: false,
            open: false,
            openutama: false,
            berkasKontrakUtama: [],
            berkasKontrakListUtama: [],
            datafotoUtama: [],
            datafotoSementaraUtama: [],
            dataFotoCoba: [],
            dataTableDetail: [],
            seriBarang: 0,
            hasilFotoLhp: [],
            fetching: false,
            detailBarangPemeriksaan: false,
            janganKirim: false,
            page: 0,
            dataKirimLhp: {},
            dataDokumen: null,
            readOnly: false,
            readOnlyBarang: false,
            viewData: null,
            editData: null,
            readOnlyHasil: false,
            requiredDetailFoto: false
        };
        this.tambahbarang = this.tambahbarang.bind(this);
        this.tambahDokumenTable = this.tambahDokumenTable.bind(this);
        this.opensliderutama = this.opensliderutama.bind(this);
        this.KirimData = this.KirimData.bind(this);
        this.EditData = this.EditData.bind(this);
        // this.SimpanData = this.SimpanData.bind(this);
        this.batal = this.batal.bind(this);
        this.detailBarang = React.createRef();
        this.kemasan = React.createRef();
        this.unsurBarang = React.createRef();
        this.spesifikasi = React.createRef();
        this.kapasitas = React.createRef();
        this.HasilPemeriksaanPerBarang = React.createRef();
        this.DetaiBarangEdit = React.createRef()
    }

    componentDidMount() {
        console.log("Detail Pemeriksaan Mount: ", this.props.data)
        this.getDataLhp();
        this.setState({
            hasil: this.props.data
        });
        // this.getReferensiDetail()
        // this.getDokumen()
        // this.setState({
        //     dataTableDetail: [
        //         { kategori: "Kategori 1", uraianBarang: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
        //         { kategori: "Kategori 2", uraianBarang: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."},
        //     ],
        // });

    }

    componentDidUpdate(prevProps) {
        console.log("Detail Pemeriksaan Update: ", this.props.data)
        if (this.props.data !== null) {
            if (this.props.data !== prevProps.data) {
                this.setState({
                    // dataTableDetail: !(this.props.data === null || this.props.data === undefined) ? (this.props.data.barangList !== undefined ? this.props.data.barangList : []) : [],
                    hasil: this.props.data
                });
            }

        }
    }

    onChangeTglSelesai = (date, dateString) => {
        let prevTime = moment(this.state.tglSelesai).format("HH:mm:ss")
        const tanggal = moment(dateString + prevTime, 'DD-MM-YYYY HH:mm:ss')
        this.setState({
            tglSelesai: tanggal,
        });
    };
    onChangeTimeSelesai = (date, dateString) => {
        let prevTanggal = moment(this.state.tglSelesai).format("DD-MM-YYYY")
        const tanggal = moment(prevTanggal + dateString, 'DD-MM-YYYY HH:mm:ss')
        this.setState({
            tglSelesai: tanggal,
        });
    };

    onChangeTglAwal = (date, dateString) => {
        let prevTime = moment(this.state.tglAwal).format("HH:mm:ss")
        const tanggal = moment(dateString + prevTime, 'DD-MM-YYYY HH:mm:ss')
        this.setState({
            tglAwal: tanggal,
        });
    };
    onChangeTimeAwal = (date, dateString) => {
        let prevTanggal = moment(this.state.tglAwal).format("DD-MM-YYYY")
        const tanggal = moment(prevTanggal + dateString, 'DD-MM-YYYY HH:mm:ss')
        this.setState({
            tglAwal: tanggal,
        });
    };

    getReferensiDetail() {
        let idheader = localStorage.getItem("idHeader");
        fetch(`https://apisdev-gw.beacukai.go.id/v2/Lhp/referensi-detail/${idheader}/items`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
            },
        })
            .then((response) => response.json())
            .then((body) => {
                this.setState({
                    hasil: body.listData,
                    loading: false,
                });
            });
    }

    tambahDokumenTable = () => {
        this.setState({
            berkasKontrakListUtama: [],
        });
        var row = {
            nomor: this.state.seriBarang + 1,
            idLhpDetail: this.state.idLhpDetail,
            uraianBarang: this.detailBarang.current.state.uraianBarang,
            jumlahSatuan: this.detailBarang.current.state.jumlahSatuan,
            negaraAsal: this.unsurBarang.current.state.namaNegara,
            namaNegara: this.unsurBarang.current.state.namaNegara,
            kodeKemasan: this.kemasan.current.state.kodeKemasan,
            idBarang: this.detailBarang.current.state.idBarang,
            jumlahKemasan: this.kemasan.current.state.jumlahKemasan,
            panjangKemasan: this.kemasan.current.state.panjangKemasan,
            kondisiBarang: this.unsurBarang.current.state.kodeKondisiBarang,
            asalNegaraBarang: this.unsurBarang.current.state.kodeNegara,
            tinggiKemasan: this.kemasan.current.state.tinggiKemasan,
            type: this.spesifikasi.current.state.type,
            ukuranKemasan: this.kemasan.current.state.ukuranKemasan,
            merk: this.spesifikasi.current.state.merk,
            asalBarang: this.unsurBarang.current.state.kodeAsalBarang,
            kodeKapasitas: this.kapasitas.current.state.kodeSatuanBarang,
            kapasitas: this.kapasitas.current.state.kapasitas,
            kodeJenisSatuan: this.detailBarang.current.state.kodeSatuanBarang,
            model: this.spesifikasi.current.state.model,
            kodeJenisKemasan: this.kemasan.current.state.kodeKemasan,
            lebarKemasan: this.kemasan.current.state.lebarKemasan,
            kesesuaianBarang: this.HasilPemeriksaanPerBarang.current.state
                .valuehasilkesiapan,
            keteranganTambahan: this.HasilPemeriksaanPerBarang.current.state
                .keteranganTambahan,
        };
        var newStateArray = [...this.state.dataTableDetail];
        newStateArray.push(row);
        this.setState(() => {
            return {
                dataTableDetail: newStateArray,
                idLhpDetail: "",
                uraian: "",
                jumlahSatuan: "",
                negaraAsal: "",
                kodeKemasan: "",
                idBarang: "",
                jumlahKemasan: "",
                panjangKemasan: "",
                kondisiBarang: "",
                asalNegaraBarang: "",
                tinggiKemasan: "",
                type: "",
                ukuranKemasan: "",
                merk: "",
                asalBarang: "",
                kodeKapasitas: "",
                kapasitas: "",
                kodeJenisSatuan: "",
                model: "",
                kodeJenisKemasan: "",
                lebarKemasan: "",
                kesesuaianBarang: "",
                keteranganTambahan: "",
                hasilFotoLhp: [],
            };
        });
    };

    beforeImageUploadUtama = (file) => {
        this.setState({
            berkasKontrakUtama: [file],
        });
        return false;
    };

    onAddImageUtama = () => {
        if (this.state.berkasKontrakUtama.length === 0) return;
        let ext = this.state.berkasKontrakUtama[0].name;
        // let fileext = ext.type.split("/").pop();
        let fileext = ext.substring(ext.lastIndexOf('.') + 1);
        if ((this.state.berkasKontrakUtama[0].size < 512000) && (fileext === 'jpg' || fileext === 'png' || fileext === 'jpeg')) {
            this.setState(
                (prevState) => ({
                    berkasKontrakListUtama: [
                        ...prevState.berkasKontrakListUtama,
                        { file: prevState.berkasKontrakUtama[0], path: "lhp_barang_penumpang" },
                    ],
                    datafotoSementaraUtama: [
                        ...prevState.datafotoSementaraUtama,
                        {
                            nama: prevState.berkasKontrakUtama[0].name,
                            data: URL.createObjectURL(prevState.berkasKontrakUtama[0]),
                            urlFoto: "#",
                            kodeFoto: "B",
                            keterangan: this.state.KeteranganFotoUtama,
                            lokasiRekamFoto: "lhp_barang_penumpang",
                        },
                    ],
                }),
                () => this.setState({ berkasKontrakUtama: [], KeteranganFotoUtama: null })
            )
        } else if ((this.state.berkasKontrakUtama[0].size > 512000)) {
            SweetAlert.fire({
                title: 'Oopss...',
                text: 'Size file terlalu besar, harap upload foto dibawah  512kb',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
            })
        } else {
            SweetAlert.fire({
                title: 'Oopss...',
                text: 'Format file tidak sesuai, harap upload file dengan ekstensi jpg/jpeg!',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
            })
        }
    };

    onUploadImageUtama = (data, index) => {
        const uploadData = message.loading("Foto anda sedang diupload...", 0);
        const registerFoto = () => {
            const resAxios = {
                url: `https://apisdev-gw.beacukai.go.id/v2/Lhp/v1/UploadFoto`,
                options: {
                    headers: {
                        "Beacukai-Api-Key": REACT_APP_SECRET_KEY_LHP,
                    },
                },
            };
            return axios
                .post(
                    resAxios.url,
                    { filterFotoList: this.state.datafotoUtama },
                    resAxios.options
                )
                .then((data) => {
                    if (data.data.status === true) {
                        const dataFoto = data.data.data
                        for (let i = 0; i < dataFoto.length; i++) {
                            dataFoto[i].waktuRekamFoto = moment(dataFoto[i].waktuRekamFoto).format("YYYY-MM-DD HH:mm:ss")
                            dataFoto[i].kodeFoto = "B"
                        }
                        let foto = this.state.hasilFotoLhp;
                        foto = foto.concat(dataFoto)
                        console.log('foto', foto)
                        this.setState({
                            datafotoUtama: [],
                            hasilFotoLhp: foto,
                        }, () => this.previewFoto());
                        setTimeout(uploadData, 1500);
                    }
                })
                .catch(() => alert("Gagal"));
        };

        const uploadProcess = (data, index) => {
            let stateFotoUtama = [...this.state.datafotoSementaraUtama];
            const resAxios = {
                url: `https://apisdev-gw.beacukai.go.id/v2/hdfs/v1/hdfs/upload`,
                options: {
                    headers: {
                        "Beacukai-Api-Key":REACT_APP_SECRET_KEY_HDFS,
                    },
                },
            };
            return axios
                .post(resAxios.url, data, resAxios.options)
                .then(({ data }) => {
                    const urlFoto = data.item;
                    stateFotoUtama[index] = { ...stateFotoUtama[index], urlFoto };
                    const fromStateUtama = this.state.datafotoSementaraUtama;

                    for (let i = 0; i < stateFotoUtama.length; i++) {
                        if (stateFotoUtama[i].urlFoto === "#") continue;
                        let tempData = [];

                        for (let j = 0; j < Object.keys(fromStateUtama[i]).length; j++) {
                            const keys = Object.keys(fromStateUtama[i])[j];
                            const values = Object.values(fromStateUtama[i])[j];

                            if (keys === "urlFoto") {
                                tempData = { ...tempData, [keys]: stateFotoUtama[i].urlFoto };
                            } else {
                                tempData = { ...tempData, [keys]: values };
                            }
                        }

                        dataFotoBAPUtama.push(tempData)

                    }

                    if (dataFotoBAPUtama.length === stateFotoUtama.length) {
                        this.setState({ datafotoUtama: dataFotoBAPUtama });
                        dataFotoBAPUtama = [];
                    }
                })
                .catch(() => alert("Gagal"));
        };


        const promiseLoopData = this.state.berkasKontrakListUtama.map(
            ({ file, path }, index) => {
                return new Promise((y, n) => {
                    let uploadData = new FormData();
                    uploadData.set("file", file);
                    uploadData.set("path", path);
                    uploadProcess(uploadData, index)
                        .then(() => y())
                        .catch(() => n());
                });
            }
        );

        Promise.all(promiseLoopData).then(() => {
            registerFoto();
            this.setState({
                modalUploadUtama: false,
                berkasKontrakListUtama: []
            });
        });
    };

    hideSpinner = () => {
        if (this.state.lihatPdf == null || this.state.lihatPdf == '' || this.state.lihatPdf.length == 0) {
            this.setState({ loading: true });
        } else {
            this.setState({ loading: false });
        }

    }

    handleDirectDownload = () => {
        this.setState({ loading: true })
        try {
            // const { data } = await API_PREVIEW_SKA(urlDokumen)

            axios(`${REACT_APP_API_BARANG_PENUMPANG_REPORT}/formulir/BAP/${this.state.idLhp}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'beacukai-api-key': `${REACT_APP_API_BARANG_PENUMPANG_REPORT_KEY}`,
                },
                // 'Access-Control-Allow-Origin': '*',
                responseType: 'blob', //Force to receive data in a Blob Format
            })
                .then((response) => {
                    //Create a Blob from the PDF Stream
                    const file = new Blob([response.data], { type: 'jpg || jpeg' });
                    //Build a URL from the file
                    const fileURL = URL.createObjectURL(file);
                    //Open the URL on new Window
                    console.log(fileURL);
                    this.setState({
                        lihatPdf: fileURL,
                    });

                })
                .catch((error) => {
                    console.log(error);
                    message.error("Gagal mengambil preview Pdf")
                    this.setState({ loading: false })
                })

            // const fileTemp = new Blob([data], { type: "application/pdf" });
            // const fileURL = URL.createObjectURL(fileTemp);
            // this.setState({ lihatPdf: fileURL })
        } catch (e) {
            message.error("Gagal mengambil preview Pdf")
            this.setState({ lihatPdf: null })
        }
        finally {
            this.setState({ loading: false })
        }
    }

    previewFoto() {
        var dataFotoArray = [];
        this.setState({
            loading: true,
        });
        this.state.hasilFotoLhp.map((item, key) =>
            axios(`https://apisdev-gw.beacukai.go.id/v2/hdfs/v1/hdfs/download?path=${item.urlFoto}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'beacukai-api-key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                },
                // 'Access-Control-Allow-Origin': '*',
                responseType: 'blob', //Force to receive data in a Blob Format
            })
                .then((response) => {
                    //Create a Blob from the PDF Stream
                    const file = new Blob([response.data], { type: 'jpg || jpeg' });
                    //Build a URL from the file
                    const fileURL = URL.createObjectURL(file);
                    //Open the URL on new Window
                    console.log(fileURL);
                    dataFotoArray.push({
                        data: fileURL,
                        keterangan: item.keterangan,
                        idLhpFoto: item.idLhpFoto,
                        urlFoto: item.urlFoto
                    });
                    this.setState({
                        dataFotoCoba: dataFotoArray,
                        datafotoSementaraUtama: [],
                    });

                })
                .catch((error) => {
                    console.log(error);
                })
        );
        this.setState({
            loading: false,
        });
    }

    handleCancelKontrakUtama = () => {
        this.setState({
            modalUploadUtama: false,
            datafotoSementaraUtama: [],
            berkasKontrakUtama: [],
            keteranganfotoUtama: null
        });
    };

    modalUploadUtama = () => {
        this.setState({
            modalUploadUtama: true,
            berkasKontrakUtama: [],
            keteranganfotoUtama: null,
        });
    };

    opensliderutama(e, item) {
        console.log('array', e, item)
        this.setState({
            openutama: !this.state.openutama,
        });
    }
    deleteFotoLhp(e, item) {
        console.log('array', e, item)
        swalWithBootstrapButtons
            .fire({
                title: "Yakin??",
                text: "Pastikan menghapus data yang benar!",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Tidak!",
                confirmButtonText: "Ya!",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.value) {
                    if (item.urlFoto !== null) {
                        fetch(`https://apisdev-gw.beacukai.go.id/v2/hdfs/v1/hdfs/delete?path=${item.urlFoto}`, {
                            method: 'DELETE',
                            mode: 'cors',
                            headers: {
                                'accept': 'application/json',
                                "beacukai-api-key": `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                            },
                        })
                    }
                    const data = item.idLhpFoto
                    // console.log('delete',this.state.dataPendamping.splice(this.state.dataPendamping.indexOf(e), 1))
                    const hasilFotoLhp = this.state.hasilFotoLhp.filter(item => item.idLhpFoto !== data);


                    if (!(item.idLhpFoto === null || item.idLhpFoto === undefined)) {
                        axios.delete(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/table/lhp-foto/delete/${item.idLhpFoto}`, {
                            headers: {
                                'beacukai-API-Key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                            },
                            // 'Access-Control-Allow-Origin': '*',
                        })
                            .then((body => {
                                console.log(body)
                                if (body.data.status == "success") {
                                } else {
                                    Swal.fire(
                                        'Gagal menghapus data Barang',
                                        // 'Terdapat pengisian form yang salah.',
                                        'error'
                                    );
                                    this.setState({ iconLoading: false });
                                }
                            }))
                    }
                    this.setState({
                        hasilFotoLhp,
                        dataFotoCoba: []
                    }, () => {
                        this.previewFoto()
                        console.log('delete', this.state.hasilFotoLhp)
                    });


                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        "Cancelled",
                        "Your imaginary file is safe :)",
                        "error"
                    );
                    this.setState({ iconLoading: false });
                }
            });
    }

    closesliderutama() {
        this.setState({
            openutama: false,
        });
    }

    async KirimData() {
        console.log("SIMPAN BARANG : ", this.detailBarang.current.state)
        let idheader = localStorage.getItem("idHeader");
        let idLhpHeader = localStorage.getItem("idLhpHeader");
        let seriBarang = parseInt(this.state.seriBarang);
        let idProses = localStorage.getItem("idProses");
        let jumlahSatuan = this.detailBarang.current.state.jumlahSatuan
        let jumlahKemasan = this.detailBarang.current.state.jumlahKemasan
        let action = this.detailBarang.current.state.action
        let kodeSatuanBarang = this.detailBarang.current.state.kodeSatuanBarang
        let uraian = this.detailBarang.current.state.uraian
        let kesesuaianBarang = this.HasilPemeriksaanPerBarang.current.state.kesesuaianBarang
        let keteranganTambahan = this.HasilPemeriksaanPerBarang.current.state.keteranganTambahan
        // let perbaikiData = this.HasilPemeriksaanPerBarang.current.state.perbaikiData 

        console.log("dataTableDetail : ", this.state.dataTableDetail)
        if (jumlahSatuan === "" || jumlahSatuan === null || jumlahSatuan === undefined) {
            this.setState({
                requiredDetail: true
            })
        } else if (kodeSatuanBarang === "" || kodeSatuanBarang === null || kodeSatuanBarang === undefined) {
            this.setState({
                requiredDetail: true
            })
        } else if (uraian === "" || uraian === null || uraian === undefined) {
            this.setState({
                requiredDetail: true
            })
        } else if (this.detailBarang.current.state.merk === "" || this.detailBarang.current.state.merk === null || this.detailBarang.current.state.merk === undefined) {
            this.setState({
                requiredDetail: true
            })
        } else if (this.detailBarang.current.state.tipe === "" || this.detailBarang.current.state.tipe === null || this.detailBarang.current.state.tipe === undefined) {
            this.setState({
                requiredDetail: true
            })
        } else if (this.detailBarang.current.state.jumlahKemasan === "" || this.detailBarang.current.state.jumlahKemasan === null || this.detailBarang.current.state.jumlahKemasan === undefined) {
            this.setState({
                requiredDetail: true
            })
        } else if (this.detailBarang.current.state.kodeJenisKemasan === "" || this.detailBarang.current.state.kodeJenisKemasan === null || this.detailBarang.current.state.kodeJenisKemasan === undefined) {
            this.setState({
                requiredDetail: true
            })
        } else if (this.detailBarang.current.state.kodeMataUang === "" || this.detailBarang.current.state.kodeMataUang === null || this.detailBarang.current.state.kodeMataUang === undefined) {
            this.setState({
                requiredDetail: true
            })
        } else if (this.detailBarang.current.state.jumlahHarga === "" || this.detailBarang.current.state.jumlahHarga === null || this.detailBarang.current.state.jumlahHarga === undefined) {
            this.setState({
                requiredDetail: true
            })
        } else if (this.detailBarang.current.state.hargaSatuan === "" || this.detailBarang.current.state.hargaSatuan === null || this.detailBarang.current.state.hargaSatuan === undefined) {
            this.setState({
                requiredDetail: true
            })
        } else if (kesesuaianBarang === "" || kesesuaianBarang === null || kesesuaianBarang === undefined) {
            this.setState({
                requiredDetailHasilPeriksa: true
            })
        } else if (keteranganTambahan === "" || keteranganTambahan === null || keteranganTambahan === undefined) {
            this.setState({
                requiredDetailHasilPeriksa: true
            })
        } else if (this.state.hasilFotoLhp.length === 0 || this.state.hasilFotoLhp === null || this.state.hasilFotoLhp === undefined) {
            this.setState({
                requiredDetailFoto: true
            })
        }
        // else if (kesesuaianBarang === "0" && (perbaikiData === "" || perbaikiData === null || perbaikiData === undefined)) {
        //     this.setState({
        //         requiredDetailHasilPeriksa: true
        //     })
        // }
        else {
            this.setState({
                requiredDetail: false,
                requiredDetailHasilPeriksa: false,
                requiredDetailFoto: false
            })

            let listBarangLhp = {}

            let tdLhpDetail = {}
            tdLhpDetail.idDetail = this.detailBarang.current.state.idDetail
            tdLhpDetail.idEdit = this.detailBarang.current.state.idEdit
            tdLhpDetail.idLhpDetail = this.detailBarang.current.state.idLhpDetail
            tdLhpDetail.uraian = this.detailBarang.current.state.uraian
            tdLhpDetail.spesifikasiLain = this.detailBarang.current.state.spesifikasiLain
            tdLhpDetail.merk = this.detailBarang.current.state.merk
            tdLhpDetail.tipe = this.detailBarang.current.state.tipe
            tdLhpDetail.bruto = this.detailBarang.current.state.bruto
            tdLhpDetail.ukuran = this.detailBarang.current.state.ukuran
            tdLhpDetail.kodeBarang = this.detailBarang.current.state.kodeBarang
            tdLhpDetail.kodeJenisKemasan = this.detailBarang.current.state.kodeJenisKemasan
            tdLhpDetail.jumlahKemasan = this.detailBarang.current.state.jumlahKemasan
            tdLhpDetail.kodeKondisiBarang = this.detailBarang.current.state.kodeKondisiBarang
            tdLhpDetail.kodeSatuanBarang = this.detailBarang.current.state.kodeSatuanBarang
            tdLhpDetail.jumlahSatuan = this.detailBarang.current.state.jumlahSatuan
            tdLhpDetail.kodeMataUang = this.detailBarang.current.state.kodeMataUang
            tdLhpDetail.hargaSatuan = this.detailBarang.current.state.hargaSatuan
            tdLhpDetail.jumlahHarga = this.detailBarang.current.state.jumlahHarga
            tdLhpDetail.keterangan = this.detailBarang.current.state.keterangan
            tdLhpDetail.kesesuaianBarang = this.HasilPemeriksaanPerBarang.current.state.kesesuaianBarang
            tdLhpDetail.keteranganTambahan = this.HasilPemeriksaanPerBarang.current.state.keteranganTambahan

            let tdLhpFotoList = {}
            tdLhpFotoList = this.state.hasilFotoLhp

            listBarangLhp.tdLhpDetail = tdLhpDetail
            listBarangLhp.tdLhpFotoList = tdLhpFotoList
            // listBarangLhp.perbaikiData = perbaikiData


            console.log("listBarangLhp : ", listBarangLhp)



            // this.setState({
            //   seriBarang: seriBarang + 1,
            // });
            swalWithBootstrapButtons
                .fire({
                    title: "Apakah Anda Sudah Yakin??",
                    text: "Pastikan Data Anda Sudah Benar!",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Tidak!",
                    confirmButtonText: "Ya!",
                    reverseButtons: true,
                })
                .then((result) => {
                    if (result.value) {
                        var newStateArray = [...this.state.dataTableDetail];

                        if (action === 'add') {
                            console.log('action add')
                            newStateArray.push(listBarangLhp);
                            this.setState({
                                dataTableDetail: newStateArray,
                                hidetambahbarang: !this.state.hidetambahbarang,
                                detailBarangPemeriksaan: false,
                                hasilFotoLhp: [],
                                dataFotoCoba: []
                            }, () => {
                                console.log("dataTableDetail add : ", this.state.dataTableDetail)
                            })
                        } else if (action === 'edit') {
                            console.log('action edit')
                            if (!(tdLhpDetail.idLhpDetail === null || tdLhpDetail.idLhpDetail === undefined)) {
                                let filteredArray = this.state.dataTableDetail.filter(item => item.tdLhpDetail.idLhpDetail !== tdLhpDetail.idLhpDetail)
                                console.log("after filter : ", filteredArray)
                                filteredArray.push(listBarangLhp);
                                this.setState({
                                    dataTableDetail: filteredArray,
                                    hidetambahbarang: !this.state.hidetambahbarang,
                                    detailBarangPemeriksaan: false,
                                    hasilFotoLhp: [],
                                    dataFotoCoba: []
                                }, () => {
                                    console.log("dataTableDetail edit ada idLhpDetail: ", this.state.dataTableDetail)
                                })
                            } else {
                                let filteredArray = this.state.dataTableDetail.filter(item => item.tdLhpDetail.idEdit !== tdLhpDetail.idEdit)

                                filteredArray.push(listBarangLhp);
                                this.setState({
                                    dataTableDetail: filteredArray,
                                    hidetambahbarang: !this.state.hidetambahbarang,
                                    detailBarangPemeriksaan: false,
                                    hasilFotoLhp: [],
                                    dataFotoCoba: []
                                }, () => {
                                    console.log("dataTableDetail edit : ", this.state.dataTableDetail)
                                })
                            }



                        }

                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            "Cancelled",
                            "Your imaginary file is safe :)",
                            "error"
                        );
                        this.setState({ iconLoading: false });
                    }
                });
        }

    }

    async KirimData2() {
        let idheader = localStorage.getItem("idHeader");
        let idLhpHeader = localStorage.getItem("idLhpHeader");
        let seriBarang = parseInt(this.state.seriBarang);
        let idProses = localStorage.getItem("idProses");
        let jumlahSatuan = this.detailBarang.current.state.jumlahSatuan
        let kodeJenisSatuan = this.detailBarang.current.state.kodeSatuanBarang
        let uraianBarang = this.detailBarang.current.state.uraianBarang
        if (jumlahSatuan === "") {
            this.setState({
                requiredDetail: true
            })
        } else if (kodeJenisSatuan === "") {
            this.setState({
                requiredDetail: true
            })
        } else if (uraianBarang === "") {
            this.setState({
                requiredDetail: true
            })
        } else {
            this.setState({
                requiredDetail: false
            })
            let fotoLhpBarang = [];
            this.state.hasilFotoLhp.map((item, index) => {
                fotoLhpBarang.push({
                    idLhpFotoBarang: item.idLhpFoto,
                });
            });
            let body = {
                idLhpHeader: idLhpHeader,
                idBarang: this.detailBarang.current.state.idBarang,
                jumlahSatuan: this.detailBarang.current.state.jumlahSatuan,
                jumlahKemasan: this.kemasan.current.state.jumlahKemasan,
                panjangKemasan: this.kemasan.current.state.panjangKemasan,
                kondisiBarang: this.unsurBarang.current.state.kodeKondisiBarang,
                asalNegaraBarang: this.unsurBarang.current.state.kodeNegara,
                seriBarang: seriBarang + 1,
                idHeader: idheader,
                tinggiKemasan: this.kemasan.current.state.tinggiKemasan,
                type: this.spesifikasi.current.state.type,
                ukuranKemasan: this.kemasan.current.state.ukuranKemasan,
                merk: this.spesifikasi.current.state.merk,
                asalBarang: this.unsurBarang.current.state.kodeAsalBarang,
                kodeKapasitas: this.kapasitas.current.state.kodeSatuanBarang,
                kapasitas: this.kapasitas.current.state.kapasitas,
                fotoLhpBarang,
                kodeJenisSatuan: this.detailBarang.current.state.kodeSatuanBarang,
                uraianBarang: this.detailBarang.current.state.uraianBarang,
                model: this.spesifikasi.current.state.model,
                idProses: idProses,
                kodeJenisKemasan: this.kemasan.current.state.kodeKemasan,
                flagAmbil: "0",
                lebarKemasan: this.kemasan.current.state.lebarKemasan,
                kesesuaianBarang: this.HasilPemeriksaanPerBarang.current.state
                    .valuehasilkesiapan,
                keteranganTambahan: this.HasilPemeriksaanPerBarang.current.state
                    .keteranganTambahan,
            };

            // this.setState({
            //   seriBarang: seriBarang + 1,
            // });
            swalWithBootstrapButtons
                .fire({
                    title: "Apakah Anda Sudah Yakin??",
                    text: "Pastikan Data Anda Sudah Benar!",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Tidak!",
                    confirmButtonText: "Ya!",
                    reverseButtons: true,
                })
                .then((result) => {
                    if (result.value) {
                        const KirimData = message.loading("Sedang mengirim data...", 0);
                        fetch(`https://apisdev-gw.beacukai.go.id/v2/Lhp/rekam-detail-lhp`, {
                            method: "POST", // *GET, POST, PUT, DELETE, etc.
                            mode: "cors", // no-cors, cors, *same-origin
                            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cache
                            headers: {
                                "Content-Type": "application/json",
                                "beacukai-api-key": `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                            },
                            body: JSON.stringify(body), // body data type must match "Content-Type" header
                        })
                            .then((response) => response.json())
                            .then((body) => {
                                this.setState({
                                    idLhpHeader: body.idLhpHeader,
                                });
                                if (body.status == true) {
                                    setTimeout(KirimData, 500);
                                    Notification("success", body.message);
                                    const { hidetambahbarang } = this.state;
                                    this.setState({
                                        idLhpDetail: body.idLhpDetail
                                    }, () => {
                                        this.getDokumen()
                                        this.BatalDetail()
                                    })
                                    this.setState({
                                        hidetambahbarang: !hidetambahbarang,
                                        datafotoSementaraUtama: [],
                                        dataFotoCoba: [],
                                        seriBarang: seriBarang + 1,
                                        idLhpDetail: body.idLhpDetail
                                    });

                                    // setTimeout(function () {
                                    //     window.location.href = '/lhp-perekaman-new' //will redirect to your blog page (an ex: blog.html)
                                    // }, 5000);//window.location.href = '/BrowseEseal';
                                } else {
                                    Notification(
                                        "failed",
                                        "Terjadi Kesalahan Pada Proses Penyimpanan"
                                    );
                                    setTimeout(KirimData, 500);
                                    this.setState({ iconLoading: false });
                                }
                            });
                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            "Cancelled",
                            "Your imaginary file is safe :)",
                            "error"
                        );
                        this.setState({ iconLoading: false });
                    }
                });
        }

    }

    async EditData() {
        const dataEdit = this.DetaiBarangEdit.current.state
        const idLhpHeader = localStorage.getItem("idLhpHeader");
        const idHeader = localStorage.getItem("idHeader");
        const seriBarang = parseInt(this.state.dSeriBarang);
        const idProses = localStorage.getItem("idProses");
        const jumlahSatuan = dataEdit.jumlahSatuan
        const kodeJenisSatuan = dataEdit.kodeJenisSatuan
        const uraianBarang = dataEdit.uraianBarang
        if (jumlahSatuan === "") {
            this.setState({
                requiredDetail: true
            })
        } else if (kodeJenisSatuan === "") {
            this.setState({
                requiredDetail: true
            })
        } else if (uraianBarang === "") {
            this.setState({
                requiredDetail: true
            })
        } else {
            this.setState({
                requiredDetail: false
            })
            let fotoLhpBarang = [];
            dataEdit.dataFoto.map((item, index) => {
                fotoLhpBarang.push({
                    idLhpFotoBarang: item.idLhpFoto,
                });
            });
            let body = {
                idLhpHeader: idLhpHeader,
                idLhpDetail: this.state.dIdLhpDetail,
                idBarang: this.state.dIdBarang,
                jumlahSatuan: jumlahSatuan,
                jumlahKemasan: dataEdit.jumlahKemasan,
                panjangKemasan: dataEdit.panjangKemasan,
                kondisiBarang: dataEdit.kodeKondisiBarangEdit == undefined ? dataEdit.kodeKondisiBarang : dataEdit.kodeKondisiBarangEdit,
                asalNegaraBarang: dataEdit.kodeAsalBarangEdit == undefined ? dataEdit.kodeNegara : dataEdit.kodeNegaraEdit,
                seriBarang: seriBarang + 1,
                idHeader: idHeader,
                tinggiKemasan: dataEdit.tinggiKemasan,
                type: dataEdit.type,
                ukuranKemasan: dataEdit.ukuranKemasan,
                merk: dataEdit.merk,
                asalBarang: dataEdit.kodeAsalBarangEdit == undefined ? dataEdit.asalBarang : dataEdit.kodeAsalBarangEdit,
                kodeKapasitas: dataEdit.kodeSatuanBarangEditKapasitas == undefined ? dataEdit.kodeKapasitas : dataEdit.kodeSatuanBarangEditKapasitas,
                kapasitas: dataEdit.kapasitas,
                fotoLhpBarang,
                kodeJenisSatuan: dataEdit.kodeSatuanBarangEditBarang == undefined ? dataEdit.kodeJenisSatuan : dataEdit.kodeSatuanBarangEditBarang,
                uraianBarang: dataEdit.uraianBarang,
                model: dataEdit.model,
                idProses: idProses,
                kodeJenisKemasan: dataEdit.kodeKemasanEdit == undefined ? dataEdit.kodeKemasan : dataEdit.kodeKemasanEdit,
                flagAmbil: "0",
                lebarKemasan: dataEdit.lebarKemasan,
                kesesuaianBarang: dataEdit.kesesuaianBarang,
                keteranganTambahan: dataEdit.keteranganTambahan,
            };

            // this.setState({
            //   seriBarang: seriBarang + 1,
            // });
            console.log('edit', body)
            swalWithBootstrapButtons
                .fire({
                    title: "Apakah Anda Sudah Yakin??",
                    text: "Pastikan Data Anda Sudah Benar!",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Tidak!",
                    confirmButtonText: "Ya!",
                    reverseButtons: true,
                })
                .then((result) => {
                    if (result.value) {
                        const KirimData = message.loading("Sedang mengirim data...", 0);
                        fetch(`https://apisdev-gw.beacukai.go.id/v2/Lhp/update-detail-lhp`, {
                            method: "PUT", // *GET, POST, PUT, DELETE, etc.
                            mode: "cors", // no-cors, cors, *same-origin
                            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cache
                            headers: {
                                "Content-Type": "application/json",
                                "beacukai-api-key": `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                            },
                            body: JSON.stringify(body), // body data type must match "Content-Type" header
                        })
                            .then((response) => response.json())
                            .then((body) => {
                                this.setState({
                                    idLhpHeader: body.idLhpHeader,
                                });
                                if (body.status == true) {
                                    setTimeout(KirimData, 500);
                                    Notification("success", body.message);
                                    const { hidetambahbarang } = this.state;
                                    this.setState({
                                        idLhpDetail: body.idLhpDetail
                                    }, () => {
                                        this.getDokumen()
                                        this.BatalSimpan()
                                    })
                                    this.setState({
                                        hidetambahbarang: !hidetambahbarang,
                                        datafotoSementaraUtama: [],
                                        dataFotoCoba: [],
                                        seriBarang: seriBarang + 1,
                                        idLhpDetail: body.idLhpDetail
                                    });

                                    // setTimeout(function () {
                                    //     window.location.href = '/lhp-perekaman-new' //will redirect to your blog page (an ex: blog.html)
                                    // }, 5000);//window.location.href = '/BrowseEseal';
                                } else {
                                    Notification(
                                        "failed",
                                        "Terjadi Kesalahan Pada Proses Penyimpanan"
                                    );
                                    setTimeout(KirimData, 500);
                                    this.setState({ iconLoading: false });
                                }
                            })
                            .catch(err => {
                                if (err) {
                                    Notification(
                                        "failed",
                                        "Terjadi Kesalahan Pada Proses Penyimpanan"
                                    );
                                    setTimeout(KirimData, 500);
                                    this.setState({ iconLoading: false });
                                }
                            })
                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            "Cancelled",
                            "Your imaginary file is safe :)",
                            "error"
                        );
                        this.setState({ iconLoading: false });
                    }
                });
        }

    }

    async getDokumen() {
        let idLhpHeader = localStorage.getItem("idLhpHeader");
        let idHeader = localStorage.getItem("idHeader");
        this.setState({ fetching: true });
        fetch(`https://apisdev-gw.beacukai.go.id/v2/Lhp/get-daftar-detil-lhp/${idLhpHeader}/${idHeader}`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
            },
            "Access-Control-Allow-Origin": "*",
        })
            .then((response) => response.json())
            .then((body) => {
                console.log('jangan Kirim', body.listData.length > 0)
                if (body.listData.length > 0) {
                    this.setState({
                        janganKirim: false,
                    });
                } else {
                    this.setState({
                        janganKirim: true,
                    });
                }
                this.setState({
                    fetching: false,
                    dataTableDetail: body.listData,
                    totalData: body.totalRow
                });
            })
            .catch((err) => {
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({ loading: false });
                GlobalVariable.openNotificationWithIcon("error");
            });
    }
    handlePageChange = (page) => {
        this.setState({
            pages: page - 1
        }, () => this.getDokumen())

    }

    batal = () => {
        localStorage.clear();
        window.location.href = "/barang-penumpang/lhp";
    }

    getDataLhp(e) {
        let idHeader = localStorage.getItem("idHeader");

        axios.get(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/lhp/getByIdHeader/${idHeader}`, {
            headers: {
                'beacukai-API-Key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
            }
        })
            .then(res => {
                console.log("Get Data LHP : ", res)
                this.setState({
                    loading: false,
                    dataDokumen: res.data.data
                }, () => {
                    console.log(this.state.dataDokumen)
                    if (!(this.state.dataDokumen === null || this.state.dataDokumen === undefined)) {
                        if (!(res.data.data.tdLhp === null || res.data.data.tdLhp === undefined)) {
                            this.setState({
                                kesimpulanPemeriksaan: res.data.data.tdLhp.kesimpulanPemeriksaan,
                                catatanKesimpulan: res.data.data.tdLhp.catatanKesimpulan,
                                flagLhp: res.data.data.tdLhp.flagLhp,
                                flagBap: res.data.data.tdLhp.flagBap,
                                tempatPemeriksaan: res.data.data.tdLhp.tempatPemeriksaan,
                                pendamping: res.data.data.tdLhp.pendamping,
                                catatanKesimpulan: res.data.data.tdLhp.catatanKesimpulan,
                                waktuRekamLhp: res.data.data.tdLhp.waktuRekamLhp == null ? null : moment(res.data.data.tdLhp.waktuRekamLhp).format('YYYY-MM-DD HH:mm:ss'),
                                waktuRekamBap: res.data.data.tdLhp.waktuRekamBap == null ? null : moment(res.data.data.tdLhp.waktuRekamBap).format('YYYY-MM-DD HH:mm:ss'),
                                waktuMulaiPeriksa: res.data.data.tdLhp.waktuMulaiPeriksa == null ? null : moment(res.data.data.tdLhp.waktuMulaiPeriksa).format('YYYY-MM-DD HH:mm:ss'),
                                waktuSelesaiPeriksa: res.data.data.tdLhp.waktuSelesaiPeriksa == null ? null : moment(res.data.data.tdLhp.waktuSelesaiPeriksa).format('YYYY-MM-DD HH:mm:ss'),
                                tglAwal: moment(res.data.data.tdLhp.waktuMulaiPeriksa),
                                tglSelesai: moment(res.data.data.tdLhp.waktuSelesaiPeriksa),
                            });
                        }
                        if (!(res.data.data.barangList === null || res.data.data.barangList === undefined)) {
                            console.log('Ada barang')
                            this.setState({
                                foto: res.data.data.barangList.length
                            });
                        }
                    }
                });


            })
            .catch((err) => {
                swalWithBootstrapButtons.fire(
                    "Oops!",
                    `${err.message}`,
                    "error"
                );
                this.setState({ loading: false });
                GlobalVariable.openNotificationWithIcon("error");
            });
    }

    handleSubmit = (e) => {
        let idheader = localStorage.getItem("idHeader");
        let idLhp = localStorage.getItem("idLhp");
        let body = {
            idHeader: idheader,
            idLhp: idLhp,
        };

        if (this.state.tglAwal === "" || this.state.tglAwal === null || this.state.tglAwal === undefined) {
            this.setState({
                required: true
            })
        } else if (this.state.tglSelesai === "" || this.state.tglSelesai === null || this.state.tglSelesai === undefined) {
            this.setState({
                required: true
            })
        } else if (this.state.tempatPemeriksaan === "" || this.state.tempatPemeriksaan === null || this.state.tempatPemeriksaan === undefined) {
            this.setState({
                required: true
            })
        } else if (this.state.kesimpulanPemeriksaan === "" || this.state.kesimpulanPemeriksaan === null || this.state.kesimpulanPemeriksaan === undefined) {
            this.setState({
                requiredKesimpulan: true
            })
        } else {
            this.setState({
                required: false,
                requiredKesimpulan: false
            })

            swalWithBootstrapButtons
                .fire({
                    title: "Apakah Anda Sudah Yakin??",
                    text: "Pastikan Data Anda Sudah Benar!",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Tidak!",
                    confirmButtonText: "Ya!",
                    reverseButtons: true,
                })
                .then((result) => {
                    if (result.value) {
                        if (!(this.state.dataTableDetail === null && this.state.dataTableDetail === undefined || this.state.dataTableDetail.length === 0)) {
                            const SimpanData = message.loading("Sedang mengirim data...", 0);

                            const insertLhp = {}
                            const tdLhp = this.state.dataDokumen !== null ? this.state.dataDokumen.tdLhp : {}
                            const barangList = {}
                            const fotoList = {}

                            tdLhp.kesimpulanPemeriksaan = this.state.kesimpulanPemeriksaan
                            tdLhp.catatanKesimpulan = this.state.catatanKesimpulan
                            tdLhp.flagLhp = "Y"
                            tdLhp.tempatPemeriksaan = this.state.tempatPemeriksaan
                            tdLhp.waktuRekamLhp = moment().format('YYYY-MM-DD HH:mm:ss')
                            tdLhp.nipPemeriksa = this.state.dataDokumen != null ? this.state.dataDokumen.tdLhp.nipPemeriksa : getUser().nip
                            tdLhp.waktuMulaiPeriksa = this.state.tglAwal !== null && this.state.tglAwal !== undefined ? moment(this.state.tglAwal).format('YYYY-MM-DD HH:mm:ss') : null
                            tdLhp.waktuSelesaiPeriksa = this.state.tglSelesai !== null && this.state.tglSelesai !== undefined ? moment(this.state.tglSelesai).format('YYYY-MM-DD HH:mm:ss') : null
                            tdLhp.pendamping = this.state.pendamping !== null && this.state.pendamping !== undefined ? this.state.pendamping : null

                            insertLhp.tdLhp = tdLhp

                            insertLhp.barangList = this.state.dataTableDetail !== null && this.state.dataTableDetail !== undefined ? this.state.dataTableDetail : null

                            console.log("insert lhp: ", insertLhp)

                            axios.post(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/lhp/insert?idHeader=${localStorage.getItem("idHeader")}`, insertLhp, {
                                headers: {
                                    'beacukai-API-Key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                                }
                            })
                                .then((body => {
                                    console.log(body)
                                    if (body.data.status == true) {
                                        // for (let i = 0; i < insertLhp.barangList.length; i++) {
                                        //     if (insertLhp.barangList[i].perbaikiData === "Y") {
                                        //         console.log("data yang diubah : ", insertLhp.barangList[i])
                                        //     }
                                        // }

                                        setTimeout(SimpanData, 500);
                                        localStorage.clear();
                                        Swal.fire(
                                            'Berhasil!',
                                            'Keputusan Persetujuan Berhasil Disimpan.',
                                            'success'
                                        )
                                        // setTimeout(function () {
                                        //     window.location.href = '/barang-penumpang/lhp';
                                        // }, 3000);
                                    } else {
                                        setTimeout(SimpanData, 0);
                                        Swal.fire(
                                            'Gagal Menyimpan data LHP',
                                            'Terdapat pengisian form yang salah.',
                                            'error'
                                        );
                                        this.setState({ iconLoading: false });
                                    }
                                }))
                                .catch(error => {
                                    console.log(error)
                                    setTimeout(SimpanData, 0);
                                    Swal.fire(
                                        'Gagal Menyimpan data LHP',
                                        'Terdapat pengisian form yang salah.',
                                        'error'
                                    );
                                    this.setState({ iconLoading: false });
                                });
                        } else {
                            Swal.fire(
                                'Gagal',
                                'Minimal ada 1 barang yang diperiksa.',
                                'error'
                            );
                        }

                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            "Cancelled",
                            "Your imaginary file is safe :)",
                            "error"
                        );
                        this.setState({ iconLoading: false });
                    }
                });
        }
    }

    handleCetak = (e) => {
        let idheader = localStorage.getItem("idHeader");
        let idLhp = localStorage.getItem("idLhp");
        let body = {
            idHeader: idheader,
            idLhp: idLhp,
        };

        if (this.state.tglAwal === "" || this.state.tglAwal === null || this.state.tglAwal === undefined) {
            this.setState({
                required: true
            })
        } else if (this.state.tglSelesai === "" || this.state.tglSelesai === null || this.state.tglSelesai === undefined) {
            this.setState({
                required: true
            })
        } else if (this.state.tempatPemeriksaan === "" || this.state.tempatPemeriksaan === null || this.state.tempatPemeriksaan === undefined) {
            this.setState({
                required: true
            })
        } else if (this.state.kesimpulanPemeriksaan === "" || this.state.kesimpulanPemeriksaan === null || this.state.kesimpulanPemeriksaan === undefined) {
            this.setState({
                requiredKesimpulan: true
            })
        } else {
            this.setState({
                required: false,
                requiredKesimpulan: false
            })

            swalWithBootstrapButtons
                .fire({
                    title: "Apakah Anda Sudah Yakin??",
                    text: "Pastikan Data Anda Sudah Benar!",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Tidak!",
                    confirmButtonText: "Ya!",
                    reverseButtons: true,
                })
                .then((result) => {
                    if (result.value) {
                        if (!(this.state.dataTableDetail === null && this.state.dataTableDetail === undefined || this.state.dataTableDetail.length === 0)) {
                            const SimpanData = message.loading("Sedang mengirim data...", 0);

                            const insertLhp = {}
                            const tdLhp = this.state.dataDokumen !== null ? this.state.dataDokumen.tdLhp : {}
                            const barangList = {}
                            const fotoList = {}

                            tdLhp.kesimpulanPemeriksaan = this.state.kesimpulanPemeriksaan
                            tdLhp.catatanKesimpulan = this.state.catatanKesimpulan
                            tdLhp.flagLhp = "Y"
                            tdLhp.tempatPemeriksaan = this.state.tempatPemeriksaan
                            tdLhp.waktuRekamLhp = moment().format('YYYY-MM-DD HH:mm:ss')
                            tdLhp.nipPemeriksa = this.state.dataDokumen != null ? this.state.dataDokumen.tdLhp.nipPemeriksa : getUser().nip
                            tdLhp.waktuMulaiPeriksa = this.state.tglAwal !== null && this.state.tglAwal !== undefined ? moment(this.state.tglAwal).format('YYYY-MM-DD HH:mm:ss') : null
                            tdLhp.waktuSelesaiPeriksa = this.state.tglSelesai !== null && this.state.tglSelesai !== undefined ? moment(this.state.tglSelesai).format('YYYY-MM-DD HH:mm:ss') : null
                            tdLhp.pendamping = this.state.pendamping !== null && this.state.pendamping !== undefined ? this.state.pendamping : null

                            insertLhp.tdLhp = tdLhp

                            insertLhp.barangList = this.state.dataTableDetail !== null && this.state.dataTableDetail !== undefined ? this.state.dataTableDetail : null

                            console.log("insert lhp: ", insertLhp)

                            let idLhp = tdLhp !== null ? tdLhp.idLhp : null

                            axios.get(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/formulir/BAP/idLhp`, {
                                headers: {
                                    'beacukai-API-Key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                                }
                            })
                                .then((body => {
                                    console.log(body)
                                    if (body.data.status == true) {
                                        // for (let i = 0; i < insertLhp.barangList.length; i++) {
                                        //     if (insertLhp.barangList[i].perbaikiData === "Y") {
                                        //         console.log("data yang diubah : ", insertLhp.barangList[i])
                                        //     }
                                        // }

                                        setTimeout(SimpanData, 500);
                                        localStorage.clear();
                                        Swal.fire(
                                            'Berhasil!',
                                            'Keputusan Persetujuan Berhasil Disimpan.',
                                            'success'
                                        )
                                        // setTimeout(function () {
                                        //     window.location.href = '/barang-penumpang/lhp';
                                        // }, 3000);
                                    } else {
                                        setTimeout(SimpanData, 0);
                                        Swal.fire(
                                            'Gagal Menyimpan data LHP',
                                            'Terdapat pengisian form yang salah.',
                                            'error'
                                        );
                                        this.setState({ iconLoading: false });
                                    }
                                }))
                                .catch(error => {
                                    console.log(error)
                                    setTimeout(SimpanData, 0);
                                    Swal.fire(
                                        'Gagal Menyimpan data LHP',
                                        'Terdapat pengisian form yang salah.',
                                        'error'
                                    );
                                    this.setState({ iconLoading: false });
                                });
                        } else {
                            Swal.fire(
                                'Gagal',
                                'Minimal ada 1 barang yang diperiksa.',
                                'error'
                            );
                        }

                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            "Cancelled",
                            "Your imaginary file is safe :)",
                            "error"
                        );
                        this.setState({ iconLoading: false });
                    }
                });
        }
    }

    tambahbarang() {
        const { hidetambahbarang } = this.state;
        this.setState({
            hidetambahbarang: true,
            detailBarangPemeriksaan: false,
            viewData: null,
            editData: null,
            readOnlyHasil: false,
            kesesuaianBarang: null,
            keteranganTambahan: null,
            hasilFotoLhp: []

        });
    }

    detailBarangTable(e) {
        console.log('view: ', e)
        this.setState({
            detailBarangPemeriksaan: true,
            hidetambahbarang: true,
            kesesuaianBarang: e.tdLhpDetail.kesesuaianBarang,
            keteranganTambahan: e.tdLhpDetail.keteranganTambahan,
            editData: null,
            viewData: e.tdLhpDetail,
            disableButton: true,
            readOnlyHasil: true,
            // dataFotoCoba: e.tdLhpFotoList
            // datafotoSementaraUtama: e.tdLhpFotoList === undefined || e.tdLhpFotoList === null ? [] : e.tdLhpFotoList,
            // datafotoUtama: e.tdLhpFotoList === undefined || e.tdLhpFotoList === null ? [] : e.tdLhpFotoList,
            hasilFotoLhp: e.tdLhpFotoList
        }, () => {
            this.previewFoto();
        });
    }

    editBarangTable(e) {
        console.log('edit: ', e)
        this.setState({
            detailBarangPemeriksaan: false,
            hidetambahbarang: true,
            viewData: null,
            editData: e.tdLhpDetail,
            kesesuaianBarang: e.tdLhpDetail.kesesuaianBarang,
            keteranganTambahan: e.tdLhpDetail.keteranganTambahan,
            disableButton: false,
            readOnlyHasil: false,
            // dataFotoCoba: e.tdLhpFotoList,
            // datafotoSementaraUtama: e.tdLhpFotoList === undefined || e.tdLhpFotoList === null ? [] : e.tdLhpFotoList,
            // datafotoUtama: e.tdLhpFotoList === undefined || e.tdLhpFotoList === null ? [] : e.tdLhpFotoList,
            hasilFotoLhp: e.tdLhpFotoList
        }, () => {
            this.previewFoto();
        });
    }


    BatalSimpan() {
        const { hidetambahbarang } = this.state;
        this.setState({
            detailBarangPemeriksaan: false,
            hidetambahbarang: !hidetambahbarang,
            idLhpDetail: "",
            uraian: "",
            jumlahSatuan: "",
            negaraAsal: "",
            kodeKemasan: "",
            idBarang: "",
            jumlahKemasan: "",
            panjangKemasan: "",
            kondisiBarang: "",
            asalNegaraBarang: "",
            tinggiKemasan: "",
            type: "",
            ukuranKemasan: "",
            merk: "",
            asalBarang: "",
            kodeKapasitas: "",
            kapasitas: "",
            kodeJenisSatuan: "",
            model: "",
            kodeJenisKemasan: "",
            lebarKemasan: "",
            kesesuaianBarang: "",
            keteranganTambahan: "",
            hasilFotoLhp: [],
            requiredDetail: false,
            requiredDetailHasilPeriksa: false
        })
    }

    BatalDetail() {
        const { hidetambahbarang } = this.state;
        this.setState({
            detailBarangPemeriksaan: false,
            hidetambahbarang: !hidetambahbarang,
            viewData: null,
            editData: null
        })
    }

    deleteData = (e) => {
        console.log("delete : ", e)
        swalWithBootstrapButtons
            .fire({
                title: "Yakin??",
                text: "Pastikan menghapus data yang benar!",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Tidak!",
                confirmButtonText: "Ya!",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.value) {

                    if (e.tdLhpDetail.idLhpDetail === null || e.tdLhpDetail.idLhpDetail === undefined) {
                        let filteredArray = this.state.dataTableDetail.filter(item => item !== e)

                        this.setState({
                            dataTableDetail: filteredArray,
                        })
                    } else {
                        axios.delete(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/table/lhp-detail/delete/${e.tdLhpDetail.idLhpDetail}`, {
                            headers: {
                                'beacukai-API-Key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                            },
                            // 'Access-Control-Allow-Origin': '*',
                        })
                            .then((body => {
                                console.log(body)
                                if (body.data.status == "success") {
                                    for (let i = 0; i < e.tdLhpFotoList.length; i++) {
                                        if (!(e.tdLhpFotoList[i].idLhpFoto === null || e.tdLhpFotoList[i].idLhpFoto === undefined))
                                            axios.delete(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/table/lhp-foto/delete/${e.tdLhpFotoList[i].idLhpFoto}`, {
                                                headers: {
                                                    'beacukai-API-Key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                                                },
                                                // 'Access-Control-Allow-Origin': '*',
                                            })
                                                .then((body => {
                                                    console.log(body)
                                                    if (body.data.status == "success") {
                                                    } else {
                                                        Swal.fire(
                                                            'Gagal menghapus data Barang',
                                                            // 'Terdapat pengisian form yang salah.',
                                                            'error'
                                                        );
                                                        this.setState({ iconLoading: false });
                                                    }
                                                }))
                                    }

                                    let filteredArray = this.state.dataTableDetail.filter(item => item !== e)

                                    this.setState({
                                        dataTableDetail: filteredArray,
                                    })

                                } else {
                                    Swal.fire(
                                        'Gagal menghapus data Barang',
                                        // 'Terdapat pengisian form yang salah.',
                                        'error'
                                    );
                                    this.setState({ iconLoading: false });
                                }
                            }))
                    }
                }
            });
    }

    render() {
        // console.log('fotoLhp',this.state.datafotoUtama)
        const { hidetambahbarang, detailBarangPemeriksaan, disableButton, totalData } = this.state;
        const uploadButton = (
            <Button onClick={this.modalUploadUtama} disabled={this.state.hasilFotoLhp.length >= 2}>
                <i className="fas fa-upload"></i> Tambah Foto Barang
            </Button>
        );

        // const { getFieldDecorator } = this.props.form;
        const { modalUploadUtama } = this.state;
        const columnsutama = [
            {
                title: "Nama File",
                dataIndex: "nama",
                key: "namautama",
            },
            {
                title: "Keterangan",
                dataIndex: "keterangan",
                key: "keteranganutama",
            },
        ];
        let noUrut = 1
        const columns = [
            {
                title: "No",
                dataIndex: "nomor",
                render: () => noUrut = noUrut + 1,
                width: 50,
            },
            // {
            //     title: "Kategori",
            //     dataIndex: "tdLhpDetailBp.kategori",
            //     width: 200,
            // },
            {
                title: "Uraian",
                dataIndex: "tdLhpDetailBp.uraian",
                width: 250,
            },
            {
                title: "Jumlah",
                dataIndex: "tdLhpDetailBp.jumlahSatuan",
                width: 80,
            },
            {
                title: "Satuan",
                dataIndex: "tdLhpDetailBp.satuan",
                width: 80,
            },
            {
                title: "Aksi",
                dataIndex: "aksi",
                key: "aksi",
                fixed: "right",
                width: 160,
                render: (key, record, e) => (
                    <div>
                        <Button
                            type="primary"
                            onClick={(evt) => this.detailBarangTable(record, evt)}
                        >
                            <i className="fas fa-info" />
                        </Button> &nbsp;
                        <Button
                            className={'btn-info_me'}
                            onClick={(evt) => this.editBarangTable(record, evt)}
                        >
                            <i className="fas fa-edit" />
                        </Button> &nbsp;
                        <Button type={'danger'} ghost onClick={(env) => this.deleteData(record, env)}
                        >
                            <i className="fas fa-trash-alt" />
                        </Button>
                    </div>
                ),
            },
        ];

        return (
            <div>
                <div className="kt-portlet__body">
                    <div className="kt-section kt-section--last">
                        <Card>
                            <Row gutter={8} className="mb-2" type="flex" justify="end">
                                <Col>
                                    <Button type="primary" disabled={this.state.janganKirim} onClick={this.handleCetak}>
                                        <Icon type="save" />
                                        Cetak BAP
                                    </Button>
                                </Col>
                                <Col>
                                    <Button type="primary" disabled={this.state.janganKirim} onClick={this.handleSubmit}>
                                        <Icon type="save" />
                                        Kirim BAP
                                    </Button>
                                </Col>
                                <Col>
                                    <Button type="danger" ghost onClick={this.batal}>
                                        <Icon type="close-circle" />
                                        Batal
                                    </Button>
                                </Col>
                            </Row>
                        </Card>

                        <Card title="Berita Acara Pemeriksaan">
                            <Row gutter={8} style={{ padding: "5px" }}>
                                <Col span={6}>
                                    <p style={{ color: "black" }}>Waktu Mulai</p>
                                </Col>
                                <Col span={6}>
                                    <DatePicker
                                        // disabledDate={this.handleDisabledDatePicker}
                                        size={"medium"}
                                        placeholder="Pilih Tanggal"
                                        style={{ width: "100%" }}
                                        // showTime={{ format: 'HH:mm:ss' }}
                                        onChange={this.onChangeTglAwal}
                                        format="DD-MM-YYYY"
                                        value={this.state.tglAwal}
                                    />
                                </Col>
                                <Col span={4}>
                                    <TimePicker
                                        // style={is_readonly && {color: 'black'}} disabled={is_readonly}
                                        // defaultValue={pengeluaran_kemasan_mulai}
                                        // style={{color: 'black'}}
                                        placeholder={'Waktu Mulai'}
                                        style={{ width: "100%" }}
                                        // onOk={(value)=>this.onChange('pengeluaran_kemasan_mulaij',value)}
                                        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                                        value={this.state.tglAwal}
                                        format="HH:mm:ss"
                                        onChange={this.onChangeTimeAwal}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={8} style={{ padding: "5px" }}>
                                <Col span={6}>
                                    <p style={{ color: "black" }}>Waktu Selesai</p>
                                </Col>
                                <Col span={6}>
                                    <DatePicker
                                        // disabledDate={this.handleDisabledDatePicker}
                                        size={"medium"}
                                        placeholder="Pilih Tanggal"
                                        style={{ width: "100%" }}
                                        // showTime={{ format: 'HH:mm:ss' }}
                                        onChange={this.onChangeTglSelesai}
                                        format="DD-MM-YYYY"
                                        value={this.state.tglSelesai}
                                    />
                                </Col>
                                <Col span={4}>
                                    <TimePicker
                                        // style={is_readonly && {color: 'black'}} disabled={is_readonly}
                                        // defaultValue={pengeluaran_kemasan_mulai}
                                        // style={{color: 'black'}}
                                        placeholder={'Waktu Mulai'}
                                        style={{ width: "100%" }}
                                        // onOk={(value)=>this.onChange('pengeluaran_kemasan_mulaij',value)}
                                        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                                        value={this.state.tglSelesai}
                                        format="HH:mm:ss"
                                        onChange={this.onChangeTimeSelesai}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={8} style={{ padding: "5px" }}>
                                <Col span={6}>
                                    <p style={{ color: "black" }}>Lokasi Periksa</p>
                                </Col>
                                <Col span={15}>
                                    <Input
                                        name="lokasi"
                                        onChange={e => { this.setState({ tempatPemeriksaan: e.target.value }); }}
                                        value={this.state.tempatPemeriksaan}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={8} style={{ padding: "5px" }}>
                                <Col span={6}>
                                    <p style={{ color: "black" }}>Lokasi Perekaman BAP</p>
                                </Col>
                                <Col span={15}>
                                    <Input
                                        name="lokasi"
                                        onChange={e => { this.setState({ lokasiPerekamanBap: e.target.value }); }}
                                        value={this.state.lokasiPerekamanBap}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={8} style={{ padding: "5px" }}>
                                <Col span={6}>
                                    <p style={{ color: "black" }}>Foto</p>
                                </Col>
                                <Col span={6}>
                                    <InputNumber
                                        pattern="[0-9]+[.0-9]*"
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                        value={this.state.foto}
                                        formatter={(value) =>
                                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        }
                                        style={{ width: '100%' }}
                                        placeholder={"0"}
                                        onChange={e => { this.setState({ foto: e }); }}
                                    />
                                </Col>
                                <Col span={6}>
                                    <p style={{ color: "black" }}>lembar</p>
                                </Col>
                            </Row>
                            <Row gutter={8} style={{ padding: "5px" }}>
                                <Col span={6}>
                                    <p style={{ color: "black" }}>Keterangan</p>
                                </Col>
                                <Col span={15}>
                                    <TextArea
                                        name="lokasi"
                                        rows={4}
                                        onChange={e => { this.setState({ catatanKesimpulan: e.target.value }); }}
                                        value={this.state.catatanKesimpulan}
                                    />
                                </Col>
                            </Row>
                            {this.state.required === true ? (
                                <p className={'text-red'} style={{ fontSize: '12px' }}>&nbsp; Silahkan isi semua data terlebih
                                    dahulu!</p>) : null}
                        </Card>
                        <Modal
                            visible={this.state.modalPreview}
                            title="Preview BAP"
                            width="60%"
                        // onCancel={() => handleModal(false, null)}
                        // footer={[
                        //     <Button key="back" onClick={() => handleModal(false, null)}>
                        //         Tutup
                        //     </Button>,
                        // ]}
                        >
                            <Spin spinning={this.state.loading} size="large">
                                <Iframe
                                    width="100%"
                                    height="700"
                                    url={this.state.lihatPdf}
                                    onLoad={this.hideSpinner}
                                    className="myClassname"
                                    position="relative"
                                />
                            </Spin>
                        </Modal>

                    </div>
                </div>
            </div>
        );
    }
}

// const WrappedLhpDetailPemeriksaan = Form.create()(LhpDetailP);
export default LhpBap;
