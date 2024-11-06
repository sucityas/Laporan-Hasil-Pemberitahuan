import update from 'immutability-helper'
import qs from 'qs'
import axios from 'axios'
import _ from 'lodash'

import { fetch_error,secure_data } from './index'

var initialState = {
  total: 0,
  response: [{
  "status": true,
  "message": "sucess",
  "data": [
    {
      "kodeDokumen": "10",
      "namaDokumen": "RKSP",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "21",
      "namaDokumen": "PIBK/IMPOR KHUSUS",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "3001",
      "namaDokumen": "Izin Prinsip Pendirian Kawasan Berikat Sebelum Fisik Bangunan Berdiri",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3002",
      "namaDokumen": "Keputusan Penetapan Tempat Sebagai Kawasan Berikat Dan Pemberian Izin Penyelenggara Kawasan Berikat",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3016",
      "namaDokumen": "Persetujuan Pembebasan Bea Masuk Untuk Barang Contoh Yang Akan Dikeluarkan Ke Tempat Lain Dalam Daerah Pabean",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3021",
      "namaDokumen": "Persetujuan Pengeluaran Bahan Baku Dan/Atau Sisa Bahan Baku Asal Luar Daerah Pabean Ke Kawasan Berikat Lain",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3027",
      "namaDokumen": "Persetujuan Pengeluaran Barang Modal Asal Impor Yang Belum Diselesaikan Kewajiban BM-nya Ke Kawasan Berikat Lain Setelah Jangka Waktu 2 (Dua) Tahun Sejak Diimpor Dan Telahdipergunakan Di Kawasan Berikat",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3034",
      "namaDokumen": "Persetujuan Untuk Memindahtangankan Barang Modal Dan/Atau Peralatan Perkantoran Yang Telah Dilunasi BM Dan PDRI Pada Saat Pemasukan Ke Kawasan Berikat",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3036",
      "namaDokumen": "Persetujuan Pengeluaran Barang Modal Untuk Perbaikan/Reparasi Ke Luar Daerah Pabean",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3046",
      "namaDokumen": "Persetujuan Meminjamkan Mesin/Cetakan (Moulding) Ke TLDDP Bukan Dalam Rangka Subkontrak",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3047",
      "namaDokumen": "Persetujuan Perpanjangan Meminjamkan Mesin Dan/Atau Cetakan (Moulding) Ke PDKB Lain Dalam Rangka Subkontrak",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3049",
      "namaDokumen": "Persetujuan Perpanjangan Meminjamkan Mesin Dan/Atau Cetakan (Moulding) Ke TLDDP Dalam Rangka Subkontrak",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3063",
      "namaDokumen": "Persetujuan Pemasukan Kembali (Reimpor) Barang Modal Setelah Perbaikan/Reparasi Dari Luar Daerah Pabean",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3064",
      "namaDokumen": "Persetujuan Perpanjangan Jangka Waktu Pengeluaran Barang Modal Keperluan Perbaikan/Reparasi Tujuan TLDDP",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3066",
      "namaDokumen": "Rekomendasi Meminjamkan Barang Modal Ke TLDDP Dalam Rangka Subkontrak Atau Bukan Lebih Dari 6 Bulan",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "388",
      "namaDokumen": "FAKTUR PAJAK",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "410",
      "namaDokumen": "SURAT SANGGUP BAYAR / SSB",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "430",
      "namaDokumen": "BANK GARANSI",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "440",
      "namaDokumen": "SURAT TANDA BUKTI SETOR / STBS",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "457",
      "namaDokumen": "Surat Keterangan Bebas (SKB) PPh",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "458",
      "namaDokumen": "SURAT KETERANGAN TIDAK DIPUNGUT (SKTD) PPN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "51",
      "namaDokumen": "FTZ 01",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "513",
      "namaDokumen": "FTZ-01 PENGELUARAN KE TLDDP",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "522",
      "namaDokumen": "FTZ-02 PENGELUARAN ANTAR FTZ DAN KAWASAN BERIKAT",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "740",
      "namaDokumen": "AWB",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "800",
      "namaDokumen": "SERTIFIKAT ALAT PERANGKAT TELEKOM/POSTEL",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "805",
      "namaDokumen": "REGISTRASI B3 / KLH",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "810",
      "namaDokumen": "SM/SPM",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "811",
      "namaDokumen": "Sertifikat Legalitas Kayu (Dok.V-Legal)",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "816",
      "namaDokumen": "DOK. EKSPOR (PEB)",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "817",
      "namaDokumen": "Eksportir Terdaftar (ET) Depdag",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "822",
      "namaDokumen": "Srt Tanda Pendaftaran Pedagang Bokor SIR",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "834",
      "namaDokumen": "SNI GULA KRISTAL MENTAH / DEPTAN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "842",
      "namaDokumen": "SNI / ESDM",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "854",
      "namaDokumen": "SURAT PERSETUJUAN MUAT BPOM",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "856",
      "namaDokumen": "LAP. PEMERIKSAAN SURVEYOR (LPS-E)",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "862",
      "namaDokumen": "SKEP USDFS",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "875",
      "namaDokumen": "SPI (NARKTK, PREKURSOR & PSIKOTR)/DEPKES",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "911",
      "namaDokumen": "SURAT KEPUTUSAN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "915",
      "namaDokumen": "Skep Fasilitas Impor Sementara",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "936",
      "namaDokumen": "KH-9a/Izin Impor Karantina Hewan",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "939",
      "namaDokumen": "KT-5/Izin Impor Karantina Pertanian",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "946",
      "namaDokumen": "KID-3 / IZIN IMPOR KARANTINA IKAN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "997",
      "namaDokumen": "COSTOMS BOND / STTJ",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "999",
      "namaDokumen": "LAINNYA",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "16",
      "namaDokumen": "BC 16",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "20",
      "namaDokumen": "PIB/IMPOR",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "262",
      "namaDokumen": "BC 262",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "28",
      "namaDokumen": "BC 28",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "3020",
      "namaDokumen": "Persetujuan Pengeluaran Bahan Baku/Sisa Bahan Baku Asal Impor Untuk Direekspor",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3022",
      "namaDokumen": "Persetujuan Pengeluaran Bahan Baku Dan/Atau Sisa Bahan Baku Asal Luar Daerah Pabean Ke Perusahaan Industri Di TLDDP",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3023",
      "namaDokumen": "Persetujuan Pemindahtanganan Barang Selain Hasil Produksi Dalam Rangka Saling Melengkapi Kebutuhan Dalam Proses Produksi Atau Peningkatan Produksi Ke Kawasan Berikat Lain Dalam Satu Manajemen",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3025",
      "namaDokumen": "Persetujuan Pemindahtanganan Barang Selain Hasil Produksi Dalam Rangka Saling Melengkapi Kebutuhan Dalam Proses Produksi Atau Peningkatan Produksi Ke Kawasan Berikat Lainnya",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3033",
      "namaDokumen": "Persetujuan Pengeluaran Peralatan Perkantoran Asal Impor Yang Belum Diselesaikan Kewajiban Pembayaran Bm Ke TLDDP Setelah Jangka Waktu 4 (Empat) Tahun Sejak Diimpor, Dan Telah Dipergunakan Di Kawasan Berikat",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3039",
      "namaDokumen": "Persetujuan Subkontrak Kurang Dari 60 (Enam Puluh) Hari Ke TLDDP",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3040",
      "namaDokumen": "Persetujuan Subkontrak Kurang Dari 60 (Enam Puluh) Hari Ke KB Lain",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3041",
      "namaDokumen": "Persetujuan Subkontrak Lebih Dari 60 (Enam Puluh) Hari Ke TLDDP",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3042",
      "namaDokumen": "Persetujuan Subkontrak Lebih Dari 60 (Enam Puluh) Hari Ke PDKB Lain",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3043",
      "namaDokumen": "Persetujuan Meminjamkan Mesin/Cetakan (Moulding) Ke KB Lain Dalam Rangka Subkontrak",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3044",
      "namaDokumen": "Persetujuan Meminjamkan Mesin/Cetakan (Moulding) Ke KB Lain Bukan Dalam Rangka Subkontrak",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3050",
      "namaDokumen": "Persetujuan Perpanjangan Meminjamkan Mesin Dan/Atau Cetakan (Moulding) Ke TLDDP Selain Dalam Rangka Subkontrak",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3052",
      "namaDokumen": "Persetujuan Pemusnahan Atas Barangbarang Yang Busuk Dan/Atau Yang Karena Sifat Dan Bentuknya Dapat Dimusnahkan",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3053",
      "namaDokumen": "Persetujuan Perusakan Atas Barang Asal Luar Daerah Pabean Yang Karena Sifat Dan Bentuknya Tidak Dapat Dimusnahkan",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3056",
      "namaDokumen": "Persetujuan Peminjaman Mesin/Cetakan (Moulding) Dari TLDDP Bukan Dalam Rangka Subkontrak",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3061",
      "namaDokumen": "Persetujuan Pemasukan Barang Modal Berupa Suku Cadang Dari Luar Daerah Pabean Yang Dimasukkan Tidak Bersamaan Dengan Barang Modal",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "383",
      "namaDokumen": "SSTB",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "40",
      "namaDokumen": "BC 40",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "454",
      "namaDokumen": "SSPCP / SSBC",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "666",
      "namaDokumen": "Pengecualian Dengan Surat Keputusan",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "741",
      "namaDokumen": "MASTER AWB",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "843",
      "namaDokumen": "NOMOR PELUMAS TERDAFTAR / ESDM",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "844",
      "namaDokumen": "IJIN USAHA NIAGA/IU NIAGA TERBATAS/ESDM",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "846",
      "namaDokumen": "SKEM",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "872",
      "namaDokumen": "LAPORAN SURVEYOR DEPKES",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "878",
      "namaDokumen": "Ijin Pelaporan Pembawaan UKA",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "913",
      "namaDokumen": "SKEP FASILITAS PERTAMBANGAN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "917",
      "namaDokumen": "BPBC / BPPAI",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "937",
      "namaDokumen": "KH-14/Izin Impor Karantina Hewan",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "938",
      "namaDokumen": "KH-17/Izin Impor Karantina Hewan",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "947",
      "namaDokumen": "KID-15 / IZIN IMPOR KARANTINA IKAN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "958",
      "namaDokumen": "LAPORAN SURVEYOR / DEPDAG",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "993",
      "namaDokumen": "SURAT IJIN MENTERI PERTANIAN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "998",
      "namaDokumen": "SKEP FASILITAS KEMUDAHAN EKSPOR",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "11",
      "namaDokumen": "MANIFES",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "246",
      "namaDokumen": "L/C",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "281",
      "namaDokumen": "BC 28 PENGELUARAN DENGAN DOKAP",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "282",
      "namaDokumen": "PPK PLB",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "3005",
      "namaDokumen": "Perpanjangan Penetapan Tempat Sebagai Kawasan Berikat Dan Izin Penyelenggara Kawasan Berikat, Izin Pengusaha Kawasan Berikat, Atau Izin PDKB Sebelum Jangka Waktu Izin Tersebut Berakhir",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3006",
      "namaDokumen": "Perubahan Izin Penyelenggara Kawasan Berikat, Izin Pengusaha Kawasan Berikat, Atau Izin PDKB (Terdapat Perubahan Nama Perusahaan Yang Bukan Dikarenakan Merger Atau Diakuisisi, Jenis Hasil Produksi, Atau Luas Kawasan Berikat)",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3009",
      "namaDokumen": "Pemberian Izin Penambahan Pintu Khusus Orang Di Kawasan Berikat",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3018",
      "namaDokumen": "Persetujuan Untuk Mengeluarkan Bahan Baku Dan/Atau Bahan Rusak Dan/Atau Apkir (Reject) Yang Sama Sekali Tidak Diproses Ke Gudang Berikat Asal Barang",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3019",
      "namaDokumen": "Persetujuan Untuk Mengeluarkan Barang Dan/Atau Bahan Rusak Dan/Atau Apkir (Reject) Asal Tlddp Ke TLDDP",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3024",
      "namaDokumen": "Persetujuan Pemindahtanganan Barang Selain Hasil Produksi Dalam Rangka Saling Melengkapi Kebutuhan Dalam Proses Produksi Atau Peningkatan Produksi Ke Kawasan Berikat Lain Dalam Satu PKB",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3026",
      "namaDokumen": "Persetujuan Pengeluaran Barang Modal Asal Impor Yang Belum Dibayar BM-nya Untuk Direekspor",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3030",
      "namaDokumen": "Persetujuan Pengeluaran Peralatan Perkantoran Asal Impor Yang Belum Lunas BM Untuk Direekspor",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3048",
      "namaDokumen": "Persetujuan Perpanjangan Meminjamkan Mesin Dan/Atau Cetakan (Moulding) Ke PDKB Lain Bukan Dalam Rangka Subkontrak",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3054",
      "namaDokumen": "Persetujuan Menerima Subkontrak Dari TLDDP",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3057",
      "namaDokumen": "Persetujuan Peminjaman Mesin/Peralatan Pabrik Dari TLDDP",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "343",
      "namaDokumen": "SHIPING ORDER",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "380",
      "namaDokumen": "INVOICE",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "455",
      "namaDokumen": "SURAT SETORAN PAJAK (SSP)",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "531",
      "namaDokumen": "FTZ-03 PEMASUKAN DARI TLDDP",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "803",
      "namaDokumen": "SATS LN / DEPHUT",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "808",
      "namaDokumen": "IJIN IMPOR / POLRI",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "809",
      "namaDokumen": "SIE",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "813",
      "namaDokumen": "DOK. CUKAI (CK)",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "821",
      "namaDokumen": "Surat Tanda Registrasi UPPB",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "873",
      "namaDokumen": "IP (NARKTK, PREKURSOR & PSIKOTR)/DEPKES",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "877",
      "namaDokumen": "Ijin Persetujuan Pembawaan UKA",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "888",
      "namaDokumen": "PENGECUALIAN PERIJINAN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "940",
      "namaDokumen": "KT-9/Izin Impor Karantina Pertanian",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "941",
      "namaDokumen": "KT-13/Izin Impor Karantina Pertanian",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "943",
      "namaDokumen": "KH-5 / IZIN IMPOR KARANTINA HEWAN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "944",
      "namaDokumen": "KH-7 / IZIN IMPOR KARANTINA HEWAN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "957",
      "namaDokumen": "SNI/SPB/DEPDAG",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "959",
      "namaDokumen": "SURAT PERSETUJUAN IMPOR DEP.DAG",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "994",
      "namaDokumen": "BUKTI PENERIMAAN JAMINAN (BPJ)",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "161",
      "namaDokumen": "PPB PLB",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "217",
      "namaDokumen": "PACKING LIST",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "23",
      "namaDokumen": "BC 23",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "25",
      "namaDokumen": "BC 25",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "27",
      "namaDokumen": "BC 27",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "3004",
      "namaDokumen": "Izin PDKB",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3010",
      "namaDokumen": "Persetujuan Pemasukan Barang Dari Kawasan Bebas Ke Kawasan Berikat",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3013",
      "namaDokumen": "Persetujuan Pemasukan Barang Jadi Asal Luar Daerah Pabean Untuk Digabungkan Dengan Hasil Produksi Utama Kawasan Berikat",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3014",
      "namaDokumen": "Persetujuan Pemasukan Peralatan Perkantoran Asal Luar Daerah Pabean Ke Kawasan Berikat",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3017",
      "namaDokumen": "Persetujuan Mengeluarkan Hasil Produksi Kawasan Berikat Ke Tempat Penyelenggaraan Pameran Berikat (TPPB)",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3028",
      "namaDokumen": "Persetujuan Pengeluaran Barang Modal Asal Impor Yang Belum Diselesaikan Kewajiban BM Ke Tempat Lain Dalam Daerah Pabean Sebelum Jangka Waktu 4 (Empat) Tahun Sejak Diimpor, Dan Telah Dipergunakan Di Kawasan Berikat",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3029",
      "namaDokumen": "Keputusan Pembebasan BM Atas Pengeluaran Barang Modal Asal Impor Yang Belum Diselesaikan Kewajiban Pembayaran Bm Ke TLDDP Setelah Jangka Waktu 4 (Empat) Tahun Sejak Diimpor, Dan Telah Dipergunakan Di Kawasan Berikat",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3032",
      "namaDokumen": "Persetujuan Pengeluaran Peralatan Perkantoran Asal Impor Yang Belum Diselesaikan Kewajiban Pembayaran Bm Ke TLDDP Sebelum Jangka Waktu 4 (Empat) Tahun Sejak Diimpor, Dan Telah Dipergunakan Di Kawasan Berikat Yang Bersangkutan",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3038",
      "namaDokumen": "Persetujuan Pengeluaran Barang Modal Untuk Perbaikan/Reparasi Ke KB Lain",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3045",
      "namaDokumen": "Persetujuan Meminjamkan Mesin/Cetakan (Moulding) Ke TLDDP Dalam Rangka Subkontrak",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3051",
      "namaDokumen": "Persetujuan Peminjaman Mesin Atau Cetakan (Moulding) Yang Melebihi Jangka Waktu",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3060",
      "namaDokumen": "Persetujuan Pemasukan Barang Modal Berupa Peralatan Pabrik Dari Luar Daerah Pabean",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3065",
      "namaDokumen": "Persetujuan Pengeluaran Barang Contoh/Sampel KB Dengan Tujuan TLDDP",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "315",
      "namaDokumen": "KONTRAK",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "331",
      "namaDokumen": "P3BET",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "41",
      "namaDokumen": "BC 41",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "500",
      "namaDokumen": "MOU PDE (Eksportir)",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "511",
      "namaDokumen": "FTZ-01 PEMASUKAN DARI LDP (IMPOR)",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "512",
      "namaDokumen": "FTZ-01 PENGELUARAN KE LDP (EKSPOR)",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "52",
      "namaDokumen": "FTZ 02",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "640",
      "namaDokumen": "DELIVERY ORDER",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "65",
      "namaDokumen": "BC 1.1 KONSOLIDASI PJT",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "705",
      "namaDokumen": "B/L",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "812",
      "namaDokumen": "Dok. Impor (PIB)",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "814",
      "namaDokumen": "SKEP IJIN EKSPOR BERKALA",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "818",
      "namaDokumen": "Endorsement BRIK",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "819",
      "namaDokumen": "Sertifikat Intan Kasar",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "820",
      "namaDokumen": "Surat Persetujuan Ekspor (SPE)",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "835",
      "namaDokumen": "IZIN DAN/ATAU PENDAFT PESTISIDA / DEPTAN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "857",
      "namaDokumen": "FUMIGATION CERTIFICATE",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "861",
      "namaDokumen": "CERTIFICATE OF ORIGIN (CO)",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "874",
      "namaDokumen": "IT (PREKURSOR & PSIKOTR)/DEPKES",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "902",
      "namaDokumen": "IJIN BAPETEN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "912",
      "namaDokumen": "SKEP FASILITAS BKPM",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "918",
      "namaDokumen": "SK LABEL BAHASA INDONESIA",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "951",
      "namaDokumen": "HC (HEALTH CERTIFICATE)",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "956",
      "namaDokumen": "PENGAKUAN SBG IMPORTIR TERDAFTAR",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "961",
      "namaDokumen": "Hasil Lab",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "111",
      "namaDokumen": "Bank Devisa Hasil Ekspor (DHE)",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "261",
      "namaDokumen": "BC 261",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "30",
      "namaDokumen": "PEB/EKSPOR",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "3003",
      "namaDokumen": "Persetujuan Penetapan Tempat Sebagai Kawasan Berikat Dan Pemberian Izin Penyelenggara Kawasan Berikat Sekaligus Izin Pengusaha Kawasan Berikat",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3007",
      "namaDokumen": "Perubahan Keputusan Izin Penyelenggara Kawasan Berikat, Izin Pengusaha Kawasan Berikat, Atau Izin PDKB",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3008",
      "namaDokumen": "Pemberian Izin Penambahan Pintu Khusus Pemasukan Dan Pengeluaran Barang Di Kawasan Berikat",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3011",
      "namaDokumen": "Persetujuan Pemasukan Barang Modal Dari Luar Daerah Pabean",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3012",
      "namaDokumen": "Persetujuan Pemasukan Barang Modal Dari Kawasan Berikat Lain",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3015",
      "namaDokumen": "Persetujuan Pemasukan Barang Contoh Asal Luar Daerah Pabean",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3031",
      "namaDokumen": "Persetujuan Pengeluaran Peralatan Perkantoran Asal Impor Yang Belum Diselesaikan Kewajiban Pembayaran Bm Ke Kawasan Berikat Lain Setelah Dipergunakan Di Kawasan Berikat",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3035",
      "namaDokumen": "Persetujuan Untuk Memindahtangankan Barang Modal Asal Tempat Lain Dalam Daerah Pabean",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3037",
      "namaDokumen": "Persetujuan Pengeluaran Barang Modal Untuk Perbaikan/Reparasi Ke TLDDP",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3055",
      "namaDokumen": "Persetujuan Peminjaman Mesin/Cetakan (Moulding) Dari TLDDP Dalam Rangka Subkontrak",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "3062",
      "namaDokumen": "Persetujuan Pemasukan Kembali (Reimpor) Barang Hasil Produksi Asal TPB",
      "kodeDokumenGrup": "null"
    },
    {
      "kodeDokumen": "456",
      "namaDokumen": "SKB",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "50",
      "namaDokumen": "KITE",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "521",
      "namaDokumen": "FTZ-02 PEMASUKAN ANTAR FTZ DAN KAWASAN BERIKAT",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "53",
      "namaDokumen": "FTZ 03",
      "kodeDokumenGrup": "1"
    },
    {
      "kodeDokumen": "704",
      "namaDokumen": "MASTER B/L",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "815",
      "namaDokumen": "SKEP IJIN TATA NIAGA EKSPOR",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "836",
      "namaDokumen": "IZIN IMPOR / DEPTAN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "845",
      "namaDokumen": "REKOMENDASI IMPOR PELUMAS",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "851",
      "namaDokumen": "SURAT IJIN KARANTINA TANAMAN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "853",
      "namaDokumen": "SURAT IJIN KARANTINA HEWAN / IKAN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "858",
      "namaDokumen": "CITES CERTIFICATE",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "871",
      "namaDokumen": "Nomor Pendaftaran Alat Kesehatan/Depkes",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "876",
      "namaDokumen": "Ijin Pembawaan UKA",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "914",
      "namaDokumen": "KITE IKM",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "942",
      "namaDokumen": "IZIN IMPOR KARANTINA TUMBUHAN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "945",
      "namaDokumen": "KH-12 / IZIN IMPOR KARANTINA HEWAN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "948",
      "namaDokumen": "NPIK",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "949",
      "namaDokumen": "PENGAKUAN SBG IMPORTIR PRODUSEN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "950",
      "namaDokumen": "KID-4/IZIN KARANTINA IKAN",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "960",
      "namaDokumen": "3D/PC dan/atau PFP",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "995",
      "namaDokumen": "STBS / SSP-E (PAJAK EKSPOR)",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "996",
      "namaDokumen": "SRT SANGGUP BAYAR (SSB)",
      "kodeDokumenGrup": "2"
    },
    {
      "kodeDokumen": "33",
      "namaDokumen": "BC 33",
      "kodeDokumenGrup": "1"
    }
  ],
  "total": 197
}],
  loading: false,
  current_data: {},
  form: null,
  processed_data: null,
  date: new Date()
}

