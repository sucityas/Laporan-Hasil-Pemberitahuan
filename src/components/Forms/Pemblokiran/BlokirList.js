import { Col, Row, Table, Button } from "antd";
import Axios from "axios";
import React, { Component } from "react";
import "./click.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { getUser } from "../../../utils/DataUser";

class DetailBlokirList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      this.setState({
        loading: true,
      });

      let npwp = this.props.data || [];
      const nip = getUser().nip;
      const role = this.props.role;
      const isLocalhost =
        window.location.host == "ceisa40-dev.customs.go.id" || "localhost:3150";
      const kodePetugas =
        role === "analis"
          ? "00101"
          : role === "kasi"
            ? "00102"
            : role === "kasubdit"
              ? "00103"
              : null;
      npwp = npwp.npwp || "";
      const res = await Axios.get(
        `${process.env.REACT_APP_PERIJINAN}/pemblokiran/rekomendasi-pembukaan-blokir/${npwp}?kodePetugas=${kodePetugas}&nip=${nip}`,
        {
          headers: {
            [isLocalhost ? "beacukai-api-key" : "customs-api-key"]:
              process.env.REACT_APP_SECRET_KEY_PERIJINAN,
          },
        }
      );

      if (res.status === 200) {
        const temp = res.data.data.dataBlokir.filter((e) => e !== null);
        const lampiranData = res.data.data.dataPemohon.filter(
          (e) => e !== null
        );
        this.setState(
          {
            data: temp,
            lampiranData,
          },
          () => {
            this.props.dataTable(temp);
            this.props.lampiranData(lampiranData);
          }
        );
      }
    } catch (error) {
      // this.getData()
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  onClickRow = (record) => {
    return {
      onClick: () => {
        this.setState(
          {
            seqPembukaanBlokir: record.seqPembukaanBlokir,
            dataBukaBlokir: record
          },
          () => {
            this.props.dataPemohon(record);
          }
        );
        console.log(this.state.dataBukaBlokir, 'data buka blokir')
      },
    };
  };

  setRowClassName = (record) => {
    return record.seqPembukaanBlokir === this.state.seqPembukaanBlokir
      ? "clickRowStyl"
      : "";
  };

  render() {
    let { history } = [];
    const columns = [
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
        fixed: "right",
        width: 100,
        render: (record) => {
          return (
            <>
              <Link
                to={{
                  pathname: "/pemblokiran/detail-blokir",
                  data: record.idPerusahaanBlokir,
                  role: this.props.role,
                }}
              >
                <Button>Detail</Button>
              </Link>
            </>
          );
        },
      },
    ];
    return (
      <div>
        <hr />
        <Row gutter={10}>
          <Col>
            <Table
              loading={this.state.loading}
              columns={columns}
              dataSource={this.state.data}
              scroll={{ x: 1500, y: 300 }}
              onRow={(record, dataIndex) => this.onClickRow(record)}
              rowClassName={this.setRowClassName}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DetailBlokirList;
