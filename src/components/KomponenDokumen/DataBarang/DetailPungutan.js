import React, { Component } from "react";
import { Input, Button, Select, Row, Col, InputNumber, Checkbox } from 'antd';
import DropdownFasilitasTarif from "./../../../containers/Dropdown/DropdownFasilitasTarif";


export default class DetailPungutan extends Component {

    state = {
        title:{
            text: "title"
        },
        bm: {
            firstField: '',
            secondField: '',
            type: 1,
            jenisTarif: 'BM',
            fasilitas: { kodeFasilitasTarif: 0, namaFasilitasTarif: "" }
        },
        bmad: {
            firstField: '',
            secondField: '',
            fasilitas: { kodeFasilitasTarif: 0, namaFasilitasTarif: "" }
        },
        bmtp: {
            firstField: '',
            secondField: '',
            fasilitas: { kodeFasilitasTarif: 0, namaFasilitasTarif: "" }
        },
        bmin: {
            firstField: '',
            secondField: '',
            fasilitas: { kodeFasilitasTarif: 0, namaFasilitasTarif: "" }
        },
        bmpb: {
            firstField: '',
            secondField: '',
            fasilitas: { kodeFasilitasTarif: 0, namaFasilitasTarif: "" }
        },
        ppn: {
            firstField: '',
            secondField: '',
            fasilitas: { kodeFasilitasTarif: 0, namaFasilitasTarif: "" }
        },
        ppnbm: {
            firstField: '',
            secondField: '',
            fasilitas: { kodeFasilitasTarif: 0, namaFasilitasTarif: "" }
        },
        pph: {
            firstField: '',
            secondField: '',
            fasilitas: { kodeFasilitasTarif: 0, namaFasilitasTarif: "" }
        },
        cukai: {
            firstField: '',
            secondField: '',
            fasilitas: { kodeFasilitasTarif: 1, namaFasilitasTarif: "" }
        },
    }

    changeState = (field, value = {}) => {
        console.log(value);
        this.setState({
            field : {
                ...this.state[field],
                ...value
            }
        })
    }

    render() {
        console.log(this.state.ti)
        const { doc, bm, ppn, ppnBm, pph, cukai } = this.props;
        return (
            <div>
                <h4>Detail Pungutan</h4>
                {
                    bm && (
                        <>
                            <FormRow
                                doc={doc}
                                label={['BM','BMKITE']}
                                showFasilitas={true}
                                tarifType={"BM"}
                            />
                            <FormRow
                                doc={doc}
                                label={"BMAD"}
                                showFasilitas={true}
                                showCheck={true}
                                tarifType={"BM"}
                                checkLabel={"BMADS"}
                            />
                            <FormRow
                                doc={doc}
                                label={"BMTP"}
                                showFasilitas={true}
                                showCheck={true}
                                tarifType={"BM"}
                                checkLabel={"BMTPS"}
                            />
                            <FormRow
                                doc={doc}
                                label={"BMIM"}
                                showFasilitas={true}
                                showCheck={true}
                                tarifType={"BM"}
                                checkLabel={"BMIMS"}
                            />
                            <FormRow
                                doc={doc}
                                label={"BMPB"}
                                showFasilitas={true}
                                showCheck={true}
                                tarifType={"BM"}
                                checkLabel={"BMPBS"}
                            />
                        </>
                    )
                }
                {
                    ppn && (
                        <FormRow
                            doc={doc}
                            label={"PPN"}
                            showCheck={true}
                            tarifType={"PPN"}
                            checkLabel={"PPNS"}
                        />
                    )
                }
                {
                 ppnBm && (
                     <FormRow
                         doc={doc}
                         label={"PPnBM"}
                         showCheck={true}
                         tarifType={"PPNBM"}
                         checkLabel={"BMTPS"}
                     />
                 )   
                }
                {
                    pph && (
                        <FormRow
                            doc={doc}
                            label={"PPh"}
                            tarifType={"PPH"}
                        />
                    )
                }
                {
                    cukai && (
                        <FormRow
                            doc={doc}
                            label={"Cukai"}
                            tarifType={"CUKAI"}
                            showCheck={true}
                        />
                    )
                }
                <button onClick={() => this.changeState("title", { text: "title diganti"})}>
                    {this.state.title.text}
                </button>
            </div>
        )
    }
}

class FormRow extends Component {

    render() {
        const { Option } = Select;
        const { doc, tarifType, showCheck, checkLabel, label, showFasilitas } = this.props;
        return (
            <div className={"row m-3"}>
                <div className={showCheck ? "col-1" : "col-2"}>
                    {
                        typeof label === 'object' ? (
                            <Select
                                style={{
                                    width: '100%'
                                }}
                                defaultValue={label[0]}
                            >
                                {
                                    label.map((item, ) => (
                                        <Option value={item}>{item}</Option>
                                    ))
                                }
                            </Select>
                        ) : (
                            <div className={"pl-1"}>
                                <label>{label}</label>
                            </div>
                        )
                    }
                </div>
                {
                    showCheck && (
                        <div className={'col-1'}>
                            <Checkbox>
                                    {checkLabel}
                            </Checkbox>
                        </div>
                    )
                }
                <div className={"col-2"}>
                    {
                        showFasilitas && (
                            <Select
                                placeholder={'Fasilitas Pembayaran'}
                                style={{
                                    width: '100%'
                                }}>
                                <Option value={"1"}>Advalorum</Option>
                                <Option value={"2"}>Spesifik</Option>
                            </Select>
                        )
                    }
                </div>
                <div className={"col-1"}>
                    <InputNumber step={0.1}
                    />
                </div>
                <div className={"col-4"}>
                    <DropdownFasilitasTarif
                        doc={doc}
                        type={tarifType}
                    />
                </div>
                <div className={"col-2"}>
                    <InputNumber step={0.1}
                    />
                </div>
            </div>
        )
    }
}