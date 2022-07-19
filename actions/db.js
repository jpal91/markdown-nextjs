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

  if (localDocs[fileName] || dbDocs[fileName]) {
    throw new Error("File already exists!");
  }

  const response = await axios.post("/api/create-new", data);

  dispatch({ type: "DB_DATA", payload: response.data });
};

// export const saveDBDoc = (data) => async (dispatch) => {
//     const response = await axios.post("/api/save", { post: data });

//     return dispatch({ type: "DB_DATA", payload: response.data });
// }

export const saveDBDoc = async (data, dispatch, getState) => {
  const response = await axios.post("/api/save", { post: data });

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

  if (!dbDocs[fileName]) {
    throw new Error("File does not exist!");
  }

  const response = await axios.post("/api/delete", { fileName: fileName });

  dispatch({ type: "DB_DATA", payload: response.data });
};
