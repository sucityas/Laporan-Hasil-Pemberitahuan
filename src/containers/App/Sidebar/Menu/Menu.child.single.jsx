import React from "react";
import { Link } from "react-router-dom";

const MenuChildSingle = props => {
  return (
    <li className={`kt-menu__item ${props.active === true ? "kt-menu__item--active" : null}`} aria-haspopup="true">
      <Link to={props.url || ''} className="kt-menu__link ">
        <i className="kt-menu__link-bullet kt-menu__link-bullet--dot">
          <span/>
        </i>
        <span className="kt-menu__link-text">{props.name}</span>
      </Link>
    </li>
  );
};

export default MenuChildSingle;
