import React, { Component } from "react";
import { Checkbox } from "antd";

class AksesBlokirDisable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      list: [],
      checked: [],
      result: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onChange() {
    return this.state.checked;
  }

  handleChange(e) {
    let checked = this.state.checked;
    let result = [];
    let list = this.state.list;

    const index = checked.indexOf(e);
    index === -1 ? checked.push(e) : checked.splice(index, 1);

    list.map((e) => {
      return result.push({
        name: e,
        checked: checked.indexOf(e) === -1 ? false : true,
      });
    });
    this.setState({
      data: checked,
      result,
      list,
      checked,
    });
  }

  componentDidMount() {
    try {
      const data = this.props.data || null;
      const list =
        data.aksesDimiliki === undefined && data.aksesDimiliki === null
          ? []
          : data.aksesDimiliki.split(", ").map((e) => e.trim());
      const checked =
        data.aksesBlokir === undefined && data.aksesBlokir === null
          ? []
          : data.aksesBlokir.split(", ").map((e) => e.trim());
      // console.log('gebug',checked,list)
      let result = [];
      list.map((e) => {
        return result.push({
          name: e,
          checked: checked.indexOf(e.trim()) === -1 ? false : true,
        });
      });
      this.setState({
        result,
      });
    } catch (error) {
      console.warn(error);
    }
  }
  render() {
    return (
      <div style={{ margin: 10 }}>
        {this.state.result.map((item, key) => {
          return (
            <>
              <Checkbox
                key={`${key}`}
                disabled={this.props.disabled}
                checked={item.checked}
                onChange={() => this.handleChange(item.name)}
              >
                {item.name}
              </Checkbox>
              <br />
            </>
          );
        })}
        <br />
      </div>
    );
  }
}

export default AksesBlokirDisable;
