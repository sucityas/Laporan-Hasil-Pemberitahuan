import React, { lazy } from "react";

const BrowsePemeriksaanBarang = lazy(() => import("../barangpenumpang/lhp/index"));
const PemeriksaanBarang = lazy(() => import('../barangpenumpang/lhp/Lhp'));
const BrowseHasilLhp = lazy(() => import('../barangpenumpang/lhpHasilPerekaman/index'));
const HasilPemeriksaanBarang = lazy(() => import('../barangpenumpang/lhpHasilPerekaman/Lhp'));



const BarangPenumpang = [
  

  // Menu LHP
  { path: "/barang-penumpang/lhp", component: BrowsePemeriksaanBarang },
  { path: "/barang-penumpang/lhp-perekaman", component: PemeriksaanBarang },

  

  // Menu Hasil Perekaman LHP
  { path: "/barang-penumpang/lhp-hasil", component: BrowseHasilLhp },
  { path: "/barang-penumpang/lhp-hasil-periksa", component: HasilPemeriksaanBarang },

  

]

export default BarangPenumpang;
