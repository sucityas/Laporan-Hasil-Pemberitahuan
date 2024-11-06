import React, { Component } from "react";

import {Alert} from "antd";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="kt-portlet kt-portlet--mobile">
        <div className="kt-portlet__head kt-portlet__head--lg">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title kt-font-bolder">
              Pemberitahuan
            </h3>
          </div>
        </div>
        <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
          <Alert
            message="Pemberitahuan"
            description= {
              <>
                Terkait info bahwa mulai tanggal 1 September 2020 pembuatan PIB melalui Portal Pengguna Jasa dan bukan melalui modul PIB, dapat kami sampaikan bahwa kegiatan tersebut merupakan
                <b> piloting terbatas untuk importir/ppjk yang ditunjuk pada KPPBC tertentu.</b> Informasi lebih lanjut akan disampaikan melalui kanal resmi DJBC.
              </>}
            type="info"
            showIcon
          />
            <br/>
            <Alert
                description= {
                    <>
                        National Logistics Ecosystem (NLE) adalah Ekosistem logistik yang menyelaraskan arus lalu lintas barang dan dokumen international sejak kedatangan sarana pengangkut hingga barang tiba di gudang, berorientasi pada kerja sama antar instansi pemerintah dan swasta, melalui pertukaran data, simplifikasi proses, penghapusan repetisi dan duplikasi, serta didukung oleh sistem teknologi informasi yang mencakup seluruh proses logistic terkait dan menghubungkan sistem – sistem logistik yang telah ada
                        Saat ini ada beberapa layanan yang dapat digunakan untuk mendapatkan berbagai layanan logistik seperti DO Online, SP2 Online,Trucking, Vessel, Gudang dll
                        Layanan NLE dapat diakses melalui portal <a href="https://nle.kemenkeu.go.id/">https://nle.kemenkeu.go.id/</a>
                    </>}
                type="info"
                showIcon
            />
        </div>
      </div>
    );
  }
}
