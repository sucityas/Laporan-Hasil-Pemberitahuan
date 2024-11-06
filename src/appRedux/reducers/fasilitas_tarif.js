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

const headers = {'beacukai-api-key': process.env.REACT_APP_SECRET_KEY_PARSER};

export function setCurrentFasilitasTarif(data) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_CURRENT_FASILITAS_TARIF',
      payload: data
    })
  }
}

export function resetFasilitasTarif(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'RESET_FASILITAS_TARIF',
      payload: null
    })
  }
}

export function setFormFasilitasTarif(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_FORM_FASILITAS_TARIF',
      payload: bool
    })
  }
}

export function getKodeFasilitasTarif(kode = null) {
  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI_API_URL + '/v1/fasilitas-tarif/'+kode

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
      type: 'SET_LOADING_FASILITAS_TARIF',
      payload: true
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_FASILITAS_TARIF',
          payload: false
        })
        dispatch({
          type: 'SET_FASILITAS_TARIF',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_FASILITAS_TARIF',
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
            type: 'SET_LOADING_FASILITAS_TARIF',
            payload: false
          })
          dispatch({
            type: 'SET_FASILITAS_TARIF',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_FASILITAS_TARIF',
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

export function getByIdFasilitasTarif(id) {

  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI_API_URL + '/v1/fasilitas-tarif/by_Id' + id

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
      type: 'SET_LOADING_FASILITAS_TARIF',
      payload: true
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_FASILITAS_TARIF',
          payload: false
        })
        dispatch({
          type: 'SET_FASILITAS_TARIF',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_FASILITAS_TARIF',
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
            type: 'SET_LOADING_FASILITAS_TARIF',
            payload: false
          })
          dispatch({
            type: 'SET_FASILITAS_TARIF',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_FASILITAS_TARIF',
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

export function getFasilitasTarif(id = null) {

  return (dispatch, store) => {

    var url = process.env.REACT_APP_REFERENSI + '/v1/fasilitas-tarif/all'

    if (id) {

      url = process.env.REACT_APP_REFERENSI + '/v1/fasilitas-tarif/' + id

    }

    const options = {
      method: 'GET',
      headers:{'beacukai-api-key': process.env.REACT_APP_SECRET_KEY_REFERENSI},
      url,
    }

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    dispatch({
      type: 'SET_LOADING_FASILITAS_TARIF',
      payload: true
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_FASILITAS_TARIF',
          payload: false
        })
        dispatch({
          type: 'SET_FASILITAS_TARIF',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_FASILITAS_TARIF',
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
            type: 'SET_LOADING_FASILITAS_TARIF',
            payload: false
          })
          dispatch({
            type: 'SET_FASILITAS_TARIF',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_FASILITAS_TARIF',
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

export default function fasilitas_tarif(state = initialState, action) {

  switch (action.type) {

    case 'SET_FASILITAS_TARIF':

    return update(state, {
      response: {
        $set: action.payload
      },
      processed_data: {
        $set: null
      },

    })

    case 'RESET_FASILITAS_TARIF':

    return update(state, {
      current_data: {
        $set: null
      },
      processed_data: {
        $set: null
      },

    })

    case 'SET_CURRENT_FASILITAS_TARIF':

    return update(state, {
      current_data: {
        $set: action.payload
      },

    })

    case 'SET_PROCESSED_FASILITAS_TARIF':

    return update(state, {
      processed_data: {
        $set: action.payload
      },

    })

    case 'SET_LOADING_FASILITAS_TARIF':

    return update(state, {
      loading: {
        $set: action.payload
      },

    })

    case 'SET_FORM_FASILITAS_TARIF':

    return update(state, {
      form: {
        $set: action.payload
      },

    })

    default:

    return state

  }

}
