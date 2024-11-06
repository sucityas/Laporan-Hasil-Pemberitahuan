import React, {Component} from 'react';
import DataGrid, {
    Column,
    ColumnChooser,
    ColumnFixing,
    RemoteOperations,
    Paging,
    Pager,
    SearchPanel
} from 'devextreme-react/data-grid';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import axios from "axios";

class PpnLampB3Table extends Component {
    componentDidMount() {
        let options = {
            // Data processing settings are specified here
        };
        store.load(options)
            .then(
                (data) => { /* Process "data" here */ },
                (error) => { /* Handle the "error" here */ }
            );
    }

    render() {
        return (
            <div>
                <DataGrid
                    id={'gridContainer'}
                    dataSource={store}
                    allowColumnReordering={true}
                    allowColumnResizing={true}
                    columnAutoWidth={true}
                    showBorders={true}
                    className={'table'}
                >
                    <ColumnChooser enabled={true}/>
                    <ColumnFixing enabled={true}/>
                    <RemoteOperations
                        sorting={true}
                        paging={true}
                        filtering={true}
                    />
                    <Paging defaultPageSize={12}/>
                    <Pager
                        showPageSizeSelector={true}
                        allowedPageSizes={[8, 12, 20]}
                        showInfo={true}
                    />
                    <SearchPanel defaultText={this.props.Query} />
                    <Column caption={'ID'} dataField={'id'}/>
                    <Column caption={'NPWP'} dataField={'npwp'}/>
                    <Column caption={'KPP'} dataField={'kpp'}/>
                    <Column caption={'Cabang'} dataField={'cab'}/>
                    <Column caption={'Nama'} dataField={'nama'}/>
                    <Column caption={'Tahun'} dataField={'tahun'}/>
                    <Column caption={'Masa'} dataField={'masa'}/>
                    <Column caption={'Pembetulan'} dataField={'pemb'}/>
                    <Column caption={'Jenis Dokumen'} dataField={'jnsdok'}/>
                    <Column caption={'NPWP Lawan'} dataField={'npwpLawan'}/>
                    <Column caption={'Nama Lawan'} dataField={'namaLawan'}/>
                    <Column caption={'Kd Trx'} dataField={'kdtrans'}/>
                    <Column caption={'No Seri FP'} dataField={'noserifaktur'}/>
                    <Column caption={'Tgl Faktur'} dataField={'tglfaktur'}/>
                    <Column caption={'DPP'} dataField={'dpp'}/>
                    <Column caption={'PPN'} dataField={'ppn'}/>
                    <Column caption={'PPNBM'} dataField={'ppnbm'}/>
                    <Column caption={'Faktur Pengganti'} dataField={'fakturpengganti'}/>
                </DataGrid>
            </div>
        );
    }
}
const store =  new CustomStore({
    load: function (loadOptions) {
        console.log('ini load option' + JSON.stringify(loadOptions));
        console.log('ini Query ' + loadOptions.filter);
        let params = '?';

        params += `skip=${loadOptions.skip}`;
        params += `&pageSize=${loadOptions.take}`;


        if (loadOptions.sort) {
            params += `&orderBy=${loadOptions.sort[0].selector}`;
            if (loadOptions.sort[0].desc) {
                params += ' desc';
            }
        }
        if (loadOptions.filter) {
            params += `&param=${loadOptions.filter[0][2]}`;
            return axios.get(process.env.REACT_APP_SCE_WS + `/pajak/ppn-lamp-b3/list-paging${params}`, {
                    headers: {
                        'customs-api-key': process.env.REACT_APP_SECRET_KEY_SCE_WS
                    }
                })
                .then(res => {
                    return {
                        data: res.data.items,
                        totalCount: res.data.totalCount
                    };
                });
        } else {
            return fetch(`#`)
                .then(() => {
                    return {
                        data: [],
                        totalCount: 0
                    };
                });
        }

    }
});
export default PpnLampB3Table;
