export default (state=false, action) => {
    if (action.type === 'SET_THEME') {
        return action.payload
    } else {
        return state
    }
}