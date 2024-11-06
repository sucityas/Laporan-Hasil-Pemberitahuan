
import {notification, message} from 'antd';

export default ({

     openMessage(){
         message.config({
             duration: 4,
             top: 100
         });
         message.warning('Menghubungkan Ulang...')
     },


    openNotificationWithIcon(type) {
        notification[type]({
            message: 'Something when wrong',
            duration: 10,
            description:
              'Please check your connection!',
        });
    },


});


