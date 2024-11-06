import React from 'react'
import { Select } from 'antd'
const { Option } = Select

const Dropdown = ({
  optionData,
  placeholder,
  defaultLabel,
  onChange,
  dataLabel,
  dataValue,
  // loading,
  defaultValue = '',
  width = 200,
}) => {
  const label = d => {
    if (d[dataLabel]) {
      return `${d[dataValue]} - ${d[dataLabel]}`.toUpperCase()
    }

    return `${d[dataValue]}`
  }
  const change = e => {
    if (e !== null || e !== undefined) {
      onChange(e)
    }
  }

  return (
    <Select
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={change}
      style={{ width }}
    >
      <Option value="" key="0" disabled>
        {defaultLabel == null ? 'Pilih' : defaultLabel}
      </Option>
      {optionData.map(d => (
        <Option value={d[dataValue]} key={d[dataLabel] || d[dataValue]}>
          {label(d)}
        </Option>
      ))}
    </Select>
  )
}


export default Dropdown
