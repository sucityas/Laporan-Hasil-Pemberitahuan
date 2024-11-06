import React from 'react'
import Dropdown from '../../components/Forms/Dropdown/DropdownWithSearch'
import axios from 'axios'
import { getUserAccessToken } from '../../utils/DataUser'

class DropdownKantorPengawasan extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      optionData: [],
    }
    this.getReferensiKantorPengawasan = this.getReferensiKantorPengawasan.bind(this)
  }

  async componentDidMount() {
    await this.getReferensiKantorPengawasan()
  }

  getReferensiKantorPengawasan = async e => {
    try {
      const token = await getUserAccessToken()
      const res = await axios.get(`${process.env.REACT_APP_REFERENSI}/v1/kantor/all`,{
        headers:{
          'beacukai-api-key': process.env.REACT_APP_SECRET_KEY_REFERENSI,      
          Authorization: 'Bearer ' + token,    
          }
      })
      this.setState({
        optionData: res.data.data,
      })
    } catch (error) {
      console.log('error pada DropdownKantorPengawasan', e)
    }
  }

  handleChange(e) {
    if (typeof e !== 'undefined') {
      this.props.onChange(e)
    } else {
      this.props.onChange(null)
      this.getReferensiKantorPengawasan() // search default
    }
  }

  render() {
    return (
      <Dropdown
      disabled={this.props.disabled}
        onChange={this.handleChange.bind(this)}
        defaultLabel="PILIH KANTOR"
        optionData={this.state.optionData}
        dataLabel="namaKantorPendek"
        dataValue="kodeKantor"
        defaultValue={this.props.value}
        // defaultValue={this.props.defaultValue}
        children={this.props.children}
      />
    )
  }
}

export default DropdownKantorPengawasan