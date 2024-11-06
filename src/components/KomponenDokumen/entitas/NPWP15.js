import React from 'react';
import MaskedInput from "antd-mask-input";
export default ({onChange, value}) => {
    return(
        <MaskedInput mask={"11.111.111.1-111.111"} onChange={onChange} value={value} />
    );
}