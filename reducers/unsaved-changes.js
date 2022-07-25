export default (state=false, action) => {
    if (action.type === 'UNSAVED_CHANGES') {
        return action.payload
    } else {
        return state
    }
}