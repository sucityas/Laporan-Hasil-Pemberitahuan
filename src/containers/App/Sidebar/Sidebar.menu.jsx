import React from 'react'
import MenuSection from './Menu/Menu.section'
import MenuSingle from './Menu/Menu.single'
import MenuMulti from './Menu/Menu.multi'
import { getUser } from "../../../utils/DataUser";

const SidebarMenu = props => {
  const _groupMenuBeforeRender = () => {
    let dataUser = getUser()
    if (!dataUser) return
    const menus = dataUser.scope
    if (!menus) return
    return menus.reduce((r, a) => {
      const name =
        a.tipe === null ? 'none' : a.tipe.toLowerCase().replace(' ', '_')
      r[name] = [...(r[name] || []), a]
      return r
    }, {})
  }

  const MenuRender = () => {
    const listMenu = _groupMenuBeforeRender()
    return Object.keys(listMenu).map((item, indexParent) => {
      const nama = item.toUpperCase().replace('_', ' ')
      return (
        <React.Fragment key={indexParent}>
          {item !== 'none' ? <MenuSection name={nama} /> : null}
          {listMenu[item].map((menu, indexMenu) => {
            const url = (menu.url || '').replace('*', '')
            if (!menu.children) {
              return (
                <MenuSingle
                  key={indexMenu.toString()}
                  name={menu.name}
                  icon={menu.icon}
                  path={props.path === (menu.url || '')}
                  url={url}
                />
              )
            } else {
              return (
                <MenuMulti
                  key={indexMenu}
                  name={menu.name}
                  icon={menu.icon}
                  child={menu.children}
                  path={props.path}
                  url={url}
                />
              )
            }
          })}
        </React.Fragment>
      )
    })
  }

  return (
    <>
      <div
        className="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid"
        id="kt_aside_menu_wrapper"
      >
        <div
          id="kt_aside_menu"
          className="kt-aside-menu "
          data-ktmenu-vertical="1"
          data-ktmenu-scroll="1"
          data-ktmenu-dropdown-timeout="500"
        >
          <ul className="kt-menu__nav ">
            {props.authenticated && <MenuRender />}
          </ul>
        </div>
      </div>
    </>
  )
}

export default SidebarMenu
