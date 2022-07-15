let obj = {
    _id: "",
    user: "",
    docs: {}
}

export default (state=obj, action) => {
    if (action.type === 'DB_DATA') {
        return action.payload
    } else {
        return state
    }
}