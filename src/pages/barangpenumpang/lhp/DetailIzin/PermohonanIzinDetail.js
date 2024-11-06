import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import 'antd/dist/antd.css';
import { Tabs, Button, Row, Form } from 'antd';
import StatusRespon from './StatusRespon';
import DataIzinDetail from './DataIzinDetail'
import DataBarangDetail from './DataBarangDetail'
import DataIzinDetailBC22 from './DataIzinDetailBC22'
import DataBarangDetailBC22 from './DataBarangDetailBC22'
import PernyataanBC22 from './PernyataanBC22'
import axios from "axios";
import swal from "sweetalert";

const connectFunction = connect();
const { TabPane } = Tabs;

function callback(key) {
    // console.log(key);
}
const indexDetail = connectFunction(
    class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                dataDokumen: null,
                edit: false,
                kodeDokumen: null
            };
            this.editData = this.editData.bind(this);
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            if (prevProps.data !== this.props.data) {
                // this.setState({
                //     uraianBarang: this.props.uraian,
                //     jumlahSatuan: this.props.jumlahSatuan,
                //     kodeSatuanBarang: this.props.kodeSatuanBarang

                // })
                // console.log("Detail Update: ", this.props.data)
                if (!(this.props.data === null || this.props.data === undefined)) {
                    this.setState({
                        dataDokumen: this.props.data,
                        showBarangTidakBersamaan: this.props.data.header.kodeDokumen === '22' ? true : false,
                        kodeDokumen: this.props.data.header.kodeDokumen
                    })
                }
            }
        }

        componentDidMount() {
            // console.log("Detail Mount: ", this.props.data)
            if (!(this.props.data === null || this.props.data === undefined)) {
                this.setState({
                    dataDokumen: this.props.data,
                    showBarangTidakBersamaan: this.props.data.header.kodeDokumen === '22' ? true : false,
                    kodeDokumen: this.props.data.header.kodeDokumen
                })
            }
            // this.getReferensi()
        }

        editData() {
            // console.log("Edit Data: ")
            this.setState({
                edit: !this.state.edit,
            })
        }

        render() {
            return (
                <Fragment>

                    <div className="kt-portlet kt-portlet--mobile">

                        <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                            <Tabs type="card">
                                <TabPane tab="Header" key="1">
                                    {this.state.kodeDokumen == '32' ? (<DataIzinDetail data={this.state.dataDokumen} readOnly={!this.state.edit} />) :
                                        (this.state.kodeDokumen == '22' ? (<DataIzinDetailBC22 data={this.state.dataDokumen} readOnly={!this.state.edit} />) :
                                            (<DataIzinDetail data={this.state.dataDokumen} readOnly={!this.state.edit} />))}
                                </TabPane>

                                {this.state.kodeDokumen == '22' ? (
                                    <TabPane tab="Pernyataan Barang" key="2">
                                        <PernyataanBC22 data={this.state.dataDokumen} readOnly={!this.state.edit} />
                                    </TabPane>
                                ) : null}

                                <TabPane tab="Barang" key="3">
                                    {this.state.kodeDokumen == '32' ? (<DataBarangDetail data={this.state.dataDokumen} readOnly={!this.state.edit} />) :
                                        (this.state.kodeDokumen == '22' ? (<DataBarangDetailBC22 data={this.state.dataDokumen} readOnly={!this.state.edit} />) :
                                            (<DataBarangDetail data={this.state.dataDokumen} readOnly={!this.state.edit} />))}
                                </TabPane>

                            </Tabs>

                        </div>
                    </div>
                </Fragment>
            )
        }
    }
);
export default indexDetail;