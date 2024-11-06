import React, { useEffect, useState, memo } from "react";
import Upload from "antd/lib/upload";
import message from "antd/lib/message";
import Tooltip from "antd/lib/tooltip";
import useFetchApi from "utils/perbaikan-module/api/useFetchApi";
import { get, isEmpty } from "lodash";

function UploadCustom({
  accept = "*",
  url = "",
  size = 2000000,
  data = {},
  children,
  onChange = () => {},
  field = "data",
}) {
  const [fileList, setFileList] = useState([]);
  const [res, fetch] = useFetchApi();

  useEffect(apiHandler, [res.data]);

  function apiHandler() {
    const temp = get(res.data, `${field}`, {});
    if (!isEmpty(temp)) {
      onChange(temp);
      message.success("File telah Dikirim");
    }
  }

  function ChildrenCustom({ flag }) {
    if (!flag) message.error("File gagal kirim");
    const ChildrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const props =
          child.type.name === "Icon"
            ? flag
              ? { style: { color: "#1890FF" }, type: "loading" }
              : { style: { color: "red" }, type: "warning" }
            : flag
            ? { loading: true }
            : { type: "danger" };
        return React.cloneElement(child, props);
      }
      return child;
    });
    return (
      <Tooltip title={flag ? "Mengirim..." : "Kirim ulang"}>
        {" "}
        {ChildrenWithProps}{" "}
      </Tooltip>
    );
  }

  function handleApi(file) {
    const body = new FormData();
    body.append("file", file);
    const key = Object.keys(data);
    key.map((a) => {
      body.append(a, data[a]);
      return true;
    });
    fetch(url, { data: body, method: "post" });
  }

  const props = {
    name: "file",
    accept,
    multiple: false,
    onChange(info) {
      // onChange(info)
    },
    tabIndex: 3,
    fileList,
    beforeUpload(file) {
      if (file.size > size)
        message.warning(`File lebih dari ${(size / 1048576).toFixed(2)} MB`);
      else {
        setFileList([file]);
        handleApi(file);
      }
      return false;
    },
    onRemove() {
      setFileList([]);
    },
    showUploadList: false,
  };

  return (
    <Upload {...props}>
      {res.loading ? (
        <ChildrenCustom flag={true} />
      ) : res.error ? (
        <ChildrenCustom flag={false} />
      ) : (
        children
      )}
    </Upload>
  );
}

export default memo(UploadCustom);
