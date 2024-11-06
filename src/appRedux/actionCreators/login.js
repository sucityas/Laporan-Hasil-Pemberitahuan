import { SET_KEYCLOAK } from '../actionTypes/login';
const setKeycloak = (refreshToken, accessToken) => {
  return {
    type: SET_KEYCLOAK,
    payload: {
      kt: refreshToken,
      akt: accessToken
    }
  }
}

export default setKeycloak
