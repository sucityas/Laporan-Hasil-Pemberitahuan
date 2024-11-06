import React from 'react';
import {Link} from "react-router-dom";

export default function LinkPelabuhan(cellData) {
    return (
        <Link to={`/sce/profil-pelabuhan/browse-pelabuhan/${cellData.value}`} >
            {cellData.value}
        </Link>
    );
}

