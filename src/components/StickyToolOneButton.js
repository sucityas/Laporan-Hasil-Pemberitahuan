import React, { Component } from "react";
import { Drawer} from 'antd';
import "react-table/react-table.css";
class StickyToolOneButton extends Component{
    constructor(props) {
        super(props);
    }
    state = { 
        text: '',
        visible: false,
        placement: 'right' ,
        childrenDrawer: false,
 
    };
    
    showDrawerA = () => {
        this.setState({
            visible: true,
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    

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
        return (
            <>
            <ul class="kt-sticky-toolbar ulStyle">
            <li class="kt-sticky-toolbar__item kt-sticky-toolbar__item--brand" id="kt_demo_panel_toggle" data-toggle="kt-tooltip" title="Tools PFPD" data-placement="right" data-original-title="Tools PFPD">
            <a onClick={this.showDrawerA} class="klikButtons"><i class="flaticon2-gear"></i></a>
            </li>
       
            </ul>
            
            <Drawer
            title=""
            placement={this.state.placement}
            closable={true}
            onClose={this.onClose}
            visible={this.state.visible}
            width={325}
            >
         
            <div className="kt-align-center" style={{ overflow: "hidden"}}>
            <h3 className="kt-demo-panel__title" style={{margin:"0px auto"}}>
            <strong>Alat Bantu</strong><br/>
            <small>Pemeriksaan Dokumen</small>
            </h3>
            <br/>
            <div className="kt-demo-panel__item kt-demo-panel__item--active">
            <div className="kt-demo-panel__item-title">
            </div>
            <div className="kt-demo-panel__item-preview" style={{border:"none"}}>
            <a className="btn btn-block btn-secondary btn-width"  onClick={() => this.handleRekomendasiHarga()}><i className=""></i> Browse Barang</a>
            <a className="btn btn-block btn-secondary btn-width"  onClick={() => this.handleDBNP()}><i className=""></i>Browse DBNP</a>
            <a className="btn btn-block btn-secondary btn-width"  onClick={() => this.handleCeisa()}><i className=""></i>CEISA Search</a>
            </div>
            </div>
            <div className="ps__rail-x" style={{left: "0px", bottom: "0px"}}>
            <div className="ps__thumb-x" tabindex="0" style={{left: "0px", width: "0px"}}></div>
            </div>
            <div className="ps__rail-y" style={{top: 0 , height: "602px",right: "0px"}}>
            <div className="ps__thumb-y" tabindex="0" style={{top: 0, height: "300px" }}>
            </div>
            </div>
            </div>   
            </Drawer>
            </>            
        )
    }

}

   

export default StickyToolOneButton;