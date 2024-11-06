import React, { useState, useEffect } from "react";
import { Table, Icon, Tooltip, Input, Button } from "antd";
import { isEmpty, compact, get } from "lodash";
import useFetchApi from "utils/perbaikan-module/api/useFetchApi";
import "./custom.css";
const { Column } = Table;

function TableCustom({
  onField = () => {},
  total = 0,
  data = [],
  coloumn,
  button,
  onMultiSelect = () => {},
  url = "",
  field = "data.data",
  params = {},
  multi = false,
  pagination = true,
  number = true,
  filter = true,
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [Total, setTotal] = useState(total);
  const [dataSource, setDataSource] = useState(data);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState({});
  const [dataSearch, setDataSearch] = useState(data);
  const [res, fetch] = useFetchApi();

  useEffect(getApi, []);
  useEffect(apiHandler, [res.data]);
  useEffect(emptyData, [res.error]);

  function emptyData() {
    setDataSearch([]);
  }

  function getApi() {
    if (url) {
      fetch(url, { config: { params } });
    } else {
      SetDataSource(data);
      SetDataSearch(data);
    }
  }

  function getApiParams(e) {
    fetch(url, { config: { ...e } });
  }

  function SetDataSource(dt) {
    const temp = giveNumber(dt);
    setDataSource(temp);
  }

  function SetDataSearch(dt) {
    setDataSearch(giveNumber(dt));
  }
  function apiHandler() {
    const temp = get(res.data, `${field}`, []);
    if (!isEmpty(temp)) {
      setTotal(isEmpty(temp) ? total : get(res.data, `data.total`, total));
      SetDataSource(temp);
      SetDataSearch(temp);
    }
  }

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    const temp = selectedRowKeys.map((e) => {
      return page * pageSize + Number(e);
    });
    setSelectedRowKeys(temp);
    onMultiSelect(temp, selectedRows);
  };

  const pageChange = (e) => {
    setSelectedRowKeys([]);
    if (dataSource.length >= Number(e - 1) * pageSize) {
      setPage(Number(e) - 1);
    } else {
      getApiParams({ params: { page: Number(e), size: pageSize } });
    }
  };

  const rowSelection = multi
    ? {
        selectedRowKeys,
        onChange: onSelectChange,
      }
    : null;

  function giveNumber(dt = []) {
    const pre = page * pageSize + 1;
    const temp = dt.map((e, i) => ({ ...e, no: pre + i }));
    return temp;
  }
  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
  };

  const findSearch = (item, key) => {
    const temp = Object.keys(key);
    const res = compact(
      temp.map((index) => {
        if (key[index]) {
          const flag = String(item[index]).indexOf(key[index]);
          if (flag === -1) {
            return "true";
          }
        }
        return false;
      })
    );
    return isEmpty(res);
  };

  const searchHandler = () => {
    const temp = compact(dataSource.filter((e) => findSearch(e, search)));
    if (isEmpty(temp)) {
      getApiParams({
        params: { page: Number(page), size: pageSize, ...search },
      });
      SetDataSearch(dataSource.slice(0, page * pageSize));
    } else {
      SetDataSearch(temp);
    }
  };

  const inputSearchChange = (e, index) => {
    const temp = { ...search, [index]: e };
    setSearch(temp);
  };

  const searchChange = (index) => {
    return (
      <div style={{ display: "inline-block", height: 50 }}>
        <Input
          key={`in${index}`}
          type="text"
          style={{ border: "none", width: "90%" }}
          onChange={(a) => inputSearchChange(a.target.value, index)}
          disabled={res.loading}
          onPressEnter={() => searchHandler()}
        />
        <Icon
          key={`ic${index}`}
          type="search"
          style={{ width: "8%", marginLeft: "2%" }}
        />
      </div>
    );
  };

  return (
    <Table
      style={{
        width: "100%",
        // boxShadow: '0px 0px 1px 1px #ADD8E6'
      }}
      scroll={{ x: true }}
      rowKey="no"
      dataSource={dataSearch}
      rowSelection={rowSelection}
      rowClassName={(item) => onField(item)}
      pagination={
        pagination
          ? {
              pageSize,
              onChange: (e) => pageChange(e),
              showSizeChanger: true,
              onShowSizeChange,
              total: Total,
              showTotal: (e) => `Total ${Total || e}`,
            }
          : false
      }
      footer={
        res.error
          ? () => (
              <Button
                type="danger"
                style={{ width: "100%" }}
                onClick={() => fetch(url, { config: { params } })}
              >
                Muat Ulang
              </Button>
            )
          : null
      }
      loading={res.loading}
    >
      {number ? (
        <Column title="No." dataIndex="no" fixed="left" width="50" />
      ) : null}
      {coloumn.map((e, i) => {
        return (
          <Column
            style={{ height: 50 }}
            dataIndex={e.data}
            title={e.title}
            {...e}
            key={`cl${i}`}
            children={
              filter
                ? [
                    {
                      title: () => searchChange(e.data),
                      dataIndex: e.data,
                    },
                  ]
                : null
            }
          />
        );
      })}
      {button ? (
        <Column
          title=""
          key="action"
          width={button.length * 40}
          fixed="right"
          render={(e) =>
            button.map((a, i) => {
              function disibled() {
                if (typeof a.disibled === "function") {
                  return a.disibled(e);
                }
                return false;
              }
              return disibled() ? null : (
                <Tooltip title={a.title} key={`tt${i}`}>
                  <Icon
                    type={a.icon}
                    onClick={() => a.onClick(e)}
                    style={{ color: "#1890FF", marginRight: 10, size: 20 }}
                    key={`it${i}`}
                  />
                </Tooltip>
              );
            })
          }
        />
      ) : null}
    </Table>
  );
}

export default TableCustom;
