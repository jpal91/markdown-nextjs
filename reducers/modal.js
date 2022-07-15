const modalObj = {
    open: false,
    type: ''
}

export default (state=modalObj, action) => {
    if (action.type === 'SET_MODAL') {
        return { ...state, ...action.payload }
    } else {
        return state
    }
}