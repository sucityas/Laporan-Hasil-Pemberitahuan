import React, {Component} from "react";
import {
    Col,
    Row,
    Card,
    Radio,
    Modal,
    Button,
    Form,
    Input,
    Table,
    Icon,
    DatePicker,
    Upload,
} from "antd";
// import { PlusOutlined } from '@ant-design/icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import Carousel, {Modal as Modall, ModalGateway} from "react-images";
import KesiapanKendala from "./TabsBAP/KesiapanKendala";
import PendampingPemeriksaan from "./TabsBAP/PendampingPemeriksaan";
import ContohBarang from "./TabsBAP/ContohBarang";
import JumlahJenisBarang from "./TabsBAP/JumlahJenisBarang";
import HasilPeriksa from "./TabsBAP/HasilPeriksa";
import NomorJumlahKemasan from "./TabsBAP/NomorJumlahKemasan";
import WaktuPemeriksa from "./TabsBAP/WaktuPemeriksa";
import QuickSearch from "./Component/QuickSearch";
import RealisasiMemo from "./TabsBAP/RealisasiMemo";
import KesimpulanHasil from "./TabsBAP/KesimpulanHasil";
import {AutoRotatingCarousel} from "material-auto-rotating-carousel";
import {Slide} from "material-auto-rotating-carousel";
import axios from "axios";
import Notification from "../../mita-aeo/aeo/PenelitianPerijinanAeo/component/Notifikasi";
import Swal from "sweetalert2";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
});
const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP,
    REACT_APP_HDFS,
    REACT_APP_SECRET_KEY_HDFS,
} = process.env;

const {blue, green} = require("@material-ui/core/colors");
const {TextArea} = Input;

const {Meta} = Card;

class LhpBap extends Component {
    state = {
        valueperintahlorong: "Y",
        jenisKemasan: "fcl",
    };

