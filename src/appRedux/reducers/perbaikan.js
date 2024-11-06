const initialState = {
  rangeDate: {
    start: "",
    end: ""
  },
  reload: false,
  loading: false,
  error: false,
  dataPerekaman: []
};

export default function perbaikan(state = initialState, action) {
  switch(action.type) {
    case "PERBAIKAN_SET_RANGE_DATE":
      const start = action.date[0].toString();
      const end = action.date[1].toString();
      
      return {
        ...state,
        rangeDate: { start, end },
        reload: action.reload
      }

    case "PERBAIKAN_SET_RELOAD":
      return {
        ...state,
        reload: action.reload
      }

    case "PERBAIKAN_SET_LOADING":
      return {
        ...state,
        loading: action.loading
      }

    case "PERBAIKAN_SET_DATA_PEREKAMAN":
      return {
        ...state,
        dataPerekaman: action.data
      }

    default:
      return state
  }
}

/*
const perekaman = (state = initialState, { type, payload }) => {
  switch (type) {
    case "PERBAIKAN_SET_RANGE_DATE":
      console.log("[debug] Check : ", payload)
      return {
        ...state,
        date: payload
      }

    case "PEREKAMAN_PROCESS":
      return {
        ...state,
        loading: true,
        error: false,
        data: [],
      };
    case "PEREKAMAN_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "PEREKAMAN_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        data: payload
      };
    default:
      return state;
  }
};
*/
