import React, {Component} from "react";
import {DatePicker, Input, Spin, Select, AutoComplete, message} from "antd";
import SubHeader from '../header/SubHeader';
import moment from 'moment';
import axios from "axios";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import Geocode from "react-geocode";
// import EvaluasiTable from "../../pages/evaluasi/EvaluasiKepalaKantor";
// import {filterToQuery} from "../../appRedux/actionCreators/QueryActionCreator";
// import {evaluasiFields} from "../../appRedux/querybuilder/fields";

const {Option} = Select;

// const url = process.env.REACT_APP_SCE_WS;
const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;
function renderOption(item) {
    return item.npwp+", "+item.namaPerusahaan;
}

class FormRekamTpb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            npwp: "",
            namaPerusahaan: "",
            alamatPerusahaan: "",
            longitude: "",
            latitude: "",
            jenisTpb: "",
            kodeKantor: "",
            namaKantor: "",
            noKep: "",
            tglKep: null,
            tglAwal: null,
            tglAkhir: null,
            refJenisTpb: [],
            refKantor: [],
            loadingForm: true,
            address: "",
            city: "",
            area: "",
            state: "",
            postal_code: "",
            route: "",
            street_number: "",
            mapZoom:5
        };
        this.onChangeAlamatPerusahaan = this.onChangeAlamatPerusahaan.bind(this);
        this.onChangeJenisTpb = this.onChangeJenisTpb.bind(this);
        this.onChangeKodeKantor = this.onChangeKodeKantor.bind(this);
        this.onChangeNoKep = this.onChangeNoKep.bind(this);
        this.onChangeTglKep = this.onChangeTglKep.bind(this);
        this.onChangeTglAwal = this.onChangeTglAwal.bind(this);
        this.onChangeTglAkhir = this.onChangeTglAkhir.bind(this);
    }

    componentDidMount() {
        var listJenisTpb = localStorage.getItem('listJenisTpb');
        if (listJenisTpb === null) {
            axios.get(`${process.env.REACT_APP_SCE_WS}/skep-tpb/list-jenis-tpb`, {
                headers: {
                    'customs-api-key': process.env.REACT_APP_SECRET_KEY_SCE_WS
                }
            })
                .then(res => {
                    this.setState({
                        loadingForm: false,
                        refJenisTpb: res.data
                    });
                    localStorage.setItem('listJenisTpb', JSON.stringify(res.data));
                });
        } else {
            this.setState({
                loadingForm: false,
                refJenisTpb: JSON.parse(listJenisTpb)
            })
        }

        var listKantor = localStorage.getItem('listKantor');
        if (listKantor === null) {
            axios.get(`http://10.161.4.89:8080/Referensi/v1/kantor/all`)
                .then(res => {
                    this.setState({
                        refKantor: res.data.data
                    });
                    localStorage.setItem('listKantor', JSON.stringify(res.data. data));
                });
        } else {
            this.setState({
                refKantor: JSON.parse(listKantor)
            })
        }
    }

    onClickMap = (e) => {
        this.setState({
            latitude: e.latLng.lat(),
            longitude: e.latLng.lng(),
        });
        Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
            response => {
                const address = response.results[0].formatted_address;
                this.setState({
                    alamatPerusahaan: address
                });
            },
            error => {
                console.error(error);
            }
        );
    };

    onChangeAlamatPerusahaan(event) {
        this.setState({
            alamatPerusahaan: event.target.value
        })
    }

    onChangeJenisTpb(data) {
        this.setState({
            jenisTpb: data
        })
    }

    onChangeKodeKantor(event) {
        this.setState({
            kodeKantor: event
        })
    }

    onChangeNoKep(event) {
        this.setState({
            noKep: event.target.value
        })
    }

    onChangeTglKep(date) {
        this.setState({
            tglKep: (date !== null ? date.format("YYYY-MM-DDTHH:mm:ss.SSSZZ") : null)
        })
    }

    onChangeTglAwal(date) {
        this.setState({
            tglAwal: (date !== null ? date.format("YYYY-MM-DDTHH:mm:ss.SSSZZ") : null)
        })
    }

    onChangeTglAkhir(date) {
        this.setState({
            tglAkhir: (date !== null ? date.format("YYYY-MM-DDTHH:mm:ss.SSSZZ") : null)
        })
    }
    componentWillMount() {
        this.timer = null;
    }

    handleChange(value) {
        clearTimeout(this.timer);

        this.setState({ Query: value.target.value });

        this.timer = setTimeout(this.triggerChange.bind(this), WAIT_INTERVAL);
    }

    handleKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            this.triggerChange.bind(this);
        }
    }
    onSearch = searchText => {
        clearTimeout(this.timer);

        this.setState({ npwp: searchText });

        this.timer = setTimeout(this.triggerChange.bind(this), WAIT_INTERVAL);
    };

    triggerChange() {
        axios.get(`${process.env.REACT_APP_SCE_WS}/profil/perusahaan/list-paging?param=(npwp%20like%20%22%25${this.state.npwp}%25%22)`, {
                headers: {
                    'customs-api-key': process.env.REACT_APP_SECRET_KEY_SCE_WS
                }
            })
            .then(res => {
                this.setState({
                    dataSource: res.data.items
                });
            });
    }

    onSelectAutoComplate(value) {
        this.setState({
            npwp: value.split(", ")[0],
            namaPerusahaan: value.split(", ")[1]
        })
    }

    onSubmitForm() {
        var data = {
            perusahaanSkepFasilitas:{
                idPerusahaanSkepFasilitas: "",
                idPerusahaanPajak: this.state.npwp,
                nomorSkep: this.state.noKep,
                tanggalSkep: this.state.tglKep,
                kodeSkep: "TPB",
                awalBerlaku: this.state.tglAwal,
                akhirBerlaku: this.state.tglAkhir,
                flagCabut: "",
                noSkepCabut: "",
                tglSkepCabut: "",
                tglCabut: "",
                nipCabut: "",
                waktuRekam: "",
                periodePembebasanKite: "",
                keterangan: "",
                nipRekam: "",
                kodeJenisPlb: "",
                kodeJenisLayanan: "",
                passwordItInventory: "",
                urlItInventory: "",
                userItInventory: "",
                idPerusahaanPlbInduk: "",
                alamatTpb: this.state.alamatPerusahaan,
                longitude: this.state.longitude,
                latitude: this.state.latitude
            },
            perusahaanSkepFasilitasKantor:{
                idPerusahaanSkepFasilitasKantor: "",
                idPerusahaanSkepFasilitas: "",
                kodeKantor: this.state.kodeKantor,
                niper: "",
                agendaNiper: "",
                kodeJenisNiper: "",
                kodeJenisTpb: this.state.jenisTpb,
                namaKantorPendek: this.state.namaKantor
            }
        };
        const options = {
            method: 'POST',
            url: `${process.env.REACT_APP_SCE_WS}/skep-tpb/save-skep-tpb`,
            data: data,
            headers: {
                    'customs-api-key': process.env.REACT_APP_SECRET_KEY_SCE_WS
                }
        };
        this.setState({
            loadingForm: true
        });
        axios(options)
            .then(res => {
                message.success('Data berhasil disimpan');
                this.setState({
                    npwp: "",
                    namaPerusahaan: "",
                    alamatPerusahaan: "",
                    longitude: "",
                    latitude: "",
                    jenisTpb: "",
                    kodeKantor: "",
                    namaKantor: "",
                    noKep: "",
                    tglKep: null,
                    tglAwal: null,
                    tglAkhir: null,
                    refJenisTpb: [],
                    refKantor: [],
                    loadingForm: false,
                    address: "",
                    city: "",
                    area: "",
                    state: "",
                    postal_code: "",
                    route: "",
                    street_number: "",
                    mapZoom:5
                });

            }).catch(error => {
            message.error('Data gagal disimpan');
            this.setState({
                loadingForm: false
            });
        });
    }

    AsyncMap = withScriptjs(
        withGoogleMap(props => (
            <GoogleMap
                onClick={props.onClick}
                defaultZoom={this.state.mapZoom}
                defaultCenter={this.state.longitude===""?({lat:-4.4678001, lng:119.8190849}):({lat:parseFloat(this.state.latitude), lng:parseFloat(this.state.longitude)})}
            >
                {props.children}
            </GoogleMap>
        ))
    );

    render() {

        return (
            <div>
                <SubHeader subHeaderTitle="Case Management" breadcrumbs="Rekam TPB"/>
                {this.state.loadingForm ? (<div className="row">
                    <div className="col text-center"><Spin/></div>
                </div>) : (
                    <div>
                        <div className="kt-portlet">
                            <div className="kt-portlet__body">
                                <div className="kt-widget3">
                                    <div className="kt-widget3__item">
                                        <div className="kt-widget3__header">
                                            <div className="kt-widget3__user-img">
                                                <div className="kt-widget__icon">
                                                    <i className="flaticon-file-1 fa-3x"></i>
                                                </div>
                                            </div>
                                            <div className="kt-widget3__info">
                                    <span className="kt-widget3__username">
                                        Form Perekaman Data TPB
                                    </span> <br/>
                                                <span className="kt-widget3__time">
                                        Detail data Tempat Penimbunan Berikat yang dilakukan perekaman.
                                    </span>
                                            </div>
                                            <span className="kt-widget3__status kt-font-info"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="kt-form kt-form--label-right">
                                            <div className="form-group row">
                                                <div className="col-lg-12">
                                                    <label>PERUSAHAAN</label>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-lg-6">
                                                    <label>NPWP</label>
                                                    <div className="kt-input-icon">
                                                        {/*<Input size="large"*/}
                                                               {/*onChange={this.onChangeNpwp.bind(this)}*/}
                                                               {/*value={this.state.npwp}*/}
                                                        {/*/>*/}
                                                        <AutoComplete
                                                            value={this.state.npwp}
                                                            size="large"
                                                            dataSource={this.state.dataSource===undefined?([]):(this.state.dataSource.map(renderOption))}
                                                            style={{ width: "100%" }}
                                                            onSearch={this.onSearch}
                                                            onSelect={this.onSelectAutoComplate.bind(this)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <label>Nama Perusahaan</label>
                                                    <div className="kt-input-icon">
                                                        <Input size="large" disabled={true} value={this.state.namaPerusahaan} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-lg-12">
                                                    <label>Select By Map</label>
                                                    <this.AsyncMap
                                                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
                                                        loadingElement={<div style={{height: `100%`}}/>}
                                                        containerElement={<div style={{height: 600}}/>}
                                                        mapElement={<div style={{height: `100%`}}/>}
                                                        onClick={this.onClickMap.bind(this)}
                                                    >
                                                        {this.state.longitude===""?(<></>):(
                                                            <Marker
                                                                google={this.props.google}
                                                                draggable={false}
                                                                position={{
                                                                    lat: parseFloat(this.state.latitude),
                                                                    lng: parseFloat(this.state.longitude)
                                                                }}
                                                            />
                                                        )}
                                                    </this.AsyncMap>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-lg-12">
                                                    <label>Alamat</label>
                                                    <div className="kt-input-icon">
                                                        <Input size="large"
                                                               onChange={this.onChangeAlamatPerusahaan}
                                                               value={this.state.alamatPerusahaan}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-lg-6">
                                                    <label>Longitude</label>
                                                    <div className="kt-input-icon">
                                                        <Input size="large"
                                                               value={this.state.longitude}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <label>Latitude</label>
                                                    <div className="kt-input-icon">
                                                        <Input size="large"
                                                               value={this.state.latitude}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-lg-6">
                                                    <label>Jenis TPB</label>
                                                    <div className="kt-input-icon">
                                                        <Select
                                                            onChange={this.onChangeJenisTpb}
                                                            showSearch
                                                            size='large'
                                                            style={{width: '100%'}}
                                                            placeholder="Pilih Jenis TPB"
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) =>
                                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                            }
                                                        >
                                                            {this.state.refJenisTpb.map((data,key) => (
                                                                <Option key={key} value={data.kodeJenisTpb}>
                                                                    {data.kodeJenisTpb} - {data.uraian}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <label>Kantor</label>
                                                    <div className="kt-input-icon">
                                                        <Select
                                                            onChange={this.onChangeKodeKantor}
                                                            showSearch
                                                            size='large'
                                                            style={{width: '100%'}}
                                                            placeholder="Pilih Kantor Pabean"
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) =>
                                                                option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                            }
                                                        >
                                                            {this.state.refKantor.map((data,key) => (
                                                                <Option key={key} value={data.kodeKantor}>
                                                                    {data.kodeKantor} - {data.namaKantorPendek}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-lg-8">
                                                    <label>Nomor KEP</label>
                                                    <div className="kt-input-icon">
                                                        <Input size="large"
                                                               onChange={this.onChangeNoKep}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <label className="">Tanggal KEP</label>
                                                    <div className="kt-input-icon">
                                                        <DatePicker size="large"
                                                                    style={{width:'100%'}}
                                                                    onChange={this.onChangeTglKep}
                                                                    value={this.state.tglKep !== null ? moment(this.state.tglKep) : null}
                                                                    format={'DD-MM-YYYY'}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-lg-6">
                                                    <label>Awal Berlaku</label>
                                                    <div className="kt-input-icon">
                                                        <DatePicker size="large"
                                                                    style={{width:'100%'}}
                                                                    onChange={this.onChangeTglAwal}
                                                                    value={this.state.tglAwal !== null ? moment(this.state.tglAwal) : null}
                                                                    format={'DD-MM-YYYY'}/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <label>Akhir Berlaku</label>
                                                    <div className="kt-input-icon">
                                                        <DatePicker size="large"
                                                                    style={{width:'100%'}}
                                                                    onChange={this.onChangeTglAkhir}
                                                                    value={this.state.tglAkhir !== null ? moment(this.state.tglAkhir) : null}
                                                                    format={'DD-MM-YYYY'}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <button type="reset" className="btn btn-primary"
                                                        onClick={this.onSubmitForm.bind(this)}
                                                    >Simpan
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default FormRekamTpb;
