import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Table, Input, Button, Icon, Tag, Pagination, DatePicker } from 'antd';
import { SET_DATA_PAGE } from '../../../appRedux/actionTypes/modelActionTypes';
import moment from 'moment';

class DevExpressCustom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchedColumn: '',
            formDate:moment(),
            renderIndex:0,
        };
    }

    onSelectionChanged = (e) => {
        const {
            idHeader,
            idProses,
            kontainer,
            jumlahKontainer,
            kodeDokumen,
            kodeProses
        } = e;
        // if (e.idHeader !== this.props.getCurrentRow.idHeader) {
            this.props.setPageData({
                pageData:{
                    kontainer: parseInt(jumlahKontainer, 10) || 0,
                    idHeader,
                    kodeDokumen,
                    kodeProses,
                    nip:'',
                    initial:false,
                    idProses,
                },
                hideForm:{
                    currentKontainer:false,
                    currentKemasan:false
                }
            });
        // }
    }
    
    setCustomStyle(rowData) {
        const color = rowData ? 'green' : 'red';
        return (
            <Tag color={color}>
                <b>{rowData || 0}</b>
            </Tag>
        )
    }
    
    handleDate = (val, clearFilters, field) => {
      console.log(val,'valvalvalval date')
      if (this.state.formDate && !val) this.handleReset(clearFilters, field)
      this.setState({
        formDate:val && val.format('YYYY-MM-DD')
      })

    }        
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            {
              dataIndex === 'tanggalDaftar' ?
              <DatePicker 
                showTime
                format={'DD-MM-YYYY HH:mm:ss'}
                placeholder="Select Time"
                onChange={(e, ea) => this.handleDate(e, clearFilters, dataIndex)}
                onOk={() => this.handleSearch(this.state.formDate && this.state.formDate.format('YYYY-MM-DD'), confirm, dataIndex)}
              /> 
                :
              <>
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
                <Button onClick={() => this.handleReset(clearFilters, dataIndex)} size="small" style={{ width: 90 }}>
                  Reset
                </Button>
              </>
            }
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        // onFilter: (value, record) => {
        //     console.log(value, record)
        //     return record[dataIndex]
        //         .toString()
        //         .toLowerCase()
        //         .includes(value.toLowerCase())
        // },
        onFilterDropdownVisibleChange: visible => {
            console.log(visible,'visible')
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        }
      });

      handleSearch = (val, confirm, dataIndex) => {
        console.log(val,dataIndex)
        this.props.onFilterChange(val, dataIndex)
        confirm();
        this.setState({
          searchText: val[0],
          searchedColumn: dataIndex,
          });
      };

      handleReset = (clearFilters, field) => {
        this.props.clearFilter(field)
        clearFilters();
        // this.setState({ searchText: '' });
      };

    columns = () => [
      {
        title: 'JENIS DOKUMEN',
        dataIndex: 'namaDokumen',
        align:'center',
        key: 'namaDokumen',
        ...this.getColumnSearchProps('namaDokumen'),
      },
      {
        title: 'Nomor Daftar',
        dataIndex: 'nomorDaftar',
        align:'center',
        key: 'nomorDaftar',
        ...this.getColumnSearchProps('nomorDaftar'),
      },
      {
        title: 'Tanggal Daftar',
        dataIndex: 'tanggalDaftar',
        align:'center',
        key: 'tanggalDaftar',
        ...this.getColumnSearchProps('tanggalDaftar'),
      },
      {
        title: 'NOMOR NPWP',
        align:'center',
        dataIndex: 'npwp',
        key: 'npwp',
        ...this.getColumnSearchProps('npwp'),
      },
      {
        title: 'Nama Perusahaan',
        dataIndex: 'namaPerusahaan',
        align:'center',
        key: 'namaPerusahaan',
        ...this.getColumnSearchProps('namaPerusahaan'),
      },
      {
        title: 'Jumlah Kontainer',
        dataIndex: 'jumlahKontainer',
        align:'center',
        key: 'jumlahKontainer',
        render:this.setCustomStyle,
        ...this.getColumnSearchProps('jumlahKontainer'),
      },
      {
        title: '',
        key: 'jumlahKontainer',
        align:'center',
        render:(text, record) => {
            return (
                <div onClick={() => this.onSelectionChanged(record)}>
                    <Icon type="edit" style={{fontSize:18}}/>
                </div>
            )
        }
      },

    ];
    render() {
        return (
            <>
                <Table pagination={false} columns={this.columns()} dataSource={this.props.dataSource} />  
                <div style={{marginTop:"20px"}}>
                    <Pagination
                        onChange={(e) => this.props.onPageChange(e)}
                        defaultCurrent={1}
                        defaultPageSize={7}
                        total={this.props.dataLength || 1}
                    />
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    getCurrentRow:state.pageIndex.dataPage
})

const dispatchToProps =(dispatch) => ({
    setPageData:(params) => dispatch({type:SET_DATA_PAGE, data:{...params}})
})

export default connect(mapStateToProps, dispatchToProps)(DevExpressCustom)
