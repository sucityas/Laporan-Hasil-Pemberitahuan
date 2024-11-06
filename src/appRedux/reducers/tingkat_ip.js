import update from 'immutability-helper'
import qs from 'qs'
import axios from 'axios'
import _ from 'lodash'

import { fetch_error,secure_data } from './index'

const initialState = {
  total: 0,
  response: [{
  "status": true,
  "message": "sucess",
  "data": [
    {
      "idTingkatIp": 10,
      "tingkatIp": "10"
    },
    {
      "idTingkatIp": 30,
      "tingkatIp": "30"
    },
    {
      "idTingkatIp": 100,
      "tingkatIp": "MENDALAM"
    }
  ],
  "total": 3
}],
  loading: false,
  current_data: {},
  form: null,
  processed_data: null,
  date: new Date()
}

const headers = {'Content-Type':'application/json',
'beacukai-api-key':process.env.REACT_APP_REFERENSI_GRAVITEE_TOKEN};

export function setCurrentTingkatIp(data) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_CURRENT_TINGKAT_IP',
      payload: data
    })
  }
}

export function resetTingkatIp(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'RESET_TINGKAT_IP',
      payload: null
    })
  }
}

export function setFormTingkatIp(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_FORM_TINGKAT_IP',
      payload: bool
    })
  }
}

export function getSearchTingkatIp(kata) {

  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI_API_URL + '/v1/tingkatIp/getByparams/'+kata

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    dispatch({
      type: 'SET_LOADING_TINGKAT_IP',
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
          type: 'SET_LOADING_TINGKAT_IP',
          payload: false
        })
        dispatch({
          type: 'SET_TINGKAT_IP',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_TINGKAT_IP',
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
            type: 'SET_LOADING_TINGKAT_IP',
            payload: false
          })
          dispatch({
            type: 'SET_TINGKAT_IP',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_TINGKAT_IP',
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

export function getTingkatIp(id = null) {
  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI_API_URL + '/v1/tingkatIp/all'

    if (id) {

      url = process.env.REACT_APP_REFERENSI_API_URL + '/v1/tingkatIp/'+ id

    }
    
    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    dispatch({
      type: 'SET_LOADING_TINGKAT_IP',
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
          type: 'SET_LOADING_TINGKAT_IP',
          payload: false
        })
        dispatch({
          type: 'SET_TINGKAT_IP',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_TINGKAT_IP',
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
            type: 'SET_LOADING_TINGKAT_IP',
            payload: false
          })
          dispatch({
            type: 'SET_TINGKAT_IP',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_TINGKAT_IP',
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

export default function tingkat_ip(state = initialState, action) {

  switch (action.type) {

    case 'SET_TINGKAT_IP':

    return update(state, {
      response: {
        $set: action.payload
      },
      processed_data: {
        $set: null
      },

    })

    case 'RESET_TINGKAT_IP':

    return update(state, {
      current_data: {
        $set: null
      },
      processed_data: {
        $set: null
      },

    })

    case 'SET_CURRENT_TINGKAT_IP':

    return update(state, {
      current_data: {
        $set: action.payload
      },

    })

    case 'SET_PROCESSED_TINGKAT_IP':

    return update(state, {
      processed_data: {
        $set: action.payload
      },

    })

    case 'SET_LOADING_TINGKAT_IP':

    return update(state, {
      loading: {
        $set: action.payload
      },

    })

    case 'SET_FORM_TINGKAT_IP':

    return update(state, {
      form: {
        $set: action.payload
      },

    })

    default:

    return state

  }

}
