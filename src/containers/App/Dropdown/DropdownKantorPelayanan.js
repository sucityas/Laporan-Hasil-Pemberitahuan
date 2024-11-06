import React from 'react'
import Dropdown from '../../../components/Forms/Dropdown/DropdownRemoteData'
import { apiUrl } from '../../../apis/ApiData'

class DropdownKantorPelayanan extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      optionData: [],
    }

  }

  componentDidMount() {
    this.getReferensiKantorPelayanan()
    // this.getReferensiPelabuhan('ID')
  }

  componentWillMount() {}

  getReferensiKantorPelayanan = async e => {
    const referensiKantorAll = `${apiUrl}/v1/kantor/all`
    const options = {
      header: { accept: 'application/json' },
      'Access-Control-Allow-Origin': '*',
    }

    try {
      const res = await fetch(referensiKantorAll, options)
      const body = await res.json()
      // const dataReferensiKantor = await body.data.map(
      //   a => `${a.kodeKantor} - ${a.namaKantorPendek}`
      // )
      // console.log('ini loh data referensi kantor: ', dataReferensiKantor)

      this.setState({
        optionData: body.data,
      })
    } catch (error) {
      console.log('error di DropdownKantorPelayanan.js -> getReferensikantor()')
    }
  }

  // getReferensiPelabuhan = q => {
  //   this.waitingFor = q
  //   fetch(`${apiUrl}/v1/pelabuhan/getByparams/${q.toUpperCase()}`, {
  //     header: {
  //       accept: 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //   }).then(response => {
  //     if (response.status === 200) {
  //       if (q === this.waitingFor) {
  //         response.json().then(body => {
  //           this.setState({ optionData: body.data })
  //         })
  //       }
  //     }
  //   })
  // }

  handleChange(e) {
    if (typeof e !== 'undefined') {
      this.props.onChange(e)
    } else {
      this.props.onChange(null)
      // this.getReferensiPelabuhan('ID') // search default
      // this.getReferensiKantorPelayanan(e)

      this.getReferensiKantorPelayanan(e)
    }
  }

  handleSearch(e) {
    // e === '' ? this.getReferensiPelabuhan('ID') : this.getReferensiPelabuhan(e)
    this.getReferensiKantorPelayanan(e)
  }

  render() {
    console.log('devaultVal', this.props.defaultVal)
    return (
      <Dropdown
        onSearch={this.handleSearch.bind(this)}
        children={this.props.children}
        onChange={this.handleChange.bind(this)}
        defaultLabel="Pilih Kantor Pelayanan"
        defaultValue={this.props.defaultValue}
        optionData={this.state.optionData}
        dataLabel="namaKantorPendek"
        dataValue="kodeKantor"
      />
    )
  }
}

export default DropdownKantorPelayanan
