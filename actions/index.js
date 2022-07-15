import axios from "axios";

const errorDelete = {
    open: true,
    message: "No document saved with this name!",
    severity: "error",
};

const successDelete = {
    open: true,
    message: "Document deleted!",
    severity: "success",
};

const errorCreate = {
    open: true,
    message: 'Document already exists!',
    severity: 'error'
}

const successCreate = {
    open: true,
    message: 'Document successfully created!',
    severity: 'success'
}

const successRename = {
    open: true,
    message: 'Document name changed!',
    severity: 'success'
}


export const setTheme = (bool) => {
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
        localStorage.setItem(
            "localData",
            JSON.stringify({ user: "", docs: {} })
        );
        return { type: "LOCAL_DATA", payload: { user: "", docs: {} } };
    }

    return { type: "LOCAL_DATA", payload: JSON.parse(data) };
};

export const updateLocalData = (data) => {
    localStorage.setItem("localData", JSON.stringify(data));

    return { type: "LOCAL_DATA", payload: data };
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

export const getDBData = () => async (dispatch) => {
    const response = await axios.get("/api/get-data");

    return dispatch({ type: "DB_DATA", payload: response.data });
};

export const createNewDoc = (file) => async (dispatch, getState) => {
    const { fileName } = file
    const currentDocs = getState().dbData.docs;

    if (currentDocs[fileName]) {
        dispatch({ type: "ALERT_STATUS", payload: errorCreate });
        throw Error("");
    }

    const response = await axios.post('/api/create-new', file)

    dispatch({ type: 'DB_DATA', payload: response.data })
    dispatch({ type: 'ALERT_STATUS', payload: successCreate })
}

export const saveToDB = (post) => async (dispatch) => {
    const response = await axios.post("/api/save", { post: post });

    dispatch({ type: "DB_DATA", payload: response.data });
    dispatch({ type: "UNSAVED_CHANGES", payload: false })
};

export const deleteFromDB = (fileName) => async (dispatch, getState) => {
    const currentDocs = getState().dbData.docs;

    if (!currentDocs[fileName]) {
        dispatch({ type: "ALERT_STATUS", payload: errorDelete });
        throw Error("Nothing found");
    }

    const response = await axios.post("/api/delete", { fileName: fileName });

    dispatch({ type: "DB_DATA", payload: response.data });
    dispatch({ type: "ALERT_STATUS", payload: successDelete });
};

export const renameFile = (oldFN, newFN) => async (dispatch, getState) => {
    const currentDocs = getState().dbData.docs;

    if (currentDocs[newFN]) {
        dispatch({ type: "ALERT_STATUS", payload: errorCreate });
        throw Error("");
    }

    let newDoc = { ...currentDocs[oldFN] } 

    const response = await axios.post('/api/rename', { newDoc: newDoc, oldFN: oldFN, newFN: newFN })

    dispatch({ type: 'DB_DATA', payload: response.data })
    dispatch({ type: 'ALERT_STATUS', payload: successRename })
}

export const setModal = (modal) => {
	return { type: 'SET_MODAL', payload: modal }
}

export const unsavedChanges = (bool) => {
    return { type: 'UNSAVED_CHANGES', payload: bool }
}