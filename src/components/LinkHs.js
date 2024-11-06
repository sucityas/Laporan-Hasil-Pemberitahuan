import React from 'react';
import {Link} from "react-router-dom";

export default function LinkHs(cellData) {
    return (
        <Link onClick={()=> window.open (`/sce/profil-komoditi/browse-hscode/${cellData.value}`)} >
            {cellData.value}
        </Link>
    );
}

