import {notification} from "antd";

export const Notification = (res) => (

    res.status === "success" ?
        notification.success({
            message: res.message,
            duration: 2,
        }) :
        notification.error({
            message: res.message,
            duration: 2,
        })
);