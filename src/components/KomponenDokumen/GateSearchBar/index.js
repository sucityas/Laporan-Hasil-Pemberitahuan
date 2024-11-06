import React, {Component, Fragment} from 'react';
import { Input, Radio, DatePicker, Form } from 'antd';
import moment from 'moment';
// import 'antd/dist/antd.css';
const optionsWithDisabled = [
    { label: 'Kontainer', value: 'kontainer' },
    { label: 'Kemasan', value: 'kemasan' },
]


const { Search } = Input;
class DevExpressCustom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valueRadio:'kontainer',
            formDate:false
        }
    }


    componentDidMount() {
      setTimeout(() => this.props.mountDone(true), 1000) 
    }

    onChangeRadio = (e) => {
        this.setState({
            valueRadio:e.target.value
        })
    }

    render() {
        const { hasFeedback, validateStatus, msg } = this.props.validate;
        return (
            <div style={{marginTop:"20px", marginBottom:"20px"}}>
                <Radio.Group
                    options={optionsWithDisabled}
                    onChange={this.onChangeRadio}
                    value={this.state.valueRadio}
                />
                {this.state.valueRadio === 'kemasan' ?
                    <DatePicker 
                        showTime
                        format={'DD-MM-YYYY HH:mm:ss'}
                        placeholder="Select Time"
                        onChange={(e, ea) => this.setState({formDate:e})}
                    />
                    : null
                }
                <p/>
                <Form.Item
                    hasFeedback={true}
                    validateStatus={validateStatus}
                    help={msg}
                >
                    <Input
                        placeholder={`Cari Nomor ${this.state.valueRadio === 'kemasan' ? 'Daftar' : 'Kontainer'}...`}
                        onPressEnter={(val) => this.props.onChange(val.target.value, this.state.formDate && this.state.formDate.format('YYYY-MM-DD'), this.state.valueRadio)}
                    />
                </Form.Item>
                <p/>
                <br/>
            </div>
        );
    }
}

export default DevExpressCustom