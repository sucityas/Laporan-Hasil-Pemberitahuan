import {store} from '../appRedux/store'
import jwtDecode from 'jwt-decode'
import KeycloakAction from "../appRedux/actionCreators/login";
import axios from 'axios'
import { notification as toast } from 'antd'
let initialValue = {}
export const previusUrlTag = '09jdmve9frcq'
export const usernameTag = '0pn107bul25m'
export const menuTag = '0d07csqkxtcu'
export const initlogin = '359acd1f-d8ab-4856-a8b7-dcee801a8ae5'
export const isLocalhost = !window.location.host.split('.')[0].includes('ceisa')
export const notification = {
  success: (description) => {
    toast.success({message: 'Sukses', description, duration: 3})
  },
  error: (description, duration = 3) => {
    toast.error({message: 'Gagal', description, duration})
  }
}
export function errorMessage(e) {
  const {response, message: messageE} = e
  let message
  try {
    if (response) {
      const {data} = response
      const {message:messageResponse} = data
      if (data && messageResponse) {
        message = messageResponse
      } else {
        message = 'Terjadi kesalahan, silahkan coba lagi.'
      }
    } else {
      message = messageE
    }
  } catch (e) {
    message = 'Terjadi kesalahan, silahkan coba lagi.'
  }

  return message
}
export function searchString(pattern, text) {
  if (pattern.length === 0)
    return 0; // Immediate match

  // Compute longest suffix-prefix table
  let lsp = [0]; // Base case
  for (let i = 1; i < pattern.length; i++) {
    let j = lsp[i - 1]; // Start by assuming we're extending the previous LSP
    while (j > 0 && pattern.charAt(i) !== pattern.charAt(j))
      j = lsp[j - 1];
    if (pattern.charAt(i) === pattern.charAt(j))
      j++;
    lsp.push(j);
  }

  // Walk through text string
  let j = 0; // Number of chars matched in pattern
  for (let i = 0; i < text.length; i++) {
    while (j > 0 && text.charAt(i) !== pattern.charAt(j))
      j = lsp[j - 1]; // Fall back in the pattern
    if (text.charAt(i) === pattern.charAt(j)) {
      j++; // Next char matched, increment position
      if (j === pattern.length)
        return i - (j - 1);
    }
  }
  return -1; // Not found
}
/*
USAGE getUser()
const dataUser = getUser()

yang sebelumnya
const dataUser = localStorage.getItem("dataUser")
*/
export function getUser() {
  return initialValue
}

/* setUser(params)
USAGE
setUser({
nama: 'raditsan',
kodeKantor: '999999
})

atau

setUser({
...getUser() << akan mengambil data yang lama & menambahkan param yang baru,
paramBaru: 'foo',
paramLama: 'bar'
})

yang sebelumnya
localStorage.setItem(JSON.stringify({
nama: 'raditsan',
kodeKantor: '999999
}, 'dataUser'))
*/
export function setUser(params) {
  initialValue = params
}

export function isAccessTokenExpire() {
  try {
    const initialAccess = store.getState().rkc.akt
    const decoded = jwtDecode(initialAccess)
    const { exp } = decoded
    return exp < (Date.now() / 1000);
  } catch (e) {
    return true
  }
}

export async function getUserAccessToken() {
  const initialAccess = await store.getState().rkc.akt
  const refreshToken = await store.getState().rkc.kt
  let exp
  try {
    const decoded = jwtDecode(initialAccess)
    const { exp: expAccess } = decoded
    exp = expAccess
  } catch (e) {
    exp = null
  }
  if(exp === null || exp === undefined) {
    return ''
  }
  if (!initialAccess || initialAccess === '') {
    return ''
  } else if (exp < (Date.now() / 1000)) {
    try {
      const { REACT_APP_AMWS } = process.env
      const {data} = await axios.post( `${REACT_APP_AMWS}/v1/user/update-token`, null,{
        headers: {
          Authorization: refreshToken,
          // 'Beacukai-Api-Key': REACT_APP_SECRET_KEY_AMWS
        },
      })
      const {refresh_token, access_token} = data.item
      store.dispatch(KeycloakAction(refresh_token, access_token))
      return access_token
    } catch (e) {
      // alert('failed to get access ' + e.message)
      return ''
    }
  } else {
    return initialAccess
  }
}

export async function getAccessHeader() {
  const headers = {headers: {}}
  try {
    const accesstToken = await getUserAccessToken()
    if (accesstToken === '') {
      return headers
    }
    return {
      headers: {
        'Authorization': `Bearer ${accesstToken}`
      }
    }
  } catch (e) {
    return headers
  }
}

export function rsaEncription(value) {
  // eslint-disable-next-line no-undef
  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIegmiOBL7+JU99VeDdlq6lghCucD0UhgZ1ugG5QvZZOdMV8Sc4LkghnIHzaBCy5wAPZe3ToNhSnTCj7f4bO9OxvQm0b/rPBH5VwMI0qYmoSLkEM0uF6ZzgBzB8fUMFzpVN4/HFglpA2hYrj5Om+y0QjQyVdQK1lc5/vtzQEaypQIDAQAB');
  return jsEncrypt.encrypt(value);
}
