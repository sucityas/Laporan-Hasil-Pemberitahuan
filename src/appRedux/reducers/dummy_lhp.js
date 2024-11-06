{
  dashboard: {},
  bap:{
    kesiapan_bap_pencarian:[
    {
      kesiapan:{ 
        pemeriksaan_ke:1,
        kesiapan:1,
        kendala:'AAAAA',
        uraian:'BBBBBB',
      },
      lokasi:{
        lokasi:1,
        gudang:{
          kode:'ABCABC',
          nama:'Nama Gudang',
        },
        tempat:'Telescoope',
        pendamping:{
          nama:'Kepatuhan Internal',
          keterangan:'Penindakan & Penyidikan (P2)'
        }
      },
      waktu:{
        penunjukkan:new Date(),
        pengeluaran:new Date(),
        pemeriksaan_barang:new Date(),
        alasan:'Malas',
        waktu_pkb:new Date()
      },
      realisasi:{
        perintah:'Lorong Dasar Kanan',
        dilaksanakan:1,
        alasan:'Barang terlalu besar'
      },
      contoh_barang:{
        jenis:'Jenis Barang',
        jumlah:10,
        diminta_kembali:1
      },
      hasil_pemeriksaan:{
        kondisi:1,
        tingkat_pemeriksaan:'30%',
        jenis:2
      },
      jumlah_barang:{
        partai_barang:100,
        barang_diperiksa:50,
        jenis_barang:5
      },
      nomor_kemasan:{
        jumlah:5,
        nomor:'1,2,3,4,5'
      },
      realisasi_memo_pfpd:{
        memo:1,
        keterangan:'ABABABAB'
      },
      kesimpulan:{
        kesimpulan:1,
        catatan:'BCBCBCBCBC'
      }
    }
    ],
    detail_pencarian:[
    {
      id:1,
      uraian:'ABCDEFG',
      jumlah:{
        jumlah:100,
        satuan:'PCE'
      },
      asal:'INDONESIA',
      merek:'KYT'
    },
    {
      id:2,
      uraian:'BBBBBB',
      jumlah:{
        jumlah:50,
        satuan:'PCE'
      },
      asal:'INDONESIA',
      merek:'KYT'
    },{
      id:3,
      uraian:'FFFFFF',
      jumlah:{
        jumlah:42,
        satuan:'SET'
      },
      asal:'INDONESIA',
      merek:'KYT'
    }
    ],
    isi_detail_pencarian:[
    {
      detail:{
        uraian:'AAAAAAA',
        satuan:{
          jumlah:10,
          satuan:'SET'
        }
      },
      kemasan:{
        jumlah:10,
        jenis:'CT-Carton',
        ukuran:'Meter',
        panjang:4,
        lebar:'0.5',
        tinggi:'0.5'
      },
      unsur:{
        asal:{
          nama:'MADE-IN',
          dari:'ID-INDONESIA'
        },
        kondisi:'Baik'
      },
      spesifikasi:{
        panjang:4,
        lebar:'0.5',
        tinggi:'0.5',
        kapasitas:{
          nama:'AAAAAAA',
          cari:'ID'
        }
      },
      tambahan:{
        keterangan:'ABCABCABCABC'
      }
    }
    ]
  },
  data:{},
  laporan:{},
  processed_data:{},
  current_data:{
    dokumen:[
    {
      id:1,
      jenis:'BC 2.0',
      no_aju:'0000-1234-1234-0000',
      no_dok:'000453',
      tanggal_dok:new Date(),
      negara_asal:'ID-INDONESIA',
      negara_pemasok:'ID-INDONESIA',
      no_bl:'007007',
      tanggal_bl:new Date(),
    }
    ],
    importir:[
    {
      id:1,
      nama:'WAWA',
      npwp:'0000-1234-1234-0000',
    }
    ],
    ppjk:[
    {
      id:1,
      nama:'WAWA',
      npwp:'0000-1234-1234-0000',
    }
    ],
    barang_memo_pemeriksaan:[
    {
      seri:1,
      hs:'89009001',
      uraian: 'Barang',
      jumlah:1000,
      satuan:'PCE',
      negara_asal:'ID-INDONESIA',
      negara_pemasok:'ID-INDONESIA'
    },
    {
      seri:2,
      hs:'89009002',
      uraian: 'Barang',
      jumlah:10,
      satuan:'SET',
      negara_asal:'ID-INDONESIA',
      negara_pemasok:'ID-INDONESIA'
    },
    {
      seri:3,
      hs:'89009003',
      uraian: 'Barang',
      jumlah:50,
      satuan:'SET',
      negara_asal:'ID-INDONESIA',
      negara_pemasok:'ID-INDONESIA'
    },
    {
      seri:4,
      hs:'89009004',
      uraian: 'Barang',
      jumlah:40,
      satuan:'SET',
      negara_asal:'ID-INDONESIA',
      negara_pemasok:'ID-INDONESIA'
    },
    {
      seri:5,
      hs:'89009005',
      uraian: 'Barang',
      jumlah:60,
      satuan:'PCE',
      negara_asal:'ID-INDONESIA',
      negara_pemasok:'ID-INDONESIA'
    }
    ],
    intruksi_pemeriksaan_sistem:[
    {
      id:1,
      tingkat_pemeriksaan:'30%',
      waktu_intruksi_pemeriksaan: new Date(),
    }
    ],
    intruksi_pemeriksaan_sistem_kontainer:[
    {
      no:1,
      no_kontainer:'ABC123456',
      ukuran:'20',
    },
    {
      no:2,
      no_kontainer:'ABC123456',
      ukuran:'40',
    },
    {
      no:3,
      no_kontainer:'ABC123456',
      ukuran:'40',
    }
    ],
    memo_pemeriksaan:[
    {
      id:1,
      header:'Periksa mendalam untuk 3 kontainer yang sudah ditunjuk',
      waktu_memo_pemeriksaan: new Date(),
    }
    ],
    perintah_lorong:[
    {
      id:1,
      name:'Lorong Dasar Kanan',
      waktu_memo_pemeriksaan: new Date(),
    }
    ],
    pencarian_dokumen:[
    {
      kode:'007001',
      nama:'KPPBC Telescoope',
      jenis:'AAAAA',
      no_dok: '007001',
      tanggal_dok: new Date(),
    }
    ],
    daftar_pencarian:[
    {
      id:1,
      jenis:'AAAAA',
      kode:'007001',
      npwp:'007007007007',
      perusahaan:'Telescoope',
      tanggal_dok: new Date(),
      seri:1,
    },
    {
      id:2,
      jenis:'BBBBB',
      kode:'007002',
      npwp:'007007007007',
      perusahaan:'Telescoope',
      tanggal_dok: new Date(),
      seri:5,
    },
    {
      id:3,
      jenis:'CCCCC',
      kode:'007003',
      npwp:'007007007007',
      perusahaan:'Telescoope',
      tanggal_dok: new Date(),
      seri:4,
    },
    {
      id:4,
      jenis:'DDDDD',
      kode:'007004',
      npwp:'007007007007',
      perusahaan:'Telescoope',
      tanggal_dok: new Date(),
      seri:6,
    }
    ],
  },
  success: false,
  loading: false,
}