import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Select, Icon, Tooltip } from "antd";
import axios from "axios";
import { apiUrl } from "../../apis/ApiData";

const { Option } = Select;

export class FormPencarian extends Component {
  constructor() {
    super();
    this.state = {
      loadingKodeKantor: false,
      kodeKantorLoading: false,
      kodeKantorList: [],
      kodeSelected: undefined,
      namaSelected: "",
      inputKodeValue: ""
    };
  }

  componentDidMount() {
    axios
      .get(`${apiUrl}/v1/kantor/all`)
      .then(ok => {
        if (ok.data.length < 0) {
          this.setState({
            loadingKodeKantor: true
          });
        }
        console.log(ok.data);
        this.setState({
          kodeKantorList: ok.data,
          loadingKodeKantor: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  kosongkan = () => {
    this.setState({
      kodeSelected: undefined
    });
  };

  onChangeKode = (input, option) => {
    if (input === null || input === "" || input === undefined) {
      this.props.getCode(input);
      this.setState({
        kodeSelected: input
      });
    } else {
      this.props.getCode(option.props.title);
      this.setState({
        kodeSelected: option.props.title
      });
    }
  };

  render() {
    if (this.props.kosongkan) {
      return this.kosongkan;
    }
    return (
      <Fragment>
        <Select
          allowClear
          showSearch
          size={this.props.size === undefined ? "default" : this.props.size}
          suffixIcon={
            this.props.setIcon === undefined ? (
              <Tooltip title="Cari Berdasarkan Kode Kantor atau Nama Kantor">
                <Icon type="bank" />
              </Tooltip>
            ) : (
              this.props.setIcon
            )
          }
          style={
            this.props.style === undefined
              ? { width: "220px", position: "absolute" }
              : this.props.style
          }
          disabled={
            this.props.type ?
            this.props.type.toLowerCase() === "notdisabled"
              ? false 
              : this.props.value === undefined ||
                this.props.value === null ||
                this.props.value === ""
              ? false
              : true
              : this.props.value === undefined ||
              this.props.value === null ||
              this.props.value === ""
            ? false
            : true
          }
          value={
            this.props.value === undefined ||
            this.props.value === null ||
            this.props.value === ""
              ? this.state.kodeSelected
              : this.props.value
          }
          placeholder="Masukkan Nama / Kode Kantor"
          notFoundContent="Not Found"
          optionFilterProp="value"
          optionLabelProp="children"
          onSearch={async value => {
            await axios
              .get(
                `${
                  value === "" || value === null || value === undefined
                    ? `${apiUrl}/v1/kantor/getGroupsSevensToFifteen`
                    : `${apiUrl}/v1/kantor/getByparams/${value.toUpperCase()}`
                }`
              )
              .then(ok => {
                this.setState({
                  kodeKantorList: ok.data
                });
              })
              .catch(err => {
                console.log(err, "getting kode kantor");
              });
            this.setState({ inputKodeValue: value });
          }}
          onChange={(input, option) => this.onChangeKode(input, option)}
          filterOption={(input, option) =>
            option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {this.state.kodeKantorList.data === undefined
            ? null
            : this.state.kodeKantorList.data.map(data => {
                if (this.state.inputKodeValue === "") {
                  return (
                    <Option title={data.kodeKantor} value={data.kodeKantor}>
                      {" "}
                      {data.kodeKantor} - {data.namaKantorPendek}{" "}
                    </Option>
                  );
                } else if (isNaN(this.state.inputKodeValue)) {
                  return (
                    <Option
                      title={data.kodeKantor}
                      value={data.namaKantorPendek}
                    >
                      {" "}
                      {data.kodeKantor} - {data.namaKantorPendek}{" "}
                    </Option>
                  );
                } else if (!isNaN(this.state.inputKodeValue)) {
                  return (
                    <Option title={data.kodeKantor} value={data.kodeKantor}>
                      {" "}
                      {data.kodeKantor} - {data.namaKantorPendek}{" "}
                    </Option>
                  );
                }
              })}
        </Select>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FormPencarian);
