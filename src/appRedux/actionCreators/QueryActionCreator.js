export const filterToQuery = (filter, fields) => {
    var Query = "";
    for(var i = 0; i < fields.length; i++) {
        if (fields.length===1) {
            Query = `( ${fields[i].name} like "%25${filter}%25" )`;
        } else {
            if (i === 0) {
                if (fields[i].dataType === "string") {
                    Query += `( UPPER(${fields[i].name}) like UPPER("%25${filter}%25") or `;
                } else {
                    Query += `( `;
                }
            } else if (i === (fields.length-1)) {
                if (fields[i].dataType === "string") {
                    Query += `UPPER(${fields[i].name}) like UPPER("%25${filter}%25"))`;
                } else {
                    Query += `)`;
                }
            } else {
                if (fields[i].dataType === "string") {
                    Query += `UPPER(${fields[i].name}) like UPPER("%25${filter}%25") or `;
                }
            }
        }
    }
    return Query;
};
