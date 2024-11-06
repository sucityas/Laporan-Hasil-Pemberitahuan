import { Button, Checkbox, Modal, Table, Col, Row, Pagination } from "antd";
import axios from "axios";
import React, { Component } from "react";

const {
  REACT_APP_PERIJINAN,
  REACT_APP_SECRET_KEY_PERIJINAN,
  REACT_APP_REFERENSI,
  REACT_APP_SECRET_KEY_REFERENSI,
} = process.env;

class BlokirList extends Component {
  state = {
    visible: false,
    data: [],
    selectedRows: [],
    perusahaan: [],
    // kategori: [],
    total: 0,
    selectedData: [],
    blokir: this.props.data ? this.props.data : [],
    loading: false,
    loading2: false,
    kategori: this.props.kategori ? this.props.kategori : "",
  };

  onSelectChange = async (selectedRowKeys, selectedRows) => {
    const temp = await this.state.blokir;
    let res = temp.concat(selectedRows);

    res = res.map((e, i) => {
      return { ...e, no: i + 1 };
    });
    console.log("selectedRows", res);
    await this.setState({
      blokir: res,
    });
    console.log(await this.state.selectedRows);
  };

  componentDidMount() {
    // this.getPerusahaan(1);
    // const { data } = this.props.kategori ? this.props.kategori : "";
    // console.log(data, 'data props kategori')

  }

  async getPerusahaan(e = 1) {
    try {
      this.setState({
        loading: true,
      });

      const res = await axios.get(
        `${REACT_APP_PERIJINAN}/pemblokiran/browse-pembukaan-blokir?page=${e}&size=20&kriteriaBuka=${this.state.kategori}`,
        {
          headers: {
            "customs-api-key": process.env.REACT_APP_SECRET_KEY_PERIJINAN,
          },
        }
      );
      console.log(res);

      if (res.status === 200 || res.status === 200) {
        if (typeof res.data.data != "string") {
          this.setState({
            perusahaan: res.data.data,
            total: res.data.total,
          });
        } else {
          this.setState({
            perusahaan: [],
            total: 0,
          });
          this.info();
        }
        console.log(res.data.data);
      } else {
        this.error();
      }
    } catch (error) {
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  addBlokir(item) {
    const temp = this.state.selectedData;
    const index = temp.indexOf(item);
    if (index === -1) {
      temp.push(item);
    } else {
      temp.splice(index, 1);
    }
    this.setState({
      selectedData: temp,
    });
    console.log(temp);
  }

  render() {
    const columns = [
      {
        title: "No",
        width: 100,
        dataIndex: "no",
        key: "no",
        fixed: "left",
      },
      {
        title: "Nama Perusahaan",
        dataIndex: "namaPerusahaan",
        key: "1",
        width: 150,
      },
      {
        title: "NIB",
        dataIndex: "nib",
        key: "2",
        width: 150,
      },
      {
        title: "No Skep Blokir",
        dataIndex: "noSkepBlokir",
        key: "3",
        width: 150,
      },
      {
        title: "tgl Skep Blokir",
        dataIndex: "tglSkepBlokir",
        key: "4",
        width: 150,
      },
      {
        title: "Uraian Alasan Blokir",
        dataIndex: "uraianAlasanBlokir",
        key: "5",
        width: 200,
      },
      {
        title: "Buka Blokir",
        dataIndex: "idPerusahaanBlokir",
        key: "7",
        align: "center",
        width: 100,
        render: (item) => {
          return (
            <>
              <Checkbox
                onChange={() => {
                  this.addBlokir(item);
                }}
              >
                Buka
              </Checkbox>
            </>
          );
        },
      },
    ];

    const columns2 = [
      {
        title: "No",
        width: 100,
        dataIndex: "index",
        key: "index",
        fixed: "left",
        render: (value, dataIndex, index) => {
          return index + 1;
        },
      },
      // {
      //   title: "No",
      //   width: 100,
      //   dataIndex: "no",
      //   key: "no",
      //   fixed: "left",
      // },
      {
        title: "Nama Perusahaan",
        dataIndex: "namaPerusahaan",
        key: "1",
        width: 150,
      },
      {
        title: "NIB",
        dataIndex: "nib",
        key: "2",
        width: 150,
      },
      {
        title: "No Skep Blokir",
        dataIndex: "noSkepBlokir",
        key: "3",
        width: 150,
      },
      {
        title: "tgl Skep Blokir",
        dataIndex: "tglSkepBlokir",
        key: "4",
        width: 150,
      },
      {
        title: "Uraian Alasan Blokir",
        dataIndex: "uraianAlasanBlokir",
        key: "5",
        width: 200,
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
          confirmLoading={this.state.loading2}
          onOk={() => {
            this.setState({
              selectedRows: [],
              visible: false,
            });
          }}
          onCancel={() => this.setState({ visible: false })}
        >
          {this.state.kategori.length ? (
            <>
              <Row gutter={10}>
                <Col span={24} align="right">
                  {/* {this.state.kategori.length ? ( */}
                  <Table
                    loading={this.state.loading}
                    columns={columns2}
                    rowSelection={rowSelection}
                    dataSource={this.state.kategori}
                    scroll={{ x: 1500, y: 300 }}
                    bordered
                    pagination={false}
                  />
                  {/* ) : null} */}
                  <Pagination
                    total={this.state.total}
                    onChange={(e) => this.getPerusahaan(e)}
                    showTotal={(total) => `Total ${total} items`}
                    pageSize={20}
                    defaultCurrent={1}
                  />
                </Col>
              </Row>
            </>
          ) : null}
        </Modal>

        <Button
          onClick={() => this.setState({ visible: true })}
          type={"primary"}
          style={{ margin: 10 }}
          disabled={this.props.kategori === "" ? true : false}
        >
          Tambah Perusahaan
        </Button>
        {this.state.blokir.length ? (
          <>
            <Table
              scroll={{ x: 1500, y: 300 }}
              columns={columns}
              dataSource={this.state.blokir}
            />
          </>
        ) : null}
      </div>
    );
  }
}

export default BlokirList;
