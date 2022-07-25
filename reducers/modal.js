const modalObj = {
    open: false,
    type: '',
    redirect: ''
}

export default (state=modalObj, action) => {
    if (action.type === 'SET_MODAL') {
        return { ...state, ...action.payload }
    } else {
        return state
    }
}