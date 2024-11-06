import React from 'react'
import Dropdown from '../../components/Forms/Dropdown/DropdownRemoteData'
import { apiUrl } from '../../apis/ApiData'
import { getUserAccessToken } from '../../utils/DataUser'

class DropdownPelabuhan extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      optionData: [],
    }
    this.type = this.props.type || null
    this.getReferensiPelabuhan = this.getReferensiPelabuhan.bind(this)
    this.dropdownProps = {}
  }

  componentDidMount() {
    this.getReferensiPelabuhan(this.props.value ? this.props.value : 'ID')
  }

  getReferensiPelabuhan = async q => {
    this.waitingFor = q
    const token = await getUserAccessToken()
    const url =
      this.type === 'luar'
        ? `/v1/pelabuhan/getByparamsExclude/`
        : this.type === 'campur'
        ? `/v1/pelabuhan/`
        : `/v1/pelabuhan/getByparams/`
    fetch(process.env.REACT_APP_REFERENSI + url + q.toUpperCase(), {
      headers: {
        'beacukai-api-key': process.env.REACT_APP_SECRET_KEY_REFERENSI,
        Authorization: 'Bearer ' + token,    
        'accept': 'application/json',
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
      disabled={this.props.enabled}
        onSearch={this.handleSearch.bind(this)}
        children={this.props.children}
        onChange={this.handleChange.bind(this)}
        defaultLabel={this.props.defaultLabel}
        defaultValue={this.props.value}
        optionData={this.state.optionData}
        dataLabel="namaPelabuhan"
        style={{ width: '100%' }}
        dataValue="kodePelabuhan"
      />
    )
  }
}

DropdownPelabuhan.defaultProps = { defaultLabel: 'PILIH PELABUHAN' }

export default DropdownPelabuhan
