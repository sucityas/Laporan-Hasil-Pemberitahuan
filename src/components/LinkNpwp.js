import React from 'react';
import { NavLink } from 'react-router-dom';
export default function LinkNpwp(cellData) {
    return (
        <NavLink to={`/sce/profil-perusahaan/browse-perusahaan/${cellData.value}`}>
            {cellData.value}
        </NavLink>
    );
}

