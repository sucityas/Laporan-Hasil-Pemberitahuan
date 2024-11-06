import React, { useMemo, useState } from "react";
import { Button, Select, Tooltip, Typography } from "antd";

const { Option } = Select;
const { Text } = Typography;

function Dropdown({
  onReload = () => {},
  onChange = () => {},
  defaultValue = "",
  value = "",
  keyValue = "",
  keyLabel = "",
  data = [],
  loading = false,
  error = false,
  style,
  disabled = false,
  izinTPB = false,
}) {
  let [val, setVal] = useState("");
  const [referensi, setreRerensi] = useState([]);
  // if (!val) {
  //     if (izinTPB === true) {
  //         val = data.length > 0 ? data[0].nomorSkep : ''
  //     }
  // }
  // const [notFound, setNotFound] = useState(false)

  useMemo(() => {
    if (defaultValue || value) {
      setreRerensi(
        data
          .filter((e) =>
            filterKey(e[keyValue], e[keyLabel], defaultValue || value)
          )
          .slice(0, 9)
      );
    } else {
      setreRerensi(data.slice(0, 9));
    }
  }, [data, keyValue, keyLabel, defaultValue, value]);

  useMemo(() => {
    setVal(value);
  }, [value]);

  function filterKey(value, label, key) {
    if (key) {
      const d1 =
        String(value).toUpperCase().indexOf(String(key).toUpperCase()) === -1
          ? false
          : true;
      const d2 =
        String(label).toUpperCase().indexOf(String(key).toUpperCase()) === -1
          ? false
          : true;
      return d1 || d2;
    } else {
      return false;
    }
  }

  function onSearch(params) {
    if (data.length) {
      if (params) {
        const temp = data.filter((e) =>
          filterKey(e[keyValue], e[keyLabel], params)
        );
        setreRerensi(temp.slice(0, 9));
        // console.log('onsearch', {params, temp});
      } else {
        setreRerensi(data.slice(0, 9));
      }
    }
  }

  function handleChange(params) {
    if (!params) {
      setreRerensi(data.slice(0, 9));
      onChange({ [keyValue]: "", [keyLabel]: "" });
    } else {
      const temp = data.find((e) => e[keyValue] === params);
      onChange(temp);
    }
    setVal(params);
  }

  if (izinTPB === true) {
    console.log("value nya", {
      referensi,
      val,
      data,
      value,
      keyValue,
      keyLabel,
      defaultValue,
    });
  }

  // console.log(`- render Dropdown ${keyLabel}` , {value});
  return (
    <Select
      showSearch
      allowClear
      notFoundContent={
        error ? (
          <Button
            icon="reload"
            type="danger"
            style={{ width: "100%" }}
            onClick={() => onReload()}
          >
            Muat ulang
          </Button>
        ) : (
          // <Text type='danger'>Referensi tidak ditemukan</Text>
          <Text type="danger">{value}</Text>
        )
      }
      disabled={disabled || loading}
      onChange={(e) => handleChange(e)}
      onSearch={onSearch}
      style={{ textTransform: "uppercase", width: "100%", ...style }}
      value={val}
      filterOption={false}
      loading={loading}
    >
      {referensi.map((d) => (
        <Option value={d[keyValue]} key={d[keyValue]}>
          <Tooltip
            key={d[keyValue]}
            placement="left"
            title={`${String(d[keyValue]).toUpperCase()} - ${String(
              d[keyLabel]
            ).toUpperCase()}`}
          >
            {String(d[keyValue]).toUpperCase()} -{" "}
            {String(d[keyLabel]).toUpperCase()}
          </Tooltip>
        </Option>
      ))}
    </Select>
  );
}

export default Dropdown;
