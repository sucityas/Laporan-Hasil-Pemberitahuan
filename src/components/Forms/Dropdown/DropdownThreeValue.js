import React from 'react'
import { Select } from 'antd'
const { Option } = Select
class Dropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
    console.log(props)
    this.selectProps = []

    if (this.props.value) {
      this.selectProps.push({ value: this.props.value })
    }
  }

  onChange = e => {
    if (e !== null || e !== undefined) {
      this.setState(
        {
          value: e,
        },
        () => this.props.onChange(e)
      )
    }
  }

  // belum ditambah debounce/throttling sama uppercase searchbox

  render() {
    // console.log("props remotedata", this.props.defaultValue)
    return (
      <Select
        {...this.props}
        showSearch
        allowClear
        value={this.props.defaultValue}
        style={{ textTransform: 'uppercase', width: '70%' }}
        placeholder={
          this.props.defaultLabel == null
            ? 'Choose One Option'
            : this.props.defaultLabel
        }
        optionFilterProp="children"
        onChange={this.onChange}
        onSearch={this.props.onSearch}
      >
        {this.props.optionData
          ? this.props.optionData.map(d => (
              <Option
                style={{ textTransform: 'uppercase' }}
                value={d[this.props.dataValue]}
                key={d[this.props.dataValue]}
              >
                {d[this.props.dataValue]} - {d[this.props.dataLabel]}
              </Option>
            ))
          : ''}
      </Select>
    )
  }
}

export default Dropdown
