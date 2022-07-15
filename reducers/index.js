import { combineReducers } from "redux";

import theme from "./theme";
import menu from "./menu";
import data from "./data";
import preview from "./preview";
import filename from "./filename";
import localdata from "./localdata";
import alert from "./alert";
import buttonstatus from "./buttonstatus";
import dbdata from './dbdata'
import modal from './modal'

export default combineReducers({
  isDarkMode: theme,
  isMenuOpen: menu,
  isPreviewMode: preview,
  mdData: data,
  fileName: filename,
  localData: localdata,
  alertState: alert,
  buttonStatus: buttonstatus,
  dbData: dbdata,
  modalStatus: modal
});
