import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Col, DatePicker, Input, Row, Select } from "antd";
import axios from "axios";
import { apiUrl } from "../../apis/ApiData";
import moment from "moment";
import {getUser} from "./utils/DataUser";

const { RangePicker } = DatePicker;

const { Option } = Select;

export class FormPencarian extends Component {
  constructor() {
    super();
    this.state = {
      taggalStart: undefined,
      loadingJenisDok: false,
      loadingKodeKantor: false,
      disabledNamaKantor: true,
      taggalEnd: undefined,
      kodeKantorLoading: false,
      kodeKantorList: [],
      kodeSelected: undefined,
      namaSelected: "",
      kodeDokumenList: [],
      kodeDokumenSelected: undefined,
      kodeDokumenLoading: false,
      inputKodeValue: "",
      inputDokumenValue: ""
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
        if (getUser()) {
          const dataUser = getUser();
          this.setState({
            kodeSelected: dataUser.kodeKantor,
            namaSelected: ok.data.data.filter(data => {
              return data.kodeKantor === dataUser.kodeKantor;
            })[0].namaKantorPendek
          });
        }
        // console.log(ok.data);
        this.setState({
          kodeKantorList: ok.data,
          loadingKodeKantor: false
        });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`${apiUrl}/v1/dokumen/getByparamsGroupsOne`)
      .then(ok => {
        if (ok.data.length < 0) {
          this.setState({
            kodeDokumenLoading: true
          });
        }
        console.log(ok.data);
        this.setState({
          kodeDokumenList: ok.data,
          kodeDokumenLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  kosongkan = () => {
    this.setState({
      taggalStart: undefined,
      taggalEnd: undefined,
      kodeSelected: undefined,
      kodeDokumenSelected: undefined,
      namaSelected: undefined
    });
  };

  cari = () => {
    // nanti set di redux tanpa set state global
    // alert("kode Kantor yang dicari" + this.state.kodeSelected);
    this.props.getDataList({
      loading: true,
      kodeKantor: this.state.kodeSelected,
      namaKantor: this.state.namaSelected,
      jenisDokumen: this.state.kodeDokumenSelected,
      taggalStart:
        this.state.taggalStart === undefined
          ? undefined
          : moment(this.state.taggalStart).format("DD-MM-YYYY"),
      taggalEnd:
        this.state.taggalEnd === undefined
          ? undefined
          : moment(this.state.taggalEnd).format("DD-MM-YYYY"),
      listKantor: this.state.kodeKantorList,
      listDokumen: this.state.kodeDokumenList
    });
    // this.props.getListData(this.state.kodeSelected)
    console.log({
      [this.props.dataName]: {
        loading: true,
        kodeKantor: this.state.kodeSelected,
        namaKantor: this.state.namaSelected,
        jenisDokumen: this.state.kodeDokumenSelected,
        taggalStart:
          this.state.taggalStart === undefined
            ? undefined
            : moment(this.state.taggalStart).format("DD-MM-YYYY"),
        taggalEnd:
          this.state.taggalEnd === undefined
            ? undefined
            : moment(this.state.taggalEnd).format("DD-MM-YYYY"),
        listKantor: this.state.kodeKantorList,
        listDokumen: this.state.kodeDokumenList
      }
    });
    // this.props.setLoading({
    //   ['loading'+this.props.dataName]: true,
    //   ['kodeKantor'+this.props.dataName]: this.state.kodeSelected,
    //   ['namaKantor'+this.props.dataName]: this.state.namaKantor,
    //   ['jenisDokumen'+this.props.dataName]: this.state.kodeDokumenSelected,
    //   ['taggalStart'+this.props.dataName]:
    //     this.state.taggalStart === undefined
    //       ? undefined
    //       : moment(this.state.taggalStart).format("DD-MM-YYYY"),
    //   ['taggalEnd'+this.props.dataName]:
    //     this.state.taggalEnd === undefined
    //       ? undefined
    //       : moment(this.state.taggalEnd).format("DD-MM-YYYY"),
    //   ['listKode'+this.props.dataName]: this.state.listKode.data,
    //   ['listKantor'+this.props.dataName]: this.state.kodeKantorList,
    //   ['listDokumen'+this.props.dataName]: this.state.kodeDokumenList
    // });
    // this.props.setLoading({
    //   [this.props.dataName]: {
    //     loading: true,
    //     kodeKantor: this.state.kodeSelected,
    //     namaKantor: this.state.namaSelected,
    //     jenisDokumen: this.state.kodeDokumenSelected,
    //     taggalStart: this.state.taggalStart === undefined ? undefined : moment(this.state.taggalStart).format("DD-MM-YYYY"),
    //     taggalEnd: this.state.taggalEnd === undefined ? undefined : moment(this.state.taggalEnd).format("DD-MM-YYYY"),
    //     listKantor: this.state.kodeKantorList,
    //     listDokumen: this.state.kodeDokumenList
    //   }
    // })
  };

  inputListener = e => {
    console.log(e, e.target.name);
    if (e.target.name === "taggalDokumen") {
      this.setState({
        taggalStart: moment(e.target.value[0]),
        taggalEnd: moment(e.target.value[1])
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  onChangeKode = (input, option) => {
    if (input === null || input === "" || input === undefined) {
      this.setState({
        kodeSelected: input,
        namaSelected: input
      });
    } else {
      this.setState({
        kodeSelected: option.props.title,
        namaSelected: option.props.children.toString().replace(/,/g, "")
      });
    }
  };

  onChangeKodeDokumen = (input, option) => {
    if (input === null || input === "" || input === undefined) {
      this.setState({
        kodeDokumenSelected: input
      });
    } else {
      this.setState({
        kodeDokumenSelected: option.props.title.toString()
      });
    }
  };

  render() {
    return (
      <Fragment>
        <div className="kt-portlet">
          <div className="kt-portlet__head">
            <div className="kt-portlet__head-label">
              <h3 className="kt-portlet__head-title">{this.props.title}</h3>
            </div>
          </div>
          <div className="kt-portlet__body">
            <Row>
              <Col span={3}>Kode Kantor</Col>
              <Col span={6}>
                <Select
                  // disabled={SSO.kodeKantor === "009000" ? false : true}
                  allowClear
                  showSearch
                  style={{ width: "100%", position: "absolute" }}
                  value={this.state.kodeSelected}
                  placeholder="011600"
                  notFoundContent="Not Found"
                  optionFilterProp="value"
                  loading={
                    this.state.kodeDokumenList.data === undefined ? true : false
                  }
                  optionLabelProp="value"
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
                    option.props.value
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.state.kodeKantorList.data === undefined
                    ? null
                    : this.state.kodeKantorList.data.map(data => {
                        if (this.state.inputKodeValue === "") {
                          return (
                            <Option
                              title={data.kodeKantor}
                              value={data.kodeKantor}
                            >
                              {" "}
                              {data.namaKantorPendek}{" "}
                            </Option>
                          );
                        } else if (isNaN(this.state.inputKodeValue)) {
                          return (
                            <Option
                              title={data.kodeKantor}
                              value={data.namaKantorPendek}
                            >
                              {" "}
                              {data.namaKantorPendek}{" "}
                            </Option>
                          );
                        } else if (!isNaN(this.state.inputKodeValue)) {
                          return (
                            <Option
                              title={data.kodeKantor}
                              value={data.kodeKantor}
                            >
                              {" "}
                              {data.namaKantorPendek}{" "}
                            </Option>
                          );
                        }
                      })}
                </Select>
              </Col>
              <Col span={6} offset={1}>
                <Input
                  value={this.state.namaSelected}
                  className="ant-dropdown-link"
                  readOnly
                  placeholder="Nama Kantor"
                />
              </Col>
              <br />
              <br />
              {this.props.useDokumen ? (
                <div>
                  <Col span={3}>Nomor Dokumen</Col>
                  <Col span={6}>
                    <Select
                      allowClear
                      showSearch
                      value={this.state.kodeDokumenSelected}
                      style={{ width: "100%" }}
                      placeholder="Jenis Dokumen"
                      optionFilterProp="value"
                      notFoundContent="Not Found"
                      loading={
                        this.state.kodeDokumenList.data === undefined
                          ? true
                          : false
                      }
                      onSearch={async value => {
                        await axios
                          .get(
                            value === "" ||
                              value === null ||
                              value === undefined
                              ? `${`${apiUrl}/v1/dokumen/getByparamsGroupsOne`}`
                              : `${apiUrl}/v1/dokumen/getByparams/${value.toUpperCase()}`
                          )
                          .then(ok => {
                            this.setState({
                              kodeDokumenList: ok.data
                            });
                            console.log(this.state.kodeDokumenList);
                          })
                          .catch(err => {
                            console.log(err, "getting jenis dokumen");
                          });
                        this.setState({ inputDokumenValue: value });
                      }}
                      optionLabelProp="children"
                      onChange={(input, option) =>
                        this.onChangeKodeDokumen(input, option)
                      }
                      filterOption={(input, option) =>
                        option.props.value
                          .toString()
                          .toUpperCase()
                          .indexOf(input.toString().toUpperCase()) >= 0
                      }
                    >
                      {this.state.kodeDokumenList.data === undefined
                        ? null
                        : this.state.kodeDokumenList.data.map(data => {
                            if (this.state.inputDokumenValue === "") {
                              return (
                                <Option
                                  title={data.kodeDokumen}
                                  value={data.kodeDokumen}
                                >
                                  {" "}
                                  {data.namaDokumen}{" "}
                                </Option>
                              );
                            } else if (isNaN(this.state.inputDokumenValue)) {
                              return (
                                <Option
                                  title={data.kodeDokumen}
                                  value={data.namaDokumen}
                                >
                                  {" "}
                                  {data.namaDokumen}{" "}
                                </Option>
                              );
                            } else if (!isNaN(this.state.inputDokumenValue)) {
                              return (
                                <Option
                                  title={data.kodeDokumen}
                                  value={data.kodeDokumen}
                                >
                                  {" "}
                                  {data.namaDokumen}{" "}
                                </Option>
                              );
                            }
                          })}
                    </Select>
                  </Col>
                  <br />
                  <br />
                </div>
              ) : null}

              <Col span={3}>Periode</Col>
              <Col span={6}>
                <RangePicker
                  allowClear={false}
                  value={[this.state.taggalStart, this.state.taggalEnd]}
                  onChange={(e, val) => {
                    this.inputListener({
                      target: { value: val, name: "taggalDokumen" }
                    });
                  }}
                />
              </Col>
              <br />
              <br />
              <Col span={3}></Col>
              <Col span={12}>
                <button
                  disabled={
                    this.state.kodeSelected === undefined ? true : false
                  }
                  className={"btn btn-outline-primary"}
                  onClick={() => this.cari()}
                >
                  <i className="fa fa-search" style={{ lineHeight: "1" }} />
                  Cari
                </button>
                &nbsp;
                <button
                  className={"btn btn-outline-danger"}
                  onClick={this.kosongkan}
                >
                  <i className="flaticon-circle" style={{ lineHeight: "1" }} />{" "}
                  Kosongkan
                </button>
              </Col>
            </Row>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FormPencarian);
