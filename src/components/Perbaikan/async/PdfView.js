import React, { useEffect, useState } from "react";
import useFetchApi from "utils/perbaikan-module/api/useFetchApi";
import Iframe from "react-iframe";
import Skeleton from "antd/lib/skeleton";
import Button from "antd/lib/button";
import { get } from "lodash";

function Index({ url = "", field = "data", height = 500 }) {
  const [urlFrame, setUrlFrame] = useState("");
  const [res, fetch] = useFetchApi();

  useEffect(getApi, [url]);
  useEffect(apiHandler, [res.data]);

  function getApi() {
    fetch(url, { config: { responseType: "blob", timeout: 60000 } });
  }

  function apiHandler() {
    const temp = get(res.data, `${field}`, null);
    if (temp) {
      const file = new Blob([temp], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      setUrlFrame(fileURL);
    }
  }

  return (
    <Skeleton
      active
      loading={res.loading}
      style={{ width: "100%", height }}
      paragraph={{ rows: 8 }}
    >
      {res.error ? (
        <div
          style={{
            height,
            width: "100%",
            overflow: "hidden",
            position: "relative",
            border: "0px 0px 1px 1px red",
            borderRadius: 2,
            textAlign: "center",
            background: "#fafafa",
          }}
        >
          <Button
            style={{
              argin: 0,
              position: "absolute",
              top: "50%",
              left: "50%",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            }}
            type="danger"
            onClick={() => getApi()}
          >
            Muat Ulang
          </Button>
        </div>
      ) : (
        <Iframe
          url={urlFrame}
          display="initial"
          position="relative"
          width="100%"
          height={`${height}`}
          allowFullScreen
          key="iframe"
          style={{ border: "none" }}
        />
      )}
    </Skeleton>
  );
}

export default Index;
