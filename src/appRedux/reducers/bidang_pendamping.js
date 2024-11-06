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

export function setCurrentBidangPendamping(data) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_CURRENT_BIDANG_PENDAMPING',
      payload: data
    })
  }
}

export function resetBidangPendamping(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'RESET_BIDANG_PENDAMPING',
      payload: null
    })
  }
}

export function setFormBidangPendamping(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_FORM_BIDANG_PENDAMPING',
      payload: bool
    })
  }
}

export function getSearchBidangPendamping(kata = null) {

  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI_API_URL + '/v1/bidang-pendamping/getByparams/'+kata

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
      type: 'SET_LOADING_BIDANG_PENDAMPING',
      payload: true
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_BIDANG_PENDAMPING',
          payload: false
        })
        dispatch({
          type: 'SET_BIDANG_PENDAMPING',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_BIDANG_PENDAMPING',
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
            type: 'SET_LOADING_BIDANG_PENDAMPING',
            payload: false
          })
          dispatch({
            type: 'SET_BIDANG_PENDAMPING',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_BIDANG_PENDAMPING',
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

export function getBidangPendamping(id = null) {
  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI_API_URL + '/v1/bidang-pendamping'

    if (id) {

      url = process.env.REACT_APP_REFERENSI_API_URL + '/v1/bidang-pendamping/'+ id

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
      type: 'SET_LOADING_BIDANG_PENDAMPING',
      payload: true
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_BIDANG_PENDAMPING',
          payload: false
        })
        dispatch({
          type: 'SET_BIDANG_PENDAMPING',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_BIDANG_PENDAMPING',
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
            type: 'SET_LOADING_BIDANG_PENDAMPING',
            payload: false
          })
          dispatch({
            type: 'SET_BIDANG_PENDAMPING',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_BIDANG_PENDAMPING',
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

export default function bidang_pendamping(state = initialState, action) {

  switch (action.type) {

    case 'SET_BIDANG_PENDAMPING':

    return update(state, {
      response: {
        $set: action.payload
      },
      processed_data: {
        $set: null
      },

    })

    case 'RESET_BIDANG_PENDAMPING':

    return update(state, {
      current_data: {
        $set: null
      },
      processed_data: {
        $set: null
      },

    })

    case 'SET_CURRENT_BIDANG_PENDAMPING':

    return update(state, {
      current_data: {
        $set: action.payload
      },

    })

    case 'SET_PROCESSED_BIDANG_PENDAMPING':

    return update(state, {
      processed_data: {
        $set: action.payload
      },

    })

    case 'SET_LOADING_BIDANG_PENDAMPING':

    return update(state, {
      loading: {
        $set: action.payload
      },

    })

    case 'SET_FORM_BIDANG_PENDAMPING':

    return update(state, {
      form: {
        $set: action.payload
      },

    })

    default:

    return state

  }

}
