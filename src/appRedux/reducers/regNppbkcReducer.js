let defaultState = {
    dataperusahaan: 'Memuat...',
    status: '',
    statusIdentitas: '',
    messageIdentitas: '',
    statusPemasok: '',
    statusTempatUsaha: ''
}

const RegNppbkc = (state = defaultState, action) => {
    if (action.type === 'GET_OPTION_BADANHUKUM') {
        return {
            ...state,
            dataBadanhukum: action.dataBadanhukum,
        }
    } else if (action.type === 'GET_JENIS_LAMPIRAN') {
        return {
            ...state,
            datajenislampiran: action.datajenislampiran,
        }
    } else if (action.type === 'GET_INFO_PERUSAHAAN') {
        return {
            ...state,
            dataperusahaan: action.dataperusahaan,
        }
    } else if (action.type === 'GET_OPTION_JENISDOK') {
        return {
            ...state,
            dataJenisdok: action.dataJenisdok,
        }
    } else if (action.type === 'GET_OPTION_JENISREKENING') {
        return {
            ...state,
            dataJenisrekening: action.dataJenisrekening,
        }
    } else if (action.type === 'GET_OPTION_JENISVALUTA') {
        return {
            ...state,
            dataJenisvaluta: action.dataJenisvaluta,
        }
    } else if (action.type === 'GET_OPTION_APPAKUNTAN') {
        return {
            ...state,
            dataJenisappakuntan: action.dataJenisappakuntan,
        }
    } else if (action.type === 'GET_OPTION_PERIODELAPORAN') {
        return {
            ...state,
            dataJenisperiodelaporan: action.dataJenisperiodelaporan,
        }
    } else if (action.type === 'GET_CHECKBOX_JENISUSAHA') {
        return {
            ...state,
            dataJenisusaha: action.dataJenisusaha,
        }
    } else if (action.type === 'GET_TABEL_PAJAK') {
        return {
            ...state,
            datatabelpajak: action.datatabelpajak,
        }
    } else if (action.type === 'GET_CHECKBOX_JENISBKC') {
        return {
            ...state,
            dataJenisbkc: action.dataJenisbkc,
        }
    } else if (action.type === 'POST_PAJAK') {
        return { ...state, status: action.payload }
    } else if (action.type === 'POST_SAVEIDENTITAS') {
        return { ...state, statusIdentitas: action.payload, messageIdentitas: action.idRegNppbkc }
    } else if (action.type === 'POST_PEMASOK') {
        // console.log(action.payload, 'ini Pemasok')
        return { ...state, statusPemasok: action.payload }
    } else if (action.type === 'POST_TEMPATUSAHA') {
        // console.log(action.payload, 'ini Pemasok')
        return { ...state, statusTempatUsaha: action.payload }
    }
    else {
        return {
            ...state,
        }
    }
}

export default RegNppbkc
