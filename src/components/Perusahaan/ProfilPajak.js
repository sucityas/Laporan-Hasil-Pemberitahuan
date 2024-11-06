import React, { Component } from "react";

const styleTitle = {
    fontSize: "15px",
    textAlign: "center"
};

class ProfilPajak extends Component {
    render() {
        var colorKswp = { color: "#000" };
        if (this.props.validitasKswp === "WP VALID") {
            colorKswp = { color: "#12d400" };
        } else {
            colorKswp = { color: "#d40000" };
        }

        var dataNpwpQ = this.props.dataNpwp;

        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="kt-widget3">
                            <div className="kt-widget3__item">
                                <div className="kt-widget3__header">
                                    <div className="kt-widget3__user-img">
                                        <div className="kt-widget__icon">
                                            <i
                                                className="flaticon-file-1"
                                                style={{ fontSize: "40px" }}
                                            />
                                        </div>
                                    </div>
                                    <div className="kt-widget3__info">
                                        <span className="kt-widget3__username" style={styleTitle}>
                                            Profil Wajib Pajak
                    </span>
                                        <br />
                                        <span className="kt-widget3__time">
                                            Detail profil wajib pajak.
                    </span>
                                    </div>
                                    <span className="kt-widget3__status kt-font-info"></span>
                                </div>
                                <div
                                    className="row kt-widget__info"
                                    style={{ marginTop: "-10px" }}
                                >
                                    <div className="col-sm-6">
                                        <div className="kt-widget kt-widget--user-profile-2">
                                            <div className="kt-widget__body">
                                                <div className="kt-widget__item">
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">NPWP:</span>
                                                        <span className="kt-font-primary kt-font-bold">
                                                            {dataNpwpQ.npwp}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">
                                                            Nama Wajib Pajak:
                            </span>
                                                        <span className="kt-font-primary kt-font-bold">
                                                            {dataNpwpQ.namaWp}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">
                                                            Status KSWP:
                            </span>
                                                        <span
                                                            style={colorKswp}
                                                            className="kt-font-data kt-font-bold"
                                                        >
                                                            {this.props.validitasKswp}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">
                                                            Jenis Wajib Pajak:
                            </span>
                                                        <span className="kt-font-primary kt-font-bold">
                                                            {dataNpwpQ.jenisWp}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">
                                                            Bentuk Badan Usaha:
                            </span>
                                                        <span className="kt-font-primary kt-font-bold">
                                                            {dataNpwpQ.bentukBdHukum
                                                                ? dataNpwpQ.bentukBdHukum
                                                                : "-"}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">
                                                            Status Modal:
                            </span>
                                                        <span className="kt-font-primary kt-font-bold">
                                                            {dataNpwpQ.statusModel}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="kt-widget kt-widget--user-profile-2">
                                            <div className="kt-widget__body">
                                                <div className="kt-widget__item">
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">
                                                            Status Pusat:
                            </span>
                                                        <span className="kt-font-primary kt-font-bold">
                                                            {dataNpwpQ.statusPusat}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">
                                                            NPWP Pusat:
                            </span>
                                                        <span className="kt-font-primary kt-font-bold">
                                                            {dataNpwpQ.npwpPusat}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">
                                                            Status PKP:
                            </span>
                                                        <span className="kt-font-primary kt-font-bold">
                                                            {dataNpwpQ.statusPkp}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">
                                                            No. Surat PKP:
                            </span>
                                                        <span className="kt-font-primary kt-font-bold">
                                                            {dataNpwpQ.noSrtPengPkp}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">
                                                            Jenis Usaha:
                            </span>
                                                        <span className="kt-font-primary kt-font-bold">
                                                            {dataNpwpQ.jenisUsaha}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">
                                                            Merek Dagang:
                            </span>
                                                        <span className="kt-font-primary kt-font-bold">
                                                            {dataNpwpQ.merkDagang}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="kt-widget3__item">
                                <div className="kt-widget3__header">
                                    <div className="kt-widget3__user-img">
                                        <div className="kt-widget__icon">
                                            <i
                                                className="flaticon-home-2"
                                                style={{ fontSize: "40px" }}
                                            />
                                        </div>
                                    </div>
                                    <div className="kt-widget3__info">
                                        <a href="/#a" className="kt-widget3__username">
                                            Alamat Wajib Pajak
                    </a>
                                        <br />
                                        <span className="kt-widget3__time">
                                            Detail alamat wajib pajak.
                    </span>
                                    </div>
                                    <span className="kt-widget3__status kt-font-brand"></span>
                                </div>
                                <div
                                    className="row kt-widget__info"
                                    style={{ marginTop: "-10px" }}
                                >
                                    <div className="col-sm-6">
                                        <div className="kt-widget kt-widget--user-profile-2">
                                            <div className="kt-widget__body">
                                                <div className="kt-widget__item">
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">Jalan:</span>
                                                        <span
                                                            href="/#a"
                                                            className="kt-font-primary kt-font-bold"
                                                        >
                                                            {dataNpwpQ.jalan}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">
                                                            Blok / Nomor / RT / RW:
                            </span>
                                                        <span
                                                            href="/#a"
                                                            className="kt-font-primary kt-font-bold"
                                                        >
                                                            {dataNpwpQ.blok} / {dataNpwpQ.nomor} /
                              {dataNpwpQ.rt} / {dataNpwpQ.rw}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">Kode Pos:</span>
                                                        <span
                                                            href="/#a"
                                                            className="kt-font-primary kt-font-bold"
                                                        >
                                                            {dataNpwpQ.kodePos}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">Telepon:</span>
                                                        <span
                                                            href="/#a"
                                                            className="kt-font-primary kt-font-bold"
                                                        >
                                                            {dataNpwpQ.telepon}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">Faksimile:</span>
                                                        <span
                                                            href="/#a"
                                                            className="kt-font-primary kt-font-bold"
                                                        >
                                                            {dataNpwpQ.faksimile}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="kt-widget kt-widget--user-profile-2">
                                            <div className="kt-widget__body">
                                                <div className="kt-widget__item">
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">Kelurahan:</span>
                                                        <span
                                                            href="/#a"
                                                            className="kt-font-primary kt-font-bold"
                                                        >
                                                            {dataNpwpQ.kelurahan}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">Kecamatan:</span>
                                                        <span
                                                            href="/#a"
                                                            className="kt-font-primary kt-font-bold"
                                                        >
                                                            {dataNpwpQ.kecamatan}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">Kota:</span>
                                                        <span
                                                            href="/#a"
                                                            className="kt-font-primary kt-font-bold"
                                                        >
                                                            {dataNpwpQ.kota}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">Propinsi:</span>
                                                        <span className="kt-font-primary kt-font-bold">
                                                            {dataNpwpQ.propinsi}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">Nama KPP:</span>
                                                        <span className="kt-font-primary kt-font-bold">
                                                            {dataNpwpQ.namaKpp}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="kt-widget3__item">
                                <div className="kt-widget3__header">
                                    <div className="kt-widget3__user-img">
                                        <div className="kt-widget__icon">
                                            <i
                                                className="flaticon-profile-1"
                                                style={{ fontSize: "40px" }}
                                            />
                                        </div>
                                    </div>
                                    <div className="kt-widget3__info">
                                        <a href="/#a" className="kt-widget3__username">
                                            Penanggung Jawab
                    </a>
                                        <br />
                                        <span className="kt-widget3__time">
                                            Detail data penanggung jawab.
                    </span>
                                    </div>
                                    <span className="kt-widget3__status kt-font-success"></span>
                                </div>
                                <div
                                    className="row kt-widget__info"
                                    style={{ marginTop: "-10px" }}
                                >
                                    <div className="col-sm-6">
                                        <div className="kt-widget kt-widget--user-profile-2">
                                            <div className="kt-widget__body">
                                                <div className="kt-widget__item">
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">
                                                            NPWP Penanggung Jawab:
                            </span>
                                                        <span
                                                            href="/#a"
                                                            className="kt-font-primary kt-font-bold"
                                                        >
                                                            {dataNpwpQ.npwpPj}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">
                                                            Nama Penanggung Jawab:
                            </span>
                                                        <span
                                                            href="/#a"
                                                            className="kt-font-primary kt-font-bold"
                                                        >
                                                            {dataNpwpQ.namaPj}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="kt-widget kt-widget--user-profile-2">
                                            <div className="kt-widget__body">
                                                <div className="kt-widget__item">
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">
                                                            No. HP Penanggung Jawab:
                            </span>
                                                        <span
                                                            href="/#a"
                                                            className="kt-font-primary kt-font-bold"
                                                        >
                                                            {dataNpwpQ.noHpPj}
                                                        </span>
                                                    </div>
                                                    <div className="kt-widget__contact">
                                                        <span className="kt-widget__label">
                                                            Email Penanggung Jawab:
                            </span>
                                                        <span
                                                            href="/#a"
                                                            className="kt-font-primary kt-font-bold"
                                                        >
                                                            {dataNpwpQ.emailPj}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilPajak;
