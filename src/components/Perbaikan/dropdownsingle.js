import React, { memo, useMemo, useState } from "react";
import { Select, Tooltip, Button, Typography } from "antd";

const { Option } = Select;
const { Text } = Typography;

function Dropdownsingle({
  onReload = () => {},
  onChange = () => {},
  defaultValue = "",
  value = "",
  keyValue = "",
  data = [],
  loading = false,
  error = false,
  style,
  disabled = false,
  izinTPB = false,
}) {
  let [val, setVal] = useState("");
  const [referensi, setreRerensi] = useState([]);

  useMemo(() => {
    if (defaultValue || value) {
      setreRerensi(
        data
          .filter((e) => filterKey(e[keyValue], defaultValue || value))
          .slice(0, 9)
      );
    } else {
      setreRerensi(data.slice(0, 9));
    }
  }, [data, keyValue, defaultValue, value]);

  useMemo(() => {
    setVal(value);
  }, [value]);

  function filterKey(value, key) {
    if (key) {
      const d1 =
        String(value).toUpperCase().indexOf(String(key).toUpperCase()) === -1
          ? false
          : true;
      return d1;
    } else {
      return false;
    }
  }

  function onSearch(params) {
    if (data.length) {
      if (params) {
        const temp = data.filter((e) => filterKey(e[keyValue], params));
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
      onChange({ [keyValue]: "" });
    } else {
      const temp = data.find((e) => e[keyValue] === params);
      onChange(temp);
    }
    setVal(params);
  }

  // console.log(`- render Dropdownsingle ${keyLabel}` , {value});
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
      disabled={loading || disabled}
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
            title={`${String(d[keyValue]).toUpperCase()}`}
          >
            {String(d[keyValue]).toUpperCase()}
          </Tooltip>
        </Option>
      ))}
    </Select>
  );
}

export default memo(Dropdownsingle);
