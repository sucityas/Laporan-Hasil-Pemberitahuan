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
'beacukai-api-key':process.env.REACT_APP_SECRET_KEY_REFERENSI};

export function setCurrentAsalBarang(data) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_CURRENT_ASAL_BARANG',
      payload: data
    })
  }
}

export function resetAsalBarang(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'RESET_ASAL_BARANG',
      payload: null
    })
  }
}

export function setFormAsalBarang(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_FORM_ASAL_BARANG',
      payload: bool
    })
  }
}

export function getSearchAsalBarang(kata = null) {

  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI + '/v1/asal-barang/getByparams/'+kata

    const options = {
      headers,
      method: 'GET',
      url
    }

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    dispatch({
      type: 'SET_LOADING_ASAL_BARANG',
      payload: true
    })

    var xhr = new XMLHttpRequest();

    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function(){

      if (this.readyState === 4) {

        if(this.status == 200){

          var response = JSON.parse(this.responseText);
          console.log(response);

          dispatch({
            type: 'SET_LOADING_ASAL_BARANG',
            payload: false
          })
          dispatch({
            type: 'SET_ASAL_BARANG',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_ASAL_BARANG',
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

export function getAsalBarang(kode = null) {

  return async (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI + '/v1/asal-barang'

    if (kode) {

      url = process.env.REACT_APP_REFERENSI + '/v1/asal-barang/'+kode

    }

    const options = {
      headers,
      method: 'GET',
      url
    }

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    dispatch({
      type: 'SET_LOADING_ASAL_BARANG',
      payload: true
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_ASAL_BARANG',
          payload: false
        })
        dispatch({
          type: 'SET_ASAL_BARANG',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_ASAL_BARANG',
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
            type: 'SET_LOADING_ASAL_BARANG',
            payload: false
          })
          dispatch({
            type: 'SET_ASAL_BARANG',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_ASAL_BARANG',
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

export default function asal_barang(state = initialState, action) {

  switch (action.type) {

    case 'SET_ASAL_BARANG':

    return update(state, {
      response: {
        $set: action.payload
      },
      processed_data: {
        $set: null
      },

    })

    case 'RESET_ASAL_BARANG':

    return update(state, {
      current_data: {
        $set: null
      },
      processed_data: {
        $set: null
      },

    })

    case 'SET_CURRENT_ASAL_BARANG':

    return update(state, {
      current_data: {
        $set: action.payload
      },

    })

    case 'SET_PROCESSED_ASAL_BARANG':

    return update(state, {
      processed_data: {
        $set: action.payload
      },

    })

    case 'SET_LOADING_ASAL_BARANG':

    return update(state, {
      loading: {
        $set: action.payload
      },

    })

    case 'SET_FORM_ASAL_BARANG':

    return update(state, {
      form: {
        $set: action.payload
      },

    })

    default:

    return state

  }

}
