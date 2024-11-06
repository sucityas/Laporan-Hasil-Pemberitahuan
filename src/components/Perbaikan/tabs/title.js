import React, { Fragment } from "react";

import { Icon, Typography } from "antd";

const { Text } = Typography;

function title({ loading = false, error = "", title = "untitled" }) {
  // console.log('- render title tab', {loading, error});
  return (
    <Fragment>
      {
        <Text style={{ color: loading ? "#FF6600" : error ? "red" : "green" }}>
          {loading ? <Icon type="loading" /> : null}
          {title}
        </Text>
      }
    </Fragment>
  );
}

export default React.memo(title);
