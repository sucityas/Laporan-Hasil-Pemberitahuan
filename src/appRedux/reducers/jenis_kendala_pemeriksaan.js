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

export function setCurrentJenisKendalaPemeriksaan(data) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_CURRENT_JENIS_KENDALA_PEMERIKSAAN',
      payload: data
    })
  }
}

export function resetJenisKendalaPemeriksaan(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'RESET_JENIS_KENDALA_PEMERIKSAAN',
      payload: null
    })
  }
}

export function setFormJenisKendalaPemeriksaan(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_FORM_JENIS_KENDALA_PEMERIKSAAN',
      payload: bool
    })
  }
}

export function getSearchJenisKendalaPemeriksaan(kata = null) {
  
  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI + '/v1/jenis-kendala-pemeriksaan/getByparams/'+kata

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
      type: 'SET_LOADING_JENIS_KENDALA_PEMERIKSAAN',
      payload: true
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_JENIS_KENDALA_PEMERIKSAAN',
          payload: false
        })
        dispatch({
          type: 'SET_JENIS_KENDALA_PEMERIKSAAN',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_JENIS_KENDALA_PEMERIKSAAN',
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
            type: 'SET_LOADING_JENIS_KENDALA_PEMERIKSAAN',
            payload: false
          })
          dispatch({
            type: 'SET_JENIS_KENDALA_PEMERIKSAAN',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_JENIS_KENDALA_PEMERIKSAAN',
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

export function getJenisKendalaPemeriksaan(id = null) {

  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI + '/v1/jenis-kendala-pemeriksaan'

    if (id) {

      url = process.env.REACT_APP_REFERENSI + '/v1/jenis-kendala-pemeriksaan/'+ id

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
      type: 'SET_LOADING_JENIS_KENDALA_PEMERIKSAAN',
      payload: true
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_JENIS_KENDALA_PEMERIKSAAN',
          payload: false
        })
        dispatch({
          type: 'SET_JENIS_KENDALA_PEMERIKSAAN',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_JENIS_KENDALA_PEMERIKSAAN',
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
            type: 'SET_LOADING_JENIS_KENDALA_PEMERIKSAAN',
            payload: false
          })
          dispatch({
            type: 'SET_JENIS_KENDALA_PEMERIKSAAN',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_JENIS_KENDALA_PEMERIKSAAN',
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

export default function jenis_kendala_pemeriksaan(state = initialState, action) {

  switch (action.type) {

    case 'SET_JENIS_KENDALA_PEMERIKSAAN':

    return update(state, {
      response: {
        $set: action.payload
      },
      processed_data: {
        $set: null
      },

    })

    case 'RESET_JENIS_KENDALA_PEMERIKSAAN':

    return update(state, {
      current_data: {
        $set: null
      },
      processed_data: {
        $set: null
      },

    })

    case 'SET_CURRENT_JENIS_KENDALA_PEMERIKSAAN':

    return update(state, {
      current_data: {
        $set: action.payload
      },

    })

    case 'SET_PROCESSED_JENIS_KENDALA_PEMERIKSAAN':

    return update(state, {
      processed_data: {
        $set: action.payload
      },

    })

    case 'SET_LOADING_JENIS_KENDALA_PEMERIKSAAN':

    return update(state, {
      loading: {
        $set: action.payload
      },

    })

    case 'SET_FORM_JENIS_KENDALA_PEMERIKSAAN':

    return update(state, {
      form: {
        $set: action.payload
      },

    })

    default:

    return state

  }

}
