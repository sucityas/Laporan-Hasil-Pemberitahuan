import React from 'react'
import { Icon, Spin } from 'antd';

const antIcon = 
	<Icon
		type="loading"
		style={{ fontSize: 25}}
		spin
	/>

const Loading = () => {
	return (
		<React.Fragment>
			<Spin indicator={antIcon}/>
		</React.Fragment>
	)
}

export default Loading()
