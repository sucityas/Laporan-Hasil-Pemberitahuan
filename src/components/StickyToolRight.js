import React, { Component } from "react";
import { connect } from 'react-redux';
import { Drawer, Button, Radio,Tabs,Popover,Icon } from 'antd';
import {getDokumenPabeanPFPD}  from "../../src/appRedux/reducers/pfpd"
import cetakanDokumenPemberitahuanPabean from '../../src/pages/pfpd/PfpdBarang/cetakanDokumenPemberitahuanPabean.pdf';
import {Link} from 'react-router-dom'
import ReactTable from "react-table";
import "react-table/react-table.css";
import IdentitasPerusahaan from '../pages/pfpd/PfpdDataHeader/IdentitasPerusahaan'
import { HashRouter as Router, withRouter } from "react-router-dom";
import {setInput} from "../../src/appRedux/reducers/core"
import Respon from "../pages/pfpd/PfpdPencarian/Respon";
import Status from "../pages/pfpd/PfpdPencarian/Status";
import Pengawas from "../pages/pfpd/PfpdPencarian/Pengawas";
const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

class StickyToolRight extends Component{
    constructor(props) {
        super(props);
    
        console.log(this.props)
    }
    state = { 
        visible: false,
        placement: 'right' ,
        childrenDrawer: false,
        dataHeader : false,
        onTrigger : this.props.onSendState
    };
    
    showDrawerA = () => {
        this.setState({
            visible: true,
        });
    };
    showChildrenDrawer = () => {
      this.setState({
        dataHeader : true,
      })
    }
   
    onClose = () => {
        this.setState({
            visible: false,
            dataHeader : false
        });
};
    onRedirect = () => {
      this.props.history.push("/pfpd/periksa-dokumen");;
    }
    handleCeisa = () => {
      let myWindow;
      myWindow = window.open(window.location.origin + '/search', 'myWindow1', 'width=800, height=600');
    }
    handleDBNP = () => {
      let myWindow;
      myWindow = window.open(window.location.origin + '/sce/profil-komoditi/browse-dbnp/', 'myWindow5', 'width=800, height=600');
  
    }
    handleRekomendasiHarga = () => {
      
      let myWindow;
      myWindow = window.open(window.location.origin + '/sce/profil-komoditi/browse-barang', 'myWindow4', 'width=800, height=600');
  
    }
    
    render() {
      console.log("edo1", this.state.onTrigger)
      console.log("yo data",this.props.onSendState)
        return (
            <>
            <ul class="kt-sticky-toolbar ulStyle">
            <li class="kt-sticky-toolbar__item kt-sticky-toolbar__item--brand" id="kt_quick_panel_toggler_btn" data-toggle="kt-tooltip" title="Lihat Informasi Terkait" data-placement="right" data-original-title="Lihat Informasi Terkait">
            <a onClick={this.showChildrenDrawer} class=""><i class="flaticon-information"></i></a>
            </li>
            <li class="kt-sticky-toolbar__item kt-sticky-toolbar__item--brand" id="kt_demo_panel_toggle" data-toggle="kt-tooltip" title="Tools PFPD" data-placement="right" data-original-title="Tools PFPD">
            <a onClick={this.showDrawerA} class="klikButtons"><i class="flaticon2-gear"></i></a>
            </li>
  
            
            </ul>
            <Drawer
          title="Informasi Terkait"
          // placement={this.state.placement}
          closable={true}
          onClose={this.onClose}
          visible={this.state.dataHeader}
          width={'40%'}
               >
            <Tabs type="card" tabPosition="top" >
            <TabPane tab={
                <span>
                <i class="fa fa-building" aria-hidden="true" style={{marginRight : 15}}>
                </i>
               Entitas
                </span>
            } key="66">
           
            <IdentitasPerusahaan onTrigger={this.props.onSendState}/>
      
          
            </TabPane>
            <TabPane tab={
                <span>
                <i class="fa fa-user" aria-hidden="true" style={{marginRight : 15}}>
                </i>
               Petugas
                </span>
            } key="76">
           
          <Pengawas/>
            </TabPane>
            <TabPane
                  tab={
                    <span>
                  <i class="fa fa-list-alt" aria-hidden="true" style={{marginRight : 15}}>
                </i>
                      Status & Respon
                    </span>
                  }
                  key="36"
                >
                     <Tabs type="card">
            <TabPane tab="Status" key="01">
            <Status/>
            </TabPane>
            <TabPane tab="Respon" key="02">
            <Respon/>
            </TabPane>
            </Tabs>

                </TabPane>
            
            </Tabs>
            {localStorage.getItem('idHeader') != null ? 
              <div className="mt-4 text-center">
              
              <button className="btn btn-primary" onClick={this.onRedirect}>
                <i className="fas fa-eye" style={{marginRight : 10}}></i>Periksa Dokumen
              </button>
              </div>
            : null}


    
        </Drawer>
            <Drawer
            title=""
            placement={this.state.placement}
            closable={true}
            onClose={this.onClose}
            visible={this.state.visible}
            width={325}
            >
         
            <div class="kt-align-center" style={{ overflow: "hidden"}}>
            <h3 class="kt-demo-panel__title" style={{margin:"0px auto"}}>
            <strong>Alat Bantu</strong><br/>
            <small>Pemeriksaan Dokumen</small>
            </h3>
            <br/>
            <div class="kt-demo-panel__item kt-demo-panel__item--active">
            <div class="kt-demo-panel__item-title">
            </div>
            <div class="kt-demo-panel__item-preview" style={{border:"none"}}>
            <a class="btn btn-block btn-secondary btn-width" href="javascript:;" onClick={() => this.handleRekomendasiHarga()}><i class=""></i> Browse Barang</a>
            <a class="btn btn-block btn-secondary btn-width" href="javascript:;" onClick={() => this.handleDBNP()}><i class=""></i>Browse DBNP</a>
            <a class="btn btn-block btn-secondary btn-width" href="javascript:;" onClick={() => this.handleCeisa()}><i class=""></i>CEISA Search</a>
        
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
        
            
 


           
            </Drawer>
            </>
             )
             }
             }
          
export default withRouter(StickyToolRight)