const headers = {'Content-Type':'application/json',
'beacukai-api-key':process.env.REACT_APP_REFERENSI_GRAVITEE_TOKEN};

export function setCurrentDokumen(data) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_CURRENT_DOKUMEN',
      payload: data
    })
  }
}

export function resetDokumen(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'RESET_DOKUMEN',
      payload: null
    })
  }
}

export function setFormTingkatIp(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_FORM_DOKUMEN',
      payload: bool
    })
  }
}

export function getSearchDokumen(kata = null) {

  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI_API_URL + '/v1/dokumen/getByparams/'+kata

    const options = {
      headers,
      method: 'GET',
      url
    }

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    dispatch({
      type: 'SET_LOADING_DOKUMEN',
      payload: true
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_DOKUMEN',
          payload: false
        })
        dispatch({
          type: 'SET_DOKUMEN',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_DOKUMEN',
          payload: false
        })
      })

    } else{

    var xhr = new XMLHttpRequest();

    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function(){

      if (this.readyState === 4) {

        if(this.status == 200){

          var response = JSON.parse(this.responseText);
          console.log(response);

          dispatch({
            type: 'SET_LOADING_DOKUMEN',
            payload: false
          })
          dispatch({
            type: 'SET_DOKUMEN',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_DOKUMEN',
            payload: false
          })

        }

      }

    });

    xhr.open(options.method, url);

    Object.keys(options.headers).forEach(function(key) {
      xhr.setRequestHeader(key, options.headers[key]);
    });

    xhr.send(JSON.stringify(options.data));

  }

}

}

