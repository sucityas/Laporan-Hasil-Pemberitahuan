import update from 'immutability-helper'

var initialState = {
  message: '',
  loading: false,
  validation: [],
  input: {},
  modal: {},
  warning: '',
  date: new Date()
}

export function resetValidation () {
  return (dispatch, store) => {
    dispatch({
      type: 'RESET_VALIDATION',
      payload: null
    })
  }
}

export function resetInput () {
  return (dispatch, store) => {
    dispatch({
      type: 'RESET_INPUT',
      payload: null
    })
  }
}

export function setWarning (data) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_WARNING',
      payload: data
    })
  }
}

export function setMessage (data) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_MESSAGE',
      payload: data
    })
  }
}

export function setModal (key, value) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_MODAL',
      payload: { key, value }
    })
  }
}

export function setInput (key, value) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_INPUT',
      payload: { key, value }
    })
  }
}

export function setMultiInput (value) {
  return (dispatch, store) => {
    dispatch({
      type: 'SET_MULTI_INPUT',
      payload: value
    })
  }
}

export default function core (state = initialState, action) {
  var { key, value } = action.payload || {}

  switch (action.type) {
    case 'SET_MULTI_INPUT':

    var newval = { ...state.input, ...action.payload }

    return update(state, {
      input: {
        $set: newval
      }
    })

    case 'SET_INPUT':

    var is_object = false

    try {
      var res = key.split('[')

      var v = state.input[res[0]]

      if (v) {
        is_object = true
      }
    } catch (e) {
// console.log(e);
}

// console.log("is_object",is_object);

try {
  var m = key.match(/\[(\S+)\]/)
//console.log(m);

if (is_object) {
  return update(state, {
    input: {
      [res[0]]: {
        [String(m[1])]: {
          $set: value
        }
      }
    }
  })
} else {
  v = { [String(m[1])]: value }

  return update(state, {
    input: {
      [res[0]]: {
        $set: v
      }
    }
  })
}
} catch (e) {
// console.log(e);

return update(state, {
  input: {
    [key]: {
      $set: value
    }
  }
})
}

case 'SET_MESSAGE':

return update(state, {
  message: {
    $set: action.payload
  },

})

case 'SET_WARNING':

return update(state, {
  warning: {
    $set: action.payload
  },

})

case 'SET_MODAL':

return update(state, {
  modal: {
    [key]: {
      $set: value
    }
  }
})

case 'SET_LOADING':

return update(state, {
  loading: {
    $set: action.payload
  },

})

case 'RESET_VALIDATION_MESSAGE':

return update(state, {
/*
modal: {
$set: {}
},
input:{
$set:{}
},
*/
message: {
  $set: ""
},
validation: {
  $set: []
},

})
case 'RESET_VALIDATION':

return update(state, {

  loading: {
    $set: false
  },
/*
message: {
$set: ""
},
input:{
$set:{}
},
*/
validation: {
  $set: []
},

})

case 'RESET_INPUT':

return update(state, {
  input: {
    $set: {}
  },

})

case 'SET_VALIDATION':

return update(state, {
  validation: {
    $set: action.payload
  },

})

default:

return state
}
}
