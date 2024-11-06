import React from 'react'
import Dropdown from '../../components/Forms/Dropdown/DropdownRemoteData'
import { getUserAccessToken } from '../../utils/DataUser'
//import { apiUrl } from '../../apis/ApiData'

class   DropdownNegara extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      optionData: [],
    }

    this.getReferensiNegara = this.getReferensiNegara.bind(this)
  }

  componentDidMount() {
    this.getReferensiNegara('A')
  }

  getReferensiNegara = async q => {
    this.waitingFor = q
    const token = await getUserAccessToken()
    fetch(`${process.env.REACT_APP_REFERENSI}/v1/negara/ByKata/${q.toUpperCase()}`, {
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
      this.getReferensiNegara('A') // search default
    }
  }

  handleSearch(e) {
    e === '' ? this.getReferensiNegara('A') : this.getReferensiNegara(e)
  }

  render() {
    return (
      <Dropdown
      disabled={this.props.enabled}
        onSearch={this.handleSearch.bind(this)}
        children={this.props.children}
        onChange={this.handleChange.bind(this)}
        defaultLabel="PILIH NEGARA"
        // value={this.props.value}
        defaultValue={this.props.value}
        optionData={this.state.optionData}
        dataLabel="namaNegara"
        dataValue="kodeNegara"
      />
    )
  }
}

export default DropdownNegara
