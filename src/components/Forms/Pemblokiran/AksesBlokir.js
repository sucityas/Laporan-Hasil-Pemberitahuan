import { Checkbox } from 'antd';
import React, { Component } from 'react';

class AksesDiblokir extends Component {
    constructor(props) {

        super(props);
        this.state = {
            data: [],
            list: [],
            checked: [],
            result: [],
            validasi: null,
            select: null,
            load: 0
        }
        this.handleChange = this.handleChange.bind(this)
    }

    onChange() {
        return (
            this.state.checked
        )
    }

    handleChange(e) {
        console.log("tes", e)

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
                result.push({ name: e, checked: checked.indexOf(e) === -1 ? false : true, disabled : false })
            )
        })
        console.log("data blokir", { list, checked, result });
        this.setState({
            data: checked,
            result,
            list,
            checked
        }, () => {
            this.props.validasi(checked)
        })




    }
    checkedFunc = (select) => {
        console.log("tesss",select);
        if(select === "SELURUHNYA"){
            let result = this.state.result.map(q => ({ ...q,  checked: true, disabled: true }))
            this.setState({result})
        }else if (select === "PPJK (PENGUSAHA PENGURUSAN JASA KEPABEANAN)") {
            let result = this.state.result.map(q => ({ ...q,  checked: q.name === 'PPJK (PENGUSAHA PENGURUSAN JASA KEPABEANAN)', disabled: true }))
            this.setState({result})
        } else if(select === "SEBAGIAN") {
            let result = this.state.result.map(e => ({...e, checked : false, disabled : false}))
            this.setState({ result })
        }else {
            this.setState({
                result : null
            })
        }
    }

    async componentDidMount() {

        try {
            const data = this.props.data || null;

            await this.setState({
                list: (data.aksesDimiliki === undefined || data.aksesDimiliki === null) ? [] : data.aksesDimiliki.split(', '),
                checked: (data.aksesBlokir === undefined || data.aksesBlokir === null) ? [] : data.aksesBlokir.split(', '),
            })
            this.setState({ select: this.props.configSelect }, () => {
                console.log("selectz", this.state.select)
            })
            // console.log("akses", this.state.list, this.state.checked);
            let result = []
            this.state.list.map((e) => {
                return (
                    result.push({ name: e, checked: this.state.checked.indexOf(e) === -1 ? false : true })
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

    async componentDidUpdate(prevProps, _prevState, _snapshot) {

        //Disini Ki.
        if (this.props.isLoad !== this.state.load) {
            this.setState({
                load: this.props.isLoad,
                select: this.props.configSelect
            }, () => {
                this.checkedFunc(this.state.select)
            })
        }

        if (prevProps.data !== this.props.data) {

            try {
                const data = this.props.data || null;


                await this.setState({
                    list: (data.aksesDimiliki === undefined || data.aksesDimiliki === null) ? [] : data.aksesDimiliki.split(', ').map(e => e.trim()),
                    checked: (data.aksesBlokir === undefined || data.aksesBlokir === null) ? [] : data.aksesBlokir.split(', ').map(e => e.trim()),

                })

                let result = []
                this.state.list.map((e) => {
                    return (
                        result.push({ name: e, checked: this.state.checked.indexOf(e) === -1 ? false : true })
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

        return (
            <div style={{ margin: 10 }}>
                {
                    this.state.result.map((item, key) => {
                        return (
                            <>
                                <Checkbox style={{ marginRight: 10 }} key={`${key}`}
                                    disabled={item.disabled}
                                    checked={item.checked}
                                    value={item.name}
                                    onChange={() => this.handleChange(item.name)}>
                                    {item.name}
                                </Checkbox>
                                {
                                    this.props.vertical ?
                                        ""
                                        :
                                        <br />
                                }

                            </>
                        )
                    })
                }
                <br />
            </div>
        );
    }
}

export default AksesDiblokir;

