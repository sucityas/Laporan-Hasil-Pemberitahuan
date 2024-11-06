import React, { Component } from "react";
import { Checkbox, Skeleton } from "antd";
import axios from "axios";
const { REACT_APP_PERIJINAN, REACT_APP_SECRET_KEY_PERIJINAN } = process.env;

class AksesBlokirSingle extends Component {
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
    let result = [];
    let list = this.state.list;
    let checked = this.state.checked;

    const index = checked.indexOf(e);
    index === -1 ? checked.push(e) : checked.splice(index, 1);

    list.map((item) => {
      return result.push({
        name: item.name,
        checked: checked.indexOf(item.name) === -1 ? false : true,
      });
    });
    this.setState({
      result,
      list: result,
    });
    this.props.callback(checked);
  }

  async componentDidMount() {
    try {
      this.setState({
        loading: true,
      });
      const npwp = this.props.data.npwp15;
      const res = await axios.get(
        `${REACT_APP_PERIJINAN}/pemblokiran/browse-daftar-perusahaan`,
        {
          params: {
            npwp: npwp,
          },
          headers: {
            "beacukai-api-key": `${REACT_APP_SECRET_KEY_PERIJINAN}`,
          },
        }
      );
      if (res.status === 200) {
        const aksesDimiliki = res.data.data.aksesDimiliki;
        const list =
          aksesDimiliki === undefined && aksesDimiliki === null
            ? []
            : aksesDimiliki.split(",").map((e) => e.trim());
        let result = [];
        list.map((item) => {
          return result.push({
            name: item,
            checked:
              this.props.visible === item
                ? true
                : this.props.visible === "SELURUHNYA"
                ? true
                : false,
          });
        });
        let checked = [];
        list.map((item) => {
          if (this.props.visible === "SELURUHNYA") {
            return checked.push(item);
          } else if (this.props.visible === item) {
            return checked.push(item);
          } else {
            return (checked = []);
          }
        });
        this.setState({
          result: result,
          list: result,
          checked: checked,
        });
        this.props.callback(checked);
      }
    } catch (error) {
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { visible } = this.props;
    return (
      <div style={{ margin: 10 }}>
        {this.state.loading ? (
          <Skeleton paragraph={3} active />
        ) : (
          this.state.result.map((item, key) => {
            return (
              <>
                <Checkbox
                  key={`${key}`}
                  onChange={() => this.handleChange(item.name)}
                  disabled={
                    visible === "SELURUHNYA"
                      ? true
                      : visible === "SEBAGIAN"
                      ? false
                      : true
                  }
                  checked={item.checked}
                >
                  {item.name}
                </Checkbox>
                <br />
              </>
            );
          })
        )}
        <br />
      </div>
    );
  }
}

export default AksesBlokirSingle;
