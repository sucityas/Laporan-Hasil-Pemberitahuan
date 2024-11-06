import React, { Component } from 'react';
import { Col, Row, Form, Input, Radio, Button } from 'antd';
import GlobalVariable from '../../../../helpers/GlobalVariable';

const { TextArea } = Input;
const {
  REACT_APP_REFERENSI,
  REACT_APP_SECRET_KEY_REFERENSI,
  REACT_APP_LHP,
  REACT_APP_SECRET_KEY_LHP,
  REACT_APP_HDFS,
  REACT_APP_SECRET_KEY_HDFS,
} = process.env;
const idLhpHeader = localStorage.getItem("idLhpHeader");

class RealisasiMemo extends Component {
  state = {
    realisasiMemo: 1,
    idlhpheader: this.props.idLhpHeader,
  };

  constructor(props) {
    super(props);
    this.KirimData = this.KirimData.bind(this);
  }

  async getMemoPFPD() {
    let idHeader = localStorage.getItem('idHeader');
    this.setState({ fetching: true });
    fetch(`${REACT_APP_LHP}/memo-pemeriksaan/${idHeader}`, {
      headers: {
        accept: 'application/json',
        'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
      },
      'Access-Control-Allow-Origin': '*',
    })
        .then((response) => response.json())
        .then((body) => {
          this.setState({
            memo: body.listData,
            realisasiMemo: body.listData[0].realisasiMemo,
            keteranganRealisasiMemo: body.listData[0].keteranganRealisasiMemo,
          });
          console.log(this.state.memo);
        })
        .catch((err) => {
          console.log(err.message);
          // if(error.response.status === 404){
          //     return Notification('failed', "Data Tidak Ditemukan")
          // }
          this.setState({ loading: false });
          // GlobalVariable.openNotificationWithIcon('error')
        });
  }

  getMemoJenis() {
    let idLhpHeader = this.state.idlhpheader;
    this.setState({fetching: true});
    fetch(`${REACT_APP_LHP}/get-bap-memo-jenis/${idLhpHeader}`, {
      headers: {
        accept: 'application/json',
        'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
      },
      'Access-Control-Allow-Origin': '*',
    })
        .then((response) => response.json())

        .then((body) => {
          this.setState({
            skeletonMemoJenis: false,
            //Hasil Pemeriksaan
            kondisiSegel: body.listData[0].kondisiSegel,
            tingkatIp: body.listData[0].realisasiIp,
            kodeJenisKemasan: body.listData[0].kodeJenisKemasan,
            //Realisasi Memo PFPD
            realisasiMemo: body.listData[0].realisasiMemo,
            keteranganRealisasiMemo: body.listData[0].keteranganRealisasiMemo,
            //Kesimpulan Hasil Pemeriksaan
            kesimpulanhasil: body.listData[0].kesimpulanPemeriksaan,
            Catatan: body.listData[0].catatanKesimpulan,
            //Nomor dan Jumlah Kemasan
            nomorKemasan: body.listData[0].nomorKemasan,
            jumlahKemasan: body.listData[0].jumlahKemasan,
            //  alasan PKB
            alasanPemeriksaan: body.listData[0].alasanPkb,
            //  PenggunaanPalet
            valuePalet: body.listData[0].penggunaanPalet
          });
        })
        .catch((err) => {
          console.log(err.message);
          // if(error.response.status === 404){
          //     return Notification('failed', "Data Tidak Ditemukan")
          // }
          this.setState({loading: false});
          GlobalVariable.openNotificationWithIcon('error');
        });
  }

  componentDidMount() {
    this.getMemoPFPD();
    if (this.state.idlhpheader !== "null") {
      this.getMemoJenis()
    }
  }

  async KirimData() {
    let modelPenerbitanSkepAeo = {
      radiomemo: this.state.memopfpd,
      keteranganmemo: this.state.Keterangan,
    };

    console.log(modelPenerbitanSkepAeo);
  }

  onChangeMemo = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      realisasiMemo: e.target.value,
    });
    console.log(this.state.valuedimintakembali);
  };

  render() {
    const {rekamMemo, flagBap} = this.props;
    return (
        <div>
          <Form>
            <Row className="mb-2" gutter={8}>
              <Col span={6} style={{ textAlign: 'start' }}>
                Memo PFPD dilaksanakan?
              </Col>
              <Col span={18}>
                <Radio.Group
                    value={this.state.realisasiMemo}
                    disabled={rekamMemo || flagBap === '2'}
                    onChange={this.onChangeMemo}
                >
                  <Radio value={'Y'}>Ya</Radio>
                  <Radio value={'S'}>Sebagian</Radio>
                  <Radio value={'T'}>Tidak</Radio>
                </Radio.Group>
              </Col>
            </Row>
            <Row className="mb-2" gutter={8}>
              <Col span={6} style={{ textAlign: 'start' }}>
                Keterangan
              </Col>
              <Col span={18}>
                <TextArea
                    value={this.state.keteranganRealisasiMemo}
                    // eslint-disable-next-line eqeqeq
                    disabled={rekamMemo || flagBap === '2'}
                    onChange={(e) => this.setState({ keteranganRealisasiMemo: e.target.value })}
                />
              </Col>
            </Row>
          </Form>
          {/*<Button onClick={this.KirimData}>Kirim</Button>*/}
        </div>
    );
  }
}

export default RealisasiMemo;
