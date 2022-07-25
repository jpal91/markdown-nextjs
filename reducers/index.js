import { combineReducers } from "redux";

import theme from "./theme";
import menu from "./menu";
import data from "./data";
import preview from "./preview";
import filename from "./filename";
import localdata from "./localdata";
import alert from "./alert";
import buttonstatus from "./buttonstatus";
import dbdata from "./dbdata";
import modal from "./modal";
import unsaved from "./unsaved-changes";
import example from "./example";
import scrollsync from "./scrollsync";
import authuser from "./authuser";
import savestate from "./savestate";
import loading from './loading'

export default combineReducers({
  isLightMode: theme,
  isMenuOpen: menu,
  isPreviewMode: preview,
  mdData: data,
  fileName: filename,
  localData: localdata,
  alertState: alert,
  buttonStatus: buttonstatus,
  dbData: dbdata,
  modalStatus: modal,
  unsaved: unsaved,
  isExamplePage: example,
  isScrollSync: scrollsync,
  authUser: authuser,
  saveState: savestate,
  loading: loading
});
