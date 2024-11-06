import React, {Component} from "react";
import {Input} from 'antd';

export default class QuickSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: this.props.def ? this.props.def : '',
            data: []
        };
        this.searcBox = this.searcBox.bind(this);
        this.inputListen = this.inputListen.bind(this);
        this.asyncFirst = this.asyncFirst.bind(this)

        window.addEventListener('click', (e) => e.target.className == 'filterItem' || e.target.className == 'ant-input' ? null : this.setState({data: []}))
    }

    searcBox() {
        let searchItem = {
            backgroundColor: 'white',
            cursor: 'pointer',
        }
        if (this.state.data.length > 0) {
            let keyword = this.state.keyword
            let pointer = this.props.pointer
            let pointer2 = this.props.pointer2
            let handler = this.props.clickHandler
            let that = this
            return (
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    position: 'absolute',
                    border: 'solid #cdcdcd 1px',
                    zIndex: '99999999',
                    width: '100%',
                    maxHeight: '150px',
                    overflowY: 'auto',
                    padding: '8px'
                }}>
                    {
                        (

                            this.state.data.filter(val => {

                                console.log(val);
                                let text = typeof val[pointer2] != undefined ? val[pointer2] : '';
                                let pattern = typeof val[pointer2] != undefined ? val[pointer] + text : val[pointer];
                                return pattern.toLowerCase().match(keyword)
                            })).map((item, i) => <div
                            className={'filterItem'}
                            onClick={(e) => {
                                handler(item);
                                that.setState({keyword:  pointer2 ? ` ${item[pointer2]} - ${item[pointer]}` :  item[pointer], data: null})
                            }} onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#86bbea'} key={i} style={searchItem}>
                            {pointer2 ? ` ${item[pointer2]} - ` : null} {item[pointer]}
                        </div>)}
                </div>
            );
        }
    }

    async inputListen(e) {
        this.setState({keyword: e.target.value});
        this.setState({data: await this.props.data(e.target.value)})

    }

    async asyncFirst(e) {
        this.setState({data: await this.props.data(' ')})
    }


    render() {
        return (
            <div style={{position: 'relative'}}>
                <Input value={this.state.keyword} onFocus={this.asyncFirst} onChange={this.inputListen}/>
                {this.state.data && this.state.data.length > 0 ? this.searcBox() : null}
            </div>
        );
    }

}

const dummy = [
    {name: 'budi'},
    {name: 'yunita'},
    {name: 'masradi'},
    {name: 'yumi'},
    {name: 'siaman'},
    {name: 'karni'},
    {name: 'cien'},
    {name: 'lisda'},
    {name: 'kusti'},
]