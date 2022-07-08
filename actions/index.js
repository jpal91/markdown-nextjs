export const setTheme = (bool) => {
    return { type: 'SET_THEME', payload: bool }
}

export const toggleMenu = (bool) => {
    return { type: 'TOGGLE_MENU', payload: bool }
}