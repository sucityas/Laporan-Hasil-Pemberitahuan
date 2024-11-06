import React from "react";

import { Route, Switch } from "react-router-dom";

import Pfpd from "./pfpd";
import PfpdDashboard from "./pfpd/PfpdDashboard";
import PfpdPencarian from "./pfpd/PfpdPencarian";
import PfpdLaporan from "./pfpd/PfpdLaporan";
import PfpdDataHeader from "./pfpd/PfpdDataHeader";
import PfpdDokumenPelengkap from "./pfpd/PfpdDokumenPelengkap";
import PfpdBarang from "./pfpd/PfpdBarang";
import PfpdResumeKeputusan from "./pfpd/PfpdResumeKeputusan";
import LhpPencarianDokumenStatus from './lhp/LhpPencarianDokumenStatus'
import LhpPencarianHasilPerekaman from "./lhp/LhpPencarianHasilPerekaman";
import LhpDaftarHasilPerekaman from "./lhp/LhpDaftarHasilPerekaman";
import LhpDaftarDokumenStatus from "./lhp/LhpDaftarDokumenStatus";
import LhpBap from "./lhp/LhpBap";
import LhpPerekaman from "./lhp/LhpPerekaman";
import LhpInstruksiPemeriksaan from "./lhp/LhpInstruksiPemeriksaan";
import LhpMemoPemeriksaan from "./lhp/LhpMemoPemeriksaan";
import LhpPemeriksaan from "./lhp/LhpPemeriksaan";
import Pfpb from "./lhp/pfpb"
import StatusPemeriksa from './lhp/StatusPemeriksa'
import CeisaSearch from "./search"
import ViewLhpBap from './lhp/ViewLhpBap'
import ViewLhpPemeriksaan from "./lhp/ViewLhpPemeriksaan";
import LhpHeader from "./lhp/LhpHeader";
import LhpDetail from "./lhp/LhpDetail";
import PfpdPeriksaFisik from "./pfpd/PfpdPeriksaFisik";

const PfpdMenu = (props) => {

	return (

		<>
		<Route path={`${props.current_url}pfpd`} component={Pfpd} />
		<Route path={`${props.current_url}pfpd-data-header`} component={PfpdDataHeader} />
		<Route path={`${props.current_url}pfpd-dokumen-pelengkap`} component={PfpdDokumenPelengkap} />
		<Route path={`${props.current_url}pfpd-barang`} component={PfpdBarang} />
		<Route path={`${props.current_url}pfpd-resume-keputusan`} component={PfpdResumeKeputusan} />
		<Route path={`${props.current_url}pfpd-dashboard`} component={PfpdDashboard} />
		<Route path={`${props.current_url}pfpd-pencarian`} component={PfpdPencarian} />
		<Route path={`${props.current_url}pfpd-laporan`} component={PfpdLaporan} />
		<Route path={`${props.current_url}pfpd-periksa-fisik`} component={PfpdPeriksaFisik} />
		<Route path={`${props.current_url}lhp-pencarian-dokumen-status`} component={LhpPencarianDokumenStatus} />
		<Route path={`${props.current_url}lhp-pencarian-hasil-perekaman`} component={LhpPencarianHasilPerekaman} />
		<Route path={`${props.current_url}lhp-daftar-dokumen-status`} component={LhpDaftarDokumenStatus} />
		<Route path={`${props.current_url}lhp-daftar-hasil-perekaman`} component={LhpDaftarHasilPerekaman} />
		<Route path={`${props.current_url}lhp-bap`} component={LhpBap} />
		<Route path={`${props.current_url}lhp-perekaman`} component={LhpPerekaman} />
		<Route path={`${props.current_url}lhp-instruksi-pemeriksaan`} component={LhpInstruksiPemeriksaan} />
		<Route path={`${props.current_url}lhp-memo-pemeriksaan`} component={LhpMemoPemeriksaan} />
		<Route path={`${props.current_url}lhp-pemeriksaan`} component={LhpPemeriksaan} />
		<Route path={`${props.current_url}lhp-pfpb`} component={Pfpb} />
		<Route path={`${props.current_url}lhp-status-pemeriksa`} component={StatusPemeriksa} />
		<Route path={`${props.current_url}search`} component={CeisaSearch} />
		<Route path={`${props.current_url}view-lhp-bap`} component={ViewLhpBap} />
		<Route path={`${props.current_url}view-lhp-pemeriksaan`} component={ViewLhpPemeriksaan} />
		<Route path={`${props.current_url}lhp-header`} component={LhpHeader} />
		<Route path={`${props.current_url}lhp-detail`} component={LhpDetail} />
		</>

		)

}

export default PfpdMenu;