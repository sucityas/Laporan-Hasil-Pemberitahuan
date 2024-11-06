import React, { Component } from "react";
import { connect } from 'react-redux';
import { 
    Drawer, 
    Button,
    Tabs,
    Modal, 
    Input, 
    Col, 
    Form, 
    Result, 
    DatePicker, 
    Radio, 
    Row, 
    ModalHeader, } from 'antd';
import cetakanDokumenPemberitahuanPabean from '../../src/pages/pfpd/PfpdBarang/cetakanDokumenPemberitahuanPabean.pdf';

import ReactTable from "react-table";
import "react-table/react-table.css";
import { Label } from "devextreme-react/data-grid";
import { style } from "@material-ui/system";
import { createGenerateClassName } from "@material-ui/core";
import { Width } from "devextreme-react/range-selector";
import ReactQuill from 'react-quill'; // ES6
import {Link} from 'react-router-dom'


const { TabPane } = Tabs;
const { confirm } = Modal;
const { TextArea } = Input;

function onChange(date, dateString) {
    console.log(date, dateString);
  }

function callback(key) {
    console.log(key);
}
function modalAtensiLarangan () {
    confirm({
      title: <b>K O N F I R M A S I</b>,
      okText: 'Yakin',
      cancelText:'Tidak',
      content:   
          <p style={{textAlign:"left"}}>
            Apakah Anda yakin atas Dokumen Pabean ini akan DIATENSI LARTAS untuk P2?          
        </p >, 
      onOk() {},
      onCancel() {},
    });
  }

  function modalUjiLab () {
    confirm({
      title: <b>K O N F I R M A S I</b>,
      okText: 'Yakin',
      cancelText:'Tidak',
      content:   
          <p style={{textAlign:"left"}}>
            Apakah Anda yakin akan mengirim barang ke Laboratorium TANPA cetak SPPB?       
        </p >, 
      onOk() {},
      onCancel() {},
    });
  }

  function modalAtensiAudit() {
    Result({
        title: <b>K O N F I R M A S I</b>,
        okText: 'Yakin',
        cancelText:'Tidak',
        content:   
            <p style={{textAlign:"left"}}>
            Apakah Anda yakin atas Dokumen Pabean ini akan DIATENSI AUDIT?           
             </p >, 
        onOk() {},
//     <Result
//     status="success"
//     title="Successfully Purchased Cloud Server ECS!"
//     subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
//     extra={[
//       <Button type="primary" key="console">
//         Go Console
//       </Button>,
//       <Button key="buy">Buy Again</Button>,
//     ]}
//   />,
  });
}



