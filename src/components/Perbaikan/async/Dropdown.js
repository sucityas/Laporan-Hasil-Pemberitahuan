import React, { useEffect, useMemo, useState } from "react";
import { isEmpty, orderBy } from "lodash";
import get from "lodash/get";
import useFetchApi from "utils/perbaikan-module/api/useFetchApi";
import Dropdown from "../dropdown";

function DropdownAsync({
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => fetchApi(), [url]);
  useEffect(apiDataHandler, [res.data]);

  function apiDataHandler() {
    const temp = filter(get(res.data, `${field}`, []));
    if (!isEmpty(temp)) {
      const sort = orderBy(temp, [`${keyValue}`], ["asc"]);
      setData(sort);
    }
  }

  function fetchApi() {
    fetch(url, { persist: true });
  }

  // console.log(`- render DropdownAsync ${keyLabel}`, {value});
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
      keyLabel={keyLabel}
      style={style}
      disabled={disabled}
    />
  );
}

export default DropdownAsync;
