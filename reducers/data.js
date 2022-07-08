export default (state='', action) => {
    if (action.type === 'SET_DATA') {
        return action.payload
    } else {
        return state
    }
}