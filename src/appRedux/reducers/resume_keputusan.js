import update from 'immutability-helper'
import qs from 'qs'
import axios from 'axios'
import _ from 'lodash'

import { fetch_error,secure_data } from './index'
import {
  notification
  } from 'antd';
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
'beacukai-api-key':process.env.REACT_APP_SECRET_KEY_PFPD};

export function setCurrentResumeKeputusan(data) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_CURRENT_RESUME_KEPUTUSAN',
      payload: data
    })
  }
}

export function resetResumeKeputusan(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'RESET_RESUME_KEPUTUSAN',
      payload: null
    })
  }
}

export function setFormResumeKeputusan(bool) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_FORM_RESUME_KEPUTUSAN',
      payload: bool
    })
  }
}
function alertResume(check){
  // const data = res
  if (check == "true") {

  } else {
    notification.error({
      message: `Gagal mengambil data resume keputusan`,
      top: 20
    })
  }
};

export function getResumeKeputusan(idHeader) {

  return (dispatch, store) => {

    var url = process.env.REACT_APP_PFPD + '/pemeriksaan-dokumen/resume-keputusan/' + idHeader
    // var url =  'https:/api.beacukai.go.id/Pfpd/pemeriksaan-dokumen/resume-keputusan/' + idHeader

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
      type: 'SET_LOADING_RESUME_KEPUTUSAN',
      payload: true
    })

    if(process.env.REACT_APP_PUBLIC == 0){

      axios(options)
      .then(function (response) {
        console.log(response.data)
        dispatch({
          type: 'SET_LOADING_RESUME_KEPUTUSAN',
          payload: false
        })
        dispatch({
          type: 'SET_RESUME_KEPUTUSAN',
          payload: response.data
        })
        alertResume("true")
        console.log("dariredux[2]",response.data)
      })
      .catch((error) => {
        fetch_error(error, dispatch)
        dispatch({
          type: 'SET_LOADING_RESUME_KEPUTUSAN',
          payload: false
        })
        alertResume("false")
      })

    } 
}

}
export function setLoading (isLoad) { 

  return (dispatch, store) => {
    var data = isLoad
    dispatch({
      type: 'SET_LOADING_RESUME_KEPUTUSAN',
      payload: data
    });
  }
}

export default function resume_keputusan(state = initialState, action) {

  switch (action.type) {

    case 'SET_RESUME_KEPUTUSAN':

    return update(state, {
      response: {
        $set: action.payload
      },
      processed_data: {
        $set: null
      },

    })

    case 'RESET_RESUME_KEPUTUSAN':

    return update(state, {
      current_data: {
        $set: null
      },
      processed_data: {
        $set: null
      },

    })

    case 'SET_CURRENT_RESUME_KEPUTUSAN':

    return update(state, {
      current_data: {
        $set: action.payload
      },

    })
    

    case 'SET_PROCESSED_RESUME_KEPUTUSAN':

    return update(state, {
      processed_data: {
        $set: action.payload
      },

    })

    case 'SET_LOADING_RESUME_KEPUTUSAN':

    return update(state, {
      loading: {
        $set: action.payload
      },

    })

    case 'SET_FORM_RESUME_KEPUTUSAN':

    return update(state, {
      form: {
        $set: action.payload
      },

    })

    default:

    return state

  }

}
