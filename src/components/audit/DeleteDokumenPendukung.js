import React from "react";
import axios from "axios";
import { apiUrl, apiKey } from "../../config/config";

const { REACT_APP_HDFS, REACT_APP_SECRET_KEY_HDFS } = process.env;

export const DeleteDokumenPendukung = (idDokumenPendukung) => {

    let listFileDokPendukung = [];

    axios.get(`${apiUrl}/dokpendukung/` + idDokumenPendukung, {
        headers: apiKey
    })
        .then(res => {
            listFileDokPendukung = res.data.item;

            for(var i = 0; i < listFileDokPendukung.length; i++){
                axios.delete(`${REACT_APP_HDFS}/v1/hdfs/delete?path=` + listFileDokPendukung[i].idPathDokPendukung, { headers: { 'beacukai-api-key': REACT_APP_SECRET_KEY_HDFS } });
            } 

            axios.delete(`${apiUrl}/dokpendukung/delete-all/` + idDokumenPendukung, { headers: apiKey })
            .then(res => {
                console.log(res.status)
            })
            .catch(error => {
                console.log(error.response)
            });
        })
        .catch(error => {
            console.log(error.response)
        });

};