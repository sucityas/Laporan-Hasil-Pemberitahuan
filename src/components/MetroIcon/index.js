import React from "react";
import {Icon} from "antd";

const MetroIcon = ({value, style, color, backgroundColor, fontSize = '1.5rem'}) => {
  const fontMetro = [
    "fab fa",
    "fa fa-",
    "flatic",
    "la la",
    "socico"
  ]
  const newStyle = {
    ...style,
    fontSize,
    color,
    backgroundColor
  }
  if (value && fontMetro.includes(value.substr(0, 6))) {
    return (
      <i className={value} style={newStyle} />
    )
  }
  return (
    <Icon type={value || "form"} style={newStyle} />
  )
}

export default MetroIcon
