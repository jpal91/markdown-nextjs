//Functions handling db CRUD actions

import axios from "axios";

/**
 * 
 * @param {object} data - Data object consisting of a new file name
 * @param {function} dispatch - Redux Thunk dispatch()
 * @param {function} getState - Redux Thunk getState()
 * @returns - Throws error on existing file name or calls API to create new file
 * @see /pages/api/db/create-new.js
 */
export const createDBDoc = async (data, dispatch, getState) => {
  const { fileName } = data;
  const localDocs = getState().localData.docs;
  const dbDocs = getState().dbData.docs;
  const user = getState().authUser;

  if (localDocs[fileName] || dbDocs[fileName]) {
    throw new Error("File already exists!");
  }

  const response = await axios.post("/api/db/create-new", {
    ...data,
    user: user
  });

  dispatch({ type: "DB_DATA", payload: response.data });
};

/**
 * 
 * @param {object} data - Data object consisting of updated doc info to save
 * @param {function} dispatch - Redux Thunk dispatch()
 * @param {function} getState - Redux Thunk getState()
 * @returns - Calls API to save new file data to db
 * @see /pages/api/db/save.js
 */
export const saveDBDoc = async (data, dispatch, getState) => {
  const user = getState().authUser;

  const response = await axios.post("/api/db/save", { post: data, user: user });

  dispatch({ type: "DB_DATA", payload: response.data });
  dispatch({ type: 'UNSAVED_CHANGES', payload: false })
};

/**
 * 
 * @param {object} data - Data object consisting of a file name to delete
 * @param {function} dispatch - Redux Thunk dispatch()
 * @param {function} getState - Redux Thunk getState()
 * @returns - Throws error if no file name exists or calls API to delete selcted file
 * @see /pages/api/db/delete.js
 */
export const deleteDBDoc = async (data, dispatch, getState) => {
  const dbDocs = getState().dbData.docs;
  const user = getState().authUser;

  if (!dbDocs[data]) {
    throw new Error("File does not exist!");
  }

  const response = await axios.post("/api/db/delete", {
    fileName: data,
    user: user
  });

  dispatch({ type: "DB_DATA", payload: response.data });
};

/**
 * 
 * @param {object} data - Data object consisting of the old file name to change and new file name
 * @param {function} dispatch - Redux Thunk dispatch()
 * @param {function} getState - Redux Thunk getState()
 * @returns - Throws error if no file name exists or calls API to rename selcted file
 * @see /pages/api/db/rename.js
 */
export const renameDBDoc = async (data, dispatch, getState) => {
  const { oldFN, newFN } = data;
  const dbDocs = getState().dbData.docs;
  const localDocs = getState().localData.docs;
  const user = getState().authUser;

  if (dbDocs[newFN] || localDocs[newFN]) {
    throw new Error("Document already exists!");
  }

  const newDoc = { ...dbDocs[oldFN] };

  const response = await axios.post("/api/db/rename", {
    ...data,
    newDoc: newDoc,
    user: user
  });

  dispatch({ type: "DB_DATA", payload: response.data });
};
