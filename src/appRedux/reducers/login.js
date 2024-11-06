import { SET_KEYCLOAK } from '../actionTypes/login'
import moment from "moment";

const initialState = ''
const login = (state = initialState, action) => {
  switch(action.type) {
    case SET_KEYCLOAK:
      return {
        loadedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        ...action.payload
      }
    default:
      return state
  }
}
export default login
