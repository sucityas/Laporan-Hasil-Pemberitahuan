import {
  GET_MENU
} from "../actionTypes/modelActionTypes";

const INIT_STATE = {
  menuList: [{
    link: "barang",
    name: "barang",
    icon: "US",
    jnsMenu: "SubMenu"
  }]
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MENU: {
      return {
        ...state,
        menuList: action.payload
      };
    }
    default:
      return state;
  }
};
