import update from 'immutability-helper'
import qs from 'qs'
import axios from 'axios'
import _ from 'lodash'

import { fetch_error,secure_data } from './index'

const initialState = {
  total: 0,
  response: [{
  "status": true,
  "message": "sucess",
  "data": [
    {
      "idGudangTps": "93F6D5F30B5D58C4E05490E2BAE58F9D",
      "kodeGudang": "SOSO",
      "namaGudang": "GUDANG PASOSO/CDC",
      "kodeKantor": "000000",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B6458C4E05490E2BAE58F9D",
      "kodeGudang": "EXPR",
      "namaGudang": "KABER PT. DUNIA EXPRES",
      "kodeKantor": "040300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30B6C58C4E05490E2BAE58F9D",
      "kodeGudang": "T303",
      "namaGudang": "GD/LAP303",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B6D58C4E05490E2BAE58F9D",
      "kodeGudang": "G115",
      "namaGudang": "GUDANG 115",
      "kodeKantor": "040300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30B7058C4E05490E2BAE58F9D",
      "kodeGudang": "GMHP",
      "namaGudang": "Gudang Mitra Harapan Sentosa",
      "kodeKantor": "070500",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B7658C4E05490E2BAE58F9D",
      "kodeGudang": "GPMS",
      "namaGudang": "Gudang Perak Mitra Sejati",
      "kodeKantor": "070500",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B7958C4E05490E2BAE58F9D",
      "kodeGudang": "GINK",
      "namaGudang": "Gudang Inkuplas",
      "kodeKantor": "070500",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B8058C4E05490E2BAE58F9D",
      "kodeGudang": "MINA",
      "namaGudang": "PERTAMINA BALIKPAPAN & LAWE-LAWE",
      "kodeKantor": "100300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "DAL"
    },
    {
      "idGudangTps": "93F6D5F30B8358C4E05490E2BAE58F9D",
      "kodeGudang": "BATU",
      "namaGudang": "TG.BATU",
      "kodeKantor": "100300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "DAL"
    },
    {
      "idGudangTps": "93F6D5F30B8458C4E05490E2BAE58F9D",
      "kodeGudang": "BARU",
      "namaGudang": "KAMPUNG BARU",
      "kodeKantor": "100300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "DAL"
    },
    {
      "idGudangTps": "93F6D5F30B8958C4E05490E2BAE58F9D",
      "kodeGudang": "DHL",
      "namaGudang": "GUDANG BIROTIKA SEMESTA / DHL",
      "kodeKantor": "010800",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30B8A58C4E05490E2BAE58F9D",
      "kodeGudang": "JAS",
      "namaGudang": "GUDANG JASA ANGKASA SEMESTA",
      "kodeKantor": "010800",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30B8C58C4E05490E2BAE58F9D",
      "kodeGudang": "AERI",
      "namaGudang": "GUDANG GADHING AERINDO SATIA",
      "kodeKantor": "010800",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B9058C4E05490E2BAE58F9D",
      "kodeGudang": "JATY",
      "namaGudang": "GUDANG JATAYU",
      "kodeKantor": "010800",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BA058C4E05490E2BAE58F9D",
      "kodeGudang": "SAIA",
      "namaGudang": "KB. PT. SAI APPAREL INDUSTRI",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BA258C4E05490E2BAE58F9D",
      "kodeGudang": "SENT",
      "namaGudang": "KB. PT. APAC SENTRATEX CORP.",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BA558C4E05490E2BAE58F9D",
      "kodeGudang": "SURY",
      "namaGudang": "KB. PT. SURYA MULYA BANGUN INDO.",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BA858C4E05490E2BAE58F9D",
      "kodeGudang": "TEKS",
      "namaGudang": "KB. PT. CEDRATEKS INDAH BUSANA",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BAA58C4E05490E2BAE58F9D",
      "kodeGudang": "TIWI",
      "namaGudang": "KB. PT. PERTIWI INDOMAS",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BAB58C4E05490E2BAE58F9D",
      "kodeGudang": "TOSA",
      "namaGudang": "GB. TOSSA SHAKTI, PT",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BAE58C4E05490E2BAE58F9D",
      "kodeGudang": "UTPK",
      "namaGudang": "UTPK III",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GRHA"
    },
    {
      "idGudangTps": "93F6D5F30BB458C4E05490E2BAE58F9D",
      "kodeGudang": "FORD",
      "namaGudang": "PPGB PT. FORD MOTOR INDONESIA",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BB958C4E05490E2BAE58F9D",
      "kodeGudang": "NLIJ",
      "namaGudang": "PT. NITTSU LEMO INDONESIA LOGISTIK",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BBA58C4E05490E2BAE58F9D",
      "kodeGudang": "202X",
      "namaGudang": "LAPANGAN 202X",
      "kodeKantor": "000000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BBC58C4E05490E2BAE58F9D",
      "kodeGudang": "207X",
      "namaGudang": "GD/LAP.207X",
      "kodeKantor": "040200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BC058C4E05490E2BAE58F9D",
      "kodeGudang": "209X",
      "namaGudang": "GD/LAP.209-210",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BC858C4E05490E2BAE58F9D",
      "kodeGudang": "PPUN",
      "namaGudang": "PT. PUNINAR SARANA RAYA",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BC958C4E05490E2BAE58F9D",
      "kodeGudang": "300X",
      "namaGudang": "GD/LAP.300-302",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BCE58C4E05490E2BAE58F9D",
      "kodeGudang": "304X",
      "namaGudang": "GD/LAP.304-305",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BDB58C4E05490E2BAE58F9D",
      "kodeGudang": "AIRN",
      "namaGudang": "PT. AIRIN (DP3)",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BDD58C4E05490E2BAE58F9D",
      "kodeGudang": "NIAS",
      "namaGudang": "PT. NIASINDO DUTA CEMERLANG",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BE158C4E05490E2BAE58F9D",
      "kodeGudang": "BINA",
      "namaGudang": "PT. BINA SARANA  AMITY (DP3)",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BE258C4E05490E2BAE58F9D",
      "kodeGudang": "ZONA",
      "namaGudang": "PT ZONA TIGA LINTAS",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BED58C4E05490E2BAE58F9D",
      "kodeGudang": "DWIP",
      "namaGudang": "PT.DWIPA",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BF058C4E05490E2BAE58F9D",
      "kodeGudang": "EXPR",
      "namaGudang": "KABER PT. DUNIA EXPRES",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BF658C4E05490E2BAE58F9D",
      "kodeGudang": "G201",
      "namaGudang": "GUDANG 201",
      "kodeKantor": "040300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BFF58C4E05490E2BAE58F9D",
      "kodeGudang": "G115",
      "namaGudang": "GUDANG 115",
      "kodeKantor": "000000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C0058C4E05490E2BAE58F9D",
      "kodeGudang": "G115",
      "namaGudang": "GUDANG 115",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C0958C4E05490E2BAE58F9D",
      "kodeGudang": "G813",
      "namaGudang": "GUDANG 108 -113",
      "kodeKantor": "000000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C0D58C4E05490E2BAE58F9D",
      "kodeGudang": "GAPI",
      "namaGudang": "GUDANG API / PRIMANATA",
      "kodeKantor": "000000",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C1558C4E05490E2BAE58F9D",
      "kodeGudang": "DWIP",
      "namaGudang": "PT.DWIPA",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C1658C4E05490E2BAE58F9D",
      "kodeGudang": "GDKP",
      "namaGudang": "GB PT DHARMA KARYA PERDANA",
      "kodeKantor": "000000",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C1958C4E05490E2BAE58F9D",
      "kodeGudang": "GMS1",
      "namaGudang": "GUDANG MAS SATRIA",
      "kodeKantor": "000000",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C1E58C4E05490E2BAE58F9D",
      "kodeGudang": "GSRA",
      "namaGudang": "LAP.GRAHA SEGARA",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C2758C4E05490E2BAE58F9D",
      "kodeGudang": "ID09",
      "namaGudang": "gudang peluru",
      "kodeKantor": "040100",
      "jenisGudang": "5",
      "idPengguna": "24",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C2E58C4E05490E2BAE58F9D",
      "kodeGudang": "JASS",
      "namaGudang": "GUDANG JAsS RUSH HANDLING",
      "kodeKantor": "040100",
      "jenisGudang": "7",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C3858C4E05490E2BAE58F9D",
      "kodeGudang": "KOJA",
      "namaGudang": "LAP KOJA - KSO TERMINAL PETIKEMAS KOJA",
      "kodeKantor": "040100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C3F58C4E05490E2BAE58F9D",
      "kodeGudang": "LSAM",
      "namaGudang": "GUDANG SEMARANG",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C4158C4E05490E2BAE58F9D",
      "kodeGudang": "GSRA",
      "namaGudang": "LAP G. SEGARA-GRAHA S.,PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GRHA"
    },
    {
      "idGudangTps": "93F6D5F30C4358C4E05490E2BAE58F9D",
      "kodeGudang": "MAPR",
      "namaGudang": "PT.MITRA ABADI PRATAMA(UGD)",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C4A58C4E05490E2BAE58F9D",
      "kodeGudang": "MMLG",
      "namaGudang": "MM LOGISTIK",
      "kodeKantor": "000000",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C5058C4E05490E2BAE58F9D",
      "kodeGudang": "MSAP",
      "namaGudang": "PT.MSA",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C5258C4E05490E2BAE58F9D",
      "kodeGudang": "TIKA",
      "namaGudang": "GD. DHARMA KARTIKA BAKTI",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C5B58C4E05490E2BAE58F9D",
      "kodeGudang": "TMKT",
      "namaGudang": "PT. MASAJI KARGOSENTRA TAMA",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C5E58C4E05490E2BAE58F9D",
      "kodeGudang": "TMKT",
      "namaGudang": "PT. MASAJI KARGOSENTRA TAMA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C6758C4E05490E2BAE58F9D",
      "kodeGudang": "TNDO",
      "namaGudang": "PT. TRANSPORINDO LP",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C6A58C4E05490E2BAE58F9D",
      "kodeGudang": "TPK1",
      "namaGudang": "UTPK 1 IMPOR",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C6C58C4E05490E2BAE58F9D",
      "kodeGudang": "TPK2",
      "namaGudang": "UTPK II",
      "kodeKantor": "000000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C7058C4E05490E2BAE58F9D",
      "kodeGudang": "CART",
      "namaGudang": "CAR TERMINAL-PELINDO,PT",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30C7258C4E05490E2BAE58F9D",
      "kodeGudang": "TRAN",
      "namaGudang": "TRANSPORTAMA SELATAN /   T S I",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C7358C4E05490E2BAE58F9D",
      "kodeGudang": "TRAN",
      "namaGudang": "TRANSPORTAMA SELATAN /   T S I",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C7658C4E05490E2BAE58F9D",
      "kodeGudang": "TRIS",
      "namaGudang": "PT. TRI SARI",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C8058C4E05490E2BAE58F9D",
      "kodeGudang": "ULIM",
      "namaGudang": "PT.UJUNG LIMA",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C9858C4E05490E2BAE58F9D",
      "kodeGudang": "L200",
      "namaGudang": "LAPANGAN 200",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C9F58C4E05490E2BAE58F9D",
      "kodeGudang": "G501",
      "namaGudang": "GUDANG 501",
      "kodeKantor": "070100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CA258C4E05490E2BAE58F9D",
      "kodeGudang": "G405",
      "namaGudang": "GUDANG 405",
      "kodeKantor": "070100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CC558C4E05490E2BAE58F9D",
      "kodeGudang": "A002",
      "namaGudang": "PT. PELINDO II",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CCB58C4E05490E2BAE58F9D",
      "kodeGudang": "A010",
      "namaGudang": "PT. SULFINDO ADIUSAHA",
      "kodeKantor": "050400",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CE558C4E05490E2BAE58F9D",
      "kodeGudang": "C014",
      "namaGudang": "PT. PROINTAL",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CE758C4E05490E2BAE58F9D",
      "kodeGudang": "A021",
      "namaGudang": "PT. INDAH KIAT PULP & PAPER",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CEF58C4E05490E2BAE58F9D",
      "kodeGudang": "A024",
      "namaGudang": "PT. STYRINDO MONO INDONESIA",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CF158C4E05490E2BAE58F9D",
      "kodeGudang": "C020",
      "namaGudang": "PT. PANCA PUTRA OTOMOTIF",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CF658C4E05490E2BAE58F9D",
      "kodeGudang": "C022",
      "namaGudang": "PT. ALAM AGRI ADIPERKASA",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D0158C4E05490E2BAE58F9D",
      "kodeGudang": "NISE",
      "namaGudang": "PT. NIHON SEIKI INDONESIA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D0758C4E05490E2BAE58F9D",
      "kodeGudang": "NUSA",
      "namaGudang": "KABER.  NUSANTARA TG. PRIOK",
      "kodeKantor": "000000",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D0B58C4E05490E2BAE58F9D",
      "kodeGudang": "JAYA",
      "namaGudang": "KABER.  PT. LAUTAN JAYA KUMALA",
      "kodeKantor": "040300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D1358C4E05490E2BAE58F9D",
      "kodeGudang": "PLII",
      "namaGudang": "PT. PELABUHAN INDONESIA II",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D1458C4E05490E2BAE58F9D",
      "kodeGudang": "PLII",
      "namaGudang": "PT. PELABUHAN INDONESIA II",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D1958C4E05490E2BAE58F9D",
      "kodeGudang": "RA33",
      "namaGudang": "GUDANG RA 33-35",
      "kodeKantor": "040300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D1A58C4E05490E2BAE58F9D",
      "kodeGudang": "PSAP",
      "namaGudang": "PT. PUTRA SIGAOL ARGANTA PERKASA",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D1C58C4E05490E2BAE58F9D",
      "kodeGudang": "PUNI",
      "namaGudang": "PT. PUNINAR PACIFIC (DP3)",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D1F58C4E05490E2BAE58F9D",
      "kodeGudang": "RA33",
      "namaGudang": "GUDANG RA-33",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D2158C4E05490E2BAE58F9D",
      "kodeGudang": "SOSO",
      "namaGudang": "GUDANG PASOSO/CDC",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D2258C4E05490E2BAE58F9D",
      "kodeGudang": "SUPA",
      "namaGudang": "GUDANG SUNDA KELAPA",
      "kodeKantor": "040300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D2A58C4E05490E2BAE58F9D",
      "kodeGudang": "TPK2",
      "namaGudang": "UTPK II - JICT, PT",
      "kodeKantor": "040300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30D2C58C4E05490E2BAE58F9D",
      "kodeGudang": "SE06",
      "namaGudang": "Gudang PFPB SE06",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D3558C4E05490E2BAE58F9D",
      "kodeGudang": "223X",
      "namaGudang": "LAPANGAN 223X",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30D3958C4E05490E2BAE58F9D",
      "kodeGudang": "G006",
      "namaGudang": "Cukai",
      "kodeKantor": "050500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D4158C4E05490E2BAE58F9D",
      "kodeGudang": "DEWA",
      "namaGudang": "PT. DEWATA AGUNG WIBAWA",
      "kodeKantor": "080100",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D4D58C4E05490E2BAE58F9D",
      "kodeGudang": "DIPP",
      "namaGudang": "Dermaga Impor Pelabuhan Pontianak",
      "kodeKantor": "090100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D5458C4E05490E2BAE58F9D",
      "kodeGudang": "GD07",
      "namaGudang": "GUDANG 07",
      "kodeKantor": "030700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30D5558C4E05490E2BAE58F9D",
      "kodeGudang": "UTPK",
      "namaGudang": "UNIT TERMINAL PETI KEMAS",
      "kodeKantor": "030700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30D5858C4E05490E2BAE58F9D",
      "kodeGudang": "GD09",
      "namaGudang": "GUDANG IMPORTIR",
      "kodeKantor": "030700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30D5C58C4E05490E2BAE58F9D",
      "kodeGudang": "PEL2",
      "namaGudang": "Gudang PT.Pelindo II",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D6658C4E05490E2BAE58F9D",
      "kodeGudang": "TSNA",
      "namaGudang": "Gudang PT. Tanoto Steel",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D6858C4E05490E2BAE58F9D",
      "kodeGudang": "SBID",
      "namaGudang": "PT. Sabak Indah",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D6B58C4E05490E2BAE58F9D",
      "kodeGudang": "PSKT",
      "namaGudang": "Gd. PT. PSKT",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D6E58C4E05490E2BAE58F9D",
      "kodeGudang": "PTRN",
      "namaGudang": "Gd. Petro Nipah",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D7158C4E05490E2BAE58F9D",
      "kodeGudang": "PDMU",
      "namaGudang": "Gd. PD. Mulia",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D7558C4E05490E2BAE58F9D",
      "kodeGudang": "PPI",
      "namaGudang": "Gd. Pers. Perd. Idonesia",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D7658C4E05490E2BAE58F9D",
      "kodeGudang": "PCIJ",
      "namaGudang": "gd.petrochina Int Jabung",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D7758C4E05490E2BAE58F9D",
      "kodeGudang": "PTBD",
      "namaGudang": "Gd. PT. Budiman",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D7E58C4E05490E2BAE58F9D",
      "kodeGudang": "GKCB",
      "namaGudang": "GD. Kunangan Citra Bahari",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D8358C4E05490E2BAE58F9D",
      "kodeGudang": "JRDN",
      "namaGudang": "TPS-TNS JARINGAN DINAMIKA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D8558C4E05490E2BAE58F9D",
      "kodeGudang": "G002",
      "namaGudang": "GROUP TNS",
      "kodeKantor": "050100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D9158C4E05490E2BAE58F9D",
      "kodeGudang": "BSU1",
      "namaGudang": "PT. BAHARI SEMESTA UTAMA",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30D9F58C4E05490E2BAE58F9D",
      "kodeGudang": "MOL",
      "namaGudang": "MOLORE",
      "kodeKantor": "110600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DB158C4E05490E2BAE58F9D",
      "kodeGudang": "DILK",
      "namaGudang": "Dermaga Impor Luar Kawasan",
      "kodeKantor": "090100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DB258C4E05490E2BAE58F9D",
      "kodeGudang": "072",
      "namaGudang": "Gudang Importir",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DB958C4E05490E2BAE58F9D",
      "kodeGudang": "001",
      "namaGudang": "PANGKALBALAM",
      "kodeKantor": "030300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DC358C4E05490E2BAE58F9D",
      "kodeGudang": "TBLO",
      "namaGudang": "JL. WKO, SAMPING STIKES TOBELO, HALMAHERA UTARA",
      "kodeKantor": "120200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DC558C4E05490E2BAE58F9D",
      "kodeGudang": "0003",
      "namaGudang": "TPS PT. CARGILL",
      "kodeKantor": "111200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "001"
    },
    {
      "idGudangTps": "93F6D5F30DCF58C4E05490E2BAE58F9D",
      "kodeGudang": "066",
      "namaGudang": "GUDANG IMPORTIR CV. DUA SEKAWAN",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DD758C4E05490E2BAE58F9D",
      "kodeGudang": "214X",
      "namaGudang": "LAP 214X SELATAN",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30DDD58C4E05490E2BAE58F9D",
      "kodeGudang": "T005",
      "namaGudang": "GD & LAP 005 - PT. Pelindo",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30DDE58C4E05490E2BAE58F9D",
      "kodeGudang": "TJE1",
      "namaGudang": "GD & LAP JL PENJALAI-TJETOT,PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30DE058C4E05490E2BAE58F9D",
      "kodeGudang": "16XS",
      "namaGudang": "LAP 106X SLTN-TRANS LP, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DE358C4E05490E2BAE58F9D",
      "kodeGudang": "ADIP",
      "namaGudang": "GD & LAP - ADIPURUSA, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DE458C4E05490E2BAE58F9D",
      "kodeGudang": "DWTA",
      "namaGudang": "GD & LAP - DWIPAHASTA U., PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DEE58C4E05490E2BAE58F9D",
      "kodeGudang": "ARN4",
      "namaGudang": "LAP EX GAL III (AIRIN,PT)",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DF258C4E05490E2BAE58F9D",
      "kodeGudang": "G209",
      "namaGudang": "GUDANG 209",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30DF658C4E05490E2BAE58F9D",
      "kodeGudang": "T003",
      "namaGudang": "GD & LAP 003, GD EX BULOG",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30DF758C4E05490E2BAE58F9D",
      "kodeGudang": "PRJP",
      "namaGudang": "LAP PETI KEMAS EX. AREAL KBN",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30DF958C4E05490E2BAE58F9D",
      "kodeGudang": "JTNK",
      "namaGudang": "JAKARTA TANK TERMINAL, PT",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30DFD58C4E05490E2BAE58F9D",
      "kodeGudang": "R1",
      "namaGudang": "test 1",
      "kodeKantor": "009000",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E0158C4E05490E2BAE58F9D",
      "kodeGudang": "061",
      "namaGudang": "GUDANG IMPORTIR PT. BABELINDO ENERGI",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E0858C4E05490E2BAE58F9D",
      "kodeGudang": "GD02",
      "namaGudang": "GUDANG GAPURA",
      "kodeKantor": "111200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "001"
    },
    {
      "idGudangTps": "93F6D5F30E1658C4E05490E2BAE58F9D",
      "kodeGudang": "002",
      "namaGudang": "LUAR KAWASAN PABEAN",
      "kodeKantor": "090800",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E1A58C4E05490E2BAE58F9D",
      "kodeGudang": "001",
      "namaGudang": "GUDANG KPPBC MANADO",
      "kodeKantor": "111200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E1F58C4E05490E2BAE58F9D",
      "kodeGudang": "CFS",
      "namaGudang": "GUDANG CARGO",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E2058C4E05490E2BAE58F9D",
      "kodeGudang": "JAAG",
      "namaGudang": "KB PT. JAVA AGRITECH",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E2258C4E05490E2BAE58F9D",
      "kodeGudang": "PLOS",
      "namaGudang": "GD PT. PLOSS ASIA",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E2758C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP GUDANG 1",
      "kodeKantor": "010800",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E2858C4E05490E2BAE58F9D",
      "kodeGudang": "G002",
      "namaGudang": "GROUP 2",
      "kodeKantor": "060100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E3358C4E05490E2BAE58F9D",
      "kodeGudang": "ASAM",
      "namaGudang": "ASAM-ASAM",
      "kodeKantor": "100100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E3658C4E05490E2BAE58F9D",
      "kodeGudang": "GPPY",
      "namaGudang": "Gudang Payo Selincah",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E3D58C4E05490E2BAE58F9D",
      "kodeGudang": "GDJA",
      "namaGudang": "Gudang PT. Drillco Jaya Abadi",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E3F58C4E05490E2BAE58F9D",
      "kodeGudang": "BGR",
      "namaGudang": "GUDANG PT. BAHARI GEMBIRA RIA",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E4358C4E05490E2BAE58F9D",
      "kodeGudang": "T1KT",
      "namaGudang": "TERANG 1 KUALA TUNGKAL",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E4458C4E05490E2BAE58F9D",
      "kodeGudang": "GPS",
      "namaGudang": "Gudang Payo Selincah",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E4858C4E05490E2BAE58F9D",
      "kodeGudang": "CVSM",
      "namaGudang": "GUDANG CV. SAMUDRA",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E5258C4E05490E2BAE58F9D",
      "kodeGudang": "PMA",
      "namaGudang": "GD PT. PRIMA MAKMUR ABADI",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E6758C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP 001",
      "kodeKantor": "080300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E6B58C4E05490E2BAE58F9D",
      "kodeGudang": "A029",
      "namaGudang": "PT. ERISS",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E6E58C4E05490E2BAE58F9D",
      "kodeGudang": "MKT",
      "namaGudang": "TPS MKT",
      "kodeKantor": "010700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E7158C4E05490E2BAE58F9D",
      "kodeGudang": "CYH",
      "namaGudang": "KAWASAN GD. 104-105",
      "kodeKantor": "110100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GP1"
    },
    {
      "idGudangTps": "93F6D5F30E8558C4E05490E2BAE58F9D",
      "kodeGudang": "GPPI",
      "namaGudang": "Gudang Impor PT. PPI (Perawang)",
      "kodeKantor": "021200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E8A58C4E05490E2BAE58F9D",
      "kodeGudang": "RAPP",
      "namaGudang": "Gudang Impor PT. RAPP Buatan (KB)",
      "kodeKantor": "021200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E8D58C4E05490E2BAE58F9D",
      "kodeGudang": "ANGK",
      "namaGudang": "Gudang Impor PT. Angkasa Pura II (Kargo)",
      "kodeKantor": "021200",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E9058C4E05490E2BAE58F9D",
      "kodeGudang": "FEDX",
      "namaGudang": "GUDANG FEDEX",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E9958C4E05490E2BAE58F9D",
      "kodeGudang": "TA05",
      "namaGudang": "TPS-TNS PANALPINA NUSAJAYA TRN",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EA258C4E05490E2BAE58F9D",
      "kodeGudang": "TB09",
      "namaGudang": "TPS-TNS MONANG SIANIPAR ABADI",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EA658C4E05490E2BAE58F9D",
      "kodeGudang": "TE03",
      "namaGudang": "TPS-TNS PRIMA INTERNATIONAL C.",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EA758C4E05490E2BAE58F9D",
      "kodeGudang": "TE08",
      "namaGudang": "TPS-TNS YUSEN AIR & SEA INDON",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EA958C4E05490E2BAE58F9D",
      "kodeGudang": "GPSU",
      "namaGudang": "PSU CFS",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GIJS"
    },
    {
      "idGudangTps": "93F6D5F30EB058C4E05490E2BAE58F9D",
      "kodeGudang": "CIJS",
      "namaGudang": "IJS CONTAINER",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GIJS"
    },
    {
      "idGudangTps": "93F6D5F30EB358C4E05490E2BAE58F9D",
      "kodeGudang": "GALN",
      "namaGudang": "ALN CFS",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GIJS"
    },
    {
      "idGudangTps": "93F6D5F30EB658C4E05490E2BAE58F9D",
      "kodeGudang": "BT06",
      "namaGudang": "NONGSA",
      "kodeKantor": "020400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30EC058C4E05490E2BAE58F9D",
      "kodeGudang": "BT16",
      "namaGudang": "HARBOUR BAY",
      "kodeKantor": "020400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EC958C4E05490E2BAE58F9D",
      "kodeGudang": "GBTY",
      "namaGudang": "GB. PT. TUNGYA",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "GTPS"
    },
    {
      "idGudangTps": "93F6D5F30ED158C4E05490E2BAE58F9D",
      "kodeGudang": "TPS3",
      "namaGudang": "GUDANG IJS, PRIMAMAS, BNS",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "GIJS"
    },
    {
      "idGudangTps": "93F6D5F30ED358C4E05490E2BAE58F9D",
      "kodeGudang": "LAIN",
      "namaGudang": "GUDANG LAIN LAIN",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "GTPS"
    },
    {
      "idGudangTps": "93F6D5F30ED458C4E05490E2BAE58F9D",
      "kodeGudang": "GIJS",
      "namaGudang": "GROUP IJS",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30ED658C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP 001",
      "kodeKantor": "101000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30ED758C4E05490E2BAE58F9D",
      "kodeGudang": "0200",
      "namaGudang": "GUDANG LATIHAN",
      "kodeKantor": "110600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EE058C4E05490E2BAE58F9D",
      "kodeGudang": "TMNI",
      "namaGudang": "TPS-TNS MAKTRANS NUSA INDAH",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EE658C4E05490E2BAE58F9D",
      "kodeGudang": "IMSI",
      "namaGudang": "IMS LOGISTICS INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EE858C4E05490E2BAE58F9D",
      "kodeGudang": "IGLB",
      "namaGudang": "TPS-TNS INTI GLOBAL LOGISTICS",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EED58C4E05490E2BAE58F9D",
      "kodeGudang": "MATR",
      "namaGudang": "MITRA ATLANTIK TRANSINDO",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EF658C4E05490E2BAE58F9D",
      "kodeGudang": "TMSA",
      "namaGudang": "TPP PT. MULTI SEJAHTERA ABADI  ( TP I )",
      "kodeKantor": "040100",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F0058C4E05490E2BAE58F9D",
      "kodeGudang": "KARA",
      "namaGudang": "PT. KARAVAN (TPS)",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F0858C4E05490E2BAE58F9D",
      "kodeGudang": "1002",
      "namaGudang": "KBN CAKUNG II",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F0958C4E05490E2BAE58F9D",
      "kodeGudang": "1003",
      "namaGudang": "KBN CAKUNG III",
      "kodeKantor": "040400",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F0B58C4E05490E2BAE58F9D",
      "kodeGudang": "1005",
      "namaGudang": "KBN CAKUNG V",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F1458C4E05490E2BAE58F9D",
      "kodeGudang": "1015",
      "namaGudang": "PRJ KEMAYORAN/LAINNYA",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F1558C4E05490E2BAE58F9D",
      "kodeGudang": "1016",
      "namaGudang": "KB DILUAR KBN I",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F1958C4E05490E2BAE58F9D",
      "kodeGudang": "1020",
      "namaGudang": "KB DILUAR KBN V",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F1C58C4E05490E2BAE58F9D",
      "kodeGudang": "1023",
      "namaGudang": "JNE",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F2158C4E05490E2BAE58F9D",
      "kodeGudang": "1033",
      "namaGudang": "CITRA INDOGUNA SEMESTA",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F2358C4E05490E2BAE58F9D",
      "kodeGudang": "1035",
      "namaGudang": "KISHIMOTO SANGYO INDONESIA",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F2658C4E05490E2BAE58F9D",
      "kodeGudang": "1100",
      "namaGudang": "Wilayah Kerja I",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F2958C4E05490E2BAE58F9D",
      "kodeGudang": "1400",
      "namaGudang": "Wilayah Kerja II",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F2D58C4E05490E2BAE58F9D",
      "kodeGudang": "2300",
      "namaGudang": "Administrasi TPB II-03",
      "kodeKantor": "040400",
      "jenisGudang": "4",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F3058C4E05490E2BAE58F9D",
      "kodeGudang": "3100",
      "namaGudang": "Wilayah Kerja II",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F4458C4E05490E2BAE58F9D",
      "kodeGudang": "SIMA",
      "namaGudang": "PT. SIAM MASPION GRESIK",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F4758C4E05490E2BAE58F9D",
      "kodeGudang": "SMGS",
      "namaGudang": "PT. SEMEN GRESIK",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G005"
    },
    {
      "idGudangTps": "93F6D5F30F4A58C4E05490E2BAE58F9D",
      "kodeGudang": "KDBW",
      "namaGudang": "KODECO ENERGY BAWEAN",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F6358C4E05490E2BAE58F9D",
      "kodeGudang": "G110",
      "namaGudang": "GUDANG 110 - 113",
      "kodeKantor": "010700",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F6858C4E05490E2BAE58F9D",
      "kodeGudang": "4600",
      "namaGudang": "Hanggar IV-06",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F6D58C4E05490E2BAE58F9D",
      "kodeGudang": "8000",
      "namaGudang": "PT. Madalina",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F6E58C4E05490E2BAE58F9D",
      "kodeGudang": "8100",
      "namaGudang": "TPS PT.JASA ANGKASA SEMESTA",
      "kodeKantor": "040400",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F7658C4E05490E2BAE58F9D",
      "kodeGudang": "4700",
      "namaGudang": "Hanggar IV-07",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F7858C4E05490E2BAE58F9D",
      "kodeGudang": "5200",
      "namaGudang": "Wilayah Kerja III",
      "kodeKantor": "040400",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F7958C4E05490E2BAE58F9D",
      "kodeGudang": "5300",
      "namaGudang": "Wilayah Kerja III",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F7C58C4E05490E2BAE58F9D",
      "kodeGudang": "6200",
      "namaGudang": "Administrasi TPB VI-02",
      "kodeKantor": "040400",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F7E58C4E05490E2BAE58F9D",
      "kodeGudang": "6400",
      "namaGudang": "Wilayah Kerja II",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F8358C4E05490E2BAE58F9D",
      "kodeGudang": "8800",
      "namaGudang": "TPS PT. ANTARTIKA RIMBA",
      "kodeKantor": "040400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F8758C4E05490E2BAE58F9D",
      "kodeGudang": "9002",
      "namaGudang": "TPS PT. NITTSU LEMO INDONESIA LI",
      "kodeKantor": "040400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F8958C4E05490E2BAE58F9D",
      "kodeGudang": "9004",
      "namaGudang": "TPS PT. BIMARUNA JAYA",
      "kodeKantor": "040400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F8A58C4E05490E2BAE58F9D",
      "kodeGudang": "9005",
      "namaGudang": "TPS PT. ZONA TIGA LINTAS",
      "kodeKantor": "040400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F8C58C4E05490E2BAE58F9D",
      "kodeGudang": "9007",
      "namaGudang": "TPS PT. BIMARUNA JAYA",
      "kodeKantor": "040400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F9058C4E05490E2BAE58F9D",
      "kodeGudang": "AGRA",
      "namaGudang": "LAP. PENUMP. PT. AGRATAMA PACIFIC",
      "kodeKantor": "060100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FA058C4E05490E2BAE58F9D",
      "kodeGudang": "GD14",
      "namaGudang": "GUDANG XIV",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FA658C4E05490E2BAE58F9D",
      "kodeGudang": "GDG9",
      "namaGudang": "GUDANG IX",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FAC58C4E05490E2BAE58F9D",
      "kodeGudang": "GSM2",
      "namaGudang": "GUDANG SAMUDERA 2",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": " "
    },
    {
      "idGudangTps": "93F6D5F30FAF58C4E05490E2BAE58F9D",
      "kodeGudang": "INAX",
      "namaGudang": "KB. PT. INAX INTERNATIONAL CORP.",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30FB358C4E05490E2BAE58F9D",
      "kodeGudang": "KAYU",
      "namaGudang": "TPS. PT. KAYU LAPIS INDONESIA",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30FB558C4E05490E2BAE58F9D",
      "kodeGudang": "KORS",
      "namaGudang": "KB. PT. KORINA SEMARANG",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FB858C4E05490E2BAE58F9D",
      "kodeGudang": "SOLO",
      "namaGudang": "SOLO MURNI",
      "kodeKantor": "060600",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30FB958C4E05490E2BAE58F9D",
      "kodeGudang": "LADE",
      "namaGudang": "GUDANG PT.LADEWINDO GARMENT",
      "kodeKantor": "060600",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30FBA58C4E05490E2BAE58F9D",
      "kodeGudang": "JITU",
      "namaGudang": "GUDANG PT. DJITOE",
      "kodeKantor": "060600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30FC658C4E05490E2BAE58F9D",
      "kodeGudang": "TPA1",
      "namaGudang": "PT. PERTAMINA (TANKI NO. 31T2 DAN 32T2)",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FC758C4E05490E2BAE58F9D",
      "kodeGudang": "A031",
      "namaGudang": "PT. POLYCHEM INDONESIA, TBK",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30FCE58C4E05490E2BAE58F9D",
      "kodeGudang": "KPCN",
      "namaGudang": "KANTOR POS CIREBON",
      "kodeKantor": "050700",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30FD258C4E05490E2BAE58F9D",
      "kodeGudang": "IDSJ",
      "namaGudang": "PT. AMA KOMP. BANDARA SENTANI",
      "kodeKantor": "120600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FD358C4E05490E2BAE58F9D",
      "kodeGudang": "TPA",
      "namaGudang": "TEMPAT PENIMBUNAN KALIANGET",
      "kodeKantor": "070200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "PLUK"
    },
    {
      "idGudangTps": "93F6D5F30FE358C4E05490E2BAE58F9D",
      "kodeGudang": "AMM1",
      "namaGudang": "PT. AGROFOOD MAKMUR MANDIRI",
      "kodeKantor": "070300",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FE758C4E05490E2BAE58F9D",
      "kodeGudang": "GMLC",
      "namaGudang": "Multi Lintas Cemerlang",
      "kodeKantor": "080100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30FE858C4E05490E2BAE58F9D",
      "kodeGudang": "GCAS",
      "namaGudang": "Cardig Aero Service",
      "kodeKantor": "080100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30FE958C4E05490E2BAE58F9D",
      "kodeGudang": "AB16",
      "namaGudang": "GUDANG DAN LAPANGAN AMBON",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30FF758C4E05490E2BAE58F9D",
      "kodeGudang": "SER1",
      "namaGudang": "SERUI",
      "kodeKantor": "120900",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "03"
    },
    {
      "idGudangTps": "93F6D5F30FF858C4E05490E2BAE58F9D",
      "kodeGudang": "PTPD",
      "namaGudang": "PELABUHAN TANJUNG PANDAN",
      "kodeKantor": "030500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FF958C4E05490E2BAE58F9D",
      "kodeGudang": "G005",
      "namaGudang": "GD. PELABUHAN TULEHU",
      "kodeKantor": "120100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FFC58C4E05490E2BAE58F9D",
      "kodeGudang": "0036",
      "namaGudang": "GUDANG H. SAMAN PARIT 8 TEMBILAHAN",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FFE58C4E05490E2BAE58F9D",
      "kodeGudang": "DABN",
      "namaGudang": "DABN PROBOLINGGO",
      "kodeKantor": "071200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3100458C4E05490E2BAE58F9D",
      "kodeGudang": "BTU",
      "namaGudang": "BEBATU",
      "kodeKantor": "100900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3100D58C4E05490E2BAE58F9D",
      "kodeGudang": "GPS",
      "namaGudang": "GUDANG MILIK PT.PELINDO I",
      "kodeKantor": "021100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3100E58C4E05490E2BAE58F9D",
      "kodeGudang": "089",
      "namaGudang": "Gudang ICDX Logistik Berikat",
      "kodeKantor": "030300",
      "jenisGudang": "7",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3100F58C4E05490E2BAE58F9D",
      "kodeGudang": "068",
      "namaGudang": "Gudang Importir PT Bumi Sawit Sukses Pratama",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3101558C4E05490E2BAE58F9D",
      "kodeGudang": "1001",
      "namaGudang": "TANGKI TIMBUN MTP",
      "kodeKantor": "011300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GD01"
    },
    {
      "idGudangTps": "93F6D5F3101E58C4E05490E2BAE58F9D",
      "kodeGudang": "GHCI",
      "namaGudang": "Gudang Holcim Indonesia",
      "kodeKantor": "070400",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3102158C4E05490E2BAE58F9D",
      "kodeGudang": "BOA",
      "namaGudang": "BENOA",
      "kodeKantor": "080200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3102758C4E05490E2BAE58F9D",
      "kodeGudang": "ANGG",
      "namaGudang": "PELABUHAN GORONTALO",
      "kodeKantor": "111300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G02"
    },
    {
      "idGudangTps": "93F6D5F3102958C4E05490E2BAE58F9D",
      "kodeGudang": "GD01",
      "namaGudang": "GUDANG PT.DUS",
      "kodeKantor": "060400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3102B58C4E05490E2BAE58F9D",
      "kodeGudang": "ABCD",
      "namaGudang": "GORONTALO",
      "kodeKantor": "111300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G02"
    },
    {
      "idGudangTps": "93F6D5F3103158C4E05490E2BAE58F9D",
      "kodeGudang": "LKP",
      "namaGudang": "LUAR KAWASAN PABEAN",
      "kodeKantor": "110600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3103658C4E05490E2BAE58F9D",
      "kodeGudang": "053",
      "namaGudang": "GUDANG CV.NURJANAH",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3103E58C4E05490E2BAE58F9D",
      "kodeGudang": "TNG",
      "namaGudang": "WORKSHOP IFISHDECO",
      "kodeKantor": "110600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3104158C4E05490E2BAE58F9D",
      "kodeGudang": "GD1",
      "namaGudang": "PG. GORONTALO",
      "kodeKantor": "111300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G01"
    },
    {
      "idGudangTps": "93F6D5F3104758C4E05490E2BAE58F9D",
      "kodeGudang": "GD2",
      "namaGudang": "BSU",
      "kodeKantor": "111300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G02"
    },
    {
      "idGudangTps": "93F6D5F3104D58C4E05490E2BAE58F9D",
      "kodeGudang": "T01",
      "namaGudang": "GD PT GADING MAS INDAH",
      "kodeKantor": "081200",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "T01"
    },
    {
      "idGudangTps": "93F6D5F3104F58C4E05490E2BAE58F9D",
      "kodeGudang": "GALI",
      "namaGudang": "LAPANGAN PENIMBUNAN PT. AYU LESTARI INDAH",
      "kodeKantor": "130100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GBNA"
    },
    {
      "idGudangTps": "93F6D5F3105358C4E05490E2BAE58F9D",
      "kodeGudang": "TMAL",
      "namaGudang": "Mustika Alam Lestari",
      "kodeKantor": "050400",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3105658C4E05490E2BAE58F9D",
      "kodeGudang": "103",
      "namaGudang": "Grup Pos Kelapa Kampit",
      "kodeKantor": "030500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3105F58C4E05490E2BAE58F9D",
      "kodeGudang": "SLWK",
      "namaGudang": "SENORO LUWUK",
      "kodeKantor": "111000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3106158C4E05490E2BAE58F9D",
      "kodeGudang": "MANT",
      "namaGudang": "KEL. WANGKUNG, KEC. ALOK BARAT, KAB. MANGGARAI",
      "kodeKantor": "080700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3106258C4E05490E2BAE58F9D",
      "kodeGudang": "GBB1",
      "namaGudang": "Gudang GBB1 Perum Bulog",
      "kodeKantor": "130100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GBNA"
    },
    {
      "idGudangTps": "93F6D5F3106458C4E05490E2BAE58F9D",
      "kodeGudang": "KLKL",
      "namaGudang": "Perairan Laut Kuala Langsa",
      "kodeKantor": "130600",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3106858C4E05490E2BAE58F9D",
      "kodeGudang": "CDP1",
      "namaGudang": "Gudang CDP",
      "kodeKantor": "051000",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GCDP"
    },
    {
      "idGudangTps": "93F6D5F3106B58C4E05490E2BAE58F9D",
      "kodeGudang": "JAS",
      "namaGudang": "GUDANG JASA ANGKASA SEMESTA",
      "kodeKantor": "010100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3107058C4E05490E2BAE58F9D",
      "kodeGudang": "MTP",
      "namaGudang": "STORAGE TANK PT.MTP",
      "kodeKantor": "110300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3107858C4E05490E2BAE58F9D",
      "kodeGudang": "T001",
      "namaGudang": "GUDANG & LAPANGAN 001",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F3107E58C4E05490E2BAE58F9D",
      "kodeGudang": "001",
      "namaGudang": "KAWASAN PABEAN",
      "kodeKantor": "090800",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3108558C4E05490E2BAE58F9D",
      "kodeGudang": "005",
      "namaGudang": "GUDANG IMPORTIR PT. BANGKA PUTRA KARYA",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3109758C4E05490E2BAE58F9D",
      "kodeGudang": "GPB",
      "namaGudang": "Gunung Pantara Barisan",
      "kodeKantor": "011200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3109858C4E05490E2BAE58F9D",
      "kodeGudang": "INAL",
      "namaGudang": "Indonesia Asahan Aluminium",
      "kodeKantor": "011200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3109D58C4E05490E2BAE58F9D",
      "kodeGudang": "GCNM",
      "namaGudang": "GUDANG CAKRAWALA NUSA MANDIRI",
      "kodeKantor": "030600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310A058C4E05490E2BAE58F9D",
      "kodeGudang": "G007",
      "namaGudang": "TPP",
      "kodeKantor": "050500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310A458C4E05490E2BAE58F9D",
      "kodeGudang": "TR95",
      "namaGudang": "TANKI TIMBUN PERTAMAX PLUS",
      "kodeKantor": "050700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F310AA58C4E05490E2BAE58F9D",
      "kodeGudang": "AM1B",
      "namaGudang": "Amris Batam Semen 01 B",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F310B158C4E05490E2BAE58F9D",
      "kodeGudang": "DPAK",
      "namaGudang": "Depot AKR",
      "kodeKantor": "100200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F310B458C4E05490E2BAE58F9D",
      "kodeGudang": "WSTI",
      "namaGudang": "Satui",
      "kodeKantor": "100200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F310BB58C4E05490E2BAE58F9D",
      "kodeGudang": "GD01",
      "namaGudang": "Kompleks Pergudangan Lembar",
      "kodeKantor": "080300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F310C158C4E05490E2BAE58F9D",
      "kodeGudang": "218X",
      "namaGudang": "LAPANGAN PENIMBUNAN PETIKEMAS 218X",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F310C958C4E05490E2BAE58F9D",
      "kodeGudang": "G004",
      "namaGudang": "GD. PELABUHAN OPIN",
      "kodeKantor": "120100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310CC58C4E05490E2BAE58F9D",
      "kodeGudang": "GPMH",
      "namaGudang": "Gudang penimbunan PT. Pelindo Malahayati",
      "kodeKantor": "130100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GBNA"
    },
    {
      "idGudangTps": "93F6D5F310D158C4E05490E2BAE58F9D",
      "kodeGudang": "TSLM",
      "namaGudang": "TPS-TNS SKY LIGHT MULTITRADA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F310D258C4E05490E2BAE58F9D",
      "kodeGudang": "GPBU",
      "namaGudang": "Gudang Penimbunan Bina Usaha",
      "kodeKantor": "130100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GBNA"
    },
    {
      "idGudangTps": "93F6D5F310D558C4E05490E2BAE58F9D",
      "kodeGudang": "GACS",
      "namaGudang": "ACSA CFS",
      "kodeKantor": "070100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GTPS"
    },
    {
      "idGudangTps": "93F6D5F310D658C4E05490E2BAE58F9D",
      "kodeGudang": "KPLB",
      "namaGudang": "Kantor Pos Lalu Bea",
      "kodeKantor": "090100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310DE58C4E05490E2BAE58F9D",
      "kodeGudang": "PTJI",
      "namaGudang": "GD PT.JASMINE INDAH",
      "kodeKantor": "030600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310F058C4E05490E2BAE58F9D",
      "kodeGudang": "LKU1",
      "namaGudang": "Gudang KPU",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F310FC58C4E05490E2BAE58F9D",
      "kodeGudang": "LAIN",
      "namaGudang": "Gudang Luar Kawasan Pabean Lainnya",
      "kodeKantor": "020900",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F310FD58C4E05490E2BAE58F9D",
      "kodeGudang": "MNS",
      "namaGudang": "TANKI MULTI NABATI SULAWESI",
      "kodeKantor": "111100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3111658C4E05490E2BAE58F9D",
      "kodeGudang": "023",
      "namaGudang": "GUDANG IMPORTIR PT. TININDO INTERNUSA",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3112458C4E05490E2BAE58F9D",
      "kodeGudang": "GBGD",
      "namaGudang": "GUDANG BANTEN GLOBAL DEVELOPMENT",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G003"
    },
    {
      "idGudangTps": "93F6D5F3112558C4E05490E2BAE58F9D",
      "kodeGudang": "BMS",
      "namaGudang": "PT. BERLIAN MANYAR SEJAHTERA",
      "kodeKantor": "070300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3112658C4E05490E2BAE58F9D",
      "kodeGudang": "IDMG",
      "namaGudang": "TERMINAL BBM MANGGIS",
      "kodeKantor": "080200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "KR01"
    },
    {
      "idGudangTps": "93F6D5F3112758C4E05490E2BAE58F9D",
      "kodeGudang": "GCDP",
      "namaGudang": "Group Gudang CDP",
      "kodeKantor": "051000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3112F58C4E05490E2BAE58F9D",
      "kodeGudang": "GDWI",
      "namaGudang": "GUDANG WAHANA DIRGANTARA IMPOR",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G003"
    },
    {
      "idGudangTps": "93F6D5F3113258C4E05490E2BAE58F9D",
      "kodeGudang": "ARUN",
      "namaGudang": "GUDANG PELABUHAN ARUN",
      "kodeKantor": "130500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3113458C4E05490E2BAE58F9D",
      "kodeGudang": "DCLS",
      "namaGudang": "D`CLASSIC",
      "kodeKantor": "080200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3113658C4E05490E2BAE58F9D",
      "kodeGudang": "GMSI",
      "namaGudang": "GROUP GUDANG MARCAPADA SUKSES INDONESIA",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3114158C4E05490E2BAE58F9D",
      "kodeGudang": "DOCK",
      "namaGudang": "PT. DOCK BAHARI NUSANTARA CIREBON",
      "kodeKantor": "050700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3114E58C4E05490E2BAE58F9D",
      "kodeGudang": "GBUD",
      "namaGudang": "Gudang Budi Indah",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F3114F58C4E05490E2BAE58F9D",
      "kodeGudang": "GPOS",
      "namaGudang": "GUDANG KANTOR POS",
      "kodeKantor": "060100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G003"
    },
    {
      "idGudangTps": "93F6D5F3115458C4E05490E2BAE58F9D",
      "kodeGudang": "PLUM",
      "namaGudang": "PELABUHAN UMUM",
      "kodeKantor": "070200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3115658C4E05490E2BAE58F9D",
      "kodeGudang": "GDHL",
      "namaGudang": "GUDANG BIROTIKA SEMESTA",
      "kodeKantor": "060100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G005"
    },
    {
      "idGudangTps": "93F6D5F3118258C4E05490E2BAE58F9D",
      "kodeGudang": "WARU",
      "namaGudang": "TELUK WARU",
      "kodeKantor": "100300",
      "jenisGudang": "4",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3118558C4E05490E2BAE58F9D",
      "kodeGudang": "TTP1",
      "namaGudang": "TANGKI A DAN B MILIK PT. ASPAL MULTI SARANA",
      "kodeKantor": "070300",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3118F58C4E05490E2BAE58F9D",
      "kodeGudang": "LTBP",
      "namaGudang": "LAPANGAN TRIMEGAH BANGUN PERSADA",
      "kodeKantor": "120200",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GTTE"
    },
    {
      "idGudangTps": "93F6D5F3119058C4E05490E2BAE58F9D",
      "kodeGudang": "T2-3",
      "namaGudang": "TANKI 2 DAN 3 PT PAKARTI",
      "kodeKantor": "050700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3119258C4E05490E2BAE58F9D",
      "kodeGudang": "G6P2",
      "namaGudang": "PT. PETROKIMIA GRESIK (GUDANG 650 PABRIK II)",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3119958C4E05490E2BAE58F9D",
      "kodeGudang": "TRKI",
      "namaGudang": "PT. TRANS KARGO INTERNASIONAL",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3119E58C4E05490E2BAE58F9D",
      "kodeGudang": "GD2",
      "namaGudang": "PLBN MOTAAIN",
      "kodeKantor": "081400",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311AC58C4E05490E2BAE58F9D",
      "kodeGudang": "DMT7",
      "namaGudang": "PT DOVECHEM MASPION TERMINAL (TANGKI T-27&T-38)",
      "kodeKantor": "070300",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311AE58C4E05490E2BAE58F9D",
      "kodeGudang": "G003",
      "namaGudang": "GROUP BGD",
      "kodeKantor": "050100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311B058C4E05490E2BAE58F9D",
      "kodeGudang": "A030",
      "namaGudang": "PT. CEMINDO GEMILANG",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311B158C4E05490E2BAE58F9D",
      "kodeGudang": "M002",
      "namaGudang": "KELURAHAN WAILITI, RT/RW = 01/01,KEC. ALOK BARAT M",
      "kodeKantor": "080700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311B758C4E05490E2BAE58F9D",
      "kodeGudang": "0100",
      "namaGudang": "Pelabuhan Sampit",
      "kodeKantor": "090700",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311B858C4E05490E2BAE58F9D",
      "kodeGudang": "G006",
      "namaGudang": "GD. Bandara Pattimura ",
      "kodeKantor": "120100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311B958C4E05490E2BAE58F9D",
      "kodeGudang": "BPAJ",
      "namaGudang": "PELABUHAN APO JAYAPURA",
      "kodeKantor": "120600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311BD58C4E05490E2BAE58F9D",
      "kodeGudang": "TK01",
      "namaGudang": "Tangki Penimbunan Aspal Krueng Geukeuh",
      "kodeKantor": "130500",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311C158C4E05490E2BAE58F9D",
      "kodeGudang": "GPAN",
      "namaGudang": "GUDANG PANDAWA",
      "kodeKantor": "080100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F311C858C4E05490E2BAE58F9D",
      "kodeGudang": "CLOG",
      "namaGudang": "CITRA DERMAGA PERKASA",
      "kodeKantor": "070100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GTPS"
    },
    {
      "idGudangTps": "93F6D5F311CB58C4E05490E2BAE58F9D",
      "kodeGudang": "WLT",
      "namaGudang": "WAILITI PLTD MAUMERE",
      "kodeKantor": "080700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311CF58C4E05490E2BAE58F9D",
      "kodeGudang": "SAS",
      "namaGudang": "GUDANG SEKARINDO ANEKA SARANA",
      "kodeKantor": "010100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F311DD58C4E05490E2BAE58F9D",
      "kodeGudang": "GHAS",
      "namaGudang": "PT. HARUM ALAM SEGAR",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G003"
    },
    {
      "idGudangTps": "93F6D5F311DE58C4E05490E2BAE58F9D",
      "kodeGudang": "GDWF",
      "namaGudang": "GUDANG WAHANA DIRGANTARA INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F311E458C4E05490E2BAE58F9D",
      "kodeGudang": "GOI2",
      "namaGudang": "PT. OMYA INDONESIA",
      "kodeKantor": "070300",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G005"
    },
    {
      "idGudangTps": "93F6D5F311E658C4E05490E2BAE58F9D",
      "kodeGudang": "GAPL",
      "namaGudang": "GUDANG ANGKASA PURA LOGISTICS",
      "kodeKantor": "080100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G006"
    },
    {
      "idGudangTps": "93F6D5F311EE58C4E05490E2BAE58F9D",
      "kodeGudang": "SBPU",
      "namaGudang": "GUDANG PT. SUNGAI BAHAR PASIFIK UTAMA",
      "kodeKantor": "030600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311EF58C4E05490E2BAE58F9D",
      "kodeGudang": "GTNT",
      "namaGudang": "GUDANG TNT SKYPAK INTERNATIONAL EXPRESS",
      "kodeKantor": "100300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311F658C4E05490E2BAE58F9D",
      "kodeGudang": "PLB1",
      "namaGudang": "Pos Lintas Batas Negara Jagoi Babang",
      "kodeKantor": "092000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311FF58C4E05490E2BAE58F9D",
      "kodeGudang": "WRT1",
      "namaGudang": "Dermaga I Wirata Daya BP, Sentimok",
      "kodeKantor": "092000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B5A58C4E05490E2BAE58F9D",
      "kodeGudang": "SGRO",
      "namaGudang": "SEGORO TERMINAL/214X",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B5C58C4E05490E2BAE58F9D",
      "kodeGudang": "SOSO",
      "namaGudang": "GUDANG PASOSO/CDC",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B7158C4E05490E2BAE58F9D",
      "kodeGudang": "GPUR",
      "namaGudang": "Gudang Gapura Angkasa",
      "kodeKantor": "070500",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30B7458C4E05490E2BAE58F9D",
      "kodeGudang": "GMPN",
      "namaGudang": "Gudang Maspion",
      "kodeKantor": "070500",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30B7758C4E05490E2BAE58F9D",
      "kodeGudang": "GMMF",
      "namaGudang": "Gudang Merpati Maintenance Facility",
      "kodeKantor": "070500",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B7A58C4E05490E2BAE58F9D",
      "kodeGudang": "GBBT",
      "namaGudang": "Gudang Benteng Tunggal",
      "kodeKantor": "070500",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B7C58C4E05490E2BAE58F9D",
      "kodeGudang": "GAPU",
      "namaGudang": "GAPURA ANGKASA SEPINGGAN",
      "kodeKantor": "100300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B7E58C4E05490E2BAE58F9D",
      "kodeGudang": "GROG",
      "namaGudang": "GROGOT",
      "kodeKantor": "100300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B8D58C4E05490E2BAE58F9D",
      "kodeGudang": "NATS",
      "namaGudang": "GUDANG NATS NUSANTARA",
      "kodeKantor": "010800",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30B8E58C4E05490E2BAE58F9D",
      "kodeGudang": "BUNA",
      "namaGudang": "GUDANG BUANA TRANS SEANTERO",
      "kodeKantor": "010800",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B9758C4E05490E2BAE58F9D",
      "kodeGudang": "LG14",
      "namaGudang": "LAPANGAN PENUMPUKAN GUDANG XIV",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B9958C4E05490E2BAE58F9D",
      "kodeGudang": "LG16",
      "namaGudang": "LAPANGAN PENUMPUKAN GUDANG XVI",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BB058C4E05490E2BAE58F9D",
      "kodeGudang": "0401",
      "namaGudang": "GUDANG KPU",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BB358C4E05490E2BAE58F9D",
      "kodeGudang": "0402",
      "namaGudang": "TPS/GD.KPBC TANJUNG PRIOK II",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BBB58C4E05490E2BAE58F9D",
      "kodeGudang": "202X",
      "namaGudang": "LAPANGAN 202X",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BBD58C4E05490E2BAE58F9D",
      "kodeGudang": "PGFA",
      "namaGudang": "PT. GELOMBANG FAJAR",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BBE58C4E05490E2BAE58F9D",
      "kodeGudang": "207X",
      "namaGudang": "GD/LAP.207X",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BBF58C4E05490E2BAE58F9D",
      "kodeGudang": "207X",
      "namaGudang": "GD/LAP.207X",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BC358C4E05490E2BAE58F9D",
      "kodeGudang": "209X",
      "namaGudang": "GD/LAP.209-210",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BCD58C4E05490E2BAE58F9D",
      "kodeGudang": "PSAP",
      "namaGudang": "PT. PUTRA SIGAOL ARGANTA PERKASA",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BCF58C4E05490E2BAE58F9D",
      "kodeGudang": "304X",
      "namaGudang": "GD/LAP.304-305",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BD458C4E05490E2BAE58F9D",
      "kodeGudang": "7KAB",
      "namaGudang": "KABER PT. BONECOM",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BD558C4E05490E2BAE58F9D",
      "kodeGudang": "TUNG",
      "namaGudang": "PT. TUNGYA COLLINS TERMINAL",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BDA58C4E05490E2BAE58F9D",
      "kodeGudang": "AIRN",
      "namaGudang": "PT. AIRIN (DP3)",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BDE58C4E05490E2BAE58F9D",
      "kodeGudang": "ASRI",
      "namaGudang": "KABER PT. BRENTANINDO ASRI",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BDF58C4E05490E2BAE58F9D",
      "kodeGudang": "SPMJ",
      "namaGudang": "PT.SEGARA PASIFIC MAJU",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BE658C4E05490E2BAE58F9D",
      "kodeGudang": "CVSU",
      "namaGudang": "CV. SETIAWAN UTAMA",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BE758C4E05490E2BAE58F9D",
      "kodeGudang": "CVSU",
      "namaGudang": "CV. SETIAWAN UTAMA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BEB58C4E05490E2BAE58F9D",
      "kodeGudang": "DHAR",
      "namaGudang": "KABER PT. DHARMA KARYA PERSADA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BF258C4E05490E2BAE58F9D",
      "kodeGudang": "EXPR",
      "namaGudang": "KABER PT. DUNIA EXPRES",
      "kodeKantor": "000000",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BFA58C4E05490E2BAE58F9D",
      "kodeGudang": "G004",
      "namaGudang": "GRUP 4",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BFB58C4E05490E2BAE58F9D",
      "kodeGudang": "G107",
      "namaGudang": "GUDANG 107",
      "kodeKantor": "000000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C1058C4E05490E2BAE58F9D",
      "kodeGudang": "GCFS",
      "namaGudang": "GUDANG CFS NUSANTARA/PERCA",
      "kodeKantor": "000000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C1758C4E05490E2BAE58F9D",
      "kodeGudang": "GDMK",
      "namaGudang": "GUDANG MAKANAN DUMMY",
      "kodeKantor": "040100",
      "jenisGudang": "8",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C1B58C4E05490E2BAE58F9D",
      "kodeGudang": "GSAL",
      "namaGudang": "GLOBAL SARANA LOGISTIK",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C1D58C4E05490E2BAE58F9D",
      "kodeGudang": "MSAP",
      "namaGudang": "PT.MSA",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C2058C4E05490E2BAE58F9D",
      "kodeGudang": "GSRA",
      "namaGudang": "LAP.GRAHA SEGARA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C2358C4E05490E2BAE58F9D",
      "kodeGudang": "GTAM",
      "namaGudang": "GUDANG BERIKAT TOYOTA ASTRA MOTOR",
      "kodeKantor": "000000",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C2658C4E05490E2BAE58F9D",
      "kodeGudang": "HMLA",
      "namaGudang": "PT. HARJA MUKTI LANGGENG (DP3)",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C2858C4E05490E2BAE58F9D",
      "kodeGudang": "T303",
      "namaGudang": "LAP303,304,305-TANGGUH SJ,PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30C3358C4E05490E2BAE58F9D",
      "kodeGudang": "TNDO",
      "namaGudang": "GD & LAP -TRANSPORINDO LIMA PERKASA, PT",
      "kodeKantor": "040300",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30C3558C4E05490E2BAE58F9D",
      "kodeGudang": "KOJA",
      "namaGudang": "LAP KOJA - KSO TPK KOJA",
      "kodeKantor": "000000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C3658C4E05490E2BAE58F9D",
      "kodeGudang": "KOJA",
      "namaGudang": "LAP KOJA - KSO TERMINAL PETIKEMAS KOJA",
      "kodeKantor": "040200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C3958C4E05490E2BAE58F9D",
      "kodeGudang": "TRAN",
      "namaGudang": "GD JL RE MARTADINATA-TRANS SI, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30C3A58C4E05490E2BAE58F9D",
      "kodeGudang": "L006",
      "namaGudang": "TPS LAP 006-007 PT. PRIMA NP",
      "kodeKantor": "000000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C3C58C4E05490E2BAE58F9D",
      "kodeGudang": "LOKA",
      "namaGudang": "KABER.  PT. PESAKA LOKA KIRANA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C4058C4E05490E2BAE58F9D",
      "kodeGudang": "MAPR",
      "namaGudang": "PT.MITRA ABADI PRATAMA(UGD)",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C4458C4E05490E2BAE58F9D",
      "kodeGudang": "TIKA",
      "namaGudang": "GD & LAP-DHARMA KB, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30C4958C4E05490E2BAE58F9D",
      "kodeGudang": "MBPU",
      "namaGudang": "PT. MULTI BINA PURA (DP3)",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C4C58C4E05490E2BAE58F9D",
      "kodeGudang": "MORI",
      "namaGudang": "PT.MORIS (DP3)",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C4D58C4E05490E2BAE58F9D",
      "kodeGudang": "MORI",
      "namaGudang": "PT.MORIS (DP3)",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C4E58C4E05490E2BAE58F9D",
      "kodeGudang": "MSAB",
      "namaGudang": "MULTI SEJAHTERA ABADI",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C5158C4E05490E2BAE58F9D",
      "kodeGudang": "TIKA",
      "namaGudang": "GD. DHARMA KARTIKA BAKTI",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C5758C4E05490E2BAE58F9D",
      "kodeGudang": "TMAR",
      "namaGudang": "PT. GLOBAL TERMINAL MARUNDA",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C5958C4E05490E2BAE58F9D",
      "kodeGudang": "TMAR",
      "namaGudang": "PT. GLOBAL TERMINAL MARUNDA",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C6058C4E05490E2BAE58F9D",
      "kodeGudang": "TMSA",
      "namaGudang": "TPP PT. MULTI SEJAHTERA ABADI  ( TP I )",
      "kodeKantor": "000000",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C6158C4E05490E2BAE58F9D",
      "kodeGudang": "TMSI",
      "namaGudang": "LAP. TIMBUN MSI (BANDA)",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C6458C4E05490E2BAE58F9D",
      "kodeGudang": "TNDO",
      "namaGudang": "PT. TRANSPORINDO LP",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C6E58C4E05490E2BAE58F9D",
      "kodeGudang": "TPK2",
      "namaGudang": "UTPK II",
      "kodeKantor": "040100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C7A58C4E05490E2BAE58F9D",
      "kodeGudang": "TRMA",
      "namaGudang": "PT. LAUTAN TIRTA TRANSPORTAMA",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C7B58C4E05490E2BAE58F9D",
      "kodeGudang": "ISM1",
      "namaGudang": "GD - INDOFOOD SM, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30C7C58C4E05490E2BAE58F9D",
      "kodeGudang": "TUNG",
      "namaGudang": "PT. TUNGYA COLLINS TERMINAL",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C8858C4E05490E2BAE58F9D",
      "kodeGudang": "27XS",
      "namaGudang": "LAP 207X SLTN-GEMAR LB, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C8B58C4E05490E2BAE58F9D",
      "kodeGudang": "TPPI",
      "namaGudang": "TPP. PT INDRA JAYA SWASTIKA",
      "kodeKantor": "070100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C9258C4E05490E2BAE58F9D",
      "kodeGudang": "T107",
      "namaGudang": "GD & LAP 107 - MTI, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C9358C4E05490E2BAE58F9D",
      "kodeGudang": "PJS",
      "namaGudang": "GUDANG PRIMANATA JASA SENTOSA",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C9658C4E05490E2BAE58F9D",
      "kodeGudang": "MKT",
      "namaGudang": "GUDANG MKT",
      "kodeKantor": "040200",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C9958C4E05490E2BAE58F9D",
      "kodeGudang": "L101",
      "namaGudang": "LAPANGAN 101",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CA058C4E05490E2BAE58F9D",
      "kodeGudang": "G500",
      "namaGudang": "GUDANG 500",
      "kodeKantor": "070100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CA458C4E05490E2BAE58F9D",
      "kodeGudang": "G401",
      "namaGudang": "GUDANG 401",
      "kodeKantor": "070100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CA558C4E05490E2BAE58F9D",
      "kodeGudang": "G303",
      "namaGudang": "GUDANG 303",
      "kodeKantor": "070100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CAB58C4E05490E2BAE58F9D",
      "kodeGudang": "G111",
      "namaGudang": "GUDANG   LAPANGAN 111",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CAC58C4E05490E2BAE58F9D",
      "kodeGudang": "G110",
      "namaGudang": "GUDANG   LAPANGAN 110",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CB058C4E05490E2BAE58F9D",
      "kodeGudang": "G104",
      "namaGudang": "GUDANG   LAPANGAN 104",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CB558C4E05490E2BAE58F9D",
      "kodeGudang": "G006",
      "namaGudang": "GUDANG   LAPANGAN 006",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CBD58C4E05490E2BAE58F9D",
      "kodeGudang": "APW",
      "namaGudang": "GUDANG APW",
      "kodeKantor": "040200",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CC058C4E05490E2BAE58F9D",
      "kodeGudang": "303",
      "namaGudang": "GUDANG/LAPANGAN 303",
      "kodeKantor": "040200",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CC258C4E05490E2BAE58F9D",
      "kodeGudang": "002",
      "namaGudang": "GUDANG 002",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CD558C4E05490E2BAE58F9D",
      "kodeGudang": "C008",
      "namaGudang": "PT. BMT",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CD958C4E05490E2BAE58F9D",
      "kodeGudang": "C001",
      "namaGudang": "PT. KRAKATAU STEEL",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CDE58C4E05490E2BAE58F9D",
      "kodeGudang": "C006",
      "namaGudang": "PT. DOW POLYMER IND",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CE258C4E05490E2BAE58F9D",
      "kodeGudang": "C011",
      "namaGudang": "PT. TRIDHARMA KENCANA",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CE658C4E05490E2BAE58F9D",
      "kodeGudang": "C015",
      "namaGudang": "PT. CAHAYA MUDA P.",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CED58C4E05490E2BAE58F9D",
      "kodeGudang": "A023",
      "namaGudang": "PT. BARIA BULK TERMINAL",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CF258C4E05490E2BAE58F9D",
      "kodeGudang": "A026",
      "namaGudang": "PT. ASPHALT BANGUN SARANA",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CF358C4E05490E2BAE58F9D",
      "kodeGudang": "A027",
      "namaGudang": "PT. GAJAH TUNGGAL",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CF558C4E05490E2BAE58F9D",
      "kodeGudang": "C021",
      "namaGudang": "PT. MULTI KARYA SUKSES",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CF958C4E05490E2BAE58F9D",
      "kodeGudang": "SE06",
      "namaGudang": "Gudang PFPB SE06",
      "kodeKantor": "050400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CFD58C4E05490E2BAE58F9D",
      "kodeGudang": "MSAP",
      "namaGudang": "PT.MSA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CFF58C4E05490E2BAE58F9D",
      "kodeGudang": "GAPI",
      "namaGudang": "GUDANG API / PRIMANATA",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D0858C4E05490E2BAE58F9D",
      "kodeGudang": "INTI",
      "namaGudang": "KABER.  PT.BENOLI INTI KARYA",
      "kodeKantor": "040300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D0958C4E05490E2BAE58F9D",
      "kodeGudang": "PESA",
      "namaGudang": "PT. PESAKA LOKA KIRANA (TPS)",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D0A58C4E05490E2BAE58F9D",
      "kodeGudang": "PESA",
      "namaGudang": "PT. PESAKA LOKA KIRANA (TPS)",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D0E58C4E05490E2BAE58F9D",
      "kodeGudang": "PIBT",
      "namaGudang": "GUDANG PIBT",
      "kodeKantor": "040200",
      "jenisGudang": "8",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D1658C4E05490E2BAE58F9D",
      "kodeGudang": "PPUN",
      "namaGudang": "PT. PUNINAR SARANA RAYA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D1758C4E05490E2BAE58F9D",
      "kodeGudang": "NUSA",
      "namaGudang": "KABER.  NUSANTARA TG. PRIOK",
      "kodeKantor": "040300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D1858C4E05490E2BAE58F9D",
      "kodeGudang": "PPUN",
      "namaGudang": "PT. PUNINAR SARANA RAYA",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D1B58C4E05490E2BAE58F9D",
      "kodeGudang": "PSAP",
      "namaGudang": "PT. PUTRA SIGAOL ARGANTA PERKASA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D2458C4E05490E2BAE58F9D",
      "kodeGudang": "RAYA",
      "namaGudang": "PT.AGUNG RAYA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D2958C4E05490E2BAE58F9D",
      "kodeGudang": "SDKP",
      "namaGudang": "TPS PT DHARMA KARYA PERDANA",
      "kodeKantor": "000000",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D3258C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP 001",
      "kodeKantor": "080400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D3758C4E05490E2BAE58F9D",
      "kodeGudang": "G002",
      "namaGudang": "Ekspor",
      "kodeKantor": "050500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D3D58C4E05490E2BAE58F9D",
      "kodeGudang": "AERO",
      "namaGudang": "PT. AEROWISATA CATERING SERVICE",
      "kodeKantor": "080100",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D4058C4E05490E2BAE58F9D",
      "kodeGudang": "BANG",
      "namaGudang": "GUDANG GERBANG ANGKASA",
      "kodeKantor": "080100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D4258C4E05490E2BAE58F9D",
      "kodeGudang": "FREE",
      "namaGudang": "PT. INTI DUFREE PROMOSINDO",
      "kodeKantor": "080100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D4758C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "TPKB",
      "kodeKantor": "050500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D5958C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP 001",
      "kodeKantor": "030700",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D5D58C4E05490E2BAE58F9D",
      "kodeGudang": "MTLL",
      "namaGudang": "Gudang PT. MTLL",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30D5E58C4E05490E2BAE58F9D",
      "kodeGudang": "PETR",
      "namaGudang": "Gudang Petrochina ex devon",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D6558C4E05490E2BAE58F9D",
      "kodeGudang": "PIJS",
      "namaGudang": "Gudang Petrochina Int Jabung",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D6A58C4E05490E2BAE58F9D",
      "kodeGudang": "PMTI",
      "namaGudang": "Gudang PT. MUGI TRIMAN Int.",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D6C58C4E05490E2BAE58F9D",
      "kodeGudang": "GSRI",
      "namaGudang": "Gudang PT. SRI",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D6D58C4E05490E2BAE58F9D",
      "kodeGudang": "ARPR",
      "namaGudang": "Gd. PT Arindo",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D7B58C4E05490E2BAE58F9D",
      "kodeGudang": "SMP",
      "namaGudang": "Gd.PT. Sumatra Mas Plywood",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D8458C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP JAS",
      "kodeKantor": "050100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D8A58C4E05490E2BAE58F9D",
      "kodeGudang": "DXKT",
      "namaGudang": "TPS-PT. DEXTER EUREKATAMA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30D9058C4E05490E2BAE58F9D",
      "kodeGudang": "013",
      "namaGudang": "GUDANG IMPORTIR PT. MITRA STANIA PRIMA",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D9558C4E05490E2BAE58F9D",
      "kodeGudang": "IDTJ",
      "namaGudang": "JAMBULA TERNATE",
      "kodeKantor": "120200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D9658C4E05490E2BAE58F9D",
      "kodeGudang": "GNGC",
      "namaGudang": "GUDANG PT. NIAGA GARAM CEMERLANG KANCI",
      "kodeKantor": "050700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30D9A58C4E05490E2BAE58F9D",
      "kodeGudang": "GPBK",
      "namaGudang": "GUDANG PELABUHAN KENDARI",
      "kodeKantor": "110600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DA258C4E05490E2BAE58F9D",
      "kodeGudang": "PMB1",
      "namaGudang": "PULAU MURAI BATU",
      "kodeKantor": "020400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DA458C4E05490E2BAE58F9D",
      "kodeGudang": "TJWG",
      "namaGudang": "Tanjung Wangi",
      "kodeKantor": "160700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "1"
    },
    {
      "idGudangTps": "93F6D5F30DA558C4E05490E2BAE58F9D",
      "kodeGudang": "B029",
      "namaGudang": "PT. GUNANUSA UTAMA FABRICATORS",
      "kodeKantor": "050400",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DA758C4E05490E2BAE58F9D",
      "kodeGudang": "GSFA",
      "namaGudang": "GUDANG SEWA FLAMBOYAN",
      "kodeKantor": "130400",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DA858C4E05490E2BAE58F9D",
      "kodeGudang": "GDHL",
      "namaGudang": "GUDANG DHL",
      "kodeKantor": "100300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DA958C4E05490E2BAE58F9D",
      "kodeGudang": "9008",
      "namaGudang": "TPS PT. BALETAMA JAYA MANDIRI",
      "kodeKantor": "040400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G003"
    },
    {
      "idGudangTps": "93F6D5F30DAC58C4E05490E2BAE58F9D",
      "kodeGudang": "MPMN",
      "namaGudang": "PT. PUTRA MAS NGGORANG, DESA NGGORANG, KEC. KOMODO",
      "kodeKantor": "080700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DAD58C4E05490E2BAE58F9D",
      "kodeGudang": "071",
      "namaGudang": "Perairan Belinyu",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DB058C4E05490E2BAE58F9D",
      "kodeGudang": "WLTI",
      "namaGudang": "KELURAHAN WAILITI,RT/RW01/01,KEC.KALOK BARAT",
      "kodeKantor": "080700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DB358C4E05490E2BAE58F9D",
      "kodeGudang": "073",
      "namaGudang": "PT. Bangka Tin Industry",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DB458C4E05490E2BAE58F9D",
      "kodeGudang": "TSMU",
      "namaGudang": "TANGKI SARANA MBAY UTAMA",
      "kodeKantor": "080700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DB558C4E05490E2BAE58F9D",
      "kodeGudang": "101U",
      "namaGudang": "LAP 101U-101, PT. PELINDO II",
      "kodeKantor": "040300",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30DB858C4E05490E2BAE58F9D",
      "kodeGudang": "KDR",
      "namaGudang": "TERMINAL PETI KEMAS KENDARI",
      "kodeKantor": "110600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DBC58C4E05490E2BAE58F9D",
      "kodeGudang": "GPS",
      "namaGudang": "Gudang Cilacap dan Gudang Persada",
      "kodeKantor": "011500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DBF58C4E05490E2BAE58F9D",
      "kodeGudang": "TJT",
      "namaGudang": "TANKI PT JAYA TRADE",
      "kodeKantor": "050700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DC058C4E05490E2BAE58F9D",
      "kodeGudang": "LKP",
      "namaGudang": "Luar Kawasan Pabean",
      "kodeKantor": "110300",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DC658C4E05490E2BAE58F9D",
      "kodeGudang": "PMKO",
      "namaGudang": "PELABUHAN POMAKO",
      "kodeKantor": "120800",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DCA58C4E05490E2BAE58F9D",
      "kodeGudang": "0029",
      "namaGudang": "PELABUHAN ALI SUNGAI GUNTUNG",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DCE58C4E05490E2BAE58F9D",
      "kodeGudang": "PS01",
      "namaGudang": "SAMBU BLP",
      "kodeKantor": "020400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DD058C4E05490E2BAE58F9D",
      "kodeGudang": "SNB1",
      "namaGudang": "Gudang Sinabang",
      "kodeKantor": "130400",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DD158C4E05490E2BAE58F9D",
      "kodeGudang": "LOGW",
      "namaGudang": "TPS-TNS GUDANG LOGWIN AIR & OCEAN INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30DE158C4E05490E2BAE58F9D",
      "kodeGudang": "MONA",
      "namaGudang": "GD JL RE MARTADINATA-MSA, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DE658C4E05490E2BAE58F9D",
      "kodeGudang": "UNCL",
      "namaGudang": "GD-UNITED CARGO L, PT",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DE758C4E05490E2BAE58F9D",
      "kodeGudang": "OLJA",
      "namaGudang": "GD - OLAH JASA A, PT",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DE958C4E05490E2BAE58F9D",
      "kodeGudang": "HAJS",
      "namaGudang": "Gd 002 - HAMPARAN JS, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DF558C4E05490E2BAE58F9D",
      "kodeGudang": "03XT",
      "namaGudang": "GD 207X SELATAN & LAP 207X TMR",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30DFA58C4E05490E2BAE58F9D",
      "kodeGudang": "WIRA",
      "namaGudang": "WIRA MITRA PRIMA, PT",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30DFB58C4E05490E2BAE58F9D",
      "kodeGudang": "KASA",
      "namaGudang": "GUDANG PT. ANGKASA PURA TABING",
      "kodeKantor": "011500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E0058C4E05490E2BAE58F9D",
      "kodeGudang": "CDAP",
      "namaGudang": "CARGO DOCK - AMAMAPARE",
      "kodeKantor": "120800",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E0458C4E05490E2BAE58F9D",
      "kodeGudang": "ptl",
      "namaGudang": "pantoloan",
      "kodeKantor": "110800",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E0558C4E05490E2BAE58F9D",
      "kodeGudang": "GDLR",
      "namaGudang": "GUDANG DESA LAMERUNU",
      "kodeKantor": "110600",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "TPBB"
    },
    {
      "idGudangTps": "93F6D5F30E0E58C4E05490E2BAE58F9D",
      "kodeGudang": "G003",
      "namaGudang": "Gudang Garam Beryodium",
      "kodeKantor": "070200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E1D58C4E05490E2BAE58F9D",
      "kodeGudang": "UNGA",
      "namaGudang": "KB. PT. UNGARAN INDAH BUSANA",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E2E58C4E05490E2BAE58F9D",
      "kodeGudang": "AS",
      "namaGudang": "PABRIK PT ATA SURYA, MANTUIL",
      "kodeKantor": "100100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E3058C4E05490E2BAE58F9D",
      "kodeGudang": "PTAS",
      "namaGudang": "PT ATA SURYA",
      "kodeKantor": "100100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E3558C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "Group Gudang 01",
      "kodeKantor": "090100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E3858C4E05490E2BAE58F9D",
      "kodeGudang": "PDML",
      "namaGudang": "gudang PD Mulia",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E3958C4E05490E2BAE58F9D",
      "kodeGudang": "PGSW",
      "namaGudang": "GD. PT. Gending Sriwijaya",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E3C58C4E05490E2BAE58F9D",
      "kodeGudang": "PDMJ",
      "namaGudang": "GD. PD Mulia Jambi",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E3E58C4E05490E2BAE58F9D",
      "kodeGudang": "ITRY",
      "namaGudang": "CV. Inti Timur Raya",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E4758C4E05490E2BAE58F9D",
      "kodeGudang": "GDPM",
      "namaGudang": "GUDANG PRIMA MAKMUR ABADI",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E5558C4E05490E2BAE58F9D",
      "kodeGudang": "PELM",
      "namaGudang": "Pelabuhan Muara Sabak",
      "kodeKantor": "030600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E5958C4E05490E2BAE58F9D",
      "kodeGudang": "BUT",
      "namaGudang": "GD. BUT Petrochina",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E6658C4E05490E2BAE58F9D",
      "kodeGudang": "0024",
      "namaGudang": "DERMAGA KAWASAN BERIKAT PT. PSG",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E6A58C4E05490E2BAE58F9D",
      "kodeGudang": "GAFR",
      "namaGudang": "Gudang Impor PT. AFR (Rumbai)",
      "kodeKantor": "021200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E7058C4E05490E2BAE58F9D",
      "kodeGudang": "MAU",
      "namaGudang": "Mitra Adira Utama",
      "kodeKantor": "050500",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G004"
    },
    {
      "idGudangTps": "93F6D5F30E7558C4E05490E2BAE58F9D",
      "kodeGudang": "LKP",
      "namaGudang": "LUAR KAWASAN PABEAN",
      "kodeKantor": "110100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GP1"
    },
    {
      "idGudangTps": "93F6D5F30E7E58C4E05490E2BAE58F9D",
      "kodeGudang": "0011",
      "namaGudang": "DERMAGA PELABUHAN SENDOLAS",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E7F58C4E05490E2BAE58F9D",
      "kodeGudang": "0012",
      "namaGudang": "PELABUHAN PELINDO KUALA CENAKU, RENGAT",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E8058C4E05490E2BAE58F9D",
      "kodeGudang": "0020",
      "namaGudang": "PELABUHAN HK SUNGAI GUNTUNG",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E8458C4E05490E2BAE58F9D",
      "kodeGudang": "GPLI",
      "namaGudang": "Gudang Impor PT. PLI (Perawang)",
      "kodeKantor": "021200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E8F58C4E05490E2BAE58F9D",
      "kodeGudang": "CIMP",
      "namaGudang": "GUDANG CARDIG IMPOR",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E9558C4E05490E2BAE58F9D",
      "kodeGudang": "TA01",
      "namaGudang": "TPS-TNS NIPPON EXPRESS INDONES",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EAA58C4E05490E2BAE58F9D",
      "kodeGudang": "CPSU",
      "namaGudang": "PSU CONTAINER",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GIJS"
    },
    {
      "idGudangTps": "93F6D5F30EAC58C4E05490E2BAE58F9D",
      "kodeGudang": "CTPS",
      "namaGudang": "TPS CONTAINER",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GTPS"
    },
    {
      "idGudangTps": "93F6D5F30EAD58C4E05490E2BAE58F9D",
      "kodeGudang": "GBJT",
      "namaGudang": "BJTI CFS",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GTPS"
    },
    {
      "idGudangTps": "93F6D5F30EAE58C4E05490E2BAE58F9D",
      "kodeGudang": "CBJT",
      "namaGudang": "BJTI CONTAINER",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "BJTI"
    },
    {
      "idGudangTps": "93F6D5F30EB858C4E05490E2BAE58F9D",
      "kodeGudang": "BT03",
      "namaGudang": "MACOBAR",
      "kodeKantor": "020400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EBF58C4E05490E2BAE58F9D",
      "kodeGudang": "BT15",
      "namaGudang": "BINTANG99 PERSADA",
      "kodeKantor": "020400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30EC258C4E05490E2BAE58F9D",
      "kodeGudang": "TB21",
      "namaGudang": "PT SKYPAK INTERNATIONAL",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EC458C4E05490E2BAE58F9D",
      "kodeGudang": "GEPS",
      "namaGudang": "GUDANG ENERGI PULAU SUJA",
      "kodeKantor": "130500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30ECC58C4E05490E2BAE58F9D",
      "kodeGudang": "GTPS",
      "namaGudang": "GROUP GUDANG TPS",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EDA58C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP 001",
      "kodeKantor": "130500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EE258C4E05490E2BAE58F9D",
      "kodeGudang": "UNEX",
      "namaGudang": "GUDANG UNEX INTI INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G003"
    },
    {
      "idGudangTps": "93F6D5F30EE558C4E05490E2BAE58F9D",
      "kodeGudang": "VALI",
      "namaGudang": "TPS-TNS  VINFLAIR LOGISTICS INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EE758C4E05490E2BAE58F9D",
      "kodeGudang": "GPRA",
      "namaGudang": "GAPURA ANGKASA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G003"
    },
    {
      "idGudangTps": "93F6D5F30EE958C4E05490E2BAE58F9D",
      "kodeGudang": "TJ10",
      "namaGudang": "TPS-TNS CERINDO TRANSPORT LOGISTIK",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EEA58C4E05490E2BAE58F9D",
      "kodeGudang": "TPEI",
      "namaGudang": "TAS PUNINAR EXPRESS INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EF358C4E05490E2BAE58F9D",
      "kodeGudang": "TMAL",
      "namaGudang": "PT. MUSTIKA ALAM LESTARI",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EF458C4E05490E2BAE58F9D",
      "kodeGudang": "GSAL",
      "namaGudang": "GLOBAL SARANA LOGISTIK",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F1058C4E05490E2BAE58F9D",
      "kodeGudang": "1011",
      "namaGudang": "ALAM ABADI LUHUR, PT",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F1358C4E05490E2BAE58F9D",
      "kodeGudang": "1014",
      "namaGudang": "WON WOO,PT",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F1A58C4E05490E2BAE58F9D",
      "kodeGudang": "1021",
      "namaGudang": "GUDANG BERIKAT II OTOMOTIF",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F1F58C4E05490E2BAE58F9D",
      "kodeGudang": "1031",
      "namaGudang": "GB PT BORNEO INTERNASIONAL",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F2058C4E05490E2BAE58F9D",
      "kodeGudang": "1032",
      "namaGudang": "DUTY FREE PT INTINUSA",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F2558C4E05490E2BAE58F9D",
      "kodeGudang": "1037",
      "namaGudang": "KOMIKO JAYA IMEXINDO",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F3358C4E05490E2BAE58F9D",
      "kodeGudang": "3400",
      "namaGudang": "Administrasi TPB III-04",
      "kodeKantor": "040400",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F3658C4E05490E2BAE58F9D",
      "kodeGudang": "3700",
      "namaGudang": "Administrasi TPB III-07",
      "kodeKantor": "040400",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F3958C4E05490E2BAE58F9D",
      "kodeGudang": "4200",
      "namaGudang": "Wilayah Kerja II",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F3C58C4E05490E2BAE58F9D",
      "kodeGudang": "MORI",
      "namaGudang": "PT.MORIS (DP3)",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F3E58C4E05490E2BAE58F9D",
      "kodeGudang": "PKGS",
      "namaGudang": "PT. PETROKIMIA GRESIK",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G004"
    },
    {
      "idGudangTps": "93F6D5F30F3F58C4E05490E2BAE58F9D",
      "kodeGudang": "PLUM",
      "namaGudang": "PELABUHAN UMUM GRESIK",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F4858C4E05490E2BAE58F9D",
      "kodeGudang": "KDGS",
      "namaGudang": "PT. KODECO ENERGY GRESIK",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F4B58C4E05490E2BAE58F9D",
      "kodeGudang": "FRKW",
      "namaGudang": "PT. FURUKAWA INDAL ALUMINUM",
      "kodeKantor": "070300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F5358C4E05490E2BAE58F9D",
      "kodeGudang": "GRE",
      "namaGudang": "PELABUHAN GRESIK",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F5458C4E05490E2BAE58F9D",
      "kodeGudang": "LAP",
      "namaGudang": "PPGB PT. DELTA FASHINDO",
      "kodeKantor": "070300",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F5858C4E05490E2BAE58F9D",
      "kodeGudang": "ELOG",
      "namaGudang": "PT. EASTERN LOGISTIC",
      "kodeKantor": "070300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F5D58C4E05490E2BAE58F9D",
      "kodeGudang": "G002",
      "namaGudang": "Kawasan Siam Maspion",
      "kodeKantor": "070300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F5E58C4E05490E2BAE58F9D",
      "kodeGudang": "A002",
      "namaGudang": "LUAR KAWASAN PABEAN",
      "kodeKantor": "100500",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F6458C4E05490E2BAE58F9D",
      "kodeGudang": "2030",
      "namaGudang": "GUDANG 201 - 203 & 301 - 303",
      "kodeKantor": "010700",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F7058C4E05490E2BAE58F9D",
      "kodeGudang": "8300",
      "namaGudang": "Wilayah Kerja I",
      "kodeKantor": "040400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F7358C4E05490E2BAE58F9D",
      "kodeGudang": "2600",
      "namaGudang": "Hanggar II-06",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F8158C4E05490E2BAE58F9D",
      "kodeGudang": "8600",
      "namaGudang": "Khusus TPS PT PSMA",
      "kodeKantor": "040400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F8D58C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP 1",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F8E58C4E05490E2BAE58F9D",
      "kodeGudang": "G002",
      "namaGudang": "GROUP2",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F8F58C4E05490E2BAE58F9D",
      "kodeGudang": "ACES",
      "namaGudang": "KB. PT. ACCESSORY HOUSE IND.",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F9458C4E05490E2BAE58F9D",
      "kodeGudang": "ASIA",
      "namaGudang": "KB. PT. SANDANG ASIA MAJU ABADI",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F9658C4E05490E2BAE58F9D",
      "kodeGudang": "BRAS",
      "namaGudang": "KB. PT. INTAC BRASS INDONESIA",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F9858C4E05490E2BAE58F9D",
      "kodeGudang": "CORP",
      "namaGudang": "KB. PT. APAC INTI CORPORA",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F9C58C4E05490E2BAE58F9D",
      "kodeGudang": "G12A",
      "namaGudang": "GUDANG XII",
      "kodeKantor": "060100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F9E58C4E05490E2BAE58F9D",
      "kodeGudang": "GARM",
      "namaGudang": "KB. PT. BETA PENATA GARMENT",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FA158C4E05490E2BAE58F9D",
      "kodeGudang": "GD16",
      "namaGudang": "GUDANG XVI",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FA258C4E05490E2BAE58F9D",
      "kodeGudang": "GD78",
      "namaGudang": "GUDANG VII/VIII",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FA358C4E05490E2BAE58F9D",
      "kodeGudang": "GDG1",
      "namaGudang": "GUDANG I",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FA758C4E05490E2BAE58F9D",
      "kodeGudang": "GEOI",
      "namaGudang": "KB. PT. GEOMED INDONESIA",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FAB58C4E05490E2BAE58F9D",
      "kodeGudang": "GSM1",
      "namaGudang": "GUDANG SAMUDERA 1",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": " "
    },
    {
      "idGudangTps": "93F6D5F30FAE58C4E05490E2BAE58F9D",
      "kodeGudang": "GTRI",
      "namaGudang": "GUDANG API",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FB258C4E05490E2BAE58F9D",
      "kodeGudang": "JOHN",
      "namaGudang": "KB. JOHNS GLOVE FACTORY",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FB758C4E05490E2BAE58F9D",
      "kodeGudang": "PUR1",
      "namaGudang": "TPS PT. ANGKASA PURA I",
      "kodeKantor": "060600",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30FBD58C4E05490E2BAE58F9D",
      "kodeGudang": "0018",
      "namaGudang": "GUDANG PARIT 7 TEMBILAHAN",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FC958C4E05490E2BAE58F9D",
      "kodeGudang": "TUC1",
      "namaGudang": "PT. UNICHEMCANDI INDONESIA",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G005"
    },
    {
      "idGudangTps": "93F6D5F30FCB58C4E05490E2BAE58F9D",
      "kodeGudang": "PDPS",
      "namaGudang": "Pos Denpasar",
      "kodeKantor": "080200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FCC58C4E05490E2BAE58F9D",
      "kodeGudang": "G006",
      "namaGudang": "GROUP 6",
      "kodeKantor": "060100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FD058C4E05490E2BAE58F9D",
      "kodeGudang": "0002",
      "namaGudang": "Gudang Tenau",
      "kodeKantor": "080500",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FD858C4E05490E2BAE58F9D",
      "kodeGudang": "001",
      "namaGudang": "KAWASAN PABEAN",
      "kodeKantor": "120700",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FD958C4E05490E2BAE58F9D",
      "kodeGudang": "GPA",
      "namaGudang": "GUDANG PENIMBUNAN ANGGAI",
      "kodeKantor": "120700",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "001"
    },
    {
      "idGudangTps": "93F6D5F30FDA58C4E05490E2BAE58F9D",
      "kodeGudang": "NPCT",
      "namaGudang": "NPCT1",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "NPCT"
    },
    {
      "idGudangTps": "93F6D5F30FDD58C4E05490E2BAE58F9D",
      "kodeGudang": "PAG1",
      "namaGudang": "BITUMEN PLANT GRESIK",
      "kodeKantor": "070300",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G005"
    },
    {
      "idGudangTps": "93F6D5F30FE558C4E05490E2BAE58F9D",
      "kodeGudang": "SMLX",
      "namaGudang": "SAUMLAKI",
      "kodeKantor": "121000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FE658C4E05490E2BAE58F9D",
      "kodeGudang": "DOBO",
      "namaGudang": "DOBO",
      "kodeKantor": "121000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FEB58C4E05490E2BAE58F9D",
      "kodeGudang": "GDLK",
      "namaGudang": "GUDANG DILUAR KAWASAN",
      "kodeKantor": "120200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FED58C4E05490E2BAE58F9D",
      "kodeGudang": "083",
      "namaGudang": "TEMPAT PENIMBUNAN IMPORTIR",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FF058C4E05490E2BAE58F9D",
      "kodeGudang": "GPB1",
      "namaGudang": "PT. PETROJAYA BORAL PLASTER BOARD (GUDANG/LAPANGN)",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FF158C4E05490E2BAE58F9D",
      "kodeGudang": "IDNB",
      "namaGudang": "IDNBF",
      "kodeKantor": "091000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FF258C4E05490E2BAE58F9D",
      "kodeGudang": "RMLJ",
      "namaGudang": "RIMBA MATOA LESTARI",
      "kodeKantor": "120600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FFB58C4E05490E2BAE58F9D",
      "kodeGudang": "PMTR",
      "namaGudang": "Kantor Pos Lalu Bea Mataram",
      "kodeKantor": "080300",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3100158C4E05490E2BAE58F9D",
      "kodeGudang": "BLG",
      "namaGudang": "TEMPAT PENIMBUNAN PT BIOTA LAUT GANGGANG",
      "kodeKantor": "110300",
      "jenisGudang": "7",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3100258C4E05490E2BAE58F9D",
      "kodeGudang": "PTMG",
      "namaGudang": "Area PLTMGU Lombok (Peaker)",
      "kodeKantor": "080300",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3100758C4E05490E2BAE58F9D",
      "kodeGudang": "002",
      "namaGudang": "LUAR KAWASAN PABEAN",
      "kodeKantor": "120700",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3100A58C4E05490E2BAE58F9D",
      "kodeGudang": "003",
      "namaGudang": "KRUENG GEUKUH",
      "kodeKantor": "130500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3101258C4E05490E2BAE58F9D",
      "kodeGudang": "BLTG",
      "namaGudang": "BALANTANG",
      "kodeKantor": "110400",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3101A58C4E05490E2BAE58F9D",
      "kodeGudang": "GPKI",
      "namaGudang": "PORT OF KENDARI INDONESIA",
      "kodeKantor": "110600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3101C58C4E05490E2BAE58F9D",
      "kodeGudang": "KEND",
      "namaGudang": "KENDARI",
      "kodeKantor": "110600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3101D58C4E05490E2BAE58F9D",
      "kodeGudang": "CTTL",
      "namaGudang": "CONTAINER TELUK LAMONG",
      "kodeKantor": "070100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GDTL"
    },
    {
      "idGudangTps": "93F6D5F3102058C4E05490E2BAE58F9D",
      "kodeGudang": "C029",
      "namaGudang": "PT. DUTA SUGAR INTERNATIONAL",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3102558C4E05490E2BAE58F9D",
      "kodeGudang": "G002",
      "namaGudang": "TPFT GRAHA SEGARA",
      "kodeKantor": "010700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3102658C4E05490E2BAE58F9D",
      "kodeGudang": "PLBR",
      "namaGudang": "PELABUHAN BRANTA PAMEKASAN",
      "kodeKantor": "070200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "PLUK"
    },
    {
      "idGudangTps": "93F6D5F3102A58C4E05490E2BAE58F9D",
      "kodeGudang": "GPLN",
      "namaGudang": "GUDANG PLN",
      "kodeKantor": "030600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3102D58C4E05490E2BAE58F9D",
      "kodeGudang": "DKP",
      "namaGudang": "DILUAR KAWASAN PABEAN PAREPARE",
      "kodeKantor": "110300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3102E58C4E05490E2BAE58F9D",
      "kodeGudang": "TLB4",
      "namaGudang": "DESA TEBAT PATAH TALANG DUKU",
      "kodeKantor": "030600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3103458C4E05490E2BAE58F9D",
      "kodeGudang": "MSPO",
      "namaGudang": "Lapangan MSP Pulau OBI",
      "kodeKantor": "120200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3103B58C4E05490E2BAE58F9D",
      "kodeGudang": "002",
      "namaGudang": "PELABUHAN KHUSUS PT. TIMAH MUNTOK",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3103D58C4E05490E2BAE58F9D",
      "kodeGudang": "GPSK",
      "namaGudang": "GUDANG PT SOSRO KEMENUH GIAMYAR",
      "kodeKantor": "081200",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GPSK"
    },
    {
      "idGudangTps": "93F6D5F3103F58C4E05490E2BAE58F9D",
      "kodeGudang": "GDUI",
      "namaGudang": "GUDANG PT. UNISERV INDONESIA - SUMBAWA BARAT NTB",
      "kodeKantor": "080400",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3104058C4E05490E2BAE58F9D",
      "kodeGudang": "NNK",
      "namaGudang": "NUNUKAN",
      "kodeKantor": "100900",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3104A58C4E05490E2BAE58F9D",
      "kodeGudang": "TPA",
      "namaGudang": "TANKI PAKARTI",
      "kodeKantor": "050700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3105258C4E05490E2BAE58F9D",
      "kodeGudang": "RJ",
      "namaGudang": "Gudang PT Rebinmas",
      "kodeKantor": "030500",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G.01"
    },
    {
      "idGudangTps": "93F6D5F3105558C4E05490E2BAE58F9D",
      "kodeGudang": "GDKA",
      "namaGudang": "GUDANG PENIMBUNAN PT. KANDE AGUNG",
      "kodeKantor": "130100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GBNA"
    },
    {
      "idGudangTps": "93F6D5F3105858C4E05490E2BAE58F9D",
      "kodeGudang": "069",
      "namaGudang": "Gudang Importir (PT. Cinta Timah Indonesia)",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3105B58C4E05490E2BAE58F9D",
      "kodeGudang": "0001",
      "namaGudang": "GUDANG KPPBC MALILI",
      "kodeKantor": "110400",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "BLTG"
    },
    {
      "idGudangTps": "93F6D5F3105E58C4E05490E2BAE58F9D",
      "kodeGudang": "DMAR",
      "namaGudang": "DOCKING MARINA",
      "kodeKantor": "070300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F3107258C4E05490E2BAE58F9D",
      "kodeGudang": "GDMP",
      "namaGudang": "GUDANG PT. MAPAN ASRI SEJAHTERA",
      "kodeKantor": "110600",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GDAT"
    },
    {
      "idGudangTps": "93F6D5F3107458C4E05490E2BAE58F9D",
      "kodeGudang": "G002",
      "namaGudang": "Gudang 2",
      "kodeKantor": "020900",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F3107758C4E05490E2BAE58F9D",
      "kodeGudang": "G002",
      "namaGudang": "GD.PELABUHAN YOS SUDARSO",
      "kodeKantor": "120100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GR01"
    },
    {
      "idGudangTps": "93F6D5F3107D58C4E05490E2BAE58F9D",
      "kodeGudang": "009",
      "namaGudang": "GUDANG IMPORTIR CV. PUTRA NUSA",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3107F58C4E05490E2BAE58F9D",
      "kodeGudang": "TI01",
      "namaGudang": "Tanjung Intan",
      "kodeKantor": "060400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3108358C4E05490E2BAE58F9D",
      "kodeGudang": "0002",
      "namaGudang": "GUDANG GAPURA",
      "kodeKantor": "111200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "001"
    },
    {
      "idGudangTps": "93F6D5F3108C58C4E05490E2BAE58F9D",
      "kodeGudang": "012",
      "namaGudang": "GUDANG IMPORTIR PT SARANA MANINDO",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3109358C4E05490E2BAE58F9D",
      "kodeGudang": "IDPB",
      "namaGudang": "PELINDO NUSANTARA",
      "kodeKantor": "030200",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "IPC"
    },
    {
      "idGudangTps": "93F6D5F3109658C4E05490E2BAE58F9D",
      "kodeGudang": "GSIM",
      "namaGudang": "gudang cargo bandara SIM",
      "kodeKantor": "130100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GBNA"
    },
    {
      "idGudangTps": "93F6D5F3109958C4E05490E2BAE58F9D",
      "kodeGudang": "PAN",
      "namaGudang": "Petro Andalan Nusantara",
      "kodeKantor": "011200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3109C58C4E05490E2BAE58F9D",
      "kodeGudang": "TBLA",
      "namaGudang": "JL. RAYA TRANS HALMAHERA, DESA WKO, KEC. TOBELO TE",
      "kodeKantor": "120200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GTTE"
    },
    {
      "idGudangTps": "93F6D5F3109F58C4E05490E2BAE58F9D",
      "kodeGudang": "fbln",
      "namaGudang": "PULAU GEBE",
      "kodeKantor": "120200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310A258C4E05490E2BAE58F9D",
      "kodeGudang": "TR92",
      "namaGudang": "TANKI TIMBUN PERTAMAX",
      "kodeKantor": "050700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F310B558C4E05490E2BAE58F9D",
      "kodeGudang": "WSBK",
      "namaGudang": "Sebuku",
      "kodeKantor": "100200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F310B758C4E05490E2BAE58F9D",
      "kodeGudang": "TB02",
      "namaGudang": "Lokasi Proyek PT. Karimun Granite",
      "kodeKantor": "020100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F310BD58C4E05490E2BAE58F9D",
      "kodeGudang": "KEPS",
      "namaGudang": "KEPULAUAN SERIBU",
      "kodeKantor": "160200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310C458C4E05490E2BAE58F9D",
      "kodeGudang": "LPI",
      "namaGudang": "Lapangan Penimbunan Importir",
      "kodeKantor": "060400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310C758C4E05490E2BAE58F9D",
      "kodeGudang": "C025",
      "namaGudang": "PT. OILTANKING MERAK",
      "kodeKantor": "050400",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310D858C4E05490E2BAE58F9D",
      "kodeGudang": "PDL",
      "namaGudang": "PABRIK PT. KURNIA ARTHA PRATIWI",
      "kodeKantor": "050700",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F310DC58C4E05490E2BAE58F9D",
      "kodeGudang": "GP2",
      "namaGudang": "GROUP BANDARA",
      "kodeKantor": "110100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310E758C4E05490E2BAE58F9D",
      "kodeGudang": "LRDA",
      "namaGudang": "Gudang Ring Road A",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F310E858C4E05490E2BAE58F9D",
      "kodeGudang": "KLS",
      "namaGudang": "TONGKANG PT KUDA LAUT SEJAHTERA",
      "kodeKantor": "030200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "IPC"
    },
    {
      "idGudangTps": "93F6D5F310EE58C4E05490E2BAE58F9D",
      "kodeGudang": "078",
      "namaGudang": "Gudang Importir ",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310F158C4E05490E2BAE58F9D",
      "kodeGudang": "0034",
      "namaGudang": "PKS-TJS RENGAT",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310F458C4E05490E2BAE58F9D",
      "kodeGudang": "G002",
      "namaGudang": "Gudang Luar Kawasan Pabean",
      "kodeKantor": "030500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310F658C4E05490E2BAE58F9D",
      "kodeGudang": "POSI",
      "namaGudang": "GUDANG TPS POS IMPOR",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G003"
    },
    {
      "idGudangTps": "93F6D5F310FB58C4E05490E2BAE58F9D",
      "kodeGudang": "POSE",
      "namaGudang": "GUDANG TPS POS EKSPOR",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G003"
    },
    {
      "idGudangTps": "93F6D5F3110F58C4E05490E2BAE58F9D",
      "kodeGudang": "DS04",
      "namaGudang": "PT DSV TRANSPORT INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3111058C4E05490E2BAE58F9D",
      "kodeGudang": "PLB1",
      "namaGudang": "PELABUHAN BENOA",
      "kodeKantor": "080200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "BOA"
    },
    {
      "idGudangTps": "93F6D5F3111258C4E05490E2BAE58F9D",
      "kodeGudang": "LBTM",
      "namaGudang": "Gudang Bukit Timah",
      "kodeKantor": "020900",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F3111558C4E05490E2BAE58F9D",
      "kodeGudang": "TU02",
      "namaGudang": "TANJUNG UBAN",
      "kodeKantor": "020500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3111758C4E05490E2BAE58F9D",
      "kodeGudang": "PLTU",
      "namaGudang": "Site Project PLTU, Jeranjang, Lobar",
      "kodeKantor": "080300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3111B58C4E05490E2BAE58F9D",
      "kodeGudang": "PA70",
      "namaGudang": "Pertamina Area 70",
      "kodeKantor": "060400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3111E58C4E05490E2BAE58F9D",
      "kodeGudang": "TTL",
      "namaGudang": "Terminal Transit Lomanis",
      "kodeKantor": "060400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3112158C4E05490E2BAE58F9D",
      "kodeGudang": "LUW1",
      "namaGudang": "Luwuk",
      "kodeKantor": "111000",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3112958C4E05490E2BAE58F9D",
      "kodeGudang": "GAP1",
      "namaGudang": "Gudang PT. Angkasa Pura I",
      "kodeKantor": "070500",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3112D58C4E05490E2BAE58F9D",
      "kodeGudang": "WNI1",
      "namaGudang": "PT. WILMAR NABATI INDONESIA (TANKI M001 DAN M005)",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3113A58C4E05490E2BAE58F9D",
      "kodeGudang": "BEN",
      "namaGudang": "BENJINA",
      "kodeKantor": "121000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3114458C4E05490E2BAE58F9D",
      "kodeGudang": "GPIS",
      "namaGudang": "PT POS INDONESIA (PERSERO) KANTOR POS SOLO",
      "kodeKantor": "060600",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3114958C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "Gudang 01",
      "kodeKantor": "010900",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3115158C4E05490E2BAE58F9D",
      "kodeGudang": "GKJ1",
      "namaGudang": "GUDANG G, H, I",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3115A58C4E05490E2BAE58F9D",
      "kodeGudang": "LKP",
      "namaGudang": "Luar Kawasan Pabean",
      "kodeKantor": "080300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3116158C4E05490E2BAE58F9D",
      "kodeGudang": "TPSL",
      "namaGudang": "TPS LAIN",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3116358C4E05490E2BAE58F9D",
      "kodeGudang": "CAR1",
      "namaGudang": "PT CARDIG INTERNASIONAL SUPPORT",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F3116558C4E05490E2BAE58F9D",
      "kodeGudang": "LKPN",
      "namaGudang": "LUAR KAWASAN PABEAN",
      "kodeKantor": "110400",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3116958C4E05490E2BAE58F9D",
      "kodeGudang": "LTC1",
      "namaGudang": "PT. CEMINDO GEMILANG (LAPANGAN PENIMBUNAN TERBUKA)",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3116C58C4E05490E2BAE58F9D",
      "kodeGudang": "GPEL",
      "namaGudang": "GUDANG LINI 2 PELINDO III",
      "kodeKantor": "060100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G006"
    },
    {
      "idGudangTps": "93F6D5F3117358C4E05490E2BAE58F9D",
      "kodeGudang": "MSS",
      "namaGudang": "Gudang PT Mutiara Sawit Semesta",
      "kodeKantor": "030600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3117558C4E05490E2BAE58F9D",
      "kodeGudang": "0038",
      "namaGudang": "GUDANG H. SAMAN PARIT 9 TEMBILAHAN",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3117658C4E05490E2BAE58F9D",
      "kodeGudang": "KPOS",
      "namaGudang": "Gudang Kantor Pos",
      "kodeKantor": "030100",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G004"
    },
    {
      "idGudangTps": "93F6D5F3117758C4E05490E2BAE58F9D",
      "kodeGudang": "LCL",
      "namaGudang": "LCL,NON CLUSTER",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3117858C4E05490E2BAE58F9D",
      "kodeGudang": "BT01",
      "namaGudang": "BATU AMPAR",
      "kodeKantor": "020400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3117A58C4E05490E2BAE58F9D",
      "kodeGudang": "BT07",
      "namaGudang": "KABIL PTK",
      "kodeKantor": "020400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3118A58C4E05490E2BAE58F9D",
      "kodeGudang": "A033",
      "namaGudang": "PT. CASTROL INDONESIA",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3119458C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "Gudang Kawasan Pabean",
      "kodeKantor": "090400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311A458C4E05490E2BAE58F9D",
      "kodeGudang": "MMKW",
      "namaGudang": "TEMPAT PENIMBUNAN MARUNI MANOKWARI",
      "kodeKantor": "120400",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311A658C4E05490E2BAE58F9D",
      "kodeGudang": "TBB",
      "namaGudang": "PT. Terminal Bumi Borneo",
      "kodeKantor": "030600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311A958C4E05490E2BAE58F9D",
      "kodeGudang": "PLND",
      "namaGudang": "PLN DULLAH UTARA KOTA TUAL",
      "kodeKantor": "121000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311AB58C4E05490E2BAE58F9D",
      "kodeGudang": "TA13",
      "namaGudang": "TPS-TNS TABHITA EXPRESS",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311AF58C4E05490E2BAE58F9D",
      "kodeGudang": "GD01",
      "namaGudang": "GUDANG LAINNYA",
      "kodeKantor": "011300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311B558C4E05490E2BAE58F9D",
      "kodeGudang": "SFGI",
      "namaGudang": "PT FFGI (SILO NO.102,103,104,108,110,111,115)",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311C358C4E05490E2BAE58F9D",
      "kodeGudang": "MR1",
      "namaGudang": "Depo Anggrek",
      "kodeKantor": "111300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311D058C4E05490E2BAE58F9D",
      "kodeGudang": "GNPO",
      "namaGudang": "JL. TAMAN SURYA KEL. DEMBE RAYA KOTA UTARA, GTO",
      "kodeKantor": "111300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G02"
    },
    {
      "idGudangTps": "93F6D5F311D758C4E05490E2BAE58F9D",
      "kodeGudang": "0001",
      "namaGudang": "PT. Angkasa Pura I",
      "kodeKantor": "060700",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GR1"
    },
    {
      "idGudangTps": "93F6D5F311DC58C4E05490E2BAE58F9D",
      "kodeGudang": "DKPS",
      "namaGudang": "DI LUAR KAWASAN PABEAN PAREPARE SUPPA",
      "kodeKantor": "110300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311DF58C4E05490E2BAE58F9D",
      "kodeGudang": "KBSQ",
      "namaGudang": "Kolam Bandar Sorong",
      "kodeKantor": "120300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "LINI"
    },
    {
      "idGudangTps": "93F6D5F311E158C4E05490E2BAE58F9D",
      "kodeGudang": "G004",
      "namaGudang": "Gudang PT Pos Indonesia",
      "kodeKantor": "080100",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311E758C4E05490E2BAE58F9D",
      "kodeGudang": "BLGN",
      "namaGudang": "BALONGAN",
      "kodeKantor": "050700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311FC58C4E05490E2BAE58F9D",
      "kodeGudang": "NGRY",
      "namaGudang": "NAGAN RAYA",
      "kodeKantor": "130400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3120058C4E05490E2BAE58F9D",
      "kodeGudang": "WRT2",
      "namaGudang": "Dermaga II Wirata Daya BP, Sentimok",
      "kodeKantor": "092000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3120658C4E05490E2BAE58F9D",
      "kodeGudang": "APKE",
      "namaGudang": "ANGKASA PURA KARGO",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B5F58C4E05490E2BAE58F9D",
      "kodeGudang": "SUPA",
      "namaGudang": "GUDANG SUNDA KELAPA",
      "kodeKantor": "000000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B6058C4E05490E2BAE58F9D",
      "kodeGudang": "SUPA",
      "namaGudang": "GUDANG SUNDA KELAPA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B6258C4E05490E2BAE58F9D",
      "kodeGudang": "T09X",
      "namaGudang": "GUDANG DAN LAP. TIMBUN 009X",
      "kodeKantor": "000000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B6358C4E05490E2BAE58F9D",
      "kodeGudang": "T09X",
      "namaGudang": "GUDANG DAN LAP. TIMBUN 009X",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B6558C4E05490E2BAE58F9D",
      "kodeGudang": "T106",
      "namaGudang": "GUDANG DAN LAP. TIMBUN 106",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B6758C4E05490E2BAE58F9D",
      "kodeGudang": "T208",
      "namaGudang": "GD/LAP.208",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B6A58C4E05490E2BAE58F9D",
      "kodeGudang": "202X",
      "namaGudang": "LAPANGAN 202X",
      "kodeKantor": "040300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30B6E58C4E05490E2BAE58F9D",
      "kodeGudang": "T303",
      "namaGudang": "GD/LAP303",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B7558C4E05490E2BAE58F9D",
      "kodeGudang": "GNAF",
      "namaGudang": "Gudang Nafiri",
      "kodeKantor": "070500",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B7D58C4E05490E2BAE58F9D",
      "kodeGudang": "SEMA",
      "namaGudang": "SEMAYANG",
      "kodeKantor": "100300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B7F58C4E05490E2BAE58F9D",
      "kodeGudang": "0013",
      "namaGudang": "LAPANGAN PENIMBUNAN PT. BANYU BENING UTAMA",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B8558C4E05490E2BAE58F9D",
      "kodeGudang": "0016",
      "namaGudang": "TPS PT. AGRO SARIMAS INDONESIA",
      "kodeKantor": "021500",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B8758C4E05490E2BAE58F9D",
      "kodeGudang": "DMP",
      "namaGudang": "DJAFA MANDIRI PERKASA",
      "kodeKantor": "010800",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B8858C4E05490E2BAE58F9D",
      "kodeGudang": "DJAF",
      "namaGudang": "GUDANG DJAFA MANDIRI PERKASA",
      "kodeKantor": "010800",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30B8B58C4E05490E2BAE58F9D",
      "kodeGudang": "ABDI",
      "namaGudang": "GUDANG WAHANA ABADI KENCANA",
      "kodeKantor": "010800",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B9258C4E05490E2BAE58F9D",
      "kodeGudang": "0000",
      "namaGudang": "GUDANG PERUSAHAAN GB",
      "kodeKantor": "050900",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30B9358C4E05490E2BAE58F9D",
      "kodeGudang": "TPBI",
      "namaGudang": "LG",
      "kodeKantor": "050900",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B9558C4E05490E2BAE58F9D",
      "kodeGudang": "LG02",
      "namaGudang": "LAPANGAN PENUMPUKAN GUDANG II",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B9658C4E05490E2BAE58F9D",
      "kodeGudang": "LG12",
      "namaGudang": "LAPANGAN PENUMPUKAN GUDANG XII",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B9D58C4E05490E2BAE58F9D",
      "kodeGudang": "NESS",
      "namaGudang": "KB. PT. TRUTHFULNESS & MODESTY IND.",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B9F58C4E05490E2BAE58F9D",
      "kodeGudang": "PORK",
      "namaGudang": "KB. PT. PORKKA INDONESIA",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BA358C4E05490E2BAE58F9D",
      "kodeGudang": "SMIT",
      "namaGudang": "KB. MAITLAND SMITH INDONESIA",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BA458C4E05490E2BAE58F9D",
      "kodeGudang": "STER",
      "namaGudang": "KB. PT. STERLINGWOOD PRIMA",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BA758C4E05490E2BAE58F9D",
      "kodeGudang": "TANJ",
      "namaGudang": "KB. PT TANJUNG PERMAI LESTARI",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BC258C4E05490E2BAE58F9D",
      "kodeGudang": "PJDC",
      "namaGudang": "PT. JAKARTA DISTRIBUTION CENTRE",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BC658C4E05490E2BAE58F9D",
      "kodeGudang": "213X",
      "namaGudang": "GUDANG 213X",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BCB58C4E05490E2BAE58F9D",
      "kodeGudang": "300X",
      "namaGudang": "GD/LAP.300-302",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BCC58C4E05490E2BAE58F9D",
      "kodeGudang": "304X",
      "namaGudang": "GD/LAP.304-305",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BD158C4E05490E2BAE58F9D",
      "kodeGudang": "4104",
      "namaGudang": "GUDANG 104",
      "kodeKantor": "000000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BD358C4E05490E2BAE58F9D",
      "kodeGudang": "4554",
      "namaGudang": "GT. PETROCHEN",
      "kodeKantor": "050400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BD658C4E05490E2BAE58F9D",
      "kodeGudang": "7KAB",
      "namaGudang": "KABER PT. BONECOM",
      "kodeKantor": "000000",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BD758C4E05490E2BAE58F9D",
      "kodeGudang": "8700",
      "namaGudang": "HALIMUN",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BDC58C4E05490E2BAE58F9D",
      "kodeGudang": "ASRI",
      "namaGudang": "KABER PT. BRENTANINDO ASRI",
      "kodeKantor": "000000",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BE558C4E05490E2BAE58F9D",
      "kodeGudang": "COBA",
      "namaGudang": "gudang percobaan",
      "kodeKantor": "040100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BEC58C4E05490E2BAE58F9D",
      "kodeGudang": "DWIP",
      "namaGudang": "PT.DWIPA",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BEE58C4E05490E2BAE58F9D",
      "kodeGudang": "DWIP",
      "namaGudang": "PT.DWIPA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BEF58C4E05490E2BAE58F9D",
      "kodeGudang": "200X",
      "namaGudang": "GUDANG 200X, POS E",
      "kodeKantor": "040300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BF358C4E05490E2BAE58F9D",
      "kodeGudang": "G114",
      "namaGudang": "GD 114 - M T I, PT",
      "kodeKantor": "040300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30BF858C4E05490E2BAE58F9D",
      "kodeGudang": "G002",
      "namaGudang": "GRUP 2",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BF958C4E05490E2BAE58F9D",
      "kodeGudang": "G003",
      "namaGudang": "GRUP 3",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BFC58C4E05490E2BAE58F9D",
      "kodeGudang": "G107",
      "namaGudang": "GUDANG 107",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BFE58C4E05490E2BAE58F9D",
      "kodeGudang": "G114",
      "namaGudang": "GUDANG 114",
      "kodeKantor": "000000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C0358C4E05490E2BAE58F9D",
      "kodeGudang": "G201",
      "namaGudang": "GUDANG 201",
      "kodeKantor": "000000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C0458C4E05490E2BAE58F9D",
      "kodeGudang": "GMS1",
      "namaGudang": "GUDANG MAS SATRIA",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GRHA"
    },
    {
      "idGudangTps": "93F6D5F30C0658C4E05490E2BAE58F9D",
      "kodeGudang": "G203",
      "namaGudang": "GUDANG 203",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C0858C4E05490E2BAE58F9D",
      "kodeGudang": "G813",
      "namaGudang": "GUDANG 108 -113",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C0B58C4E05490E2BAE58F9D",
      "kodeGudang": "209X",
      "namaGudang": "GD/LAP.209-210",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C1158C4E05490E2BAE58F9D",
      "kodeGudang": "GCTU",
      "namaGudang": "PT. GUNA CITRA TRANS UTAMA",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C1458C4E05490E2BAE58F9D",
      "kodeGudang": "304X",
      "namaGudang": "GD/LAP.304-305",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C1858C4E05490E2BAE58F9D",
      "kodeGudang": "GMS1",
      "namaGudang": "GUDANG MAS SATRIA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C1A58C4E05490E2BAE58F9D",
      "kodeGudang": "MAPR",
      "namaGudang": "PT.MITRA ABADI PRATAMA(UGD)",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C1C58C4E05490E2BAE58F9D",
      "kodeGudang": "GSAL",
      "namaGudang": "GLOBAL SARANA LOGISTIK",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C1F58C4E05490E2BAE58F9D",
      "kodeGudang": "RAYA",
      "namaGudang": "GD&LAP JL BANGKA - AR,PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30C2158C4E05490E2BAE58F9D",
      "kodeGudang": "SGRO",
      "namaGudang": "SEGORO TERMINAL/214X",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C2258C4E05490E2BAE58F9D",
      "kodeGudang": "GTAM",
      "namaGudang": "GUDANG BERIKAT TOYOTA ASTRA MOTOR",
      "kodeKantor": "040100",
      "jenisGudang": "8",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C2558C4E05490E2BAE58F9D",
      "kodeGudang": "HMLA",
      "namaGudang": "PT. MULTI SEJAHTERA ABADI (DP3)",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C2A58C4E05490E2BAE58F9D",
      "kodeGudang": "INFO",
      "namaGudang": "KABER.  PT. INFOPEN",
      "kodeKantor": "000000",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C3458C4E05490E2BAE58F9D",
      "kodeGudang": "KARA",
      "namaGudang": "PT. KARAVAN (TPS)",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C3E58C4E05490E2BAE58F9D",
      "kodeGudang": "MMLG",
      "namaGudang": "MM LOGISTIK",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C4258C4E05490E2BAE58F9D",
      "kodeGudang": "MAPR",
      "namaGudang": "PT.MITRA ABADI PRATAMA",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C4658C4E05490E2BAE58F9D",
      "kodeGudang": "MARU",
      "namaGudang": "KABER.  MARUNDA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C4F58C4E05490E2BAE58F9D",
      "kodeGudang": "MSAB",
      "namaGudang": "MULTI SEJAHTERA ABADI",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C5558C4E05490E2BAE58F9D",
      "kodeGudang": "TMAL",
      "namaGudang": "PT. MUSTIKA ALAM LESTARI",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C5658C4E05490E2BAE58F9D",
      "kodeGudang": "TMAL",
      "namaGudang": "PT. MUSTIKA ALAM LESTARI",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C5A58C4E05490E2BAE58F9D",
      "kodeGudang": "TMSA",
      "namaGudang": "TPP PT. MULTI SEJAHTERA ABADI  ( TP I )",
      "kodeKantor": "040300",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C5C58C4E05490E2BAE58F9D",
      "kodeGudang": "TRMA",
      "namaGudang": "GD&LAP-LAUTAN T. TRANS, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30C5D58C4E05490E2BAE58F9D",
      "kodeGudang": "TMKT",
      "namaGudang": "PT. MASAJI KARGOSENTRA TAMA",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C6358C4E05490E2BAE58F9D",
      "kodeGudang": "TMSI",
      "namaGudang": "LAP. TIMBUN MTI (BANDA) 215X",
      "kodeKantor": "000000",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C6558C4E05490E2BAE58F9D",
      "kodeGudang": "TNDO",
      "namaGudang": "PT. TRANSPORINDO LP",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C6B58C4E05490E2BAE58F9D",
      "kodeGudang": "GTOT",
      "namaGudang": "PT. TJETOT",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C7458C4E05490E2BAE58F9D",
      "kodeGudang": "TRAN",
      "namaGudang": "TRANSPORTAMA S",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C7558C4E05490E2BAE58F9D",
      "kodeGudang": "ARN2",
      "namaGudang": "LAP EX. GALANGAN III",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30C7D58C4E05490E2BAE58F9D",
      "kodeGudang": "TUNG",
      "namaGudang": "PT. TUNGYA COLLINS TERMINAL",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C7F58C4E05490E2BAE58F9D",
      "kodeGudang": "ULIM",
      "namaGudang": "PT. UJUNG LIMA (DP3)",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C8658C4E05490E2BAE58F9D",
      "kodeGudang": "DMK1",
      "namaGudang": "GD & LAP - DWIPA MK, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30C8F58C4E05490E2BAE58F9D",
      "kodeGudang": "BAND",
      "namaGudang": "GD & LAP CDC BANDA - MTI, PT",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30C9458C4E05490E2BAE58F9D",
      "kodeGudang": "NONO",
      "namaGudang": "GD LAP JL SINDANG LAUT - TRANSP, PT",
      "kodeKantor": "040000",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C9A58C4E05490E2BAE58F9D",
      "kodeGudang": "L009",
      "namaGudang": "LAPANGAN 009",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C9B58C4E05490E2BAE58F9D",
      "kodeGudang": "GCFS",
      "namaGudang": "GUDANG PENIMBUNAN CFS",
      "kodeKantor": "070100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C9C58C4E05490E2BAE58F9D",
      "kodeGudang": "G505",
      "namaGudang": "TANKI",
      "kodeKantor": "070100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C9D58C4E05490E2BAE58F9D",
      "kodeGudang": "G504",
      "namaGudang": "GUDANG BOGASARI",
      "kodeKantor": "070100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CA358C4E05490E2BAE58F9D",
      "kodeGudang": "G402",
      "namaGudang": "GUDANG 402",
      "kodeKantor": "070100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CA858C4E05490E2BAE58F9D",
      "kodeGudang": "G202",
      "namaGudang": "GUDANG   LAPANGAN 202",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CAE58C4E05490E2BAE58F9D",
      "kodeGudang": "G108",
      "namaGudang": "GUDANG   LAPANGAN 108",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CB158C4E05490E2BAE58F9D",
      "kodeGudang": "G102",
      "namaGudang": "GUDANG   LAPANGAN 102",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CB858C4E05490E2BAE58F9D",
      "kodeGudang": "G002",
      "namaGudang": "GUDANG   LAPANGAN 002",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CBA58C4E05490E2BAE58F9D",
      "kodeGudang": "DKP",
      "namaGudang": "LAPANGAN DHARMA KARYA PERDANA",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CBB58C4E05490E2BAE58F9D",
      "kodeGudang": "DKB",
      "namaGudang": "GUDANG DKB",
      "kodeKantor": "040200",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CBF58C4E05490E2BAE58F9D",
      "kodeGudang": "304",
      "namaGudang": "GUDANG/LAPANGAN 304",
      "kodeKantor": "040200",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CC158C4E05490E2BAE58F9D",
      "kodeGudang": "208x",
      "namaGudang": "208X",
      "kodeKantor": "040200",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CC658C4E05490E2BAE58F9D",
      "kodeGudang": "A004",
      "namaGudang": "PT. ARCO CHEMICAL INDONESIA",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CC858C4E05490E2BAE58F9D",
      "kodeGudang": "A006",
      "namaGudang": "PT. BUMI MERAK TERMINALINDO",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CCD58C4E05490E2BAE58F9D",
      "kodeGudang": "A012",
      "namaGudang": "PT. UNGGUL INDAH CO.",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CCE58C4E05490E2BAE58F9D",
      "kodeGudang": "A013",
      "namaGudang": "PT.  RODECO",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CD058C4E05490E2BAE58F9D",
      "kodeGudang": "A015",
      "namaGudang": "PT. GUNANUSA",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CD258C4E05490E2BAE58F9D",
      "kodeGudang": "A017",
      "namaGudang": "PT. RHONE POU LENG",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CD658C4E05490E2BAE58F9D",
      "kodeGudang": "GBS",
      "namaGudang": "GUDANG BULOG",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CDC58C4E05490E2BAE58F9D",
      "kodeGudang": "C004",
      "namaGudang": "PT. TAMURA ELECTRONICS",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CDD58C4E05490E2BAE58F9D",
      "kodeGudang": "C005",
      "namaGudang": "PT. SEAMLESS PIPE IND. JAYA",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CE058C4E05490E2BAE58F9D",
      "kodeGudang": "C009",
      "namaGudang": "PT. RODECO PETROLIN UTAMA",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CE158C4E05490E2BAE58F9D",
      "kodeGudang": "C010",
      "namaGudang": "PT. PACIFIK LUBRITAMA IND",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CE858C4E05490E2BAE58F9D",
      "kodeGudang": "PTMN",
      "namaGudang": "PERTAMINA GEREM",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CEE58C4E05490E2BAE58F9D",
      "kodeGudang": "C016",
      "namaGudang": "PT. TAWANG SWASTI MOTORINDO",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CF058C4E05490E2BAE58F9D",
      "kodeGudang": "A025",
      "namaGudang": "PT. ARBE SYTINDO",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CF858C4E05490E2BAE58F9D",
      "kodeGudang": "C023",
      "namaGudang": "PT. CITRA BARU STEEL",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D0258C4E05490E2BAE58F9D",
      "kodeGudang": "GCFS",
      "namaGudang": "GD CFS NUSANTARA -MTI, PT",
      "kodeKantor": "040300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30D0458C4E05490E2BAE58F9D",
      "kodeGudang": "NLIJ",
      "namaGudang": "PT. NITTSU LEMO INDONESIA LOGISTIK",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D0658C4E05490E2BAE58F9D",
      "kodeGudang": "NUSA",
      "namaGudang": "KABER.  NUSANTARA TANJUNG PRIOK",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D0D58C4E05490E2BAE58F9D",
      "kodeGudang": "PGFA",
      "namaGudang": "PT. GELOMBANG FAJAR",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D0F58C4E05490E2BAE58F9D",
      "kodeGudang": "PIBT",
      "namaGudang": "GUDANG PIBT",
      "kodeKantor": "040100",
      "jenisGudang": "8",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D1058C4E05490E2BAE58F9D",
      "kodeGudang": "LOKA",
      "namaGudang": "KABER.  PT. PESAKA LOKA KIRANA",
      "kodeKantor": "040300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D1558C4E05490E2BAE58F9D",
      "kodeGudang": "MARU",
      "namaGudang": "KABER.  MARUNDA",
      "kodeKantor": "040300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D1E58C4E05490E2BAE58F9D",
      "kodeGudang": "SENA",
      "namaGudang": "LAP. TIMBUN SENAWANGI",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D2058C4E05490E2BAE58F9D",
      "kodeGudang": "RA33",
      "namaGudang": "GUDANG RA 33-35",
      "kodeKantor": "000000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D2758C4E05490E2BAE58F9D",
      "kodeGudang": "RUNA",
      "namaGudang": "PT. BIMARUNA JAYA (DP3)",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D2E58C4E05490E2BAE58F9D",
      "kodeGudang": "SE06",
      "namaGudang": "Gudang PFPB SE06",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D3058C4E05490E2BAE58F9D",
      "kodeGudang": "4104",
      "namaGudang": "GUDANG 104",
      "kodeKantor": "040300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D3158C4E05490E2BAE58F9D",
      "kodeGudang": "0200",
      "namaGudang": "GUDANG LATIHAN",
      "kodeKantor": "080400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D3858C4E05490E2BAE58F9D",
      "kodeGudang": "G003",
      "namaGudang": "DTDD",
      "kodeKantor": "050500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D3E58C4E05490E2BAE58F9D",
      "kodeGudang": "GCAR",
      "namaGudang": "TPS. GUDANG CARDIG",
      "kodeKantor": "080100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D3F58C4E05490E2BAE58F9D",
      "kodeGudang": "CONV",
      "namaGudang": "BALI CONVENTION CENTER",
      "kodeKantor": "080100",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D4C58C4E05490E2BAE58F9D",
      "kodeGudang": "KBS1",
      "namaGudang": "KANTOR BANDARA SUPADIO",
      "kodeKantor": "090100",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D4F58C4E05490E2BAE58F9D",
      "kodeGudang": "BBPK",
      "namaGudang": "Gudang UTPK",
      "kodeKantor": "030100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30D5058C4E05490E2BAE58F9D",
      "kodeGudang": "BSMB",
      "namaGudang": "Gudang Bandara SMB",
      "kodeKantor": "030100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G003"
    },
    {
      "idGudangTps": "93F6D5F30D5258C4E05490E2BAE58F9D",
      "kodeGudang": "G002",
      "namaGudang": "Grup 2",
      "kodeKantor": "070200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D5658C4E05490E2BAE58F9D",
      "kodeGudang": "GD01",
      "namaGudang": "GUDANG 01",
      "kodeKantor": "030700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30D5758C4E05490E2BAE58F9D",
      "kodeGudang": "DIPA",
      "namaGudang": "DIPASENA",
      "kodeKantor": "030700",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30D5A58C4E05490E2BAE58F9D",
      "kodeGudang": "G002",
      "namaGudang": "GROUP 002",
      "kodeKantor": "030700",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D6758C4E05490E2BAE58F9D",
      "kodeGudang": "PBJS",
      "namaGudang": "PT. BJ Services Indonesia",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D7958C4E05490E2BAE58F9D",
      "kodeGudang": "PSAS",
      "namaGudang": "Gd. PT.SAS",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D7A58C4E05490E2BAE58F9D",
      "kodeGudang": "PSTD",
      "namaGudang": "Gd. PT CV.Putra Sentosa",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D7D58C4E05490E2BAE58F9D",
      "kodeGudang": "KTK",
      "namaGudang": "Kuala Tungkal",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D8058C4E05490E2BAE58F9D",
      "kodeGudang": "DAS",
      "namaGudang": "Gudang DAS Taman Raja",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D8158C4E05490E2BAE58F9D",
      "kodeGudang": "GBJ",
      "namaGudang": "Gudang CV. Bandar Jakarta",
      "kodeKantor": "030600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "002"
    },
    {
      "idGudangTps": "93F6D5F30D8858C4E05490E2BAE58F9D",
      "kodeGudang": "GGWI",
      "namaGudang": "GUDANG GEODIS WILSON INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30D8B58C4E05490E2BAE58F9D",
      "kodeGudang": "LPDA",
      "namaGudang": "Gudang Patra Dock (GD.A)",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30D8C58C4E05490E2BAE58F9D",
      "kodeGudang": "LPDB",
      "namaGudang": "Gudang Patra Dock (GD.B)",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30D9258C4E05490E2BAE58F9D",
      "kodeGudang": "PNJP",
      "namaGudang": "PT. Primanata Jasa Persada",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30D9858C4E05490E2BAE58F9D",
      "kodeGudang": "010",
      "namaGudang": "GUDANG IMPORTIR RITUS PUTRA MANDIRI",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D9B58C4E05490E2BAE58F9D",
      "kodeGudang": "GDIM",
      "namaGudang": "GUDANG IMPORTIR",
      "kodeKantor": "030200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "ALSN"
    },
    {
      "idGudangTps": "93F6D5F30D9C58C4E05490E2BAE58F9D",
      "kodeGudang": "MKAP",
      "namaGudang": "MOSES KILANGIN - AMAMAPARE",
      "kodeKantor": "120800",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D9D58C4E05490E2BAE58F9D",
      "kodeGudang": "ALSN",
      "namaGudang": "GUDANG PT ALISAN CATUR PAGAR DEWA",
      "kodeKantor": "030200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D9E58C4E05490E2BAE58F9D",
      "kodeGudang": "051",
      "namaGudang": "Gudang Importir, Kawasan Industri Jelitik S.Liat",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DA658C4E05490E2BAE58F9D",
      "kodeGudang": "T002",
      "namaGudang": "GUDANG & LAPANGAN 002",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DAA58C4E05490E2BAE58F9D",
      "kodeGudang": "032",
      "namaGudang": "PT. Intialam Buanaraya",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DAB58C4E05490E2BAE58F9D",
      "kodeGudang": "KLKA",
      "namaGudang": "KOLAKA",
      "kodeKantor": "110600",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GDAT"
    },
    {
      "idGudangTps": "93F6D5F30DB658C4E05490E2BAE58F9D",
      "kodeGudang": "TER3",
      "namaGudang": "EX.TBB, GUDANG 301-305",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30DC158C4E05490E2BAE58F9D",
      "kodeGudang": "BLG",
      "namaGudang": "BALONGAN",
      "kodeKantor": "050700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DCB58C4E05490E2BAE58F9D",
      "kodeGudang": "GD02",
      "namaGudang": "PT. KMSI Cab. Bandara Internasional Lombok",
      "kodeKantor": "080300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DD258C4E05490E2BAE58F9D",
      "kodeGudang": "WPLT",
      "namaGudang": "Pulau Laut",
      "kodeKantor": "100200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DD458C4E05490E2BAE58F9D",
      "kodeGudang": "TP01",
      "namaGudang": "PELABUHAN KIJANG",
      "kodeKantor": "020500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DD858C4E05490E2BAE58F9D",
      "kodeGudang": "27XT",
      "namaGudang": "LAP 207X TMR-106X",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30DDB58C4E05490E2BAE58F9D",
      "kodeGudang": "GPRI",
      "namaGudang": "GD JL PULOPAYUNG - PJP, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DEC58C4E05490E2BAE58F9D",
      "kodeGudang": "203X",
      "namaGudang": "LAP. 203X-204X",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DF058C4E05490E2BAE58F9D",
      "kodeGudang": "UCL1",
      "namaGudang": "GD-UNITED CARGO L, PT",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DF158C4E05490E2BAE58F9D",
      "kodeGudang": "LA20",
      "namaGudang": "LAP 203X, 204X",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30DF858C4E05490E2BAE58F9D",
      "kodeGudang": "L115",
      "namaGudang": "LAP 115, PT. MTI",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30DFF58C4E05490E2BAE58F9D",
      "kodeGudang": "GKPI",
      "namaGudang": " KAPUK NIAGA INDONESIA",
      "kodeKantor": "160200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "A001"
    },
    {
      "idGudangTps": "93F6D5F30E0358C4E05490E2BAE58F9D",
      "kodeGudang": "LUW",
      "namaGudang": "Luwuk",
      "kodeKantor": "111000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "LUW"
    },
    {
      "idGudangTps": "93F6D5F30E0B58C4E05490E2BAE58F9D",
      "kodeGudang": "GDWD",
      "namaGudang": "GUDANG WAHANA DIRGANTARA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G003"
    },
    {
      "idGudangTps": "93F6D5F30E0D58C4E05490E2BAE58F9D",
      "kodeGudang": "GTPP",
      "namaGudang": "Gudang Tempat Penimbunan Pabean KPPBC Ngurah Rai",
      "kodeKantor": "080100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E1058C4E05490E2BAE58F9D",
      "kodeGudang": "TPBB",
      "namaGudang": "TANGKI PERTAMINA BAU-BAU",
      "kodeKantor": "110600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E1258C4E05490E2BAE58F9D",
      "kodeGudang": "T2",
      "namaGudang": "groupgudang",
      "kodeKantor": "009000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E1358C4E05490E2BAE58F9D",
      "kodeGudang": "GMMM",
      "namaGudang": "GUDANG PT. MAITARA MINA MANDIRI",
      "kodeKantor": "120200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E1858C4E05490E2BAE58F9D",
      "kodeGudang": "PLWM",
      "namaGudang": "JL. POROS LAMBUYA MOTOHA WANUA MOROME",
      "kodeKantor": "110600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E1958C4E05490E2BAE58F9D",
      "kodeGudang": "PTLN",
      "namaGudang": "Pantoloan",
      "kodeKantor": "110800",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "ptLN"
    },
    {
      "idGudangTps": "93F6D5F30E2158C4E05490E2BAE58F9D",
      "kodeGudang": "JMI",
      "namaGudang": "GD JASA MARINA INDAH",
      "kodeKantor": "060100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": " "
    },
    {
      "idGudangTps": "93F6D5F30E2358C4E05490E2BAE58F9D",
      "kodeGudang": "PNJS",
      "namaGudang": "GD ETP SEMENTARA PERAGA NUSANTARA JS",
      "kodeKantor": "060100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E2558C4E05490E2BAE58F9D",
      "kodeGudang": "SE06",
      "namaGudang": "Gudang PFPB SE06",
      "kodeKantor": "060100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E2B58C4E05490E2BAE58F9D",
      "kodeGudang": "BDJ",
      "namaGudang": "SAMSUDIN NOOR",
      "kodeKantor": "100100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E2C58C4E05490E2BAE58F9D",
      "kodeGudang": "HEND",
      "namaGudang": "GUDANG PT.HENDRATNA",
      "kodeKantor": "100100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E2D58C4E05490E2BAE58F9D",
      "kodeGudang": "SNOR",
      "namaGudang": "BANDARA SAMSUDIN NOOR",
      "kodeKantor": "100100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E4B58C4E05490E2BAE58F9D",
      "kodeGudang": "DEMS",
      "namaGudang": "Dermaga Bongkar Muara Sabak",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E4E58C4E05490E2BAE58F9D",
      "kodeGudang": "SAMU",
      "namaGudang": "PELABUHAN SAMUDERA MUARA SABAK",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E4F58C4E05490E2BAE58F9D",
      "kodeGudang": "GDBS",
      "namaGudang": "GUDANG PT. BUDIMAN SUKSES",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E5058C4E05490E2BAE58F9D",
      "kodeGudang": "PPE",
      "namaGudang": "PT. PERMATA PRIMA ELEKTRINDO",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E5358C4E05490E2BAE58F9D",
      "kodeGudang": "TGDU",
      "namaGudang": "TALANG DUKU",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E5B58C4E05490E2BAE58F9D",
      "kodeGudang": "GBS",
      "namaGudang": "PT. Bintang Selamanya",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E5D58C4E05490E2BAE58F9D",
      "kodeGudang": "BNP",
      "namaGudang": "Gudang Budi Nabati Perkasa",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E5E58C4E05490E2BAE58F9D",
      "kodeGudang": "CVBU",
      "namaGudang": "GD CV.BERKAT USAHA",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E5F58C4E05490E2BAE58F9D",
      "kodeGudang": "GDPP",
      "namaGudang": "Gudang PT.PP Sei.Gelam",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E6858C4E05490E2BAE58F9D",
      "kodeGudang": "GRAK",
      "namaGudang": "Gudang Impor PT RAK (Kerinci Pos 2)",
      "kodeKantor": "021200",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E6958C4E05490E2BAE58F9D",
      "kodeGudang": "GPEL",
      "namaGudang": "Gudang Impor PT. Pelindo Perawang",
      "kodeKantor": "021200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E6C58C4E05490E2BAE58F9D",
      "kodeGudang": "B027",
      "namaGudang": "PT. SAMUDRA MARINE INDONESIA",
      "kodeKantor": "050400",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E6D58C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "Grup 1",
      "kodeKantor": "070500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E6F58C4E05490E2BAE58F9D",
      "kodeGudang": "TPKB",
      "namaGudang": "Terminal Peti Kemas Bandung",
      "kodeKantor": "050500",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E7758C4E05490E2BAE58F9D",
      "kodeGudang": "KBR",
      "namaGudang": "KAWASAN BERIKAT",
      "kodeKantor": "110100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GP1"
    },
    {
      "idGudangTps": "93F6D5F30E7858C4E05490E2BAE58F9D",
      "kodeGudang": "GBMT",
      "namaGudang": "GUDANG BERIKAT",
      "kodeKantor": "110100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GP1"
    },
    {
      "idGudangTps": "93F6D5F30E7D58C4E05490E2BAE58F9D",
      "kodeGudang": "GP1",
      "namaGudang": "GROUP 1",
      "kodeKantor": "110100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E8858C4E05490E2BAE58F9D",
      "kodeGudang": "LPEL",
      "namaGudang": "Lapangan Penimbunan Container PT. Pelindo",
      "kodeKantor": "021200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E8958C4E05490E2BAE58F9D",
      "kodeGudang": "LSHK",
      "namaGudang": "Lap. Penimbunan Container PT. SHK (Rumbai)",
      "kodeKantor": "021200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E8E58C4E05490E2BAE58F9D",
      "kodeGudang": "G002",
      "namaGudang": "Gudang Pelabuhan",
      "kodeKantor": "130500",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GBB1"
    },
    {
      "idGudangTps": "93F6D5F30E9358C4E05490E2BAE58F9D",
      "kodeGudang": "GIMP",
      "namaGudang": "GUDANG GARUDA IMPOR",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E9458C4E05490E2BAE58F9D",
      "kodeGudang": "LE01",
      "namaGudang": "TPS LINTAS EKSPRES N.C.",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E9D58C4E05490E2BAE58F9D",
      "kodeGudang": "TA15",
      "namaGudang": "TPS-TNS GREEN AIR PACIFIC",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30E9F58C4E05490E2BAE58F9D",
      "kodeGudang": "TB05",
      "namaGudang": "TPS-TNS DANZAS SARANA PERKASA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EA058C4E05490E2BAE58F9D",
      "kodeGudang": "TB06",
      "namaGudang": "TPS-TNS EXPEDITOR INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EA358C4E05490E2BAE58F9D",
      "kodeGudang": "TB10",
      "namaGudang": "TPS-TNS RITRA CARGO INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EA458C4E05490E2BAE58F9D",
      "kodeGudang": "TB11",
      "namaGudang": "TPS-TNS SKYPAK INT. (TNT)",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EAB58C4E05490E2BAE58F9D",
      "kodeGudang": "GICT",
      "namaGudang": "TPS CFS",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GTPS"
    },
    {
      "idGudangTps": "93F6D5F30EAF58C4E05490E2BAE58F9D",
      "kodeGudang": "GDIJ",
      "namaGudang": "IJS CFS",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GIJS"
    },
    {
      "idGudangTps": "93F6D5F30EBA58C4E05490E2BAE58F9D",
      "kodeGudang": "BT08",
      "namaGudang": "PUNGGUR",
      "kodeKantor": "020400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30EC158C4E05490E2BAE58F9D",
      "kodeGudang": "BT17",
      "namaGudang": "GLOBAL TRADE LOGISTICS NETWORK",
      "kodeKantor": "020400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EC558C4E05490E2BAE58F9D",
      "kodeGudang": "GPJ1",
      "namaGudang": "Gudang Milik PT Petro Jordan Abadi",
      "kodeKantor": "070300",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EC858C4E05490E2BAE58F9D",
      "kodeGudang": "GBIS",
      "namaGudang": "GB. PT IJS",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "GTPS"
    },
    {
      "idGudangTps": "93F6D5F30ECA58C4E05490E2BAE58F9D",
      "kodeGudang": "PSUS",
      "namaGudang": "PRIMAMAS SEGARA UNGGUL SURABAYA",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "GTPS"
    },
    {
      "idGudangTps": "93F6D5F30ECD58C4E05490E2BAE58F9D",
      "kodeGudang": "TPMB",
      "namaGudang": "TPP MULTI BINTANG ABADI",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30ECE58C4E05490E2BAE58F9D",
      "kodeGudang": "TPS2",
      "namaGudang": "GUDANG BERLIAN JAMRUD",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "BJTI"
    },
    {
      "idGudangTps": "93F6D5F30ED558C4E05490E2BAE58F9D",
      "kodeGudang": "0200",
      "namaGudang": "GUDANG LATIHAN",
      "kodeKantor": "101000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EDD58C4E05490E2BAE58F9D",
      "kodeGudang": "GCPL",
      "namaGudang": "GUDANG C & P LOGISTICS INDONES",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EDE58C4E05490E2BAE58F9D",
      "kodeGudang": "TB13",
      "namaGudang": "TPS-TNS KINTETSU WORLD EX. IND",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EDF58C4E05490E2BAE58F9D",
      "kodeGudang": "TB14",
      "namaGudang": "PT PELANGI SEMESTA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EE458C4E05490E2BAE58F9D",
      "kodeGudang": "GIBS",
      "namaGudang": "TPS-TNS INTI BANGUN SELARAS",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EEC58C4E05490E2BAE58F9D",
      "kodeGudang": "TA12",
      "namaGudang": "TPS-TNS TABITHA EXPRESS",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EF558C4E05490E2BAE58F9D",
      "kodeGudang": "MSAB",
      "namaGudang": "MULTI SEJAHTERA ABADI",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EFA58C4E05490E2BAE58F9D",
      "kodeGudang": "SDKP",
      "namaGudang": "TPS PT DHARMA KARYA PERDANA",
      "kodeKantor": "040100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F0358C4E05490E2BAE58F9D",
      "kodeGudang": "PUNI",
      "namaGudang": "PT. PUNINAR PACIFIC (DP3)",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F0A58C4E05490E2BAE58F9D",
      "kodeGudang": "1004",
      "namaGudang": "KBN CAKUNG IV",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F0E58C4E05490E2BAE58F9D",
      "kodeGudang": "1009",
      "namaGudang": "TUNGYA MITSUI SOKO",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F0F58C4E05490E2BAE58F9D",
      "kodeGudang": "1010",
      "namaGudang": "BUMI AYU DUTY FREE",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F1158C4E05490E2BAE58F9D",
      "kodeGudang": "1012",
      "namaGudang": "SHARP YASONTA INDONESIA",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F1258C4E05490E2BAE58F9D",
      "kodeGudang": "1013",
      "namaGudang": "GUNUNG AGUNG DUTY FREE",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F1658C4E05490E2BAE58F9D",
      "kodeGudang": "1017",
      "namaGudang": "KB DILUAR KBN II",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F2458C4E05490E2BAE58F9D",
      "kodeGudang": "1036",
      "namaGudang": "AKZO NOBEL CAR REFINESHES INDONESIA",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F2B58C4E05490E2BAE58F9D",
      "kodeGudang": "2100",
      "namaGudang": "Wilayah Kerja III",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F3A58C4E05490E2BAE58F9D",
      "kodeGudang": "4300",
      "namaGudang": "Wilayah Kerja III",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F4658C4E05490E2BAE58F9D",
      "kodeGudang": "PLTG",
      "namaGudang": "PT. PLTGU GRESIK",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F4958C4E05490E2BAE58F9D",
      "kodeGudang": "KDSM",
      "namaGudang": "KODECO ENERGY SEPULU MADURA",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F5058C4E05490E2BAE58F9D",
      "kodeGudang": "DMT",
      "namaGudang": "PT. DOVER MASPION TERMINAL",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F5158C4E05490E2BAE58F9D",
      "kodeGudang": "IDGR",
      "namaGudang": "GUDANG PELABUHAN GRESIK",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F5258C4E05490E2BAE58F9D",
      "kodeGudang": "COCO",
      "namaGudang": "PT. CONOCCO PHILIPS",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F5558C4E05490E2BAE58F9D",
      "kodeGudang": "PTAG",
      "namaGudang": "PT.  ANUGERAHINTI GEMANUSA",
      "kodeKantor": "070300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F5A58C4E05490E2BAE58F9D",
      "kodeGudang": "DABN",
      "namaGudang": "PT.DELTA ARTHA BAHARI NUSANTARA",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F5C58C4E05490E2BAE58F9D",
      "kodeGudang": "GBKR",
      "namaGudang": "LAP BONGKAR BKR",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G004"
    },
    {
      "idGudangTps": "93F6D5F30F6558C4E05490E2BAE58F9D",
      "kodeGudang": "GABI",
      "namaGudang": "LAP. PENUM. PETI KEMAS GABION",
      "kodeKantor": "010700",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F6A58C4E05490E2BAE58F9D",
      "kodeGudang": "5000",
      "namaGudang": "PT. Maju Terus Jaya",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F6B58C4E05490E2BAE58F9D",
      "kodeGudang": "6000",
      "namaGudang": "PT. MM Logistik",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F6C58C4E05490E2BAE58F9D",
      "kodeGudang": "7000",
      "namaGudang": "PT. Tungya Mitsui Soko L. I.",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F6F58C4E05490E2BAE58F9D",
      "kodeGudang": "8200",
      "namaGudang": "Adm. Impor-03 (TPS Santa Fe)",
      "kodeKantor": "040400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F8058C4E05490E2BAE58F9D",
      "kodeGudang": "8500",
      "namaGudang": "Wilayah Kerja II",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F8558C4E05490E2BAE58F9D",
      "kodeGudang": "9000",
      "namaGudang": "TPS PT. BINA SINAR AMINITY",
      "kodeKantor": "040400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F8658C4E05490E2BAE58F9D",
      "kodeGudang": "9001",
      "namaGudang": "TPS PT. MULTI BINA PURA INTERNATIONAL",
      "kodeKantor": "040400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F8858C4E05490E2BAE58F9D",
      "kodeGudang": "9003",
      "namaGudang": "TPS PT. NYK PUNINAR",
      "kodeKantor": "040400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F8B58C4E05490E2BAE58F9D",
      "kodeGudang": "9006",
      "namaGudang": "TPS PT. TRANSCON INDONESIA",
      "kodeKantor": "040400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F9258C4E05490E2BAE58F9D",
      "kodeGudang": "APAC",
      "namaGudang": "TPS. PT. APAC INTI CORPORA",
      "kodeKantor": "060100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F9358C4E05490E2BAE58F9D",
      "kodeGudang": "ARIS",
      "namaGudang": "KB. PT. ARISA MANDIRI PRATAMA",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F9758C4E05490E2BAE58F9D",
      "kodeGudang": "CEDR",
      "namaGudang": "KB. PT. CEDRATEKS INDAH BUSANA",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F9D58C4E05490E2BAE58F9D",
      "kodeGudang": "GANI",
      "namaGudang": "GUDANG A. YANI",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F9F58C4E05490E2BAE58F9D",
      "kodeGudang": "GD12",
      "namaGudang": "GUDANG XII A",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FA958C4E05490E2BAE58F9D",
      "kodeGudang": "GNU3",
      "namaGudang": "GUDANG NUSANTARA III",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": " "
    },
    {
      "idGudangTps": "93F6D5F30FB658C4E05490E2BAE58F9D",
      "kodeGudang": "LG01",
      "namaGudang": "LAPANGAN PENUMPUKAN GUDANG I",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FBB58C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP 001",
      "kodeKantor": "060600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FBF58C4E05490E2BAE58F9D",
      "kodeGudang": "0200",
      "namaGudang": "GUDANG ENTIKONG",
      "kodeKantor": "090200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "0200"
    },
    {
      "idGudangTps": "93F6D5F30FC258C4E05490E2BAE58F9D",
      "kodeGudang": "0200",
      "namaGudang": "GUDANG LATIHAN",
      "kodeKantor": "050700",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30FC558C4E05490E2BAE58F9D",
      "kodeGudang": "084",
      "namaGudang": "PERAIRAN MUNTOK",
      "kodeKantor": "030300",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FC858C4E05490E2BAE58F9D",
      "kodeGudang": "GDBS",
      "namaGudang": "Gudang Badas",
      "kodeKantor": "080400",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FCA58C4E05490E2BAE58F9D",
      "kodeGudang": "085",
      "namaGudang": "Buoy hijau air pelabuhan pangkalbalam",
      "kodeKantor": "030300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FCF58C4E05490E2BAE58F9D",
      "kodeGudang": "0001",
      "namaGudang": "Tenau",
      "kodeKantor": "080500",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FD158C4E05490E2BAE58F9D",
      "kodeGudang": "TSJJ",
      "namaGudang": "TEMPAT TIMBUN TANDAN SAWITA",
      "kodeKantor": "120600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FD458C4E05490E2BAE58F9D",
      "kodeGudang": "G008",
      "namaGudang": "PELABUHAN MASOHI",
      "kodeKantor": "120100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FDE58C4E05490E2BAE58F9D",
      "kodeGudang": "POS",
      "namaGudang": "PT POS INDONESIA (PERSERO) KANTOR POS MEDAN",
      "kodeKantor": "010800",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FDF58C4E05490E2BAE58F9D",
      "kodeGudang": "YIFI",
      "namaGudang": "PT. YAMATO INDONESIA FORWARDING",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FE158C4E05490E2BAE58F9D",
      "kodeGudang": "PCD",
      "namaGudang": "GUDANG PACEDA",
      "kodeKantor": "111100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FE258C4E05490E2BAE58F9D",
      "kodeGudang": "MGKS",
      "namaGudang": "MANGKASA POINT",
      "kodeKantor": "110400",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FEA58C4E05490E2BAE58F9D",
      "kodeGudang": "0030",
      "namaGudang": "GUDANG H.SUDIR",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3100658C4E05490E2BAE58F9D",
      "kodeGudang": "PLN",
      "namaGudang": "GUDANG PENIMBUNAN PLN",
      "kodeKantor": "120700",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "002"
    },
    {
      "idGudangTps": "93F6D5F3100958C4E05490E2BAE58F9D",
      "kodeGudang": "AKR",
      "namaGudang": "PT AKR CORPORINDO TBK",
      "kodeKantor": "111100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3100C58C4E05490E2BAE58F9D",
      "kodeGudang": "GCA1",
      "namaGudang": "Kawasan Industri Berlian Manyar Sejahtera Gresik",
      "kodeKantor": "070300",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3101158C4E05490E2BAE58F9D",
      "kodeGudang": "GDMT",
      "namaGudang": "GUDANG MITRA TIRTA",
      "kodeKantor": "030600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3101358C4E05490E2BAE58F9D",
      "kodeGudang": "SBT",
      "namaGudang": "SEBATIK",
      "kodeKantor": "100900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3101758C4E05490E2BAE58F9D",
      "kodeGudang": "103X",
      "namaGudang": "GUDANG DAN LAPANGAN 103X",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F3101F58C4E05490E2BAE58F9D",
      "kodeGudang": "MSA",
      "namaGudang": "MONANG SIANIPAR ABADI",
      "kodeKantor": "010800",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3102258C4E05490E2BAE58F9D",
      "kodeGudang": "LRDB",
      "namaGudang": "Gudang Ring Road B",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F3102358C4E05490E2BAE58F9D",
      "kodeGudang": "DIKC",
      "namaGudang": "DIKC",
      "kodeKantor": "009000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3102C58C4E05490E2BAE58F9D",
      "kodeGudang": "079",
      "namaGudang": "PERAIRAN BELINYU",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3102F58C4E05490E2BAE58F9D",
      "kodeGudang": "TLKP",
      "namaGudang": "TIMBUN LUAR KAWASAN PABEAN",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F3103358C4E05490E2BAE58F9D",
      "kodeGudang": "0200",
      "namaGudang": "PELABUHAN BAGENDANG",
      "kodeKantor": "090700",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3104C58C4E05490E2BAE58F9D",
      "kodeGudang": "C024",
      "namaGudang": "PT. PUNDI KENCANA",
      "kodeKantor": "050400",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3105158C4E05490E2BAE58F9D",
      "kodeGudang": "GDSI",
      "namaGudang": "Gd. Semen Indonesia",
      "kodeKantor": "070400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3105758C4E05490E2BAE58F9D",
      "kodeGudang": "PKK",
      "namaGudang": "Pos Kelapa Kampit",
      "kodeKantor": "030500",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "103"
    },
    {
      "idGudangTps": "93F6D5F3106358C4E05490E2BAE58F9D",
      "kodeGudang": "0002",
      "namaGudang": "LUAR KAWASAN PABEAN",
      "kodeKantor": "101000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3106558C4E05490E2BAE58F9D",
      "kodeGudang": "GBDL",
      "namaGudang": "PT. BANGUN DESA LOGISTINDO",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G003"
    },
    {
      "idGudangTps": "93F6D5F3106758C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "Gudang 1",
      "kodeKantor": "020900",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3106A58C4E05490E2BAE58F9D",
      "kodeGudang": "DHL",
      "namaGudang": "GUDANG BIROTIKA SEMESTA / DHL",
      "kodeKantor": "010100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3107558C4E05490E2BAE58F9D",
      "kodeGudang": "G003",
      "namaGudang": "GD.PELABUHAN TBBM WAYAME",
      "kodeKantor": "120100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GR01"
    },
    {
      "idGudangTps": "93F6D5F3107A58C4E05490E2BAE58F9D",
      "kodeGudang": "GDBD",
      "namaGudang": "Gudang Badas",
      "kodeKantor": "080400",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3107C58C4E05490E2BAE58F9D",
      "kodeGudang": "TANK",
      "namaGudang": "T.210, 211, 212, 213, 214, 215, 216 & 217",
      "kodeKantor": "050700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3108458C4E05490E2BAE58F9D",
      "kodeGudang": "048",
      "namaGudang": "GUDANG IMPORTIR PT.GEMILANG CAHAYA MENTARI",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3108658C4E05490E2BAE58F9D",
      "kodeGudang": "JYPR",
      "namaGudang": "GUDANG PELABUHAN JAYAPURA",
      "kodeKantor": "120600",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3108758C4E05490E2BAE58F9D",
      "kodeGudang": "LJYP",
      "namaGudang": "LAPANGAN PENIMBUNAN PELABUAHN JAYAPURA",
      "kodeKantor": "120600",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "STNI"
    },
    {
      "idGudangTps": "93F6D5F3108858C4E05490E2BAE58F9D",
      "kodeGudang": "GAJT",
      "namaGudang": "GARUDA INDONESIA PJT",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3108958C4E05490E2BAE58F9D",
      "kodeGudang": "G104",
      "namaGudang": "GUDANG 104",
      "kodeKantor": "011500",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3108A58C4E05490E2BAE58F9D",
      "kodeGudang": "TRKN",
      "namaGudang": "TARAKAN",
      "kodeKantor": "100800",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3108E58C4E05490E2BAE58F9D",
      "kodeGudang": "MRDT",
      "namaGudang": "LAP. MARTADINATA - MTI,PT",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F3109058C4E05490E2BAE58F9D",
      "kodeGudang": "G01",
      "namaGudang": "GUDANG IMPORTIR PT BSU PAREPARE",
      "kodeKantor": "110300",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3109E58C4E05490E2BAE58F9D",
      "kodeGudang": "9009",
      "namaGudang": "TPS PT. JASA UTAMA CARGO",
      "kodeKantor": "040400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G003"
    },
    {
      "idGudangTps": "93F6D5F310A758C4E05490E2BAE58F9D",
      "kodeGudang": "LPA2",
      "namaGudang": "Gudang Patra Dock GD A2",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F310AB58C4E05490E2BAE58F9D",
      "kodeGudang": "AM2A",
      "namaGudang": "Amris Batam Semen 02 A",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F310AD58C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP 001",
      "kodeKantor": "011500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310AE58C4E05490E2BAE58F9D",
      "kodeGudang": "YARD",
      "namaGudang": "lapangan penimbunan / container yard",
      "kodeKantor": "011500",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F310AF58C4E05490E2BAE58F9D",
      "kodeGudang": "WSNK",
      "namaGudang": "Senakin",
      "kodeKantor": "100200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F310BE58C4E05490E2BAE58F9D",
      "kodeGudang": "03",
      "namaGudang": "PELABUHAN MALOY",
      "kodeKantor": "101000",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F310C058C4E05490E2BAE58F9D",
      "kodeGudang": "BOA",
      "namaGudang": "BENOA",
      "kodeKantor": "081200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "BOA"
    },
    {
      "idGudangTps": "93F6D5F310CB58C4E05490E2BAE58F9D",
      "kodeGudang": "GLCI",
      "namaGudang": "Gudang penimbunan PT. Lafarge Cement Indonesia",
      "kodeKantor": "130100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GBNA"
    },
    {
      "idGudangTps": "93F6D5F310D058C4E05490E2BAE58F9D",
      "kodeGudang": "065",
      "namaGudang": "GUDANG IMPORTIR KAWASAN INDUSTRI SUNGAI LIAT",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310D958C4E05490E2BAE58F9D",
      "kodeGudang": "PLAT",
      "namaGudang": "PELABUHAN A. YANI TERNATE",
      "kodeKantor": "120200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310DB58C4E05490E2BAE58F9D",
      "kodeGudang": "0027",
      "namaGudang": "GUDANG PARIT 5 TEMBILAHAN",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310DF58C4E05490E2BAE58F9D",
      "kodeGudang": "076",
      "namaGudang": "Gudang Importir",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310E058C4E05490E2BAE58F9D",
      "kodeGudang": "GTTL",
      "namaGudang": "GUDANG CFS TELUK LAMONG",
      "kodeKantor": "070100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GDTL"
    },
    {
      "idGudangTps": "93F6D5F310E158C4E05490E2BAE58F9D",
      "kodeGudang": "GDTL",
      "namaGudang": "GROUP GUDANG TELUK LAMONG",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310EA58C4E05490E2BAE58F9D",
      "kodeGudang": "MMJU",
      "namaGudang": "MAMUJU",
      "kodeKantor": "110300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310EC58C4E05490E2BAE58F9D",
      "kodeGudang": "9010",
      "namaGudang": "CV. Mitra Al'Amin",
      "kodeKantor": "040400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G003"
    },
    {
      "idGudangTps": "93F6D5F310F358C4E05490E2BAE58F9D",
      "kodeGudang": "DMT1",
      "namaGudang": "PT. DOVECHEM MASPION TERMINAL (TANGKI NO 32)",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310FF58C4E05490E2BAE58F9D",
      "kodeGudang": "086",
      "namaGudang": "GUDANG IMPORTIR PT. PERTAMINA (PERSERO)",
      "kodeKantor": "030300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3110558C4E05490E2BAE58F9D",
      "kodeGudang": "GATE",
      "namaGudang": "GHITA AVIA TRANS",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3110658C4E05490E2BAE58F9D",
      "kodeGudang": "TMT1",
      "namaGudang": "PT. MULTI TRADING PRATAMA",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G005"
    },
    {
      "idGudangTps": "93F6D5F3110A58C4E05490E2BAE58F9D",
      "kodeGudang": "EPIA",
      "namaGudang": "PT. EKSPRES PARCEL INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3111358C4E05490E2BAE58F9D",
      "kodeGudang": "G101",
      "namaGudang": "GUDANG 101",
      "kodeKantor": "011500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3111458C4E05490E2BAE58F9D",
      "kodeGudang": "0300",
      "namaGudang": "GUDANG IMPORTIR",
      "kodeKantor": "090700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3111858C4E05490E2BAE58F9D",
      "kodeGudang": "KNDR",
      "namaGudang": "JL.SEROJA NO.99 KENDARI&PT SINAR JAYA SULTRA UTAMA",
      "kodeKantor": "110600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3111A58C4E05490E2BAE58F9D",
      "kodeGudang": "JWKO",
      "namaGudang": "JL. WKO,SAMPING SEKOLAH TINGGI ILMU KESEHATAN",
      "kodeKantor": "120200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3111C58C4E05490E2BAE58F9D",
      "kodeGudang": "PA60",
      "namaGudang": "Pertamina Area 60",
      "kodeKantor": "060400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3111D58C4E05490E2BAE58F9D",
      "kodeGudang": "TAC",
      "namaGudang": "TERMINAL ASPAL CURAH KENDARI",
      "kodeKantor": "110600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3112258C4E05490E2BAE58F9D",
      "kodeGudang": "CRB",
      "namaGudang": "CIREBON",
      "kodeKantor": "050700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3112358C4E05490E2BAE58F9D",
      "kodeGudang": "0028",
      "namaGudang": "TALANG JERINJING RENGAT",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3112858C4E05490E2BAE58F9D",
      "kodeGudang": "PCJL",
      "namaGudang": "PETROCHINA INT JABUNG LTD",
      "kodeKantor": "030600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3112B58C4E05490E2BAE58F9D",
      "kodeGudang": "AMNT",
      "namaGudang": "Gudang PT. Amman Mineral Nusa Tenggara",
      "kodeKantor": "080400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3112C58C4E05490E2BAE58F9D",
      "kodeGudang": "PEJA",
      "namaGudang": "PT. PETRO JORDAN ABADI",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3113C58C4E05490E2BAE58F9D",
      "kodeGudang": "TM1",
      "namaGudang": "PLTU TANJUNG KARANG",
      "kodeKantor": "111300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3114258C4E05490E2BAE58F9D",
      "kodeGudang": "PLNS",
      "namaGudang": "PLN Saumlaki",
      "kodeKantor": "121000",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3114A58C4E05490E2BAE58F9D",
      "kodeGudang": "GTPI",
      "namaGudang": "Tempat Penimbunan Importir",
      "kodeKantor": "110600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3114C58C4E05490E2BAE58F9D",
      "kodeGudang": "APRI",
      "namaGudang": "TPS-PT. ANGKASA PURA II - IMPOR",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3114D58C4E05490E2BAE58F9D",
      "kodeGudang": "BKS1",
      "namaGudang": "GUDANG IMPORTIR BENGKALIS",
      "kodeKantor": "021100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3115058C4E05490E2BAE58F9D",
      "kodeGudang": "SG1",
      "namaGudang": "TPS SARANA GEMILANG UJUNG BARU",
      "kodeKantor": "010700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3115358C4E05490E2BAE58F9D",
      "kodeGudang": "GD01",
      "namaGudang": "GUDANG PASAR BARU",
      "kodeKantor": "040600",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3115558C4E05490E2BAE58F9D",
      "kodeGudang": "GIJS",
      "namaGudang": "GUDANG INDRA JAYA SWASTIKA",
      "kodeKantor": "060100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G004"
    },
    {
      "idGudangTps": "93F6D5F3115758C4E05490E2BAE58F9D",
      "kodeGudang": "GOI1",
      "namaGudang": "PT. OMYA INDONESIA",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3115D58C4E05490E2BAE58F9D",
      "kodeGudang": "BT12",
      "namaGudang": "SAGULUNG / TANJUNG UNCANG",
      "kodeKantor": "020400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3116258C4E05490E2BAE58F9D",
      "kodeGudang": "MPCY",
      "namaGudang": "KANTOR POS LALU BEA YOGYAKARTA",
      "kodeKantor": "060700",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GR2"
    },
    {
      "idGudangTps": "93F6D5F3116D58C4E05490E2BAE58F9D",
      "kodeGudang": "KR01",
      "namaGudang": "KUTAI REFENERI NUSANTARA",
      "kodeKantor": "100300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3117058C4E05490E2BAE58F9D",
      "kodeGudang": "GPOS",
      "namaGudang": "Gudang PT POS Indonesia",
      "kodeKantor": "080100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G004"
    },
    {
      "idGudangTps": "93F6D5F3117958C4E05490E2BAE58F9D",
      "kodeGudang": "BT05",
      "namaGudang": "HANG NADIM",
      "kodeKantor": "020400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3118058C4E05490E2BAE58F9D",
      "kodeGudang": "EIME",
      "namaGudang": "GUDANG PT. EXPRO INDONESIA MANDALA ENERGY",
      "kodeKantor": "030600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3118158C4E05490E2BAE58F9D",
      "kodeGudang": "PS01",
      "namaGudang": "PETROSEA",
      "kodeKantor": "100300",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3118358C4E05490E2BAE58F9D",
      "kodeGudang": "GMBA",
      "namaGudang": "GUDANG MBA",
      "kodeKantor": "070100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GIJS"
    },
    {
      "idGudangTps": "93F6D5F3119758C4E05490E2BAE58F9D",
      "kodeGudang": "0035",
      "namaGudang": "PKS PT. GIN DESA TANJUNG SIMPANG, PELANGIRAN",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3119858C4E05490E2BAE58F9D",
      "kodeGudang": "GSG1",
      "namaGudang": "PT. SEMEN GRESIK",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3119B58C4E05490E2BAE58F9D",
      "kodeGudang": "SDOP",
      "namaGudang": "SIME DARBY OILS PULAU LAUT REFINERY",
      "kodeKantor": "100200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311A258C4E05490E2BAE58F9D",
      "kodeGudang": "XMOF",
      "namaGudang": "TEMPAT LAIN YANG DIPERSAMAKAN DENGAN TPS",
      "kodeKantor": "080700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311B258C4E05490E2BAE58F9D",
      "kodeGudang": "LSAY",
      "namaGudang": "PELABUHAN L SAY MAUMERE",
      "kodeKantor": "080700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311BB58C4E05490E2BAE58F9D",
      "kodeGudang": "0004",
      "namaGudang": "Waingapu",
      "kodeKantor": "080500",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311BC58C4E05490E2BAE58F9D",
      "kodeGudang": "KR01",
      "namaGudang": "PT KHRISNA",
      "kodeKantor": "080200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311BE58C4E05490E2BAE58F9D",
      "kodeGudang": "NRGL",
      "namaGudang": "PT NNR RPX GLOBAL LOGISTICS INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F311C258C4E05490E2BAE58F9D",
      "kodeGudang": "ASK1",
      "namaGudang": "TPS ARTHA SAMUDRA KONTINDO",
      "kodeKantor": "010700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F311C658C4E05490E2BAE58F9D",
      "kodeGudang": "LWP",
      "namaGudang": "LAPANGAN WANATIARA PERSADA",
      "kodeKantor": "120200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311CA58C4E05490E2BAE58F9D",
      "kodeGudang": "TR01",
      "namaGudang": "TAREMPA",
      "kodeKantor": "020500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "M01"
    },
    {
      "idGudangTps": "93F6D5F311D258C4E05490E2BAE58F9D",
      "kodeGudang": "123",
      "namaGudang": "Jalan Borobudur",
      "kodeKantor": "120400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311D358C4E05490E2BAE58F9D",
      "kodeGudang": "080",
      "namaGudang": "PERAIRAN BELINYU",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311D958C4E05490E2BAE58F9D",
      "kodeGudang": "TD9A",
      "namaGudang": "PT. KAWASAN INDUSTRI MASPION (TANKI D 9201-A)",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311DB58C4E05490E2BAE58F9D",
      "kodeGudang": "TIJ1",
      "namaGudang": "PT. DOVECHEM MASPION TERMINAL (TANKI 03 DAN 04)",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F311E258C4E05490E2BAE58F9D",
      "kodeGudang": "LNGC",
      "namaGudang": "LNG COMBO DOCK",
      "kodeKantor": "122300",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311EA58C4E05490E2BAE58F9D",
      "kodeGudang": "GSMS",
      "namaGudang": "Gudang PT. Sukses Mantap Sejahtera",
      "kodeKantor": "080400",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F311ED58C4E05490E2BAE58F9D",
      "kodeGudang": "LALR",
      "namaGudang": "LAPANGAN PENIMBUNAN ALOR",
      "kodeKantor": "081400",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311F358C4E05490E2BAE58F9D",
      "kodeGudang": "CBWI",
      "namaGudang": "CANDRIAN BANYUWANGI",
      "kodeKantor": "160700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311F758C4E05490E2BAE58F9D",
      "kodeGudang": "BIL1",
      "namaGudang": "TPS Libu Sigat",
      "kodeKantor": "092000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311F958C4E05490E2BAE58F9D",
      "kodeGudang": "SDAS",
      "namaGudang": "SANGGAR DIMONIM AIR SENTANI",
      "kodeKantor": "120600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311FA58C4E05490E2BAE58F9D",
      "kodeGudang": "PLTU",
      "namaGudang": "PLTU NAGAN RAYA",
      "kodeKantor": "130400",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "NGRY"
    },
    {
      "idGudangTps": "93F6D5F3120158C4E05490E2BAE58F9D",
      "kodeGudang": "TRIS",
      "namaGudang": "GUDANG A TRISAKTI",
      "kodeKantor": "100100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3120258C4E05490E2BAE58F9D",
      "kodeGudang": "1002",
      "namaGudang": "DERMAGA PELABUHAN SIBOLGA",
      "kodeKantor": "011300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GD01"
    },
    {
      "idGudangTps": "93F6D5F3120558C4E05490E2BAE58F9D",
      "kodeGudang": "APKI",
      "namaGudang": "ANGKASA PURA KARGO",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B5658C4E05490E2BAE58F9D",
      "kodeGudang": "SENA",
      "namaGudang": "LAP. TIMBUN SENAWANGI",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B5858C4E05490E2BAE58F9D",
      "kodeGudang": "7KAB",
      "namaGudang": "KABER PT. BONECOM",
      "kodeKantor": "040300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30B5958C4E05490E2BAE58F9D",
      "kodeGudang": "SGRO",
      "namaGudang": "SEGORO TERMINAL/214X",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B5B58C4E05490E2BAE58F9D",
      "kodeGudang": "ASRI",
      "namaGudang": "KABER PT. BRENTANINDO ASRI",
      "kodeKantor": "040300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30B5E58C4E05490E2BAE58F9D",
      "kodeGudang": "SPMJ",
      "namaGudang": "PT.SEGARA PASIFIC MAJU",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B6158C4E05490E2BAE58F9D",
      "kodeGudang": "DHAR",
      "namaGudang": "PT. DHARMA KARYA PERDANA",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30B6858C4E05490E2BAE58F9D",
      "kodeGudang": "T208",
      "namaGudang": "GD/LAP.208",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B6B58C4E05490E2BAE58F9D",
      "kodeGudang": "T303",
      "namaGudang": "GD/LAP303",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B6F58C4E05490E2BAE58F9D",
      "kodeGudang": "TEST",
      "namaGudang": "GUDANG TES WEB SERVICE",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B8158C4E05490E2BAE58F9D",
      "kodeGudang": "0014",
      "namaGudang": "PELABUHAN TELUK BAGUS",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B8258C4E05490E2BAE58F9D",
      "kodeGudang": "0015",
      "namaGudang": "GUDANG ARJUNA CORPORATION",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B9458C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP 001",
      "kodeKantor": "050900",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B9A58C4E05490E2BAE58F9D",
      "kodeGudang": "LNUS",
      "namaGudang": "LAPANGAN PENUMPUKAN NUSANTARA",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": " "
    },
    {
      "idGudangTps": "93F6D5F30B9C58C4E05490E2BAE58F9D",
      "kodeGudang": "METE",
      "namaGudang": "KB. PT. METEC SEMARANG",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BAD58C4E05490E2BAE58F9D",
      "kodeGudang": "007X",
      "namaGudang": "GUDANG 007",
      "kodeKantor": "000000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BB158C4E05490E2BAE58F9D",
      "kodeGudang": "0402",
      "namaGudang": "TPS/GD.KPBC TANJUNG PRIOK II",
      "kodeKantor": "000000",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BB258C4E05490E2BAE58F9D",
      "kodeGudang": "CVSU",
      "namaGudang": "CV. SETIAWAN UTAMA",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BB558C4E05490E2BAE58F9D",
      "kodeGudang": "GCTU",
      "namaGudang": "PT. GUNA CITRA TRANS UTAMA",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BB658C4E05490E2BAE58F9D",
      "kodeGudang": "NISE",
      "namaGudang": "PT. NIHON SEIKI INDONESIA",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BC158C4E05490E2BAE58F9D",
      "kodeGudang": "209X",
      "namaGudang": "GD/LAP.209-210",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BC458C4E05490E2BAE58F9D",
      "kodeGudang": "PLII",
      "namaGudang": "PT. PELABUHAN INDONESIA II",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BC758C4E05490E2BAE58F9D",
      "kodeGudang": "213X",
      "namaGudang": "GUDANG 213X",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BD258C4E05490E2BAE58F9D",
      "kodeGudang": "TRIS",
      "namaGudang": "PT. TRI SARI",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BD858C4E05490E2BAE58F9D",
      "kodeGudang": "WACM",
      "namaGudang": "PT. WAHANA CONTENA MAKMUR",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BD958C4E05490E2BAE58F9D",
      "kodeGudang": "AIRN",
      "namaGudang": "PT. AIRIN (DP3)",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BE058C4E05490E2BAE58F9D",
      "kodeGudang": "BINA",
      "namaGudang": "PT. BINA SARANA  AMITY (DP3)",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BE858C4E05490E2BAE58F9D",
      "kodeGudang": "SE06",
      "namaGudang": "Gudang PFPB SE06",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BE958C4E05490E2BAE58F9D",
      "kodeGudang": "DHAR",
      "namaGudang": "KABER PT. DHARMA KARYA PERDANA",
      "kodeKantor": "000000",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BFD58C4E05490E2BAE58F9D",
      "kodeGudang": "G114",
      "namaGudang": "GUDANG 114",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C0158C4E05490E2BAE58F9D",
      "kodeGudang": "G203",
      "namaGudang": "GUDANG 203",
      "kodeKantor": "040300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C0758C4E05490E2BAE58F9D",
      "kodeGudang": "G203",
      "namaGudang": "GUDANG 203",
      "kodeKantor": "000000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C0C58C4E05490E2BAE58F9D",
      "kodeGudang": "GAPI",
      "namaGudang": "GUDANG TRISARI API",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C0E58C4E05490E2BAE58F9D",
      "kodeGudang": "GCFS",
      "namaGudang": "GUDANG CFS NUSANTARA/PERCA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C0F58C4E05490E2BAE58F9D",
      "kodeGudang": "213X",
      "namaGudang": "LAP 213X - TRANS LP, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C1358C4E05490E2BAE58F9D",
      "kodeGudang": "300X",
      "namaGudang": "GD/LAP.300-302",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C2458C4E05490E2BAE58F9D",
      "kodeGudang": "T208",
      "namaGudang": "GD 208 & 209 - PRIMA N.P., PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C2C58C4E05490E2BAE58F9D",
      "kodeGudang": "INTI",
      "namaGudang": "KABER.  PT.BENOLI INTI KARYA",
      "kodeKantor": "000000",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C3058C4E05490E2BAE58F9D",
      "kodeGudang": "JAYA",
      "namaGudang": "KABER.  PT. LAUTAN JAYA KUMALA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C3B58C4E05490E2BAE58F9D",
      "kodeGudang": "LOKA",
      "namaGudang": "KABER.  PT. PESAKA LOKA KIRANA",
      "kodeKantor": "000000",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C4558C4E05490E2BAE58F9D",
      "kodeGudang": "MARU",
      "namaGudang": "KABER.  MARUNDA",
      "kodeKantor": "000000",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C4758C4E05490E2BAE58F9D",
      "kodeGudang": "MBPU",
      "namaGudang": "PT. MULTI BINA PURA (DP3)",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C4858C4E05490E2BAE58F9D",
      "kodeGudang": "TMAL",
      "namaGudang": "LAP 212&300-MAL, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30C5358C4E05490E2BAE58F9D",
      "kodeGudang": "GSAL",
      "namaGudang": "GLOBAL SARANA LOGISTIK",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C5458C4E05490E2BAE58F9D",
      "kodeGudang": "MSAB",
      "namaGudang": "MULTI SEJAHTERA ABADI",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C5858C4E05490E2BAE58F9D",
      "kodeGudang": "TMAR",
      "namaGudang": "PT. GLOBAL TERMINAL MARUNDA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C5F58C4E05490E2BAE58F9D",
      "kodeGudang": "L006",
      "namaGudang": "TPS LAP 006-007 PT. PRIMA NP",
      "kodeKantor": "040300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C6258C4E05490E2BAE58F9D",
      "kodeGudang": "SDKP",
      "namaGudang": "TPS PT DHARMA KARYA PERDANA",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30C6F58C4E05490E2BAE58F9D",
      "kodeGudang": "TPK3",
      "namaGudang": "UTPK III",
      "kodeKantor": "000000",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C7958C4E05490E2BAE58F9D",
      "kodeGudang": "TRMA",
      "namaGudang": "PT. LAUTAN TIRTA TRANSPORTAMA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C7E58C4E05490E2BAE58F9D",
      "kodeGudang": "ULIM",
      "namaGudang": "PT. UJUNG LIMA (DP3)",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C8158C4E05490E2BAE58F9D",
      "kodeGudang": "101X",
      "namaGudang": "LAP 101X - BUANA A.K., PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C8258C4E05490E2BAE58F9D",
      "kodeGudang": "UTPK",
      "namaGudang": "UTPK III",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C8358C4E05490E2BAE58F9D",
      "kodeGudang": "208X",
      "namaGudang": "LAP 208X - DBM, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C8758C4E05490E2BAE58F9D",
      "kodeGudang": "ZONA",
      "namaGudang": "PT ZONA TIGA LINTAS",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C8A58C4E05490E2BAE58F9D",
      "kodeGudang": "TPSI",
      "namaGudang": "TPS. PT INDRA JAYA SWASTIKA",
      "kodeKantor": "070100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GIJS"
    },
    {
      "idGudangTps": "93F6D5F30C8C58C4E05490E2BAE58F9D",
      "kodeGudang": "KOJA",
      "namaGudang": "LAP KOJA-KSO TPK KOJA",
      "kodeKantor": "040300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GRHA"
    },
    {
      "idGudangTps": "93F6D5F30C8D58C4E05490E2BAE58F9D",
      "kodeGudang": "MKT1",
      "namaGudang": "Gudang dan Lapangan 222x",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30C9058C4E05490E2BAE58F9D",
      "kodeGudang": "215X",
      "namaGudang": "LAP 215X - M T I, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30C9158C4E05490E2BAE58F9D",
      "kodeGudang": "T009",
      "namaGudang": "LAP 009 - M T I, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30C9558C4E05490E2BAE58F9D",
      "kodeGudang": "MSA",
      "namaGudang": "GUDANG MONANG SIANIPAR ABADI",
      "kodeKantor": "040200",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C9758C4E05490E2BAE58F9D",
      "kodeGudang": "LTT",
      "namaGudang": "GUDANG LTT",
      "kodeKantor": "040200",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CA158C4E05490E2BAE58F9D",
      "kodeGudang": "G406",
      "namaGudang": "GUDANG 406",
      "kodeKantor": "070100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CA758C4E05490E2BAE58F9D",
      "kodeGudang": "G300",
      "namaGudang": "GUDANG 300",
      "kodeKantor": "070100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CA958C4E05490E2BAE58F9D",
      "kodeGudang": "G113",
      "namaGudang": "GUDANG   LAPANGAN 113",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CAD58C4E05490E2BAE58F9D",
      "kodeGudang": "G109",
      "namaGudang": "GUDANG   LAPANGAN 109",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CAF58C4E05490E2BAE58F9D",
      "kodeGudang": "G105",
      "namaGudang": "GUDANG   LAPANGAN 105",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CB358C4E05490E2BAE58F9D",
      "kodeGudang": "G100",
      "namaGudang": "GUDANG   LAPANGAN 100",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CB758C4E05490E2BAE58F9D",
      "kodeGudang": "G004",
      "namaGudang": "GUDANG   LAPANGAN 004",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CB958C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GUDANG   LAPANGAN 001",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CBE58C4E05490E2BAE58F9D",
      "kodeGudang": "305",
      "namaGudang": "GUDANG/LAPANGAN 305",
      "kodeKantor": "040200",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CC358C4E05490E2BAE58F9D",
      "kodeGudang": "A003",
      "namaGudang": "PT. MERAK MAS",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CCA58C4E05490E2BAE58F9D",
      "kodeGudang": "A009",
      "namaGudang": "PT. POLIPRIMA KARYAREKSA",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CD358C4E05490E2BAE58F9D",
      "kodeGudang": "A018",
      "namaGudang": "PT. VOPAK TERMINAL MERAK",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CD458C4E05490E2BAE58F9D",
      "kodeGudang": "A008",
      "namaGudang": "PT. CONTINENTAL",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CE358C4E05490E2BAE58F9D",
      "kodeGudang": "C012",
      "namaGudang": "PT. SENTRA USAHATAMA JAYA",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CE458C4E05490E2BAE58F9D",
      "kodeGudang": "C013",
      "namaGudang": "PT. JAWAMANIS RAFINASI",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CEA58C4E05490E2BAE58F9D",
      "kodeGudang": "C017",
      "namaGudang": "PT. SEKAWAN MAKMUR BERSAMA",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CEB58C4E05490E2BAE58F9D",
      "kodeGudang": "C018",
      "namaGudang": "PT. PERMATA DUNIA SUKSES UTAMA",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CEC58C4E05490E2BAE58F9D",
      "kodeGudang": "C019",
      "namaGudang": "PT. GERBANG CAHAYA UTAMA",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CF458C4E05490E2BAE58F9D",
      "kodeGudang": "A028",
      "namaGudang": "PT. LOTTE CHEMICAL TITAN NUSANTARA",
      "kodeKantor": "050400",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CFA58C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP 001",
      "kodeKantor": "050400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CFB58C4E05490E2BAE58F9D",
      "kodeGudang": "G813",
      "namaGudang": "GUDANG 108 -113",
      "kodeKantor": "040300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CFE58C4E05490E2BAE58F9D",
      "kodeGudang": "NIAS",
      "namaGudang": "PT. NIASINDO DUTA CEMERLANG",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D0058C4E05490E2BAE58F9D",
      "kodeGudang": "NISE",
      "namaGudang": "PT. NIHON SEIKI INDONESIA",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D0358C4E05490E2BAE58F9D",
      "kodeGudang": "NLIJ",
      "namaGudang": "PT. NITTSU LEMO INDONESIA LOGISTIK",
      "kodeKantor": "000000",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D1158C4E05490E2BAE58F9D",
      "kodeGudang": "PJDC",
      "namaGudang": "PT. JAKARTA DISTRIBUTION CENTRE",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D1258C4E05490E2BAE58F9D",
      "kodeGudang": "PJDC",
      "namaGudang": "PT. JAKARTA DISTRIBUTION CENTRE",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D1D58C4E05490E2BAE58F9D",
      "kodeGudang": "PUNI",
      "namaGudang": "PT. PUNINAR PACIFIC (DP3)",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D2658C4E05490E2BAE58F9D",
      "kodeGudang": "T09X",
      "namaGudang": "GUDANG DAN LAP. TIMBUN 009X",
      "kodeKantor": "040300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D2B58C4E05490E2BAE58F9D",
      "kodeGudang": "SE06",
      "namaGudang": "Gudang PFPB SE06",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D2F58C4E05490E2BAE58F9D",
      "kodeGudang": "SENA",
      "namaGudang": "LAP. TIMBUN SENAWANGI",
      "kodeKantor": "000000",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D3658C4E05490E2BAE58F9D",
      "kodeGudang": "G005",
      "namaGudang": "Pos Lalu Bea Bandung",
      "kodeKantor": "050500",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D3A58C4E05490E2BAE58F9D",
      "kodeGudang": "LAP1",
      "namaGudang": "Lapangan Kontainer",
      "kodeKantor": "111100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D3B58C4E05490E2BAE58F9D",
      "kodeGudang": "TSBU",
      "namaGudang": "TANKI SARANA BITUNG UTAMA",
      "kodeKantor": "111100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D3C58C4E05490E2BAE58F9D",
      "kodeGudang": "IRP",
      "namaGudang": "PT. INDORAMA PETRO CHEMICAL",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D4358C4E05490E2BAE58F9D",
      "kodeGudang": "BNDR",
      "namaGudang": "BANDARA NGURAH RAI DENPASAR BALI (LINI1)",
      "kodeKantor": "080100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D4958C4E05490E2BAE58F9D",
      "kodeGudang": "G004",
      "namaGudang": "Grup Gudang MAU",
      "kodeKantor": "050500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D4A58C4E05490E2BAE58F9D",
      "kodeGudang": "G002",
      "namaGudang": "Group 2",
      "kodeKantor": "050700",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D5158C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP 001",
      "kodeKantor": "070200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D5358C4E05490E2BAE58F9D",
      "kodeGudang": "GD02",
      "namaGudang": "GUDANG 02/03",
      "kodeKantor": "030700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30D5B58C4E05490E2BAE58F9D",
      "kodeGudang": "STUD",
      "namaGudang": "Gudang Kawasan Berikat STUD",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D6258C4E05490E2BAE58F9D",
      "kodeGudang": "LPPI",
      "namaGudang": "Gudang PT. LPPI",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D7058C4E05490E2BAE58F9D",
      "kodeGudang": "PTRL",
      "namaGudang": "Gd Petro Lagan",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D7458C4E05490E2BAE58F9D",
      "kodeGudang": "NPPW",
      "namaGudang": "Gd.PT Nansari Prima",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D7C58C4E05490E2BAE58F9D",
      "kodeGudang": "PTBS",
      "namaGudang": "GD. PT. Budiman Sukses",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D7F58C4E05490E2BAE58F9D",
      "kodeGudang": "TJP",
      "namaGudang": "Gudang Tanjung Jabung Power",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D8258C4E05490E2BAE58F9D",
      "kodeGudang": "GDRB",
      "namaGudang": "Gudang PT. Rimba Berkah",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D8658C4E05490E2BAE58F9D",
      "kodeGudang": "SPLI",
      "namaGudang": "TPS-TNS SPEEDMARK LOGISTIK INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30D8F58C4E05490E2BAE58F9D",
      "kodeGudang": "LPDD",
      "namaGudang": "Gudang Patra Dock (GD.D)",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30D9358C4E05490E2BAE58F9D",
      "kodeGudang": "224X",
      "namaGudang": "GUDANG DAN LAPANGAN 224X",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30D9958C4E05490E2BAE58F9D",
      "kodeGudang": "GDNT",
      "namaGudang": "GUDANG CV. NIRTA JAMBI",
      "kodeKantor": "030600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DA058C4E05490E2BAE58F9D",
      "kodeGudang": "UTPK",
      "namaGudang": "Terminal Peti Kemas",
      "kodeKantor": "030500",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DB758C4E05490E2BAE58F9D",
      "kodeGudang": "PLTU",
      "namaGudang": "PLTU SOROPIA KENDARI",
      "kodeKantor": "110600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DBA58C4E05490E2BAE58F9D",
      "kodeGudang": "TABS",
      "namaGudang": "Tangki penimbunan PT. Asphalt Bangun Sarana",
      "kodeKantor": "130100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GBNA"
    },
    {
      "idGudangTps": "93F6D5F30DBD58C4E05490E2BAE58F9D",
      "kodeGudang": "020",
      "namaGudang": "GUDANG IMPORTIR PT. SURYANA",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DBE58C4E05490E2BAE58F9D",
      "kodeGudang": "055",
      "namaGudang": "GUDANG IMPORTIR BANGKA SERUMPUN",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DC258C4E05490E2BAE58F9D",
      "kodeGudang": "TNSM",
      "namaGudang": "TANKI 1 PT. NUSA SARANA MANDIRI",
      "kodeKantor": "050700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DC458C4E05490E2BAE58F9D",
      "kodeGudang": "SBS",
      "namaGudang": "SEBAKIS",
      "kodeKantor": "100900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "NNK"
    },
    {
      "idGudangTps": "93F6D5F30DCC58C4E05490E2BAE58F9D",
      "kodeGudang": "C027",
      "namaGudang": "Gudang PT. Berkah Manis Makmur",
      "kodeKantor": "050400",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DCD58C4E05490E2BAE58F9D",
      "kodeGudang": "JMAS",
      "namaGudang": "JETTY MASPION",
      "kodeKantor": "070300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30DD358C4E05490E2BAE58F9D",
      "kodeGudang": "WBTL",
      "namaGudang": "Batulicin",
      "kodeKantor": "100200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DD558C4E05490E2BAE58F9D",
      "kodeGudang": "TP02",
      "namaGudang": "PELABUHAN BATU VI",
      "kodeKantor": "020500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DD658C4E05490E2BAE58F9D",
      "kodeGudang": "GNNT",
      "namaGudang": "Gudang PT. Newmont Nusa Tenggara",
      "kodeKantor": "080400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DD958C4E05490E2BAE58F9D",
      "kodeGudang": "106X",
      "namaGudang": "LAP 106X-PELINDO PRIOK, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30DDC58C4E05490E2BAE58F9D",
      "kodeGudang": "RAMA",
      "namaGudang": "GD & LAP - RAMA AGUNG, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DDF58C4E05490E2BAE58F9D",
      "kodeGudang": "TJE2",
      "namaGudang": "GD & LAP JL P. PAYUNG-TJETOT, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DE258C4E05490E2BAE58F9D",
      "kodeGudang": "KAMU",
      "namaGudang": "GD & LAP - KALUKU MU, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DED58C4E05490E2BAE58F9D",
      "kodeGudang": "ARN3",
      "namaGudang": "EX. LAP BOLA (AIRIN,PT)",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30DEF58C4E05490E2BAE58F9D",
      "kodeGudang": "XTBB",
      "namaGudang": "LAP EX. TERMINAL BESI BEKAS",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30DF358C4E05490E2BAE58F9D",
      "kodeGudang": "G109",
      "namaGudang": "GD & LAP 109",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30DF458C4E05490E2BAE58F9D",
      "kodeGudang": "GL20",
      "namaGudang": "GD 202 & 203 LAP 201/202/203",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30DFC58C4E05490E2BAE58F9D",
      "kodeGudang": "LP01",
      "namaGudang": "Lapangan Penimbunan Lembar",
      "kodeKantor": "080300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E0C58C4E05490E2BAE58F9D",
      "kodeGudang": "G003",
      "namaGudang": "Gudang TPP Bea Cukai Ngurah Rai",
      "kodeKantor": "080100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E1158C4E05490E2BAE58F9D",
      "kodeGudang": "R3",
      "namaGudang": "test3",
      "kodeKantor": "009000",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E1458C4E05490E2BAE58F9D",
      "kodeGudang": "PNMI",
      "namaGudang": "TPS-TNS PUNINAR MSE INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30E1558C4E05490E2BAE58F9D",
      "kodeGudang": "0026",
      "namaGudang": "KAWASAN PELABUHAN SEI BAYAS",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E1C58C4E05490E2BAE58F9D",
      "kodeGudang": "SN",
      "namaGudang": "SUNGAI NYAMUK",
      "kodeKantor": "100900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "NNK"
    },
    {
      "idGudangTps": "93F6D5F30E1E58C4E05490E2BAE58F9D",
      "kodeGudang": "UTPK",
      "namaGudang": "UNIT TERMINAL PETI KEMAS",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E2658C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP 1",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E2A58C4E05490E2BAE58F9D",
      "kodeGudang": "IMPG",
      "namaGudang": "GUDANG IMPORTIR",
      "kodeKantor": "100100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E3158C4E05490E2BAE58F9D",
      "kodeGudang": "IDDS",
      "namaGudang": "GUDANG PT. DAYA SAKTI, JELAPAT DS. TAMBAN",
      "kodeKantor": "100100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E4158C4E05490E2BAE58F9D",
      "kodeGudang": "TIKT",
      "namaGudang": "TERANG 1 KUALA TUNGKAL",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E4258C4E05490E2BAE58F9D",
      "kodeGudang": "KSJ",
      "namaGudang": "GUDANG PT. KARYAINDO SEJATIMA",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E4958C4E05490E2BAE58F9D",
      "kodeGudang": "GDPS",
      "namaGudang": "GUDANG CV. PUTRA SEDERHANA",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E4C58C4E05490E2BAE58F9D",
      "kodeGudang": "TGI",
      "namaGudang": "PT.TGI",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E5158C4E05490E2BAE58F9D",
      "kodeGudang": "PTRA",
      "namaGudang": "Gudang PT RA",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E5458C4E05490E2BAE58F9D",
      "kodeGudang": "HU",
      "namaGudang": "HARAPAN UJUNG KUALA TUNGKAL",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E5758C4E05490E2BAE58F9D",
      "kodeGudang": "GITR",
      "namaGudang": "GD. CV. Inti Timur Raya",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E6258C4E05490E2BAE58F9D",
      "kodeGudang": "0019",
      "namaGudang": "DERMAGA PT. BHUMIREKSA NUSASEJATI",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E6458C4E05490E2BAE58F9D",
      "kodeGudang": "0022",
      "namaGudang": "GUDANG PT. TH. INDO PLANTATIONS",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E6558C4E05490E2BAE58F9D",
      "kodeGudang": "0023",
      "namaGudang": "DERMAGA KAWASAN BERIKAT PT. PSKE",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E7958C4E05490E2BAE58F9D",
      "kodeGudang": "GDJK",
      "namaGudang": "GUDANG JAYA KARYA",
      "kodeKantor": "110100",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E7B58C4E05490E2BAE58F9D",
      "kodeGudang": "GPHT",
      "namaGudang": "PANGKALAN HATTA / CONTAINER YARD",
      "kodeKantor": "110100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GP1"
    },
    {
      "idGudangTps": "93F6D5F30E8258C4E05490E2BAE58F9D",
      "kodeGudang": "GBSP",
      "namaGudang": "Gudang Impor PT. BSP (Kerinci)",
      "kodeKantor": "021200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E8358C4E05490E2BAE58F9D",
      "kodeGudang": "GCPI",
      "namaGudang": "Gudang Impor PT. CPI (Rumbai)",
      "kodeKantor": "021200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E8658C4E05490E2BAE58F9D",
      "kodeGudang": "GLKC",
      "namaGudang": "Gudang Impor PT. LKC (Pekanbaru) Sei Duku",
      "kodeKantor": "021200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E9158C4E05490E2BAE58F9D",
      "kodeGudang": "GDHL",
      "namaGudang": "GUDANG DHL",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E9258C4E05490E2BAE58F9D",
      "kodeGudang": "GGMF",
      "namaGudang": "GARUDA MAINTENANCE FACILITIES",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E9758C4E05490E2BAE58F9D",
      "kodeGudang": "TA03",
      "namaGudang": "TPS-TNS UNIAIR INDOTAMA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30E9858C4E05490E2BAE58F9D",
      "kodeGudang": "TA04",
      "namaGudang": "TPS-TNS DFDS",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30E9A58C4E05490E2BAE58F9D",
      "kodeGudang": "TA08",
      "namaGudang": "TPS-TNS BAX GLOBAL LOGISTIK",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EA558C4E05490E2BAE58F9D",
      "kodeGudang": "TB12",
      "namaGudang": "TPS-TNS GEOLOGISTICS IND. P",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EA858C4E05490E2BAE58F9D",
      "kodeGudang": "TES1",
      "namaGudang": "GUDANGAN REK",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EB258C4E05490E2BAE58F9D",
      "kodeGudang": "CJAM",
      "namaGudang": "JAMRUD CONTAINER",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GTPS"
    },
    {
      "idGudangTps": "93F6D5F30EB458C4E05490E2BAE58F9D",
      "kodeGudang": "CALN",
      "namaGudang": "ALN CONTAINER",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GIJS"
    },
    {
      "idGudangTps": "93F6D5F30EB758C4E05490E2BAE58F9D",
      "kodeGudang": "BT02",
      "namaGudang": "PERSERO BATAM",
      "kodeKantor": "020400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EB958C4E05490E2BAE58F9D",
      "kodeGudang": "BT04",
      "namaGudang": "KANTOR POS",
      "kodeKantor": "020400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30EBB58C4E05490E2BAE58F9D",
      "kodeGudang": "BT09",
      "namaGudang": "SEKUPANG",
      "kodeKantor": "020400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30EBC58C4E05490E2BAE58F9D",
      "kodeGudang": "BT14",
      "namaGudang": "TERMINAL FERRY BATAM CENTER",
      "kodeKantor": "020400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30EBD58C4E05490E2BAE58F9D",
      "kodeGudang": "BT13",
      "namaGudang": "BIROTIKA SEMESTA",
      "kodeKantor": "020400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EC358C4E05490E2BAE58F9D",
      "kodeGudang": "PGTI",
      "namaGudang": "PT PRIMA GLOBAL TRANS",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30ECF58C4E05490E2BAE58F9D",
      "kodeGudang": "BJTI",
      "namaGudang": "GROUP BJTI JAMRUD",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30ED858C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP 001",
      "kodeKantor": "110600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EDB58C4E05490E2BAE58F9D",
      "kodeGudang": "TE11",
      "namaGudang": "TPS-TNS SDV LOGISTICS INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EDC58C4E05490E2BAE58F9D",
      "kodeGudang": "TZ01",
      "namaGudang": "TPS-TNS ABX TABITHA LOGISTIK",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EEE58C4E05490E2BAE58F9D",
      "kodeGudang": "MMLG",
      "namaGudang": "MM LOGISTIK",
      "kodeKantor": "040100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EF158C4E05490E2BAE58F9D",
      "kodeGudang": "XLKK",
      "namaGudang": "LAP. EX LAHAN KEBAKARAN KALIBARU-PT.PELINDO II",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30EF258C4E05490E2BAE58F9D",
      "kodeGudang": "TIKA",
      "namaGudang": "GD. DHARMA KARTIKA BAKTI",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EF758C4E05490E2BAE58F9D",
      "kodeGudang": "AIRN",
      "namaGudang": "PT. AIRIN (DP3)",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30EF858C4E05490E2BAE58F9D",
      "kodeGudang": "TRMA",
      "namaGudang": "PT. LAUTAN TIRTA TRANSPORTAMA",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EFC58C4E05490E2BAE58F9D",
      "kodeGudang": "RUNA",
      "namaGudang": "PT. BIMARUNA JAYA (DP3)",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30EFD58C4E05490E2BAE58F9D",
      "kodeGudang": "BINA",
      "namaGudang": "PT. BINA SARANA  AMITY (DP3)",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30EFE58C4E05490E2BAE58F9D",
      "kodeGudang": "CENT",
      "namaGudang": "PT. CENTRAL SARANA NIAGA MAKMUR (DP3)",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30EFF58C4E05490E2BAE58F9D",
      "kodeGudang": "HMLA",
      "namaGudang": "PT. MULTI SEJAHTERA ABADI (DP3)",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F0258C4E05490E2BAE58F9D",
      "kodeGudang": "PESA",
      "namaGudang": "PT. PESAKA LOKA KIRANA (TPS)",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30F0558C4E05490E2BAE58F9D",
      "kodeGudang": "A001",
      "namaGudang": "KAWASAN PABEAN",
      "kodeKantor": "100500",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F0658C4E05490E2BAE58F9D",
      "kodeGudang": "1007",
      "namaGudang": "CEN (Ket.Maksimum 30 karakter)",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F0D58C4E05490E2BAE58F9D",
      "kodeGudang": "1008",
      "namaGudang": "GLOBAL REMOVINDO, PT",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F1858C4E05490E2BAE58F9D",
      "kodeGudang": "1019",
      "namaGudang": "KB DILUAR KBN IV",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F1B58C4E05490E2BAE58F9D",
      "kodeGudang": "1022",
      "namaGudang": "SUMBER MASANDA JAYA",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F2A58C4E05490E2BAE58F9D",
      "kodeGudang": "1500",
      "namaGudang": "Hanggar I-05",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F2F58C4E05490E2BAE58F9D",
      "kodeGudang": "2500",
      "namaGudang": "Administrasi TPB II-05",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F3158C4E05490E2BAE58F9D",
      "kodeGudang": "3200",
      "namaGudang": "Administrasi TPB III-02",
      "kodeKantor": "040400",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F3858C4E05490E2BAE58F9D",
      "kodeGudang": "4100",
      "namaGudang": "Wilayah Kerja I",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F3B58C4E05490E2BAE58F9D",
      "kodeGudang": "4400",
      "namaGudang": "Wilayah Kerja I",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F3D58C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "Kawasan Wilmar",
      "kodeKantor": "070300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F4058C4E05490E2BAE58F9D",
      "kodeGudang": "PSEK",
      "namaGudang": "PT. EXCELLENT  KENCANA",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F4558C4E05490E2BAE58F9D",
      "kodeGudang": "SMEL",
      "namaGudang": "PT. SMELTING GRESIK",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F5658C4E05490E2BAE58F9D",
      "kodeGudang": "SMSF",
      "namaGudang": "PT. SUMBER SOFUE FANCY GRESIK",
      "kodeKantor": "070300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F5958C4E05490E2BAE58F9D",
      "kodeGudang": "GTAS",
      "namaGudang": "TANGKI PT ASPAL MULTI SARANA",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F5B58C4E05490E2BAE58F9D",
      "kodeGudang": "ENG",
      "namaGudang": "PT. ETERINDO NUSA GRAHA",
      "kodeKantor": "070300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F6258C4E05490E2BAE58F9D",
      "kodeGudang": "WNI",
      "namaGudang": "PT WILMAR NABATI INDONESIA",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F6658C4E05490E2BAE58F9D",
      "kodeGudang": "MERA",
      "namaGudang": "GUDANG MERAH 001 - 008",
      "kodeKantor": "010700",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F7458C4E05490E2BAE58F9D",
      "kodeGudang": "2700",
      "namaGudang": "Hanggar II-07",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F7758C4E05490E2BAE58F9D",
      "kodeGudang": "5100",
      "namaGudang": "Wilayah Kerja III",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F7B58C4E05490E2BAE58F9D",
      "kodeGudang": "6100",
      "namaGudang": "Wilayah Kerja II",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F7D58C4E05490E2BAE58F9D",
      "kodeGudang": "6300",
      "namaGudang": "Wilayah Kerja II",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F7F58C4E05490E2BAE58F9D",
      "kodeGudang": "7100",
      "namaGudang": "Wilayah Kerja I",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F9958C4E05490E2BAE58F9D",
      "kodeGudang": "DAIA",
      "namaGudang": "KB. PT. DAIYAPLAS",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F9A58C4E05490E2BAE58F9D",
      "kodeGudang": "DMTN",
      "namaGudang": "DEPO CONTAINER SAMUDERA (MT CONT.)",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": " "
    },
    {
      "idGudangTps": "93F6D5F30FA558C4E05490E2BAE58F9D",
      "kodeGudang": "GDG6",
      "namaGudang": "GUDANG VI",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FAA58C4E05490E2BAE58F9D",
      "kodeGudang": "GOLF",
      "namaGudang": "KB. PT. GOLDEN FLOWER",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30FAD58C4E05490E2BAE58F9D",
      "kodeGudang": "GSM3",
      "namaGudang": "GUDANG SAMUDERA 3",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": " "
    },
    {
      "idGudangTps": "93F6D5F30FB058C4E05490E2BAE58F9D",
      "kodeGudang": "INDO",
      "namaGudang": "KB. PT. EKSPORINDO TERUS MAJU JAYA",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FBC58C4E05490E2BAE58F9D",
      "kodeGudang": "PUR2",
      "namaGudang": "TPS PT. ANGKASA PURA II",
      "kodeKantor": "060600",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30FC058C4E05490E2BAE58F9D",
      "kodeGudang": "0200",
      "namaGudang": "GUDANG LATIHAN",
      "kodeKantor": "120100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FC458C4E05490E2BAE58F9D",
      "kodeGudang": "GDBS",
      "namaGudang": "Terminal Aspal Curah BSU",
      "kodeKantor": "111300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FCD58C4E05490E2BAE58F9D",
      "kodeGudang": "G002",
      "namaGudang": "GRUP 2",
      "kodeKantor": "070500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FD758C4E05490E2BAE58F9D",
      "kodeGudang": "GD03",
      "namaGudang": "TPS ANGKASA PURA",
      "kodeKantor": "080300",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30FDC58C4E05490E2BAE58F9D",
      "kodeGudang": "GDBM",
      "namaGudang": "Gudang Bima",
      "kodeKantor": "080400",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30FE058C4E05490E2BAE58F9D",
      "kodeGudang": "PX01",
      "namaGudang": "PT. PANTOS EXPRESS",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FE458C4E05490E2BAE58F9D",
      "kodeGudang": "088",
      "namaGudang": "Gudang Importir PT. Pasti Bangun Jaya",
      "kodeKantor": "030300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FEC58C4E05490E2BAE58F9D",
      "kodeGudang": "081",
      "namaGudang": "PLTU-AIR ANYIR SITE",
      "kodeKantor": "030300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FEF58C4E05490E2BAE58F9D",
      "kodeGudang": "PLTO",
      "namaGudang": "PT. PertaminaLubricants (Tanki TO 09 & 11)",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FF458C4E05490E2BAE58F9D",
      "kodeGudang": "G003",
      "namaGudang": "Kawasan Smelting",
      "kodeKantor": "070300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FF658C4E05490E2BAE58F9D",
      "kodeGudang": "C030",
      "namaGudang": "PT TIMAH INDUSTRI",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FFD58C4E05490E2BAE58F9D",
      "kodeGudang": "CMSI",
      "namaGudang": "CONT MARCAPADA SUKSES INDONESIA",
      "kodeKantor": "070100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GMSI"
    },
    {
      "idGudangTps": "93F6D5F3100058C4E05490E2BAE58F9D",
      "kodeGudang": "GSM1",
      "namaGudang": "PT. SUPARMA TBK",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G005"
    },
    {
      "idGudangTps": "93F6D5F3100358C4E05490E2BAE58F9D",
      "kodeGudang": "GD01",
      "namaGudang": "GUDANG CFS",
      "kodeKantor": "111100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3101058C4E05490E2BAE58F9D",
      "kodeGudang": "TPI",
      "namaGudang": "Tempat Penimbunan Importir",
      "kodeKantor": "110900",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3101458C4E05490E2BAE58F9D",
      "kodeGudang": "PLUK",
      "namaGudang": "Pelabuhan Umum Kalianget",
      "kodeKantor": "070200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3101858C4E05490E2BAE58F9D",
      "kodeGudang": "075",
      "namaGudang": "Gudang Penimbunan PT. Listrindo Kencana",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3101958C4E05490E2BAE58F9D",
      "kodeGudang": "GTTE",
      "namaGudang": "GUDANG TERNATE",
      "kodeKantor": "120200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3101B58C4E05490E2BAE58F9D",
      "kodeGudang": "0304",
      "namaGudang": "TANGKI PT. DMI",
      "kodeKantor": "130600",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3102458C4E05490E2BAE58F9D",
      "kodeGudang": "GDFL",
      "namaGudang": "GUDANG FLAMBOYAN SINABANG",
      "kodeKantor": "130400",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3102858C4E05490E2BAE58F9D",
      "kodeGudang": "GDIM",
      "namaGudang": "GUDANG IMPORTIR",
      "kodeKantor": "081400",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3103858C4E05490E2BAE58F9D",
      "kodeGudang": "A001",
      "namaGudang": "MARUNDA",
      "kodeKantor": "160200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3103A58C4E05490E2BAE58F9D",
      "kodeGudang": "059",
      "namaGudang": "GUDANG IMPORTIR PT. BILLITIN MAKMUR LESTARI",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3104458C4E05490E2BAE58F9D",
      "kodeGudang": "CBW",
      "namaGudang": "CELUKAN BAWANG",
      "kodeKantor": "081200",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "CBW"
    },
    {
      "idGudangTps": "93F6D5F3104558C4E05490E2BAE58F9D",
      "kodeGudang": "KTM0",
      "namaGudang": "LAP. PENIMBUNAN PETIKEMAS PT KODJA TERRAMARIN",
      "kodeKantor": "040300",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F3104958C4E05490E2BAE58F9D",
      "kodeGudang": "BSU",
      "namaGudang": "STORAGE TANK PT BSU TAC PAREPARE",
      "kodeKantor": "110300",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3104B58C4E05490E2BAE58F9D",
      "kodeGudang": "SIN1",
      "namaGudang": "PELABUHAN SINTETE",
      "kodeKantor": "090500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3104E58C4E05490E2BAE58F9D",
      "kodeGudang": "SIN2",
      "namaGudang": "PPLB ARUK",
      "kodeKantor": "090500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3105058C4E05490E2BAE58F9D",
      "kodeGudang": "IMPO",
      "namaGudang": "LAP./GUDANG MILIK IMPORTIR",
      "kodeKantor": "090500",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "SIN1"
    },
    {
      "idGudangTps": "93F6D5F3105958C4E05490E2BAE58F9D",
      "kodeGudang": "MLB1",
      "namaGudang": "Gudang Pelabuhan Jetty Meulaboh",
      "kodeKantor": "130400",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3105A58C4E05490E2BAE58F9D",
      "kodeGudang": "MMJU",
      "namaGudang": "Mamuju",
      "kodeKantor": "110800",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3105D58C4E05490E2BAE58F9D",
      "kodeGudang": "070",
      "namaGudang": "Perairan Batu Rusa",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3106C58C4E05490E2BAE58F9D",
      "kodeGudang": "MSA",
      "namaGudang": "MONANG SIANIPAR ABADI",
      "kodeKantor": "010100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3107658C4E05490E2BAE58F9D",
      "kodeGudang": "FBLN",
      "namaGudang": "PULAU GEBE",
      "kodeKantor": "120200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "TPI"
    },
    {
      "idGudangTps": "93F6D5F3107B58C4E05490E2BAE58F9D",
      "kodeGudang": "LPTK",
      "namaGudang": "LAPANGAN PENIMBUNAN BARANG PT.TEKINDO ENERGI WEDA",
      "kodeKantor": "120200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3108258C4E05490E2BAE58F9D",
      "kodeGudang": "KTPG",
      "namaGudang": "ketapang madura",
      "kodeKantor": "070200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3108D58C4E05490E2BAE58F9D",
      "kodeGudang": "LINI",
      "namaGudang": "Diluar Kawasan Pabean",
      "kodeKantor": "120300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3109158C4E05490E2BAE58F9D",
      "kodeGudang": "1100",
      "namaGudang": "JEMBER",
      "kodeKantor": "071100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3109258C4E05490E2BAE58F9D",
      "kodeGudang": "GTBP",
      "namaGudang": "GUDANG PT. TRIMEGAH BANGUN PERSADA",
      "kodeKantor": "120200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3109558C4E05490E2BAE58F9D",
      "kodeGudang": "9999",
      "namaGudang": "dabo singkep",
      "kodeKantor": "020500",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3109B58C4E05490E2BAE58F9D",
      "kodeGudang": "067",
      "namaGudang": "PT. ALAM LESTARI KENCANA",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310A358C4E05490E2BAE58F9D",
      "kodeGudang": "GDLW",
      "namaGudang": "GUDANG DESA LALOWUO",
      "kodeKantor": "110600",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310A558C4E05490E2BAE58F9D",
      "kodeGudang": "KENA",
      "namaGudang": "PT KARGO EXPRESS NUSANTARA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F310B058C4E05490E2BAE58F9D",
      "kodeGudang": "DPPT",
      "namaGudang": "Depot Pertamina",
      "kodeKantor": "100200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F310B258C4E05490E2BAE58F9D",
      "kodeGudang": "DPSH",
      "namaGudang": "Depot Shell",
      "kodeKantor": "100200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F310BA58C4E05490E2BAE58F9D",
      "kodeGudang": "BNTG",
      "namaGudang": "GUDANG BONTANG",
      "kodeKantor": "100600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310BC58C4E05490E2BAE58F9D",
      "kodeGudang": "046",
      "namaGudang": "gudang pt.fajar berseri",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310C558C4E05490E2BAE58F9D",
      "kodeGudang": "BAK1",
      "namaGudang": "Lap. Petikemas dan Gudang PT. Buana Amanah Karya",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F310C658C4E05490E2BAE58F9D",
      "kodeGudang": "LAP1",
      "namaGudang": "LAPANGAN DONGGI SENORO PROJECT",
      "kodeKantor": "111000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310CA58C4E05490E2BAE58F9D",
      "kodeGudang": "003",
      "namaGudang": "PERAIRAN BELINYU",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310CD58C4E05490E2BAE58F9D",
      "kodeGudang": "GPKC",
      "namaGudang": "Gudang Penimbunan Krueng Cut",
      "kodeKantor": "130100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GBNA"
    },
    {
      "idGudangTps": "93F6D5F310CE58C4E05490E2BAE58F9D",
      "kodeGudang": "PGR3",
      "namaGudang": "PT. PETROKIMIA GRESIK (Phosphate Rock Pabrik III) ",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310CF58C4E05490E2BAE58F9D",
      "kodeGudang": "G003",
      "namaGudang": "GROUP 3",
      "kodeKantor": "060100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310D758C4E05490E2BAE58F9D",
      "kodeGudang": "GBB1",
      "namaGudang": "GUDANG BERAS BULOG",
      "kodeKantor": "130500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310E358C4E05490E2BAE58F9D",
      "kodeGudang": "GBTN",
      "namaGudang": "GUDANG IMPOR PELABUHAN BUTON",
      "kodeKantor": "021200",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F310E458C4E05490E2BAE58F9D",
      "kodeGudang": "GNPA",
      "namaGudang": "JL. PALMA NO. 157, KOTA BARAT, GORONTALO SULAWESI ",
      "kodeKantor": "111300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G01"
    },
    {
      "idGudangTps": "93F6D5F310E558C4E05490E2BAE58F9D",
      "kodeGudang": "101",
      "namaGudang": "Kawasan Pabean",
      "kodeKantor": "090900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310EB58C4E05490E2BAE58F9D",
      "kodeGudang": "G003",
      "namaGudang": "TPS PT. JASA UTAMA CARGO",
      "kodeKantor": "040400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310EF58C4E05490E2BAE58F9D",
      "kodeGudang": "T01",
      "namaGudang": "TANGKI 1 PT. PAKARTI",
      "kodeKantor": "050700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F310F258C4E05490E2BAE58F9D",
      "kodeGudang": "LPG1",
      "namaGudang": "PT. PETROKIMIA GRESIK (LAPANGAN PROYEK GGC)",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310F558C4E05490E2BAE58F9D",
      "kodeGudang": "SFG1",
      "namaGudang": "PT. FFGI ( SILO)",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3110058C4E05490E2BAE58F9D",
      "kodeGudang": "GKKA",
      "namaGudang": "Gudang KKA ",
      "kodeKantor": "130500",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3110158C4E05490E2BAE58F9D",
      "kodeGudang": "KARO",
      "namaGudang": "KARIANGAU",
      "kodeKantor": "100300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3110358C4E05490E2BAE58F9D",
      "kodeGudang": "SKWJ",
      "namaGudang": "SKOUW MUARATAMI",
      "kodeKantor": "120600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3110458C4E05490E2BAE58F9D",
      "kodeGudang": "014",
      "namaGudang": "GUDANG IMPORTIR PT. ALVINDO SAKTI PERKASA",
      "kodeKantor": "030300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3110B58C4E05490E2BAE58F9D",
      "kodeGudang": "CPSI",
      "namaGudang": "CONT PATRIOTS SAKTI INDONESIA",
      "kodeKantor": "070100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GIJS"
    },
    {
      "idGudangTps": "93F6D5F3110E58C4E05490E2BAE58F9D",
      "kodeGudang": "PLT2",
      "namaGudang": "Lap Penimbunan PLTU2 Kanci",
      "kodeKantor": "050700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3111F58C4E05490E2BAE58F9D",
      "kodeGudang": "SPC",
      "namaGudang": "SUNGAI PANCANG",
      "kodeKantor": "100900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "NNK"
    },
    {
      "idGudangTps": "93F6D5F3112058C4E05490E2BAE58F9D",
      "kodeGudang": "SGRS",
      "namaGudang": "SEIMENGGARIS",
      "kodeKantor": "100900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "NNK"
    },
    {
      "idGudangTps": "93F6D5F3112A58C4E05490E2BAE58F9D",
      "kodeGudang": "LPIN",
      "namaGudang": "Lapangan Penimbunan Inalum",
      "kodeKantor": "011200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3113058C4E05490E2BAE58F9D",
      "kodeGudang": "GPOS",
      "namaGudang": "KANTOR POS BALIKPAPAN",
      "kodeKantor": "100300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3113158C4E05490E2BAE58F9D",
      "kodeGudang": "A032",
      "namaGudang": "PT. Chandra Asri Petrochemical",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3113558C4E05490E2BAE58F9D",
      "kodeGudang": "LL03",
      "namaGudang": "GUDANG LAUTAN LUAS 03",
      "kodeKantor": "070300",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G005"
    },
    {
      "idGudangTps": "93F6D5F3113858C4E05490E2BAE58F9D",
      "kodeGudang": "IBS2",
      "namaGudang": "INTI BANGUN SELARAS 2",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3113958C4E05490E2BAE58F9D",
      "kodeGudang": "BSFI",
      "namaGudang": "PT. BASF INDONESIA",
      "kodeKantor": "050400",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3113D58C4E05490E2BAE58F9D",
      "kodeGudang": "BEST",
      "namaGudang": "PT. BATARA ELOK SEMESTA TERPADU",
      "kodeKantor": "070300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G005"
    },
    {
      "idGudangTps": "93F6D5F3113E58C4E05490E2BAE58F9D",
      "kodeGudang": "DMT6",
      "namaGudang": "PT DOVECHEM MASPION TERMINAL (TANGKI T-06,T-32)",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F3114658C4E05490E2BAE58F9D",
      "kodeGudang": "LBR5",
      "namaGudang": "GUDANG BIMA REKSI 05",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3114758C4E05490E2BAE58F9D",
      "kodeGudang": "GDIM",
      "namaGudang": "Gudang Importir",
      "kodeKantor": "090900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3115258C4E05490E2BAE58F9D",
      "kodeGudang": "PLNJ",
      "namaGudang": "TEMPAT PENIMBUNAN PLN HOLTEKAMP",
      "kodeKantor": "120600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3115858C4E05490E2BAE58F9D",
      "kodeGudang": "G004",
      "namaGudang": "GROUP 4",
      "kodeKantor": "060100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3115958C4E05490E2BAE58F9D",
      "kodeGudang": "G005",
      "namaGudang": "GROUP 5",
      "kodeKantor": "060100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3115B58C4E05490E2BAE58F9D",
      "kodeGudang": "IPRT",
      "namaGudang": "PT. PERIGI RAJA TERPADU",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3115C58C4E05490E2BAE58F9D",
      "kodeGudang": "G008",
      "namaGudang": "TPP SIPATEX",
      "kodeKantor": "050500",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3116458C4E05490E2BAE58F9D",
      "kodeGudang": "BML1",
      "namaGudang": "PT BERDIRI MATAHARI LOGISTIK",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3116858C4E05490E2BAE58F9D",
      "kodeGudang": "WCI1",
      "namaGudang": "PT. INDOTIMBER INTI SEJAHTERA (GUDANG H & I)",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3116A58C4E05490E2BAE58F9D",
      "kodeGudang": "GPOS",
      "namaGudang": "Gudang PT. Pos Indonesia",
      "kodeKantor": "070500",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F3116B58C4E05490E2BAE58F9D",
      "kodeGudang": "LBW",
      "namaGudang": "LONG BAWAN",
      "kodeKantor": "100900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3116E58C4E05490E2BAE58F9D",
      "kodeGudang": "GDHL",
      "namaGudang": "GUDANG DHL",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3116F58C4E05490E2BAE58F9D",
      "kodeGudang": "0003",
      "namaGudang": "El Tari",
      "kodeKantor": "080500",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3117258C4E05490E2BAE58F9D",
      "kodeGudang": "GDM",
      "namaGudang": "Gudang PT Mitra Liga Sukses",
      "kodeKantor": "030600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3117B58C4E05490E2BAE58F9D",
      "kodeGudang": "BT10",
      "namaGudang": "SEWU",
      "kodeKantor": "020400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3117D58C4E05490E2BAE58F9D",
      "kodeGudang": "BT7B",
      "namaGudang": "SEMBLOG",
      "kodeKantor": "020400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3117F58C4E05490E2BAE58F9D",
      "kodeGudang": "R4",
      "namaGudang": "test4",
      "kodeKantor": "009000",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3118858C4E05490E2BAE58F9D",
      "kodeGudang": "GD4",
      "namaGudang": "PLBN WINI",
      "kodeKantor": "081400",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3118958C4E05490E2BAE58F9D",
      "kodeGudang": "DS03",
      "namaGudang": "PT DSV TRANSPORT INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3118B58C4E05490E2BAE58F9D",
      "kodeGudang": "A034",
      "namaGudang": "PT. MITSUBISHI CHEMICAL INDONESIA",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3118D58C4E05490E2BAE58F9D",
      "kodeGudang": "LWPH",
      "namaGudang": "PT Logwin Air And Ocean Indonesia",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F3119558C4E05490E2BAE58F9D",
      "kodeGudang": "G002",
      "namaGudang": "Gudang Luar Kawasan Pabean",
      "kodeKantor": "090400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3119658C4E05490E2BAE58F9D",
      "kodeGudang": "LBM1",
      "namaGudang": "PT. BERKAH KAWASAN MANYAR SEJAHTERA",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G005"
    },
    {
      "idGudangTps": "93F6D5F3119D58C4E05490E2BAE58F9D",
      "kodeGudang": "LNGT",
      "namaGudang": "LNG TANGGUH",
      "kodeKantor": "122300",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "IDKN"
    },
    {
      "idGudangTps": "93F6D5F311A158C4E05490E2BAE58F9D",
      "kodeGudang": "TMNA",
      "namaGudang": "PT. MULTIMAS NABATI ASAHAN",
      "kodeKantor": "011200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "KTMT"
    },
    {
      "idGudangTps": "93F6D5F311A558C4E05490E2BAE58F9D",
      "kodeGudang": "SGIJ",
      "namaGudang": "SAYAP GARUDA INDAH",
      "kodeKantor": "120600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311A858C4E05490E2BAE58F9D",
      "kodeGudang": "G006",
      "namaGudang": "Gudang Angkasa Pura Logistics",
      "kodeKantor": "080100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311AD58C4E05490E2BAE58F9D",
      "kodeGudang": "DS02",
      "namaGudang": "PT DSV TRANSPORT INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311B358C4E05490E2BAE58F9D",
      "kodeGudang": "GCLP",
      "namaGudang": "Gudang PT. Ciliandra Perkasa",
      "kodeKantor": "020900",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F311BA58C4E05490E2BAE58F9D",
      "kodeGudang": "G007",
      "namaGudang": "GD. PELABUHAN PERIKANAN NUSANTARA",
      "kodeKantor": "120100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311BF58C4E05490E2BAE58F9D",
      "kodeGudang": "PGR1",
      "namaGudang": "PT. SMELTING",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G003"
    },
    {
      "idGudangTps": "93F6D5F311C058C4E05490E2BAE58F9D",
      "kodeGudang": "0039",
      "namaGudang": "GUDANG SULTAN PARIT 8 SUNGAI GUNTUNG",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311C458C4E05490E2BAE58F9D",
      "kodeGudang": "GUEL",
      "namaGudang": "TPS PT. UNIVERSAL EKSPRES LOGISTINDO",
      "kodeKantor": "050100",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311CD58C4E05490E2BAE58F9D",
      "kodeGudang": "PLBJ",
      "namaGudang": "PLTD LABUAN BAJO",
      "kodeKantor": "080700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311D458C4E05490E2BAE58F9D",
      "kodeGudang": "GLDK",
      "namaGudang": "GUDANG DILUAR KAWASAN PABEAN",
      "kodeKantor": "120200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311D558C4E05490E2BAE58F9D",
      "kodeGudang": "0031",
      "namaGudang": "GUDANG EDI PARIT 8 SUNGAI GUNTUNG",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311DA58C4E05490E2BAE58F9D",
      "kodeGudang": "LGLS",
      "namaGudang": "PT. GURITA LINTAS SAMUDERA (LAUT)",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311E358C4E05490E2BAE58F9D",
      "kodeGudang": "BBHI",
      "namaGudang": "GUDANG BOOM BARU",
      "kodeKantor": "030100",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G006"
    },
    {
      "idGudangTps": "93F6D5F311E558C4E05490E2BAE58F9D",
      "kodeGudang": "EAST",
      "namaGudang": "EASTKAL NON PLB",
      "kodeKantor": "100300",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311E858C4E05490E2BAE58F9D",
      "kodeGudang": "MULT",
      "namaGudang": "PT. MULTI TRADING PRATAMA",
      "kodeKantor": "100200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311E958C4E05490E2BAE58F9D",
      "kodeGudang": "BD01",
      "namaGudang": "RAJA HAJI FISABILILLAH",
      "kodeKantor": "020500",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311F058C4E05490E2BAE58F9D",
      "kodeGudang": "PA01",
      "namaGudang": "Tangki LNG Arun",
      "kodeKantor": "130500",
      "jenisGudang": "7",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311F258C4E05490E2BAE58F9D",
      "kodeGudang": "ADS",
      "namaGudang": "GUDANG PT.ANGSO DUO SAWIT",
      "kodeKantor": "030600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311F458C4E05490E2BAE58F9D",
      "kodeGudang": "GD01",
      "namaGudang": "TPS PELINDO",
      "kodeKantor": "011100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311FB58C4E05490E2BAE58F9D",
      "kodeGudang": "GTIP",
      "namaGudang": "Gudang Importir Teguh",
      "kodeKantor": "130500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311FD58C4E05490E2BAE58F9D",
      "kodeGudang": "CALG",
      "namaGudang": "Gudang Pelabuhan Calang",
      "kodeKantor": "130400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311FE58C4E05490E2BAE58F9D",
      "kodeGudang": "HYJS",
      "namaGudang": "HANGGAR YAJASI SENTANI",
      "kodeKantor": "120600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3120458C4E05490E2BAE58F9D",
      "kodeGudang": "A035",
      "namaGudang": "PT. CASTROL MANUFACTURING INDONESIA",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "string",
      "kodeGudang": "string",
      "namaGudang": "string",
      "kodeKantor": "040300",
      "jenisGudang": "string",
      "idPengguna": "string",
      "flagAktif": "string",
      "grupGudang": "string"
    },
    {
      "idGudangTps": "93F6D5F30B5758C4E05490E2BAE58F9D",
      "kodeGudang": "SGRO",
      "namaGudang": "SEGORO TERMINAL/214X",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B6658C4E05490E2BAE58F9D",
      "kodeGudang": "T106",
      "namaGudang": "GUDANG DAN LAP. TIMBUN 106",
      "kodeKantor": "000000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B6958C4E05490E2BAE58F9D",
      "kodeGudang": "T208",
      "namaGudang": "GD/LAP.208",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B7258C4E05490E2BAE58F9D",
      "kodeGudang": "GJAS",
      "namaGudang": "Gudang Jasa Angkasa Semesta",
      "kodeKantor": "070500",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30B7358C4E05490E2BAE58F9D",
      "kodeGudang": "GMSA",
      "namaGudang": "Gudang MSA",
      "kodeKantor": "070500",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B7858C4E05490E2BAE58F9D",
      "kodeGudang": "GMER",
      "namaGudang": "Gudang Merpati",
      "kodeKantor": "070500",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B7B58C4E05490E2BAE58F9D",
      "kodeGudang": "SE06",
      "namaGudang": "Gudang PFPB SE06",
      "kodeKantor": "070500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B8658C4E05490E2BAE58F9D",
      "kodeGudang": "CHEV",
      "namaGudang": "CHEVRON PENAJAM",
      "kodeKantor": "100300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B8F58C4E05490E2BAE58F9D",
      "kodeGudang": "GARD",
      "namaGudang": "GUDANG GARUDA",
      "kodeKantor": "010800",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30B9158C4E05490E2BAE58F9D",
      "kodeGudang": "CDP1",
      "namaGudang": "Gudang Penimbunan CDP Satu",
      "kodeKantor": "050900",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30B9858C4E05490E2BAE58F9D",
      "kodeGudang": "1011",
      "namaGudang": "GUDANG X/XI",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B9B58C4E05490E2BAE58F9D",
      "kodeGudang": "LUXN",
      "namaGudang": "KB. PT. LUXINDO NUSANTARA",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30B9E58C4E05490E2BAE58F9D",
      "kodeGudang": "POLY",
      "namaGudang": "TPS. PT. POLYSINDO EKA PERKASA",
      "kodeKantor": "060100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BA158C4E05490E2BAE58F9D",
      "kodeGudang": "SANG",
      "namaGudang": "KB. PT. SANGO CERAMICS INDONESIA",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BA658C4E05490E2BAE58F9D",
      "kodeGudang": "SWOO",
      "namaGudang": "KB. PT. SAMWOO CORP.",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BA958C4E05490E2BAE58F9D",
      "kodeGudang": "TEXM",
      "namaGudang": "TPS. PT. TEXMACO PERKASA ENG.",
      "kodeKantor": "060100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BAC58C4E05490E2BAE58F9D",
      "kodeGudang": "007X",
      "namaGudang": "GUDANG 007",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BAF58C4E05490E2BAE58F9D",
      "kodeGudang": "0200",
      "namaGudang": "GT. PETROCHEN",
      "kodeKantor": "050400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BB758C4E05490E2BAE58F9D",
      "kodeGudang": "200X",
      "namaGudang": "GUDANG 200X, POS E",
      "kodeKantor": "000000",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BB858C4E05490E2BAE58F9D",
      "kodeGudang": "200X",
      "namaGudang": "GUDANG 200X",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BC558C4E05490E2BAE58F9D",
      "kodeGudang": "213X",
      "namaGudang": "GUDANG 213X",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BCA58C4E05490E2BAE58F9D",
      "kodeGudang": "300X",
      "namaGudang": "GD/LAP.300-302",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BD058C4E05490E2BAE58F9D",
      "kodeGudang": "4104",
      "namaGudang": "GUDANG 104",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BE358C4E05490E2BAE58F9D",
      "kodeGudang": "CENT",
      "namaGudang": "PT. CENTRAL SARANA NIAGA MAKMUR (DP3)",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BE458C4E05490E2BAE58F9D",
      "kodeGudang": "CENT",
      "namaGudang": "PT. CENTRAL SARANA NIAGA MAKMUR (DP3)",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BEA58C4E05490E2BAE58F9D",
      "kodeGudang": "TMSI",
      "namaGudang": "LAP. TIMBUN MTI (BANDA) 215X",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BF158C4E05490E2BAE58F9D",
      "kodeGudang": "G107",
      "namaGudang": "GUDANG 107",
      "kodeKantor": "040300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30BF458C4E05490E2BAE58F9D",
      "kodeGudang": "FORD",
      "namaGudang": "PPGB PT. FORD MOTOR INDONESIA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BF558C4E05490E2BAE58F9D",
      "kodeGudang": "FORD",
      "namaGudang": "PPGB PT. FORD MOTOR INDONESIA",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30BF758C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GRUP 01",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C0258C4E05490E2BAE58F9D",
      "kodeGudang": "G201",
      "namaGudang": "GUDANG 201",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C0558C4E05490E2BAE58F9D",
      "kodeGudang": "0402",
      "namaGudang": "TPS/GD.KPBC TANJUNG PRIOK II",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C0A58C4E05490E2BAE58F9D",
      "kodeGudang": "207X",
      "namaGudang": "GD&LAP.207X - ACT CONT, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30C1258C4E05490E2BAE58F9D",
      "kodeGudang": "GCTU",
      "namaGudang": "PT. GUNA CITRA TRANS UTAMA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C2958C4E05490E2BAE58F9D",
      "kodeGudang": "INFO",
      "namaGudang": "KABER.  PT. INFOPEN",
      "kodeKantor": "040100",
      "jenisGudang": "8",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C2B58C4E05490E2BAE58F9D",
      "kodeGudang": "TMAR",
      "namaGudang": "PT. GLOBAL TERMINAL MARUNDA",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C2D58C4E05490E2BAE58F9D",
      "kodeGudang": "INTI",
      "namaGudang": "KABER.  PT.BENOLI INTI KARYA",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C2F58C4E05490E2BAE58F9D",
      "kodeGudang": "TMKT",
      "namaGudang": "PT. MASAJI KARGOSENTRA TAMA",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C3158C4E05490E2BAE58F9D",
      "kodeGudang": "JAYA",
      "namaGudang": "KABER.  PT. LAUTAN JAYA KUMALA",
      "kodeKantor": "000000",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C3258C4E05490E2BAE58F9D",
      "kodeGudang": "KARA",
      "namaGudang": "PT. KARAVAN (TPS)",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C3758C4E05490E2BAE58F9D",
      "kodeGudang": "TPK1",
      "namaGudang": "UTPK I - JICT, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GRHA"
    },
    {
      "idGudangTps": "93F6D5F30C3D58C4E05490E2BAE58F9D",
      "kodeGudang": "GTAM",
      "namaGudang": "GUDANG BERIKAT TOYOTA ASTRA MOTOR",
      "kodeKantor": "040300",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C4B58C4E05490E2BAE58F9D",
      "kodeGudang": "MORI",
      "namaGudang": "PT.MORIS PUTRA KARTIKA",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C6658C4E05490E2BAE58F9D",
      "kodeGudang": "GDKP",
      "namaGudang": "GB PT DHARMA KARYA PERDANA",
      "kodeKantor": "040300",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C6858C4E05490E2BAE58F9D",
      "kodeGudang": "TPK1",
      "namaGudang": "UTPK 1 IMPOR",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C6958C4E05490E2BAE58F9D",
      "kodeGudang": "TPK1",
      "namaGudang": "UTPK 1 IMPOR",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C6D58C4E05490E2BAE58F9D",
      "kodeGudang": "BDKR",
      "namaGudang": "PT. Berdikari",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30C7158C4E05490E2BAE58F9D",
      "kodeGudang": "ARN1",
      "namaGudang": "GD & LAP (UTARA) - AIRIN, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30C7758C4E05490E2BAE58F9D",
      "kodeGudang": "TRIS",
      "namaGudang": "PT. TRI SARI",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C7858C4E05490E2BAE58F9D",
      "kodeGudang": "BERD",
      "namaGudang": "GD & LAP - BERDIKARI, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30C8458C4E05490E2BAE58F9D",
      "kodeGudang": "UTPK",
      "namaGudang": "UTPK DUMMY",
      "kodeKantor": "000000",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C8558C4E05490E2BAE58F9D",
      "kodeGudang": "WACM",
      "namaGudang": "PT. WAHANA CONTENA MAKMUR",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C8958C4E05490E2BAE58F9D",
      "kodeGudang": "TPSJ",
      "namaGudang": "TPS PT JANGKAR PACIFIC",
      "kodeKantor": "070100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30C8E58C4E05490E2BAE58F9D",
      "kodeGudang": "MKT2",
      "namaGudang": "GUDANG DAN LAP. KALIBARU II",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30C9E58C4E05490E2BAE58F9D",
      "kodeGudang": "G503",
      "namaGudang": "GUDANG 503",
      "kodeKantor": "070100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CA658C4E05490E2BAE58F9D",
      "kodeGudang": "G301",
      "namaGudang": "GUDANG 301",
      "kodeKantor": "070100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CAA58C4E05490E2BAE58F9D",
      "kodeGudang": "G112",
      "namaGudang": "GUDANG   LAPANGAN 112",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CB258C4E05490E2BAE58F9D",
      "kodeGudang": "G101",
      "namaGudang": "GUDANG   LAPANGAN 101",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CB458C4E05490E2BAE58F9D",
      "kodeGudang": "G007",
      "namaGudang": "GUDANG   LAPANGAN 007",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CB658C4E05490E2BAE58F9D",
      "kodeGudang": "G005",
      "namaGudang": "GUDANG   LAPANGAN 005",
      "kodeKantor": "040100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30CBC58C4E05490E2BAE58F9D",
      "kodeGudang": "CONT",
      "namaGudang": "LAP. BONGKAR/TIMBUN CONTAINER",
      "kodeKantor": "070100",
      "jenisGudang": "A",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GTPS"
    },
    {
      "idGudangTps": "93F6D5F30CC458C4E05490E2BAE58F9D",
      "kodeGudang": "A001",
      "namaGudang": "PT. KRAKATAU STEEL/ PELINDO II",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CC758C4E05490E2BAE58F9D",
      "kodeGudang": "A005",
      "namaGudang": "PT. BAKRI KASEI CORPORATION",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CC958C4E05490E2BAE58F9D",
      "kodeGudang": "A007",
      "namaGudang": "PT. CABOT INDONESIA",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CCC58C4E05490E2BAE58F9D",
      "kodeGudang": "A011",
      "namaGudang": "PT. TOMINDOMAS BULK TANKER",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CCF58C4E05490E2BAE58F9D",
      "kodeGudang": "A014",
      "namaGudang": "PT. SANTA FEE POMERY",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CD158C4E05490E2BAE58F9D",
      "kodeGudang": "A016",
      "namaGudang": "PT. DOVER CHEMICAL",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CD758C4E05490E2BAE58F9D",
      "kodeGudang": "A019",
      "namaGudang": "PT. POLYCHEM LINDO",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CD858C4E05490E2BAE58F9D",
      "kodeGudang": "A020",
      "namaGudang": "PT. CONTINENTAL SOLVINDO",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CDA58C4E05490E2BAE58F9D",
      "kodeGudang": "C002",
      "namaGudang": "PT. IKPP",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CDB58C4E05490E2BAE58F9D",
      "kodeGudang": "C003",
      "namaGudang": "PT. DOVER CHEMICAL",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CDF58C4E05490E2BAE58F9D",
      "kodeGudang": "C007",
      "namaGudang": "PT. BMS / ANGEL PRODUCTS",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CE958C4E05490E2BAE58F9D",
      "kodeGudang": "A022",
      "namaGudang": "DOW CHEMICAL INDONESIA",
      "kodeKantor": "050400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CF758C4E05490E2BAE58F9D",
      "kodeGudang": "B021",
      "namaGudang": "PT.BAKRIE CONSTRUCTION",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30CFC58C4E05490E2BAE58F9D",
      "kodeGudang": "MSAP",
      "namaGudang": "PT.MSA",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D0558C4E05490E2BAE58F9D",
      "kodeGudang": "INFO",
      "namaGudang": "KABER.  PT. INFOPEN",
      "kodeKantor": "040300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D0C58C4E05490E2BAE58F9D",
      "kodeGudang": "PGFA",
      "namaGudang": "PT. GELOMBANG FAJAR",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D2358C4E05490E2BAE58F9D",
      "kodeGudang": "RAYA",
      "namaGudang": "PT.AGUNG RAYA",
      "kodeKantor": "000000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D2558C4E05490E2BAE58F9D",
      "kodeGudang": "RAYA",
      "namaGudang": "PT.AGUNG RAYA",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D2858C4E05490E2BAE58F9D",
      "kodeGudang": "RUNA",
      "namaGudang": "PT. BIMARUNA JAYA (DP3)",
      "kodeKantor": "040100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D2D58C4E05490E2BAE58F9D",
      "kodeGudang": "T106",
      "namaGudang": "GUDANG DAN LAP. TIMBUN 106",
      "kodeKantor": "040300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D3358C4E05490E2BAE58F9D",
      "kodeGudang": "0200",
      "namaGudang": "GUDANG LATIHAN",
      "kodeKantor": "100200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D3458C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP 001",
      "kodeKantor": "100200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D4458C4E05490E2BAE58F9D",
      "kodeGudang": "286",
      "namaGudang": "KB. PT. KARYA TANGAN INDAH",
      "kodeKantor": "080100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D4558C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP 001",
      "kodeKantor": "080100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D4658C4E05490E2BAE58F9D",
      "kodeGudang": "IDMG",
      "namaGudang": "TERMINAL BBM MANGGIS",
      "kodeKantor": "080100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D4858C4E05490E2BAE58F9D",
      "kodeGudang": "GIPP",
      "namaGudang": "GUDANG IMPOR PELABUHAN PONTIANAK",
      "kodeKantor": "090100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D4B58C4E05490E2BAE58F9D",
      "kodeGudang": "GILK",
      "namaGudang": "GUDANG IMPOR LUAR KAWASAN",
      "kodeKantor": "090100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "DILK"
    },
    {
      "idGudangTps": "93F6D5F30D4E58C4E05490E2BAE58F9D",
      "kodeGudang": "GDIM",
      "namaGudang": "Gudang Importir",
      "kodeKantor": "030100",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30D5F58C4E05490E2BAE58F9D",
      "kodeGudang": "PSUT",
      "namaGudang": "PSUT",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D6058C4E05490E2BAE58F9D",
      "kodeGudang": "TIMB",
      "namaGudang": "Sumatra Timber Utama",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D6158C4E05490E2BAE58F9D",
      "kodeGudang": "DYTG",
      "namaGudang": "GUDANG PT. DAYA TURANGGA",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D6358C4E05490E2BAE58F9D",
      "kodeGudang": "TJWI",
      "namaGudang": "Gudang PT. TJWI",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D6458C4E05490E2BAE58F9D",
      "kodeGudang": "0203",
      "namaGudang": "Gudang Petrochina Betara",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D6958C4E05490E2BAE58F9D",
      "kodeGudang": "PHM",
      "namaGudang": "Gudang PHM Ka. Tungkal",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D6F58C4E05490E2BAE58F9D",
      "kodeGudang": "KIMD",
      "namaGudang": "Gd.PT Kimindo",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D7258C4E05490E2BAE58F9D",
      "kodeGudang": "PSKB",
      "namaGudang": "Gd. PT. Kimindo",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D7358C4E05490E2BAE58F9D",
      "kodeGudang": "POIL",
      "namaGudang": "Gd. PearOil (Tungkal )Ltd.",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D7858C4E05490E2BAE58F9D",
      "kodeGudang": "GSLU",
      "namaGudang": "Gd. Sumber Laut Utama",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D8758C4E05490E2BAE58F9D",
      "kodeGudang": "TB15",
      "namaGudang": "TPS-TNS GUDANG CARDIG LOGISTICS INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30D8958C4E05490E2BAE58F9D",
      "kodeGudang": "CJGL",
      "namaGudang": "CJ-GLS",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30D8D58C4E05490E2BAE58F9D",
      "kodeGudang": "LPC1",
      "namaGudang": "Gudang Patra Dock (GD.C1)",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30D8E58C4E05490E2BAE58F9D",
      "kodeGudang": "LPC2",
      "namaGudang": "Gudang Patra Dock (GD.C2)",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30D9458C4E05490E2BAE58F9D",
      "kodeGudang": "SBK",
      "namaGudang": "SEBUKU",
      "kodeKantor": "100900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "NNK"
    },
    {
      "idGudangTps": "93F6D5F30D9758C4E05490E2BAE58F9D",
      "kodeGudang": "TANG",
      "namaGudang": "42T101A/B/C/D/E/F/G & 42T102A/B",
      "kodeKantor": "050700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DA158C4E05490E2BAE58F9D",
      "kodeGudang": "GDAT",
      "namaGudang": "GUDANG ANTAM POMALAA",
      "kodeKantor": "110600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DA358C4E05490E2BAE58F9D",
      "kodeGudang": "G.01",
      "namaGudang": "Grup Gudang PT Rebinmas",
      "kodeKantor": "030500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G.01"
    },
    {
      "idGudangTps": "93F6D5F30DAE58C4E05490E2BAE58F9D",
      "kodeGudang": "IPC",
      "namaGudang": "Pellindo II Bengkulu",
      "kodeKantor": "030200",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DAF58C4E05490E2BAE58F9D",
      "kodeGudang": "T007",
      "namaGudang": "GUDANG & LAPANGAN 007, PT. PELINDO II",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30DBB58C4E05490E2BAE58F9D",
      "kodeGudang": "050",
      "namaGudang": "GUDANG IMPORTIR PT. SARANA JAMBI UTAMA",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DC758C4E05490E2BAE58F9D",
      "kodeGudang": "TSAU",
      "namaGudang": "Tangki penimbunan PT. Sarana Aceh Utama",
      "kodeKantor": "130100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GBNA"
    },
    {
      "idGudangTps": "93F6D5F30DC858C4E05490E2BAE58F9D",
      "kodeGudang": "GBNA",
      "namaGudang": "Gudang Penimbunan Banda Aceh",
      "kodeKantor": "130100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DC958C4E05490E2BAE58F9D",
      "kodeGudang": "GNII",
      "namaGudang": "GUDANG DESA NII TANASA, KECAMATAN LALONGGASOMETO",
      "kodeKantor": "110600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30DDA58C4E05490E2BAE58F9D",
      "kodeGudang": "106B",
      "namaGudang": "LAP 106B - PRIMANATA JP, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DE558C4E05490E2BAE58F9D",
      "kodeGudang": "MASA",
      "namaGudang": "GD & LAP - MAHARDI ST, PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DE858C4E05490E2BAE58F9D",
      "kodeGudang": "TMBP",
      "namaGudang": "GD - TRI MULIA BP,PT",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DEA58C4E05490E2BAE58F9D",
      "kodeGudang": "PECN",
      "namaGudang": "GD EX ARSA, PT. MTI",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F30DEB58C4E05490E2BAE58F9D",
      "kodeGudang": "LA21",
      "namaGudang": "LAP 210&211 PELINDO",
      "kodeKantor": "040300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30DFE58C4E05490E2BAE58F9D",
      "kodeGudang": "221X",
      "namaGudang": "GUDANG DAN LAPANGAN 221X",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30E0258C4E05490E2BAE58F9D",
      "kodeGudang": "R2",
      "namaGudang": "test2",
      "kodeKantor": "009000",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E0658C4E05490E2BAE58F9D",
      "kodeGudang": "TND2",
      "namaGudang": "GD & LAP 2-TRANSPORINDO LIMA PERKASA, KEP-4483",
      "kodeKantor": "040300",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "TPSL"
    },
    {
      "idGudangTps": "93F6D5F30E0758C4E05490E2BAE58F9D",
      "kodeGudang": "GD01",
      "namaGudang": "GUDANG IMPORTIR",
      "kodeKantor": "111200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "001"
    },
    {
      "idGudangTps": "93F6D5F30E0958C4E05490E2BAE58F9D",
      "kodeGudang": "052",
      "namaGudang": "GUDANG IMPORTIR PT. BEHN MEYER",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E0A58C4E05490E2BAE58F9D",
      "kodeGudang": "KI21",
      "namaGudang": "TANKI D.2101A DAN D.2101B",
      "kodeKantor": "050700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E0F58C4E05490E2BAE58F9D",
      "kodeGudang": "044",
      "namaGudang": "GUDANG IMPORTIR TUNAS KARYA SHAKTI",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E1758C4E05490E2BAE58F9D",
      "kodeGudang": "GGPS",
      "namaGudang": "GUDANG PT. GANE PERMAI SENTOSA",
      "kodeKantor": "120200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E1B58C4E05490E2BAE58F9D",
      "kodeGudang": "LP02",
      "namaGudang": "Areal Selaparang International Airport, Lombok",
      "kodeKantor": "080300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E2458C4E05490E2BAE58F9D",
      "kodeGudang": "TPKI",
      "namaGudang": "UNIT TERMINAL PETI KEMAS IMPOR",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E2958C4E05490E2BAE58F9D",
      "kodeGudang": "TRP",
      "namaGudang": "LOKASI PABRIK TRP JELAPAT",
      "kodeKantor": "100100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E2F58C4E05490E2BAE58F9D",
      "kodeGudang": "GMRP",
      "namaGudang": "PT GUNUNG MERANTI RAYA PLYWOOD",
      "kodeKantor": "100100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E3258C4E05490E2BAE58F9D",
      "kodeGudang": "WILL",
      "namaGudang": "WILAYAH LUAR PELABUHAN",
      "kodeKantor": "100100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E3458C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP 001",
      "kodeKantor": "100100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E3758C4E05490E2BAE58F9D",
      "kodeGudang": "GDPH",
      "namaGudang": "Gudang PD.HENDRI",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E3A58C4E05490E2BAE58F9D",
      "kodeGudang": "GPM",
      "namaGudang": "Gudang CV. Putra Mandiri",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E3B58C4E05490E2BAE58F9D",
      "kodeGudang": "PIJJ",
      "namaGudang": "Gudang Petrochina Jambi",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E4058C4E05490E2BAE58F9D",
      "kodeGudang": "KTN",
      "namaGudang": "GUDANG KURNIA TUNGGAL NUGRAHA",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E4558C4E05490E2BAE58F9D",
      "kodeGudang": "MSJ",
      "namaGudang": "GUDANG MITRA SAWIT JAMBI",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E4658C4E05490E2BAE58F9D",
      "kodeGudang": "PSPJ",
      "namaGudang": "GD. PT. Pelita Sari Prima Jadi",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E4A58C4E05490E2BAE58F9D",
      "kodeGudang": "GDP",
      "namaGudang": "GUDANG PPI",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E4D58C4E05490E2BAE58F9D",
      "kodeGudang": "SPM",
      "namaGudang": "Samudera Prima Makmur",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E5658C4E05490E2BAE58F9D",
      "kodeGudang": "EII",
      "namaGudang": "GD PT. Encona Inti Industri",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E5858C4E05490E2BAE58F9D",
      "kodeGudang": "GBI",
      "namaGudang": "Gudang Buana Indah",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E5A58C4E05490E2BAE58F9D",
      "kodeGudang": "PTM2",
      "namaGudang": "PMT SELAT BERHALA",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E5C58C4E05490E2BAE58F9D",
      "kodeGudang": "GDAM",
      "namaGudang": "GUDANG RUMAH SAKIT ASIA MEDICA",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E6058C4E05490E2BAE58F9D",
      "kodeGudang": "GDES",
      "namaGudang": "GUDANG PT. ERASAKTI WIRAFORESTAMA",
      "kodeKantor": "030600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E6158C4E05490E2BAE58F9D",
      "kodeGudang": "0017",
      "namaGudang": "GUDANG H. SINRING",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E6358C4E05490E2BAE58F9D",
      "kodeGudang": "0021",
      "namaGudang": "LAPANGAN PENIMBUNAN DESA TANJUNG SIMPANG",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E7258C4E05490E2BAE58F9D",
      "kodeGudang": "CYS",
      "namaGudang": "KAWASAN GD. 101-103",
      "kodeKantor": "110100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GP1"
    },
    {
      "idGudangTps": "93F6D5F30E7358C4E05490E2BAE58F9D",
      "kodeGudang": "BDR",
      "namaGudang": "BANDARA SULTAN HASANUDDIN",
      "kodeKantor": "110100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GP2"
    },
    {
      "idGudangTps": "93F6D5F30E7458C4E05490E2BAE58F9D",
      "kodeGudang": "G002",
      "namaGudang": "GROUP 002",
      "kodeKantor": "080100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E7658C4E05490E2BAE58F9D",
      "kodeGudang": "TPP",
      "namaGudang": "TEMPAT PENIMBUNAN PABEAN",
      "kodeKantor": "110100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GP1"
    },
    {
      "idGudangTps": "93F6D5F30E7A58C4E05490E2BAE58F9D",
      "kodeGudang": "IDBI",
      "namaGudang": "BIRINGKASI",
      "kodeKantor": "110100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "GP1"
    },
    {
      "idGudangTps": "93F6D5F30E7C58C4E05490E2BAE58F9D",
      "kodeGudang": "G104",
      "namaGudang": "PANGKALAN SOEKARNO / 104",
      "kodeKantor": "110100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GP1"
    },
    {
      "idGudangTps": "93F6D5F30E8158C4E05490E2BAE58F9D",
      "kodeGudang": "0025",
      "namaGudang": "DERMAGA KAWASAN BERIKAT PT. RSUP",
      "kodeKantor": "021500",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30E8758C4E05490E2BAE58F9D",
      "kodeGudang": "IKPP",
      "namaGudang": "Gudang Impor PT IKPP (Perawang)",
      "kodeKantor": "021200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E8B58C4E05490E2BAE58F9D",
      "kodeGudang": "GDLK",
      "namaGudang": "Gudang di Luar Kawasan Pabean",
      "kodeKantor": "021200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E8C58C4E05490E2BAE58F9D",
      "kodeGudang": "GBTA",
      "namaGudang": "Gudang Penimbunan PT. BTA (Sei Dukuh)",
      "kodeKantor": "021200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30E9658C4E05490E2BAE58F9D",
      "kodeGudang": "TA02",
      "namaGudang": "TPS-TNS SCHENKER PETROLOG U",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30E9B58C4E05490E2BAE58F9D",
      "kodeGudang": "TA10",
      "namaGudang": "TPS-TNS K LINE AIR SERVICE INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30E9C58C4E05490E2BAE58F9D",
      "kodeGudang": "TA11",
      "namaGudang": "TPS-TNS FAJAR INSAN NUSANTARA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30E9E58C4E05490E2BAE58F9D",
      "kodeGudang": "TB01",
      "namaGudang": "TPS-TNS FRITZ LOGISTICS INDONE",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EA158C4E05490E2BAE58F9D",
      "kodeGudang": "TB08",
      "namaGudang": "TPS-TNS UNGGUL CIPTA TRANS",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EB158C4E05490E2BAE58F9D",
      "kodeGudang": "GJAM",
      "namaGudang": "JAMRUD CFS",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GTPS"
    },
    {
      "idGudangTps": "93F6D5F30EB558C4E05490E2BAE58F9D",
      "kodeGudang": "BOGA",
      "namaGudang": "INDOFOOD BOGASARI",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GTPS"
    },
    {
      "idGudangTps": "93F6D5F30EBE58C4E05490E2BAE58F9D",
      "kodeGudang": "BT5B",
      "namaGudang": "DHARMA BANDAR MANDALA (DBM)",
      "kodeKantor": "020400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EC658C4E05490E2BAE58F9D",
      "kodeGudang": "G302",
      "namaGudang": "GUDANG 302",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "BJTI"
    },
    {
      "idGudangTps": "93F6D5F30EC758C4E05490E2BAE58F9D",
      "kodeGudang": "G502",
      "namaGudang": "GUDANG 502",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "BJTI"
    },
    {
      "idGudangTps": "93F6D5F30ECB58C4E05490E2BAE58F9D",
      "kodeGudang": "GPAL",
      "namaGudang": "GUDANG BERIKAT PT. PAL",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "BJTI"
    },
    {
      "idGudangTps": "93F6D5F30ED058C4E05490E2BAE58F9D",
      "kodeGudang": "TPS1",
      "namaGudang": "GUDANG ICT",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "GTPS"
    },
    {
      "idGudangTps": "93F6D5F30ED258C4E05490E2BAE58F9D",
      "kodeGudang": "GIMP",
      "namaGudang": "GUDANG IMPORTIR",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "GTPS"
    },
    {
      "idGudangTps": "93F6D5F30ED958C4E05490E2BAE58F9D",
      "kodeGudang": "0200",
      "namaGudang": "GUDANG LATIHAN",
      "kodeKantor": "130500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EE158C4E05490E2BAE58F9D",
      "kodeGudang": "GPPL",
      "namaGudang": "PANAH PERDANA LOGISINDO",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EE358C4E05490E2BAE58F9D",
      "kodeGudang": "GLFC",
      "namaGudang": "TPS-TNS GLOBAL FREIGHT CONSOLIDATAMA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EEB58C4E05490E2BAE58F9D",
      "kodeGudang": "TUTI",
      "namaGudang": "TPS-UNION TRANS INTERNUSA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30EEF58C4E05490E2BAE58F9D",
      "kodeGudang": "GSRA",
      "namaGudang": "LAP.GRAHA SEGARA",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EF058C4E05490E2BAE58F9D",
      "kodeGudang": "DHAR",
      "namaGudang": "GD. KARTIKA DHARMA BAKTI",
      "kodeKantor": "040200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EF958C4E05490E2BAE58F9D",
      "kodeGudang": "L006",
      "namaGudang": "TPS LAP 006-007 PT. PRIMA NP",
      "kodeKantor": "040100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30EFB58C4E05490E2BAE58F9D",
      "kodeGudang": "GDKP",
      "namaGudang": "GB PT DHARMA KARYA PERDANA",
      "kodeKantor": "040100",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F0158C4E05490E2BAE58F9D",
      "kodeGudang": "MBPU",
      "namaGudang": "PT. MULTI BINA PURA (DP3)",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F0458C4E05490E2BAE58F9D",
      "kodeGudang": "ULIM",
      "namaGudang": "PT. UJUNG LIMA (DP3)",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F0758C4E05490E2BAE58F9D",
      "kodeGudang": "1001",
      "namaGudang": "KBN CAKUNG I",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F0C58C4E05490E2BAE58F9D",
      "kodeGudang": "1006",
      "namaGudang": "KBN CAKUNG VI",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F1758C4E05490E2BAE58F9D",
      "kodeGudang": "1018",
      "namaGudang": "KB DILUAR KBN III",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F1D58C4E05490E2BAE58F9D",
      "kodeGudang": "1024",
      "namaGudang": "GLOBAL SARANA MESIN MANDIRI",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F1E58C4E05490E2BAE58F9D",
      "kodeGudang": "1030",
      "namaGudang": "GB PT EURO MOBILINDO",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F2258C4E05490E2BAE58F9D",
      "kodeGudang": "1034",
      "namaGudang": "MITSUI INDONESIA",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F2758C4E05490E2BAE58F9D",
      "kodeGudang": "1200",
      "namaGudang": "Wilayah Kerja III",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F2858C4E05490E2BAE58F9D",
      "kodeGudang": "1300",
      "namaGudang": "Wilayah Kerja I",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F2C58C4E05490E2BAE58F9D",
      "kodeGudang": "2200",
      "namaGudang": "Wilayah Kerja I",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F2E58C4E05490E2BAE58F9D",
      "kodeGudang": "2400",
      "namaGudang": "Wilayah Kerja I",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F3258C4E05490E2BAE58F9D",
      "kodeGudang": "3300",
      "namaGudang": "Administrasi TPB III-03",
      "kodeKantor": "040400",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F3458C4E05490E2BAE58F9D",
      "kodeGudang": "3500",
      "namaGudang": "Administrasi TPB III-05",
      "kodeKantor": "040400",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F3558C4E05490E2BAE58F9D",
      "kodeGudang": "3600",
      "namaGudang": "Wilayah Kerja II",
      "kodeKantor": "040400",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F3758C4E05490E2BAE58F9D",
      "kodeGudang": "3800",
      "namaGudang": "Wilayah Kerja I",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F4158C4E05490E2BAE58F9D",
      "kodeGudang": "PONS",
      "namaGudang": "PT. PETRO OXO NUSANTARA GRESIK",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G004"
    },
    {
      "idGudangTps": "93F6D5F30F4258C4E05490E2BAE58F9D",
      "kodeGudang": "PWID",
      "namaGudang": "PT. PETROWIDADA GRESIK",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F4358C4E05490E2BAE58F9D",
      "kodeGudang": "PNIK",
      "namaGudang": "PT. PETRONIKA GRESIK",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F4C58C4E05490E2BAE58F9D",
      "kodeGudang": "SMPL",
      "namaGudang": "PT. SUMBER MAS PLYWOOD GRESIK",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F4D58C4E05490E2BAE58F9D",
      "kodeGudang": "KIGS",
      "namaGudang": "KAWASAN INDUSTRI GRESIK",
      "kodeKantor": "070300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F4E58C4E05490E2BAE58F9D",
      "kodeGudang": "ARTW",
      "namaGudang": "PT. ARTAWA GRESIK",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F4F58C4E05490E2BAE58F9D",
      "kodeGudang": "PTSA",
      "namaGudang": "PT. SEMESTARAYA ABADIJAYA",
      "kodeKantor": "070300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F5758C4E05490E2BAE58F9D",
      "kodeGudang": "LAMG",
      "namaGudang": "LAMONGAN SHOREBASE",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30F5F58C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "TPS GABION",
      "kodeKantor": "010700",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F6058C4E05490E2BAE58F9D",
      "kodeGudang": "1014",
      "namaGudang": "GUDANG 102 - 104",
      "kodeKantor": "010700",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F6158C4E05490E2BAE58F9D",
      "kodeGudang": "1059",
      "namaGudang": "GUDANG 105 -109",
      "kodeKantor": "010700",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F6758C4E05490E2BAE58F9D",
      "kodeGudang": "4500",
      "namaGudang": "Hanggar IV-05",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F6958C4E05490E2BAE58F9D",
      "kodeGudang": "4000",
      "namaGudang": "PT. Segara Pacific Maju",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F7158C4E05490E2BAE58F9D",
      "kodeGudang": "8400",
      "namaGudang": "Adm. Impor-02 (TPS Al Amin)",
      "kodeKantor": "040400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F7258C4E05490E2BAE58F9D",
      "kodeGudang": "4900",
      "namaGudang": "Hanggar IV-09",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F7558C4E05490E2BAE58F9D",
      "kodeGudang": "2800",
      "namaGudang": "Hanggar II-08",
      "kodeKantor": "040400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F7A58C4E05490E2BAE58F9D",
      "kodeGudang": "5400",
      "namaGudang": "Wilayah Kerja III",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F8258C4E05490E2BAE58F9D",
      "kodeGudang": "6500",
      "namaGudang": "Administrasi TPB VI-05",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30F8458C4E05490E2BAE58F9D",
      "kodeGudang": "8900",
      "namaGudang": "TPS PT KAWASAN BERIKAT N",
      "kodeKantor": "040400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F9158C4E05490E2BAE58F9D",
      "kodeGudang": "ANGG",
      "namaGudang": "KB PT. ANGGUN INDONESIA",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F9558C4E05490E2BAE58F9D",
      "kodeGudang": "ASTI",
      "namaGudang": "KB. PT. AST INDONESIA",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30F9B58C4E05490E2BAE58F9D",
      "kodeGudang": "DSAM",
      "namaGudang": "DEPO CONTAINER SAMUDERA",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": " "
    },
    {
      "idGudangTps": "93F6D5F30FA458C4E05490E2BAE58F9D",
      "kodeGudang": "GDG2",
      "namaGudang": "GUDANG II",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FA858C4E05490E2BAE58F9D",
      "kodeGudang": "GNU2",
      "namaGudang": "GUDANG NUSANTARA II",
      "kodeKantor": "060100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": " "
    },
    {
      "idGudangTps": "93F6D5F30FB158C4E05490E2BAE58F9D",
      "kodeGudang": "INVS",
      "namaGudang": "TPS. PT. MULTIKARSA INVESTAMA",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FB458C4E05490E2BAE58F9D",
      "kodeGudang": "KBDM",
      "namaGudang": "KAWASAN BERIKAT PT.DAYA MANUNGGAL",
      "kodeKantor": "060100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F30FBE58C4E05490E2BAE58F9D",
      "kodeGudang": "KDHE",
      "namaGudang": "A HESS UJUNG PANGKAH",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30FC158C4E05490E2BAE58F9D",
      "kodeGudang": "GR01",
      "namaGudang": "GROUP GUDANG",
      "kodeKantor": "120100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FC358C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP 001",
      "kodeKantor": "050700",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FD558C4E05490E2BAE58F9D",
      "kodeGudang": "PLPA",
      "namaGudang": "PELINDO III CABANG TANJUNG PERAK",
      "kodeKantor": "070100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GTPS"
    },
    {
      "idGudangTps": "93F6D5F30FD658C4E05490E2BAE58F9D",
      "kodeGudang": "087",
      "namaGudang": "PT. FRANKLIN OFFSHORE INDONESIA PERKASA",
      "kodeKantor": "030300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FDB58C4E05490E2BAE58F9D",
      "kodeGudang": "GD12",
      "namaGudang": "Gudang IKC",
      "kodeKantor": "009000",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "T2"
    },
    {
      "idGudangTps": "93F6D5F30FEE58C4E05490E2BAE58F9D",
      "kodeGudang": "GUCT",
      "namaGudang": "TPS Unggul Cipta Trans",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F30FF358C4E05490E2BAE58F9D",
      "kodeGudang": "GLX",
      "namaGudang": "GALELA",
      "kodeKantor": "120200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FF558C4E05490E2BAE58F9D",
      "kodeGudang": "G004",
      "namaGudang": "Kawasan Petrokimia",
      "kodeKantor": "070300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FFA58C4E05490E2BAE58F9D",
      "kodeGudang": "BUST",
      "namaGudang": "Bandar Udara Sultan Thaha",
      "kodeKantor": "030600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F30FFF58C4E05490E2BAE58F9D",
      "kodeGudang": "CKPL",
      "namaGudang": "CONT KARANA PANORAMA LOGISTIK",
      "kodeKantor": "070100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GMSI"
    },
    {
      "idGudangTps": "93F6D5F3100558C4E05490E2BAE58F9D",
      "kodeGudang": "GAM1",
      "namaGudang": "TPS PT GLOBAL ANINDYA MATARAM",
      "kodeKantor": "080200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3100858C4E05490E2BAE58F9D",
      "kodeGudang": "0040",
      "namaGudang": "GUDANG SUPRIYADI, PARIT 8 SUNGAI GUNTUNG",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3100B58C4E05490E2BAE58F9D",
      "kodeGudang": "TKB1",
      "namaGudang": "TANGKI B MILIK PT. ASPAL MUTUAL SARANA",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3101658C4E05490E2BAE58F9D",
      "kodeGudang": "GFCS",
      "namaGudang": "HANGGAR BANDARA HASANUDDIN",
      "kodeKantor": "110100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3103058C4E05490E2BAE58F9D",
      "kodeGudang": "05",
      "namaGudang": "luar lokasi pabean",
      "kodeKantor": "120200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3103258C4E05490E2BAE58F9D",
      "kodeGudang": "0004",
      "namaGudang": "AMURANG",
      "kodeKantor": "111200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "001"
    },
    {
      "idGudangTps": "93F6D5F3103558C4E05490E2BAE58F9D",
      "kodeGudang": "0001",
      "namaGudang": "GUDANG KPC",
      "kodeKantor": "101000",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3103758C4E05490E2BAE58F9D",
      "kodeGudang": "GR1",
      "namaGudang": "GRUP 1",
      "kodeKantor": "060700",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3103958C4E05490E2BAE58F9D",
      "kodeGudang": "039",
      "namaGudang": "GUDANG IMPORTIR PT. BASUKI ADIKA PUTRA",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3103C58C4E05490E2BAE58F9D",
      "kodeGudang": "G102",
      "namaGudang": "GUDANG 102",
      "kodeKantor": "011500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3104258C4E05490E2BAE58F9D",
      "kodeGudang": "SNK",
      "namaGudang": "SIANAK",
      "kodeKantor": "100900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "NNK"
    },
    {
      "idGudangTps": "93F6D5F3104358C4E05490E2BAE58F9D",
      "kodeGudang": "M01",
      "namaGudang": "Matak Base",
      "kodeKantor": "020500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3104658C4E05490E2BAE58F9D",
      "kodeGudang": "0001",
      "namaGudang": "GUDANG IMPORTIR",
      "kodeKantor": "111200",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "001"
    },
    {
      "idGudangTps": "93F6D5F3104858C4E05490E2BAE58F9D",
      "kodeGudang": "G02",
      "namaGudang": "GRUP 2",
      "kodeKantor": "111300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3105458C4E05490E2BAE58F9D",
      "kodeGudang": "GRSU",
      "namaGudang": "JL. PALMA NO.157,KOTA BARAT,GORONTALO,SULUT",
      "kodeKantor": "111300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G02"
    },
    {
      "idGudangTps": "93F6D5F3105C58C4E05490E2BAE58F9D",
      "kodeGudang": "LBIR",
      "namaGudang": "Gudang Bima Reksi",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3106058C4E05490E2BAE58F9D",
      "kodeGudang": "G757",
      "namaGudang": "Gudang PT. Bintang 757",
      "kodeKantor": "130100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GBNA"
    },
    {
      "idGudangTps": "93F6D5F3106658C4E05490E2BAE58F9D",
      "kodeGudang": "C028",
      "namaGudang": "PT. YIN HWA INDONESIA",
      "kodeKantor": "050400",
      "jenisGudang": "6",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3106958C4E05490E2BAE58F9D",
      "kodeGudang": "PKHY",
      "namaGudang": "SITE PROJECT PELABUHAN KAYANGAN",
      "kodeKantor": "080300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3106D58C4E05490E2BAE58F9D",
      "kodeGudang": "T01",
      "namaGudang": "GD PT GADING MAS INDAH",
      "kodeKantor": "080200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3106E58C4E05490E2BAE58F9D",
      "kodeGudang": "CBW",
      "namaGudang": "CELUKAN BAWANG",
      "kodeKantor": "080200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3106F58C4E05490E2BAE58F9D",
      "kodeGudang": "GPSK",
      "namaGudang": "GUDANG PT SOSRO KEMENUH GIAMYAR",
      "kodeKantor": "080200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3107158C4E05490E2BAE58F9D",
      "kodeGudang": "TPI",
      "namaGudang": "Tempat Penimbunan Importir",
      "kodeKantor": "120200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3107358C4E05490E2BAE58F9D",
      "kodeGudang": "001",
      "namaGudang": "PLTU BELANGBELANG",
      "kodeKantor": "110300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3107958C4E05490E2BAE58F9D",
      "kodeGudang": "054",
      "namaGudang": "gudang importir",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3108058C4E05490E2BAE58F9D",
      "kodeGudang": "BRAU",
      "namaGudang": "BERAU",
      "kodeKantor": "100800",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3108158C4E05490E2BAE58F9D",
      "kodeGudang": "TTU",
      "namaGudang": "TERMINAL TRANSIT UTAMA",
      "kodeKantor": "070400",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GDSI"
    },
    {
      "idGudangTps": "93F6D5F3108B58C4E05490E2BAE58F9D",
      "kodeGudang": "063",
      "namaGudang": "GUDANG IMPORTIR PT AGANSA PRIMATAMA",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3108F58C4E05490E2BAE58F9D",
      "kodeGudang": "064",
      "namaGudang": "GUDANG IMPORTIR PT. BINA SARANA SEJATI",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3109458C4E05490E2BAE58F9D",
      "kodeGudang": "GPEB",
      "namaGudang": "GUDANG PEBPI SIAK SRI INDRAPURA",
      "kodeKantor": "021200",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3109A58C4E05490E2BAE58F9D",
      "kodeGudang": "STNI",
      "namaGudang": "GUDANG BANDARA SENTANI",
      "kodeKantor": "120600",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310A158C4E05490E2BAE58F9D",
      "kodeGudang": "GTPP",
      "namaGudang": "TPPI",
      "kodeKantor": "070400",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GDSI"
    },
    {
      "idGudangTps": "93F6D5F310A658C4E05490E2BAE58F9D",
      "kodeGudang": "TPI",
      "namaGudang": "TEMPAT PENIMBUNAN IMPORTIR",
      "kodeKantor": "110600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310A858C4E05490E2BAE58F9D",
      "kodeGudang": "LPA1",
      "namaGudang": "Gudang Patra Dock GD A1",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310A958C4E05490E2BAE58F9D",
      "kodeGudang": "AM1A",
      "namaGudang": "Amris Batam Semen 01 A",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F310AC58C4E05490E2BAE58F9D",
      "kodeGudang": "AM2B",
      "namaGudang": "Amris Batam Semen 02 B",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F310B358C4E05490E2BAE58F9D",
      "kodeGudang": "WTJN",
      "namaGudang": "Tarjun",
      "kodeKantor": "100200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310B658C4E05490E2BAE58F9D",
      "kodeGudang": "TB01",
      "namaGudang": "Tanjung Balai Karimun",
      "kodeKantor": "020100",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F310B858C4E05490E2BAE58F9D",
      "kodeGudang": "TK01",
      "namaGudang": "Tangki Penimbunan Aspal Lombok",
      "kodeKantor": "080300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F310B958C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "GROUP 001",
      "kodeKantor": "020100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310BF58C4E05490E2BAE58F9D",
      "kodeGudang": "058",
      "namaGudang": "GUDANG IMPORTIR CV. VARIA GEMILANG",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310C258C4E05490E2BAE58F9D",
      "kodeGudang": "G01",
      "namaGudang": "GRUP 1",
      "kodeKantor": "111300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310C358C4E05490E2BAE58F9D",
      "kodeGudang": "TPSU",
      "namaGudang": "GROUP GUDANG PSU",
      "kodeKantor": "070100",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310C858C4E05490E2BAE58F9D",
      "kodeGudang": "G022",
      "namaGudang": "PT. JAWAMANIS RAFINASI",
      "kodeKantor": "050400",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310D358C4E05490E2BAE58F9D",
      "kodeGudang": "T202",
      "namaGudang": "PT JAKARTA TANK TERMINAL",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "GFCL"
    },
    {
      "idGudangTps": "93F6D5F310D458C4E05490E2BAE58F9D",
      "kodeGudang": "TPM",
      "namaGudang": "TANKI PERTAMINA",
      "kodeKantor": "160700",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310DA58C4E05490E2BAE58F9D",
      "kodeGudang": "CVJI",
      "namaGudang": "GUDANG CV. JASMINE INDAH",
      "kodeKantor": "030600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310DD58C4E05490E2BAE58F9D",
      "kodeGudang": "074",
      "namaGudang": "Gudang Importir PT. SENA",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310E258C4E05490E2BAE58F9D",
      "kodeGudang": "SENI",
      "namaGudang": "SENIPAH",
      "kodeKantor": "100300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "DAL"
    },
    {
      "idGudangTps": "93F6D5F310E658C4E05490E2BAE58F9D",
      "kodeGudang": "102",
      "namaGudang": "Diluar Kawasan Pabean",
      "kodeKantor": "090900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310E958C4E05490E2BAE58F9D",
      "kodeGudang": "GDAS",
      "namaGudang": "GUDANG PT ASIA SAWIT LESTARI",
      "kodeKantor": "030600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F310ED58C4E05490E2BAE58F9D",
      "kodeGudang": "KDRI",
      "namaGudang": "GD. MOROSI KONAWE",
      "kodeKantor": "110600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "TPI"
    },
    {
      "idGudangTps": "93F6D5F310F758C4E05490E2BAE58F9D",
      "kodeGudang": "GKID",
      "namaGudang": "Gudang GKID Pelintung",
      "kodeKantor": "020900",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F310F858C4E05490E2BAE58F9D",
      "kodeGudang": "GNBF",
      "namaGudang": "Gudang NBF",
      "kodeKantor": "020900",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F310F958C4E05490E2BAE58F9D",
      "kodeGudang": "GPTM",
      "namaGudang": "Gudang Pertamina",
      "kodeKantor": "020900",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F310FA58C4E05490E2BAE58F9D",
      "kodeGudang": "GSDS",
      "namaGudang": "Gudang PT. SDS Lubuk Gaung",
      "kodeKantor": "020900",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F310FE58C4E05490E2BAE58F9D",
      "kodeGudang": "LRRD",
      "namaGudang": "Gudang Ring Road",
      "kodeKantor": "020900",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F3110258C4E05490E2BAE58F9D",
      "kodeGudang": "002",
      "namaGudang": "KAWASAN PABEAN GARONGKONG",
      "kodeKantor": "110300",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3110758C4E05490E2BAE58F9D",
      "kodeGudang": "GALF",
      "namaGudang": "GUDANG ALFATA",
      "kodeKantor": "130500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3110858C4E05490E2BAE58F9D",
      "kodeGudang": "PGR2",
      "namaGudang": "PT. DOK PANTAI LAMONGAN",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G005"
    },
    {
      "idGudangTps": "93F6D5F3110958C4E05490E2BAE58F9D",
      "kodeGudang": "SBG",
      "namaGudang": "SEMBAKUNG",
      "kodeKantor": "100900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3110C58C4E05490E2BAE58F9D",
      "kodeGudang": "BWX",
      "namaGudang": "BANDARA BLIMBINGSARI",
      "kodeKantor": "160700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3110D58C4E05490E2BAE58F9D",
      "kodeGudang": "CIS1",
      "namaGudang": "TPS CARDIG INTERNASIONAL SUPPORT",
      "kodeKantor": "040400",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G003"
    },
    {
      "idGudangTps": "93F6D5F3111158C4E05490E2BAE58F9D",
      "kodeGudang": "KIAS",
      "namaGudang": "PT. KARYAINDAH ALAM SEJAHTERA",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3111958C4E05490E2BAE58F9D",
      "kodeGudang": "JAT1",
      "namaGudang": "LAP. PENIMBUNAN MUARA JATI I",
      "kodeKantor": "050700",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3112E58C4E05490E2BAE58F9D",
      "kodeGudang": "GATI",
      "namaGudang": "GHITA AVIA TRANS",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3113358C4E05490E2BAE58F9D",
      "kodeGudang": "SBU",
      "namaGudang": "SEBAUNG",
      "kodeKantor": "100900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3113758C4E05490E2BAE58F9D",
      "kodeGudang": "KBPI",
      "namaGudang": "PT KARYA BAKTI PERSADA CARGO",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F3113B58C4E05490E2BAE58F9D",
      "kodeGudang": "LUV",
      "namaGudang": "TUAL",
      "kodeKantor": "121000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3113F58C4E05490E2BAE58F9D",
      "kodeGudang": "01",
      "namaGudang": "SINAR JAYA WIJAYA",
      "kodeKantor": "120900",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "01"
    },
    {
      "idGudangTps": "93F6D5F3114058C4E05490E2BAE58F9D",
      "kodeGudang": "02",
      "namaGudang": "SINAR WIJAYA PLYWOOD INDUSTRIES",
      "kodeKantor": "120900",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "02"
    },
    {
      "idGudangTps": "93F6D5F3114358C4E05490E2BAE58F9D",
      "kodeGudang": "G009",
      "namaGudang": "PELABUHAN NAMLEA",
      "kodeKantor": "120100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3114558C4E05490E2BAE58F9D",
      "kodeGudang": "LBR4",
      "namaGudang": "GUDANG BIMA REKSI 04",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F3114858C4E05490E2BAE58F9D",
      "kodeGudang": "DPLI",
      "namaGudang": "PT. PACIFIC LUBRITAMA INDONESIA",
      "kodeKantor": "050400",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3114B58C4E05490E2BAE58F9D",
      "kodeGudang": "TPKA",
      "namaGudang": "TERMINAL PENUMPUKAN KALIANGET",
      "kodeKantor": "070200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3115E58C4E05490E2BAE58F9D",
      "kodeGudang": "BAM",
      "namaGudang": "PT BANGUN ARTA MINERAL",
      "kodeKantor": "071200",
      "jenisGudang": "8",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3115F58C4E05490E2BAE58F9D",
      "kodeGudang": "GRHA",
      "namaGudang": "TPFT GRAHA, JICT, KOJA",
      "kodeKantor": "040300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3116058C4E05490E2BAE58F9D",
      "kodeGudang": "GUEL",
      "namaGudang": "GUDANG TPS PT. UNIVERSAL EKSPRES LOGISTINDO",
      "kodeKantor": "080100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    },
    {
      "idGudangTps": "93F6D5F3116658C4E05490E2BAE58F9D",
      "kodeGudang": "082",
      "namaGudang": "GUDANG IMPORTIR",
      "kodeKantor": "030300",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3116758C4E05490E2BAE58F9D",
      "kodeGudang": "LPGB",
      "namaGudang": "LAPANGAN PULAU GEBE",
      "kodeKantor": "120200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3117158C4E05490E2BAE58F9D",
      "kodeGudang": "0037",
      "namaGudang": "GUDANG MARLIS, PARIT 8 SUNGAI GUNTUNG",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3117458C4E05490E2BAE58F9D",
      "kodeGudang": "DMG3",
      "namaGudang": "DERMAGA 3 PT PELINDO IV TERMINAL PETIKEMAS BITUNG",
      "kodeKantor": "111100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3117C58C4E05490E2BAE58F9D",
      "kodeGudang": "BT11",
      "namaGudang": "TELUK SENIMBA",
      "kodeKantor": "020400",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3117E58C4E05490E2BAE58F9D",
      "kodeGudang": "TUC2",
      "namaGudang": "PT UNICHEMCANDI INDONESIA",
      "kodeKantor": "070300",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3118458C4E05490E2BAE58F9D",
      "kodeGudang": "SMR",
      "namaGudang": "SUNGAI MANURUNG",
      "kodeKantor": "100900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3118658C4E05490E2BAE58F9D",
      "kodeGudang": "GDJT",
      "namaGudang": "WAHANA DIRGANTARA INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3118758C4E05490E2BAE58F9D",
      "kodeGudang": "GD3",
      "namaGudang": "PLBN MOTAMASIN",
      "kodeKantor": "081400",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3118C58C4E05490E2BAE58F9D",
      "kodeGudang": "FM01",
      "namaGudang": "PT. FM GLOBAL LOGISTICS",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3118E58C4E05490E2BAE58F9D",
      "kodeGudang": "G001",
      "namaGudang": "TANGKI TIMBUN MTP",
      "kodeKantor": "011300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3119158C4E05490E2BAE58F9D",
      "kodeGudang": "0033",
      "namaGudang": "GUDANG H.YAHYA KUALA ENOK",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3119358C4E05490E2BAE58F9D",
      "kodeGudang": "LMS8",
      "namaGudang": "Gudang Margasarana 08",
      "kodeKantor": "020900",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "G002"
    },
    {
      "idGudangTps": "93F6D5F3119A58C4E05490E2BAE58F9D",
      "kodeGudang": "HAVJ",
      "namaGudang": "HANGGAR ADVENTIST AVIATION JAYAPURA",
      "kodeKantor": "120600",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3119C58C4E05490E2BAE58F9D",
      "kodeGudang": "OKPP",
      "namaGudang": "OKI PULP & PAPER",
      "kodeKantor": "030100",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G005"
    },
    {
      "idGudangTps": "93F6D5F3119F58C4E05490E2BAE58F9D",
      "kodeGudang": "GR2",
      "namaGudang": "gudang mpcy",
      "kodeKantor": "060700",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311A058C4E05490E2BAE58F9D",
      "kodeGudang": "GKPL",
      "namaGudang": "GUDANG KARANA PANORAMA LOGISTIK",
      "kodeKantor": "070100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GMSI"
    },
    {
      "idGudangTps": "93F6D5F311A358C4E05490E2BAE58F9D",
      "kodeGudang": "NFII",
      "namaGudang": "PT NAKU FREIGHT INDONESIA",
      "kodeKantor": "050100",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311A758C4E05490E2BAE58F9D",
      "kodeGudang": "KTMT",
      "namaGudang": "KUALA TANJUNG MULTIPURPOSE TERMINAL",
      "kodeKantor": "011200",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311AA58C4E05490E2BAE58F9D",
      "kodeGudang": "GLSW",
      "namaGudang": "GUDANG LHOKSEUMAWE",
      "kodeKantor": "130500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311B458C4E05490E2BAE58F9D",
      "kodeGudang": "EN67",
      "namaGudang": "RIG ENSCO 67",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311B658C4E05490E2BAE58F9D",
      "kodeGudang": "GLK",
      "namaGudang": "Gudang Luar Kawasan Pabean",
      "kodeKantor": "030500",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311C558C4E05490E2BAE58F9D",
      "kodeGudang": "GDAT",
      "namaGudang": "Gudang Timbun Agro Tradisi",
      "kodeKantor": "070300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311C758C4E05490E2BAE58F9D",
      "kodeGudang": "PSBG",
      "namaGudang": "Gudang Kantor Pos Sabang",
      "kodeKantor": "130300",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311C958C4E05490E2BAE58F9D",
      "kodeGudang": "SSSC",
      "namaGudang": "SURYA SEKAWAN SEJAHTERA",
      "kodeKantor": "070100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GMSI"
    },
    {
      "idGudangTps": "93F6D5F311CC58C4E05490E2BAE58F9D",
      "kodeGudang": "T.92",
      "namaGudang": "TANGKI TIMBUN PERTAMAX",
      "kodeKantor": "050700",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311CE58C4E05490E2BAE58F9D",
      "kodeGudang": "0005",
      "namaGudang": "GUDANG PT. CONCH NORTH SULAWESI",
      "kodeKantor": "111200",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "T",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311D158C4E05490E2BAE58F9D",
      "kodeGudang": "NCT1",
      "namaGudang": "NEW PORT CONTAINER TERMINAL ONE",
      "kodeKantor": "040300",
      "jenisGudang": "2",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "LCL"
    },
    {
      "idGudangTps": "93F6D5F311D658C4E05490E2BAE58F9D",
      "kodeGudang": "0032",
      "namaGudang": "PT. SUMATRA TIMURINDONESIA",
      "kodeKantor": "021500",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311D858C4E05490E2BAE58F9D",
      "kodeGudang": "CMBA",
      "namaGudang": "MBA CONTAINER",
      "kodeKantor": "070100",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "GIJS"
    },
    {
      "idGudangTps": "93F6D5F311E058C4E05490E2BAE58F9D",
      "kodeGudang": "01",
      "namaGudang": "KANTOR POS",
      "kodeKantor": "070600",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311EB58C4E05490E2BAE58F9D",
      "kodeGudang": "G005",
      "namaGudang": "Luar Kawasan Pabean",
      "kodeKantor": "070300",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311EC58C4E05490E2BAE58F9D",
      "kodeGudang": "LWBN",
      "namaGudang": "LAPANGAN WEDA BAY NICKEL",
      "kodeKantor": "120200",
      "jenisGudang": "0",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311F158C4E05490E2BAE58F9D",
      "kodeGudang": "090",
      "namaGudang": "Perairan Sungailiat",
      "kodeKantor": "030300",
      "jenisGudang": "3",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311F558C4E05490E2BAE58F9D",
      "kodeGudang": "DWI1",
      "namaGudang": "TPS Banok Indah Lestari",
      "kodeKantor": "092000",
      "jenisGudang": "null",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F311F858C4E05490E2BAE58F9D",
      "kodeGudang": "POS",
      "namaGudang": "PT. POS INDONESIA (PERSERO)",
      "kodeKantor": "010100",
      "jenisGudang": "5",
      "idPengguna": "null",
      "flagAktif": "null",
      "grupGudang": "null"
    },
    {
      "idGudangTps": "93F6D5F3120358C4E05490E2BAE58F9D",
      "kodeGudang": "TPB1",
      "namaGudang": "TPS Banjarmasin",
      "kodeKantor": "100100",
      "jenisGudang": "1",
      "idPengguna": "null",
      "flagAktif": "Y",
      "grupGudang": "G001"
    }
  ],
  "total": 1714
}],
  loading: false,
  current_data: {},
  form: null,
  processed_data: null,
  date: new Date()
}

const headers = {'Content-Type':'application/json',
'beacukai-api-key':process.env.REACT_APP_REFERENSI_GRAVITEE_TOKEN};

export function setCurrentGudangTps(data) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_CURRENT_GUDANG_TPS',
      payload: data
    })
  }
}

