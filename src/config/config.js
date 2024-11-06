const { REACT_APP_SIMAUDI, REACT_APP_SIMAUDI_DEV, REACT_APP_SECRET_KEY_SIMAUDI, REACT_APP_SECRET_KEY_SIMAUDI_DEV } = process.env;

const alamat = window.location.href
if (alamat.includes("https://ceisa40.customs.go.id/")) {
    //Production
    module.exports = {
        apiUrl: REACT_APP_SIMAUDI,
        apiKey: { 'customs-api-key': REACT_APP_SECRET_KEY_SIMAUDI },
        apiHeaders: {
            'customs-api-key': REACT_APP_SECRET_KEY_SIMAUDI,
            "Access-Control-Allow-Origin": "*",
            'accept': '*',
            "cache-control": "no-cache"
        }
    };
} else if (alamat.includes("http://localhost:3150/") || alamat.includes("http://10.102.104") || alamat.includes("https://ceisa40-dev.customs.go.id/")) {
    module.exports = {
        //Develop atau Local
        apiUrl: REACT_APP_SIMAUDI_DEV,
        // apiUrl: 'http://10.102.104.53:8095/audit',
        apiKey: { 'beacukai-api-key': REACT_APP_SECRET_KEY_SIMAUDI_DEV },
        apiHeaders: {
            'beacukai-api-key': REACT_APP_SECRET_KEY_SIMAUDI_DEV,
            "Access-Control-Allow-Origin": "*",
            'accept': "*",
            "cache-control": "no-cache"
        }
    };
}
console.log("SIMAUDI VERSION: 1.4.2");
console.log("Date Merge: 25 Januari 2022");