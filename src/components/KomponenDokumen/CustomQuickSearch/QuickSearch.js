import React, { Component } from 'react'
import { Input, Empty, Spin, Row, Col } from 'antd'

const controller = new AbortController()

export default class QuickSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: this.props.def ? this.props.def : '',
      value: undefined,
      kantor: undefined,
      caraBayar: undefined,
      tujuanPengeluaran: undefined,
      negara: undefined,
      bendera: undefined,
      muat: undefined,
      transit: undefined,
      timbun: undefined,
      placeholder: this.props.placeholder ? this.props.placeholder : '',
      data: [],
      clicked: true,
    }
    this.searcBox = this.searcBox.bind(this)
    this.inputListen = this.inputListen.bind(this)
    this.asyncFirst = this.asyncFirst.bind(this)
    this.prosses = this.prosses.bind(this)
    this.blurAction = this.blurAction.bind(this)
    window.addEventListener('click', e =>
      e.target.className == 'filterItem' || e.target.className == 'ant-input'
        ? null
        : () => {
            this.setState({ data: [], clicked: true })
            controller.abort()
          }
    )
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.negara !== nextProps.negara) {
      if (nextProps.negara.kodeNegara) {
        this.setState({
          negara: nextProps.negara,
          keyword: `${nextProps.negara.kodeNegara} - ${nextProps.negara.namaNegara}`,
        })
      }
    }
  }

  renewKeyword(keyword) {
    this.setState({
      keyword,
    })
  }

  searcBox() {
    if (this.state.data.length > 0) {
      let pointer = this.props.pointer
      let pointer2 = this.props.pointer2
      let that = this
      let keyword = document.getElementById('quickSearch').value
      return (
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            position: 'absolute',
            border: 'solid #cdcdcd 1px',
            zIndex: '99999999',
            width: '100%',
            maxHeight: '150px',
            overflowY: 'auto',
            padding: '8px',
          }}
        >
          {this.state.data.map((item, i) =>
            this.renderItem(pointer2, pointer, item, i)
          )}
        </div>
      )
    }
  }

  async inputListen(e) {
    controller.abort()
    let input = e.target.value

    this.setState({ keyword: input, clicked: false })
    let data = await this.props.data(input)
    await this.setState({ data: data ? data : [] })
    if (this.state.data.length == 0) {
      this.setState({ clicked: true })
    }
  }

  async asyncFirst(e) {
    this.setState({ data: await this.props.data(''), isFocus: true })
  }

  renderItem(pointer2, pointer, item, i) {
    let searchItem = {
      backgroundColor: 'white',
      cursor: 'pointer',
    }
    let handler = this.props.clickHandler
    return (
      <div
        className={'filterItem'}
        onClick={async e => {
          handler(item)
          await this.setState({
            keyword: pointer2
              ? ` ${item[pointer2]} - ${item[pointer]}`
              : item[pointer],
            data: [],
            clicked: true,
          })
        }}
        onMouseOut={e => (e.target.style.backgroundColor = 'white')}
        onMouseEnter={e => (e.target.style.backgroundColor = '#86bbea')}
        key={i}
        style={searchItem}
      >
        {pointer2 ? ` ${item[pointer2]} - ` : null} {item[pointer]}
      </div>
    )
  }

  nullData = () => (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        position: 'absolute',
        border: 'solid #cdcdcd 1px',
        zIndex: '10',
        width: '100%',
        maxHeight: '150px',
        overflowY: 'auto',
        padding: '8px',
      }}
    >
      <Empty description={<span>Tidak Ada Hasil </span>} />
    </div>
  )

  prosses() {
    if (this.state.data) {
      if (this.state.keyword) {
        if (this.state.keyword.length >= 0) {
          if (this.state.data.length > 0) {
            return this.searcBox()
          } else {
            if (this.state.clicked == false) {
              return this.nullData()
            }
          }
        }
      }
    }
  }

  blurAction() {
    let that = this
    setTimeout(() => {
      that.setState({
        data: [],
        clicked: true,
      })
    }, 300)
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <Row gutter={10}>
          <Col span={20}>
            <Input.Search
              id={'quickSearch'}
              autoComplete={'off'}
              allowClear
              placeholder={`${this.state.placeholder}`}
              value={this.state.keyword}
              onFocus={this.asyncFirst}
              onBlur={this.blurAction}
              onChange={this.inputListen}
            />

            {this.prosses()}
          </Col>
          {this.props.loading ? (
            <Col span={4}>
              {' '}
              <Spin />
            </Col>
          ) : null}
        </Row>
      </div>
    )
  }
}
