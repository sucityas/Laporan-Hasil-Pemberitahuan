import React, { useEffect, useState } from "react";
import { Form, Icon, Typography } from "antd";
import { get, isEmpty } from "lodash";
import useFetchApi from "utils/perbaikan-module/api/useFetchApi";

const { Text } = Typography;

const TextCustom = ({
  value = "",
  url = "",
  onChange = () => {},
  keyValue = "",
  keyLabel = "",
  type = "",
  keyParams = "",
  dataParams = "",
  label = "",
  field = "data.data",
}) => {
  const [res, fetch] = useFetchApi();
  const [disp, setDisp] = useState("");

  useEffect(apiFetch, [url]);
  function apiFetch() {
    fetch(url, { persist: true });
  }

  useEffect(handleChange, [res.data]);
  function handleChange() {
    const temp = get(res.data, `${field}`, []);
    if (!isEmpty(temp)) {
      const item = temp.find((e) => e[keyValue] === value);
      if (item) {
        setDisp(`${item[keyValue]} - ${item[keyLabel]}`);
        onChange({ [keyValue]: item[keyValue], [keyLabel]: item[keyLabel] });
      } else {
        setDisp("");
        onChange({ [keyValue]: "", [keyLabel]: "" });
      }
    }
  }

  return (
    <Form.Item
      label={label}
      labelAlign="left"
      help={
        res.loading
          ? "Memuat referensi"
          : res.error
          ? "Gagal memuat referensi"
          : ""
      }
      validateStatus={res.loading ? "validating" : res.error ? "error" : ""}
    >
      <div style={{ height: 32, width: "100%" }}>
        {res.loading ? (
          <Icon style={{ color: "#ADD8E6" }} type="loading" />
        ) : res.error ? (
          <Text type="danger" onClick={() => fetch(url)}>
            {" "}
            Muat ulang{" "}
          </Text>
        ) : disp ? (
          <Text type={type} strong>
            {disp}
          </Text>
        ) : (
          <Text type="danger" strong>
            ref tidak ada
          </Text>
        )}
      </div>
    </Form.Item>
  );
};

export default TextCustom;
