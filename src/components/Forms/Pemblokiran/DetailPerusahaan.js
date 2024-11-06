import { Col, Input, Row, Skeleton } from "antd";
import React, { Component } from "react";
import axios from "axios";
import HttpRequest from "../../../utils/HttpRequest";
const { REACT_APP_PERIJINAN, REACT_APP_SECRET_KEY_PERIJINAN, REACT_APP_SCE_WS, REACT_APP_SECRET_KEY_SCE_WS } = process.env;

const { TextArea } = Input;

class DetailBlokirForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namaPerusahaan: "",
      npwp: "",
      nib: "",
      alamat: "",
      seqPerusahaan: "",
      dataPerusahaan: [],
      loading: true,
    };
  }

  // fetchPerusahaan = () => {
  //   // console.log('Form3D v1')
  //   // var getdataUser = JSON.parse(localStorage.getItem('dataUser'));

  //   axios.get(`${REACT_APP_SCE_WS}/profil/perusahaan/perusahaan-by-npwp?npwp=${this.state.npwp}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Beacukai-Api-Key': `${REACT_APP_SECRET_KEY_SCE_WS}`,
  //     }
  //   })
  //     .then(res => {
  //       //console.log(res.data)
  //       this.props.form.setFieldsValue({
  //         namaWp: res.data.namaPerusahaan,
  //         npwp: res.data.npwp,
  //         jalan: res.data.alamatPerusahaan,

  //       })
  //       console.log(this.state.npwp, 'npwp')
  //     })
  // }

  getPerusahaan = async () => {
    const seqPerusahaan = this.state.seqPerusahaan;
    try {
      const { data } = await HttpRequest.get({
        url: `${REACT_APP_PERIJINAN}/pemblokiran/detail-blokir-single/${seqPerusahaan}`,
      });
      this.setState({
        dataPerusahaan: data.data[0],
      });
    } catch (e) {
      console.log(e);
    }
    console.log(this.state.dataPerusahaan, 'data perusahaan')
  };

  componentDidMount() {
    // this.setState(
    //   {
    //     seqPerusahaan: this.props.dataperusahaan
    //       ? this.props.dataperusahaan
    //       : "",
    //   },
    //   () => {
    //     this.getPerusahaan();
    //     this.fetchPerusahaan();
    //   }
    // );
    const { data } = this.props.dataperusahaan;
    console.log(data, 'data lempar detail perusahaan')
    console.log(data.npwp15, 'data idPerusahaanPajak')
    // axios.get(`${REACT_APP_SCE_WS}/profil/perusahaan/perusahaan-by-npwp?npwp=${data.npwp15}`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Beacukai-Api-Key': `${REACT_APP_SECRET_KEY_SCE_WS}`,
    //   }
    // })
    //   .then(res => {
    //     //console.log(res.data)
    //     this.setState({
    //       namaWp: res.data.namaPerusahaan,
    //       npwp: res.data.npwp,
    //       jalan: res.data.alamatPerusahaan,

    //     })
    //     console.log(res.data, 'data perusahaan')
    //   })
    axios.get(`${REACT_APP_PERIJINAN}/v1/perusahaan?npwp15=${data.npwp15}`,
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
          namaPerusahaan: res.data.data[0].namaPerusahaan,
          nib: res.data.data[0].nib,
          npwp: res.data.data[0].npwp,
          alamatPerusahaan: res.data.data[0].alamatPerusahaan,
          loading: false,
        })
      })
    console.log('npwp', this.state.npwp)

    this.getPerusahaan();
    // this.fetchPerusahaan();
  }

  render() {
    // const namaPerusahaan = this.state.dataPerusahaan.namaPerusahaan ? this.state.dataPerusahaan.namaPerusahaan : this.props.dataPerusahaanDetail.namaPerusahaan;
    // const npwp = this.state.dataPerusahaan.npwp ? this.state.dataPerusahaan.npwp : this.props.dataPerusahaanDetail.npwp;
    // const alamat = this.state.dataPerusahaan.alamatPerusahaan ? this.state.dataPerusahaan.alamatPerusahaan : this.props.dataPerusahaanDetail.alamat;
    // const nib = this.state.dataPerusahaan.nib ? this.state.dataPerusahaan.nib : this.props.dataPerusahaanDetail.nib;
    const { loading } = this.props;
    return (
      <div>
        {loading ? (
          <Skeleton active paragraph={{ rows: 8 }} />
        ) : (
          <>
            <br />
            <Row gutter={10}>
              <Col span={4}>Nama Perusahaan</Col>
              <Col span={8}>
                <Input value={this.state.namaPerusahaan} disabled={true} />
              </Col>
              <Col span={4}>NPWP (9 DIGIT)</Col>
              <Col span={8}>
                <Input value={this.state.npwp} disabled={true} />
              </Col>
            </Row>
            <br />

            <Row gutter={10}>
              <Col span={4}>NIB</Col>
              <Col span={8}>
                <Input value={this.state.nib} disabled={true} />
              </Col>

              <Col span={4}>Alamat</Col>
              <Col span={8}>
                <TextArea rows={3} value={this.state.alamatPerusahaan} disabled={true} />
              </Col>
            </Row>
            <br />
          </>
        )}
      </div>
    );
  }
}

export default DetailBlokirForm;
