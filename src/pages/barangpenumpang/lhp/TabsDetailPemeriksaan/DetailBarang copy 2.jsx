import React, { Component } from "react";
import { Row, Col, Card, Input, Form, Button, Icon, Select, Modal, Pagination, InputNumber, Table, Spin, Checkbox } from "antd";
import axios from 'axios'
import '../TabsBAP/bebas.css'
import Highlighter from 'react-highlight-words';
import Swal from "sweetalert2";
import GlobalVariable from "../../../../helpers/GlobalVariable";

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
            showBarangTidakBersamaan: false,
            firstIndexPage: 0,
            readOnly: false,
            idEdit: 0,
            idLhpDetail: null,
            barangList: null,
            clear: false
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
            `${REACT_APP_REFERENSI}/v1/satuan-barang/all/${e.toUpperCase()}`,
            {
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `${REACT_APP_SECRET_KEY_REFERENSI}`
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

        axios.get(`${REACT_APP_API_BARANG_PENUMPANG}/table/detail/list/${idHeader}`, {
            headers: {
                'beacukai-API-Key': `${REACT_APP_API_BARANG_PENUMPANG_KEY}`,
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
                    showBarangTidakBersamaan: this.props.data.header.kodeDokumen === '22' ? true : false,
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
                    readOnly: true
                })
            } else if (!(this.props.editData === null)) {
                // console.log("Detail Barang Edit: ", this.props.editData)
                this.setState({
                    uraian: this.props.editData.uraian,
                    merk: this.props.editData.merk,
                    tipe: this.props.editData.tipe,
                    spesifikasiLain: this.props.editData.spesifikasiLain,
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
                    readOnly: false
                })
            } else {
                this.setState({
                    action: 'add',
                    uraian: null,
                    merk: null,
                    tipe: null,
                    spesifikasiLain: null,
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
                showBarangTidakBersamaan: this.props.data.header.kodeDokumen === '22' ? true : false,
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
                idNewBarang: null
            })
        }
        this.getReferensi()
        this.fetchReferensiKemasan()
        this.fetchReferensiValuta()
        this.fetchReferensiSatuan()
    }

    fetchReferensiKemasan = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `${REACT_APP_API_BARANG_PENUMPANG}/referensi/kemasan/list`,
            {
                headers: {
                    [!isLocalhost
                        ? "beacukai-api-key"
                        : "customs-api-key"]: `${REACT_APP_API_BARANG_PENUMPANG_KEY}`,

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

    fetchReferensiSatuan = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `${REACT_APP_API_BARANG_PENUMPANG}/referensi/satuanbarang/list`,
            {
                headers: {
                    [!isLocalhost
                        ? "beacukai-api-key"
                        : "customs-api-key"]: `${REACT_APP_API_BARANG_PENUMPANG_KEY}`,

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
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `${REACT_APP_API_BARANG_PENUMPANG}/referensi/valuta/list`,
            {
                headers: {
                    [!isLocalhost
                        ? "beacukai-api-key"
                        : "customs-api-key"]: `${REACT_APP_API_BARANG_PENUMPANG_KEY}`,

                }
            }
        )
            .then(res => {
                // console.log('kode jenis pungutan:', res.data.data);
                const result = res.data.map(data => ({
                    text: `${data.kodeValuta} - ${data.namaValuta}`,
                    value: data.kodeValuta,
                }));
                this.setState({ dataReferensiValuta: result, fetchingReferensiValuta: false });
            })
            .catch(error => {
                console.log(error)
            });
    };

    onSelectionChanged(data) {
        // console.log("Selected Barang : ", data)
        this.setState({
            uraian: data.uraian,
            merk: data.merk,
            tipe: data.tipe,
            spesifikasiLain: data.spesifikasiLain,
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
            idDetail: data.idDetail,
            keterangan: data.keterangan,
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

    onChangeDataHargaSatuan = (event, e) => {
        this.setState(
            {
                hargaSatuan: event,
            },
            () => {
                this.checkNumberHargaSatuan(this.state.hargaSatuan);
            }
        );
        if (!(this.state.jumlahSatuan === null || this.state.jumlahSatuan === undefined) && !(this.state.hargaSatuan === null || this.state.hargaSatuan === undefined) && (this.state.jumlahHarga === null || this.state.jumlahHarga === undefined || this.state.jumlahHarga === 0)) {
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
            axios.get(`${REACT_APP_REFERENSI}/v1/satuan-barang/kata/` + value.toUpperCase(), {
                headers: {
                    [!isLocalhost
                        ? "beacukai-api-key"
                        : "customs-api-key"]: `${REACT_APP_SECRET_KEY_REFERENSI}`,
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
            axios.get(`${REACT_APP_REFERENSI}/v1/satuan-barang/kata/${e.toUpperCase()}`, {
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `${REACT_APP_SECRET_KEY_REFERENSI}`
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
                title: "Uraian",
                dataIndex: "uraian",
                key: 2,
                ...this.getColumnSearchProps('uraian'),
            },
            {
                title: "Jumlah",
                dataIndex: "jumlahSatuan",
                key: 3,
            },
            {
                title: "Satuan",
                dataIndex: "kodeSatuanBarang",
                key: 4,
            }
        ]
        return (
            <div id={this.props.requiredDetail === true ? "error" : ""}
            >

                {this.state.dataDokumen !== null ? (this.state.dataDokumen.header.kodeDokumen === "34" ? (
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
                            {/* <Row gutter={8}>
                            <Col span={4}>
                                <p>Kategori Barang</p>
                            </Col>
                            <Col span={20}>
                                <Select
                                    placeholder="Pilih Kategori"
                                    showArrow={false}
                                    notFoundContent={this.state.fetchingKodeJenisPungutan ? <Spin size="small" /> : null}
                                    showSearch
                                    style={{ width: "100%" }}
                                    optionFilterProp="children"
                                    onChange={e => { this.setState({ searchKodeJenisPungutan: e }); }}
                                    // value={this.state.searchKodeJenisPungutan}
                                    // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {this.state.dataKodeJenisPungutan !== undefined ? this.state.dataKodeJenisPungutan.map(d => (
                                        <Option key={d.value}>{d.text}</Option>
                                    )) : ""}
                                </Select>
                            </Col>
                        </Row> */}
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
                            <Row gutter={8}>
                                <Col span={4}>
                                    <p>Spesifikasi</p>
                                </Col>
                                <Col span={20}>
                                    <Input
                                        onChange={e => { this.setState({ spesifikasiLain: e.target.value }); }}
                                        value={
                                            this.state.spesifikasiLain === null
                                                ? null
                                                : this.state.spesifikasiLain
                                        }
                                        readOnly={this.state.readOnly}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={8}>
                                <Col span={4}>
                                    <p>Merk <span style={{ color: 'red' }}>*</span></p>
                                </Col>
                                <Col span={20}>
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
                            </Row>
                            <Row gutter={8}>
                                <Col span={4}>
                                    <p>Tipe <span style={{ color: 'red' }}>*</span></p>
                                </Col>
                                <Col span={20}>
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
                                    <p>Ukuran</p>
                                </Col>
                                <Col span={20}>
                                    <Input
                                        onChange={e => { this.setState({ ukuran: e.target.value }); }}
                                        value={
                                            this.state.ukuran === null
                                                ? null
                                                : this.state.ukuran
                                        }
                                        readOnly={this.state.readOnly}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={8}>
                                <Col span={4}>
                                    <p>Kode Barang</p>
                                </Col>
                                <Col span={20}>
                                    <Input
                                        onChange={e => { this.setState({ kodeBarang: e.target.value }); }}
                                        value={
                                            this.state.kodeBarang === null
                                                ? null
                                                : this.state.kodeBarang
                                        }
                                        readOnly={this.state.readOnly}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={8}>
                                <Col span={4}>
                                    <p>Jumlah Kemasan <span style={{ color: 'red' }}>*</span></p>
                                </Col>
                                <Col span={4}>
                                    <InputNumber
                                        pattern="[0-9]+[.0-9]*"
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                        value={this.state.jumlahKemasan}
                                        formatter={(value) =>
                                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        }
                                        style={{ width: '100%' }}
                                        placeholder={"0.000"}
                                        onChange={e => {
                                            if (typeof e !== "number") {
                                                this.setState({ visibleJumlahKemasan: true });
                                            } else {
                                                this.setState({ jumlahKemasan: e });
                                            }
                                        }
                                        }
                                        readOnly={this.state.readOnly}
                                    />
                                    {this.state.visibleJumlahKemasan ?
                                        <div style={{ color: 'red' }}><span>*</span><span>Harap memasukan angka saja!</span>
                                        </div> : null}

                                </Col>
                                <Col span={12}>
                                    <Select
                                        placeholder="Pilih Jenis Kemasan"
                                        showArrow={true}
                                        notFoundContent={this.state.fetchingReferensiKemasan ? <Spin size="small" /> : null}
                                        showSearch
                                        style={{ width: "100%" }}
                                        optionFilterProp="children"
                                        readOnly={this.state.readOnly}
                                        disabled={this.state.readOnly}
                                        value={this.state.kodeJenisKemasan}
                                        onChange={e => { this.setState({ kodeJenisKemasan: e }); }}
                                        // value={this.state.searchKodeJenisPungutan}
                                        // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.state.dataReferensiKemasan !== undefined ? this.state.dataReferensiKemasan.map(d => (
                                            <Option key={d.value}>{d.text}</Option>
                                        )) : ""}
                                    </Select>
                                </Col>
                            </Row>
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
                                                    if (!(this.state.jumlahSatuan === null || this.state.jumlahSatuan === undefined) && !(this.state.hargaSatuan === null || this.state.hargaSatuan === undefined) && (this.state.jumlahHarga === null || this.state.jumlahHarga === undefined || this.state.jumlahHarga === 0)) {
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
                                    {/* <Select
                                        placeholder="Cari Jenis Satuan"
                                        showArrow={false}
                                        readOnly={this.state.readOnly}
                                        disabled={this.state.readOnly}
                                        notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
                                        showSearch
                                        optionFilterProp="children"
                                        onChange={e => { this.setState({ kodeSatuanBarang: e }); }}
                                        value={this.state.kodeSatuanBarang}
                                        onSearch={(value) => this.fetchJenisSatuan(value)}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.state.dataJenisSatuan !== undefined ? this.state.dataJenisSatuan.map(d => (
                                            <Option key={d.value}>{d.text}</Option>
                                        )) : ""}
                                    </Select> */}
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
                                        // value={this.state.searchKodeJenisPungutan}
                                        // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.state.dataReferensiSatuan !== undefined ? this.state.dataReferensiSatuan.map(d => (
                                            <Option key={d.value}>{d.text}</Option>
                                        )) : ""}
                                    </Select>
                                </Col>
                            </Row>
                            {/* <Row gutter={8}>
                                <Col span={4}>
                                    <p>Kondisi Barang</p>
                                </Col>
                                <Col span={20}>
                                    <Select
                                        showSearch
                                        placeholder="Pilih satuan barang"
                                        optionFilterProp="children"
                                        style={{ width: '100%' }}
                                        onSearch={this.getSatuanBarang}
                                        onChange={this.getValueSatuanBarang}
                                        loading={this.state.fetchingSatuan}
                                        value={this.state.kodeSatuanBarang}
                                    >
                                        {this.state.satuanBarangAll !== undefined ? this.state.satuanBarangAll.map((item, index) => (
                                            <Option key={index}
                                                value={item.kodeSatuanBarang}>{item.kodeSatuanBarang}-{item.namaSatuanBarang}</Option>
                                        )) : ""}
                                    </Select>
                                </Col>
                            </Row> */}
                            <Row gutter={8}>
                                <Col span={4}>
                                    <p>Berat Bruto (kg)</p>
                                </Col>
                                <Col span={4}>
                                    {/* <InputNumber
                                    onChange={e => { this.setState({ bruto : e.target.value }); }}
                                    value={
                                        this.state.bruto === null || this.state.bruto === undefined
                                            ? 0
                                            : this.state.bruto
                                    }
                                /> */}
                                    <InputNumber
                                        pattern="[0-9]+[.0-9]*"
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                        value={this.state.bruto}
                                        formatter={(value) =>
                                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        }
                                        style={{ width: '100%' }}
                                        placeholder={"0.000"}
                                        readOnly={this.state.readOnly}
                                        onChange={this.onChangeDataBruto}
                                    />
                                    {this.state.visibleBruto ?
                                        <div style={{ color: 'red' }}><span>*</span><span>Harap memasukan angka saja!</span>
                                        </div> : null}
                                </Col>
                            </Row>
                            <Row gutter={8}>
                                <Col span={4}>
                                    <p>Kode Valuta <span style={{ color: 'red' }}>*</span></p>
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
                                        // value={this.state.searchKodeJenisPungutan}
                                        // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.state.dataReferensiValuta !== undefined ? this.state.dataReferensiValuta.map(d => (
                                            <Option key={d.value}>{d.text}</Option>
                                        )) : ""}
                                    </Select>
                                </Col>
                            </Row>
                            <Row gutter={8}>
                                <Col span={4}>
                                    <p>Harga Satuan <span style={{ color: 'red' }}>*</span></p>
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
                                    <p>Jumlah Harga <span style={{ color: 'red' }}>*</span></p>
                                </Col>
                                <Col span={8}>
                                    <InputNumber
                                        pattern="[0-9]+[.0-9]*"
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                        // value={this.state.jumlahHarga === null || this.state.jumlahHarga === undefined ? (
                                        //     !(this.state.jumlahSatuan === null || this.state.jumlahSatuan === undefined) && !(this.state.hargaSatuan === null || this.state.hargaSatuan === undefined) ?
                                        //         (this.state.jumlahSatuan * this.state.hargaSatuan) : this.state.jumlahHarga) : this.state.jumlahHarga}
                                        value={!(this.state.jumlahSatuan === null || this.state.jumlahSatuan === undefined) && !(this.state.hargaSatuan === null || this.state.hargaSatuan === undefined) ?
                                            (this.state.jumlahSatuan * this.state.hargaSatuan) : this.state.jumlahHarga}
                                        formatter={(value) =>
                                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        }
                                        style={{ width: '100%' }}
                                        placeholder={"0.000"}
                                        readOnly
                                        onChange={e => {
                                            if (typeof e !== "number") {
                                                this.setState({ visibleJumlah: true });
                                            } else {
                                                this.setState({ jumlahHarga: e });
                                            }
                                        }
                                        }
                                    />
                                    {this.state.visibleJumlah ?
                                        <div style={{ color: 'red' }}><span>*</span><span>Harap memasukan angka saja!</span>
                                        </div> : null}
                                </Col>
                            </Row>
                            <Row gutter={8}>
                                <Col span={4}>
                                    <p>Flag Lartas <span style={{ color: 'red' }}>*</span></p>
                                </Col>
                                <Col span={8}>
                                    <Select
                                        placeholder="Pilih Flag Lartas"
                                        allowClear
                                        onChange={e => { this.setState({ pernyataanLartas: e }); }}
                                        value={this.state.pernyataanLartas}
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
                            {this.state.showDataKeluarga ?
                                <Row>
                                    <Col span={12}>
                                        <Checkbox
                                            checked={this.state.barangTidakBersamaan}
                                            disabled={this.state.disabled}
                                            onChange={this.onChange}
                                            readOnly={this.state.readOnly}
                                        >
                                            Barang Tidak Datang Bersamaan
                                            {/* <p className={'text-red'}>Barang Tidak Datang Bersamaan</p> */}
                                        </Checkbox>
                                    </Col>
                                </Row>
                                : null}
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
