import {RestData} from "../apis/RestData";
import {apiUrl} from "../config/config";
import {getUser} from "./utils/DataUser";

export const LogUser = (id,kode) => {
    var dataSourceLogUser = new RestData(`${apiUrl}/loguser`);
    const log={};
    let user = getUser();
    log.idJenisDokumen=id;
    log.kodeJenisLog=kode;
    log.nip=user.nip;
    dataSourceLogUser.Store(log,res=>{});
}
