import React, {Component,Fragment} from "react";
import {Button, Icon, Table} from "antd";
import ButtonGroup from "antd/es/button/button-group";

class App extends Component{
    render() {
        const data = [
            {
                key: '1',
                status: 'Perekaman Izin',
                mulai: '01-06-2019',
                selesai: '01-06-2019',
            },{
                key: '2',
                status: 'Validasi Sistem',
                mulai: '01-06-2019',
                selesai: '01-06-2019',
            },{
                key: '3',
                status: 'Penelitian Lapangan',
                mulai: '01-06-2019',
                selesai: '01-06-2019',
            },{
                key: '4',
                status: 'Penelitian Pemeriksa KPPBC',
                mulai: '01-06-2019',
                selesai: '01-06-2019',
            },{
                key: '5',
                status: 'Penelitian Kepala Seksi',
                mulai: '01-06-2019',
                selesai: '01-06-2019',
            },{
                key: '6',
                status: 'Penelitian Kepala Kantor KPPBC',
                mulai: '01-06-2019',
                selesai: '01-06-2019',
            },
        ];

        const columns = [
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: 'Waktu Mulai',
                dataIndex: 'mulai',
                key: 'mulai',
            },
            {
                title: 'Waktu Selesai',
                dataIndex: 'selesai',
                key: 'selesai',
            },
        ];

        const data2 = [
            {
                key: '1',
                status: 'Penerimaan Permohonan Izin',
                mulai: '01-06-2019',
                selesai: '01-06-2019',
            },{
                key: '2',
                status: 'Penolakan Permohonan Izin',
                mulai: '01-06-2019',
                selesai: '01-06-2019',
            },{
                key: '3',
                status: 'Persetujuan Izin',
                mulai: '01-06-2019',
                selesai: '01-06-2019',
            },
        ];

        const columns2 = [
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: 'Aksi',
                dataIndex: 'aksi',
                key: 'aksi',
                render: () => <ButtonGroup>
                    <Button type="primary"><Icon type="download" /></Button>
                </ButtonGroup>

            },
        ];

        return (
            <Fragment>
                <div className="kt-subheader kt-grid__item" id="kt_subheader">
                    <div className="kt-subheader__main">
                        <h3 className="kt-subheader__title">Status dan Respon</h3>
                        <span className="kt-subheader__separator kt-subheader__separator--v"/>
                    </div>
                </div>
                <div className="kt-portlet">
                    <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h5 className="kt-portlet__head-title kt-font-bolder">
                                Status Izin
                            </h5>
                        </div>
                    </div>
                    <Table columns={columns} dataSource={data} size={'middle'} style={{width:'100%'}}/>

                    <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h5 className="kt-portlet__head-title kt-font-bolder">
                                Respon Izin
                            </h5>
                        </div>
                    </div>
                    <Table columns={columns2} dataSource={data2} size={'middle'} style={{width:'100%'}}/>
                </div>
            </Fragment>
        );
    }
}

export default App