import React from 'react'

import Dropdown from '../../components/Forms/Dropdown/DropdownWithSearch'
import { getUserAccessToken} from '../../utils/DataUser'
class DropdownCaraAngkut extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      optionData: [],
    }
  }

  async componentDidMount() {
    await this.getReferensiCaraBayar()
  }

  async getReferensiCaraBayar(e) {
    const token = await getUserAccessToken()
    fetch(`${process.env.REACT_APP_REFERENSI}/v1/cara-angkut/all`, {
      headers: {
        'beacukai-api-key': process.env.REACT_APP_SECRET_KEY_REFERENSI,
        Authorization: 'Bearer ' + token,
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(response => response.json())
      .then(body => {
        this.setState({ optionData: body.data })
      })
  }

  render() {
    return (
      <Dropdown
      disabled={this.props.enabled}
        onChange={this.props.onChange}
        defaultLabel={this.props.defaultLabel}
        optionData={this.state.optionData}
        dataValue="kodeCaraAngkut"
        dataLabel="namaCaraAngkut"
        defaultValue={this.props.defaultValue}
      />
    )
  }
}
DropdownCaraAngkut.defaultProps = { defaultLabel: 'PILIH CARA ANGKUT' }

export default DropdownCaraAngkut