class StickyToolTwoButtons extends Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)

        console.log(this.props)
    }
    state = { 
        text: '',
        visible: false,
        placement: 'right' ,
        childrenDrawer: false,
        modal_informasi:false,
        modal_dnp:false,
        modal_undangan:false,
        modal_hasil:false,
        modal_npd:false,
        modal_kub:false,
        modal_lab:false,
        modal_dokumen_pabean:false,
        modal_atensi_larangan:false,
        modal_atensi_audit:false,
    };

    handleChange(value) {
        this.setState({ text: value })
      }

    showModalInformasi = () =>{
        this.setState({
            modal_informasi:true
        });
    };

    showModalDNP = () =>{
        this.setState({
            modal_dnp:true
        });
    };

    showModalUndangan = () =>{
        this.setState({
            modal_undangan:true
        });
    };

    showModalHasil = () =>{
        this.setState({
            modal_hasil:true
        });
    };

    showModalNPD = () =>{
        this.setState({
            modal_npd:true
        });
    };

    showModalKUB = () =>{
        this.setState({
            modal_kub:true
        });
    };

    showModalLab = () =>{
        this.setState({
            modal_lab:true
        });
    };

    showModalDokumenPabean = () =>{
        this.setState({
            modal_dokumen_pabean:true
        });
    };

    showModalAtensiLarangan = () =>{
        this.setState({
            modal_atensi_larangan:true
        });
    };

    showModalAtensiAudit = () =>{
        this.setState({
            modal_atensi_audit:true
        });
    };


    handleOk = e => {
        console.log(e);
        this.setState({
            modal_informasi:false,
            modal_dnp:false,
            modal_undangan:false,
            modal_hasil:false,
            modal_npd:false,
            modal_kub:false,
            modal_lab:false,
            modal_dokumen_pabean:false,
            modal_atensi_larangan:false,
            modal_atensi_audit:false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
            modal_informasi:false,
            modal_dnp:false,
            modal_undangan:false,
            modal_hasil:false,
            modal_npd:false,
            modal_kub:false,
            modal_lab:false,
            modal_dokumen_pabean:false,
            modal_atensi_larangan:false,
            modal_atensi_audit:false,
        });
      };
    
    showDrawerA = () => {
        this.setState({
            visible: true,
        });
    };
    
    showChildrenDrawer = () => {
        this.setState({
            childrenDrawer: true,
        });
    };
    
    onChildrenDrawerClose = () => {
        this.setState({
            childrenDrawer: false,
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    
    onChange = e => {
        this.setState({
            placement: e.target.value,
        });
    };
    
    render() {
        // const { visible, form } = this.props;
        // const { getFieldDecorator } = form;
        const RiwayatAktivitas = (props) => {

            // console.log(props);
            return (
              
                <div class="kt-timeline-v2__item">
                <span class="kt-timeline-v2__item-time">14:00</span>
                <div class="kt-timeline-v2__item-cricle">
                    <i class="fa fa-genderless kt-font-danger"></i>
                </div>
                <div class="kt-timeline-v2__item-text kt-padding-top-5">
                    <strong>Putus Dokumen PPFTZ-01</strong>
                    <span class="kt-badge kt-badge--danger kt-badge--dot kt-badge--sm"></span>
                    PT LAR IKAN HAES
                    <span class="kt-badge kt-badge--danger kt-badge--dot kt-badge--sm"></span>
                    000004 tanggal 07-07-2019
                    <span class="kt-badge kt-badge--danger kt-badge--dot kt-badge--sm"></span>
                    Keputusan : SPTNP
                </div>
            </div>
              );
            }
        return (
            <>
            <ul class="kt-sticky-toolbar ulStyle">
            <li class="kt-sticky-toolbar__item kt-sticky-toolbar__item--brand" id="kt_demo_panel_toggle" data-toggle="kt-tooltip" title="" data-placement="right" data-original-title="Tools PFPD">
            <a onClick={this.showDrawerA} class="klikButtons"><i class="flaticon2-gear"></i></a>
            </li>
            {/* <li class="kt-sticky-toolbar__item kt-sticky-toolbar__item--brand" id="kt_quick_panel_toggler_btn" data-toggle="kt-tooltip" title="" data-placement="right" data-original-title="Lihat Informasi Terkait">
            <a onClick={this.showChildrenDrawer} class=""><i class="flaticon-information"></i></a>
            </li>
            <li class="kt-sticky-toolbar__item kt-sticky-toolbar__item--brand" id="btnLihatHeader" data-toggle="kt-tooltip" title="" data-placement="right" data-original-title="Lihat Cetakan Dokumen Pemberitahuan Pabean">
            <a href={cetakanDokumenPemberitahuanPabean} target="Cetakan Dokumen Pemberitahuan Pabean"  class=""><i class="fa fa-file-pdf"></i></a>
            </li> */}
            </ul>
            
            <Drawer
            title=""
            placement={this.state.placement}
            closable={true}
            onClose={this.onClose}
            visible={this.state.visible}
            width={325}
            >
            <Tabs defaultActiveKey="tools" onChange={callback}>
            <TabPane tab="Tools" key="tools">
            <div class="kt-align-center" style={{ overflow: "hidden"}}>
            <h3 class="kt-demo-panel__title" style={{margin:"0px auto"}}>
            <strong>Flag / Tanda</strong><br/>
            <small>Pemeriksaan Dokumen</small>
            </h3>
            <br/>
            <div class="kt-demo-panel__item kt-demo-panel__item--active">
            <div class="kt-demo-panel__item-title">
            </div>
            <div class="kt-demo-panel__item-preview" style={{border:"none"}}>
            <a class="btn btn-block btn-secondary btn-width" onClick={this.showModalInformasi} ><i class=""></i> Informasi Nilai Pabean (INP)</a>
            <a class="btn btn-block btn-secondary btn-width" onClick={this.showModalDNP}><i class=""></i> Terima Deklarasi Nilai Pabean (DNP)</a>
            <a class="btn btn-block btn-secondary btn-width" onClick={this.showModalUndangan}><i class=""></i> Undangan Konsultasi Nilai Pabean</a>
            <a class="btn btn-block btn-secondary btn-width" onClick={this.showModalHasil}><i class=""></i> Hasil Konsultasi Nilai Pabean</a>
            <a class="btn btn-block btn-secondary btn-width"><i class=""></i> Nota Permintaan Dokumen (NPD)</a>
            <a class="btn btn-block btn-secondary btn-width" onClick={this.showModalKUB}><i class=""></i> Konfirmasi Uraian Barang (KUB)</a>
            <a class="btn btn-block btn-secondary btn-width" onClick={modalUjiLab}><i class=""></i> Uji Laboratorium</a>
            <a class="btn btn-block btn-width btn-default" onClick={this.showModalDokumenPabean}><i class=""></i> Arsip Dokumen Pabean</a>
            <a class="btn btn-block btn-width btn-default" onClick={modalAtensiLarangan}><i class=""></i> Atensi Larangan / Pembatasan</a>
            <a class="btn btn-block btn-width btn-default" onClick={modalAtensiAudit}><i class=""></i> Atensi Audit</a>
            </div>
            </div>
            <br/>
            <div class="kt-divider" style={{marginBottom:"20px"}}>
            <span></span>
            <span>| |</span>
            <span></span>
            </div>
            <h3 class="kt-demo-panel__title" style={{margin:"0px auto"}}>
            <strong>Alat Bantu</strong><br/>
            <small>Pemeriksaan Dokumen</small>
            </h3>
            <br/>
            <div class="kt-demo-panel__item kt-demo-panel__item--active">
            <div class="kt-demo-panel__item-title">
            </div>
            <div class="kt-demo-panel__item-preview" style={{border:"none"}}>
            <a class="btn btn-block btn-secondary btn-width" href="javascript:;"><i class=""></i> Harga Barang Fluktuatif</a>
            <a class="btn btn-block btn-secondary btn-width" href="javascript:;"><i class=""></i> Harga Barang Lartas / Indikasi BK / DII</a>
            <a class="btn btn-block btn-secondary btn-width" href="javascript:;"><i class=""></i> Geser HS</a>
            <a class="btn btn-block btn-secondary btn-width" href="javascript:;"><i class=""></i> Rekomendasi HS</a>
            <a class="btn btn-block btn-secondary btn-width" href="javascript:;"><i class=""></i> Rekomendasi Harga</a>
            <a class="btn btn-block btn-secondary btn-width" href="javascript:;"><i class=""></i> Penetapan Klasifikasi Sebelum Impor (PKSI)</a>
            <a class="btn btn-block btn-secondary btn-width" href="javascript:;"><i class=""></i> Keputusan PFPD lain</a>
            <a class="btn btn-block btn-secondary btn-width" href="javascript:;"><i class=""></i> Hasil Keberatan dan atau Banding</a>
            <Link to="./search"><a class="btn btn-block btn-secondary btn-width" href="javascript:;"><i class=""></i> CEISA Search</a></Link>
            <a class="btn btn-block btn-secondary btn-width" href="javascript:;"><i class=""></i> Peraturan</a>
            </div>
            </div>
            <div class="ps__rail-x" style={{left: "0px", bottom: "0px"}}>
            <div class="ps__thumb-x" tabindex="0" style={{left: "0px", width: "0px"}}></div>
            </div>
            <div class="ps__rail-y" style={{top: 0 , height: "602px",right: "0px"}}>
            <div class="ps__thumb-y" tabindex="0" style={{top: 0, height: "300px" }}>
            </div>
            </div>
            </div>
            </TabPane>
            <TabPane tab="Aktivitas" key="aktivitas">
            
  <div className="kt-timeline-v2">
    <div className="kt-timeline-v2__items  kt-padding-top-25 kt-padding-bottom-30">
      <div className="kt-timeline-v2__item">
        <span className="kt-timeline-v2__item-time">14:00</span>
        <div className="kt-timeline-v2__item-cricle">
          <i className="fa fa-genderless kt-font-danger" />
        </div>
        <div className="kt-timeline-v2__item-text kt-padding-top-5">
          <strong>Putus Dokumen PPFTZ-01</strong>
          <span className="kt-badge kt-badge--danger kt-badge--dot kt-badge--sm" />
          PT LAR IKAN HAES
          <span className="kt-badge kt-badge--danger kt-badge--dot kt-badge--sm" />
          000004 tanggal 07-07-2019
          <span className="kt-badge kt-badge--danger kt-badge--dot kt-badge--sm" />
          Keputusan : SPTNP
        </div>
      </div>
      <div className="kt-timeline-v2__item">
        <span className="kt-timeline-v2__item-time">12:45</span>
        <div className="kt-timeline-v2__item-cricle">
          <i className="fa fa-genderless kt-font-success" />
        </div>
        {/*<div class="kt-timeline-v2__item-text kt-timeline-v2__item-text--bold">*/}
        <div className="kt-timeline-v2__item-text kt-padding-top-5">
          <strong>Putus Dokumen PPFTZ-01</strong>
          <span className="kt-badge kt-badge--success kt-badge--dot kt-badge--sm" />
          PT TERNAK KANGKUNG
          <span className="kt-badge kt-badge--success kt-badge--dot kt-badge--sm" />
          000005 tanggal 07-07-2019
          <span className="kt-badge kt-badge--success kt-badge--dot kt-badge--sm" />
          Keputusan : OK
        </div>
      </div>
      <div className="kt-timeline-v2__item">
        <span className="kt-timeline-v2__item-time">10:00</span>
        <div className="kt-timeline-v2__item-cricle">
          <i className="fa fa-genderless kt-font-danger" />
        </div>
        <div className="kt-timeline-v2__item-text kt-padding-top-5">
          <strong>Ajukan Barang Contoh ke Laboratorium</strong>
          <span className="kt-badge kt-badge--danger kt-badge--dot kt-badge--sm" />
          PT TERNAK KANGKUNG
          <span className="kt-badge kt-badge--danger kt-badge--dot kt-badge--sm" />
          000005 tanggal 07-07-2019
        </div>
      </div>
    </div>
  </div>


            </TabPane>
            </Tabs>
            </Drawer>
            <Drawer
            title=""
            width={400}
            closable={true}
            onClose={this.onChildrenDrawerClose}
            visible={this.state.childrenDrawer}
            >
            <Tabs defaultActiveKey="1" onChange={callback}>
            {/* Tab Pertama */}
            <TabPane tab="Header" key="1">
            <Tabs defaultActiveKey="1">
            <TabPane tab="Pengirim" key="11">
            <DummyTab/>
            </TabPane>
            <TabPane tab="Penerima" key="22">
            <DummyTab/>
            </TabPane>
            <TabPane tab="Penjual" key="33">
            <DummyTab/>
            </TabPane>
            <TabPane tab="Pembeli" key="44">
            <DummyTab/>
            </TabPane>
            <TabPane tab="PPJK" key="55">
            <DummyTab/>
            </TabPane>
            </Tabs>
            </TabPane>
            
            {/* Tab dalem Tab anjg */}
            <TabPane tab="Status&Respon" key="2">
            <Tabs>
            <TabPane tab="Status" key="66">
            <IsiStatus/>
            </TabPane>
            <TabPane tab="Respon" key="77">
            <IsiRespon/>
            </TabPane>
            </Tabs>
            </TabPane>
            
            </Tabs>,
            </Drawer>

            {/* ----------- Modal INP ----------  */}
            <Modal
            title="Informasi Nilai Pabean (INP)"
            visible={this.state.modal_informasi}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Batal
                </Button>,
                <Button key="submit" type="primary" onClick={this.handleOk}>
                  Kirim
                </Button>,
              ]}
          >
              <Col><label>Seri Barang perlu Informasi Nilai Pabean</label></Col>
              <Col>
              <TextArea
              type="area"
              placeholder="seri barang"/></Col>
              
          </Modal>

            {/* ----------- Modal DNP ----------  */}
          <Modal
            md={'3'}
            title="Rekam Penerimaan Deklarasi Nilai Pabean (DNP)"
            visible={this.state.modal_dnp}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Batal
                </Button>,
                <Button key="submit" type="primary" onClick={this.handleOk}>
                  Kirim
                </Button>,
              ]}
          >
              <Form>
                  <Row>
                    
                        <Col>
                        <p>Nomor</p>
                        <Input 
                        type="textarea"
                        md={'3'}/>
                        </Col>
                        <Col>
                        <p>Tanggal</p>
                        <DatePicker onChange={onChange} />
                        </Col>
                      
                  </Row>
                <Col>
                <label>Penerimaan DNP</label>
                </Col>
                <Col>
                <Radio.Group name="radiogroup" defaultValue={1}>
                <Radio value={1}>Diterima</Radio>
                <Radio value={2}>Tidak Diterima</Radio>
                </Radio.Group>
                </Col>
              </Form>
          </Modal>
          <Modal
            title="Konfirmasi Uraian Barang"
            visible={this.state.modal_informasi}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Batal
                </Button>,
                <Button key="submit" type="primary" onClick={this.handleOk}>
                  Kirim
                </Button>,
              ]}
          >
              <Form>
                  <Row>
                <Input 
                placeholder="seri barang yang perlu KUB"/>
                </Row>
              </Form>
          </Modal>
          <Modal
            title="Undangan Konsultasi Nilai Pabean"
            visible={this.state.modal_undangan}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Batal
                </Button>,
                <Button key="submit" type="primary" onClick={this.handleOk}>
                  Kirim
                </Button>,
              ]}
          >
              <Form>
                  <Row>
                <Input 
                type="textarea"
                placeholder="data dan/atau data tambahan"/>
                </Row>
              </Form>
          </Modal>
          <Modal
            title="Basic Modal"
            visible={this.state.modal_hasil}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
           
          </Modal>
          <Modal
            title="Konfirmasi"
            visible={this.state.modal_warn}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Tidak
                </Button>,
                <Button key="submit" type="primary" onClick={this.handleOk}>
                  Yakin
                </Button>,
              ]}
          >
            <ReactQuill value={this.state.text}
                onChange={this.handleChange}/> 
          </Modal>

              {/* ----------- Modal Dokumen Pabean --------- */}
              
          <Modal
            title="Arsip Dokumen Pabean
            "
            visible={this.state.modal_dokumen_pabean}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Batal
                </Button>,
                <Button key="submit" type="primary" onClick={this.handleOk}>
                  Rekam
                </Button>,
              ]}
          >
              <Col><label>Alasan Penyelesaian Dokumen Pabean</label></Col>
              <Col>
              <TextArea
              rows={4}
              /></Col>
              <Col><label className={""} style={{color:"red", padding:"0px 12px 12px 0", fontSize:"10px"}} >*Dengan keputusan ini, pemeriksaan/penelitian Dokumen Pabean dianggap selesai (tidak akan terbit SPPB/SPTNP)
