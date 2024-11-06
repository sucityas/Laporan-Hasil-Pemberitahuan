const { REACT_APP_HDFS_NEW, REACT_APP_SECRET_KEY_HDFS_NEW } = process.env;

export const UploadFileVhd = {
    name: 'file',
    action: REACT_APP_HDFS_NEW + "/v1/hdfs/upload?path=vhd",
    headers: {
        'beacukai-api-key': REACT_APP_SECRET_KEY_HDFS_NEW,
    },
    showUploadList: false
}