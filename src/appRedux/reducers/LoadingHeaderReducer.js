const initialState = false
const LoadingHeaderReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LoadingHeader':
      return action.payload
    default:
      return state
  }
}
export default LoadingHeaderReducer
