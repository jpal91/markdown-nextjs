export default (state='', action) => {
    if (action.type === 'FILE_NAME') {
        return action.payload
    } else {
        return state
    }
}