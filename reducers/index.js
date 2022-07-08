import { combineReducers } from "redux";

import theme from './theme'
import menu from './menu'

export default combineReducers({
    isDarkMode: theme,
    isMenuOpen: menu
})