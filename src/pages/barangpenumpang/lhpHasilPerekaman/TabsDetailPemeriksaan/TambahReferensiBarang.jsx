import React, {Component} from 'react';
import {Input, Form,} from 'antd';
import DataGrid, {Column, SearchPanel} from 'devextreme-react/data-grid';
const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP
} = process.env;

class TambahReferensiBarang extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onSelectionChanged = this.onSelectionChanged.bind(this);

    }

    componentDidMount() {
        let idheader = localStorage.getItem("idHeader");
        fetch(`${REACT_APP_LHP}/referensi-detail/${idheader}/items`, {
            headers: {
                'accept': 'application/json',
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`
            },
        })
            .then(response => response.json())
            .then(body => {
                this.setState(
                    {
                        hasil: body.listData,
                        loading: false
                    })

            });


    }

    onSelectionChanged(selectedRowsData) {
        const data = selectedRowsData.key;

        console.log(data);
        //
        // this.props.setInput('uraianBarang', data.uraian);
        // // this.props.setInput('jumlahSatuan',data.jumlahSatuan);
        // this.props.setInput('kodeJenisSatuan', data.kodeSatuanBarang);
    }

    render() {
        const {hasil} = this.state;
        return (
            <div>
                <DataGrid
                    dataSource={hasil}
                    showBorders={true}
                    allowColumnReordering={true}
                    allowColumnResizing={true}
                    columnAutoWidth={true}
                    showColumnLines={true}
                    selection={{mode: 'single'}}
                    hoverStateEnabled={true}
                    onRowClick={this.onSelectionChanged}
                >
                    <SearchPanel
                        visible={true}
                        placeholder={"Cari..."}
                        width={200}
                    />
                    <Column
                        dataField={'uraian'}
                        caption={'Uraian'}/>
                    <Column
                        dataField={'jumlahSatuan'}
                        caption={'Jumlah'}/>
                    <Column
                        dataField={'namaSatuanBarang'}
                        caption={'Satuan Barang'}/>
                    <Column
                        dataField={'seriBarang'}
                        caption={'Seri Barang'}/>
                    <Column
                        dataField={'hsCode'}
                        caption={'Kode HS'}/>
                </DataGrid>
            </div>
        )
    }
}
export default TambahReferensiBarang;
