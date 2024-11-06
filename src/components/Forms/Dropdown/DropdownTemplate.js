import React from 'react'
import { Select } from 'antd'
const { Option } = Select

const Dropdown = ({
  optionData,
  // defaultLabel,
  onChange,
  dataLabel,
  dataValue,
  placeholder,
  defaultValue,
  // loading,
}) => {
  const label = d => {
    if (d[dataLabel]) {
      return `${d[dataValue]} - ${d[dataLabel]}`.toUpperCase()
    }

    return `${d[dataValue]}`
  }

  return (
    <Select
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange}
      style={{ width: '100%', textTransform: 'uppercase' }}
    >
      {/* <Option value="" key="0" disabled>
        {defaultLabel == null ? 'Pilih' : defaultLabel}
      </Option> */}
      {optionData.map(d => (
        <Option value={d[dataValue]} key={d[dataLabel] || d[dataValue]}>
          {label(d)}
        </Option>
      ))}
    </Select>
  )
}

export default Dropdown
