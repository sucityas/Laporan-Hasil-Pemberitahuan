import {getUser} from './utils/DataUser';
import {makeid, removeInvalidValue} from 'utils/function';
import {getKantorLengkap, getToday} from 'utils/GetValueData';
import axiosInstance from 'configs/axiosConfig';
import moment from 'moment';
import {message} from 'antd';
import { browseDataPegawai } from './get';
import Axios from 'axios';

const randomId = makeid(5);
const user = getUser();
const kantor = getKantorLengkap(getUser().kodeKantor);
const today = getToday();

// Post dokumen header
export const postHeader = ({
  nomorDokumen = "",
  kodeDokumen,
  kodeKategori,
  values = { klasifikasiDokumen: undefined, sifatDokumen: undefined },
  isEdit = false,
  idHeader = "",
  tanggalDokumen = "",
  flagAktif = "Y",
  flagAdendum = "",
  nipPenerbit = "",
  namaPenerbit = "",
  kotaTandaTangan = "",
  jabatanPenerbit = "",
  pangkatGolonganPenerbit = "",
  waktuRekam = "",
  kodeProses = "",
  nipRekam = "",
  flagPrsetujuan1 = '',
  flagPersetujuan2 = '',
  flagPersetujuan3 = '',
  flagTerbit = '',
  filePdf = '',
  namaPenyusun = '',
  nipPenyusun = ''
}) =>
  new Promise((resolve, reject) => {
    let url = "/post-return/header";
    // if (isEdit) {
    //   url = "dokumen/update/header";
    // }

    let payload = {
      alamatKantor: getKantorLengkap(getUser().kodeKantor).alamat1, //login
      flagAktif,
      flagAdendum: flagAdendum ? flagAdendum : undefined,
      flagPrsetujuan1,
      flagPersetujuan2,
      flagPersetujuan3,
      flagTerbit,
      idHeader: isEdit ? idHeader : undefined,
      // idPersetujuan1: 0,
      // idPersetujuan2: 0,
      jabatanPenerbit,
      keterangan: "",
      klasifikasi: values.klasifikasiDokumen !== undefined ? values.klasifikasiDokumen : "",
      kodeDokumen,
      kodeKantor: getUser().kodeKantor, //login
      kodeKategori,
      kodeProses,
      kotaTandaTangan,
      namaKantor: getKantorLengkap(getUser().kodeKantor).namaKantorPanjang, //login
      namaPenerbit,
      nipPenerbit,
      nipRekam: nipRekam ? nipRekam : getUser().nip, //login or jika sudah ada tidak dapat diubah
      nipUpdate: getUser().nip, //login
      nomorDokumen,
      pangkatGolonganPenerbit,
      sifat: values.sifatDokumen !== undefined ? values.sifatDokumen : "",
      tanggalDokumen,
      // waktuRekam: isEdit && waktuRekam ? waktuRekam != 'null' ? moment(waktuRekam).format() : moment().format() : flagAktif === "N" ? null :  moment().format(),
      // waktuTandaTangan: '',
      // waktuUpdate: moment().format(),
      filePdf,
      namaPenyusun: getUser().namaPegawai,
      nipPenyusun: getUser().nip
    }
    
    axiosInstance
      .post(url, removeInvalidValue(payload))
      .then((res) => {
        if (isEdit) {
          resolve(idHeader);
        } else {
          resolve(res.data.data.id_header);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

export const postDokumen = (url, payload, isUpdate = false) =>
  new Promise((resolve, reject) => {
    const loadingInsertDokumen = message.loading(`Sedang ${isUpdate ? "Update" : "membuat"} data dokumen..`, 0);
    axiosInstance
      .post(url, removeInvalidValue(payload))
      .then((res) => {
        message.success(`Berhasil ${isUpdate ? "Update" : "membuat"} data dokumen`);
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        message.error(`Gagal ${isUpdate ? 'Update' : 'membuat'} data dokumen, silahkan coba lagi nanti`);
        reject(err);
      })
      .finally(() => setTimeout(loadingInsertDokumen, 0));
  });

export const postApproval = ({
  dataHeader = {},
  flagPrsetujuan1 = '',
  flagPersetujuan2 = '',
  flagPersetujuan3 = '',
  flagTerbit = '',
  kodeProses = '',
  keterangan = ''
}) =>
  new Promise(async(resolve, reject) => {
    const loadingApproval = message.loading('Sedang melakukan approval dokumen');
    try {
      const headerPayload = removeInvalidValue(dataHeader)

      // Update Flag
      await axiosInstance
        // .post('dokumen/update/header', removeInvalidValue({
        .post('/post-return/header', removeInvalidValue({
          ...headerPayload,
          flagPrsetujuan1: !flagPrsetujuan1 ? headerPayload.flagPersetujuan1 : flagPrsetujuan1,
          flagPersetujuan2: !flagPersetujuan2 ? headerPayload.flagPersetujuan2 : flagPersetujuan2,
          flagPersetujuan3: !flagPersetujuan3 ? headerPayload.flagPersetujuan3 : flagPersetujuan3,
          flagTerbit: !flagTerbit ? headerPayload.flagTerbit : flagTerbit,
          kodeProses: !kodeProses ? headerPayload.kodeProses : kodeProses,
          waktuTandaTangan: moment(headerPayload.waktuTandaTangan).isValid() ? moment(headerPayload.waktuTandaTangan) : '',
          // waktuRekam: moment(headerPayload.waktuRekam).isValid() ? moment(headerPayload.waktuRekam) : '',
          // waktuUpdate: moment(headerPayload.waktuUpdate).isValid() ? moment(headerPayload.waktuUpdate) : ''
        }))

      // Update TdPersetujuan
      await axiosInstance
        .post('/post/approval-process', {
          catatan: keterangan,
          flagPersetujuan: flagPrsetujuan1 ? flagPrsetujuan1 : flagPersetujuan2 ? flagPersetujuan2 : flagPersetujuan3 ? flagPersetujuan3 : null,
          idHeader: headerPayload.idHeader,
          seri: flagPrsetujuan1 ? 1 : flagPersetujuan2 ? 2 : flagPersetujuan3 ? 3 : null
        })

        // Kondisi jika dokumen terbit
        if(flagTerbit === 'Y'){
          // Get data penerbit
          const penerbit = await browseDataPegawai({
            input: headerPayload.nipPenerbit
          })
    
          // Generate docs number
          if(!headerPayload.nomorDokumen){
            await generateNomorDokumen({
              idHeader: headerPayload.idHeader,
              kodeDokumen: headerPayload.kodeDokumen,
              kodeKantor: headerPayload.kodeKantor,
              kodeUnitOrganisasi: penerbit[0].kdUnitOrganisasi,
              nomorAgenda: penerbit[0].kodeSurat,
              tahun: new Date().getFullYear(),
              tipe: ''
            })
          }
        }

        resolve()
    } catch (error) {
      reject(error)
      message.error('Gagal melakukan approval dokumen, silahkan coba lagi nanti !')
    }finally{
      setTimeout(loadingApproval, 0)
    }
  });

  export const getElasticDoc = (payload) =>
  new Promise((resolve, reject) => {
    const url = "https://apisdev-gw.beacukai.go.id/kln-service/kln-service/elastic/document"
    const headers = {
      'beacukai-api-key': process.env.REACT_APP_API_CASE_MANAGEMENT_SECRET_KEY
    }
    Axios.post(url, payload, { headers })
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
  
  export const postApproverDokumen = ({
    idHeader,
    dataApprover,
    dataPenerbit,
    alurApprover,
    edit
  }) => new Promise((resolve, reject) => {
    let payloadPersetujuan = []
    const user = getUser()
    const today = getToday()
    // const alurApprover = ['APPROVAL', 'PENERBIT']
    if(alurApprover.length === 0){
      alurApprover = ['APPROVAL', 'PENERBIT']
    }

    alurApprover.map((alur, i) => {
      if(alur === "PENERBIT"){
        payloadPersetujuan.push({
          ...dataPenerbit,
          flagTtd: !dataPenerbit.flagTtd ? 'N' : 'Y',
          idHeader,
          catatan: '',
          flagPersetujuan: '',
          nipRekam: user.nip,
          nipUpdate: user.nip,
          waktuRekam: undefined,
          waktuUpdate: undefined,
          jenisPersetujuan: '',
          keputusan: '',
          keterangan: '',
          persetujuan: undefined,
          tipe: alur,
          seri: ''
        })
      }else if(alur === "APPROVAL"){
        dataApprover.map((e) => {
          payloadPersetujuan.push({
          ...e,
          flagTtd: !e.flagTtd ? 'N' : 'Y',
          idHeader,
          catatan: '',
          flagPersetujuan: '',
          nipRekam: user.nip,
          nipUpdate: user.nip,
          waktuRekam: undefined,
          waktuUpdate: undefined,
          jenisPersetujuan: '',
          keputusan: '',
          keterangan: '',
          persetujuan: undefined,
          tipe: alur,
          seri: ''
        })})
      }
    })

    payloadPersetujuan.map((e, i) => {
      if(i === 0){
        e.flagApprovalAktif = '1'
      }
      e.seri = `${i + 1}`
      removeInvalidValue(e)
    })

    axiosInstance.post('/post-return/tdPersetujuan', payloadPersetujuan)
    .then(() => resolve())
    .catch(() => reject())
  })

  export const postPersetujuanAlur = (approver, kodeDokumen, kodeKantor) => new Promise((resolve, reject) => {
    const loadingPostPersetujuan = message.loading('Sedang memproses data...')
    let payload = []
    approver.map((e, i) => {
      // if(e.nip){
        payload.push(
          removeInvalidValue({
            idPersetujuanAlur: !e.id ? undefined : e.id,
            currKodeJabatanApprover: '',
            currKodeProses: '',
            flagSelesai: "",
            kodeDokumen,
            kodeKantor,
            nipApprover: e.nip,
            namaApprover: e.nama,
            jabatanApprover: e.jabatan,
            pangkatGolongan: e.pangkat,
            nextKodeJabatanApprover: '',
            nextKodeProses: '',
            seri: i + 1,
            nipRekam: !e.id ? e.nipRekam : getUser().nip,
            nipUpdate: getUser().nip,
          })
        )
      // }
    })
    axiosInstance.post('/post-return/persetujuan-alur', {
      tdPersetujuanAlurList: payload
    })
    .then(res => {
      // console.log(res)
      if(res.data.status === false){
        message.info('Data sudah tersedia')
        reject()
      }else{
        message.success('Berhasil memproses data !')
        resolve(res)
      }
    })
    .catch(err => {
      message.error('Gagal memproses data, silahkan coba lagi nanti !')
      reject(err)
    })
    .finally(() => setTimeout(loadingPostPersetujuan, 0))
  }) 

  export const postPenerima =({
    idHeader,
    dataPenerima,
    edit
  }) => new Promise((resolve, reject) => {
    axiosInstance.post('/post-return/penerima', {
      idHeader,
      jabatan: dataPenerima.jabatan,
      kodeKategoriInstansi: null,
      nama: dataPenerima.nama,
      nip: dataPenerima.nip,
      nipRekam: edit ? dataPenerima.nipRekam : getUser().nip,
      nipUpdate: getUser().nip,
      status: null,
      // waktuRekam: edit ? dataPenerima.waktuRekam : today,
      // waktuUpdate: today
    })
    .then(res => resolve(res))
    .catch(err => reject(err))
  })

  export const postInformasi = ({
    idHeader,
    informasi,
    edit
  }) => new Promise((resolve, reject) => {
    const insertInformasi = informasi.map((e) => {
      if(e.informasi){
        axiosInstance.post('/post-return/tdinformasi', {
          idHeader,
          informasi: e.informasi,
          kodeSumber: null,
          kodeValiditas: null,
          nipRekam: edit ? e.nipRekam : getUser().nip,
          nipUpdate: getUser().nip,
          // waktuRekam: edit ? e.waktuRekam : today,
          // waktuUpdate: today
        })
      }
    })

    Promise.allSettled(insertInformasi)
    .then(res => resolve(res))
    .catch(err => reject(err))
  })

  export const generateNomorDokumen = ({
    idHeader = undefined,
    kodeDokumen = '',
    kodeKantor = '',
    kodeUnitOrganisasi = '',
    nomorAgenda = '',
    tahun = new Date().getFullYear(),
    tipe = ''
  }) => new Promise((resolve, reject) => {
    axiosInstance.post('/post/generateNoDokumen', {}, {
      params: {
        idHeader,
        kodeDokumen,
        kodeKantor,
        kodeUnitOrganisasi,
        nomorAgenda,
        tahun,
        tipe
      }
    })
    .then(res => resolve(res.data.data.noDokumen))
    .catch(err => {
      message.error('Gagal membuat nomor dokumen, silahkan coba lagi nanti')
      reject(err)
    })
  })

  export const resetPersetujuan = (idHeader) => new Promise((resolve, reject) => {
    axiosInstance.post('/post/reset-persetujuan', {}, {
      params: {
        idHeader : idHeader
      }
    })
    .then(res => resolve(res))
    .catch(err => {
      message.error('Gagal reset persetujuan')
      reject(err)
    })
  })

export const postHdfs = ({
  file,
  path = 'case_management/'
}) => new Promise((resolve, reject) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('path', path)
  Axios.post(`${process.env.REACT_APP_HDFS_BARU}/upload`, formData, {
    headers: {
      "content-type": "multipart/form-data",
      "Beacukai-Api-Key": process.env.REACT_APP_SECRET_KEY_HDFS,
    }
  })
  .then(res => resolve(res.data))
  .catch(err => reject(err))
})

export const postPengangkut = (data, idHeader) => new Promise(async(resolve, reject) => {
  try {
    const promisePostPengangkut = data.map(e => axiosInstance.post('/simpanPengangkut', removeInvalidValue({
      ...e,
      idPengangkut: !e.idPengangkut ? undefined : e.idPengangkut,
      idHeader
    })))
    await Promise.allSettled(promisePostPengangkut)
    resolve()
  } catch (error) {
    reject(error)
  }
})

export const postEntitas = (data, idHeader) => new Promise(async(resolve, reject) => {
  try {
    console.log(data)
    console.log(idHeader)
    const payload = []

    data.map((e, i) => {
      if(!e.idEntitas){
        e.idEntitas = undefined
      }
      e.waktuKeberangkatan = e.waktuKeberangkatan ? moment(e.waktuKeberangkatan, 'DD-MM-YYYY').format('YYYY-MM-DD') : null;
      e.waktuKedatangan = e.waktuKedatangan ? moment(e.waktuKedatangan, 'DD-MM-YYYY').format('YYYY-MM-DD') : null;
      e.idHeader = idHeader
      payload.push(e)
    })
    console.log(payload)
    const res = await axiosInstance.post('/post-return/tdEntitas', payload)
    resolve(res.data)
  } catch (error) {
    reject(error)
  }
})