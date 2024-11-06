import {
  Button,
  Checkbox,
  Modal,
  Table,
  Pagination,
  Col,
  Row,
  Input,
  Icon,
} from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";
import React, { Component } from "react";

const { REACT_APP_PERIJINAN, REACT_APP_SECRET_KEY_PERIJINAN } = process.env;

class PerusahaanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedRows: [],
      data: [],
      loading: false,
      selectedData: [],
      perusahaan: [],
      aksesDimiliki: [],
      page: 1,
      size: 10,
    };

    this.aksesBlokirChange = this.aksesBlokirChange.bind(this);
    this.getAkses = this.getAkses.bind(this);
  }

  aksesGenerate(temp = []) {
    let temp2 = temp;
    temp.map((a, i) => {
      let result = [];
      const aksesDimiliki = a.aksesDimiliki ? a.aksesDimiliki.split(",") : [];
      aksesDimiliki.map((e) => {
        return this.props.jenisBlokir === "SELURUHNYA"
          ? result.push({ name: e, checked: true })
          : this.props.jenisBlokir === "SEBAGIAN"
            ? result.push({
              name: e,
              checked: false,
            })
            : result.push({
              name: e,
              checked:
                e === "PPJK (PENGUSAHA PENGURUSAN JASA KEPABEANAN)"
                  ? true
                  : false,
            });
      });
      return (temp2[i] = { ...temp2[i], result: result });
    });

    this.setState({
      data: temp2,
    });

    console.log(this.state.data, 'temp2')
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedData: selectedRows });
    this.getAkses(selectedRows[0].npwp);
  };

  componentDidMount() {
    this.getPemblokiran();
  }

  async getPemblokiran(current) {
    try {
      this.setState({
        loading: true,
        page: current,
      });
      const isLocalhost =
        window.location.host == "ceisa40-dev.customs.go.id" || "localhost:3150";
      const res = await axios.get(
        `${REACT_APP_PERIJINAN}/v1/perusahaan/dataPerusahaan?page=${this.state.page}&size=${this.state.size}`,
        {
          headers: {
            [isLocalhost
              ? "beacukai-api-key"
              : "customs-api-key"]: `${REACT_APP_SECRET_KEY_PERIJINAN}`,
          },
        }
      );

      if (res.status === 200) {
        this.setState({
          perusahaan: res.data.data,
          total: res.data.total,
        });
      }
    } catch (error) {
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  async getAkses(npwp) {
    try {
      this.setState({
        loading: true,
      });
      const isLocalhost =
        window.location.host == "ceisa40-dev.customs.go.id" || "localhost:3150";
      const res = await axios.get(
        // `http://10.102.104.163:8989/pemblokiran/browse-daftar-perusahaan?npwp=${npwp}`,
        `${REACT_APP_PERIJINAN}/pemblokiran/browse-daftar-perusahaan?npwp=${npwp}`,
        {
          headers: {
            [isLocalhost
              ? "beacukai-api-key"
              : "customs-api-key"]: `${REACT_APP_SECRET_KEY_PERIJINAN}`,
          },
        }
      );

      if (res.status === 200) {
        this.setState((prevState) => ({
          ...prevState,
          selectedData: res.data.data,
          aksesDimiliki: res.data.data.aksesDimiliki
        }));

        const tes = res.data.data.aksesDimiliki;
        console.log(this.state.aksesDimiliki, 'akses dimiliki')
        console.log(this.state.selectedData, 'tes select perusahaan')
      }
    } catch (error) {
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  aksesBlokirChange(e, value) {
    let temp = this.state.data;
    const index = temp.findIndex(
      ({ idPerusahaan }) => idPerusahaan === e.idPerusahaan
    );

    let result = temp[index].result;

    const index2 = result.findIndex(({ name }) => name === value);
    result[index2].checked = !result[index2].checked;

    temp[index].result = result;

    this.setState({
      data: temp,
    });

    console.log(this.state.data, 'data temp')
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
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
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.namaPerusahaan]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    console.log('tes select', selectedKeys[0])
    console.log('tes data index', dataIndex[0])
    this.setState({
      loading: true,
    });
    axios.get(`${REACT_APP_PERIJINAN}/v1/perusahaan/dataPerusahaan?nama=${selectedKeys[0]}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'accept': 'application/json',
          'beacukai-API-Key': `${REACT_APP_SECRET_KEY_PERIJINAN}`,
          "cache-control": "no-cache"
        },
      })
      .then(res => {
        console.log('nama perusahaan', res.data.data)
        this.setState({
          perusahaan: res.data.data,
          loading: false,
        })
      })
    // this.setState({
    //   searchText: selectedKeys[0],
    //   searchedColumn: dataIndex,
    // });
    console.log('nama perusahaan', this.state.namaPerusahaan)
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
    this.setState({
      loading: true,
    });
    axios.get(`${REACT_APP_PERIJINAN}/v1/perusahaan/dataPerusahaan?page=1&size=${this.state.size}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'accept': 'application/json',
          'beacukai-API-Key': `${REACT_APP_SECRET_KEY_PERIJINAN}`,
          "cache-control": "no-cache"
        },
      }).then(res => {
        this.setState({
          perusahaan: res.data.data,
          total: res.data.total,
          loading: false,
        });
      })
  };

  render() {
    const columns = [
      {
        title: "Nama Perusahaan",
        dataIndex: "namaPerusahaan",
        key: "1",
        ellipsis: true,
        width: 150,
        ...this.getColumnSearchProps("namaPerusahaan"),
      },
      {
        title: "NPWP",
        dataIndex: "npwp",
        key: "2",
        ellipsis: true,
        width: 150,
        ...this.getColumnSearchProps("npwp"),
      },
      {
        title: "NIB",
        dataIndex: "nib",
        key: "3",
        ellipsis: true,
        width: 150,
        ...this.getColumnSearchProps("nib"),
      },
      {
        title: "Akses Kepabeanan",
        dataIndex: "aksesDimiliki",
        key: "4",
        width: 150,
      },
      {
        title: "Akses yang Diblokir",
        key: "5",
        align: "text-left",
        width: 200,
        render: (item) => {
          const result = item.result ? item.result : [];
          return (
            <>
              {result.name !== "PPJK (PENGUSAHA PENGURUSAN JASA KEPABEANAN)" &&
                this.props.jenisBlokir !== "SELURUHNYA" &&
                this.props.jenisBlokir !== "SEBAGIAN" ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  *Perusahaan ini tidak ada izin PPJK (PENGUSAHA PENGURUSAN JASA
                  KEPABEANAN)
                </p>
              ) : null}
              {result.map((e, key) => {
                return (
                  <>
                    {this.props.jenisBlokir === "SELURUHNYA" ? (
                      <>
                        <Checkbox key={`${key}`} checked={true} disabled={true}>
                          {e.name}
                        </Checkbox>
                        <br />
                      </>
                    ) : this.props.jenisBlokir === "SEBAGIAN" ? (
                      <>
                        <Checkbox
                          key={`${key}`}
                          checked={e.checked}
                          onChange={() => this.aksesBlokirChange(item, e.name)}
                        >
                          {e.name}
                        </Checkbox>
                        <br />
                      </>
                    ) : (
                      <>
                        <Checkbox
                          key={`${key}`}
                          checked={
                            e.name ===
                              "PPJK (PENGUSAHA PENGURUSAN JASA KEPABEANAN)"
                              ? true
                              : false
                          }
                          disabled={true}
                        >
                          {e.name}
                        </Checkbox>
                        <br />
                      </>
                    )}
                  </>
                );
              })}
            </>
          );
        },
      },
    ];

    const columns2 = [
      {
        title: "Nama Perusahaan",
        dataIndex: "namaPerusahaan",
        key: "1",
        ellipsis: true,
        width: 150,
        ...this.getColumnSearchProps("namaPerusahaan"),
      },
      {
        title: "NPWP",
        dataIndex: "npwp",
        key: "2",
        ellipsis: true,
        width: 150,
        ...this.getColumnSearchProps("npwp"),
      },
      {
        title: "NIB",
        dataIndex: "nib",
        key: "3",
        ellipsis: true,
        width: 150,
      },
      {
        title: "Akses Kepabeanan",
        dataIndex: "aksesDimiliki",
        key: "4",
        ellipsis: true,
        width: 150,
      },
    ];

    const rowSelection = {
      onChange: this.onSelectChange,
    };

    return (
      <div style={{ margin: 10 }}>
        <Modal
          title="Daftar Perusahaan"
          width="90%"
          visible={this.state.visible}
          onOk={() => {

            const temp = [];
            temp.push(this.state.selectedData);

            console.log(this.state.data, 'cek temp')
            temp.concat(this.state.data);
            this.aksesGenerate(temp);
            console.log(temp, 'cek temp')
            this.setState({
              visible: false,
              data: temp,
              selectedData: [],
            });
          }}
          onCancel={() => this.setState({ visible: false })}
        >
          <Table
            scroll={{ x: 1500, y: 300 }}
            loading={this.state.loading}
            rowSelection={rowSelection}
            columns={columns2}
            dataSource={this.state.perusahaan}
            pagination={false}
          />
          <Row>
            <Col span={24} align="right">
              <Pagination
                total={this.state.total}
                onChange={(current) => this.getPemblokiran(current)}
                showTotal={(total) => `Total ${total} items`}
                pageSize={20}
                defaultCurrent={1}
              />
            </Col>
          </Row>
        </Modal>

        <Button
          onClick={() => this.setState({ visible: true })}
          type={"primary"}
          style={{ margin: 10 }}
          disabled={this.props.jenisBlokir === "" ? true : false}
        >
          Tambah Perusahaan
        </Button>

        {this.state.data.length && !this.state.visible ? (
          <>
            <Row gutter={10}>
              <Col span={24} align="right">
                <Table
                  columns={columns}
                  dataSource={this.state.data}
                  scroll={{ x: 1500, y: 300 }}
                  bordered
                />
              </Col>
            </Row>
          </>
        ) : null}
      </div>
    );
  }
}

export default PerusahaanList;
