import React, { Component } from "react";
import { Select } from "antd";
import axios from "axios";

const { Option } = Select;
const { REACT_APP_PERIJINAN, REACT_APP_SECRET_KEY_PERIJINAN } = process.env;

const dataOption = [
  {
    value: "1",
    nama: "Kategori 1",
  },
  {
    value: "2",
    nama: "Kategori 2",
  },
  {
    value: "3",
    nama: "Kategori 3",
  },
];

class DropdownKategoriBlokir extends Component {
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
      const res = await axios.get(`${REACT_APP_PERIJINAN}/v1/blokir`, {
        headers: {
          [isLocalhost
            ? "beacukai-api-key"
            : "customs-api-key"]: `${REACT_APP_SECRET_KEY_PERIJINAN}`,
        },
        params: {
          page: 0,
          size: 20,
        },
      });
      if (res.status === 200) {
        this.setState({
          dataOption: res.data.data,
        });
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
          style={{ width: '100%' }}
          showSearch
          allowClear={true}
          value={this.props.value || "Pilih Kategori"}
          // style={{ width: this.props.width || 300 }}
          placeholder="Pilih Kategori"
          disabled={this.props.disabled}
          onChange={this.props.onChange}
        >
          {this.state.dataOption.map((e, i) => {
            return (
              <Option value={e} key={`DKB${i}`}>
                {e.uraian}
              </Option>
            );
          })}
        </Select>
      </div>
    );
  }
}

export default DropdownKategoriBlokir;
