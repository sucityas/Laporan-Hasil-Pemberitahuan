import Axios from "axios";
import { apiKey } from "../config/config";

export class RestData {

    constructor(base_url) {
        this.BASE_URL = base_url;
    }

    GetData(callback) {
        this.SendRequest("get", this.BASE_URL, callback);
    }

    async GetOne(id, callback) {
        this.SendRequest("get", `${this.BASE_URL}/${id}`, callback);
    }

    async Store(data, callback) {
        console.log(data);
        this.SendRequest("post", this.BASE_URL, callback, data)
    }

    async Update(data, callback) {
        this.SendRequest("put", `${this.BASE_URL}`, callback, data);
    }

    async Delete(data, callback) {
        this.SendRequest("delete", `${this.BASE_URL}/${data}`, callback, data);
    }

    async SendRequest(method, url, callback, data) {
        console.log(url);
        try {
            callback((await Axios.request({
                method: method,
                url: url,
                data: data,
                headers: apiKey
            })).data);
        } catch(err) {
            console.log("Error : "+err);
            callback(err);
            // "Operation Failed: Network Error";
        }
    }
}
