export default (state=true, action) => {
    if (action.type === 'SET_THEME') {
        return action.payload
    } else {
        return state
    }
}