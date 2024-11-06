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

export function setCurrentPerintahLorong(data) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_CURRENT_PERINTAH_LORONG',
      payload: data
    })
  }
}

export function resetPerintahLorong(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'RESET_PERINTAH_LORONG',
      payload: null
    })
  }
}

export function setFormPerintahLorong(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_FORM_PERINTAH_LORONG',
      payload: bool
    })
  }
}


export function getSearchPerintahLorong(kata = null) {

  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI + '/v1/perintah-lorong/getByparams/'+kata

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    dispatch({
      type: 'SET_LOADING_PERINTAH_LORONG',
      payload: true
    })

    const options = {
      headers,
      method: 'GET',
      url,
    }

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_PERINTAH_LORONG',
          payload: false
        })
        dispatch({
          type: 'SET_PERINTAH_LORONG',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_PERINTAH_LORONG',
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
            type: 'SET_LOADING_PERINTAH_LORONG',
            payload: false
          })
          dispatch({
            type: 'SET_PERINTAH_LORONG',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_PERINTAH_LORONG',
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

export function getPerintahLorong(id = null) {

  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI + '/v1/perintah-lorong'

    if (id) {

      url = process.env.REACT_APP_REFERENSI + '/v1/perintah-lorong/'+ id

    }

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    dispatch({
      type: 'SET_LOADING_PERINTAH_LORONG',
      payload: true
    })

    const options = {
      headers,
      method: 'GET',
      url,
    }

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_PERINTAH_LORONG',
          payload: false
        })
        dispatch({
          type: 'SET_PERINTAH_LORONG',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_PERINTAH_LORONG',
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
            type: 'SET_LOADING_PERINTAH_LORONG',
            payload: false
          })
          dispatch({
            type: 'SET_PERINTAH_LORONG',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_PERINTAH_LORONG',
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

export default function perintah_lorong(state = initialState, action) {

  switch (action.type) {

    case 'SET_PERINTAH_LORONG':

    return update(state, {
      response: {
        $set: action.payload
      },
      processed_data: {
        $set: null
      },

    })

    case 'RESET_PERINTAH_LORONG':

    return update(state, {
      current_data: {
        $set: null
      },
      processed_data: {
        $set: null
      },

    })

    case 'SET_CURRENT_PERINTAH_LORONG':

    return update(state, {
      current_data: {
        $set: action.payload
      },

    })

    case 'SET_PROCESSED_PERINTAH_LORONG':

    return update(state, {
      processed_data: {
        $set: action.payload
      },

    })

    case 'SET_LOADING_PERINTAH_LORONG':

    return update(state, {
      loading: {
        $set: action.payload
      },

    })

    case 'SET_FORM_PERINTAH_LORONG':

    return update(state, {
      form: {
        $set: action.payload
      },

    })

    default:

    return state

  }

}
