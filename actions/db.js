import axios from "axios";

// export const createDBDoc = (data) => async (dispatch, getState) => {
//     const { fileName } = data
//     const localDocs = getState().localData.docs
//     const dbDocs = getState().dbData.docs

//     if (localDocs[fileName] || dbDocs[fileName]) {
//         throw new Error('File already exists!')
//     }

//     const response = await axios.post('/api/create-new', file)

//     return dispatch({ type: 'DB_DATA', payload: response.data })
// }

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

// export const saveDBDoc = (data) => async (dispatch) => {
//     const response = await axios.post("/api/save", { post: data });

//     return dispatch({ type: "DB_DATA", payload: response.data });
// }

export const saveDBDoc = async (data, dispatch, getState) => {
  const user = getState().authUser;

  const response = await axios.post("/api/db/save", { post: data, user: user });

  dispatch({ type: "DB_DATA", payload: response.data });
};

// export const deleteDBDoc = (data) => async (dispatch, getState) => {
//     const { fileName } = data
//     const dbDocs = getState().dbData.docs;

//     if (!dbDocs[fileName]) {
//         throw new Error("File does not exist!");
//     }

//     const response = await axios.post("/api/delete", { fileName: fileName });

//     return dispatch({ type: "DB_DATA", payload: response.data });
// }

export const deleteDBDoc = async (data, dispatch, getState) => {
  const { fileName } = data;
  const dbDocs = getState().dbData.docs;
  const user = getState().authUser;

  if (!dbDocs[fileName]) {
    throw new Error("File does not exist!");
  }

  const response = await axios.post("/api/db/delete", {
    fileName: fileName,
    user: user
  });

  dispatch({ type: "DB_DATA", payload: response.data });
};

export const renameDBDoc = async (data, dispatch, getState) => {
  const { oldFN, newFN } = data;
  const dbDocs = getState().dbData.docs();
  const user = getState().authUser;

  if (dbDocs[newFN]) {
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
