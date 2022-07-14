import { combineReducers } from "redux";

import theme from "./theme";
import menu from "./menu";
import data from "./data";
import preview from "./preview";
import filename from "./filename";
import localdata from "./localdata";

export default combineReducers({
  isDarkMode: theme,
  isMenuOpen: menu,
  isPreviewMode: preview,
  mdData: data,
  fileName: filename,
  localData: localdata
});
