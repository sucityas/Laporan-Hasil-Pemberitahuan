const { REACT_APP_EMONITORING, REACT_APP_SECRET_KEY_EMONITORING } = process.env;

const alamat = window.location.href
if (alamat.includes("https://ceisa40.customs.go.id/")) {
    //Production
    module.exports = {
        apiUrl: REACT_APP_EMONITORING,
        apiHeader: { 
            'id' : 'usertes^$123456abc',
            'token': 'tokenadmin',
            'beacukai-api-key': REACT_APP_SECRET_KEY_EMONITORING 
        }

    };
} else if (alamat.includes("http://localhost:3150/") || alamat.includes("http://10.102.104") || alamat.includes("https://ceisa40-dev.customs.go.id/")) {
    module.exports = {
        //Develop atau Local
        apiUrl: REACT_APP_EMONITORING,
        // apiUrl: 'http://10.102.104.53:8080',
        apiHeader: { 
            'id' : 'usertes^$123456abc',
            'token': 'tokenadmin',
            'beacukai-api-key': REACT_APP_SECRET_KEY_EMONITORING 
        }
    };
}
console.log("E-AUDIT VERSION: 1.2.0");
console.log("Date Merge: 9 FEBRUARI 2021");