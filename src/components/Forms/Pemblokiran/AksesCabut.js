import {Checkbox} from 'antd';
import React, {Component} from 'react';

class AksesCabut extends Component {
    constructor(props) {

        super(props);
        this.state = {
            data: [],
            list: [],
            checked: [],
            result: [],
            validasi: null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    onChange() {
        return (
            this.state.checked
        )
    }

    handleChange(e) {

        let checked = this.state.checked;
        let result = [];
        let list = this.state.list;
        console.log(e);

        const index = checked.indexOf(e);
        index === -1 ?
            checked.push(e)
            :
            checked.splice(index, 1)

        list.map((e) => {
            return (
                result.push({name: e, checked: checked.indexOf(e) === -1 ? false : true})
            )
        })
        console.log("data blokir", {list, checked, result});
        this.setState({
            data: checked,
            result,
            list,
            checked
        }, () => {
            this.props.validasi(checked)
        })
        console.log('ngecek doang', result, list, checked)
    }

    async componentDidMount() {

        try {
            const data = this.props.data || null;


            await this.setState({
                list: (data.aksesDimiliki === undefined || data.aksesDimiliki === null) ? [] : data.aksesDimiliki.split(', '),
                checked: (data.aksesCabut === undefined || data.aksesCabut === null) ? [] : data.aksesCabut.split(', '),
            })
            // console.log("akses", this.state.list, this.state.checked);
            let result = []
            this.state.list.map((e) => {
                return (
                    result.push({name: e, checked: this.state.checked.indexOf(e) === -1 ? false : true})
                )
            })
            await this.setState({
                result
            })
            // console.log("data blokir", this.state.data);

        } catch (error) {
            console.warn(error);

        }
    }

    async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (prevProps.data !== this.props.data) {
            try {
                const data = this.props.data || null;


                await this.setState({
                    list: (data.aksesDimiliki === undefined || data.aksesDimiliki === null) ? [] : data.aksesDimiliki.split(', ').map(e => e.trim()),
                    checked: (data.aksesCabut === undefined || data.aksesCabut === null) ? [] : data.aksesCabut.split(', ').map(e => e.trim()),
                })
                // console.log("akses", this.state.list, this.state.checked);
                let result = []
                this.state.list.map((e) => {
                    return (
                        result.push({name: e, checked: this.state.checked.indexOf(e) === -1 ? false : true})
                    )
                })
                await this.setState({
                    result
                })
                // console.log("data blokir", this.state.data);

            } catch (error) {
                console.warn(error);

            }
        }
    }

    render() {
        console.log('dataProps', this.props.data)
        console.log('result goblog', this.state.result)
        return (
            <div style={{margin: 10}}>
                {
                    this.state.result.map((item, key) => {
                        return (
                            <>
                                <Checkbox style={{marginRight: 10}} key={`${key}`}
                                          checked={item.checked}>{item.name}</Checkbox>
                                {
                                    this.props.vertical ?
                                        ""
                                        :
                                        <br/>
                                }

                            </>
                        )
                    })
                }
                    <br/>
                    </div>
                    );
                }
}

export default AksesCabut;

