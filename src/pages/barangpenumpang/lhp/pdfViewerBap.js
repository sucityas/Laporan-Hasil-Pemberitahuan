/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { Skeleton, Pagination, Button, Icon } from "antd";
import Axios from "axios";

/* IMPORT LIBS */
// import { GET_FILE } from "../../assets/libs/fetchData.lib";

/* REACT PDF */
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const {

  REACT_APP_LHP,
  REACT_APP_SECRET_KEY_LHP,
  REACT_APP_HDFS,
  REACT_APP_SECRET_KEY_HDFS,
  REACT_APP_API_BARANG_PENUMPANG,
  REACT_APP_API_BARANG_PENUMPANG_KEY,
  REACT_APP_API_BARANG_PENUMPANG_REPORT,
  REACT_APP_API_BARANG_PENUMPANG_REPORT_KEY
} = process.env;

function PdfViewer(props) {
  /* CONSTRUCTOR */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pdfJasper, setPdfJasper] = useState(null);
  const [pdfConfig, setPdfConfig] = useState({
    numPages: null,
    pageNumber: 1,
  });

  useEffect(() => {
    // console.log("Use Effect")
    setPdfJasper(null);
    setPdfConfig({
      numPages: null,
      pageNumber: 1,
    });
    fetchGetFile();
  }, [props.reload]);

  /* MAIN COMPONENT */
  const fetchGetFile = async () => {
    setLoading(true);
    setError(false);


    // console.log("PDF : ", props)
    axios.get(`${REACT_APP_API_BARANG_PENUMPANG_REPORT}/formulir/BAP/${props.idLhp}`, {
      headers: {
        accept: 'application/json',
        'beacukai-api-key': `${REACT_APP_API_BARANG_PENUMPANG_REPORT_KEY}`,
      },
      // 'Access-Control-Allow-Origin': '*',
      responseType: 'blob', //Force to receive data in a Blob Format
    })
      .then((res) => {
        const fileTemp = new Blob([res.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(fileTemp);

        setPdfJasper(fileURL);
        setLoading(false);
      })
      .catch((err) => {
        if (Axios.isCancel(err)) {
          // console.log("[Debug] @API_GET_PENCARIAN_DOKUMEN_PEMBATALAN Previous Request has been Canceled");
        } else {
          console.log(
            "Get File Error!",
            err
          );

          setLoading(false);
          setError(true);
          setPdfJasper(null);
        }
      });
  };

  /* FUNCTION COMPONENT */
  const handleDocumentLoadSuccess = ({ numPages }) => {
    setPdfConfig({ ...pdfConfig, numPages });
  };

  const handlePageChange = (page) => {
    setPdfConfig({ ...pdfConfig, pageNumber: page });
  };

  return (
    <Fragment>
      <Skeleton active loading={loading}>
        {error ? (
          <Fragment>
            <center>
              <Icon style={{ fontSize: "40px" }} type="warning" />
              <br />
              <p style={{ fontSize: "20px" }}>
                Oops! Telah Terjadi Error saat Fetch Data!
              </p>
              <Button
                type="primary"
                ghost
                onClick={() => {
                  fetchGetFile();
                }}
              >
                <Icon type="reload" /> Refresh
              </Button>
            </center>
          </Fragment>
        ) : (
          <Fragment>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "20px",
              }}
            >
              <Button
                type="primary"
                ghost
                onClick={() => {
                  fetchGetFile();
                }}
              >
                <Icon type="reload" /> Refresh
              </Button>
              &nbsp;
              <Button onClick={() => window.open(pdfJasper)}>
                <Icon type="file-pdf" /> Download/Print
              </Button>
            </div>

            <center>
              <Document
                file={pdfJasper}
                onLoadSuccess={handleDocumentLoadSuccess}
              >
                <Page pageNumber={pdfConfig.pageNumber} scale={0.75} />
              </Document>
            </center>
            <center>
              <div style={{ marginTop: 16 }}>
                {pdfConfig.numPages !== null ? (
                  <Fragment>
                    <p>
                      Halaman {pdfConfig.pageNumber} dari {pdfConfig.numPages}
                    </p>
                    <Pagination
                      simple
                      onChange={(event) => handlePageChange(event)}
                      current={pdfConfig.pageNumber}
                      defaultCurrent={1}
                      defaultPageSize={1}
                      total={pdfConfig.numPages}
                    />
                  </Fragment>
                ) : null}
              </div>
            </center>
          </Fragment>
        )}
      </Skeleton>
    </Fragment>
  );
}

export default PdfViewer;
