import { Col, Input, Row, Skeleton } from "antd";
import React, { Component } from "react";
// import HttpRequest from "../../../utils/HttpRequest";
// const { REACT_APP_PERIJINAN } = process.env;

const { TextArea } = Input;

class DetailPerusahaanForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    if (this.props.dataperusahaan) {
      this.setState({
        namaPerusahaan: this.props.dataperusahaan.namaPerusahaan,
        nib: this.props.dataperusahaan.nib,
        npwp: this.props.dataperusahaan.npwp15,
        alamatPerusahaan: this.props.dataperusahaan.alamatPerusahaan,
        loading: false,
      });
    }
  }

  render() {
    const { namaPerusahaan, nib, npwp, alamatPerusahaan, loading } = this.state;
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
                <TextArea rows={3} value={alamatPerusahaan} disabled={true} />
              </Col>
            </Row>
            <br />
          </>
        )}
      </div>
    );
  }
}

export default DetailPerusahaanForm;
