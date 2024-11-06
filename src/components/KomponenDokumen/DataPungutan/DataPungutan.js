import React, {Component} from 'react';
import Apidata, {apiUrl4} from '../../../apis/ApiData';
import CustomStore from "devextreme/data/custom_store";
import {Column, DataGrid, Editing, FilterRow, Pager, Paging, RemoteOperations} from 'devextreme-react/data-grid';
import DevExpressCustom from '../DevExpressCustom/DevExpressCustom';
import Async from 'react-async';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import LoadingContent from "../../LoadingContent";
import {Result} from "antd";

const idHeader = window.localStorage.getItem('idHeader')
const dok_url = Apidata.api_data_dokumen_bc_20;
const buttonData = ['delete', 'save', 'cancel'];

const dataDummy = [];

const dataStore = new ArrayStore({
    key: 'keterangan',
    data: dataDummy
});

const dataSource = new DataSource({
    store: dataStore,
    reshapeOnPush: true
});

class DataPungutan extends Component {


    constructor(props) {
        super(props)
        this.state = {};


        this.getDataPungutan = this.getDataPungutan.bind(this)
        this.setDataHeader = this.setDataHeader.bind(this);


        if (idHeader) {
            this.getDataPungutan()
        }
    }


    addTableData(item) {

        item.dibayar = item.dibayar == null ? "-" : parseInt(item.dibayar);
        item.diTanggungPemerintah = item.diTanggungPemerintah == null ? "-" : parseInt(item.diTanggungPemerintah);
        item.ditangguhkan = item.ditangguhkan == null ? "-" : parseInt(item.ditangguhkan);
        item.berkala = item.berkala == null ? "-" : parseInt(item.berkala);
        item.dibebaskan = item.dibebaskan == null ? "-" : parseInt(item.dibebaskan);
        item.tidakDipungut = item.tidakDipungut == null ? "-" : parseInt(item.tidakDipungut);
        item.sudahDilunasi = item.sudahDilunasi == null ? "-" : parseInt(item.sudahDilunasi);
        item.dijaminkan = item.dijaminkan == null ? "-" : parseInt(item.dijaminkan);
        item.ditunda = item.ditunda == null ? "-" : parseInt(item.ditunda);

        dataStore.push([{type: 'insert', key: item["keterangan"], data: item}])
    }

    setDataHeader(val) {

        this.setState({idHeader: val})

        console.log(this.state.idHeader)
    }


    async getDataPungutan() {
        await this.setState({idHeader});
        dataStore.clear()
        dataSource.reload()
        this.setState({fetching: true})
        let data = await fetch(`${apiUrl4}/SingleCoreSchema/v1/TtPungutan/pungutanForShowTime/${idHeader}`, {
            header: {'accept': 'application/json', 'Access-Control-Allow-Origin': '*'},
        })
            .then(response => response.json())
            .then(body => {
                if (body.data.length > 0) {
                    let total = new Object();

                    body.data = body.data.filter(e => e.dibayar != null || e.diTanggungPemerintah != null || e.ditangguhkan != null || e.berkala != null || e.dibebaskan || e.tidakDipungut != null || e.sudahDilunasi != null || e.dijaminkan != null || e.ditunda != null)
                    total = body.data.reduce((a, b) => ({
                        keterangan: "Total",
                        dibayar: a.dibayar + parseInt(b.dibayar ? b.dibayar : 0 ),
                        diTanggungPemerintah: a.diTanggungPemerintah + parseInt(b.diTanggungPemerintah ? b.diTanggungPemerintah : 0),
                        ditangguhkan: a.ditangguhkan + parseInt(b.ditangguhkan ? b.ditangguhkan : 0),
                        berkala: a.berkala + parseInt(b.berkala ? b.berkala : 0),
                        dibebaskan: a.dibebaskan + parseInt(b.dibebaskan ? b.dibebaskan : 0),
                        tidakDipungut: a.tidakDipungut + parseInt(b.tidakDipungut ? b.tidakDipungut : 0),
                        sudahDilunasi: a.sudahDilunasi + parseInt(b.sudahDilunasi ? b.sudahDilunasi : 0),
                        dijaminkan: a.dijaminkan + parseInt(b.dijaminkan ? b.dijaminkan : 0),
                        ditunda: a.ditunda + parseInt(b.ditunda ? b.ditunda : 0)
                    }));

                    console.log(body.data);

                    body.data.push(total)
                    body.data.map((item) => this.addTableData(item))
                }
            })
            .catch(e => console.log(e))
    }


    render() {
        return (
            <Async promiseFn={this.getDataPungutan}>
                <Async.Loading> <LoadingContent/> </Async.Loading>
                <Async.Resolved>
                    <div className="kt-portlet__body">
                        <DevExpressCustom data={dataSource}>

                            {/*data di bawah sini children value yang merepretasikan data header*/}
                            <Column dataField={'keterangan'} caption={'Keterangan'}/>
                            <Column dataField={'dibayar'} caption={'Dibayar'}/>
                            <Column dataField={'diTanggungPemerintah'} caption={'Ditangung Pemerintah'}/>
                            <Column dataField={'ditangguhkan'} caption={'Di Tangungkan'}/>
                            <Column dataField={'berkala'} caption={'Berkala '}/>
                            <Column dataField={'dibebaskan'} caption={'Di Bebaskan'}/>
                            <Column dataField={'tidakDipungut'} caption={'Tidak Di Pungut'}/>
                            <Column dataField={'sudahDilunasi'} caption={'Sudah Di Lunasi'}/>
                            <Column dataField={'dijaminkan'} caption={'Dijaminkan'}/>
                            <Column dataField={'ditunda'} caption={'Ditunda'}/>
                        </DevExpressCustom>
                    </div>
                </Async.Resolved>
                <Async.Rejected> <Result
                    status="500"
                    title="500"
                    subTitle="Terjadi Kesalahan Pada Server Silakan Reload Halaman Atau Kembali Nanti"
                /></Async.Rejected>
            </Async>

        );
    }
}

export default DataPungutan;
