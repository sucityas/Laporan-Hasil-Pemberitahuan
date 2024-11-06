import React, {useState} from "react";

import MenuChildSingle from "./Menu.child.single";

const MenuChildMulti = props => {
  const [menuMulti_Active2, setMenuMulti_Active2] = useState(false);
  const menuMulti_Active = props.child.findIndex(item => item.url === props.path) >= 0
  const MenuRender = () => {
    // return props.child.map((item, idx) => {
    //   return <MenuChildSingle key={idx} name={item.name} url={item.url} active={props.path === item.url} />;
    // });

    return props.child.map((item, idx) => {
      const child = item.children || [];
      if (child.length > 0) {
        const check = child.find(itemChild => itemChild.url === props.path)
        if (check && check.url === props.path) {
          setMenuMulti_Active2(child.findIndex(itemChild => itemChild.url === props.path) >= 0)
        }
      //klo mau level 5 ini harus di ganti dengan comp lain
        return <MenuChildMulti key={idx} name={item.name} child={child} path={props.path}/>
      }
      else {
        return <MenuChildSingle key={idx} name={item.name} url={item.url} active={props.path === item.url}/>
      }
    });
  };

  return (
    <li
      className={`kt-menu__item  kt-menu__item--submenu ${menuMulti_Active || menuMulti_Active2 ? "kt-menu__item--active kt-menu__item--open" : null}`}

      // className={`kt-menu__item  kt-menu__item--submenu ${menuMulti_Active ? "kt-menu__item--active  kt-menu__item--open" : null}`}
      aria-haspopup="true"
      data-ktmenu-submenu-toggle="hover"
    >
      <a className="kt-menu__link kt-menu__toggle">
        <i className="kt-menu__link-bullet kt-menu__link-bullet--line">
          <span/>
        </i>
        <span className="kt-menu__link-text">{props.name}</span>
        <i className="kt-menu__ver-arrow la la-angle-right"/>
      </a>
      <div className="kt-menu__submenu ">
        <span className="kt-menu__arrow"/>
        <ul className="kt-menu__subnav">
          <MenuRender />
        </ul>
      </div>
    </li>
  );
};

export default MenuChildMulti;
