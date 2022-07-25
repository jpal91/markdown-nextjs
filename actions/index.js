import axios from "axios";
import {
  createLocalDoc,
  saveLocalDoc,
  deleteLocalDoc,
  renameLocalDoc
} from "./local";
import { createDBDoc, saveDBDoc, deleteDBDoc, renameDBDoc } from "./db";

const logout = {
  open: true,
  message: "Logged out!",
  severity: "success"
};

export const setLightMode = (bool) => {
  localStorage.setItem('isLightMode', bool)
  return { type: "SET_THEME", payload: bool };
};

export const toggleMenu = (bool) => {
  return { type: "TOGGLE_MENU", payload: bool };
};

export const setData = (string) => {
  return { type: "SET_DATA", payload: string };
};

export const togglePreview = (bool) => {
  return { type: "TOGGLE_PREVIEW", payload: bool };
};

export const setFileName = (string) => {
  string = string.replace(/\.md/, "");

  return { type: "FILE_NAME", payload: string };
};

export const getLocalData = () => {
  const data = localStorage.getItem("localData");

  if (!data) {
    localStorage.setItem("localData", JSON.stringify({ user: "", docs: {} }));
    return { type: "LOCAL_DATA", payload: { user: "", docs: {} } };
  }

  return { type: "LOCAL_DATA", payload: JSON.parse(data) };
};

export const getDBData = () => async (dispatch, getState) => {
  const user = getState().authUser;
  if (!user) {
    return;
  }

  const response = await axios.post("/api/db/get-data", { user: user });

  return dispatch({ type: "DB_DATA", payload: response.data });
};


export const setAlert = (alertState) => {
  if (alertState.open === false) {
    return { type: "ALERT_STATUS", payload: false };
  }

  return { type: "ALERT_STATUS", payload: alertState };
};

export const setButtonStatus = (obj) => {
  return { type: "CHANGE_BUTTONS", payload: obj };
};

export const setLoading = (bool) => {
  return { type: 'LOADING', payload: bool }
} 

export const setModal = (modal) => {
  return { type: "SET_MODAL", payload: modal };
};

export const unsavedChanges = (bool) => {
  return { type: "UNSAVED_CHANGES", payload: bool };
};

export const examplePage = (bool) => {
  return { type: "EXAMPLE_PAGE", payload: bool };
};

export const toggleScrollSync = (bool) => {
  return { type: "SCROLL_SYNC", payload: bool };
};

export const setAuthUser = (string) => {
  return { type: "AUTH_USER", payload: string };
};

export const setSaveState = (string) => {
  return { type: "SAVE_STATE", payload: string };
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: "AUTH_USER", payload: "" });
  dispatch({ type: "DB_DATA", payload: { _id: "", user: "", docs: {} } });
  dispatch({ type: 'SAVE_STATE', payload: 'local' })
  dispatch({ type: "ALERT_STATUS", payload: logout });
};

export const masterUpdateHandler = (location, actionType, data) => async (
  dispatch,
  getState
) => {
  const newAlert = {
    open: true,
    message: "",
    severity: ""
  };

  if (location === "local") {
    try {
      switch (actionType) {
        case "create":
          await createLocalDoc(data, dispatch, getState);
          newAlert.message = "New document created!";
          break;
        case "save":
          await saveLocalDoc(data, dispatch, getState);
          newAlert.message = "Document saved!";
          break;
        case "delete":
          await deleteLocalDoc(data, dispatch, getState);
          newAlert.message = "Document deleted!";
          break;
        case "rename":
          await renameLocalDoc(data, dispatch, getState);
          newAlert.message = "Document re-named!";
          break;
        default:
          break;
      }
    } catch (error) {
      newAlert.message = error.message;
      newAlert.severity = "error";
      dispatch({ type: "ALERT_STATUS", payload: newAlert });
      throw new Error("");
    }

    newAlert.severity = "success";
    dispatch({ type: "ALERT_STATUS", payload: newAlert });

    return;
  } else if (location === "db") {
    const dbDocs = Object.keys(getState().dbData.docs)
    const e = new Error('Document limit exceeded!')
    e.name = 'limit'
    
    try {
      switch (actionType) {
        case "create":
          if (dbDocs.length > 9) { throw e }
          await createDBDoc(data, dispatch, getState);
          newAlert.message = "New document created!";
          break;
        case "save":
          if (dbDocs.length > 9) { throw e }  
          await saveDBDoc(data, dispatch, getState);
          newAlert.message = "Document saved!";
          break;
        case "delete":
          await deleteDBDoc(data, dispatch, getState);
          newAlert.message = "Document deleted!";
          break;
        case "rename":
          await renameDBDoc(data, dispatch, getState);
          newAlert.message = "Document re-named!";
          break;
        default:
          break;
      }
    } catch (error) {
      newAlert.message = error.message;
      newAlert.severity = error === e ? 'limit' : "error";
      dispatch({ type: "ALERT_STATUS", payload: newAlert });
      throw new Error("");
    }

    newAlert.severity = "success";
    dispatch({ type: "ALERT_STATUS", payload: newAlert });

    return;
  }
};