export function resetGudangTps(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'RESET_GUDANG_TPS',
      payload: null
    })
  }
}

export function setFormTingkatIp(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_FORM_GUDANG_TPS',
      payload: bool
    })
  }
}

export function getSearchGudangTps(kata = null) {

  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI_API_URL + '/v1/gudangTps/ByKodeKantor/'+kata

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
      type: 'SET_LOADING_GUDANG_TPS',
      payload: true
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_GUDANG_TPS',
          payload: false
        })
        dispatch({
          type: 'SET_GUDANG_TPS',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_GUDANG_TPS',
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
            type: 'SET_LOADING_GUDANG_TPS',
            payload: false
          })
          dispatch({
            type: 'SET_GUDANG_TPS',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_GUDANG_TPS',
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

export function getGudangTps(id = null) {
  
  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI_API_URL + '/v1/gudangTps/all'

    if (id) {
      url = process.env.REACT_APP_REFERENSI_API_URL + '/v1/gudangTps/'+ id
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
      type: 'SET_LOADING_GUDANG_TPS',
      payload: true
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_GUDANG_TPS',
          payload: false
        })
        dispatch({
          type: 'SET_GUDANG_TPS',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_GUDANG_TPS',
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
            type: 'SET_LOADING_GUDANG_TPS',
            payload: false
          })
          dispatch({
            type: 'SET_GUDANG_TPS',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_GUDANG_TPS',
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

export default function gudang_tps(state = initialState, action) {

  switch (action.type) {

    case 'SET_GUDANG_TPS':

    return update(state, {
      response: {
        $set: action.payload
      },
      processed_data: {
        $set: null
      },

    })

    case 'RESET_GUDANG_TPS':

    return update(state, {
      current_data: {
        $set: null
      },
      processed_data: {
        $set: null
      },

    })

    case 'SET_CURRENT_GUDANG_TPS':

    return update(state, {
      current_data: {
        $set: action.payload
      },

    })

    case 'SET_PROCESSED_GUDANG_TPS':

    return update(state, {
      processed_data: {
        $set: action.payload
      },

    })

    case 'SET_LOADING_GUDANG_TPS':

    return update(state, {
      loading: {
        $set: action.payload
      },

    })

    case 'SET_FORM_GUDANG_TPS':

    return update(state, {
      form: {
        $set: action.payload
      },

    })

    default:

    return state

  }

}
