const { REACT_APP_HDFS, REACT_APP_SECRET_KEY_HDFS } = process.env;

export const UploadFile = {
    name: 'file',
    action: REACT_APP_HDFS + "/v1/hdfs/upload?path=audit",
    headers: {
        'beacukai-api-key': REACT_APP_SECRET_KEY_HDFS,
    },
    showUploadList: false
}