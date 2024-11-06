import {Skeleton} from "antd";
import React from "react";

const LoadingWrapperSkeleton = ({avatar = true, paragraph = 10}) => {
  return (
    <div className="kt-portlet kt-portlet--mobile">
      <div className="kt-content  kt-grid__item kt-grid__item--fluid">
        <Skeleton active avatar={avatar} paragraph={{ rows: paragraph }} />
      </div>
    </div>
  )
}

export default LoadingWrapperSkeleton;
