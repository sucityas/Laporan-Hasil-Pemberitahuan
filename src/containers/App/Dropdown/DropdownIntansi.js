import React, { Component } from "react";
import { Select } from "antd";
import axios from "axios";
const { Option } = Select;

class DropdownIntansi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOption: [],
    };
  }

  async componentDidMount() {
    try {
      const isLocalhost =
        window.location.host == "ceisa40-dev.customs.go.id" || "localhost:3150";
      const res = await axios.get(
        `${process.env.REACT_APP_PERIJINAN}/v1/ref-instansi?page=0&size=100`,
        {
          headers: {
            [isLocalhost ? "beacukai-api-key" : "customs-api-key"]:
              process.env.REACT_APP_SECRET_KEY_PERIJINAN,
          },
        }
      );
      if (res.status === 200) {
        console.log(res.data.data);
        this.setState(
          {
            dataOption: res.data.data,
          },
          () => {
            console.log("dataOption", this.state.dataOption);
          }
        );
      } else {
        console.warn("fetch failed");
      }
    } catch (error) {
      console.warn(error);
    }
  }

  render() {
    return (
      <div>
        <Select
          showSearch
          allowClear={true}
          defaultValue={this.props.defaultValue}
          style={{ width: this.props.width || 300 }}
          placeholder="Pilih Instansi"
          onChange={this.props.onChange}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {this.state.dataOption.map((e, i) => {
            return (
              <Option value={e.idInstansi} key={`DJ${i}`}>
                {e.namaInstansi}
              </Option>
            );
          })}
        </Select>
      </div>
    );
  }
}

export default DropdownIntansi;
