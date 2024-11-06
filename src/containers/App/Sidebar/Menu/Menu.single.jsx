import React from "react";
import { Link } from 'react-router-dom'
import MetroIcon from "../../../../components/MetroIcon";

const MenuParent = props => {
  return (
    <>
      <li className={`kt-menu__item ${props.path ? "kt-menu__item--active" : null}`} aria-haspopup="true">
        <Link to={props.url} className="kt-menu__link ">
          <span className="kt-menu__link-icon">
            {/*<Icon type={props.icon || "form"} />*/}
            <MetroIcon value={props.icon} />
           </span>
          <span className="kt-menu__link-text">{props.name}</span>
        </Link>
      </li>
    </>
  );
};

export default MenuParent;