    constructor(props) {
        super(props);
        this.state = {
            hideperintahlorong: false,
            modalUpload: false,
            modalUploadUtama: false,
            nilaiKontainer: [],
            hiddenkontainer: false,
            hiddenjumlahkemasan: false,
            open: false,
            openutama: false,
            datafoto: [],
            datafotoUtama: [],
            berkasKontrak: [],
            berkasKontrakUtama: [],
            berkasKontrakList: [],
            berkasKontrakListUtama: [],
            dataKontainer: [],
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: []

        };
        this.KirimData = this.KirimData.bind(this);
        this.opensliderutama = this.opensliderutama.bind(this);
        this.kesiapankendala = React.createRef();
        this.pendampingpemeriksa = React.createRef();
        this.waktuPemeriksa = React.createRef();
        this.contohbarang = React.createRef();
        this.jumlahjenisbarang = React.createRef();
        this.nomorjumlahkemasan = React.createRef();
        this.kesimpulanHasil = React.createRef();
        this.realisasiMemo = React.createRef();
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    async KirimData() {
        // let idheader = localStorage.getItem("idHeader");
        let pendamping = [];
        let kontainer = this.state.dataKontainer;
        this.pendampingpemeriksa.current.state.dataPendamping.forEach(
            (item, index) => {
                pendamping.push({
                    namaPendamping: item.bidangPendamping,
                    unitPendamping: item.namaPendamping,
                });
            }
        );
        let kesiapan = {
            pemeriksaanke: 1,
            kesiapanpemeriksa: this.kesiapankendala.current.state.valuesiap,
            kendalapemeriksa:
                this.kesiapankendala.current.state.valuesiap === "Y"
                    ? ""
                    : this.kesiapankendala.current.state.idJenisKendalaPeriksa,
            uraian:
                this.kesiapankendala.current.state.valuesiap === "Y"
                    ? ""
                    : this.kesiapankendala.current.state.uraianKendala,
        };
        let lokasipendamping = {
            lokasi: this.pendampingpemeriksa.current.state.valuekawasan,
            namatempat:
                this.pendampingpemeriksa.current.state.valuekawasan === 1
                    ? ""
                    : this.pendampingpemeriksa.current.state.tempatpemeriksa,
            gudang:
                this.pendampingpemeriksa.current.state.valuekawasan === 2
                    ? ""
                    : this.pendampingpemeriksa.current.state.kodeGudang,
        };
        let waktuPemeriksa = {
            tglpengeluaran: this.waktuPemeriksa.current.state.tglPengeluaran,
            tglpengeluaranselesai: this.waktuPemeriksa.current.state
                .tglPengeluaranSelesai,
            tglPemeriksaan: this.waktuPemeriksa.current.state.tglPemeriksaan,
            tglPemeriksaanselesai: this.waktuPemeriksa.current.state
                .tglPemeriksaanSelesai,
            alasan: this.waktuPemeriksa.current.state.idAlasanPkb,
        };
        let contohBarang = {
            radio: this.contohbarang.current.state.valuedimintakembali,
            jenis: this.contohbarang.current.state.Jenis,
            Jumlah: this.contohbarang.current.state.Jumlah,
        };
        let jumlahJenisBarang = {
            PartaiBarang: this.jumlahjenisbarang.current.state.PartaiBarang,
            JumlahBarang: this.jumlahjenisbarang.current.state.JumlahBarang,
            JumlahJenisBarang: this.jumlahjenisbarang.current.state.JumlahJenisBarang,
        };
        let hasilPemeriksa = {
            kondisiSegel : this.state.kondisiSegel,
            RealisasiTingkatPemeriksaan : this.state.idTingkatIp,
            jenisKemasan : this.state.hasilKontainer === 0 ? "lcl" : "fcl"
        }
        let nomorJumlahKemasan = {
            JumlahKemasan: this.state.jumlahKemasan === null ? '' : this.state.jumlahKemasan,
            nomorKemasan: this.state.nomorKemasan === null ? '' : this.state.nomorKemasan,
        }
        let kesimpulanHasil = {
            radio: this.kesimpulanHasil.current.state.kesimpulanhasil,
            catatan: this.kesimpulanHasil.current.state.Catatan
        }
        let realisasiMemo = {
            radiomemo: this.realisasiMemo.current.state.memopfpd,
            keteranganmemo: this.realisasiMemo.current.state.Keterangan
        }
        let fotoUtamaPemeriksaanBarang = this.state.datafotoUtama
        let body = {
            "waktuRekamBap": "",
            "jumlahBarangDiperiksa": this.jumlahjenisbarang.current.state.JumlahBarang,
            "jumlahJenisBarangDiperiksa": this.jumlahjenisbarang.current.state.JumlahJenisBarang,
            "flagBap": "",
            "jumlahKemasan": this.state.jumlahKemasan === null ? '' : this.state.jumlahKemasan,
            "prosesStatus": [
                {
                    "waktuMulai": this.waktuPemeriksa.current.state.tglPengeluaran,
                    "waktuSelesai": this.waktuPemeriksa.current.state.tglPengeluaranSelesai,
                    "kodeProses": "314"
                },
                {
                    "waktuMulai": "07-11-2019 03:33:48",
                    "waktuSelesai": "07-11-2019 03:33:48",
                    "kodeProses": "310"
                },
                {
                    "waktuMulai": this.waktuPemeriksa.current.state.tglPemeriksaan,
                    "waktuSelesai": this.waktuPemeriksa.current.state.tglPengeluaranSelesai,
                    "kodeProses": "330"
                },
                {
                    "waktuMulai": "07-11-2019 03:35:03",
                    "waktuSelesai": "07-11-2019 03:35:03",
                    "kodeProses": "311"
                }
            ],
            "jenisContohBarang": this.contohbarang.current.state.Jenis,
            "realisasiMemo": this.realisasiMemo.current.state.memopfpd,
            fotoUtamaPemeriksaanBarang,
            "tempatPemeriksaan": this.pendampingpemeriksa.current.state.valuekawasan === 1
                ? ""
                : this.pendampingpemeriksa.current.state.tempatpemeriksa,
            "kodeGudang": this.pendampingpemeriksa.current.state.valuekawasan === 2
                ? ""
                : this.pendampingpemeriksa.current.state.kodeGudang,
            "idHeader": "",
            "flagLhp": "",
            "kesiapanPeriksa": this.kesiapankendala.current.state.valuesiap,
            "kodeLokasi": this.pendampingpemeriksa.current.state.valuekawasan,
            "jumlahPartaiBarang": this.jumlahjenisbarang.current.state.PartaiBarang,
            "realisasiIP": this.state.idTingkatIp,
            "kesimpulanPemeriksaan": this.kesimpulanHasil.current.state.Catatan,
            "nomorKemasan": "qwerty1",
            "catatanKesimpulan": this.kesimpulanHasil.current.state.kesimpulanhasil,
            "kondisiSegel": this.state.kondisiSegel,
            "jenisKendala": this.kesiapankendala.current.state.valuesiap === "Y"
                ? ""
                : this.kesiapankendala.current.state.idJenisKendalaPeriksa,
            pendamping,
            "uraianKendala": this.kesiapankendala.current.state.valuesiap === "Y"
                ? ""
                : this.kesiapankendala.current.state.uraianKendala,
            "kodeJenisKemasan": "1",
            "dimintaKembali": this.contohbarang.current.state.valuedimintakembali,
            kontainer,
            "jumlahContohBarang":this.contohbarang.current.state.Jumlah,
            "keteranganRealisasiMemo":this.realisasiMemo.current.state.Keterangan,
            "idAlasanPkb":this.waktuPemeriksa.current.state.idAlasanPkb
        };

        // let tdTelitiLampiran = [
        // ];
        // this.getLampiran.current.state.array.forEach((item, index) => {
        //     tdTelitiLampiran.push({
        //         "flagAda": item.flagAda || 0,
        //         "flagLengkap": item.flagLengkap || 0,
        //         "hasilPenelitian": item.hasilPenelitian,
        //         "idTelitiLampiran": "",
        //         "keterangan": item.keterangan,
        //         "seqIdLampiran": item.seqIdLampiran,
        //         "seqIzin": getseqIzin
        //     })
        // })

        swalWithBootstrapButtons.fire({
            title: 'Apakah Anda Sudah Yakin??',
            text: "Pastikan Data Anda Sudah Benar!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Tidak!',
            confirmButtonText: 'Ya!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                fetch(`http://10.161.4.89:8080/Perijinan/v1/teliti-lampiran`, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, cors, *same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cache
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(body)// body data type must match "Content-Type" header
                })
                    .then(response => response.json())
                    .then(body => {
                        if (body.status == "true") {
                            Notification('success', body.message)
                            setTimeout(function () {
                                window.location.href = '/rekamizin' //will redirect to your blog page (an ex: blog.html)
                            }, 5000);//window.location.href = '/BrowseEseal';
                        } else {
                            Notification('failed', 'Terjadi Kesalahan Pada Proses Penyimpanan')
                            this.setState({ iconLoading: false });
                        }
                    });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                // swalWithBootstrapButtons.fire(
                //     'Cancelled',
                //     'Your imaginary file is safe :)',
                //     'error'
                // );
                this.setState({iconLoading: false})
            }
        })
    }

    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({fileList}) => this.setState({fileList});

    getDataDokumen = () => {
        let idheader = localStorage.getItem("idHeader");
        let kodeDokumen = localStorage.getItem("kodeDokumen");
        fetch(`${REACT_APP_LHP}/header-dokumen/${idheader}/${kodeDokumen}`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
            },
            "Access-Control-Allow-Origin": "*",
        })
            .then((response) => response.json())
            .then((body) => {
                this.setState({
                    hasilKontainer: body.listData[0].jumlahKontainer,
                    jumlahKontainer: body.listData[0].jumlahKontainer,
                }, () => console.log(this.state.hasilKontainer));
            });
        console.log(this.state.hasilKontainer)
    };

    componentDidMount() {
        this.getDataDokumen();
    }

    getNomorKontainer = async (e) => {
        let idheader = localStorage.getItem("idHeader");
        this.setState({fetching: true});
        let pelData = await fetch(
            `${REACT_APP_LHP}/kontainer-tambah/${idheader}/${e.toUpperCase()}`,
            {
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
                },
                "Access-Control-Allow-Origin": "*",
            }
        )
            .then((response) => response.json())
            .then((body) => body.listData);
        return pelData;
    };

    nomorKontainerHandler = (event) => {
        this.setState({
            nomorKontainer: event.nomorKontainer,
            ukuranKontainer: event.ukuranKontainer,
            idKontainer: event.idKontainer,
        });
    };

    getKontainerDiperiksa = async (e) => {
        let idheader = localStorage.getItem("idHeader");
        this.setState({fetching: true});
        let pelData = await fetch(
            `${REACT_APP_LHP}/info-perintah-lorong/${idheader}/${e.toUpperCase()}`,
            {
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
                },
                "Access-Control-Allow-Origin": "*",
            }
        )
            .then((response) => response.json())
            .then((body) => body.listData);
        return pelData;
    };

    kontainerDiperiksaHandler = (event) => {
        this.setState({
            nomorKontainer: event.nomorKontainer,
            perintahLorong: event.perintahLorong,
            idKontainer: event.idKontainer,
        });
    };

    getAlasan = async (e) => {
        this.setState({fetching: true});
        let pelData = await fetch(
            `${REACT_APP_REFERENSI}/v1/alasan-perintah-lorong`,
            {
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `${REACT_APP_SECRET_KEY_REFERENSI}`,
                },
                "Access-Control-Allow-Origin": "*",
            }
        )
            .then((response) => response.json())
            .then((body) => body.data);
        return pelData;
    };

    alasanHandler = (event) => {
        this.setState({
            alasanPerintahLorong: event.alasanPerintahLorong,
            idAlasanPerintahLorong: event.idAlasanPerintahLorong,
        });
    };

    simpanKontainer() {
        let idheader = localStorage.getItem("idHeader");
        let body = {
            idHeader: idheader,
            idKontainer: this.state.idKontainer,
            nomorKontainer: this.state.nomorKontainer,
            ukuranKontainer: this.state.ukuranKontainer,
        };

        fetch(`${REACT_APP_LHP}/simpan-kontainer`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
            },
            body: JSON.stringify(body),
        });
    }

    tambahkontainer = () => {
        this.setState({
            modaltambahkontainer: true,
        });
    };

    handleOk = (e) => {
        this.setState({
            modaltambahkontainer: false,
        });
        this.simpanKontainer();
    };

    handleCancel = (e) => {
        this.setState({
            modaltambahkontainer: false,
        });
    };

    onChangeWaktuMulai = (date, dateString) => {
        this.setState({
            WaktuMulai: dateString,
        });
    };
    onChangeWaktuSelesai = (_, dateString) => {
        this.setState({WaktuSelesai: dateString});
    };

    onChangePerintahLorong = (e) => {
        this.setState({
            valueperintahlorong: e.target.value,
        });
    };

    toggleperintahlorong() {
        this.setState({
            hideperintahlorong: false,
        });
    }

    toggletdkperintahlorong() {
        this.setState({
            hideperintahlorong: !this.state.hideperintahlorong,
        });
    }

    modalUpload = () => {
        this.setState({
            modalUpload: true,
            berkasKontrak: [],
            keteranganfoto: null,
        });
    };

    modalUploadUtama = () => {
        this.setState({
            modalUploadUtama: true,
            berkasKontrakUtama: [],
            keteranganfotoUtama: null,
        });
    };


    handleCancelKontrak = () => {
        this.setState({
            modalUpload: false,
        });
    };
    handleCancelKontrakUtama = () => {
        this.setState({
            modalUploadUtama: false,
        });
    };

    onChange = async (e) => {
        if (e.target.name === "lampiranKontrak") {
            const file = e.target.files[0],
                {name, size, type} = file,
                ext = type.split("/");
            if (size > 512000) return alert("Ukuran File Harus Dibawah 512Kb");
            if (ext[0] !== "image" && (ext[1] !== "jpg") | "jpeg" | "png")
                return alert("Jenis file tidak didukung");
            const reader = new FileReader();
            reader.onloadend = () =>
                this.setState({
                    berkasKontrak: name,
                    fileKontrak: file,
                });
            reader.readAsDataURL(file);
            this.setState({lampiranNoKontrak: file});
        }
    };

    // tambahDokumen = () => {
    //     var row = {
    //         num: ++this.count,
    //         namafile: this.state.berkasKontrak,
    //         urlFile: this.state.getNomorKontrak,
    //         keteranganfoto: this.state.KeteranganFoto,
    //     };
    //     var newStateArray = [...this.state.datafoto];
    //     newStateArray.push(row);
    //     this.setState(() => {
    //         return {
    //             datafoto: newStateArray,
    //             namafile: "",
    //             KeteranganFoto: "",
    //             berkasKontrak: "",
    //         };
    //     });
    // };

    getPemeriksaan = async (e) => {
        this.setState({fetching: true});
        let pelData = await fetch(`${REACT_APP_LHP}/tingkat-ip${e.toUpperCase()}`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
            },
            "Access-Control-Allow-Origin": "*",
        })
            .then((response) => response.json())
            .then((body) => body.listData);
        return pelData;
    };

    pemeriksaanHandler = (event) => {
        this.setState({
            tingkatIp: event.tingkatIp,
            idTingkatIp: event.idTingkatIp,
        });
    };

    onChangeKondisiSegel = (e) => {
        this.setState({
            kondisiSegel: e.target.value,
        });
    };

    onChangeJenisKemasan = (e) => {
        this.setState({
            jenisKemasan: e.target.value,
        });
    };

    togglefcl() {
        this.setState({
            hiddenjumlahkemasan: false,
            hiddenkontainer: !this.state.hiddenkontainer,
        });
    }

    togglelcl() {
        this.setState({
            hiddenkontainer: false,
            hiddenjumlahkemasan: !this.state.hiddenjumlahkemasan,
        });
    }

    openslider() {
        this.setState({
            open: !this.state.open,
        });
    }

    opensliderutama() {
        this.setState({
            openutama: !this.state.openutama,
        });
    }

    closeslider() {
        this.setState({
            open: false,
        });
    }

    closesliderutama() {
        this.setState({
            openutama: false,
        });
    }

    // Proses Upload Image
    beforeImageUpload = (file) => {
        this.setState({
            berkasKontrak: [file],
        });
        return false;
    };
    beforeImageUploadUtama = (file) => {
        this.setState({
            berkasKontrakUtama: [file],
        });
        return false;
    };

    onAddImageKontainer = () => {
        if (this.state.berkasKontrak.length === 0) return;
        this.setState(
            (prevState) => ({
                berkasKontrakList: [
                    ...prevState.berkasKontrakList,
                    {file: prevState.berkasKontrak[0], path: "lhp_kontainer"},
                ],
                datafoto: [
                    ...prevState.datafoto,
                    {
                        nama: prevState.berkasKontrak[0].name,
                        data: URL.createObjectURL(prevState.berkasKontrak[0]),
                        urlFoto: "#",
                        keterangan: this.state.KeteranganFoto,
                        lokasiRekamFoto: "lhp_kontainer",
                    },
                ],
            }),
            () => this.setState({berkasKontrak: [], KeteranganFoto: null})
        );
    };
    onAddImageUtama = () => {
        if (this.state.berkasKontrakUtama.length === 0) return;
        this.setState(
            (prevState) => ({
                berkasKontrakListUtama: [
                    ...prevState.berkasKontrakListUtama,
                    {file: prevState.berkasKontrakUtama[0], path: "lhp_kontainer"},
                ],
                datafotoUtama: [
                    ...prevState.datafotoUtama,
                    {
                        nama: prevState.berkasKontrakUtama[0].name,
                        data: URL.createObjectURL(prevState.berkasKontrakUtama[0]),
                        urlFoto: "#",
                        keterangan: this.state.KeteranganFotoUtama,
                        lokasiRekamFoto: "lhp_kontainer",
                    },
                ],
            }),
            () => this.setState({berkasKontrakUtama: [], KeteranganFotoUtama: null})
        );
    };

    onUploadImage = () => {
        const registerFoto = () => {
            const resAxios = {
                url: `${REACT_APP_LHP}/v1/UploadFoto`,
                options: {
                    headers: {
                        "Beacukai-Api-Key": REACT_APP_SECRET_KEY_LHP,
                    },
                },
            };
            return axios.post(
                resAxios.url,
                {filterFotoList: this.state.datafoto},
                resAxios.options
            );
        };

        const uploadProcess = (data, index) => {
            let stateFoto = [...this.state.datafoto];
            console.log(stateFoto);
            const resAxios = {
                url: `${REACT_APP_HDFS}/v1/hdfs/upload`,
                options: {
                    headers: {
                        "Beacukai-Api-Key": REACT_APP_SECRET_KEY_HDFS,
                    },
                },
            };
            return axios
                .post(resAxios.url, data, resAxios.options)
                .then(({data}) => {
                    const urlFoto = data.item;
                    stateFoto[index] = {...stateFoto[index], urlFoto};
                })
                .catch(() => alert("Gagal"));
        };

        const promiseLoopData = this.state.berkasKontrakList.map(
            ({file, path}, index) => {
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
                modalUpload: false,
            });
        });
    };
    onUploadImageUtama = () => {
        const registerFoto = () => {
            const resAxios = {
                url: `${REACT_APP_LHP}/v1/UploadFoto`,
                options: {
                    headers: {
                        "Beacukai-Api-Key": REACT_APP_SECRET_KEY_LHP,
                    },
                },
            };
            return axios.post(
                resAxios.url,
                {filterFotoList: this.state.datafotoUtama},
                resAxios.options
            );
        };

        const uploadProcess = (data, index) => {
            let stateFotoUtama = [...this.state.datafotoUtama];
            console.log(this.state.datafotoUtama)
            console.log(stateFotoUtama);
            const resAxios = {
                url: `${REACT_APP_HDFS}/v1/hdfs/upload`,
                options: {
                    headers: {
                        "Beacukai-Api-Key": REACT_APP_SECRET_KEY_HDFS,
                    },
                },
            };
            return axios
                .post(resAxios.url, data, resAxios.options)
                .then(({data}) => {
                    const urlFoto = data.item;
                    stateFotoUtama[index] = {...stateFotoUtama[index], urlFoto};
                })
                .catch(() => alert("Gagal"));
        };

        const promiseLoopData = this.state.berkasKontrakListUtama.map(
            ({file, path}, index) => {
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
            });
        });
    };

    tambahKontainerr = () => {
        var row = {
            kontainerDiperiksa: this.state.nomorKontainer,
            waktuMulaiKontainer: this.state.WaktuMulai,
            waktuSelesaiKontainer: this.state.WaktuSelesai,
            perintahLorong:
                this.state.perintahLorong === null ? "" : this.state.perintahLorong,
            perintahLorongDilaksanakan: this.state.valueperintahlorong,
            alasanTidak:
                this.state.alasanPerintahLorong === null
                    ? "Tidak ada Alasan"
                    : this.state.alasanPerintahLorong,
            datafoto: this.state.datafoto,
        };
        let newStateArray = [...this.state.dataKontainer, row];
        this.setState(
            () => {
                return {
                    dataKontainer: newStateArray,
                    kontainerDiperiksa: "",
                    waktuMulaiKontainer: "",
                    waktuSelesaiKontainer: "",
                    perintahLorong: "",
                    perintahLorongDilaksanakan: "",
                    valueperintahlorong: "",
                    alasanPerintahLorong: "",
                    datafoto: [],
                };
            },
            () => console.log(this.state.dataKontainer)
        );
    };

    klikIni = () => {
        this.tambahKontainerr();
    };

    // onPreview Kontainer Per Row
    onPreviewKontainer = index => {
        const data = [...this.state.dataKontainer],
            selectedData = data.filter((item, idx) => idx === index);
        console.log(selectedData);
        this.setState({open: !this.state.open, listPreviewFoto: selectedData[0].datafoto});
    }


    render() {
        const uploadButton = (
            <Button onClick={this.modalUploadUtama}>
                <i className="fas fa-upload"></i> Tambah Foto Barang</Button>

        );
        const {modalUpload, modalUploadUtama} = this.state;
        const columns = [
            {
                title: "Nama File",
                dataIndex: "nama",
                key: "nama",
            },
            {
                title: "Keterangan",
                dataIndex: "keterangan",
                key: "keterangan",
            },
        ];
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
        const columnskontainer = [
            {
                title: "Kontainer DIperiksa",
                dataIndex: "kontainerDiperiksa",
                key: "kontainerDiperiksa",
            },
            {
                title: "Waktu Mulai",
                dataIndex: "waktuMulaiKontainer",
                key: "waktuMulaiKontainer",
            },
            {
                title: "Waktu Selesai",
                dataIndex: "waktuSelesaiKontainer",
                key: "waktuSelesaiKontainer",
            },
            {
                title: "Perintah Lorong",
                dataIndex: "perintahLorong",
                key: "perintahLorong",
            },
            {
                title: "Perintah Lorong Dilaksanakan",
                dataIndex: "perintahLorongDilaksanakan",
                key: "perintahLorongDilaksanakan",
                render: (key, dataIndex) => {
                    if (key === "N") {
                        return <label>Tidak</label>;
                    } else if (key === "Y") {
                        return <label>Ada</label>;
                    } else {
                        return <label>Anda belum memasukkan Alasan</label>;
                    }
                },
            },
            {
                title: "Alasan",
                dataIndex: "alasanTidak",
                key: "alasanTidak",
            },
            {
                title: "Aksi",
                dataIndex: "urlFile",
                key: "urlFile",
                render: (_, record, index) =>
                    <Button onClick={() => this.onPreviewKontainer(index)}>
                        <i className="fas fa-eye"></i>&nbsp;Preview
                    </Button>
            }
        ];

        return (
            <div>
                <Card>
                    <Row>
                        <Col lg={12} md={24}>
                            <Card
                                title="Kesiapan dan Kendala Pemeriksaan"
                                style={{minHeight: "300px", maxHeight: "300px"}}
                            >
                                <KesiapanKendala ref={this.kesiapankendala}/>
                            </Card>
                        </Col>
                        <Col lg={12} md={24}>
                            <Card
                                title="Pendamping Pemeriksaan"
                                style={{minHeight: "300px"}}
                            >
                                <PendampingPemeriksaan ref={this.pendampingpemeriksa}/>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Card title="Waktu Pemeriksaan">
                            <WaktuPemeriksa ref={this.waktuPemeriksa}/>
                        </Card>
                    </Row>
                    <Row>
                        <Col lg={12} md={24}>
                            <Card
                                title="Contoh Barang"
                                style={{minHeight: "230px", maxHeight: "230px"}}
                            >
                                <ContohBarang ref={this.contohbarang}/>
                            </Card>
                        </Col>

                        <Col lg={12} md={24}>
                            <Card
                                title="Jumlah dan Jenis Barang"
                                style={{minHeight: "230px", maxHeight: "230px"}}
                            >
                                <JumlahJenisBarang ref={this.jumlahjenisbarang}/>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={24} md={24}>
                            <Card
                                title="Hasil Pemeriksaan"
                                style={{minHeight: "230px", maxHeight: "230px"}}
                            >
                                <Row className="mb-2" gutter={8}>
                                    <Col span={10} style={{textAlign: "start"}}>
                                        Kondisi Segel
                                    </Col>
                                    <Col span={14}>
                                        <Radio.Group
                                            value={this.state.kondisiSegel}
                                            onChange={this.onChangeKondisiSegel}
                                        >
                                            <Radio value={1}>Utuh</Radio>
                                            <Radio value={2}>Rusak</Radio>
                                            <Radio value={3}>Berbeda</Radio>
                                        </Radio.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-2" gutter={8}>
                                    <Col span={10} style={{textAlign: "start"}}>
                                        Realisasi Tingkat Pemeriksaan
                                    </Col>
                                    <Col span={14}>
                                        <QuickSearch
                                            placeholder="Kendala Pemeriksaan"
                                            clickHandler={this.pemeriksaanHandler}
                                            pointer={"tingkatIp"}
                                            isFetching={this.fetching}
                                            data={this.getPemeriksaan}
                                        ></QuickSearch>
                                    </Col>
                                </Row>
                                <Row className="mb-2" gutter={8}>
                                    <Col span={10} style={{textAlign: "start"}}>
                                        Jenis Kemasan
                                    </Col>
                                    <Col span={14}>
                                        <Radio.Group
                                            value={this.state.hasilKontainer === 0 ? "lcl" : "fcl" }
                                            onChange={this.onChangeJenisKemasan}
                                            disabled={true}
                                        >
                                            <Radio value={"fcl"} onChange={this.togglefcl.bind(this)}>
                                                FCL
                                            </Radio>
                                            <Radio value={"lcl"} onChange={this.togglelcl.bind(this)}>
                                                LCL
                                            </Radio>
                                        </Radio.Group>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    {this.state.hasilKontainer > 0 ? null : (
                        <Row>
                            <Col lg={24} md={24}>
                                <Card
                                    title="Nomor dan Jumlah Kemasan"
                                    // hidden={this.state.jumlahKontainer > 0}
                                    style={{minHeight: "230px", maxHeight: "230px"}}
                                >
                                    <Form>
                                        <Row className="mb-2" gutter={8}>
                                            <Col span={10} style={{textAlign: 'start'}}>
                                                Jumlah Kemasan
                                            </Col>
                                            <Col span={14}>
                                                <Input
                                                    value={this.state.jumlahKemasan}
                                                    onChange={e => this.setState({jumlahKemasan: e.target.value})}/>
                                            </Col>
                                        </Row>

                                        <Row className="mb-2" gutter={8}>
                                            <Col span={10} style={{textAlign: 'start'}}>
                                                Nomor Kemasan
                                            </Col>
                                            <Col span={14}>
                                                <Input
                                                    value={this.state.nomorKemasan}
                                                    onChange={e => this.setState({nomorKemasan: e.target.value})}/>
                                            </Col>
                                        </Row>


                                    </Form> </Card>
                            </Col>
                        </Row>
                    )}
                    {this.state.hasilKontainer === null || 0 ? null : (
                        <Row>
                            <Col span={24}>
                                <Card
                                    title="Kontainer"
                                    // hidden={(this.state.jumlahKontainer = 0)}
                                    extra={
                                        <Button icon="plus" onClick={this.tambahkontainer}>
                                            Tambah Kontainer
                                        </Button>
                                    }
                                >
                                    <Form>
                                        <Row gutter={8}>
                                            <Col lg={10} md={24}>
                                                <Row gutter={8} className="mb-2">
                                                    <Col span={10}>Kontainer Yang Diperiksa</Col>
                                                    <Col lg={12} md={12}>
                                                        <QuickSearch
                                                            placeholder="Nomor Kontainer"
                                                            clickHandler={this.kontainerDiperiksaHandler}
                                                            pointer={"nomorKontainer"}
                                                            // pointer2={"ukuranKontainer"}
                                                            isFetching={this.fetching}
                                                            data={this.getKontainerDiperiksa}
                                                        ></QuickSearch>
                                                    </Col>
                                                </Row>

                                                <Row gutter={8} className="mb-2">
                                                    <Col span={10}>Waktu Mulai</Col>
                                                    <Col span={6}>
                                                        <DatePicker
                                                            showTime
                                                            onChange={this.onChangeWaktuMulai}
                                                            onOk={this.onOk}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row gutter={8} className="mb-2">
                                                    <Col span={10}>Waktu Selesai</Col>
                                                    <Col span={6}>
                                                        <DatePicker
                                                            showTime
                                                            onChange={this.onChangeWaktuSelesai}
                                                            onOk={this.onOk}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row gutter={8} className="mb-2">
                                                    <Col span={10}>Perintah Lorong</Col>
                                                    <Col lg={12} md={12}>
                                                        <Input
                                                            value={this.state.perintahLorong}
                                                            disabled={true}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={10} md={24}>
                                                <Row gutter={8} className="mb-2">
                                                    <Col span={10}>Perintah Lorong dilaksanakan ?</Col>
                                                    <Col lg={12} md={12}>
                                                        <Radio.Group
                                                            name="Perintah Lorong dilaksanakan"
                                                            onChange={this.onChangePerintahLorong}
                                                            value={this.state.valueperintahlorong}
                                                        >
                                                            <Radio
                                                                value="Y"
                                                                onClick={this.toggleperintahlorong.bind(this)}
                                                            >
                                                                Ya
                                                            </Radio>
                                                            <Radio
                                                                value="N"
                                                                onClick={this.toggletdkperintahlorong.bind(this)}
                                                            >
                                                                Tidak
                                                            </Radio>
                                                        </Radio.Group>
                                                    </Col>
                                                </Row>
                                                {this.state.hideperintahlorong ? (
                                                    <Row gutter={8} className="mb-2">
                                                        <Col span={10}>Alasan</Col>
                                                        <Col lg={12} md={12}>
                                                            <QuickSearch
                                                                placeholder="Alasan"
                                                                clickHandler={this.alasanHandler}
                                                                pointer={"alasanPerintahLorong"}
                                                                // pointer2={"ukuranKontainer"}
                                                                isFetching={this.fetching}
                                                                data={this.getAlasan}
                                                            ></QuickSearch>{" "}
                                                        </Col>
                                                    </Row>
                                                ) : null}
                                                <Row gutter={8} className="mb-2">
                                                    <Col span={10}>Foto Kontainer</Col>
                                                    <Col lg={6} md={6}>
                                                        <Button
                                                            onClick={this.modalUpload}
                                                            type="primary"
                                                            className={"secondarybutton"}
                                                            ghost
                                                        >
                                                            <i
                                                                className="fas fa-upload"
                                                                style={{lineHeight: "1"}}
                                                            />
                                                            &nbsp; UPLOAD FOTO KONTAINER
                                                        </Button>
                                                        <Input
                                                            style={{display: "none"}}
                                                            id="lampiranKontrak"
                                                            type="file"
                                                            name="lampiranKontrak"
                                                            onChange={this.onChange}
                                                        />{" "}
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Form>
                                    <Row gutter={8} className="mb-2" type="flex" justify="end">
                                        <Col>
                                            <Button
                                                type="primary"
                                                icon="save"
                                                style={{marginRight: "2%"}}
                                                onClick={this.klikIni}
                                            >
                                                Simpan
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button type="danger" icon="cross">
                                                Batal
                                            </Button>
                                        </Col>
                                        <Col>
                                            {this.state.open ? (
                                                <AutoRotatingCarousel
                                                    label="TUTUP"
                                                    open={this.openslider}
                                                    onClose={this.closeslider.bind(this)}
                                                    onStart={this.closeslider.bind(this)}
                                                    style={{position: "absolute"}}
                                                >
                                                    {this.state.listPreviewFoto.map((item, key) => (
                                                        <Slide
                                                            key={key}
                                                            media={<img src={item.data}/>}
                                                            mediaBackgroundStyle={{
                                                                backgroundColor: blue[400],
                                                            }}
                                                            style={{backgroundColor: blue[600]}}
                                                            title={item.nama}
                                                            subtitle={item.keterangan}
                                                        />
                                                    ))}
                                                </AutoRotatingCarousel>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <Table
                                        dataSource={this.state.dataKontainer}
                                        columns={columnskontainer}
                                        // rowKey={"num"}
                                        size="middle"
                                    />
                                </Card>
                            </Col>
                        </Row>
                    )}

                    <Row>
                        <Col lg={12} md={24}>
                            <Card
                                title="Realisasi Memo PFPD"
                                style={{minHeight: "200px", maxHeight: "200px"}}
                            >
                                <RealisasiMemo ref={this.realisasiMemo}/>
                            </Card>
                        </Col>
                        <Col lg={12} md={24}>
                            <Card
                                title="Kesimpulan Hasil Pemeriksaan"
                                style={{minHeight: "200px", maxHeight: "200px"}}
                            >
                                <KesimpulanHasil ref={this.kesimpulanHasil}/>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Card title="Foto Utama Pemeriksaan Barang">
                            {/*Buat Button Upload*/}
                            {uploadButton}
                            <br/>
                            <br/>
                            <br/>
                            {this.state.datafotoUtama.map((item, key) => (
                                <img
                                    key={key}
                                    alt="example"
                                    src={item.data}
                                    style={{width: 200, display: "inline-block", marginRight: "20px"}}
                                    onClick={this.opensliderutama}
                                />
                            ))}
                            <Col>
                                {this.state.openutama ? (
                                    <AutoRotatingCarousel
                                        label="TUTUP"
                                        open={this.opensliderutama}
                                        onClose={this.closesliderutama.bind(this)}
                                        onStart={this.closesliderutama.bind(this)}
                                        style={{position: "absolute"}}
                                    >
                                        {this.state.datafotoUtama.map((item, key) => (
                                            <Slide
                                                // key={key}
                                                media={<img src={item.data}/>}
                                                mediaBackgroundStyle={{
                                                    backgroundColor: blue[400],
                                                }}
                                                style={{backgroundColor: blue[600]}}
                                                title={item.nama}
                                                subtitle={item.keterangan}
                                            />
                                        ))}
                                    </AutoRotatingCarousel>
                                ) : null}
                            </Col>
                            <Modal
                                visible={modalUploadUtama}
                                title="Tambah Foto Barang"
                                width={"50%"}
                                footer={[
                                    <Button
                                        key="back"
                                        type={"danger"}
                                        onClick={this.handleCancelKontrakUtama}
                                    >
                                        <i className="fas fa-times-circle"/>
                                        &nbsp; Batal
                                    </Button>,
                                    <Button key="submit" type="primary" onClick={this.onUploadImageUtama}>
                                        <i
                                            className="fa fa-save"
                                            style={{lineHeight: "1", marginRight: "5px"}}
                                        />
                                        &nbsp; Simpan
                                    </Button>,
                                ]}
                            >
                                <Form
                                    labelCol={{span: 4}}
                                    wrapperCol={{span: 20}}
                                    labelAlign="left"
                                >
                                    <Form.Item label="Upload File">
                                        <Upload
                                            beforeUpload={this.beforeImageUploadUtama}
                                            onRemove={() => this.setState({berkasKontrakUtama: []})}
                                            fileList={this.state.berkasKontrakUtama}
                                        >
                                            <Button icon="upload">Upload</Button>
                                        </Upload>
                                    </Form.Item>
                                    <Form.Item label="Keterangan">
                                        <TextArea
                                            value={this.state.KeteranganFotoUtama}
                                            onChange={(e) =>
                                                this.setState({KeteranganFotoUtama: e.target.value})
                                            }
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button onClick={this.onAddImageUtama} icon="plus">
                                            Tambah
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <Table
                                    dataSource={this.state.datafotoUtama}
                                    columns={columnsutama}
                                    rowKey={"num"}
                                    size="middle"
                                />
                            </Modal>
                        </Card>
                    </Row>
                </Card>
                <Card>
                    <Row className="mb-2" type="flex" justify="end">
                        <Button style={{marginRight: 8}} onClick={this.KirimData}>
                            Simpan Draft BAP
                        </Button>
                        <Button type="primary" style={{marginRight: 8}}>
                            Kirim BAP
                        </Button>
                        <Button type="danger" onClick={this.batal}>
                            Batal
                        </Button>
                    </Row>
                </Card>

                {/* Modal Upload Kontainer */}
                <Modal
                    visible={modalUpload}
                    title="Upload Kontainer"
                    width={"50%"}
                    footer={[
                        <Button
                            key="back"
                            type={"danger"}
                            onClick={this.handleCancelKontrak}
                        >
                            <i className="fas fa-times-circle"/>
                            &nbsp; Batal
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.onUploadImage}>
                            <i
                                className="fa fa-save"
                                style={{lineHeight: "1", marginRight: "5px"}}
                            />
                            &nbsp; Simpan
                        </Button>,
                    ]}
                >
                    <Form
                        labelCol={{span: 4}}
                        wrapperCol={{span: 20}}
                        labelAlign="left"
                    >
                        <Form.Item label="Upload File">
                            <Upload
                                beforeUpload={this.beforeImageUpload}
                                onRemove={() => this.setState({berkasKontrak: []})}
                                fileList={this.state.berkasKontrak}
                            >
                                <Button icon="upload">Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="Keterangan">
                            <TextArea
                                value={this.state.KeteranganFoto}
                                onChange={(e) =>
                                    this.setState({KeteranganFoto: e.target.value})
                                }
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={this.onAddImageKontainer} icon="plus">
                                Tambah
                            </Button>
                        </Form.Item>
                    </Form>
                    <Table
                        dataSource={this.state.datafoto}
                        columns={columns}
                        rowKey={"num"}
                        size="middle"
                    />
                </Modal>
                {/* MODAL */}
                <Modal
                    title="Tambah Kontainer"
                    visible={this.state.modaltambahkontainer}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div>
                        <Row gutter={8} className="mb-2">
                            <Col span={10}>Nomor Kontainer</Col>
                            <Col span={14}>
                                <QuickSearch
                                    placeholder="Nomor Kontainer"
                                    clickHandler={this.nomorKontainerHandler}
                                    pointer={"nomorKontainer"}
                                    pointer2={"ukuranKontainer"}
                                    isFetching={this.fetching}
                                    data={this.getNomorKontainer}
                                ></QuickSearch>
                            </Col>
                        </Row>
                        <Row gutter={8} className="mb-2">
                            <Col span={10}>Ukuran</Col>
                            <Col span={14}>
                                <Input value={this.state.ukuranKontainer}/>
                            </Col>
                        </Row>
                    </div>
                </Modal>

                <Modal
                    visible={this.state.kontainerUpload}
                    footer={null}
                    width={800}
                    title="Upload Foto Kontainer"
                    onCancel={this.handleClose}
                >
                    <Form onSubmit={this.onChange}>
                        <Row gutter={8} className="mb-2">
                            <Col span={4}>Foto</Col>
                            <Col span={16}>
                                <form id="fileuploadform">
                                    <input
                                        id="filekontainer"
                                        type="file"
                                        name="filekontainer"
                                        multiple
                                        onChange={this.onChangeFile}
                                        className="border-0"
                                    />
                                </form>
                            </Col>
                        </Row>

                        <Row className="mb-2" gutter={8}>
                            <Col span={4}></Col>
                            <Col span={16}></Col>
                        </Row>

                        <Row gutter={8} className="mb-2">
                            <Col span={4}>Keterangan</Col>
                            <Col span={16}>
                <textarea
                    id="keteranganKontainer"
                    name="keteranganKontainer"
                    onChange={this.handleInputChange}
                />
                            </Col>
                        </Row>
                        <Row gutter={8} className="mb-2">
                            <Col span={4}></Col>
                            <Col span={16}>
                                <Row>
                                    <Col span={6}>
                                        <Button type="primary" onClick={this.handleSubmit}>
                                            <Icon type="save"/>
                                            Simpan
                                        </Button>
                                    </Col>
                                    <Col span={6}>
                                        <Button type="danger" onClick={this.handleClose}>
                                            <Icon type="close-circle"/>
                                            Batal
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.kontainerFoto}
                    footer={null}
                    width={800}
                    title="Foto Kontainer"
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.onChange}>
                        <Row gutter={8} className="mb-2">
                            <Col span={16}></Col>
                        </Row>
                        <Row className="mb-2" gutter={8}>
                            <Col span={4}></Col>
                            <Col span={24}></Col>
                        </Row>
                    </Form>
                </Modal>
                <Modal footer={null} onCancel={this.handleCance}>
                    <Form>
                        <Row className="mb-2" gutter={8}>
                            <Col span={4}></Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default LhpBap;
