import update from 'immutability-helper'
import qs from 'qs'
import axios from 'axios'
import _ from 'lodash'

import { fetch_error,secure_data } from './index'

var initialState = {
  total: 0,
  response: [],
  loading: false,
  current_data: {},
  form: null,
  processed_data: null,
  date: new Date()
}

const headers = {'Content-Type':'application/json',
'beacukai-api-key':process.env.REACT_APP_REFERENSI_GRAVITEE_TOKEN};

export function setCurrentTarifSubKomoditiCukai(data) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_CURRENT_TARIF_SUB_KOMODITI_CUKAI',
      payload: data
    })
  }
}

export function resetTarifSubKomoditiCukai(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'RESET_TARIF_SUB_KOMODITI_CUKAI',
      payload: null
    })
  }
}

export function setFormTarifSubKomoditiCukai(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_FORM_TARIF_SUB_KOMODITI_CUKAI',
      payload: bool
    })
  }
}

export function getKodeTarifSubKomoditiCukai(kodeKomoditi = null) {
  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI_API_URL + '/v1/tarif-sub-komoditi-cukai/findByKodeKomoditi/'+kodeKomoditi

    const options = {
      headers,
      method: 'GET',
      url,
    }

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    dispatch({
      type: 'SET_LOADING_TARIF_SUB_KOMODITI_CUKAI',
      payload: true
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_TARIF_SUB_KOMODITI_CUKAI',
          payload: false
        })
        dispatch({
          type: 'SET_TARIF_SUB_KOMODITI_CUKAI',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_TARIF_SUB_KOMODITI_CUKAI',
          payload: false
        })
      })

    } else{

    var xhr = new XMLHttpRequest();

    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function(){

      if (this.readyState === 4) {

        if(this.status == 200){

          var response = JSON.parse(this.responseText);
          console.log(response);

          dispatch({
            type: 'SET_LOADING_TARIF_SUB_KOMODITI_CUKAI',
            payload: false
          })
          dispatch({
            type: 'SET_TARIF_SUB_KOMODITI_CUKAI',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_TARIF_SUB_KOMODITI_CUKAI',
            payload: false
          })

        }

      }

    });

    xhr.open(options.method, url);

    Object.keys(options.headers).forEach(function(key) {
      xhr.setRequestHeader(key, options.headers[key]);
    });

    xhr.send(JSON.stringify(options.data));

  }

}

}

export function getTarifSubKomoditiCukai() {

  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI_API_URL + '/v1/tarif-sub-komoditi-cukai'

    const options = {
      headers,
      method: 'GET',
      url,
    }

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    dispatch({
      type: 'SET_LOADING_TARIF_SUB_KOMODITI_CUKAI',
      payload: true
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_TARIF_SUB_KOMODITI_CUKAI',
          payload: false
        })
        dispatch({
          type: 'SET_TARIF_SUB_KOMODITI_CUKAI',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_TARIF_SUB_KOMODITI_CUKAI',
          payload: false
        })
      })

    } else{

    var xhr = new XMLHttpRequest();

    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function(){

      if (this.readyState === 4) {

        if(this.status == 200){

          var response = JSON.parse(this.responseText);
          console.log(response);

          dispatch({
            type: 'SET_LOADING_TARIF_SUB_KOMODITI_CUKAI',
            payload: false
          })
          dispatch({
            type: 'SET_TARIF_SUB_KOMODITI_CUKAI',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_TARIF_SUB_KOMODITI_CUKAI',
            payload: false
          })

        }

      }

    });

    xhr.open(options.method, url);

    Object.keys(options.headers).forEach(function(key) {
      xhr.setRequestHeader(key, options.headers[key]);
    });

    xhr.send(JSON.stringify(options.data));

  }

}

}

export default function tarif_sub_komoditi_cukai(state = initialState, action) {

  switch (action.type) {

    case 'SET_TARIF_SUB_KOMODITI_CUKAI':

    return update(state, {
      response: {
        $set: action.payload
      },
      processed_data: {
        $set: null
      },

    })

    case 'RESET_TARIF_SUB_KOMODITI_CUKAI':

    return update(state, {
      current_data: {
        $set: null
      },
      processed_data: {
        $set: null
      },

    })

    case 'SET_CURRENT_TARIF_SUB_KOMODITI_CUKAI':

    return update(state, {
      current_data: {
        $set: action.payload
      },

    })

    case 'SET_PROCESSED_TARIF_SUB_KOMODITI_CUKAI':

    return update(state, {
      processed_data: {
        $set: action.payload
      },

    })

    case 'SET_LOADING_TARIF_SUB_KOMODITI_CUKAI':

    return update(state, {
      loading: {
        $set: action.payload
      },

    })

    case 'SET_FORM_TARIF_SUB_KOMODITI_CUKAI':

    return update(state, {
      form: {
        $set: action.payload
      },

    })

    default:

    return state

  }

}
