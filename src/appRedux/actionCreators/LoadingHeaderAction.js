const setLoadingHeaderAction = (isLoading) => {
  return {
    type: 'LoadingHeader',
    payload: isLoading
  }
}

export default setLoadingHeaderAction
