import React from 'react'
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
    display: block;
    margin: 0 auto;
`;

export default class LoadingContent extends React.Component {


    render() {
        return (
            <div className='sweet-loading'>
                <ClipLoader
                    css={override}
                    sizeUnit={"px"}
                    size={85}
                    color={'#1e1e2d'}
                    loading={true}
                />
            </div>
        );
    }
}