export function getDokumenGroupsOne(kata = null) {

  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI_API_URL + '/v1/dokumen/getDocGroupsOne'

    const options = {
      headers,
      method: 'GET',
      url
    }

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    dispatch({
      type: 'SET_LOADING_DOKUMEN',
      payload: true
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_DOKUMEN',
          payload: false
        })
        dispatch({
          type: 'SET_DOKUMEN',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_DOKUMEN',
          payload: false
        })
      })

    } else{

    var xhr = new XMLHttpRequest();

    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function(){

      if (this.readyState === 4) {

        if(this.status == 200){

          var response = JSON.parse(this.responseText);
          console.log(response);

          dispatch({
            type: 'SET_LOADING_DOKUMEN',
            payload: false
          })
          dispatch({
            type: 'SET_DOKUMEN',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_DOKUMEN',
            payload: false
          })

        }

      }

    });

    xhr.open(options.method, url);

    Object.keys(options.headers).forEach(function(key) {
      xhr.setRequestHeader(key, options.headers[key]);
    });

    xhr.send(JSON.stringify(options.data));

  }

}

}

export function getDokumen(id = null) {

  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI_API_URL + '/v1/dokumen/all'

    if (id) {
      url = process.env.REACT_APP_REFERENSI_API_URL + '/v1/dokumen/'+ id
    }

    const options = {
      headers,
      method: 'GET',
      url
    }

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    dispatch({
      type: 'SET_LOADING_DOKUMEN',
      payload: true
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_DOKUMEN',
          payload: false
        })
        dispatch({
          type: 'SET_DOKUMEN',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_DOKUMEN',
          payload: false
        })
      })

    } else{

    var xhr = new XMLHttpRequest();

    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function(){

      if (this.readyState === 4) {

        if(this.status == 200){

          var response = JSON.parse(this.responseText);
          console.log(response);

          dispatch({
            type: 'SET_LOADING_DOKUMEN',
            payload: false
          })
          dispatch({
            type: 'SET_DOKUMEN',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_DOKUMEN',
            payload: false
          })

        }

      }

    });

    xhr.open(options.method, url);

    Object.keys(options.headers).forEach(function(key) {
      xhr.setRequestHeader(key, options.headers[key]);
    });

    xhr.send(JSON.stringify(options.data));

  }

}

}

export default function dokumen(state = initialState, action) {

  switch (action.type) {

    case 'SET_DOKUMEN':

    return update(state, {
      response: {
        $set: action.payload
      },
      processed_data: {
        $set: null
      },

    })

    case 'RESET_DOKUMEN':

    return update(state, {
      current_data: {
        $set: null
      },
      processed_data: {
        $set: null
      },

    })

    case 'SET_CURRENT_DOKUMEN':

    return update(state, {
      current_data: {
        $set: action.payload
      },

    })

    case 'SET_PROCESSED_DOKUMEN':

    return update(state, {
      processed_data: {
        $set: action.payload
      },

    })

    case 'SET_LOADING_DOKUMEN':

    return update(state, {
      loading: {
        $set: action.payload
      },

    })

    case 'SET_FORM_DOKUMEN':

    return update(state, {
      form: {
        $set: action.payload
      },

    })

    default:

    return state

  }

}
