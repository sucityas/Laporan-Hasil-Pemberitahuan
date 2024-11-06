import React from "react";

const MenuSection = props => (
  <li className="kt-menu__section ">
    <h4 className="kt-menu__section-text">{props.name}</h4>
    <i className="kt-menu__section-icon flaticon-more-v2"></i>
  </li>
);
export default MenuSection;
