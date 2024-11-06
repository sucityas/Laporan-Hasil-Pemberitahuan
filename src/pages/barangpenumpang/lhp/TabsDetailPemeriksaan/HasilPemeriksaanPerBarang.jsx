import React, { Component } from "react";
import { Row, Col, Card, Input, Form, Radio, Button } from "antd";

const { TextArea } = Input;

class HasilPemeriksaanPerBarang extends Component {
  state = {
    dataKesiapan: {
      valuehasilkesiapan: "0",
      kendala: "",
      uraianKendala: "",
    },
  };
  constructor() {
    super();
    this.state = {};
    this.KirimData = this.KirimData.bind(this);
  }

  async KirimData() {
    let DetailBarang = {
      kesesuaianbarang: this.state.valuehasilkesiapan,
      KeteranganLain: this.state.keteranganTambahan,
    };
    // console.log(DetailBarang);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log("prevProps : ", prevProps)
    // console.log("This props : ", this.props)
    if (prevProps.kesesuaianBarang !== this.props.kesesuaianBarang) {
      this.setState({
        kesesuaianBarang: this.props.kesesuaianBarang,
        keteranganTambahan: this.props.keteranganTambahan,
        readOnly: this.props.readOnly,
        requiredDetail: this.props.kesesuaianBarang !== null && this.props.keteranganTambahan !== null ? false : true,
      })
    }

    // if (prevProps.clear !== this.props.clear) {

    // console.log("this.state.kesesuaianBarang : ", this.state.kesesuaianBarang)
    if (this.props.clear === true && this.state.kesesuaianBarang !== null) {
      // console.log("MASUK")
      this.setState({
        kesesuaianBarang: null,
        keteranganTambahan: null,
        stop: true
      }, () => {
        this.props.handleStopClear()
      })
    }
    // }

  }

  componentDidMount() {
    this.setState({
      kesesuaianBarang: this.props.kesesuaianBarang,
      keteranganTambahan: this.props.keteranganTambahan,
      readOnly: this.props.readOnly,
      requiredDetail: this.props.kesesuaianBarang !== null && this.props.keteranganTambahan !== null ? false : true
    })
  }

  togglesiap() {
    this.setState({
      kendala: false,
    });
  }

  toggletdksiap() {
    this.setState({
      kendala: !this.state.kendala,
    });
  }

  onChangeSiap = (e) => {
    // console.log("radio checked", e.target.value);
    this.setState({
      kesesuaianBarang: e.target.value,
      perbaikiData: null
    });
  };

  onChangePerbaiki = (e) => {
    // console.log("radio checked", e.target.value);
    this.setState({
      perbaikiData: e.target.value,
    });
  };

  render() {
    return (
      <div id={this.props.requiredDetail === true ? "error" : ""}>
        <Card size="small" title="Hasil Pemeriksaan Per Barang">
          <Form>
            <Row gutter={8} style={{ margin: "5px" }}>
              <Col span={4}>
                <p>Kesesuaian Barang <span style={{ color: 'red' }}>*</span></p>
              </Col>
              <Col span={18}>
                <Radio.Group
                  readOnly={this.state.readOnly}
                  disabled={this.state.readOnly}
                  name="kesiapanPeriksa"
                  onChange={this.onChangeSiap}
                  value={this.state.kesesuaianBarang}
                >
                  <Radio value="1">Sesuai</Radio>
                  <Radio value="0">Tidak Sesuai</Radio>
                </Radio.Group>
              </Col>
            </Row>
            {/* { this.state.valuehasilkesiapan === "0" ? 
            <Row gutter={8} style={{ margin: "5px" }}>
              <Col span={4}>
                <p>Perbaiki Data Barang</p>
              </Col>
              <Col span={18}>
                <Radio.Group
                  name="perbaikiData"
                  onChange={this.onChangePerbaiki}
                  value={this.state.perbaikiData}
                >
                  <Radio value="Y">Ya</Radio>
                  <Radio value="N">Tidak</Radio>
                </Radio.Group>
              </Col>
            </Row>
            : null } */}
            <Row gutter={8} style={{ margin: "5px" }}>
              <Col span={4}>
                <p>Keterangan <span style={{ color: 'red' }}>*</span></p>
              </Col>
              <Col span={20}>
                <TextArea
                  name="keteranganTambahan"
                  rows={4}
                  readOnly={this.state.readOnly}
                  value={this.state.keteranganTambahan}
                  onChange={(e) =>
                    this.setState({ keteranganTambahan: e.target.value })
                  }
                  style={{ color: "black" }}
                />
              </Col>
            </Row>
          </Form>
          {/* <Button onClick={this.KirimData}>Kirim</Button> */}

        </Card>
        {this.props.requiredDetail === true ? (
          <p className={'text-red'} style={{ fontSize: '12px' }}>&nbsp; Silahkan isi semua data terlebih
            dahulu!</p>) : null}
      </div>
    );
  }
}

export default HasilPemeriksaanPerBarang;
