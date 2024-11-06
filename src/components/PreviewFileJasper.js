import React from "react";
import axios from "axios";
import { apiUrl, apiKey } from "../config/config";
import { Button } from "antd";

class PreviewFileJasper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
        this.PreviewFileJasper = this.PreviewFileJasper.bind(this);
    }

    PreviewFileJasper = (e, f) => {
        console.log("id : ", e)
        this.setState({
            loading: true
        })

        axios(`${apiUrl}/report/${e}`, {
            method: 'GET',
            headers: apiKey,
            responseType: 'blob'
        })
            .then(response => {
                console.log("File response:", response)
                console.log("File response type:", response.data.type)

                // let headerLine = response.headers['content-disposition']
                // let startFileNameIndex = headerLine.indexOf('=') + 1
                // let fileName = headerLine.substring(startFileNameIndex)
                let fileName = f
                const validasiFile = response.data.type
                const file = new Blob(
                    [response.data],
                    { type: validasiFile }
                );

                if (response.status == 200) {
                    this.setState({
                        loading: false
                    })
                }

                console.log(file)
                //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                // console.log("validasi : ", validasiFile)

                // const fileName = 'my-test.docx';
                const a = document.createElement('a');

                a.href = fileURL;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();

                document.body.removeChild(a);
                URL.revokeObjectURL(fileURL);

                //Open the URL on new Window
                // window.open(fileURL);
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <Button
                loading={this.state.loading}
                type="primary"
                onClick={() => this.PreviewFileJasper(this.props.id, this.props.fileName)}
                hidden={this.props.hidden !== undefined || this.props.hidden !== null ? this.props.hidden : false}
            >
                {this.props.label !== undefined ? this.props.label : "Unduh Report"}
            </Button>
        )
    }
}

export default PreviewFileJasper;