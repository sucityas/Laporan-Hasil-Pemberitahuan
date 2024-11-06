import {
  LOADING_PAGE,
  SET_PAGE,
  SET_CURRENT_KONTAINER,
  SET_DATA_PAGE,
  SET_CURRENT_KEMASAN,
  SET_SHOW_FORM,
} from '../actionTypes/modelActionTypes';

var initialState = {
  loadingPage: true,
  showForm: false,
  currentPage:{},
  dataPage:{
    initial:true,
    idHeader:'',
  },
  currentKemasan:false,
  currentKontainer:false,
}

export default function pageIndex (state = initialState, action) {
  switch (action.type) {
    case LOADING_PAGE:
      return {
        ...state,
        loadingPage:action.payload
      }
    case SET_SHOW_FORM:
      return {
        ...state,
        showForm: action.form
      }
    case SET_PAGE:
      return {
        ...state,
        loadingPage:action.payload.loading,
        currentKontainer:false,
        currentKemasan:false,
        currentPage:action.payload.currentPage,
      }
    case SET_DATA_PAGE:
      return {
        ...state,
        ...action.data.hideForm,
        dataPage:{
          ...state.dataPage,
          ...action.data.pageData
        }
      }
    case SET_CURRENT_KONTAINER:
      return {
        ...state,
        currentKontainer:action.kontainer,
      }
    case SET_CURRENT_KEMASAN:
      return {
        ...state,
        currentKemasan:action.kemasan,
      }
    default:
      return state
  }
}
