export default ({
  firebase: {
    serverKey: 'xxxxxxxxxxxxxxxxxxxxxxxx',
  },
  testerUrl: 'https://jsonplaceholder.typicode.com/users',
  api_data_dokumen_bc_20: 'https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems',
  api_data_dokumen_bc_25: 'https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems',
  menu: {
    menu1: 'https://httpbin.org/get',
    menu2: 'https://httpbin.org/get',
  },
});

const is_development = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
let WS_BASE = '';
if (!is_development) {
  WS_BASE = process.env.REACT_APP_AMWS_URL_LOCAL;
} else {
  WS_BASE = process.env.REACT_APP_AMWS_URL_BC;
}

const dok_url = 'https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems';
export const apiUrl = 'http://10.162.71.21:8111/Referensi';
export const apiUrl2 = 'http://10.161.4.89:8080/SingleCoreSchema';
export const apiUrl3 = 'http://10.161.4.89:8080/Perijinan/ref-jabatan-ppjk';
export const apiUrl4 = 'http://10.161.4.89:8080';
export const apiUrl5 = 'http://192.168.0.108:8384';
export const apiUrl6 = 'http://10.161.4.89:8080/Ap';
export const apiUrl7 = 'http://10.161.4.89:8080/gate-beacukai';
export const apiUrl8 = process.env.REACT_APP_AMWS_URL_BC;
export const apiUrl9 = 'http://wfdev.customs.go.id:8080/Referensi';
export const apiUrl10 = 'http://10.161.4.89:8080/Perijinan';
export const izinPpjkUrl = 'http://10.161.4.89:8080/Perijinan/ref-ahli-pabean-ppjk/';
export const izinPpjkUrlPost = 'http://10.161.4.89:8080/Perijinan/ref-ahli-pabean-ppjk';
export const apiPerijinanPublic = 'https://esbbcext01.beacukai.go.id:8081/Perijinan';
export const dataPabeanUrl = 'http://10.161.4.89:8080/Perijinan/ref-ahli-pabean';
export const dataPabeanUrlPost = 'http://10.161.4.89:8080/Perijinan/ref-ahli-pabean';
export const MapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCckIU89FuzrfQXBkRms73jQGYl-UOm0fI&v=3.exp&libraries=geometry,drawing,places';
export const apiUrl11 = 'http://10.161.4.89:8080/sce-ws';
export const gateUrl = 'http://10.161.4.89:8080/gate-beacukai/v1/gate/browse-dokumen-gate/';
// export const browseAPI = "http://10.102.104.243:8588/v1/";
export const browseAPI = 'http://10.161.4.89:8080/browse-service/v1';
export const apiUrlKey7 = "4a9f1ece-d805-4ff7-ba8f-2df7959f05c7";
export const singleCoreUrl = `http://10.161.4.89:8080/SingleCoreSchema/v1`;
export const apiUr20 = "http://10.161.4.84:8282/amws/v1";
export const jasperAPI = "http://10.102.104.243:8901/v1/jasperReport";
export const settingUrl = "http://10.162.71.73:8454/setting/v1";
export const sceAPI = "http://10.162.71.35:8188/sce-ws";
export const suratKuasaAPI = 'http://10.161.4.89:8080/SuratKuasa';
