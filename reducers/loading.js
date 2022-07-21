export default (state=false, action) => {
    if (action.type === 'LOADING') {
        return action.payload
    } else {
        return state
    }
}