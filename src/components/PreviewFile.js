import React from "react";
import axios from "axios";
import { apiUrl } from "../config/config";

const { REACT_APP_HDFS, REACT_APP_SECRET_KEY_HDFS } = process.env;

export const PreviewFile = (e, f) => {
  console.log("KEY : ", REACT_APP_SECRET_KEY_HDFS)
  console.log("e: ", e)
  axios(`${REACT_APP_HDFS}/v1/hdfs/download?path=${e}`, {
    method: 'GET',
    headers: {
      "Access-Control-Allow-Origin": "*",
      'accept': 'application/json',
      'beacukai-api-key': `${REACT_APP_SECRET_KEY_HDFS}`,
      "cache-control": "no-cache"
    },
    responseType: 'blob'
  })
    .then(response => {
      const validasiFile = e.split('.').pop() === 'jpg' ? 'image/jpg' :
        e.split('.').pop() === 'png' ? 'image/png' :
          e.split('.').pop() === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
            e.split('.').pop() === 'xlsx' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'application/pdf';
      const file = new Blob(
        [response.data],
        { type: validasiFile }
      );

      var link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = f;
      link.click();
    })
    .catch(error => {
      console.log(error);
    });
};