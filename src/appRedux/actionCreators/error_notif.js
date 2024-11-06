
import { notification, message, Button } from 'antd';
import React from "react";
import ReactDOM from "react-dom";

export default ({
    openMessage() {
        message.config({
            duration: 4,
            top: 100
        });
        message.warning('Menghubungkan Ulang...')
    },
    openNotificationWithIcon(type) {
        notification[type]({
            message: 'Koneksi Bermasalah!',
            duration: 10,
            description:
                'Please check your connection!',
        });
    },


});
