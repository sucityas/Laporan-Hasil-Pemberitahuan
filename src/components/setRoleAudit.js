
import React from "react";
import { getUser } from "./utils/DataUser";

{/*
    35064001 PERENCANAAN
    35064002 PELAKSANAAN AUDIT I
    35064003 PELAKSANAAN AUDIT II
    2017020509040500 TU DIKREKTORAT
    35064004 MONITORING EVALUASI
    35061207 SUBDIREKTORAT PSI IKC

    MAPPING
    0 = all role
    1 = perencanaan
    2 = pelaksanaan
    3 = perencanaan, pelaksanaan
    4 = monev
    5 = TU DIREKTORAT
    6 = perencanaan, tu kanwil, tim audit
    7 = TU kanwil, tim audit
*/}

export const setRoleAudit = (role, timAudit) => {
    let user = getUser();
    let userUnit = user.kodeUnitOrganisasiInduk;
    let userNip = user.nip;

    if (role == "0") {
        if (userUnit == "35064001" || userUnit == "35064002" || userUnit == "35064003" || userUnit == "2017020509040500" || userUnit == "35064004" || userUnit == "35061207") {
            return false;
        } else {
            return true;
        }
    } else if (role == "1") {
        if (userUnit == "35064001" || userUnit == "35061207") {
            return false;
        } else {
            return true;
        }
    } else if (role == "2") {
        if (userUnit == "35064002" || userUnit == "35064003" || userUnit == "35061207") {
            return false;
        } else {
            return true;
        }
    } else if (role == "3") {
        if (userUnit == "35064001" || userUnit == "35064002" || userUnit == "35064003" || userUnit == "35061207") {
            return false;
        } else {
            return true;
        }
    } else if (role == "4") {
        if (userUnit == "35064004" || userUnit == "35061207") {
            return false;
        } else {
            return true;
        }
    } else if (role == "5") {
        if (userUnit == "2017020509040500" || userUnit == "35061207") {
            return false;
        } else {
            return true;
        }
    } else if (role == "6") {
        if (userUnit == "35064001" || userUnit == "35061207") {
            return false;
        } else {
            // cek apakah nip nya include di dalam array tim audit
            // jika iya return false
            // jika tidak return true
            // if (timAudit.length() > 0) {
            //     for (var i = 0; i < timAudit.length; i++) {
            //         if(userNip == timAudit[i].nip){
            //             return false;
            //         }
            //     }
            //     return true;
            // }
            return true;
        }
    } else if (role == "7") {
        if (userUnit == "35061207") {
            return false;
        } else {
            if (timAudit.length() > 0) {
                // cek apakah nip nya include di dalam
                // jika iya return false
                // jika tidak return true
            }
            return true;
        }
    }
};
