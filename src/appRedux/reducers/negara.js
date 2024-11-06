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

export function setCurrentNegara(data) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_CURRENT_NEGARA',
      payload: data
    })
  }
}

export function resetNegara(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'RESET_NEGARA',
      payload: null
    })
  }
}

export function setFormNegara(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_FORM_NEGARA',
      payload: bool
    })
  }
}

export function getNegaraByKata(kata = null) {

  return (dispatch, store) => {

    var url = process.env.REACT_APP.REFERENSI + '/v1/negara/ByKata/'+kata

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    dispatch({
      type: 'SET_LOADING_NEGARA',
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
          type: 'SET_LOADING_NEGARA',
          payload: false
        })
        dispatch({
          type: 'SET_NEGARA',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_NEGARA',
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
            type: 'SET_LOADING_NEGARA',
            payload: false
          })
          dispatch({
            type: 'SET_NEGARA',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_NEGARA',
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

export function getNegara(id = null) {

  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI + '/v1/negara/all'

    if (id) {

      url = process.env.REACT_APP_REFERENSI + '/v1/negara/'+id

    }

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    dispatch({
      type: 'SET_LOADING_NEGARA',
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
          type: 'SET_LOADING_NEGARA',
          payload: false
        })
        dispatch({
          type: 'SET_NEGARA',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_NEGARA',
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
            type: 'SET_LOADING_NEGARA',
            payload: false
          })
          dispatch({
            type: 'SET_NEGARA',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_NEGARA',
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

export default function negara(state = initialState, action) {

  switch (action.type) {

    case 'SET_NEGARA':

    return update(state, {
      response: {
        $set: action.payload
      },
      processed_data: {
        $set: null
      },

    })

    case 'RESET_NEGARA':

    return update(state, {
      current_data: {
        $set: null
      },
      processed_data: {
        $set: null
      },

    })

    case 'SET_CURRENT_NEGARA':

    return update(state, {
      current_data: {
        $set: action.payload
      },

    })

    case 'SET_PROCESSED_NEGARA':

    return update(state, {
      processed_data: {
        $set: action.payload
      },

    })

    case 'SET_LOADING_NEGARA':

    return update(state, {
      loading: {
        $set: action.payload
      },

    })

    case 'SET_FORM_NEGARA':

    return update(state, {
      form: {
        $set: action.payload
      },

    })

    default:

    return state

  }

}
