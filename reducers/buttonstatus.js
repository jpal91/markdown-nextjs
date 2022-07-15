let btnStatusObj = {
    save: 'active',
    fileName: 'active',
    delete: 'active'
}

export default (state=btnStatusObj, action) => {
    if (action.type === 'CHANGE_BUTTONS') {
        return { ...state, ...action.payload }
    } else {
        return state
    }
}