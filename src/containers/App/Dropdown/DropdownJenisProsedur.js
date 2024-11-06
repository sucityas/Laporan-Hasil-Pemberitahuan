import React from "react";
import Dropdown from "../../components/Forms/Dropdown/DropdownWithSearch";
import {apiUrl} from '../../apis/ApiData';

class DropdownJenisProsedur extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            optionData: []
        }
    }

    componentDidMount() {
        this.getReferensiJenisProsedur();
    }

    getReferensiJenisProsedur(e) {        
        fetch(`${apiUrl}/v1/jenis-prosedur-dok/byKodeDok/20`, {
            header: {
                'accept': 'application/json', 'Access-Control-Allow-Origin': '*'
            },
        })
        .then(response => response.json())
        .then(body => {           
            this.setState({optionData: body.data})            
        });
    }
    

    render() {
        return (
            <Dropdown onChange={this.props.onChange} defaultLabel="Pilih Pelabuhan" optionData={this.state.optionData} dataLabel="namaJenisProsedur" dataValue="kodeJenisProsedur"/>
        )
    }
}

export default DropdownJenisProsedur;
    