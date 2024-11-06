import React, {useState} from "react";
import MenuChildMulti from "./Menu.child.multi";
import MenuChildSingle from "./Menu.child.single";
import MetroIcon from "../../../../components/MetroIcon";

const MenuMulti = props => {
  const [menuMulti_Active2, setMenuMulti_Active2] = useState(false);
  const [menuMulti_Active3, setMenuMulti_Active3] = useState(false);
  const menuMulti_Active = props.child.findIndex(item => item.url === props.path) >= 0
  // let menuMulti_Active2 = false
  // for (let i = 0; i < props.child.length; i++) {
  //   const item = props.child[i]
  //   const { children } = props.child[i]
  //   const child = children || [];
  //   if (child.length > 0) {
  //     MenuRender.push(<MenuChildMulti key={i} name={item.name} child={child} path={props.path} />)
  //     for (let j = 0; j < child.length; j++) {
  //       if(child[j].url === props.path) {
  //         menuMulti_Active2 = true
  //       }
  //     }
  //   } else {
  //     MenuRender.push(<MenuChildSingle key={i} name={item.name} url={item.url} active={props.path === item.url} />)
  //   }
  // }

  const MenuRender = () => {
    return props.child.map((item, idx) => {
      const child = item.children || [];
      if (child.length > 0) {
        const check = child.find(itemChild => itemChild.url === props.path)
        if (check && check.url === props.path) {
          setMenuMulti_Active2(child.findIndex(itemChild => itemChild.url === props.path) >= 0)
        }

        child.forEach(itemNest => {
          const child2 = itemNest.children || [];
          if (child2.length > 0) {
            const check2 = child2.find(itemChild => itemChild.url === props.path)
            if (check2 && check2.url === props.path) {
              setMenuMulti_Active3(child2.findIndex(itemChild => itemChild.url === props.path) >= 0)
            }
          }
        })
        return <MenuChildMulti key={idx} name={item.name} child={child} path={props.path}/>
      }
      else {
        return <MenuChildSingle key={idx} name={item.name} url={item.url} active={props.path === item.url}/>
      }
    });
  };

  return (
    <>
      <li
        className={`kt-menu__item  kt-menu__item--submenu ${menuMulti_Active || menuMulti_Active2 || menuMulti_Active3 ? "kt-menu__item--active kt-menu__item--open" : null}`}
        aria-haspopup="true"
        data-ktmenu-submenu-toggle="hover"
      >
        <a className="kt-menu__link kt-menu__toggle">
          <span className="kt-menu__link-icon">
            {/*<Icon type={props.icon || "form"} />*/}
            <MetroIcon value={props.icon} />
          </span>
          <span className="kt-menu__link-text">{props.name}</span>
          <i className="kt-menu__ver-arrow la la-angle-right" />
        </a>
        <div className="kt-menu__submenu ">
          <span className="kt-menu__arrow" />
          <ul className="kt-menu__subnav">
            <li
              className="kt-menu__item  kt-menu__item--parent"
              aria-haspopup="true"
            >
              <span className="kt-menu__link">
                <span className="kt-menu__link-text">{props.name}</span>
              </span>
            </li>
            <MenuRender />
          </ul>
        </div>
      </li>
    </>
  );
};

export default MenuMulti;
