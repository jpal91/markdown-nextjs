import axios from "axios";

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


export const saveDBDoc = async (data, dispatch, getState) => {
  const user = getState().authUser;

  const response = await axios.post("/api/db/save", { post: data, user: user });

  dispatch({ type: "DB_DATA", payload: response.data });
  dispatch({ type: 'UNSAVED_CHANGES', payload: false })
};

export const deleteDBDoc = async (data, dispatch, getState) => {
  // const { fileName } = data;
  const dbDocs = getState().dbData.docs;
  const user = getState().authUser;
  console.log(data);
  if (!dbDocs[data]) {
    throw new Error("File does not exist!");
  }

  const response = await axios.post("/api/db/delete", {
    fileName: data,
    user: user
  });

  dispatch({ type: "DB_DATA", payload: response.data });
};

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
