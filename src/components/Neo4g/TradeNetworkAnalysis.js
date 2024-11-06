import React, {Component} from 'react';
import DataGrid, {
    Column,
    Button,
    Editing,
    Popup,
    Lookup,
    Form,
    Selection,
    ColumnChooser,
    ColumnFixing,
    RemoteOperations,
    Paging,
    Pager,
    SearchPanel,
    FilterRow
} from 'devextreme-react/data-grid';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import axios from 'axios';

var url = "";
var npwpnya = "";

class NetworkAnalysis extends Component {
    componentDidMount() {
        store.load({});
        console.log(npwpnya);
    }



    constructor(props) {
        super(props);
        npwpnya = this.props.npwp;
        url =  this.props.url;
        this.state = {
            cypherSelected: '',
        };
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
    }



    onSelectionChanged({ selectedRowsData }) {
        const data = selectedRowsData[0];
        // console.log(data)
        this.setState({
            cypherSelected: data && data.cypherQuery,
        });
    }
    render() {
        // return (
        //     <div style={{marginTop : "50px"}}>
        //         <div className="kt-portlet">
        //             <iframe src={"/neo4g/network_analysis_trade.html?npwp="+this.props.npwp} width="100%" height="890" style={{border: 0}}></iframe>
        //         </div>
        //     </div>
        // );

        return (
            <div>
                <div style={{padding : "10px"}}  className="kt-portlet">
                    <DataGrid

                        onSelectionChanged={this.onSelectionChanged}
                        id={'gridContainer'}
                        dataSource={store}
                        allowColumnReordering={true}
                        allowColumnResizing={true}
                        columnAutoWidth={true}
                        showBorders={true}
                        className={'table'}
                        remoteOperations={true}
                        hoverStateEnabled={true}

                    >
                        {/*<ColumnChooser enabled={true} />*/}
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


                        <FilterRow visible={true} />
                        <SearchPanel defaultText='' />
                        <Selection mode="single" />
                        <Column caption={'NPWP IMPOR'} dataField={'npwpImpor'}  filterOperations={['contains']}/>
                        <Column caption={'NPWP EKSPOR'} dataField={'npwpEkspor'}  filterOperations={['contains']}/>
                        <Column caption={'HSCODE'} dataField={'hscode'}  filterOperations={['contains']}/>
                        <Column caption={'AJU IMPOR'} dataField={'ajuImpor'}  filterOperations={['contains']}/>
                        <Column caption={'AJU EKSPOR'} dataField={'ajuEkspor'}  filterOperations={['contains']}/>
                        <Column caption={'TGL IMPOR'} dataField={'tglImpor'}  filterOperations={['contains']}/>
                        <Column caption={'TGL EKSPOR'} dataField={'tglEkspor'}  filterOperations={['contains']}/>
                        <Column caption={'JENIS'} dataField={'jenis'}  filterOperations={['contains']}/>

                        {/*<Button hint="Clone" icon="copy" onClick={this.cloneIconClick} />*/}
                    </DataGrid>
                </div>
                             <div className="kt-portlet">
                                 <iframe src={"/neo4g/network_analysis_trade.html?cypher="+this.state.cypherSelected} width="100%" height="850px" style={{border: 0}}></iframe>
                             </div>
            </div>

        );
    }
}



const store =  new CustomStore({
    load: function (loadOptions) {
        let params = '?';
        // console.log('load option');
        // console.log(loadOptions.filter);
        // console.log(loadOptions);
        // console.log('load option');
        params += `skip=${loadOptions.skip}`;
        params += `&pageSize=${loadOptions.take}`;


        if (loadOptions.sort) {
            params += `&orderBy=${loadOptions.sort[0].selector}`;
            if (loadOptions.sort[0].desc) {
                params += ' desc';
            }
        }

        params += '&npwp='+npwpnya;

        if (loadOptions.filter) {
            params += `&param=${JSON.stringify(loadOptions.filter)}`;
            console.log(params)
            return axios.get(process.env.REACT_APP_SCE_WS + `/profil/perusahaan/list-circum${params}`, {
            // return axios.get( `http://10.102.104.142:8688/sce-ws/profil/perusahaan/list-circum${params}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
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

            return axios.get(process.env.REACT_APP_SCE_WS + `/profil/perusahaan/list-circum${params}`, {
            // return axios.get(`http://10.102.104.142:8688/sce-ws/profil/perusahaan/list-circum${params}`, {
                headers: {
                     'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'customs-api-key': process.env.REACT_APP_SECRET_KEY_SCE_WS
                }
            })
                .then(res => {
                    return {
                        data: res.data.items,
                        totalCount: res.data.totalCount
                    };
                });
        }

    }
});

export default NetworkAnalysis;
