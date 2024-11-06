import {Button, Icon, Input} from "antd";
import React from "react";

export const getColumnSearchProps = (dataIndex,searchInput) => ({

    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
        <div style={{padding: 8}}>
            <Input
                ref={node =>
                    searchInput = node
                }
                placeholder={`Search`}
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm)}
                style={{width: 188, marginBottom: 8, display: 'block'}}
            />
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm)}
                icon="search"
                size="small"
                style={{width: 90, marginRight: 8}}
            >
                Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                Reset
            </Button>
        </div>
    ),
    filterIcon: filtered => (
        <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
    ),
    onFilter: (value, record) => {
        var obj = dataIndex.split('.');
        // console.log(obj);
        return multiIndex(record, obj)
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        // }
    },
    onFilterDropdownVisibleChange: visible => {
        if (visible) {
            setTimeout(() => searchInput.select());
        }
    },
});

const multiIndex = (obj, is) => {
    return is.length ? multiIndex(obj[is[0]], is.slice(1)) : obj
}

const handleSearch = (selectedKeys, confirm) => {
    confirm();
};

const handleReset = clearFilters => {
    clearFilters();
};