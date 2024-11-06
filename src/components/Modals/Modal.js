import React, {Component} from 'react'
import {Button, Row} from "antd";
import AddEditForm from '../Forms/FormAddEdit'

class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    };

    render() {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>

        const label = this.props.buttonLabel

        let button = '';
        let title = '';

        if (label === 'Edit') {
            button = <Button
                color="warning"
                onClick={this.toggle}
                style={{float: "left", marginRight: "10px"}}>{label}
            </Button>;
            title = 'Edit Item'
        } else {
            button = <Button
                onClick={this.toggle}
                style={{float: "left", marginRight: "10px"}}>{this.state.modal ? 'Tutup' : label}
            </Button>;
            title = 'Add New Item'
        }


        return (
            <div>
                <br/>
                <Row>{button}</Row> <br/>
                {this.state.modal ?  <Row>
                    <AddEditForm
                        addItemToState={this.props.addItemToState}
                        updateState={this.props.updateState}
                        toggle={this.toggle}
                        item={this.props.item}/>
                </Row>: null}
            </div>
        )
    }
}

export default ModalForm
