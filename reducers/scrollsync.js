export default (state=true, action) => {
    if (action.type === 'SCROLL_SYNC') {
        return action.payload
    } else {
        return state
    }
}