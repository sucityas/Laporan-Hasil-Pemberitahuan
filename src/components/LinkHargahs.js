import React from 'react';
import {Link} from "react-router-dom";

export default function LinkHargahs(cellData) {
    return (
        <Link to={`/sce/profil-komoditi/price-suggestion/${cellData.value}`} >
            {cellData.value}
        </Link>
    );
}

