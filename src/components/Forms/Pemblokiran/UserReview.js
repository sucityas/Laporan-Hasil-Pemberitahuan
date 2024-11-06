import { Button, Modal, Table, Typography, Skeleton } from "antd";
import axios from "axios";
import React, { Component } from "react";
import Axios from "axios";

const { Text } = Typography;

const { REACT_APP_HDFS, REACT_APP_SECRET_KEY_HDFS } = process.env;

class UserReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  error() {
    Modal.error({
      title: "Gagal membuka file",
      content: "Kemungkinan Jaringan tidak stabil atau ada kesalahan teknis",
    });
  }

  componentDidMount() {
    if (this.props.dataPemohon !== undefined) {
      this.getData();
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataPemohon !== this.props.dataPemohon) {
      this.getData();
    }
  }

  async getData() {
    try {
      this.setState({
        loading: true,
      });

      const role = this.props.role;
      const seqIzin = this.props.dataPemohon;
      const kodePetugaskasi =
        role === "kasi" ? "00101" : role === "kasubdit" ? "00102" : "";
      const kodePetugaskasubdit1 = role === "kasubdit" ? "00101" : "";
      const res = await Axios.get(
        `${process.env.REACT_APP_PERIJINAN}/v1/penelitian-petugas?kodePetugas=${kodePetugaskasi}&kodePetugas=${kodePetugaskasubdit1}&page=0&seqIzin=${seqIzin}&size=10`,
        {
          headers: {
            "customs-api-key": process.env.REACT_APP_SECRET_KEY_PERIJINAN,
          },
        }
      );
      console.log("tets", res.data);

      if (res.status === 200) {
        console.log(res.data.data);
        this.setState(
          {
            data: res.data.data,
            loading: false,
          },
          () => {
            console.log("dataPermohonan", this.state.data);
          }
        );
      }
    } catch (error) {
      console.warn(error);
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const dataRekomendasi = this.state.data;
    const columns = [
      {
        title: "Nama Pegawai",
        dataIndex: "nmPegawai",
        key: "1",
        width: 100,
        align: "center",
      },
      {
        title: "Uraian Proses",
        dataIndex: "uraianProses",
        key: "1",
        width: 100,
        align: "center",
      },
      {
        title: "Proses Keputusan",
        dataIndex: "uraianProsesKeputusan",
        key: "2",
        width: 100,
        align: "center",
      },
      {
        title: "Catatan",
        dataIndex: "catatan",
        key: "2",
        width: 100,
        align: "center",
      },
    ];

    const data = this.props.data || [];

    return (
      <div>
        <b>Daftar Hasil Pemeriksaan User</b>
        <hr />
        <Table
          columns={columns}
          dataSource={dataRekomendasi}
          loading={this.state.loading}
          // scroll={{x: 1500, y: 300}}
        />
      </div>
    );
  }
}

export default UserReview;
