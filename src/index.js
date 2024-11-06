import React, { lazy } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './index.css';
import App from './testing';
import Main from './Main';
import IndexLhp2 from './pages/barangpenumpang/lhp/index.jsx';
import IndexLhp from './pages/barangpenumpang/lhp/testing';
// import reportWebVitals from './reportWebVitals';
// const Pemindaian = lazy(() => import("../barangpenumpang/pemindaian/Pemindaian"));

const BrowsePemeriksaanBarang = lazy(() => import("./pages/barangpenumpang/lhp/index"));
// const PemeriksaanBarang = lazy(() => import('../barangpenumpang/lhp/Lhp'));
// const BrowseDokumen = lazy(() => import('../barangpenumpang/browseDokumen/index'));
// const BrowseDokumenNew = lazy(() => import('../barangpenumpang/browseDokumen/Lhp'));
// const BrowseHasilLhp = lazy(() => import('../barangpenumpang/lhpHasilPerekaman/index'));
// const HasilPemeriksaanBarang = lazy(() => import('../barangpenumpang/lhpHasilPerekaman/Lhp'));

// const MainPemeriksaanCD = lazy(() => import("../barangpenumpang/penelitian/main/MainPemeriksaanCD"));
// const MainDashboardCD = lazy(() => import("../barangpenumpang/penelitian/main/MainDashboardCD"));
// const PfpdBC21Browse = lazy(() => import("../barangpenumpang/penelitian/pencarian/BrowseDokumenPfpdBC21"));
// const MainPemeriksaanPibk = lazy(() => import("../barangpenumpang/penelitian/pemeriksaan/indexBC21"));

// const BrowseBppm = lazy(() => import("../barangpenumpang/penelitian/browseBppm/index"));
// const PfpdBrowse = lazy(() => import("../barangpenumpang/penelitian/pencarian/BrowseDokumenPfpd"));
// const UpdateStatusEcd = lazy(() => import("../barangpenumpang/UpdateEcd/UpdateStatusEcd"));
// const Intervensi = lazy(() => import("../barangpenumpang/intervensi/index"));
// const ScanImei = lazy(() => import("../barangpenumpang/scanImei/index"));
// const MonitoringImei = lazy(() => import("../barangpenumpang/monitoringImei/index"));

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Router>
//       <Switch><Route path="/barang-penumpang" element={<IndexLhp />} />
//         <Route path="/lhp" element={<IndexLhp2 />} /> 
//         <Route path="/lhp2" component={BrowsePemeriksaanBarang} /> 
//         <Route path="/" component={App} />
//       </Switch>
//     </Router>
//   </React.StrictMode>
// );

ReactDOM.render(<Main />, document.getElementById("root"));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// import React from "react";
// import ReactDOM from "react-dom";
// import Main from "./Main";
// ReactDOM.render(<Main />, document.getElementById("root"));
