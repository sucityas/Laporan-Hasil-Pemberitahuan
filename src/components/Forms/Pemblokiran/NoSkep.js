import React, { useEffect } from 'react'
import { Icon } from "antd";
import useFetchApi from '../../../utils/useFetchApi'
import {getUser} from '../../../utils/DataUser'
import { get } from "lodash";
function NoSkep({onChange = ()=>{}}) {
    const [skep, getSkep] = useFetchApi()

    useEffect(() => {
        const dataUser = getUser()
        const {kodeKantor} = dataUser
        getSkep(`${process.env.REACT_APP_PERIJINAN}/v1/ref-set-nomor/get-nomor?kodeKantor=${kodeKantor}&kodeProses=XXX930&kodeRespon=930`)
    }, [])

    useEffect(() => {
        onChange(get(skep, 'data.data.data', ''))
    }, [skep.data])

    console.log("noSkep", {skep});

    return (
        <>
            {
                skep.loading ?
                <Icon type="loading"/>
                :
                get(skep, 'data.data.data', '')
            }
        </>
    )
}

export default NoSkep
