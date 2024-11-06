import React, { Component } from "react";
import { Table, Button, Radio, Col, Row, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import DataPemohon from "./DataPemohon";
import axios from "axios";
import { getUser } from "../../../utils/DataUser";
import moment from "moment";
import { Link } from "react-router-dom";
const { REACT_APP_PERIJINAN, REACT_APP_SECRET_KEY_PERIJINAN } = process.env;

class LevelTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTable: [],
      berhasil: 0,
      gagal: 0,
    };
    this.kirimData = this.kirimData.bind(this);
  }

  componentDidMount() {
    this.setState({
      dataTable: this.props.dataTable,
      dataPemohon: this.props.dataTable[0],
    });
  }

  onClickRow = (record) => {
    return {
      onClick: () => {
        this.setState({
          seqPembukaanBlokir: record.seqPembukaanBlokir,
          dataPemohon: record,
        });
      },
    };
  };

  setRowClassName = (record) => {
    return record.seqPembukaanBlokir === this.state.seqPembukaanBlokir
      ? "clickRowStyl"
      : "";
  };

  ApproveChange({ item, value }) {
    let temp = this.state.dataTable;
    const index = temp.findIndex(
      ({ seqPembukaanBlokir }) => seqPembukaanBlokir === item.seqPembukaanBlokir
    );
    temp[index] = { ...temp[index], result: value };
    this.setState({
      dataTable: temp,
    });
  }

  CatatanChange({ item, value }) {
    let temp = this.state.dataTable;
    const index = temp.findIndex(
      ({ seqPembukaanBlokir }) => seqPembukaanBlokir === item.seqPembukaanBlokir
    );
    temp[index] = { ...temp[index], ctn: value };
    this.setState({
      dataTable: temp,
    });
  }

  async success() {
    let secondsToGo = 5;

    const modal = Modal.success({
      title: `Data Pemblokiran Berhasil Direkam (${secondsToGo})`,
      // content: `Permohonan blokir anda telah masuk ke antrian untuk pemeriksaan petugas sesuai dengan ketentuan (${secondsToGo})`
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        title: `Data Pemblokiran Berhasil Direkam (${secondsToGo})`,
        //   content: `Permohonan blokir anda telah masuk ke antrian untuk pemeriksaan petugas sesuai dengan ketentuan (${secondsToGo})`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
    setTimeout(function () {
      window.location.href = "/pemblokiran/daftar-permohonan"; //will redirect to your blog page (an ex: blog.html)
    }, secondsToGo * 1000);
  }

  error() {
    let secondsToGo = 5;

    const modal = Modal.error({
      title: <div>Data Pemblokiran Gagal Direkam</div>,
      content: (
        <div>
          <span style={{ color: "#03fc39" }}>
            Data yang berhasil direkam {this.state.berhasil}
          </span>{" "}
          <br />
          <span style={{ color: "#fc0303" }}>
            Data yang gagal direkam{" "}
            {this.state.dataTable.length - this.state.berhasil}
          </span>
          <br />
          <span>Silahkan rekam ulang jika masih ada kegagalan!</span>
        </div>
      ),
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        title: `Data Pemblokiran Gagal Direkam (${secondsToGo})`,
        //   content: `Kemungkinan ada masalah jaringan atau masalah teknis (${secondsToGo})`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
    setTimeout(function () {
      window.location.href = "/pemblokiran/daftar-permohonan"; //will redirect to your blog page (an ex: blog.html)
    }, secondsToGo * 1000);
  }

  async kirimData() {
    this.setState({
      loading: true,
    });
    const kodeKantor = getUser().kodeKantor;
    const nip = getUser().nip;
    const postFunc = (i, postData) => {
      if (i < postData.length) {
        const data = {
          catatan: postData[i].ctn,
          idKeputusan: postData[i].result,
          keputusan: postData[i].result == 1 ? "Persetujuan" : "Penolakan",
          kodePetugas: "0096",
          kodeProses: postData[i].kodeProses,
          nipPetugas: nip,
          seqIzin: postData[i].seqPembukaanBlokir,
          seqPenelitian: "",
          role: "1",
          kodeKantor: kodeKantor,
        };
        const isLocalhost =
          window.location.host == "ceisa40-dev.customs.go.id" ||
          "localhost:3150";
        const resAxios = {
          url: `${REACT_APP_PERIJINAN}/v1/penelitian-petugas/add-rekomendasi-blokir`,
          options: {
            headers: {
              [isLocalhost
                ? "beacukai-api-key"
                : "customs-api-key"]: `${REACT_APP_SECRET_KEY_PERIJINAN}`,
              "Content-Type": "application/json",
              accept: "application/json",
            },
          },
        };
        axios
          .post(resAxios.url, data, resAxios.options)
          .then(() => {
            this.setState({
              berhasil: this.state.berhasil + 1,
            });
            postFunc(i + 1, this.state.dataTable);
            if (this.state.berhasil === postData.length) {
              this.success();
            }
          })
          .catch(() => {
            this.error();
            this.setState({
              gagal: this.state.gagal + 1,
            });
          });
      }
    };
    postFunc(0, this.state.dataTable);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.state.berhasil + this.state.gagal ===
      this.state.dataTable.length
    ) {
      console.log(
        "cara patrik",
        this.state.berhasil + this.state.gagal,
        this.state.dataTable.length,
        this.state.berhasil + this.state.gagal === this.state.dataTable.length
      );
      this.success();
    }
  }

  render() {
    const dataPemohon = this.state.dataPemohon;
    const lampiranData = this.props.lampiranData;
    const columns = [
      {
        title: "No",
        width: 100,
        dataIndex: "no",
        key: "no",
      },
      {
        title: "No SKEP Blokir",
        dataIndex: "nomorSkep",
        key: "1",
        width: 150,
      },
      {
        title: "Tanggal Blokir",
        dataIndex: "tanggalBlokir",
        key: "2",
        width: 150,
        render: (dataIndex) => {
          return moment(dataIndex).format("DD-MM-YYYY");
        },
      },
      {
        title: "Unit Pemblokiran",
        dataIndex: "unitBlokir",
        key: "3",
        width: 150,
      },
      {
        title: "Kategori Blokir",
        dataIndex: "kategori",
        key: "4",
        width: 150,
      },
      {
        title: "Catatan Pemblokiran",
        dataIndex: "catatan",
        key: "5",
        width: 150,
      },
      {
        title: "Action",
        key: "operation",
        width: 300,
        render: (item) => {
          return (
            <>
              <Row gutter={10}>
                <Col span={8}>
                  <Link
                    to={{
                      pathname: "/pemblokiran/detail-blokir",
                      data: item.idPerusahaanBlokir,
                      role: this.props.role,
                    }}
                  >
                    <Button>Detail</Button>
                  </Link>
                </Col>

                <Col span={12}>
                  <Radio.Group
                    onChange={(e) => (
                      this.ApproveChange({ item, value: e.target.value }), 300
                    )}
                  >
                    <Radio value={1}>Terima</Radio>
                    <br />
                    <Radio value={2}>Tolak</Radio>
                  </Radio.Group>
                </Col>
              </Row>
            </>
          );
        },
      },
      ,
      {
        title: "Catatan Rekomendasi",
        key: "catatan",

        width: 300,
        render: (item) => {
          return (
            <>
              <TextArea
                rows={4}
                onChange={(e) => (
                  this.CatatanChange({ item, value: e.target.value }), 300
                )}
              />
            </>
          );
        },
      },
    ];
    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.state.dataTable}
          scroll={{ x: 1500, y: 500 }}
          onRow={(record, dataIndex) => this.onClickRow(record)}
          rowClassName={this.setRowClassName}
        />
        <br />
        <DataPemohon dataPemohon={dataPemohon} lampiranData={lampiranData} />
        <Row>
          <Col span={24} align="right" pull={1}>
            <Button
              type="primary"
              loading={this.state.loading}
              onClick={this.kirimData}
            >
              Simpan
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LevelTable;
