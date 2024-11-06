import { isEmpty, orderBy } from "lodash";
import get from "lodash/get";
import React, { memo, useEffect, useState } from "react";
import useFetchApi from "../../utils/api/useFetchApi";
import Dropdown from "../dropdownsingle";

function DropdownSingle({
  filter = (e) => e,
  onChange = () => {},
  defaultValue = "",
  value = "",
  url,
  keyValue = "",
  keyLabel = "",
  field = "data.data",
  style,
  disabled = false,
  izinTPB = false,
}) {
  const [res, fetch] = useFetchApi();
  const [data, setData] = useState([]);

  useEffect(fetchApi, [url]);
  useEffect(apiDataHandler, [res.data]);

  function apiDataHandler() {
    const temp = filter(get(res.data, `${field}`, []));
    if (izinTPB === true) {
      console.log("nyangkut dimana", res);
    }
    if (!isEmpty(temp)) {
      const sort = orderBy(temp, [`${keyValue}`], ["asc"]);
      setData(sort);
    }
  }

  function fetchApi() {
    fetch(url, { persist: true });
  }

  // console.log(`- render DropdownSingle ${keyLabel}`, {value});
  return (
    <Dropdown
      izinTPB={izinTPB}
      data={data}
      error={res.error}
      loading={res.loading}
      onReload={fetchApi}
      onChange={onChange}
      value={value}
      keyValue={keyValue}
      style={style}
      disabled={disabled}
    />
  );
}

export default memo(DropdownSingle);
