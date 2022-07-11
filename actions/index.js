export const setTheme = (bool) => {
    return { type: 'SET_THEME', payload: bool }
}

export const toggleMenu = (bool) => {
    return { type: 'TOGGLE_MENU', payload: bool }
}

export const setData = (string) => {
    return { type: 'SET_DATA', payload: string }
}

export const togglePreview = (bool) => {
    return { type: 'TOGGLE_PREVIEW', payload: bool }
}