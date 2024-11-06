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
'beacukai-api-key':process.env.REACT_APP_SECRET_KEY_LHP};

export function setCurrentKontainerPeriksa(data) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_CURRENT_KONTAINER_PERIKSA',
      payload: data
    })
  }
}

export function resetKontainerPeriksa(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'RESET_KONTAINER_PERIKSA',
      payload: null
    })
  }
}

export function setFormKontainerPeriksa(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_FORM_KONTAINER_PERIKSA',
      payload: bool
    })
  }
}

export function getSearchKontainerPeriksa(kata = null) {

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP + '/kontainer-periksa/getByparams/'+kata

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
      type: 'SET_LOADING_KONTAINER_PERIKSA',
      payload: true
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_KONTAINER_PERIKSA',
          payload: false
        })
        dispatch({
          type: 'SET_KONTAINER_PERIKSA',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_KONTAINER_PERIKSA',
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
            type: 'SET_LOADING_KONTAINER_PERIKSA',
            payload: false
          })
          dispatch({
            type: 'SET_KONTAINER_PERIKSA',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_KONTAINER_PERIKSA',
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
 
export function getKontainerTambahLHP (id = null) { // 20191104

  return (dispatch, store) => {
    var url = process.env.REACT_APP_LHP + '/kontainer-periksa'

    if (id) {

      url = process.env.REACT_APP_LHP + '/kontainer-periksa/'+id

    }
    // var url = process.env.REACT_APP_LHP+'/kontainer-periksa/'+idHeader;
  

    const options = {
      method: 'GET',
      headers,
      url,
    }; 

    dispatch({
      type: 'SET_LOADING_LHP',
      payload: true
    });

    dispatch({
      type: 'SET_VALIDATION',
      payload: []
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_LHP',
          payload: false
        })
        dispatch({
          type: 'SET_KONTAINER_TAMBAH_LHP',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_LHP',
          payload: false
        })
      })

    } else{

    var xhr = new XMLHttpRequest();

    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function(){

      if (this.readyState === 4) {

        if(this.status == 200 || this.status == 201){

          var response = JSON.parse(this.responseText);
          console.log(response);

          dispatch({
            type: 'SET_LOADING_LHP',
            payload: false
          })
          dispatch({
            type: 'SET_KONTAINER_TAMBAH_LHP',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_LHP',
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

export function getKontainerPeriksa(id = null) {

  return (dispatch, store) => {

    var url = process.env.REACT_APP_LHP + '/kontainer-periksa'

    if (id) {

      url = process.env.REACT_APP_LHP + '/kontainer-periksa/'+id

    }

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
      type: 'SET_LOADING_KONTAINER_PERIKSA',
      payload: true
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_KONTAINER_PERIKSA',
          payload: false
        })
        dispatch({
          type: 'SET_KONTAINER_PERIKSA',
          payload: response.data
        })
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_KONTAINER_PERIKSA',
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
            type: 'SET_LOADING_KONTAINER_PERIKSA',
            payload: false
          })
          dispatch({
            type: 'SET_KONTAINER_PERIKSA',
            payload: response
          })

        } else {

          fetch_error(this.responseText, dispatch)

          dispatch({
            type: 'SET_LOADING_KONTAINER_PERIKSA',
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

export default function kontainer_periksa(state = initialState, action) {

  switch (action.type) {

    case 'SET_KONTAINER_PERIKSA':

    return update(state, {
      response: {
        $set: action.payload
      },
      processed_data: {
        $set: null
      },

    })

    case 'RESET_KONTAINER_PERIKSA':

    return update(state, {
      current_data: {
        $set: null
      },
      processed_data: {
        $set: null
      },

    })

    case 'SET_KONTAINER_TAMBAH_LHP':

      return update(state, {
        response: {
          $set: action.payload
        },
        processed_data: {
          $set: null
        },
  
      })

    case 'SET_CURRENT_KONTAINER_PERIKSA':

    return update(state, {
      current_data: {
        $set: action.payload
      },

    })

    case 'SET_PROCESSED_KONTAINER_PERIKSA':

    return update(state, {
      processed_data: {
        $set: action.payload
      },

    })

    case 'SET_LOADING_KONTAINER_PERIKSA':

    return update(state, {
      loading: {
        $set: action.payload
      },

    })

    case 'SET_FORM_KONTAINER_PERIKSA':

    return update(state, {
      form: {
        $set: action.payload
      },

    })

    default:

    return state

  }

}
