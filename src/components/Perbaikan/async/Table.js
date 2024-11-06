import React, { useState, useEffect, useRef } from "react";
import Table from "../table";
import { get, isEmpty, orderBy } from "lodash";
import useFetchApi from "utils/perbaikan-module/api/useFetchApi";

function TableCustom({
  onClick = () => {},
  coloumn = [],
  button = [],
  onMultiSelect = () => {},
  url = "",
  field = "data.data",
  params = {},
  multi = false,
  pagination = true,
  number = true,
  filter = true,
  sort = "",
  local = false,
}) {
  const [data, setData] = useState([]);
  const [res, fetch] = useFetchApi();
  const [total, setTotal] = useState(0);
  const refTemp = useRef({});

  useEffect(getApi, [url]);
  useEffect(apiHandler, [res.data]);

  function getApi() {
    fetch(url, { config: { params } });
  }

  function onSearch(e) {
    if (!local)
      fetch(url, { config: { params: { ...refTemp.current, ...e } } });
  }

  function apiHandler() {
    const temp = get(res.data, `${field}`, []);
    const tl = get(res.data, `data.total`, []);
    setTotal(tl);
    setData(temp);
  }

  function pageHandler(e, pg, sr) {
    if (!local) {
      fetch(url, { config: { params: { ...sr, page: e, size: pg } } });
      refTemp.current = { ...sr, size: pg, page: e };
    }
  }

  return (
    <Table
      onReload={onSearch}
      total={total}
      coloumn={coloumn}
      button={button}
      onMultiSelect={onMultiSelect}
      onSearch={onSearch}
      multi={multi}
      pagination={pagination}
      number={number}
      filter={filter}
      onClick={onClick}
      data={data}
      loading={res.loading}
      error={res.error}
      onPage={pageHandler}
    />
  );
}

export default TableCustom;
