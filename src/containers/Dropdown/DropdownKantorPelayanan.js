import React from "react";
import Dropdown from "../../components/Forms/Dropdown/DropdownWithSearch";
import axios from "axios";

class DropdownKantorPelayanan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      optionData: []
    };
  }

  async componentDidMount() {
    await this.getReferensiKantor();
  }

  getReferensiKantor = async e => {
    try {
      const res = await axios.get(
        `http://10.162.71.21:8111/Referensi/v1/kantor/all`
      );
      this.setState({
        optionData: res.data.data
      });
    } catch (error) {
      console.log("error pada DropdownKantorPelayanan", e);
    }
  };

  render() {
    return (
      <Dropdown
        onChange={this.props.onChange}
        defaultLabel="PILIH KANTOR"
        optionData={this.state.optionData}
        dataLabel="namaKantorPendek"
        dataValue="kodeKantor"
        defaultValue={this.props.defaultValue}
        disabled={this.props.disabled}
      />
    );
  }
}

export default DropdownKantorPelayanan;
