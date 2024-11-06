import React, { Component } from "react";
import { Card, Row, Col, Table, Input, Form, Button } from "antd";
import Notification from "../Component/Notifikasi";

const { TextArea } = Input;
const {
  REACT_APP_REFERENSI,
  REACT_APP_SECRET_KEY_REFERENSI,
  REACT_APP_LHP,
  REACT_APP_SECRET_KEY_LHP,
  REACT_APP_HDFS,
  REACT_APP_SECRET_KEY_HDFS,
} = process.env;

class DaftarBarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      open: false,
    };
  }

  getDaftarBarang = () => {
    let idHeader = localStorage.getItem("idHeader");
    fetch(`${REACT_APP_LHP}/memo-barang/${idHeader}/items`, {
      headers: {
        accept: "application/json",
        "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
      },
      "Access-Control-Allow-Origin": "*",
    })
      .then((response) => response.json())
      .then((body) => {
        if(body.status === true){
          if(body.listData[0] !== null){
            this.setState(
                {
                  loading: false,
                  dataMemoBarang: body.listData,
                });
          }else{
            this.setState({
              loading : false,
            })
          }
        }else{
          Notification(
              "failed",
              "Terjadi Kesalahan Pada Proses Pengambilan data"
          );
        }

      });
  };

  getdetailMemo(e) {
    console.log(e);
    this.setState({
      open: true,
      jumlahKemasan: e.jumlahKemasan,
      jumlahSatuan: e.jumlahSatuan,
      memoBarang: e.memoBarang,
      namaKemasan: e.namaKemasan,
      namaNegara: e.namaNegara,
      namaSatuanBarang: e.namaSatuanBarang,
      negaraPemasok: e.negaraPemasok,
      posTarif: e.posTarif,
      seriBarang: e.seriBarang,
      uraian: e.uraian,
    });
  }

  componentDidMount() {
    this.getDaftarBarang();
  }

  render() {
    const {
      dataMemoBarang,

      //    Detail Memo Barang
      jumlahKemasan,
      jumlahSatuan,
      memoBarang,
      namaKemasan,
      namaNegara,
      namaSatuanBarang,
      negaraPemasok,
      posTarif,
      seriBarang,
      uraian,
    } = this.state;
    const columnDaftarBarang = [
      {
        title: "Seri Barang",
        dataIndex: "seriBarang",
        key: "seriBarang",
      },
      {
        title: "Uraian Barang",
        dataIndex: "uraian",
        key: "uraian",
      },
      {
        title: "HS",
        dataIndex: "posTarif",
        key: "posTarif",
      },
      {
        title: "Jumlah Satuan Barang",
        dataIndex: "jumlahSatuan",
        key: "jumlahSatuan",
      },
      {
        title: "Memo",
        dataIndex: "memo",
        width: 250,
        key: "memo",
        render: (key, record, e) => {
          // console.log(record, e);
          return (
            <div>
              <Button
                type="primary"
                className={"btn-info_me"}
                onClick={(evt) => this.getdetailMemo(record, evt)}
              >
                <i className="fas fa-info"></i>&nbsp; MEMO
              </Button>
            </div>
          );
        },
      },
    ];
    return (
      <div>
        <Card
          type="inner"
          size="small"
          title="Daftar Barang"
          style={{ width: "99%" }}
        >
          <div>
            <Table
              columns={columnDaftarBarang}
              dataSource={dataMemoBarang}
              loading={this.state.loading}
              pagination={false}
            />
          </div>

          <Card
            type="inner"
            style={{ width: "99%", marginRight: 5 }}
            size="small"
            title="Memo Per Barang"
            className={"collapse" + (this.state.open ? " in" : "")}
            // extra={<a href="#">More</a>}
          >
            <Row gutter={8} className="m-2">
              <Col span={4}>Memo Barang</Col>

              <Col span={20}>
                <TextArea
                  style={{ backgroundColor: "#fff566", color: "black" }}
                  value={memoBarang}
                  rows={3}
                  disabled
                />
              </Col>
            </Row>

            {/* HS KODE */}
            <Row gutter={8} className="m-2">
              <Col span={4}>HS Code</Col>

              <Col span={8}>
                <Input disabled style={{ color: "black" }} value={posTarif} />
              </Col>

              <Col span={4}>Seri Barang</Col>

              <Col span={8}>
                <Input disabled style={{ color: "black" }} value={seriBarang} />
              </Col>
            </Row>

            {/* Uraian Barang  */}
            <Row gutter={8} className="m-2">
              <Col span={4}>Uraian Barang</Col>
              <Col span={20}>
                <TextArea
                  style={{ color: "black" }}
                  disabled
                  rows={3}
                  value={uraian}
                />
              </Col>
            </Row>

            {/* Jenis Satuan */}
            <Row gutter={8} className="m-2">
              <Col span={4}>Jenis Satuan</Col>
              <Col span={8}>
                <Input
                  style={{ color: "black" }}
                  disabled
                  value={namaSatuanBarang}
                />
              </Col>
              <Col span={4}>Jumlah Satuan</Col>
              <Col span={8}>
                <Input
                  style={{ color: "black" }}
                  disabled
                  value={jumlahSatuan}
                />
              </Col>
            </Row>

            {/* Jenis Kemasan */}
            <Row gutter={8} className="m-2">
              <Col span={4}>Jenis Kemasan</Col>
              <Col span={8}>
                <Input
                  style={{ color: "black" }}
                  disabled
                  value={namaKemasan}
                />
              </Col>
              <Col span={4}>Jumlah Kemasan</Col>
              <Col span={8}>
                <Input
                  style={{ color: "black" }}
                  disabled
                  value={jumlahKemasan}
                />
              </Col>
            </Row>

            {/* Negara Asal */}
            <Row gutter={8} className="m-2">
              <Col span={4}>Negara Asal</Col>
              <Col span={8}>
                <Input style={{ color: "black" }} disabled value={namaNegara} />
              </Col>
              {/*<Col span={4}>Negara Pemasok</Col>*/}
              {/*<Col span={8}>*/}
              {/*  <Input*/}
              {/*    style={{ color: "black" }}*/}
              {/*    disabled*/}
              {/*    value={negaraPemasok}*/}
              {/*  />*/}
              {/*</Col>*/}
            </Row>
          </Card>
        </Card>
      </div>
    );
  }
}

export default DaftarBarang;
