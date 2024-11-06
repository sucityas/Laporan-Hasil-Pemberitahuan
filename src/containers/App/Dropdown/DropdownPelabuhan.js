import React from 'react'
import Dropdown from '../../../components/Forms/Dropdown/DropdownRemoteData'
import { apiUrl } from '../../../apis/ApiData'

class DropdownPelabuhan extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      optionData: [],
    }

    this.getReferensiPelabuhan = this.getReferensiPelabuhan.bind(this)
  }

  componentDidMount() {
    this.getReferensiPelabuhan('ID')
  }

  getReferensiPelabuhan = q => {
    this.waitingFor = q
    fetch(`${apiUrl}/v1/pelabuhan/getByparams/${q.toUpperCase()}`, {
      header: {
        accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }).then(response => {
      if (response.status === 200) {
        if (q === this.waitingFor) {
          response.json().then(body => {
            this.setState({ optionData: body.data })
          })
        }
      }
    })
  }

  handleChange(e) {
    if (typeof e !== 'undefined') {
      this.props.onChange(e)
    } else {
      this.props.onChange(null)
      this.getReferensiPelabuhan('ID') // search default
    }
  }

  handleSearch(e) {
    e === '' ? this.getReferensiPelabuhan('ID') : this.getReferensiPelabuhan(e)
  }

  render() {
    return (
      <Dropdown
        onSearch={this.handleSearch.bind(this)}
        children={this.props.children}
        onChange={this.handleChange.bind(this)}
        defaultLabel="Pilih Pelabuhan"
        defaultValue={this.props.defaultValue}
        optionData={this.state.optionData}
        dataLabel="namaPelabuhan"
        dataValue="kodePelabuhan"
      />
    )
  }
}

export default DropdownPelabuhan
