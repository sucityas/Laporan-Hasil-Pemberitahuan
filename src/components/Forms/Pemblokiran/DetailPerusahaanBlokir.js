import { Col, Input, Row, Skeleton } from "antd";
import React, { Component } from "react";
import HttpRequest from "../../../utils/HttpRequest";
const { REACT_APP_PERIJINAN } = process.env;

const { TextArea } = Input;

class DetailPerusahaanBlokir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namaPerusahaan: "",
      npwp: "",
      nib: "",
      alamat: "",
      seqPerusahaan: "",
      // dataPerusahaan: [],
      loading: true,
    };
  }

  // getPerusahaan = async () => {
  //   const seqPerusahaan = this.state.seqPerusahaan;
  //   try {
  //     const { data } = await HttpRequest.get({
  //       url: `${REACT_APP_PERIJINAN}/pemblokiran/detail-blokir-single/${seqPerusahaan}`,
  //     });
  //     this.setState({
  //       dataPerusahaan: data.data[0],
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  componentDidMount() {
    // this.setState(
    //   {
    //     seqPerusahaan: this.props.dataperusahaan
    //       ? this.props.dataperusahaan
    //       : "",
    //   },
    //   () => {
    //     this.getPerusahaan();
    //   }
    // );
    // console.log(this.state.seqPerusahaan, 'data seq perusahaan')
  }

  render() {
    // const namaPerusahaan = this.state.dataPerusahaan.namaPerusahaan ? this.state.dataPerusahaan.namaPerusahaan : this.props.dataperusahaan.namaPerusahaan;
    // const npwp = this.state.dataPerusahaan.npwp ? this.state.dataPerusahaan.npwp : this.props.dataperusahaan.npwp;
    // const alamat = this.state.dataPerusahaan.alamatPerusahaan ? this.state.dataPerusahaan.alamatPerusahaan : this.props.dataperusahaan.alamat;
    // const nib = this.state.dataPerusahaan.nib ? this.state.dataPerusahaan.nib : this.props.dataperusahaan.nib;

    const
      namaPerusahaan = this.props.dataperusahaan ? this.props.dataperusahaan.namaPerusahaan : null,
      npwp = this.props.dataperusahaan ? this.props.dataperusahaan.npwp : null,
      alamat = this.props.dataperusahaan ? this.props.dataperusahaan.alamatPerusahaan : null,
      nib = this.props.dataperusahaan ? this.props.dataperusahaan.nib : null;
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
                <Input value={namaPerusahaan} disabled={true} />
              </Col>
              <Col span={4}>NPWP (9 DIGIT)</Col>
              <Col span={8}>
                <Input value={npwp} disabled={true} />
              </Col>
            </Row>
            <br />

            <Row gutter={10}>
              <Col span={4}>NIB</Col>
              <Col span={8}>
                <Input value={nib} disabled={true} />
              </Col>

              <Col span={4}>Alamat</Col>
              <Col span={8}>
                <TextArea rows={3} value={alamat} disabled={true} />
              </Col>
            </Row>
            <br />
          </>
        )}
      </div>
    );
  }
}

export default DetailPerusahaanBlokir;
