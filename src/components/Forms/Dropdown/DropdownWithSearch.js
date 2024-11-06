import React from "react";
import { Select } from "antd";
const { Option } = Select;

const DropdownWithSearch = props => (
  <Select
    disabled={props.disabled}
    showSearch
    allowClear
    value={props.defaultValue}
    style={{ textTransform: "uppercase", width: "100%" }}
    placeholder={props.defaultLabel}
    optionFilterProp="children"
    onChange={e => {
      if (e !== null || e !== undefined) {
        props.onChange(e);
      }
    }}
    filterOption={(input, optionData) =>
      optionData.props.children[2].toLowerCase().indexOf(input.toLowerCase()) >=
        0 ||
      optionData.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >=
        0
    }
  >
    {/* <Option value="" key="0" disabled>
      {props.defaultLabel == null ? 'Pilih' : props.defaultLabel}
    </Option> */}
    {props.optionData.map(d => (
      <Option value={d[props.dataValue]} key={d[props.dataValue]}>
        {d[props.dataValue].toUpperCase()} - {d[props.dataLabel].toUpperCase()}
      </Option>
    ))}
  </Select>
);

DropdownWithSearch.defaultProps = { defaultLabel: "Choose One Option" };

export default DropdownWithSearch;
