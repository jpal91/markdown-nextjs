export default (state=false, action) => {
    if (action.type === 'EXAMPLE_PAGE') {
        return action.payload
    } else {
        return state
    }
}