import axios from "axios";
import {
    createLocalDoc,
    saveLocalDoc,
    deleteLocalDoc,
    renameLocalDoc,
} from "./local";
import { createDBDoc, saveDBDoc, deleteDBDoc, renameDBDoc } from "./db";

const logout = {
    open: true,
    message: "Logged out!",
    severity: "success",
};

export const setLightMode = (bool) => {
    localStorage.setItem("isLightMode", bool);
    return { type: "SET_THEME", payload: bool };
};

export const toggleMenu = (bool) => {
    return { type: "TOGGLE_MENU", payload: bool };
};

//Tracks the users typed data in the editor section globally
export const setData = (string) => {
    return { type: "SET_DATA", payload: string };
};

export const togglePreview = (bool) => {
    return { type: "TOGGLE_PREVIEW", payload: bool };
};

//Sets the file name seen at the top of each page
export const setFileName = (string) => {
    string = string.replace(/\.md/, "");

    return { type: "FILE_NAME", payload: string };
};

export const getLocalData = () => {
    const data = localStorage.getItem("localData");

    if (!data) {
        localStorage.setItem(
            "localData",
            JSON.stringify({ user: "", docs: {} })
        );
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

/**
 *
 * @param {object} alertState - The current state of the alert
 * @param {boolean} alertState.open - Whether the alert is on or off
 * @param {string} alertState.message - The message of the alert
 * @param {string} alertState.severity - Describes the alert type, normally "error"(red) or "success"(green)
 * @returns - Action to change alert state
 */
export const setAlert = (alertState) => {
    if (alertState.open === false) {
        return { type: "ALERT_STATUS", payload: false };
    }

    return { type: "ALERT_STATUS", payload: alertState };
};

/**
 *
 * @param {object} obj - Object describing state of various button functions
 * @param {string} obj.save - Either 'new' for creating a new doc or 'existing' to save existing file
 * @param {string} obj.fileName - Controls state of rename function on FileInfo.js - either 'new', 'rename', or 'disabled'
 * @param {string} obj.delete - Controls state of delete function on Delete.js - either 'new', 'existing, or 'disabled'
 * @returns - Action updating the different button's states. Depending on the page the
 * user is on, the buttons will react differently.
 */
export const setButtonStatus = (obj) => {
    return { type: "CHANGE_BUTTONS", payload: obj };
};

//Sets Backdrop loading state located in MainApp.js
export const setLoading = (bool) => {
    return { type: "LOADING", payload: bool };
};

/**
 *
 * @param {object} modal - Object describing new modal
 * @param {boolean} modal.open - Whether or not the modal is open
 * @param {string} modal.type - Type of modal, see MainModal.js for types
 * @param {string} modal.redirect - If modal redirects after initial interaction, this indcates where to go
 * @returns - Action to open modal with message, redirect if the first modal is leading to a second
 * ie if the user is being warned about unsaved changes, agrees, and then is redirected to name
 * a new document.
 */
export const setModal = (modal) => {
    return { type: "SET_MODAL", payload: modal };
};

//Tracks any unsaved changes so user can be warned on leaving page
export const unsavedChanges = (bool) => {
    return { type: "UNSAVED_CHANGES", payload: bool };
};

//Tracks if the page the user is viewing is a guide or example page
//These pages cannot be saved or deleted
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

/**
 *
 * @returns - Dispatch of 4 actions called on logging out, reetting to initial states
 * @see setAuthUser()
 * @see setData()
 * @see setSaveState()
 * @see setAlert()
 */
export const userLogOut = () => async (dispatch) => {
    dispatch({ type: "AUTH_USER", payload: "" });
    dispatch({ type: "DB_DATA", payload: { _id: "", user: "", docs: {} } });
    dispatch({ type: "SAVE_STATE", payload: "local" });
    dispatch({ type: "ALERT_STATUS", payload: logout });
};

/**
 *
 * @param {string} location - Save location 'local' or 'db'
 * @param {string} actionType - Type of action on document (create, rename, delete, save)
 * @param {object} data - Data related to action (ie document to save, file name to delete, etc.)
 * @returns - Alert for error or success, actions are handled by respective functions
 * @see {@link ./index.js}
 * @see {@link ./db.js}
 */
export const masterUpdateHandler =
    (location, actionType, data) => async (dispatch, getState) => {
        const newAlert = {
            open: true,
            message: "",
            severity: "",
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
                //Null error is throw to bubble back to original calling function
                //Actual error message comes from exceptions thrown from above functions
                throw new Error("");
            }

            newAlert.severity = "success";
            dispatch({ type: "ALERT_STATUS", payload: newAlert });

            return;
        } else if (location === "db") {
            //Error specifically to handle if user has more than 10
            //documents in their database. Throws error to prevent the new save
            //and sends user an alert to notify
            const dbDocs = Object.keys(getState().dbData.docs);
            const e = new Error("Document limit exceeded!");
            e.name = "limit";

            try {
                switch (actionType) {
                    case "create":
                        if (dbDocs.length > 9) {
                            throw e;
                        }
                        await createDBDoc(data, dispatch, getState);
                        newAlert.message = "New document created!";
                        break;
                    case "save":
                        if (dbDocs.length > 9) {
                            throw e;
                        }
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
                newAlert.severity = error === e ? "limit" : "error";
                dispatch({ type: "ALERT_STATUS", payload: newAlert });
                throw new Error("");
            }

            newAlert.severity = "success";
            dispatch({ type: "ALERT_STATUS", payload: newAlert });

            return;
        }
    };
