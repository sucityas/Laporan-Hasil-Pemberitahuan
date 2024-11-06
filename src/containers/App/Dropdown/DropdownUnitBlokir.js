import React, { Component } from "react";
import { Select } from "antd";
import axios from "axios";
const { Option } = Select;

const dataOption = [
  {
    value: "1",
    nama: "Dit Teknis",
  },
  {
    value: "2",
    nama: "Dit P2",
  },
  {
    value: "3",
    nama: "Kanwil Jakarta",
  },
];
class DropdownUnitBlokir extends Component {
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
        `${process.env.REACT_APP_API_PERIJINAN}/v1/ref-unit-rekomendasi`,
        {
          headers: {
            [isLocalhost ? "beacukai-api-key" : "customs-api-key"]:
              process.env.REACT_APP_SECRET_KEY_PERIJINAN,
          },
        }
      );
      if (res.status === 200) {
        console.log(res.data.data);
        this.setState({
          dataOption: res.data.data,
        });
      } else {
        console.warn("fetch failed");
        this.setState({
          dataOption: [],
        });
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
          value={this.props.value || "Pilih Unit"}
          style={{ width: this.props.width || 300 }}
          disabled={this.props.disabled}
          placeholder="Pilih Unit"
          onChange={this.props.onChange}
        >
          {this.state.dataOption.map((e, i) => {
            return (
              <Option value={e.kodeUnit} key={`DUB${i}`}>
                {e.namaUnit}
              </Option>
            );
          })}
        </Select>
      </div>
    );
  }
}

export default DropdownUnitBlokir;
