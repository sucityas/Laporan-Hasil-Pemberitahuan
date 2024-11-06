import {
  Button,
  Col,
  DatePicker,
  Input,
  Modal,
  Row,
  Table,
  Typography,
} from "antd";
import axios from "axios";
import moment from "moment";
import React, { Component } from "react";

import DropdownDokumen from "../../../containers/App/Dropdown/DropdownDokumen"; //'../../../containers/Dropdown/DropdownDokumen' //'../../../containers/App/Dropdown/DropdownDokumen' //'../../../../../containers/App/Dropdown/DropdownDokumen';
import DropdownIntansi from "../../../containers/App/Dropdown/DropdownIntansi";

const { Text } = Typography;
const { confirm } = Modal;

const { REACT_APP_HDFS, REACT_APP_SECRET_KEY_HDFS } = process.env;

class DokumenForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      jenisDokumen: "",
      instansi: "",
      nomorDokumen: "",
      tglDokumen: moment(),
      urlFile: "",
      instansilain: "",
      jenisDokumenlain: "",
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.deleteLampiran = this.deleteLampiran.bind(this);
    this.onChangeUpload = this.onChangeUpload.bind(this);
    this.addData2Table = this.addData2Table.bind(this);
    this.handleDirectDownload = this.handleDirectDownload.bind(this);
  }

  clearField() {
    this.setState({
      jenisDokumen: "",
      instansi: "",
      nomorDokumen: "",
      tglDokumen: moment(),
      urlFile: "",
      instansilain: "",
      jenisDokumenlain: "",
    });
  }

  clear() {
    this.setState({ data: [] });
    this.clearField();
  }

  async deleteLampiran(url) {
    try {
      this.setState({
        loading: true,
      });
      axios
        .delete(`${REACT_APP_HDFS}/v1/hdfs/delete?path=${url}`, {
          headers: {
            accept: "application/json",
            "beacukai-api-key": `${REACT_APP_SECRET_KEY_HDFS}`,
          },
        })
        .then(() => {
          const temp = this.state.data;
          const index = temp.findIndex((item) => item.url === url);
          temp.splice(index, 1);
          this.setState({ data: temp });
        });
    } catch (error) {
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  async deleteTable(e) {
    const that = this;
    await confirm({
      title: "Apakah anda yakin menghapus data ini ?",
      okText: "Iya",
      okType: "danger",
      cancelText: "Tidak",
      //   confirmLoading: this.state.loading,
      onOk() {
        that.deleteLampiran(e);
      },
      onCancel() { },
    });
  }

  error() {
    Modal.error({
      title: "Gagal membuka file",
      content: "Kemungkinan Jaringan tidak stabil atau ada kesalahan teknis",
    });
  }

  getPreviewFile = (e) => {
    const url = e.url;
    axios(`${REACT_APP_HDFS}/v1/hdfs/download?path=${url}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "beacukai-api-key": `${REACT_APP_SECRET_KEY_HDFS}`,
      },
      // 'Access-Control-Allow-Origin': '*',
      responseType: "blob", //Force to receive data in a Blob Format
    })
      .then((response) => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch((error) => {
        this.error();
      });
  };

  onChangeUpload = async (e, action) => {
    const file = e.target.files[0];
    let fileext = file.name.substring(file.name.lastIndexOf(".") + 1);
    if (file.size < 512000 && fileext === "pdf") {
      this.setState(
        {
          uploading: true,
          uploadFiles: {
            fileLampiran: file,
            namaLampiran: file.name,
          },
          namaLampiran: file.name,
        },
        () => {
          this.handleUpload();
        }
      );
    } else alert("File Harus Pdf dan Ukuran File Harus Dibawah 512Kb");
  };

  async handleUpload() {
    let uploadData = new FormData();
    uploadData.append("file", this.state.uploadFiles.fileLampiran);
    uploadData.append("path", "pp");

    await fetch(`${REACT_APP_HDFS}/v1/hdfs/upload`, {
      method: "POST",
      headers: new Headers({
        accept: "application/json",
        "beacukai-api-key": `${REACT_APP_SECRET_KEY_HDFS}`,
      }),
      mode: "cors",
      body: uploadData,
    })
      .then((response) => response.json())
      .then(async (body) => {
        this.setState({
          url: body.item,
          getUrlFile: body.item,
          uploading: false,
        });
      });
  }

  handleDirectDownload = (e) => {
    axios(`${process.env.REACT_APP_HDFS}/v1/hdfs/download?path=${e}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "beacukai-api-key": `${process.env.REACT_APP_SECRET_KEY_HDFS}`,
      },
      // 'Access-Control-Allow-Origin': '*',
      responseType: "blob", //Force to receive data in a Blob Format
    })
      .then((response) => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addData2Table() {
    const { jenisDokumen, instansi, nomorDokumen, tglDokumen } = this.state;
    const data = this.state.data;
    const temp = {
      jenisDokumen:
        jenisDokumen === "06" ? this.state.jenisDokumenlain : jenisDokumen,
      instansi: instansi === "03" ? this.state.instansilain : instansi,
      nomorDokumen,
      tglDokumen: moment(tglDokumen, "YYYY-MM-DD").format("YYYY-MM-DD"),
      urlFile: this.state.url,
      key: this.state.url,
    };

    data.push(temp);
    this.setState({
      data,
    });
  }

  render() {
    const { nomorDokumen } = this.state;

    const columns = [
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
      {
        title: "Jenis Dokumen",
        dataIndex: "jenisDokumen",
        key: "1",
        width: 100,
        align: "center",
        render: (dataIndex) => {
          if (dataIndex == "01") {
            return "LPTLHP";
          } else if (dataIndex == "02") {
            return "Surat Pemberitahuan";
          } else if (dataIndex == "03") {
            return "Surat Rekomendasi";
          } else if (dataIndex == "04") {
            return "Surat Permohonan";
          } else if (dataIndex == "05") {
            return "Lembar Penelitian";
          } else {
            return dataIndex;
          }
        },
      },
      {
        title: "Intansi",
        dataIndex: "instansi",
        key: "2",
        width: 100,
        align: "center",
        render: (dataIndex) => {
          if (dataIndex == "02") {
            return "Bank Indonesia";
          } else if (dataIndex == "01") {
            return "Direktorat Pajak";
          } else {
            return dataIndex;
          }
        },
      },
      {
        title: "Nomor Dokumen",
        dataIndex: "nomorDokumen",
        key: "3",
        width: 100,
        align: "center",
      },
      {
        title: "Tanggal Dokumen",
        dataIndex: "tglDokumen",
        key: "4",
        width: 100,
        align: "center",
      },
      {
        title: "Upload File",
        dataIndex: "urlFile",
        key: "5",
        width: 150,
        align: "center",
        render: (e) => {
          return (
            <>
              <Button type="link" onClick={() => this.handleDirectDownload(e)}>
                <Text ellipsis={true} style={{ width: 140 }}>
                  {e}
                </Text>
              </Button>
            </>
          );
        },
      },
      {
        title: "Action",
        dataIndex: "urlFile",
        key: "6",
        width: 150,
        render: (e) => {
          return (
            <>
              <Button type="danger" onClick={() => this.deleteTable(e)}>
                Hapus
              </Button>
            </>
          );
        },
      },
    ];

    return (
      <div style={{ margin: 10 }}>
        <br />
        <Row gutter={10}>
          <Col span={4}>Dokumen</Col>
          <Col span={8}>
            <DropdownDokumen
              width="100%"
              value={this.state.jenisDokumen}
              onChange={(e) => this.setState({ jenisDokumen: e })}
            />
          </Col>
          <Col span={8}>
            {this.state.jenisDokumen === "06" ? (
              <Input
                value={this.state.jenisDokumenlain}
                onChange={(e) =>
                  this.setState({ jenisDokumenlain: e.target.value })
                }
              />
            ) : null}
          </Col>
        </Row>
        <br />
        {this.state.jenisDokumen === "03" ? (
          <>
            <Row gutter={10}>
              <Col span={4}>Instansi</Col>
              <Col span={8}>
                <DropdownIntansi
                  defaultValue={this.state.instansi}
                  onChange={(e) => this.setState({ instansi: e })}
                />
              </Col>
              <Col span={8}>
                {this.state.instansi === "03" ? (
                  <Input
                    value={this.state.instansilain}
                    onChange={(e) =>
                      this.setState({ instansilain: e.target.value })
                    }
                  />
                ) : null}
              </Col>
            </Row>
            <br />
          </>
        ) : null}

        <Row gutter={10}>
          <Col span={4}>No Dokumen</Col>
          <Col span={8}>
            <Input
              value={nomorDokumen}
              onChange={(e) => this.setState({ nomorDokumen: e.target.value })}
            />
          </Col>
        </Row>
        <br />

        <Row gutter={10}>
          <Col span={4}>Tgl Dokumen</Col>
          <Col span={8}>
            <DatePicker
              value={moment(this.state.tglDokumen)}
              format={"DD-MM-YYYY"}
              onChange={(e) => this.setState({ tglDokumen: e })}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <br />

        <Row gutter={10}>
          <Col span={4}>Upload File</Col>
          <Col span={18}>
            <Input
              style={{ display: "none" }}
              id="getBerkasLampiran"
              type="file"
              name="getBerkasLampiran"
              onChange={(e) => this.onChangeUpload(e)}
            ></Input>
            <Button
              style={{ marginRight: 10, verticalAlign: "middle" }}
              loading={this.state.uploading}
              onClick={() =>
                document.getElementById("getBerkasLampiran").click()
              }
            >
              Browse File
            </Button>
            {this.state.namaLampiran}
            {/* <Icon
                                type="cloud-upload"
                                style={{ verticalAlign: 'middle' }}
                                onClick={() => document.getElementById('getBerkasLampiran2').click()}
                            /> */}
          </Col>
        </Row>
        <br />
        <Button
          type={"primary"}
          style={{ margin: 10 }}
          onClick={() => this.addData2Table()}
        >
          Simpan dan Tambah Dokumen
        </Button>
        <Row gutter={10}>
          <Col>
            {this.state.data.length ? (
              <Table
                columns={columns}
                dataSource={this.state.data}
                scroll={{ x: 1500, y: 300 }}
              />
            ) : (
              ""
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default DokumenForm;