</label></Col>

          </Modal>
            </>            
        )
    }

}

function DummyTab() {
    return (
        <div class="tab-content">
        <div class="tab-pane active" id="tabs_pengirim" role="tabpanel">
        <dl class="row">
        <dt class="col-sm-3 text-right">No. ID</dt>
        <dd class="col-sm-9">-</dd>
        
        <dt class="col-sm-3 text-right">Nama</dt>
        <dd class="col-sm-9"><a href="http://10.102.104.51/profilPerusahaan/?perusahaan=pengirim" target="Profil Pengirim" onclick="bukaJendelaProfil('pengirim', 'Profil Pengirim'); return false;" title="Lihat Profil Perusahaan">JABIL CIRCUIT SDN BHD</a></dd>
        
        <dt class="col-sm-3 text-right">Alamat</dt>
        <dd class="col-sm-9">56, HILIR SUNGAI KLUANG 1BAYAN LEPAS INDUSTRIAL PARK,PHASE 4 11900 BAYAN LEPAS, PULAU PINANG</dd>
        
        <dt class="col-sm-3 text-right">Negara</dt>
        <dd class="col-sm-9">Malaysia [MY]</dd>
        </dl>
        </div>
        <div class="tab-pane" id="tabs_penerima" role="tabpanel">
        <dl class="row">
        <dt class="col-sm-3 text-right">No. ID</dt>
        <dd class="col-sm-9"><a href="http://10.102.104.51/profilPerusahaan/?perusahaan=penerima" target="Profil Penerima" onclick="bukaJendelaProfil('penerima', 'Profil Penerima'); return false;" title="Lihat Profil Perusahaan">016172629217000</a></dd>
        
        <dt class="col-sm-3 text-right">Nama</dt>
        <dd class="col-sm-9"><a href="http://10.102.104.51/profilPerusahaan/?perusahaan=penerima" target="Profil Penerima" onclick="bukaJendelaProfil('penerima', 'Profil Penerima'); return false;" title="Lihat Profil Perusahaan">PT. OSI ELECTRONICS</a></dd>
        
        <dt class="col-sm-3 text-right">Alamat</dt>
        <dd class="col-sm-9">CAMMO INDUSTRIAL PARK, BLOK F NO. 3A, BALOIPERMAI, BATAM KOTA</dd>
        
        <dt class="col-sm-3 text-right">Negara</dt>
        <dd class="col-sm-9">Indonesia [ID]</dd>
        </dl>
        </div>
        <div class="tab-pane" id="tabs_penjual" role="tabpanel">
        <dl class="row">
        <dt class="col-sm-3 text-right">No. ID</dt>
        <dd class="col-sm-9">-</dd>
        
        <dt class="col-sm-3 text-right">Nama</dt>
        <dd class="col-sm-9">
            <a href="http://10.102.104.51/profilPerusahaan/?perusahaan=penjual" target="Profil Penjual" onclick="bukaJendelaProfil('penjual', 'Profil Penjual'); return false;" title="Lihat Profil Perusahaan"></a>
        </dd>
        
        <dt class="col-sm-3 text-right">Alamat</dt>
        <dd class="col-sm-9">56, HILIR SUNGAI KLUANG 1BAYAN LEPAS INDUSTRIAL PARK,PHASE 4 11900 BAYAN LEPAS, PULAU PINANG</dd>
        
        <dt class="col-sm-3 text-right">Negara</dt>
        <dd class="col-sm-9">Malaysia [MY]</dd>
        </dl>
        </div>
        <div class="tab-pane" id="tabs_pembeli" role="tabpanel">
        <dl class="row">
        <dt class="col-sm-3 text-right">No. ID</dt>
        <dd class="col-sm-9"><a href="http://10.102.104.51/profilPerusahaan/?perusahaan=pembeli" target="Profil Pembeli" onclick="bukaJendelaProfil('pembeli', 'Profil Pembeli'); return false;" title="Lihat Profil Perusahaan">016172629217000</a></dd>
        
        <dt class="col-sm-3 text-right">Nama</dt>
        <dd class="col-sm-9"><a href="http://10.102.104.51/profilPerusahaan/?perusahaan=pembeli" target="Profil Pembeli" onclick="bukaJendelaProfil('pembeli', 'Profil Pembeli'); return false;" title="Lihat Profil Perusahaan">PT. OSI ELECTRONICS</a></dd>
        
        <dt class="col-sm-3 text-right">Alamat</dt>
        <dd class="col-sm-9">CAMMO INDUSTRIAL PARK, BLOK F NO. 3A, BALOIPERMAI, BATAM KOTA</dd>
        
        <dt class="col-sm-3 text-right">Negara</dt>
        <dd class="col-sm-9">Indonesia [ID]</dd>
        </dl>
        </div>
        <div class="tab-pane" id="tabs_ppjk" role="tabpanel">
        -
        </div>
        </div>
    );
  }


  function IsiStatus () {
      return (
        <div class="tab-content">
        <div class="tab-pane active" id="tabs_status" role="tabpanel">
            <dl class="row mb-0">
                <dt class="col-sm-3 text-center">Wk. Mulai</dt>
                <dt class="col-sm-3 text-center">Wk. Selesai</dt>
                <dt class="col-sm-6">Uraian Status</dt>
            </dl>
            <div class="kt-separator kt-separator--space-sm kt-separator--border-solid"></div>
            <dl class="row mb-0">
                <dd class="col-sm-3 text-center">2019-04-02 14:30:00</dd>
                <dd class="col-sm-3 text-center">2019-04-02 15:30:00</dd>
                <dt class="col-sm-6">Pemeriksaan Fisik Barang</dt>
            </dl>
            <div class="kt-separator kt-separator--space-sm kt-separator--border-solid"></div>
            <dl class="row mb-0">
                <dd class="col-sm-3 text-center">2019-04-02 11:10:00</dd>
                <dd class="col-sm-3 text-center">2019-04-02 11:10:00</dd>
                <dt class="col-sm-6">Pemberitahuan Kesiapan Barang</dt>
            </dl>
            <div class="kt-separator kt-separator--space-sm kt-separator--border-dashed"></div>    
            <dl class="row mb-0">
                <dd class="col-sm-3 text-center">2019-04-02 10:30:00</dd>
                <dd class="col-sm-3 text-center">2019-04-02 10:30:00</dd>
                <dt class="col-sm-6">Penjaluran</dt>
            </dl>
            <div class="kt-separator kt-separator--space-sm kt-separator--border-dashed"></div>    
            <dl class="row mb-0">
                <dd class="col-sm-3 text-center">2019-04-02 10:30:00</dd>
                <dd class="col-sm-3 text-center">2019-04-02 10:30:00</dd>
                <dt class="col-sm-6">Pengajuan Data</dt>
            </dl>
            <div class="kt-separator kt-separator--space-sm kt-separator--border-dashed"></div>    
            <dl class="row mb-0">
                <dd class="col-sm-3 text-center">2019-04-02 10:00:00</dd>
                <dd class="col-sm-3 text-center">2019-04-02 10:30:00</dd>
                <dt class="col-sm-6">Perekaman Data</dt>
            </dl>
        </div>
        <div class="tab-pane" id="tabs_respon" role="tabpanel">
            <dl class="row mb-0">
                <dt class="col-sm-5 text-center">Waktu Respon</dt>
                <dt class="col-sm-6">Uraian Respon</dt>
                <dt class="col-sm-1 text-center">#</dt>
            </dl>
            <div class="kt-separator kt-separator--space-sm kt-separator--border-solid"></div>
            <dl class="row mb-0">
                <dd class="col-sm-5 text-center">2019-04-02 10:30:00</dd>
                <dt class="col-sm-6">IP</dt>
                <dd class="col-sm-1 text-center">
                    <a href="./ui-pfpd/report/responIP.pdf" target="IP" onclick="bukaJendelaRespon('responIP', 'Respon IP'); return false;"><i class="fa fa-download"></i>&nbsp;</a>
                </dd>
            </dl>
            <div class="kt-separator kt-separator--space-sm kt-separator--border-solid"></div>
            <dl class="row mb-0">
                <dd class="col-sm-5 text-center">2019-04-02 10:30:00</dd>
                <dt class="col-sm-6">SPF</dt>
                <dd class="col-sm-1 text-center">
                    <a href="./ui-pfpd/report/responSPF.pdf" target="SPF" onclick="bukaJendelaRespon('responSPF', 'Respon SPF'); return false;"><i class="fa fa-download"></i>&nbsp;</a>
                </dd>
            </dl>
            <div class="kt-separator kt-separator--space-sm kt-separator--border-dashed"></div>    
            <dl class="row mb-0">
                <dd class="col-sm-5 text-center">2019-04-02 10:30:00</dd>
                <dt class="col-sm-6">Penerimaan Data</dt>
                <dd class="col-sm-1 text-center">
                    <a href="./ui-pfpd/report/responPenerimaan.pdf" target="Penerimaan" onclick="bukaJendelaRespon('responPenerimaan', 'Respon Penerimaan'); return false;"><i class="fa fa-download"></i>&nbsp;</a>
                </dd>
            </dl>
        </div>
    </div>
      );
  }


  function IsiRespon (){
      return (
        <div class="tab-pane active" id="tabs_respon" role="tabpanel">
        <dl class="row mb-0">
            <dt class="col-sm-5 text-center" style={{fontWeight:'bold'}}>Waktu Respon</dt>
            <dt class="col-sm-6" style={{fontWeight:'bold'}}>Uraian Respon</dt>
            <dt class="col-sm-1 text-center">#</dt>
        </dl>
        <div class="kt-separator kt-separator--space-sm kt-separator--border-solid"></div>
        <dl class="row mb-0">
            <dd class="col-sm-5 text-center" style={{fontSize: 12}}>2019-04-02 10:30:00</dd>
            <dt class="col-sm-5" style={{fontSize: 12}}>IP</dt>
            <dd class="col-sm-2 text-center">
                <a href="./ui-pfpd/report/responIP.pdf" target="IP" onclick="bukaJendelaRespon('responIP', 'Respon IP'); return false;"><i class="fa fa-download"></i>&nbsp;</a>
            </dd>
        </dl>
        <div class="kt-separator kt-separator--space-sm kt-separator--border-solid"></div>
        <dl class="row mb-0">
            <dd class="col-sm-5 text-center" style={{fontSize: 12}}>2019-04-02 10:30:00</dd>
            <dt class="col-sm-5" style={{fontSize: 12}}>SPF</dt>
            <dd class="col-sm-2 text-center">
                <a href="./ui-pfpd/report/responSPF.pdf" target="SPF" onclick="bukaJendelaRespon('responSPF', 'Respon SPF'); return false;"><i class="fa fa-download"></i>&nbsp;</a>
            </dd>
        </dl>
        <div class="kt-separator kt-separator--space-sm kt-separator--border-dashed"></div>    
        <dl class="row mb-0">
            <dd class="col-sm-5 text-center" style={{fontSize: 12}}>2019-04-02 10:30:00</dd>
            <dt class="col-sm-5" style={{fontSize: 12}}>Penerimaan Data</dt>
            <dd class="col-sm-2 text-center">
                <a href="./ui-pfpd/report/responPenerimaan.pdf" target="Penerimaan" onclick="bukaJendelaRespon('responPenerimaan', 'Respon Penerimaan'); return false;"><i class="fa fa-download"></i>&nbsp;</a>
            </dd>
        </dl>
        
    </div>
      );
      
  }

export default StickyToolTwoButtons;