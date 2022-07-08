export default (state=false, action) => {
    if (action.type === 'TOGGLE_PREVIEW') {
        return action.payload
    } else {
        return state
    }
}