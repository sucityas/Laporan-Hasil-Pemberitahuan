import React from 'react';
import {Button, Form, Input, Row, Col, Upload, message, Icon, Spin} from 'antd';
import QuickSearch from "./QuickSearch";
import {apiUrl10} from "../../apis/ApiData";


class AddEditForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: Math.ceil(Math.random() * 100000),
            items: []

        };

        this.getFormData = this.getFormData.bind(this);
        this.changeNoSertifikat = this.changeNoSertifikat.bind(this);
        this.onChange = this.onChange.bind(this);
        this.jabatanHandler = this.jabatanHandler.bind(this);
        this.getJabatan = this.getJabatan.bind(this)
    }


    submitFormAdd = (item) => {
        this.props.addItemToState(this.state.form);
        this.props.toggle()
    };


    submitFormEdit = (item) => {
        this.props.updateState(item);
        this.props.toggle()
    };

    componentDidMount(e) {
        this.setState({ loading: true });
        // if item exists, populate the state with proper data
        if (this.props.item) {
            const {id, first, last, email, phone, location, hobby} = this.props.item;
            this.setState({form: {id, first, last, email, phone, location, hobby}})
        }
        fetch(`http://10.161.4.89:8080/Perijinan/v1/mode_tampoeng/edit?seqIzin=f76aa5e8-a228-4064-9f30-68a20860c0ca`, {
            header: { 'accept': 'application/json'},
        })
            .then(response => response.json())
            .then(body => {
                this.setState(
                    {
                        hasil: body.data,
                        getsertifikat : body.data.tdAhliPabeanPpjk[0].nomorSertifikat,
                        KodeJabatan: body.data.tdAhliPabeanPpjk[0].kodeJabatan,
                        Nik : body.data.tdAhliPabeanPpjk[0].nik
                    })
                console.log(this.state.getsertifikat)
                // alert(body.message)
            });
    }

    async getFormData() {
        let val = document.getElementById('noSerifikat').value;
        // let url = `${apiUrl5}/${val}`;
        let urlvalidate = `http://10.161.4.89:8080/Perijinan/ref-ahli-pabean/validate?noSertifikat=${val}`;
        this.setState({fetch: true});
        await fetch(urlvalidate, {
            headers: {
                'accept': 'application/json',
            }
        })
            .then(response => response.json())
            .then(body => {
                alert(body.message)
                if(body.status == "success") {
                    this.setState({
                        nameNih: body.data.nama,
                        npp: body.data.npp,
                        noSertifikat: body.data.noSertifikat,
                        noSeri: body.data.noSeri,
                        tanggalSertifikat: body.data.tanggalSertifikat,
                    })
                }


            });
        this.setState({fetch: false})
    }

    changeNoSertifikat(e) {
        this.setState({
            noSertifikat: e.target.value
        })
    }

    async onChange(e) {
        // eslint-disable-next-line default-case
        switch (e.target.name) {
            case 'nama': {
                this.setState({
                    nameNih: e.target.value
                });
                break;
            }
            case 'noSerifikat': {
                this.setState({
                    noSerifikat: e.target.value
                });
                break;
            }
            case 'berkasLampiran': {
                if(e.target.files[0].size < 20000000){
                    let name =  e.target.files[0].name;
                    let file = e.target.files[0];
                    let reader = new FileReader();
                    let that = this;

                    reader.onloadend = () => that.setState({
                        lampiranName: name,
                        lapiranBase65: reader.result
                    });

                    reader.readAsDataURL(file);
                }else {
                    alert('Data terlalu besar')
                }
                break;
            }
            case 'ktpUpload': {
                e.preventDefault();
                if(e.target.files[0].size < 20000000){
                    let that = this;
                    let name =  e.target.files[0].name;
                    let file = e.target.files[0];
                    let reader = new FileReader();

                    reader.onloadend = () => that.setState({
                        ktpName: name,
                        ktpBase64: reader.result
                    });


                    reader.readAsDataURL(file);

                }else {
                    alert('Data terlalu besar')
                }
                break;
            }
            case 'nik': {
                this.setState({
                    nik: e.target.value
                });
                break;
            }
            case 'level': {
                this.setState({
                    level: e
                });
                break;
            }
            case 'noSeri':{
                this.setState({
                    noSeri: e.target.value
                });
                break;
            }
        }
    }

    sendData(){
        //memasukan data ke tabel tt
        this.props.addItemToState({
            uraianJabatan: this.state.level,
            nik: this.state.nik,
            nomorSertifikat: this.state.noSertifikat,
            nama: this.state.nameNih,
            noSeri: this.state.noSeri,
            tanggalSertifikat: this.state.tanggalSertifikat,
            ktpb64 : this.state.ktpBase64.substring(1),
            sertifikatb64 : this.state.lapiranBase65,
            urlFile: {
                ktp: this.state.ktpBase64,
                sertifikat: this.state.lapiranBase65,
            }
        });

        this.setState({
            nameNih: '',
            noSerifikat: '',
            lampiranName: '',
            lapiranBase65: '',
            ktpName: '',
            ktpBase64: '',
            nik: '',
            level: '',
            noSeri: ''
        })
    }
    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    async getJabatan(e) {
        this.setState({fetchLevel: true});
        let data = await fetch(`${apiUrl10}/ref-jabatan-ppjk`, {
            header: {'accept': 'application/json'},
            'Access-Control-Allow-Origin': '*'
        })
            .then(response => response.json())
            .then(body => body.data);
        this.setState({fetchLevel: false});
        return data
        console.log(data)
    }
    jabatanHandler(e){
        this.setState({
            level: e.kodeJabatan
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row gutter={10}>
                    <Col span={12}>
                        <Row gutter={10}>
                            <Col span={5}><label>No Sertifikat</label></Col>
                            <Col span={10}>
                                <Input type="text" required='required' name='noSerifikat' id="noSerifikat" value={this.state.noSertifikat }
                                       onChange={this.changeNoSertifikat} />
                            </Col>
                            <Col span={6}>
                                {this.state.fetch ? <Spin /> : <Button onClick={this.getFormData} type="primary" shape="circle" icon="search"/>}
                            </Col>
                        </Row><br/>

                        <Row gutter={10}>
                            <Col span={5}><label>Tanggal Sertikat</label></Col>
                            <Col span={10}>
                                <Input type="date" name="tglSertifikat"
                                       value={this.formatDate(this.state.tanggalSertifikat ? this.state.tanggalSertifikat : new Date())}
                                       onChange={this.onChange}/>
                            </Col>
                        </Row><br/>

                        <Row gutter={10}>
                            <Col span={5}><label>Nama Ahli Pabean</label></Col>
                            <Col span={10}>
                                <Input type="text" name="nama" id="nama"
                                       value={this.state.nameNih}
                                       onChange={this.onChange}/>
                            </Col>
                        </Row><br/>
                        <Row gutter={10}>
                            <Col span={5}><label>Berkas Lampiran</label></Col>
                            <Col span={10}>
                                <Button onClick={() => document.getElementById('berkasLampiran').click()} type="primary" ><Icon type="upload" /> {this.state.lampiranName ? this.state.lampiranName : 'Upload file lampiran'}</Button>
                                <Input style={{display: 'none'}} id='berkasLampiran' type="file" name="berkasLampiran"
                                       onChange={this.onChange}/>
                            </Col>
                        </Row><br/>
                    </Col>
                    <Col span={12}>
                        <Row gutter={10}>
                            <Col span={5}><label>No Seri Sertifikat</label></Col>
                            <Col span={10}>
                                <Input type="text" name='noSeri' value={this.state.noSeri}
                                       onChange={this.onChange}/>
                            </Col>
                        </Row><br/>
                        <Row gutter={10}>
                            <Col span={5}><label>Nik KTP Ahli Pabean</label></Col>
                            <Col span={10}>
                                <Input type="text" name='nik' value={this.state.nik ? this.state.nik : this.state.Nik}
                                       onChange={this.onChange}/>
                            </Col>
                        </Row><br/>
                        <Row gutter={10}>
                            <Col span={5}><label>Jabatan</label></Col>
                            <Col span={10}>
                                <Row gutter={10}>
                                    <Col span={22}>
                                        <QuickSearch clickHandler={this.jabatanHandler} pointer2={null}
                                                         pointer={'uraianJabatan'}
                                                         isFetching={this.fetching} data={this.getJabatan}>

                                        </QuickSearch>
                                    </Col>
                                    <Col span={2}>
                                        {this.state.fetchLevel ? <Spin /> : ''}
                                    </Col>
                                </Row>

                            </Col>
                        </Row><br/>
                        <Row gutter={10}>
                            <Col span={5}><label>Lampiran KTP</label></Col>
                            <Col span={10}>
                                <Button onClick={() => document.getElementById('ktpUpload').click()} type="primary" ><Icon type="upload" /> {this.state.ktpName ? this.state.ktpName : 'Upload file KTP'}</Button>
                                <Input style={{display: 'none'}} id='ktpUpload' type="file" name="ktpUpload"
                                       onChange={this.onChange}/>
                            </Col>
                        </Row><br/>
                    </Col><br/>
                </Row>
                <Button type="button" htmlType="submit"
                        onClick={() => this.props.item ? this.submitFormEdit(this.state.form) : this.sendData()}>Submit</Button>
            </Form>
        );
    }
}

const WrappedDemo = Form.create({ name: 'validate_other' })(AddEditForm);

export default WrappedDemo;
